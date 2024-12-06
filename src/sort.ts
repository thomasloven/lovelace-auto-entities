import { cached_areas, cached_devices, cached_entities } from "./helpers";
import { HassObject, HAState, LovelaceRowConfig, SortConfig } from "./types";

function compare(_a: any, _b: any, method: SortConfig) {
  const [lt, gt] = method.reverse ? [-1, 1] : [1, -1];
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
  if (_a === undefined) return lt;
  if (_b === undefined) return gt;
  if (method.numeric) {
    if (_a === _b) return 0;
    return (method.reverse ? -1 : 1) * (_a < _b ? -1 : 1);
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

type MapperSorter<T> = {
  mapper: (e: HAState) => Promise<T>;
  sorter: (a: T, b: T) => number;
};

const SORTERS = {
  none: async (_method: SortConfig) => ({
    mapper: async (_e: HAState) => undefined,
    sorter: (_a, _b): number => 0,
  }),
  domain: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e?.entity_id?.split(".")[0],
    sorter: (a, b): number => compare(a, b, method),
  }),
  entity_id: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e?.entity_id,
    sorter: (a, b): number => compare(a, b, method),
  }),
  friendly_name: async (method: SortConfig) => ({
    mapper: async (e: HAState) =>
      e?.attributes?.friendly_name || e?.entity_id?.split(".")[1],
    sorter: (a, b): number => compare(a, b, method),
  }),
  name: async (method: SortConfig) => ({
    mapper: async (e: HAState) =>
      e?.attributes?.friendly_name || e?.entity_id?.split(".")[1],
    sorter: (a, b): number => compare(a, b, method),
  }),
  device: async (method: SortConfig) => {
    const [entities, devices] = [cached_entities(), cached_devices()];
    return {
      mapper: async (e: HAState) => {
        const entity = (await entities).get(e.entity_id);
        const device = entity
          ? (await devices).get(entity.device_id)
          : undefined;
        return device?.name_by_user ?? device?.name;
      },
      sorter: (a, b): number =>
        (a === b) === undefined ? 0 : compare(a, b, method),
    };
  },
  area: async (method: SortConfig) => {
    const [entities, devices, areas] = [
      cached_entities(),
      cached_devices(),
      cached_areas(),
    ];
    return {
      mapper: async (e: HAState) => {
        const entity = (await entities).get(e.entity_id);
        const device = entity
          ? (await devices).get(entity.device_id)
          : undefined;
        const area = device ? (await areas).get(device.area_id) : undefined;
        return area?.name;
      },
      sorter: (a, b): number =>
        (a === b) === undefined ? 0 : compare(a, b, method),
    };
  },
  state: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e?.state,
    sorter: (a, b): number => compare(a, b, method),
  }),
  attribute: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e,
    sorter: (a: HAState, b: HAState): number => {
      const [lt, gt] = method?.reverse ? [-1, 1] : [1, -1];
      let _a = a?.attributes;
      let _b = b?.attributes;
      for (const step of method?.attribute?.split(":")) {
        if (_a === undefined && _b === undefined) return 0;
        if (_a === undefined) return lt;
        if (_b === undefined) return gt;
        [_a, _b] = [_a[step], _b[step]];
      }
      return compare(_a, _b, method);
    },
  }),
  last_changed: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e,
    sorter: (a: HAState, b: HAState): number => {
      const [lt, gt] = method?.reverse ? [-1, 1] : [1, -1];
      if (a?.last_changed == null && b?.last_changed == null) return 0;
      if (a?.last_changed == null) return lt;
      if (b?.last_changed == null) return gt;
      method.numeric = true;
      return compare(
        new Date(a?.last_changed).getTime(),
        new Date(b?.last_changed).getTime(),
        method
      );
    },
  }),
  last_updated: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e,
    sorter: (a: HAState, b: HAState): number => {
      const [lt, gt] = method?.reverse ? [-1, 1] : [1, -1];
      if (a?.last_updated == null && b?.last_updated == null) return 0;
      if (a?.last_updated == null) return lt;
      if (b?.last_updated == null) return gt;
      method.numeric = true;
      return compare(
        new Date(a?.last_updated).getTime(),
        new Date(b?.last_updated).getTime(),
        method
      );
    },
  }),
  last_triggered: async (method: SortConfig) => ({
    mapper: async (e: HAState) => e,
    sorter: (a: HAState, b: HAState): number => {
      const [lt, gt] = method?.reverse ? [-1, 1] : [1, -1];
      if (
        a?.attributes?.last_triggered == null &&
        b?.attributes?.last_triggered == null
      ) {
        return 0;
      }
      if (a?.attributes?.last_triggered == null) return lt;
      if (b?.attributes?.last_triggered == null) return gt;
      method.numeric = true;
      return compare(
        new Date(a?.attributes?.last_triggered).getTime(),
        new Date(b?.attributes?.last_triggered).getTime(),
        method
      );
    },
  }),
} as const satisfies Record<
  string,
  (method: SortConfig) => Promise<MapperSorter<unknown>>
>;

export async function get_sorter(
  hass: HassObject,
  method: SortConfig
): Promise<
  (array: Array<LovelaceRowConfig>) => Promise<Array<LovelaceRowConfig>>
> {
  const { mapper, sorter } = await (SORTERS[method.method] ?? SORTERS["none"])(
    method
  );
  const sort = async (data) => {
    const mapped = await Promise.all(
      data.map(async (x, i) => ({
        i,
        value: await mapper(x),
      }))
    );
    mapped.sort((a, b) => sorter(a.value, b.value));
    return mapped.map((v) => data[v.i]);
  };
  return sort;
}
