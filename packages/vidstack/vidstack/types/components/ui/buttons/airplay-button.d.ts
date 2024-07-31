import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller.js';
export interface AirPlayButtonProps extends ToggleButtonControllerProps {
}
export interface AirPlayButtonEvents extends Pick<MediaRequestEvents, 'media-airplay-request'> {
}
/**
 * A button for requesting remote playback via Apple AirPlay.
 *
 * @attr data-active - Whether AirPlay is connected.
 * @attr data-supported - Whether AirPlay is available.
 * @attr data-state - Current connection state.
 * @see {@link https://www.apple.com/au/airplay}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/airplay-button}
 */
export declare class AirPlayButton extends Component<AirPlayButtonProps, {}, AirPlayButtonEvents> {
    static props: AirPlayButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _getState;
    private _getDefaultLabel;
}
