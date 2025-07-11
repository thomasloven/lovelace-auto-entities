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
    return (entity) => {
      return (
        match(entity.state) ||
        match(hass.formatEntityState(hass.states[entity.entity_id]))
      );
    };
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
