import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { LiveButtonInstance } from '../../primitives/instances.js';
export interface LiveButtonProps extends ReactElementProps<LiveButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * This component displays the current live status of the stream. This includes whether it's
 * live, at the live edge, or not live. In addition, this component is a button during live streams
 * and will skip ahead to the live edge when pressed.
 *
 * 🚨 This component will have `aria-hidden="true"` applied when the current stream is _not_
 * live.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/live-button}
 * @example
 * ```tsx
 * <LiveButton>
 *   <LiveIcon />
 * </LiveButton>
 * ```
 */
declare const LiveButton: React.ForwardRefExoticComponent<Omit<LiveButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { LiveButton };
