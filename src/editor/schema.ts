import { await_element, selectTree } from "../helpers/selecttree";
import { localize, TranslationKey } from "../localize";

const ruleKeys = [
  "area",
  "attributes",
  "device",
  "domain",
  "entity_category",
  "entity_id",
  "floor",
  "group",
  "hidden_by",
  "integration",
  "label",
  "last_changed",
  "last_triggered",
  "last_updated",
  "level",
  "device_manufacturer",
  "device_model",
  "name",
  "state",
  "state_translated",
];

const ruleKeySelector = (hass) => ({
  type: "select",
  options: ruleKeys
    .map((key): [string, string] => [
      key,
      localize(`rule.${key}` as TranslationKey, hass),
    ])
    .sort(([, a], [, b]) => a.localeCompare(b)),
});

const filterValueSelector = {
  attributes: { object: {} },
  area: { area: {} },
  device: { device: {} },
  entity_id: { entity: {} },
  floor: { floor: {} },
  group: { entity: { filter: { domain: "group" } } },
  integration: { config_entry: {} },
  label: { label: {} },
};

export const hasSelector = (filter) => {
  return Object.keys(filter).some((k) => k in filterValueSelector);
};

const ruleSchema = (hass, [key, value], idx) => {
  if (["sort", "optios"].includes(key)) {
    return undefined;
  }
  if (!ruleKeys.includes(key))
    return {
      type: "Constant",
      name: "Some rules are not shown",
      label: localize("filter.unsupported_title", hass),
      value: localize("filter.unsupported_rule", hass, { rule: key }),
    };

  return {
    type: "grid",
    name: "",
    schema: [
      {
        ...ruleKeySelector(hass),
        name: `key_${idx}`,
        label: localize("filter.rule", hass),
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
      ));

    if (cb) {
      await await_element(cb);
      cb.allowCustomValue = true;
      continue;
    }
  }
};

export const filterSchema = (hass, group) => {
  const filters = { ...group };
  delete filters.options;
  return [
    ...Object.entries(filters)
      .map((rule, idx) => ruleSchema(hass, rule, idx))
      .filter(Boolean),
    {
      ...ruleKeySelector(hass),
      name: `key_new`,
      label: localize("filter.new_rule", hass),
    },
    {
      name: "options",
      label: localize("filter.options", hass),
      selector: { object: {} },
    },
  ];
};

export const rule_to_form = (group) => {
  const filters = { ...group };
  const options = { ...group.options };
  delete filters.options;
  return Object.assign(
    {},
    ...Object.entries(filters).map(([key, value], idx) => ({
      [`key_${idx}`]: key,
      [`value_${idx}`]: value,
    })),
    { options }
  );
};

export const form_to_rule = (config, filter): Object => {
  const data = {};
  data["options"] = filter.options;
  for (let i = 0; i <= config.filter.include.length + 1; i++) {
    if (filter[`key_${i}`] !== undefined)
      data[filter[`key_${i}`]] = filter[`value_${i}`] ?? "";
  }
  if (filter.key_new !== undefined) {
    data[filter.key_new] = "";
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

export const entitiesSchema = (hass) => [
  {
    name: "entities",
    label: localize("filter.entities", hass),
    selector: { object: {} },
  },
];
export const templateSchema = (hass) => [
  {
    name: "template",
    label: localize("filter.template", hass),
    selector: { template: {} },
  },
];

export const sortSchema = (hass, method) => {
  const schema: any[] = [
    {
      name: "method",
      label: localize("sort.method", hass),
      type: "select",
      options: [
        ["domain", localize("sort.domain", hass)],
        ["entity_id", localize("sort.entity_id", hass)],
        ["friendly_name", localize("sort.friendly_name", hass)],
        ["state", localize("sort.state", hass)],
        ["last_changed", localize("sort.last_changed", hass)],
        ["last_updated", localize("sort.last_updated", hass)],
        ["last_triggered", localize("sort.last_triggered", hass)],
        ["attribute", localize("sort.attribute", hass)],
      ],
    },
    {
      type: "constant",
      name: "Sorting options:",
      label: localize("sort.options", hass),
      value: "",
    },
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "reverse",
          type: "boolean",
          label: localize("sort.reverse", hass),
        },
        {
          name: "ignore_case",
          type: "boolean",
          label: localize("sort.ignore_case", hass),
        },
        {
          name: "numeric",
          type: "boolean",
          label: localize("sort.numeric", hass),
        },
        {
          name: "ip",
          type: "boolean",
          label: localize("sort.ip", hass),
        },
      ],
    },
  ];

  if (method !== undefined && !schema[0].options.some(([k, v]) => k === method))
    return [
      {
        type: "Constant",
        name: "GUI editor not available",
        label: localize("sort.unsupported_title", hass),
        value: localize("sort.unsupported_method", hass, { method }),
      },
    ];

  if (method == "attribute") schema.push();
  schema.push({
    name: "attribute",
    label: localize("sort.attribute_field", hass),
    selector: { object: {} },
  });

  return schema;
};

export const cardOptionsSchema = (hass) => [
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "show_empty",
        type: "boolean",
        label: localize("card.show_empty", hass),
      },
      {
        name: "card_param",
        type: "string",
        label: localize("card.card_param", hass),
      },
    ],
  },
];
