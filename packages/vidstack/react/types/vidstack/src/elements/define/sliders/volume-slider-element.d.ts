import { VolumeSlider } from '../../../components/index.js';
declare const MediaVolumeSliderElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, VolumeSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/volume-slider}
 * @example
 * ```html
 * <media-volume-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-volume-slider>
 * ```
 * @example
 * ```html
 * <media-volume-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-volume-slider>
 * ```
 */
export declare class MediaVolumeSliderElement extends MediaVolumeSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-volume-slider': MediaVolumeSliderElement;
    }
}
export {};
