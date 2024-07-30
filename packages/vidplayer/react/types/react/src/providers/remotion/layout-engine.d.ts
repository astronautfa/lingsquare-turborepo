import type { RemotionSrc } from './types.js';
export declare class RemotionLayoutEngine {
    protected _src: RemotionSrc | null;
    protected _viewport: HTMLElement | null;
    protected _canvas: HTMLElement | null;
    protected _container: HTMLElement | null;
    protected _disposal: import("maverick.js/std").DisposalBin;
    constructor();
    setSrc(src: RemotionSrc | null): void;
    setContainer(container: HTMLElement | null): void;
    destroy(): void;
    protected _onResize(entries?: ResizeObserverEntry[]): void;
    protected _getRect(el: HTMLElement, entry?: ResizeObserverEntry): LayoutRect;
    protected _calcScale(rect: LayoutRect): number;
    protected _calcTransform(rect: LayoutRect, scale: number): {
        x?: undefined;
        y?: undefined;
        centerX?: undefined;
        centerY?: undefined;
    } | {
        x: number;
        y: number;
        centerX: number;
        centerY: number;
    };
}
interface LayoutRect {
    width: number;
    height: number;
    top: number;
    left: number;
}
export {};
