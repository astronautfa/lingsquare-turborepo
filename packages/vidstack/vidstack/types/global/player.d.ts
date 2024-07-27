import '../elements/bundles/player.js';
import type { MediaPlayerProps, TextTrackInit } from '../core/index.js';
import { VidstackPlayerLayout } from './layouts/default.js';
import type { VidstackPlayerLayoutLoader } from './layouts/loader.js';
import { PlyrLayout } from './layouts/plyr.js';
export declare class VidstackPlayer {
    static create({ target, layout, tracks, ...props }: VidstackPlayerConfig): Promise<import("../elements/index.js").MediaPlayerElement>;
}
export type VidstackPlayerTarget = string | HTMLElement;
export interface VidstackPlayerConfig extends Partial<MediaPlayerProps> {
    /**
     * A document query selector string or `HTMLElement` to mount on. If an `<audio>`, `<video>`, or
     * `<iframe>` element is given it will be enhanced.
     */
    target: VidstackPlayerTarget;
    /**
     * Text tracks to be included on initialization.
     */
    tracks?: TextTrackInit[];
    /**
     * Specify a layout to be loaded.
     */
    layout?: VidstackPlayerLayoutLoader;
}
export { VidstackPlayerLayout, PlyrLayout, type VidstackPlayerLayoutLoader };
