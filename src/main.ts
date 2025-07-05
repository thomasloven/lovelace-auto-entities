import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  hasTemplate,
  bind_template,
  unbind_template,
} from "./helpers/templates";
import { get_filter, RULES } from "./filter";
import { get_sorter } from "./sort";
import {
  AutoEntitiesConfig,
  EntityList,
  HuiErrorCard,
  LovelaceCard,
  LovelaceRowConfig,
} from "./types";
import pjson from "../package.json";
import "./editor/auto-entities-editor";
import { compare_deep } from "./helpers";
import { process_entity } from "./process_entity";

window.queueMicrotask =
  window.queueMicrotask || ((handler) => window.setTimeout(handler, 1));

const HIDDEN_TYPES = ["section", "divider"];
const CARDS_NO_ENTITY_WORKAROUND = [ "logbook", "map", "history-graph", "statistics-graph" ];

class AutoEntities extends LitElement {
  connectedWhileHidden = true;
  @property() _config: AutoEntitiesConfig;
  @property() hass: any;
  @property() card: LovelaceCard;
  @property() else?: LovelaceCard;
  @property() _template: string[];
  @state() empty = false;

  _entities: EntityList;
  _cardConfig;
  _updateCooldown = { timer: undefined, rerun: false };
  _cardBuilt?: Promise<void>;
  _cardBuiltResolve?;

  static getConfigElement() {
    return document.createElement("auto-entities-editor");
  }
  static getStubConfig() {
    return {
      card: {
        type: "entities",
      },
      filter: {
        include: [],
        exclude: [],
      },
    };
  }

  setConfig(config: AutoEntitiesConfig) {
    if (!config) {
      throw new Error("No configuration.");
    }

    if (!config.filter && !config.entities) {
      throw new Error("No filters specified.");
    }

    if (config.filter?.include) {
      for (const [index, filter] of config.filter.include.entries()) {
        if (Object.keys(filter).includes("type")) continue;
        for (const k in filter) {
          if (!(k.trim().split(" ")[0].trim() in RULES))
            throw new Error(`Unknown rule "${k}" in include filter ${index}`);
        }
      }
    }

    if (config.filter?.exclude) {
      for (const [index, filter] of config.filter.exclude.entries()) {
        if (Object.keys(filter).includes("type")) continue;
        for (const k in filter) {
          if (!(k.trim().split(" ")[0].trim() in RULES))
            throw new Error(`Unknown rule "${k}" in exclude filter ${index}`);
        }
      }
    }

    config = JSON.parse(JSON.stringify(config));
    this._config = config;

    if (
      this._config.filter?.template &&
      hasTemplate(this._config.filter.template)
    ) {
      bind_template(this._renderer, this._config.filter.template, { config });
    }

    this._cardBuilt = new Promise(
      (resolve) => (this._cardBuiltResolve = resolve)
    );

    queueMicrotask(() => this.build_else());
    queueMicrotask(() => this.update_all());
  }

  _renderer = (tpl) => {
    if (typeof tpl === "string") {
      this._template = tpl.split(/[\s,]+/);
    } else {
      this._template = tpl;
    }
    queueMicrotask(() => this.update_all());
  };

