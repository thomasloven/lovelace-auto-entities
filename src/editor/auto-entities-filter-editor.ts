import { LitElement, html, CSSResultArray, css, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { AutoEntitiesConfig } from "../types";
import {
  filterSchema,
  rule_to_form,
  form_to_rule,
  nonFilterSchema,
  postProcess,
  sortSchema,
  hasSelector,
  templateSchema,
  entitiesSchema,
} from "./schema";

class AutoEntitiesFilterEditor extends LitElement {
  @state() _config: AutoEntitiesConfig;
  @property() hass;

  private _newStyleButton = false;

  _describe_filter(filter) {
    if ("type" in filter) {
      return `${filter.type} ${filter.label ? `"${filter.label}"` : ""}`;
    }
    return `${Object.keys(filter).length} rules`;
  }

  _getFilters(type) {
    return this._config.filter?.[type]?.concat() ?? [];
  }

  _setFilters(type, filters) {
    const filter = { ...this._config.filter, [type]: filters };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _closeAll(type) {
    this.shadowRoot
      .querySelectorAll(`ha-expansion-panel .${type}`)
      .forEach((panel) => {
        (panel as any).expanded = false;
      });
  }

  _filterAdd(ev, type, special = false) {
    ev.stopPropagation();
    this._closeAll(type);

    const filters = this._getFilters(type);
    if (special) {
      filters.push({ type: "section" });
    } else {
      filters.push({});
    }
    this._setFilters(type, filters);
    this.requestUpdate();
    this.updateComplete.then(() => {
      const fold = this.shadowRoot.querySelector(
        `ha-expansion-panel .${type}:last-child`
      );
      (fold as any).expanded = true;
    });
  }

  _filterMove(ev: CustomEvent, type): void {
    ev.stopPropagation();
    this._closeAll(type);
    const { oldIndex, newIndex } = ev.detail;

    const filters = this._getFilters(type);
    filters.splice(newIndex, 0, filters.splice(oldIndex, 1)[0]);
    this._setFilters(type, filters);
  }

  _filterDelete(ev, idx, type) {
    ev.stopPropagation();
    this._closeAll(type);

    const filters = this._getFilters(type);
    filters.splice(idx, 1);
    this._setFilters(type, filters);
  }

  _rulesChanged(ev, idx, type) {
    ev.stopPropagation();

    const data = form_to_rule(this._config, ev.detail.value);

    if (typeof data["options"] === "string" || data["options"] === undefined)
      return;

    const filters = this._getFilters(type);
    filters[idx] = { ...data };
    this._setFilters(type, filters);
  }

  _sortChanged(ev, idx, type) {
    ev.stopPropagation();
    const data = ev.detail.value;

    const filters = this._getFilters(type);
    filters[idx] = { ...filters[idx], sort: data };
    this._setFilters(type, filters);
  }

  _customChanged(ev, idx, type) {
    ev.stopPropagation();

    const data = ev.detail.value.data;
    if (data === undefined) return;

    const filters = this._getFilters(type);
    filters[idx] = { ...ev.detail.value.data };
    this._setFilters(type, filters);
  }

  _templateChanged(ev) {
    ev.stopPropagation();
    const template = ev.detail.value.template;

    console.log(template);

    this._setFilters("template", template);
  }

  _entitiesChanged(ev) {
    ev.stopPropagation();
    const entities = ev.detail.value.entities;

    this._config = { ...this._config, entities };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  firstUpdated(_changedProperties) {
    this.updateComplete.then(() => {
      const fold = this.shadowRoot.querySelector(
        `ha-expansion-panel:first-child`
      );
      (fold as any).expanded = true;
    });

    const [haMajor, haMinor, haPatch] = this.hass?.config?.version.split(".", 3);
    if ((haMajor >= 2025 && haMinor >= 8) || haMajor > 2025) {
      this._newStyleButton = true;
    }
  }

  updated(changedProperties) {
    this.updateComplete.then(async () => {
      // Go through all selectors and force them to allow custom values
      const promises = Array.from(
        this.shadowRoot.querySelectorAll(".filter-rule-form")
      ).map(postProcess);
      await Promise.all(promises);

      // Populate forms with data AFTER selectors have been patched.
      // Otherwise they may overwrite the data with undefined
      this.shadowRoot.querySelectorAll("ha-form").forEach((form) => {
        let f = form as any;
        if (f.filter_type !== undefined && f.filter_idx !== undefined) {
          f.data = rule_to_form(
            this._config.filter[f.filter_type][f.filter_idx]
          );
        }
      });
    });
  }

  render() {
    const render_type = (type) => html`
      <ha-sortable
        handle-selector=".handle"
        @item-moved=${(ev) => this._filterMove(ev, type)}
      >
        <div>
          ${(this._config.filter[type] ?? []).map(
            (filter, idx) => html`
              <ha-expansion-panel
                outlined
                class="drag ${type}"
                ${type == "include" ? "expanded" : ""}
              >
                <div class="handle" slot="leading-icon">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </div>
                <h3 slot="header">
                  [${idx}] - ${this._describe_filter(filter)}
                </h3>
                <div class="content">
                  <ha-button
                    variant="warning"
                    appearance="filled"
                    @click=${(ev) => this._filterDelete(ev, idx, type)}
                  >
                    Delete
                  </ha-button>
                  ${filter.type === undefined
                    ? html`
                        ${hasSelector(filter)
                          ? html`
                              <p class="info">
                                If entering a custom Value (e.g. "*light" or
                                "/^[Bb]ed/") in a box with options, you need to
                                finish with the Enter key.
                              </p>
                            `
                          : ""}
                        <ha-form
                          .hass=${this.hass}
                          .schema=${filterSchema(filter)}
                          .computeLabel=${(s) => s.label ?? s.name}
                          @value-changed=${(ev) =>
                            this._rulesChanged(ev, idx, type)}
                          class="filter-rule-form"
                          .filter_type=${type}
                          .filter_idx=${idx}
                        >
                        </ha-form>
                        <ha-expansion-panel outlined class="sort">
                          <h4 slot="header">Sorting</h4>
                          <div class="content">
                            <ha-form
                              .hass=${this.hass}
                              .schema=${sortSchema(filter.sort?.method)}
                              .data=${filter.sort}
                              .computeLabel=${(s) => s.label ?? s.name}
                              @value-changed=${(ev) =>
                                this._sortChanged(ev, idx, type)}
                            >
                            </ha-form>
                          </div>
                        </ha-expansion-panel>
                      `
                    : html`
                        <ha-form
                          .hass=${this.hass}
                          .schema=${nonFilterSchema}
                          .data=${{ data: filter }}
                          .computeLabel=${(s) => s.label ?? s.name}
                          @value-changed=${(ev) =>
                            this._customChanged(ev, idx, type)}
                        >
                        </ha-form>
                      `}
                </div>
              </ha-expansion-panel>
            `
          )}
        </div>
      </ha-sortable>
      <ha-button
        appearance="plain"
        @click=${(ev) => this._filterAdd(ev, type)}
      >
        ${this._newStyleButton
          ? html`<ha-icon slot="start" .icon=${"mdi:plus"}></ha-icon>`
          : html`<ha-icon .icon=${"mdi:plus"}></ha-icon>`
        }
        Add filter
      </ha-button>
      <ha-button
        appearance="plain" 
        @click=${(ev) => this._filterAdd(ev, type, true)}
      >
        ${this._newStyleButton
          ? html`<ha-icon slot="start" .icon=${"mdi:plus"}></ha-icon>`
          : html`<ha-icon .icon=${"mdi:plus"}></ha-icon>`
        }
        Add custom entry
      </ha-button>
    `;

    return html`
      <div>
        <ha-expansion-panel outlined>
          <ha-icon .icon=${"mdi:plus"} slot="leading-icon"></ha-icon>
          <h3 slot="header">Include</h3>

          <div class="content">${render_type("include")}</div>
        </ha-expansion-panel>
        <ha-expansion-panel outlined>
          <ha-icon .icon=${"mdi:minus"} slot="leading-icon"></ha-icon>
          <h3 slot="header">Exclude</h3>
          <div class="content">${render_type("exclude")}</div>
        </ha-expansion-panel>
        ${this._config.entities
          ? html`
              <ha-form
                .hass=${this.hass}
                .schema=${entitiesSchema}
                .data=${this._config}
                .computeLabel=${(s) => s.label ?? s.name}
                @value-changed=${(ev) => this._entitiesChanged(ev)}
              >
              </ha-form>
            `
          : ""}
        ${this._config.filter.template
          ? html`
              <ha-form
                .hass=${this.hass}
                .schema=${templateSchema}
                .data=${this._config.filter}
                .computeLabel=${(s) => s.label ?? s.name}
                @value-changed=${(ev) => this._templateChanged(ev)}
              >
              </ha-form>
            `
          : ""}
      </div>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      css`
        ha-expansion-panel {
          margin-bottom: 24px;
          display: block;
          --expansion-panel-content-padding: 0;
          border-radius: 6px;
          --ha-card-border-radius: 6px;
        }
        ha-sortable ha-expansion-panel {
          margin-bottom: 8px;
        }
        ha-expansion-panel .content {
          padding: 12px;
        }
        ha-expansion-panel > *[slot="header"] {
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        ha-expansion-panel ha-svg-icon {
          color: var(--secondary-text-color);
        }
        ha-expansion-panel .sort {
          margin-top: 8px;
        }

        .handle > ha-icon {
          pointer-events: none;
        }

        p.info {
          font-size: 0.875rem;
          color: var(--secondary-text-color);
        }
      `,
    ];
  }
}

customElements.define("auto-entities-filter-editor", AutoEntitiesFilterEditor);
