export interface SortConfig {
  method: string;
  reverse?: boolean;
  ignore_case?: boolean;
  attribute?: string;
  first?: number;
  count?: number;
  numeric?: boolean;
  ip?: boolean;
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
  card: any;
  entities: Array<LovelaceRowConfig | string>;
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
}

export interface LovelaceRowConfig {
  entity?: string;
  type?: string;
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
