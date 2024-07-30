import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import type { SliderCSSVars } from './slider/api/cssvars.js';
import type { SliderEvents } from './slider/api/events.js';
import { type SliderState } from './slider/api/state.js';
import { type SliderControllerProps } from './slider/slider-controller.js';
/**
 * Versatile and user-friendly input playback rate control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether setting playback rate is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/speed-slider}
 */
export declare class SpeedSlider extends Component<SpeedSliderProps, SpeedSliderState, SpeedSliderEvents, SpeedSliderCSSVars> {
    static props: SpeedSliderProps;
    static state: import("maverick.js").State<SliderState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchMinMax;
    private _watchPlaybackRate;
    private _roundValue;
    private _isDisabled;
    private _throttledSpeedChange;
    private _onPlaybackRateChange;
    private _onValueChange;
    private _onDragValueChange;
}
export interface SpeedSliderProps extends SliderControllerProps {
    /**
     * The minimum playback rate.
     */
    min: number;
    /**
     * The maximum playback rate.
     */
    max: number;
}
export interface SpeedSliderState extends SliderState {
}
export interface SpeedSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-rate-change-request'> {
}
export interface SpeedSliderCSSVars extends SliderCSSVars {
}
