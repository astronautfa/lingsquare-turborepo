import * as React from 'react';
import type { SliderOrientation, TooltipPlacement } from 'vidstack';
import * as VolumeSlider from '../../../ui/sliders/volume-slider.jsx';
import { type DefaultLayoutSlots } from '../slots.jsx';
export interface DefaultVolumePopupProps {
    slots?: DefaultLayoutSlots;
    tooltip: TooltipPlacement;
    orientation: SliderOrientation;
}
declare function DefaultVolumePopup({ tooltip, orientation, slots }: DefaultVolumePopupProps): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
declare namespace DefaultVolumePopup {
    var displayName: string;
}
export { DefaultVolumePopup };
declare function DefaultVolumeSlider(props: VolumeSlider.RootProps): React.JSX.Element;
declare namespace DefaultVolumeSlider {
    var displayName: string;
}
export { DefaultVolumeSlider };
declare function DefaultTimeSlider(): React.JSX.Element;
declare namespace DefaultTimeSlider {
    var displayName: string;
}
export { DefaultTimeSlider };
