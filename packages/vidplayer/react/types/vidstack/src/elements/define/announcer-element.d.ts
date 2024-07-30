import { MediaAnnouncer } from '../../components/index.js';
declare const MediaAnnouncerElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, MediaAnnouncer>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/announcer}
 * @example
 * ```html
 * <media-announcer></media-announcer>
 * ```
 */
export declare class MediaAnnouncerElement extends MediaAnnouncerElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-announcer': MediaAnnouncerElement;
    }
}
export {};
