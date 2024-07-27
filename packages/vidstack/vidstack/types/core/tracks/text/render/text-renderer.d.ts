import type { MediaContext } from '../../../api/media-context.js';
import { TextTrack } from '../text-track.js';
export declare class TextRenderers {
    private _media;
    private _video;
    private _textTracks;
    private _renderers;
    private _nativeDisplay;
    private _nativeRenderer;
    private _customRenderer;
    constructor(_media: MediaContext);
    private _watchControls;
    add(renderer: TextRenderer): void;
    remove(renderer: TextRenderer): void;
    /** @internal */
    _attachVideo(video: HTMLVideoElement | null): void;
    private _addNativeTrack;
    private _removeNativeTrack;
    private _onAddTrack;
    private _onRemoveTrack;
    private _update;
    private _detach;
}
export interface TextRenderer {
    readonly priority: number;
    canRender(track: TextTrack, video: HTMLVideoElement | null): boolean;
    attach(video: HTMLVideoElement | null): any;
    detach(): void;
    changeTrack(track: TextTrack | null): void;
}
