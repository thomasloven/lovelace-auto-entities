import { getAreas, getDevices, getEntities } from "./helpers";
import { HassObject, HAState, LovelaceRowConfig, SortConfig } from "./types";

function compare(_a: any, _b: any, method: SortConfig) {
  // lt = a before b (a < b)
  // gt = a after b (a > b)
  const [lt, gt] = method.reverse ? [1, -1] : [-1, 1];

  if (method.ignore_case) {
    _a = _a?.toLowerCase?.() ?? _a;
    _b = _b?.toLowerCase?.() ?? _b;
  }

  if (method.numeric) {
    if (!(isNaN(parseFloat(_a)) && isNaN(parseFloat(_b)))) {
      _a = isNaN(parseFloat(_a)) ? undefined : parseFloat(_a);
      _b = isNaN(parseFloat(_b)) ? undefined : parseFloat(_b);
    }
  }

  if (_a === undefined && _b === undefined) return 0;
  if (_a === undefined) return gt;
  if (_b === undefined) return lt;

  if (method.numeric) {
    if (_a === _b) return 0;
    return _a < _b ? lt : gt;
  }

  if (method.ip) {
    _a = _a.split(".");
    _b = _b.split(".");
    return (
      (method.reverse ? -1 : 1) *
      (compare(_a[0], _b[0], { method: "", numeric: true }) ||
        compare(_a[1], _b[1], { method: "", numeric: true }) ||
        compare(_a[2], _b[2], { method: "", numeric: true }) ||
        compare(_a[3], _b[3], { method: "", numeric: true }))
    );
  }

  return (
    (method.reverse ? -1 : 1) *
    String(_a).localeCompare(String(_b), undefined, method)
  );
}

const COMPARISONS: Record<
  string,
  (x: HAState, method: SortConfig, hass: HassObject, rowConfig?: LovelaceRowConfig) => any | Promise<any>
> = {
  none: (x) => 0,
  manual: (x) => 0,  // Manual sorting handled by get_sorter function
  domain: (x) => x?.entity_id?.split(".")[0],
  entity_id: (x) => x?.entity_id,
  friendly_name: (x, m, hass, rowConfig) =>
    rowConfig?.name || x?.attributes?.friendly_name || x?.entity_id?.split(".")[1],
  name: (x, m, hass, rowConfig) =>
    rowConfig?.name || x?.attributes?.friendly_name || x?.entity_id?.split(".")[1],
  device: async (x, m, hass) => {
    const [entities, devices] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
    ]);
    const ent = entities[x.entity_id];
    if (!ent) return undefined;
    const dev = devices[ent.device_id];
    if (!dev) return undefined;
    return dev.name_by_user ?? dev.name;
  },
  area: async (x, m, hass) => {
    const [entities, devices, areas] = await Promise.all([
      getEntities(hass),
      getDevices(hass),
      getAreas(hass),
    ]);
    const ent = entities[x.entity_id];
    if (!ent) return undefined;
    let area = areas[ent.area_id];
    if (area) return area.name;
    const dev = devices[ent.device_id];
    if (!dev) return undefined;
    area = areas[dev.area_id];
    if (!area) return undefined;
    return area.name;
  },
  state: (x, m, hass, rowConfig) => rowConfig?.state ?? x?.state,
  attribute: (x, m, hass, rowConfig) => {
    // First try to get from rowConfig if it has the attribute
    const attrPath = m?.attribute?.split(":");
    if (rowConfig && attrPath) {
      const rowValue = attrPath.reduce((_x, key) => _x?.[key], rowConfig);
      if (rowValue !== undefined) return rowValue;
    }
    // Fall back to entity state attributes
    return attrPath?.reduce((_x, key) => _x?.[key], x?.attributes);
  },
  last_changed: (x) => {
    if (!x?.last_changed) return undefined;
    try {
      const time = new Date(x.last_changed).getTime();
      return isNaN(time) ? undefined : time;
    } catch {
      return undefined;
    }
  },
  last_updated: (x) => {
    if (!x?.last_updated) return undefined;
    try {
      const time = new Date(x.last_updated).getTime();
      return isNaN(time) ? undefined : time;
    } catch {
      return undefined;
    }
  },
  last_triggered: (x) => {
    if (!x?.attributes?.last_triggered) return undefined;
    try {
      const time = new Date(x.attributes.last_triggered).getTime();
      return isNaN(time) ? undefined : time;
    } catch {
      return undefined;
    }
  },
};

export async function get_sorter(hass: HassObject, method: SortConfig) {
  const prepare = COMPARISONS[method.method];
  if (!prepare) return (x) => x;

  // Create a mutable copy of the method config
  let sortMethod = { ...method };

  // Manual sorting: return items in the order specified by manual_order array
  if (sortMethod.method === "manual" && sortMethod.manual_order) {
    return async (values: LovelaceRowConfig[]): Promise<LovelaceRowConfig[]> => {
      const order = sortMethod.manual_order;
      const orderMap = new Map(order.map((entityId, index) => [entityId, index]));

      return values.sort((a, b) => {
        const entityIdA = typeof a === "string" ? a : a.entity;
        const entityIdB = typeof b === "string" ? b : b.entity;

        const indexA = orderMap.get(entityIdA) ?? Infinity;
        const indexB = orderMap.get(entityIdB) ?? Infinity;

        return indexA - indexB;
      });
    };
  }

  if (
    ["last_changed", "last_updated", "last_triggered"].includes(sortMethod.method)
  )
    sortMethod.numeric = true;

  const sort = async (
    values: LovelaceRowConfig[]
  ): Promise<LovelaceRowConfig[]> => {
    const map = await Promise.all(
      values.map(async (x) => {
        if (!x) return [null, undefined];
        const entityId = typeof x === "string" ? x : x.entity;
        const state = hass.states[entityId];
        // If state doesn't exist, keep the entity but sort it to the end
        if (!state) {
          return [x, undefined];
        }
        return [
          x,
          await prepare(state, sortMethod, hass, x),
        ];
      })
    );
    map.sort((a, b) => compare(a[1], b[1], sortMethod));
    return map.map((x) => x[0]).filter((x) => x !== null);
  };
  return sort;
}
