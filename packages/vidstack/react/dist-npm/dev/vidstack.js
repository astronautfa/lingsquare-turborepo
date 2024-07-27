"use client"

import { TextTrackSymbol, Primitive, MediaPlayerInstance, isRemotionProvider, MediaProviderInstance, mediaState, TextTrack, ToggleButtonInstance, PosterInstance, useMediaState, ThumbnailsLoader, updateSliderPreviewPlacement, DEFAULT_AUDIO_GAINS } from './chunks/vidstack-Dw0Lpul5.js';
export { ARIAKeyShortcuts, AUDIO_EXTENSIONS, AUDIO_TYPES, AirPlayButtonInstance, AudioGainSliderInstance, AudioProviderLoader, AudioTrackList, CaptionButtonInstance, CaptionsInstance, ControlsGroupInstance, ControlsInstance, DASHProviderLoader, DASH_VIDEO_EXTENSIONS, DASH_VIDEO_TYPES, DEFAULT_PLAYBACK_RATES, FullscreenButtonInstance, FullscreenController, GestureInstance, GoogleCastButtonInstance, HLSProviderLoader, HLS_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, List, LiveButtonInstance, LocalMediaStorage, Logger, MEDIA_KEY_SHORTCUTS, MediaAnnouncerInstance, MediaControls, MediaRemoteControl, MenuButtonInstance, MenuInstance, MenuItemInstance, MenuItemsInstance, MenuPortalInstance, MuteButtonInstance, PIPButtonInstance, PlayButtonInstance, QualitySliderInstance, RadioGroupInstance, RadioInstance, ScreenOrientationController, SeekButtonInstance, SliderChaptersInstance, SliderInstance, SliderPreviewInstance, SliderThumbnailInstance, SliderValueInstance, SliderVideoInstance, SpeedSliderInstance, TextRenderers, TextTrackList, ThumbnailInstance, TimeInstance, TimeRange, TimeSliderInstance, TooltipContentInstance, TooltipInstance, TooltipTriggerInstance, VIDEO_EXTENSIONS, VIDEO_TYPES, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, VolumeSliderInstance, YouTubeProviderLoader, canChangeVolume, canFullscreen, canGoogleCastSrc, canOrientScreen, canPlayHLSNatively, canRotateScreen, canUsePictureInPicture, canUseVideoPresentation, findActiveCue, formatSpokenTime, formatTime, getDownloadFile, getTimeRangesEnd, getTimeRangesStart, isAudioProvider, isAudioSrc, isCueActive, isDASHProvider, isDASHSrc, isGoogleCastProvider, isHLSProvider, isHLSSrc, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isMediaStream, isTrackCaptionKind, isVideoProvider, isVideoQualitySrc, isVideoSrc, isVimeoProvider, isYouTubeProvider, mediaContext, normalizeTimeIntervals, parseJSONCaptionsFile, sliderState, softResetMediaState, sortVideoQualities, updateTimeIntervals, useMediaStore, useSliderState, useSliderStore, watchActiveTextTrack, watchCueTextChange } from './chunks/vidstack-Dw0Lpul5.js';
import { isString, listenEvent, DOMEvent, createReactComponent, useStateContext, useSignal, composeRefs, useSignalRecord, effect, useReactScope, signal } from './chunks/vidstack-3hs3-8i_.js';
export { appendTriggerEvent, findTriggerEvent, hasTriggerEvent, isKeyboardClick, isKeyboardEvent, isPointerEvent, walkTriggerEventChain } from './chunks/vidstack-3hs3-8i_.js';
import * as React from 'react';
import { createSignal, useScoped } from './chunks/vidstack-C6tT3cix.js';
export { audioGainSlider as AudioGainSlider, Captions, ChapterTitle, controls as Controls, GoogleCastButton, MediaAnnouncer, qualitySlider as QualitySlider, speedSlider as SpeedSlider, spinner as Spinner, Title, tooltip as Tooltip, useActiveTextCues, useActiveTextTrack, useChapterOptions, useChapterTitle, useTextCues } from './chunks/vidstack-C6tT3cix.js';
import { useMediaContext } from './chunks/vidstack-8ISOe38A.js';
export { AirPlayButton, CaptionButton, FullscreenButton, Gesture, LiveButton, menu as Menu, MuteButton, PIPButton, PlayButton, radioGroup as RadioGroup, SeekButton, slider as Slider, thumbnail as Thumbnail, Time, timeSlider as TimeSlider, volumeSlider as VolumeSlider, useAudioOptions, useCaptionOptions, useMediaPlayer } from './chunks/vidstack-8ISOe38A.js';
import { Icon } from './chunks/vidstack-CBF7iUqu.js';
export { useMediaRemote, usePlaybackRateOptions, useVideoQualityOptions } from './chunks/vidstack-DoXNQJv3.js';
import '@floating-ui/dom';
import 'react-dom';

