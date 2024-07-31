import {
  Icon
} from "./vidstack-VNXLFDV7.js";

// src/components/layouts/default/icons.tsx
import * as React from "react";
import accessibilityIconPaths from "media-icons/dist/icons/accessibility.js";
import airPlayIconPaths from "media-icons/dist/icons/airplay.js";
import arrowDownIconPaths from "media-icons/dist/icons/arrow-down.js";
import arrowLeftIconPaths from "media-icons/dist/icons/arrow-left.js";
import arrowUpIconPaths from "media-icons/dist/icons/arrow-up.js";
import chaptersIconPaths from "media-icons/dist/icons/chapters.js";
import checkIconPaths from "media-icons/dist/icons/check.js";
import arrowRightIconPaths from "media-icons/dist/icons/chevron-right.js";
import googleCastIconPaths from "media-icons/dist/icons/chromecast.js";
import ccOnIconPaths from "media-icons/dist/icons/closed-captions-on.js";
import ccIconPaths from "media-icons/dist/icons/closed-captions.js";
import downloadIconPaths from "media-icons/dist/icons/download.js";
import eyeIconPaths from "media-icons/dist/icons/eye.js";
import fastBackwardIconPaths from "media-icons/dist/icons/fast-backward.js";
import fastForwardIconPaths from "media-icons/dist/icons/fast-forward.js";
import exitFullscreenIconPaths from "media-icons/dist/icons/fullscreen-exit.js";
import enterFullscreenIconPaths from "media-icons/dist/icons/fullscreen.js";
import musicIconPaths from "media-icons/dist/icons/music.js";
import muteIconPaths from "media-icons/dist/icons/mute.js";
import noEyeIconPaths from "media-icons/dist/icons/no-eye.js";
import pauseIconPaths from "media-icons/dist/icons/pause.js";
import exitPIPIconPaths from "media-icons/dist/icons/picture-in-picture-exit.js";
import enterPIPIconPaths from "media-icons/dist/icons/picture-in-picture.js";
import playIconPaths from "media-icons/dist/icons/play.js";
import playbackIconPaths from "media-icons/dist/icons/playback-speed-circle.js";
import replayIconPaths from "media-icons/dist/icons/replay.js";
import seekBackwardIconPaths from "media-icons/dist/icons/seek-backward-10.js";
import seekForwardIconPaths from "media-icons/dist/icons/seek-forward-10.js";
import settingsIconPaths from "media-icons/dist/icons/settings.js";
import volumeHighIconPaths from "media-icons/dist/icons/volume-high.js";
import volumeLowIconPaths from "media-icons/dist/icons/volume-low.js";
function createIcon(paths) {
  function DefaultLayoutIcon(props) {
    return /* @__PURE__ */ React.createElement(Icon, { paths, ...props });
  }
  DefaultLayoutIcon.displayName = "DefaultLayoutIcon";
  return DefaultLayoutIcon;
}
var defaultLayoutIcons = {
  AirPlayButton: {
    Default: createIcon(airPlayIconPaths)
  },
  GoogleCastButton: {
    Default: createIcon(googleCastIconPaths)
  },
  PlayButton: {
    Play: createIcon(playIconPaths),
    Pause: createIcon(pauseIconPaths),
    Replay: createIcon(replayIconPaths)
  },
  MuteButton: {
    Mute: createIcon(muteIconPaths),
    VolumeLow: createIcon(volumeLowIconPaths),
    VolumeHigh: createIcon(volumeHighIconPaths)
  },
  CaptionButton: {
    On: createIcon(ccOnIconPaths),
    Off: createIcon(ccIconPaths)
  },
  PIPButton: {
    Enter: createIcon(enterPIPIconPaths),
    Exit: createIcon(exitPIPIconPaths)
  },
  FullscreenButton: {
    Enter: createIcon(enterFullscreenIconPaths),
    Exit: createIcon(exitFullscreenIconPaths)
  },
  SeekButton: {
    Backward: createIcon(seekBackwardIconPaths),
    Forward: createIcon(seekForwardIconPaths)
  },
  DownloadButton: {
    Default: createIcon(downloadIconPaths)
  },
  Menu: {
    Accessibility: createIcon(accessibilityIconPaths),
    ArrowLeft: createIcon(arrowLeftIconPaths),
    ArrowRight: createIcon(arrowRightIconPaths),
    Audio: createIcon(musicIconPaths),
    Chapters: createIcon(chaptersIconPaths),
    Captions: createIcon(ccIconPaths),
    Playback: createIcon(playbackIconPaths),
    Settings: createIcon(settingsIconPaths),
    AudioBoostUp: createIcon(volumeHighIconPaths),
    AudioBoostDown: createIcon(volumeLowIconPaths),
    SpeedUp: createIcon(fastForwardIconPaths),
    SpeedDown: createIcon(fastBackwardIconPaths),
    QualityUp: createIcon(arrowUpIconPaths),
    QualityDown: createIcon(arrowDownIconPaths),
    FontSizeUp: createIcon(arrowUpIconPaths),
    FontSizeDown: createIcon(arrowDownIconPaths),
    OpacityUp: createIcon(eyeIconPaths),
    OpacityDown: createIcon(noEyeIconPaths),
    RadioCheck: createIcon(checkIconPaths)
  },
  KeyboardDisplay: {
    Play: createIcon(playIconPaths),
    Pause: createIcon(pauseIconPaths),
    Mute: createIcon(muteIconPaths),
    VolumeUp: createIcon(volumeHighIconPaths),
    VolumeDown: createIcon(volumeLowIconPaths),
    EnterFullscreen: createIcon(enterFullscreenIconPaths),
    ExitFullscreen: createIcon(exitFullscreenIconPaths),
    EnterPiP: createIcon(enterPIPIconPaths),
    ExitPiP: createIcon(exitPIPIconPaths),
    CaptionsOn: createIcon(ccOnIconPaths),
    CaptionsOff: createIcon(ccIconPaths),
    SeekForward: createIcon(fastForwardIconPaths),
    SeekBackward: createIcon(fastBackwardIconPaths)
  }
};

export {
  defaultLayoutIcons
};
