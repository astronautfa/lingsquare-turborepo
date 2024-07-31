import type { MediaContext } from '../../core/api/media-context.js';
import type { DASHConstructor, DASHLibrary } from './types.js';
export declare class DASHLibLoader {
    private _lib;
    private _ctx;
    private _callback;
    constructor(_lib: DASHLibrary, _ctx: MediaContext, _callback: (ctor: DASHConstructor) => void);
    private _startLoading;
    private _onLoadStart;
    private _onLoaded;
    private _onLoadError;
}
