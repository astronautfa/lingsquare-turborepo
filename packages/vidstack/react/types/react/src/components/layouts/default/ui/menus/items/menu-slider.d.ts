import * as React from 'react';
import type { DefaultLayoutIcon } from '../../../icons.jsx';
export interface DefaultMenuSliderItemProps {
    label?: string;
    value?: string;
    UpIcon?: DefaultLayoutIcon;
    DownIcon?: DefaultLayoutIcon;
    children: React.ReactNode;
    isMin: boolean;
    isMax: boolean;
}
declare function DefaultMenuSliderItem({ label, value, UpIcon, DownIcon, children, isMin, isMax, }: DefaultMenuSliderItemProps): React.JSX.Element;
declare namespace DefaultMenuSliderItem {
    var displayName: string;
}
export { DefaultMenuSliderItem };
declare function DefaultSliderParts(): React.JSX.Element;
declare namespace DefaultSliderParts {
    var displayName: string;
}
export { DefaultSliderParts };
declare function DefaultSliderSteps(): React.JSX.Element;
declare namespace DefaultSliderSteps {
    var displayName: string;
}
export { DefaultSliderSteps };
