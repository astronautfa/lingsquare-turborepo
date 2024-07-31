import { Component, type ReadSignal } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @attr data-checked - Whether radio is checked.
 * @attr data-focus - Whether radio is being keyboard focused.
 * @attr data-hocus - Whether radio is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 */
export declare class Radio extends Component<RadioProps, {}, RadioEvents> {
    static props: RadioProps;
    private _checked;
    private _controller;
    /**
     * Whether this radio is currently checked.
     */
    get checked(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _onDisconnect;
    private _addToGroup;
    private _watchValue;
    private _onPress;
    private _check;
    private _onChange;
    private _onSelect;
}
export interface RadioProps {
    /** The radio value. */
    value: string;
}
export interface RadioEvents {
    change: RadioChangeEvent;
    select: RadioSelectEvent;
}
/**
 * Fired when the radio's checked value changes.
 *
 * @detail isSelected
 */
export interface RadioChangeEvent extends DOMEvent<boolean> {
    target: Radio;
}
/**
 * Fired when the radio is pressed via mouse, touch, or, keyboard. This will not fire if the radio
 * is programmatically selected.
 */
export interface RadioSelectEvent extends DOMEvent<void> {
    target: Radio;
}
export interface RadioOption {
    label: string | ReadSignal<string>;
    value: string;
}
