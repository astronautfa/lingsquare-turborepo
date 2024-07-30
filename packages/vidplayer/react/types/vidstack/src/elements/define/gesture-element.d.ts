import { Gesture } from '../../components/index.js';
declare const MediaGestureElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Gesture>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/gesture}
 * @example
 * ```html
 * <media-player>
 *   <media-provider>
 *     <media-gesture event="pointerup" action="toggle:paused"></media-gesture>
 *   </media-provider>
 * </media-player>
 * ```
 */
export declare class MediaGestureElement extends MediaGestureElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-gesture': MediaGestureElement;
    }
}
export {};
