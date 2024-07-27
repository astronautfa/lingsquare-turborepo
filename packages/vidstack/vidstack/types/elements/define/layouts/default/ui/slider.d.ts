import type { SliderOrientation } from '../../../../../components/ui/sliders/slider/types.js';
import type { TooltipPlacement } from '../../../../../components/ui/tooltip/tooltip-content.js';
export declare function DefaultVolumePopup({ orientation, tooltip, }: {
    orientation: SliderOrientation;
    tooltip: TooltipPlacement;
}): any;
export declare function DefaultVolumeSlider({ orientation }?: {
    orientation?: SliderOrientation;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultTimeSlider(): import("lit-html").TemplateResult<1>;
