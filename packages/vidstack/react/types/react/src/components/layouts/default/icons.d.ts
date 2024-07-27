import * as React from 'react';
export declare const defaultLayoutIcons: DefaultLayoutIcons;
export interface DefaultLayoutIconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> {
}
export interface DefaultLayoutIcon {
    (props: DefaultLayoutIconProps): React.ReactNode;
}
export interface DefaultAirPlayButtonIcons {
    Default: DefaultLayoutIcon;
    Connecting?: DefaultLayoutIcon;
    Connected?: DefaultLayoutIcon;
}
export interface DefaultGoogleCastButtonIcons {
    Default: DefaultLayoutIcon;
    Connecting?: DefaultLayoutIcon;
    Connected?: DefaultLayoutIcon;
}
export interface DefaultPlayButtonIcons {
    Play: DefaultLayoutIcon;
    Pause: DefaultLayoutIcon;
    Replay: DefaultLayoutIcon;
}
export interface DefaultMuteButtonIcons {
    Mute: DefaultLayoutIcon;
    VolumeLow: DefaultLayoutIcon;
    VolumeHigh: DefaultLayoutIcon;
}
export interface DefaultCaptionButtonIcons {
    On: DefaultLayoutIcon;
    Off: DefaultLayoutIcon;
}
export interface DefaultPIPButtonIcons {
    Enter: DefaultLayoutIcon;
    Exit: DefaultLayoutIcon;
}
export interface DefaultFullscreenButtonIcons {
    Enter: DefaultLayoutIcon;
    Exit: DefaultLayoutIcon;
}
export interface DefaultSeekButtonIcons {
    Backward: DefaultLayoutIcon;
    Forward: DefaultLayoutIcon;
}
export interface DefaultDownloadButtonIcons {
    Default: DefaultLayoutIcon;
}
export interface DefaultMenuIcons {
    Accessibility: DefaultLayoutIcon;
    ArrowLeft: DefaultLayoutIcon;
    ArrowRight: DefaultLayoutIcon;
    Audio: DefaultLayoutIcon;
    AudioBoostUp: DefaultLayoutIcon;
    AudioBoostDown: DefaultLayoutIcon;
    Chapters: DefaultLayoutIcon;
    Captions: DefaultLayoutIcon;
    Playback: DefaultLayoutIcon;
    Settings: DefaultLayoutIcon;
    SpeedUp: DefaultLayoutIcon;
    SpeedDown: DefaultLayoutIcon;
    QualityUp: DefaultLayoutIcon;
    QualityDown: DefaultLayoutIcon;
    FontSizeUp: DefaultLayoutIcon;
    FontSizeDown: DefaultLayoutIcon;
    OpacityUp: DefaultLayoutIcon;
    OpacityDown: DefaultLayoutIcon;
    RadioCheck: DefaultLayoutIcon;
}
export interface DefaultKeyboardDisplayIcons {
    Play: DefaultLayoutIcon;
    Pause: DefaultLayoutIcon;
    Mute: DefaultLayoutIcon;
    VolumeUp: DefaultLayoutIcon;
    VolumeDown: DefaultLayoutIcon;
    EnterFullscreen: DefaultLayoutIcon;
    ExitFullscreen: DefaultLayoutIcon;
    EnterPiP: DefaultLayoutIcon;
    ExitPiP: DefaultLayoutIcon;
    CaptionsOn: DefaultLayoutIcon;
    CaptionsOff: DefaultLayoutIcon;
    SeekForward: DefaultLayoutIcon;
    SeekBackward: DefaultLayoutIcon;
}
export interface DefaultLayoutIcons {
    AirPlayButton: DefaultAirPlayButtonIcons;
    GoogleCastButton: DefaultGoogleCastButtonIcons;
    PlayButton: DefaultPlayButtonIcons;
    MuteButton: DefaultMuteButtonIcons;
    CaptionButton: DefaultCaptionButtonIcons;
    PIPButton: DefaultPIPButtonIcons;
    FullscreenButton: DefaultFullscreenButtonIcons;
    SeekButton: DefaultSeekButtonIcons;
    DownloadButton?: DefaultDownloadButtonIcons;
    Menu: DefaultMenuIcons;
    KeyboardDisplay?: Partial<DefaultKeyboardDisplayIcons>;
}
