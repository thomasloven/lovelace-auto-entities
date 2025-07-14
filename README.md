# auto-entities

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

Automatically populate lovelace cards with entities matching certain criteria.

Install Auto Entities through HACS [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=lovelace-auto-entities) or [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

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
else: <else>
unique: <unique>
sort: <sort_method>
```

| Option                 | Type                             | Description                                                                                                           | Default         |
| ---------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------- |
| `card`                 | Dashboard card\*                 | The card to display. Specify this as you would specify any normal dashboard card, but ommit the `entities` parameter. | `entities`-card |
| `entities`             | List of Entities\*\*             | Any entities added here will be added to the card before any filters are applied                                      |
| `filter`               |
| &nbsp;&nbsp;`template` | string                           | A jinja template evaluating to a list of entities to include                                                          |
| &nbsp;&nbsp;`include`  | List of [Filters](#filters)      | A list of filters specifying which entities to add to the card                                                        |
| &nbsp;&nbsp;`exclude`  | List of [Filters](#filters)      | A list of filters specifying which entities to remove from the card                                                   |
| `show_empty`           | `true`/`false`                   | Whether to display the card if there are no entities                                                                  | `true`          |
| `else`                 | Dashboard card\*                 | Card to display if the main card has no entities. Overrides `show_empty`                                              |
| `sort`                 | [Sort config](#sorting-entities) | How to sort the entities of the card                                                                                  | `none`          |
| `card_param`           | string                           | The parameter of the card to populate with entities                                                                   | `entities`      |

\* [Dashboard card](https://www.home-assistant.io/dashboards/cards/) \
\*\* [Entities](https://www.home-assistant.io/dashboards/entities/#options-for-entities)

### Filters

The two main filter sections `include` and `exclude` each takes a list of filters.

Each filter has a set of rules and will match entities which match **ALL** rules:

| Rule                  | Matches                                                                                     | Example                                              |
| --------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `domain`              | Entity domain                                                                               | `light`, `binary_sensor`, `media_player`             |
| `state`               | Current state of entity.                                                                    | `"on"`, `home`, `"3.14"`, `"Triggered"`              |
| `state_translated`       | Current state of entity as translated using Frontend language user setting. For numeric states always use `state` as translated numeric values will include formatting that will give unexpected results e.g. '3.14 s' => 3 | `Éteint`, `Maison`, `Déclenché`              |
| `entity_id`           | Full entity id                                                                              | `light.bed_light`, `input_binary.weekdays_only`      |
| `name`                | Friendly name attribute                                                                     | `Kitchen lights`, `Front door`                       |
| `group`               | Entities in the group                                                                       | `group.living_room_lights`                           |
| `area`                | Entities in a given area. Also matches all entities belonging to a Device in the area.      | `Kitchen`                                            |
| `floor`               | Entities on a given floor. Also matches all entities belonging to a Device on that floor.   | `Second`, `Basement`                                 |
| `level`               | Entities on a given level.                                                                  | `2`, `>1`                                            |
| `device`              | Entities belonging to a Device                                                              | `Thomas iPhone`                                      |
| `label`               | Entities that are tagged with a certain label                                               | `Show on dashboard`, `Holiday light`                 |
| `device_manufacturer` | Entities belonging to a device by a given manufacturer                                      | `IKEA`                                               |
| `device_model`        | Entities belonging to a device of a given model                                             | `Hue white ambiance E26/E27 (8718696548738)`         |
| `integration`         | Entities included by a given integration. This is not possible for _all_ integrations.      | `plex`, `input_boolean`, `xiaomi_miio`, `mobile_app` |
| `hidden_by`           | Who has hidden an entity                                                                    | `user`, `integration`                                |
| `attributes`          | Map of `attribute: value` pairs to match                                                    |
| `last_changed`        | Time since last state change (defaults to minutes)                                          | `< 15`, `> 2 d ago`                                  |
| `last_updated`        | Time since last update (defaults to minutes)                                                | `< 15`, `> 2 d ago`                                  |
| `entity_category`     | [Entity category](https://developers.home-assistant.io/docs/core/entity#generic-properties) | `config`, `diagnostic`                               |
|                       |                                                                                             |                                                      |
| `not`                 | Matche entities that do _not_ match a filter                                                |
| `or`                  | Matches any in a list of filters                                                            |
| `and`                 | Matches all in a list of filters                                                            |

Special options:
| Option | Description |
|-----------|-------------|
| `options` | Map of configuration options to apply to the entity when passed to the card
| `type` | If a `type` is given, the filter is handled as a complete entity description and passed along directly to the card
| `sort` | [Sort config](#sorting-entities) applied to entities in _this filter only_

### Template filter

The filter section `template` takes a jinja template which evaluates to a list of entities or entity objects.

## How it works

`auto-entities` creates a list of entities by:

1. Including every entity given in `entities:` (this allow nesting of `auto-entities`if you'd want to do that for some reason...)
2. Include every entity listed in a `filter.template` evaluation
3. Include all entities that matches **ALL** options of **ANY** filter in the `filter.include` section. The same entity may be included several times by different filters.
4. Remove all entities that matches **ALL** options on **ANY** filter in the `filter.exclude` section.

It then creates a card based on the configuration given in `card:`, and fills in `entities:` of that card with the entities from above.

The list of entities added to the card will be on the form:

```
- entity: <entity_id>
  <options>
```

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
        battery_level: "<= 50" # Attribute battery_level is 50 or less
    - state: "> 25" # State is greater than 25
    - attributes:
        count: "! 2" # Attribute count is not equal to 2
    - state: "= 12" # State is exactly 12 (also matches "12", "12.0" etc.)
    - state: "12" # State is exactly "12" but not e.g. "12.0"
```

> **Note**: Since `>` has a special function in yaml, the quotation marks are mandatory. `"> 25"`

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

Templates also give great opportunity for customization:

```yaml
type: custom:auto-entities
card:
  type: entities
filter:
  template: |
    [{% for e in area_entities("bedroom") %}
      {'entity': '{{e}}',
       'name': 'Lamp at {{device_attr(e, "name").removesuffix("Light").removesuffix("Lights")}}',
      },
    {% endfor %}]
```
