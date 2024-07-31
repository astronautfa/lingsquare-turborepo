import { Component } from 'maverick.js';
interface ChapterTitleProps {
    /**
     * Specify text to be displayed when no chapter title is available.
     */
    defaultText: string;
}
declare class ChapterTitle extends Component<ChapterTitleProps> {
    static props: ChapterTitleProps;
}
declare const MediaChapterTitleElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, ChapterTitle>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/chapter-title}
 * @example
 * ```html
 * <media-chapter-title></media-chapter-title>
 * ```
 */
export declare class MediaChapterTitleElement extends MediaChapterTitleElement_base {
    static tagName: string;
    private _media;
    private _chapterTitle;
    protected onSetup(): void;
    protected onConnect(): void;
    private _watchChapterTitle;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-chapter-title': MediaChapterTitleElement;
    }
}
export {};
