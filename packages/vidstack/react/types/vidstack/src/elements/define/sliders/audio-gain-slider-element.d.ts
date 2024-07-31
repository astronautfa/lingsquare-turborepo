import { AudioGainSlider } from '../../../components/index.js';
declare const MediaAudioGainSliderElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, AudioGainSlider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/audio-gain-slider}
 * @example
 * ```html
 * <media-audio-gain-slider>
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-audio-gain-slider>
 * ```
 * @example
 * ```html
 * <media-audio-gain-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value></media-slider-value>
 *   </media-slider-preview>
 * </media-audio-gain-slider>
 * ```
 */
export declare class MediaAudioGainSliderElement extends MediaAudioGainSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-gain-slider': MediaAudioGainSliderElement;
    }
}
export {};
