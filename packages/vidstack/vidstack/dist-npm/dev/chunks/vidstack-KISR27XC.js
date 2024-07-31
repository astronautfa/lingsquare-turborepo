// src/foundation/list/symbols.ts
var ADD = Symbol(true ? "LIST_ADD" : 0);
var REMOVE = Symbol(true ? "LIST_REMOVE" : 0);
var RESET = Symbol(true ? "LIST_RESET" : 0);
var SELECT = Symbol(true ? "LIST_SELECT" : 0);
var READONLY = Symbol(true ? "LIST_READONLY" : 0);
var SET_READONLY = Symbol(true ? "LIST_SET_READONLY" : 0);
var ON_RESET = Symbol(true ? "LIST_ON_RESET" : 0);
var ON_REMOVE = Symbol(true ? "LIST_ON_REMOVE" : 0);
var ON_USER_SELECT = Symbol(true ? "LIST_ON_USER_SELECT" : 0);
var ListSymbol = {
  add: ADD,
  remove: REMOVE,
  reset: RESET,
  select: SELECT,
  readonly: READONLY,
  setReadonly: SET_READONLY,
  onReset: ON_RESET,
  onRemove: ON_REMOVE,
  onUserSelect: ON_USER_SELECT
};

export {
  ListSymbol
};
