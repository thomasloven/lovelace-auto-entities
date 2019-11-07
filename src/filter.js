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

export function entity_filter(hass, filter) {
    return function(e) {
        const entity = typeof(e) === "string"
            ? hass.states[e]
            : hass.states[e.entity];
        if(!e) return false;
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
                        || !match(value, entity.attributes.friendly_name))
                        return false;
                    break;

                case "group":
                    if(!value.startsWith("group.")
                        || !hass.states[value]
                        || !hass.states[value].attributes.entity_id
                        || !hass.states[value].attributes.entity_id.includes(entity.entity_id)
                    )
                        return false;
                    break;

                case "attributes":
                    for(const [k, v] of Object.entries(value)) {
                        let attr = k.split(" ")[0];
                        let entityAttribute = entity.attributes;
                        while(attr && entityAttribute) {
                            let step;
                            [step, attr] = attr.split(":");
                            entityAttribute = entityAttribute[step];
                        }
                        if(entityAttribute === undefined
                            || (v && !match(v, entityAttribute))
                            )
                            return false;
                        continue;
                    }
                    break;
                
                case "not":
                    if(entity_filter(hass,value)(e))
                        return false;
                    break;
                
                case "device":
                    const _deviceEntities = deviceEntities(deviceByName(value));
                    if(!_deviceEntities.includes(entity.entity_id))
                        return false;
                    break;
                
                case "area":
                    const _areaDevices = areaDevices(areaByName(value));
                    const _areaEntities = _areaDevices.flatMap(deviceEntities);
                    if(!_areaEntities.includes(entity.entity_id))
                        return false;
                    break;

                default:
                    return false;
            }
        }
        return true;
    }
}