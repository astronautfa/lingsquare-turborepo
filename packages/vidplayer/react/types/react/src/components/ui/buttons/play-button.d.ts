import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { PlayButtonInstance } from '../../primitives/instances.js';
export interface PlayButtonProps extends ReactElementProps<PlayButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/play-button}
 * @example
 * ```tsx
 * const isPaused = useMediaState('paused');
 *
 * <PlayButton>
 *   {isPaused ? <PlayIcon /> : <PauseIcon />}
 * </PlayButton>
 * ```
 */
declare const PlayButton: React.ForwardRefExoticComponent<Omit<PlayButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { PlayButton };
