import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../../core/api/media-request-events.js';
import type { SliderCSSVars } from '../slider/api/cssvars.js';
import type { SliderEvents } from '../slider/api/events.js';
import { type SliderState } from '../slider/api/state.js';
import { type SliderControllerProps } from '../slider/slider-controller.js';
/**
 * Versatile and user-friendly input time control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the current playback time within the range 0 to seekable end.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/time-slider}
 */
export declare class TimeSlider extends Component<TimeSliderProps, TimeSliderState, TimeSliderEvents, TimeSliderCSSVars> {
    static props: TimeSliderProps;
    static state: import("maverick.js").State<SliderState>;
    private _media;
    private _dispatchSeeking;
    private _chapter;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _calcBufferedPercent;
    private _hasChapters;
    private _watchSeekingThrottle;
    private _watchCurrentTime;
    private _watchPreviewing;
    private _seeking;
    private _seek;
    private _playingBeforeDragStart;
    private _onDragStart;
    private _onDragValueChange;
    private _onDragEnd;
    private _onValueChange;
    private _getValue;
    private _getStep;
    private _getKeyStep;
    private _roundValue;
    private _isDisabled;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _percentToTime;
    private _timeToPercent;
    private _formatValue;
    private _formatTime;
}
export interface TimeSliderCSSVars extends SliderCSSVars {
    /**
     * The percentage of media playback that has been buffered.
     */
    readonly 'slider-progress': string;
}
export interface TimeSliderProps extends SliderControllerProps {
    /**
     * Whether it should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     */
    pauseWhileDragging: boolean;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     */
    seekingRequestThrottle: number;
    /**
     * Whether touch swiping left or right on the player canvas should activate the time slider. This
     * gesture makes it easier for touch users to drag anywhere on the player left or right to
     * seek backwards or forwards, without directly interacting with time slider.
     */
    noSwipeGesture: boolean;
}
export interface TimeSliderState extends SliderState {
}
export interface TimeSliderEvents extends SliderEvents, Pick<MediaRequestEvents, 'media-play-request' | 'media-pause-request' | 'media-seeking-request' | 'media-seek-request' | 'media-live-edge-request'> {
}
