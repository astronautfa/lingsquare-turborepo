import { Component } from 'maverick.js';
import type { MediaRequestEvents } from '../../../core/api/media-request-events.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller.js';
export interface CaptionButtonProps extends ToggleButtonControllerProps {
}
export interface CaptionButtonEvents extends Pick<MediaRequestEvents, 'media-text-track-change-request'> {
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @attr data-supported - Whether captions/subtitles are available.
 * @attr data-active - Whether closed captions or subtitles are on.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 */
export declare class CaptionButton extends Component<CaptionButtonProps, {}, CaptionButtonEvents> {
    static props: CaptionButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isHidden;
}
