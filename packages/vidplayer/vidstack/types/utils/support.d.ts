export declare const UA: string;
export declare const IS_IOS: boolean;
export declare const IS_IPHONE: boolean;
export declare const IS_CHROME: boolean;
export declare const IS_IOS_CHROME: boolean;
export declare const IS_SAFARI: boolean;
/**
 * Returns the current Android OS version. Defaults to `0` if unknown.
 */
export declare function getAndroidVersion(): number;
/**
 * Checks whether the `IntersectionObserver` API is available.
 */
export declare function canObserveIntersection(): boolean;
/**
 * Checks if the ScreenOrientation API is available.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
export declare function canOrientScreen(): boolean;
/**
 * Checks if the screen orientation can be changed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
export declare function canRotateScreen(): boolean;
/**
 * Reduced motion iOS & MacOS setting.
 *
 * @see {@link https://webkit.org/blog/7551/responsive-design-for-motion/}
 */
export declare function isReducedMotionPreferred(): boolean;
export declare function canPlayAudioType(audio: HTMLAudioElement | null, type: string): boolean;
export declare function canPlayVideoType(video: HTMLVideoElement | null, type: string): boolean;
/**
 * Checks if the native HTML5 video player can play HLS.
 */
export declare function canPlayHLSNatively(video?: HTMLVideoElement | null): boolean;
/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the Chrome browser.
 *
 * @see {@link https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture}
 */
export declare function canUsePictureInPicture(video: HTMLVideoElement | null): boolean;
/**
 * Checks if the native HTML5 video player can use the presentation API in Safari.
 *
 * @see {@link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode}
 */
export declare function canUseVideoPresentation(video: HTMLVideoElement | null): boolean;
export declare function canChangeVolume(): Promise<boolean>;
/**
 * @see {@link https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts}
 */
export declare function getMediaSource(): typeof MediaSource | undefined;
/**
 * @see {@link https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts}
 */
export declare function getSourceBuffer(): typeof SourceBuffer | undefined;
/**
 * Whether `hls.js` is supported in this environment. Checks whether `MediaSource` or
 * `ManagedMediaSource` and a valid `SourceBuffer` API are available.
 *
 * @see {@link https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts}
 */
export declare function isHLSSupported(): boolean;
/**
 * Whether `dashjs` is supported in this environment. Checks whether `MediaSource` or
 * `ManagedMediaSource` and a valid `SourceBuffer` API are available.
 */
export declare function isDASHSupported(): boolean;
