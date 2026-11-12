// Entity selection engine for auto-entities.
//
// Two interchangeable implementations:
//   * legacy:    the original algorithm (build a row for every entity, filter all of them, every time)
//   * optimized: cache the registry-only ("static") rule results per entity set, evaluate state
//                ("dynamic") rules only over those candidates, and skip a re-evaluation entirely when
//                nothing the result depends on has changed.
// Nothing that reads `hass` is cached across hass objects (HA hands cards a new hass object on every
// update, and the rule/sort closures capture it). `optimize: false` restores the original behaviour.
import {
  get_filter,
  split_filter,
  build_predicate,
  is_time_dependent,
  has_hidden_inputs,
  group_deps,
} from "./filter";
import { get_sorter } from "./sort";
import { process_entity } from "./process_entity";
import { compare_deep } from "./helpers";
import { EntityList, LovelaceRowConfig } from "./types";

export interface OptimizeOptions {
  candidate_cache: boolean; // cache registry-only rule results per entity set
  skip_unchanged: boolean; // skip re-evaluation when nothing the result depends on changed
  verify: boolean; // also run the original algorithm and log differences (slow; for testing)
  debug: boolean; // keep/log counters in window.autoEntities_stats
}

const ALL_OFF: OptimizeOptions = {
  candidate_cache: false,
  skip_unchanged: false,
  verify: false,
  debug: false,
};
// Build-time default for `optimize:` when a card does not set it
const ENABLED_BY_DEFAULT = false;
const ON: OptimizeOptions = {
  candidate_cache: true,
  skip_unchanged: true,
  verify: false,
  debug: false,
};

const falsy = (v: any) =>
  v === false ||
  v === 0 ||
  ["false", "off", "no", "0", ""].includes(String(v).toLowerCase());

export function resolve_optimize(config: any): OptimizeOptions {
  const o = config?.optimize;
  if (o === undefined || o === null)
    return ENABLED_BY_DEFAULT ? { ...ON } : { ...ALL_OFF };
  if (typeof o !== "object") return falsy(o) ? { ...ALL_OFF } : { ...ON };
  // an options object means "optimise, with these settings" unless a flag is explicitly off
  return {
    candidate_cache: !falsy(o.candidate_cache ?? true),
    skip_unchanged: !falsy(o.skip_unchanged ?? true),
    verify: !falsy(o.verify ?? false),
    debug: !falsy(o.debug ?? false),
  };
}

const stats = () => {
  const w = window as any;
  w.autoEntities_stats = w.autoEntities_stats ?? {
    runs: 0,
    skips: 0,
    verified: 0,
    mismatches: 0,
  };
  return w.autoEntities_stats;
};

// Shared by all cards: version of the set of entity ids in hass.states. Computed once per
// hass.states object (HA replaces it on every update), bumped when ids are added/removed/reordered.
const tracker = { states: null as any, keys: [] as string[], ver: 0 };
function entity_set(states) {
  const t = tracker;
  if (t.states === states) return t;
  t.states = states;
  const k = Object.keys(states);
  let same = k.length === t.keys.length;
  if (same) {
    for (let i = 0; i < k.length; i++) {
      if (k[i] !== t.keys[i]) {
        same = false;
        break;
      }
    }
  }
  if (!same) {
    t.keys = k;
    t.ver++;
  }
  return t;
}

const format = (entity: LovelaceRowConfig | string): LovelaceRowConfig => {
  if (!entity) return null;
  return typeof entity === "string" ? { entity: entity.trim() } : entity;
};

async function finish(hass, config, entities: EntityList): Promise<EntityList> {
  // Global sort
  const sorter = config.sort?.method
    ? await get_sorter(hass, config.sort)
    : (x) => x;
  entities = await sorter(entities);

  // Unique
  if (config.unique) {
    let uniq = (
      entity: LovelaceRowConfig,
      index: number,
      self: LovelaceRowConfig[],
    ) => index === self.findIndex((e) => compare_deep(e, entity));
    if (config.unique === "entity") {
      uniq = (entity, index, self) =>
        index === self.findIndex((e) => e.entity === entity.entity);
    }
    entities = entities.filter(uniq);
  }

  // Pagination
  if (config.sort?.count || config.sort?.first) {
    const start = config.sort?.first ?? 0;
    const count = config.sort?.count ?? Infinity;
    entities = entities.slice(start, start + count);
  }
  return entities;
}

