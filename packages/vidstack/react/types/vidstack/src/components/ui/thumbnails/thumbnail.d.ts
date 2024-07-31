import { Component, State } from 'maverick.js';
import { type MediaContext } from '../../../core/api/media-context.js';
import type { MediaCrossOrigin } from '../../../core/api/types.js';
import { ThumbnailsLoader, type ThumbnailImage, type ThumbnailSrc } from './thumbnail-loader.js';
/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 */
export declare class Thumbnail extends Component<ThumbnailProps, ThumbnailState> {
    static props: ThumbnailProps;
    static state: State<ThumbnailState>;
    protected _media: MediaContext;
    protected _loader: ThumbnailsLoader;
    private _styleResets;
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    private _watchImg;
    private _watchCrossOrigin;
    private _onLoadStart;
    private _onLoaded;
    private _onError;
    private _isLoading;
    private _hasError;
    private _watchHidden;
    protected _getTime(): number;
    private _onFindActiveThumbnail;
    private _resize;
    private _style;
    private _resetStyles;
}
export interface ThumbnailProps {
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/player/core-concepts/loading#thumbnails}
     */
    src: ThumbnailSrc;
    /**
     * Finds, loads, and displays the first active thumbnail cue that's start/end times are in range.
     */
    time: number;
    /**
     * Defines how the media handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossOrigin: true | MediaCrossOrigin | null;
}
export interface ThumbnailState {
    src: string;
    img: HTMLImageElement | null | undefined;
    crossOrigin: MediaCrossOrigin | null;
    thumbnails: ThumbnailImage[];
    activeThumbnail: ThumbnailImage | null;
    loading: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
