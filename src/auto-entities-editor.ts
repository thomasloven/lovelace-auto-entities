import {
  LitElement,
  html,
  property,
  internalProperty,
  CSSResultArray,
  css,
  query,
} from "lit-element";

import { AutoEntitiesConfig } from "./types";

const FILTER_OPTIONS = [
  "domain",
  "entity_id",
  "state",
  "name",
  "group",
  "device",
  "area",
  "last_changed",
  "last_updated",
  "last_triggered",
];

class AutoEntitiesEditor extends LitElement {
  @internalProperty() _config: AutoEntitiesConfig;

  @property() lovelace;
  @property() hass;

  @internalProperty() _selectedTab = 0;
  @internalProperty() _cardGUIMode = true;
  @internalProperty() _cardGUIModeAvailable = true;

  @query("hui-card-element-editor") private _cardEditorEl?;

  setConfig(config) {
    this._config = config;
  }

  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = parseInt(ev.detail.index, 10);
  }

  _addFilterGroup() {
    if (!this._config) return;
    this._config = { ...this._config };
    this._config.filter.include.push({ domain: "" });
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _deleteFilterGroup(idx) {
    if (!this._config) return;
    this._config = { ...this._config };
    this._config.filter.include.splice(idx, 1);
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _moveFilterGroup(idx, pos) {
    if (!this._config) return;
    this._config = { ...this._config };
    [
      this._config.filter.include[idx],
      this._config.filter.include[idx + pos],
    ] = [
      this._config.filter.include[idx + pos],
      this._config.filter.include[idx],
    ];
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _addSpecialEntry() {
    if (!this._config) return;
    this._config = { ...this._config };
    this._config.filter.include.push({ type: "" });
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeSpecialEntry(group, ev) {
    if (!this._config) return;
    this._config = { ...this._config };
    this._config.filter.include[group] = ev.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeGroupOptions(group, ev) {
    if (!this._config) return;
    this._config = { ...this._config };
    this._config.filter.include[group].options = ev.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _addFilter(group) {
    if (!this._config) return;
    this._config = { ...this._config };
    const newFilter = FILTER_OPTIONS.find(
      (f) => this._config.filter.include[group][f] === undefined
    );
    if (newFilter === undefined) return;
    this._config.filter.include[group][newFilter] = "";
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _removeFilter(group, key) {
    if (!this._config) return;
    this._config = { ...this._config };
    delete this._config.filter.include[group][key];
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeFilterKey(group, oldFilter, ev) {
    if (!this._config) return;
    const newFilter = FILTER_OPTIONS[ev.target.selected];
    if (newFilter === undefined || newFilter === oldFilter) return;
    if (this._config.filter.include[group][oldFilter] === undefined) return;
    this._config = { ...this._config };
    this._config.filter.include[group][newFilter] = this._config.filter.include[
      group
    ][oldFilter];
    delete this._config.filter.include[group][oldFilter];
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeFilterValue(group, filter, ev) {
    if (!this._config) return;
    this._config = { ...this._config };
    this._config.filter.include[group][filter] = ev.target.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _showEmptyToggle() {
    if (!this._config) return;
    this._config = {
      ...this._config,
      show_empty: this._config.show_empty === false,
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeCardParam(ev) {
    if (!this._config) return;
    const newParam = ev.target.value == "" ? undefined : ev.target.value;
    this._config = {
      ...this._config,
      card_param: newParam,
    };
    delete this._config.card[newParam ?? "entities"];
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _getCardConfig() {
    const cfg = { ...this._config.card };
    cfg[this._config.card_param || "entities"] = []; // TODO: card_param
    return cfg;
  }
  _handleCardPicked(ev) {
    ev.stopPropagation();
    if (!this._config) return;
    const cardConfig = { ...ev.detail.config };
    delete cardConfig.entities;
    this._config = { ...this._config, card: cardConfig };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _handleCardConfigChanged(ev) {
    ev.stopPropagation();
    if (!this._config) return;
    const cardConfig = { ...ev.detail.config };
    delete cardConfig[this._config.card_param || "entities"]; //TODO: card_param

    this._config = { ...this._config, card: cardConfig };
    this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _deleteCard(ev) {
    if (!this._config) return;
    this._config = { ...this._config };
    delete this._config.card;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _toggleCardMode(ev) {
    this._cardEditorEl?.toggleMode();
  }
  _cardGUIModeChanged(ev) {
    ev.stopPropagation();
    this._cardGUIMode = ev.detail.guiMode;
    this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="toolbar">
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"Filters"}></mwc-tab>
            <mwc-tab .label=${"Card"}></mwc-tab>
          </mwc-tab-bar>
        </div>
        <div id="editor">
          ${this._selectedTab === 0
            ? this._renderFilterEditor()
            : this._renderCardEditor()}
        </div>
      </div>
    `;
  }

  _renderFilterEditor() {
    return html`
      ${this._config.filter.include.map(
        (group, group_idx) => html`
          <div class="filter">
            <div class="toolbar">
              <mwc-icon-button
                .disabled=${group_idx === 0}
                @click=${() => this._moveFilterGroup(group_idx, -1)}
              >
                <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
              </mwc-icon-button>
              <mwc-icon-button
                .disabled=${group_idx ===
                this._config.filter.include.length - 1}
                @click=${() => this._moveFilterGroup(group_idx, 1)}
              >
                <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
              </mwc-icon-button>
              <mwc-icon-button
                @click=${() => this._deleteFilterGroup(group_idx)}
              >
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </mwc-icon-button>
            </div>
            ${group.type === undefined
              ? html`
                  ${Object.entries(group).map(
                    ([filter, value], key_idx) => html`
                      ${FILTER_OPTIONS.includes(filter)
                        ? html`
                            <div class="option">
                              <paper-dropdown-menu>
                                <paper-listbox
                                  .selected=${FILTER_OPTIONS.indexOf(filter)}
                                  slot="dropdown-content"
                                  @selected-item-changed=${(ev) =>
                                    this._changeFilterKey(
                                      group_idx,
                                      filter,
                                      ev
                                    )}
                                >
                                  ${FILTER_OPTIONS.map(
                                    (f) => html` <paper-item>${f}</paper-item> `
                                  )}
                                </paper-listbox>
                              </paper-dropdown-menu>
                              <paper-input
                                .value=${value}
                                @change=${(ev) =>
                                  this._changeFilterValue(
                                    group_idx,
                                    filter,
                                    ev
                                  )}
                              >
                                <mwc-icon-button
                                  slot="suffix"
                                  @click=${() =>
                                    this._removeFilter(group_idx, filter)}
                                >
                                  <ha-icon .icon=${"mdi:close"}></ha-icon>
                                </mwc-icon-button>
                              </paper-input>
                            </div>
                          `
                        : filter === "options"
                        ? html``
                        : html`<p><b>Some filters are not shown</b></p>
                            <p>
                              Please switch to the CODE EDITOR to access all
                              options.
                            </p>`}
                    `
                  )}
                  <mwc-button @click=${() => this._addFilter(group_idx)}>
                    <ha-icon .icon=${"mdi:plus"}></ha-icon>Add filter
                  </mwc-button>
                  <ha-yaml-editor
                    .label=${"Options"}
                    .defaultValue=${group.options ?? ""}
                    @value-changed=${(ev) =>
                      this._changeGroupOptions(group_idx, ev)}
                  ></ha-yaml-editor>
                `
              : html`<ha-yaml-editor
                  .defaultValue=${group}
                  @value-changed=${(ev) =>
                    this._changeSpecialEntry(group_idx, ev)}
                ></ha-yaml-editor>`}
          </div>
        `
      )}
      <mwc-button @click=${this._addFilterGroup}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>Add filter group
      </mwc-button>
      <mwc-button @click=${this._addSpecialEntry}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>Add non-filter entry
      </mwc-button>
    `;
  }

  _renderCardEditor() {
    return html`
      <div class="card">
        <ha-formfield .label=${"Display when empty"}>
          <ha-switch
            .checked=${this._config!.show_empty !== false}
            @change=${this._showEmptyToggle}
          ></ha-switch>
        </ha-formfield>
        <paper-input
          .label=${"Card parameter"}
          .value=${this._config.card_param ?? ""}
          @change=${this._changeCardParam}
        >
        </paper-input>
        ${this._config.card
          ? html`
              <div class="card-options">
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                    ? "Show code editor"
                    : "Show Visual Editor"}
                </mwc-button>
                <mwc-icon-button
                  .title=${"Delete card"}
                  @click=${this._deleteCard}
                >
                  <ha-icon .icon=${"mdi:delete"}></ha-icon>
                </mwc-icon-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${this._getCardConfig()}
                @config-changed=${this._handleCardConfigChanged}
                @GUImode-changed=${this._cardGUIModeChanged}
              ></hui-card-element-editor>
            `
          : html`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `}
      </div>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      css`
        mwc-tab-bar {
          border-bottom: 1px solid var(--divider-color);
        }

        .filter,
        .card {
          margin-top: 8px;
          border: 1px solid var(--divider-color);
          padding: 12px;
        }
        .filter .option {
          display: flex;
          align-items: flex-end;
        }
        .filter .option paper-dropdown-menu {
          margin-right: 16px;
          width: 150px;
        }
        .filter .option paper-input {
          flex-grow: 2;
        }

        .filter .toolbar,
        .card .card-options {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
        .gui-mode-button {
          margin-right: auto;
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
function interalProperty() {
  throw new Error("Function not implemented.");
}
