import { Radio } from '../../../components/index.js';
declare const MediaRadioElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Radio>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/radio}
 * @example
 * ```html
 * <media-radio-group value="720">
 *   <media-radio value="1080">1080p</media-radio>
 *   <media-radio value="720">720p</media-radio>
 *   <!-- ... -->
 * </media-radio-group>
 * ```
 */
export declare class MediaRadioElement extends MediaRadioElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-radio': MediaRadioElement;
    }
}
export {};
