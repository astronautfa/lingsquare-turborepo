"use client"

import { u as useMediaState, n as usePlyrLayoutClasses, P as Primitive, I as IS_SERVER, m as isRemotionSrc, o as getDownloadFile } from '../chunks/vidstack-DLTRlLRp.js';
import * as React from 'react';
import { y as uppercaseFirstChar, n as isUndefined, s as signal, z as composeRefs, u as useSignal, j as isNumber, l as listenEvent, A as isKeyboardEvent, B as isKeyboardClick } from '../chunks/vidstack-DwBltyvo.js';
import { a as useMediaContext, P as PlayButton, R as Root, I as Img, G as Gesture, A as AirPlayButton, C as CaptionButton, F as FullscreenButton, b as PIPButton, S as SeekButton, c as Root$1, V as Value, d as Preview, T as Thumbnail, L as LiveButton, e as Time, f as Root$2, B as Button, g as Items, h as useAudioOptions, i as Root$3, j as Item, k as useCaptionOptions, M as MuteButton, l as Root$4 } from '../chunks/vidstack-dFkreRXo.js';
import { u as useMediaRemote, a as usePlaybackRateOptions, b as useVideoQualityOptions } from '../chunks/vidstack-BTSA0VVc.js';
import { u as useLayoutName, a as useClassName } from '../chunks/vidstack-CJrlqjd0.js';
import { R as RemotionThumbnail, a as RemotionPoster, b as RemotionSliderThumbnail } from '../chunks/vidstack-DGnz3pCc.js';
export { plyrLayoutIcons } from './vidstack-plyr-icons.js';
import 'react-dom';
import '../chunks/vidstack-Xvq9wjeH.js';

const PlyrLayoutContext = React.createContext({});
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

const defaultPlyrLayoutProps = {
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

function slot(name, defaultValue) {
  const { slots } = usePlyrLayoutContext(), slot2 = slots?.[name], capitalizedName = uppercaseFirstChar(name);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, slots?.[`before${capitalizedName}`], isUndefined(slot2) ? defaultValue : slot2, slots?.[`after${capitalizedName}`]);
}

