import { AudioGainRadioGroup } from '../../../components/index.js';
declare const MediaAudioGainRadioGroupElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, AudioGainRadioGroup>;
/**
 * @part label - Contains the audio gain option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-gain-group}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-audio-gain-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-audio-gain-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaAudioGainRadioGroupElement extends MediaAudioGainRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-gain-radio-group': MediaAudioGainRadioGroupElement;
    }
}
export {};
