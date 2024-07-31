import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import type { PlayerSrc } from '../source.js';
import { MediaPlayerInstance } from './primitives/instances.js';
export interface MediaPlayerProps extends Omit<ReactElementProps<MediaPlayerInstance>, 'src'> {
    /**
     * The URL or object of the current media resource/s to be considered for playback.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#sources}
     */
    src?: PlayerSrc;
    aspectRatio?: string;
    asChild?: boolean;
    children: React.ReactNode;
    ref?: React.Ref<MediaPlayerInstance>;
}
/**
 * All media components exist inside the `<MediaPlayer>` component. This component's main
 * responsibilities are to manage media state updates, dispatch media events, handle media
 * requests, and expose media state through HTML attributes and CSS properties for styling
 * purposes.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/player}
 * @example
 * ```tsx
 * <MediaPlayer src="...">
 *   <MediaProvider />
 * </MediaPlayer>
 * ```
 */
declare const MediaPlayer: React.ForwardRefExoticComponent<Omit<MediaPlayerProps, "ref"> & React.RefAttributes<MediaPlayerInstance>>;
export { MediaPlayer };
