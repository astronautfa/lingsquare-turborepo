import { Component, State } from 'maverick.js';
import type { MediaCrossOrigin } from '../../core/api/types.js';
export interface PosterProps {
    /**
     * The URL of the poster image resource.
     */
    src: string | null;
    /**
     * ♿ **ARIA:** Provides alternative information for a poster image if a user for some reason
     * cannot view it.
     */
    alt: string | null;
    /**
     * Defines how the img handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaCrossOrigin | null;
}
export interface PosterState {
    img: HTMLImageElement | null;
    src: string | null;
    alt: string | null;
    crossOrigin: MediaCrossOrigin | null;
    loading: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
/**
 * Loads and displays the current media poster image. By default, the media provider's
 * loading strategy is respected meaning the poster won't load until the media can.
 *
 * @attr data-visible - Whether poster image should be shown.
 * @attr data-loading - Whether poster image is loading.
 * @attr data-error - Whether an error occurred loading poster.
 * @attr data-hidden - Whether poster has no src or has failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/poster}
 */
export declare class Poster extends Component<PosterProps, PosterState> {
    static props: PosterProps;
    static state: State<PosterState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _hasError;
    private _onPreconnect;
    private _watchHidden;
    private _isLoading;
    private _watchImg;
    private _prevSrc;
    private _watchSrc;
    private _watchAlt;
    private _watchCrossOrigin;
    private _onLoadStart;
    private _onLoad;
    private _onError;
}
