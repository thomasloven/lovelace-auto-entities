import { HassObject, HAState } from "./types";
import {
  getAreas,
  getDevices,
  getEntities,
  getEntityAreas,
  getLabels,
} from "./helpers";

const ago_suffix_regex = /([mhd])\s+ago\s*$/i;
const default_ago_suffix = "m ago";

async function match(pattern: any): Promise<(value: any) => boolean> {
  let valueTransformers: Array<(x: any) => unknown> = [];
  function transformValue(value) {
    return valueTransformers.reduce((a, x) => x(a), value);
  }

  let predicates: Array<[(value: any) => boolean, (value: any) => boolean]> =
    [];

  if (typeof pattern === "string") {
    if (pattern.startsWith("$$")) {
      pattern = pattern.substring(2);
      valueTransformers.push(JSON.stringify);
    }

    if (
      (pattern.startsWith("/") && pattern.endsWith("/")) ||
      pattern.indexOf("*") !== -1
    ) {
      if (!pattern.startsWith("/")) {
        // Convert globs to regex
        pattern = pattern.replace(/\./g, ".").replace(/\*/g, ".*");
        pattern = `/^${pattern}$/`;
      }
      const regex = new RegExp(pattern.slice(1, -1));
      predicates.push([
        (value) => typeof value === "string",
        (value) => regex.test(value),
      ]);
    }

    const match = ago_suffix_regex.exec(pattern);
    if (match) {
      pattern = pattern.replace(match[0], "");

      const now = new Date().getTime();
      valueTransformers.push((value) => {
        const updated = new Date(value).getTime();
        value = (now - updated) / 60000;
        const period = match[1];
        if (period === "h") {
          value = value / 60;
        } else if (period === "d") {
          value = value / 60 / 24;
        }
      });
    }

    // Comparisons assume numerical values
    if (pattern.startsWith("<=")) {
      const parameter = parseFloat(pattern.substring(2));
      predicates.push([() => true, (value) => parseFloat(value) <= parameter]);
    }
    if (pattern.startsWith(">=")) {
      const parameter = parseFloat(pattern.substring(2));
      predicates.push([() => true, (value) => parseFloat(value) >= parameter]);
    }
    if (pattern.startsWith("<")) {
      const parameter = parseFloat(pattern.substring(1));
      predicates.push([() => true, (value) => parseFloat(value) < parameter]);
    }
    if (pattern.startsWith(">")) {
      const parameter = parseFloat(pattern.substring(1));
      predicates.push([() => true, (value) => parseFloat(value) > parameter]);
    }
    if (pattern.startsWith("!")) {
      const parameter = parseFloat(pattern.substring(1));
      predicates.push([() => true, (value) => parseFloat(value) != parameter]);
    }
    if (pattern.startsWith("=")) {
      const parameter = parseFloat(pattern.substring(1));
      predicates.push([() => true, (value) => parseFloat(value) == parameter]);
    }
  }

  predicates.push([() => true, (value) => pattern === value]);

  return (value) => {
    const transformedValue = transformValue(value);
    const predicate = predicates.find(([valid, predicate]) =>
      valid(transformedValue)
    )[1];
    return predicate(transformedValue);
  };
}

const FILTERS: Record<
  string,
  (hass: HassObject, value: any) => Promise<(entity: HAState) => boolean>
