import { type Attributes } from 'maverick.js/element';
import { MenuPortal, type MenuPortalProps } from '../../../components/index.js';
declare const MediaMenuPortalElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, MenuPortal>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu#portal}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-portal>
 *     <media-menu-items></media-menu-items>
 *   </media-menu-portal>
 * </media-menu>
 * ```
 */
export declare class MediaMenuPortalElement extends MediaMenuPortalElement_base {
    static tagName: string;
    static attrs: Attributes<MenuPortalProps>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-portal': MediaMenuPortalElement;
    }
}
export {};
