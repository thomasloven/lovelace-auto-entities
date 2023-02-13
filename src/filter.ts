import { HAState, HassObject } from "./types";
import { getAreas, getDevices, getEntities } from "./helpers";

const ago_suffix_regex = /([mhd])\s+ago\s*$/i;
const default_ago_suffix = "m ago";

function match(pattern: any, value: any) {
  if (typeof pattern === "string" && pattern.startsWith("$$")) {
    pattern = pattern.substring(2);
    value = JSON.stringify(value);
  }
  if (typeof value === "string" && typeof pattern === "string") {
    if (
      (pattern.startsWith("/") && pattern.endsWith("/")) ||
      pattern.indexOf("*") !== -1
    ) {
      if (!pattern.startsWith("/")) {
        // Convert globs to regex
        pattern = pattern.replace(/\./g, ".").replace(/\*/g, ".*");
        pattern = `/^${pattern}$/`;
      }
      let regex = new RegExp(pattern.slice(1, -1));
      return regex.test(value);
    }
  }

  if (typeof pattern === "string") {
    const match = ago_suffix_regex.exec(pattern);
    if (match) {
      pattern = pattern.replace(match[0], "");

      const now = new Date().getTime();
      const updated = new Date(value).getTime();
      value = (now - updated) / 60000;
      const period = match[1];
      if (period === "h") {
        value = value / 60;
      } else if (period === "d") {
        value = value / 60 / 24;
      }
    }
  }

  if (typeof pattern === "string") {
    // Comparisons assume numerical values
    if (pattern.startsWith("<="))
      return parseFloat(value) <= parseFloat(pattern.substring(2));
    if (pattern.startsWith(">="))
      return parseFloat(value) >= parseFloat(pattern.substring(2));
    if (pattern.startsWith("<"))
      return parseFloat(value) < parseFloat(pattern.substring(1));
    if (pattern.startsWith(">"))
      return parseFloat(value) > parseFloat(pattern.substring(1));
    if (pattern.startsWith("!"))
      return parseFloat(value) != parseFloat(pattern.substring(1));
    if (pattern.startsWith("="))
      return parseFloat(value) == parseFloat(pattern.substring(1));
  }

  return pattern === value;
}

const FILTERS: Record<
  string,
  (hass: HassObject, value: any, entity: HAState) => Promise<boolean>
> = {
  options: async () => true,
  sort: async () => true,
  domain: async (hass, value, entity) => {
    return match(value, entity.entity_id.split(".")[0]);
  },
  entity_id: async (hass, value, entity) => {
    return match(value, entity.entity_id);
  },
  state: async (hass, value, entity) => {
    return match(value, entity.state);
  },
  name: async (hass, value, entity) => {
    return match(value, entity.attributes?.friendly_name);
  },
  group: async (hass, value, entity) => {
    return Object.keys(hass.states).filter(k => match(value, k)).reduce((results, item) => {
      let groupedEntities = hass.states[item].attributes?.entity_id;
      if (groupedEntities) {
        return results.concat(groupedEntities);
      }
      return results;
    }, []).includes(
      entity.entity_id
    );
  },
  attributes: async (hass, value, entity) => {
    for (const [k, v] of Object.entries(value as Record<string, any>)) {
      let attr = k.split(" ")[0]; // Remove any suffixes
      let obj = entity.attributes;
      for (const step of attr.split(":")) {
        obj = obj ? obj[step] : undefined;
      }
      if (obj === undefined || !match(v, obj)) return false;
    }
    return true;
  },
  not: async (hass, value, entity) => {
    return !(await filter_entity(hass, value, entity.entity_id));
  },
  and: async (hass, value, entity) => {
    for (const v of value) {
      if (!(await filter_entity(hass, v, entity.entity_id))) return false;
    }
    return true;
  },
  or: async (hass, value, entity) => {
    for (const v of value) {
      if (await filter_entity(hass, v, entity.entity_id)) return true;
    }
    return false;
  },
  device: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
    if (!device) return false;
    return match(value, device.name_by_user) || match(value, device.name);
  },
  device_manufacturer: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
    if (!device) return false;
    return match(value, device.manufacturer);
  },
  device_model: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
    if (!device) return false;
    return match(value, device.model);
  },
  area: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    let area = (await getAreas(hass)).find((a) => a.area_id === ent.area_id);
    if (area) return match(value, area.name) || match(value, area.area_id);
    const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
    if (!device) return false;
    area = (await getAreas(hass)).find((a) => a.area_id === device.area_id);
    if (!area) return false;
    return match(value, area.name) || match(value, area.area_id);
  },
  entity_category: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    return match(value, ent.entity_category);
  },
  last_changed: async (hass, value, entity) => {
    if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;

    return match(value, entity.last_changed);
  },
  last_updated: async (hass, value, entity) => {
    if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;

    return match(value, entity.last_updated);
  },
  last_triggered: async (hass, value, entity) => {
    if (entity.attributes.last_triggered == null) return false;
    if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;

    return match(value, entity.attributes.last_triggered);
  },
  integration: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    return match(value, ent.platform);
  },
  hidden_by: async (hass, value, entity) => {
    const ent = (await getEntities(hass)).find(
      (e) => e.entity_id === entity.entity_id
    );
    if (!ent) return false;
    return match(value, ent.hidden_by);
  },
};

export async function filter_entity(
  hass: HassObject,
  filter: Record<string, any>,
  entity_id: string
): Promise<boolean> {
  if (!hass.states[entity_id]) return false;
  for (let [k, v] of Object.entries(filter)) {
    k = k.trim().split(" ")[0].trim();
    if (!(await FILTERS[k]?.(hass, v, hass.states[entity_id]))) return false;
  }
  return true;
}
