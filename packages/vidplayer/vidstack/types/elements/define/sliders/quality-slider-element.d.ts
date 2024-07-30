import { QualitySlider } from '../../../components/index.js';
declare const MediaQualitySliderElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, QualitySlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/quality-slider}
 * @example
 * ```html
 * <media-quality-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-quality-slider>
 * ```
 * @example
 * ```html
 * <media-quality-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-quality-slider>
 * ```
 */
export declare class MediaQualitySliderElement extends MediaQualitySliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-quality-slider': MediaQualitySliderElement;
    }
}
export {};
