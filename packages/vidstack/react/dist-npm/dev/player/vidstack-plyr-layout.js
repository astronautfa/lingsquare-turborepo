"use client";

import {
  useMediaRemote,
  usePlaybackRateOptions,
  useVideoQualityOptions
} from "../chunks/vidstack-RFPF45PN.js";
import "../chunks/vidstack-7IOPG6PW.js";
import "../chunks/vidstack-MKGKJKZ7.js";
import "../chunks/vidstack-YZRNXTFG.js";
import "../chunks/vidstack-QYGROJHA.js";
import "../chunks/vidstack-VN2N745P.js";
import {
  plyrLayoutIcons
} from "../chunks/vidstack-PNARW2L4.js";
import {
  useClassName,
  useLayoutName
} from "../chunks/vidstack-LLMOFUXB.js";
import {
  AirPlayButton,
  Button,
  CaptionButton,
  FullscreenButton,
  Gesture,
  Img,
  Item,
  Items,
  LiveButton,
  MuteButton,
  PIPButton,
  PlayButton,
  Preview,
  Root2 as Root,
  Root3 as Root2,
  Root4 as Root3,
  Root5 as Root4,
  Root6 as Root5,
  SeekButton,
  Thumbnail,
  Time,
  Value,
  useAudioOptions,
  useCaptionOptions,
  useMediaContext
} from "../chunks/vidstack-3JZFNLQ7.js";
import {
  RemotionPoster,
  RemotionSliderThumbnail,
  RemotionThumbnail
} from "../chunks/vidstack-Q2JODPQB.js";
import "../chunks/vidstack-M2U4INQ4.js";
import {
  Primitive,
  useMediaState
} from "../chunks/vidstack-MS2S7JW7.js";
import {
  isRemotionSrc,
  usePlyrLayoutClasses
} from "../chunks/vidstack-DYAEZIDU.js";
import "../chunks/vidstack-GOXJCRXV.js";
import "../chunks/vidstack-N3DBVVNQ.js";
import "../chunks/vidstack-O4WMABMP.js";
import {
  getDownloadFile
} from "../chunks/vidstack-DQWSDQKN.js";
import "../chunks/vidstack-YIOQVQ2N.js";
import "../chunks/vidstack-PKS56VNA.js";
import "../chunks/vidstack-VNXLFDV7.js";
import "../chunks/vidstack-HLIA5IIR.js";
import "../chunks/vidstack-B2HNNR5Q.js";
import "../chunks/vidstack-SN6ZVKJG.js";
import {
  IS_SERVER,
  composeRefs,
  isKeyboardClick,
  isKeyboardEvent,
  isNumber,
  isUndefined,
  listenEvent,
  signal,
  uppercaseFirstChar,
  useSignal
} from "../chunks/vidstack-3R7QJDRC.js";
import "../chunks/vidstack-WBT4TVVV.js";

// src/components/layouts/plyr/layout.tsx
import * as React3 from "react";

// src/components/layouts/plyr/context.ts
import * as React from "react";
var PlyrLayoutContext = React.createContext({});
PlyrLayoutContext.displayName = "PlyrLayoutContext";
function usePlyrLayoutContext() {
  return React.useContext(PlyrLayoutContext);
}
function usePlyrLayoutWord(word) {
  const { translations } = usePlyrLayoutContext();
  return i18n(translations, word);
}
function i18n(translations, word) {
  return translations?.[word] ?? word;
}

// src/components/layouts/plyr/props.ts
var defaultPlyrLayoutProps = {
  clickToPlay: true,
  clickToFullscreen: true,
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute+volume",
    "captions",
    "settings",
    "pip",
    "airplay",
    "fullscreen"
  ],
  displayDuration: false,
  download: null,
  markers: null,
  invertTime: true,
  thumbnails: null,
  toggleTime: true,
  translations: null,
  seekTime: 10,
  speed: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
};

