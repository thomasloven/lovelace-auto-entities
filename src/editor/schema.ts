import { await_element, selectTree } from "../helpers/selecttree";
const GUI_EDITOR_RULES = [
  "none",
  "domain",
  "entity_id",
  "state",
  "name",
  "group",
  "area",
  "device",
  "device_manufacturer",
  "device_model",
  "attributes",
  "last_changed",
  "last_updated",
  "last_triggered",
  "entity_category",
  "integration",
  "hidden_by",
  "label",
];

const ruleKeySelector = {
  type: "select",
  options: [
    ["area", "Area"],
    ["attributes", "Attribute"],
    ["device", "Device"],
    ["domain", "Domain"],
    ["entity_category", "Entity Category"],
    ["entity_id", "Entity ID"],
    ["group", "Group"],
    ["hidden_by", "Hidden by"],
    ["integration", "Integration"],
    ["label", "Label"],
    ["last_changed", "Last Changed"],
    ["last_triggered", "Last Triggered"],
    ["last_updated", "Last Updated"],
    ["device_manufacturer", "Manufacturer"],
    ["device_model", "Model"],
    ["name", "Name"],
    ["state", "State"],
  ],
};

const customValueRules = [
  "area",
  "device",
  "entity_id",
  "group",
  "integration",
  "label",
];

const ruleSchema = ([key, value], idx) => {
  const isID = (value) => {
    if (value === "") return true;
    if (/^[0-9A-F]{32}/i.test(value)) return true;
    return false;
  };
  const filterValueSelector = {
    attributes: { object: {} },
    area: { area: {} },
    device: { device: {} },
    entity_id: { entity: {} },
    group: { entity: { filter: { domain: "group" } } },
    integration: { config_entry: {} },
    label: { label: {} },
  };

  if (!GUI_EDITOR_RULES.includes(key))
    return {
      type: "Constant",
      name: "Some rules are not shown",
      value: "Please switch to the CODE EDITOR to access all options.",
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
        selector: filterValueSelector[key] ?? { text: {} },
        label: "",
      },
    ],
  };
};

export const postProcess = async (form: Element) => {
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
      ));

    if (cb) {
      await await_element(cb);
      cb.allowCustomValue = true;
      continue;
    }
  }
};

export const filterSchema = (group) => {
  const filters = { ...group };
  delete filters.options;
  return [
    ...Object.entries(filters).map(ruleSchema),
    {
      ...ruleKeySelector,
      name: `key_new`,
      label: "Rule ...",
    },
  ];
};

export const rule_to_form = (group) => {
  const filters = { ...group };
  delete filters.options;
  return Object.assign(
    {},
    ...Object.entries(filters).map(([key, value], idx) => ({
      [`key_${idx}`]: key,
      [`value_${idx}`]: value,
    }))
  );
};

export const form_to_rule = (config, filter): Object => {
  const data = {};
  for (let i = 0; i <= config.filter.include.length + 1; i++) {
    if (filter[`key_${i}`] !== undefined)
      data[filter[`key_${i}`]] = filter[`value_${i}`] ?? "";
  }
  if (filter.key_new !== undefined) {
    data[filter.key_new] = "";
  }
  return data;
};

export const filterOptionsSchema = [
  {
    name: "options",
    label: "Options:",
    selector: { object: {} },
  },
];

export const nonFilterSchema = [
  {
    name: "data",
    selector: { object: {} },
  },
];

export const sortSchema = [
  {
    name: "method",
    label: "Sort method",
    type: "select",
    options: [
      ["domain", "Entity Domain"],
      ["entity_id", "Entity ID"],
      ["friendly_name", "Friendly Name"],
      ["state", "Entity State"],
      ["last_changed", "Last Change"],
      ["last_updated", "Last Update"],
      ["last_triggered", "Last Trigger"],
    ],
  },
  {
    type: "constant",
    name: "Sorting options:",
    value: "",
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "reverse", type: "boolean", label: "Reverse" },
      { name: "ignore_case", type: "boolean", label: "Ignore case" },
      { name: "numeric", type: "boolean", label: "Numeric sort" },
      { name: "ip", type: "boolean", label: "IP address sort" },
    ],
  },
];

export const cardOptionsSchema = [
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
