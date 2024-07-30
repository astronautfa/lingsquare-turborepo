import { ViewController } from 'maverick.js';
export declare class ARIAKeyShortcuts extends ViewController {
    private _shortcut;
    constructor(_shortcut: string);
    protected onAttach(el: HTMLElement): void;
}
