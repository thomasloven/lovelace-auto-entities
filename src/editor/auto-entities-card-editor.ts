import { LitElement, html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { AutoEntitiesConfig } from "../types";
import { cardOptionsSchema } from "./schema";

class AutoEntitiesCardEditor extends LitElement {
  @state() _config: AutoEntitiesConfig;
  @property() lovelace;
  @property() hass;

  @state() _cardGUIMode = true;
  @state() _cardGUIModeAvailable = true;
  @query("hui-card-element-editor") private _cardEditorEl?;

  _changeCardOptions(ev) {
    if (!this._config) return;

    const data = ev.detail.value;

    this._config = { ...this._config, ...data };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _toggleCardMode(ev) {
    this._cardEditorEl?.toggleMode();
  }

  _deleteCard(ev) {
    if (!this._config) return;

    this._config = { ...this._config };
    delete this._config.card;

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

  _cardGUIModeChanged(ev) {
    ev.stopPropagation();
    this._cardGUIMode = ev.detail.guiMode;
    this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
  }

  render() {
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
                <ha-button
                  appearance="plain"
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                    ? "Show code editor"
                    : "Show Visual Editor"}
                </ha-button>
                <ha-button
                  appearance="plain"
                  .title=${"Change card type"}
                  @click=${this._deleteCard}
                >
                  Change card type
                </ha-button>
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
}
customElements.define("auto-entities-card-editor", AutoEntitiesCardEditor);
