auto-entities
=============

**Kinda-sorta-experimental-ish**

This plugin can automatically populate the `entities:` list of a card or entity-row with entities matching a filter.

> If you've been around the custom lovelace stuff scene for a while,
> this function probably feels familliar to you. This plugin is a
> reimplementation of the fantastic [`monster-card`](https://github.com/ciotlosm/custom-lovelace/tree/master/monster-card)
> by Marius Ciotlos. Differences are outlined below.

## Installation instructions

This plugin requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:auto-entities`
| card | object | **Required** | The card to display
| filter | object | None | Filters for including and excluding entities
| entities | list | None | Enties to include
| show\_empty | boolean | true | Show/hide empty card

### filters
The `filter` options has two sections, `include` and `exclude`. Each section contains a list of filters.

Each section has the following options.
All options are optional, and filters will match any entity matching **ALL** options.

| Name | Description
| ---- | -----------
| domain | Match entity domain (e.g. `light`, `binary_sensor`, `media_player`)
| state | Match entity state (e.g. "on", "off", 3.14)
| entity\_id | Match entity id (e.g. `light.bed_light`, `binary_sensor.weekdays_only`, `media_player.kitchen`)
| name | Match friendly name attribute (e.g. "Kitchen lights", "Front door")
| group | Match entities in given group
| attributes | Match attributes. **See below**
| area | Entity belongs in given area (Home Assistant 0.87 or later)
| options | Additional options to attach to entities matching this filter (only makes sense in `include`)

The attributes option takes an object with `attribute: value` combinations and matches any entity which matches all of those attributes.

## How it works
`auto-entities` creates a list of entities by:
1. Including every entity given in `entities:` (this allows nesting of `auto-entities` if you'd want to do that for some reason...)
2. Include all entities that matches **ALL** options of **ANY** filter in the `filter.include` section.
3. Remove all entities that matches **ALL** options of **ANY** filter in the `filter.exclude` section.

It then creates a card based on the configuration given in `card:` but adds the `entities:` option populated with the entities from above.

### Matching rules
Any filter option can use `*` as a wildcard for string comparison. Remember to quote your strings when doing this:
```yaml
filter:
  include:
    - name: "Bedroom *"
    - entity_id: "sensor.temperature_*_max"
```

Any filter option can use [javascript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) for string comparison. To do this, enclose the regex in `/`. Also make sure to quote the string:
```yaml
filter:
  include:
    - name: "/Bedroom .*/"
    - entity_id: "/sensor.temperature_4[abd]/"
```

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

*Advanced stuff:* You can drill into attributes that are object using keys or indexes separated by `:`:
```yaml
filter:
  include:
    - attributes:
      hs_color: "1:> 30"
```
The example above matches lights with a `hs_color` saturation value greater than 30.

## Examples

Show all with some exceptions
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

Show all in `device_tracker` with battery less than 50:
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
        battery_level: "< 50"
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


## About monster-card
This card works very much like [`monster-card`](https://github.com/ciotlosm/custom-lovelace/tree/master/monster-card) with the following exceptions:

- `auto-entities` has no `when` option. Hiding the card based on the state of an entity is better done with [`conditional`](https://www.home-assistant.io/lovelace/conditional/).
- `auto-entities` supports Regular Expressions.
- `auto-entities` supports comparison operators for states as well as attributes.
- `auto-entities` can add all entities from a group
- `auto-entities` works with custom cards.

![custom-cards-and-stuff](https://user-images.githubusercontent.com/1299821/51793369-aa3b6480-21bf-11e9-9a00-e7b7b85ba0a2.png)
```yaml
type: entities
title: Combination
entities:
  - type: custom:auto-entities
    card:
      type: custom:fold-entity-row
      head:
        type: section
        label: All lights
    filter:
      include:
        - domain: light
  - type: custom:auto-entities
    card:
      type: custom:fold-entity-row
      head:
        type: section
        label: Lights that are on
    filter:
      include:
        - domain: light
          state: "on"
  - type: custom:auto-entities
    card:
      type: custom:fold-entity-row
      head:
        type: section
        label: Lights that are dimmed below 50%
    filter:
      include:
        - domain: light
          attributes:
            brightness: "< 125"
  - type: custom:auto-entities
    card:
      type: custom:fold-entity-row
      head:
        type: section
        label: Lights that are kinda blue-ish
    filter:
      include:
        - domain: light
          attributes:
            hs_color 1: "0:> 195"
            hs_color 2: "0:< 255"
```
