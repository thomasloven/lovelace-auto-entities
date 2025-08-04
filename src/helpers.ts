import { HassObject } from "./types";

export const loadHaForm = async () => {
  if (customElements.get("ha-form")) return;

  const helpers = await (window as any).loadCardHelpers?.();
  if (!helpers) return;
  const card = await helpers.createCardElement({ type: "entity" });
  if (!card) return;
  await card.getConfigElement();
};

export const compare_deep = (a: any, b: any) => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (!(a instanceof Object && b instanceof Object)) return false;
  for (const x in a) {
    if (!a.hasOwnProperty(x)) continue;
    if (!b.hasOwnProperty(x)) return false;
    if (a[x] === b[x]) continue;
    if (typeof a[x] !== "object") return false;
    if (!compare_deep(a[x], b[x])) return false;
  }
  for (const x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (!a.hasOwnProperty(x)) return false;
  }
  return true;
};

(window as any).autoEntities_cache = (window as any).autoEntities_cache ?? {};
const cache = (window as any).autoEntities_cache;
export function getAreas(hass) {
  cache.areas =
    cache.areas ?? cacheByProperty(hass, "area", "area_id");
  return cache.areas;
}
export function getFloors(hass) {
  cache.floors =
    cache.floors ?? cacheByProperty(hass, "floor", "floor_id");
  return cache.floors;
}
export function getDevices(hass) {
  cache.devices =
    cache.devices ?? cacheByProperty(hass, "device", "id");
  return cache.devices;
}
export function getEntities(hass) {
  cache.entities =
    cache.entities ?? cacheByProperty(hass, "entity", "entity_id");
  return cache.entities;
}
export function getLabels(hass) {
  cache.labels =
    cache.labels ?? cacheByProperty(hass, "label", "label_id");
  return cache.labels;
}

function cacheByProperty<T>(
  hass: HassObject,
  type: string,
  property: keyof T,
): Promise<Record<string, T>> {
  return hass.callWS({ type: `config/${type}_registry/list` }).then((items: T[]) => {
    return items.reduce((acc, item) => {
      const key = item[property];
      if (typeof key === "string" || typeof key === "number") {
        acc[String(key)] = item;
      }
      return acc;
    }, {} as Record<string, T>);
  });
}

// Debugging helper
// (window as any).AutoEntities = {
//   getAreas,
//   getDevices,
//   getEntities,
//   getLabels,
//   getFloors,
// };
