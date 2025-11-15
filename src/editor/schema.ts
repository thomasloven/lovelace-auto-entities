import { await_element, selectTree } from "../helpers/selecttree";

// Type definitions for better type safety
type HomeAssistant = any;

interface SelectOption {
  value: string;
  label: string;
}

interface FilterGroup {
  [key: string]: any;
  options?: any;
  sort?: SortConfig;
}

interface SortConfig {
  method?: string;
  reverse?: boolean;
  ignore_case?: boolean;
  numeric?: boolean;
  ip?: boolean;
  attribute?: any;
  count?: number;
  first?: number;
  manual_order?: string[];
}

// Helper function to get all unique domains from hass
const getDomains = (hass: HomeAssistant): SelectOption[] => {
  if (!hass?.states) return [];
  const domains = new Set<string>();
  Object.keys(hass.states).forEach(entity_id => {
    const domain = entity_id.split('.')[0];
    domains.add(domain);
  });
  return Array.from(domains).sort().map(domain => ({ value: domain, label: domain }));
};

const ruleKeySelector = {
  type: "select",
  options: [
    ["area", "Area"],
    ["attributes", "Attribute"],
    ["device", "Device"],
    ["domain", "Domain"],
    ["entity_category", "Entity Category"],
    ["entity_id", "Entity ID"],
    ["floor", "Floor"],
    ["group", "Group"],
    ["hidden_by", "Hidden by"],
    ["integration", "Integration"],
    ["label", "Label"],
    ["last_changed", "Last Changed"],
    ["last_triggered", "Last Triggered"],
    ["last_updated", "Last Updated"],
    ["level", "Level"],
    ["device_manufacturer", "Manufacturer"],
    ["device_model", "Model"],
    ["name", "Name"],
    ["state", "State"],
    ["state_translated", "State Translated"],
  ],
};

// Smart selector function that returns appropriate UI controls based on filter key
const getFilterValueSelector = (key: string, hass?: any) => {
  const baseSelectors: Record<string, any> = {
    attributes: { object: {} },
    area: { area: {} },
    device: { device: {} },
    entity_id: { entity: {} },
    floor: { floor: {} },
    group: { entity: { filter: { domain: "group" } } },
    integration: { config_entry: {} },
    label: { label: {} },
  };

  // Selectors with custom dropdowns for better UX
  const customSelectors: Record<string, any> = {
    domain: {
      select: {
        options: hass ? getDomains(hass) : [],
        custom_value: true,
      }
    },
    entity_category: {
      select: {
        options: [
          { value: "config", label: "Config" },
          { value: "diagnostic", label: "Diagnostic" },
        ],
        custom_value: true,
      }
    },
    hidden_by: {
      select: {
        options: [
          { value: "user", label: "User" },
          { value: "integration", label: "Integration" },
        ],
        custom_value: true,
      }
    },
    state: {
      select: {
        options: [
          { value: "on", label: "On" },
          { value: "off", label: "Off" },
          { value: "home", label: "Home" },
          { value: "away", label: "Away" },
          { value: "unavailable", label: "Unavailable" },
          { value: "unknown", label: "Unknown" },
          { value: "idle", label: "Idle" },
          { value: "playing", label: "Playing" },
          { value: "paused", label: "Paused" },
          { value: "locked", label: "Locked" },
          { value: "unlocked", label: "Unlocked" },
          { value: "open", label: "Open" },
          { value: "closed", label: "Closed" },
          { value: "opening", label: "Opening" },
          { value: "closing", label: "Closing" },
        ],
        custom_value: true,
      }
    },
  };

  return { ...baseSelectors, ...customSelectors }[key] ?? { text: {} };
};

export const hasSelector = (filter: FilterGroup): boolean => {
  const selectorKeys = ['attributes', 'area', 'device', 'domain', 'entity_id', 'entity_category',
    'floor', 'group', 'hidden_by', 'integration', 'label', 'state'];
  return Object.keys(filter).some((k) => selectorKeys.includes(k));
};

