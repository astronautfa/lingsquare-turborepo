import { LiveButton } from '../../../components/index.js';
declare const MediaLiveButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, LiveButton>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/buttons/live-button}
 * @example
 * ```html
 * <media-live-button>
 *   <!-- ... -->
 * </media-live-button>
 * ```
 */
export declare class MediaLiveButtonElement extends MediaLiveButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-live-button': MediaLiveButtonElement;
    }
}
export {};
