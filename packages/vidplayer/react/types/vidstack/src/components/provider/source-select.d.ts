import { type ReadSignal, type WriteSignal } from 'maverick.js';
import { type MediaContext, type Src } from '../../core/index.js';
import { type MediaProviderLoader } from '../../providers/index.js';
export declare class SourceSelection {
    private _domSources;
    private _media;
    private _loader;
    private _initialize;
    private _loaders;
    private get _notify();
    constructor(_domSources: ReadSignal<Src[]>, _media: MediaContext, _loader: WriteSignal<MediaProviderLoader | null>, customLoaders?: MediaProviderLoader[]);
    connect(): void;
    private _onSourcesChange;
    private _onSourceChange;
    protected _findNewSource(currentSource: Src, sources: Src[]): Src<unknown>;
    protected _notifySourceChange(src: Src, loader: MediaProviderLoader | null, trigger?: Event): void;
    protected _notifyLoaderChange(loader: MediaProviderLoader | null, trigger?: Event): void;
    private _onSetup;
    private _onLoadSource;
    private _onLoadPoster;
}
export declare function isSameSrc(a: Src | undefined | null, b: Src | undefined | null): boolean;
