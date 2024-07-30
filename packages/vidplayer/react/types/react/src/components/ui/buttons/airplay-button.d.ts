import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { AirPlayButtonInstance } from '../../primitives/instances.js';
export interface AirPlayButtonProps extends ReactElementProps<AirPlayButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for requesting to connect to Apple AirPlay.
 *
 * @see {@link https://www.apple.com/au/airplay}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/airplay-button}
 * @example
 * ```tsx
 * <AirPlayButton>
 *   <AirPlayIcon />
 * </AirPlayButton>
 * ```
 */
declare const AirPlayButton: React.ForwardRefExoticComponent<Omit<AirPlayButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { AirPlayButton };
