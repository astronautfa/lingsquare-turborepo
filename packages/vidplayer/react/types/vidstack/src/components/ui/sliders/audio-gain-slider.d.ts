import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import type { SliderCSSVars } from './slider/api/cssvars.js';
import type { SliderEvents } from './slider/api/events.js';
import { type SliderState } from './slider/api/state.js';
import { type SliderControllerProps } from './slider/slider-controller.js';
/**
 * Versatile and user-friendly audio boost control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the audio gain within the range 0 to 100.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether audio gain is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/audio-gain-slider}
 */
export declare class AudioGainSlider extends Component<AudioGainSliderProps, AudioGainSliderState, AudioGainSliderEvents, AudioGainSliderCSSVars> {
    static props: AudioGainSliderProps;
    static state: import("maverick.js").State<SliderState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchMinMax;
    private _watchAudioGain;
    private _isDisabled;
    private _onAudioGainChange;
    private _onValueChange;
    private _onDragValueChange;
}
export interface AudioGainSliderProps extends SliderControllerProps {
    /**
     * The minimum audio gain boost represented as a percentage.
     */
    min: number;
    /**
     * The minimum audio gain boost represented as a percentage.
     */
    max: number;
}
export interface AudioGainSliderState extends SliderState {
}
export interface AudioGainSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-audio-gain-change-request'> {
}
export interface AudioGainSliderCSSVars extends SliderCSSVars {
}
