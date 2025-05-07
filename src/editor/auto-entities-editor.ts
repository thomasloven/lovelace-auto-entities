import { LitElement, html, CSSResultArray, css } from "lit";
import { property, state, query } from "lit/decorators.js";
import { AutoEntitiesConfig } from "../types";
import { loadHaForm } from "../helpers";
import {
  filterGroupSchema,
  filterGroupOptionsSchema,
  filter2form,
  form2filter,
  specialGroupSchema,
  cardOptionsSchema,
  sortSchema,
} from "./schema";

class AutoEntitiesEditor extends LitElement {
  @state() _config: AutoEntitiesConfig;

  @property() lovelace;
  @property() hass;

  @state() _selectedTab = 0;
  @state() _cardGUIMode = true;
  @state() _cardGUIModeAvailable = true;

  @query("hui-card-element-editor") private _cardEditorEl?;

  setConfig(config) {
    this._config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    loadHaForm();
  }

  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = parseInt(ev.detail.index, 10);
  }

  _addFilterGroup() {
    if (!this._config) return;

    const include = [...this._config.filter?.include];
    include.push({});
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

    const data = ev.detail.value ? { ...ev.detail.value.data } : { type: "" };
    data.type = data.type ?? "";

    const include = [...this._config.filter?.include];
    include[group] = data;
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  async _changeGroupOptions(group, ev) {
    if (!this._config) return;

    const data = ev.detail.value;

    const include = [...this._config.filter?.include];
    include[group] = { ...data };
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _changeFilter(group, ev) {
    if (!this._config) return;

    const data = form2filter(this._config, ev.detail.value);
    const include = [...this._config.filter?.include];
    include[group] = { ...data, options: include[group].options };
    const filter = { ...this._config.filter, include };
    this._config = { ...this._config, filter };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _changeSortOptions(ev) {
    if (!this._config) return;
    const sort = ev.detail.value;
    this._config = { ...this._config, sort };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _changeCardOptions(ev) {
    if (!this._config) return;

    const data = ev.detail.value;

    this._config = { ...this._config, ...data };
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
            <mwc-tab .label=${"?"} style="flex: 0 1 min-content;"></mwc-tab>
          </mwc-tab-bar>
        </div>
        <div id="editor">
          ${[
            this._renderFilterEditor,
            this._renderSortEditor,
            this._renderCardEditor,
            this._renderHelp,
          ][this._selectedTab].bind(this)()}
        </div>
      </div>
    `;
  }

  _renderHelp() {
    return html`
      <div class="box">
        <p>Auto entities</p>
        <p>
          See
          <a
            href="https://github.com/thomasloven/lovelace-auto-entities"
            target="_blank"
            rel="noreferrer"
          >
            auto-entities on github
          </a>
          for usage instructions.
        </p>
        <p>Not all options are available in the GUI editor.</p>
      </div>
    `;
  }

  _renderFilterEditor() {
    if (this._config.filter?.template || this._config.entities)
      return html`
        <div class="box">
          <p>
            <b>Your filter method is not handled by the GUI editor.</b>
          </p>
          <p>Please switch to the CODE EDITOR to access all options.</p>
        </div>
      `;

    return html`
      ${this._config.filter.include.map(
        (group, group_idx) => html`
          <div class="box">
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
                  <ha-form
                    .hass=${this.hass}
                    .schema=${filterGroupSchema(group)}
                    .data=${filter2form(group)}
                    .computeLabel=${(s) => s.label ?? s.name}
                    @value-changed=${(ev) => this._changeFilter(group_idx, ev)}
                  ></ha-form>
                  <p>Options:</p>
                  <ha-form
                    .hass=${this.hass}
                    .schema=${filterGroupOptionsSchema}
                    .data=${group}
                    @value-changed=${(ev) =>
                      this._changeGroupOptions(group_idx, ev)}
                  ></ha-form>
                `
              : html`
                  <ha-form
                    .hass=${this.hass}
                    .schema=${specialGroupSchema}
                    .data=${{ data: group }}
                    @value-changed=${(ev) =>
                      this._changeSpecialEntry(group_idx, ev)}
                  ></ha-form>
                `}
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
    const data = this._config.sort ?? { method: "none" };

    return html`
      <div class="box">
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

  _renderCardEditor() {
    const data = { ...this._config };
    data.show_empty = data.show_empty ?? true;
    return html`
      <div class="box cards">
        <ha-form
          .hass=${this.hass}
          .schema=${cardOptionsSchema}
          .computeLabel=${(s) => s.label ?? s.name}
          .data=${data}
          @value-changed=${this._changeCardOptions}
        ></ha-form>
        ${this._config.card
          ? html`
              <div>
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                    ? "Show code editor"
                    : "Show Visual Editor"}
                </mwc-button>
                <mwc-button
                  .title=${"Change card type"}
                  @click=${this._deleteCard}
                >
                  Change card type
                </mwc-button>
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
                @config-changed=${this._handleCardConfigChanged}
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

        .box {
          margin-top: 8px;
          border: 1px solid var(--divider-color);
          padding: 12px;
        }
        .option {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .box .toolbar {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          gap: 8px;
        }
        .gui-mode-button {
          margin-right: auto;
        }
        a {
          color: var(--primary-color);
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
