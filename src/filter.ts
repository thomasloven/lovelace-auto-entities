import { HAState, HassObject, LovelaceRowConfig } from "./types";
import {
  getAreas,
  getDevices,
  getEntities,
  getLabels,
  getFloors,
} from "./helpers";
import { matcher } from "./match";
import { hass } from "./helpers/hass";

const ago_suffix_regex = /([mhd])\s+ago\s*$/i;
const default_ago_suffix = "m ago";

export const RULES: Record<
  string,
  (hass: HassObject, value: any) => Promise<(entity: HAState) => boolean>
> = {
  type: async (hass, value) => undefined,
  options: async (hass, value) => undefined,
  sort: async (hass, value) => undefined,

  domain: async (hass, value) => {
    const match = await matcher(value);
    return (entity) => match(entity.entity_id.split(".")[0]);
  },
  entity_id: async (hass, value) => {
    const match = await matcher(value);
    return (entity) => match(entity.entity_id);
  },
  state: async (hass, value) => {
    const match = await matcher(value);
    return (entity) => match(entity.state);
  },
  state_translated: async (hass, value) => {
    const match = await matcher(value);
    return (entity) => match(hass.formatEntityState(hass.states[entity.entity_id]));
  },
  name: async (hass, value) => {
    const match = await matcher(value);
    return (entity) => match(entity.attributes?.friendly_name);
  },
  group: async (hass, value) => (entity) => {
    return hass.states[value]?.attributes?.entity_id?.includes(
      entity.entity_id
    );
  },
  attributes: async (hass, value) => {
    value as Record<string, any>;
    const matchers = await Promise.all(
      Object.entries(value).map(async ([k, v]) => {
        const attr = k.split(" ")[0];
        const prepare = (obj) => attr.split(":").reduce((a, x) => a?.[x], obj);
        const match = await matcher(v);
        return { prepare, match };
      })
    );

    return (entity) =>
      matchers.every(({ prepare, match }) => match(prepare(entity.attributes)));
  },
  not: async (hass, value) => {
    const filter = await get_filter(hass, value);
    return (entity) => !filter(entity.entity_id);
  },
  and: async (hass, value) => {
    const filters = await Promise.all(value.map((v) => get_filter(hass, v)));
    return (entity) => filters.every((x) => x(entity.entity_id));
  },
  or: async (hass, value) => {
    const filters = await Promise.all(value.map((v) => get_filter(hass, v)));
    return (entity) => filters.some((x) => x(entity.entity_id));
  },
  device: async (hass, value) => {
    const [match, entities, devices] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
    ]);

    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      const dev = devices[ent.device_id];
      if (!dev) return false;
      return match(dev.id) || match(dev.name_by_user) || match(dev.name);
    };
  },
  device_manufacturer: async (hass, value) => {
    const [match, entities, devices] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
    ]);

    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      const dev = devices[ent.device_id];
      if (!dev) return false;
      return match(dev.manufacturer);
    };
  },
  device_model: async (hass, value) => {
    const [match, entities, devices] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
    ]);
    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      const dev = devices[ent.device_id];
      if (!dev) return false;
      return match(dev.model);
    };
  },
  area: async (hass, value) => {
    const [match, entities, devices, areas] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
      getAreas(hass),
    ]);

    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      let area = areas[ent.area_id];
      if (area) return match(area.name) || match(area.area_id);
      const dev = devices[ent.device_id];
      if (!dev) return false;
      area = areas[dev.area_id];
      if (!area) return false;
      return match(area.name) || match(area.area_id);
    };
  },
  floor: async (hass, value) => {
    const [match, entities, devices, areas, floors] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
      getAreas(hass),
      getFloors(hass),
    ]);
    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      let area = areas[ent.area_id];
      if (!area) {
        const dev = devices[ent.device_id];
        if (!dev) return false;
        area = areas[dev.area_id];
      }
      if (!area) return false;
      const floor = floors[area.floor_id];
      if (!floor) return false;
      return match(floor.name) || match(floor.floor_id);
    };
  },
  level: async (hass, value) => {
    const [match, entities, devices, areas, floors] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
      getAreas(hass),
      getFloors(hass),
    ]);
    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      let area = areas[ent.area_id];
      if (!area) {
        const dev = devices[ent.device_id];
        if (!dev) return false;
        area = areas[dev.area_id];
      }
      if (!area) return false;
      const floor = floors[area.floor_id];
      if (!floor) return false;
      return match(floor.level);
    };
  },
  entity_category: async (hass, value) => {
    const [match, entities] = await Promise.all([
      matcher(value),
      getEntities(hass),
    ]);

    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      return match(ent.entity_category);
    };
  },
  last_changed: async (hass, value) => {
    if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;
    const match = await matcher(value);
    return (entity) => match(entity.last_changed);
  },
  last_updated: async (hass, value) => {
    if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;
    const match = await matcher(value);
    return (entity) => match(entity.last_updated);
  },
  last_triggered: async (hass, value) => {
    if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;
    const match = await matcher(value);
    return (entity) => match(entity.attributes.last_triggered);
  },
  integration: async (hass, value) => {
    const [match, entities] = await Promise.all([
      matcher(value),
      getEntities(hass),
    ]);

    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      return match(ent.platform) || match(ent.config_entry_id);
    };
  },
  hidden_by: async (hass, value) => {
    const [match, entities] = await Promise.all([
      matcher(value),
      getEntities(hass),
    ]);

    return (entity) => {
      const ent = entities[entity.entity_id];
      if (!ent) return false;
      return match(ent.hidden_by);
    };
  },
  label: async (hass, value) => {
    const [match, entities, devices, labels] = await Promise.all([
      matcher(value),
      getEntities(hass),
      getDevices(hass),
      getLabels(hass),
    ]);

    const match_label = (lbl) => {
      if (match(lbl)) return true;
      const label = labels[lbl];
      return match(label?.name);
    };

    return (entity) => {
      const ent = entities[entity.entity_id];

      if (!ent) return false;
      if (!ent.labels) return false;
      if (ent.labels.some(match_label)) return true;

      const dev = devices[ent.device_id];
      if (!dev) return false;
      return dev.labels.some(match_label);
    };
  },
};

