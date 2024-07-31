import type { MediaContext } from '../../core/api/media-context.js';
import type { HLSConstructor, HLSLibrary } from './types.js';
export declare class HLSLibLoader {
    private _lib;
    private _ctx;
    private _callback;
    constructor(_lib: HLSLibrary, _ctx: MediaContext, _callback: (ctor: HLSConstructor) => void);
    private _startLoading;
    private _onLoadStart;
    private _onLoaded;
    private _onLoadError;
}
