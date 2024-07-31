import { Component } from 'maverick.js';
/**
 * A contextual text bubble that displays a description for an element that appears on pointer
 * hover or keyboard focus.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role}
 */
export declare class Tooltip extends Component<TooltipProps> {
    static props: TooltipProps;
    private _id;
    private _trigger;
    private _content;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onSetup(): void;
    private _attachTrigger;
    private _detachTrigger;
    private _attachContent;
    private _detachContent;
    private _onShowingChange;
}
export interface TooltipProps {
    /**
     * The amount of time in milliseconds to wait before showing a tooltip.
     */
    showDelay: number;
}
