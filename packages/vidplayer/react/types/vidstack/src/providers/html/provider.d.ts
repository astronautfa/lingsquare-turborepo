import type { MediaContext } from '../../core/api/media-context.js';
import type { HTMLMediaSrc, Src } from '../../core/api/src-types.js';
import type { MediaProviderAdapter } from '../types.js';
import { AudioGain } from './audio/audio-gain.js';
/**
 * This HTML media provider adapts the underlying media element such as `<audio>` or `<video>` to
 * satisfy the media provider interface.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement}
 */
export declare class HTMLMediaProvider implements MediaProviderAdapter {
    protected _media: HTMLMediaElement;
    protected _ctx: MediaContext;
    readonly scope: import("maverick.js").Scope;
    protected _currentSrc: Src<HTMLMediaSrc> | null;
    readonly audioGain: AudioGain;
    constructor(_media: HTMLMediaElement, _ctx: MediaContext);
    setup(): void;
    get type(): string;
    get media(): HTMLMediaElement;
    get currentSrc(): Src<HTMLMediaSrc> | null;
    setPlaybackRate(rate: number): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): void;
    setVolume(volume: number): void;
    setCurrentTime(time: number): void;
    setPlaysInline(inline: boolean): void;
    loadSource({ src, type }: Src, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * Append source so it works when requesting AirPlay since hls.js will remove it.
     */
    protected _appendSource(src: Src<string>, defaultType?: string): void;
    protected _removeSource(): void;
    protected _appendMediaFragment(src: string): string;
}
