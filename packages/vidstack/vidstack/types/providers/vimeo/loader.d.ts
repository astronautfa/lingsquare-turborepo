import type { MediaType, Src } from '../../core/index.js';
import type { MediaContext } from '../../core/api/media-context.js';
import type { MediaProviderLoader } from '../types.js';
import type { VimeoProvider } from './provider.js';
export declare class VimeoProviderLoader implements MediaProviderLoader<VimeoProvider> {
    readonly name = "vimeo";
    target: HTMLIFrameElement;
    preconnect(): void;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VimeoProvider>;
    loadPoster(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}
