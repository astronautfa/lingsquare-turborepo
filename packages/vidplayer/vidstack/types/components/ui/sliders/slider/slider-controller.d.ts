import { ViewController } from 'maverick.js';
import type { SliderEvents } from './api/events.js';
import type { SliderState } from './api/state.js';
import { type SliderEventDelegate } from './events-controller.js';
import type { SliderOrientation } from './types.js';
export interface SliderDelegate extends Omit<SliderEventDelegate, '_getOrientation'> {
    _getARIAValueNow(): number;
    _getARIAValueText(): string;
    _getARIAValueMin?(): number;
    _getARIAValueMax?(): number;
}
export declare class SliderController extends ViewController<SliderControllerProps, SliderState, SliderEvents> {
    private _delegate;
    static props: SliderControllerProps;
    private _media;
    private _isVisible;
    private _isIntersecting;
    constructor(_delegate: SliderDelegate);
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _onIntersectionChange;
    private _watchHidden;
    private _watchValue;
    private _watchStep;
    private _watchDisabled;
    private _getARIADisabled;
    private _setupAttrs;
    private _watchCSSVars;
    private _updateSliderVars;
}
export interface SliderControllerProps {
    /**
     * Whether the slider should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * Provides a hint that the slider is not visible and stops all events and expensive updates to
     * be more power efficient.
     */
    hidden: boolean;
    /**
     * The orientation of the slider.
     */
    orientation: SliderOrientation;
    /**
     * A number that specifies the granularity that the slider value must adhere to.
     *
     * A step is an abstract unit that may carry a different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    step: number;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the slider via keyboard.
     *
     * A step is an abstract unit that may carry different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    keyStep: number;
    /**
     * ♿ **ARIA:** A number that will be used to multiply the `keyStep` when the `Shift` key
     * is held down and the slider value is changed by pressing `LeftArrow` or `RightArrow`. Think
     * of it as `keyStep * shiftKeyMultiplier`.
     */
    shiftKeyMultiplier: number;
}
