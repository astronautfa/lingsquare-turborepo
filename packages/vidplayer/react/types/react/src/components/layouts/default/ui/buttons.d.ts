import * as React from 'react';
import * as Tooltip from '../../../ui/tooltip.jsx';
interface DefaultMediaButtonProps {
    tooltip: Tooltip.ContentProps['placement'];
}
declare function DefaultPlayButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultPlayButton {
    var displayName: string;
}
export { DefaultPlayButton };
declare const DefaultMuteButton: React.ForwardRefExoticComponent<DefaultMediaButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { DefaultMuteButton };
declare function DefaultCaptionButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultCaptionButton {
    var displayName: string;
}
export { DefaultCaptionButton };
declare function DefaultPIPButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultPIPButton {
    var displayName: string;
}
export { DefaultPIPButton };
declare function DefaultFullscreenButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultFullscreenButton {
    var displayName: string;
}
export { DefaultFullscreenButton };
declare function DefaultSeekButton({ backward, tooltip, }: DefaultMediaButtonProps & {
    backward?: boolean;
}): React.JSX.Element;
declare namespace DefaultSeekButton {
    var displayName: string;
}
export { DefaultSeekButton };
declare function DefaultAirPlayButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultAirPlayButton {
    var displayName: string;
}
export { DefaultAirPlayButton };
declare function DefaultGoogleCastButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultGoogleCastButton {
    var displayName: string;
}
export { DefaultGoogleCastButton };
declare function DefaultLiveButton(): React.JSX.Element | null;
declare namespace DefaultLiveButton {
    var displayName: string;
}
export { DefaultLiveButton };
declare function DefaultDownloadButton(): React.JSX.Element | null;
declare namespace DefaultDownloadButton {
    var displayName: string;
}
export { DefaultDownloadButton };
