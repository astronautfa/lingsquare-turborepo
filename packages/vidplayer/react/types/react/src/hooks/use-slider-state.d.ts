import * as React from 'react';
import { type SliderState } from 'vidstack';
import { SliderInstance, type TimeSliderInstance, type VolumeSliderInstance } from '../components/primitives/instances.js';
/**
 * This hook is used to subscribe to a specific slider state.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-state}
 */
export declare function useSliderState<T extends keyof SliderState>(prop: T, ref?: React.RefObject<SliderInstance | VolumeSliderInstance | TimeSliderInstance | null>): SliderState[T];
/**
 * This hook is used to subscribe to the current slider state on the given or nearest slider
 * component.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-state#store}
 */
export declare function useSliderStore(ref?: React.RefObject<SliderInstance | VolumeSliderInstance | TimeSliderInstance | null>): Readonly<SliderState>;
