import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { RadioGroupInstance, RadioInstance } from '../primitives/instances.js';
export interface RootProps extends ReactElementProps<RadioGroupInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<RadioGroupInstance>;
}
/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 * @example
 * ```tsx
 * <RadioGroup.Root>
 *   <RadioGroup.Item value="1080">1080p</RadioGroup.Item>
 *   <RadioGroup.Item value="720">720p</RadioGroup.Item>
 * </RadioGroup.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<RadioGroupInstance>>;
export interface ItemProps extends ReactElementProps<RadioInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 * @example
 * ```tsx
 * <RadioGroup.Item value="1080">1080p</RadioGroup.Item>
 * ```
 */
declare const Item: React.ForwardRefExoticComponent<Omit<ItemProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Root, Item };
