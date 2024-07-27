import * as React from 'react';
import { type SliderOrientation } from 'vidstack';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-preview}
 */
export declare function useSliderPreview({ clamp, offset, orientation, }?: UseSliderPreview): {
    previewRootRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    previewRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    previewValue: number;
    isPreviewVisible: boolean;
};
export interface UseSliderPreview {
    /**
     * Whether the preview should be clamped to the start and end of the slider root. If `true` the
     * preview won't be placed outside the root bounds.
     */
    clamp?: boolean;
    /**
     * The distance in pixels between the preview and the slider root. You can also set
     * the CSS variable `--media-slider-preview-offset` to adjust this offset.
     */
    offset?: number;
    /**
     * The orientation of the slider.
     */
    orientation?: SliderOrientation;
}
