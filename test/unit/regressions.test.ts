// Targeted regression tests for scenarios that broke earlier versions of the optimised engine.
// Every case compares the optimised Engine with the original algorithm (legacy_select) while
// handing the card a NEW hass object on each step, as Home Assistant does.
(globalThis as any).window = globalThis;
import { Engine, legacy_select, resolve_optimize } from "../../src/engine";

// controllable clock (the matcher uses `new Date()` for "X ago" rules)
const RealDate = Date;
let NOW = 1_700_000_000_000;
class FakeDate extends RealDate {
  constructor(...a: any[]) {
    if (a.length === 0) super(NOW);
    else super(...(a as [any]));
  }
  static now() {
    return NOW;
  }
}
(globalThis as any).Date = FakeDate;
const iso = (ms: number) => new RealDate(ms).toISOString();

const st = (id: string, state: string, attrs: any = {}, ago_min = 0) => ({
  entity_id: id,
  state,
  attributes: attrs,
  last_changed: iso(NOW - ago_min * 60000),
  last_updated: iso(NOW - ago_min * 60000),
});
let delay = 0;
function mkhass(states: Record<string, any>, extra: any = {}) {
  return {
    states,
    locale: { language: "en" },
    language: "en",
    callWS: async (m: any) => {
      if (delay) await new Promise((r) => setTimeout(r, delay));
      return m.type === "config/entity_registry/list"
        ? Object.keys(states).map((id) => ({
            entity_id: id,
            platform: "t",
            area_id: "a1",
            device_id: null,
            labels: [],
          }))
        : m.type === "config/area_registry/list"
          ? [{ area_id: "a1", name: "Room" }]
          : [];
    },
    formatEntityState: (s: any) =>
      extra.lang === "de" ? "de-" + s.state : s.state,
    ...extra,
  };
}
const ids = (r: any) => r.map((e: any) => e.entity).join(",");
let failures = 0,
  checks = 0;
async function scenario(
  name: string,
  config: any,
  steps: (() => any)[],
  template?: string[],
  opts: any = {},
) {
  const eng = new Engine();
  eng.reset();
  const o = resolve_optimize({
    ...config,
    optimize: opts.optimize ?? { candidate_cache: true, skip_unchanged: true },
  });
  for (let i = 0; i < steps.length; i++) {
    const hass = steps[i]();
    const got = await eng.run(hass, config, template, o);
    const want = await legacy_select(hass, config, template);
    checks++;
    if (ids(got.entities) !== ids(want)) {
      failures++;
      console.error(
        `FAIL ${name} step ${i}: optimized=[${ids(got.entities)}] legacy=[${ids(want)}] skipped=${got.skipped}`,
      );
    }
  }
}
const lights = (a: string, b: string, extra: any = {}) =>
  mkhass({
    "light.a": st("light.a", a),
    "light.b": st("light.b", b),
    ...extra,
  });
