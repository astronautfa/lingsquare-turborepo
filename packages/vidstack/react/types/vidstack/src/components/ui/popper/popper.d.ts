import { ViewController, type ReadSignal } from 'maverick.js';
export interface PopperDelegate {
    _showDelay?: ReadSignal<number>;
    _trigger: ReadSignal<HTMLElement | null>;
    _content: ReadSignal<HTMLElement | null>;
    _listen(trigger: HTMLElement, show: (trigger?: Event) => void, hide: (trigger?: Event) => void): void;
    _onChange(isShowing: boolean, trigger?: Event): void;
}
export declare class Popper extends ViewController {
    private _delegate;
    constructor(_delegate: PopperDelegate);
    protected onDestroy(): void;
    private _watchTrigger;
    private _showTimerId;
    private _hideRafId;
    private _stopAnimationEndListener;
    show(trigger?: Event): void;
    hide(trigger?: Event): void;
    private _cancelShowing;
}
