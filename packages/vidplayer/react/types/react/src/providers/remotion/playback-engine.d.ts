import type { RemotionSrc } from './types.js';
export declare class RemotionPlaybackEngine {
    protected _src: RemotionSrc;
    protected _onFrameChange: (frame: number) => void;
    protected _onEnd: () => void;
    protected _disposal: import("maverick.js/std").DisposalBin;
    protected _frame: number;
    protected _framesAdvanced: number;
    protected _playbackRate: number;
    protected _playing: boolean;
    protected _rafId: number;
    protected _timerId: number;
    protected _startedAt: number;
    protected _isRunningInBackground: boolean;
    get frame(): number;
    set frame(frame: number);
    constructor(_src: RemotionSrc, _onFrameChange: (frame: number) => void, _onEnd: () => void);
    play(): void;
    stop(): void;
    setPlaybackRate(rate: number): void;
    destroy(): void;
    protected _update(): void;
    protected _tick: () => void;
    protected _queueNextFrame(callback: () => void): void;
    protected _calculateNextFrame(): {
        nextFrame: number;
        framesToAdvance: number;
        ended: boolean;
    };
    protected _onVisibilityChange(): void;
}
