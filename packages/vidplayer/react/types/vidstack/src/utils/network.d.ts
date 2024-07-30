import type { Src } from '../core/api/src-types.js';
export declare function appendParamsToURL(baseUrl: string, params: Record<string, any>): string;
export declare function preconnect(url: string, rel?: 'preconnect' | 'prefetch' | 'preload'): boolean;
export declare function loadScript(src: string): Promise<void>;
export declare function getRequestCredentials(crossOrigin?: string | null): RequestCredentials | undefined;
export type FileDownloadInfo = boolean | string | {
    url: string;
    filename: string;
} | null;
export declare function getDownloadFile({ title, src, download, }: {
    src: Src;
    title: string;
    download?: FileDownloadInfo;
}): {
    url: unknown;
    name: string;
} | null;
