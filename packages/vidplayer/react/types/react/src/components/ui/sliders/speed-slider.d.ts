import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { SpeedSliderInstance } from '../../primitives/instances.js';
import { Value } from './slider.jsx';
export interface RootProps extends ReactElementProps<SpeedSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<SpeedSliderInstance>;
}
/**
 * Versatile and user-friendly input playback rate control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/speed-slider}
 * @example
 * ```tsx
 * <SpeedSlider.Root>
 *   <SpeedSlider.Track>
 *     <SpeedSlider.TrackFill />
 *   </SpeedSlider.Track>
 *   <SpeedSlider.Thumb />
 * </SpeedSlider.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<SpeedSliderInstance>>;
export * from './slider.jsx';
export { Root, Value };
