import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import type { SliderCSSVars } from './slider/api/cssvars.js';
import type { SliderEvents } from './slider/api/events.js';
import { type SliderState } from './slider/api/state.js';
import { type SliderControllerProps } from './slider/slider-controller.js';
/**
 * Versatile and user-friendly input video quality control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether setting video quality is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/quality-slider}
 */
export declare class QualitySlider extends Component<QualitySliderProps, QualitySliderState, QualitySliderEvents, QualitySliderCSSVars> {
    static props: QualitySliderProps;
    static state: import("maverick.js").State<SliderState>;
    private _media;
    private _sortedQualities;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchMax;
    private _watchQuality;
    private _isDisabled;
    private _throttledQualityChange;
    private _onQualityChange;
    private _onValueChange;
    private _onDragValueChange;
}
export interface QualitySliderProps extends SliderControllerProps {
}
export interface QualitySliderState extends SliderState {
}
export interface QualitySliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-quality-change-request'> {
}
export interface QualitySliderCSSVars extends SliderCSSVars {
}
