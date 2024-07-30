import { Slider } from '../../../components/index.js';
declare const MediaSliderElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Slider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider}
 * @example
 * ```html
 * <media-slider min="0" max="100" value="50" aria-label="...">
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-slider>
 * ```
 */
export declare class MediaSliderElement extends MediaSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider': MediaSliderElement;
    }
}
export {};
