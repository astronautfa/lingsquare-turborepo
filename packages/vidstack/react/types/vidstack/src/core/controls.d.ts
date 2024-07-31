import { MediaPlayerController } from './api/player-controller.js';
export declare class MediaControls extends MediaPlayerController {
    private _idleTimer;
    private _pausedTracking;
    private _hideOnMouseLeave;
    private _isMouseOutside;
    private _focusedItem;
    private _canIdle;
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    defaultDelay: number;
    /**
     * Whether controls can hide after a delay in user interaction. If this is false, controls will
     * not hide and be user controlled.
     */
    get canIdle(): boolean;
    set canIdle(canIdle: boolean);
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     *
     * @defaultValue false
     */
    get hideOnMouseLeave(): boolean;
    set hideOnMouseLeave(hide: boolean);
    /**
     * Whether media controls are currently visible.
     */
    get showing(): boolean;
    /**
     * Show controls.
     */
    show(delay?: number, trigger?: Event): void;
    /**
     * Hide controls.
     */
    hide(delay?: number, trigger?: Event): void;
    /**
     * Whether all idle tracking on controls should be paused until resumed again.
     */
    pause(trigger?: Event): void;
    resume(trigger?: Event): void;
    protected onConnect(): void;
    private _init;
    private _watchMouse;
    private _watchPaused;
    private _onPlay;
    private _onPause;
    private _onMouseEnter;
    private _onMouseLeave;
    private _clearIdleTimer;
    private _onStopIdle;
    private _changeVisibility;
    private _onChange;
}
