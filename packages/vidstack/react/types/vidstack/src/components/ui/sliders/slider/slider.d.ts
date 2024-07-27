import { Component } from 'maverick.js';
import type { SliderCSSVars } from './api/cssvars.js';
import type { SliderEvents } from './api/events.js';
import { type SliderState } from './api/state.js';
import { type SliderControllerProps } from './slider-controller.js';
/**
 * Versatile and user-friendly input control designed for seamless cross-browser compatibility and
 * accessibility with ARIA support. It offers a smooth user experience for both mouse and touch
 * interactions and is highly customizable in terms of styling. Users can effortlessly input numeric
 * values within a specified range, defined by a minimum and maximum value.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider}
 */
export declare class Slider extends Component<SliderProps, SliderState, SliderEvents, SliderCSSVars> {
    static props: SliderProps;
    static state: import("maverick.js").State<SliderState>;
    constructor();
    protected onSetup(): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchValue;
    private _watchMinMax;
}
export interface SliderProps extends SliderControllerProps {
    /**
     * The lowest slider value in the range of permitted values.
     */
    min: number;
    /**
     * The greatest slider value in the range of permitted values.
     */
    max: number;
    /**
     * The current slider value.
     */
    value: number;
}
