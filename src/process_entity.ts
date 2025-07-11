import { getAreas, getDevices, getEntities, getLabels } from "./helpers";
import { HassObject } from "./types";

export const process_entity = async (hass: HassObject, entity, entity_id) => {
  const [entities, devices, areas] = await Promise.all([
    getEntities(hass),
    getDevices(hass),
    getAreas(hass),
  ]);

  const state = hass?.states?.[entity_id];

  const ent = entities[entity_id];
  const dev = ent ? devices[ent.device_id] : undefined;
  let area = ent ? areas[ent.area_id] : undefined;
  if (area === undefined)
    area = dev ? areas[dev.area_id] : undefined;

  let str = JSON.stringify(entity);
  str = str.replace(/this.entity_id/g, entity_id);

  // Experimental
  // ---
  // Process the entire configuration as a javascript template string
  // This lets you use ${} expressions and the variables
  // - entity_id (the entity id as a string)
  // - entity (the Entity name if applicable)
  // - device (the name of the Device the entity belongs to if applicable)
  // - area (the name of the Area the entity is in if applicable)
  // - state (the Home Assistant state object of the entity)
  if (entity.eval_js === true) {
    const evl = new Function(
      "entity_id",
      "entity",
      "device",
      "area",
      "state",
      `
        "use strict";
        return (String.raw\`${str}\`);
      `
    );
    try {
      str = evl(
        entity_id,
        ent?.name_by_user ?? ent?.name,
        dev?.name_by_user ?? dev?.name,
        area?.name_by_user ?? area?.name,
        state
      );
    } catch (error) {
      return { error: error.message };
    }
  }

  return JSON.parse(str);
};
