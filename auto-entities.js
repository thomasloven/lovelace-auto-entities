const LitElement = customElements.get('home-assistant-main')
  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
  : Object.getPrototypeOf(customElements.get('hui-view'));

const html = LitElement.prototype.html;

LitElement.prototype.css;

function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}function lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    return root;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout");
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  return root;
}

async function load_lovelace() {
  if(customElements.get("hui-view")) return true;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement("partial-panel-resolver");
  ppr.hass = {panels: [{
    url_path: "tmp",
    "component_name": "lovelace",
  }]};
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();
  if(!customElements.get("ha-panel-lovelace")) return false;
  const p = document.createElement("ha-panel-lovelace");
  p.hass = hass();
  if(p.hass === undefined) {
    await new Promise(resolve => {
      window.addEventListener('connection-status', (ev) => {
        console.log(ev);
        resolve();
      }, {once: true});
    });
    p.hass = hass();
  }
  p.panel = {config: {mode: null}};
  p._fetchConfig();
  return true;
}

const areaData = hass().callWS({type: "config/area_registry/list"});
const deviceData = hass().callWS({type: "config/device_registry/list"});
const entityData = hass().callWS({type: "config/entity_registry/list"});

async function getData(){
    window.cardToolsData = window.cardToolsData || {
        areas: await areaData,
        devices: await deviceData,
        entities: await entityData,
    };
    return window.cardToolsData;
}

getData();

function areaDevices(area) {
    const data = window.cardToolsData;
    let devices = [];
    if(!area) return devices;
    for(const d of data.devices) {
        if(d.area_id === area.area_id) {
            devices.push(d);
        }
    }
    return devices;
}
function deviceEntities(device) {
    const data = window.cardToolsData;
    let entities = [];
    if(!device) return entities;
    for(const e of data.entities) {
        if(e.device_id === device.id) {
            entities.push(e.entity_id);
        }
    }
    return entities;
}

function match(pattern, value) {
  if (typeof value === "string" && typeof pattern === "string") {
    if (pattern.startsWith('/') && pattern.endsWith('/') || pattern.indexOf('*') !== -1) {
      if (!pattern.startsWith('/')) {
        // Convert globs to regex
        pattern = pattern.replace(/\./g, '\.').replace(/\*/g, '.*');
        pattern = `/^${pattern}$/`;
      }

      let regex = new RegExp(pattern.slice(1, -1));
      return regex.test(value);
    }
  }

  if (typeof pattern === "string") {
    // Comparisons assume numerical values
    if (pattern.startsWith("<=")) return parseFloat(value) <= parseFloat(pattern.substr(2));
    if (pattern.startsWith(">=")) return parseFloat(value) >= parseFloat(pattern.substr(2));
    if (pattern.startsWith("<")) return parseFloat(value) < parseFloat(pattern.substr(1));
    if (pattern.startsWith(">")) return parseFloat(value) > parseFloat(pattern.substr(1));
    if (pattern.startsWith("!")) return parseFloat(value) != parseFloat(pattern.substr(1));
    if (pattern.startsWith("=")) return parseFloat(value) == parseFloat(pattern.substr(1));
  }

  return pattern === value;
}

function entity_filter(hass, filter) {
  return function (e) {
    const entity = typeof e === "string" ? hass.states[e] : hass.states[e.entity];
    if (!entity) return false;

    for (const [key, value] of Object.entries(filter)) {
      switch (key.split(" ")[0]) {
        case "options":
        case "sort":
          break;

        case "domain":
          if (!match(value, entity.entity_id.split('.')[0])) return false;
          break;

        case "entity_id":
          if (!match(value, entity.entity_id)) return false;
          break;

        case "state":
          if (!match(value, entity.state)) return false;
          break;

        case "name":
          if (!entity.attributes.friendly_name || !match(value, entity.attributes.friendly_name)) return false;
          break;

        case "group":
          if (!value.startsWith("group.") || !hass.states[value] || !hass.states[value].attributes.entity_id || !hass.states[value].attributes.entity_id.includes(entity.entity_id)) return false;
          break;

        case "attributes":
          for (const [k, v] of Object.entries(value)) {
            let attr = k.split(" ")[0].trim();
            let entityAttribute = entity.attributes;

            while (attr && entityAttribute) {
              let step;
              [step, attr] = attr.split(":");
              entityAttribute = entityAttribute[step];
            }

            if (entityAttribute === undefined || v !== undefined && !match(v, entityAttribute)) return false;
            continue;
          }

          break;

        case "not":
          if (entity_filter(hass, value)(e)) return false;
          break;

        case "or":
          for (const f of value) {
            if (entity_filter(hass, f)(e)) return true;
          }

          return false;

        case "device":
          if (!window.cardToolsData || !window.cardToolsData.devices) return false;
          let _deviceMatch = false;

          for (const d of window.cardToolsData.devices) {
            if (match(value, d.name_by_user) || match(value, d.name)) {
              if (deviceEntities(d).includes(entity.entity_id)) _deviceMatch = true;
            }
          }

          if (!_deviceMatch) return false;
          break;

        case "area":
          if (!window.cardToolsData || !window.cardToolsData.areas) return false;
          let _areaMatch = false;

          for (const a of window.cardToolsData.areas) {
            if (match(value, a.name)) {
              if (areaDevices(a).flatMap(deviceEntities).includes(entity.entity_id)) _areaMatch = true;
            }
          }

          if (!_areaMatch) return false;
          break;

        case 'last_changed':
          {
            const now = new Date().getTime();
            const changed = new Date(entity.last_changed).getTime();
            if (!match(value, (now - changed) / 60000)) return false;
            break;
          }

        case 'last_updated':
          {
            const now = new Date().getTime();
            const updated = new Date(entity.last_updated).getTime();
            if (!match(value, (now - updated) / 60000)) return false;
            break;
          }

        default:
          return false;
      }
    }

    return true;
  };
}

