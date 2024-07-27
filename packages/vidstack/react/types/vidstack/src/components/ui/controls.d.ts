import { Component } from 'maverick.js';
import { DOMEvent } from 'maverick.js/std';
/**
 * This component creates a container for control groups.
 *
 * @attr data-visible - Whether controls should be visible.
 * @attr data-pip - Whether picture-in-picture mode is active.
 * @attr data-fullscreen - Whether fullscreen mode is active.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls}
 */
export declare class Controls extends Component<ControlsProps, {}, ControlsEvents> {
    static props: ControlsProps;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _hideControls;
    private _watchProps;
    private _isShowing;
}
export interface ControlsProps {
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to hide the controls.
     */
    hideDelay: number;
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     */
    hideOnMouseLeave: boolean;
}
export interface ControlsEvents {
    change: ControlsChangeEvent;
}
/**
 * Fired when the active state of the controls change.
 *
 * @detail isVisible
 */
export interface ControlsChangeEvent extends DOMEvent<boolean> {
}
