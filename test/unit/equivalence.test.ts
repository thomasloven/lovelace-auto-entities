// Randomised equivalence test: optimized engine must always equal the legacy algorithm.
(globalThis as any).window = globalThis;
import { Engine, legacy_select, resolve_optimize } from "../../src/engine";

let seed = Number(process.env.SEED ?? 1);
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
const pick = <T>(a: T[]): T => a[Math.floor(rnd() * a.length)];
const chance = (p: number) => rnd() < p;

const DOMAINS = [
  "sensor",
  "binary_sensor",
  "light",
  "switch",
  "climate",
  "cover",
  "media_player",
];
const PLATFORMS = [
  "visonic",
  "hue",
  "zha",
  "mqtt",
  "esphome",
  "frigate",
  "sonos",
];
const AREAS = ["Kitchen", "Lounge", "Hall", "Garage", "Loft"];
const LABELS = ["l_security", "l_energy", "l_kids"];

function makeWorld(n: number) {
  const entities: any[] = [],
    devices: any[] = [],
    areas: any[] = [],
    labels: any[] = [];
  AREAS.forEach((a, i) =>
    areas.push({ area_id: "a" + i, name: a, floor_id: null }),
  );
  LABELS.forEach((l) =>
    labels.push({ label_id: l, name: l.replace("l_", "") }),
  );
  for (let d = 0; d < Math.floor(n / 6); d++)
    devices.push({
      id: "dev" + d,
      name: "Device " + d,
      name_by_user: chance(0.3) ? "Mine " + d : null,
      area_id: chance(0.7) ? "a" + Math.floor(rnd() * AREAS.length) : null,
      manufacturer: pick(["Acme", "Visonic", "Philips"]),
      model: pick(["m1", "m2"]),
      labels: chance(0.2) ? [pick(LABELS)] : [],
    });
  const states: Record<string, any> = {};
  for (let i = 0; i < n; i++) {
    const dom = pick(DOMAINS),
      id = `${dom}.e${i}${chance(0.2) ? "_zone" : ""}`;
    entities.push({
      entity_id: id,
      platform: pick(PLATFORMS),
      device_id: chance(0.8)
        ? "dev" + Math.floor(rnd() * devices.length)
        : null,
      area_id: chance(0.1) ? "a" + Math.floor(rnd() * AREAS.length) : null,
      labels: chance(0.1) ? [pick(LABELS)] : [],
      entity_category: chance(0.1) ? "diagnostic" : null,
      hidden_by: chance(0.05) ? "user" : null,
      config_entry_id: "ce" + Math.floor(rnd() * 5),
    });
    states[id] = mkState(id);
  }
  const hass: any = {
    states,
    callWS: async (m: any) =>
      ({
        "config/entity_registry/list": entities,
        "config/device_registry/list": devices,
        "config/area_registry/list": areas,
        "config/label_registry/list": labels,
        "config/floor_registry/list": [],
      })[m.type] ?? [],
    formatEntityState: (s: any) => s.state,
  };
  states["group.test"] = {
    entity_id: "group.test",
    state: "on",
    attributes: { entity_id: entities.slice(0, 40).map((e) => e.entity_id) },
    last_changed: iso(),
    last_updated: iso(),
  };
  return { hass, entities };
}
let clock = 1_700_000_000_000;
const iso = () =>
  new Date((clock += 1000 * Math.floor(rnd() * 50))).toISOString();
function mkState(id: string) {
  return {
    entity_id: id,
    state: pick([
      "on",
      "off",
      "unavailable",
      String(Math.floor(rnd() * 100)),
      "home",
    ]),
    attributes: {
      friendly_name:
        pick(["Alpha", "Beta", "Door", "Window", "Motion", "Temp"]) +
        " " +
        Math.floor(rnd() * 20),
      device_class: pick(["motion", "door", "temperature", undefined]),
    },
    last_changed: iso(),
    last_updated: iso(),
  };
}

