import { type Attributes } from 'maverick.js/element';
import type { DefaultLayoutProps } from '../../../../components/layouts/default/props.js';
import { DefaultVideoLayout } from '../../../../components/layouts/default/video-layout.js';
import { LitElement, type LitRenderer } from '../../../lit/lit-element.js';
declare const MediaVideoLayoutElement_base: import("maverick.js/element").MaverickElementConstructor<LitElement, DefaultVideoLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/layouts/default-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-video-layout></media-video-layout>
 * </media-player>
 * ```
 */
export declare class MediaVideoLayoutElement extends MediaVideoLayoutElement_base implements LitRenderer {
    static tagName: string;
    static attrs: Attributes<DefaultLayoutProps>;
    private _media;
    protected onSetup(): void;
    protected onConnect(): void;
    render(): any;
    private _setupMenuContainer;
    private _render;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-video-layout': MediaVideoLayoutElement;
    }
}
export {};
