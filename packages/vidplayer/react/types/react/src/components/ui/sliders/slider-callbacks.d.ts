import type { InferComponentEvents } from 'maverick.js';
import type { ReactEventCallbacks } from 'maverick.js/react';
import type { SliderInstance } from '../../primitives/instances.js';
type SliderCallbacks = keyof ReactEventCallbacks<InferComponentEvents<SliderInstance>>;
export declare const sliderCallbacks: SliderCallbacks[];
export {};
