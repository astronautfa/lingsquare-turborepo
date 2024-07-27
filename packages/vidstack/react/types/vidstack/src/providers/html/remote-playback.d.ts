import type { MediaContext } from '../../core/api/media-context.js';
import type { MediaRemotePlaybackAdapter } from '../types.js';
export declare abstract class HTMLRemotePlaybackAdapter implements MediaRemotePlaybackAdapter {
    protected _media: HTMLMediaElement;
    protected _ctx: MediaContext;
    protected abstract readonly _type: 'airplay' | 'google-cast';
    protected abstract readonly _canPrompt: boolean;
    protected _state?: RemotePlaybackState;
    protected _supported: import("maverick.js").WriteSignal<boolean>;
    get supported(): boolean;
    constructor(_media: HTMLMediaElement, _ctx: MediaContext);
    private _setup;
    private _watchSupported;
    prompt(): Promise<void>;
    protected _onStateChange(event?: Event): void;
}
export declare class HTMLAirPlayAdapter extends HTMLRemotePlaybackAdapter {
    _type: "airplay";
    protected get _canPrompt(): boolean;
}
export declare class HTMLGoogleCastAdapter extends HTMLRemotePlaybackAdapter {
    _type: "google-cast";
    get _canPrompt(): boolean;
}
