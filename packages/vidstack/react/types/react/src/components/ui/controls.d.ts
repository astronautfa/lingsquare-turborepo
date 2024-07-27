import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { ControlsGroupInstance, ControlsInstance } from '../primitives/instances.js';
export interface RootProps extends ReactElementProps<ControlsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component creates a container for control groups.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls}
 * @example
 * ```tsx
 * <Controls.Root>
 *   <Controls.Group></Controls.Group>
 *   <Controls.Group></Controls.Group>
 * <Controls.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<HTMLElement>>;
export interface GroupProps extends ReactElementProps<ControlsGroupInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component creates a container for media controls.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls#group}
 * @example
 * ```tsx
 * <Controls.Root>
 *   <Controls.Group></Controls.Group>
 *   <Controls.Group></Controls.Group>
 * <Controls.Root>
 * ```
 */
declare const Group: React.ForwardRefExoticComponent<Omit<GroupProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Root, Group };