const ruleSchema = (hass?: HomeAssistant) => ([key, _value]: [string, any], idx: number) => {
  if (["sort", "options"].includes(key)) {
    return undefined;
  }
  if (!ruleKeySelector.options.some(([k, _v]) => k === key))
    return {
      type: "Constant",
      name: "Some rules are not shown",
      value: `The rule "${key}" is not supported by the GUI editor.
        Please switch to the CODE EDITOR to access all options.`,
    };

  return {
    type: "grid",
    name: "",
    schema: [
      {
        ...ruleKeySelector,
        name: `key_${idx}`,
        label: "Rule",
      },
      {
        name: `value_${idx}`,
        selector: getFilterValueSelector(key, hass),
        label: "",
      },
    ],
  };
};

export const postProcess = async (form: Element) => {
  await await_element(form);
  for (const grid of await selectTree(form, "$ ha-form-grid", true)) {
    await await_element(grid);
    const selector = await selectTree(
      grid,
      "$ ha-form:nth-child(2) $ ha-selector"
    );
    if (!selector) continue;
    await await_element(selector);

    let cb =
      (await selectTree(
        selector,
        "$ ha-selector-area $ ha-area-picker $ ha-combo-box"
      )) ??
      (await selectTree(
        selector,
        "$ ha-selector-device $ ha-device-picker $ ha-combo-box"
      )) ??
      (await selectTree(
        selector,
        "$ ha-selector-entity $ ha-entity-picker $ ha-combo-box"
      )) ??
      (await selectTree(
        selector,
        "$ ha-selector-label $ ha-label-picker $ ha-combo-box"
      )) ??
      (await selectTree(
        selector,
        "$ ha-selector-config_entry $ ha-config-entry-picker $ ha-combo-box"
      )) ??
      (await selectTree(
        selector,
        "$ ha-selector-floor $ ha-floor-picker $ ha-combo-box"
      )) ??
      (await selectTree(
        selector,
        "$ ha-selector-select $ ha-combo-box"
      ));

    if (cb) {
      await await_element(cb);
      cb.allowCustomValue = true;
      continue;
    }
  }
};

export const filterSchema = (group: FilterGroup, _cardType: string = "entities", hass?: HomeAssistant) => {
  const filters = { ...group };
  delete filters.options;
  delete filters.sort;

  return [
    ...Object.entries(filters).map(ruleSchema(hass)).filter(Boolean),
    {
      ...ruleKeySelector,
      name: `key_new`,
      label: "New Rule ...",
    }
  ];
};