function base_entities(config, template): EntityList {
  let entities: EntityList = [...(config?.entities?.map(format) || [])];
  if (template) entities = entities.concat(template.map(format));
  return entities.filter(Boolean);
}

// ---------------------------------------------------------------------------
// Legacy implementation (original behaviour)
// ---------------------------------------------------------------------------
export async function legacy_select(
  hass,
  config,
  template,
): Promise<EntityList> {
  let entities = base_entities(config, template);
  if (!hass) return entities;

  const include_filters = await Promise.all(
    (config.filter?.include ?? []).map(async (filter) => {
      if (filter.type !== undefined)
        return async () => [filter as LovelaceRowConfig];
      const filters = await get_filter(hass, filter);
      const sorter = filter.sort?.method
        ? await get_sorter(hass, filter.sort)
        : (x) => x;
      const post_process = async (entity) =>
        await process_entity(
          hass,
          { ...entity, ...filter.options },
          entity.entity,
        );
      return async (all: EntityList) => {
        let add = all.filter(filters);
        add = await sorter(add);
        if (filter.sort?.count || filter.sort?.first) {
          const start = filter.sort?.first ?? 0;
          const count = filter.sort?.count ?? Infinity;
          add = add.slice(start, start + count);
        }
        return await Promise.all(add.map(post_process));
      };
    }),
  );
  const exclude_filters = await Promise.all(
    (config.filter?.exclude ?? []).map(
      async (filter) => await get_filter(hass, filter),
    ),
  );

  const all_entities: EntityList = Object.keys(hass.states).map(format);
  entities = entities.concat(
    ...(await Promise.all(include_filters.map((f) => f(all_entities)))),
  );
  entities = entities.filter((e) => !exclude_filters.some((f) => f(e)));
  return await finish(hass, config, entities);
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------
export class Engine {
  // Bumped by reset(): a run that started before a reset must not commit skip state.
  gen = 0;
  seq = 0; // order runs were started in
  committed = 0; // seq of the newest run whose result was committed
  dirty = true;

  statics: any[] = []; // per include filter: { key, isStatic, dyn, candVer, cand }
  watchIds: string[] = [];
  watchRefs: any[] = [];
  watchVer = -1;
  watchLocale: any;
  watchLang: any;
  volatile = false;
  last: EntityList | undefined;

  reset() {
    this.gen++;
    this.dirty = true;
    this.statics = [];
    this.last = undefined;
  }

  can_skip(hass, opts: OptimizeOptions): boolean {
    if (!opts.skip_unchanged) return false;
    if (this.dirty || this.volatile || this.watchVer < 0 || !hass?.states)
      return false;
    if (hass.locale !== this.watchLocale || hass.language !== this.watchLang)
      return false;
    const st = hass.states;
    if (entity_set(st).ver !== this.watchVer) return false;
    const ids = this.watchIds;
    for (let i = 0; i < ids.length; i++)
      if (st[ids[i]] !== this.watchRefs[i]) return false;
    return true;
  }

  // Returns { entities, skipped }. When skipped the caller keeps the previous card state.
  async run(hass, config, template, opts: OptimizeOptions) {
    if (!hass || (!opts.candidate_cache && !opts.skip_unchanged))
      return {
        entities: await legacy_select(hass, config, template),
        skipped: false,
        superseded: false,
      };

    const s = opts.verify || opts.debug ? stats() : undefined;
    if (this.can_skip(hass, opts)) {
      if (s) s.skips++;
      if (opts.verify)
        await this.verify(hass, config, template, this.last!, "skip");
      return { entities: this.last!, skipped: true, superseded: false };
    }
    if (s) s.runs++;
    const { entities, committed } = await this.optimized(
      hass,
      config,
      template,
      opts,
    );
    if (opts.verify)
      await this.verify(hass, config, template, entities, "compute");
    if (opts.debug && s && (s.runs + s.skips) % 50 === 0)
      console.info("[auto-entities] stats", { ...s });
    // `superseded`: a reset or a newer run overtook this one; its result must not be painted
    return { entities, skipped: false, superseded: !committed };
  }

  async verify(hass, config, template, got: EntityList, where: string) {
    const s = stats();
    const want = await legacy_select(hass, config, template);
    s.verified++;
    if (
      !compare_deep(
        JSON.parse(JSON.stringify(got)),
        JSON.parse(JSON.stringify(want)),
      )
    ) {
      s.mismatches++;
      console.error("[auto-entities] MISMATCH (" + where + ")", {
        config: JSON.stringify(config.filter),
        optimized: got.map((e) => e.entity),
        legacy: want.map((e) => e.entity),
      });
    }
  }

  async optimized(
    hass,
    config,
    template,
    opts: OptimizeOptions,
  ): Promise<{ entities: EntityList; committed: boolean }> {
    const gen = this.gen;
    const seq = ++this.seq;
    let entities = base_entities(config, template);
    const states = hass.states;
    const ver = entity_set(states).ver;
    const stateKeys = tracker.keys;
    const watch = new Set<string>();
    for (const e of entities) if (e?.entity) watch.add(e.entity);
    let volatile = false;

    const include = config.filter?.include ?? [];
    const exclude = config.filter?.exclude ?? [];
    if (is_time_dependent(config) || has_hidden_inputs(config)) volatile = true;
    group_deps(include, watch);
    group_deps(exclude, watch);

    const include_fns = await Promise.all(
      include.map(async (filter, index) => {
        if (filter.type !== undefined)
          return async () => [filter as LovelaceRowConfig];

        // Static part (registry-only rules): built once per filter, candidates cached per entity-set version
        const key = JSON.stringify(filter);
        let c = opts.candidate_cache ? this.statics[index] : undefined;
        if (!c || c.key !== key) {
          const { stat, dyn } = split_filter(filter);
          const any = stat.length + dyn.length > 0; // no rules at all matches nothing (as get_filter)
          c = {
            key,
            any,
            dyn,
            isStatic: any ? await build_predicate(hass, stat) : () => false,
            candVer: -1,
            cand: [] as string[],
            risky: new Set<string>(),
          };
          if (opts.candidate_cache) this.statics[index] = c;
        }
        if (!opts.candidate_cache || c.candVer !== ver) {
          const cand: string[] = [];
          const risky = new Set<string>();
          for (const id of stateKeys) {
            try {
              if (c.isStatic(states[id] ?? { entity_id: id })) cand.push(id);
            } catch (err) {
              // The original evaluates rules in config order and short-circuits, so it may never reach
              // the rule that throws. Keep the entity and let the in-order predicate decide.
              cand.push(id);
              risky.add(id);
            }
          }
          c.cand = cand;
          c.risky = risky;
          c.candVer = ver;
        }
        const cand: string[] = c.cand;
        const risky: Set<string> = c.risky;
        for (const id of cand) watch.add(id);

        // Dynamic part + sorter capture `hass`, so they are rebuilt for every run (like get_filter)
        const dynamic = c.any
          ? await build_predicate(hass, c.dyn)
          : () => false;
        const in_order = risky.size
          ? await get_filter(hass, filter)
          : undefined;
        const sorter = filter.sort?.method
          ? await get_sorter(hass, filter.sort)
          : (x) => x;
        const post_process = async (entity) =>
          await process_entity(
            hass,
            { ...entity, ...filter.options },
            entity.entity,
          );

        return async () => {
          let add: EntityList = [];
          for (const id of cand) {
            const s = states[id];
            if (!s) continue;
            if (risky.has(id) ? in_order!(id) : dynamic(s))
              add.push({ entity: id } as any);
          }
          add = await sorter(add);
          if (filter.sort?.count || filter.sort?.first) {
            const start = filter.sort?.first ?? 0;
            const count = filter.sort?.count ?? Infinity;
            add = add.slice(start, start + count);
          }
          return await Promise.all(add.map(post_process));
        };
      }),
    );

    // Exclude filters are compiled per run: their closures capture `hass`
    const exclude_fns = await Promise.all(
      exclude.map(async (filter) => await get_filter(hass, filter)),
    );

    entities = entities.concat(
      ...(await Promise.all(include_fns.map((f) => f()))),
    );
    // exclude/sort/pagination read the state of every row (type: rows and options.entity included)
    for (const row of entities) if (row?.entity) watch.add(row.entity);
    entities = entities.filter((e) => !exclude_fns.some((f) => f(e)));
    entities = await finish(hass, config, entities);

    // Commit what this result depended on, unless a reset/newer run superseded this one
    const committed = gen === this.gen && seq > this.committed;
    if (committed) {
      this.committed = seq;
      this.watchIds = [...watch];
      this.watchRefs = this.watchIds.map((id) => states[id]);
      this.watchVer = ver;
      this.watchLocale = hass.locale;
      this.watchLang = hass.language;
      this.volatile = volatile;
      this.last = entities;
      this.dirty = false;
    }
    return { entities, committed };
  }
}
