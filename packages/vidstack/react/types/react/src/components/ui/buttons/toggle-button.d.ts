import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { ToggleButtonInstance } from '../../primitives/instances.js';
export interface ToggleButtonProps extends ReactElementProps<ToggleButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A toggle button is a two-state button that can be either off (not pressed) or on (pressed).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/toggle-button}
 * @example
 * ```tsx
 * <ToggleButton aria-label="...">
 *   <OnIcon />
 *   <OffIcon />
 * </ToggleButton>
 * ```
 */
declare const ToggleButton: React.ForwardRefExoticComponent<Omit<ToggleButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { ToggleButton };
