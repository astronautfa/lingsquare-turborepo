import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { AudioGainSliderInstance } from '../../primitives/instances.js';
import { Value } from './slider.jsx';
export interface RootProps extends ReactElementProps<AudioGainSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<AudioGainSliderInstance>;
}
/**
 * Versatile and user-friendly audio boost control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the audio gain within the range 0 to 100.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/audio-gain-slider}
 * @example
 * ```tsx
 * <AudioGainSlider.Root>
 *   <AudioGainSlider.Track>
 *     <AudioGainSlider.TrackFill />
 *   </AudioGainSlider.Track>
 *   <AudioGainSlider.Thumb />
 * </AudioGainSlider.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<AudioGainSliderInstance>>;
export * from './slider.jsx';
export { Root, Value };
