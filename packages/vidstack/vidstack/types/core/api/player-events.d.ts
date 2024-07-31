import type { DOMEvent } from 'maverick.js/std';
import type { MediaPlayer } from '../../components/index.js';
import type { LoggerEvents } from '../../foundation/logger/events.js';
import type { DASHProviderEvents } from '../../providers/dash/events.js';
import type { GoogleCastEvents } from '../../providers/google-cast/events.js';
import type { HLSProviderEvents } from '../../providers/hls/events.js';
import type { VideoPresentationEvents } from '../../providers/video/presentation/events.js';
import type { MediaEvents } from './media-events.js';
import type { MediaRequestEvents } from './media-request-events.js';
export interface MediaPlayerEvents extends MediaEvents, MediaRequestEvents, MediaUserEvents, LoggerEvents, VideoPresentationEvents, HLSProviderEvents, DASHProviderEvents, GoogleCastEvents {
    'media-player-connect': MediaPlayerConnectEvent;
    /** @internal */
    'find-media-player': FindMediaPlayerEvent;
    /** @internal */
    'vds-font-change': Event;
}
/**
 * Fired when the player element `<media-player>` connects to the DOM.
 *
 * @bubbles
 * @composed
 * @detail player
 */
export interface MediaPlayerConnectEvent extends DOMEvent<MediaPlayer> {
}
export interface FindMediaPlayerEventDetail {
    (player: MediaPlayer | null): void;
}
/**
 * @internal
 * @bubbles
 * @composed
 * @detail callback
 */
export interface FindMediaPlayerEvent extends DOMEvent<FindMediaPlayerEventDetail> {
}
export interface MediaUserEvents {
}
