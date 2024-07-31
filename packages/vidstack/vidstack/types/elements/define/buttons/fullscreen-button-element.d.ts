import { FullscreenButton } from '../../../components/index.js';
declare const MediaFullscreenButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, FullscreenButton>;
/**
 * @example
 * ```html
 * <media-fullscreen-button>
 *   <media-icon type="fullscreen"></media-icon>
 *   <media-icon type="fullscreen-exit"></media-icon>
 * </media-fullscreen-button>
 * ```
 */
export declare class MediaFullscreenButtonElement extends MediaFullscreenButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-fullscreen-button': MediaFullscreenButtonElement;
    }
}
export {};
