"use client";

import {
  useMediaRemote,
  usePlaybackRateOptions,
  useVideoQualityOptions
} from "./chunks/vidstack-RFPF45PN.js";
import {
  Captions,
  ChapterTitle,
  GoogleCastButton,
  MediaAnnouncer,
  Title,
  audio_gain_slider_exports,
  controls_exports,
  createSignal,
  quality_slider_exports,
  speed_slider_exports,
  spinner_exports,
  tooltip_exports,
  useActiveTextCues,
  useActiveTextTrack,
  useChapterOptions,
  useChapterTitle,
  useScoped,
  useTextCues
} from "./chunks/vidstack-XGHTGAXV.js";
import {
  AirPlayButton,
  CaptionButton,
  FullscreenButton,
  Gesture,
  LiveButton,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  Time,
  menu_exports,
  radio_group_exports,
  slider_exports,
  thumbnail_exports,
  time_slider_exports,
  useAudioOptions,
  useCaptionOptions,
  useMediaContext,
  useMediaPlayer,
  volume_slider_exports
} from "./chunks/vidstack-3JZFNLQ7.js";
import {
  useSliderState,
  useSliderStore
} from "./chunks/vidstack-M2U4INQ4.js";
import {
  AirPlayButtonInstance,
  AudioGainSliderInstance,
  CaptionButtonInstance,
  CaptionsInstance,
  ControlsGroupInstance,
  ControlsInstance,
  FullscreenButtonInstance,
  GestureInstance,
  GoogleCastButtonInstance,
  LiveButtonInstance,
  MediaAnnouncerInstance,
  MediaPlayerInstance,
  MediaProviderInstance,
  MenuButtonInstance,
  MenuInstance,
  MenuItemInstance,
  MenuItemsInstance,
  MenuPortalInstance,
  MuteButtonInstance,
  PIPButtonInstance,
  PlayButtonInstance,
  PosterInstance,
  Primitive,
  QualitySliderInstance,
  RadioGroupInstance,
  RadioInstance,
  SeekButtonInstance,
  SliderChaptersInstance,
  SliderInstance,
  SliderPreviewInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  SpeedSliderInstance,
  ThumbnailInstance,
  TimeInstance,
  TimeSliderInstance,
  ToggleButtonInstance,
  TooltipContentInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  VolumeSliderInstance,
  useMediaState,
  useMediaStore
} from "./chunks/vidstack-MS2S7JW7.js";
import {
  ARIAKeyShortcuts,
  AudioProviderLoader,
  AudioTrackList,
  DASHProviderLoader,
  DEFAULT_AUDIO_GAINS,
  DEFAULT_PLAYBACK_RATES,
  FullscreenController,
  HLSProviderLoader,
  LibASSTextRenderer,
  List,
  LocalMediaStorage,
  Logger,
  MEDIA_KEY_SHORTCUTS,
  MediaControls,
  MediaRemoteControl,
  ScreenOrientationController,
  TextRenderers,
  TextTrackList,
  ThumbnailsLoader,
  VideoProviderLoader,
  VideoQualityList,
  VimeoProviderLoader,
  YouTubeProviderLoader,
  canFullscreen,
  formatSpokenTime,
  formatTime,
  isAudioProvider,
  isDASHProvider,
  isGoogleCastProvider,
  isHLSProvider,
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLMediaElement,
  isHTMLVideoElement,
  isRemotionProvider,
  isVideoProvider,
  isVideoQualitySrc,
  isVimeoProvider,
  isYouTubeProvider,
  mediaContext,
  mediaState,
  sliderState,
  softResetMediaState,
  sortVideoQualities,
  updateSliderPreviewPlacement
} from "./chunks/vidstack-DYAEZIDU.js";
import "./chunks/vidstack-GOXJCRXV.js";
import "./chunks/vidstack-N3DBVVNQ.js";
import {
  TextTrack,
  findActiveCue,
  isCueActive,
  isTrackCaptionKind,
  parseJSONCaptionsFile,
  watchActiveTextTrack,
  watchCueTextChange
} from "./chunks/vidstack-O4WMABMP.js";
import {
  getDownloadFile
} from "./chunks/vidstack-DQWSDQKN.js";
import "./chunks/vidstack-YIOQVQ2N.js";
import {
  TimeRange,
  getTimeRangesEnd,
  getTimeRangesStart,
  normalizeTimeIntervals,
  updateTimeIntervals
} from "./chunks/vidstack-PKS56VNA.js";
import {
  Icon
} from "./chunks/vidstack-VNXLFDV7.js";
import {
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  DASH_VIDEO_EXTENSIONS,
  DASH_VIDEO_TYPES,
  HLS_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  canChangeVolume,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayHLSNatively,
  canRotateScreen,
  canUsePictureInPicture,
  canUseVideoPresentation,
  isAudioSrc,
  isDASHSrc,
  isHLSSrc,
  isMediaStream,
  isVideoSrc
} from "./chunks/vidstack-HLIA5IIR.js";
import "./chunks/vidstack-B2HNNR5Q.js";
import "./chunks/vidstack-SN6ZVKJG.js";
import {
  appendTriggerEvent,
  composeRefs,
  createReactComponent,
  effect,
  findTriggerEvent,
  hasTriggerEvent,
  isKeyboardClick,
  isKeyboardEvent,
  isPointerEvent,
  isString,
  listenEvent,
  signal,
  useReactScope,
  useSignal,
  useSignalRecord,
  useStateContext,
  walkTriggerEventChain
} from "./chunks/vidstack-3R7QJDRC.js";
import {
  __export
} from "./chunks/vidstack-WBT4TVVV.js";

