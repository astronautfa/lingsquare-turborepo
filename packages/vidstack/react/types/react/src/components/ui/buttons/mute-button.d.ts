import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { MuteButtonInstance } from '../../primitives/instances.js';
export interface MuteButtonProps extends ReactElementProps<MuteButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the muted state of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/mute-button}
 * @example
 * ```tsx
 * const volume = useMediaState('volume'),
 *   isMuted = useMediaState('muted');
 *
 * <MuteButton>
 *   {isMuted || volume == 0 ? (
 *     <MuteIcon />
 *   ) : volume < 0.5 ? (
 *     <VolumeLowIcon />
 *   ) : (
 *     <VolumeHighIcon />
 *   )}
 * </MuteButton>
 * ```
 */
declare const MuteButton: React.ForwardRefExoticComponent<Omit<MuteButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { MuteButton };