// src/components/layouts/plyr/slots.tsx
import * as React2 from "react";
function slot(name, defaultValue) {
  const { slots } = usePlyrLayoutContext(), slot2 = slots?.[name], capitalizedName = uppercaseFirstChar(name);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, slots?.[`before${capitalizedName}`], isUndefined(slot2) ? defaultValue : slot2, slots?.[`after${capitalizedName}`]);
}

// src/components/layouts/plyr/layout.tsx
var PlyrLayout = React3.forwardRef(
  (userProps, forwardRef2) => {
    const {
      clickToPlay,
      clickToFullscreen,
      controls,
      displayDuration,
      download,
      markers,
      invertTime,
      thumbnails,
      toggleTime,
      translations,
      seekTime,
      speed,
      icons,
      slots,
      posterFrame,
      className,
      ...elProps
    } = { ...defaultPlyrLayoutProps, ...userProps }, [el, setEl] = React3.useState(null), media = useMediaContext(), previewTime = React3.useMemo(() => signal(0), []), $viewType = useMediaState("viewType");
    useLayoutName("plyr");
    useClassName(el, className);
    React3.useEffect(() => {
      if (!el || !media) return;
      return usePlyrLayoutClasses(el, media);
    }, [el, media]);
    return /* @__PURE__ */ React3.createElement(
      PlyrLayoutContext.Provider,
      {
        value: {
          clickToPlay,
          clickToFullscreen,
          controls,
          displayDuration,
          download,
          markers,
          invertTime,
          thumbnails,
          toggleTime,
          translations,
          seekTime,
          speed,
          previewTime,
          icons,
          slots,
          posterFrame
        }
      },
      /* @__PURE__ */ React3.createElement(
        Primitive.div,
        {
          ...elProps,
          className: IS_SERVER ? `plyr plyr--full-ui plyr--${$viewType} ${className || ""}` : void 0,
          ref: composeRefs(setEl, forwardRef2)
        },
        $viewType === "audio" ? /* @__PURE__ */ React3.createElement(PlyrAudioLayout, null) : $viewType === "video" ? /* @__PURE__ */ React3.createElement(PlyrVideoLayout, null) : null
      )
    );
  }
);
PlyrLayout.displayName = "PlyrLayout";
function PlyrAudioLayout() {
  return PlyrAudioControls();
}
PlyrAudioLayout.displayName = "PlyrAudioLayout";
function PlyrVideoLayout() {
  const media = useMediaContext(), { controls } = usePlyrLayoutContext(), { load } = media.$props, { canLoad } = media.$state, $load = useSignal(load), $canLoad = useSignal(canLoad);
  if ($load === "play" && !$canLoad) {
    return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(PlyrPlayLargeButton, null), /* @__PURE__ */ React3.createElement(PlyrPoster, null));
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, controls.includes("play-large") ? /* @__PURE__ */ React3.createElement(PlyrPlayLargeButton, null) : null, /* @__PURE__ */ React3.createElement(PlyrPreviewScrubbing, null), /* @__PURE__ */ React3.createElement(PlyrPoster, null), /* @__PURE__ */ React3.createElement(PlyrVideoControls, null), /* @__PURE__ */ React3.createElement(PlyrGestures, null), /* @__PURE__ */ React3.createElement(PlyrCaptions, null));
}
PlyrVideoLayout.displayName = "PlyrVideoLayout";
function PlyrPlayLargeButton() {
  const { translations, icons: Icons } = usePlyrLayoutContext(), $title = useMediaState("title"), label = `${i18n(translations, "Play")} ${$title}`;
  return slot(
    "playLargeButton",
    /* @__PURE__ */ React3.createElement(
      PlayButton,
      {
        className: "plyr__control plyr__control--overlaid",
        "aria-label": label,
        "data-plyr": "play"
      },
      /* @__PURE__ */ React3.createElement(Icons.Play, null)
    )
  );
}
PlyrPlayLargeButton.displayName = "PlyrPlayLargeButton";
function PlyrPreviewScrubbing() {
  const $src = useMediaState("source"), { thumbnails, previewTime } = usePlyrLayoutContext(), $previewTime = useSignal(previewTime), $RemotionThumbnail = useSignal(RemotionThumbnail), $hasRemotionThumbnail = $RemotionThumbnail && isRemotionSrc($src);
  return $hasRemotionThumbnail ? /* @__PURE__ */ React3.createElement($RemotionThumbnail, { className: "plyr__preview-scrubbing", frame: $previewTime * $src.fps }) : /* @__PURE__ */ React3.createElement(Root2, { src: thumbnails, className: "plyr__preview-scrubbing", time: $previewTime }, /* @__PURE__ */ React3.createElement(Img, null));
}
PlyrPreviewScrubbing.displayName = "PlyrPreviewScrubbing";
function PlyrPoster() {
  const $src = useMediaState("source"), $poster = useMediaState("poster"), { posterFrame } = usePlyrLayoutContext(), $RemotionPoster = useSignal(RemotionPoster), $hasRemotionPoster = $RemotionPoster && isRemotionSrc($src) && isNumber(posterFrame);
  return slot(
    "poster",
    $hasRemotionPoster ? /* @__PURE__ */ React3.createElement($RemotionPoster, { frame: posterFrame, className: "plyr__poster" }) : /* @__PURE__ */ React3.createElement("div", { className: "plyr__poster", style: { backgroundImage: `url("${$poster}")` } })
  );
}
PlyrPoster.displayName = "PlyrPoster";
var noAudioControl = /* @__PURE__ */ new Set(["captions", "pip", "airplay", "fullscreen"]);
function PlyrAudioControls() {
  const { controls } = usePlyrLayoutContext();
  return /* @__PURE__ */ React3.createElement("div", { className: "plyr__controls" }, controls.filter((type) => !noAudioControl.has(type)).map((type, i) => {
    const Control = getPlyrControl(type);
    return Control ? React3.createElement(Control, { key: i }) : null;
  }));
}
PlyrAudioControls.displayName = "PlyrAudioControls";
function PlyrVideoControls() {
  const { controls } = usePlyrLayoutContext();
  return /* @__PURE__ */ React3.createElement("div", { className: "plyr__controls" }, controls.map((type, i) => {
    const Control = getPlyrControl(type);
    return Control ? React3.createElement(Control, { key: i }) : null;
  }));
}
PlyrVideoControls.displayName = "PlyrVideoControls";
function getPlyrControl(type) {
  switch (type) {
    case "airplay":
      return PlyrAirPlayButton;
    case "captions":
      return PlyrCaptionsButton;
    case "current-time":
      return PlyrCurrentTime;
    case "download":
      return PlyrDownloadButton;
    case "duration":
      return PlyrDuration;
    case "fast-forward":
      return PlyrFastForwardButton;
    case "fullscreen":
      return PlyrFullscreenButton;
    case "mute":
    case "volume":
    case "mute+volume":
      return () => PlyrVolume({ type });
    case "pip":
      return PlyrPIPButton;
    case "play":
      return PlyrPlayButton;
    case "progress":
      return PlyrTimeSlider;
    case "restart":
      return PlyrRestartButton;
    case "rewind":
      return PlyrRewindButton;
    case "settings":
      return PlyrSettings;
    default:
      return null;
  }
}
function PlyrAirPlayButton() {
  const { icons: Icons } = usePlyrLayoutContext(), airPlayText = usePlyrLayoutWord("AirPlay");
  return slot(
    "airPlayButton",
    /* @__PURE__ */ React3.createElement(AirPlayButton, { className: "plyr__controls__item plyr__control", "data-plyr": "airplay" }, /* @__PURE__ */ React3.createElement(Icons.AirPlay, null), /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, airPlayText))
  );
}
PlyrAirPlayButton.displayName = "PlyrAirPlayButton";
function PlyrCaptionsButton() {
  const { icons: Icons } = usePlyrLayoutContext(), enableText = usePlyrLayoutWord("Enable captions"), disableText = usePlyrLayoutWord("Disable captions");
  return slot(
    "captionsButton",
    /* @__PURE__ */ React3.createElement(
      CaptionButton,
      {
        className: "plyr__controls__item plyr__control",
        "data-no-label": true,
        "data-plyr": "captions"
      },
      /* @__PURE__ */ React3.createElement(Icons.CaptionsOn, { className: "icon--pressed" }),
      /* @__PURE__ */ React3.createElement(Icons.CaptionsOff, { className: "icon--not-pressed" }),
      /* @__PURE__ */ React3.createElement("span", { className: "label--pressed plyr__tooltip" }, disableText),
      /* @__PURE__ */ React3.createElement("span", { className: "label--not-pressed plyr__tooltip" }, enableText)
    )
  );
}
PlyrCaptionsButton.displayName = "PlyrCaptionsButton";
function PlyrFullscreenButton() {
  const { icons: Icons } = usePlyrLayoutContext(), enterText = usePlyrLayoutWord("Enter Fullscreen"), exitText = usePlyrLayoutWord("Exit Fullscreen");
  return slot(
    "fullscreenButton",
    /* @__PURE__ */ React3.createElement(
      FullscreenButton,
      {
        className: "plyr__controls__item plyr__control",
        "data-no-label": true,
        "data-plyr": "fullscreen"
      },
      /* @__PURE__ */ React3.createElement(Icons.EnterFullscreen, { className: "icon--pressed" }),
      /* @__PURE__ */ React3.createElement(Icons.ExitFullscreen, { className: "icon--not-pressed" }),
      /* @__PURE__ */ React3.createElement("span", { className: "label--pressed plyr__tooltip" }, exitText),
      /* @__PURE__ */ React3.createElement("span", { className: "label--not-pressed plyr__tooltip" }, enterText)
    )
  );
}
PlyrFullscreenButton.displayName = "PlyrFullscreenButton";
function PlyrPIPButton() {
  const { icons: Icons } = usePlyrLayoutContext(), enterText = usePlyrLayoutWord("Enter PiP"), exitText = usePlyrLayoutWord("Exit PiP");
  return slot(
    "pipButton",
    /* @__PURE__ */ React3.createElement(PIPButton, { className: "plyr__controls__item plyr__control", "data-no-label": true, "data-plyr": "pip" }, /* @__PURE__ */ React3.createElement(Icons.EnterPiP, { className: "icon--pressed" }), /* @__PURE__ */ React3.createElement(Icons.ExitPiP, { className: "icon--not-pressed" }), /* @__PURE__ */ React3.createElement("span", { className: "label--pressed plyr__tooltip" }, exitText), /* @__PURE__ */ React3.createElement("span", { className: "label--not-pressed plyr__tooltip" }, enterText))
  );
}
PlyrPIPButton.displayName = "PlyrPIPButton";
function PlyrMuteButton() {
  const { icons: Icons } = usePlyrLayoutContext(), muteText = usePlyrLayoutWord("Mute"), unmuteText = usePlyrLayoutWord("Unmute");
  return slot(
    "muteButton",
    /* @__PURE__ */ React3.createElement(MuteButton, { className: "plyr__control", "data-no-label": true, "data-plyr": "mute" }, /* @__PURE__ */ React3.createElement(Icons.Muted, { className: "icon--pressed" }), /* @__PURE__ */ React3.createElement(Icons.Volume, { className: "icon--not-pressed" }), /* @__PURE__ */ React3.createElement("span", { className: "label--pressed plyr__tooltip" }, unmuteText), /* @__PURE__ */ React3.createElement("span", { className: "label--not-pressed plyr__tooltip" }, muteText))
  );
}
PlyrMuteButton.displayName = "PlyrMuteButton";
function PlyrPlayButton() {
  const { icons: Icons } = usePlyrLayoutContext(), playText = usePlyrLayoutWord("Play"), pauseText = usePlyrLayoutWord("Pause");
  return slot(
    "playButton",
    /* @__PURE__ */ React3.createElement(PlayButton, { className: "plyr__controls__item plyr__control", "data-no-label": true, "data-plyr": "play" }, /* @__PURE__ */ React3.createElement(Icons.Pause, { className: "icon--pressed" }), /* @__PURE__ */ React3.createElement(Icons.Play, { className: "icon--not-pressed" }), /* @__PURE__ */ React3.createElement("span", { className: "label--pressed plyr__tooltip" }, pauseText), /* @__PURE__ */ React3.createElement("span", { className: "label--not-pressed plyr__tooltip" }, playText))
  );
}
PlyrPlayButton.displayName = "PlyrPlayButton";
function PlyrRestartButton() {
  const { icons: Icons } = usePlyrLayoutContext(), restartText = usePlyrLayoutWord("Restart"), remote = useMediaRemote();
  function onPress({ nativeEvent: event }) {
    if (isKeyboardEvent(event) && !isKeyboardClick(event)) return;
    remote.seek(0, event);
  }
  return slot(
    "restartButton",
    /* @__PURE__ */ React3.createElement(
      "button",
      {
        type: "button",
        className: "plyr__control",
        "data-plyr": "restart",
        onPointerUp: onPress,
        onKeyDown: onPress
      },
      /* @__PURE__ */ React3.createElement("slot", { name: "restart-icon", "data-class": "" }),
      /* @__PURE__ */ React3.createElement(Icons.Restart, null),
      /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, restartText)
    )
  );
}
PlyrRestartButton.displayName = "PlyrRestartButton";
function PlyrFastForwardButton() {
  const { icons: Icons, seekTime } = usePlyrLayoutContext(), forwardText = usePlyrLayoutWord("Forward"), label = `${forwardText} ${seekTime}s`;
  return slot(
    "fastForwardButton",
    /* @__PURE__ */ React3.createElement(
      SeekButton,
      {
        className: "plyr__controls__item plyr__control",
        seconds: seekTime,
        "data-no-label": true,
        "data-plyr": "fast-forward"
      },
      /* @__PURE__ */ React3.createElement(Icons.FastForward, null),
      /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, label)
    )
  );
}
PlyrFastForwardButton.displayName = "PlyrFastForwardButton";
function PlyrRewindButton() {
  const { icons: Icons, seekTime } = usePlyrLayoutContext(), rewindText = usePlyrLayoutWord("Rewind"), label = `${rewindText} ${seekTime}s`;
  return slot(
    "rewindButton",
    /* @__PURE__ */ React3.createElement(
      SeekButton,
      {
        className: "plyr__controls__item plyr__control",
        seconds: -1 * seekTime,
        "data-no-label": true,
        "data-plyr": "rewind"
      },
      /* @__PURE__ */ React3.createElement(Icons.Rewind, null),
      /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, label)
    )
  );
}
PlyrRewindButton.displayName = "PlyrRewindButton";
function PlyrTimeSlider() {
  const { markers, thumbnails, seekTime, previewTime } = usePlyrLayoutContext(), $src = useMediaState("source"), $duration = useMediaState("duration"), seekText = usePlyrLayoutWord("Seek"), [activeMarker, setActiveMarker] = React3.useState(null), $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail), $hasRemotionSliderThumbnail = $RemotionSliderThumbnail && isRemotionSrc($src);
  function onSeekingRequest(time) {
    previewTime.set(time);
  }
  function onMarkerEnter() {
    setActiveMarker(this);
  }
  function onMarkerLeave() {
    setActiveMarker(null);
  }
  const markerLabel = activeMarker ? /* @__PURE__ */ React3.createElement(
    "span",
    {
      className: "plyr__progress__marker-label",
      dangerouslySetInnerHTML: { __html: activeMarker.label + "<br />" }
    }
  ) : null;
  return slot(
    "timeSlider",
    /* @__PURE__ */ React3.createElement("div", { className: "plyr__controls__item plyr__progress__container" }, /* @__PURE__ */ React3.createElement("div", { className: "plyr__progress" }, /* @__PURE__ */ React3.createElement(
      Root3,
      {
        className: "plyr__slider",
        pauseWhileDragging: true,
        keyStep: seekTime,
        "aria-label": seekText,
        "data-plyr": "seek",
        onMediaSeekingRequest: onSeekingRequest
      },
      /* @__PURE__ */ React3.createElement("div", { className: "plyr__slider__track" }),
      /* @__PURE__ */ React3.createElement("div", { className: "plyr__slider__thumb" }),
      /* @__PURE__ */ React3.createElement("div", { className: "plyr__slider__buffer" }),
      !thumbnails && !$hasRemotionSliderThumbnail ? /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, markerLabel, /* @__PURE__ */ React3.createElement(Value, null)) : $hasRemotionSliderThumbnail ? /* @__PURE__ */ React3.createElement(Preview, { className: "plyr__slider__preview" }, /* @__PURE__ */ React3.createElement("div", { className: "plyr__slider__preview__thumbnail" }, /* @__PURE__ */ React3.createElement("span", { className: "plyr__slider__preview__time-container" }, markerLabel, /* @__PURE__ */ React3.createElement(Value, { className: "plyr__slider__preview__time" })), /* @__PURE__ */ React3.createElement($RemotionSliderThumbnail, { className: "plyr__slider__preview__thumbnail" }))) : /* @__PURE__ */ React3.createElement(Preview, { className: "plyr__slider__preview" }, /* @__PURE__ */ React3.createElement(
        Thumbnail.Root,
        {
          src: thumbnails,
          className: "plyr__slider__preview__thumbnail"
        },
        /* @__PURE__ */ React3.createElement("span", { className: "plyr__slider__preview__time-container" }, markerLabel, /* @__PURE__ */ React3.createElement(Value, { className: "plyr__slider__preview__time" })),
        /* @__PURE__ */ React3.createElement(Thumbnail.Img, null)
      )),
      markers && Number.isFinite($duration) ? markers.map((marker, i) => /* @__PURE__ */ React3.createElement(
        "span",
        {
          className: "plyr__progress__marker",
          key: i,
          onMouseEnter: onMarkerEnter.bind(marker),
          onMouseLeave: onMarkerLeave,
          style: { left: `${marker.time / $duration * 100}%` }
        }
      )) : null
    )))
  );
}
PlyrTimeSlider.displayName = "PlyrTimeSlider";
function PlyrVolumeSlider() {
  const volumeText = usePlyrLayoutWord("Volume");
  return slot(
    "volumeSlider",
    /* @__PURE__ */ React3.createElement(Root, { className: "plyr__slider", "data-plyr": "volume", "aria-label": volumeText }, /* @__PURE__ */ React3.createElement("div", { className: "plyr__slider__track" }), /* @__PURE__ */ React3.createElement("div", { className: "plyr__slider__thumb" }))
  );
}
PlyrVolumeSlider.displayName = "PlyrVolumeSlider";
function PlyrVolume({ type }) {
  const hasMuteButton = type === "mute" || type === "mute+volume", hasVolumeSlider = type === "volume" || type === "mute+volume";
  return /* @__PURE__ */ React3.createElement("div", { className: "plyr__controls__item plyr__volume" }, hasMuteButton ? /* @__PURE__ */ React3.createElement(PlyrMuteButton, null) : null, hasVolumeSlider ? /* @__PURE__ */ React3.createElement(PlyrVolumeSlider, null) : null);
}
PlyrVolume.displayName = "PlyrVolume";
function PlyrCurrentTime() {
  const { invertTime, toggleTime, displayDuration } = usePlyrLayoutContext(), $streamType = useMediaState("streamType"), currentTimeText = usePlyrLayoutWord("Current time"), liveText = usePlyrLayoutWord("LIVE"), [invert, setInvert] = React3.useState(invertTime), remainder = !displayDuration && invert;
  function onPress({ nativeEvent: event }) {
    if (!toggleTime || displayDuration || isKeyboardEvent(event) && !isKeyboardClick(event)) {
      return;
    }
    setInvert((n) => !n);
  }
  return slot(
    "currentTime",
    $streamType === "live" || $streamType === "ll-live" ? /* @__PURE__ */ React3.createElement(LiveButton, { className: "plyr__controls__item plyr__control plyr__live-button", "data-plyr": "live" }, /* @__PURE__ */ React3.createElement("span", { className: "plyr__live-button__text" }, liveText)) : /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(
      Time,
      {
        type: "current",
        className: "plyr__controls__item plyr__time plyr__time--current",
        role: "timer",
        "aria-label": currentTimeText,
        tabIndex: 0,
        remainder,
        onPointerUp: onPress,
        onKeyDown: onPress
      }
    ), displayDuration ? /* @__PURE__ */ React3.createElement(PlyrDuration, null) : null)
  );
}
PlyrCurrentTime.displayName = "PlyrCurrentTime";
function PlyrDuration() {
  const durationText = usePlyrLayoutWord("Duration");
  return slot(
    "duration",
    /* @__PURE__ */ React3.createElement(
      Time,
      {
        className: "plyr__controls__item plyr__time plyr__time--duration",
        type: "duration",
        role: "timer",
        tabIndex: 0,
        "aria-label": durationText
      }
    )
  );
}
PlyrDuration.displayName = "PlyrDuration";
function PlyrDownloadButton() {
  const { download } = usePlyrLayoutContext(), $src = useMediaState("source"), $title = useMediaState("title"), file = getDownloadFile({
    title: $title,
    src: $src,
    download
  }), downloadText = usePlyrLayoutWord("Download");
  return slot(
    "download",
    file ? /* @__PURE__ */ React3.createElement(
      "a",
      {
        className: "plyr__controls__item plyr__control",
        href: file.url + `?download=${file.name}`,
        download: file.name,
        target: "_blank"
      },
      /* @__PURE__ */ React3.createElement("slot", { name: "download-icon" }),
      /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, downloadText)
    ) : null
  );
}
PlyrDownloadButton.displayName = "PlyrDownloadButton";
function PlyrGestures() {
  const { clickToPlay, clickToFullscreen } = usePlyrLayoutContext();
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, clickToPlay ? /* @__PURE__ */ React3.createElement(Gesture, { className: "plyr__gesture", event: "pointerup", action: "toggle:paused" }) : null, clickToFullscreen ? /* @__PURE__ */ React3.createElement(Gesture, { className: "plyr__gesture", event: "dblpointerup", action: "toggle:fullscreen" }) : null);
}
PlyrGestures.displayName = "PlyrGestures";
function PlyrCaptions() {
  const $track = useMediaState("textTrack"), [activeCue, setActiveCue] = React3.useState(null);
  React3.useEffect(() => {
    if (!$track) return;
    function onCueChange() {
      setActiveCue($track ? $track.activeCues[0] : null);
    }
    onCueChange();
    return listenEvent($track, "cue-change", onCueChange);
  }, [$track]);
  return /* @__PURE__ */ React3.createElement("div", { className: "plyr__captions", dir: "auto" }, /* @__PURE__ */ React3.createElement(
    "span",
    {
      className: "plyr__caption",
      dangerouslySetInnerHTML: {
        __html: activeCue?.text || ""
      }
    }
  ));
}
PlyrCaptions.displayName = "PlyrCaptions";
function PlyrSettings() {
  const { icons: Icons } = usePlyrLayoutContext(), settingsText = usePlyrLayoutWord("Settings");
  return slot(
    "settings",
    /* @__PURE__ */ React3.createElement("div", { className: "plyr__controls__item plyr__menu" }, /* @__PURE__ */ React3.createElement(Root5, null, /* @__PURE__ */ React3.createElement(Button, { className: "plyr__control", "data-plyr": "settings" }, slot(
      "settingsButton",
      /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(Icons.Settings, null), /* @__PURE__ */ React3.createElement("span", { className: "plyr__tooltip" }, settingsText))
    )), /* @__PURE__ */ React3.createElement(Items, { className: "plyr__menu__container", placement: "top end" }, /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("div", null, slot(
      "settingsMenu",
      /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(PlyrAudioMenu, null), /* @__PURE__ */ React3.createElement(PlyrCaptionsMenu, null), /* @__PURE__ */ React3.createElement(PlyrQualityMenu, null), /* @__PURE__ */ React3.createElement(PlyrSpeedMenu, null))
    ))))))
  );
}
PlyrSettings.displayName = "PlyrSettings";
function PlyrMenuButton({
  label,
  hint,
  open,
  disabled
}) {
  const buttonText = usePlyrLayoutWord(label), goBackText = usePlyrLayoutWord("Go back to previous menu");
  return /* @__PURE__ */ React3.createElement(
    Button,
    {
      className: `plyr__control plyr__control--${open ? "back" : "forward"}`,
      "data-plyr": "settings",
      disabled
    },
    /* @__PURE__ */ React3.createElement("span", { className: "plyr__menu__label", "aria-hidden": open ? "true" : void 0 }, buttonText),
    hint ? /* @__PURE__ */ React3.createElement("span", { className: "plyr__menu__value" }, hint) : null,
    open ? /* @__PURE__ */ React3.createElement("span", { className: "plyr__sr-only" }, goBackText) : null
  );
}
PlyrMenuButton.displayName = "PlyrMenuButton";
function PlyrMenu({
  label,
  hint,
  children,
  disabled
}) {
  const [open, setOpen] = React3.useState(false);
  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }
  return /* @__PURE__ */ React3.createElement(Root5, { onOpen, onClose }, /* @__PURE__ */ React3.createElement(PlyrMenuButton, { label, open, hint, disabled }), /* @__PURE__ */ React3.createElement(Items, null, children));
}
PlyrMenu.displayName = "PlyrMenu";
function PlyrAudioMenu() {
  const defaultText = usePlyrLayoutWord("Default"), $track = useMediaState("audioTrack"), options = useAudioOptions();
  return /* @__PURE__ */ React3.createElement(PlyrMenu, { label: "Audio", hint: $track?.label ?? defaultText, disabled: options.disabled }, /* @__PURE__ */ React3.createElement(Root4, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React3.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React3.createElement("span", null, label)))));
}
PlyrAudioMenu.displayName = "PlyrAudioMenu";
function PlyrSpeedMenu() {
  const normalLabel = usePlyrLayoutWord("Normal"), options = usePlaybackRateOptions({ normalLabel }), hint = options.selectedValue === "1" ? normalLabel : options.selectedValue + "x";
  return /* @__PURE__ */ React3.createElement(PlyrMenu, { label: "Speed", hint, disabled: options.disabled }, /* @__PURE__ */ React3.createElement(Root4, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React3.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React3.createElement("span", null, label)))));
}
PlyrSpeedMenu.displayName = "PlyrSpeedMenu";
function PlyrCaptionsMenu() {
  const offText = usePlyrLayoutWord("Disabled"), options = useCaptionOptions({ off: offText }), hint = options.selectedTrack?.label ?? offText;
  return /* @__PURE__ */ React3.createElement(PlyrMenu, { label: "Captions", hint, disabled: options.disabled }, /* @__PURE__ */ React3.createElement(Root4, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React3.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React3.createElement("span", null, label)))));
}
PlyrCaptionsMenu.displayName = "PlyrCaptionsMenu";
function PlyrQualityMenu() {
  const autoText = usePlyrLayoutWord("Auto"), options = useVideoQualityOptions({ auto: autoText, sort: "descending" }), currentQuality = options.selectedQuality?.height, hint = options.selectedValue !== "auto" && currentQuality ? `${currentQuality}p` : `${autoText}${currentQuality ? ` (${currentQuality}p)` : ""}`;
  return /* @__PURE__ */ React3.createElement(PlyrMenu, { label: "Quality", hint, disabled: options.disabled }, /* @__PURE__ */ React3.createElement(Root4, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React3.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React3.createElement("span", null, label)))));
}
PlyrQualityMenu.displayName = "PlyrQualityMenu";
export {
  PlyrAudioLayout,
  PlyrLayout,
  PlyrLayoutContext,
  PlyrVideoLayout,
  i18n,
  plyrLayoutIcons,
  usePlyrLayoutContext,
  usePlyrLayoutWord
};
