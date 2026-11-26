import { LitElement, html, CSSResultArray, css } from "lit";
import { property } from "lit/decorators.js";
import pjson from "../../package.json";
import { localize } from "../localize";

class AutoEntitiesHelp extends LitElement {
  @property() hass;

  render() {
    return html`
      <div>
        <p>
          ${localize("help.version", this.hass, { version: pjson.version })}
        </p>
        <p>
          ${localize("help.see", this.hass)}
          <a
            href="https://github.com/thomasloven/lovelace-auto-entities"
            target="_blank"
            rel="noreferrer"
          >
            ${localize("help.link", this.hass)}
          </a>
          ${localize("help.usage", this.hass)}
        </p>
        <p>${localize("help.gui_limits", this.hass)}</p>
      </div>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      css`
        a {
          color: var(--primary-color);
        }
      `,
    ];
  }
}

customElements.define("auto-entities-help", AutoEntitiesHelp);
