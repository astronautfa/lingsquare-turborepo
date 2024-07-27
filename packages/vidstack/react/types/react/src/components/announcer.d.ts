import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { MediaAnnouncerInstance } from './primitives/instances.js';
export interface MediaAnnouncerProps extends ReactElementProps<MediaAnnouncerInstance> {
    ref?: React.Ref<HTMLElement>;
}
/**
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/announcer}
 * @example
 * ```tsx
 * <MediaAnnouncer />
 * ```
 */
declare const MediaAnnouncer: React.ForwardRefExoticComponent<Omit<MediaAnnouncerProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { MediaAnnouncer };