// src/components/player.tsx
import * as React from "react";

// src/components/player-callbacks.ts
var playerCallbacks = [
  "onAbort",
  "onAudioTrackChange",
  "onAudioTracksChange",
  "onAutoPlay",
  "onAutoPlayChange",
  "onAutoPlayFail",
  "onCanLoad",
  "onCanPlay",
  "onCanPlayThrough",
  "onControlsChange",
  "onDestroy",
  "onDurationChange",
  "onEmptied",
  "onEnd",
  "onEnded",
  "onError",
  "onFindMediaPlayer",
  "onFullscreenChange",
  "onFullscreenError",
  "onLiveChange",
  "onLiveEdgeChange",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onLoopChange",
  "onOrientationChange",
  "onPause",
  "onPictureInPictureChange",
  "onPictureInPictureError",
  "onPlay",
  "onPlayFail",
  "onPlaying",
  "onPlaysInlineChange",
  "onPosterChange",
  "onProgress",
  "onProviderChange",
  "onProviderLoaderChange",
  "onProviderSetup",
  "onQualitiesChange",
  "onQualityChange",
  "onRateChange",
  "onReplay",
  "onSeeked",
  "onSeeking",
  "onSourceChange",
  "onSourceChange",
  "onStalled",
  "onStarted",
  "onStreamTypeChange",
  "onSuspend",
  "onTextTrackChange",
  "onTextTracksChange",
  "onTimeUpdate",
  "onTitleChange",
  "onVdsLog",
  "onVideoPresentationChange",
  "onVolumeChange",
  "onWaiting"
];

// src/components/player.tsx
var MediaPlayerBridge = createReactComponent(MediaPlayerInstance, {
  events: playerCallbacks,
  eventsRegex: /^onHls/,
  domEventsRegex: /^onMedia/
});
var MediaPlayer = React.forwardRef(
  ({ aspectRatio, children, ...props }, forwardRef6) => {
    return /* @__PURE__ */ React.createElement(
      MediaPlayerBridge,
      {
        ...props,
        src: props.src,
        ref: forwardRef6,
        style: {
          aspectRatio,
          ...props.style
        }
      },
      (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children)
    );
  }
);
MediaPlayer.displayName = "MediaPlayer";

