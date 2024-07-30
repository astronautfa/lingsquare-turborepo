import { type InferEventDetail } from 'maverick.js/std';
import type { MediaContext } from '../api/media-context.js';
import type { MediaEvents } from '../api/media-events.js';
export declare class MediaPlayerDelegate {
    private _handle;
    private _media;
    constructor(_handle: (event: Event) => void, _media: MediaContext);
    _notify: <Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined | never ? [detail?: never, trigger?: Event] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event]) => void;
    _ready(info?: {
        duration: number;
        seekable: TimeRanges;
        buffered: TimeRanges;
    }, trigger?: Event): Promise<void>;
    private _attemptAutoplay;
}
