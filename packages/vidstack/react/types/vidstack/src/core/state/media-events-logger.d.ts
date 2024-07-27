import { type MediaContext } from '../api/media-context.js';
import { MediaPlayerController } from '../api/player-controller.js';
export declare class MediaEventsLogger extends MediaPlayerController {
    private _media;
    constructor(_media: MediaContext);
    protected onConnect(): void;
    private _onMediaEvent;
}
