import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { MenuButtonInstance, MenuInstance, MenuItemInstance, MenuItemsInstance, MenuPortalInstance } from '../primitives/instances.js';
export interface RootProps extends ReactElementProps<MenuInstance> {
    asChild?: boolean;
    children: React.ReactNode;
    ref?: React.Ref<MenuInstance>;
}
/**
 * Root menu container used to hold and manage a menu button and menu items. This component is
 * used to display options in a floating panel. They can be nested to create submenus.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end"></Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<MenuInstance>>;
export interface ButtonProps extends ReactElementProps<MenuButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * `menuitem` when used inside a submenu.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end"></Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export interface PortalProps extends ReactElementProps<MenuPortalInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Portals menu items into the given container.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu#portal}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Portal>
 *     <Menu.Content placement="top end"></Menu.Content>
 *   </Menu.Portal>
 * </Menu.Root>
 * ```
 */
declare const Portal: React.ForwardRefExoticComponent<Omit<PortalProps, "ref"> & React.RefAttributes<HTMLElement>>;
export interface ItemsProps extends ReactElementProps<MenuItemsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to group and display settings or arbitrary content in a floating panel.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Items placement="top end"></Menu.Items>
 * </Menu.Root>
 * ```
 */
declare const Items: React.ForwardRefExoticComponent<Omit<ItemsProps, "ref"> & React.RefAttributes<HTMLElement>>;
export interface ItemProps extends ReactElementProps<MenuItemInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Represents a specific option or action, typically displayed as a text label or icon, which
 * users can select to access or perform a particular function or view related content.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end">
 *     <Menu.Item></Menu.Item>
 *   </Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Item: React.ForwardRefExoticComponent<Omit<ItemProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Root, Button, Portal, Items, Items as Content, type ItemsProps as ContentProps, Item };
export { Root as RadioGroup, Item as Radio, type RootProps as RadioGroupProps, type ItemProps as RadioProps, } from './radio-group.jsx';
