import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { PosterInstance } from '../primitives/instances.js';
export interface PosterProps extends ReactElementProps<PosterInstance, HTMLImageElement> {
    alt?: string;
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLImageElement>;
}
/**
 * Loads and displays the current media poster image. By default, the media provider's
 * loading strategy is respected meaning the poster won't load until the media can.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/poster}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <Poster src="..." alt="..." />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare const Poster: React.ForwardRefExoticComponent<Omit<PosterProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
export { Poster };
