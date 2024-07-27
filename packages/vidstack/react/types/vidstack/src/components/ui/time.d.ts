import { Component, State } from 'maverick.js';
/**
 * Outputs a media duration (eg: `currentTime`, `duration`, `bufferedAmount`, etc.) value as time
 * formatted text.
 *
 * @attr data-type - The type prop setting (current, duration, etc.).
 * @attr data-remainder - Whether time remaining is being shown.
 * @docs {@link https://www.vidstack.io/docs/player/components/display/time}
 */
export declare class Time extends Component<TimeProps, TimeState> {
    static props: TimeProps;
    static state: State<TimeState>;
    private _media;
    private _invert;
    private _isVisible;
    private _isIntersecting;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _onIntersectionChange;
    private _watchHidden;
    private _watchToggle;
    private _watchTime;
    private _watchRole;
    private _getSeconds;
    private _shouldInvert;
    private _onToggle;
}
export interface TimeProps {
    /**
     * The type of media time to track.
     */
    type: 'current' | 'buffered' | 'duration';
    /**
     * Whether the time should always show the hours unit, even if the time is less than
     * 1 hour.
     *
     * @example `20:30 -> 0:20:35`
     */
    showHours: boolean;
    /**
     * Whether the hours unit should be padded with zeroes to a length of 2.
     *
     * @example `1:20:03 -> 01:20:03`
     */
    padHours: boolean | null;
    /**
     * Whether the minutes unit should be padded with zeroes to a length of 2.
     *
     * @example `5:22 -> 05:22`
     */
    padMinutes: boolean | null;
    /**
     * Whether to display the remaining time from the current type, until the duration is reached.
     *
     * @example `duration` - `currentTime`
     */
    remainder: boolean;
    /**
     * Whether on press the time should invert showing the remaining time (i.e., toggle the
     * `remainder` prop).
     */
    toggle: boolean;
    /**
     * Provides a hint that the time is not visible and stops all events and updates to be more
     * power efficient.
     */
    hidden: boolean;
}
export interface TimeState {
    timeText: string;
    hidden: boolean;
}
