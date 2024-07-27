export interface MenuFocusControllerDelegate {
    _closeMenu(trigger?: Event): void;
}
export declare class MenuFocusController {
    protected _delegate: MenuFocusControllerDelegate;
    protected _index: number;
    protected _el: HTMLElement | null;
    protected _elements: HTMLElement[];
    get _items(): HTMLElement[];
    constructor(_delegate: MenuFocusControllerDelegate);
    _attachMenu(el: HTMLElement): void;
    _listen(): void;
    _update(): void;
    _scroll(index?: number): void;
    _focusActive(scroll?: boolean): void;
    protected _focusAt(index: number, scroll?: boolean): void;
    protected _findActiveIndex(): number;
    protected _onFocus(): void;
    protected _validateKeyEvent(event: KeyboardEvent): boolean;
    protected _onKeyUp(event: KeyboardEvent): void;
    protected _onKeyDown(event: KeyboardEvent): void;
    protected _nextIndex(delta: number): number;
    protected _getFocusableElements(): HTMLElement[];
}
export declare function getMenuController(el: HTMLElement): HTMLElement | null;
