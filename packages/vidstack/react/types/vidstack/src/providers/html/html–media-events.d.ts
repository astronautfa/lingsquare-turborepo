import type { MediaContext } from '../../core/api/media-context.js';
import type { HTMLMediaProvider } from './provider.js';
export declare class HTMLMediaEvents {
    private _provider;
    private _ctx;
    private _disposal;
    private _waiting;
    private _attachedLoadStart;
    private _attachedCanPlay;
    private _timeRAF;
    private get _media();
    private get _notify();
    constructor(_provider: HTMLMediaProvider, _ctx: MediaContext);
    private _onDispose;
    /**
     * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
     * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
     * resolve that by retrieving time updates in a request animation frame loop.
     */
    private _onAnimationFrame;
    private _attachInitialListeners;
    private _attachLoadStartListeners;
    private _attachCanPlayListeners;
    private _handlers;
    private _handleDevEvent;
    private _attachEventListener;
    private _onDevEvent;
    private _updateCurrentTime;
    private _onLoadStart;
    private _onAbort;
    private _onEmptied;
    private _onLoadedData;
    private _onLoadedMetadata;
    private _getCanPlayDetail;
    private _onPlay;
    private _onPause;
    private _onCanPlay;
    private _onCanPlayThrough;
    private _onPlaying;
    private _onStalled;
    private _onWaiting;
    private _onEnded;
    protected _attachTimeUpdate(): void;
    protected _onTimeUpdate(event: Event): void;
    private _onDurationChange;
    private _onVolumeChange;
    private _onSeeked;
    private _onSeeking;
    private _onProgress;
    private _onSuspend;
    private _onRateChange;
    private _onError;
}