> = {
  options: async (hass, value) => (entity) => true,
  sort: async (hass, value) => (entity) => true,
  domain: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => matcher(entity.entity_id.split(".")[0]);
  },
  entity_id: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => matcher(entity.entity_id);
  },
  state: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => matcher(entity.state);
  },
  name: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => matcher(entity.attributes?.friendly_name);
  },
  group: async (hass, value) => (entity) => {
    return hass.states[value]?.attributes?.entity_id?.includes(
      entity.entity_id
    );
  },
  attributes: async (hass, value: Record<string, any>) => {
    let filters = (
      await Promise.all(
        Object.entries(value).map(async ([k, v]) => {
          const attr = k.split(" ")[0]; // Remove any suffixes
          const steps = attr.split(":");
          const stepper = (obj) => steps.reduce((a, x) => a?.[x], obj);
          const matcher = await match(v);
          return { stepper, matcher };
        })
      )
    ).map(({ stepper, matcher }) => (entity) => {
      const obj = stepper(entity.attributes);
      return obj !== undefined && matcher(obj);
    });
    return (entity) => !filters.map((filter) => filter(entity)).includes(false);
  },
  not: async (hass, value) => {
    const [filter] = await Promise.all([filter_entity(hass, value)]);
    return (entity) => !filter(entity.entity_id);
  },
  and: async (hass, value) => {
    const filters = await Promise.all(value.map((v) => filter_entity(hass, v)));
    return (entity) => !filters.some((filter) => !filter(entity));
  },
  or: async (hass, value) => {
    const filters = await Promise.all(value.map((v) => filter_entity(hass, v)));
    return (entity) => filters.some((filter) => filter(entity));
  },
  device: async (hass, value) => {
    const [entities, devices, matcher] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
      match(value),
    ]);
    return (entity) => {
      const ent = entities.get(entity.entity_id);
      if (!ent) return false;
      const device = devices.get(ent.device_id);
      if (!device) return false;
      return matcher(device.name_by_user) || matcher(device.name);
    };
  },
  device_manufacturer: async (hass, value) => {
    const [entities, devices, matcher] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
      match(value),
    ]);
    return (entity) => {
      const ent = entities.get(entity.entity_id);
      if (!ent) return false;
      const device = devices.get(ent.device_id);
      if (!device) return false;
      return matcher(device.manufacturer);
    };
  },
  device_model: async (hass, value) => {
    const [entities, devices, matcher] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
      match(value),
    ]);
    return (entity) => {
      const ent = entities.get(entity.entity_id);
      if (!ent) return false;
      const device = devices.get(ent.device_id);
      if (!device) return false;
      return matcher(device.model);
    };
  },
  area: async (hass, value) => {
    const [entityAreas, areas, matcher] = await Promise.all([
      getEntityAreas(hass),
      getAreas(hass),
      match(value),
    ]);
    return (entity) => {
      const area = areas.get(entityAreas.get(entity.entity_id));
      if (!area) return false;
      return (
        (area.name !== undefined && matcher(area.name)) ||
        (area.area_id !== undefined && matcher(area.area_id))
      );
    };
  },
  entity_category: async (hass, value) => {
    const [entities, matcher] = await Promise.all([
      getEntities(hass),
      match(value),
    ]);
    return (entity) => {
      const ent = entities.get(entity.entity_id);
      if (!ent) return false;
      return matcher(ent.entity_category);
    };
  },
  last_changed: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => {
      if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;

      return matcher(entity.last_changed);
    };
  },
  last_updated: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => {
      if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;

      return matcher(entity.last_updated);
    };
  },
  last_triggered: async (hass, value) => {
    const [matcher] = await Promise.all([match(value)]);
    return (entity) => {
      if (entity.attributes.last_triggered == null) return false;
      if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;

      return matcher(entity.attributes.last_triggered);
    };
  },
  integration: async (hass, value) => {
    const [entities, matcher] = await Promise.all([
      getEntities(hass),
      match(value),
    ]);
    return (entity) => {
      const ent = entities.get(entity.entity_id);
      if (!ent) return false;
      return matcher(ent.platform);
    };
  },
  hidden_by: async (hass, value) => {
    const [entities, matcher] = await Promise.all([
      getEntities(hass),
      match(value),
    ]);
    return (entity) => {
      const ent = entities.get(entity.entity_id);
      if (!ent) return false;
      return matcher(ent.hidden_by);
    };
  },
  label: async (hass, value) => {
    const [entities, devices, labels, matcher] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
      getLabels(hass),
      match(value),
    ]);
    const match_label = (lbl) => {
      if (matcher(lbl)) return true;
      const label = labels.get(lbl);
      if (!label) return false;
      const result = matcher(label.name);
      return result;
    };
    return (entity) => {
      const ent = entities.get(entity.entity_id);

      if (!ent) return false;
      if (!ent.labels) return false;
      const entity_match = ent.labels.some((lbl) => match_label(lbl));
      if (entity_match) return entity_match;

      const device = devices.get(ent.device_id);
      if (!device) return false;
      const device_match = device.labels.some((lbl) => match_label(lbl));
      return device_match;
    };
  },
};

export async function filter_entity(
  hass: HassObject,
  filter: Record<string, any>
): Promise<(entity_id: string) => boolean> {
  const filters = (
    await Promise.all(
      Object.entries(filter).map(([k, v]) =>
        FILTERS[k.trim().split(" ")[0].trim()]?.(hass, v)
      )
    )
  ).filter(Boolean);
  return (entity_id: string) => {
    const entity = hass?.states?.[entity_id];
    if (!entity) return false;
    return !filters.some((filter) => !filter(entity));
  };
}
