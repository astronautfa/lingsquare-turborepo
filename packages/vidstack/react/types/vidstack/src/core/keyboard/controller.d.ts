import type { MediaContext } from '../api/media-context.js';
import { MediaPlayerController } from '../api/player-controller.js';
import type { MediaKeyShortcuts } from './types.js';
export declare const MEDIA_KEY_SHORTCUTS: MediaKeyShortcuts;
export declare class MediaKeyboardController extends MediaPlayerController {
    private _media;
    constructor(_media: MediaContext);
    protected onConnect(): void;
    private _onTargetChange;
    private _onKeyUp;
    private _onKeyDown;
    private _onPreventVideoKeys;
    private _getMatchingMethod;
    private _seekTotal;
    private _calcSeekAmount;
    private _timeSlider;
    private _forwardTimeKeyboardEvent;
    private _seeking;
}
