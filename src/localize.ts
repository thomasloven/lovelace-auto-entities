const en = {
  "card.description":
    "Entity Filter on Steroids. Auto Entities allows you to fill other cards with entities automatically, based on a number of attributes.",

  "error.no_configuration": "No configuration.",
  "error.no_filters": "No filters specified.",
  "error.unknown_include_rule":
    'Unknown rule "{rule}" in include filter {index}',
  "error.unknown_exclude_rule":
    'Unknown rule "{rule}" in exclude filter {index}',

  "tab.filters": "Filters",
  "tab.sorting": "Sorting",
  "tab.card": "Card",

  "filter.include": "Include",
  "filter.exclude": "Exclude",
  "filter.rule_count": "{count} rules",
  "filter.delete": "Delete",
  "filter.add": "Add filter",
  "filter.add_custom": "Add custom entry",
  "filter.sorting": "Sorting",
  "filter.custom_value_info":
    'If entering a custom Value (e.g. "*light" or "/^[Bb]ed/") in a box with options, you need to finish with the Enter key.',
  "filter.rule": "Rule",
  "filter.new_rule": "New Rule ...",
  "filter.options": "Options:",
  "filter.entities": "Entities:",
  "filter.template": "Template:",
  "filter.unsupported_title": "Some rules are not shown",
  "filter.unsupported_rule":
    'The rule "{rule}" is not supported by the GUI editor. Please switch to the CODE EDITOR to access all options.',

  "rule.area": "Area",
  "rule.attributes": "Attribute",
  "rule.device": "Device",
  "rule.domain": "Domain",
  "rule.entity_category": "Entity Category",
  "rule.entity_id": "Entity ID",
  "rule.floor": "Floor",
  "rule.group": "Group",
  "rule.hidden_by": "Hidden by",
  "rule.integration": "Integration",
  "rule.label": "Label",
  "rule.last_changed": "Last Changed",
  "rule.last_triggered": "Last Triggered",
  "rule.last_updated": "Last Updated",
  "rule.level": "Level",
  "rule.device_manufacturer": "Manufacturer",
  "rule.device_model": "Model",
  "rule.name": "Name",
  "rule.state": "State",
  "rule.state_translated": "State Translated",

  "sort.method": "Sort method",
  "sort.domain": "Entity Domain",
  "sort.entity_id": "Entity ID",
  "sort.friendly_name": "Friendly Name",
  "sort.state": "Entity State",
  "sort.last_changed": "Last Change",
  "sort.last_updated": "Last Update",
  "sort.last_triggered": "Last Trigger",
  "sort.attribute": "Attribute",
  "sort.options": "Sorting options:",
  "sort.reverse": "Reverse",
  "sort.ignore_case": "Ignore case",
  "sort.numeric": "Numeric sort",
  "sort.ip": "IP address sort",
  "sort.attribute_field": "Attribute:",
  "sort.unsupported_title": "GUI editor not available",
  "sort.unsupported_method":
    "Sorting by {method} is not supported by the GUI editor. Please switch to the CODE EDITOR to access all options.",

  "card.show_empty": "Show if empty",
  "card.card_param": "Parameter to populate",
  "card.show_code_editor": "Show code editor",
  "card.show_visual_editor": "Show Visual Editor",
  "card.change_type": "Change card type",

  "help.version": "Auto entities version {version}",
  "help.see": "See",
  "help.link": "auto-entities on github",
  "help.usage": "for usage instructions.",
  "help.gui_limits": "Not all options are available in the GUI editor.",
};

export type TranslationKey = keyof typeof en;

