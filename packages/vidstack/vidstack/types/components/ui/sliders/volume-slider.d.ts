import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import type { SliderCSSVars } from './slider/api/cssvars.js';
import type { SliderEvents } from './slider/api/events.js';
import { type SliderState } from './slider/api/state.js';
import { type SliderControllerProps } from './slider/slider-controller.js';
/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether volume control is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 */
export declare class VolumeSlider extends Component<VolumeSliderProps, VolumeSliderState, VolumeSliderEvents, VolumeSliderCSSVars> {
    static props: VolumeSliderProps;
    static state: import("maverick.js").State<SliderState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _getARIAValueMax;
    private _isDisabled;
    private _watchVolume;
    private _throttleVolumeChange;
    private _onVolumeChange;
    private _onValueChange;
    private _onDragValueChange;
}
export interface VolumeSliderProps extends SliderControllerProps {
}
export interface VolumeSliderState extends SliderState {
}
export interface VolumeSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-volume-change-request'> {
}
export interface VolumeSliderCSSVars extends SliderCSSVars {
}