  connectedCallback() {
    super.connectedCallback();
    if (
      this._config?.filter?.template &&
      hasTemplate(this._config.filter.template)
    ) {
      bind_template(this._renderer, this._config.filter.template, {
        config: this._config,
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unbind_template(this._renderer);
  }

  async update_all() {
    if (this.card) this.card.hass = this.hass;
    if (this.else) this.else.hass = this.hass;

    if (this._updateCooldown.timer) {
      this._updateCooldown.rerun = true;
      return;
    } else {
      this._updateCooldown.rerun = false;
      this._updateCooldown.timer = window.setTimeout(() => {
        this._updateCooldown.timer = undefined;
        if (this._updateCooldown.rerun) this.update_all();
      }, 500);
    }

    if (!this.hass) return;

    const entities = await this.update_entities();
    this.update_card(entities);
  }

  async build_else() {
    if (this._config.else === undefined) return;
    const helpers = await (window as any).loadCardHelpers();
    this.else = await helpers.createCardElement(this._config.else);
    this.else.hass = this.hass;
  }

  async update_card(entities: EntityList) {
    if (
      this._entities &&
      compare_deep(entities, this._entities) &&
      compare_deep(this._cardConfig, this._config.card)
    )
      return;
    const newType = this._cardConfig?.type !== this._config.card?.type;
    this._entities = entities;
    this._cardConfig = JSON.parse(JSON.stringify(this._config.card ?? {}));
    const cardEntities = (entities.length > 0) ? 
      entities : 
      CARDS_NO_ENTITY_WORKAROUND.includes(this._cardConfig.type) ? [{ entity: "auto_entities.dummy" }] : [];
    const cardConfig = {
      type: "entities",
      [this._config.card_param || "entities"]: cardEntities,
      ...this._config.card,
    };
    if (!this.card || newType) {
      const helpers = await (window as any).loadCardHelpers();
      this.card = await helpers.createCardElement(cardConfig);
    } else {
      this.card.setConfig(cardConfig);
    }

    this._cardBuiltResolve?.();
    this.card.hass = this.hass;

    this.empty =
      entities.length === 0 ||
      entities.every((e) => HIDDEN_TYPES.includes(e.type));
    this.dispatchEvent(
      new Event("card-visibility-changed", { bubbles: true, cancelable: true })
    );
    if ((this.card as any).requestUpdate) {
      await this.updateComplete;
      (this.card as any).requestUpdate();
    }
  }

  async update_entities() {
    const format = (entity: LovelaceRowConfig | string): LovelaceRowConfig => {
      if (!entity) return null;
      return typeof entity === "string" ? { entity: entity.trim() } : entity;
    };

    let entities: EntityList = [...(this._config?.entities?.map(format) || [])];

    if (!this.hass) {
      return entities;
    }

    if (this._template) {
      entities = entities.concat(this._template.map(format));
    }
    entities = entities.filter(Boolean);

    const include_filters = await Promise.all(
      (this._config.filter?.include ?? []).map(async (filter) => {
        if (filter.type !== undefined)
          return async () => [filter as LovelaceRowConfig];

        const filters = await get_filter(this.hass, filter);
        const sorter = filter.sort?.method
          ? await get_sorter(this.hass, filter.sort)
          : (x) => x;

        const post_process = async (entity) =>
          await process_entity(
            this.hass,
            { ...entity, ...filter.options },
            entity.entity
          );

        return async (entities: EntityList) => {
          let add = entities.filter(filters);
          // Filter-local sort
          add = await sorter(add);
          // Filter-local pagination
          if (filter.sort?.count || filter.sort?.first) {
            const start = filter.sort?.first ?? 0;
            const count = filter.sort?.count ?? Infinity;
            add = add.slice(start, start + count);
          }
          add = await Promise.all(add.map(post_process));
          return add;
        };
      })
    );

    const exclude_filters = await Promise.all(
      (this._config.filter?.exclude ?? []).map(async (filter) => {
        const filters = await get_filter(this.hass, filter);
        return filters;
      })
    );

    const all_entities: EntityList = Object.keys(this.hass.states).map(format);
    // Include
    entities = entities.concat(
      ...(await Promise.all(include_filters.map((f) => f(all_entities))))
    );
    // Exclude
    entities = entities.filter((e) => !exclude_filters.some((f) => f(e)));

    // Global sort
    const sorter = this._config.sort?.method
      ? await get_sorter(this.hass, this._config.sort)
      : (x) => x;
    entities = await sorter(entities);

    // Unique
    if (this._config.unique) {
      let sorter = (
        entity: LovelaceRowConfig,
        index: number,
        self: LovelaceRowConfig[]
      ) => index === self.findIndex((e) => compare_deep(e, entity));

      if (this._config.unique === "entity") {
        sorter = (
          entity: LovelaceRowConfig,
          index: number,
          self: LovelaceRowConfig[]
        ) => index === self.findIndex((e) => e.entity === entity.entity);
      }

      entities = entities.filter(sorter);
    }

    // Pagination
    if (this._config.sort?.count || this._config.sort?.first) {
      const start = this._config.sort?.first ?? 0;
      const count = this._config.sort?.count ?? Infinity;
      entities = entities.slice(start, start + count);
    }

    return entities;
  }

  async updated(changedProperties) {
    if (
      changedProperties.has("_template") ||
      (changedProperties.has("hass") && this.hass)
    ) {
      queueMicrotask(() => this.update_all());
    }
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`${this.empty &&
    (this._config.show_empty === false || this._config.else)
      ? this.else
      : this.card}`;
  }

  async getCardSize() {
    let len = 0;
    await this._cardBuilt;
    if (this.card && this.card.getCardSize) len = await this.card.getCardSize();
    if (len === 1 && this._entities?.length) len = this._entities.length;
    if (len === 0 && this._config.filter?.include)
      len = Object.keys(this._config.filter.include).length;
    return len || 5;
  }

  get hidden() {
    const hide =
      this.empty &&
      this._config.show_empty === false &&
      this._config.else === undefined;
    return hide;
  }
}

if (!customElements.get("auto-entities")) {
  customElements.define("auto-entities", AutoEntities);
  console.groupCollapsed(
    `%cAUTO-ENTITIES ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold"
  );
  console.log(
    "Readme:",
    "https://github.com/thomasloven/lovelace-auto-entities"
  );
  console.groupEnd();
}
