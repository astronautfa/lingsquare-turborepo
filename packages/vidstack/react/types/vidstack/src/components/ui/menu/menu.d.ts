import { Component } from 'maverick.js';
import { DOMEvent } from 'maverick.js/std';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
/**
 * Root menu container used to hold and manage a menu button and menu items. This component is
 * used to display options in a floating panel. They can be nested to create submenus.
 *
 * @attr data-root - Whether this is the root menu items.
 * @attr data-submenu - Whether menu is a submenu.
 * @attr data-open - Whether menu is open.
 * @attr data-keyboard - Whether the menu is opened via keyboard.
 * @attr data-disabled - Whether menu is disabled.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
export declare class Menu extends Component<MenuProps, {}, MenuEvents> {
    static props: MenuProps;
    private _media;
    private _menuId;
    private _menuButtonId;
    private _expanded;
    private _disabled;
    private _trigger;
    private _content;
    private _parentMenu?;
    private _submenus;
    private _menuObserver;
    private _popper;
    private _focus;
    private _isSliderActive;
    private _isTriggerDisabled;
    private _transitionCallbacks;
    /**
     * The menu trigger element.
     */
    get triggerElement(): HTMLElement | null;
    /**
     * The menu items element.
     */
    get contentElement(): HTMLElement | null;
    /**
     * Whether this menu is the child of another menu that contains it.
     */
    get isSubmenu(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _observeSliders;
    private _watchExpanded;
    private _attachMenuButton;
    private _attachMenuItems;
    private _attachObserver;
    private _updateMenuItemsHidden;
    private _disableMenuButton;
    private _wasKeyboardExpand;
    private _onExpandedChange;
    private _updateFocus;
    private _isExpanded;
    private _isDisabled;
    private _disable;
    private _onPointerUp;
    private _onWindowPointerUp;
    private _getCloseTarget;
    private _toggleMediaControls;
    private _addSubmenu;
    private _removeSubmenuBind;
    private _removeSubmenu;
    private _isSubmenuOpen;
    private _onSubmenuOpenBind;
    private _onSubmenuOpen;
    private _onSubmenuCloseBind;
    private _onSubmenuClose;
    private _onResize;
    protected _isTransitionActive: boolean;
    protected _onResizeTransition(event: TransitionEvent): void;
    /**
     * Open this menu. The first menu item will be focused if a `KeyboardEvent` trigger is provided
     */
    open(trigger?: Event): void;
    /**
     * Close this menu. The menu button that controls this menu will be focused if a `KeyboardEvent`
     * trigger is provided
     */
    close(trigger?: Event): void;
}
export interface MenuProps {
    /**
     * The amount of time in milliseconds to wait before showing the menu.
     */
    showDelay: number;
}
export interface MenuEvents extends Pick<MediaRequestEvents, 'media-pause-controls-request' | 'media-resume-controls-request'> {
    open: MenuOpenEvent;
    close: MenuCloseEvent;
}
/**
 * Fired when the menu is opened.
 */
export interface MenuOpenEvent extends DOMEvent<void> {
    target: Menu;
}
/**
 * Fired when the menu is closed.
 */
export interface MenuCloseEvent extends DOMEvent<void> {
    target: Menu;
}
