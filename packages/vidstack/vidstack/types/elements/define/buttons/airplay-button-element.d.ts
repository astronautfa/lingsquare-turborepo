import { AirPlayButton } from '../../../components/index.js';
declare const MediaAirPlayButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, AirPlayButton>;
/**
 * @example
 * ```html
 * <media-airplay-button>
 *   <media-icon type="airplay"></media-icon>
 * </media-airplay-button>
 * ```
 */
export declare class MediaAirPlayButtonElement extends MediaAirPlayButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-airplay-button': MediaAirPlayButtonElement;
    }
}
export {};
