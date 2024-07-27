import * as React from 'react';
import { type DefaultLayoutProps } from './media-layout.jsx';
import { type DefaultAudioLayoutSlots } from './slots.jsx';
export interface DefaultAudioLayoutProps extends DefaultLayoutProps<DefaultAudioLayoutSlots> {
}
/**
 * The audio layout is our production-ready UI that's displayed when the media view type is set to
 * 'audio'. It includes support for audio tracks, slider chapters, captions, live streams
 * and more out of the box.
 *
 * @attr data-match - Whether this layout is being used.
 * @attr data-sm - The small layout is active
 * @attr data-lg - The large layout is active.
 * @attr data-size - The active layout size (sm or lg).
 * @example
 * ```tsx
 * <MediaPlayer src="audio.mp3">
 *   <MediaProvider />
 *   <DefaultAudioLayout icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
declare function DefaultAudioLayout(props: DefaultAudioLayoutProps): React.JSX.Element;
declare namespace DefaultAudioLayout {
    var displayName: string;
}
export { DefaultAudioLayout };
