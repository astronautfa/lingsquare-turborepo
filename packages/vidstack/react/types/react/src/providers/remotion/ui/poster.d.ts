import * as React from 'react';
import { type RemotionThumbnailProps } from './thumbnail.jsx';
export interface RemotionPosterProps extends RemotionThumbnailProps {
}
/**
 * @attr data-visible - Whether poster should be shown.
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-poster}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <RemotionPoster frame={100} />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare const RemotionPoster: React.ForwardRefExoticComponent<Omit<RemotionPosterProps, "ref"> & React.RefAttributes<HTMLElement>>;
export default RemotionPoster;
