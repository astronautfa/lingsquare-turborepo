import { Component } from 'maverick.js';
declare class Title extends Component {
}
declare const MediaTitleElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, Title>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/title}
 * @example
 * ```html
 * <media-title></media-title>
 * ```
 */
export declare class MediaTitleElement extends MediaTitleElement_base {
    static tagName: string;
    private _media;
    protected onSetup(): void;
    protected onConnect(): void;
    private _watchTitle;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-title': MediaTitleElement;
    }
}
export {};
