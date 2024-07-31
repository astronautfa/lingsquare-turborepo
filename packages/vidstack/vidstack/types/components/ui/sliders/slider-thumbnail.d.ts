import { Thumbnail } from '../thumbnails/thumbnail.js';
/**
 * Used to display preview thumbnails when the user is hovering or dragging the time slider.
 * The time ranges in the WebVTT file will automatically be matched based on the current slider
 * pointer position.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-thumbnail}
 */
export declare class SliderThumbnail extends Thumbnail {
    private _slider;
    protected onAttach(el: HTMLElement): void;
    protected _getTime(): number;
}
