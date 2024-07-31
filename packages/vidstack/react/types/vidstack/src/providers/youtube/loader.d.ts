import type { MediaType, Src } from '../../core/index.js';
import type { MediaContext } from '../../core/api/media-context.js';
import type { MediaProviderLoader } from '../types.js';
import type { YouTubeProvider } from './provider.js';
export declare class YouTubeProviderLoader implements MediaProviderLoader<YouTubeProvider> {
    readonly name = "youtube";
    target: HTMLIFrameElement;
    preconnect(): void;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<YouTubeProvider>;
    loadPoster(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}
