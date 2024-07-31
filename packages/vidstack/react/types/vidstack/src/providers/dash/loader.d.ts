import type { Src } from '../../core/index.js';
import type { MediaProviderLoader } from '../types.js';
import { VideoProviderLoader } from '../video/loader.js';
import { DASHProvider } from './provider.js';
export declare class DASHProviderLoader extends VideoProviderLoader implements MediaProviderLoader<DASHProvider> {
    static supported: boolean;
    readonly name = "dash";
    canPlay(src: Src): boolean;
    load(context: any): Promise<DASHProvider>;
}
