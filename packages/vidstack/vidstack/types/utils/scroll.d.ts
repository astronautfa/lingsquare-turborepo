import { type Options as ComputeScrollOptions } from 'compute-scroll-into-view';
export interface ScrollIntoViewOptions extends ComputeScrollOptions, ScrollOptions {
}
export declare function scrollIntoView(el: HTMLElement, options: ScrollIntoViewOptions): void;
export declare function scrollIntoCenter(el: HTMLElement, options?: ScrollIntoViewOptions): void;