const STATIC_RULES = [
  () => ({
    domain: pick(["sensor", "light", "binary_*", "/^(switch|cover)$/"]),
  }),
  () => ({
    entity_id: pick(["*_zone", "sensor.e1*", "/e\\d*7(_zone)?$/", "light.e5"]),
  }),
  () => ({ integration: pick(PLATFORMS) }),
  () => ({ area: pick(AREAS) }),
  () => ({ device: pick(["Device 3", "Mine *", "Device *"]) }),
  () => ({ label: pick(LABELS) }),
  () => ({ entity_category: pick(["diagnostic", "null"]) }),
  () => ({ hidden_by: "user" }),
];
const DYN_RULES = [
  () => ({
    state: pick(["on", "off", "unavailable", ">50", "<=10", "/^[0-4]/"]),
  }),
  () => ({ name: pick(["Door*", "*3", "Alpha*"]) }),
  () => ({ attributes: { device_class: pick(["motion", "door"]) } }),
  () => ({ group: "group.test" }),
  () => ({ not: { state: "off" } }),
  () => ({ or: [{ state: "on" }, { domain: "light" }] }),
  () => ({ last_changed: pick(["<5000", ">100"]) }), // volatile
];
const SORTS = [
  undefined,
  { method: "name" },
  { method: "state", numeric: true, reverse: true },
  { method: "entity_id" },
  { method: "domain" },
  { method: "last_changed" },
  { method: "area" },
  { method: "name", count: 5 },
];
function randFilter(allowDyn = true) {
  const f: any = {};
  const ns = Math.floor(rnd() * 3),
    nd = allowDyn ? Math.floor(rnd() * 3) : 0;
  for (let i = 0; i < ns; i++) Object.assign(f, pick(STATIC_RULES)());
  for (let i = 0; i < nd; i++) Object.assign(f, pick(DYN_RULES)());
  if (!Object.keys(f).length) f.domain = "sensor";
  const s = pick(SORTS);
  if (s) f.sort = { ...s };
  if (chance(0.15)) f.options = { name: "Custom this.entity_id" };
  return f;
}
function randConfig() {
  const c: any = {
    card: { type: "entities" },
    filter: { include: [], exclude: [] },
  };
  if (chance(0.3))
    c.entities = ["sensor.e1", { entity: "light.e2", name: "X" }];
  const ni = 1 + Math.floor(rnd() * 3);
  for (let i = 0; i < ni; i++) c.filter.include.push(randFilter());
  if (chance(0.15)) c.filter.include.push({ type: "section", label: "S" });
  const ne = Math.floor(rnd() * 3);
  for (let i = 0; i < ne; i++) c.filter.exclude.push(randFilter());
  const gs = pick(SORTS);
  if (gs) c.sort = { ...gs };
  if (chance(0.2)) c.unique = pick([true, "entity"]);
  return c;
}

function mutate(hass: any, ids: string[]) {
  // HA semantics: a changed entity gets a NEW state object; unchanged keep identity. hass.states is a new object each update.
  const next = { ...hass.states };
  const n = Math.floor(rnd() * 12);
  for (let i = 0; i < n; i++) {
    const id = pick(ids);
    if (next[id]) next[id] = { ...mkState(id) };
  }
  if (chance(0.05)) {
    const id = "sensor.new" + Math.floor(rnd() * 1e6);
    next[id] = mkState(id);
  }
  if (chance(0.05)) {
    const id = pick(ids);
    delete next[id];
  }
  if (chance(0.05))
    next["group.test"] = {
      ...next["group.test"],
      attributes: { entity_id: Array.from({ length: 30 }, () => pick(ids)) },
    };
  if (chance(0.03)) {
    const ks = Object.keys(next);
    const [a, b] = [pick(ks), pick(ks)];
    const reordered: Record<string, any> = {};
    for (const k of ks.filter((k) => k !== a)) reordered[k] = next[k];
    reordered[a] = next[a];
    hass.states = reordered;
    void b;
  } else hass.states = next;
  if (chance(0.03)) hass.locale = { language: pick(["en", "de"]) };
}

const FLAGS = [
  { candidate_cache: true, skip_unchanged: true },
  { candidate_cache: true, skip_unchanged: false },
  { candidate_cache: false, skip_unchanged: true },
  { candidate_cache: true, skip_unchanged: true },
];
(async () => {
  let configs = Number(process.env.CONFIGS ?? 120),
    steps = Number(process.env.STEPS ?? 40);
  let bad = 0,
    runs = 0,
    skips = 0;
  for (let ci = 0; ci < configs; ci++) {
    const { hass, entities } = makeWorld(300 + Math.floor(rnd() * 900));
    const ids = entities.map((e) => e.entity_id);
    const config = randConfig();
    const flags = pick(FLAGS);
    const opts = resolve_optimize({ ...config, optimize: flags });
    const eng = new Engine();
    eng.reset();
    let template: string[] | undefined = chance(0.25)
      ? [pick(ids), pick(ids)]
      : undefined;
    for (let s = 0; s < steps; s++) {
      let got: any,
        want: any,
        gotErr = false,
        wantErr = false;
      if (template && chance(0.1)) {
        template = [pick(ids), pick(ids), pick(ids)];
        eng.reset();
      } // card re-renders template -> reset
      const h = { ...hass }; // HA hands cards a NEW hass object on every update
      try {
        got = await eng.run(h, config, template, opts);
      } catch (e) {
        gotErr = true;
        got = { entities: [], skipped: false };
      }
      try {
        want = await legacy_select(h, config, template);
      } catch (e) {
        wantErr = true;
        want = [];
      }
      runs++;
      if (got.skipped) skips++;
      // a sorter crash on a missing literal entity is upstream behaviour: both sides must throw alike
      if (
        gotErr !== wantErr ||
        (!gotErr && JSON.stringify(got.entities) !== JSON.stringify(want))
      ) {
        bad++;
        if (bad <= 3)
          console.error(
            "MISMATCH cfg",
            JSON.stringify(config),
            "flags",
            JSON.stringify(flags),
            "step",
            s,
            "skipped",
            got.skipped,
            "\n opt",
            got.entities.map((e: any) => e.entity).join(","),
            "\n leg",
            want.map((e: any) => e.entity).join(","),
          );
      }
      mutate(hass, ids);
    }
  }
  console.log(
    `configs=${configs} steps=${steps} comparisons=${runs} skipped=${skips} mismatches=${bad}`,
  );
  process.exit(bad ? 1 : 0);
})();
