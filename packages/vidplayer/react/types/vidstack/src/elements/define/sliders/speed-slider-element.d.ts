import { SpeedSlider } from '../../../components/index.js';
declare const MediaSpeedSliderElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SpeedSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/speed-slider}
 * @example
 * ```html
 * <media-speed-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-speed-slider>
 * ```
 * @example
 * ```html
 * <media-speed-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-speed-slider>
 * ```
 */
export declare class MediaSpeedSliderElement extends MediaSpeedSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-speed-slider': MediaSpeedSliderElement;
    }
}
export {};
