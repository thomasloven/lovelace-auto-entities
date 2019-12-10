import { LitElement, html, css } from "card-tools/src/lit-element";
import { entity_filter } from "./filter";
import { entity_sorter } from "./sort";
import { getData } from "card-tools/src/devices";
import { fireEvent } from "card-tools/src/event";
import { createCard } from "card-tools/src/lovelace-element";
import { hass } from "card-tools/src/hass";

class AutoEntities extends LitElement {

  static get properties() {
    return {
      hass: {},
    };
  }
  setConfig(config) {
    if(!config || !config.card) {
      throw new Error("Invalid configuration");
    }
    if(!this._config) {
      this._config = config;

      this.hass = hass();
      this._getEntities();
      this.cardConfig = {entities: this.entities, ...config.card};
      this.card = createCard(this.cardConfig);
    } else {
      this._config = config;
      this.hass = this.hass;
    }

    // Reevaluate all filters once areas have been loaded
    getData().then(() => this._getEntities());
  }

  _getEntities()
  {
    let entities = [];
    // Start with any entities added by the `entities` parameter
    if(this._config.entities)
    entities = entities.concat(this._config.entities)
    .map((e) => {
      if(typeof(e) === "string")
      return {entity: e};
      return e;
    });

    if(!this.hass || !this._config.filter) return entities;

    if(this._config.filter.include) {
      const all_entities = Object.keys(this.hass.states)
      .map((e) => new Object({entity: e}));

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
        if(Object.keys(a).some((k) => !Object.keys(b).includes(k))) return false;

        return Object.keys(a).every((k) => compare(a[k], b[k]));
      }
      let newEntities = [];
      for(const e of entities) {
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
      this.cardConfig = {...this.cardConfig, entities: this._entities};
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

customElements.define('auto-entities', AutoEntities);
fireEvent('ll-rebuild', {});
