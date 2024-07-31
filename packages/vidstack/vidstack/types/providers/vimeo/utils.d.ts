import type { VimeoVideoInfo } from './embed/misc.js';
export declare function resolveVimeoVideoId(src: string): {
    videoId: string | undefined;
    hash: string | undefined;
};
export declare function getVimeoVideoInfo(videoId: string, abort: AbortController, videoHash?: string | null): Promise<VimeoVideoInfo | undefined>;