// Options schema - dynamically configured based on card type
export const optionSchema = (group: FilterGroup, cardType: string = "entities", _hass?: HomeAssistant): any[] => {
  const isGridOrStack = ["grid", "horizontal-stack", "vertical-stack"].includes(cardType);
  const isGlance = cardType === "glance";
  const isEntities = cardType === "entities";
  const isOther = cardType === "other";

  const entityDisplayOptions: any[] = [];

  // Info message based on card type
  entityDisplayOptions.push({
    type: "constant",
    name: "Display Options Info",
    value: isGridOrStack
      ? "Configure entity cards. Select 'Tile' type for tile-based display with features."
      : "Configure how entities are displayed as rows in the card.",
  });

  // Type selector - different options based on card type
  if (!isGlance && !isOther) {
    entityDisplayOptions.push({
      name: "options_type",
      label: "Type",
      type: "select",
      options: isGridOrStack ? [
        ["tile", "Tile"],
        ["button", "Button"]
      ] : isGlance ? [
      ] : isEntities ? [
        ["button", "Button"],
        ["simple-entity", "Simple Entity"],
        ["attribute", "Attribute"],
        ["weblink", "Weblink"],
      ] : [
      ]
    });
  }

  // Conditional fields based on selected type
  const selectedType = group.options?.type;

  // Attribute field - only show when type is "attribute"
  if (selectedType === "attribute") {
    entityDisplayOptions.push({
      name: "options_attribute",
      label: "Attribute",
      selector: {
        text: {},
      },
    });
  }

  // URL field - only show when type is "weblink"
  if (selectedType === "weblink") {
    entityDisplayOptions.push({
      name: "options_url",
      label: "URL",
      selector: {
        text: {},
      },
    });
  }

  // Common options - Secondary Info only for Entities/Glance (not Grid/Stack)
  if (!isGridOrStack && selectedType !== "weblink" && selectedType !== "button") {
    entityDisplayOptions.push({
      name: "options_secondary_info",
      label: "Secondary Info",
      type: "select",
      options: [
        ["", "None"],
        ["entity-id", "Entity ID"],
        ["last-changed", "Last Changed"],
        ["last-updated", "Last Updated"],
        ["last-triggered", "Last Triggered"],
      ],
    });
  }

  // Entities-specific options
  if (isEntities) {
    entityDisplayOptions.push(
      {
        name: "options_icon",
        label: "Icon",
        selector: {
          icon: {},
        },
        context: { icon_entity: "entity" },
      },
    );
  }

  // Glance-specific options
  if (isGlance) {
    entityDisplayOptions.push(
      {
        name: "",
        type: "grid",
        schema: [
          {
            name: "options_icon",
            label: "Icon",
            selector: {
              icon: {},
            },
            context: { icon_entity: "entity" },
          },
          {
            name: "options_show_last_changed",
            label: "Show Last Changed",
            selector: {
              boolean: {},
            },
          },
        ],
      },
    );
  }

  // Tile-specific options (only for grid/stack)
  if (isGridOrStack) {
    entityDisplayOptions.push(
      {
        name: "",
        type: "grid",
        schema: [
          {
            name: "options_icon",
            label: "Icon",
            selector: {
              icon: {},
            },
            context: { icon_entity: "entity" },
          },
          {
            name: "options_color",
            label: "Color",
            selector: {
              ui_color: {
                default_color: "state",
                include_state: true,
              },
            },
          },
        ],
      },
    );

    entityDisplayOptions.push(
      {
        name: "",
        type: "grid",
        schema: [
          {
            name: "options_show_entity_picture",
            label: "Show Entity Picture",
            selector: {
              boolean: {},
            },
          },
          {
            name: "options_hide_state",
            label: "Hide State",
            selector: {
              boolean: {},
            },
          }
        ],
      },
    );

    entityDisplayOptions.push(
      {
        name: "options_state_content",
        label: "State Content",
        selector: {
          ui_state_content: {},
        },
        context: {
          filter_entity: "entity",
        },
      },
    );

    entityDisplayOptions.push(
      {
        name: "options_content_layout",
        label: "Content Layout",
        required: true,
        defaults: false,
        selector: {
          select: {
            mode: "box",
            options: ["horizontal", "vertical"].map((value) => ({
              label: value === "vertical" ? "Vertical" : "Horizontal",
              value: value === "vertical" ? "vertical" : "horizontal",
              image: {
                src: `/static/images/form/tile_content_layout_${value}.svg`,
                src_dark: `/static/images/form/tile_content_layout_${value}_dark.svg`,
                flip_rtl: true,
              },
            })),
          },
        },
      },
    );
  }

  // Advanced options section
  entityDisplayOptions.push({
    name: "options_advanced",
    label: "Additional Configuration",
    selector: { object: {} },
  });

  return entityDisplayOptions;
};

