import { SpeedRadioGroup } from '../../../components/index.js';
declare const MediaSpeedRadioGroupElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SpeedRadioGroup>;
/**
 * @part label - Contains the speed option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/speed-radio-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-speed-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-speed-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaSpeedRadioGroupElement extends MediaSpeedRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-speed-radio-group': MediaSpeedRadioGroupElement;
    }
}
export {};
