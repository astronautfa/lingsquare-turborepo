import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { type MediaProviderLoader } from 'vidstack';
import { MediaProviderInstance } from './primitives/instances.js';
export interface MediaProviderProps extends Omit<ReactElementProps<MediaProviderInstance>, 'loaders'> {
    loaders?: Array<{
        new (): MediaProviderLoader;
    }>;
    mediaProps?: React.HTMLAttributes<HTMLMediaElement>;
    children?: React.ReactNode;
    ref?: React.Ref<MediaProviderInstance>;
}
/**
 * Renders the current provider at this component location.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/provider}
 * @example
 * ```tsx
 * <MediaPlayer src="...">
 *   <MediaProvider />
 * </MediaPlayer>
 * ```
 */
declare const MediaProvider: React.ForwardRefExoticComponent<Omit<MediaProviderProps, "ref"> & React.RefAttributes<MediaProviderInstance>>;
export { MediaProvider };
