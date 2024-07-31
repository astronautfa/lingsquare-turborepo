import { DOMEvent, EventsTarget } from 'maverick.js/std';
import { ListSymbol } from './symbols.js';
export interface ListItem {
    id: string;
}
export declare class List<Item extends ListItem, Events extends ListEvents> extends EventsTarget<Events> implements Iterable<Item> {
    [index: number]: Item | undefined;
    protected _items: Item[];
    /** @internal */
    protected [ListSymbol._readonly]: boolean;
    /** @internal */
    protected [ListSymbol._onReset]?(trigger?: Event): void;
    /** @internal */
    protected [ListSymbol._onRemove]?(item: Item, trigger?: Event): void;
    get length(): number;
    get readonly(): boolean;
    /**
     * Returns the index of the first occurrence of the given item, or -1 if it is not present.
     */
    indexOf(item: Item): number;
    /**
     * Returns an item matching the given `id`, or `null` if not present.
     */
    getById(id: string): Item | null;
    /**
     * Transform list to an array.
     */
    toArray(): Item[];
    [Symbol.iterator](): IterableIterator<Item>;
    /** @internal */
    [ListSymbol._add](item: Item, trigger?: Event): void;
    /** @internal */
    [ListSymbol._remove](item: Item, trigger?: Event): void;
    /** @internal */
    [ListSymbol._reset](trigger?: Event): void;
    /** @internal */
    [ListSymbol._setReadonly](readonly: boolean, trigger?: Event): void;
}
export interface ListEvents<Item extends ListItem = ListItem> {
    add: ListAddEvent<Item>;
    remove: ListRemoveEvent<Item>;
    'readonly-change': ListReadonlyChangeEvent;
}
/**
 * Fired when an item has been added to the list.
 *
 * @detail item
 */
export interface ListAddEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when an item has been removed from the list.
 *
 * @detail item
 */
export interface ListRemoveEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when the readonly state of the list has changed.
 *
 * @detail isReadonly
 */
export interface ListReadonlyChangeEvent extends DOMEvent<boolean> {
}
