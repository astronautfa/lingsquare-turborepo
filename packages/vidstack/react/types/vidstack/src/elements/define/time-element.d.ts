import { Time } from '../../components/index.js';
declare const MediaTimeElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Time>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/time}
 * @example
 * ```html
 * <media-time type="current"></media-time>
 * ```
 * @example
 * ```html
 * <!-- Remaining time. -->
 * <media-time type="current" remainder></media-time>
 * ```
 */
export declare class MediaTimeElement extends MediaTimeElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-time': MediaTimeElement;
    }
}
export {};
