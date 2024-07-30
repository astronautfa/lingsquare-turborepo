import { Component } from 'maverick.js';
import { type MediaPlayerQuery } from '../../../core/index.js';
import { type MediaContext } from '../../../core/api/media-context.js';
declare class MediaLayout extends Component<MediaLayoutProps> {
    static props: MediaLayoutProps;
}
export interface MediaLayoutProps {
    when: boolean | MediaPlayerQuery;
}
declare const MediaLayoutElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, MediaLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/layouts#custom}
 * @example
 * ```html
 * <media-layout class="video-layout">
 *   <template>
 *     <!-- ... -->
 *   </template>
 * </media-layout>
 *
 * <script>
 *   const layout = document.querySelector(".video-layout");
 *   // All player state is available.
 *   layout.when = ({ viewType }) => viewType === 'video';
 * </script>
 * ```
 */
export declare class MediaLayoutElement extends MediaLayoutElement_base {
    static tagName: string;
    protected _media: MediaContext;
    protected onSetup(): void;
    protected onConnect(): void;
    private _watchWhen;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-layout': MediaLayoutElement;
    }
}
export {};
