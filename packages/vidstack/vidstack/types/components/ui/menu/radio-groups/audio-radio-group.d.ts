import { Component } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
import type { AudioTrack } from '../../../../core/tracks/audio-tracks.js';
import type { RadioOption } from '../radio/radio.js';
/**
 * This component manages audio track radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-radio-group}
 */
export declare class AudioRadioGroup extends Component<AudioRadioGroupProps, {}, AudioRadioGroupEvents> {
    static props: AudioRadioGroupProps;
    private _menu?;
    private _media;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): AudioRadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
}
export interface AudioRadioGroupProps {
    /** The text to display when the are no audio tracks. */
    emptyLabel: string;
}
export interface AudioRadioGroupEvents {
    change: AudioRadioGroupChangeEvent;
}
export interface AudioRadioOption extends RadioOption {
    track: AudioTrack;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail track
 */
export interface AudioRadioGroupChangeEvent extends DOMEvent<AudioTrack> {
    target: AudioRadioGroup;
}
