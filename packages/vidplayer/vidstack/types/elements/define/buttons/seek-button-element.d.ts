import { SeekButton } from '../../../components/index.js';
declare const MediaSeekButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, SeekButton>;
/**
 * @example
 * ```html
 * <!-- Forward +30s on each press. -->
 * <media-seek-button seconds="+30">
 *   <media-icon type="seek-forward"></media-icon>
 * </media-seek-button>
 * <!-- Backward -30s on each press. -->
 * <media-seek-button seconds="-30">
 *   <media-icon type="seek-backward"></media-icon>
 * </media-seek-button>
 * ```
 */
export declare class MediaSeekButtonElement extends MediaSeekButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-seek-button': MediaSeekButtonElement;
    }
}
export {};