function entity_sorter(hass, method) {
  if (typeof method === "string") {
    method = {
      method
    };
  }

  return function (a, b) {
    const entityA = typeof a === "string" ? hass.states[a] : hass.states[a.entity];
    const entityB = typeof b === "string" ? hass.states[b] : hass.states[b.entity];
    if (entityA === undefined || entityB === undefined) return 0;
    const [lt, gt] = method.reverse ? [-1, 1] : [1, -1];

    function compare(_a, _b) {
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

    switch (method.method) {
      case "domain":
        return compare(entityA.entity_id.split(".")[0], entityB.entity_id.split(".")[0]);

      case "entity_id":
        return compare(entityA.entity_id, entityB.entity_id);

      case "friendly_name":
      case "name":
        return compare(entityA.attributes.friendly_name || entityA.entity_id.split(".")[1], entityB.attributes.friendly_name || entityB.entity_id.split(".")[1]);

      case "state":
        return compare(entityA.state, entityB.state);

      case "attribute":
        let _a = entityA.attributes;
        let _b = entityB.attributes;
        let attr = method.attribute;

        while (attr) {
          let k;
          [k, attr] = attr.split(":");
          _a = _a[k];
          _b = _b[k];
          if (_a === undefined && _b === undefined) return 0;
          if (_a === undefined) return lt;
          if (_b === undefined) return gt;
        }

        return compare(_a, _b);

      case "last_changed":
        method.numeric = true; // Note A and B are swapped because you'd most likely want to sort by most recently changed first

        return compare(new Date(entityB.last_changed).getTime(), new Date(entityA.last_changed).getTime());

      case "last_updated":
        method.numeric = true;
        return compare(new Date(entityB.last_updated).getTime(), new Date(entityA.last_updated).getTime());

      case "last_triggered":
        if (entityA.attributes.last_triggered == null || entityB.attributes.last_triggered == null) return 0;
        method.numeric = true;
        return compare(new Date(entityB.attributes.last_triggered).getTime(), new Date(entityA.attributes.last_triggered).getTime());

      default:
        return 0;
    }
  };
}

function fireEvent(ev, detail, entity=null) {
  ev = new Event(ev, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  ev.detail = detail || {};
  if(entity) {
    entity.dispatchEvent(ev);
  } else {
    var root = lovelace_view();
    if (root) root.dispatchEvent(ev);
  }
}

const CUSTOM_TYPE_PREFIX = "custom:";

let helpers = window.cardHelpers;
const helperPromise = new Promise(async (resolve, reject) => {
  if(helpers) resolve();

  const updateHelpers = async () => {
    helpers = await window.loadCardHelpers();
    window.cardHelpers = helpers;
    resolve();
  };

  if(window.loadCardHelpers) {
    updateHelpers();
  } else {
    // If loadCardHelpers didn't exist, force load lovelace and try once more.
    window.addEventListener("load", async () => {
      load_lovelace();
      if(window.loadCardHelpers) {
        updateHelpers();
      }
    });
  }
});

function errorElement(error, origConfig) {
  const cfg = {
    type: "error",
    error,
    origConfig,
  };
  const el = document.createElement("hui-error-card");
  customElements.whenDefined("hui-error-card").then(() => {
    const newel = document.createElement("hui-error-card");
    newel.setConfig(cfg);
    if(el.parentElement)
      el.parentElement.replaceChild(newel, el);
  });
  helperPromise.then(() => {
    fireEvent("ll-rebuild", {}, el);
  });
  return el;
}

function _createElement(tag, config) {
  let el = document.createElement(tag);
  try {
    el.setConfig(JSON.parse(JSON.stringify(config)));
  } catch (err) {
    el = errorElement(err, config);
  }
  helperPromise.then(() => {
    fireEvent("ll-rebuild", {}, el);
  });
  return el;
}

function createLovelaceElement(thing, config) {
  if(!config || typeof config !== "object" || !config.type)
    return errorElement(`No ${thing} type configured`, config);

  let tag = config.type;
  if(tag.startsWith(CUSTOM_TYPE_PREFIX))
    tag = tag.substr(CUSTOM_TYPE_PREFIX.length);
  else
    tag = `hui-${tag}-${thing}`;

  if(customElements.get(tag))
    return _createElement(tag, config);

  const el = errorElement(`Custom element doesn't exist: ${tag}.`, config);
  el.style.display = "None";

  const timer = setTimeout(() => {
    el.style.display = "";
  }, 2000);

  customElements.whenDefined(tag).then(() => {
    clearTimeout(timer);
    fireEvent("ll-rebuild", {}, el);
  });

  return el;
}

function createCard(config) {
  if(helpers) return helpers.createCardElement(config);
  return createLovelaceElement('card', config);
}

const ID_STORAGE_KEY = 'lovelace-player-device-id';
function _deviceID() {
  if(!localStorage[ID_STORAGE_KEY])
  {
    const s4 = () => {
      return Math.floor((1+Math.random())*100000).toString(16).substring(1);
    };
    if(window['fully'] && typeof fully.getDeviceId === "function")
      localStorage[ID_STORAGE_KEY] = fully.getDeviceId();
    else
      localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY];
}
let deviceID = _deviceID();

const setDeviceID = (id) => {
  if(id === null) return;
  if(id === "clear") {
    localStorage.removeItem(ID_STORAGE_KEY);
  } else {
    localStorage[ID_STORAGE_KEY] = id;
  }
  deviceID = _deviceID();
};

const params = new URLSearchParams(window.location.search);
if(params.get('deviceID')) {
  setDeviceID(params.get('deviceID'));
}

function subscribeRenderTemplate(conn, onChange, params, stringify=true) {
  // params = {template, entity_ids, variables}
  if(!conn)
    conn = hass().connection;
  let variables = {
    user: hass().user.name,
    browser: deviceID,
    hash: location.hash.substr(1) || ' ',
    ...params.variables,
  };
  let template = params.template;
  let entity_ids = params.entity_ids;

  return conn.subscribeMessage(
    (msg) => {
      if(stringify) {
        let res = String(msg.result);
        // Localize "_(key)" if found in template results
        const localize_function = /_\([^)]*\)/g;
        res = res.replace(localize_function, (key) => hass().localize(key.substring(2, key.length-1)) || key);
        onChange(res);
      } else {
        onChange(msg.result);
      }
    },
    { type: "render_template",
      template,
      variables,
      entity_ids,
    }
  );
}

var name = "auto-entities";
var version = "1.8.0b1";
var description = "";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch",
	"update-card-tools": "npm uninstall card-tools && npm install thomasloven/lovelace-card-tools"
};
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
	"@babel/core": "^7.13.1",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^11.2.0",
	rollup: "^2.39.0",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.30.0",
	typescript: "^4.1.5"
};
var dependencies = {
	"card-tools": "github:thomasloven/lovelace-card-tools",
	"lit-element": "^2.4.0",
	tslib: "^2.1.0"
};
var pjson = {
	name: name,
	"private": true,
	version: version,
	description: description,
	scripts: scripts,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

class AutoEntities extends LitElement {
  static get properties() {
    return {
      hass: {}
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error("No configuration.");
    }

    if (!config.card || !config.card.type) {
      throw new Error("No card type specified.");
    }

    if (!config.filter && !config.entities) {
      throw new Error("No filters specified.");
    }

    config = JSON.parse(JSON.stringify(config));

    if (!this._config) {
      this._config = config;
      this.hass = hass();

      this._getEntities();

      this.cardConfig = {
        [config.card_param || "entities"]: this.entities,
        ...config.card
      };
      this.card = createCard(this.cardConfig);
    } else {
      this._config = config;
      this.hass = this.hass;
    }

    if (config.filter && config.filter.template) {
      this.template = "";

      if (String(config.filter.template).includes("{%") || String(config.filter.template).includes("{{")) {
        subscribeRenderTemplate(null, res => {
          this.template = res;

          this._getEntities();
        }, {
          template: config.filter.template,
          variables: {
            config
          },
          entity_ids: config.filter.entity_ids
        }, false);
      }
    } // Reevaluate all filters once areas have been loaded


    getData().then(() => this._getEntities());
  }

  _getEntities() {
    const format_entities = e => {
      if (!e) return null;
      if (typeof e === "string") return {
        entity: e.trim()
      };
      return e;
    };

    let entities = []; // Start with any entities added by the `entities` parameter

    if (this._config.entities) entities = entities.concat(this._config.entities.map(format_entities));

    if (!this.hass || !this._config.filter) {
      this.entities = entities;
      return;
    }

    if (this.template) {
      if (typeof this.template === "string") entities = entities.concat(this.template.split(/[\s,]+/).map(format_entities));else entities = entities.concat(this.template.map(format_entities));
    }

    entities = entities.filter(Boolean);

    if (this._config.filter.include) {
      const all_entities = Object.keys(this.hass.states).map(format_entities);

      for (const f of this._config.filter.include) {
        if (f.type !== undefined) {
          // If the filter has a type, it's a special entry
          entities.push(f);
          continue;
        }

        let add = all_entities.filter(entity_filter(this.hass, f)).map(e => JSON.parse(JSON.stringify(new Object({ ...e,
          ...f.options
        })).replace(/this.entity_id/g, e.entity)));

        if (f.sort !== undefined) {
          // Sort per filter
          add = add.sort(entity_sorter(this.hass, f.sort));
        }

        entities = entities.concat(add);
      }
    }

    if (this._config.filter.exclude) {
      for (const f of this._config.filter.exclude) {
        entities = entities.filter(e => {
          // Don't exclude special entries
          if (typeof e !== "string" && e.entity === undefined) return true;
          return !entity_filter(this.hass, f)(e);
        });
      }
    }

    if (this._config.sort) {
      // Sort everything
      entities = entities.sort(entity_sorter(this.hass, this._config.sort));

      if (this._config.sort.count) {
        const start = this._config.sort.first || 0;
        entities = entities.slice(start, start + this._config.sort.count);
      }
    }

    if (this._config.unique) {
      function compare(a, b) {
        if (typeof a !== typeof b) return false;
        if (typeof a !== "object") return a === b;
        if (Object.keys(a).lenght !== Object.keys(b).length) return false;
        if (Object.keys(a).some(k => !Object.keys(b).includes(k))) return false;
        return Object.keys(a).every(k => compare(a[k], b[k]));
      }

      let newEntities = [];

      for (const e of entities) {
        if (this._config.unique === "entity" && newEntities.some(i => i.entity === e.entity)) continue;
        if (newEntities.some(i => compare(i, e))) continue;
        newEntities.push(e);
      }

      entities = newEntities;
    }

    this.entities = entities;
  }

  set entities(ent) {
    function compare(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;

      for (var i = 0; i < a.length; i++) if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;

      return true;
    }

    if (!compare(ent, this._entities)) {
      this._entities = ent;
      this.cardConfig = { ...this.cardConfig,
        entities: this._entities
      };

      if (ent.length === 0 && this._config.show_empty === false) {
        this.style.display = "none";
        this.style.margin = "0";
      } else {
        this.style.display = null;
        this.style.margin = null;
      }
    }
  }

  get entities() {
    return this._entities;
  }

  set cardConfig(cardConfig) {
    this._cardConfig = cardConfig;
    if (this.card) this.card.setConfig(cardConfig);
  }

  get cardConfig() {
    return this._cardConfig;
  }

  updated(changedProperties) {
    if (changedProperties.has("hass") && this.hass) {
      this.card.hass = this.hass; // Run this in a timeout to improve performance

      setTimeout(() => this._getEntities(), 0);
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html` ${this.card}`;
  }

  getCardSize() {
    let len = 0;
    if (this.card && this.card.getCardSize) len = this.card.getCardSize();
    if (len === 1 && this.entities.length) len = this.entities.length;
    if (len === 0 && this._config.filter && this._config.filter.include) len = Object.keys(this._config.filter.include).length;
    return len || 1;
  }

}

if (!customElements.get("auto-entities")) {
  customElements.define("auto-entities", AutoEntities);
  console.info(`%cAUTO-ENTITIES ${pjson.version} IS INSTALLED`, "color: green; font-weight: bold", "");
}
