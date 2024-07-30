import { Component } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
import { TextTrack } from '../../../../core/tracks/text/text-track.js';
import type { RadioOption } from '../radio/radio.js';
/**
 * This component manages caption/subtitle track radio options.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/captions-radio-group}
 */
export declare class CaptionsRadioGroup extends Component<CaptionsRadioGroupProps, {}, CaptionsRadioGroupEvents> {
    static props: CaptionsRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): CaptionsRadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
    private _getTrackValue;
}
export interface CaptionsRadioGroupProps {
    /** The text to display when the captions are turned off. */
    offLabel: string;
}
export interface CaptionsRadioGroupEvents {
    change: CaptionsRadioGroupChangeEvent;
}
export interface CaptionsRadioOption extends RadioOption {
    track?: TextTrack;
}
/**
 * Fired when the checked radio changes. The event detail will be `null` when no track is selected
 * or captions are turned off.
 *
 * @detail track
 */
export interface CaptionsRadioGroupChangeEvent extends DOMEvent<TextTrack | null> {
    target: CaptionsRadioGroup;
}