// src/components/provider.tsx
import * as React2 from "react";
var MediaProviderBridge = createReactComponent(MediaProviderInstance);
var MediaProvider = React2.forwardRef(
  ({ loaders = [], children, iframeProps, mediaProps, ...props }, forwardRef6) => {
    const reactLoaders = React2.useMemo(() => loaders.map((Loader) => new Loader()), loaders);
    return /* @__PURE__ */ React2.createElement(MediaProviderBridge, { ...props, loaders: reactLoaders, ref: forwardRef6 }, (props2, instance) => /* @__PURE__ */ React2.createElement("div", { ...props2 }, /* @__PURE__ */ React2.createElement(MediaOutlet, { provider: instance, mediaProps, iframeProps }), children));
  }
);
MediaProvider.displayName = "MediaProvider";
function MediaOutlet({ provider, mediaProps, iframeProps }) {
  const { sources, crossOrigin, poster, remotePlaybackInfo, nativeControls, viewType } = useStateContext(mediaState), { loader } = provider.$state, { $provider: $$provider, $providerSetup: $$providerSetup } = useMediaContext(), $sources = useSignal(sources), $nativeControls = useSignal(nativeControls), $crossOrigin = useSignal(crossOrigin), $poster = useSignal(poster), $loader = useSignal(loader), $provider = useSignal($$provider), $providerSetup = useSignal($$providerSetup), $remoteInfo = useSignal(remotePlaybackInfo), $mediaType = $loader?.mediaType(), $viewType = useSignal(viewType), isAudioView = $viewType === "audio", isYouTubeEmbed = $loader?.name === "youtube", isVimeoEmbed = $loader?.name === "vimeo", isEmbed = isYouTubeEmbed || isVimeoEmbed, isRemotion = $loader?.name === "remotion", isGoogleCast = $loader?.name === "google-cast", [googleCastIconPaths, setGoogleCastIconPaths] = React2.useState(""), [hasMounted, setHasMounted] = React2.useState(false);
  React2.useEffect(() => {
    if (!isGoogleCast || googleCastIconPaths) return;
    import("media-icons/dist/icons/chromecast.js").then((mod) => {
      setGoogleCastIconPaths(mod.default);
    });
  }, [isGoogleCast]);
  React2.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (isGoogleCast) {
    return /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: "vds-google-cast",
        ref: (el) => {
          provider.load(el);
        }
      },
      /* @__PURE__ */ React2.createElement(Icon, { paths: googleCastIconPaths }),
      $remoteInfo?.deviceName ? /* @__PURE__ */ React2.createElement("span", { className: "vds-google-cast-info" }, "Google Cast on", " ", /* @__PURE__ */ React2.createElement("span", { className: "vds-google-cast-device-name" }, $remoteInfo.deviceName)) : null
    );
  }
  if (isRemotion) {
    return /* @__PURE__ */ React2.createElement("div", { "data-remotion-canvas": true }, /* @__PURE__ */ React2.createElement(
      "div",
      {
        "data-remotion-container": true,
        ref: (el) => {
          provider.load(el);
        }
      },
      isRemotionProvider($provider) && $providerSetup ? React2.createElement($provider.render) : null
    ));
  }
  return isEmbed ? React2.createElement(
    React2.Fragment,
    null,
    React2.createElement("iframe", {
      ...iframeProps,
      className: (iframeProps?.className ? `${iframeProps.className} ` : "") + isYouTubeEmbed ? "vds-youtube" : "vds-vimeo",
      suppressHydrationWarning: true,
      tabIndex: !$nativeControls ? -1 : void 0,
      "aria-hidden": "true",
      "data-no-controls": !$nativeControls ? "" : void 0,
      ref(el) {
        provider.load(el);
      }
    }),
    !$nativeControls && !isAudioView ? React2.createElement("div", { className: "vds-blocker" }) : null
  ) : $mediaType ? React2.createElement($mediaType === "audio" ? "audio" : "video", {
    ...mediaProps,
    controls: $nativeControls ? true : null,
    crossOrigin: typeof $crossOrigin === "boolean" ? "" : $crossOrigin,
    poster: $mediaType === "video" && $nativeControls && $poster ? $poster : null,
    suppressHydrationWarning: true,
    children: !hasMounted ? $sources.map(
      ({ src, type }) => isString(src) ? /* @__PURE__ */ React2.createElement("source", { src, type: type !== "?" ? type : void 0, key: src }) : null
    ) : null,
    ref(el) {
      provider.load(el);
    }
  }) : null;
}
MediaOutlet.displayName = "MediaOutlet";

// src/hooks/create-text-track.ts
import * as React3 from "react";
function createTextTrack(init) {
  const media = useMediaContext(), track = React3.useMemo(() => new TextTrack(init), Object.values(init));
  React3.useEffect(() => {
    media.textTracks.add(track);
    return () => void media.textTracks.remove(track);
  }, [track]);
  return track;
}

// src/components/text-track.tsx
function Track({ lang, ...props }) {
  createTextTrack({ language: lang, ...props });
  return null;
}
Track.displayName = "Track";

// src/components/ui/buttons/toggle-button.tsx
import * as React4 from "react";
var ToggleButtonBridge = createReactComponent(ToggleButtonInstance);
var ToggleButton = React4.forwardRef(
  ({ children, ...props }, forwardRef6) => {
    return /* @__PURE__ */ React4.createElement(ToggleButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React4.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef6)
      },
      children
    ));
  }
);
ToggleButton.displayName = "ToggleButton";

