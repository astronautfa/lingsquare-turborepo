import { SliderPreview } from '../../../components/index.js';
declare const MediaSliderPreviewElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SliderPreview>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider#preview}
 */
export declare class MediaSliderPreviewElement extends MediaSliderPreviewElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-preview': MediaSliderPreviewElement;
    }
}
export {};
