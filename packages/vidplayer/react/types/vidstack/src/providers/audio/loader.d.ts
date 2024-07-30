import type { MediaType, Src } from '../../core/index.js';
import type { MediaContext } from '../../core/api/media-context.js';
import type { MediaProviderLoader } from '../types.js';
import type { AudioProvider } from './provider.js';
export declare class AudioProviderLoader implements MediaProviderLoader<AudioProvider> {
    readonly name = "audio";
    target: HTMLAudioElement;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<AudioProvider>;
}
