import type { MediaType, Src } from '../../core/index.js';
import type { MediaContext } from '../../core/api/media-context.js';
import type { MediaProviderLoader } from '../types.js';
import type { GoogleCastProvider } from './provider.js';
import type { GoogleCastOptions } from './types.js';
export declare class GoogleCastLoader implements MediaProviderLoader<GoogleCastProvider> {
    readonly name = "google-cast";
    target: HTMLElement;
    protected _player?: cast.framework.RemotePlayer;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
     */
    get cast(): cast.framework.CastContext;
    mediaType(): MediaType;
    canPlay(src: Src): boolean;
    prompt(ctx: MediaContext): Promise<void>;
    load(ctx: MediaContext): Promise<GoogleCastProvider>;
    protected _loadCastFramework(ctx: MediaContext): Promise<import("./events.js").GoogleCastLoadedEvent | undefined>;
    protected _showPrompt(options: GoogleCastOptions): Promise<void>;
    protected _setOptions(options?: GoogleCastOptions): void;
    protected _notifyRemoteStateChange(ctx: MediaContext, state: RemotePlaybackState, trigger?: Event): void;
    private _createError;
}
