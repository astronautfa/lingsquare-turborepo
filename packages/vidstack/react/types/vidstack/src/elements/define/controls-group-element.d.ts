import { ControlsGroup } from '../../components/index.js';
declare const MediaControlsGroupElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, ControlsGroup>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/controls}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-controls>
 *     <media-controls-group></media-controls-group>
 *     <media-controls-group></media-controls-group>
 *   </media-controls>
 * </media-player>
 * ```
 */
export declare class MediaControlsGroupElement extends MediaControlsGroupElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-controls-group': MediaControlsGroupElement;
    }
}
export {};
