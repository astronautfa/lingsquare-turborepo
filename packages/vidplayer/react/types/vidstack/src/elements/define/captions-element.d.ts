import { Captions } from '../../components/index.js';
declare const MediaCaptionsElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Captions>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/captions}
 * @example
 * ```html
 * <media-captions></media-captions>
 * ```
 */
export declare class MediaCaptionsElement extends MediaCaptionsElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-captions': MediaCaptionsElement;
    }
}
export {};
