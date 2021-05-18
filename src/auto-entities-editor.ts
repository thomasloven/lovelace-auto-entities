import {
  LitElement,
  html,
  property,
  internalProperty,
  CSSResultArray,
  css,
  query,
} from "lit-element";
import { until } from "lit-html/directives/until";
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

const SORT_METHODS = [
  "none",
  "domain",
  "entity_id",
  "friendly_name",
  "state",
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

    const include = [...this._config.filter?.include];
    include.push({ domain: "" });
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _deleteFilterGroup(idx) {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    include.splice(idx, 1);
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _moveFilterGroup(idx, pos) {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    [include[idx], include[idx + pos]] = [include[idx + pos], include[idx]];
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _addSpecialEntry() {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    include.push({ type: "" });
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  async _changeSpecialEntry(group, ev) {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    include[group] = ev.detail.value;
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  async _changeGroupOptions(group, ev) {
    if (!this._config) return;

    const options = ev.detail.value;

    const include = [...this._config.filter?.include];
    include[group] = { ...include[group], options };
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _addFilter(group) {
    if (!this._config) return;

    const newFilter = FILTER_OPTIONS.find(
      (f) => this._config.filter.include[group][f] === undefined
    );
    if (newFilter === undefined) return;

    const include = [...this._config.filter?.include];
    include[group] = { ...include[group], [newFilter]: "" };
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _removeFilter(group_index, key) {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    const group = { ...include[group_index] };
    delete group[key];
    if (Object.keys(group).length === 0)
      return this._deleteFilterGroup(group_index);
    include[group_index] = group;
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeFilterKey(group_index, oldFilter, ev) {
    if (!this._config) return;

    const newFilter = FILTER_OPTIONS[ev.target.selected];
    if (newFilter === undefined || newFilter === oldFilter) return;

    const include = [...this._config.filter?.include];
    const group = { ...include[group_index] };
    if (group[oldFilter] === undefined) return;
    group[newFilter] = group[oldFilter];
    delete group[oldFilter];
    include[group_index] = group;
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeFilterValue(group, filter_property, ev) {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    const _group = { ...include[group] };
    _group[filter_property] = ev.target.value;
    include[group] = _group;
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _changeSortMethod(ev) {
    if (!this._config) return;

    const method = SORT_METHODS[ev.target.selected];
    const sort = { ...this._config.sort, method };
    this._config = { ...this._config, sort };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _sortOptionToggle(option, ev) {
    if (!this._config) return;

    const sort = { ...this._config.sort };
    sort[option] = ev.target.checked;
    this._config = { ...this._config, sort };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _showEmptyToggle() {
    if (!this._config) return;

    const show_empty = this._config.show_empty === false;
    this._config = { ...this._config, show_empty };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _changeCardParam(ev) {
    if (!this._config) return;

    const card_param =
      ev.target.value === "" || ev.target.value === "entities"
        ? undefined
        : ev.target.value;
    this._config = { ...this._config, card_param };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _getCardConfig() {
    const cfg = { ...this._config.card };
    cfg[this._config.card_param || "entities"] = [];
    return cfg;
  }
  _handleCardPicked(ev) {
    ev.stopPropagation();
    if (!this._config) return;

    const card = { ...ev.detail.config };
    delete card.entities;
    this._config = { ...this._config, card };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _handleCardConfigChanged(ev) {
    ev.stopPropagation();
    if (!this._config) return;

    const card = { ...ev.detail.config };
    delete card[this._config.card_param || "entities"];
    this._config = { ...this._config, card };

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
            <mwc-tab .label=${"Sorting"}></mwc-tab>
            <mwc-tab .label=${"Card"}></mwc-tab>
          </mwc-tab-bar>
        </div>
        <div id="editor">
          ${[
            this._renderFilterEditor,
            this._renderSortEditor,
            this._renderCardEditor,
          ][this._selectedTab].bind(this)()}
        </div>
      </div>
    `;
  }

  _renderFilterEditor() {
    if (this._config.filter?.template || this._config.entities)
      return html`
        <div class="filter">
          <p>
            <b>Your filter method is not handled by the GUI editor.</b>
          </p>
          <p>Please switch to the CODE EDITOR to access all options.</p>
        </div>
      `;
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
                    .defaultValue=${this._config.filter.include[group_idx]
                      .options}
                    .group=${group_idx}
                    @value-changed=${(ev) =>
                      this._changeGroupOptions(group_idx, ev)}
                  ></ha-yaml-editor>
                `
              : html`<ha-yaml-editor
                  .defaultValue=${this._config.filter.include[group_idx]}
                  .group=${group_idx}
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

  _renderSortEditor() {
    return html`
      <div class="sort">
        ${this._config.sort?.method &&
        !SORT_METHODS.includes(this._config.sort.method)
          ? html`<p>
                <b>Your sort method is not handled by the GUI editor.</b>
              </p>
              <p>Please switch to the CODE EDITOR to access all options.</p>`
          : html`
              Method:
              <paper-dropdown-menu>
                <paper-listbox
                  .selected=${SORT_METHODS.includes(this._config.sort?.method)
                    ? SORT_METHODS.indexOf(this._config.sort?.method)
                    : 0}
                  slot="dropdown-content"
                  @selected-item-changed=${this._changeSortMethod}
                >
                  ${SORT_METHODS.map(
                    (f) => html` <paper-item>${f}</paper-item> `
                  )}
                </paper-listbox>
              </paper-dropdown-menu>
              <p>
                <ha-formfield .label=${"Reverse"}>
                  <ha-switch
                    .checked=${this._config.sort?.reverse === true}
                    @change=${(ev) => this._sortOptionToggle("reverse", ev)}
                  ></ha-switch>
                </ha-formfield>
              </p>
              <p>
                <ha-formfield .label=${"Numeric"}>
                  <ha-switch
                    .checked=${this._config.sort?.numeric === true}
                    @change=${(ev) => this._sortOptionToggle("numeric", ev)}
                  ></ha-switch>
                </ha-formfield>
              </p>
            `}
      </div>
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
