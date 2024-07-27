import { Component } from 'maverick.js';
/**
 * Wraps the element that will trigger showing/hiding the tooltip on hover or keyboard focus. The
 * tooltip content is positioned relative to this element.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 */
export declare class TooltipTrigger extends Component {
    constructor();
    protected onConnect(el: HTMLElement): void;
    private _attach;
    private _getButton;
}
