import { LitElement, html, css } from "card-tools/src/lit-element";
import "card-tools/src/card-maker";
import { entity_filter } from "./filter";
import { entity_sorter } from "./sort";
import { getData } from "card-tools/src/devices";

class AutoEntities extends LitElement {

    static get properties() {
        return {
            hass: {},
            cardConfig: {},
            entities: {},
        };
    }
    async setConfig(config) {
        if(!config || !config.card) {
            throw new Error("Invalid configuration");
        }

        this._config = config;
        this.entities = [];
        this.cardConfig = {entities: this.entities, ...config.card};
    }

    async _getEntities()
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
                if(f.device || f.area) {
                    await getData();
                }

                let add = all_entities.filter(entity_filter(this.hass, f))
                    .map((e) => new Object({...e, ...f.options}));

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
        return entities;
    }

    async updated(changedProperties) {
        if(changedProperties.has("hass") && this.hass) {
            function compare(a,b) {
                if( a === b ) return true;
                if( a == null || b == null) return false;
                if(a.length != b.length) return false;
                for(var i = 0; i < a.length; i++)
                    if(a[i] !== b[i])
                        return false;
                return true;
            }

            const oldEntities = this.entities;
            const newEntities = await this._getEntities();
            if(!compare(oldEntities, newEntities)) {
                this.entities = newEntities;
                this.cardConfig = {
                    ...this.cardConfig,
                    entities: newEntities,
                };
            }
        }
    }

    createRenderRoot() {
        return this;
    }

    render() {
        if(this.entities.length === 0 && this._config.show_empty === false) {
            return html``;
        }
        return html`
        <card-maker
            .config=${this.cardConfig}
            .hass=${this.hass}
        ></card-maker>`;
    }

    getCardSize() {
        if(this.querySelector("card-maker") && this.querySelector("card-maker").getCardSize)
            return this.querySelector("card-maker").getCardSize();
        if(this.entities.length)
            return this.entities.length;
        if(this._config.filter && this._config.filter.include)
            return Object.keys(this._config.filter.include).length;
        return 1
    }
}

customElements.define('auto-entities', AutoEntities)