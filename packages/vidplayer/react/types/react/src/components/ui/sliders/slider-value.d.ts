import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { SliderValueInstance } from '../../primitives/instances.js';
export declare const SliderValueBridge: import("maverick.js/react").ReactComponentBridge<SliderValueInstance>;
export interface SliderValueProps extends ReactElementProps<SliderValueInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
