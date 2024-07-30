import { Component } from 'maverick.js';
import { DOMEvent } from 'maverick.js/std';
/**
 * This component enables actions to be performed on the media based on user gestures.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/gesture}
 */
export declare class Gesture extends Component<GestureProps, {}, GestureEvents> {
    static props: GestureProps;
    private _media;
    private _provider;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _attachListener;
    private _presses;
    private _pressTimerId;
    private _acceptEvent;
    private _handleEvent;
    /** Validate event occurred in gesture bounds. */
    private _inBounds;
    /** Validate gesture has the highest z-index in this triggered group. */
    private _isTopLayer;
    private _performAction;
}
export interface GestureProps {
    /**
     * Whether this gesture should not be triggered.
     */
    disabled: boolean;
    /**
     * The DOM event type that will trigger this gesture. It can be any valid DOM event type. Any
     * event can be prefixed with `dbl` to ensure it occurs twice in succession (max 200ms gap).
     *
     * @example 'pointerup'
     * @example 'dblpointerup'
     * @example 'mouseleave'
     */
    event: GestureEventType | undefined;
    /**
     * An action describes the type of media request event that will be dispatched, which will
     * ultimately perform some operation on the player.
     *
     * @example 'play'
     * @example 'seek:30'
     * @example 'seek:-30'
     * @example 'toggle:paused'
     */
    action: GestureAction | undefined;
}
export type GestureEventType = keyof HTMLElementEventMap | `dbl${keyof HTMLElementEventMap}`;
export type GestureAction = 'play' | 'pause' | `seek:${number}` | `toggle:${'paused' | 'muted' | 'fullscreen' | 'controls'}`;
export interface GestureEvents {
    'will-trigger': GestureWillTriggerEvent;
    trigger: GestureTriggerEvent;
}
export interface GestureEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: Gesture;
}
/**
 * This event will fire before the gesture action is triggered. Calling `event.preventDefault()`
 * will stop the action from being triggered.
 *
 * @detail action
 * @cancelable
 */
export interface GestureWillTriggerEvent extends GestureEvent<GestureAction> {
}
/**
 * This event will fire after the gesture action has been triggered.
 *
 * @detail action
 */
export interface GestureTriggerEvent extends GestureEvent<GestureAction> {
}
