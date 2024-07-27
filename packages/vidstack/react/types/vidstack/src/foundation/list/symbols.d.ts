declare const ADD: unique symbol, REMOVE: unique symbol, RESET: unique symbol, SELECT: unique symbol, READONLY: unique symbol, SET_READONLY: unique symbol, ON_RESET: unique symbol, ON_REMOVE: unique symbol, ON_USER_SELECT: unique symbol;
/** @internal */
export declare const ListSymbol: {
    readonly _add: typeof ADD;
    readonly _remove: typeof REMOVE;
    readonly _reset: typeof RESET;
    readonly _select: typeof SELECT;
    readonly _readonly: typeof READONLY;
    readonly _setReadonly: typeof SET_READONLY;
    readonly _onReset: typeof ON_RESET;
    readonly _onRemove: typeof ON_REMOVE;
    readonly _onUserSelect: typeof ON_USER_SELECT;
};
export {};