(async () => {
  // 1. closures that capture hass must never go stale
  await scenario(
    "exclude state",
    { filter: { include: [{ domain: "light" }], exclude: [{ state: "off" }] } },
    [
      () => lights("on", "on"),
      () => lights("off", "on"),
      () => lights("on", "off"),
    ],
  );
  await scenario(
    "nested not",
    { filter: { include: [{ domain: "light", not: { state: "off" } }] } },
    [
      () => lights("off", "on"),
      () => lights("on", "off"),
      () => lights("off", "off"),
    ],
  );
  await scenario(
    "nested or",
    { filter: { include: [{ or: [{ state: "on" }, { entity_id: "none" }] }] } },
    [() => lights("off", "on"), () => lights("on", "off")],
  );
  await scenario(
    "group members",
    { filter: { include: [{ group: "group.g" }] } },
    [
      () =>
        lights("on", "on", {
          "group.g": st("group.g", "on", { entity_id: ["light.a"] }),
        }),
      () =>
        lights("on", "on", {
          "group.g": st("group.g", "on", { entity_id: ["light.b"] }),
        }),
    ],
  );
  await scenario(
    "filter-local sort",
    {
      filter: {
        include: [
          { domain: "sensor", sort: { method: "state", numeric: true } },
        ],
      },
    },
    [
      () =>
        mkhass({
          "sensor.a": st("sensor.a", "1"),
          "sensor.b": st("sensor.b", "2"),
        }),
      () =>
        mkhass({
          "sensor.a": st("sensor.a", "3"),
          "sensor.b": st("sensor.b", "2"),
        }),
    ],
  );
  // 2. locale / hidden inputs
  await scenario(
    "state_translated locale",
    { filter: { include: [{ state_translated: "de-on" }] } },
    [() => lights("on", "off"), () => lights("on", "off")].map(
      (f, i) => () => ({
        ...f(),
        ...(i
          ? {
              lang: "de",
              locale: { language: "de" },
              language: "de",
              formatEntityState: (s: any) => "de-" + s.state,
            }
          : {}),
      }),
    ),
  );
  await scenario(
    "eval_js options",
    {
      filter: {
        include: [
          {
            domain: "light",
            options: { eval_js: true, name: "${new Date().getTime()}" },
          },
        ],
      },
    },
    [
      () => lights("on", "on"),
      () => {
        NOW += 7 * 60000;
        return lights("on", "on", { "sensor.x": st("sensor.x", "1") });
      },
    ],
  );
  // 3. time-dependent rules at any depth
  const t = (f: (m: number) => any) => () => {
    NOW += 10 * 60000;
    return f(NOW);
  };
  const base = (n: number) => ({
    "binary_sensor.m": st(
      "binary_sensor.m",
      "on",
      { last_seen: iso(NOW - 3 * 60000) },
      1,
    ),
    "sensor.u": st("sensor.u", "1"),
  });
  await scenario(
    "not last_changed",
    {
      filter: {
        include: [{ domain: "binary_sensor", not: { last_changed: "> 5" } }],
      },
    },
    [
      () => mkhass(base(0)),
      t(() =>
        mkhass({
          ...base(0),
          "binary_sensor.m": st("binary_sensor.m", "on", {}, 1),
          "sensor.u": st("sensor.u", String(NOW)),
        }),
      ),
    ],
  );
  await scenario(
    "and last_changed",
    {
      filter: {
        include: [
          { and: [{ domain: "binary_sensor" }, { last_changed: "< 5" }] },
        ],
      },
    },
    [
      () => mkhass({ "binary_sensor.m": st("binary_sensor.m", "on") }),
      t(() =>
        mkhass({ "binary_sensor.m": st("binary_sensor.m", "on", {}, 0) }),
      ),
    ],
  );
  await scenario(
    "attributes ago",
    { filter: { include: [{ attributes: { last_seen: "< 5 m ago" } }] } },
    [
      () =>
        mkhass({ "sensor.s": st("sensor.s", "1", { last_seen: iso(NOW) }) }),
      t(() =>
        mkhass({
          "sensor.s": st("sensor.s", "1", { last_seen: iso(NOW - 10 * 60000) }),
          "sensor.u": st("sensor.u", "x"),
        }),
      ),
    ],
  );
  await scenario(
    "exclude attributes ago",
    {
      filter: {
        include: [{ domain: "sensor" }],
        exclude: [{ attributes: { last_seen: "> 5 m ago" } }],
      },
    },
    [
      () =>
        mkhass({ "sensor.s": st("sensor.s", "1", { last_seen: iso(NOW) }) }),
      t(() =>
        mkhass({
          "sensor.s": st("sensor.s", "1", { last_seen: iso(NOW - 20 * 60000) }),
        }),
      ),
    ],
  );
  // 4. reset race: a run in flight when the card resets must not arm the skip for stale inputs
  {
    const config = { filter: { include: [{ area: "Room", domain: "light" }] } };
    const eng = new Engine();
    eng.reset();
    const o = resolve_optimize({
      optimize: { candidate_cache: true, skip_unchanged: true },
    });
    delay = 40;
    const hass = lights("on", "on", { "sensor.t": st("sensor.t", "1") });
    const inflight = eng.run(hass, config, undefined, o); // run A starts (waits on registry)
    eng.reset(); // template arrives -> reset
    await inflight;
    delay = 0;
    const tpl = ["sensor.t"];
    const h2 = { ...hass };
    const got = await eng.run(h2, config, tpl, o);
    const want = await legacy_select(h2, config, tpl);
    checks++;
    if (ids(got.entities) !== ids(want) || got.skipped) {
      failures++;
      console.error(
        `FAIL reset race: optimized=[${ids(got.entities)}] legacy=[${ids(want)}] skipped=${got.skipped}`,
      );
    }
  }
  // 5. entity add+remove in one update, key reorder, undefined state values
  await scenario(
    "add+remove same update",
    { filter: { include: [{ domain: "light" }] } },
    [
      () => lights("on", "on"),
      () =>
        mkhass({
          "light.a": st("light.a", "on"),
          "light.c": st("light.c", "on"),
        }),
    ],
  );
  await scenario(
    "key reorder",
    { filter: { include: [{ domain: "light" }] } },
    [
      () => lights("on", "on"),
      () =>
        mkhass({
          "light.b": st("light.b", "on"),
          "light.a": st("light.a", "on"),
        }),
    ],
  );
  await scenario(
    "undefined state value",
    { filter: { include: [{ domain: "light" }] } },
    [
      () => lights("on", "on"),
      () =>
        mkhass({ "light.a": st("light.a", "on"), "light.b": undefined as any }),
    ],
  );
  // 7. rows that reach exclude/sort without being candidates (type: rows, options.entity)
  await scenario(
    "type row + exclude",
    {
      filter: {
        include: [{ type: "simple-entity", entity: "light.a" }],
        exclude: [{ state: "off" }],
      },
    },
    [() => lights("on", "on"), () => lights("off", "on")],
  );
  await scenario(
    "type rows + global sort",
    {
      filter: {
        include: [
          { type: "simple-entity", entity: "sensor.p" },
          { type: "simple-entity", entity: "sensor.q" },
        ],
      },
      sort: { method: "state", numeric: true },
    },
    [
      () =>
        mkhass({
          "sensor.p": st("sensor.p", "1"),
          "sensor.q": st("sensor.q", "2"),
        }),
      () =>
        mkhass({
          "sensor.p": st("sensor.p", "5"),
          "sensor.q": st("sensor.q", "2"),
        }),
    ],
  );
  await scenario(
    "options.entity + exclude",
    {
      filter: {
        include: [{ entity_id: "light.b", options: { entity: "light.a" } }],
        exclude: [{ state: "off" }],
      },
    },
    [() => lights("on", "on"), () => lights("off", "on")],
  );
  // 8. group: given as a one-element array (legacy coerces it to a string key)
  await scenario(
    "group array value",
    { filter: { include: [{ domain: "light", group: ["group.g"] as any }] } },
    [
      () =>
        lights("on", "on", {
          "group.g": st("group.g", "on", { entity_id: ["light.a"] }),
        }),
      () =>
        lights("on", "on", {
          "group.g": st("group.g", "on", { entity_id: ["light.b"] }),
        }),
    ],
  );
  // 9. static rule that throws on an entity the original never reaches (state rule listed first short-circuits)
  await scenario(
    "static rule throws",
    { filter: { include: [{ state: "on", label: "y" }] } },
    [
      () => {
        const h: any = lights("on", "off");
        const cw = h.callWS;
        h.callWS = async (m: any) =>
          m.type === "config/device_registry/list"
            ? [{ id: "d1", labels: undefined }]
            : m.type === "config/entity_registry/list"
              ? [
                  { entity_id: "light.a", labels: ["y"], device_id: null },
                  { entity_id: "light.b", labels: ["z"], device_id: "d1" },
                ]
              : cw(m);
        return h;
      },
    ],
  );
  // 10. undefined -> defined state value under the same key
  await scenario(
    "undefined then defined",
    { filter: { include: [{ domain: "light" }] } },
    [
      () =>
        mkhass({ "light.a": st("light.a", "on"), "light.z": undefined as any }),
      () =>
        mkhass({
          "light.a": st("light.a", "on"),
          "light.z": st("light.z", "on"),
        }),
    ],
  );
  // 11. out-of-order runs: an older, slower run must report superseded and not commit
  {
    const config = { filter: { include: [{ domain: "light", state: "on" }] } };
    const eng = new Engine();
    eng.reset();
    const o = resolve_optimize({
      optimize: { candidate_cache: true, skip_unchanged: true },
    });
    const cache = (globalThis as any).autoEntities_cache;
    for (const k of Object.keys(cache)) delete cache[k]; // cold registry cache
    delay = 60;
    const hA = lights("on", "off");
    const runA = eng.run(hA, config, undefined, o); // slow (registry fetch)
    await new Promise((r) => setTimeout(r, 10));
    delay = 0;
    const hB = lights("off", "off");
    const rB = await eng.run(hB, config, undefined, o); // newer, fast
    const rA = await runA;
    checks++;
    if (!rA.superseded || rB.superseded || ids(rB.entities) !== "") {
      failures++;
      console.error(
        `FAIL out-of-order: A.superseded=${rA.superseded} B.superseded=${rB.superseded} B=[${ids(rB.entities)}]`,
      );
    }
    const hC = { ...hB };
    const rC = await eng.run(hC, config, undefined, o);
    checks++;
    if (ids(rC.entities) !== ids(await legacy_select(hC, config, undefined))) {
      failures++;
      console.error("FAIL out-of-order: later state wrong");
    }
  }
  // 12. option parsing
  for (const [v, want] of [
    [false, false],
    ["false", false],
    ["off", false],
    [0, false],
    ["0", false],
    [true, true],
    [{ skip_unchanged: "no" }, "skip-off"],
    [{}, true],
  ] as any[]) {
    const r = resolve_optimize({ optimize: v });
    const ok =
      want === "skip-off"
        ? !r.skip_unchanged && r.candidate_cache
        : want
          ? r.skip_unchanged && r.candidate_cache
          : !r.skip_unchanged && !r.candidate_cache;
    checks++;
    if (!ok) {
      failures++;
      console.error(
        "FAIL optimize parsing",
        JSON.stringify(v),
        JSON.stringify(r),
      );
    }
  }
  // 6. option parsing
  const off = resolve_optimize({ optimize: "false" });
  checks++;
  if (off.skip_unchanged || off.candidate_cache) {
    failures++;
    console.error("FAIL optimize:'false' string not honoured");
  }
  console.log(`regressions: ${checks} checks, ${failures} failures`);
  process.exit(failures ? 1 : 0);
})();
