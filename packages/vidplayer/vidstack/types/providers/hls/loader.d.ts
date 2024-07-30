import type { Src } from '../../core/index.js';
import type { MediaProviderLoader } from '../types.js';
import { VideoProviderLoader } from '../video/loader.js';
import type { HLSProvider } from './provider.js';
export declare class HLSProviderLoader extends VideoProviderLoader implements MediaProviderLoader<HLSProvider> {
    static supported: boolean;
    readonly name = "hls";
    canPlay(src: Src): boolean;
    load(context: any): Promise<HLSProvider>;
}
