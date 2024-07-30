import { Component } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 */
export declare class RadioGroup extends Component<RadioGroupProps, {}, RadioGroupEvents> {
    static props: RadioGroupProps;
    private _controller;
    /**
     * A list of radio values that belong this group.
     */
    get values(): string[];
    /**
     * The radio value that is checked in this group.
     */
    get value(): string;
    set value(newValue: string);
    constructor();
    protected onSetup(): void;
    private _watchValue;
    private _onValueChange;
}
export interface RadioGroupProps {
    /**
     * The value of the radio that is checked in this group.
     */
    value: string;
}
export interface RadioGroupEvents {
    change: RadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail value
 */
export interface RadioGroupChangeEvent extends DOMEvent<string> {
    target: RadioGroup;
}
