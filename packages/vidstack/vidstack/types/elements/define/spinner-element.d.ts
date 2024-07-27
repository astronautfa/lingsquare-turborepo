import { Component } from 'maverick.js';
import { LitElement } from '../lit/lit-element.js';
export interface SpinnerProps {
    /**
     * The horizontal (width) and vertical (height) length of the spinner.
     */
    size: number;
    /**
     * The width of the spinner track and track fill.
     */
    trackWidth: number;
    /**
     * The percentage of the spinner track that should be filled.
     */
    fillPercent: number;
}
export declare class Spinner extends Component<SpinnerProps> {
    static props: SpinnerProps;
    protected onConnect(el: HTMLElement): void;
    private _update;
}
declare const MediaSpinnerElement_base: import("maverick.js/element").MaverickElementConstructor<LitElement, Spinner>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/buffering-indicator}
 * @example
 * ```html
 * <!-- default values below -->
 * <media-spinner size="84" track-width="8" fill-percent="50"></media-spinner>
 * ```
 * @example
 * ```css
 * media-spinner [data-part="track"] {
 *   color: rgb(255 255 255 / 0.5);
 * }
 *
 * media-spinner [data-part="track-fill"] {
 *   color: white;
 * }
 * ```
 */
export declare class MediaSpinnerElement extends MediaSpinnerElement_base {
    static tagName: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-spinner': MediaSpinnerElement;
    }
}
export {};
