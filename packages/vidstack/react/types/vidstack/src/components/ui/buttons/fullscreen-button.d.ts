import { Component } from 'maverick.js';
import type { MediaFullscreenRequestTarget, MediaRequestEvents } from '../../../core/api/media-request-events.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller.js';
export interface FullscreenButtonProps extends ToggleButtonControllerProps {
    /**
     * The target element on which to request fullscreen on. The target can be `media`
     * (i.e., `<media-player>`) or `provider`. The `prefer-media` option will first see if the native
     * fullscreen API is available, if not it'll try the media provider.
     */
    target: MediaFullscreenRequestTarget | undefined;
}
export interface FullscreenButtonEvents extends Pick<MediaRequestEvents, 'media-enter-fullscreen-request' | 'media-exit-fullscreen-request'> {
}
/**
 * A button for toggling the fullscreen mode of the player.
 *
 * @attr data-active - Whether fullscreen mode is active.
 * @attr data-supported - Whether fullscreen mode is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/fullscreen-button}
 * @see {@link https://www.vidstack.io/docs/player/api/fullscreen}
 */
export declare class FullscreenButton extends Component<FullscreenButtonProps, {}, FullscreenButtonEvents> {
    static props: FullscreenButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isSupported;
}
