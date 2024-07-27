import { SlotObserver } from './slot-observer.js';
export declare class SlotManager {
    protected _roots: HTMLElement[];
    readonly slots: SlotObserver;
    constructor(_roots: HTMLElement[]);
    connect(): void;
    private _onMutation;
    private _update;
}
