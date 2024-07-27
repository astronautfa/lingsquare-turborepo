import { TooltipContent } from '../../../components/index.js';
declare const MediaTooltipContentElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, TooltipContent>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/tooltip}
 * @example
 * ```html
 * <media-tooltip>
 *   <media-tooltip-trigger>
 *     <media-play-button></media-play-button>
 *   </media-tooltip-trigger>
 *   <media-tooltip-content placement="top">
 *      <span class="play-tooltip-text">Play</span>
 *      <span class="pause-tooltip-text">Pause</span>
 *   </media-tooltip-content>
 * </media-tooltip>
 * ```
 */
export declare class MediaTooltipContentElement extends MediaTooltipContentElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-tooltip-content': MediaTooltipContentElement;
    }
}
export {};
