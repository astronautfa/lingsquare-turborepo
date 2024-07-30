import { Component } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
import type { RadioOption } from '../radio/radio.js';
export declare const DEFAULT_PLAYBACK_RATES: number[];
/**
 * This component manages playback rate radios.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/speed-radio-group}
 */
export declare class SpeedRadioGroup extends Component<SpeedRadioGroupProps, {}, SpeedRadioGroupEvents> {
    static props: SpeedRadioGroupProps;
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
export interface SpeedRadioGroupProps {
    /** The playback rate options to be displayed. */
    rates: number[];
    /** The text to display for normal speed (i.e., playback rate of 1). */
    normalLabel: string;
}
export interface SpeedRadioGroupEvents {
    change: SpeedRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail speed
 */
export interface SpeedRadioGroupChangeEvent extends DOMEvent<number> {
    target: SpeedRadioGroup;
}
