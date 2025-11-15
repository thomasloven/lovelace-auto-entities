export interface SortConfig {
  method: string;
  reverse?: boolean;
  ignore_case?: boolean;
  attribute?: any;
  first?: number;
  count?: number;
  numeric?: boolean;
  ip?: boolean;
  manual_order?: string[];  // Array of entity IDs in desired order for manual sorting
}

interface FilterConfig {
  domain?: string;
  entity_id?: string;
  state?: string;
  name?: string;
  group?: string;

  area?: string;
  device?: string;
  device_manufacturer?: string;
  device_model?: string;

  attributes?: Record<string, string>;

  last_changed?: string | number;
  last_updated?: string | number;
  last_triggered?: string | number;

  entity_category?: string;
  integration?: string;
  hidden_by?: string;

  not?: FilterConfig;
  or?: FilterConfig[];

  options?: any;
  sort?: SortConfig;
  type?: string;
}

export interface AutoEntitiesConfig {
  type: string;
  card: any;
  entities?: Array<LovelaceRowConfig | string>;
  filter: {
    template?: string;
    include?: FilterConfig[];
    exclude?: FilterConfig[];
  };

  card_param?: string;

  show_empty?: boolean;
  else?: any;
  unique?: boolean | string;
  sort?: any;

  entity_ids?: any[];
  entity_overrides?: Record<string, LovelaceRowConfig>;  // Per-entity configuration overrides
}

// Action configuration for tap, hold, and double-tap actions
export interface ActionConfig {
  action: "more-info" | "toggle" | "call-service" | "navigate" | "url" | "assist" | "none";
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: any;
  confirmation?: boolean | {
    text?: string;
    exemptions?: any[];
  };
  target?: any;
}

export interface LovelaceRowConfig {
  entity?: string;
  type?: string;
  name?: string;
  icon?: string;
  secondary_info?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  image?: string;
  show_entity_picture?: boolean;
  state_color?: boolean;
  state?: string;  // For overridden state values
  [key: string]: any;  // Allow additional properties
}
export interface LovelaceCard extends HTMLElement {
  hass: any;
  setConfig(config: any): void;
  getCardSize?(): number;
}
export interface HuiErrorCard extends LovelaceCard {
  _config: any;
}

export interface HAState {
  entity_id: string;
  state: string;
  attributes?: Record<string, any>;
  last_changed: number;
  last_updated: number;
}

export interface HassObject {
  states: HAState[];
  callWS: (_: any) => any;
  formatEntityState: (stateObj, state?) => string;
  formatEntityAttributeValue: (stateObj, attribute, value?) => string;
  formatEntityAttributeName: (stateObj, attribute) => string;
}

export type MatchValue = string | number;

export type EntityList = Array<LovelaceRowConfig>;

export interface CardEntity {}
