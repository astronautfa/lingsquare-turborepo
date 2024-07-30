import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller.js';
export interface GoogleCastButtonProps extends ToggleButtonControllerProps {
}
export interface GoogleCastButtonEvents extends Pick<MediaRequestEvents, 'media-google-cast-request'> {
}
/**
 * A button for requesting remote playback via Google Cast.
 *
 * @attr data-active - Whether Google Cast is connected.
 * @attr data-supported - Whether Google Cast is available.
 * @attr data-state - Current connection state.
 * @see {@link https://developers.google.com/cast/docs/overview}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/google-cast-button}
 */
export declare class GoogleCastButton extends Component<GoogleCastButtonProps, {}, GoogleCastButtonEvents> {
    static props: GoogleCastButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _getState;
    private _getDefaultLabel;
}
