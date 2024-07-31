import type { Src } from '../../core/api/src-types.js';
export declare function getCastFrameworkURL(): string;
/**
 * Whether the Google Cast framework has loaded.
 */
export declare function hasLoadedCastFramework(): boolean;
/**
 * Whether Google Cast is available on this platform.
 */
export declare function isCastAvailable(): boolean;
/**
 * Whether the cast sender is connected.
 */
export declare function isCastConnected(): boolean;
/**
 * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
 */
export declare function getCastContext(): cast.framework.CastContext;
/**
 * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastSession}
 */
export declare function getCastSession(): cast.framework.CastSession | null;
/**
 * @see {@link https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.Media}
 */
export declare function getCastSessionMedia(): chrome.cast.media.Media | undefined;
export declare function hasActiveCastSession(src: Src | undefined | null): boolean;
/**
 * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastOptions}
 */
export declare function getDefaultCastOptions(): cast.framework.CastOptions;
export declare function getCastErrorMessage(code: chrome.cast.ErrorCode): string;
export declare function listenCastContextEvent<T extends keyof cast.framework.CastContextEvents>(type: T, handler: (event: cast.framework.CastContextEvents[T]) => void): import("maverick.js").Dispose | undefined;
export declare function listenCastSessionEvent<T extends keyof cast.framework.CastSessionEvents>(type: T, handler: (event: cast.framework.CastSessionEvents[T]) => void): import("maverick.js").Dispose | undefined;
