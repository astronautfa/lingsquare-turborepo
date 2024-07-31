import type { MediaContext, MediaProviderAdapter, MediaProviderLoader, MediaType, Src } from 'vidstack';
export declare class RemotionProviderLoader implements MediaProviderLoader {
    readonly name = "remotion";
    target: HTMLElement;
    constructor();
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<MediaProviderAdapter>;
}
