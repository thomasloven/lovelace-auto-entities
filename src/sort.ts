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
  (x: HAState, method: SortConfig, hass: HassObject) => any | Promise<any>
> = {
  none: (x) => 0,
  domain: (x) => x?.entity_id?.split(".")[0],
  entity_id: (x) => x?.entity_id,
  friendly_name: (x) =>
    x?.attributes?.friendly_name || x?.entity_id?.split(".")[1],
  name: (x) => x?.attributes?.friendly_name || x?.entity_id?.split(".")[1],
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
  state: (x) => x?.state,
  attribute: (x, m) =>
    m?.attribute?.split(":").reduce((_x, key) => _x?.[key], x?.attributes),
  last_changed: (x) =>
    x?.last_changed ? new Date(x.last_changed).getTime() : undefined,
  last_updated: (x) =>
    x?.last_updated ? new Date(x.last_updated).getTime() : undefined,
  last_triggered: (x) =>
    x?.attributes?.last_triggered
      ? new Date(x.attributes.last_triggered).getTime()
      : undefined,
};

export async function get_sorter(hass: HassObject, method: SortConfig) {
  const prepare = COMPARISONS[method.method];
  if (!prepare) return (x) => x;

  if (
    ["last_changed", "last_updated", "last_triggered"].includes(method.method)
  )
    method.numeric = true;

  const sort = async (
    values: LovelaceRowConfig[]
  ): Promise<LovelaceRowConfig[]> => {
    const map = await Promise.all(
      values.map(async (x) => [
        x,
        await prepare(hass.states[x.entity], method, hass),
      ])
    );
    map.sort((a, b) => compare(a[1], b[1], method));
    return map.map((x) => x[0]);
  };
  return sort;
}
