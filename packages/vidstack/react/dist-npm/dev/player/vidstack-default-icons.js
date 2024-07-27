"use client"

import * as React from 'react';
import { Icon$5, Icon$24, Icon$62, Icon$59, Icon$74, Icon$54, Icon$105, Icon$104, Icon$26, Icon$27, Icon$61, Icon$60, Icon$40, Icon$39, Icon$77, Icon$81, Icon$31, Icon$0, Icon$11, Icon$22, Icon$53, Icon$16, Icon$63, Icon$88, Icon$35, Icon$34, Icon$13, Icon$8, Icon$33, Icon$56, Icon$19 } from '../chunks/vidstack-3hs3-8i_.js';
import { Icon } from '../chunks/vidstack-CBF7iUqu.js';

function createIcon(paths) {
  function DefaultLayoutIcon(props) {
    return /* @__PURE__ */ React.createElement(Icon, { paths, ...props });
  }
  DefaultLayoutIcon.displayName = "DefaultLayoutIcon";
  return DefaultLayoutIcon;
}
const defaultLayoutIcons = {
  AirPlayButton: {
    Default: createIcon(Icon$5)
  },
  GoogleCastButton: {
    Default: createIcon(Icon$24)
  },
  PlayButton: {
    Play: createIcon(Icon$62),
    Pause: createIcon(Icon$59),
    Replay: createIcon(Icon$74)
  },
  MuteButton: {
    Mute: createIcon(Icon$54),
    VolumeLow: createIcon(Icon$105),
    VolumeHigh: createIcon(Icon$104)
  },
  CaptionButton: {
    On: createIcon(Icon$26),
    Off: createIcon(Icon$27)
  },
  PIPButton: {
    Enter: createIcon(Icon$61),
    Exit: createIcon(Icon$60)
  },
  FullscreenButton: {
    Enter: createIcon(Icon$40),
    Exit: createIcon(Icon$39)
  },
  SeekButton: {
    Backward: createIcon(Icon$77),
    Forward: createIcon(Icon$81)
  },
  DownloadButton: {
    Default: createIcon(Icon$31)
  },
  Menu: {
    Accessibility: createIcon(Icon$0),
    ArrowLeft: createIcon(Icon$11),
    ArrowRight: createIcon(Icon$22),
    Audio: createIcon(Icon$53),
    Chapters: createIcon(Icon$16),
    Captions: createIcon(Icon$27),
    Playback: createIcon(Icon$63),
    Settings: createIcon(Icon$88),
    AudioBoostUp: createIcon(Icon$104),
    AudioBoostDown: createIcon(Icon$105),
    SpeedUp: createIcon(Icon$35),
    SpeedDown: createIcon(Icon$34),
    QualityUp: createIcon(Icon$13),
    QualityDown: createIcon(Icon$8),
    FontSizeUp: createIcon(Icon$13),
    FontSizeDown: createIcon(Icon$8),
    OpacityUp: createIcon(Icon$33),
    OpacityDown: createIcon(Icon$56),
    RadioCheck: createIcon(Icon$19)
  },
  KeyboardDisplay: {
    Play: createIcon(Icon$62),
    Pause: createIcon(Icon$59),
    Mute: createIcon(Icon$54),
    VolumeUp: createIcon(Icon$104),
    VolumeDown: createIcon(Icon$105),
    EnterFullscreen: createIcon(Icon$40),
    ExitFullscreen: createIcon(Icon$39),
    EnterPiP: createIcon(Icon$61),
    ExitPiP: createIcon(Icon$60),
    CaptionsOn: createIcon(Icon$26),
    CaptionsOff: createIcon(Icon$27),
    SeekForward: createIcon(Icon$35),
    SeekBackward: createIcon(Icon$34)
  }
};

export { defaultLayoutIcons };