export async function get_filter(
  hass: HassObject,
  filter: Record<string, any>
): Promise<(entity: string | LovelaceRowConfig) => boolean> {
  const rules = (
    await Promise.all(
      Object.entries(filter).map(([rule, value]) => {
        rule = rule.trim().split(" ")[0].trim();
        return RULES[rule]?.(hass, value) ?? (() => false);
      })
    )
  )
    .filter((r) => r !== undefined)
    .filter(Boolean);

  return (entity: string | LovelaceRowConfig) => {
    if (!rules.length) return false;
    if (typeof entity !== "string") entity = entity.entity;
    if (!entity) return false;
    const hass_entity = hass?.states?.[entity];
    if (!hass_entity) return false;
    return rules.every((x) => x(hass_entity));
  };
}


// ---------------------------------------------------------------------------
// Performance support: split a filter into rules that only depend on the
// entity/device/area registries ("static") and everything else ("dynamic").
// Static rules never read hass.states, so their result for a given entity set
// can be cached. Dynamic rules read state and MUST be rebuilt for every hass
// object (their closures capture `hass`), exactly as get_filter() does.
// ---------------------------------------------------------------------------
const STATIC_RULES = new Set([
  "domain",
  "entity_id",
  "device",
  "device_manufacturer",
  "device_model",
  "area",
  "floor",
  "level",
  "entity_category",
  "integration",
  "hidden_by",
  "label",
]);

export const rule_name = (rule: string) => rule.trim().split(" ")[0].trim();

export function split_filter(filter: Record<string, any>) {
  const stat: [string, any][] = [];
  const dyn: [string, any][] = [];
  for (const [rule, value] of Object.entries(filter)) {
    const name = rule_name(rule);
    if (name === "type" || name === "options" || name === "sort") continue;
    (STATIC_RULES.has(name) ? stat : dyn).push([rule, value]);
  }
  return { stat, dyn };
}

// Build a predicate (HAState -> boolean) for a list of [rule, value] pairs.
// An empty list is "match everything"; a filter with no rules at all must be
// handled by the caller (get_filter matches nothing in that case).
export async function build_predicate(
  hass: HassObject,
  entries: [string, any][]
): Promise<(entity: HAState) => boolean> {
  const fns: ((e: HAState) => boolean)[] = [];
  for (const [rule, value] of entries) {
    const fn = await (RULES[rule_name(rule)]?.(hass, value) ?? (() => false));
    if (fn !== undefined) fns.push(fn);
  }
  return (e) => fns.every((x) => x(e));
}

const AGO = /([mhd])\s+ago\s*$/i;
// True if any rule (at any depth, include or exclude) depends on wall-clock time
export function is_time_dependent(obj: any): boolean {
  if (typeof obj === "string") return AGO.test(obj);
  if (Array.isArray(obj)) return obj.some(is_time_dependent);
  if (!obj || typeof obj !== "object") return false;
  return Object.entries(obj).some(
    ([k, v]) =>
      ["last_changed", "last_updated", "last_triggered"].includes(rule_name(k)) ||
      is_time_dependent(v)
  );
}

// True if the result can depend on something other than entity state objects:
// translated states (locale) or eval_js option templates (arbitrary JS).
export function has_hidden_inputs(obj: any): boolean {
  if (Array.isArray(obj)) return obj.some(has_hidden_inputs);
  if (!obj || typeof obj !== "object") return false;
  return Object.entries(obj).some(
    ([k, v]) =>
      rule_name(k) === "state_translated" ||
      (k === "eval_js" && v === true) ||
      has_hidden_inputs(v)
  );
}

// Entities named by `group:` rules (anywhere, including inside and/or/not): the rule
// reads their state/attributes even though they are not candidates themselves.
export function group_deps(obj: any, out: Set<string>) {
  if (Array.isArray(obj)) return obj.forEach((x) => group_deps(x, out));
  if (!obj || typeof obj !== "object") return;
  for (const [k, v] of Object.entries(obj)) {
    if (rule_name(k) === "group" && (typeof v !== "object" || Array.isArray(v))) out.add(String(v));
    else group_deps(v, out);
  }
}
