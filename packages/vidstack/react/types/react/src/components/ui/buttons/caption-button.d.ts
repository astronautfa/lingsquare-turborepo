import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { CaptionButtonInstance } from '../../primitives/instances.js';
export interface CaptionButtonProps extends ReactElementProps<CaptionButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 * @example
 * ```tsx
 * const track = useMediaState('textTrack'),
 *   isOn = track && isTrackCaptionKind(track);
 *
 * <CaptionButton>
 *   {isOn ? <OnIcon /> : <OffIcon />}
 * </CaptionButton>
 * ```
 */
declare const CaptionButton: React.ForwardRefExoticComponent<Omit<CaptionButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { CaptionButton };