export const rule_to_form = (group: FilterGroup, hass?: HomeAssistant) => {
  const filters = { ...group };
  const options = filters.options || {};
  delete filters.options;
  delete filters.sort;

  // Extract individual option fields with options_ prefix
  const {
    type,
    attribute,
    url,
    icon,
    color,
    secondary_info,
    state_color,
    show_name,
    show_icon,
    show_state,
    show_entity_picture,
    hide_state,
    state_content,
    vertical,
    features_position,
    features,
    show_last_changed,
    ...advanced
  } = options;

  // Convert vertical boolean to content_layout string
  let content_layout: string | undefined;
  if (vertical !== undefined) {
    content_layout = vertical ? "vertical" : "horizontal";
  }

  return Object.assign(
    {},
    ...Object.entries(filters).map(([key, value], idx) => ({
      [`key_${idx}`]: key,
      [`value_${idx}`]: value,
    })),
    {
      // Add placeholder entity field for context in selectors
      entity: Object.values(filters)[0] || "",
      options_type: type,
      options_attribute: attribute,
      options_url: url,
      options_icon: icon,
      options_color: color,
      options_secondary_info: secondary_info,
      options_state_color: state_color,
      options_show_name: show_name,
      options_show_icon: show_icon,
      options_show_state: show_state,
      options_show_entity_picture: show_entity_picture,
      options_hide_state: hide_state,
      options_state_content: state_content,
      options_content_layout: content_layout,
      options_features_position: features_position,
      options_features: features,
      options_show_last_changed: show_last_changed,
      options_advanced: Object.keys(advanced).length > 0 ? advanced : undefined,
    }
  );
};

export const form_to_rule = (_config: any, filter: any): Record<string, any> => {
  const data: Record<string, any> = {};

  // Iterate through all possible indices to find all rules
  for (let i = 0; i <= 100; i++) {
    const key = filter[`key_${i}`];
    const value = filter[`value_${i}`];

    // Only add the rule if the key exists and is not empty
    if (key !== undefined && key !== null && key !== "") {
      data[key] = value ?? "";
    }
  }

  // Add new rule if specified
  if (filter.key_new !== undefined && filter.key_new !== null && filter.key_new !== "") {
    data[filter.key_new] = "";
  }

  // Build options object from individual fields with options_ prefix
  const options: Record<string, any> = {};

  if (filter.options_type !== undefined && filter.options_type !== "") {
    options.type = filter.options_type;

    // Set defaults when type is selected
    if (filter.options_type === "attribute" && (filter.options_attribute === undefined || filter.options_attribute === "")) {
      options.attribute = " ";
    } else if (filter.options_attribute !== undefined && filter.options_attribute !== "") {
      options.attribute = filter.options_attribute;
    }

    if (filter.options_type === "weblink" && (filter.options_url === undefined || filter.options_url === "")) {
      options.url = "http://homeassistant.local:8123";
    } else if (filter.options_url !== undefined && filter.options_url !== "") {
      options.url = filter.options_url;
    }
  }

  if (filter.options_icon !== undefined && filter.options_icon !== "") options.icon = filter.options_icon;
  if (filter.options_color !== undefined && filter.options_color !== "") options.color = filter.options_color;
  if (filter.options_secondary_info !== undefined && filter.options_secondary_info !== "") options.secondary_info = filter.options_secondary_info;
  if (filter.options_state_color !== undefined) options.state_color = filter.options_state_color;
  if (filter.options_show_name !== undefined) options.show_name = filter.options_show_name;
  if (filter.options_show_icon !== undefined) options.show_icon = filter.options_show_icon;
  if (filter.options_show_state !== undefined) options.show_state = filter.options_show_state;
  if (filter.options_show_entity_picture !== undefined) options.show_entity_picture = filter.options_show_entity_picture;
  if (filter.options_hide_state !== undefined) options.hide_state = filter.options_hide_state;
  if (filter.options_state_content !== undefined && filter.options_state_content !== "") options.state_content = filter.options_state_content;
  if (filter.options_content_layout !== undefined && filter.options_content_layout !== "") options.vertical = filter.options_content_layout === "vertical";
  if (filter.options_features_position !== undefined && filter.options_features_position !== "") options.features_position = filter.options_features_position;
  if (filter.options_features) options.features = filter.options_features;
  if (filter.options_show_last_changed !== undefined) options.show_last_changed = filter.options_show_last_changed;

  // Merge advanced options
  if (filter.options_advanced && typeof filter.options_advanced === "object") {
    Object.assign(options, filter.options_advanced);
  }

  // Add options if any were specified
  if (Object.keys(options).length > 0) {
    data.options = options;
  }

  return data;
};

