import { Component } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
import type { RadioOption } from '../radio/radio.js';
export declare const DEFAULT_AUDIO_GAINS: number[];
/**
 * This component manages audio gain radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-gain-radio-group}
 */
export declare class AudioGainRadioGroup extends Component<AudioGainRadioGroupProps, {}, AudioGainRadioGroupEvents> {
    static props: AudioGainRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): RadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
}
export interface AudioGainRadioGroupProps {
    /** The audio gain options to be displayed. */
    gains: number[];
    /** The text to display for disabled audio gain (i.e., audio gain is 1.0). */
    normalLabel: string;
}
export interface AudioGainRadioGroupEvents {
    change: AudioGainRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail gain
 */
export interface AudioGainRadioGroupChangeEvent extends DOMEvent<number> {
    target: AudioGainRadioGroup;
}
