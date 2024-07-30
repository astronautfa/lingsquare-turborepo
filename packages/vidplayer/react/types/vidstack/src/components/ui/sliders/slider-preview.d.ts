import { Component } from 'maverick.js';
import type { SliderOrientation } from './slider/types.js';
/**
 * Used to provide users with a real-time or interactive preview of the value or selection they
 * are making as they move the slider thumb. This can include displaying the current pointer
 * value numerically, or displaying a thumbnail over the time slider.
 *
 * @attr data-visible - Whether the preview is visible.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider#preview}
 */
export declare class SliderPreview extends Component<SliderPreviewProps> {
    static props: SliderPreviewProps;
    private _slider;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _updatePlacement;
}
export declare function updateSliderPreviewPlacement(el: HTMLElement, { clamp, offset, orientation, }: {
    clamp: boolean;
    offset: number;
    orientation: SliderOrientation;
}): void;
export interface SliderPreviewProps {
    /**
     * The distance in pixels between the preview and the slider. You can also set
     * the CSS variable `--media-slider-preview-offset` to adjust this offset.
     */
    offset: number;
    /**
     * By default, the preview will be clamped to the left and right of the slider track. If this
     * is set to `true`, the preview will flow outside of the container when at the edges.
     */
    noClamp: boolean;
}
