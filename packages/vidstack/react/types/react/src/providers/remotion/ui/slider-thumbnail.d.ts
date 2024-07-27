import * as React from 'react';
import { type RemotionThumbnailProps } from './thumbnail.jsx';
export interface RemotionSliderThumbnailProps extends Omit<RemotionThumbnailProps, 'frame'> {
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-slider-thumbnail}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <RemotionSliderThumbnail />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const RemotionSliderThumbnail: React.ForwardRefExoticComponent<Omit<RemotionSliderThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;
export default RemotionSliderThumbnail;
