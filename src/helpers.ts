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
export async function getAreas(hass) {
  cache.areas =
    cache.areas ?? (await hass.callWS({ type: "config/area_registry/list" }));
  return cache.areas;
}
export function cached_areas() {
  return cache.areas;
}
export async function getDevices(hass) {
  cache.devices =
    cache.devices ??
    (await hass.callWS({ type: "config/device_registry/list" }));
  return cache.devices;
}
export function cached_devices() {
  return cache.devices;
}
export async function getEntities(hass) {
  cache.entities =
    cache.entities ??
    (await hass.callWS({ type: "config/entity_registry/list" }));
  return cache.entities;
}
export function cached_entities() {
  return cache.entities;
}

// Debugging helper
// (window as any).AutoEntities = {
//   getAreas,
//   getDevices,
//   getEntities,
// };
