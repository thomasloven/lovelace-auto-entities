# auto-entities

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

Automatically populate lovelace cards with entities matching certain criteria.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

## Usage

```yaml
type: custom:auto-entities
card: <card>
card_param: <card_param>
entities:
  - <entity>
  - <entity>
filter:
  template: <template>
  include:
    - <filter>
    - <filter>
  exclude:
    - <filter>
    - <filter>

show_empty: <show_empty>
unique: <unique>
sort: <sort_method>
```

## Options

- `card:` **Required.** The card to display. Specify this as you would specify any normal lovelace card, but ommit the `entities:` parameter.
- `entities:` Any entities added here will be added to the card before any filters are applied.
- `filter:`
  - `template:` A jinja2 template evaluating to a list of entries to include
  - `include:` A list of filters specifying which entities to add to the card
  - `exclude:` A list of filters specifying which entities to remove from the card
- `names:`
  - `transforms:` A list of transforms to be applied to all entity names
- `show_empty:` Whether to display the card if it has no entities. Default: `true`. Note that any filter with a `type` option will be ignored.
- `else:` Card to display if main card has no entities. Overrides `show_empty`.
- `unique:` Whether to remove duplicate values after filtering and sorting. Set to `true` to remove exact duplicate entries. Set to `entity` to remove entries with the same entity id. Default: `false`.
- `sort:` How to sort the entities of the card. Default: `none`. See [Sorting entities for details](#sorting-entities)
- `card_param:` The parameter of the card to populate. Default: `entities`.

### Filters

The two main filter sections `include` and `exclude` each takes a list of filters.

Filters have the following options, and will match any entity fulfilling **ALL** options:

- `domain:` Match entity domain (e.g. `light`, `binary_sensor`, `media_player`)
- `state:` Match entity state (e.g. `"on"`, `home`, `"3.14"`)
- `entity_id:` Match entity id (e.g. `light.bed_light`, `input_binary.weekdays_only`)
- `name:` Match friendly name attribute (e.g. `Kitchen lights`, `Front door`)
- `group:` Match entities in given group (e.g. `group.living_room_lights`)
- `area:` Match entities in given area (e.g. `Kitchen`)
- `device:` Match entities belonging to given device (e.g. `Thomas iPhone`)
- `label:` Match entities that has a certain label (e.g. `Important entities`)
- `device_manufacturer` Match entities belonging to a device by a given manufacturer (e.g. `IKEA`)
- `device_model` Match entities belonging to a device of a given model (e.g. `Hue white ambiance E26/E27 (8718696548738)`)
- `integration:` Match entities by integration identifier (e.g. `plex`, `input_boolean`, `xiaomi_miio`, `mobile_app` - Many integrations cannot be matched due to Home Assistant limitations)
- `hidden_by:` Match who has hidden an entity (e.g. `user`, `integration`)
- `attributes:` Map of `attribute: value` pairs to match.
- `last_changed:` Match minutes since last state change (most useful as a comparison, e.g. `last_changed: < 15`)
- `last_updated:` Match minutes since last update
- `entity_category:` Match [entity category](https://developers.home-assistant.io/docs/core/entity#generic-properties) (Currently `config` or `diagnostic`)

Special options:

- `options:` Map of options to apply to entity when passed to card.
- `type:` Type of special entries to include in entity list. Entries with a `type:` will not be filtered.
- `not:` Specifies a filter that entities must _not_ match.
- `sort:` Specifies a method to sort entities matched by _this filter only_.
- `or:` Match any in a list of filters.
- `and:` Match all in a list of filters (not necessary since `and` is implicit).

### Template filter

The filter section `template` takes a jinja2 template which evaluates to a list of entities or entity objects.

### Names

Names `transforms` have the following options:

- `type:` The type of the transform. Supported types are `set`, `prefix`, `suffix` and `replace`.
- `value:` For `set`, `prefix` and `suffix` types this specifies the new name value to use.
- `match:` For `replace` type, this specifies the name value to be replaced.
- `replacement:` For `replace` type, this specifies the name value to be used as the replacement (Defaults to empty string if not specified).
- `trim:` Whether or not to trim whitespace from the name after performing a transform on it.

The `value` or `match` and `replacement` options are all in term composed of the following sub options which are all optional although one must be specified:

- `text:` A plain text string value for a name.
- `group:` The entity id of a group whose name to use.
- `area:` Whether to use the area name of the entity.
- `device_manufacturer:` Whether to use the device manufacturer of the entity.
- `device_model:` Whether to use the device manufacturer of the entity.

Show a list of lights and set their name to a group:

```yaml
filter:
  include:
    domain: light
names:
  transforms:
    - type: set
      value:
        group: light.my_light_group
```

Show a list of lights and set their name to their area:

```yaml
filter:
  include:
    domain: light
names:
  transforms:
    - type: set
      value:
        area: true
```

Remove the room name from the names of a list of lights:

```yaml
filter:
  include:
    domain: light
names:
  transforms:
    - type: replace
      match:
        area: true
      # this is the same as:
      # match:
      #   area: true
      # replace:
      #   text: ""
```

Replace the room name with device model from the names of a list of lights:

```yaml
filter:
  include:
    domain: light
names:
  transforms:
    - type: replace
      match:
        area: true
      replace:
        device_model: true
```

Remove area and then some text from the names of a list of lights:

```yaml
filter:
  include:
    domain: light
names:
  transforms:
    - type: replace
      match:
        area: true
    - type: replace
      match:
        text: Lights
    - type: replace
      match:
        text: Light
```

## How it works

`auto-entities` creates a list of entities by:

1. Including every entity given in `entities:` (this allow nesting of `auto-entities`if you'd want to do that for some reason...)
2. Include every entity listed in a `filter.template` evaluation
3. Include all entities that matches **ALL** options of **ANY** filter in the `filter.include` section. The same entity may be included several times by different filters.
4. Remove all entities that matches **ALL** options on **ANY** filter in the `filter.exclude` section.

It then creates a card based on the configuration given in `card:`, and fills in `entities:` of that card with the entities from above.

## Matching rules

### Wildcards

Any filter option can use `*` as a wildcard for string comparison. Note that strings must be quoted when doing this:

```yaml
filter:
  include:
    - name: "Bedroom *"
    - entity_id: "sensor.temperature_*_max"
```

### Regular expressions

Any filter option can use [javascript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) for string comparison. To do this, enclose the regex in `/`. Also make sure to quote the string:

```yaml
filter:
  include:
    - name: "/^.* [Ll]ight$/"
    - entity_id: "/sensor.temperature_4[abd]/"
```

### Numerical comparison

Any filter option dealing with numerical quantities can use comparison operators if specified as a string (must be quoted):

```yaml
filter:
  include:
    - attributes:
        battery: "<= 50" # Attribute battery_level is 50 or less
    - state: "> 25" # State is greater than 25
    - attributes:
        count: "! 2" # Attribute count is not equal to 2
    - state: "= 12" # State is exactly 12 (also matches "12", "12.0" etc.)
    - state: 12 # State is exactly 12 but not "12"
```

### Time since an event

Any filter option dealing with an event time can filter entities by time elapsed since that event:

```yaml
filter:
  include:
    - attributes:
        last_seen: "> 1h ago" # Entity was seen more than 1 hour ago
    - last_updated: "< 20m ago" # Entity was updated less than 20 minutes ago
    - last_triggered: "> 1d ago" # Entity was triggered more than 1 day ago
```

All the numeric comparison operators are available.

### Repeating options

Any option can be used more than once by appending a number or string to the option name:

```yaml
filter:
  include:
    - state 1: "> 100"
      state 2: "< 200"
```

The filter above matches entities where the state is above 100 **AND** below 200. Compare to the following:

```yaml
filter:
  include:
    - state: "< 100"
    - state: "> 200"
```

The two filters above together match entities where the state is below 100 **OR** above 200.

### Object attributes

Some entity attributes actually contain several values. One example is `hs_color` for a light, which has one value for Hue and one for Saturation. Such values can be stepped into using keys or indexes separated by a colon (`:`):

```yaml
filter:
  include:
    - attributes:
        hs_color:1: ">30"
```

The example above matches lights with a `hs_color` saturation value greater than 30.

### Stringification

Some entity attributes are not text strings, but can be advanced structures. By starting the pattern to match with `$$` auto-entities will convert the attribute to JSON before comparing:

```yaml
filter:
  include:
    - attributes:
        entity_id: "$$*"
```

The example above matches any entity that has a `entity_id` attribute - i.e. all kinds of group entities.

## Sorting entities

Entities can be sorted, either on a filter-by-filter basis by adding a `sort:` option to the filter, or all at once after all filters have been applied using the `sort:` option of `auto-entities` itself.

Sorting methods are specified as:

```yaml
sort:
  method: <method>
  reverse: <reverse>
  ignore_case: <ignore_case>
  attribute: <attribute>
  first: <first>
  count: <count>
  numeric: <numeric>
  ip: <ip>
```

- `method:` **Required** One of `domain`, `entity_id`, `name`, `device`, `area`, `state`, `attribute`, `last_changed` `last_updated` or `last_triggered`.
- `reverse:` Set to `true` to reverse the order. Default: `false`.
- `ignore_case:` Set to `true` to make the sort case-insensitive. Default: `false`.
- `numeric:` Set to `true` to sort by numeric value. Default: `false` except for `last_changed`, `last_updated` and `last_triggered` sorting methods.
- `ip:` Set to `true` to sort IP addresses group by group (e.g. 192.168.1.2 will be before 192.168.1.100).
- `attribute:` Attribute to sort by if `method: attribute`. Can be an _object attribute_ as above (e.g. `attribute: rgb_color:2`)
- `first` and `count` can be used to only display `<count>` entities, starting with the `<first>` (starts with 0).

## Entity options

In the `options:` option of the filters, the string `this.entity_id` will be replaced with the matched entity_id. Useful for service calls - see below.

## Examples

Show all entities, except yahoo weather, groups and zones in a glance card:

```yaml
type: custom:auto-entities
card:
  type: glance
filter:
  include: [{}]
  exclude:
    - entity_id: "*yweather*"
    - domain: group
    - domain: zone
```

Show all gps `device_tracker`s with battery level less than 50:

```yaml
type: custom:auto-entities
card:
  type: entities
  title: Battery warning
filter:
  include:
    - domain: device_tracker
      options:
        secondary_info: last-changed
      attributes:
        battery: "< 50"
        source_type: gps
```

Show all lights that are on:

```yaml
type: custom:auto-entities
show_empty: false
card:
  type: glance
  title: Lights on
filter:
  include:
    - domain: light
      state: "on" # Remember that "on" and "off" are magic in yaml, and must always be quoted
      options:
        tap_action:
          action: toggle
```

Also show all lights that are on, except the hidden ones:

```yaml
type: custom:auto-entities
show_empty: false
card:
  type: entities
  title: Lights on
  show_header_toggle: false
filter:
  include:
    - domain: light
  exclude:
    - state: "off"
    - state: "unavailable"
    - hidden_by: "user"
```

Show everything that has "light" in its name, but isn't a light, and all switches in the living room:

```yaml
type: custom:auto-entities
card:
  type: entities
  title: Lights on
  show_header_toggle: false
filter:
  include:
    - name: /[Ll]ight/
      not:
        domain: light
    - type: section
    - domain: switch
      area: Living Room
```

List every sensor belonging to any iPhone:

```yaml
type: custom:auto-entities
card:
  type: entities
  title: Phones
  show_header_toggle: false
filter:
  include:
    - device: /iPhone/
```

List the five last triggered motion sensors:

```yaml
type: custom:auto-entities
card:
  type: entities
filter:
  include:
    - domain: binary_sensor
      attributes:
        device_class: motion
sort:
  method: last_changed
  reverse: true
  count: 5
```

Put all sensors in individual entity cards in a grid card:

```yaml
type: custom:auto-entities
card:
  type: grid
card_param: cards
filter:
  include:
    - domain: sensor
      options:
        type: entity
```

Turn on scenes by clicking them:

```yaml
type: custom:auto-entities
card:
  type: glance
filter:
  include:
    - domain: scene
      options:
        tap_action:
          action: call-service
          service: scene.turn_on
          service_data:
            # Note the magic value this.entity_id here
            entity_id: this.entity_id
```

Example using templates:

```yaml
type: custom:auto-entities
card:
  type: entities
filter:
  template: |
    {% for light in states.light %}
      {% if light.state == "on" %}
        {{ light.entity_id}},
      {% endif %}
    {% endfor %}
```

Or:

```yaml
template: "{{states.light | selectattr('state', '==', 'on') | map(attribute='entity_id') | list}}"
```

---

<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
