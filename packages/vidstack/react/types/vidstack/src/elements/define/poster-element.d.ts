import { type Attributes } from 'maverick.js/element';
import { Poster, type PosterProps } from '../../components/index.js';
declare const MediaPosterElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Poster>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/poster}
 * @example
 * ```html
 * <media-player>
 *   <media-poster src="..." alt="Large alien ship hovering over New York."></media-poster>
 * </media-player>
 * ```
 */
export declare class MediaPosterElement extends MediaPosterElement_base {
    static tagName: string;
    static attrs: Attributes<PosterProps>;
    private _img;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-poster': MediaPosterElement;
    }
}
export {};
