import type { MediaType, Src } from '../../core/index.js';
import type { MediaContext } from '../../core/api/media-context.js';
import type { MediaProviderLoader } from '../types.js';
import type { VideoProvider } from './provider.js';
export declare class VideoProviderLoader implements MediaProviderLoader<VideoProvider> {
    readonly name: string;
    target: HTMLVideoElement;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VideoProvider>;
}
