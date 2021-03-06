interface SortConfig {
  method: string;
  reverse?: boolean;
  ignore_case?: boolean;
  attribute?: string;
  first?: number;
  count?: number;
  numeric?: boolean;
}

interface FilterConfig {
  domain?: string;
  state?: string;
  entity_id?: string;
  name?: string;
  group?: string;
  area?: string;
  device?: string;
  attributes?: Record<string, string>;
  last_changed?: string | number;
  last_updated?: string | number;

  not: FilterConfig;
  or: FilterConfig[];

  options?: any;
  sort: SortConfig;
  type?: string;
}

export interface AutoEntitiesConfig {
  card: any;
  entities: any[];
  filter: {
    template?: string;
    include?: FilterConfig[];
    exclude?: FilterConfig[];
  };

  card_param?: string;

  show_empty?: boolean;
  unique?: boolean | string;
  sort?: any;

  entity_ids?: any[];
}

export interface HACard {
  hass: any;
  setConfig: (_: any) => void;
  getCardSize?: () => number;
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
}

export type MatchValue = string | number;
