auto-entities
=============

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

Automatically populate lovelace cards with entities matching certain criteria.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

If installed using HACS: 

```yaml
resources:
  - url: /community_plugin/lovelace-auto-entities/auto-entities.js
    type: module
```

Otherwise:

Install `auto-entities.js` as a `module`.

```yaml
resources:
  - url: /local/auto-entities.js
    type: module
```

## Usage

```yaml
type: custom:auto-entities
card:
  <card>
entities:
  - <entity>
  - <entity>
filter:
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
  - `include:` **Required.** A list of filters specifying which entities to add to the card
  - `exclude:` A list of filters specifying which entities to remove from the card
- `show_empty:` Whether to display the card if it has no entities. Default: `true`.
- `unique:` Whether to remove duplicate values after filtering and sorting. Default: `false`.
- `sort:` How to sort the entities of the card. Default: `none`. See [Sorting entities for details](#sorting-entities)

### Filters
The two filter sections `include` and `exclude` each takes a list of filters.

Filters have the following options, and will match any entity fulfilling **ALL** options:

- `domain:` Match entity domain (e.g. `light`, `binary_sensor`, `media_player`)
- `state:` Match entity state (e.g. `"on"`, `home`, `"3.14"`)
- `entity_id:` Match entity id (e.g. `light.bed_light`, `input_binary.weekdays_only`)
- `name:` Match friendly name attribute (e.g. `Kitchen lights`, `Front door`)
- `group:` Match entities in given group (e.g. `group.living_room_lights`)
- `area:` Match entities in given area (e.g. `Kitchen`)
- `device:` Match entities belonging to given device (e.g. `Thomas iPhone`)
- `attributes:` Map of `attribute: value` pairs to match.

Special options:
- `options:` Map of options to apply to entity when passed to card.
- `type:` Type of special entries to include in entity list. Entries with a `type:` will not be filtered.
- `not:` Specifies a filter that entities must *not* match.
- `sort:` Specifies a method to sort entities matched by *this filter only*.

## How it works
`auto-entities` creates a list of entities by:
1. Including every entitiy given in `entities:` (this allow nesting of `auto-entities`if you'd want to do that for some reason...)
2. Include all entities that matches **ALL** options of **ANY** filter in the `filter.include` section. The same entity may be included several times by different filters.
3. Remove all entities that matches **ALL** options on **ANY** filter in the `filter.exclude` section.

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
```

- `method:` **Required** One of `domain`, `entity_id`, `name`, `state` or `attribute`
- `reverse:` Set to `true` to reverse the order. Default: `false`.
- `ignore_case:` Set to `true` to make the sort case-insensitive. Default: `false`.
- `numeric:` Set to `true` to sort by numeric value. Default: `false`.
- `attribute:` Attribute to sort by if `method: attribute`. Can be an *object attribute* as above (e.g. `attribute: rgb_color:2`)
- `first` and `count` can be used to only display `<count>` entities, starting with the `<first>` (starts with 0).

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
Also show all lights that are on:
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

---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
