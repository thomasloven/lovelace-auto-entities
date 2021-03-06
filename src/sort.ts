function compare(_a, _b, method) {
  const [lt, gt] = method.reverse ? [-1, 1] : [1, -1];
  if (method.ignore_case && _a.toLowerCase) _a = _a.toLowerCase();
  if (method.ignore_case && _b.toLowerCase) _b = _b.toLowerCase();
  if (method.numeric) {
    if (!(isNaN(parseFloat(_a)) && isNaN(parseFloat(_b)))) {
      _a = isNaN(parseFloat(_a)) ? undefined : parseFloat(_a);
      _b = isNaN(parseFloat(_b)) ? undefined : parseFloat(_b);
    }
  }
  if (_a === undefined && _b === undefined) return 0;
  if (_a === undefined) return lt;
  if (_b === undefined) return gt;
  if (_a < _b) return gt;
  if (_a > _b) return lt;
  return 0;
}

const SORTERS: Record<string, (a: any, b: any, method: any) => number> = {
  domain: (a, b, method) => {
    return compare(
      a.entity_id.split(".")[0],
      b.entity_id.split(".")[0],
      method
    );
  },
  entity_id: (a, b, method) => {
    return compare(a.entity_id, b.entity_id, method);
  },
  friendly_name: (a, b, method) => {
    return compare(
      a.attributes.friendly_name || a.entity_id.split(".")[1],
      b.attributes.friendly_name || b.entity_id.split(".")[1],
      method
    );
  },
  name: (a, b, method) => {
    return compare(
      a.attributes.friendly_name || a.entity_id.split(".")[1],
      b.attributes.friendly_name || b.entity_id.split(".")[1],
      method
    );
  },
  state: (a, b, method) => {
    return compare(a.state, b.state, method);
  },
  attribute: (a, b, method) => {
    return 0;
  },
  last_changed: (a, b, method) => {
    method.numeric = true;
    return compare(
      new Date(a.last_changed).getTime(),
      new Date(b.last_changed).getTime(),
      method
    );
  },
  last_updated: (a, b, method) => {
    method.numeric = true;
    return compare(
      new Date(a.last_updated).getTime(),
      new Date(b.last_updated).getTime(),
      method
    );
  },
  last_triggered: (a, b, method) => {
    if (
      a.attributes.last_triggered == null ||
      b.attributes.last_triggered == null
    )
      return 0;
    method.numeric = true;
    return compare(
      new Date(a.attributes.last_triggered).getTime(),
      new Date(b.attributes.lat_triggered).getTime(),
      method
    );
  },
};

export function get_sorter(hass, method) {
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