// src/components/ui/poster.tsx
import * as React5 from "react";
var PosterBridge = createReactComponent(PosterInstance);
var Poster = React5.forwardRef(
  ({ children, ...props }, forwardRef6) => {
    return /* @__PURE__ */ React5.createElement(
      PosterBridge,
      {
        src: props.asChild && React5.isValidElement(children) ? children.props.src : void 0,
        ...props
      },
      (props2, instance) => /* @__PURE__ */ React5.createElement(
        PosterImg,
        {
          ...props2,
          instance,
          ref: composeRefs(props2.ref, forwardRef6)
        },
        children
      )
    );
  }
);
Poster.displayName = "Poster";
var PosterImg = React5.forwardRef(
  ({ instance, children, ...props }, forwardRef6) => {
    const { src, img, alt, crossOrigin, hidden } = instance.$state, $src = useSignal(src), $alt = useSignal(alt), $crossOrigin = useSignal(crossOrigin), $hidden = useSignal(hidden);
    return /* @__PURE__ */ React5.createElement(
      Primitive.img,
      {
        ...props,
        src: $src || void 0,
        alt: $alt || void 0,
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(img.set, forwardRef6),
        style: { display: $hidden ? "none" : void 0 }
      },
      children
    );
  }
);
PosterImg.displayName = "PosterImg";

// src/components/ui/caption.tsx
var caption_exports = {};
__export(caption_exports, {
  Root: () => Root,
  Text: () => Text
});
import * as React6 from "react";
var Root = React6.forwardRef(({ children, ...props }, forwardRef6) => {
  return /* @__PURE__ */ React6.createElement(
    Primitive.div,
    {
      translate: "yes",
      "aria-live": "off",
      "aria-atomic": "true",
      ...props,
      ref: forwardRef6
    },
    children
  );
});
Root.displayName = "Caption";
var Text = React6.forwardRef((props, forwardRef6) => {
  const textTrack = useMediaState("textTrack"), [activeCue, setActiveCue] = React6.useState();
  React6.useEffect(() => {
    if (!textTrack) return;
    function onCueChange() {
      setActiveCue(textTrack?.activeCues[0]);
    }
    textTrack.addEventListener("cue-change", onCueChange);
    return () => {
      textTrack.removeEventListener("cue-change", onCueChange);
      setActiveCue(void 0);
    };
  }, [textTrack]);
  return /* @__PURE__ */ React6.createElement(
    Primitive.span,
    {
      ...props,
      "data-part": "cue",
      dangerouslySetInnerHTML: {
        __html: activeCue?.text || ""
      },
      ref: forwardRef6
    }
  );
});
Text.displayName = "CaptionText";

// src/hooks/use-state.ts
import * as React7 from "react";
function useState3(ctor, prop, ref) {
  const initialValue = React7.useMemo(() => ctor.state.record[prop], [ctor, prop]);
  return useSignal(ref.current ? ref.current.$state[prop] : initialValue);
}
var storesCache = /* @__PURE__ */ new Map();
function useStore(ctor, ref) {
  const initialStore = React7.useMemo(() => {
    let store = storesCache.get(ctor);
    if (!store) {
      store = new Proxy(ctor.state.record, {
        get: (_, prop) => () => ctor.state.record[prop]
      });
      storesCache.set(ctor, store);
    }
    return store;
  }, [ctor]);
  return useSignalRecord(ref.current ? ref.current.$state : initialStore);
}

// src/hooks/use-media-provider.ts
import * as React8 from "react";
function useMediaProvider() {
  const [provider, setProvider] = React8.useState(null), context = useMediaContext();
  if (!context) {
    throw Error(
      "[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?"
    );
  }
  React8.useEffect(() => {
    if (!context) return;
    return effect(() => {
      setProvider(context.$provider());
    });
  }, []);
  return provider;
}

// src/hooks/use-thumbnails.ts
import * as React9 from "react";
function useThumbnails(src, crossOrigin = null) {
  const scope = useReactScope(), $src = createSignal(src), $crossOrigin = createSignal(crossOrigin), loader = useScoped(() => ThumbnailsLoader.create($src, $crossOrigin));
  if (!scope) {
    console.warn(
      `[vidstack] \`useThumbnails\` must be called inside a child component of \`<MediaPlayer>\``
    );
  }
  React9.useEffect(() => {
    $src.set(src);
  }, [src]);
  React9.useEffect(() => {
    $crossOrigin.set(crossOrigin);
  }, [crossOrigin]);
  return useSignal(loader.$images);
}
function useActiveThumbnail(thumbnails, time) {
  return React9.useMemo(() => {
    let activeIndex = -1;
    for (let i = thumbnails.length - 1; i >= 0; i--) {
      const image = thumbnails[i];
      if (time >= image.startTime && (!image.endTime || time < image.endTime)) {
        activeIndex = i;
        break;
      }
    }
    return thumbnails[activeIndex] || null;
  }, [thumbnails, time]);
}

