import { type ReadSignal } from 'maverick.js';
export declare class StateController {
    private _el;
    private _states;
    constructor(_el: HTMLElement | null, _states: ReadSignal<Record<string, boolean>>);
    private _getTooltip;
    private _observe;
    private _update;
}
