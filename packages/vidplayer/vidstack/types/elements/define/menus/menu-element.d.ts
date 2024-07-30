import { Menu } from '../../../components/index.js';
declare const MediaMenuElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Menu>;
/**
 * @part close-target - Closes menu when pressed.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Settings">
 *     <media-icon type="settings"></media-icon>
 *   </media-menu-button>
 *   <media-menu-items>
 *     <!-- ... -->
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaMenuElement extends MediaMenuElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu': MediaMenuElement;
    }
}
export {};