export const nonFilterSchema = [
  {
    name: "data",
    label: " ",
    selector: { object: {} },
  },
];

export const entitiesSchema = [
  {
    name: "entities",
    label: "Entities:",
    selector: { object: {} },
  },
];

export const templateSchema = [
  {
    name: "template",
    label: "Template:",
    selector: { template: {} },
  },
];

export const sortSchema = (method?: string): any[] => {
  const schema: any[] = [
    {
      name: "method",
      label: "Sort method",
      type: "select",
      options: [
        ["domain", "Entity Domain"],
        ["entity_id", "Entity ID"],
        ["friendly_name", "Friendly Name"],
        ["name", "Name"],
        ["state", "Entity State"],
        ["last_changed", "Last Change"],
        ["last_updated", "Last Update"],
        ["last_triggered", "Last Trigger"],
        ["attribute", "Attribute"],
        ["device", "Device"],
        ["area", "Area"],
        ["manual", "Manual Order"],
      ],
    },
  ];

  if (method !== undefined && !schema[0].options.some(([k, _v]: [string, string]) => k === method))
    return [
      {
        type: "Constant",
        name: "GUI editor not available",
        value: `Sorting by ${method} is not supported by the GUI editor.
        Please switch to the CODE EDITOR to access all options.`,
      },
    ];

  if (method === "attribute") {
    schema.push({
      name: "attribute",
      label: "Attribute:",
      selector: { object: {} },
    });
  }

  // Sort options in a grid layout
  schema.push({
    type: "grid",
    name: "",
    schema: [
      { name: "reverse", type: "boolean", label: "Reverse" },
      { name: "ignore_case", type: "boolean", label: "Ignore case" },
      { name: "numeric", type: "boolean", label: "Numeric sort" },
      { name: "ip", type: "boolean", label: "IP address sort" },
    ],
  });

  // Pagination options with proper number selectors
  schema.push({
    type: "grid",
    name: "",
    schema: [
      {
        name: "first",
        label: "Skip first N entities",
        selector: { number: { min: 0, mode: "box" } },
      },
      {
        name: "count",
        label: "Max entities",
        selector: { number: { min: 1, mode: "box" } },
      },
    ],
  });

  return schema;
};

export const cardOptionsSchema: any[] = [
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "show_empty",
        type: "boolean",
        label: "Show if empty",
      },
      {
        name: "card_param",
        type: "string",
        label: "Parameter to populate",
      },
    ],
  },
];

// Schema for entity content customization
export const entityContentSchema: any[] = [
  {
    name: "name",
    label: "Name",
    selector: {
      text: {},
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "icon",
        selector: {
          icon: {},
        },
        context: { icon_entity: "entity" },
      },
      {
        name: "color",
        selector: {
          ui_color: {
            default_color: "state",
            include_state: true,
          },
        },
      },
    ],
  },
];

// Schema for entity appearance - dynamically generated based on card type
export const entityAppearanceSchema = (cardType: string = "entities"): any[] => {
  const isGridOrTile = ["grid", "horizontal-stack", "vertical-stack"].includes(cardType);

  if (isGridOrTile) {
    return [
      {
        name: "state_content",
        label: "State Content",
        selector: {
          ui_state_content: {},
        },
        context: {
          filter_entity: "entity",
        },
      },
      {
        name: "content_layout",
        label: "Content Layout",
        required: true,
        defaults: false,
        selector: {
          select: {
            mode: "box",
            options: ["horizontal", "vertical"].map((value) => ({
              label: value === "vertical" ? "Vertical" : "Horizontal",
              value: value === "vertical" ? "vertical" : "horizontal",
              image: {
                src: `/static/images/form/tile_content_layout_${value}.svg`,
                src_dark: `/static/images/form/tile_content_layout_${value}_dark.svg`,
                flip_rtl: true,
              },
            })),
          },
        },
      },
    ];
  } else {
    return [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "state_color",
            label: "State Color",
            selector: { boolean: {} },
          },
          {
            name: "secondary_info",
            label: "Secondary Info",
            selector: {
              select: {
                options: [
                  { value: "", label: "Default" },
                  { value: "entity-id", label: "Entity ID" },
                  { value: "last-changed", label: "Last Changed" },
                  { value: "last-updated", label: "Last Updated" },
                  { value: "last-triggered", label: "Last Triggered" },
                ],
                custom_value: true,
              },
            },
          },
        ],
      },
    ];
  }
};

