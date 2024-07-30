import { GoogleCastButton } from '../../../components/index.js';
declare const MediaGoogleCastButtonElement_base: import("maverick.js/element").MaverickElementConstructor<HTMLElement, GoogleCastButton>;
/**
 * @example
 * ```html
 * <media-google-cast-button>
 *   <media-icon type="chromecast"></media-icon>
 * </media-google-cast-button>
 * ```
 */
export declare class MediaGoogleCastButtonElement extends MediaGoogleCastButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-google-cast-button': MediaGoogleCastButtonElement;
    }
}
export {};
