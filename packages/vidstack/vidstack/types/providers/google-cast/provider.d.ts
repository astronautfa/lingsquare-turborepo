import type { MediaContext } from '../../core/api/media-context.js';
import type { Src } from '../../core/api/src-types.js';
import type { MediaStreamType } from '../../core/api/types.js';
import { TimeRange } from '../../core/time-ranges.js';
import { RAFLoop } from '../../foundation/observers/raf-loop.js';
import type { MediaProviderAdapter } from '../types.js';
import { GoogleCastTracksManager } from './tracks.js';
/**
 * The Google Cast provider adds support for casting/streaming videos to Cast Receiver.
 *
 * @see {@link https://developers.google.com/cast/docs/overview}
 * @docs {@link https://www.vidstack.io/docs/player/providers/google-cast}
 */
export declare class GoogleCastProvider implements MediaProviderAdapter {
    protected _player: cast.framework.RemotePlayer;
    protected _ctx: MediaContext;
    protected $$PROVIDER_TYPE: string;
    readonly scope: import("maverick.js").Scope;
    protected _currentSrc: Src<string> | null;
    protected _state: RemotePlaybackState;
    protected _currentTime: number;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _seekableRange: TimeRange;
    protected _timeRAF: RAFLoop;
    protected _playerEventHandlers: Record<string, RemotePlayerEventCallback>;
    protected _reloadInfo: {
        src: Src;
        paused: boolean;
        time: number;
    } | null;
    protected _isIdle: boolean;
    protected _tracks: GoogleCastTracksManager;
    protected get _notify(): <Type extends keyof import("../../index.js").MediaEvents>(type: Type, ...init: import("maverick.js/std").InferEventDetail<import("../../index.js").MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: import("maverick.js/std").InferEventDetail<import("../../index.js").MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    constructor(_player: cast.framework.RemotePlayer, _ctx: MediaContext);
    get type(): string;
    get currentSrc(): Src<string> | null;
    /**
     * The Google Cast remote player.
     *
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.RemotePlayer}
     */
    get player(): cast.framework.RemotePlayer;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
     */
    get cast(): cast.framework.CastContext;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastSession}
     */
    get session(): cast.framework.CastSession | null;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.Media}
     */
    get media(): chrome.cast.media.Media | undefined;
    /**
     * Whether the current Google Cast session belongs to this provider.
     */
    get hasActiveSession(): boolean;
    setup(): void;
    protected _attachCastContextEventListeners(): void;
    protected _attachCastPlayerEventListeners(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    getMediaStatus(request: chrome.cast.media.GetStatusRequest): Promise<unknown>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    loadSource(src: Src): Promise<void>;
    destroy(): void;
    protected _reset(): void;
    protected _resumeSession(): void;
    protected _endSession(): void;
    protected _disconnectFromReceiver(): void;
    protected _onAnimationFrame(): void;
    protected _onRemotePlayerEvent(event: cast.framework.RemotePlayerChangedEvent): void;
    protected _onCastStateChange(data: cast.framework.CastStateEventData | cast.framework.RemotePlayerChangedEvent): void;
    protected _onMediaLoadedChange(event: Event | cast.framework.RemotePlayerChangedEvent): void;
    protected _onCanControlVolumeChange(): void;
    protected _onCanSeekChange(event: Event | cast.framework.RemotePlayerChangedEvent): void;
    protected _getStreamType(): MediaStreamType;
    protected _onCurrentTimeChange(): void;
    protected _getPlayedRange(time: number): TimeRange;
    protected _onDurationChange(event: cast.framework.RemotePlayerChangedEvent): void;
    protected _onVolumeChange(event: cast.framework.RemotePlayerChangedEvent): void;
    protected _onPausedChange(event: cast.framework.RemotePlayerChangedEvent): void;
    protected _onProgress(event?: cast.framework.RemotePlayerChangedEvent): void;
    protected _onPlayerStateChange(event: cast.framework.RemotePlayerChangedEvent): void;
    protected _getSeekableRange(): TimeRange;
    protected _createEvent(detail: Event | {
        type: string;
    }): Event;
    protected _buildMediaInfo(src: Src<string>): chrome.cast.media.MediaInfo;
    protected _buildLoadRequest(src: Src<string>): chrome.cast.media.LoadRequest;
    protected _reload(paused: boolean, time: number): Promise<void>;
    protected _onNewLocalTracks(): void;
}
interface RemotePlayerEventCallback {
    (event: cast.framework.RemotePlayerChangedEvent): void;
}
export {};
