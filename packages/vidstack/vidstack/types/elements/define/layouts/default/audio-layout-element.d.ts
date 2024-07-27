import { type Attributes } from 'maverick.js/element';
import { DefaultAudioLayout } from '../../../../components/layouts/default/audio-layout.js';
import type { DefaultLayoutProps } from '../../../../components/layouts/default/props.js';
import { LitElement, type LitRenderer } from '../../../lit/lit-element.js';
declare const MediaAudioLayoutElement_base: import("maverick.js/element").MaverickElementConstructor<LitElement, DefaultAudioLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/layouts/default-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-audio-layout></media-audio-layout>
 * </media-player>
 * ```
 */
export declare class MediaAudioLayoutElement extends MediaAudioLayoutElement_base implements LitRenderer {
    static tagName: string;
    static attrs: Attributes<DefaultLayoutProps>;
    private _media;
    private _scrubbing;
    protected onSetup(): void;
    protected onConnect(): void;
    render(): any;
    private _render;
    private _setupMenuContainer;
    private _setupWatchScrubbing;
    private _watchScrubbing;
    private _onStartScrubbing;
    private _onStopScrubbing;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-layout': MediaAudioLayoutElement;
    }
}
export {};
