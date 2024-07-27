import * as React from 'react';
import { type MediaState } from 'vidstack';
import { MediaPlayerInstance } from '../components/primitives/instances.js';
/**
 * This hook is used to subscribe to a specific media state.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-state}
 */
export declare function useMediaState<T extends keyof MediaState>(prop: T, ref?: React.RefObject<MediaPlayerInstance | null>): MediaState[T];
/**
 * This hook is used to subscribe to the current media state on the nearest parent player.
 *
 * @docs {@link https://vidstack.io/docs/player/core-concepts/state-management#reading}
 */
export declare function useMediaStore(ref?: React.RefObject<MediaPlayerInstance | null>): Readonly<MediaState>;
