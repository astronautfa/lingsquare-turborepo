import * as React from 'react';
import { type DefaultLayoutProps } from './media-layout.jsx';
import { type DefaultVideoLayoutSlots } from './slots.jsx';
export interface DefaultVideoLayoutProps extends DefaultLayoutProps<DefaultVideoLayoutSlots> {
}
/**
 * The video layout is our production-ready UI that's displayed when the media view type is set to
 * 'video'. It includes support for picture-in-picture, fullscreen, slider chapters, slider
 * previews, captions, audio/quality settings, live streams, and more out of the box.
 *
 * @attr data-match - Whether this layout is being used.
 * @attr data-sm - The small layout is active
 * @attr data-lg - The large layout is active.
 * @attr data-size - The active layout size (sm or lg).
 * @example
 * ```tsx
 * <MediaPlayer src="video.mp4">
 *   <MediaProvider />
 *   <DefaultVideoLayout thumbnails="/thumbnails.vtt" icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
declare function DefaultVideoLayout(props: DefaultVideoLayoutProps): React.JSX.Element;
declare namespace DefaultVideoLayout {
    var displayName: string;
}
export { DefaultVideoLayout };
declare function DefaultVideoLargeLayout(): React.JSX.Element;
declare namespace DefaultVideoLargeLayout {
    var displayName: string;
}
export { DefaultVideoLargeLayout };
declare function DefaultVideoSmallLayout(): React.JSX.Element;
declare namespace DefaultVideoSmallLayout {
    var displayName: string;
}
export { DefaultVideoSmallLayout };
declare function DefaultVideoGestures(): React.JSX.Element | null;
declare namespace DefaultVideoGestures {
    var displayName: string;
}
export { DefaultVideoGestures };
declare function DefaultBufferingIndicator(): React.JSX.Element;
declare namespace DefaultBufferingIndicator {
    var displayName: string;
}
export { DefaultBufferingIndicator };
