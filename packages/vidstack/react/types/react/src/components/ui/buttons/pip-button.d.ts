import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { PIPButtonInstance } from '../../primitives/instances.js';
export interface PIPButtonProps extends ReactElementProps<PIPButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the picture-in-picture (PIP) mode of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/pip-button}
 * @see {@link https://www.vidstack.io/docs/player/api/picture-in-picture}
 * @example
 * ```tsx
 * const isActive = useMediaState('pictureInPicture');
 *
 * <PIPButton>
 *   {!isActive ? <EnterIcon /> : <ExitIcon />}
 * </PIPButton>
 * ```
 */
declare const PIPButton: React.ForwardRefExoticComponent<Omit<PIPButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { PIPButton };
