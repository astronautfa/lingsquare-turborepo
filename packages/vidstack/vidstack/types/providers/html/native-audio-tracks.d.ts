import type { MediaContext } from '../../core/api/media-context.js';
import type { HTMLMediaProvider } from './provider.js';
export declare class NativeAudioTracks {
    private _provider;
    private _ctx;
    private get _nativeTracks();
    constructor(_provider: HTMLMediaProvider, _ctx: MediaContext);
    private _onAddNativeTrack;
    private _onRemoveNativeTrack;
    private _onChangeNativeTrack;
    private _getEnabledNativeTrack;
    private _onChangeTrack;
}
