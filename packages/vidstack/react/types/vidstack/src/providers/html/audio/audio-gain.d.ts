import type { AudioGainAdapter } from '../../types.js';
export declare class AudioGain implements AudioGainAdapter {
    private _media;
    private _onChange;
    private _gainNode;
    private _srcAudioNode;
    get currentGain(): number | null;
    get supported(): boolean;
    constructor(_media: HTMLMediaElement, _onChange: (gain: number | null) => void);
    setGain(gain: number): void;
    removeGain(): void;
    destroy(): void;
    private _destroySrcNode;
    private _destroyGainNode;
}
