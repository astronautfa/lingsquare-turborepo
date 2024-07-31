import { ToggleButton } from '../../../components/index.js';
declare const MediaToggleButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, ToggleButton<import("../../../components/index.js").ToggleButtonProps>>;
/**
 * @example
 * ```html
 * <media-toggle-button aria-label="...">
 *   <!-- ... -->
 * </media-toggle-button>
 * ```
 */
export declare class MediaToggleButtonElement extends MediaToggleButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-toggle-button': MediaToggleButtonElement;
    }
}
export {};
