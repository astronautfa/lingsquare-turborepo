import { type Attributes } from 'maverick.js/element';
import { SliderValue, type SliderValueProps } from '../../../components/index.js';
declare const MediaSliderValueElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SliderValue>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-value}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-time-slider>
 * ```
 * @example
 * ```html
 * <media-slider-value type="current"></media-slider-value>
 * ```
 * @example
 * ```html
 * <media-slider-value show-hours pad-hours></media-slider-value>
 * ```
 * @example
 * ```html
 * <media-slider-value decimal-places="2"></media-slider-value>
 * ```
 */
export declare class MediaSliderValueElement extends MediaSliderValueElement_base {
    static tagName: string;
    static attrs: Attributes<SliderValueProps>;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-value': MediaSliderValueElement;
    }
}
export {};
