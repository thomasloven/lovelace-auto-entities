import type { HassObject } from "./types";

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

function makeCache<T extends (...args: unknown[]) => Promise<unknown>>(
  name: string,
  loader: T
): T extends (...args: infer R) => Promise<infer S>
  ? {
      get_cached: () => Promise<S>;
      get: (...args: R) => Promise<S>;
    }
  : never;
function makeCache<T extends (...args: unknown[]) => Promise<unknown>>(
  name: string,
  loader: T
): {
  get_cached: () => Promise<Awaited<ReturnType<T>>>;
  get: (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
} {
  function refresh<T>() {
    let loading = false;
    let resolve, reject;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const load = (loader: () => Promise<T>) => {
      if (!loading) {
        loading = true;
        try {
          loader().then(resolve, reject);
        } catch (e) {
          loading = false;
          if (e !== undefined) throw e;
        }
      }
      return promise;
    };
    return { promise, resolve, reject, load };
  }
  let cache = refresh<Awaited<ReturnType<T>>>();
  async function get_cached(): Promise<Awaited<ReturnType<T>>> {
    return await cache.promise;
  }
  async function get(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    try {
      return await cache.load(
        () => loader(...args) as Promise<Awaited<ReturnType<T>>>
      );
    } catch (e) {
      if (e !== undefined) console.warn(`${name} failed:`, e);
      cache = refresh();
      throw e;
    }
  }
  return {
    get_cached,
    get,
  };
}

function hassListLoader<T extends Record<string, unknown>>(
  key: keyof T,
  type: string
): (hass: HassObject) => Promise<Map<string, T & Record<string, unknown>>> {
  return (hass: HassObject) => {
    if (!hass) throw undefined;
    return (async () =>
      new Map((await hass.callWS({ type })).map((x: T) => [x[key], x])))();
  };
}

export const { get_cached: cached_devices, get: getDevices } = makeCache(
  "getDevices",
  hassListLoader<{
    id: string;
    area_id?: string | null;
    labels: Array<Record<string, unknown>>;
  }>("id", "config/device_registry/list")
);

export const { get_cached: cached_areas, get: getAreas } = makeCache(
  "getAreas",
  hassListLoader<{
    area_id: string;
    labels: Array<Record<string, unknown>>;
  }>("area_id", "config/area_registry/list")
);

export const { get_cached: cached_entities, get: getEntities } = makeCache(
  "getEntities",
  hassListLoader<{
    entity_id: string;
    device_id?: string | null;
    area_id?: string | null;
    labels: Array<Record<string, unknown>>;
  }>("entity_id", "config/entity_registry/list")
);

export const { get_cached: cached_labels, get: getLabels } = makeCache(
  "getLabels",
  hassListLoader<{
    label_id: string;
  }>("label_id", "config/label_registry/list")
);

export const { get_cached: cached_area_map, get: getEntityAreas } = makeCache(
  "getEntityAreas",
  async (hass: HassObject) => {
    const [entities, devices, areas] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
      getAreas(hass),
    ]);
    return new Map(
      Array.from(entities.values()).flatMap((entity) => {
        let area = areas.get(entity.area_id);
        if (area) return [[entity.entity_id, area.area_id]];
        const device = devices.get(entity.device_id);
        if (!device) return [];
        area = areas.get(device.area_id);
        if (area) return [[entity.entity_id, area.area_id]];
        return [];
      })
    );
  }
);

// Debugging helper
// (window as any).AutoEntities = {
//   getDevices,
//   getAreas,
//   getEntities,
//   getLabels,
//   getEntityAreas,
// };
