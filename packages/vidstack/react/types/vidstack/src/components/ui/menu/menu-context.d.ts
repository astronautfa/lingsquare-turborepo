import { type ReadSignal, type WriteSignal } from 'maverick.js';
import type { Menu } from './menu.js';
import type { MenuButton } from './menu-button.js';
import type { MenuItems } from './menu-items.js';
export interface MenuContext {
    readonly _submenu: boolean;
    readonly _expanded: ReadSignal<boolean>;
    readonly _hint: WriteSignal<string>;
    readonly _button: ReadSignal<HTMLElement | null>;
    readonly _content: ReadSignal<HTMLElement | null>;
    _attachMenuButton(button: MenuButton): void;
    _attachMenuItems(menuItems: MenuItems): void;
    _attachObserver(observer: MenuObserver): void;
    _disable(disable: boolean): void;
    _disableMenuButton(disable: boolean): void;
    _addSubmenu(menu: Menu): void;
    _onTransitionEvent(callback: (event: TransitionEvent) => void): void;
}
export interface MenuObserver {
    _onOpen?(trigger?: Event): void;
    _onClose?(trigger?: Event): void;
}
export declare const menuContext: import("maverick.js").Context<MenuContext>;
