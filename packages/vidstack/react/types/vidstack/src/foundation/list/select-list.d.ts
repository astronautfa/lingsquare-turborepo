import { DOMEvent } from 'maverick.js/std';
import { List, type ListEvents, type ListItem } from './list.js';
import { ListSymbol } from './symbols.js';
export interface SelectListItem extends ListItem {
    selected: boolean;
}
export declare class SelectList<Item extends SelectListItem, Events extends SelectListEvents<Item>> extends List<Item, Events> {
    get selected(): Item | null;
    get selectedIndex(): number;
    /** @internal */
    protected [ListSymbol._onRemove](item: Item, trigger?: Event): void;
    /** @internal */
    protected [ListSymbol._onUserSelect]?(): void;
    /** @internal */
    [ListSymbol._add](item: Omit<Item, 'selected'>, trigger?: Event): void;
    /** @internal */
    [ListSymbol._select](item: Item | undefined, selected: boolean, trigger?: Event): void;
}
export interface SelectListEvents<Item extends SelectListItem = SelectListItem> extends ListEvents<Item> {
    change: SelectListChangeEvent<Item>;
}
/**
 * @detail change
 */
export interface SelectListChangeEvent<Item extends SelectListItem> extends DOMEvent<SelectListChangeEventDetail<Item>> {
}
export interface SelectListChangeEventDetail<Item extends SelectListItem> {
    prev: Item | null;
    current: Item | null;
}
