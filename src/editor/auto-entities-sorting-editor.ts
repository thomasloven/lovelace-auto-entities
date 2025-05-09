import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { AutoEntitiesConfig } from "../types";
import { sortSchema } from "./schema";

class AutoEntitiesSortingEditor extends LitElement {
  @state() _config: AutoEntitiesConfig;
  @property() hass;

  _changeSortOptions(ev) {
    if (!this._config) return;
    const sort = ev.detail.value;
    this._config = { ...this._config, sort };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  render() {
    const data = this._config.sort ?? { method: "none" };
    return html`
      <div>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${sortSchema}
          .computeLabel=${(s) => s.label ?? s.name}
          @value-changed=${this._changeSortOptions}
        ></ha-form>
      </div>
    `;
  }
}
customElements.define(
  "auto-entities-sorting-editor",
  AutoEntitiesSortingEditor
);
