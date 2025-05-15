import { LitElement, html, CSSResultArray, css } from "lit";
import pjson from "../../package.json";

class AutoEntitiesHelp extends LitElement {
  render() {
    return html`
      <div>
        <p>Auto entities version ${pjson.version}</p>
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
