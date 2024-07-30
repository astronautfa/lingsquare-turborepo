import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { CaptionsInstance } from '../primitives/instances.js';
export interface CaptionsProps extends ReactElementProps<CaptionsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<CaptionsInstance>;
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 * @example
 * ```tsx
 * <Captions />
 * ```
 */
declare const Captions: React.ForwardRefExoticComponent<Omit<CaptionsProps, "ref"> & React.RefAttributes<CaptionsInstance>>;
export { Captions };
