const GUI_EDITOR_FILTERS = [
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
];

const filterKeySelector = {
  type: "select",
  options: [
    ["domain", "Entity Domain"],
    ["entity_id", "Entity ID"],
    ["state", "Entity State"],
    ["name", "Friendly Name"],
    ["group", "Member of Group"],
    ["area", "In area"],
    ["device", "Device"],
    ["device_manufacturer", "Device Manufacturer"],
    ["device_model", "Device Model"],
    ["attributes", "Attribute"],
    ["last_changed", "Last Change"],
    ["last_updated", "Last Update"],
    ["last_triggered", "Last Trigger"],
    ["entity_category", "Entity Category"],
    ["integration", "Governing integration"],
    ["hidden_by", "Hidden by"],
  ],
};

const filterSchema = ([key, value], idx) => {
  const filterValueSelector = {
    attributes: { object: {} },
  };

  if (!GUI_EDITOR_FILTERS.includes(key))
    return {
      type: "Constant",
      name: "Some filters are not shown",
      value: "Please switch to the CODE EDITOR to access all options.",
    };

  return {
    type: "grid",
    name: "",
    schema: [
      {
        ...filterKeySelector,
        name: `key_${idx}`,
        label: "Property",
      },
      {
        name: `value_${idx}`,
        selector: filterValueSelector[key] ?? { text: {} },
        label: "Value",
      },
    ],
  };
};

export const filterGroupSchema = (group) => {
  const filters = { ...group };
  delete filters.options;
  return [
    ...Object.entries(filters).map(filterSchema),
    {
      ...filterKeySelector,
      name: `key_new`,
      label: "Select property",
    },
  ];
};

export const filter2form = (group) => {
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

export const form2filter = (config, filter): Object => {
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

export const filterGroupOptionsSchema = [
  {
    name: "options",
    selector: { object: {} },
  },
];

export const specialGroupSchema = [
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
