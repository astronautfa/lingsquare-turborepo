import { ViewController } from 'maverick.js';
import type { ScreenOrientationEvents } from './events.js';
import type { ScreenOrientationLockType, ScreenOrientationType } from './types.js';
export declare class ScreenOrientationController extends ViewController<{}, {}, ScreenOrientationEvents> {
    private _type;
    private _locked;
    private _currentLock;
    /**
     * The current screen orientation type.
     *
     * @signal
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
     * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
     */
    get type(): ScreenOrientationType | undefined;
    /**
     * Whether the screen orientation is currently locked.
     *
     * @signal
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
     * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
     */
    get locked(): boolean;
    /**
     * Whether the viewport is in a portrait orientation.
     *
     * @signal
     */
    get portrait(): boolean;
    /**
     * Whether the viewport is in a landscape orientation.
     *
     * @signal
     */
    get landscape(): boolean;
    /**
     * Whether the native Screen Orientation API is available.
     */
    static readonly supported: boolean;
    /**
     * Whether the native Screen Orientation API is available.
     */
    get supported(): boolean;
    protected onConnect(): void;
    protected _onDisconnect(): Promise<void>;
    protected _onOrientationChange(event: Event): void;
    /**
     * Locks the orientation of the screen to the desired orientation type using the
     * Screen Orientation API.
     *
     * @param lockType - The screen lock orientation type.
     * @throws Error - If screen orientation API is unavailable.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
     * @see {@link https://w3c.github.io/screen-orientation}
     */
    lock(lockType: ScreenOrientationLockType): Promise<void>;
    /**
     * Unlocks the orientation of the screen to it's default state using the Screen Orientation
     * API. This method will throw an error if the API is unavailable.
     *
     * @throws Error - If screen orientation API is unavailable.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
     * @see {@link https://w3c.github.io/screen-orientation}
     */
    unlock(): Promise<void>;
    private _assertScreenOrientationAPI;
    private _getScreenOrientation;
}