const PlyrLayout = React.forwardRef(
  (userProps, forwardRef) => {
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
    } = { ...defaultPlyrLayoutProps, ...userProps }, [el, setEl] = React.useState(null), media = useMediaContext(), previewTime = React.useMemo(() => signal(0), []), $viewType = useMediaState("viewType");
    useLayoutName("plyr");
    useClassName(el, className);
    React.useEffect(() => {
      if (!el || !media)
        return;
      return usePlyrLayoutClasses(el, media);
    }, [el, media]);
    return /* @__PURE__ */ React.createElement(
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
      /* @__PURE__ */ React.createElement(
        Primitive.div,
        {
          ...elProps,
          className: IS_SERVER ? `plyr plyr--full-ui plyr--${$viewType} ${className || ""}` : void 0,
          ref: composeRefs(setEl, forwardRef)
        },
        $viewType === "audio" ? /* @__PURE__ */ React.createElement(PlyrAudioLayout, null) : $viewType === "video" ? /* @__PURE__ */ React.createElement(PlyrVideoLayout, null) : null
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PlyrPlayLargeButton, null), /* @__PURE__ */ React.createElement(PlyrPoster, null));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, controls.includes("play-large") ? /* @__PURE__ */ React.createElement(PlyrPlayLargeButton, null) : null, /* @__PURE__ */ React.createElement(PlyrPreviewScrubbing, null), /* @__PURE__ */ React.createElement(PlyrPoster, null), /* @__PURE__ */ React.createElement(PlyrVideoControls, null), /* @__PURE__ */ React.createElement(PlyrGestures, null), /* @__PURE__ */ React.createElement(PlyrCaptions, null));
}
PlyrVideoLayout.displayName = "PlyrVideoLayout";
function PlyrPlayLargeButton() {
  const { translations, icons: Icons } = usePlyrLayoutContext(), $title = useMediaState("title"), label = `${i18n(translations, "Play")} ${$title}`;
  return slot(
    "playLargeButton",
    /* @__PURE__ */ React.createElement(
      PlayButton,
      {
        className: "plyr__control plyr__control--overlaid",
        "aria-label": label,
        "data-plyr": "play"
      },
      /* @__PURE__ */ React.createElement(Icons.Play, null)
    )
  );
}
PlyrPlayLargeButton.displayName = "PlyrPlayLargeButton";
function PlyrPreviewScrubbing() {
  const $src = useMediaState("source"), { thumbnails, previewTime } = usePlyrLayoutContext(), $previewTime = useSignal(previewTime), $RemotionThumbnail = useSignal(RemotionThumbnail), $hasRemotionThumbnail = $RemotionThumbnail && isRemotionSrc($src);
  return $hasRemotionThumbnail ? /* @__PURE__ */ React.createElement($RemotionThumbnail, { className: "plyr__preview-scrubbing", frame: $previewTime * $src.fps }) : /* @__PURE__ */ React.createElement(Root, { src: thumbnails, className: "plyr__preview-scrubbing", time: $previewTime }, /* @__PURE__ */ React.createElement(Img, null));
}
PlyrPreviewScrubbing.displayName = "PlyrPreviewScrubbing";
function PlyrPoster() {
  const $src = useMediaState("source"), $poster = useMediaState("poster"), { posterFrame } = usePlyrLayoutContext(), $RemotionPoster = useSignal(RemotionPoster), $hasRemotionPoster = $RemotionPoster && isRemotionSrc($src) && isNumber(posterFrame);
  return slot(
    "poster",
    $hasRemotionPoster ? /* @__PURE__ */ React.createElement($RemotionPoster, { frame: posterFrame, className: "plyr__poster" }) : /* @__PURE__ */ React.createElement("div", { className: "plyr__poster", style: { backgroundImage: `url("${$poster}")` } })
  );
}
PlyrPoster.displayName = "PlyrPoster";
const noAudioControl = /* @__PURE__ */ new Set(["captions", "pip", "airplay", "fullscreen"]);
function PlyrAudioControls() {
  const { controls } = usePlyrLayoutContext();
  return /* @__PURE__ */ React.createElement("div", { className: "plyr__controls" }, controls.filter((type) => !noAudioControl.has(type)).map((type, i) => {
    const Control = getPlyrControl(type);
    return Control ? React.createElement(Control, { key: i }) : null;
  }));
}
PlyrAudioControls.displayName = "PlyrAudioControls";
function PlyrVideoControls() {
  const { controls } = usePlyrLayoutContext();
  return /* @__PURE__ */ React.createElement("div", { className: "plyr__controls" }, controls.map((type, i) => {
    const Control = getPlyrControl(type);
    return Control ? React.createElement(Control, { key: i }) : null;
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
    /* @__PURE__ */ React.createElement(AirPlayButton, { className: "plyr__controls__item plyr__control", "data-plyr": "airplay" }, /* @__PURE__ */ React.createElement(Icons.AirPlay, null), /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, airPlayText))
  );
}
PlyrAirPlayButton.displayName = "PlyrAirPlayButton";
function PlyrCaptionsButton() {
  const { icons: Icons } = usePlyrLayoutContext(), enableText = usePlyrLayoutWord("Enable captions"), disableText = usePlyrLayoutWord("Disable captions");
  return slot(
    "captionsButton",
    /* @__PURE__ */ React.createElement(
      CaptionButton,
      {
        className: "plyr__controls__item plyr__control",
        "data-no-label": true,
        "data-plyr": "captions"
      },
      /* @__PURE__ */ React.createElement(Icons.CaptionsOn, { className: "icon--pressed" }),
      /* @__PURE__ */ React.createElement(Icons.CaptionsOff, { className: "icon--not-pressed" }),
      /* @__PURE__ */ React.createElement("span", { className: "label--pressed plyr__tooltip" }, disableText),
      /* @__PURE__ */ React.createElement("span", { className: "label--not-pressed plyr__tooltip" }, enableText)
    )
  );
}
PlyrCaptionsButton.displayName = "PlyrCaptionsButton";
function PlyrFullscreenButton() {
  const { icons: Icons } = usePlyrLayoutContext(), enterText = usePlyrLayoutWord("Enter Fullscreen"), exitText = usePlyrLayoutWord("Exit Fullscreen");
  return slot(
    "fullscreenButton",
    /* @__PURE__ */ React.createElement(
      FullscreenButton,
      {
        className: "plyr__controls__item plyr__control",
        "data-no-label": true,
        "data-plyr": "fullscreen"
      },
      /* @__PURE__ */ React.createElement(Icons.EnterFullscreen, { className: "icon--pressed" }),
      /* @__PURE__ */ React.createElement(Icons.ExitFullscreen, { className: "icon--not-pressed" }),
      /* @__PURE__ */ React.createElement("span", { className: "label--pressed plyr__tooltip" }, exitText),
      /* @__PURE__ */ React.createElement("span", { className: "label--not-pressed plyr__tooltip" }, enterText)
    )
  );
}
PlyrFullscreenButton.displayName = "PlyrFullscreenButton";
function PlyrPIPButton() {
  const { icons: Icons } = usePlyrLayoutContext(), enterText = usePlyrLayoutWord("Enter PiP"), exitText = usePlyrLayoutWord("Exit PiP");
  return slot(
    "pipButton",
    /* @__PURE__ */ React.createElement(PIPButton, { className: "plyr__controls__item plyr__control", "data-no-label": true, "data-plyr": "pip" }, /* @__PURE__ */ React.createElement(Icons.EnterPiP, { className: "icon--pressed" }), /* @__PURE__ */ React.createElement(Icons.ExitPiP, { className: "icon--not-pressed" }), /* @__PURE__ */ React.createElement("span", { className: "label--pressed plyr__tooltip" }, exitText), /* @__PURE__ */ React.createElement("span", { className: "label--not-pressed plyr__tooltip" }, enterText))
  );
}
PlyrPIPButton.displayName = "PlyrPIPButton";
function PlyrMuteButton() {
  const { icons: Icons } = usePlyrLayoutContext(), muteText = usePlyrLayoutWord("Mute"), unmuteText = usePlyrLayoutWord("Unmute");
  return slot(
    "muteButton",
    /* @__PURE__ */ React.createElement(MuteButton, { className: "plyr__control", "data-no-label": true, "data-plyr": "mute" }, /* @__PURE__ */ React.createElement(Icons.Muted, { className: "icon--pressed" }), /* @__PURE__ */ React.createElement(Icons.Volume, { className: "icon--not-pressed" }), /* @__PURE__ */ React.createElement("span", { className: "label--pressed plyr__tooltip" }, unmuteText), /* @__PURE__ */ React.createElement("span", { className: "label--not-pressed plyr__tooltip" }, muteText))
  );
}
PlyrMuteButton.displayName = "PlyrMuteButton";
function PlyrPlayButton() {
  const { icons: Icons } = usePlyrLayoutContext(), playText = usePlyrLayoutWord("Play"), pauseText = usePlyrLayoutWord("Pause");
  return slot(
    "playButton",
    /* @__PURE__ */ React.createElement(PlayButton, { className: "plyr__controls__item plyr__control", "data-no-label": true, "data-plyr": "play" }, /* @__PURE__ */ React.createElement(Icons.Pause, { className: "icon--pressed" }), /* @__PURE__ */ React.createElement(Icons.Play, { className: "icon--not-pressed" }), /* @__PURE__ */ React.createElement("span", { className: "label--pressed plyr__tooltip" }, pauseText), /* @__PURE__ */ React.createElement("span", { className: "label--not-pressed plyr__tooltip" }, playText))
  );
}
PlyrPlayButton.displayName = "PlyrPlayButton";
function PlyrRestartButton() {
  const { icons: Icons } = usePlyrLayoutContext(), restartText = usePlyrLayoutWord("Restart"), remote = useMediaRemote();
  function onPress({ nativeEvent: event }) {
    if (isKeyboardEvent(event) && !isKeyboardClick(event))
      return;
    remote.seek(0, event);
  }
  return slot(
    "restartButton",
    /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "plyr__control",
        "data-plyr": "restart",
        onPointerUp: onPress,
        onKeyDown: onPress
      },
      /* @__PURE__ */ React.createElement("slot", { name: "restart-icon", "data-class": "" }),
      /* @__PURE__ */ React.createElement(Icons.Restart, null),
      /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, restartText)
    )
  );
}
PlyrRestartButton.displayName = "PlyrRestartButton";
function PlyrFastForwardButton() {
  const { icons: Icons, seekTime } = usePlyrLayoutContext(), forwardText = usePlyrLayoutWord("Forward"), label = `${forwardText} ${seekTime}s`;
  return slot(
    "fastForwardButton",
    /* @__PURE__ */ React.createElement(
      SeekButton,
      {
        className: "plyr__controls__item plyr__control",
        seconds: seekTime,
        "data-no-label": true,
        "data-plyr": "fast-forward"
      },
      /* @__PURE__ */ React.createElement(Icons.FastForward, null),
      /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, label)
    )
  );
}
PlyrFastForwardButton.displayName = "PlyrFastForwardButton";
function PlyrRewindButton() {
  const { icons: Icons, seekTime } = usePlyrLayoutContext(), rewindText = usePlyrLayoutWord("Rewind"), label = `${rewindText} ${seekTime}s`;
  return slot(
    "rewindButton",
    /* @__PURE__ */ React.createElement(
      SeekButton,
      {
        className: "plyr__controls__item plyr__control",
        seconds: -1 * seekTime,
        "data-no-label": true,
        "data-plyr": "rewind"
      },
      /* @__PURE__ */ React.createElement(Icons.Rewind, null),
      /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, label)
    )
  );
}
PlyrRewindButton.displayName = "PlyrRewindButton";
function PlyrTimeSlider() {
  const { markers, thumbnails, seekTime, previewTime } = usePlyrLayoutContext(), $src = useMediaState("source"), $duration = useMediaState("duration"), seekText = usePlyrLayoutWord("Seek"), [activeMarker, setActiveMarker] = React.useState(null), $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail), $hasRemotionSliderThumbnail = $RemotionSliderThumbnail && isRemotionSrc($src);
  function onSeekingRequest(time) {
    previewTime.set(time);
  }
  function onMarkerEnter() {
    setActiveMarker(this);
  }
  function onMarkerLeave() {
    setActiveMarker(null);
  }
  const markerLabel = activeMarker ? /* @__PURE__ */ React.createElement(
    "span",
    {
      className: "plyr__progress__marker-label",
      dangerouslySetInnerHTML: { __html: activeMarker.label + "<br />" }
    }
  ) : null;
  return slot(
    "timeSlider",
    /* @__PURE__ */ React.createElement("div", { className: "plyr__controls__item plyr__progress__container" }, /* @__PURE__ */ React.createElement("div", { className: "plyr__progress" }, /* @__PURE__ */ React.createElement(
      Root$1,
      {
        className: "plyr__slider",
        pauseWhileDragging: true,
        keyStep: seekTime,
        "aria-label": seekText,
        "data-plyr": "seek",
        onMediaSeekingRequest: onSeekingRequest
      },
      /* @__PURE__ */ React.createElement("div", { className: "plyr__slider__track" }),
      /* @__PURE__ */ React.createElement("div", { className: "plyr__slider__thumb" }),
      /* @__PURE__ */ React.createElement("div", { className: "plyr__slider__buffer" }),
      !thumbnails && !$hasRemotionSliderThumbnail ? /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, markerLabel, /* @__PURE__ */ React.createElement(Value, null)) : $hasRemotionSliderThumbnail ? /* @__PURE__ */ React.createElement(Preview, { className: "plyr__slider__preview" }, /* @__PURE__ */ React.createElement("div", { className: "plyr__slider__preview__thumbnail" }, /* @__PURE__ */ React.createElement("span", { className: "plyr__slider__preview__time-container" }, markerLabel, /* @__PURE__ */ React.createElement(Value, { className: "plyr__slider__preview__time" })), /* @__PURE__ */ React.createElement($RemotionSliderThumbnail, { className: "plyr__slider__preview__thumbnail" }))) : /* @__PURE__ */ React.createElement(Preview, { className: "plyr__slider__preview" }, /* @__PURE__ */ React.createElement(
        Thumbnail.Root,
        {
          src: thumbnails,
          className: "plyr__slider__preview__thumbnail"
        },
        /* @__PURE__ */ React.createElement("span", { className: "plyr__slider__preview__time-container" }, markerLabel, /* @__PURE__ */ React.createElement(Value, { className: "plyr__slider__preview__time" })),
        /* @__PURE__ */ React.createElement(Thumbnail.Img, null)
      )),
      markers && Number.isFinite($duration) ? markers.map((marker, i) => /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement(Root$4, { className: "plyr__slider", "data-plyr": "volume", "aria-label": volumeText }, /* @__PURE__ */ React.createElement("div", { className: "plyr__slider__track" }), /* @__PURE__ */ React.createElement("div", { className: "plyr__slider__thumb" }))
  );
}
PlyrVolumeSlider.displayName = "PlyrVolumeSlider";
function PlyrVolume({ type }) {
  const hasMuteButton = type === "mute" || type === "mute+volume", hasVolumeSlider = type === "volume" || type === "mute+volume";
  return /* @__PURE__ */ React.createElement("div", { className: "plyr__controls__item plyr__volume" }, hasMuteButton ? /* @__PURE__ */ React.createElement(PlyrMuteButton, null) : null, hasVolumeSlider ? /* @__PURE__ */ React.createElement(PlyrVolumeSlider, null) : null);
}
PlyrVolume.displayName = "PlyrVolume";
function PlyrCurrentTime() {
  const { invertTime, toggleTime, displayDuration } = usePlyrLayoutContext(), $streamType = useMediaState("streamType"), currentTimeText = usePlyrLayoutWord("Current time"), liveText = usePlyrLayoutWord("LIVE"), [invert, setInvert] = React.useState(invertTime), remainder = !displayDuration && invert;
  function onPress({ nativeEvent: event }) {
    if (!toggleTime || displayDuration || isKeyboardEvent(event) && !isKeyboardClick(event)) {
      return;
    }
    setInvert((n) => !n);
  }
  return slot(
    "currentTime",
    $streamType === "live" || $streamType === "ll-live" ? /* @__PURE__ */ React.createElement(LiveButton, { className: "plyr__controls__item plyr__control plyr__live-button", "data-plyr": "live" }, /* @__PURE__ */ React.createElement("span", { className: "plyr__live-button__text" }, liveText)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
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
    ), displayDuration ? /* @__PURE__ */ React.createElement(PlyrDuration, null) : null)
  );
}
PlyrCurrentTime.displayName = "PlyrCurrentTime";
function PlyrDuration() {
  const durationText = usePlyrLayoutWord("Duration");
  return slot(
    "duration",
    /* @__PURE__ */ React.createElement(
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
    file ? /* @__PURE__ */ React.createElement(
      "a",
      {
        className: "plyr__controls__item plyr__control",
        href: file.url + `?download=${file.name}`,
        download: file.name,
        target: "_blank"
      },
      /* @__PURE__ */ React.createElement("slot", { name: "download-icon" }),
      /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, downloadText)
    ) : null
  );
}
PlyrDownloadButton.displayName = "PlyrDownloadButton";
function PlyrGestures() {
  const { clickToPlay, clickToFullscreen } = usePlyrLayoutContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, clickToPlay ? /* @__PURE__ */ React.createElement(Gesture, { className: "plyr__gesture", event: "pointerup", action: "toggle:paused" }) : null, clickToFullscreen ? /* @__PURE__ */ React.createElement(Gesture, { className: "plyr__gesture", event: "dblpointerup", action: "toggle:fullscreen" }) : null);
}
PlyrGestures.displayName = "PlyrGestures";
function PlyrCaptions() {
  const $track = useMediaState("textTrack"), [activeCue, setActiveCue] = React.useState(null);
  React.useEffect(() => {
    if (!$track)
      return;
    function onCueChange() {
      setActiveCue($track ? $track.activeCues[0] : null);
    }
    onCueChange();
    return listenEvent($track, "cue-change", onCueChange);
  }, [$track]);
  return /* @__PURE__ */ React.createElement("div", { className: "plyr__captions", dir: "auto" }, /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement("div", { className: "plyr__controls__item plyr__menu" }, /* @__PURE__ */ React.createElement(Root$2, null, /* @__PURE__ */ React.createElement(Button, { className: "plyr__control", "data-plyr": "settings" }, slot(
      "settingsButton",
      /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icons.Settings, null), /* @__PURE__ */ React.createElement("span", { className: "plyr__tooltip" }, settingsText))
    )), /* @__PURE__ */ React.createElement(Items, { className: "plyr__menu__container", placement: "top end" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, slot(
      "settingsMenu",
      /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PlyrAudioMenu, null), /* @__PURE__ */ React.createElement(PlyrCaptionsMenu, null), /* @__PURE__ */ React.createElement(PlyrQualityMenu, null), /* @__PURE__ */ React.createElement(PlyrSpeedMenu, null))
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
  return /* @__PURE__ */ React.createElement(
    Button,
    {
      className: `plyr__control plyr__control--${open ? "back" : "forward"}`,
      "data-plyr": "settings",
      disabled
    },
    /* @__PURE__ */ React.createElement("span", { className: "plyr__menu__label", "aria-hidden": open ? "true" : void 0 }, buttonText),
    hint ? /* @__PURE__ */ React.createElement("span", { className: "plyr__menu__value" }, hint) : null,
    open ? /* @__PURE__ */ React.createElement("span", { className: "plyr__sr-only" }, goBackText) : null
  );
}
PlyrMenuButton.displayName = "PlyrMenuButton";
function PlyrMenu({
  label,
  hint,
  children,
  disabled
}) {
  const [open, setOpen] = React.useState(false);
  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }
  return /* @__PURE__ */ React.createElement(Root$2, { onOpen, onClose }, /* @__PURE__ */ React.createElement(PlyrMenuButton, { label, open, hint, disabled }), /* @__PURE__ */ React.createElement(Items, null, children));
}
PlyrMenu.displayName = "PlyrMenu";
function PlyrAudioMenu() {
  const defaultText = usePlyrLayoutWord("Default"), $track = useMediaState("audioTrack"), options = useAudioOptions();
  return /* @__PURE__ */ React.createElement(PlyrMenu, { label: "Audio", hint: $track?.label ?? defaultText, disabled: options.disabled }, /* @__PURE__ */ React.createElement(Root$3, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React.createElement("span", null, label)))));
}
PlyrAudioMenu.displayName = "PlyrAudioMenu";
function PlyrSpeedMenu() {
  const normalLabel = usePlyrLayoutWord("Normal"), options = usePlaybackRateOptions({ normalLabel }), hint = options.selectedValue === "1" ? normalLabel : options.selectedValue + "x";
  return /* @__PURE__ */ React.createElement(PlyrMenu, { label: "Speed", hint, disabled: options.disabled }, /* @__PURE__ */ React.createElement(Root$3, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React.createElement("span", null, label)))));
}
PlyrSpeedMenu.displayName = "PlyrSpeedMenu";
function PlyrCaptionsMenu() {
  const offText = usePlyrLayoutWord("Disabled"), options = useCaptionOptions({ off: offText }), hint = options.selectedTrack?.label ?? offText;
  return /* @__PURE__ */ React.createElement(PlyrMenu, { label: "Captions", hint, disabled: options.disabled }, /* @__PURE__ */ React.createElement(Root$3, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React.createElement("span", null, label)))));
}
PlyrCaptionsMenu.displayName = "PlyrCaptionsMenu";
function PlyrQualityMenu() {
  const autoText = usePlyrLayoutWord("Auto"), options = useVideoQualityOptions({ auto: autoText, sort: "descending" }), currentQuality = options.selectedQuality?.height, hint = options.selectedValue !== "auto" && currentQuality ? `${currentQuality}p` : `${autoText}${currentQuality ? ` (${currentQuality}p)` : ""}`;
  return /* @__PURE__ */ React.createElement(PlyrMenu, { label: "Quality", hint, disabled: options.disabled }, /* @__PURE__ */ React.createElement(Root$3, { value: options.selectedValue }, options.map(({ label, value, select }) => /* @__PURE__ */ React.createElement(Item, { className: "plyr__control", value, onSelect: select, key: value }, /* @__PURE__ */ React.createElement("span", null, label)))));
}
PlyrQualityMenu.displayName = "PlyrQualityMenu";

export { PlyrAudioLayout, PlyrLayout, PlyrLayoutContext, PlyrVideoLayout, i18n, usePlyrLayoutContext, usePlyrLayoutWord };
