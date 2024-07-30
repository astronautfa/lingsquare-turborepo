import { Component } from 'maverick.js';
import { type MenuContext } from './menu-context.js';
/**
 * Menu items can be used to display settings or arbitrary content in a floating panel.
 *
 * @attr data-root - Whether this is the root menu items.
 * @attr data-submenu - Whether menu items are part of a submenu.
 * @attr data-open - Whether menu items are currently visible.
 * @attr data-keyboard - Whether the menu is opened via keyboard.
 * @attr data-placement - The placement prop setting.
 * @attr data-focus - Whether item are being keyboard focused.
 * @attr data-hocus - Whether items are being keyboard focused or hovered over.
 * @attr data-transition - Whether the menu is resizing.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
export declare class MenuItems extends Component<MenuItemsProps> {
    static props: MenuItemsProps;
    protected _menu: MenuContext;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _watchPlacement;
    private _getButton;
}
export type MenuPlacement = MenuPlacementSide | `${MenuPlacementSide} ${MenuPlacementAlign}`;
export type MenuPlacementSide = 'top' | 'right' | 'bottom' | 'left';
export type MenuPlacementAlign = 'start' | 'center' | 'end';
export interface MenuItemsProps {
    /**
     * A space-separated list which specifies the side and alignment of the menu relative
     * to the menu button.
     *
     * @example `top center`
     * @example `bottom end`
     */
    placement: MenuPlacement | null;
    /**
     * The distance in pixels between the menu items and the menu button. You can also set
     * the CSS variable `--media-menu-y-offset` to adjust this offset.
     */
    offset: number;
    /**
     * The offset in pixels from the start/center/end aligned position. You can also set
     * the CSS variable `--media-menu-x-offset` to adjust this offset.
     */
    alignOffset: number;
}
