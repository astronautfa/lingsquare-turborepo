import { Component } from 'maverick.js';
export interface ToggleButtonProps {
    /**
     * Whether it should start in the on (pressed) state.
     */
    defaultPressed: boolean;
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
/**
 * A toggle button is a two-state button that can be either off (not pressed) or on (pressed).
 *
 * @attr data-pressed - Whether the toggle is in an "on" state (pressed).
 * @attr aria-pressed - Same as `data-pressed` but `"true"` or `"false"`.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/toggle-button}
 */
export declare class ToggleButton<Props extends ToggleButtonProps = ToggleButtonProps> extends Component<Props> {
    static props: ToggleButtonProps;
    private _pressed;
    /**
     * Whether the toggle is currently in a `pressed` state.
     */
    get pressed(): boolean;
    constructor();
}