const ptBR: Record<TranslationKey, string> = {
  "card.description":
    "Filtro de entidades turbinado. O Auto Entities preenche outros cartões com entidades automaticamente, com base em diversos atributos.",

  "error.no_configuration": "Nenhuma configuração.",
  "error.no_filters": "Nenhum filtro especificado.",
  "error.unknown_include_rule":
    'Regra desconhecida "{rule}" no filtro de inclusão {index}',
  "error.unknown_exclude_rule":
    'Regra desconhecida "{rule}" no filtro de exclusão {index}',

  "tab.filters": "Filtros",
  "tab.sorting": "Ordenação",
  "tab.card": "Cartão",

  "filter.include": "Incluir",
  "filter.exclude": "Excluir",
  "filter.rule_count": "Regras: {count}",
  "filter.delete": "Remover",
  "filter.add": "Adicionar filtro",
  "filter.add_custom": "Adicionar item personalizado",
  "filter.sorting": "Ordenação",
  "filter.custom_value_info":
    'Ao digitar um valor personalizado (ex.: "*light" ou "/^[Bb]ed/") em um campo com opções, confirme com a tecla Enter.',
  "filter.rule": "Regra",
  "filter.new_rule": "Nova regra...",
  "filter.options": "Opções:",
  "filter.entities": "Entidades:",
  "filter.template": "Modelo (template):",
  "filter.unsupported_title": "Algumas regras não são exibidas",
  "filter.unsupported_rule":
    'A regra "{rule}" não é compatível com o editor visual. Mude para o EDITOR DE CÓDIGO para acessar todas as opções.',

  "rule.area": "Área",
  "rule.attributes": "Atributo",
  "rule.device": "Dispositivo",
  "rule.domain": "Domínio",
  "rule.entity_category": "Categoria da entidade",
  "rule.entity_id": "ID da entidade",
  "rule.floor": "Andar",
  "rule.group": "Grupo",
  "rule.hidden_by": "Ocultado por",
  "rule.integration": "Integração",
  "rule.label": "Rótulo",
  "rule.last_changed": "Última mudança de estado",
  "rule.last_triggered": "Último acionamento",
  "rule.last_updated": "Última atualização",
  "rule.level": "Nível",
  "rule.device_manufacturer": "Fabricante",
  "rule.device_model": "Modelo",
  "rule.name": "Nome",
  "rule.state": "Estado",
  "rule.state_translated": "Estado traduzido",

  "sort.method": "Método de ordenação",
  "sort.domain": "Domínio da entidade",
  "sort.entity_id": "ID da entidade",
  "sort.friendly_name": "Nome amigável",
  "sort.state": "Estado da entidade",
  "sort.last_changed": "Última mudança de estado",
  "sort.last_updated": "Última atualização",
  "sort.last_triggered": "Último acionamento",
  "sort.attribute": "Atributo",
  "sort.options": "Opções de ordenação:",
  "sort.reverse": "Ordem inversa",
  "sort.ignore_case": "Ignorar maiúsculas e minúsculas",
  "sort.numeric": "Ordenação numérica",
  "sort.ip": "Ordenação por endereço IP",
  "sort.attribute_field": "Atributo:",
  "sort.unsupported_title": "Editor visual indisponível",
  "sort.unsupported_method":
    'A ordenação por "{method}" não é compatível com o editor visual. Mude para o EDITOR DE CÓDIGO para acessar todas as opções.',

  "card.show_empty": "Mostrar se estiver vazio",
  "card.card_param": "Parâmetro a preencher",
  "card.show_code_editor": "Mostrar editor de código",
  "card.show_visual_editor": "Mostrar editor visual",
  "card.change_type": "Alterar tipo de cartão",

  "help.version": "Auto Entities versão {version}",
  "help.see": "Consulte o",
  "help.link": "auto-entities no GitHub",
  "help.usage": "para ver as instruções de uso.",
  "help.gui_limits": "Nem todas as opções estão disponíveis no editor visual.",
};

const translations: Record<string, Record<TranslationKey, string>> = {
  en,
  "pt-BR": ptBR,
};

// Returns the string for the user's Home Assistant language, or English.
// Without a hass object, the one on the root element is used.
export function localize(
  key: TranslationKey,
  hass?: any,
  values: Record<string, string | number> = {}
): string {
  const currentHass =
    hass ?? (document.querySelector("home-assistant") as any)?.hass;
  const language = currentHass?.locale?.language ?? currentHass?.language;
  const strings = translations[language] ?? en;

  return Object.entries(values).reduce(
    (text, [name, value]) => text.replace(`{${name}}`, () => String(value)),
    strings[key]
  );
}
