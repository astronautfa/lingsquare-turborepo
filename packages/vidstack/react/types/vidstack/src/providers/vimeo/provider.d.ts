import { type DeferredPromise } from 'maverick.js/std';
import { TimeRange, type MediaContext, type Src } from '../../core/index.js';
import { RAFLoop } from '../../foundation/observers/raf-loop.js';
import { EmbedProvider } from '../embed/EmbedProvider.js';
import type { VimeoCommandArg, VimeoCommandData } from './embed/command.js';
import { type VimeoErrorPayload } from './embed/event.js';
import type { VimeoMessage } from './embed/message.js';
import type { VimeoChapter, VimeoQuality, VimeoVideoInfo } from './embed/misc.js';
import type { VimeoParams } from './embed/params.js';
/**
 * This provider enables loading videos uploaded to Vimeo (https://vimeo.com) via embeds.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/vimeo}
 * @see {@link https://developer.vimeo.com/player/sdk}
 * @example
 * ```html
 * <media-player src="vimeo/640499893">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 * @example
 * ```html
 * <media-player src="vimeo/640499893?hash={hash}">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class VimeoProvider extends EmbedProvider<VimeoMessage> implements Pick<VimeoParams, 'title' | 'byline' | 'portrait' | 'color'> {
    protected _ctx: MediaContext;
    protected readonly $$PROVIDER_TYPE = "VIMEO";
    readonly scope: import("maverick.js").Scope;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _seekableRange: TimeRange;
    protected _playPromise: DeferredPromise<void, string> | null;
    protected _pausePromise: DeferredPromise<void, string> | null;
    protected _videoInfoPromise: DeferredPromise<VimeoVideoInfo, void> | null;
    protected _videoId: import("maverick.js").WriteSignal<string>;
    protected _pro: import("maverick.js").WriteSignal<boolean>;
    protected _hash: string | null;
    protected _currentSrc: Src<string> | null;
    protected _currentCue: VTTCue | null;
    protected _timeRAF: RAFLoop;
    private _chaptersTrack;
    protected get _notify(): <Type extends keyof import("../../core/index.js").MediaEvents>(type: Type, ...init: import("maverick.js/std").InferEventDetail<import("../../core/index.js").MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: import("maverick.js/std").InferEventDetail<import("../../core/index.js").MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    constructor(iframe: HTMLIFrameElement, _ctx: MediaContext);
    /**
     * Whether tracking session data should be enabled on the embed, including cookies and analytics.
     * This is turned off by default to be GDPR-compliant.
     *
     * @defaultValue `false`
     */
    cookies: boolean;
    title: boolean;
    byline: boolean;
    portrait: boolean;
    color: string;
    get type(): string;
    get currentSrc(): Src<string> | null;
    get videoId(): string;
    get hash(): string | null;
    get isPro(): boolean;
    preconnect(): void;
    setup(): void;
    destroy(): void;
    play(): Promise<void | undefined>;
    pause(): Promise<void | undefined>;
    setMuted(muted: any): void;
    setCurrentTime(time: any): void;
    setVolume(volume: any): void;
    setPlaybackRate(rate: any): void;
    loadSource(src: Src): Promise<void>;
    protected _watchVideoId(): void;
    protected _watchVideoInfo(): (() => void) | undefined;
    protected _watchPro(): import("maverick.js").Dispose | undefined;
    protected _getOrigin(): string;
    protected _buildParams(): VimeoParams;
    protected _onAnimationFrame(): void;
    private _preventTimeUpdates;
    protected _onTimeUpdate(time: number, trigger: Event): void;
    protected _getPlayedRange(time: number): TimeRange;
    protected _onSeeked(time: number, trigger: Event): void;
    protected _onLoaded(trigger: Event): void;
    private _onReady;
    protected _onMethod<T extends keyof VimeoCommandData>(method: T, data: VimeoCommandData[T], trigger: Event): void;
    protected _attachListeners(): void;
    protected _onPause(trigger: Event): void;
    protected _onPlay(trigger: Event): void;
    protected _onPlayProgress(trigger: Event): void;
    protected _onLoadProgress(buffered: number, trigger: Event): void;
    protected _onBufferStart(trigger: Event): void;
    protected _onBufferEnd(trigger: Event): void;
    protected _onWaiting(trigger: Event): void;
    protected _onVolumeChange(volume: number, muted: boolean, trigger: Event): void;
    protected _onChaptersChange(chapters: VimeoChapter[]): void;
    protected _removeChapters(): void;
    protected _onQualitiesChange(qualities: VimeoQuality[], trigger: Event): void;
    protected _onQualityChange({ id }: {
        id?: string;
    } | undefined, trigger: Event): void;
    private _onEvent;
    protected _onError(error: VimeoErrorPayload, trigger: Event): void;
    protected _onMessage(message: VimeoMessage, event: MessageEvent): void;
    protected _onLoad(): void;
    protected _remote<T extends keyof VimeoCommandArg>(command: T, arg?: VimeoCommandArg[T]): void;
    protected _reset(): void;
}
