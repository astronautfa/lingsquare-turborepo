import { TimeSlider } from '../../../components/index.js';
declare const MediaTimeSliderElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, TimeSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/time-slider}
 * @example
 * ```html
 * <media-time-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-time-slider>
 * ```
 * @example
 * ```html
 * <media-time-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   <media-slider-preview>
 * </media-time-slider>
 * ```
 */
export declare class MediaTimeSliderElement extends MediaTimeSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-time-slider': MediaTimeSliderElement;
    }
}
export {};
