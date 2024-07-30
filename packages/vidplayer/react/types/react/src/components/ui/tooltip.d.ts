import * as React from 'react';
import { type ReactElementProps, type ReactProps } from 'maverick.js/react';
import { TooltipContentInstance, TooltipInstance, TooltipTriggerInstance } from '../primitives/instances.js';
export interface RootProps extends ReactProps<TooltipInstance> {
    asChild?: boolean;
    children: React.ReactNode;
}
/**
 * A contextual text bubble that displays a description for an element that appears on pointer
 * hover or keyboard focus.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare function Root({ children, ...props }: RootProps): React.JSX.Element;
declare namespace Root {
    var displayName: string;
}
export interface TriggerProps extends ReactElementProps<TooltipTriggerInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * Wraps the element that will trigger showing/hiding the tooltip on hover or keyboard focus. The
 * tooltip content is positioned relative to this element.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare const Trigger: React.ForwardRefExoticComponent<Omit<TriggerProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export interface ContentProps extends ReactElementProps<TooltipContentInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component contains the content that is visible when the tooltip trigger is interacted with.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare const Content: React.ForwardRefExoticComponent<Omit<ContentProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Root, Trigger, Content };
