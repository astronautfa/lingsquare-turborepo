import type { TextTrack as VdsTextTrack } from '../text-track.js';
import type { TextRenderer } from './text-renderer.js';
export declare class NativeTextRenderer implements TextRenderer {
    readonly priority = 0;
    private _display;
    private _video;
    private _track;
    private _tracks;
    canRender(_: any, video: HTMLVideoElement | null): video is HTMLVideoElement;
    attach(video: HTMLVideoElement | null): void;
    addTrack(track: VdsTextTrack): void;
    removeTrack(track: VdsTextTrack): void;
    changeTrack(track: VdsTextTrack | null): void;
    setDisplay(display: boolean): void;
    detach(): void;
    private _attachTrack;
    private _createTrackElement;
    private _copyCues;
    private _onChange;
}