// Schema for entity interaction (tap actions, etc.)
export const entityInteractionSchema: any[] = [
  {
    name: "tap_action",
    label: "Tap Action",
    selector: {
      ui_action: {
        default_action: "more-info",
      },
    },
  },
  {
    name: "hold_action",
    label: "Hold Action",
    selector: {
      ui_action: {
        default_action: "none",
      },
    },
  },
  {
    name: "double_tap_action",
    label: "Double Tap Action",
    selector: {
      ui_action: {
        default_action: "none",
      },
    },
  },
];

// Card configuration schema
export const cardConfigSchema = (cardType: string = "entities"): any[] => {
  const isGridOrStack = ["grid", "horizontal-stack", "vertical-stack"].includes(cardType);
  const isGrid = cardType === "grid";
  const isGlance = cardType === "glance";
  const isEntities = cardType === "entities";

  const schema: any[] = [
    {
      type: "constant",
      name: "Card Config Info",
      value: isGridOrStack
        ? "Grid and Stack cards display each entity as a separate card. Perfect for Tile cards!"
        : cardType === "other"
          ? "Enter a custom card type below (e.g., 'custom:my-card')."
          : "Entities and Glance cards display entities as rows within the card.",
    },
    {
      name: "card_type",
      label: "Card Type",
      type: "select",
      options: [
        ["entities", "Entities"],
        ["glance", "Glance"],
        ["grid", "Grid"],
        ["horizontal-stack", "Horizontal Stack"],
        ["vertical-stack", "Vertical Stack"],
        ["other", "Other"],
      ],
    },
  ];

  // Custom card type text field (shown when "Other" is selected)
  if (cardType === "other") {
    schema.push({
      name: "custom_card_type",
      label: "Custom Card Type",
      type: "string",
      selector: { text: {} },
    });
  }

  // Entities-specific options
  if (isEntities) {
    schema.push({
      type: "grid",
      name: "",
      schema: [
        {
          name: "title",
          label: "Title",
          selector: { text: {} },
        },
        {
          name: "icon",
          label: "Icon",
          selector: {
            icon: {},
          },
        },
        {
          name: "show_header_toggle",
          label: "Show Header Toggle",
          type: "boolean",
        },
        {
          name: "state_color",
          label: "State Color",
          type: "boolean",
        },
      ],
    });
  }

  // Glance-specific options
  if (isGlance) {
    schema.push({
      type: "grid",
      name: "",
      schema: [
        {
          name: "title",
          label: "Title",
          selector: { text: {} },
        },
        {
          name: "columns",
          label: "Columns",
          selector: { number: { min: 1, max: 12, mode: "box" } },
        },
        {
          name: "show_state",
          label: "Show State",
          type: "boolean",
        },
        {
          name: "show_icon",
          label: "Show Icon",
          type: "boolean",
        },
        {
          name: "show_name",
          label: "Show Name",
          type: "boolean",
        },
      ],
    });
  }

  // Grid-specific options
  if (isGrid) {
    schema.push({
      name: "title",
      label: "Title",
      selector: { text: {} },
    });

    schema.push({
      type: "grid",
      name: "",
      schema: [
        {
          name: "grid_columns",
          label: "Columns",
          selector: { number: { min: 1, max: 12, mode: "box" } },
        },
        {
          name: "grid_square",
          label: "Square tiles",
          type: "boolean",
        }
      ],
    });
  }

  // Display options - always available
  schema.push({
    name: "show_empty",
    type: "boolean",
    label: "Show card when empty",
  });

  return schema;
};
