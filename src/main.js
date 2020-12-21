import { LitElement, html, css } from "card-tools/src/lit-element";
import { entity_filter } from "./filter";
import { entity_sorter } from "./sort";
import { getData } from "card-tools/src/devices";
import { fireEvent } from "card-tools/src/event";
import { createCard } from "card-tools/src/lovelace-element";
import { hass } from "card-tools/src/hass";
import {subscribeRenderTemplate} from "card-tools/src/templates";

class AutoEntities extends LitElement {

  static get properties() {
    return {
      hass: {},
    };
  }
  setConfig(config) {
    if(!config) {
      throw new Error("No configuration.");
    }
    if(!config.card || !config.card.type) {
      throw new Error("No card type specified.")
    }
    if(!config.filter && !config.entities) {
      throw new Error("No filters specified.");
    }
    config = JSON.parse(JSON.stringify(config));
    if(!this._config) {
      this._config = config;

      this.hass = hass();
      this._getEntities();
      this.cardConfig = {[config.card_param || "entities"]: this.entities, ...config.card};
      this.card = createCard(this.cardConfig);
    } else {
      this._config = config;
      this.hass = this.hass;
    }
    if(config.filter && config.filter.template) {
      this.template = "";
      if(String(config.filter.template).includes("{%") || String(config.filter.template).includes("{{")) {
        subscribeRenderTemplate(null, (res) => {
          this.template = res;
          this._getEntities();
        }, {
          template: config.filter.template,
          variables: {config},
          entity_ids: config.filter.entity_ids,
        }, false);
      }
    }

    // Reevaluate all filters once areas have been loaded
    getData().then(() => this._getEntities());
  }

  _getEntities()
  {

    const format_entities = (e) => {
      if(!e) return null;
      if(typeof(e) === "string")
        return {entity: e.trim()}
      return e;
    }

    let entities = [];
    // Start with any entities added by the `entities` parameter
    if(this._config.entities)
      entities = entities.concat(this._config.entities.map(format_entities));

    if(!this.hass || !this._config.filter)
    {
      this.entities = entities;
      return;
    }

    if(this.template) {
      if(typeof(this.template) === "string")
        entities = entities.concat(this.template.split(/[\s,]+/).map(format_entities));
      else
        entities = entities.concat(this.template.map(format_entities));
    }
    entities = entities.filter(Boolean);

    if(this._config.filter.include) {
      const all_entities = Object.keys(this.hass.states).map(format_entities);

      for(const f of this._config.filter.include) {
        if(f.type !== undefined) {
          // If the filter has a type, it's a special entry
          entities.push(f);
          continue;
        }

        let add = all_entities.filter(entity_filter(this.hass, f))
        .map((e) =>
          JSON.parse(
            JSON.stringify(
              new Object({
                ...e,
                ...f.options
              })
            )
            .replace(/this.entity_id/g, e.entity)
          )
        );

        if(f.sort !== undefined) {
          // Sort per filter
          add = add.sort(entity_sorter(this.hass, f.sort));
        }
        entities = entities.concat(add);
      }
    }
    if(this._config.filter.exclude) {
      for(const f of this._config.filter.exclude) {
        entities = entities.filter((e) => {
          // Don't exclude special entries
          if(typeof(e) !== "string" && e.entity === undefined) return true;
          return !entity_filter(this.hass,f)(e)
        });
      }
    }

    if(this._config.sort) {
      // Sort everything
      entities = entities.sort(entity_sorter(this.hass, this._config.sort));
      if(this._config.sort.count) {
        const start = this._config.sort.first || 0;
        entities = entities.slice(start, start + this._config.sort.count);
      }
    }

    if(this._config.unique) {
      function compare(a,b) {
        if(typeof(a) !== typeof(b)) return false;
        if(typeof(a) !== "object") return a===b;
        if(Object.keys(a).lenght !== Object.keys(b).length) return false;
        if(Object.keys(a).some((k) => !Object.keys(b).includes(k))) return false;

        return Object.keys(a).every((k) => compare(a[k], b[k]));
      }
      let newEntities = [];
      for(const e of entities) {
        if(this._config.unique === "entity"
         && newEntities.some((i) => i.entity === e.entity)) continue;
        if(newEntities.some((i) => compare(i,e))) continue;
        newEntities.push(e);
      }
      entities = newEntities;
    }
    this.entities = entities;
  }

  set entities(ent) {
    function compare(a,b) {
      if( a === b )
      return true;
      if( a == null || b == null)
      return false;
      if(a.length != b.length)
      return false;
      for(var i = 0; i < a.length; i++)
      if(JSON.stringify(a[i]) !== JSON.stringify(b[i]))
      return false;
      return true;
    }
    if(!compare(ent, this._entities))
    {
      this._entities = ent;
      this.cardConfig = {...this.cardConfig, [this._config.card_param || "entities"]: this._entities};
      if(ent.length === 0 && this._config.show_empty === false) {
        this.style.display = "none";
        this.style.margin = "0";
      } else {
        this.style.display = null;
        this.style.margin = null;
      }
    }
  }
  get entities() {
    return this._entities;
  }

  set cardConfig(cardConfig) {
    this._cardConfig = cardConfig;
    if(this.card)
      this.card.setConfig(cardConfig);
  }
  get cardConfig() {
    return this._cardConfig;
  }

  updated(changedProperties) {
    if(changedProperties.has("hass") && this.hass) {
      this.card.hass = this.hass;
      // Run this in a timeout to improve performance
      setTimeout(() => this._getEntities(), 0);
    }
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`
    ${this.card}`;
  }

  getCardSize() {
    let len = 0;
    if(this.card && this.card.getCardSize)
      len = this.card.getCardSize();
    if(len === 1 && this.entities.length)
      len = this.entities.length;
    if(len === 0 && this._config.filter && this._config.filter.include)
      len = Object.keys(this._config.filter.include).length;
    return len || 1;
  }
}

if(!customElements.get("auto-entities")) {
  customElements.define('auto-entities', AutoEntities);
  const pjson = require('../package.json');
  console.info(`%cAUTO-ENTITIES ${pjson.version} IS INSTALLED`,
  "color: green; font-weight: bold",
  "");
}
