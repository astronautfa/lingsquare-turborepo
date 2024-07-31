import { Component } from 'maverick.js';
/**
 * This component contains the content that is visible when the tooltip trigger is interacted with.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-placement - The placement prop setting.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 */
export declare class TooltipContent extends Component<TooltipContentProps> {
    static props: TooltipContentProps;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _attach;
    private _watchPlacement;
    private _getTrigger;
}
export type TooltipPlacement = TooltipPlacementSide | `${TooltipPlacementSide} ${TooltipPlacementAlign}`;
export type TooltipPlacementSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipPlacementAlign = 'start' | 'center' | 'end';
export interface TooltipContentProps {
    /**
     * A space-separated list which specifies the side and alignment of the tooltip content relative
     * to the trigger.
     *
     * @example `top center`
     * @example `bottom end`
     */
    placement: TooltipPlacement;
    /**
     * The distance in pixels between the content and the tooltip trigger. You can also set
     * the CSS variable `--media-tooltip-y-offset` to adjust this offset.
     */
    offset: number;
    /**
     * The offset in pixels from the start/center/end aligned position. You can also set
     * the CSS variable `--media-tooltip-x-offset` to adjust this offset.
     */
    alignOffset: number;
}
