import { Component, State } from 'maverick.js';
import type { MediaProviderLoader } from '../../providers/index.js';
export interface MediaProviderProps {
    /** @internal */
    loaders: MediaProviderLoader[];
}
export interface MediaProviderState {
    loader: MediaProviderLoader | null;
}
/**
 * Used to render the current provider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/provider}
 */
export declare class MediaProvider extends Component<MediaProviderProps, MediaProviderState> {
    static props: MediaProviderProps;
    static state: State<MediaProviderState>;
    private _media;
    private _sources;
    private _domSources;
    private _domTracks;
    private _loader;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected _loadRafId: number;
    load(target: HTMLElement | null | undefined): void;
    protected _runLoader(target: HTMLElement | null | undefined): void;
    protected onDestroy(): void;
    private _destroyProvider;
    private _onResize;
    private _onMutation;
}
