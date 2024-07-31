import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { QualitySliderInstance } from '../../primitives/instances.js';
import { Value } from './slider.jsx';
export interface RootProps extends ReactElementProps<QualitySliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<QualitySliderInstance>;
}
/**
 * Versatile and user-friendly input video quality control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/quality-slider}
 * @example
 * ```tsx
 * <QualitySlider.Root>
 *   <QualitySlider.Track>
 *     <QualitySlider.TrackFill />
 *   </QualitySlider.Track>
 *   <QualitySlider.Thumb />
 * </QualitySlider.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<QualitySliderInstance>>;
export * from './slider.jsx';
export { Root, Value };
