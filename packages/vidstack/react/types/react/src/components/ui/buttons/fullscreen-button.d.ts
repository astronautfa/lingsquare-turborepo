import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { FullscreenButtonInstance } from '../../primitives/instances.js';
export interface FullscreenButtonProps extends ReactElementProps<FullscreenButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the fullscreen mode of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/fullscreen-button}
 * @see {@link https://www.vidstack.io/docs/player/api/fullscreen}
 * @example
 * ```tsx
 * const isActive = useMediaState('fullscreen');
 *
 * <FullscreenButton>
 *   {!isActive ? <EnterIcon /> : <ExitIcon />}
 * </FullscreenButton>
 * ```
 */
declare const FullscreenButton: React.ForwardRefExoticComponent<Omit<FullscreenButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { FullscreenButton };
