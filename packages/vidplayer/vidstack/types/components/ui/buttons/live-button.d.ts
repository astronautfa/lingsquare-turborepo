import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
export interface LiveButtonProps {
    /**
     * Whether the button should be disabled (non-interactive). This will prevent seeking to the
     * live edge when pressed.
     */
    disabled: boolean;
}
export interface LiveButtonEvents extends Pick<MediaRequestEvents, 'media-live-edge-request'> {
}
/**
 * This component displays the current live status of the stream. This includes whether it's
 * live, at the live edge, or not live. In addition, when this button is pressed it will skip
 * ahead to the live edge.
 *
 * @attr data-edge - Playback is at the live edge.
 * @attr data-hidden - Whether current media is _not_ live.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/live-button}
 */
export declare class LiveButton extends Component<LiveButtonProps, {}, LiveButtonEvents> {
    static props: LiveButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _onPress;
}
