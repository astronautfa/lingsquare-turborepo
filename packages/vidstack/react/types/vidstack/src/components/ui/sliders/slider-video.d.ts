import { Component, State } from 'maverick.js';
import { type DOMEvent } from 'maverick.js/std';
import type { MediaCrossOrigin } from '../../../core/api/types.js';
/**
 * Used to load a low-resolution video to be displayed when the user is hovering over or dragging
 * the time slider. The preview video will automatically be updated to be in-sync with the current
 * preview position, so ensure it has the same length as the original media (i.e., same duration).
 *
 * @attr data-loading - Whether the video is loading.
 * @attr data-error - Whether an error occurred loading video.
 * @attr data-hidden - Whether the video is not ready or has failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-video}
 */
export declare class SliderVideo extends Component<SliderVideoProps, SliderVideoState, SliderVideoEvents> {
    static props: SliderVideoProps;
    static state: State<SliderVideoState>;
    private _media;
    private _slider;
    get video(): HTMLVideoElement | null;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _watchVideo;
    private _watchSrc;
    private _watchCrossOrigin;
    private _isLoading;
    private _hasError;
    private _watchHidden;
    private _onSrcChange;
    private _onCanPlay;
    private _onError;
    private _onUpdateTime;
}
export interface SliderVideoProps {
    /**
     * The URL of a media resource to use.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src}
     */
    src: string | null;
    /**
     * Defines how the media handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaCrossOrigin | null;
}
export interface SliderVideoState {
    video: HTMLVideoElement | null;
    src: string | null;
    crossOrigin: MediaCrossOrigin | null;
    canPlay: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
export interface SliderVideoEvents {
    'can-play': SliderVideoCanPlayEvent;
    error: SliderVideoErrorEvent;
}
/**
 * Fired when the user agent can play the media, but estimates that **not enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
 */
export interface SliderVideoCanPlayEvent extends DOMEvent<void> {
    target: SliderVideo;
    /** The `canplay` media event. */
    readonly trigger: Event;
}
/**
 * Fired when media loading or playback has encountered any issues (for example, a network
 * connectivity problem). The event detail contains a potential message containing more
 * information about the error (empty string if nothing available), and a code that identifies
 * the general type of error that occurred.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/media.html#error-codes}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event}
 */
export interface SliderVideoErrorEvent extends DOMEvent<void> {
    target: SliderVideo;
    /** The `error` media event. */
    readonly trigger: Event;
}
