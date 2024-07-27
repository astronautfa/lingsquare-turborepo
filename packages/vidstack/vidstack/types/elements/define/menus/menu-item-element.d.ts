import { MenuItem } from '../../../components/index.js';
declare const MediaMenuItemElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, MenuItem>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-items>
 *      <media-menu-item></media-menu-item>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaMenuItemElement extends MediaMenuItemElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-item': MediaMenuItemElement;
    }
}
export {};
