import { MediaThumbnailElement } from '../thumbnail-element.js';
/**
 * @example
 * ```html
 * <media-player >
 *   <media-time-slider>
 *     <media-slider-preview>
 *       <media-slider-thumbnail
 *         src="https://files.vidstack.io/thumbnails.vtt"
 *       ></media-slider-thumbnail>
 *     </media-slider-preview>
 *   </media-time-slider>
 * </media-player>
 * ```
 */
export declare class MediaSliderThumbnailElement extends MediaThumbnailElement {
    static tagName: string;
    private _slider;
    protected onSetup(): void;
    protected onConnect(): void;
    private _watchTime;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-thumbnail': MediaSliderThumbnailElement;
    }
}
