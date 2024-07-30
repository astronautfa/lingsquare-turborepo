import { type Dispose } from 'maverick.js';
import type { Src } from '../../core/api/src-types.js';
import type { MediaProviderAdapter } from '../types.js';
import { VideoProvider } from '../video/provider.js';
import type { DASHInstanceCallback, DASHLibrary } from './types.js';
/**
 * The DASH provider introduces support for DASH streaming via the popular `dash.js`
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/dash}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @see {@link https://cdn.dashjs.org/latest/jsdoc/index.html}
 * @example
 * ```html
 * <media-player
 *   src="https://files.vidstack.io/dash/manifest.mpd"
 *   poster="https://files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class DASHProvider extends VideoProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    private _ctor;
    private readonly _controller;
    /**
     * The `dash.js` constructor.
     */
    get ctor(): typeof import("dashjs").MediaPlayer | null;
    /**
     * The current `dash.js` instance.
     */
    get instance(): import("dashjs").MediaPlayerClass | null;
    /**
     * Whether `dash.js` is supported in this environment.
     */
    static supported: boolean;
    get type(): string;
    get canLiveSync(): boolean;
    protected _library: DASHLibrary;
    /**
     * The `dash.js` configuration object.
     *
     * @see {@link https://cdn.dashjs.org/latest/jsdoc/module-Settings.html}
     */
    get config(): Partial<import("dashjs").MediaPlayerSettingClass>;
    set config(config: Partial<import("dashjs").MediaPlayerSettingClass>);
    /**
     * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
     *
     * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
     */
    get library(): DASHLibrary;
    set library(library: DASHLibrary);
    preconnect(): void;
    setup(): void;
    loadSource(src: Src, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * The given callback is invoked when a new `dash.js` instance is created and right before it's
     * attached to media.
     */
    onInstance(callback: DASHInstanceCallback): Dispose;
    destroy(): void;
}
