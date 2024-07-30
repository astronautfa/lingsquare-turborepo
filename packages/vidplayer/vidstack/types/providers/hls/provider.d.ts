import { type Dispose } from 'maverick.js';
import type { Src } from '../../core/api/src-types.js';
import type { MediaProviderAdapter } from '../types.js';
import { VideoProvider } from '../video/provider.js';
import type { HLSInstanceCallback, HLSLibrary } from './types.js';
/**
 * The HLS provider introduces support for HLS streaming via the popular `hls.js`
 * library. HLS streaming is either [supported natively](https://caniuse.com/?search=hls) (generally
 * on iOS), or in environments that [support the Media Stream API](https://caniuse.com/?search=mediastream).
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/hls}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md}
 * @example
 * ```html
 * <media-player
 *   src="https://files.vidstack.io/hls/index.m3u8"
 *   poster="https://files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class HLSProvider extends VideoProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    private _ctor;
    private readonly _controller;
    /**
     * The `hls.js` constructor.
     */
    get ctor(): typeof import("hls.js").default | null;
    /**
     * The current `hls.js` instance.
     */
    get instance(): import("hls.js").default | null;
    /**
     * Whether `hls.js` is supported in this environment.
     */
    static supported: boolean;
    get type(): string;
    get canLiveSync(): boolean;
    protected _library: HLSLibrary;
    /**
     * The `hls.js` configuration object.
     *
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
     */
    get config(): Partial<import("hls.js").HlsConfig>;
    set config(config: Partial<import("hls.js").HlsConfig>);
    /**
     * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
     *
     * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
     */
    get library(): HLSLibrary;
    set library(library: HLSLibrary);
    preconnect(): void;
    setup(): void;
    loadSource(src: Src, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * The given callback is invoked when a new `hls.js` instance is created and right before it's
     * attached to media.
     */
    onInstance(callback: HLSInstanceCallback): Dispose;
    destroy(): void;
}
