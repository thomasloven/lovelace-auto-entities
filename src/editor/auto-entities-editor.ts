import { LitElement, html, CSSResultArray, css } from "lit";
import { property, state } from "lit/decorators.js";
import { AutoEntitiesConfig } from "../types";
import { loadHaForm, compare_deep } from "../helpers";

import "./auto-entities-filter-editor";
import "./auto-entities-sorting-editor";
import "./auto-entities-card-editor";
import "./auto-entities-help";

customElements.whenDefined("ha-yaml-editor").then(() => {
  const HaYamlEditor = customElements.get("ha-yaml-editor").prototype;
  const orig_setValue = HaYamlEditor.setValue;
  HaYamlEditor.setValue = function (value) {
    if (this.autoUpdate || !compare_deep(value, this.value))
      orig_setValue.bind(this)(value);
  };
});

// customElements.whenDefined("ha-selector-object").then(() => {
//   const HaSelectorObject = customElements.get("ha-selector-object").prototype;
//   HaSelectorObject._handleChange = function (ev) {
//     ev.stopPropagation();
//     this._valueChangedFromChild = true;
//     const value = ev.target.value;
//     if (!ev.target.isValid) {
//       return;
//     }
//     if (this.value === value) {
//       return;
//     }
//     this.dispatchEvent(
//       new CustomEvent("value-changed", {
//         detail: { value },
//         bubbles: true,
//         cancelable: false,
//         composed: true,
//       })
//     );
//   };
// });

class AutoEntitiesEditor extends LitElement {
  @state() _config: AutoEntitiesConfig;

  @property() lovelace;
  @property() hass;

  @state() _selectedTab = "Filters";

  setConfig(config) {
    this._config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    loadHaForm();
  }

  _config_changed(ev: CustomEvent) {
    ev.stopPropagation();
    if (!this._config) return;
    this._config = ev.detail.config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = ev.detail.name;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const tabs = {
      Filters: () => html`<auto-entities-filter-editor
        .hass=${this.hass}
        ._config=${this._config}
        @config-changed=${this._config_changed}
      ></auto-entities-filter-editor>`,
      Sorting: () => html`<auto-entities-sorting-editor
        .hass=${this.hass}
        ._config=${this._config}
        @config-changed=${this._config_changed}
      ></auto-entities-sorting-editor>`,
      Card: () => html`<auto-entities-card-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        ._config=${this._config}
        @config-changed=${this._config_changed}
      ></auto-entities-card-editor>`,
      "?": () => html`<auto-entities-help></auto-entities-help>`,
    };

    return html`
      <div>
        <ha-tab-group @wa-tab-show=${this._handleSwitchTab}>
          ${Object.keys(tabs).map(
            (tab) => html`
              <ha-tab-group-tab
                slot="nav"
                .active=${this._selectedTab == tab}
                panel=${tab}
              >
                ${tab}
              </ha-tab-group-tab>
            `
          )}
        </ha-tab-group>

        <div>${tabs[this._selectedTab].bind(this)()}</div>
      </div>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      css`
        ha-tab-group {
          margin-top: -16px;
          margin-bottom: 16px;
        }
        ha-tab-group-tab {
          flex: 1;
        }
        ha-tab-group-tab::part(base) {
          width: 100%;
          justify-content: center;
        }
        ha-tab-group-tab[panel="?"] {
          flex: 0;
        }
      `,
    ];
  }
}

customElements.define("auto-entities-editor", AutoEntitiesEditor);
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "auto-entities",
  name: "Auto Entities",
  preview: false,
  description:
    "Entity Filter on Steroids. Auto Entities allows you to fill other cards with entities automatically, based on a number of attributes.",
});
