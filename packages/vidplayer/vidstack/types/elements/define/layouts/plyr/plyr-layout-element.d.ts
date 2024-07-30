import { PlyrLayout } from '../../../../components/layouts/plyr/plyr-layout.js';
import { LitElement, type LitRenderer } from '../../../lit/lit-element.js';
declare const MediaPlyrLayoutElement_base: import("maverick.js/element").MaverickElementConstructor<LitElement, PlyrLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/layouts/plyr-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-plyr-layout></media-plyr-layout>
 * </media-player>
 * ```
 */
export declare class MediaPlyrLayoutElement extends MediaPlyrLayoutElement_base implements LitRenderer {
    static tagName: string;
    private _media;
    protected onSetup(): void;
    protected onConnect(): void;
    render(): any;
    private _render;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-plyr-layout': MediaPlyrLayoutElement;
    }
}
export {};
