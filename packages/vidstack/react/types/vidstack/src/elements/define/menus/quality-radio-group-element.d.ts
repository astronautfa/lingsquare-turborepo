import { QualityRadioGroup } from '../../../components/index.js';
declare const MediaQualityRadioGroupElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, QualityRadioGroup>;
/**
 * @part label - Contains the quality option label.
 * @part bitrate - Contains the quality option bitrate.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/quality-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-quality-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *           <span data-part="bitrate"></span>
 *         </media-radio>
 *       </template>
 *     </media-quality-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaQualityRadioGroupElement extends MediaQualityRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-quality-radio-group': MediaQualityRadioGroupElement;
    }
}
export {};
