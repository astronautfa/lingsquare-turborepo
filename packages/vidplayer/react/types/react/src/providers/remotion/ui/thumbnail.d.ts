import * as React from 'react';
import { type PrimitivePropsWithRef } from '../../../components/primitives/nodes.jsx';
import type { RemotionErrorRenderer, RemotionLoadingRenderer } from '../types.js';
export interface RemotionThumbnailProps extends Omit<PrimitivePropsWithRef<'div'>, 'children' | 'onError'> {
    /** The video frame to display. */
    frame: number;
    /**
     * A callback function that allows you to return a custom UI that gets displayed while the
     * thumbnail is loading. If this prop is not provided it will default to the loading renderer
     * given to the player source.
     */
    renderLoading?: RemotionLoadingRenderer;
    /**
     * A callback for rendering a custom error message. If this prop is not provided it will default
     * to the error renderer given to the player source.
     */
    errorFallback?: RemotionErrorRenderer;
    /**
     * Called when an error or uncaught exception has happened in the video. If this prop is not
     * provided it will default to the error callback given to the player source.
     */
    onError?(error: Error): void;
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-thumbnail}
 * @example
 * ```tsx
 * <RemotionThumbnail frame={100} />
 * ```
 */
declare const RemotionThumbnail: React.ForwardRefExoticComponent<Omit<RemotionThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;
export default RemotionThumbnail;
