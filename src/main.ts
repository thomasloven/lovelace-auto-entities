import { LitElement, html, property } from "lit-element";
import { hasTemplate } from "card-tools/src/templates";
import { bind_template, unbind_template } from "./templates";
import { filter_entity } from "./filter";
import { get_sorter } from "./sort";
import {
  AutoEntitiesConfig,
  EntityList,
  HuiErrorCard,
  LovelaceCard,
  LovelaceRowConfig,
} from "./types";
import pjson from "../package.json";
import "./auto-entities-editor";

window.queueMicrotask =
  window.queueMicrotask || ((handler) => window.setTimeout(handler, 1));

function compare_deep(a: any, b: any) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (!(a instanceof Object && b instanceof Object)) return false;
  for (const x in a) {
    if (!a.hasOwnProperty(x)) continue;
    if (!b.hasOwnProperty(x)) return false;
    if (a[x] === b[x]) continue;
    if (typeof a[x] !== "object") return false;
    if (!compare_deep(a[x], b[x])) return false;
  }
  for (const x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (!a.hasOwnProperty(x)) return false;
  }
  return true;
}

class AutoEntities extends LitElement {
  @property() _config: AutoEntitiesConfig;
  @property() hass: any;
  @property() card: LovelaceCard;
  @property() _template: string[];
  _entities: EntityList;
  //_renderer;
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
    if (!config.card?.type) {
      throw new Error("No card type specified.");
    }
    if (!config.filter && !config.entities) {
      throw new Error("No filters specified.");
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

    queueMicrotask(() => this.update_all());
  }

  _renderer = (tpl) => {
    if (typeof tpl === "string") {
      this._template = tpl.split(/[\s,]+/);
    } else {
      this._template = tpl;
    }
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

    const entities = await this.update_entities();
    this.update_card(entities);
  }

  async update_card(entities: EntityList) {
    if (
      this._entities &&
      compare_deep(entities, this._entities) &&
      compare_deep(this._cardConfig, this._config.card)
    )
      return;
    const newType = this._cardConfig?.type !== this._config.card.type;
    this._entities = entities;
    this._cardConfig = JSON.parse(JSON.stringify(this._config.card));
    const cardConfig = {
      [this._config.card_param || "entities"]: entities,
      ...this._config.card,
    };
    if (!this.card || newType) {
      const helpers = await (window as any).loadCardHelpers();

      // Replace console.error in order to catch errors from cards which don't like to be given an empty entities list
      const _consoleError = console.error;
      let failed = false;
      console.error = (...args) => {
        if (args.length === 3 && args[2].message) {
          if (
            args[2].message.startsWith?.("Entities") || // Logbook-card
            args[2].message.startsWith?.("Either entities") || // Map card
            args[2].message.endsWith?.("entity") // History-graph card
          ) {
            failed = true;
            return;
          }
        }
        _consoleError(...args);
      };

      this.card = await helpers.createCardElement(cardConfig);

      console.error = _consoleError;

      if (failed) {
        this.card = undefined;
        this._entities = undefined;
        this._cardConfig = undefined;
        this._cardBuiltResolve?.();
        return;
      }
    } else {
      this.card.setConfig(cardConfig);
    }
    this._cardBuiltResolve?.();
    this.card.hass = this.hass;
    const hide = entities.length === 0 && this._config.show_empty === false;
    this.style.display = hide ? "none" : null;
    this.style.margin = hide ? "0" : null;
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

    if (this._config.filter?.include) {
      const all_entities = Object.keys(this.hass.states).map(format);
      for (const filter of this._config.filter.include) {
        if (filter.type) {
          entities.push(filter);
          continue;
        }

        let add: EntityList = [];
        for (const entity of all_entities) {
          if (await filter_entity(this.hass, filter, entity.entity))
            add.push(
              JSON.parse(
                JSON.stringify({ ...entity, ...filter.options }).replace(
                  /this.entity_id/g,
                  entity.entity
                )
              )
            );
        }

        if (filter.sort) {
          add = add.sort(get_sorter(this.hass, filter.sort));
          if (filter.sort.count) {
            const start = filter.sort.first ?? 0;
            add = add.slice(start, start + filter.sort.count);
          }
        }
        entities = entities.concat(add);
      }
    }

    // TODO: Add tests for exclusions
    if (this._config.filter?.exclude) {
      for (const filter of this._config.filter.exclude) {
        const newEntities = [];
        for (const entity of entities) {
          if (
            entity.entity === undefined ||
            !(await filter_entity(this.hass, filter, entity.entity))
          )
            newEntities.push(entity);
        }
        entities = newEntities;
      }
    }

    if (this._config.sort) {
      entities = entities.sort(get_sorter(this.hass, this._config.sort));
      if (this._config.sort.count) {
        const start = this._config.sort.first ?? 0;
        entities = entities.slice(start, start + this._config.sort.count);
      }
    }

    if (this._config.unique) {
      let newEntities: EntityList = [];
      for (const e of entities) {
        if (
          this._config.unique === "entity" &&
          e.entity &&
          newEntities.some((i) => i.entity === e.entity)
        )
          continue;
        if (newEntities.some((i) => compare_deep(i, e))) continue;
        newEntities.push(e);
      }
      entities = newEntities;
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
    return html`${this.card}`;
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
}

if (!customElements.get("auto-entities")) {
  customElements.define("auto-entities", AutoEntities);
  console.info(
    `%cAUTO-ENTITIES ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold",
    ""
  );
}
