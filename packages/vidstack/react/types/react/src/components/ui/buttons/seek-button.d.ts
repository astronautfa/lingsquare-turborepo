import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { SeekButtonInstance } from '../../primitives/instances.js';
export interface SeekButtonProps extends ReactElementProps<SeekButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for seeking the current media playback forwards or backwards by a specified amount.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/seek-button}
 * @example
 * ```tsx
 * <SeekButton seconds={-10}>
 *   <SeekBackwardIcon />
 * </SeekButton>
 *
 * <SeekButton seconds={10}>
 *   <SeekForwardIcon />
 * </SeekButton>
 * ```
 */
declare const SeekButton: React.ForwardRefExoticComponent<Omit<SeekButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { SeekButton };
