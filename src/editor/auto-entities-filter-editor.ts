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
  cardConfigSchema,
  optionSchema,
  entityContentSchema,
  entityAppearanceSchema,
  entityInteractionSchema,
} from "./schema";
import { get_filter } from "../filter";
import { get_sorter } from "../sort";
import { process_entity } from "../process_entity";

class AutoEntitiesFilterEditor extends LitElement {
  @state() _config!: AutoEntitiesConfig;
  @property() hass: any;
  @state() _filteredEntities: any[] = [];
  @state() _editingEntity: string | null = null;
  @state() _editForm: any = {};
  @state() _showEntityDialog = false;
  _computeTimeout: any = null;

  _describe_filter(filter: any) {
    if ("type" in filter) {
      return `${filter.type} ${filter.label ? `"${filter.label}"` : ""}`;
    }
    return `${Object.keys(filter).length} rules`;
  }

  _getFilters(type: string) {
    return (this._config.filter?.[type as 'include' | 'exclude'] as any[])?.concat() ?? [];
  }

  _setFilters(type: string, filters: any[]) {
    const filter = { ...this._config.filter, [type]: filters };
    this._config = { ...this._config, filter };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _closeAll(type: string) {
    this.shadowRoot
      ?.querySelectorAll(`ha-expansion-panel .${type}`)
      .forEach((panel) => {
        (panel as any).expanded = false;
      });
  }

  _filterAdd(ev: any, type: string, special = false) {
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
      const fold = this.shadowRoot?.querySelector(
        `ha-expansion-panel .${type}:last-child`
      );
      (fold as any).expanded = true;
    });
  }

  _filterMove(ev: CustomEvent, type: string): void {
    ev.stopPropagation();
    this._closeAll(type);
    const { oldIndex, newIndex } = ev.detail;

    const filters = this._getFilters(type);
    filters.splice(newIndex, 0, filters.splice(oldIndex, 1)[0]);
    this._setFilters(type, filters);
  }

  _filterDelete(ev: any, idx: number, type: string) {
    ev.stopPropagation();
    this._closeAll(type);

    const filters = this._getFilters(type);
    filters.splice(idx, 1);
    this._setFilters(type, filters);
  }

  _rulesChanged(ev: any, idx: number, type: string) {
    ev.stopPropagation();

    const formData = ev.detail.value;
    const data = form_to_rule(this._config, formData) as any;

    // Only return early if options is a string (invalid state)
    // For exclude filters, options will be undefined (which is valid)
    if (typeof data["options"] === "string")
      return;

    const filters = this._getFilters(type);
    // Replace the filter rules completely with the new data from the form
    // Preserve 'sort' property which is managed separately
    const { sort } = filters[idx];
    filters[idx] = { ...data };
    if (sort) filters[idx].sort = sort;
    this._setFilters(type, filters);

    // Trigger filtered entities computation
    this._scheduleComputeFilteredEntities();
  }

  _sortChanged(ev: any, idx: number, type: string) {
    ev.stopPropagation();
    const data = ev.detail.value;

    const filters = this._getFilters(type);
    filters[idx] = { ...filters[idx], sort: data };
    this._setFilters(type, filters);

    // If switching to manual sort, initialize manual_order with current entity order
    if (data.method === "manual" && !data.manual_order) {
      const currentOrder = this._filteredEntities.map(e => e.entity);
      filters[idx].sort = { ...data, manual_order: currentOrder };
      this._setFilters(type, filters);
    }

    // Trigger filtered entities computation
    this._scheduleComputeFilteredEntities();
  }

  _customChanged(ev: any, idx: number, type: string) {
    ev.stopPropagation();

    const data = ev.detail.value.data;
    if (data === undefined) return;

    const filters = this._getFilters(type);
    filters[idx] = { ...ev.detail.value.data };
    this._setFilters(type, filters);
  }

  _templateChanged(ev: any) {
    ev.stopPropagation();
    const template = ev.detail.value.template;

    console.log(template);

    this._setFilters("template", template);
  }

  _entitiesChanged(ev: any) {
    ev.stopPropagation();
    const entities = ev.detail.value.entities;

    this._config = { ...this._config, entities };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _cardConfigChanged(ev: any) {
    ev.stopPropagation();
    const {
      card_type,
      custom_card_type,
      show_empty,
      grid_columns,
      grid_square,
      title,
      columns,
      show_state,
      show_icon,
      show_name,
      icon,
      show_header_toggle,
      state_color
    } = ev.detail.value;

    const card = { ...this._config.card };
    const previousCardType = card.type;

    // Handle custom card type
    if (card_type === "other") {
      // When "other" is selected, use custom_card_type if provided
      if (custom_card_type && custom_card_type.trim() !== "") {
        card.type = custom_card_type;
      } else if (!card.type || this._isStandardType(card.type)) {
        // If no custom type entered yet and current type is standard, set to placeholder
        card.type = "custom:placeholder";
      }
      // else: keep existing custom type
    } else {
      // Standard card type selected
      card.type = card_type;
    }

    // Add grid-specific options
    if (card_type === "grid") {
      if (title !== undefined && title !== "") card.title = title;
      else delete card.title;
      if (grid_columns !== undefined) card.columns = grid_columns;
      if (grid_square !== undefined) card.square = grid_square;
    } else {
      // Remove grid-specific options if not a grid card
      delete card.columns;
      delete card.square;
    }

    // Add entities-specific options
    if (card_type === "entities") {
      if (title !== undefined && title !== "") card.title = title;
      else delete card.title;
      if (icon !== undefined && icon !== "") card.icon = icon;
      else delete card.icon;
      if (show_header_toggle !== undefined) card.show_header_toggle = show_header_toggle;
      if (state_color !== undefined) card.state_color = state_color;
    } else {
      // Remove entities-specific options if not an entities card
      if (card_type !== "glance" && card_type !== "grid") {
        delete card.title;
      }
      delete card.icon;
      delete card.show_header_toggle;
      delete card.state_color;
    }

    // Add glance-specific options
    if (card_type === "glance") {
      if (title !== undefined && title !== "") card.title = title;
      else delete card.title;
      if (columns !== undefined) card.columns = columns;
      if (show_state !== undefined) card.show_state = show_state;
      if (show_icon !== undefined) card.show_icon = show_icon;
      if (show_name !== undefined) card.show_name = show_name;
    } else {
      // Remove glance-specific options if not a glance card
      if (card_type !== "grid") {
        delete card.columns;
      }
      delete card.show_state;
      delete card.show_icon;
      delete card.show_name;
    }

    // Automatically set card_param based on card type
    // Grid and Stack cards use 'cards' parameter, others use 'entities'
    const isGridOrStack = ["grid", "horizontal-stack", "vertical-stack"].includes(card_type);
    const card_param = isGridOrStack ? "cards" : "entities";

    // Reset options.type to default when card type changes
    const cardTypeChanged = previousCardType !== card.type;
    let updatedFilter = this._config.filter;

    if (cardTypeChanged && updatedFilter?.include) {
      const defaultType = isGridOrStack ? "tile" : "button";
      updatedFilter = {
        ...updatedFilter,
        include: updatedFilter.include.map(filter => {
          if (filter.options && filter.options.type) {
            return {
              ...filter,
              options: {
                ...filter.options,
                type: defaultType,
              }
            };
          }
          return filter;
        })
      };
    }

    this._config = {
      ...this._config,
      card,
      card_param: isGridOrStack ? card_param : undefined,
      show_empty: show_empty,
      filter: updatedFilter,
    };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );

    // Trigger recomputation since card type affects available options
    this._scheduleComputeFilteredEntities();
  }

  _isStandardType(type: string): boolean {
    const standardTypes = ["entities", "glance", "grid", "horizontal-stack", "vertical-stack"];
    return standardTypes.includes(type);
  }

  _isManualSortActive() {
    // Check if any include filter has manual sorting enabled
    const includeFilters = this._config.filter?.include ?? [];
    return includeFilters.some(filter => filter.sort?.method === "manual");
  }

  _getActiveManualSortFilter() {
    const includeFilters = this._config.filter?.include ?? [];
    return includeFilters.find(filter => filter.sort?.method === "manual");
  }

  _entityMove(ev: CustomEvent): void {
    ev.stopPropagation();
    const { oldIndex, newIndex } = ev.detail;

    // Update the filtered entities order
    const entities = [...this._filteredEntities];
    entities.splice(newIndex, 0, entities.splice(oldIndex, 1)[0]);
    this._filteredEntities = entities;

    // Update the manual_order in the sort config
    const includeFilters = this._config.filter?.include ?? [];
    const manualFilterIdx = includeFilters.findIndex(
      filter => filter.sort?.method === "manual"
    );

    if (manualFilterIdx !== -1) {
      const filters = [...includeFilters];
      const manualOrder = entities.map(e => e.entity);
      const currentSort = filters[manualFilterIdx].sort;
      if (currentSort) {
        filters[manualFilterIdx] = {
          ...filters[manualFilterIdx],
          sort: {
            ...currentSort,
            manual_order: manualOrder,
          },
        };
        this._setFilters("include", filters);
      }
    }
  }

  _scheduleComputeFilteredEntities() {
    if (this._computeTimeout) {
      clearTimeout(this._computeTimeout);
    }
    this._computeTimeout = setTimeout(() => {
      this._computeFilteredEntities();
    }, 300);
  }

  _renderEntityRow(entity: any) {
    const entityId = entity.entity;
    const hasOverride = this._config.entity_overrides?.[entityId];
    const isManualSort = this._isManualSortActive();
    const state = this.hass?.states?.[entityId];
    const entityName = this._getEntityName(entityId);

    // Generate description of customizations
    const overrideDesc: string[] = [];
    if (hasOverride) {
      if (hasOverride.name) overrideDesc.push("name");
      if (hasOverride.icon) overrideDesc.push("icon");
      if (hasOverride.secondary_info) overrideDesc.push("secondary_info");
      if (hasOverride.state_content) overrideDesc.push("state_content");
      if (hasOverride.tap_action) overrideDesc.push("tap_action");
    }

    return html`
      <div class="entity-row ${hasOverride ? 'has-override' : ''}">
        ${isManualSort
        ? html`
              <div class="entity-handle">
                <ha-icon .icon=${"mdi:drag"}></ha-icon>
              </div>
            `
        : ""}
        <div class="entity-info" @click=${() => this._editEntity(entityId)}>
          <state-badge .stateObj=${state}></state-badge>
          <div class="entity-details">
            <div class="entity-name">${entityName}</div>
            ${overrideDesc.length > 0
        ? html`
                  <div class="entity-override-info">
                    Customized: ${overrideDesc.join(", ")}
                  </div>
                `
        : html`<div class="entity-id">${entityId}</div>`}
          </div>
        </div>
        <div class="entity-actions">
          ${hasOverride
        ? html`
                <ha-icon-button
                  @click=${(ev: Event) => {
            ev.stopPropagation();
            this._removeOverride(entityId);
          }}
                  title="Remove customization"
                >
                  <ha-icon .icon=${"mdi:restore"}></ha-icon>
                </ha-icon-button>
              `
        : ""}
        </div>
      </div>
    `;
  }

  _renderEntityDialog() {
    if (!this._showEntityDialog || !this._editingEntity) return "";

    const cardType = this._config.card?.type || "entities";

    return html`
      <ha-dialog
        open
        @closed=${this._cancelEdit}
        .heading=${"Customize Entity"}
      >
        <div class="dialog-content">
          <div class="entity-header">
            <state-badge .stateObj=${this.hass?.states?.[this._editingEntity]}></state-badge>
            <div class="entity-header-text">
              <div class="entity-header-name">${this._getEntityName(this._editingEntity)}</div>
              <div class="entity-header-id">${this._editingEntity}</div>
            </div>
          </div>

          <ha-expansion-panel outlined expanded>
            <ha-icon .icon=${"mdi:content-copy"} slot="leading-icon"></ha-icon>
            <h4 slot="header">Content</h4>
            <div class="content">
              <ha-form
                .hass=${this.hass}
                .schema=${entityContentSchema}
                .data=${this._editForm}
                .computeLabel=${(s: any) => s.label ?? s.name}
                @value-changed=${(ev: any) => {
        this._editForm = { ...this._editForm, ...ev.detail.value };
      }}
              >
              </ha-form>
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel outlined>
            <ha-icon .icon=${"mdi:palette"} slot="leading-icon"></ha-icon>
            <h4 slot="header">Appearance</h4>
            <div class="content">
              <ha-form
                .hass=${this.hass}
                .schema=${entityAppearanceSchema(cardType)}
                .data=${this._editForm}
                .computeLabel=${(s: any) => s.label ?? s.name}
                @value-changed=${(ev: any) => {
        this._editForm = { ...this._editForm, ...ev.detail.value };
      }}
              >
              </ha-form>
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel outlined>
            <ha-icon .icon=${"mdi:gesture-tap"} slot="leading-icon"></ha-icon>
            <h4 slot="header">Interaction</h4>
            <div class="content">
              <ha-form
                .hass=${this.hass}
                .schema=${entityInteractionSchema}
                .data=${this._editForm}
                .computeLabel=${(s: any) => s.label ?? s.name}
                @value-changed=${(ev: any) => {
        this._editForm = { ...this._editForm, ...ev.detail.value };
      }}
              >
              </ha-form>
            </div>
          </ha-expansion-panel>
        </div>

        <ha-button slot="secondaryAction" @click=${this._cancelEdit}>
          Cancel
        </ha-button>
        <ha-button slot="primaryAction" @click=${this._saveEntityOverride}>
          Save
        </ha-button>
      </ha-dialog>
    `;
  }

  async _computeFilteredEntities() {
    if (!this.hass || !this._config) return [];

    try {
      const format = (entity: any) => {
        if (!entity) return null;
        return typeof entity === "string" ? { entity: entity.trim() } : entity;
      };

      let entities: any[] = [];

      // Process include filters (same logic as main.ts)
      const include_filters = await Promise.all(
        (this._config.filter?.include ?? []).map(async (filter) => {
          if (filter.type !== undefined)
            return async () => [filter as any];

          const filters = await get_filter(this.hass, filter);
          const sorter = filter.sort?.method
            ? await get_sorter(this.hass, filter.sort)
            : (x) => x;

          const post_process = async (entity) =>
            await process_entity(
              this.hass,
              { ...entity, ...filter.options },
              entity.entity
            );

          return async (entities: any[]) => {
            let add = entities.filter(filters);

            // Apply entity overrides before sorting
            add = add.map((e) => {
              const override = this._config.entity_overrides?.[e.entity];
              return override ? { ...e, ...override } : e;
            });

            // Filter-local sort
            add = await sorter(add);
            // Filter-local pagination
            if (filter.sort?.count || filter.sort?.first) {
              const start = filter.sort?.first ?? 0;
              const count = filter.sort?.count ?? Infinity;
              add = add.slice(start, start + count);
            }
            add = await Promise.all(add.map(post_process));
            return add;
          };
        })
      );

      const exclude_filters = await Promise.all(
        (this._config.filter?.exclude ?? []).map(async (filter) => {
          const filters = await get_filter(this.hass, filter);
          return filters;
        })
      );

      const all_entities: any[] = Object.keys(this.hass.states).map(format);
      // Include
      entities = entities.concat(
        ...(await Promise.all(include_filters.map((f) => f(all_entities))))
      );
      // Exclude
      entities = entities.filter((e) => !exclude_filters.some((f) => f(e)));

      // Limit to 100 entities for editor performance
      this._filteredEntities = entities.slice(0, 100);
    } catch (error) {
      console.error("[auto-entities] Error computing filtered entities:", error);
      this._filteredEntities = [];
    }
  }

  _getEntityName(entityId: string): string {
    const state = this.hass?.states?.[entityId];
    return state?.attributes?.friendly_name || entityId;
  }

  _editEntity(entityId: string) {
    const override = this._config.entity_overrides?.[entityId] || {};
    const entity = this._filteredEntities.find(e => e.entity === entityId);

    // Convert vertical (boolean) to content_layout (string) for the form
    let content_layout = "";
    if (override.vertical !== undefined) {
      content_layout = override.vertical ? "vertical" : "horizontal";
    } else if (entity?.vertical !== undefined) {
      content_layout = entity.vertical ? "vertical" : "horizontal";
    }

    // Initialize edit form with current overrides
    this._editForm = {
      entity: entityId,
      name: override.name || entity?.name || "",
      icon: override.icon || entity?.icon || "",
      color: override.color || entity?.color || "",
      state_color: override.state_color ?? entity?.state_color ?? false,
      secondary_info: override.secondary_info || entity?.secondary_info || "",
      state_content: override.state_content || entity?.state_content || "",
      content_layout: content_layout,
      tap_action: override.tap_action || entity?.tap_action || undefined,
      hold_action: override.hold_action || entity?.hold_action || undefined,
      double_tap_action: override.double_tap_action || entity?.double_tap_action || undefined,
    };

    this._editingEntity = entityId;
    this._showEntityDialog = true;
  }

  _saveEntityOverride() {
    if (!this._editingEntity) return;

    const entityId = this._editingEntity;
    const override: any = {};

    // Only save non-empty values
    if (this._editForm.name) override.name = this._editForm.name;
    if (this._editForm.icon) override.icon = this._editForm.icon;
    if (this._editForm.color) override.color = this._editForm.color;
    if (this._editForm.state_color !== undefined && this._editForm.state_color !== false)
      override.state_color = this._editForm.state_color;
    if (this._editForm.secondary_info) override.secondary_info = this._editForm.secondary_info;
    if (this._editForm.state_content) override.state_content = this._editForm.state_content;

    // Convert content_layout (string) to vertical (boolean) for storage
    if (this._editForm.content_layout) {
      override.vertical = this._editForm.content_layout === "vertical";
    }

    if (this._editForm.tap_action) override.tap_action = this._editForm.tap_action;
    if (this._editForm.hold_action) override.hold_action = this._editForm.hold_action;
    if (this._editForm.double_tap_action) override.double_tap_action = this._editForm.double_tap_action;

    // Update entity_overrides in config
    const entity_overrides = { ...this._config.entity_overrides };

    if (Object.keys(override).length > 0) {
      entity_overrides[entityId] = override;
    } else {
      // Remove override if all fields are empty
      delete entity_overrides[entityId];
    }

    this._config = { ...this._config, entity_overrides };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );

    // Close dialog and refresh
    this._cancelEdit();
    this._scheduleComputeFilteredEntities();
  }

  _cancelEdit() {
    this._editingEntity = null;
    this._editForm = {};
    this._showEntityDialog = false;
  }

  _removeOverride(entityId: string) {
    const entity_overrides = { ...this._config.entity_overrides };
    delete entity_overrides[entityId];

    this._config = { ...this._config, entity_overrides };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );

    this._scheduleComputeFilteredEntities();
  }

  firstUpdated(_changedProperties: PropertyValues) {
    this.updateComplete.then(() => {
      const fold = this.shadowRoot?.querySelector(
        `ha-expansion-panel:first-child`
      );
      (fold as any).expanded = true;
    });

    // Initial computation of filtered entities
    this._scheduleComputeFilteredEntities();
  }

  updated(changedProperties: PropertyValues) {
    this.updateComplete.then(async () => {
      // Go through all selectors and force them to allow custom values
      const promises = Array.from(
        this.shadowRoot?.querySelectorAll(".filter-rule-form") ?? []
      ).map(postProcess);
      await Promise.all(promises);

      // Populate forms with data AFTER selectors have been patched.
      // Otherwise they may overwrite the data with undefined
      // Only populate if the form doesn't have data yet to avoid overwriting user input
      this.shadowRoot?.querySelectorAll("ha-form").forEach((form) => {
        let f = form as any;
        if (f.filter_type !== undefined && f.filter_idx !== undefined) {
          // Only set data if it's not already set (prevents overwriting user input)
          f.data = rule_to_form(
            (this._config.filter[f.filter_type as 'include' | 'exclude'] as any[])?.[f.filter_idx]
          );
        }
      });
    });

    // Recompute filtered entities when config changes
    if (changedProperties.has("_config") || changedProperties.has("hass")) {
      this._scheduleComputeFilteredEntities();
    }
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
                <div slot="header" class="header-content">
                  <span>[${idx}] - ${this._describe_filter(filter)}</span>
                <div slot="icons">
                  <a @click=${(ev) => this._filterDelete(ev, idx, type)}>
                    <ha-icon class="delete-button" .title=${"Delete filter"} .icon=${"mdi:delete"}></ha-icon>
                  </a>
                </div>
                </div>
                <div class="content">
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
                          .schema=${filterSchema(filter, this._config.card?.type || "entities", this.hass)}
                          .computeLabel=${(s: any) => s.label ?? s.name}
                          @value-changed=${(ev) =>
              this._rulesChanged(ev, idx, type)}
                          class="filter-rule-form"
                          .filter_type=${type}
                          .filter_idx=${idx}
                        >
                        </ha-form>
                  ${type === "include"
              ? html`
                        <ha-expansion-panel outlined class="options">
                          <ha-icon .icon=${"mdi:cog-outline"} slot="leading-icon"></ha-icon>
                          <h4 slot="header">Options</h4>
                          <div class="content">
                            <ha-form
                              .hass=${this.hass}
                              .schema=${optionSchema(filter, this._config.card?.type || "entities", this.hass)}
                              .data=${rule_to_form(filter, this.hass)}
                              .computeLabel=${(s: any) => s.label ?? s.name}
                              @value-changed=${(ev) =>
                  this._rulesChanged(ev, idx, type)}
                            >
                            </ha-form>
                          </div>
                        </ha-expansion-panel>

                        <ha-expansion-panel outlined class="sort">
                          <ha-icon .icon=${"mdi:sort"} slot="leading-icon"></ha-icon>
                          <h4 slot="header">Sorting</h4>
                          <div class="content">
                            <ha-form
                              .hass=${this.hass}
                              .schema=${sortSchema(filter.sort?.method)}
                              .data=${filter.sort}
                              .computeLabel=${(s: any) => s.label ?? s.name}
                              @value-changed=${(ev) =>
                  this._sortChanged(ev, idx, type)}
                            >
                            </ha-form>
                          </div>
                        </ha-expansion-panel>
                        `
              : ""}
                      `
          : html`
                        <ha-form
                          .hass=${this.hass}
                          .schema=${nonFilterSchema}
                          .data=${{ data: filter }}
                          .computeLabel=${(s: any) => s.label ?? s.name}
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
        <ha-icon slot="start" .icon=${"mdi:plus"}></ha-icon>
        Add filter
      </ha-button>
      <ha-button
        appearance="plain" 
        @click=${(ev) => this._filterAdd(ev, type, true)}
      >
        <ha-icon slot="start" .icon=${"mdi:plus"}></ha-icon>
      Add custom entry
    </ha-button>
  `;

    const isManualSort = this._isManualSortActive();

    // Determine if current card type is a standard type or custom
    const currentCardType = this._config.card?.type || "entities";
    const standardTypes = ["entities", "glance", "grid", "horizontal-stack", "vertical-stack"];
    const isCustomType = !standardTypes.includes(currentCardType);
    const displayCardType = isCustomType ? "other" : currentCardType;
    // Show placeholder text only if it's the placeholder, otherwise show the custom type
    const customTypeValue = currentCardType === "custom:placeholder" ? "" : (isCustomType ? currentCardType : "");

    return html`
      <div>
        <ha-expansion-panel outlined expanded>
          <ha-icon .icon=${"mdi:view-dashboard"} slot="leading-icon"></ha-icon>
          <h3 slot="header">Card Configuration</h3>
          <div class="content">
            <ha-form
              .hass=${this.hass}
              .schema=${cardConfigSchema(displayCardType)}
              .data=${{
                card_type: displayCardType,
                custom_card_type: customTypeValue,
                show_empty: this._config.show_empty ?? true,
                grid_columns: this._config.card?.columns ?? 2,
                grid_square: this._config.card?.square ?? false,
                title: this._config.card?.title ?? "",
                columns: this._config.card?.columns ?? 3,
                show_state: this._config.card?.show_state ?? true,
                show_icon: this._config.card?.show_icon ?? true,
                show_name: this._config.card?.show_name ?? true,
                icon: this._config.card?.icon ?? "",
                show_header_toggle: this._config.card?.show_header_toggle ?? false,
                state_color: this._config.card?.state_color ?? false,
              }}
              .computeLabel=${(s: any) => s.label ?? s.name}
              @value-changed=${(ev) => this._cardConfigChanged(ev)}
            >
            </ha-form>
          </div>
        </ha-expansion-panel>

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

        <ha-expansion-panel outlined>
          <ha-icon .icon=${"mdi:view-list"} slot="leading-icon"></ha-icon>
          <h3 slot="header">
            Filtered Entities (${this._filteredEntities.length}${this._filteredEntities.length >= 100 ? '+' : ''})
          </h3>
          <div class="content">
            ${this._filteredEntities.length === 0
        ? html`
                  <p class="info">
                    No entities match your filters. Add include filters to see entities here.
                  </p>
                `
        : html`
                  ${isManualSort
            ? html`
                        <p class="info">
                          <ha-icon .icon=${"mdi:drag"}></ha-icon>
                          Manual sort mode active. Drag entities to reorder them.
                        </p>
                      `
            : html`
                        <p class="info">
                          Click on an entity to customize its appearance and behavior.
                        </p>
                      `}

                  ${isManualSort
            ? html`
                        <ha-sortable
                          handle-selector=".entity-handle"
                          @item-moved=${this._entityMove}
                        >
                          <div class="entities-list">
                            ${this._filteredEntities.map((entity) => this._renderEntityRow(entity))}
                          </div>
                        </ha-sortable>
                      `
            : html`
                        <div class="entities-list">
                          ${this._filteredEntities.map((entity) => this._renderEntityRow(entity))}
                        </div>
                      `}
                `}
          </div>
        </ha-expansion-panel>

        ${this._config.entities
        ? html`
              <ha-form
                .hass=${this.hass}
                .schema=${entitiesSchema}
                .data=${this._config}
                .computeLabel=${(s: any) => s.label ?? s.name}
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
                .computeLabel=${(s: any) => s.label ?? s.name}
                @value-changed=${(ev) => this._templateChanged(ev)}
              >
              </ha-form>
            `
        : ""}

        ${this._renderEntityDialog()}
      </div>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      css`
        :host {
          display: block;
        }

        ha-expansion-panel {
          margin-bottom: 16px;
          display: block;
          --expansion-panel-content-padding: 0;
          border-radius: 12px;
          --ha-card-border-radius: 12px;
          border: 1px solid var(--divider-color);
          overflow: hidden;
        }

        ha-sortable ha-expansion-panel {
          margin-bottom: 12px;
        }

        ha-expansion-panel .content {
          padding: 16px;
          background: var(--card-background-color);
        }

        ha-expansion-panel > *[slot="header"] {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--primary-text-color);
        }

        ha-expansion-panel > *[slot="leading-icon"] {
          color: var(--primary-color);
        }

        ha-expansion-panel ha-svg-icon {
          color: var(--secondary-text-color);
        }

        ha-expansion-panel .sort {
          margin-top: 12px;
        }

        ha-expansion-panel .options {
          margin-top: 12px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 12px;
          padding-right: 4px;
        }

        .header-content span {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          margin: 0;
          color: var(--primary-text-color);
        }

        .delete-button {
          --mdc-icon-button-size: 36px;
          --mdc-icon-size: 20px;
          color: var(--error-color);
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-button:hover {
          color: var(--error-color);
          opacity: 0.8;
        }

        .handle {
          cursor: grab;
          color: var(--secondary-text-color);
          padding: 4px;
        }

        .handle:active {
          cursor: grabbing;
        }

        .handle > ha-icon {
          pointer-events: none;
        }

        .drag-handle {
          cursor: grab;
          color: var(--secondary-text-color);
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drag-handle:active {
          cursor: grabbing;
        }

        .drag-handle > ha-icon {
          pointer-events: none;
        }

        ha-button {
          margin-top: 8px;
          margin-right: 8px;
        }

        p.info {
          font-size: 13px;
          color: var(--secondary-text-color);
          margin: 0 0 16px 0;
          padding: 12px;
          background: var(--secondary-background-color);
          border-radius: 8px;
          border-left: 3px solid var(--primary-color);
        }

        .no-entities {
          text-align: center;
          color: var(--secondary-text-color);
          padding: 48px 16px;
          font-size: 14px;
        }

        .entities-list {
          max-height: 500px;
          overflow-y: auto;
          border-radius: 8px;
          border: 1px solid var(--divider-color);
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color);
          transition: all 0.2s;
          background: var(--card-background-color);
        }

        .entity-row:last-child {
          border-bottom: none;
        }

        .entity-row:hover {
          background: var(--secondary-background-color);
        }

        .entity-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .entity-info ha-icon {
          color: var(--state-icon-color);
          flex-shrink: 0;
        }

        .entity-text {
          flex: 1;
          min-width: 0;
        }

        .entity-name {
          font-weight: 500;
          font-size: 14px;
          color: var(--primary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 2px;
        }

        .entity-id {
          font-size: 12px;
          color: var(--secondary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-actions {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }

        ha-icon-button {
          --mdc-icon-button-size: 40px;
          --mdc-icon-size: 20px;
        }

        ha-form {
          display: block;
        }

        /* Hide the entity field in the edit dialog, but keep it in DOM for context */
        ha-form.entity-form ha-textfield[name="entity"],
        ha-form.entity-form ha-entity-picker[name="entity"] {
          display: none !important;
        }

        /* Dialog styles */
        ha-dialog {
          --mdc-dialog-min-width: 500px;
          --mdc-dialog-max-width: 600px;
        }

        /* Mobile portrait - Full screen dialog */
        @media all and (max-width: 450px), all and (max-height: 500px) {
          ha-dialog {
            --mdc-dialog-min-width: 100vw;
            --mdc-dialog-max-width: 100vw;
            --mdc-dialog-min-height: 100vh;
            --mdc-dialog-max-height: 100vh;
            --dialog-surface-margin-top: 0;
            --dialog-surface-top: 0;
            --mdc-dialog-border-radius: 0;
          }

          .dialog-content {
            max-height: calc(100vh - 140px);
            overflow-y: auto;
          }
        }

        /* Tablet - Medium sized dialog */
        @media all and (min-width: 451px) and (max-width: 768px) {
          ha-dialog {
            --mdc-dialog-min-width: 90vw;
            --mdc-dialog-max-width: 90vw;
            --mdc-dialog-max-height: calc(100vh - 64px);
          }

          .dialog-content {
            max-height: calc(100vh - 180px);
            overflow-y: auto;
          }
        }

        /* Desktop - Fixed width dialog */
        @media all and (min-width: 769px) {
          ha-dialog {
            --mdc-dialog-min-width: 580px;
            --mdc-dialog-max-width: 600px;
            --mdc-dialog-max-height: calc(100vh - 96px);
          }

          .dialog-content {
            max-height: calc(100vh - 200px);
            overflow-y: auto;
          }
        }

        /* Landscape mode adjustments */
        @media all and (orientation: landscape) and (max-height: 600px) {
          ha-dialog {
            --mdc-dialog-max-height: 95vh;
          }

          .dialog-content {
            max-height: calc(95vh - 120px);
          }

          .entity-header {
            padding: 8px 12px;
          }

          .entity-header state-badge {
            --state-badge-size: 32px;
          }
        }

        .dialog-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .entity-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--secondary-background-color);
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .entity-header state-badge {
          --state-badge-size: 40px;
        }

        .entity-header-text {
          flex: 1;
          min-width: 0;
        }

        .entity-header-name {
          font-weight: 500;
          font-size: 1.1rem;
          color: var(--primary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .entity-header-id {
          font-size: 0.9rem;
          color: var(--secondary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Dialog expansion panels */
        .dialog-content ha-expansion-panel {
          margin-bottom: 12px;
        }

        .dialog-content ha-expansion-panel .content {
          padding: 16px;
        }

        .dialog-content ha-expansion-panel h4[slot="header"] {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
        }
      `,
    ];
  }
}

customElements.define("auto-entities-filter-editor", AutoEntitiesFilterEditor);
