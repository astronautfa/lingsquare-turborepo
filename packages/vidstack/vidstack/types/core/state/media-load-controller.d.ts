import { MediaPlayerController } from '../api/player-controller.js';
export declare class MediaLoadController extends MediaPlayerController {
    private _type;
    private _callback;
    constructor(_type: 'load' | 'posterLoad', _callback: () => void);
    onAttach(el: HTMLElement): Promise<void>;
}
