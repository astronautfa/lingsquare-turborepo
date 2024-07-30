import { MediaPlayerController } from '../api/player-controller.js';
export declare class NavigatorMediaSession extends MediaPlayerController {
    protected static _actions: readonly ["play", "pause", "seekforward", "seekbackward", "seekto"];
    constructor();
    protected onConnect(): void;
    protected _onDisconnect(): void;
    protected _onMetadataChange(): void;
    protected _onPlaybackStateChange(): void;
    protected _handleAction(details: MediaSessionActionDetails): void;
}
