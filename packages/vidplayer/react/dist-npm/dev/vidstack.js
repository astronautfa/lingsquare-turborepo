"use client"

import { i as TextTrackSymbol, P as Primitive, h as MediaPlayerInstance, r as isRemotionProvider, t as MediaProviderInstance, v as mediaState, b as TextTrack, w as ToggleButtonInstance, x as PosterInstance, u as useMediaState, y as ThumbnailsLoader, z as updateSliderPreviewPlacement, A as DEFAULT_AUDIO_GAINS } from './chunks/vidstack-DLTRlLRp.js';
export { a0 as ARIAKeyShortcuts, a$ as AUDIO_EXTENSIONS, b0 as AUDIO_TYPES, bl as AirPlayButtonInstance, aX as AudioGainRadioGroup, bu as AudioGainSliderInstance, an as AudioProviderLoader, aW as AudioRadioGroup, a9 as AudioTrackList, bf as CaptionButtonInstance, bJ as CaptionsInstance, aY as CaptionsRadioGroup, aV as ChaptersRadioGroup, aF as ControlsGroup, be as ControlsGroupInstance, bd as ControlsInstance, ao as DASHProviderLoader, b4 as DASH_VIDEO_EXTENSIONS, b6 as DASH_VIDEO_TYPES, D as DEFAULT_PLAYBACK_RATES, af as FONT_COLOR_OPTION, ak as FONT_DEFAULTS, ag as FONT_FAMILY_OPTION, ai as FONT_OPACITY_OPTION, al as FONT_SIGNALS, ah as FONT_SIZE_OPTION, aj as FONT_TEXT_SHADOW_OPTION, bg as FullscreenButtonInstance, U as FullscreenController, bK as GestureInstance, bm as GoogleCastButtonInstance, ap as HLSProviderLoader, b3 as HLS_VIDEO_EXTENSIONS, b5 as HLS_VIDEO_TYPES, S as List, bh as LiveButtonInstance, _ as LocalMediaStorage, B as Logger, $ as MEDIA_KEY_SHORTCUTS, bc as MediaAnnouncerInstance, Z as MediaControls, M as MediaRemoteControl, aP as MenuButton, bD as MenuButtonInstance, bC as MenuInstance, aQ as MenuItem, bF as MenuItemInstance, aT as MenuItems, bE as MenuItemsInstance, aR as MenuPortal, bG as MenuPortalInstance, bi as MuteButtonInstance, bj as PIPButtonInstance, bk as PlayButtonInstance, a_ as QualityRadioGroup, bw as QualitySliderInstance, aU as Radio, bH as RadioGroupInstance, bI as RadioInstance, X as ScreenOrientationController, bn as SeekButtonInstance, aO as SliderChapters, bB as SliderChaptersInstance, aJ as SliderController, br as SliderInstance, aN as SliderPreview, bA as SliderPreviewInstance, aK as SliderThumbnail, bx as SliderThumbnailInstance, aM as SliderValue, by as SliderValueInstance, aL as SliderVideo, bz as SliderVideoInstance, aZ as SpeedRadioGroup, bv as SpeedSliderInstance, a5 as TextRenderers, a8 as TextTrackList, bL as ThumbnailInstance, bM as TimeInstance, T as TimeRange, bs as TimeSliderInstance, aH as TooltipContent, bq as TooltipContentInstance, bo as TooltipInstance, aG as TooltipTrigger, bp as TooltipTriggerInstance, b1 as VIDEO_EXTENSIONS, b2 as VIDEO_TYPES, aq as VideoProviderLoader, ae as VideoQualityList, ar as VimeoProviderLoader, bt as VolumeSliderInstance, as as YouTubeProviderLoader, F as canChangeVolume, W as canFullscreen, f as canGoogleCastSrc, G as canOrientScreen, J as canPlayHLSNatively, O as canRotateScreen, K as canUsePictureInPicture, N as canUseVideoPresentation, aa as findActiveCue, E as formatSpokenTime, C as formatTime, o as getDownloadFile, a4 as getTimeRangesEnd, a3 as getTimeRangesStart, at as isAudioProvider, b7 as isAudioSrc, ab as isCueActive, aw as isDASHProvider, ba as isDASHSrc, az as isGoogleCastProvider, av as isHLSProvider, b9 as isHLSSrc, aA as isHTMLAudioElement, aD as isHTMLIFrameElement, aC as isHTMLMediaElement, aB as isHTMLVideoElement, bb as isMediaStream, a6 as isTrackCaptionKind, au as isVideoProvider, a1 as isVideoQualitySrc, b8 as isVideoSrc, ay as isVimeoProvider, ax as isYouTubeProvider, Y as mediaContext, aS as menuPortalContext, am as onFontReset, a7 as parseJSONCaptionsFile, aE as sliderContext, aI as sliderState, a2 as softResetMediaState, s as sortVideoQualities, bN as useMediaStore, n as usePlyrLayoutClasses, q as useSliderState, bO as useSliderStore, ac as watchActiveTextTrack, ad as watchCueTextChange } from './chunks/vidstack-DLTRlLRp.js';
import * as React from 'react';
import { i as isString, l as listenEvent, D as DOMEvent, E as createReactComponent, F as useStateContext, u as useSignal, z as composeRefs, G as useSignalRecord, e as effect, H as useReactScope, s as signal } from './chunks/vidstack-DwBltyvo.js';
export { L as appendTriggerEvent, K as findTriggerEvent, I as hasTriggerEvent, B as isKeyboardClick, A as isKeyboardEvent, M as isPointerEvent, J as walkTriggerEventChain } from './chunks/vidstack-DwBltyvo.js';
import { c as createSignal, u as useScoped } from './chunks/vidstack-CXLppKAS.js';
export { b as AudioGainSlider, d as Captions, C as ChapterTitle, a as Controls, G as GoogleCastButton, M as MediaAnnouncer, q as QualitySlider, s as SpeedSlider, e as Spinner, T as Title, t as Tooltip, f as updateFontCssVars, h as useActiveTextCues, i as useActiveTextTrack, k as useChapterOptions, j as useChapterTitle, g as useTextCues } from './chunks/vidstack-CXLppKAS.js';
import { a as useMediaContext } from './chunks/vidstack-dFkreRXo.js';
export { A as AirPlayButton, C as CaptionButton, F as FullscreenButton, G as Gesture, L as LiveButton, m as Menu, M as MuteButton, b as PIPButton, P as PlayButton, r as RadioGroup, S as SeekButton, s as Slider, n as Thumbnail, e as Time, t as TimeSlider, v as VolumeSlider, h as useAudioOptions, k as useCaptionOptions, u as useMediaPlayer } from './chunks/vidstack-dFkreRXo.js';
import { I as Icon } from './chunks/vidstack-Xvq9wjeH.js';
export { u as useMediaRemote, a as usePlaybackRateOptions, b as useVideoQualityOptions } from './chunks/vidstack-BTSA0VVc.js';
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
    if (!video)
      return;
    this.loader().then(async (mod) => {
      this._instance = new mod.default({
        ...this.config,
        video,
        subUrl: this._track?.src || ""
      });
      listenEvent(this._instance, "ready", () => {
        const canvas = this._instance?._canvas;
        if (canvas)
          canvas.style.pointerEvents = "none";
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
  ({ loaders = [], children, mediaProps, ...props }, forwardRef) => {
    const reactLoaders = React.useMemo(() => loaders.map((Loader) => new Loader()), loaders);
    return /* @__PURE__ */ React.createElement(MediaProviderBridge, { ...props, loaders: reactLoaders, ref: forwardRef }, (props2, instance) => /* @__PURE__ */ React.createElement("div", { ...props2 }, /* @__PURE__ */ React.createElement(MediaOutlet, { ...mediaProps, provider: instance }), children));
  }
);
MediaProvider.displayName = "MediaProvider";
function MediaOutlet({ provider, ...props }) {
  const { crossOrigin, poster, remotePlaybackInfo, nativeControls, viewType } = useStateContext(mediaState), { loader } = provider.$state, { $provider: $$provider, $providerSetup: $$providerSetup } = useMediaContext(), $nativeControls = useSignal(nativeControls), $crossOrigin = useSignal(crossOrigin), $poster = useSignal(poster), $loader = useSignal(loader), $provider = useSignal($$provider), $providerSetup = useSignal($$providerSetup), $remoteInfo = useSignal(remotePlaybackInfo), $mediaType = $loader?.mediaType(), $viewType = useSignal(viewType), isAudioView = $viewType === "audio", isYouTubeEmbed = $loader?.name === "youtube", isVimeoEmbed = $loader?.name === "vimeo", isEmbed = isYouTubeEmbed || isVimeoEmbed, isRemotion = $loader?.name === "remotion", isGoogleCast = $loader?.name === "google-cast", [googleCastIconPaths, setGoogleCastIconPaths] = React.useState("");
  React.useEffect(() => {
    if (!isGoogleCast || googleCastIconPaths)
      return;
    import('./chunks/vidstack-CrXS53tu.js').then((mod) => {
      setGoogleCastIconPaths(mod.default);
    });
  }, [isGoogleCast]);
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
      className: isYouTubeEmbed ? "vds-youtube" : "vds-vimeo",
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
    ...props,
    controls: $nativeControls ? true : null,
    crossOrigin: typeof $crossOrigin === "boolean" ? "" : $crossOrigin,
    poster: $mediaType === "video" && $nativeControls && $poster ? $poster : null,
    preload: "none",
    "aria-hidden": "true",
    suppressHydrationWarning: true,
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
    return /* @__PURE__ */ React.createElement(PosterBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(
      PosterImg,
      {
        ...props2,
        instance,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
Poster.displayName = "Poster";
const PosterImg = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { src, img, alt, crossOrigin, loading, hidden } = instance.$state, $src = useSignal(src), $alt = useSignal(alt), $crossOrigin = useSignal(crossOrigin), $loading = useSignal(loading), $hidden = useSignal(hidden);
    return /* @__PURE__ */ React.createElement(
      Primitive.img,
      {
        ...props,
        src: $src || "",
        alt: $alt || void 0,
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(img.set, forwardRef),
        style: { display: $loading || $hidden ? "none" : void 0 }
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
    if (!textTrack)
      return;
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
    if (!context)
      return;
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
    if (!rootRef)
      return;
    const dragging = signal(false);
    function updatePointerValue(event) {
      if (!rootRef)
        return;
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
    if (!previewRef)
      return;
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

export { caption as Caption, DEFAULT_AUDIO_GAINS, Icon, LibASSTextRenderer, MediaPlayer, MediaPlayerInstance, MediaProvider, MediaProviderInstance, Poster, PosterInstance, TextTrack, ThumbnailsLoader, ToggleButton, ToggleButtonInstance, Track, createTextTrack, mediaState, updateSliderPreviewPlacement, useActiveThumbnail, useAudioGainOptions, useMediaContext, useMediaProvider, useMediaState, useSliderPreview, useState, useStore, useThumbnails };