class LibASSTextRenderer {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
    this.priority = 1;
    this._instance = null;
    this._track = null;
    this._typeRE = /(ssa|ass)$/;
  }
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this._typeRE.test(track.type) || this._typeRE.test(track.src));
  }
  attach(video) {
    if (!video) return;
    this.loader().then(async (mod) => {
      this._instance = new mod.default({
        ...this.config,
        video,
        subUrl: this._track?.src || ""
      });
      listenEvent(this._instance, "ready", () => {
        const canvas = this._instance?._canvas;
        if (canvas) canvas.style.pointerEvents = "none";
      });
      listenEvent(this._instance, "error", (event) => {
        if (this._track) {
          this._track[TextTrackSymbol._readyState] = 3;
          this._track.dispatchEvent(
            new DOMEvent("error", {
              trigger: event,
              detail: event.error
            })
          );
        }
      });
    });
  }
  changeTrack(track) {
    if (!track || track.readyState === 3) {
      this._freeTrack();
    } else if (this._track !== track) {
      this._instance?.setTrackByUrl(track.src);
      this._track = track;
    }
  }
  detach() {
    this._freeTrack();
  }
  _freeTrack() {
    this._instance?.freeTrack();
    this._track = null;
  }
}

const playerCallbacks = [
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

const MediaPlayerBridge = createReactComponent(MediaPlayerInstance, {
  events: playerCallbacks,
  eventsRegex: /^onHls/,
  domEventsRegex: /^onMedia/
});
const MediaPlayer = React.forwardRef(
  ({ aspectRatio, children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(
      MediaPlayerBridge,
      {
        ...props,
        src: props.src,
        ref: forwardRef,
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

const MediaProviderBridge = createReactComponent(MediaProviderInstance);
const MediaProvider = React.forwardRef(
  ({ loaders = [], children, iframeProps, mediaProps, ...props }, forwardRef) => {
    const reactLoaders = React.useMemo(() => loaders.map((Loader) => new Loader()), loaders);
    return /* @__PURE__ */ React.createElement(MediaProviderBridge, { ...props, loaders: reactLoaders, ref: forwardRef }, (props2, instance) => /* @__PURE__ */ React.createElement("div", { ...props2 }, /* @__PURE__ */ React.createElement(MediaOutlet, { provider: instance, mediaProps, iframeProps }), children));
  }
);
MediaProvider.displayName = "MediaProvider";
function MediaOutlet({ provider, mediaProps, iframeProps }) {
  const { sources, crossOrigin, poster, remotePlaybackInfo, nativeControls, viewType } = useStateContext(mediaState), { loader } = provider.$state, { $provider: $$provider, $providerSetup: $$providerSetup } = useMediaContext(), $sources = useSignal(sources), $nativeControls = useSignal(nativeControls), $crossOrigin = useSignal(crossOrigin), $poster = useSignal(poster), $loader = useSignal(loader), $provider = useSignal($$provider), $providerSetup = useSignal($$providerSetup), $remoteInfo = useSignal(remotePlaybackInfo), $mediaType = $loader?.mediaType(), $viewType = useSignal(viewType), isAudioView = $viewType === "audio", isYouTubeEmbed = $loader?.name === "youtube", isVimeoEmbed = $loader?.name === "vimeo", isEmbed = isYouTubeEmbed || isVimeoEmbed, isRemotion = $loader?.name === "remotion", isGoogleCast = $loader?.name === "google-cast", [googleCastIconPaths, setGoogleCastIconPaths] = React.useState(""), [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    if (!isGoogleCast || googleCastIconPaths) return;
    import('./chunks/vidstack-3hs3-8i_.js').then(function (n) { return n.chromecast; }).then((mod) => {
      setGoogleCastIconPaths(mod.default);
    });
  }, [isGoogleCast]);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (isGoogleCast) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "vds-google-cast",
        ref: (el) => {
          provider.load(el);
        }
      },
      /* @__PURE__ */ React.createElement(Icon, { paths: googleCastIconPaths }),
      $remoteInfo?.deviceName ? /* @__PURE__ */ React.createElement("span", { className: "vds-google-cast-info" }, "Google Cast on", " ", /* @__PURE__ */ React.createElement("span", { className: "vds-google-cast-device-name" }, $remoteInfo.deviceName)) : null
    );
  }
  if (isRemotion) {
    return /* @__PURE__ */ React.createElement("div", { "data-remotion-canvas": true }, /* @__PURE__ */ React.createElement(
      "div",
      {
        "data-remotion-container": true,
        ref: (el) => {
          provider.load(el);
        }
      },
      isRemotionProvider($provider) && $providerSetup ? React.createElement($provider.render) : null
    ));
  }
  return isEmbed ? React.createElement(
    React.Fragment,
    null,
    React.createElement("iframe", {
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
    !$nativeControls && !isAudioView ? React.createElement("div", { className: "vds-blocker" }) : null
  ) : $mediaType ? React.createElement($mediaType === "audio" ? "audio" : "video", {
    ...mediaProps,
    controls: $nativeControls ? true : null,
    crossOrigin: typeof $crossOrigin === "boolean" ? "" : $crossOrigin,
    poster: $mediaType === "video" && $nativeControls && $poster ? $poster : null,
    suppressHydrationWarning: true,
    children: !hasMounted ? $sources.map(
      ({ src, type }) => isString(src) ? /* @__PURE__ */ React.createElement("source", { src, type: type !== "?" ? type : void 0, key: src }) : null
    ) : null,
    ref(el) {
      provider.load(el);
    }
  }) : null;
}
MediaOutlet.displayName = "MediaOutlet";

function createTextTrack(init) {
  const media = useMediaContext(), track = React.useMemo(() => new TextTrack(init), Object.values(init));
  React.useEffect(() => {
    media.textTracks.add(track);
    return () => void media.textTracks.remove(track);
  }, [track]);
  return track;
}

function Track({ lang, ...props }) {
  createTextTrack({ language: lang, ...props });
  return null;
}
Track.displayName = "Track";

const ToggleButtonBridge = createReactComponent(ToggleButtonInstance);
const ToggleButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(ToggleButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
ToggleButton.displayName = "ToggleButton";

const PosterBridge = createReactComponent(PosterInstance);
const Poster = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(
      PosterBridge,
      {
        src: props.asChild && React.isValidElement(children) ? children.props.src : void 0,
        ...props
      },
      (props2, instance) => /* @__PURE__ */ React.createElement(
        PosterImg,
        {
          ...props2,
          instance,
          ref: composeRefs(props2.ref, forwardRef)
        },
        children
      )
    );
  }
);
Poster.displayName = "Poster";
const PosterImg = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { src, img, alt, crossOrigin, hidden } = instance.$state, $src = useSignal(src), $alt = useSignal(alt), $crossOrigin = useSignal(crossOrigin), $hidden = useSignal(hidden);
    return /* @__PURE__ */ React.createElement(
      Primitive.img,
      {
        ...props,
        src: $src || void 0,
        alt: $alt || void 0,
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(img.set, forwardRef),
        style: { display: $hidden ? "none" : void 0 }
      },
      children
    );
  }
);
PosterImg.displayName = "PosterImg";

const Root = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      translate: "yes",
      "aria-live": "off",
      "aria-atomic": "true",
      ...props,
      ref: forwardRef
    },
    children
  );
});
Root.displayName = "Caption";
const Text = React.forwardRef((props, forwardRef) => {
  const textTrack = useMediaState("textTrack"), [activeCue, setActiveCue] = React.useState();
  React.useEffect(() => {
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
  return /* @__PURE__ */ React.createElement(
    Primitive.span,
    {
      ...props,
      "data-part": "cue",
      dangerouslySetInnerHTML: {
        __html: activeCue?.text || ""
      },
      ref: forwardRef
    }
  );
});
Text.displayName = "CaptionText";

var caption = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Root: Root,
  Text: Text
});

