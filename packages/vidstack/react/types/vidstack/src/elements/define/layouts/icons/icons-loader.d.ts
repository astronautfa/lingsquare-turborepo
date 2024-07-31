import { type TemplateResult } from 'lit-html';
import { SlotObserver } from '../slot-observer.js';
export type IconsRecord = Record<string, Element | TemplateResult>;
export declare abstract class IconsLoader {
    protected _roots: HTMLElement[];
    protected _icons: IconsRecord;
    protected _loaded: boolean;
    readonly slots: SlotObserver;
    constructor(_roots: HTMLElement[]);
    connect(): void;
    load(): void;
    abstract _load(): Promise<IconsRecord>;
    private _iterate;
    protected _insertIcons(): void;
}
