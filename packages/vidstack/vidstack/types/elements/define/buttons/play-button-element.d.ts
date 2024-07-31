import { PlayButton } from '../../../components/index.js';
declare const MediaPlayButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, PlayButton>;
/**
 * @example
 * ```html
 * <media-play-button>
 *   <media-icon type="play"></media-icon>
 *   <media-icon type="pause"></media-icon>
 *   <media-icon type="replay"></media-icon>
 * </media-play-button>
 * ```
 */
export declare class MediaPlayButtonElement extends MediaPlayButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-play-button': MediaPlayButtonElement;
    }
}
export {};