function useState(ctor, prop, ref) {
  const initialValue = React.useMemo(() => ctor.state.record[prop], [ctor, prop]);
  return useSignal(ref.current ? ref.current.$state[prop] : initialValue);
}
const storesCache = /* @__PURE__ */ new Map();
function useStore(ctor, ref) {
  const initialStore = React.useMemo(() => {
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

function useMediaProvider() {
  const [provider, setProvider] = React.useState(null), context = useMediaContext();
  if (!context) {
    throw Error(
      "[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?"
    );
  }
  React.useEffect(() => {
    if (!context) return;
    return effect(() => {
      setProvider(context.$provider());
    });
  }, []);
  return provider;
}

function useThumbnails(src, crossOrigin = null) {
  const scope = useReactScope(), $src = createSignal(src), $crossOrigin = createSignal(crossOrigin), loader = useScoped(() => ThumbnailsLoader.create($src, $crossOrigin));
  if (!scope) {
    console.warn(
      `[vidstack] \`useThumbnails\` must be called inside a child component of \`<MediaPlayer>\``
    );
  }
  React.useEffect(() => {
    $src.set(src);
  }, [src]);
  React.useEffect(() => {
    $crossOrigin.set(crossOrigin);
  }, [crossOrigin]);
  return useSignal(loader.$images);
}
function useActiveThumbnail(thumbnails, time) {
  return React.useMemo(() => {
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

function useSliderPreview({
  clamp = false,
  offset = 0,
  orientation = "horizontal"
} = {}) {
  const [rootRef, setRootRef] = React.useState(null), [previewRef, setPreviewRef] = React.useState(null), [pointerValue, setPointerValue] = React.useState(0), [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (previewRef) {
      previewRef.style.setProperty("--slider-pointer", pointerValue + "%");
    }
  }, [previewRef, pointerValue]);
  React.useEffect(() => {
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

function useAudioGainOptions({
  gains = DEFAULT_AUDIO_GAINS,
  disabledLabel = "disabled"
} = {}) {
  const media = useMediaContext(), { audioGain, canSetAudioGain } = media.$state;
  useSignal(audioGain);
  useSignal(canSetAudioGain);
  return React.useMemo(() => {
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

export { caption as Caption, DEFAULT_AUDIO_GAINS, Icon, LibASSTextRenderer, MediaPlayer, MediaPlayerInstance, MediaProvider, MediaProviderInstance, Poster, PosterInstance, TextTrack, ToggleButton, ToggleButtonInstance, Track, createTextTrack, mediaState, useActiveThumbnail, useAudioGainOptions, useMediaContext, useMediaProvider, useMediaState, useSliderPreview, useState, useStore, useThumbnails };
