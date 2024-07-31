import type { MediaStreamType } from '../core/index.js';
export declare function resolveStreamTypeFromDASHManifest(manifestSrc: string, requestInit?: RequestInit): Promise<MediaStreamType>;
export declare function resolveStreamTypeFromHLSManifest(manifestSrc: string, requestInit?: RequestInit): Promise<MediaStreamType>;
