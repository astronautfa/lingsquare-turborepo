import { type ReadSignal, type WriteSignal } from 'maverick.js';
import type { SliderOrientation } from './types.js';
export interface SliderContext {
    _disabled: ReadSignal<boolean>;
    _orientation: ReadSignal<SliderOrientation>;
    _preview: WriteSignal<HTMLElement | null>;
}
export declare const sliderContext: import("maverick.js").Context<SliderContext>;
export interface SliderObserverContext {
    onDragStart?(): void;
    onDragEnd?(): void;
}
export declare const sliderObserverContext: import("maverick.js").Context<SliderObserverContext>;
