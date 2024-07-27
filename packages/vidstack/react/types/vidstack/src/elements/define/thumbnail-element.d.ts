import { type Attributes } from 'maverick.js/element';
import { Thumbnail, type ThumbnailProps } from '../../components/index.js';
import { type MediaContext } from '../../core/api/media-context.js';
declare const MediaThumbnailElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Thumbnail>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/thumbnail}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-thumbnail
 *     src="https://files.vidstack.io/thumbnails.vtt"
 *     time="10"
 *   ></media-thumbnail>
 * </media-player>
 * ```
 */
export declare class MediaThumbnailElement extends MediaThumbnailElement_base {
    static tagName: string;
    static attrs: Attributes<ThumbnailProps>;
    protected _media: MediaContext;
    protected _img: HTMLImageElement;
    protected onSetup(): void;
    protected onConnect(): void;
    private _createImg;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-thumbnail': MediaThumbnailElement;
    }
}
export {};
