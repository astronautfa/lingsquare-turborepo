import * as React from 'react';
export declare const plyrLayoutIcons: PlyrLayoutIcons;
export interface PlyrLayoutIconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> {
}
export interface PlyrLayoutIcon {
    (props: PlyrLayoutIconProps): React.ReactNode;
}
export interface PlyrLayoutIcons {
    AirPlay: PlyrLayoutIcon;
    CaptionsOff: PlyrLayoutIcon;
    CaptionsOn: PlyrLayoutIcon;
    Download: PlyrLayoutIcon;
    EnterFullscreen: PlyrLayoutIcon;
    EnterPiP: PlyrLayoutIcon;
    ExitFullscreen: PlyrLayoutIcon;
    ExitPiP: PlyrLayoutIcon;
    FastForward: PlyrLayoutIcon;
    Muted: PlyrLayoutIcon;
    Pause: PlyrLayoutIcon;
    Play: PlyrLayoutIcon;
    Restart: PlyrLayoutIcon;
    Rewind: PlyrLayoutIcon;
    Settings: PlyrLayoutIcon;
    Volume: PlyrLayoutIcon;
}
