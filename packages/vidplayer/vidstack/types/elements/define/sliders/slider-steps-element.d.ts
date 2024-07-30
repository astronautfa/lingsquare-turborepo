import { Component } from 'maverick.js';
declare class SliderSteps extends Component {
}
declare const MediaSliderStepsElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SliderSteps>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-steps}
 * @example
 * ```html
 * <media-slider>
 *   <media-slider-steps>
 *     <template>
 *       <div class="slider-step"></div>
 *     </template>
 *   </media-slider-steps>
 * </media-slider>
 * ```
 */
export declare class MediaSliderStepsElement extends MediaSliderStepsElement_base {
    static tagName: string;
    private _template;
    onConnect(el: HTMLElement): void;
    private _render;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-steps': MediaSliderStepsElement;
    }
}
export {};
