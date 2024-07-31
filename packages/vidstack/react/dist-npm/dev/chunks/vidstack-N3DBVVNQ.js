// ../vidstack/src/core/quality/symbols.ts
var SET_AUTO = Symbol(true ? "SET_AUTO_QUALITY" : 0);
var ENABLE_AUTO = Symbol(true ? "ENABLE_AUTO_QUALITY" : 0);
var QualitySymbol = {
  setAuto: SET_AUTO,
  enableAuto: ENABLE_AUTO
};

export {
  QualitySymbol
};
