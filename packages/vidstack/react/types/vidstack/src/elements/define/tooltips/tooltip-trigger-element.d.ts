import { TooltipTrigger } from '../../../components/index.js';
declare const MediaTooltipTriggerElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, TooltipTrigger>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/tooltip}
 * @example
 * ```html
 * <media-tooltip>
 *   <media-tooltip-trigger>
 *     <media-play-button></media-play-button>
 *   </media-tooltip-trigger>
 *   <media-tooltip-content placement="top start">
 *      <span class="play-tooltip-text">Play</span>
 *      <span class="pause-tooltip-text">Pause</span>
 *   </media-tooltip-content>
 * </media-tooltip>
 * ```
 */
export declare class MediaTooltipTriggerElement extends MediaTooltipTriggerElement_base {
    static tagName: string;
    onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-tooltip-trigger': MediaTooltipTriggerElement;
    }
}
export {};
