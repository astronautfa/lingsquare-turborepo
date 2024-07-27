import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { GoogleCastButtonInstance } from '../../primitives/instances.js';
export interface GoogleCastButtonProps extends ReactElementProps<GoogleCastButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for requesting Google Cast.
 *
 * @see {@link https://developers.google.com/cast/docs/overview}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/google-cast-button}
 * @example
 * ```tsx
 * <GoogleCastButton>
 *   <ChromecastIcon />
 * </GoogleCastButton>
 * ```
 */
declare const GoogleCastButton: React.ForwardRefExoticComponent<Omit<GoogleCastButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { GoogleCastButton };
