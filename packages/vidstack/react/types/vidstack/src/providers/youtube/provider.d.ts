import { type DeferredPromise } from 'maverick.js/std';
import { TimeRange, type MediaContext, type Src } from '../../core/index.js';
import { EmbedProvider } from '../embed/EmbedProvider.js';
import type { MediaProviderAdapter } from '../types.js';
import type { YouTubeCommandArg } from './embed/command.js';
import type { YouTubeMessage } from './embed/message.js';
import type { YouTubeParams } from './embed/params.js';
import { type YouTubePlayerStateValue } from './embed/state.js';
/**
 * This provider enables loading videos uploaded to YouTube (youtube.com) via embeds.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/youtube}
 * @see {@link https://developers.google.com/youtube/iframe_api_reference}
 * @example
 * ```html
 * <media-player src="youtube/_cMxraX_5RE">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class YouTubeProvider extends EmbedProvider<YouTubeMessage> implements MediaProviderAdapter, Pick<YouTubeParams, 'color' | 'start' | 'end'> {
    protected _ctx: MediaContext;
    protected readonly $$PROVIDER_TYPE = "YOUTUBE";
    readonly scope: import("maverick.js").Scope;
    protected _videoId: import("maverick.js").WriteSignal<string>;
    protected _state: YouTubePlayerStateValue;
    protected _seekingTimer: number;
    protected _pausedSeeking: boolean;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _currentSrc: Src<string> | null;
    protected _playPromise: DeferredPromise<void, string> | null;
    protected _pausePromise: DeferredPromise<void, string> | null;
    protected get _notify(): <Type extends keyof import("../../core/index.js").MediaEvents>(type: Type, ...init: import("maverick.js/std").InferEventDetail<import("../../core/index.js").MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: import("maverick.js/std").InferEventDetail<import("../../core/index.js").MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    constructor(iframe: HTMLIFrameElement, _ctx: MediaContext);
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
     * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
     * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular
     * user based on the user's individual language preferences and the availability of caption tracks.
     *
     * @defaultValue 'en'
     */
    language: string;
    color: 'white' | 'red';
    /**
     * Whether cookies should be enabled on the embed. This is turned off by default to be
     * GDPR-compliant.
     *
     * @defaultValue `false`
     */
    cookies: boolean;
    get currentSrc(): Src<string> | null;
    get type(): string;
    get videoId(): string;
    preconnect(): void;
    setup(): void;
    play(): Promise<void | undefined>;
    pause(): Promise<void | undefined>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setPlaybackRate(rate: number): void;
    loadSource(src: Src): Promise<void>;
    protected _getOrigin(): "https://www.youtube-nocookie.com" | "https://www.youtube.com";
    protected _watchVideoId(): void;
    protected _buildParams(): YouTubeParams;
    protected _remote<T extends keyof YouTubeCommandArg>(command: T, arg?: YouTubeCommandArg[T]): void;
    protected _onLoad(): void;
    protected _onReady(trigger: Event): void;
    protected _onPause(trigger: Event): void;
    protected _onTimeUpdate(time: number, trigger: Event): void;
    protected _getPlayedRange(time: number): TimeRange;
    protected _onProgress(buffered: number, seekable: TimeRange, trigger: Event): void;
    protected _onSeeked(trigger: Event): void;
    protected _onEnded(trigger: Event): void;
    protected _onStateChange(state: YouTubePlayerStateValue, trigger: Event): void;
    protected _onMessage({ info }: YouTubeMessage, event: MessageEvent): void;
    protected _reset(): void;
}
