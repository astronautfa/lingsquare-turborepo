import { MediaPlayerController } from '../api/player-controller.js';
/**
 * Sync player props with internal store and dispatch change events.
 */
export declare class MediaStateSync extends MediaPlayerController {
    protected onSetup(): void;
    private _init;
    private _watchProvidedTypes;
    private _watchLogLevel;
    private _watchMetadata;
    private _watchTitle;
    private _watchAutoplay;
    private _watchLoop;
    private _watchControls;
    private _watchPoster;
    private _watchCrossOrigin;
    private _watchDuration;
    private _watchPlaysInline;
    private _watchClipTimes;
    private _watchLive;
    private _watchLiveTolerance;
    private _watchLiveEdge;
}
