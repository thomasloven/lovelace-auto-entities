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
  return (
    (method.reverse ? -1 : 1) *
    String(_a).localeCompare(String(_b), undefined, method)
  );
}

const SORTERS: Record<
  string,
  (a: HAState, b: HAState, method: SortConfig) => number
> = {
  none: () => {
    return 0;
  },
  domain: (a, b, method) => {
    return compare(
      a?.entity_id?.split(".")[0],
      b?.entity_id?.split(".")[0],
      method
    );
  },
  entity_id: (a, b, method) => {
    return compare(a?.entity_id, b?.entity_id, method);
  },
  friendly_name: (a, b, method) => {
    return compare(
      a?.attributes?.friendly_name || a?.entity_id?.split(".")[1],
      b?.attributes?.friendly_name || b?.entity_id?.split(".")[1],
      method
    );
  },
  name: (a, b, method) => {
    return compare(
      a?.attributes?.friendly_name || a?.entity_id?.split(".")[1],
      b?.attributes?.friendly_name || b?.entity_id?.split(".")[1],
      method
    );
  },
  state: (a, b, method) => {
    return compare(a?.state, b?.state, method);
  },
  attribute: (a, b, method) => {
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
  last_changed: (a, b, method) => {
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
  last_updated: (a, b, method) => {
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
  last_triggered: (a, b, method) => {
    const [lt, gt] = method?.reverse ? [-1, 1] : [1, -1];
    if (
      a?.attributes?.last_triggered == null &&
      b?.attributes?.last_triggered == null
    )
      return 0;
    if (a?.attributes?.last_triggered == null) return lt;
    if (b?.attributes?.last_triggered == null) return gt;
    method.numeric = true;
    return compare(
      new Date(a?.attributes?.last_triggered).getTime(),
      new Date(b?.attributes?.last_triggered).getTime(),
      method
    );
  },
};

export function get_sorter(
  hass: HassObject,
  method: SortConfig
): (a: LovelaceRowConfig, b: LovelaceRowConfig) => number {
  return function (a, b) {
    return (
      SORTERS[method.method]?.(
        hass.states[a.entity],
        hass.states[b.entity],
        method
      ) ?? 0
    );
  };
}
