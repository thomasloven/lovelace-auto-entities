import { areaByName, areaDevices, deviceByName, deviceEntities } from "card-tools/src/devices";

function match(pattern, value) {
  if(typeof(value) === "string" && typeof(pattern) === "string") {
    if((pattern.startsWith('/') && pattern.endsWith('/')) || pattern.indexOf('*') !== -1) {
      if(!pattern.startsWith('/')) { // Convert globs to regex
        pattern = pattern
        .replace(/\./g, '\.')
        .replace(/\*/g, '.*');
        pattern = `/^${pattern}$/`;
      }
      let regex = new RegExp(pattern.slice(1,-1));
      return regex.test(value);
    }
  }

  if(typeof(pattern) === "string") {
    // Comparisons assume numerical values
    if(pattern.startsWith("<=")) return parseFloat(value) <= parseFloat(pattern.substr(2));
    if(pattern.startsWith(">=")) return parseFloat(value) >= parseFloat(pattern.substr(2));
    if(pattern.startsWith("<")) return parseFloat(value) < parseFloat(pattern.substr(1));
    if(pattern.startsWith(">")) return parseFloat(value) > parseFloat(pattern.substr(1));
    if(pattern.startsWith("!")) return parseFloat(value) != parseFloat(pattern.substr(1));
    if(pattern.startsWith("=")) return parseFloat(value) == parseFloat(pattern.substr(1));
  }

  return pattern === value;
}

const groupContainsEntityRecursively = (hass, groupName, entityId, iterationLevel = 0) => {
  // directly return false if we are 5 levels deep into the recursion
  // to avoid infinite loops
  if (iterationLevel > 5) {
    return false;
  }

  const group = hass.states[groupName];

  if (!group.attributes.entity_id || group.attributes.entity_id.length < 0) {
    return false;
  }

  const groupEntities = group.attributes.entity_id;

  if (groupEntities.includes(entityId)) {
    return true;
  }

  // Check recursively if an entity is found
  return groupEntities
    .filter((groupEntity) => groupEntity.startsWith("group."))
    .some((groupEntity) => {
      return groupContainsEntityRecursively(
        hass,
        groupEntity,
        entityId,
        iterationLevel + 1
      );
    });
};

export function entity_filter(hass, filter) {
  return function(e) {
    const entity = typeof(e) === "string"
    ? hass.states[e]
    : hass.states[e.entity];
    if(!entity) return false;
    for (const [key, value] of Object.entries(filter)) {
      switch(key.split(" ")[0]) {
        case "options":
        case "sort":
          break;

        case "domain":
          if(!match(value, entity.entity_id.split('.')[0]))
            return false;
          break;

        case "entity_id":
          if(!match(value, entity.entity_id))
            return false;
          break;

        case "state":
          if(!match(value, entity.state))
            return false;
          break;

        case "name":
          if(!entity.attributes.friendly_name
            || !match(value, entity.attributes.friendly_name)
          )
            return false;
          break;

        case "group":
          if(!value.startsWith("group.")
            || (filter.options && filter.options.nested_groups && !groupContainsEntityRecursively(hass, value, entity.entity_id))
            || ((!filter.options || !filter.options.nested_groups)
                && (!hass.states[value]
                  || !hass.states[value].attributes.entity_id
                  || !hass.states[value].attributes.entity_id.includes(entity.entity_id)))
          )
            return false;
          break;

        case "attributes":
          for(const [k, v] of Object.entries(value)) {
            let attr = k.split(" ")[0].trim();
            let entityAttribute = entity.attributes;
            while(attr && entityAttribute) {
              let step;
              [step, attr] = attr.split(":");
              entityAttribute = entityAttribute[step];
            }
            if(entityAttribute === undefined
              || (v !== undefined && !match(v, entityAttribute))
            )
              return false;
            continue;
          }
          break;

        case "not":
          if(entity_filter(hass,value)(e))
            return false;
          break;

        case "or":
          for(const f of value) {
            if(entity_filter(hass, f)(e))
              return true;
          }
          return false;

        case "device":
          if(!window.cardToolsData || !window.cardToolsData.devices)
            return false;
          let _deviceMatch = false;
          for(const d of window.cardToolsData.devices) {
            if (match(value, d.name_by_user) || match(value, d.name)){
              if(deviceEntities(d).includes(entity.entity_id))
                _deviceMatch = true;
            }
          }
          if(!_deviceMatch)
            return false;
          break;

        case "area":
          if(!window.cardToolsData || !window.cardToolsData.areas)
            return false;
          let _areaMatch = false;
          for (const a of window.cardToolsData.areas) {
            if(match(value, a.name)) {
              if(areaDevices(a).flatMap(deviceEntities).includes(entity.entity_id))
                _areaMatch = true;
            }
          }
          if(!_areaMatch)
            return false;
          break;

        case 'last_changed':
          {
            const now = new Date().getTime();
            const changed = new Date(entity.last_changed).getTime();
            if(!match(value, (now-changed)/60000))
              return false;
            break;
          }

        case 'last_updated':
          {
            const now = new Date().getTime();
            const updated = new Date(entity.last_updated).getTime();

            if(!match(value, (now-updated)/60000))
              return false;
            break;
          }

        default:
          return false;
      }
    }
    return true;
  }
}
