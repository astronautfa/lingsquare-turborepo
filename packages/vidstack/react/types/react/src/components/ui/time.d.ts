import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { TimeInstance } from '../primitives/instances.js';
export interface TimeProps extends ReactElementProps<TimeInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Outputs a media duration (eg: `currentTime`, `duration`, `bufferedAmount`, etc.) value as time
 * formatted text.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/time}
 * @example
 * ```tsx
 * <Time type="current" />
 * ```
 */
declare const Time: React.ForwardRefExoticComponent<Omit<TimeProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Time };