// src/hooks/use-slider-preview.ts
import * as React10 from "react";
function useSliderPreview({
  clamp = false,
  offset = 0,
  orientation = "horizontal"
} = {}) {
  const [rootRef, setRootRef] = React10.useState(null), [previewRef, setPreviewRef] = React10.useState(null), [pointerValue, setPointerValue] = React10.useState(0), [isVisible, setIsVisible] = React10.useState(false);
  React10.useEffect(() => {
    if (!rootRef) return;
    const dragging = signal(false);
    function updatePointerValue(event) {
      if (!rootRef) return;
      setPointerValue(getPointerValue(rootRef, event, orientation));
    }
    return effect(() => {
      if (!dragging()) {
        listenEvent(rootRef, "pointerenter", () => {
          setIsVisible(true);
          previewRef?.setAttribute("data-visible", "");
        });
        listenEvent(rootRef, "pointerdown", (event) => {
          dragging.set(true);
          updatePointerValue(event);
        });
        listenEvent(rootRef, "pointerleave", () => {
          setIsVisible(false);
          previewRef?.removeAttribute("data-visible");
        });
        listenEvent(rootRef, "pointermove", (event) => {
          updatePointerValue(event);
        });
        return;
      }
      previewRef?.setAttribute("data-dragging", "");
      listenEvent(document, "pointerup", (event) => {
        dragging.set(false);
        previewRef?.removeAttribute("data-dragging");
        updatePointerValue(event);
      });
      listenEvent(document, "pointermove", (event) => {
        updatePointerValue(event);
      });
      listenEvent(document, "touchmove", (e) => e.preventDefault(), {
        passive: false
      });
    });
  }, [rootRef]);
  React10.useEffect(() => {
    if (previewRef) {
      previewRef.style.setProperty("--slider-pointer", pointerValue + "%");
    }
  }, [previewRef, pointerValue]);
  React10.useEffect(() => {
    if (!previewRef) return;
    const update = () => {
      updateSliderPreviewPlacement(previewRef, {
        offset,
        clamp,
        orientation
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(previewRef);
    return () => resize.disconnect();
  }, [previewRef, clamp, offset, orientation]);
  return {
    previewRootRef: setRootRef,
    previewRef: setPreviewRef,
    previewValue: pointerValue,
    isPreviewVisible: isVisible
  };
}
function getPointerValue(root, event, orientation) {
  let thumbPositionRate, rect = root.getBoundingClientRect();
  if (orientation === "vertical") {
    const { bottom: trackBottom, height: trackHeight } = rect;
    thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
  } else {
    const { left: trackLeft, width: trackWidth } = rect;
    thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
  }
  return round(Math.max(0, Math.min(100, 100 * thumbPositionRate)));
}
function round(num) {
  return Number(num.toFixed(3));
}

// src/hooks/options/use-audio-gain-options.ts
import * as React11 from "react";
function useAudioGainOptions({
  gains = DEFAULT_AUDIO_GAINS,
  disabledLabel = "disabled"
} = {}) {
  const media = useMediaContext(), { audioGain, canSetAudioGain } = media.$state;
  useSignal(audioGain);
  useSignal(canSetAudioGain);
  return React11.useMemo(() => {
    const options = gains.map((opt) => {
      const label = typeof opt === "number" ? opt === 1 && disabledLabel ? disabledLabel : opt * 100 + "%" : opt.label, gain = typeof opt === "number" ? opt : opt.gain;
      return {
        label,
        value: gain.toString(),
        gain,
        get selected() {
          return audioGain() === gain;
        },
        select(trigger) {
          media.remote.changeAudioGain(gain, trigger);
        }
      };
    });
    Object.defineProperty(options, "disabled", {
      get() {
        return !canSetAudioGain() || !options.length;
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        return audioGain()?.toString();
      }
    });
    return options;
  }, [gains]);
}
export {
  ARIAKeyShortcuts,
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  AirPlayButton,
  AirPlayButtonInstance,
  audio_gain_slider_exports as AudioGainSlider,
  AudioGainSliderInstance,
  AudioProviderLoader,
  AudioTrackList,
  caption_exports as Caption,
  CaptionButton,
  CaptionButtonInstance,
  Captions,
  CaptionsInstance,
  ChapterTitle,
  controls_exports as Controls,
  ControlsGroupInstance,
  ControlsInstance,
  DASHProviderLoader,
  DASH_VIDEO_EXTENSIONS,
  DASH_VIDEO_TYPES,
  DEFAULT_AUDIO_GAINS,
  DEFAULT_PLAYBACK_RATES,
  FullscreenButton,
  FullscreenButtonInstance,
  FullscreenController,
  Gesture,
  GestureInstance,
  GoogleCastButton,
  GoogleCastButtonInstance,
  HLSProviderLoader,
  HLS_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  Icon,
  LibASSTextRenderer,
  List,
  LiveButton,
  LiveButtonInstance,
  LocalMediaStorage,
  Logger,
  MEDIA_KEY_SHORTCUTS,
  MediaAnnouncer,
  MediaAnnouncerInstance,
  MediaControls,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderInstance,
  MediaRemoteControl,
  menu_exports as Menu,
  MenuButtonInstance,
  MenuInstance,
  MenuItemInstance,
  MenuItemsInstance,
  MenuPortalInstance,
  MuteButton,
  MuteButtonInstance,
  PIPButton,
  PIPButtonInstance,
  PlayButton,
  PlayButtonInstance,
  Poster,
  PosterInstance,
  quality_slider_exports as QualitySlider,
  QualitySliderInstance,
  radio_group_exports as RadioGroup,
  RadioGroupInstance,
  RadioInstance,
  ScreenOrientationController,
  SeekButton,
  SeekButtonInstance,
  slider_exports as Slider,
  SliderChaptersInstance,
  SliderInstance,
  SliderPreviewInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  speed_slider_exports as SpeedSlider,
  SpeedSliderInstance,
  spinner_exports as Spinner,
  TextRenderers,
  TextTrack,
  TextTrackList,
  thumbnail_exports as Thumbnail,
  ThumbnailInstance,
  Time,
  TimeInstance,
  TimeRange,
  time_slider_exports as TimeSlider,
  TimeSliderInstance,
  Title,
  ToggleButton,
  ToggleButtonInstance,
  tooltip_exports as Tooltip,
  TooltipContentInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  Track,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  VideoProviderLoader,
  VideoQualityList,
  VimeoProviderLoader,
  volume_slider_exports as VolumeSlider,
  VolumeSliderInstance,
  YouTubeProviderLoader,
  appendTriggerEvent,
  canChangeVolume,
  canFullscreen,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayHLSNatively,
  canRotateScreen,
  canUsePictureInPicture,
  canUseVideoPresentation,
  createTextTrack,
  findActiveCue,
  findTriggerEvent,
  formatSpokenTime,
  formatTime,
  getDownloadFile,
  getTimeRangesEnd,
  getTimeRangesStart,
  hasTriggerEvent,
  isAudioProvider,
  isAudioSrc,
  isCueActive,
  isDASHProvider,
  isDASHSrc,
  isGoogleCastProvider,
  isHLSProvider,
  isHLSSrc,
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLMediaElement,
  isHTMLVideoElement,
  isKeyboardClick,
  isKeyboardEvent,
  isMediaStream,
  isPointerEvent,
  isTrackCaptionKind,
  isVideoProvider,
  isVideoQualitySrc,
  isVideoSrc,
  isVimeoProvider,
  isYouTubeProvider,
  mediaContext,
  mediaState,
  normalizeTimeIntervals,
  parseJSONCaptionsFile,
  sliderState,
  softResetMediaState,
  sortVideoQualities,
  updateTimeIntervals,
  useActiveTextCues,
  useActiveTextTrack,
  useActiveThumbnail,
  useAudioGainOptions,
  useAudioOptions,
  useCaptionOptions,
  useChapterOptions,
  useChapterTitle,
  useMediaContext,
  useMediaPlayer,
  useMediaProvider,
  useMediaRemote,
  useMediaState,
  useMediaStore,
  usePlaybackRateOptions,
  useSliderPreview,
  useSliderState,
  useSliderStore,
  useState3 as useState,
  useStore,
  useTextCues,
  useThumbnails,
  useVideoQualityOptions,
  walkTriggerEventChain,
  watchActiveTextTrack,
  watchCueTextChange
};
