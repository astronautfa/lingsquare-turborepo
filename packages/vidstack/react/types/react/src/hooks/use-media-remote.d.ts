import * as React from 'react';
import { MediaRemoteControl } from 'vidstack';
/**
 * A media remote provides a simple facade for dispatching media requests to the nearest media
 * player.
 *
 * @param target - The DOM event target to dispatch request events from. Defaults to player
 * if no target is provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-remote}
 */
export declare function useMediaRemote(target?: EventTarget | null | React.RefObject<EventTarget | null>): MediaRemoteControl;
