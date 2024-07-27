import { ViewController, type ReadSignal } from 'maverick.js';
export interface ToggleButtonControllerProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
export interface ToggleButtonDelegate {
    _isPressed: ReadSignal<boolean>;
    _keyShortcut?: string;
    _onPress?(event: Event): void;
}
export declare class ToggleButtonController extends ViewController<ToggleButtonControllerProps> {
    private _delegate;
    static props: ToggleButtonControllerProps;
    constructor(_delegate: ToggleButtonDelegate);
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected _isARIAPressed(): "true" | "false";
    protected _onPressed(event: Event): void;
    protected _onMaybePress(event: Event): void;
    protected _onInteraction(event: Event): void;
}
