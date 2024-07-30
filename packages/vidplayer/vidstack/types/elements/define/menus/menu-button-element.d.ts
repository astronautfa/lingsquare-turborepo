import { MenuButton } from '../../../components/index.js';
declare const MediaMenuButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, MenuButton>;
/**
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
export declare class MediaMenuButtonElement extends MediaMenuButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-button': MediaMenuButtonElement;
    }
}
export {};
