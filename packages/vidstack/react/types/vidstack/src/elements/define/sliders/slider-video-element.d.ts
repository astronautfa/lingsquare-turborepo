import { SliderVideo } from '../../../components/index.js';
declare const MediaSliderVideoElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SliderVideo>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-video}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-preview>
 *     <media-slider-video src="/low-res-video.mp4"></media-slider-video>
 *   </media-slider-preview>
 * </media-time-slider>
 * ```
 */
export declare class MediaSliderVideoElement extends MediaSliderVideoElement_base {
    static tagName: string;
    private _media;
    private _video;
    protected onSetup(): void;
    protected onConnect(): void;
    private _createVideo;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-video': MediaSliderVideoElement;
    }
}
export {};
