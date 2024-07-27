import { type ReadSignal } from 'maverick.js';
import { type MediaContext } from '../../../core/api/media-context.js';
import type { MediaCrossOrigin } from '../../../core/api/types.js';
export declare class ThumbnailsLoader {
    readonly $src: ReadSignal<ThumbnailSrc>;
    readonly $crossOrigin: ReadSignal<MediaCrossOrigin | null>;
    private _media;
    readonly $images: import("maverick.js").WriteSignal<ThumbnailImage[]>;
    static create($src: ReadSignal<ThumbnailSrc>, $crossOrigin: ReadSignal<MediaCrossOrigin | null>): ThumbnailsLoader;
    constructor($src: ReadSignal<ThumbnailSrc>, $crossOrigin: ReadSignal<MediaCrossOrigin | null>, _media: MediaContext);
    protected _onLoadCues(): (() => void) | undefined;
    private _processImages;
    private _processStoryboard;
    private _processVTTCues;
    private _resolveBaseUrl;
    private _resolveURL;
    private _resolveData;
    private _onError;
}
export type ThumbnailSrc = string | ThumbnailImageInit[] | ThumbnailStoryboard | MuxThumbnailStoryboard | null;
export interface ThumbnailStoryboard {
    url: string;
    tileWidth: number;
    tileHeight: number;
    tiles: ThumbnailTile[];
}
export interface ThumbnailTile {
    startTime: number;
    x: number;
    y: number;
}
export interface MuxThumbnailStoryboard {
    url: string;
    tile_width: number;
    tile_height: number;
    tiles: MuxThumbnailTile[];
}
export interface MuxThumbnailTile {
    start: number;
    x: number;
    y: number;
}
export interface ThumbnailImageInit {
    url: string | URL;
    startTime: number;
    endTime?: number;
    width?: number;
    height?: number;
    coords?: ThumbnailCoords;
}
export interface ThumbnailImage extends Omit<ThumbnailImageInit, 'url'> {
    url: URL;
}
export interface ThumbnailCoords {
    x: number;
    y: number;
}
