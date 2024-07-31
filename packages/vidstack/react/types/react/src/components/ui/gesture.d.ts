import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { GestureInstance } from '../primitives/instances.js';
export interface GestureProps extends ReactElementProps<GestureInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<GestureInstance>;
}
/**
 * This component enables actions to be performed on the media based on user gestures.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/gesture}
 * @example
 * ```tsx
 * <Gesture event="pointerup" action="toggle:paused" />
 * <Gesture event="dblpointerup" action="toggle:fullscreen" />
 * ```
 */
declare const Gesture: React.ForwardRefExoticComponent<Omit<GestureProps, "ref"> & React.RefAttributes<GestureInstance>>;
export { Gesture };
