import { RadioGroup } from '../../../components/index.js';
declare const MediaRadioGroupElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, RadioGroup>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/radio-group}
 * @example
 * ```html
 * <media-radio-group value="720">
 *   <media-radio value="1080">1080p</media-radio>
 *   <media-radio value="720">720p</media-radio>
 *   <!-- ... -->
 * </media-radio-group>
 * ```
 */
export declare class MediaRadioGroupElement extends MediaRadioGroupElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-radio-group': MediaRadioGroupElement;
    }
}
export {};
