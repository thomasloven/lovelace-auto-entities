import { LitElement, html, CSSResultArray, css } from "lit";
import { property, state } from "lit/decorators.js";
import { AutoEntitiesConfig } from "../types";
import { loadHaForm, compare_deep } from "../helpers";
import { localize } from "../localize";

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
      "?": () =>
        html`<auto-entities-help .hass=${this.hass}></auto-entities-help>`,
    };

    const tabLabels = {
      Filters: localize("tab.filters", this.hass),
      Sorting: localize("tab.sorting", this.hass),
      Card: localize("tab.card", this.hass),
      "?": "?",
    };

    return html`
      <div>
        <sl-tab-group @sl-tab-show=${this._handleSwitchTab}>
          ${Object.keys(tabs).map(
            (tab) => html`
              <sl-tab
                slot="nav"
                .active=${this._selectedTab == tab}
                panel=${tab}
              >
                ${tabLabels[tab]}
              </sl-tab>
            `
          )}
        </sl-tab-group>

        <div>${tabs[this._selectedTab].bind(this)()}</div>
      </div>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      css`
        sl-tab-group {
          margin-top: -16px;
          margin-bottom: 16px;
        }
        sl-tab {
          flex: 1;
        }
        sl-tab::part(base) {
          width: 100%;
          justify-content: center;
        }
        sl-tab[panel="?"] {
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
  // Read when the card picker opens, once the user's language is known
  get description() {
    return localize("card.description");
  },
});
