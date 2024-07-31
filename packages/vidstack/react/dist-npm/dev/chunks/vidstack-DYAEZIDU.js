import {
  assert,
  coerceToError
} from "./vidstack-GOXJCRXV.js";
import {
  QualitySymbol
} from "./vidstack-N3DBVVNQ.js";
import {
  TextTrack,
  TextTrackSymbol,
  isTrackCaptionKind,
  watchActiveTextTrack
} from "./vidstack-O4WMABMP.js";
import {
  getRequestCredentials,
  preconnect
} from "./vidstack-DQWSDQKN.js";
import {
  autoPlacement,
  hasAnimation,
  isElementParent,
  isElementVisible,
  isEventInside,
  isHTMLElement,
  isTouchPinchEvent,
  observeVisibility,
  onPress,
  requestScopedAnimationFrame,
  setARIALabel,
  setAttributeIfEmpty
} from "./vidstack-YIOQVQ2N.js";
import {
  TimeRange,
  getTimeRangesEnd,
  getTimeRangesStart,
  updateTimeIntervals
} from "./vidstack-PKS56VNA.js";
import {
  IS_CHROME,
  IS_IOS,
  IS_IPHONE,
  canChangeVolume,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayAudioType,
  canPlayVideoType,
  isAudioSrc,
  isDASHSrc,
  isDASHSupported,
  isHLSSrc,
  isHLSSupported,
  isVideoSrc
} from "./vidstack-HLIA5IIR.js";
import {
  clampNumber,
  getNumberOfDecimalPlaces,
  round
} from "./vidstack-B2HNNR5Q.js";
import {
  ListSymbol
} from "./vidstack-SN6ZVKJG.js";
import {
  Component,
  DOMEvent,
  EventsTarget,
  IS_SERVER,
  State,
  ViewController,
  animationFrameThrottle,
  ariaBool,
  camelToKebabCase,
  computed,
  createContext,
  createDisposalBin,
  createScope,
  deferredPromise,
  effect,
  hasProvidedContext,
  isArray,
  isKeyboardClick,
  isKeyboardEvent,
  isMouseEvent,
  isNull,
  isNumber,
  isObject,
  isPointerEvent,
  isString,
  isTouchEvent,
  isUndefined,
  isWriteSignal,
  kebabToCamelCase,
  listenEvent,
  method,
  noop,
  onDispose,
  peek,
  prop,
  provideContext,
  scoped,
  setAttribute,
  setStyle,
  signal,
  tick,
  untrack,
  uppercaseFirstChar,
  useContext,
  useState,
  waitIdlePeriod,
  wasEnterKeyPressed
} from "./vidstack-3R7QJDRC.js";
import {
  __decorateElement,
  __decoratorMetadata,
  __decoratorStart,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __runInitializers
} from "./vidstack-WBT4TVVV.js";

// ../vidstack/src/core/api/src-types.ts
function isVideoQualitySrc(src) {
  return !isString(src) && "width" in src && "height" in src && isNumber(src.width) && isNumber(src.height);
}

// ../../../node_modules/.pnpm/fscreen@1.2.0/node_modules/fscreen/dist/fscreen.esm.js
var key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6
};
var webkit = [
  "webkitFullscreenEnabled",
  "webkitFullscreenElement",
  "webkitRequestFullscreen",
  "webkitExitFullscreen",
  "webkitfullscreenchange",
  "webkitfullscreenerror",
  "-webkit-full-screen"
];
var moz = [
  "mozFullScreenEnabled",
  "mozFullScreenElement",
  "mozRequestFullScreen",
  "mozCancelFullScreen",
  "mozfullscreenchange",
  "mozfullscreenerror",
  "-moz-full-screen"
];
var ms = [
  "msFullscreenEnabled",
  "msFullscreenElement",
  "msRequestFullscreen",
  "msExitFullscreen",
  "MSFullscreenChange",
  "MSFullscreenError",
  "-ms-fullscreen"
];
var document2 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document2 && Object.keys(key) || webkit[0] in document2 && webkit || moz[0] in document2 && moz || ms[0] in document2 && ms || [];
var fscreen = {
  requestFullscreen: function(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document2[vendor[key.exitFullscreen]].bind(document2);
  },
  get fullscreenPseudoClass() {
    return ":" + vendor[key.fullscreen];
  },
  addEventListener: function(type, handler, options) {
    return document2.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function(type, handler, options) {
    return document2.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document2[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {
  },
  get fullscreenElement() {
    return document2[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {
  },
  get onfullscreenchange() {
    return document2[("on" + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document2[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document2[("on" + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document2[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};
var fscreen_esm_default = fscreen;

// ../vidstack/src/core/api/player-state.ts
var mediaState = new State({
  artist: "",
  artwork: null,
  audioTrack: null,
  audioTracks: [],
  autoPlay: false,
  autoPlayError: null,
  audioGain: null,
  buffered: new TimeRange(),
  canLoad: false,
  canLoadPoster: false,
  canFullscreen: false,
  canOrientScreen: canOrientScreen(),
  canPictureInPicture: false,
  canPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  get iOSControls() {
    return IS_IPHONE && this.mediaType === "video" && (!this.playsInline || !fscreen_esm_default.fullscreenEnabled && this.fullscreen);
  },
  get nativeControls() {
    return this.controls || this.iOSControls;
  },
  controlsVisible: false,
  get controlsHidden() {
    return !this.controlsVisible;
  },
  crossOrigin: null,
  ended: false,
  error: null,
  fullscreen: false,
  get loop() {
    return this.providedLoop || this.userPrefersLoop;
  },
  logLevel: true ? "warn" : "silent",
  mediaType: "unknown",
  muted: false,
  paused: true,
  played: new TimeRange(),
  playing: false,
  playsInline: false,
  pictureInPicture: false,
  preload: "metadata",
  playbackRate: 1,
  qualities: [],
  quality: null,
  autoQuality: false,
  canSetQuality: true,
  canSetPlaybackRate: true,
  canSetVolume: false,
  canSetAudioGain: false,
  seekable: new TimeRange(),
  seeking: false,
  source: { src: "", type: "" },
  sources: [],
  started: false,
  textTracks: [],
  textTrack: null,
  get hasCaptions() {
    return this.textTracks.filter(isTrackCaptionKind).length > 0;
  },
  volume: 1,
  waiting: false,
  realCurrentTime: 0,
  get currentTime() {
    return this.ended ? this.duration : this.clipStartTime > 0 ? Math.max(0, Math.min(this.realCurrentTime - this.clipStartTime, this.duration)) : this.realCurrentTime;
  },
  providedDuration: -1,
  intrinsicDuration: 0,
  get realDuration() {
    return this.providedDuration > 0 ? this.providedDuration : this.intrinsicDuration;
  },
  get duration() {
    return this.clipEndTime > 0 ? this.clipEndTime - this.clipStartTime : Math.max(0, this.realDuration - this.clipStartTime);
  },
  get title() {
    return this.providedTitle || this.inferredTitle;
  },
  get poster() {
    return this.providedPoster || this.inferredPoster;
  },
  get viewType() {
    return this.providedViewType !== "unknown" ? this.providedViewType : this.inferredViewType;
  },
  get streamType() {
    return this.providedStreamType !== "unknown" ? this.providedStreamType : this.inferredStreamType;
  },
  get currentSrc() {
    return this.source;
  },
  get bufferedStart() {
    const start = getTimeRangesStart(this.buffered) ?? 0;
    return Math.max(0, start - this.clipStartTime);
  },
  get bufferedEnd() {
    const end = getTimeRangesEnd(this.buffered) ?? 0;
    return Math.min(this.duration, Math.max(0, end - this.clipStartTime));
  },
  get seekableStart() {
    const start = getTimeRangesStart(this.seekable) ?? 0;
    return Math.max(0, start - this.clipStartTime);
  },
  get seekableEnd() {
    const end = this.canPlay ? getTimeRangesEnd(this.seekable) ?? Infinity : 0;
    return this.clipEndTime > 0 ? Math.max(this.clipEndTime, Math.max(0, end - this.clipStartTime)) : end;
  },
  get seekableWindow() {
    return Math.max(0, this.seekableEnd - this.seekableStart);
  },
  // ~~ remote playback ~~
  canAirPlay: false,
  canGoogleCast: false,
  remotePlaybackState: "disconnected",
  remotePlaybackType: "none",
  remotePlaybackLoader: null,
  remotePlaybackInfo: null,
  get isAirPlayConnected() {
    return this.remotePlaybackType === "airplay" && this.remotePlaybackState === "connected";
  },
  get isGoogleCastConnected() {
    return this.remotePlaybackType === "google-cast" && this.remotePlaybackState === "connected";
  },
  // ~~ responsive design ~~
  pointer: "fine",
  orientation: "landscape",
  width: 0,
  height: 0,
  mediaWidth: 0,
  mediaHeight: 0,
  lastKeyboardAction: null,
  // ~~ user props ~~
  userBehindLiveEdge: false,
  // ~~ live props ~~
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  get canSeek() {
    return /unknown|on-demand|:dvr/.test(this.streamType) && Number.isFinite(this.seekableWindow) && (!this.live || /:dvr/.test(this.streamType) && this.seekableWindow >= this.minLiveDVRWindow);
  },
  get live() {
    return this.streamType.includes("live") || !Number.isFinite(this.realDuration);
  },
  get liveEdgeStart() {
    return this.live && Number.isFinite(this.seekableEnd) ? Math.max(0, (this.liveSyncPosition ?? this.seekableEnd) - this.liveEdgeTolerance) : 0;
  },
  get liveEdge() {
    return this.live && (!this.canSeek || !this.userBehindLiveEdge && this.currentTime >= this.liveEdgeStart);
  },
  get liveEdgeWindow() {
    return this.live && Number.isFinite(this.seekableEnd) ? this.seekableEnd - this.liveEdgeStart : 0;
  },
  // ~~ internal props ~~
  autoPlaying: false,
  providedTitle: "",
  inferredTitle: "",
  providedLoop: false,
  userPrefersLoop: false,
  providedPoster: "",
  inferredPoster: "",
  inferredViewType: "unknown",
  providedViewType: "unknown",
  providedStreamType: "unknown",
  inferredStreamType: "unknown",
  liveSyncPosition: null,
  savedState: null
});
var RESET_ON_SRC_QUALITY_CHANGE = /* @__PURE__ */ new Set([
  "autoPlayError",
  "autoPlaying",
  "buffered",
  "canPlay",
  "error",
  "paused",
  "played",
  "playing",
  "seekable",
  "seeking",
  "waiting"
]);
var RESET_ON_SRC_CHANGE = /* @__PURE__ */ new Set([
  ...RESET_ON_SRC_QUALITY_CHANGE,
  "ended",
  "inferredPoster",
  "inferredStreamType",
  "inferredTitle",
  "intrinsicDuration",
  "liveSyncPosition",
  "realCurrentTime",
  "savedState",
  "started",
  "userBehindLiveEdge"
]);
function softResetMediaState($media, isSourceQualityChange = false) {
  const filter = isSourceQualityChange ? RESET_ON_SRC_QUALITY_CHANGE : RESET_ON_SRC_CHANGE;
  mediaState.reset($media, (prop2) => filter.has(prop2));
  tick();
}

// ../vidstack/src/core/api/media-context.ts
var mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}

// ../vidstack/src/foundation/logger/grouped-log.ts
var GROUPED_LOG = Symbol(true ? "GROUPED_LOG" : 0);
var GroupedLog = class _GroupedLog {
  constructor(logger, level, title, root, parent) {
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root;
    this.parent = parent;
  }
  [GROUPED_LOG] = true;
  logs = [];
  log(...data) {
    this.logs.push({ data });
    return this;
  }
  labelledLog(label, ...data) {
    this.logs.push({ label, data });
    return this;
  }
  groupStart(title) {
    return new _GroupedLog(this.logger, this.level, title, this.root ?? this, this);
  }
  groupEnd() {
    this.parent?.logs.push(this);
    return this.parent ?? this;
  }
  dispatch() {
    return this.logger.dispatch(this.level, this.root ?? this);
  }
};
function isGroupedLog(data) {
  return !!data?.[GROUPED_LOG];
}

// ../vidstack/src/foundation/logger/controller.ts
var Logger = class {
  #target = null;
  error(...data) {
    return this.dispatch("error", ...data);
  }
  warn(...data) {
    return this.dispatch("warn", ...data);
  }
  info(...data) {
    return this.dispatch("info", ...data);
  }
  debug(...data) {
    return this.dispatch("debug", ...data);
  }
  errorGroup(title) {
    return new GroupedLog(this, "error", title);
  }
  warnGroup(title) {
    return new GroupedLog(this, "warn", title);
  }
  infoGroup(title) {
    return new GroupedLog(this, "info", title);
  }
  debugGroup(title) {
    return new GroupedLog(this, "debug", title);
  }
  setTarget(newTarget) {
    this.#target = newTarget;
  }
  dispatch(level, ...data) {
    return this.#target?.dispatchEvent(
      new DOMEvent("vds-log", {
        bubbles: true,
        composed: true,
        detail: { level, data }
      })
    ) || false;
  }
};

// ../vidstack/src/core/state/remote-control.ts
var MediaRemoteControl = class {
  #target = null;
  #player = null;
  #prevTrackIndex = -1;
  #logger;
  constructor(logger = true ? new Logger() : void 0) {
    this.#logger = logger;
  }
  /**
   * Set the target from which to dispatch media requests events from. The events should bubble
   * up from this target to the player element.
   *
   * @example
   * ```ts
   * const button = document.querySelector('button');
   * remote.setTarget(button);
   * ```
   */
  setTarget(target) {
    this.#target = target;
    if (true) this.#logger?.setTarget(target);
  }
  /**
   * Returns the current player element. This method will attempt to find the player by
   * searching up from either the given `target` or default target set via `remote.setTarget`.
   *
   * @example
   * ```ts
   * const player = remote.getPlayer();
   * ```
   */
  getPlayer(target) {
    if (this.#player) return this.#player;
    (target ?? this.#target)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this.#player = player),
        bubbles: true,
        composed: true
      })
    );
    return this.#player;
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this.#player = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    this.#dispatchRequest("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this.#dispatchRequest("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this.#dispatchRequest("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this.#dispatchRequest("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.#dispatchRequest("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.#dispatchRequest("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.#dispatchRequest("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.#dispatchRequest("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this.#dispatchRequest("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this.#dispatchRequest("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this.#dispatchRequest("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this.#dispatchRequest("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this.#dispatchRequest("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this.#dispatchRequest("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.#dispatchRequest("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.#dispatchRequest("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.#dispatchRequest("media-live-edge-request", trigger);
  }
  /**
   * Dispatch a request to update the length of the media in seconds.
   *
   * @example
   * ```ts
   * remote.changeDuration(100); // 100 seconds
   * ```
   */
  changeDuration(duration, trigger) {
    this.#dispatchRequest("media-duration-change-request", trigger, duration);
  }
  /**
   * Dispatch a request to update the clip start time. This is the time at which media playback
   * should start at.
   *
   * @example
   * ```ts
   * remote.changeClipStart(100); // start at 100 seconds
   * ```
   */
  changeClipStart(startTime, trigger) {
    this.#dispatchRequest("media-clip-start-change-request", trigger, startTime);
  }
  /**
   * Dispatch a request to update the clip end time. This is the time at which media playback
   * should end at.
   *
   * @example
   * ```ts
   * remote.changeClipEnd(100); // end at 100 seconds
   * ```
   */
  changeClipEnd(endTime, trigger) {
    this.#dispatchRequest("media-clip-end-change-request", trigger, endTime);
  }
  /**
   * Dispatch a request to update the media volume to the given `volume` level which is a value
   * between 0 and 1.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/audio-gain#remote-control}
   * @example
   * ```ts
   * remote.changeVolume(0); // 0%
   * remote.changeVolume(0.05); // 5%
   * remote.changeVolume(0.5); // 50%
   * remote.changeVolume(0.75); // 70%
   * remote.changeVolume(1); // 100%
   * ```
   */
  changeVolume(volume, trigger) {
    this.#dispatchRequest("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
  }
  /**
   * Dispatch a request to change the current audio track.
   *
   * @example
   * ```ts
   * remote.changeAudioTrack(1); // track at index 1
   * ```
   */
  changeAudioTrack(index, trigger) {
    this.#dispatchRequest("media-audio-track-change-request", trigger, index);
  }
  /**
   * Dispatch a request to change the video quality. The special value `-1` represents auto quality
   * selection.
   *
   * @example
   * ```ts
   * remote.changeQuality(-1); // auto
   * remote.changeQuality(1); // quality at index 1
   * ```
   */
  changeQuality(index, trigger) {
    this.#dispatchRequest("media-quality-change-request", trigger, index);
  }
  /**
   * Request auto quality selection.
   */
  requestAutoQuality(trigger) {
    this.changeQuality(-1, trigger);
  }
  /**
   * Dispatch a request to change the mode of the text track at the given index.
   *
   * @example
   * ```ts
   * remote.changeTextTrackMode(1, 'showing'); // track at index 1
   * ```
   */
  changeTextTrackMode(index, mode, trigger) {
    this.#dispatchRequest("media-text-track-change-request", trigger, {
      index,
      mode
    });
  }
  /**
   * Dispatch a request to change the media playback rate.
   *
   * @example
   * ```ts
   * remote.changePlaybackRate(0.5); // Half the normal speed
   * remote.changePlaybackRate(1); // Normal speed
   * remote.changePlaybackRate(1.5); // 50% faster than normal
   * remote.changePlaybackRate(2); // Double the normal speed
   * ```
   */
  changePlaybackRate(rate, trigger) {
    this.#dispatchRequest("media-rate-change-request", trigger, rate);
  }
  /**
   * Dispatch a request to change the media audio gain.
   *
   * @example
   * ```ts
   * remote.changeAudioGain(1); // Disable audio gain
   * remote.changeAudioGain(1.5); // 50% louder
   * remote.changeAudioGain(2); // 100% louder
   * ```
   */
  changeAudioGain(gain, trigger) {
    this.#dispatchRequest("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this.#dispatchRequest("media-resume-controls-request", trigger);
  }
  /**
   * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
   * controls being visible until `remote.resumeControls()` is called. This method
   * is generally used when building custom controls and you'd like to prevent the UI from
   * disappearing.
   *
   * @example
   * ```ts
   * // Prevent controls hiding while menu is being interacted with.
   * function onSettingsOpen() {
   *   remote.pauseControls();
   * }
   *
   * function onSettingsClose() {
   *   remote.resumeControls();
   * }
   * ```
   */
  pauseControls(trigger) {
    this.#dispatchRequest("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.togglePaused.name);
      return;
    }
    if (player.state.paused) this.play(trigger);
    else this.pause(trigger);
  }
  /**
   * Dispatch a request to toggle the controls visibility.
   */
  toggleControls(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleControls.name);
      return;
    }
    if (!player.controls.showing) {
      player.controls.show(0, trigger);
    } else {
      player.controls.hide(0, trigger);
    }
  }
  /**
   * Dispatch a request to toggle the media muted state.
   */
  toggleMuted(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleMuted.name);
      return;
    }
    if (player.state.muted) this.unmute(trigger);
    else this.mute(trigger);
  }
  /**
   * Dispatch a request to toggle the media fullscreen state.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  toggleFullscreen(target, trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleFullscreen.name);
      return;
    }
    if (player.state.fullscreen) this.exitFullscreen(target, trigger);
    else this.enterFullscreen(target, trigger);
  }
  /**
   * Dispatch a request to toggle the media picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  togglePictureInPicture(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.togglePictureInPicture.name);
      return;
    }
    if (player.state.pictureInPicture) this.exitPictureInPicture(trigger);
    else this.enterPictureInPicture(trigger);
  }
  /**
   * Show captions.
   */
  showCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.showCaptions.name);
      return;
    }
    let tracks = player.state.textTracks, index = this.#prevTrackIndex;
    if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
      index = -1;
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track) && track.default);
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track));
    }
    if (index >= 0) this.changeTextTrackMode(index, "showing", trigger);
    this.#prevTrackIndex = -1;
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.disableCaptions.name);
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this.#prevTrackIndex = index;
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleCaptions.name);
      return;
    }
    if (player.state.textTrack) {
      this.disableCaptions();
    } else {
      this.showCaptions();
    }
  }
  userPrefersLoopChange(prefersLoop, trigger) {
    this.#dispatchRequest("media-user-loop-change-request", trigger, prefersLoop);
  }
  #dispatchRequest(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component) target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this.#player?.el && target instanceof Node && !this.#player.el.contains(target);
    target = shouldUsePlayer ? this.#target ?? this.getPlayer()?.el : target ?? this.#target;
    if (true) {
      this.#logger?.debugGroup(`\u{1F4E8} dispatching \`${type}\``).labelledLog("Target", target).labelledLog("Player", this.#player).labelledLog("Request Event", request).labelledLog("Trigger Event", trigger).dispatch();
    }
    if (this.#player) {
      if (type === "media-play-request" && !this.#player.state.canLoad) {
        target?.dispatchEvent(request);
      } else {
        this.#player.canPlayQueue.enqueue(type, () => target?.dispatchEvent(request));
      }
    } else {
      target?.dispatchEvent(request);
    }
  }
  #noPlayerWarning(method2) {
    if (true) {
      console.warn(
        `[vidstack] attempted to call \`MediaRemoteControl.${method2}\`() that requires player but failed because remote could not find a parent player element from target`
      );
    }
  }
};

// ../../../node_modules/.pnpm/just-throttle@4.2.0/node_modules/just-throttle/index.mjs
var functionThrottle = throttle;
function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = options && options.leading;
  var trailing = options && options.trailing;
  if (leading == null) {
    leading = true;
  }
  if (trailing == null) {
    trailing = !leading;
  }
  if (leading == true) {
    trailing = false;
  }
  var cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  var flush = function() {
    var call = throttledFn;
    cancel();
    if (call) {
      call();
    }
  };
  var throttleWrapper = function() {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;
    throttledFn = function() {
      return fn.apply(context, args);
    };
    if (!timeoutId) {
      timeoutId = setTimeout(function() {
        timeoutId = null;
        if (trailing) {
          return throttledFn();
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return throttledFn();
    }
  };
  throttleWrapper.cancel = cancel;
  throttleWrapper.flush = flush;
  return throttleWrapper;
}

// ../vidstack/src/core/state/media-storage.ts
var LocalMediaStorage = class {
  playerId = "vds-player";
  mediaId = null;
  #data = {
    volume: null,
    muted: null,
    audioGain: null,
    time: null,
    lang: null,
    captions: null,
    rate: null,
    quality: null
  };
  async getVolume() {
    return this.#data.volume;
  }
  async setVolume(volume) {
    this.#data.volume = volume;
    this.save();
  }
  async getMuted() {
    return this.#data.muted;
  }
  async setMuted(muted) {
    this.#data.muted = muted;
    this.save();
  }
  async getTime() {
    return this.#data.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this.#data.time = !shouldClear ? time : null;
    if (shouldClear || ended) this.saveTime();
    else this.saveTimeThrottled();
  }
  async getLang() {
    return this.#data.lang;
  }
  async setLang(lang) {
    this.#data.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this.#data.captions;
  }
  async setCaptions(enabled) {
    this.#data.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this.#data.rate;
  }
  async setPlaybackRate(rate) {
    this.#data.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this.#data.audioGain;
  }
  async setAudioGain(gain) {
    this.#data.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this.#data.quality;
  }
  async setVideoQuality(quality) {
    this.#data.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this.#data = {
      volume: null,
      muted: null,
      audioGain: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null,
      ...savedData ? JSON.parse(savedData) : {},
      time: savedTime ? +savedTime : null
    };
  }
  save() {
    if (IS_SERVER || !this.playerId) return;
    const data = JSON.stringify({ ...this.#data, time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTimeThrottled = functionThrottle(this.saveTime.bind(this), 1e3);
  saveTime() {
    if (IS_SERVER || !this.mediaId) return;
    const data = (this.#data.time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
};

// ../vidstack/src/core/tracks/text/render/native-text-renderer.ts
var NativeTextRenderer = class {
  priority = 0;
  #display = true;
  #video = null;
  #track = null;
  #tracks = /* @__PURE__ */ new Set();
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this.#video = video;
    if (video) video.textTracks.onchange = this.#onChange.bind(this);
  }
  addTrack(track) {
    this.#tracks.add(track);
    this.#attachTrack(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol.native]?.remove?.();
    track[TextTrackSymbol.native] = null;
    this.#tracks.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol.native];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.#track = track;
  }
  setDisplay(display) {
    this.#display = display;
    this.#onChange();
  }
  detach() {
    if (this.#video) this.#video.textTracks.onchange = null;
    for (const track of this.#tracks) this.removeTrack(track);
    this.#tracks.clear();
    this.#video = null;
    this.#track = null;
  }
  #attachTrack(track) {
    if (!this.#video) return;
    const el = track[TextTrackSymbol.native] ??= this.#createTrackElement(track);
    if (isHTMLElement(el)) {
      this.#video.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  #createTrackElement(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.#copyCues(track, el.track);
    }
    return el;
  }
  #copyCues(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length) return;
    for (const cue of track.cues) native.addCue(cue);
  }
  #onChange(event) {
    for (const track of this.#tracks) {
      const native = track[TextTrackSymbol.native];
      if (!native) continue;
      if (!this.#display) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing) this.#copyCues(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
};

// ../vidstack/src/core/tracks/text/render/text-renderer.ts
var TextRenderers = class {
  #video = null;
  #textTracks;
  #renderers = [];
  #media;
  #nativeDisplay = false;
  #nativeRenderer = null;
  #customRenderer = null;
  constructor(media) {
    this.#media = media;
    const textTracks = media.textTracks;
    this.#textTracks = textTracks;
    effect(this.#watchControls.bind(this));
    onDispose(this.#detach.bind(this));
    listenEvent(textTracks, "add", this.#onAddTrack.bind(this));
    listenEvent(textTracks, "remove", this.#onRemoveTrack.bind(this));
    listenEvent(textTracks, "mode-change", this.#update.bind(this));
  }
  #watchControls() {
    const { nativeControls } = this.#media.$state;
    this.#nativeDisplay = nativeControls();
    this.#update();
  }
  add(renderer) {
    this.#renderers.push(renderer);
    untrack(this.#update.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this.#renderers.splice(this.#renderers.indexOf(renderer), 1);
    untrack(this.#update.bind(this));
  }
  /** @internal */
  attachVideo(video) {
    requestAnimationFrame(() => {
      this.#video = video;
      if (video) {
        this.#nativeRenderer = new NativeTextRenderer();
        this.#nativeRenderer.attach(video);
        for (const track of this.#textTracks) this.#addNativeTrack(track);
      }
      this.#update();
    });
  }
  #addNativeTrack(track) {
    if (!isTrackCaptionKind(track)) return;
    this.#nativeRenderer?.addTrack(track);
  }
  #removeNativeTrack(track) {
    if (!isTrackCaptionKind(track)) return;
    this.#nativeRenderer?.removeTrack(track);
  }
  #onAddTrack(event) {
    this.#addNativeTrack(event.detail);
  }
  #onRemoveTrack(event) {
    this.#removeNativeTrack(event.detail);
  }
  #update() {
    const currentTrack = this.#textTracks.selected;
    if (this.#video && (this.#nativeDisplay || currentTrack?.[TextTrackSymbol.nativeHLS])) {
      this.#customRenderer?.changeTrack(null);
      this.#nativeRenderer?.setDisplay(true);
      this.#nativeRenderer?.changeTrack(currentTrack);
      return;
    }
    this.#nativeRenderer?.setDisplay(false);
    this.#nativeRenderer?.changeTrack(null);
    if (!currentTrack) {
      this.#customRenderer?.changeTrack(null);
      return;
    }
    const customRenderer = this.#renderers.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this.#video));
    if (this.#customRenderer !== customRenderer) {
      this.#customRenderer?.detach();
      customRenderer?.attach(this.#video);
      this.#customRenderer = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  #detach() {
    this.#nativeRenderer?.detach();
    this.#nativeRenderer = null;
    this.#customRenderer?.detach();
    this.#customRenderer = null;
  }
};

// ../vidstack/src/core/tracks/text/render/libass-text-renderer.ts
var LibASSTextRenderer = class {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
  }
  priority = 1;
  #instance = null;
  #track = null;
  #typeRE = /(ssa|ass)$/;
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this.#typeRE.test(track.type) || this.#typeRE.test(track.src));
  }
  attach(video) {
    if (!video) return;
    this.loader().then(async (mod) => {
      this.#instance = new mod.default({
        ...this.config,
        video,
        subUrl: this.#track?.src || ""
      });
      listenEvent(this.#instance, "ready", () => {
        const canvas = this.#instance?._canvas;
        if (canvas) canvas.style.pointerEvents = "none";
      });
      listenEvent(this.#instance, "error", (event) => {
        if (this.#track) {
          this.#track[TextTrackSymbol.readyState] = 3;
          this.#track.dispatchEvent(
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
      this.#freeTrack();
    } else if (this.#track !== track) {
      this.#instance?.setTrackByUrl(track.src);
      this.#track = track;
    }
  }
  detach() {
    this.#freeTrack();
  }
  #freeTrack() {
    this.#instance?.freeTrack();
    this.#track = null;
  }
};

// ../vidstack/src/foundation/list/list.ts
var List = class extends EventsTarget {
  items = [];
  /** @internal */
  [ListSymbol.readonly] = false;
  get length() {
    return this.items.length;
  }
  get readonly() {
    return this[ListSymbol.readonly];
  }
  /**
   * Returns the index of the first occurrence of the given item, or -1 if it is not present.
   */
  indexOf(item) {
    return this.items.indexOf(item);
  }
  /**
   * Returns an item matching the given `id`, or `null` if not present.
   */
  getById(id2) {
    if (id2 === "") return null;
    return this.items.find((item) => item.id === id2) ?? null;
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.items];
  }
  [Symbol.iterator]() {
    return this.items.values();
  }
  /** @internal */
  [ListSymbol.add](item, trigger) {
    const index = this.items.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.items[index];
        }
      });
    }
    if (this.items.includes(item)) return;
    this.items.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /** @internal */
  [ListSymbol.remove](item, trigger) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this[ListSymbol.onRemove]?.(item, trigger);
      this.items.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /** @internal */
  [ListSymbol.reset](trigger) {
    for (const item of [...this.items]) this[ListSymbol.remove](item, trigger);
    this.items = [];
    this[ListSymbol.setReadonly](false, trigger);
    this[ListSymbol.onReset]?.();
  }
  /** @internal */
  [ListSymbol.setReadonly](readonly, trigger) {
    if (this[ListSymbol.readonly] === readonly) return;
    this[ListSymbol.readonly] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
};

// ../../../node_modules/.pnpm/just-debounce-it@3.2.0/node_modules/just-debounce-it/index.mjs
var functionDebounce = debounce;
function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;
  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      debouncedFn = null;
      timeout = null;
    }
  };
  var flush = function() {
    var call = debouncedFn;
    clear();
    if (call) {
      call();
    }
  };
  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();
    debouncedFn = function() {
      fn.apply(context, args);
    };
    timeout = setTimeout(function() {
      timeout = null;
      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;
        return call();
      }
    }, wait);
    if (callNow) {
      return debouncedFn();
    }
  };
  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;
  return debounceWrapper;
}

// ../vidstack/src/core/tracks/text/text-tracks.ts
var TextTrackList = class extends List {
  #canLoad = false;
  #defaults = {};
  #storage = null;
  #preferredLang = null;
  /** @internal */
  [TextTrackSymbol.crossOrigin];
  constructor() {
    super();
  }
  get selected() {
    const track = this.items.find((t2) => t2.mode === "showing" && isTrackCaptionKind(t2));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this.#preferredLang;
  }
  set preferredLang(lang) {
    this.#preferredLang = lang;
    this.#saveLang(lang);
  }
  add(init2, trigger) {
    const isTrack = init2 instanceof TextTrack, track = isTrack ? init2 : new TextTrack(init2), kind = init2.kind === "captions" || init2.kind === "subtitles" ? "captions" : init2.kind;
    if (this.#defaults[kind] && init2.default) delete init2.default;
    track.addEventListener("mode-change", this.#onTrackModeChangeBind);
    this[ListSymbol.add](track, trigger);
    track[TextTrackSymbol.crossOrigin] = this[TextTrackSymbol.crossOrigin];
    if (this.#canLoad) track[TextTrackSymbol.canLoad]();
    if (init2.default) this.#defaults[kind] = track;
    this.#selectTracks();
    return this;
  }
  remove(track, trigger) {
    this.#pendingRemoval = track;
    if (!this.items.includes(track)) return;
    if (track === this.#defaults[track.kind]) delete this.#defaults[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol.onModeChange] = null;
    track.removeEventListener("mode-change", this.#onTrackModeChangeBind);
    this[ListSymbol.remove](track, trigger);
    this.#pendingRemoval = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this.items]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.items.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [TextTrackSymbol.canLoad]() {
    if (this.#canLoad) return;
    for (const track of this.items) track[TextTrackSymbol.canLoad]();
    this.#canLoad = true;
    this.#selectTracks();
  }
  #selectTracks = functionDebounce(async () => {
    if (!this.#canLoad) return;
    if (!this.#preferredLang && this.#storage) {
      this.#preferredLang = await this.#storage.getLang();
    }
    const showCaptions = await this.#storage?.getCaptions(), kinds = [
      ["captions", "subtitles"],
      "chapters",
      "descriptions",
      "metadata"
    ];
    for (const kind of kinds) {
      const tracks = this.getByKind(kind);
      if (tracks.find((t2) => t2.mode === "showing")) continue;
      const preferredTrack = this.#preferredLang ? tracks.find((track2) => track2.language === this.#preferredLang) : null;
      const defaultTrack = isArray(kind) ? this.#defaults[kind.find((kind2) => this.#defaults[kind2]) || ""] : this.#defaults[kind];
      const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
      if (track && (!isCaptionsKind || showCaptions !== false)) {
        track.mode = "showing";
        if (isCaptionsKind) this.#saveCaptionsTrack(track);
      }
    }
  }, 300);
  #pendingRemoval = null;
  #onTrackModeChangeBind = this.#onTrackModeChange.bind(this);
  #onTrackModeChange(event) {
    const track = event.detail;
    if (this.#storage && isTrackCaptionKind(track) && track !== this.#pendingRemoval) {
      this.#saveCaptionsTrack(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t2 of this.items) {
        if (t2.mode === "showing" && t2 != track && kinds.includes(t2.kind)) {
          t2.mode = "disabled";
        }
      }
    }
    this.dispatchEvent(
      new DOMEvent("mode-change", {
        detail: event.detail,
        trigger: event
      })
    );
  }
  #saveCaptionsTrack(track) {
    if (track.mode !== "disabled") {
      this.#saveLang(track.language);
    }
    this.#storage?.setCaptions?.(track.mode === "showing");
  }
  #saveLang(lang) {
    this.#storage?.setLang?.(this.#preferredLang = lang);
  }
  setStorage(storage) {
    this.#storage = storage;
  }
};

// ../vidstack/src/foundation/list/select-list.ts
var SELECTED = Symbol(true ? "SELECTED" : 0);
var SelectList = class extends List {
  get selected() {
    return this.items.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol.onRemove](item, trigger) {
    this[ListSymbol.select](item, false, trigger);
  }
  /** @internal */
  [ListSymbol.add](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly) return;
        this[ListSymbol.onUserSelect]?.();
        this[ListSymbol.select](item, selected);
      }
    });
    super[ListSymbol.add](item, trigger);
  }
  /** @internal */
  [ListSymbol.select](item, selected, trigger) {
    if (selected === item?.[SELECTED]) return;
    const prev = this.selected;
    if (item) item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev) prev[SELECTED] = false;
      this.dispatchEvent(
        new DOMEvent("change", {
          detail: {
            prev,
            current: this.selected
          },
          trigger
        })
      );
    }
  }
};

// ../vidstack/src/core/tracks/audio-tracks.ts
var AudioTrackList = class extends SelectList {
};

// ../vidstack/src/core/quality/video-quality.ts
var VideoQualityList = class extends SelectList {
  #auto = false;
  /**
   * Configures quality switching:
   *
   * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
   * request if any, flush the whole buffer, and fetch fragment matching with current position
   * and requested quality level.
   *
   * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
   * already buffered next fragment.
   *
   * - `load`: Set quality level for next loaded fragment.
   *
   * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
   */
  switch = "current";
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this.#auto || this.readonly;
  }
  /** @internal */
  [QualitySymbol.enableAuto];
  /** @internal */
  [ListSymbol.onUserSelect]() {
    this[QualitySymbol.setAuto](false);
  }
  /** @internal */
  [ListSymbol.onReset](trigger) {
    this[QualitySymbol.enableAuto] = void 0;
    this[QualitySymbol.setAuto](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.#auto || !this[QualitySymbol.enableAuto]) return;
    this[QualitySymbol.enableAuto]?.(trigger);
    this[QualitySymbol.setAuto](true, trigger);
  }
  getBySrc(src) {
    return this.items.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol.setAuto](auto, trigger) {
    if (this.#auto === auto) return;
    this.#auto = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
};

// ../vidstack/src/core/quality/utils.ts
function sortVideoQualities(qualities, desc) {
  return [...qualities].sort(desc ? compareVideoQualityDesc : compareVideoQualityAsc);
}
function compareVideoQualityAsc(a, b) {
  return a.height === b.height ? (a.bitrate ?? 0) - (b.bitrate ?? 0) : a.height - b.height;
}
function compareVideoQualityDesc(a, b) {
  return b.height === a.height ? (b.bitrate ?? 0) - (a.bitrate ?? 0) : b.height - a.height;
}

// ../vidstack/src/providers/type-check.ts
function isAudioProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "AUDIO";
}
function isVideoProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "VIDEO";
}
function isHLSProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "HLS";
}
function isDASHProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "DASH";
}
function isYouTubeProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "YOUTUBE";
}
function isVimeoProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "VIMEO";
}
function isGoogleCastProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "GOOGLE_CAST";
}
function isHTMLAudioElement(element) {
  return !IS_SERVER && element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return !IS_SERVER && element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
function isHTMLIFrameElement(element) {
  return !IS_SERVER && element instanceof HTMLIFrameElement;
}

// ../vidstack/src/core/api/player-controller.ts
var MediaPlayerController = class extends ViewController {
};

// ../vidstack/src/core/keyboard/controller.ts
var MEDIA_KEY_SHORTCUTS = {
  togglePaused: "k Space",
  toggleMuted: "m",
  toggleFullscreen: "f",
  togglePictureInPicture: "i",
  toggleCaptions: "c",
  seekBackward: "j J ArrowLeft",
  seekForward: "l L ArrowRight",
  volumeUp: "ArrowUp",
  volumeDown: "ArrowDown",
  speedUp: ">",
  slowDown: "<"
};
var MODIFIER_KEYS = /* @__PURE__ */ new Set(["Shift", "Alt", "Meta", "Ctrl"]);
var BUTTON_SELECTORS = 'button, [role="button"]';
var IGNORE_SELECTORS = 'input, textarea, select, [contenteditable], [role^="menuitem"], [role="timer"]';
var MediaKeyboardController = class extends MediaPlayerController {
  #media;
  constructor(media) {
    super();
    this.#media = media;
  }
  onConnect() {
    effect(this.#onTargetChange.bind(this));
  }
  #onTargetChange() {
    const { keyDisabled, keyTarget } = this.$props;
    if (keyDisabled()) return;
    const target = keyTarget() === "player" ? this.el : document, $active = signal(false);
    if (target === this.el) {
      this.listen("focusin", () => $active.set(true));
      this.listen("focusout", (event) => {
        if (!this.el.contains(event.target)) $active.set(false);
      });
    } else {
      if (!peek($active)) $active.set(document.querySelector("[data-media-player]") === this.el);
      listenEvent(document, "focusin", (event) => {
        const activePlayer = event.composedPath().find((el) => el instanceof Element && el.localName === "media-player");
        if (activePlayer !== void 0) $active.set(this.el === activePlayer);
      });
    }
    effect(() => {
      if (!$active()) return;
      listenEvent(target, "keyup", this.#onKeyUp.bind(this));
      listenEvent(target, "keydown", this.#onKeyDown.bind(this));
      listenEvent(target, "keydown", this.#onPreventVideoKeys.bind(this), { capture: true });
    });
  }
  #onKeyUp(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method: method2, value } = this.#getMatchingMethod(event);
    if (!isString(value) && !isArray(value)) {
      value?.onKeyUp?.({
        event,
        player: this.#media.player,
        remote: this.#media.remote
      });
      value?.callback?.(event, this.#media.remote);
      return;
    }
    if (method2?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this.#timeSlider) {
        this.#forwardTimeKeyboardEvent(event, method2 === "seekForward");
        this.#timeSlider = null;
      } else {
        this.#media.remote.seek(this.#seekTotal, event);
        this.#seekTotal = void 0;
      }
    }
    if (method2?.startsWith("volume")) {
      const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
      volumeSlider?.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: method2 === "volumeUp" ? "Up" : "Down",
          shiftKey: event.shiftKey,
          trigger: event
        })
      );
    }
  }
  #onKeyDown(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key)) return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method: method2, value } = this.#getMatchingMethod(event), isNumberPress = !event.metaKey && /^[0-9]$/.test(event.key);
    if (!isString(value) && !isArray(value) && !isNumberPress) {
      value?.onKeyDown?.({
        event,
        player: this.#media.player,
        remote: this.#media.remote
      });
      value?.callback?.(event, this.#media.remote);
      return;
    }
    if (!method2 && isNumberPress) {
      event.preventDefault();
      event.stopPropagation();
      this.#media.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method2) return;
    event.preventDefault();
    event.stopPropagation();
    switch (method2) {
      case "seekForward":
      case "seekBackward":
        this.#seeking(event, method2, method2 === "seekForward");
        break;
      case "volumeUp":
      case "volumeDown":
        const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
        if (volumeSlider) {
          volumeSlider.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: method2 === "volumeUp" ? "Up" : "Down",
              shiftKey: event.shiftKey,
              trigger: event
            })
          );
        } else {
          const value2 = event.shiftKey ? 0.1 : 0.05;
          this.#media.remote.changeVolume(
            this.$state.volume() + (method2 === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this.#media.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this.#media.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method2 === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this.#media.remote[method2]?.(event);
    }
    this.$state.lastKeyboardAction.set({
      action: method2,
      event
    });
  }
  #onPreventVideoKeys(event) {
    if (isHTMLMediaElement(event.target) && this.#getMatchingMethod(event).method) {
      event.preventDefault();
    }
  }
  #getMatchingMethod(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this.#media.ariaKeys
    };
    const method2 = Object.keys(keyShortcuts).find((method3) => {
      const value = keyShortcuts[method3], keys = isArray(value) ? value.join(" ") : isString(value) ? value : value?.keys;
      const combinations = (isArray(keys) ? keys : keys?.split(" "))?.map(
        (key2) => replaceSymbolKeys(key2).replace(/Control/g, "Ctrl").split("+")
      );
      return combinations?.some((combo) => {
        const modifierKeys = new Set(combo.filter((key2) => MODIFIER_KEYS.has(key2)));
        for (const modKey of MODIFIER_KEYS) {
          const modKeyProp = modKey.toLowerCase() + "Key";
          if (!modifierKeys.has(modKey) && event[modKeyProp]) {
            return false;
          }
        }
        return combo.every((key2) => {
          return MODIFIER_KEYS.has(key2) ? event[key2.toLowerCase() + "Key"] : event.key === key2.replace("Space", " ");
        });
      });
    });
    return {
      method: method2,
      value: method2 ? keyShortcuts[method2] : null
    };
  }
  #seekTotal;
  #calcSeekAmount(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this.#seekTotal = Math.max(
      0,
      Math.min(
        (this.#seekTotal ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  #timeSlider = null;
  #forwardTimeKeyboardEvent(event, forward) {
    this.#timeSlider?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  #seeking(event, type, forward) {
    if (!this.$state.canSeek()) return;
    if (!this.#timeSlider) {
      this.#timeSlider = this.el.querySelector("[data-media-time-slider]");
    }
    if (this.#timeSlider) {
      this.#forwardTimeKeyboardEvent(event, forward);
    } else {
      this.#media.remote.seeking(this.#calcSeekAmount(event, type), event);
    }
  }
};
var SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key2) {
  return key2.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}

// ../vidstack/src/core/keyboard/aria-shortcuts.ts
var ARIAKeyShortcuts = class extends ViewController {
  #shortcut;
  constructor(shortcut) {
    super();
    this.#shortcut = shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this.#shortcut] = keys;
      if (!IS_SERVER) {
        onDispose(() => {
          delete ariaKeys[this.#shortcut];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this.#shortcut];
    if (shortcuts) {
      const keys2 = isArray(shortcuts) ? shortcuts.join(" ") : isString(shortcuts) ? shortcuts : shortcuts?.keys;
      el.setAttribute("aria-keyshortcuts", isArray(keys2) ? keys2.join(" ") : keys2);
    }
  }
};

// ../vidstack/src/core/controls.ts
var MediaControls = class extends MediaPlayerController {
  #idleTimer = -2;
  #pausedTracking = false;
  #hideOnMouseLeave = signal(false);
  #isMouseOutside = signal(false);
  #focusedItem = null;
  #canIdle = signal(true);
  /**
   * The default amount of delay in milliseconds while media playback is progressing without user
   * activity to indicate an idle state (i.e., hide controls).
   *
   * @defaultValue 2000
   */
  defaultDelay = 2e3;
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return this.#canIdle();
  }
  set canIdle(canIdle) {
    this.#canIdle.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this.#hideOnMouseLeave() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this.#hideOnMouseLeave.set(hide);
  }
  /**
   * Whether media controls are currently visible.
   */
  get showing() {
    return this.$state.controlsVisible();
  }
  /**
   * Show controls.
   */
  show(delay = 0, trigger) {
    this.#clearIdleTimer();
    if (!this.#pausedTracking) {
      this.#changeVisibility(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this.#clearIdleTimer();
    if (!this.#pausedTracking) {
      this.#changeVisibility(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this.#pausedTracking = true;
    this.#clearIdleTimer();
    this.#changeVisibility(true, 0, trigger);
  }
  resume(trigger) {
    this.#pausedTracking = false;
    if (this.$state.paused()) return;
    this.#changeVisibility(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this.#init.bind(this));
  }
  #init() {
    const { viewType } = this.$state;
    if (!this.#canIdle()) return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this.#watchMouse.bind(this));
    effect(this.#watchPaused.bind(this));
    const onPlay = this.#onPlay.bind(this), onPause = this.#onPause.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  #watchMouse() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine") return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this.#isMouseOutside()) {
      effect(() => {
        if (!paused()) this.listen("pointermove", this.#onStopIdle.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this.#onMouseEnter.bind(this));
      this.listen("mouseleave", this.#onMouseLeave.bind(this));
    }
  }
  #watchPaused() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started()) return;
    const onStopIdle = this.#onStopIdle.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  #onPlay(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  #onPause(event) {
    this.show(0, event);
  }
  #onMouseEnter(event) {
    this.#isMouseOutside.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  #onMouseLeave(event) {
    this.#isMouseOutside.set(true);
    this.hide(0, event);
  }
  #clearIdleTimer() {
    window.clearTimeout(this.#idleTimer);
    this.#idleTimer = -1;
  }
  #onStopIdle(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this.#pausedTracking || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this.#focusedItem = null;
      } else if (this.#focusedItem) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this.#focusedItem?.focus();
          this.#focusedItem = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  #changeVisibility(visible, delay, trigger) {
    if (delay === 0) {
      this.#onChange(visible, trigger);
      return;
    }
    this.#idleTimer = window.setTimeout(() => {
      if (!this.scope) return;
      this.#onChange(visible && !this.#pausedTracking, trigger);
    }, delay);
  }
  #onChange(visible, trigger) {
    if (this.$state.controlsVisible() === visible) return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this.#focusedItem = document.activeElement;
      requestAnimationFrame(() => {
        this.el?.focus({ preventScroll: true });
      });
    }
    this.dispatch("controls-change", {
      detail: visible,
      trigger
    });
  }
};

// ../vidstack/src/foundation/fullscreen/controller.ts
var CAN_FULLSCREEN = fscreen_esm_default.fullscreenEnabled;
var FullscreenController = class extends ViewController {
  /**
   * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
   * listened to globally on the document so we need to know if they relate to the current host
   * element or not.
   */
  #listening = false;
  #active = false;
  get active() {
    return this.#active;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen_esm_default, "fullscreenchange", this.#onChange.bind(this));
    listenEvent(fscreen_esm_default, "fullscreenerror", this.#onError.bind(this));
    onDispose(this.#onDisconnect.bind(this));
  }
  async #onDisconnect() {
    if (CAN_FULLSCREEN) await this.exit();
  }
  #onChange(event) {
    const active = isFullscreen(this.el);
    if (active === this.#active) return;
    if (!active) this.#listening = false;
    this.#active = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  #onError(event) {
    if (!this.#listening) return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this.#listening = false;
  }
  async enter() {
    try {
      this.#listening = true;
      if (!this.el || isFullscreen(this.el)) return;
      assertFullscreenAPI();
      return fscreen_esm_default.requestFullscreen(this.el);
    } catch (error) {
      this.#listening = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el)) return;
    assertFullscreenAPI();
    return fscreen_esm_default.exitFullscreen();
  }
};
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen_esm_default.fullscreenElement === host) return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen_esm_default.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN) return;
  throw Error(
    true ? "[vidstack] fullscreen API is not enabled or supported in this environment" : "[vidstack] no fullscreen API"
  );
}

// ../vidstack/src/foundation/orientation/controller.ts
var ScreenOrientationController = class _ScreenOrientationController extends ViewController {
  #type = signal(this.#getScreenOrientation());
  #locked = signal(false);
  #currentLock;
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.#type();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.#locked();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.#type().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.#type().startsWith("landscape");
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  static supported = canOrientScreen();
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return _ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this.#onOrientationChange.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.#onOrientationChange.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this.#onDisconnect.bind(this));
  }
  async #onDisconnect() {
    if (this.supported && this.#locked()) await this.unlock();
  }
  #onOrientationChange(event) {
    this.#type.set(this.#getScreenOrientation());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.#type),
        lock: this.#currentLock
      },
      trigger: event
    });
  }
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async lock(lockType) {
    if (peek(this.#locked) || this.#currentLock === lockType) return;
    this.#assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    this.#locked.set(true);
    this.#currentLock = lockType;
  }
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async unlock() {
    if (!peek(this.#locked)) return;
    this.#assertScreenOrientationAPI();
    this.#currentLock = void 0;
    await screen.orientation.unlock();
    this.#locked.set(false);
  }
  #assertScreenOrientationAPI() {
    if (this.supported) return;
    throw Error(
      true ? "[vidstack] screen orientation API is not available" : "[vidstack] no orientation API"
    );
  }
  #getScreenOrientation() {
    if (IS_SERVER) return "portrait-primary";
    if (this.supported) return window.screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }
};

// ../vidstack/src/providers/audio/loader.ts
var AudioProviderLoader = class {
  name = "audio";
  target;
  canPlay(src) {
    if (!isAudioSrc(src)) return false;
    return IS_SERVER || !isString(src.src) || src.type === "?" || canPlayAudioType(this.target, src.type);
  }
  mediaType() {
    return "audio";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load audio provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<audio>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import("./vidstack-4WCMBBIY.js")).AudioProvider(this.target, ctx);
  }
};

// ../vidstack/src/providers/video/loader.ts
var VideoProviderLoader = class {
  name = "video";
  target;
  canPlay(src) {
    if (!isVideoSrc(src)) return false;
    return IS_SERVER || !isString(src.src) || src.type === "?" || canPlayVideoType(this.target, src.type);
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load video provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import("./vidstack-LL4IWAOG.js")).VideoProvider(this.target, ctx);
  }
};

// ../vidstack/src/providers/hls/loader.ts
var HLSProviderLoader = class _HLSProviderLoader extends VideoProviderLoader {
  static supported = isHLSSupported();
  name = "hls";
  canPlay(src) {
    return _HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load hls provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import("./vidstack-4OA3QCVF.js")).HLSProvider(this.target, context);
  }
};

// ../vidstack/src/providers/dash/loader.ts
var DASHProviderLoader = class _DASHProviderLoader extends VideoProviderLoader {
  static supported = isDASHSupported();
  name = "dash";
  canPlay(src) {
    return _DASHProviderLoader.supported && isDASHSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load dash provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import("./vidstack-V6K2IX6K.js")).DASHProvider(this.target, context);
  }
};

// ../vidstack/src/providers/vimeo/loader.ts
var VimeoProviderLoader = class {
  name = "vimeo";
  target;
  preconnect() {
    const connections = [
      "https://i.vimeocdn.com",
      "https://f.vimeocdn.com",
      "https://fresnel.vimeocdn.com"
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/vimeo";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load vimeo provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import("./vidstack-EAVTBGB3.js")).VimeoProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId, getVimeoVideoInfo } = await import("./vidstack-YTI5TMBD.js");
    if (!isString(src.src)) return null;
    const { videoId, hash } = resolveVimeoVideoId(src.src);
    if (videoId) {
      return getVimeoVideoInfo(videoId, abort, hash).then((info) => info ? info.poster : null);
    }
    return null;
  }
};

// ../vidstack/src/providers/youtube/loader.ts
var YouTubeProviderLoader = class {
  name = "youtube";
  target;
  preconnect() {
    const connections = [
      // Botguard script.
      "https://www.google.com",
      // Posters.
      "https://i.ytimg.com",
      // Ads.
      "https://googleads.g.doubleclick.net",
      "https://static.doubleclick.net"
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/youtube";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load youtube provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import("./vidstack-MSAE4WSM.js")).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import("./vidstack-TRG3JEXJ.js");
    const videoId = isString(src.src) && resolveYouTubeVideoId(src.src);
    if (videoId) return findYouTubePoster(videoId, abort);
    return null;
  }
};

// ../vidstack/src/utils/time.ts
function padNumberWithZeroes(num, expectedLength) {
  const str = String(num);
  const actualLength = str.length;
  const shouldPad = actualLength < expectedLength;
  if (shouldPad) {
    const padLength = expectedLength - actualLength;
    const padding = `0`.repeat(padLength);
    return `${padding}${num}`;
  }
  return str;
}
function parseTime(duration) {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc(duration % 3600 / 60);
  const seconds = Math.trunc(duration % 60);
  const fraction = Number((duration - Math.trunc(duration)).toPrecision(3));
  return {
    hours,
    minutes,
    seconds,
    fraction
  };
}
function formatTime(duration, { padHrs = null, padMins = null, showHrs = false, showMs = false } = {}) {
  const { hours, minutes, seconds, fraction } = parseTime(duration), paddedHours = padHrs ? padNumberWithZeroes(hours, 2) : hours, paddedMinutes = padMins || isNull(padMins) && duration >= 3600 ? padNumberWithZeroes(minutes, 2) : minutes, paddedSeconds = padNumberWithZeroes(seconds, 2), paddedMs = showMs && fraction > 0 ? `.${String(fraction).replace(/^0?\./, "")}` : "", time = `${paddedMinutes}:${paddedSeconds}${paddedMs}`;
  return hours > 0 || showHrs ? `${paddedHours}:${time}` : time;
}
function formatSpokenTime(duration) {
  const spokenParts = [];
  const { hours, minutes, seconds } = parseTime(duration);
  if (hours > 0) {
    spokenParts.push(`${hours} hour`);
  }
  if (minutes > 0) {
    spokenParts.push(`${minutes} min`);
  }
  if (seconds > 0 || spokenParts.length === 0) {
    spokenParts.push(`${seconds} sec`);
  }
  return spokenParts.join(" ");
}

// ../vidstack/src/components/ui/sliders/slider/api/state.ts
var sliderState = new State({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  pointerValue: 0,
  focused: false,
  dragging: false,
  pointing: false,
  hidden: false,
  get active() {
    return this.dragging || this.focused || this.pointing;
  },
  get fillRate() {
    return calcRate(this.min, this.max, this.value);
  },
  get fillPercent() {
    return this.fillRate * 100;
  },
  get pointerRate() {
    return calcRate(this.min, this.max, this.pointerValue);
  },
  get pointerPercent() {
    return this.pointerRate * 100;
  }
});
function calcRate(min, max, value) {
  const range = max - min, offset = value - min;
  return range > 0 ? offset / range : 0;
}

// ../vidstack/src/components/ui/menu/menu-context.ts
var menuContext = createContext();

// ../vidstack/src/components/ui/menu/radio/radio-controller.ts
var radioControllerContext = createContext();

// ../vidstack/src/components/ui/menu/radio/radio-group-controller.ts
var RadioGroupController = class extends ViewController {
  #group = /* @__PURE__ */ new Set();
  #value = signal("");
  #controller = null;
  onValueChange;
  get values() {
    return Array.from(this.#group).map((radio) => radio.value());
  }
  get value() {
    return this.#value();
  }
  set value(value) {
    this.#onChange(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this.#addRadio.bind(this),
      remove: this.#removeRadio.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem) setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this.#value });
  }
  onDestroy() {
    this.#group.clear();
  }
  #addRadio(radio) {
    if (this.#group.has(radio)) return;
    this.#group.add(radio);
    radio.onCheck = this.#onChangeBind;
    radio.check(radio.value() === this.#value());
  }
  #removeRadio(radio) {
    radio.onCheck = null;
    this.#group.delete(radio);
  }
  #onChangeBind = this.#onChange.bind(this);
  #onChange(newValue, trigger) {
    const currentValue = peek(this.#value);
    if (!newValue || newValue === currentValue) return;
    const currentRadio = this.#findRadio(currentValue), newRadio = this.#findRadio(newValue);
    currentRadio?.check(false, trigger);
    newRadio?.check(true, trigger);
    this.#value.set(newValue);
    this.onValueChange?.(newValue, trigger);
  }
  #findRadio(newValue) {
    for (const radio of this.#group) {
      if (newValue === peek(radio.value)) return radio;
    }
    return null;
  }
};

// ../vidstack/src/components/ui/menu/radio-groups/audio-gain-radio-group.ts
var DEFAULT_AUDIO_GAINS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
var _getOptions_dec, _disabled_dec, _value_dec, _a, _media, _menu, _controller, _init, _AudioGainRadioGroup_instances, watchValue_fn, watchHintText_fn, watchControllerDisabled_fn, getValue_fn, onValueChange_fn;
var AudioGainRadioGroup = class extends (_a = Component, _value_dec = [prop], _disabled_dec = [prop], _getOptions_dec = [method], _a) {
  constructor() {
    super();
    __runInitializers(_init, 5, this);
    __privateAdd(this, _AudioGainRadioGroup_instances);
    __privateAdd(this, _media);
    __privateAdd(this, _menu);
    __privateAdd(this, _controller);
    __privateSet(this, _controller, new RadioGroupController());
    __privateGet(this, _controller).onValueChange = __privateMethod(this, _AudioGainRadioGroup_instances, onValueChange_fn).bind(this);
  }
  get value() {
    return __privateGet(this, _controller).value;
  }
  get disabled() {
    const { gains } = this.$props, { canSetAudioGain } = __privateGet(this, _media).$state;
    return !canSetAudioGain() || gains().length === 0;
  }
  onSetup() {
    __privateSet(this, _media, useMediaContext());
    if (hasProvidedContext(menuContext)) {
      __privateSet(this, _menu, useContext(menuContext));
    }
  }
  onConnect(el) {
    effect(__privateMethod(this, _AudioGainRadioGroup_instances, watchValue_fn).bind(this));
    effect(__privateMethod(this, _AudioGainRadioGroup_instances, watchHintText_fn).bind(this));
    effect(__privateMethod(this, _AudioGainRadioGroup_instances, watchControllerDisabled_fn).bind(this));
  }
  getOptions() {
    const { gains, normalLabel } = this.$props;
    return gains().map((gain) => ({
      label: gain === 1 || gain === null ? normalLabel : String(gain * 100) + "%",
      value: gain.toString()
    }));
  }
};
_init = __decoratorStart(_a);
_media = new WeakMap();
_menu = new WeakMap();
_controller = new WeakMap();
_AudioGainRadioGroup_instances = new WeakSet();
watchValue_fn = function() {
  __privateGet(this, _controller).value = __privateMethod(this, _AudioGainRadioGroup_instances, getValue_fn).call(this);
};
watchHintText_fn = function() {
  const { normalLabel } = this.$props, { audioGain } = __privateGet(this, _media).$state, gain = audioGain();
  __privateGet(this, _menu)?.hint.set(gain === 1 || gain == null ? normalLabel() : String(gain * 100) + "%");
};
watchControllerDisabled_fn = function() {
  __privateGet(this, _menu)?.disable(this.disabled);
};
getValue_fn = function() {
  const { audioGain } = __privateGet(this, _media).$state;
  return audioGain()?.toString() ?? "1";
};
onValueChange_fn = function(value, trigger) {
  if (this.disabled) return;
  const gain = +value;
  __privateGet(this, _media).remote.changeAudioGain(gain, trigger);
  this.dispatch("change", { detail: gain, trigger });
};
__decorateElement(_init, 2, "value", _value_dec, AudioGainRadioGroup);
__decorateElement(_init, 2, "disabled", _disabled_dec, AudioGainRadioGroup);
__decorateElement(_init, 1, "getOptions", _getOptions_dec, AudioGainRadioGroup);
__decoratorMetadata(_init, AudioGainRadioGroup);
__publicField(AudioGainRadioGroup, "props", {
  normalLabel: "Disabled",
  gains: DEFAULT_AUDIO_GAINS
});

// ../vidstack/src/components/ui/menu/radio-groups/speed-radio-group.ts
var DEFAULT_PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
var _getOptions_dec2, _disabled_dec2, _value_dec2, _a2, _media2, _menu2, _controller2, _init2, _SpeedRadioGroup_instances, watchValue_fn2, watchHintText_fn2, watchControllerDisabled_fn2, getValue_fn2, onValueChange_fn2;
var SpeedRadioGroup = class extends (_a2 = Component, _value_dec2 = [prop], _disabled_dec2 = [prop], _getOptions_dec2 = [method], _a2) {
  constructor() {
    super();
    __runInitializers(_init2, 5, this);
    __privateAdd(this, _SpeedRadioGroup_instances);
    __privateAdd(this, _media2);
    __privateAdd(this, _menu2);
    __privateAdd(this, _controller2);
    __privateSet(this, _controller2, new RadioGroupController());
    __privateGet(this, _controller2).onValueChange = __privateMethod(this, _SpeedRadioGroup_instances, onValueChange_fn2).bind(this);
  }
  get value() {
    return __privateGet(this, _controller2).value;
  }
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = __privateGet(this, _media2).$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  onSetup() {
    __privateSet(this, _media2, useMediaContext());
    if (hasProvidedContext(menuContext)) {
      __privateSet(this, _menu2, useContext(menuContext));
    }
  }
  onConnect(el) {
    effect(__privateMethod(this, _SpeedRadioGroup_instances, watchValue_fn2).bind(this));
    effect(__privateMethod(this, _SpeedRadioGroup_instances, watchHintText_fn2).bind(this));
    effect(__privateMethod(this, _SpeedRadioGroup_instances, watchControllerDisabled_fn2).bind(this));
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate.toString()
    }));
  }
};
_init2 = __decoratorStart(_a2);
_media2 = new WeakMap();
_menu2 = new WeakMap();
_controller2 = new WeakMap();
_SpeedRadioGroup_instances = new WeakSet();
watchValue_fn2 = function() {
  __privateGet(this, _controller2).value = __privateMethod(this, _SpeedRadioGroup_instances, getValue_fn2).call(this);
};
watchHintText_fn2 = function() {
  const { normalLabel } = this.$props, { playbackRate } = __privateGet(this, _media2).$state, rate = playbackRate();
  __privateGet(this, _menu2)?.hint.set(rate === 1 ? normalLabel() : rate + "\xD7");
};
watchControllerDisabled_fn2 = function() {
  __privateGet(this, _menu2)?.disable(this.disabled);
};
getValue_fn2 = function() {
  const { playbackRate } = __privateGet(this, _media2).$state;
  return playbackRate().toString();
};
onValueChange_fn2 = function(value, trigger) {
  if (this.disabled) return;
  const rate = +value;
  __privateGet(this, _media2).remote.changePlaybackRate(rate, trigger);
  this.dispatch("change", { detail: rate, trigger });
};
__decorateElement(_init2, 2, "value", _value_dec2, SpeedRadioGroup);
__decorateElement(_init2, 2, "disabled", _disabled_dec2, SpeedRadioGroup);
__decorateElement(_init2, 1, "getOptions", _getOptions_dec2, SpeedRadioGroup);
__decoratorMetadata(_init2, SpeedRadioGroup);
__publicField(SpeedRadioGroup, "props", {
  normalLabel: "Normal",
  rates: DEFAULT_PLAYBACK_RATES
});

// ../vidstack/src/core/api/media-attrs.ts
var MEDIA_ATTRIBUTES = Symbol(true ? "MEDIA_ATTRIBUTES" : 0);
var mediaAttributes = [
  "autoPlay",
  "canAirPlay",
  "canFullscreen",
  "canGoogleCast",
  "canLoad",
  "canLoadPoster",
  "canPictureInPicture",
  "canPlay",
  "canSeek",
  "ended",
  "fullscreen",
  "isAirPlayConnected",
  "isGoogleCastConnected",
  "live",
  "liveEdge",
  "loop",
  "mediaType",
  "muted",
  "paused",
  "pictureInPicture",
  "playing",
  "playsInline",
  "remotePlaybackState",
  "remotePlaybackType",
  "seeking",
  "started",
  "streamType",
  "viewType",
  "waiting"
];

// ../vidstack/src/core/api/player-props.ts
var mediaPlayerProps = {
  artist: "",
  artwork: null,
  autoplay: false,
  autoPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  currentTime: 0,
  crossorigin: null,
  crossOrigin: null,
  duration: -1,
  fullscreenOrientation: "landscape",
  googleCast: {},
  load: "visible",
  posterLoad: "visible",
  logLevel: true ? "warn" : "silent",
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playsInline: false,
  playbackRate: 1,
  poster: "",
  preload: "metadata",
  preferNativeHLS: false,
  src: "",
  title: "",
  controlsDelay: 2e3,
  hideControlsOnMouseLeave: false,
  viewType: "unknown",
  streamType: "unknown",
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: "player",
  keyShortcuts: MEDIA_KEY_SHORTCUTS,
  storage: null
};

// ../vidstack/src/core/state/media-events-logger.ts
var MEDIA_EVENTS = true ? [
  "abort",
  "can-play",
  "can-play-through",
  "duration-change",
  "emptied",
  "ended",
  "error",
  "fullscreen-change",
  "loaded-data",
  "loaded-metadata",
  "load-start",
  "media-type-change",
  "pause",
  "play",
  "playing",
  "progress",
  "seeked",
  "seeking",
  "source-change",
  "sources-change",
  "stalled",
  "started",
  "suspend",
  "stream-type-change",
  "replay",
  // time-change,
  // 'time-update',
  "view-type-change",
  "volume-change",
  "waiting"
] : void 0;
var MediaEventsLogger = class extends MediaPlayerController {
  #media;
  constructor(media) {
    super();
    this.#media = media;
  }
  onConnect() {
    const handler = this.#onMediaEvent.bind(this);
    for (const eventType of MEDIA_EVENTS) this.listen(eventType, handler);
  }
  #onMediaEvent(event) {
    this.#media.logger?.debugGroup(`\u{1F4E1} dispatching \`${event.type}\``).labelledLog("Media Store", { ...this.$state }).labelledLog("Event", event).dispatch();
  }
};

// ../vidstack/src/core/state/media-load-controller.ts
var MediaLoadController = class extends MediaPlayerController {
  #type;
  #callback;
  constructor(type, callback) {
    super();
    this.#type = type;
    this.#callback = callback;
  }
  async onAttach(el) {
    if (IS_SERVER) return;
    const load = this.$props[this.#type]();
    if (load === "eager") {
      requestAnimationFrame(this.#callback);
    } else if (load === "idle") {
      waitIdlePeriod(this.#callback);
    } else if (load === "visible") {
      let dispose, observer = new IntersectionObserver((entries) => {
        if (!this.scope) return;
        if (entries[0].isIntersecting) {
          dispose?.();
          dispose = void 0;
          this.#callback();
        }
      });
      observer.observe(el);
      dispose = onDispose(() => observer.disconnect());
    }
  }
};

// ../vidstack/src/core/state/media-player-delegate.ts
var seenAutoplayWarning = false;
var MediaPlayerDelegate = class {
  #handle;
  #media;
  constructor(handle, media) {
    this.#handle = handle;
    this.#media = media;
  }
  notify(type, ...init2) {
    if (IS_SERVER) return;
    this.#handle(
      new DOMEvent(type, {
        detail: init2?.[0],
        trigger: init2?.[1]
      })
    );
  }
  async ready(info, trigger) {
    if (IS_SERVER) return;
    return untrack(async () => {
      const { logger } = this.#media, {
        autoPlay,
        canPlay,
        started,
        duration,
        seekable,
        buffered,
        remotePlaybackInfo,
        playsInline,
        savedState,
        source
      } = this.#media.$state;
      if (canPlay()) return;
      const detail = {
        duration: info?.duration ?? duration(),
        seekable: info?.seekable ?? seekable(),
        buffered: info?.buffered ?? buffered(),
        provider: this.#media.$provider()
      };
      this.notify("can-play", detail, trigger);
      tick();
      if (true) {
        logger?.infoGroup("-~-~-~-~-~-~- \u2705 MEDIA READY -~-~-~-~-~-~-").labelledLog("Media", this.#media).labelledLog("Trigger Event", trigger).dispatch();
      }
      let provider = this.#media.$provider(), { storage, qualities } = this.#media, { muted, volume, clipStartTime, playbackRate } = this.#media.$props;
      await storage?.onLoad?.(source());
      const savedPlaybackTime = savedState()?.currentTime, savedPlayingState = savedState()?.paused, storageTime = await storage?.getTime(), startTime = savedPlaybackTime ?? storageTime ?? clipStartTime(), shouldAutoPlay = savedPlayingState || savedPlayingState !== false && !started() && autoPlay();
      if (provider) {
        provider.setVolume(await storage?.getVolume() ?? volume());
        provider.setMuted(muted() || !!await storage?.getMuted());
        const audioGain = await storage?.getAudioGain() ?? 1;
        if (audioGain > 1) provider.audioGain?.setGain?.(audioGain);
        provider.setPlaybackRate?.(await storage?.getPlaybackRate() ?? playbackRate());
        provider.setPlaysInline?.(playsInline());
        if (startTime > 0) provider.setCurrentTime(startTime);
      }
      const prefQuality = await storage?.getVideoQuality();
      if (prefQuality && qualities.length) {
        let currentQuality = null, currentScore = Infinity;
        for (const quality of qualities) {
          const score = Math.abs(prefQuality.width - quality.width) + Math.abs(prefQuality.height - quality.height) + (prefQuality.bitrate ? Math.abs(prefQuality.bitrate - (quality.bitrate ?? 0)) : 0);
          if (score < currentScore) {
            currentQuality = quality;
            currentScore = score;
          }
        }
        if (currentQuality) currentQuality.selected = true;
      }
      if (canPlay() && shouldAutoPlay) {
        await this.#attemptAutoplay(trigger);
      } else if (storageTime && storageTime > 0) {
        this.notify("started", void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
  async #attemptAutoplay(trigger) {
    const {
      player,
      $state: { autoPlaying, muted }
    } = this.#media;
    autoPlaying.set(true);
    const attemptEvent = new DOMEvent("auto-play-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
      if (!seenAutoplayWarning) {
        const muteMsg = !muted() ? " Attempting with volume muted will most likely resolve the issue." : "";
        this.#media.logger?.errorGroup("[vidstack] auto-play request failed").labelledLog(
          "Message",
          `Autoplay was requested but failed most likely due to browser autoplay policies.${muteMsg}`
        ).labelledLog("Trigger Event", trigger).labelledLog("Error", error).labelledLog("See", "https://developer.chrome.com/blog/autoplay").dispatch();
        seenAutoplayWarning = true;
      }
    }
  }
};

// ../vidstack/src/foundation/queue/queue.ts
var Queue = class {
  #queue = /* @__PURE__ */ new Map();
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  enqueue(key2, item) {
    this.#queue.set(key2, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  serve(key2) {
    const value = this.peek(key2);
    this.#queue.delete(key2);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  peek(key2) {
    return this.#queue.get(key2);
  }
  /**
   * Removes queued item under the given `key`.
   */
  delete(key2) {
    this.#queue.delete(key2);
  }
  /**
   * Clear all items in the queue.
   */
  clear() {
    this.#queue.clear();
  }
};

// ../vidstack/src/foundation/queue/request-queue.ts
var RequestQueue = class {
  #serving = false;
  #pending = deferredPromise();
  #queue = /* @__PURE__ */ new Map();
  /**
   * The number of callbacks that are currently in queue.
   */
  get size() {
    return this.#queue.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get isServing() {
    return this.#serving;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async waitForFlush() {
    if (this.#serving) return;
    await this.#pending.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  enqueue(key2, callback) {
    if (this.#serving) {
      callback();
      return;
    }
    this.#queue.delete(key2);
    this.#queue.set(key2, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  serve(key2) {
    this.#queue.get(key2)?.();
    this.#queue.delete(key2);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  start() {
    this.#flush();
    this.#serving = true;
    if (this.#queue.size > 0) this.#flush();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  stop() {
    this.#serving = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  reset() {
    this.stop();
    this.#queue.clear();
    this.#release();
  }
  #flush() {
    for (const key2 of this.#queue.keys()) this.serve(key2);
    this.#release();
  }
  #release() {
    this.#pending.resolve();
    this.#pending = deferredPromise();
  }
};

// ../vidstack/src/core/state/media-request-manager.ts
var MediaRequestManager = class extends MediaPlayerController {
  #stateMgr;
  #request;
  #media;
  controls;
  #fullscreen;
  #orientation;
  #$provider;
  #providerQueue = new RequestQueue();
  constructor(stateMgr, request, media) {
    super();
    this.#stateMgr = stateMgr;
    this.#request = request;
    this.#media = media;
    this.#$provider = media.$provider;
    this.controls = new MediaControls();
    this.#fullscreen = new FullscreenController();
    this.#orientation = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this.#onFullscreenChange.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.#handleRequest.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this.#attachLoadPlayListener();
    effect(this.#watchProvider.bind(this));
    effect(this.#watchControlsDelayChange.bind(this));
    effect(this.#watchAudioGainSupport.bind(this));
    effect(this.#watchAirPlaySupport.bind(this));
    effect(this.#watchGoogleCastSupport.bind(this));
    effect(this.#watchFullscreenSupport.bind(this));
    effect(this.#watchPiPSupport.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen()) this.exitFullscreen("prefer-media", destroyEvent);
      if (pictureInPicture()) this.exitPictureInPicture(destroyEvent);
    } catch (e2) {
    }
    this.#providerQueue.reset();
  }
  #attachLoadPlayListener() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad()) return;
    const off = this.listen("media-play-request", (event) => {
      this.#handleLoadPlayStrategy(event);
      off();
    });
  }
  #watchProvider() {
    const provider = this.#$provider(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this.#providerQueue.start();
    }
    return () => {
      this.#providerQueue.stop();
    };
  }
  #handleRequest(event) {
    event.stopPropagation();
    if (event.defaultPrevented) return;
    if (true) {
      this.#media.logger?.infoGroup(`\u{1F4EC} received \`${event.type}\``).labelledLog("Request", event).dispatch();
    }
    if (!this[event.type]) return;
    if (peek(this.#$provider)) {
      this[event.type](event);
    } else {
      this.#providerQueue.enqueue(event.type, () => {
        if (peek(this.#$provider)) this[event.type](event);
      });
    }
  }
  async play(trigger) {
    if (IS_SERVER) return;
    const { canPlay, paused, autoPlaying } = this.$state;
    if (this.#handleLoadPlayStrategy(trigger)) return;
    if (!peek(paused)) return;
    if (trigger) this.#request.queue.enqueue("media-play-request", trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider = peek(this.#$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.play();
    } catch (error) {
      if (true) this.#logError("play request failed", error, trigger);
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoPlay = isAutoPlaying;
      this.#stateMgr.handle(errorEvent);
      throw error;
    }
  }
  #handleLoadPlayStrategy(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event);
      this.#providerQueue.enqueue("media-play-request", async () => {
        try {
          await this.play(event);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async pause(trigger) {
    if (IS_SERVER) return;
    const { canPlay, paused } = this.$state;
    if (peek(paused)) return;
    if (trigger) {
      this.#request.queue.enqueue("media-pause-request", trigger);
    }
    try {
      const provider = peek(this.#$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.pause();
    } catch (error) {
      this.#request.queue.delete("media-pause-request");
      if (true) {
        this.#logError("pause request failed", error, trigger);
      }
      throw error;
    }
  }
  setAudioGain(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain) return;
    const provider = this.#$provider();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this.#request.queue.enqueue("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  seekToLiveEdge(trigger) {
    if (IS_SERVER) return;
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek())) return;
    const provider = peek(this.#$provider);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    if (trigger) this.#request.queue.enqueue("media-seek-request", trigger);
    const end = seekableEnd() - 2;
    provider.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  #wasPIPActive = false;
  async enterFullscreen(target = "prefer-media", trigger) {
    if (IS_SERVER) return;
    const adapter = this.#getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active) return;
    if (peek(this.$state.pictureInPicture)) {
      this.#wasPIPActive = true;
      await this.exitPictureInPicture(trigger);
    }
    if (trigger) {
      this.#request.queue.enqueue("media-enter-fullscreen-request", trigger);
    }
    return adapter.enter();
  }
  async exitFullscreen(target = "prefer-media", trigger) {
    if (IS_SERVER) return;
    const adapter = this.#getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active) return;
    if (trigger) {
      this.#request.queue.enqueue("media-exit-fullscreen-request", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this.#wasPIPActive && peek(this.$state.canPictureInPicture)) {
        await this.enterPictureInPicture();
      }
      return result;
    } finally {
      this.#wasPIPActive = false;
    }
  }
  #getFullscreenAdapter(target) {
    const provider = peek(this.#$provider);
    return target === "prefer-media" && this.#fullscreen.supported || target === "media" ? this.#fullscreen : provider?.fullscreen;
  }
  async enterPictureInPicture(trigger) {
    if (IS_SERVER) return;
    this.#throwIfPIPNotSupported();
    if (this.$state.pictureInPicture()) return;
    if (trigger) {
      this.#request.queue.enqueue("media-enter-pip-request", trigger);
    }
    return await this.#$provider().pictureInPicture.enter();
  }
  async exitPictureInPicture(trigger) {
    if (IS_SERVER) return;
    this.#throwIfPIPNotSupported();
    if (!this.$state.pictureInPicture()) return;
    if (trigger) {
      this.#request.queue.enqueue("media-exit-pip-request", trigger);
    }
    return await this.#$provider().pictureInPicture.exit();
  }
  #throwIfPIPNotSupported() {
    if (this.$state.canPictureInPicture()) return;
    throw Error(
      true ? `[vidstack] picture-in-picture is not currently available` : "[vidstack] no pip support"
    );
  }
  #watchControlsDelayChange() {
    this.controls.defaultDelay = this.$props.controlsDelay();
  }
  #watchAudioGainSupport() {
    const { canSetAudioGain } = this.$state, supported = !!this.#$provider()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  #watchAirPlaySupport() {
    const { canAirPlay } = this.$state, supported = !!this.#$provider()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  #watchGoogleCastSupport() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
    canGoogleCast.set(supported);
  }
  #watchFullscreenSupport() {
    const { canFullscreen: canFullscreen2 } = this.$state, supported = this.#fullscreen.supported || !!this.#$provider()?.fullscreen?.supported;
    canFullscreen2.set(supported);
  }
  #watchPiPSupport() {
    const { canPictureInPicture } = this.$state, supported = !!this.#$provider()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event) {
    try {
      await this.requestAirPlay(event);
    } catch (error) {
    }
  }
  async requestAirPlay(trigger) {
    try {
      const adapter = this.#$provider()?.airPlay;
      if (!adapter?.supported) {
        throw Error(true ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this.#request.queue.enqueue("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this.#request.queue.delete("media-airplay-request");
      if (true) {
        this.#logError("airplay request failed", error, trigger);
      }
      throw error;
    }
  }
  async ["media-google-cast-request"](event) {
    try {
      await this.requestGoogleCast(event);
    } catch (error) {
    }
  }
  #googleCastLoader;
  async requestGoogleCast(trigger) {
    try {
      const { canGoogleCast } = this.$state;
      if (!peek(canGoogleCast)) {
        const error = Error(
          true ? "Google Cast not available on this platform." : "Cast not available."
        );
        error.code = "CAST_NOT_AVAILABLE";
        throw error;
      }
      preconnect("https://www.gstatic.com");
      if (!this.#googleCastLoader) {
        const $module = await import("./vidstack-EA75BRCN.js");
        this.#googleCastLoader = new $module.GoogleCastLoader();
      }
      await this.#googleCastLoader.prompt(this.#media);
      if (trigger) {
        this.#request.queue.enqueue("media-google-cast-request", trigger);
      }
      const isConnecting = peek(this.$state.remotePlaybackState) !== "disconnected";
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime)
        });
      }
      this.$state.remotePlaybackLoader.set(isConnecting ? this.#googleCastLoader : null);
    } catch (error) {
      this.#request.queue.delete("media-google-cast-request");
      if (true) {
        this.#logError("google cast request failed", error, trigger);
      }
      throw error;
    }
  }
  ["media-clip-start-change-request"](event) {
    const { clipStartTime } = this.$state;
    clipStartTime.set(event.detail);
  }
  ["media-clip-end-change-request"](event) {
    const { clipEndTime } = this.$state;
    clipEndTime.set(event.detail);
    this.dispatch("duration-change", {
      detail: event.detail,
      trigger: event
    });
  }
  ["media-duration-change-request"](event) {
    const { providedDuration, clipEndTime } = this.$state;
    providedDuration.set(event.detail);
    if (clipEndTime() <= 0) {
      this.dispatch("duration-change", {
        detail: event.detail,
        trigger: event
      });
    }
  }
  ["media-audio-track-change-request"](event) {
    const { logger, audioTracks } = this.#media;
    if (audioTracks.readonly) {
      if (true) {
        logger?.warnGroup(`[vidstack] attempted to change audio track but it is currently read-only`).labelledLog("Request Event", event).dispatch();
      }
      return;
    }
    const index = event.detail, track = audioTracks[index];
    if (track) {
      const key2 = event.type;
      this.#request.queue.enqueue(key2, event);
      track.selected = true;
    } else if (true) {
      logger?.warnGroup("[vidstack] failed audio track change request (invalid index)").labelledLog("Audio Tracks", audioTracks.toArray()).labelledLog("Index", index).labelledLog("Request Event", event).dispatch();
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this.enterFullscreen(event.detail, event);
    } catch (error) {
      this.#onFullscreenError(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this.exitFullscreen(event.detail, event);
    } catch (error) {
      this.#onFullscreenError(error, event);
    }
  }
  async #onFullscreenChange(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen2 = event.detail;
    if (isUndefined(lockType) || lockType === "none" || !this.#orientation.supported) return;
    if (isFullscreen2) {
      if (this.#orientation.locked) return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this.#orientation.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  #onFullscreenError(error, request) {
    if (true) {
      this.#logError("fullscreen request failed", error, request);
    }
    this.#stateMgr.handle(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    const key2 = event.type;
    try {
      this.#request.queue.enqueue(key2, event);
      await this.#orientation.lock(event.detail);
    } catch (error) {
      this.#request.queue.delete(key2);
      if (true) {
        this.#logError("failed to lock screen orientation", error, event);
      }
    }
  }
  async ["media-orientation-unlock-request"](event) {
    const key2 = event.type;
    try {
      this.#request.queue.enqueue(key2, event);
      await this.#orientation.unlock();
    } catch (error) {
      this.#request.queue.delete(key2);
      if (true) {
        this.#logError("failed to unlock screen orientation", error, event);
      }
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this.enterPictureInPicture(event);
    } catch (error) {
      this.#onPictureInPictureError(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this.exitPictureInPicture(event);
    } catch (error) {
      this.#onPictureInPictureError(error, event);
    }
  }
  #onPictureInPictureError(error, request) {
    if (true) {
      this.#logError("pip request failed", error, request);
    }
    this.#stateMgr.handle(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek()) return;
    this.#request.queue.enqueue("media-seek-request", event);
    try {
      this.seekToLiveEdge();
    } catch (error) {
      this.#request.queue.delete("media-seek-request");
      if (true) {
        this.#logError("seek to live edge fail", error, event);
      }
    }
  }
  async ["media-loop-request"](event) {
    try {
      this.#request.looping = true;
      this.#request.replaying = true;
      await this.play(event);
    } catch (error) {
      this.#request.looping = false;
    }
  }
  ["media-user-loop-change-request"](event) {
    this.$state.userPrefersLoop.set(event.detail);
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused()) return;
    try {
      await this.pause(event);
    } catch (error) {
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused()) return;
    try {
      await this.play(event);
    } catch (e2) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate()) return;
    const provider = this.#$provider();
    if (!provider?.setPlaybackRate) return;
    this.#request.queue.enqueue("media-rate-change-request", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-audio-gain-change-request"](event) {
    try {
      this.setAudioGain(event.detail, event);
    } catch (e2) {
    }
  }
  ["media-quality-change-request"](event) {
    const { qualities, storage, logger } = this.#media;
    if (qualities.readonly) {
      if (true) {
        logger?.warnGroup(`[vidstack] attempted to change video quality but it is currently read-only`).labelledLog("Request Event", event).dispatch();
      }
      return;
    }
    this.#request.queue.enqueue("media-quality-change-request", event);
    const index = event.detail;
    if (index < 0) {
      qualities.autoSelect(event);
      if (event.isOriginTrusted) storage?.setVideoQuality?.(null);
    } else {
      const quality = qualities[index];
      if (quality) {
        quality.selected = true;
        if (event.isOriginTrusted) {
          storage?.setVideoQuality?.({
            id: quality.id,
            width: quality.width,
            height: quality.height,
            bitrate: quality.bitrate
          });
        }
      } else if (true) {
        logger?.warnGroup("[vidstack] failed quality change request (invalid index)").labelledLog("Qualities", qualities.toArray()).labelledLog("Index", index).labelledLog("Request Event", event).dispatch();
      }
    }
  }
  ["media-pause-controls-request"](event) {
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.controls.pause(event);
  }
  ["media-resume-controls-request"](event) {
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.controls.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event.detail;
    if (ended()) this.#request.replaying = true;
    const key2 = event.type;
    this.#request.seeking = false;
    this.#request.queue.delete(key2);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek()) return;
    this.#request.queue.enqueue(key2, event);
    this.#$provider().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.$state.seeking.set(true);
    this.#request.seeking = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad()) return;
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.#stateMgr.handle(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event) {
    if (this.$state.canLoadPoster()) return;
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.#stateMgr.handle(this.createEvent("can-load-poster"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this.#media.textTracks[index];
    if (track) {
      const key2 = event.type;
      this.#request.queue.enqueue(key2, event);
      track.setMode(mode, event);
    } else if (true) {
      this.#media.logger?.warnGroup("[vidstack] failed text track change request (invalid index)").labelledLog("Text Tracks", this.#media.textTracks.toArray()).labelledLog("Index", index).labelledLog("Request Event", event).dispatch();
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted()) return;
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.#$provider().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted()) return;
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.#media.$provider().setMuted(false);
    if (volume() === 0) {
      this.#request.queue.enqueue(key2, event);
      this.#$provider().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume) return;
    const key2 = event.type;
    this.#request.queue.enqueue(key2, event);
    this.#$provider().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this.#request.queue.enqueue(key2, event);
      this.#$provider().setMuted(false);
    }
  }
  #logError(title, error, request) {
    if (false) return;
    this.#media.logger?.errorGroup(`[vidstack] ${title}`).labelledLog("Error", error).labelledLog("Media Context", { ...this.#media }).labelledLog("Trigger Event", request).dispatch();
  }
};
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay) return;
  throw Error(
    true ? `[vidstack] media is not ready - wait for \`can-play\` event.` : "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported) return;
  throw Error(
    true ? `[vidstack] fullscreen is not currently available on target \`${target}\`` : "[vidstack] no fullscreen support"
  );
}
var MediaRequestContext = class {
  seeking = false;
  looping = false;
  replaying = false;
  queue = new Queue();
};

// ../vidstack/src/core/state/tracked-media-events.ts
var TRACKED_EVENT = /* @__PURE__ */ new Set([
  "auto-play",
  "auto-play-fail",
  "can-load",
  "sources-change",
  "source-change",
  "load-start",
  "abort",
  "error",
  "loaded-metadata",
  "loaded-data",
  "can-play",
  "play",
  "play-fail",
  "pause",
  "playing",
  "seeking",
  "seeked",
  "waiting"
]);

// ../vidstack/src/core/state/media-state-manager.ts
var MediaStateManager = class extends MediaPlayerController {
  #request;
  #media;
  #trackedEvents = /* @__PURE__ */ new Map();
  #clipEnded = false;
  #playedIntervals = [];
  #playedInterval = [-1, -1];
  #firingWaiting = false;
  #waitingTrigger;
  constructor(request, media) {
    super();
    this.#request = request;
    this.#media = media;
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this.#watchCanSetVolume.bind(this));
    this.#addTextTrackListeners();
    this.#addQualityListeners();
    this.#addAudioTrackListeners();
    this.#resumePlaybackOnConnect();
    onDispose(this.#pausePlaybackOnDisconnect.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this.#media;
    audioTracks[ListSymbol.reset]();
    qualities[ListSymbol.reset]();
    textTracks[ListSymbol.reset]();
    this.#stopWatchingQualityResize();
  }
  handle(event) {
    if (!this.scope) return;
    const type = event.type;
    untrack(() => this[event.type]?.(event));
    if (!IS_SERVER) {
      if (TRACKED_EVENT.has(type)) this.#trackedEvents.set(type, event);
      this.dispatch(event);
    }
  }
  #isPlayingOnDisconnect = false;
  #resumePlaybackOnConnect() {
    if (!this.#isPlayingOnDisconnect) return;
    requestAnimationFrame(() => {
      if (!this.scope) return;
      this.#media.remote.play(new DOMEvent("dom-connect"));
    });
    this.#isPlayingOnDisconnect = false;
  }
  #pausePlaybackOnDisconnect() {
    if (this.#isPlayingOnDisconnect) return;
    this.#isPlayingOnDisconnect = !this.$state.paused();
    this.#media.$provider()?.pause();
  }
  #resetTracking() {
    this.#stopWaiting();
    this.#clipEnded = false;
    this.#request.replaying = false;
    this.#request.looping = false;
    this.#firingWaiting = false;
    this.#waitingTrigger = void 0;
    this.#trackedEvents.clear();
  }
  #satisfyRequest(request, event) {
    const requestEvent = this.#request.queue.serve(request);
    if (!requestEvent) return;
    event.request = requestEvent;
    event.triggers.add(requestEvent);
  }
  #addTextTrackListeners() {
    this.#onTextTracksChange();
    this.#onTextTrackModeChange();
    const textTracks = this.#media.textTracks;
    listenEvent(textTracks, "add", this.#onTextTracksChange.bind(this));
    listenEvent(textTracks, "remove", this.#onTextTracksChange.bind(this));
    listenEvent(textTracks, "mode-change", this.#onTextTrackModeChange.bind(this));
  }
  #addQualityListeners() {
    const qualities = this.#media.qualities;
    listenEvent(qualities, "add", this.#onQualitiesChange.bind(this));
    listenEvent(qualities, "remove", this.#onQualitiesChange.bind(this));
    listenEvent(qualities, "change", this.#onQualityChange.bind(this));
    listenEvent(qualities, "auto-change", this.#onAutoQualityChange.bind(this));
    listenEvent(qualities, "readonly-change", this.#onCanSetQualityChange.bind(this));
  }
  #addAudioTrackListeners() {
    const audioTracks = this.#media.audioTracks;
    listenEvent(audioTracks, "add", this.#onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "remove", this.#onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "change", this.#onAudioTrackChange.bind(this));
  }
  #onTextTracksChange(event) {
    const { textTracks } = this.$state;
    textTracks.set(this.#media.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  #onTextTrackModeChange(event) {
    if (event) this.#satisfyRequest("media-text-track-change-request", event);
    const current = this.#media.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  #onAudioTracksChange(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this.#media.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  #onAudioTrackChange(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this.#media.audioTracks.selected);
    if (event) this.#satisfyRequest("media-audio-track-change-request", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  #onQualitiesChange(event) {
    const { qualities } = this.$state;
    qualities.set(this.#media.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  #onQualityChange(event) {
    const { quality } = this.$state;
    quality.set(this.#media.qualities.selected);
    if (event) this.#satisfyRequest("media-quality-change-request", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  #onAutoQualityChange() {
    const { qualities } = this.#media, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto) this.#stopWatchingQualityResize();
  }
  #stopQualityResizeEffect = null;
  #watchQualityResize() {
    this.#stopWatchingQualityResize();
    this.#stopQualityResizeEffect = effect(() => {
      const { qualities } = this.#media, { mediaWidth, mediaHeight } = this.$state, w = mediaWidth(), h2 = mediaHeight();
      if (w === 0 || h2 === 0) return;
      let selectedQuality = null, minScore = Infinity;
      for (const quality of qualities) {
        const score = Math.abs(quality.width - w) + Math.abs(quality.height - h2);
        if (score < minScore) {
          minScore = score;
          selectedQuality = quality;
        }
      }
      if (selectedQuality) {
        qualities[ListSymbol.select](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w, height: h2 } })
        );
      }
    });
  }
  #stopWatchingQualityResize() {
    this.#stopQualityResizeEffect?.();
    this.#stopQualityResizeEffect = null;
  }
  #onCanSetQualityChange() {
    this.$state.canSetQuality.set(!this.#media.qualities.readonly);
  }
  #watchCanSetVolume() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event) {
    const prevProvider = this.#media.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type) return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this.#media.$provider.set(event.detail);
    if (prevProvider && event.detail === null) {
      this.#resetMediaState(event);
    }
  }
  ["provider-loader-change"](event) {
    if (true) {
      this.#media.logger?.infoGroup(`Loader change \`${event.detail?.constructor.name}\``).labelledLog("Event", event).dispatch();
    }
  }
  ["auto-play"](event) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event) {
    this.$state.autoPlayError.set(event.detail);
    this.#resetTracking();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this.#trackedEvents.set("can-load", event);
    this.#media.textTracks[TextTrackSymbol.canLoad]();
    this.#satisfyRequest("media-start-loading", event);
  }
  ["can-load-poster"](event) {
    this.$state.canLoadPoster.set(true);
    this.#trackedEvents.set("can-load-poster", event);
    this.#satisfyRequest("media-poster-start-loading", event);
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event.detail : providedViewType;
    if (viewType !== currentViewType) {
      if (IS_SERVER) {
        this.$state.inferredViewType.set(currentViewType);
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.scope) return;
            this.$state.inferredViewType.set(event.detail);
            this.dispatch("view-type-change", {
              detail: currentViewType,
              trigger: event
            });
          });
        }, 0);
      }
    }
  }
  ["stream-type-change"](event) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    const { storage } = this.#media, { canPlay } = this.$state;
    this.$state.playbackRate.set(event.detail);
    this.#satisfyRequest("media-rate-change-request", event);
    if (canPlay()) {
      storage?.setPlaybackRate?.(event.detail);
    }
  }
  ["remote-playback-change"](event) {
    const { remotePlaybackState, remotePlaybackType } = this.$state, { type, state } = event.detail, isConnected = state === "connected";
    remotePlaybackType.set(type);
    remotePlaybackState.set(state);
    const key2 = type === "airplay" ? "media-airplay-request" : "media-google-cast-request";
    if (isConnected) {
      this.#satisfyRequest(key2, event);
    } else {
      const requestEvent = this.#request.queue.peek(key2);
      if (requestEvent) {
        event.request = requestEvent;
        event.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event) {
    const prevSources = this.$state.sources(), newSources = event.detail;
    this.$state.sources.set(newSources);
    this.#onSourceQualitiesChange(prevSources, newSources, event);
  }
  #onSourceQualitiesChange(prevSources, newSources, trigger) {
    let { qualities } = this.#media, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc)) continue;
      const exists = newSources.some((s2) => s2.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol.remove](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol.reset](trigger);
    }
    for (const src of newSources) {
      if (!isVideoQualitySrc(src) || qualities.getBySrc(src.src)) continue;
      const quality = {
        id: src.id ?? src.height + "p",
        bitrate: null,
        codec: null,
        ...src,
        selected: false
      };
      qualities[ListSymbol.add](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol.enableAuto]) {
      this.#watchQualityResize();
      qualities[QualitySymbol.enableAuto] = this.#watchQualityResize.bind(this);
      qualities[QualitySymbol.setAuto](true, trigger);
    }
  }
  ["source-change"](event) {
    event.isQualityChange = event.originEvent?.type === "quality-change";
    const source = event.detail;
    this.#resetMediaState(event, event.isQualityChange);
    this.#trackedEvents.set(event.type, event);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
    if (true) {
      this.#media.logger?.infoGroup("\u{1F4FC} Media source change").labelledLog("Source", source).dispatch();
    }
  }
  #resetMediaState(event, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this.#media;
    if (!isSourceQualityChange) {
      this.#playedIntervals = [];
      this.#playedInterval = [-1, -1];
      audioTracks[ListSymbol.reset](event);
      qualities[ListSymbol.reset](event);
      softResetMediaState(this.$state, isSourceQualityChange);
      this.#resetTracking();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this.#resetTracking();
  }
  ["abort"](event) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this.#trackedEvents.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this.#trackedEvents.get("abort");
    if (abortEvent) event.triggers.add(abortEvent);
    if (true) {
      this.#media.logger?.errorGroup("Media Error").labelledLog("Error", event.detail).labelledLog("Event", event).labelledLog("Context", this.#media).dispatch();
    }
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this.#trackedEvents.get("load-start");
    if (loadStartEvent) event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this.#trackedEvents.get("load-start");
    if (loadStartEvent) event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this.#trackedEvents.get("loaded-metadata");
    if (loadedMetadata) event.triggers.add(loadedMetadata);
    this.#onCanPlayDetail(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this.#onCanPlayDetail(event.detail);
    const canPlay = this.#trackedEvents.get("can-play");
    if (canPlay) event.triggers.add(canPlay);
  }
  #onCanPlayDetail(detail) {
    const { seekable, buffered, intrinsicDuration, canPlay } = this.$state;
    canPlay.set(true);
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    const seekableEnd = getTimeRangesEnd(detail.seekable) ?? Infinity;
    intrinsicDuration.set(seekableEnd);
  }
  ["duration-change"](event) {
    const { live, intrinsicDuration, providedDuration, clipEndTime, ended } = this.$state, time = event.detail;
    if (!live()) {
      const duration = !Number.isNaN(time) ? time : 0;
      intrinsicDuration.set(duration);
      if (ended()) this.#onEndPrecisionChange(event);
    }
    if (providedDuration() > 0 || clipEndTime() > 0) {
      event.stopImmediatePropagation();
    }
  }
  ["progress"](event) {
    const { buffered, bufferedEnd, seekable, seekableEnd, live, intrinsicDuration } = this.$state, { buffered: newBuffered, seekable: newSeekable } = event.detail, newBufferedEnd = getTimeRangesEnd(newBuffered) ?? Infinity, hasBufferedLengthChanged = newBuffered.length !== buffered().length, hasBufferedEndChanged = newBufferedEnd > bufferedEnd(), newSeekableEnd = getTimeRangesEnd(newSeekable) ?? Infinity, hasSeekableLengthChanged = newSeekable.length !== seekable().length, hasSeekableEndChanged = newSeekableEnd > seekableEnd();
    if (hasBufferedLengthChanged || hasBufferedEndChanged) {
      buffered.set(newBuffered);
    }
    if (hasSeekableLengthChanged || hasSeekableEndChanged) {
      seekable.set(newSeekable);
    }
    if (live()) {
      intrinsicDuration.set(newSeekableEnd);
      this.dispatch("duration-change", {
        detail: newSeekableEnd,
        trigger: event
      });
    }
  }
  ["play"](event) {
    const {
      paused,
      autoPlayError,
      ended,
      autoPlaying,
      playsInline,
      pointer,
      muted,
      viewType,
      live,
      userBehindLiveEdge
    } = this.$state;
    this.#resetPlaybackIfNeeded();
    if (!paused()) {
      event.stopImmediatePropagation();
      return;
    }
    event.autoPlay = autoPlaying();
    const waitingEvent = this.#trackedEvents.get("waiting");
    if (waitingEvent) event.triggers.add(waitingEvent);
    this.#satisfyRequest("media-play-request", event);
    this.#trackedEvents.set("play", event);
    paused.set(false);
    autoPlayError.set(null);
    if (event.autoPlay) {
      this.handle(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this.#request.replaying) {
      this.#request.replaying = false;
      ended.set(false);
      this.handle(this.createEvent("replay", { trigger: event }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this.#media.remote.enterFullscreen("prefer-media", event);
    }
    if (live() && !userBehindLiveEdge()) {
      this.#media.remote.seekToLiveEdge(event);
    }
  }
  #resetPlaybackIfNeeded(trigger) {
    const provider = peek(this.#media.$provider);
    if (!provider) return;
    const { ended, seekableStart, clipStartTime, clipEndTime, realCurrentTime, duration } = this.$state;
    const shouldReset = realCurrentTime() < clipStartTime() || clipEndTime() > 0 && realCurrentTime() >= clipEndTime() || Math.abs(realCurrentTime() - duration()) < 0.1 || ended();
    if (shouldReset) {
      this.dispatch("media-seek-request", {
        detail: (clipStartTime() > 0 ? 0 : seekableStart()) + 0.1,
        trigger
      });
    }
    return shouldReset;
  }
  ["play-fail"](event) {
    const { muted, autoPlaying } = this.$state;
    const playEvent = this.#trackedEvents.get("play");
    if (playEvent) event.triggers.add(playEvent);
    this.#satisfyRequest("media-play-request", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.#resetTracking();
    this.#trackedEvents.set("play-fail", event);
    if (event.autoPlay) {
      this.handle(
        this.createEvent("auto-play-fail", {
          detail: {
            muted: muted(),
            error: event.detail
          },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
  }
  ["playing"](event) {
    const playEvent = this.#trackedEvents.get("play"), seekedEvent = this.#trackedEvents.get("seeked");
    if (playEvent) event.triggers.add(playEvent);
    else if (seekedEvent) event.triggers.add(seekedEvent);
    setTimeout(() => this.#resetTracking(), 0);
    const {
      paused,
      playing,
      live,
      liveSyncPosition,
      seekableEnd,
      started,
      currentTime,
      seeking,
      ended
    } = this.$state;
    paused.set(false);
    playing.set(true);
    seeking.set(false);
    ended.set(false);
    if (this.#request.looping) {
      this.#request.looping = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end)) this.#media.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.handle(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this.#isPlayingOnDisconnect = true;
    }
    this.#satisfyRequest("media-pause-request", event);
    const seekedEvent = this.#trackedEvents.get("seeked");
    if (seekedEvent) event.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this.#clipEnded) {
      setTimeout(() => {
        this.handle(this.createEvent("end", { trigger: event }));
        this.#clipEnded = false;
      }, 0);
    }
    this.#resetTracking();
  }
  ["time-change"](event) {
    if (this.#request.looping) {
      event.stopImmediatePropagation();
      return;
    }
    let { waiting, played, clipEndTime, realCurrentTime, currentTime } = this.$state, newTime = event.detail, endTime = clipEndTime();
    realCurrentTime.set(newTime);
    this.#updatePlayed();
    waiting.set(false);
    for (const track of this.#media.textTracks) {
      track[TextTrackSymbol.updateActiveCues](newTime, event);
    }
    if (endTime > 0 && newTime >= endTime) {
      this.#clipEnded = true;
      this.dispatch("media-pause-request", { trigger: event });
    }
    this.#saveTime();
    this.dispatch("time-update", {
      detail: { currentTime: currentTime(), played: played() },
      trigger: event
    });
  }
  #updatePlayed() {
    const { currentTime, played, paused } = this.$state;
    if (paused()) return;
    this.#playedInterval = updateTimeIntervals(
      this.#playedIntervals,
      this.#playedInterval,
      currentTime()
    );
    played.set(new TimeRange(this.#playedIntervals));
  }
  // Called to update time again incase duration precision has changed.
  #onEndPrecisionChange(trigger) {
    const { clipStartTime, clipEndTime, duration } = this.$state, isClipped = clipStartTime() > 0 || clipEndTime() > 0;
    if (isClipped) return;
    this.handle(
      this.createEvent("time-change", {
        detail: duration(),
        trigger
      })
    );
  }
  #saveTime() {
    const { storage } = this.#media, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event) {
    const { storage } = this.#media, { canPlay, audioGain } = this.$state;
    audioGain.set(event.detail);
    this.#satisfyRequest("media-audio-gain-change-request", event);
    if (canPlay()) storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event) {
    const { storage } = this.#media, { volume, muted, canPlay } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.#satisfyRequest("media-volume-change-request", event);
    this.#satisfyRequest(detail.muted ? "media-mute-request" : "media-unmute-request", event);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeking"] = functionThrottle(
    (event) => {
      const { seeking, realCurrentTime, paused } = this.$state;
      seeking.set(true);
      realCurrentTime.set(event.detail);
      this.#satisfyRequest("media-seeking-request", event);
      if (paused()) {
        this.#waitingTrigger = event;
        this.#fireWaiting();
      }
      this.#playedInterval = [-1, -1];
    },
    150,
    { leading: true }
  );
  ["seeked"](event) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this.#request.seeking) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.#trackedEvents.get("waiting");
      if (waitingEvent) event.triggers.add(waitingEvent);
      const seekingEvent = this.#trackedEvents.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused()) this.#stopWaiting();
      seeking.set(false);
      realCurrentTime.set(event.detail);
      this.#satisfyRequest("media-seek-request", event);
      const origin = event?.originEvent;
      if (origin?.isTrusted && !(origin instanceof MessageEvent) && !/seek/.test(origin.type)) {
        this["started"](event);
      }
    }
    if (Math.floor(currentTime()) !== Math.floor(seekableEnd())) {
      ended.set(false);
    } else {
      this.end(event);
    }
  }
  ["waiting"](event) {
    if (this.#firingWaiting || this.#request.seeking) return;
    event.stopImmediatePropagation();
    this.#waitingTrigger = event;
    this.#fireWaiting();
  }
  #fireWaiting = functionDebounce(() => {
    if (!this.#waitingTrigger) return;
    this.#firingWaiting = true;
    const { waiting, playing } = this.$state;
    waiting.set(true);
    playing.set(false);
    const event = this.createEvent("waiting", { trigger: this.#waitingTrigger });
    this.#trackedEvents.set("waiting", event);
    this.dispatch(event);
    this.#waitingTrigger = void 0;
    this.#firingWaiting = false;
  }, 300);
  ["end"](event) {
    const { loop, ended } = this.$state;
    if (!loop() && ended()) return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.#resetPlaybackIfNeeded(event);
          this.dispatch("media-loop-request", { trigger: event });
        });
      }, 10);
      return;
    }
    setTimeout(() => this.#onEnded(event), 0);
  }
  #onEnded(event) {
    const { storage } = this.#media, { paused, seeking, ended, duration } = this.$state;
    this.#onEndPrecisionChange(event);
    if (!paused()) {
      this.dispatch("pause", { trigger: event });
    }
    if (seeking()) {
      this.dispatch("seeked", {
        detail: duration(),
        trigger: event
      });
    }
    ended.set(true);
    this.#resetTracking();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event
    });
  }
  #stopWaiting() {
    this.#fireWaiting.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    const isFullscreen2 = event.detail;
    this.$state.fullscreen.set(isFullscreen2);
    this.#satisfyRequest(
      isFullscreen2 ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event
    );
  }
  ["fullscreen-error"](event) {
    this.#satisfyRequest("media-enter-fullscreen-request", event);
    this.#satisfyRequest("media-exit-fullscreen-request", event);
  }
  ["orientation-change"](event) {
    const isLocked = event.detail.lock;
    this.#satisfyRequest(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event
    );
  }
  ["picture-in-picture-change"](event) {
    const isPiP = event.detail;
    this.$state.pictureInPicture.set(isPiP);
    this.#satisfyRequest(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event);
  }
  ["picture-in-picture-error"](event) {
    this.#satisfyRequest("media-enter-pip-request", event);
    this.#satisfyRequest("media-exit-pip-request", event);
  }
  ["title-change"](event) {
    if (!event.trigger) return;
    event.stopImmediatePropagation();
    this.$state.inferredTitle.set(event.detail);
  }
  ["poster-change"](event) {
    if (!event.trigger) return;
    event.stopImmediatePropagation();
    this.$state.inferredPoster.set(event.detail);
  }
};

// ../vidstack/src/core/state/media-state-sync.ts
var MediaStateSync = class extends MediaPlayerController {
  onSetup() {
    this.#init();
    if (IS_SERVER) return;
    if (true) effect(this.#watchLogLevel.bind(this));
    const effects = [
      this.#watchMetadata,
      this.#watchAutoplay,
      this.#watchClipStartTime,
      this.#watchClipEndTime,
      this.#watchControls,
      this.#watchCrossOrigin,
      this.#watchDuration,
      this.#watchLive,
      this.#watchLiveEdge,
      this.#watchLiveTolerance,
      this.#watchLoop,
      this.#watchPlaysInline,
      this.#watchPoster,
      this.#watchProvidedTypes,
      this.#watchTitle
    ];
    for (const callback of effects) {
      effect(callback.bind(this));
    }
  }
  #init() {
    const providedProps = {
      duration: "providedDuration",
      loop: "providedLoop",
      poster: "providedPoster",
      streamType: "providedStreamType",
      title: "providedTitle",
      viewType: "providedViewType"
    };
    const skip = /* @__PURE__ */ new Set([
      "currentTime",
      "paused",
      "playbackRate",
      "volume"
    ]);
    for (const prop2 of Object.keys(this.$props)) {
      if (skip.has(prop2)) continue;
      this.$state[providedProps[prop2] ?? prop2]?.set(this.$props[prop2]());
    }
    this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  // Sync "provided" props with internal state. Provided props are used to differentiate from
  // provider inferred values.
  #watchProvidedTypes() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  #watchLogLevel() {
    if (false) return;
    this.$state.logLevel.set(this.$props.logLevel());
  }
  #watchMetadata() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  #watchTitle() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  #watchAutoplay() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  #watchLoop() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  #watchControls() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  #watchPoster() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  #watchCrossOrigin() {
    const crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = crossOrigin === true ? "" : crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  #watchDuration() {
    const { duration } = this.$props;
    this.dispatch("media-duration-change-request", {
      detail: duration()
    });
  }
  #watchPlaysInline() {
    const inline = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline);
    this.dispatch("plays-inline-change", { detail: inline });
  }
  #watchClipStartTime() {
    const { clipStartTime } = this.$props;
    this.dispatch("media-clip-start-change-request", {
      detail: clipStartTime()
    });
  }
  #watchClipEndTime() {
    const { clipEndTime } = this.$props;
    this.dispatch("media-clip-end-change-request", {
      detail: clipEndTime()
    });
  }
  #watchLive() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  #watchLiveTolerance() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  #watchLiveEdge() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
};

// ../vidstack/src/core/state/navigator-media-session.ts
var actions = ["play", "pause", "seekforward", "seekbackward", "seekto"];
var NavigatorMediaSession = class extends MediaPlayerController {
  onConnect() {
    effect(this.#onMetadataChange.bind(this));
    effect(this.#onPlaybackStateChange.bind(this));
    const handleAction = this.#handleAction.bind(this);
    for (const action of actions) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this.#onDisconnect.bind(this));
  }
  #onDisconnect() {
    for (const action of actions) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  #onMetadataChange() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  #onPlaybackStateChange() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  #handleAction(details) {
    const trigger = new DOMEvent(`media-session-action`, { detail: details });
    switch (details.action) {
      case "play":
        this.dispatch("media-play-request", { trigger });
        break;
      case "pause":
        this.dispatch("media-pause-request", { trigger });
        break;
      case "seekto":
      case "seekforward":
      case "seekbackward":
        this.dispatch("media-seek-request", {
          detail: isNumber(details.seekTime) ? details.seekTime : this.$state.currentTime() + (details.seekOffset ?? 10),
          trigger
        });
        break;
    }
  }
};

// ../vidstack/src/foundation/logger/colors.ts
var LOCAL_STORAGE_KEY = "@vidstack/log-colors";
var savedColors = init();
function getLogColor(key2) {
  return savedColors.get(key2);
}
function saveLogColor(key2, { color = generateColor(), overwrite = false } = {}) {
  if (false) return;
  if (!savedColors.has(key2) || overwrite) {
    savedColors.set(key2, color);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Object.entries(savedColors)));
  }
}
function generateColor() {
  return `hsl(${Math.random() * 360}, 55%, 70%)`;
}
function init() {
  if (false) return /* @__PURE__ */ new Map();
  let colors;
  try {
    colors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch {
  }
  return new Map(Object.entries(colors ?? {}));
}

// ../vidstack/src/foundation/logger/log-level.ts
var LogLevelValue = Object.freeze({
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
});
var LogLevelColor = Object.freeze({
  silent: "white",
  error: "hsl(6, 58%, 50%)",
  warn: "hsl(51, 58%, 50%)",
  info: "hsl(219, 58%, 50%)",
  debug: "hsl(280, 58%, 50%)"
});

// ../vidstack/src/foundation/logger/ms.ts
var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
function ms2(val) {
  const msAbs = Math.abs(val);
  if (msAbs >= d) {
    return Math.round(val / d) + "d";
  }
  if (msAbs >= h) {
    return Math.round(val / h) + "h";
  }
  if (msAbs >= m) {
    return Math.round(val / m) + "m";
  }
  if (msAbs >= s) {
    return Math.round(val / s) + "s";
  }
  return round(val, 2) + "ms";
}

// ../vidstack/src/foundation/logger/log-printer.ts
var LogPrinter = class extends ViewController {
  #level = true ? "warn" : "silent";
  #lastLogged;
  /**
   * The current log level.
   */
  get logLevel() {
    return true ? this.#level : "silent";
  }
  set logLevel(level) {
    if (true) this.#level = level;
  }
  onConnect() {
    this.listen("vds-log", (event) => {
      event.stopPropagation();
      const element = event.path?.[0] ?? (event.target instanceof ViewController ? event.target.el : event.target), eventTargetName = element?.$$COMPONENT_NAME?.replace(/^_/, "").replace(/Instance$/, "") ?? element?.tagName.toLowerCase() ?? "unknown";
      const { level = "warn", data } = event.detail ?? {};
      if (LogLevelValue[this.#level] < LogLevelValue[level]) {
        return;
      }
      saveLogColor(eventTargetName);
      const hint = data?.length === 1 && isGroupedLog(data[0]) ? data[0].title : isString(data?.[0]) ? data[0] : "";
      console.groupCollapsed(
        `%c${level.toUpperCase()}%c ${eventTargetName}%c ${hint.slice(0, 50)}${hint.length > 50 ? "..." : ""}`,
        `background: ${LogLevelColor[level]}; color: white; padding: 1.5px 2.2px; border-radius: 2px; font-size: 11px;`,
        `color: ${getLogColor(eventTargetName)}; padding: 4px 0px; font-size: 11px;`,
        "color: gray; font-size: 11px; padding-left: 4px;"
      );
      if (data?.length === 1 && isGroupedLog(data[0])) {
        if (element) data[0].logs.unshift({ label: "Element", data: [element] });
        printGroup(level, data[0]);
      } else if (data) {
        print(level, ...data);
      }
      this.#printTimeDiff();
      printStackTrace();
      console.groupEnd();
    });
    onDispose(() => {
      this.#lastLogged = void 0;
    });
  }
  #printTimeDiff() {
    labelledPrint("Time since last log", this.#calcLastLogTimeDiff());
  }
  #calcLastLogTimeDiff() {
    const time = performance.now();
    const diff = time - (this.#lastLogged ?? (this.#lastLogged = performance.now()));
    this.#lastLogged = time;
    return ms2(diff);
  }
};
function print(level, ...data) {
  console[level](...data);
}
function labelledPrint(label, ...data) {
  console.log(`%c${label}:`, "color: gray", ...data);
}
function printStackTrace() {
  console.groupCollapsed("%cStack Trace", "color: gray");
  console.trace();
  console.groupEnd();
}
function printGroup(level, groupedLog) {
  for (const log of groupedLog.logs) {
    if (isGroupedLog(log)) {
      console.groupCollapsed(groupedLog.title);
      printGroup(level, log);
      console.groupEnd();
    } else if ("label" in log && !isUndefined(log.label)) {
      labelledPrint(log.label, ...log.data);
    } else {
      print(level, ...log.data);
    }
  }
}

// ../vidstack/src/foundation/observers/focus-visible.ts
var $keyboard = signal(false);
if (!IS_SERVER) {
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e2) => {
    if (e2.metaKey || e2.altKey || e2.ctrlKey) return;
    $keyboard.set(true);
  });
}
var FocusVisibleController = class extends ViewController {
  #focused = signal(false);
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this.#focused.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this.#onPointerEnter.bind(this));
        this.listen("pointerleave", this.#onPointerLeave.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this.#focused.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this.#onFocus.bind(this));
      this.listen("blur", this.#onBlur.bind(this));
    });
  }
  focused() {
    return this.#focused();
  }
  #onFocus() {
    this.#focused.set(true);
    updateFocusAttr(this.el, true);
  }
  #onBlur() {
    this.#focused.set(false);
    updateFocusAttr(this.el, false);
  }
  #onPointerEnter() {
    updateHoverAttr(this.el, true);
  }
  #onPointerLeave() {
    updateHoverAttr(this.el, false);
  }
};
function updateFocusAttr(el, isFocused) {
  setAttribute(el, "data-focus", isFocused);
  setAttribute(el, "data-hocus", isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, "data-hocus", isHovering);
  setAttribute(el, "data-hover", isHovering);
}

// ../vidstack/src/components/player.ts
var _setAudioGain_dec, _requestGoogleCast_dec, _requestAirPlay_dec, _startLoadingPoster_dec, _startLoading_dec, _seekToLiveEdge_dec, _exitPictureInPicture_dec, _enterPictureInPicture_dec, _exitFullscreen_dec, _enterFullscreen_dec, _pause_dec, _play_dec, _playbackRate_dec, _volume_dec, _currentTime_dec, _muted_dec, _paused_dec, _duration_dec, _textRenderers_dec, _textTracks_dec, _audioTracks_dec, _qualities_dec, _title_dec, _orientation_dec, _controls_dec, _provider_dec, _remoteControl_dec, _canPlayQueue_dec, _a3, _media3, _stateMgr, _requestMgr, _init3, _MediaPlayer_instances, provider_get, props_get, _skipTitleUpdate, watchTitle_fn, watchOrientation_fn, watchCanPlay_fn, setupMediaAttributes_fn, onFindPlayer_fn, onResize_fn, onPointerChange_fn, watchPaused_fn, queuePausedUpdate_fn, watchMuted_fn, queueMutedUpdate_fn, watchCurrentTime_fn, queueCurrentTimeUpdate_fn, watchVolume_fn, queueVolumeUpdate_fn, watchPlaybackRate_fn, queuePlaybackRateUpdate_fn, watchPlaysInline_fn, queuePlaysInlineUpdate_fn, watchStorage_fn, computeMediaId_fn;
var _MediaPlayer = class _MediaPlayer extends (_a3 = Component, _canPlayQueue_dec = [prop], _remoteControl_dec = [prop], _provider_dec = [prop], _controls_dec = [prop], _orientation_dec = [prop], _title_dec = [prop], _qualities_dec = [prop], _audioTracks_dec = [prop], _textTracks_dec = [prop], _textRenderers_dec = [prop], _duration_dec = [prop], _paused_dec = [prop], _muted_dec = [prop], _currentTime_dec = [prop], _volume_dec = [prop], _playbackRate_dec = [prop], _play_dec = [method], _pause_dec = [method], _enterFullscreen_dec = [method], _exitFullscreen_dec = [method], _enterPictureInPicture_dec = [method], _exitPictureInPicture_dec = [method], _seekToLiveEdge_dec = [method], _startLoading_dec = [method], _startLoadingPoster_dec = [method], _requestAirPlay_dec = [method], _requestGoogleCast_dec = [method], _setAudioGain_dec = [method], _a3) {
  constructor() {
    super();
    __runInitializers(_init3, 5, this);
    __privateAdd(this, _MediaPlayer_instances);
    __privateAdd(this, _media3);
    __privateAdd(this, _stateMgr);
    __privateAdd(this, _requestMgr);
    __publicField(this, "canPlayQueue", __runInitializers(_init3, 8, this, new RequestQueue())), __runInitializers(_init3, 11, this);
    __publicField(this, "remoteControl", __runInitializers(_init3, 12, this)), __runInitializers(_init3, 15, this);
    __privateAdd(this, _skipTitleUpdate, false);
    __publicField(this, "orientation", __runInitializers(_init3, 16, this)), __runInitializers(_init3, 19, this);
    new MediaStateSync();
    const context = {
      player: this,
      qualities: new VideoQualityList(),
      audioTracks: new AudioTrackList(),
      storage: null,
      $provider: signal(null),
      $providerSetup: signal(false),
      $props: this.$props,
      $state: this.$state
    };
    if (true) {
      const logPrinter = new LogPrinter();
      effect(() => {
        logPrinter.logLevel = this.$props.logLevel();
      });
    }
    if (true) context.logger = new Logger();
    context.remote = this.remoteControl = new MediaRemoteControl(
      true ? context.logger : void 0
    );
    context.remote.setPlayer(this);
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol.crossOrigin] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    __privateSet(this, _media3, context);
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    if (true) new MediaEventsLogger(context);
    const request = new MediaRequestContext();
    __privateSet(this, _stateMgr, new MediaStateManager(request, context));
    __privateSet(this, _requestMgr, new MediaRequestManager(__privateGet(this, _stateMgr), request, context));
    context.delegate = new MediaPlayerDelegate(__privateGet(this, _stateMgr).handle.bind(__privateGet(this, _stateMgr)), context);
    context.notify = context.delegate.notify.bind(context.delegate);
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      new NavigatorMediaSession();
    }
    new MediaLoadController("load", this.startLoading.bind(this));
    new MediaLoadController("posterLoad", this.startLoadingPoster.bind(this));
  }
  onSetup() {
    __privateMethod(this, _MediaPlayer_instances, setupMediaAttributes_fn).call(this);
    effect(__privateMethod(this, _MediaPlayer_instances, watchCanPlay_fn).bind(this));
    effect(__privateMethod(this, _MediaPlayer_instances, watchMuted_fn).bind(this));
    effect(__privateMethod(this, _MediaPlayer_instances, watchPaused_fn).bind(this));
    effect(__privateMethod(this, _MediaPlayer_instances, watchVolume_fn).bind(this));
    effect(__privateMethod(this, _MediaPlayer_instances, watchCurrentTime_fn).bind(this));
    effect(__privateMethod(this, _MediaPlayer_instances, watchPlaysInline_fn).bind(this));
    effect(__privateMethod(this, _MediaPlayer_instances, watchPlaybackRate_fn).bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(__privateMethod(this, _MediaPlayer_instances, watchStorage_fn).bind(this));
    if (IS_SERVER) __privateMethod(this, _MediaPlayer_instances, watchTitle_fn).call(this);
    else effect(__privateMethod(this, _MediaPlayer_instances, watchTitle_fn).bind(this));
    if (IS_SERVER) __privateMethod(this, _MediaPlayer_instances, watchOrientation_fn).call(this);
    else effect(__privateMethod(this, _MediaPlayer_instances, watchOrientation_fn).bind(this));
    listenEvent(el, "find-media-player", __privateMethod(this, _MediaPlayer_instances, onFindPlayer_fn).bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE) setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    __privateMethod(this, _MediaPlayer_instances, onPointerChange_fn).call(this, pointerQuery);
    pointerQuery.onchange = __privateMethod(this, _MediaPlayer_instances, onPointerChange_fn).bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(__privateMethod(this, _MediaPlayer_instances, onResize_fn).bind(this)));
    resize.observe(el);
    effect(__privateMethod(this, _MediaPlayer_instances, onResize_fn).bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    if (true) __privateGet(this, _media3).logger.setTarget(el);
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
      if (true) __privateGet(this, _media3).logger.setTarget(null);
    });
  }
  onDestroy() {
    __privateGet(this, _media3).player = null;
    this.canPlayQueue.reset();
  }
  get provider() {
    return __privateGet(this, _MediaPlayer_instances, provider_get);
  }
  get controls() {
    return __privateGet(this, _requestMgr).controls;
  }
  set controls(controls) {
    __privateGet(this, _MediaPlayer_instances, props_get).controls.set(controls);
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (__privateGet(this, _skipTitleUpdate)) {
      __privateSet(this, _skipTitleUpdate, false);
      return;
    }
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return __privateGet(this, _media3).qualities;
  }
  get audioTracks() {
    return __privateGet(this, _media3).audioTracks;
  }
  get textTracks() {
    return __privateGet(this, _media3).textTracks;
  }
  get textRenderers() {
    return __privateGet(this, _media3).textRenderers;
  }
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    __privateGet(this, _MediaPlayer_instances, props_get).duration.set(duration);
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    __privateMethod(this, _MediaPlayer_instances, queuePausedUpdate_fn).call(this, paused);
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    __privateMethod(this, _MediaPlayer_instances, queueMutedUpdate_fn).call(this, muted);
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    __privateMethod(this, _MediaPlayer_instances, queueCurrentTimeUpdate_fn).call(this, time);
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    __privateMethod(this, _MediaPlayer_instances, queueVolumeUpdate_fn).call(this, volume);
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    __privateMethod(this, _MediaPlayer_instances, queuePlaybackRateUpdate_fn).call(this, rate);
  }
  async play(trigger) {
    return __privateGet(this, _requestMgr).play(trigger);
  }
  async pause(trigger) {
    return __privateGet(this, _requestMgr).pause(trigger);
  }
  async enterFullscreen(target, trigger) {
    return __privateGet(this, _requestMgr).enterFullscreen(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return __privateGet(this, _requestMgr).exitFullscreen(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return __privateGet(this, _requestMgr).enterPictureInPicture(trigger);
  }
  exitPictureInPicture(trigger) {
    return __privateGet(this, _requestMgr).exitPictureInPicture(trigger);
  }
  seekToLiveEdge(trigger) {
    __privateGet(this, _requestMgr).seekToLiveEdge(trigger);
  }
  startLoading(trigger) {
    __privateGet(this, _media3).notify("can-load", void 0, trigger);
  }
  startLoadingPoster(trigger) {
    __privateGet(this, _media3).notify("can-load-poster", void 0, trigger);
  }
  requestAirPlay(trigger) {
    return __privateGet(this, _requestMgr).requestAirPlay(trigger);
  }
  requestGoogleCast(trigger) {
    return __privateGet(this, _requestMgr).requestGoogleCast(trigger);
  }
  setAudioGain(gain, trigger) {
    return __privateGet(this, _requestMgr).setAudioGain(gain, trigger);
  }
  destroy() {
    super.destroy();
    __privateGet(this, _media3).remote.setPlayer(null);
    this.dispatch("destroy");
  }
};
_init3 = __decoratorStart(_a3);
_media3 = new WeakMap();
_stateMgr = new WeakMap();
_requestMgr = new WeakMap();
_MediaPlayer_instances = new WeakSet();
provider_get = function() {
  return __privateGet(this, _media3).$provider();
};
props_get = function() {
  return this.$props;
};
_skipTitleUpdate = new WeakMap();
watchTitle_fn = function() {
  const el = this.$el, { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
  setAttribute(
    this.el,
    "aria-label",
    `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
  );
  if (!IS_SERVER && el?.hasAttribute("title")) {
    __privateSet(this, _skipTitleUpdate, true);
    el?.removeAttribute("title");
  }
};
watchOrientation_fn = function() {
  const orientation = this.orientation.landscape ? "landscape" : "portrait";
  this.$state.orientation.set(orientation);
  setAttribute(this.el, "data-orientation", orientation);
  __privateMethod(this, _MediaPlayer_instances, onResize_fn).call(this);
};
watchCanPlay_fn = function() {
  if (this.$state.canPlay() && __privateGet(this, _MediaPlayer_instances, provider_get)) this.canPlayQueue.start();
  else this.canPlayQueue.stop();
};
setupMediaAttributes_fn = function() {
  if (_MediaPlayer[MEDIA_ATTRIBUTES]) {
    this.setAttributes(_MediaPlayer[MEDIA_ATTRIBUTES]);
    return;
  }
  const $attrs = {
    "data-load": function() {
      return this.$props.load();
    },
    "data-captions": function() {
      const track = this.$state.textTrack();
      return !!track && isTrackCaptionKind(track);
    },
    "data-ios-controls": function() {
      return this.$state.iOSControls();
    },
    "data-controls": function() {
      return this.controls.showing;
    },
    "data-buffering": function() {
      const { canLoad, canPlay, waiting } = this.$state;
      return canLoad() && (!canPlay() || waiting());
    },
    "data-error": function() {
      const { error } = this.$state;
      return !!error();
    },
    "data-autoplay-error": function() {
      const { autoPlayError } = this.$state;
      return !!autoPlayError();
    }
  };
  const alias = {
    autoPlay: "autoplay",
    canAirPlay: "can-airplay",
    canPictureInPicture: "can-pip",
    pictureInPicture: "pip",
    playsInline: "playsinline",
    remotePlaybackState: "remote-state",
    remotePlaybackType: "remote-type",
    isAirPlayConnected: "airplay",
    isGoogleCastConnected: "google-cast"
  };
  for (const prop2 of mediaAttributes) {
    const attrName = "data-" + (alias[prop2] ?? camelToKebabCase(prop2));
    $attrs[attrName] = function() {
      return this.$state[prop2]();
    };
  }
  delete $attrs.title;
  _MediaPlayer[MEDIA_ATTRIBUTES] = $attrs;
  this.setAttributes($attrs);
};
onFindPlayer_fn = function(event) {
  event.detail(this);
};
onResize_fn = function() {
  if (IS_SERVER || !this.el) return;
  const width = this.el.clientWidth, height = this.el.clientHeight;
  this.$state.width.set(width);
  this.$state.height.set(height);
  setStyle(this.el, "--player-width", width + "px");
  setStyle(this.el, "--player-height", height + "px");
};
onPointerChange_fn = function(queryList) {
  if (IS_SERVER) return;
  const pointer = queryList.matches ? "coarse" : "fine";
  setAttribute(this.el, "data-pointer", pointer);
  this.$state.pointer.set(pointer);
  __privateMethod(this, _MediaPlayer_instances, onResize_fn).call(this);
};
watchPaused_fn = function() {
  __privateMethod(this, _MediaPlayer_instances, queuePausedUpdate_fn).call(this, this.$props.paused());
};
queuePausedUpdate_fn = function(paused) {
  if (paused) {
    this.canPlayQueue.enqueue("paused", () => __privateGet(this, _requestMgr).pause());
  } else this.canPlayQueue.enqueue("paused", () => __privateGet(this, _requestMgr).play());
};
watchMuted_fn = function() {
  __privateMethod(this, _MediaPlayer_instances, queueMutedUpdate_fn).call(this, this.$props.muted());
};
queueMutedUpdate_fn = function(muted) {
  this.canPlayQueue.enqueue("muted", () => {
    if (__privateGet(this, _MediaPlayer_instances, provider_get)) __privateGet(this, _MediaPlayer_instances, provider_get).setMuted(muted);
  });
};
watchCurrentTime_fn = function() {
  __privateMethod(this, _MediaPlayer_instances, queueCurrentTimeUpdate_fn).call(this, this.$props.currentTime());
};
queueCurrentTimeUpdate_fn = function(time) {
  this.canPlayQueue.enqueue("currentTime", () => {
    const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
    if (time === peek(currentTime)) return;
    peek(() => {
      if (!__privateGet(this, _MediaPlayer_instances, provider_get)) return;
      const clippedTime = time + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
      if (Number.isFinite(boundTime)) {
        __privateGet(this, _MediaPlayer_instances, provider_get).setCurrentTime(boundTime);
      }
    });
  });
};
watchVolume_fn = function() {
  __privateMethod(this, _MediaPlayer_instances, queueVolumeUpdate_fn).call(this, this.$props.volume());
};
queueVolumeUpdate_fn = function(volume) {
  const clampedVolume = clampNumber(0, volume, 1);
  this.canPlayQueue.enqueue("volume", () => {
    if (__privateGet(this, _MediaPlayer_instances, provider_get)) __privateGet(this, _MediaPlayer_instances, provider_get).setVolume(clampedVolume);
  });
};
watchPlaybackRate_fn = function() {
  __privateMethod(this, _MediaPlayer_instances, queuePlaybackRateUpdate_fn).call(this, this.$props.playbackRate());
};
queuePlaybackRateUpdate_fn = function(rate) {
  this.canPlayQueue.enqueue("rate", () => {
    if (__privateGet(this, _MediaPlayer_instances, provider_get)) __privateGet(this, _MediaPlayer_instances, provider_get).setPlaybackRate?.(rate);
  });
};
watchPlaysInline_fn = function() {
  __privateMethod(this, _MediaPlayer_instances, queuePlaysInlineUpdate_fn).call(this, this.$props.playsInline());
};
queuePlaysInlineUpdate_fn = function(inline) {
  this.canPlayQueue.enqueue("playsinline", () => {
    if (__privateGet(this, _MediaPlayer_instances, provider_get)) __privateGet(this, _MediaPlayer_instances, provider_get).setPlaysInline?.(inline);
  });
};
watchStorage_fn = function() {
  let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
  if (storage?.onChange) {
    const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(__privateMethod(this, _MediaPlayer_instances, computeMediaId_fn).bind(this));
    effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
  }
  __privateGet(this, _media3).storage = storage;
  __privateGet(this, _media3).textTracks.setStorage(storage);
  onDispose(() => {
    storage?.onDestroy?.();
    __privateGet(this, _media3).storage = null;
    __privateGet(this, _media3).textTracks.setStorage(null);
  });
};
computeMediaId_fn = function() {
  const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
  return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
};
__decorateElement(_init3, 2, "provider", _provider_dec, _MediaPlayer);
__decorateElement(_init3, 2, "controls", _controls_dec, _MediaPlayer);
__decorateElement(_init3, 2, "title", _title_dec, _MediaPlayer);
__decorateElement(_init3, 2, "qualities", _qualities_dec, _MediaPlayer);
__decorateElement(_init3, 2, "audioTracks", _audioTracks_dec, _MediaPlayer);
__decorateElement(_init3, 2, "textTracks", _textTracks_dec, _MediaPlayer);
__decorateElement(_init3, 2, "textRenderers", _textRenderers_dec, _MediaPlayer);
__decorateElement(_init3, 2, "duration", _duration_dec, _MediaPlayer);
__decorateElement(_init3, 2, "paused", _paused_dec, _MediaPlayer);
__decorateElement(_init3, 2, "muted", _muted_dec, _MediaPlayer);
__decorateElement(_init3, 2, "currentTime", _currentTime_dec, _MediaPlayer);
__decorateElement(_init3, 2, "volume", _volume_dec, _MediaPlayer);
__decorateElement(_init3, 2, "playbackRate", _playbackRate_dec, _MediaPlayer);
__decorateElement(_init3, 1, "play", _play_dec, _MediaPlayer);
__decorateElement(_init3, 1, "pause", _pause_dec, _MediaPlayer);
__decorateElement(_init3, 1, "enterFullscreen", _enterFullscreen_dec, _MediaPlayer);
__decorateElement(_init3, 1, "exitFullscreen", _exitFullscreen_dec, _MediaPlayer);
__decorateElement(_init3, 1, "enterPictureInPicture", _enterPictureInPicture_dec, _MediaPlayer);
__decorateElement(_init3, 1, "exitPictureInPicture", _exitPictureInPicture_dec, _MediaPlayer);
__decorateElement(_init3, 1, "seekToLiveEdge", _seekToLiveEdge_dec, _MediaPlayer);
__decorateElement(_init3, 1, "startLoading", _startLoading_dec, _MediaPlayer);
__decorateElement(_init3, 1, "startLoadingPoster", _startLoadingPoster_dec, _MediaPlayer);
__decorateElement(_init3, 1, "requestAirPlay", _requestAirPlay_dec, _MediaPlayer);
__decorateElement(_init3, 1, "requestGoogleCast", _requestGoogleCast_dec, _MediaPlayer);
__decorateElement(_init3, 1, "setAudioGain", _setAudioGain_dec, _MediaPlayer);
__decorateElement(_init3, 5, "canPlayQueue", _canPlayQueue_dec, _MediaPlayer);
__decorateElement(_init3, 5, "remoteControl", _remoteControl_dec, _MediaPlayer);
__decorateElement(_init3, 5, "orientation", _orientation_dec, _MediaPlayer);
__decoratorMetadata(_init3, _MediaPlayer);
__publicField(_MediaPlayer, "props", mediaPlayerProps);
__publicField(_MediaPlayer, "state", mediaState);
var MediaPlayer = _MediaPlayer;

// ../vidstack/src/utils/manifest.ts
function resolveStreamTypeFromDASHManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    return /type="static"/.test(manifest) ? "on-demand" : "live";
  });
}
function resolveStreamTypeFromHLSManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    const renditionURI = resolveHLSRenditionURI(manifest);
    if (renditionURI) {
      return resolveStreamTypeFromHLSManifest(
        /^https?:/.test(renditionURI) ? renditionURI : new URL(renditionURI, manifestSrc).href,
        requestInit
      );
    }
    const streamType = /EXT-X-PLAYLIST-TYPE:\s*VOD/.test(manifest) ? "on-demand" : "live";
    if (streamType === "live" && resolveTargetDuration(manifest) >= 10 && (/#EXT-X-DVR-ENABLED:\s*true/.test(manifest) || manifest.includes("#EXT-X-DISCONTINUITY"))) {
      return "live:dvr";
    }
    return streamType;
  });
}
function resolveHLSRenditionURI(manifest) {
  const matches = manifest.match(/#EXT-X-STREAM-INF:[^\n]+(\n[^\n]+)*/g);
  return matches ? matches[0].split("\n")[1].trim() : null;
}
function resolveTargetDuration(manifest) {
  const lines = manifest.split("\n");
  for (const line of lines) {
    if (line.startsWith("#EXT-X-TARGETDURATION")) {
      const duration = parseFloat(line.split(":")[1]);
      if (!isNaN(duration)) {
        return duration;
      }
    }
  }
  return -1;
}

// ../vidstack/src/components/provider/source-select.ts
var warned = true ? /* @__PURE__ */ new Set() : void 0;
var sourceTypes = /* @__PURE__ */ new Map();
var SourceSelection = class {
  #initialize = false;
  #loaders;
  #domSources;
  #media;
  #loader;
  constructor(domSources, media, loader, customLoaders = []) {
    this.#domSources = domSources;
    this.#media = media;
    this.#loader = loader;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this.#loaders = computed(() => {
      const remoteLoader = media.$state.remotePlaybackLoader();
      const loaders = media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = media;
    $state.sources.set(normalizeSrc(media.$props.src()));
    for (const src of $state.sources()) {
      const loader2 = this.#loaders().find((loader3) => loader3.canPlay(src));
      if (!loader2) continue;
      const mediaType = loader2.mediaType(src);
      media.$state.source.set(src);
      media.$state.mediaType.set(mediaType);
      media.$state.inferredViewType.set(mediaType);
      this.#loader.set(loader2);
      this.#initialize = true;
      break;
    }
  }
  connect() {
    const loader = this.#loader();
    if (this.#initialize) {
      this.#notifySourceChange(this.#media.$state.source(), loader);
      this.#notifyLoaderChange(loader);
      this.#initialize = false;
    }
    effect(this.#onSourcesChange.bind(this));
    effect(this.#onSourceChange.bind(this));
    effect(this.#onSetup.bind(this));
    effect(this.#onLoadSource.bind(this));
    effect(this.#onLoadPoster.bind(this));
  }
  #onSourcesChange() {
    this.#media.notify("sources-change", [
      ...normalizeSrc(this.#media.$props.src()),
      ...this.#domSources()
    ]);
  }
  #onSourceChange() {
    const { $state } = this.#media;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this.#findNewSource(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
    if (noMatch && !warned.has(newSource.src) && !peek(this.#loader)) {
      const source = sources[0];
      console.warn(
        `[vidstack] could not find a loader for any of the given media sources, consider providing \`type\`:

--- HTML ---

<media-provider>
  <source src="${source.src}" type="video/mp4" />
</media-provider>"

--- React ---

<MediaPlayer src={{ src: "${source.src}", type: "video/mp4" }}>

---

Falling back to fetching source headers...`
      );
      warned.add(newSource.src);
    }
    if (noMatch) {
      const { crossOrigin } = $state, credentials = getRequestCredentials(crossOrigin()), abort = new AbortController();
      Promise.all(
        sources.map(
          (source) => isString(source.src) && source.type === "?" ? fetch(source.src, {
            method: "HEAD",
            credentials,
            signal: abort.signal
          }).then((res) => {
            source.type = res.headers.get("content-type") || "??";
            sourceTypes.set(source.src, source.type);
            return source;
          }).catch(() => source) : source
        )
      ).then((sources2) => {
        if (abort.signal.aborted) return;
        const newSource2 = this.#findNewSource(peek($state.source), sources2);
        tick();
        if (!newSource2.src) {
          this.#media.notify("error", {
            message: "Failed to load resource.",
            code: 4
          });
        }
      });
      return () => abort.abort();
    }
    tick();
  }
  #findNewSource(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this.#loaders(), { started, paused, currentTime, quality, savedState } = this.#media.$state;
    for (const src of sources) {
      const loader = loaders.find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
        break;
      }
    }
    if (isVideoQualitySrc(newSource)) {
      const currentQuality = quality(), sourceQuality = sources.find((s2) => s2.src === currentQuality?.src);
      if (peek(started)) {
        savedState.set({
          paused: peek(paused),
          currentTime: peek(currentTime)
        });
      } else {
        savedState.set(null);
      }
      if (sourceQuality) {
        newSource = sourceQuality;
        triggerEvent = new DOMEvent("quality-change", {
          detail: { quality: currentQuality }
        });
      }
    }
    if (!isSameSrc(currentSource, newSource)) {
      this.#notifySourceChange(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this.#loader)) {
      this.#notifyLoaderChange(newLoader, triggerEvent);
    }
    return newSource;
  }
  #notifySourceChange(src, loader, trigger) {
    this.#media.notify("source-change", src, trigger);
    this.#media.notify("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  #notifyLoaderChange(loader, trigger) {
    this.#media.$providerSetup.set(false);
    this.#media.notify("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this.#media));
    this.#loader.set(loader);
    this.#media.notify("provider-loader-change", loader, trigger);
  }
  #onSetup() {
    const provider = this.#media.$provider();
    if (!provider || peek(this.#media.$providerSetup)) return;
    if (this.#media.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this.#media.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  #onLoadSource() {
    if (!this.#media.$providerSetup()) return;
    const provider = this.#media.$provider(), source = this.#media.$state.source(), crossOrigin = peek(this.#media.$state.crossOrigin), preferNativeHLS = peek(this.#media.$props.preferNativeHLS);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this.#media.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (preferNativeHLS || !isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossOrigin),
            signal: abort.signal
          }).then((streamType) => {
            this.#media.notify("stream-type-change", streamType);
          }).catch(noop);
        }
      } else if (isDASHSrc(source)) {
        resolveStreamTypeFromDASHManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal
        }).then((streamType) => {
          this.#media.notify("stream-type-change", streamType);
        }).catch(noop);
      } else {
        this.#media.notify("stream-type-change", "on-demand");
      }
      peek(() => {
        const preload = peek(this.#media.$state.preload);
        return provider?.loadSource(source, preload).catch((error) => {
          if (true) {
            this.#media.logger?.errorGroup("[vidstack] failed to load source").labelledLog("Error", error).labelledLog("Source", source).labelledLog("Provider", provider).labelledLog("Media Context", { ...this.#media }).dispatch();
          }
        });
      });
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin);
    } catch (error) {
      if (true) {
        this.#media.logger?.infoGroup(`Failed to preconnect to source: ${source.src}`).labelledLog("Error", error).dispatch();
      }
    }
  }
  #onLoadPoster() {
    const loader = this.#loader(), { providedPoster, source, canLoadPoster } = this.#media.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster()) return;
    const abort = new AbortController(), trigger = new DOMEvent("source-change", { detail: source });
    loader.loadPoster(source(), this.#media, abort).then((url) => {
      this.#media.notify("poster-change", url || "", trigger);
    }).catch(() => {
      this.#media.notify("poster-change", "", trigger);
    });
    return () => {
      abort.abort();
    };
  }
};
function normalizeSrc(src) {
  return (isArray(src) ? src : [src]).map((src2) => {
    if (isString(src2)) {
      return { src: src2, type: inferType(src2) };
    } else {
      return { ...src2, type: inferType(src2.src, src2.type) };
    }
  });
}
function inferType(src, type) {
  if (isString(type) && type.length) {
    return type;
  } else if (isString(src) && sourceTypes.has(src)) {
    return sourceTypes.get(src);
  } else if (!type && isHLSSrc({ src, type: "" })) {
    return "application/x-mpegurl";
  } else if (!type && isDASHSrc({ src, type: "" })) {
    return "application/dash+xml";
  } else if (!isString(src) || src.startsWith("blob:")) {
    return "video/object";
  } else if (src.includes("youtube") || src.includes("youtu.be")) {
    return "video/youtube";
  } else if (src.includes("vimeo") && !src.includes("progressive_redirect") && !src.includes(".m3u8")) {
    return "video/vimeo";
  }
  return "?";
}
function isSameSrc(a, b) {
  return a?.src === b?.src && a?.type === b?.type;
}

// ../vidstack/src/components/provider/tracks.ts
var Tracks = class {
  #domTracks;
  #media;
  #prevTracks = [];
  constructor(domTracks, media) {
    this.#domTracks = domTracks;
    this.#media = media;
    effect(this.#onTracksChange.bind(this));
  }
  #onTracksChange() {
    const newTracks = this.#domTracks();
    for (const oldTrack of this.#prevTracks) {
      if (!newTracks.some((t2) => t2.id === oldTrack.id)) {
        const track = oldTrack.id && this.#media.textTracks.getById(oldTrack.id);
        if (track) this.#media.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id2 = newTrack.id || TextTrack.createId(newTrack);
      if (!this.#media.textTracks.getById(id2)) {
        newTrack.id = id2;
        this.#media.textTracks.add(newTrack);
      }
    }
    this.#prevTracks = newTracks;
  }
};

// ../vidstack/src/components/provider/provider.ts
var _load_dec, _a4, _media4, _sources, _domSources, _domTracks, _loader, _loadRafId, _init4, _MediaProvider_instances, runLoader_fn, destroyProvider_fn, onResize_fn2, onMutation_fn;
var MediaProvider = class extends (_a4 = Component, _load_dec = [method], _a4) {
  constructor() {
    super(...arguments);
    __runInitializers(_init4, 5, this);
    __privateAdd(this, _MediaProvider_instances);
    __privateAdd(this, _media4);
    __privateAdd(this, _sources);
    __privateAdd(this, _domSources, signal([]));
    __privateAdd(this, _domTracks, signal([]));
    __privateAdd(this, _loader, null);
    __privateAdd(this, _loadRafId, -1);
  }
  onSetup() {
    __privateSet(this, _media4, useMediaContext());
    __privateSet(this, _sources, new SourceSelection(
      __privateGet(this, _domSources),
      __privateGet(this, _media4),
      this.$state.loader,
      this.$props.loaders()
    ));
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    __privateGet(this, _sources).connect();
    new Tracks(__privateGet(this, _domTracks), __privateGet(this, _media4));
    const resize = new ResizeObserver(animationFrameThrottle(__privateMethod(this, _MediaProvider_instances, onResize_fn2).bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(__privateMethod(this, _MediaProvider_instances, onMutation_fn).bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    __privateMethod(this, _MediaProvider_instances, onResize_fn2).call(this);
    __privateMethod(this, _MediaProvider_instances, onMutation_fn).call(this);
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    target?.setAttribute("aria-hidden", "true");
    window.cancelAnimationFrame(__privateGet(this, _loadRafId));
    __privateSet(this, _loadRafId, requestAnimationFrame(() => __privateMethod(this, _MediaProvider_instances, runLoader_fn).call(this, target)));
    onDispose(() => {
      window.cancelAnimationFrame(__privateGet(this, _loadRafId));
    });
  }
  onDestroy() {
    __privateSet(this, _loader, null);
    __privateMethod(this, _MediaProvider_instances, destroyProvider_fn).call(this);
  }
};
_init4 = __decoratorStart(_a4);
_media4 = new WeakMap();
_sources = new WeakMap();
_domSources = new WeakMap();
_domTracks = new WeakMap();
_loader = new WeakMap();
_loadRafId = new WeakMap();
_MediaProvider_instances = new WeakSet();
runLoader_fn = function(target) {
  if (!this.scope) return;
  const loader = this.$state.loader(), { $provider } = __privateGet(this, _media4);
  if (__privateGet(this, _loader) === loader && loader?.target === target && peek($provider)) return;
  __privateMethod(this, _MediaProvider_instances, destroyProvider_fn).call(this);
  __privateSet(this, _loader, loader);
  if (loader) loader.target = target || null;
  if (!loader || !target) return;
  loader.load(__privateGet(this, _media4)).then((provider) => {
    if (!this.scope) return;
    if (peek(this.$state.loader) !== loader) return;
    __privateGet(this, _media4).notify("provider-change", provider);
  });
};
destroyProvider_fn = function() {
  __privateGet(this, _media4)?.notify("provider-change", null);
};
onResize_fn2 = function() {
  if (!this.el) return;
  const { player, $state } = __privateGet(this, _media4), width = this.el.offsetWidth, height = this.el.offsetHeight;
  if (!player) return;
  $state.mediaWidth.set(width);
  $state.mediaHeight.set(height);
  if (player.el) {
    setStyle(player.el, "--media-width", width + "px");
    setStyle(player.el, "--media-height", height + "px");
  }
};
onMutation_fn = function() {
  const sources = [], tracks = [], children = this.el.children;
  for (const el of children) {
    if (el.hasAttribute("data-vds")) continue;
    if (el instanceof HTMLSourceElement) {
      const src = {
        id: el.id,
        src: el.src,
        type: el.type
      };
      for (const prop2 of ["id", "src", "width", "height", "bitrate", "codec"]) {
        const value = el.getAttribute(`data-${prop2}`);
        if (isString(value)) src[prop2] = /id|src|codec/.test(prop2) ? value : Number(value);
      }
      sources.push(src);
    } else if (el instanceof HTMLTrackElement) {
      const track = {
        src: el.src,
        kind: el.track.kind,
        language: el.srclang,
        label: el.label,
        default: el.default,
        type: el.getAttribute("data-type")
      };
      tracks.push({
        id: el.id || TextTrack.createId(track),
        ...track
      });
    }
  }
  __privateGet(this, _domSources).set(sources);
  __privateGet(this, _domTracks).set(tracks);
  tick();
};
__decorateElement(_init4, 1, "load", _load_dec, MediaProvider);
__decoratorMetadata(_init4, MediaProvider);
__publicField(MediaProvider, "props", {
  loaders: []
});
__publicField(MediaProvider, "state", new State({
  loader: null
}));

// ../vidstack/src/components/aria/announcer.ts
var MediaAnnouncer = class extends Component {
  static props = {
    translations: null
  };
  static state = new State({
    label: null,
    busy: false
  });
  #media;
  #initializing = false;
  onSetup() {
    this.#media = useMediaContext();
  }
  onAttach(el) {
    el.style.display = "contents";
  }
  onConnect(el) {
    el.setAttribute("data-media-announcer", "");
    setAttributeIfEmpty(el, "role", "status");
    setAttributeIfEmpty(el, "aria-live", "polite");
    const { busy } = this.$state;
    this.setAttributes({
      "aria-busy": () => busy() ? "true" : null
    });
    this.#initializing = true;
    effect(this.#watchPaused.bind(this));
    effect(this.#watchVolume.bind(this));
    effect(this.#watchCaptions.bind(this));
    effect(this.#watchFullscreen.bind(this));
    effect(this.#watchPiP.bind(this));
    effect(this.#watchSeeking.bind(this));
    effect(this.#watchLabel.bind(this));
    tick();
    this.#initializing = false;
  }
  #watchPaused() {
    const { paused } = this.#media.$state;
    this.#setLabel(!paused() ? "Play" : "Pause");
  }
  #watchFullscreen() {
    const { fullscreen } = this.#media.$state;
    this.#setLabel(fullscreen() ? "Enter Fullscreen" : "Exit Fullscreen");
  }
  #watchPiP() {
    const { pictureInPicture } = this.#media.$state;
    this.#setLabel(pictureInPicture() ? "Enter PiP" : "Exit PiP");
  }
  #watchCaptions() {
    const { textTrack } = this.#media.$state;
    this.#setLabel(textTrack() ? "Closed-Captions On" : "Closed-Captions Off");
  }
  #watchVolume() {
    const { muted, volume, audioGain } = this.#media.$state;
    this.#setLabel(
      muted() || volume() === 0 ? "Mute" : `${Math.round(volume() * (audioGain() ?? 1) * 100)}% ${this.#translate("Volume")}`
    );
  }
  #startedSeekingAt = -1;
  #seekTimer = -1;
  #watchSeeking() {
    const { seeking, currentTime } = this.#media.$state, isSeeking = seeking();
    if (this.#startedSeekingAt > 0) {
      window.clearTimeout(this.#seekTimer);
      this.#seekTimer = window.setTimeout(() => {
        if (!this.scope) return;
        const newTime = peek(currentTime), seconds = Math.abs(newTime - this.#startedSeekingAt);
        if (seconds >= 1) {
          const isForward = newTime >= this.#startedSeekingAt, spokenTime = formatSpokenTime(seconds);
          this.#setLabel(
            `${this.#translate(isForward ? "Seek Forward" : "Seek Backward")} ${spokenTime}`
          );
        }
        this.#startedSeekingAt = -1;
        this.#seekTimer = -1;
      }, 300);
    } else if (isSeeking) {
      this.#startedSeekingAt = peek(currentTime);
    }
  }
  #translate(word) {
    const { translations } = this.$props;
    return translations?.()?.[word || ""] ?? word;
  }
  #watchLabel() {
    const { label, busy } = this.$state, $label = this.#translate(label());
    if (this.#initializing) return;
    busy.set(true);
    const id2 = window.setTimeout(() => void busy.set(false), 150);
    this.el && setAttribute(this.el, "aria-label", $label);
    if (isString($label)) {
      this.dispatch("change", { detail: $label });
    }
    return () => window.clearTimeout(id2);
  }
  #setLabel(word) {
    const { label } = this.$state;
    label.set(word);
  }
};

// ../vidstack/src/components/ui/controls.ts
var Controls = class extends Component {
  static props = {
    hideDelay: 2e3,
    hideOnMouseLeave: false
  };
  #media;
  onSetup() {
    this.#media = useMediaContext();
    effect(this.#watchProps.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this.#media.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this.#isShowing.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this.#isShowing() });
    });
    effect(this.#hideControls.bind(this));
    effect(() => {
      const isFullscreen2 = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen2 && `env(safe-area-inset-${side})`);
      }
    });
  }
  #hideControls() {
    if (!this.el) return;
    const { nativeControls } = this.#media.$state, isHidden = nativeControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  #watchProps() {
    const { controls } = this.#media.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this.#media.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  #isShowing() {
    const { controlsVisible } = this.#media.$state;
    return controlsVisible();
  }
};

// ../vidstack/src/components/ui/controls-group.ts
var ControlsGroup = class extends Component {
  onAttach(el) {
    if (!el.style.pointerEvents) setStyle(el, "pointer-events", "auto");
  }
};

// ../vidstack/src/components/ui/popper/popper.ts
var Popper = class extends ViewController {
  #delegate;
  constructor(delegate) {
    super();
    this.#delegate = delegate;
    effect(this.#watchTrigger.bind(this));
  }
  onDestroy() {
    this.#stopAnimationEndListener?.();
    this.#stopAnimationEndListener = null;
  }
  #watchTrigger() {
    const trigger = this.#delegate.trigger();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide = this.hide.bind(this);
    this.#delegate.listen(trigger, show, hide);
  }
  #showTimerId = -1;
  #hideRafId = -1;
  #stopAnimationEndListener = null;
  show(trigger) {
    this.#cancelShowing();
    window.cancelAnimationFrame(this.#hideRafId);
    this.#hideRafId = -1;
    this.#stopAnimationEndListener?.();
    this.#stopAnimationEndListener = null;
    this.#showTimerId = window.setTimeout(() => {
      this.#showTimerId = -1;
      const content = this.#delegate.content();
      if (content) content.style.removeProperty("display");
      peek(() => this.#delegate.onChange(true, trigger));
    }, this.#delegate.showDelay?.() ?? 0);
  }
  hide(trigger) {
    this.#cancelShowing();
    peek(() => this.#delegate.onChange(false, trigger));
    this.#hideRafId = requestAnimationFrame(() => {
      this.#cancelShowing();
      this.#hideRafId = -1;
      const content = this.#delegate.content();
      if (content) {
        const onHide = () => {
          content.style.display = "none";
          this.#stopAnimationEndListener = null;
        };
        const isAnimated = hasAnimation(content);
        if (isAnimated) {
          this.#stopAnimationEndListener?.();
          const stop = listenEvent(content, "animationend", onHide, { once: true });
          this.#stopAnimationEndListener = stop;
        } else {
          onHide();
        }
      }
    });
  }
  #cancelShowing() {
    window.clearTimeout(this.#showTimerId);
    this.#showTimerId = -1;
  }
};

// ../vidstack/src/components/ui/tooltip/tooltip-context.ts
var tooltipContext = createContext();

// ../vidstack/src/components/ui/tooltip/tooltip.ts
var id = 0;
var Tooltip = class extends Component {
  static props = {
    showDelay: 700
  };
  #id = `media-tooltip-${++id}`;
  #trigger = signal(null);
  #content = signal(null);
  constructor() {
    super();
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      trigger: this.#trigger,
      content: this.#content,
      showDelay,
      listen(trigger, show, hide) {
        listenEvent(trigger, "touchstart", (e2) => e2.preventDefault(), {
          passive: false
        });
        effect(() => {
          if ($keyboard()) listenEvent(trigger, "focus", show);
          listenEvent(trigger, "blur", hide);
        });
        listenEvent(trigger, "mouseenter", show);
        listenEvent(trigger, "mouseleave", hide);
      },
      onChange: this.#onShowingChange.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onSetup() {
    provideContext(tooltipContext, {
      trigger: this.#trigger,
      content: this.#content,
      attachTrigger: this.#attachTrigger.bind(this),
      detachTrigger: this.#detachTrigger.bind(this),
      attachContent: this.#attachContent.bind(this),
      detachContent: this.#detachContent.bind(this)
    });
  }
  #attachTrigger(el) {
    this.#trigger.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this.#id);
  }
  #detachTrigger(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this.#trigger.set(null);
  }
  #attachContent(el) {
    el.setAttribute("id", this.#id);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this.#content.set(el);
  }
  #detachContent(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this.#content.set(null);
  }
  #onShowingChange(isShowing) {
    const trigger = this.#trigger(), content = this.#content();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this.#id : null);
    }
    for (const el of [this.el, trigger, content]) {
      el && setAttribute(el, "data-visible", isShowing);
    }
  }
};

// ../vidstack/src/components/ui/tooltip/tooltip-trigger.ts
var TooltipTrigger = class extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        this.#attach();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this.#getButton();
          button && tooltip.detachTrigger(button);
        });
      })
    );
  }
  #attach() {
    const button = this.#getButton(), tooltip = useContext(tooltipContext);
    button && tooltip.attachTrigger(button);
  }
  #getButton() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
  }
};

// ../vidstack/src/components/ui/tooltip/tooltip-content.ts
var TooltipContent = class extends Component {
  static props = {
    placement: "top center",
    offset: 0,
    alignOffset: 0
  };
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.#attach(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this.#attach(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip.detachContent(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        effect(this.#watchPlacement.bind(this));
      })
    );
  }
  #attach(el) {
    const tooltip = useContext(tooltipContext);
    tooltip.attachContent(el);
  }
  #watchPlacement() {
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this.#getTrigger(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  #getTrigger() {
    return useContext(tooltipContext).trigger();
  }
};

// ../vidstack/src/components/ui/buttons/toggle-button-controller.ts
var ToggleButtonController = class extends ViewController {
  static props = {
    disabled: false
  };
  #delegate;
  constructor(delegate) {
    super();
    this.#delegate = delegate;
    new FocusVisibleController();
    if (delegate.keyShortcut) {
      new ARIAKeyShortcuts(delegate.keyShortcut);
    }
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      "data-pressed": this.#delegate.isPresssed,
      "aria-pressed": this.#isARIAPressed.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this.#onMaybePress.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this.#onInteraction.bind(this), {
        passive: true
      });
    }
  }
  #isARIAPressed() {
    return ariaBool(this.#delegate.isPresssed());
  }
  #onPressed(event) {
    if (isWriteSignal(this.#delegate.isPresssed)) {
      this.#delegate.isPresssed.set((p) => !p);
    }
  }
  #onMaybePress(event) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    (this.#delegate.onPress ?? this.#onPressed).call(this, event);
  }
  #onInteraction(event) {
    if (this.$props.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
};

// ../vidstack/src/components/ui/buttons/toggle-button.ts
var _pressed_dec, _a5, _pressed, _init5;
var ToggleButton = class extends (_a5 = Component, _pressed_dec = [prop], _a5) {
  constructor() {
    super();
    __runInitializers(_init5, 5, this);
    __privateAdd(this, _pressed, signal(false));
    new ToggleButtonController({
      isPresssed: __privateGet(this, _pressed)
    });
  }
  get pressed() {
    return __privateGet(this, _pressed).call(this);
  }
};
_init5 = __decoratorStart(_a5);
_pressed = new WeakMap();
__decorateElement(_init5, 2, "pressed", _pressed_dec, ToggleButton);
__decoratorMetadata(_init5, ToggleButton);
__publicField(ToggleButton, "props", {
  disabled: false,
  defaultPressed: false
});

// ../vidstack/src/utils/aria.ts
function ariaBool2(value) {
  return value ? "true" : "false";
}
function $ariaBool(signal2) {
  return () => ariaBool2(signal2());
}

// ../vidstack/src/components/ui/buttons/airplay-button.ts
var AirPlayButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { canAirPlay, isAirPlayConnected } = this.#media.$state;
    this.setAttributes({
      "data-active": isAirPlayConnected,
      "data-supported": canAirPlay,
      "data-state": this.#getState.bind(this),
      "aria-hidden": $ariaBool(() => !canAirPlay())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "airplay");
    setARIALabel(el, this.#getDefaultLabel.bind(this));
  }
  #onPress(event) {
    const remote = this.#media.remote;
    remote.requestAirPlay(event);
  }
  #isPressed() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState() !== "disconnected";
  }
  #getState() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState();
  }
  #getDefaultLabel() {
    const { remotePlaybackState } = this.#media.$state;
    return `AirPlay ${remotePlaybackState()}`;
  }
};

// ../vidstack/src/components/ui/buttons/google-cast-button.ts
var GoogleCastButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { canGoogleCast, isGoogleCastConnected } = this.#media.$state;
    this.setAttributes({
      "data-active": isGoogleCastConnected,
      "data-supported": canGoogleCast,
      "data-state": this.#getState.bind(this),
      "aria-hidden": $ariaBool(() => !canGoogleCast())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "google-cast");
    setARIALabel(el, this.#getDefaultLabel.bind(this));
  }
  #onPress(event) {
    const remote = this.#media.remote;
    remote.requestGoogleCast(event);
  }
  #isPressed() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState() !== "disconnected";
  }
  #getState() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState();
  }
  #getDefaultLabel() {
    const { remotePlaybackState } = this.#media.$state;
    return `Google Cast ${remotePlaybackState()}`;
  }
};

// ../vidstack/src/components/ui/buttons/play-button.ts
var PlayButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "togglePaused",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { paused, ended } = this.#media.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, "Play");
  }
  #onPress(event) {
    const remote = this.#media.remote;
    this.#isPressed() ? remote.pause(event) : remote.play(event);
  }
  #isPressed() {
    const { paused } = this.#media.$state;
    return !paused();
  }
};

// ../vidstack/src/components/ui/buttons/caption-button.ts
var CaptionButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "toggleCaptions",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    this.setAttributes({
      "data-active": this.#isPressed.bind(this),
      "data-supported": () => !this.#isHidden(),
      "aria-hidden": $ariaBool(this.#isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, "Captions");
  }
  #onPress(event) {
    this.#media.remote.toggleCaptions(event);
  }
  #isPressed() {
    const { textTrack } = this.#media.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  #isHidden() {
    const { hasCaptions } = this.#media.$state;
    return !hasCaptions();
  }
};

// ../vidstack/src/components/ui/buttons/fullscreen-button.ts
var FullscreenButton = class extends Component {
  static props = {
    ...ToggleButtonController.props,
    target: "prefer-media"
  };
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "toggleFullscreen",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { fullscreen } = this.#media.$state, isSupported = this.#isSupported.bind(this);
    this.setAttributes({
      "data-active": fullscreen,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "fullscreen");
    setARIALabel(el, "Fullscreen");
  }
  #onPress(event) {
    const remote = this.#media.remote, target = this.$props.target();
    this.#isPressed() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  #isPressed() {
    const { fullscreen } = this.#media.$state;
    return fullscreen();
  }
  #isSupported() {
    const { canFullscreen: canFullscreen2 } = this.#media.$state;
    return canFullscreen2();
  }
};

// ../vidstack/src/components/ui/buttons/mute-button.ts
var MuteButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "toggleMuted",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    this.setAttributes({
      "data-muted": this.#isPressed.bind(this),
      "data-state": this.#getState.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, "Mute");
  }
  #onPress(event) {
    const remote = this.#media.remote;
    this.#isPressed() ? remote.unmute(event) : remote.mute(event);
  }
  #isPressed() {
    const { muted, volume } = this.#media.$state;
    return muted() || volume() === 0;
  }
  #getState() {
    const { muted, volume } = this.#media.$state, $volume = volume();
    if (muted() || $volume === 0) return "muted";
    else if ($volume >= 0.5) return "high";
    else if ($volume < 0.5) return "low";
  }
};

// ../vidstack/src/components/ui/buttons/pip-button.ts
var PIPButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "togglePictureInPicture",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { pictureInPicture } = this.#media.$state, isSupported = this.#isSupported.bind(this);
    this.setAttributes({
      "data-active": pictureInPicture,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "pip");
    setARIALabel(el, "PiP");
  }
  #onPress(event) {
    const remote = this.#media.remote;
    this.#isPressed() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  #isPressed() {
    const { pictureInPicture } = this.#media.$state;
    return pictureInPicture();
  }
  #isSupported() {
    const { canPictureInPicture } = this.#media.$state;
    return canPictureInPicture();
  }
};

// ../vidstack/src/components/ui/buttons/seek-button.ts
var SeekButton = class extends Component {
  static props = {
    disabled: false,
    seconds: 30
  };
  #media;
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.#media = useMediaContext();
    const { seeking } = this.#media.$state, { seconds } = this.$props, isSupported = this.#isSupported.bind(this);
    this.setAttributes({
      seconds,
      "data-seeking": seeking,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "seek");
    setARIALabel(el, this.#getDefaultLabel.bind(this));
  }
  onConnect(el) {
    onPress(el, this.#onPress.bind(this));
  }
  #isSupported() {
    const { canSeek } = this.#media.$state;
    return canSeek();
  }
  #getDefaultLabel() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  #onPress(event) {
    const { seconds, disabled } = this.$props;
    if (disabled()) return;
    const { currentTime } = this.#media.$state, seekTo = currentTime() + seconds();
    this.#media.remote.seek(seekTo, event);
  }
};

// ../vidstack/src/components/ui/buttons/live-button.ts
var LiveButton = class extends Component {
  static props = {
    disabled: false
  };
  #media;
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.#media = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this.#media.$state, isHidden = () => !live();
    this.setAttributes({
      "data-edge": liveEdge,
      "data-hidden": isHidden,
      "aria-disabled": $ariaBool(() => disabled() || liveEdge()),
      "aria-hidden": $ariaBool(isHidden)
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "live");
  }
  onConnect(el) {
    onPress(el, this.#onPress.bind(this));
  }
  #onPress(event) {
    const { disabled } = this.$props, { liveEdge } = this.#media.$state;
    if (disabled() || liveEdge()) return;
    this.#media.remote.seekToLiveEdge(event);
  }
};

// ../vidstack/src/foundation/observers/intersection-observer.ts
var IntersectionObserverController = class extends ViewController {
  #init;
  #observer;
  constructor(init2) {
    super();
    this.#init = init2;
  }
  onConnect(el) {
    this.#observer = new IntersectionObserver((entries) => {
      this.#init.callback?.(entries, this.#observer);
    }, this.#init);
    this.#observer.observe(el);
    onDispose(this.#onDisconnect.bind(this));
  }
  /**
   * Disconnect any active intersection observers.
   */
  #onDisconnect() {
    this.#observer?.disconnect();
    this.#observer = void 0;
  }
};

// ../vidstack/src/components/ui/sliders/slider/slider-context.ts
var sliderContext = createContext();
var sliderObserverContext = createContext();

// ../vidstack/src/components/ui/sliders/slider/utils.ts
function getClampedValue(min, max, value, step) {
  return clampNumber(min, round(value, getNumberOfDecimalPlaces(step)), max);
}
function getValueFromRate(min, max, rate, step) {
  const boundRate = clampNumber(0, rate, 1), range = max - min, fill = range * boundRate, stepRatio = fill / step, steps = step * Math.round(stepRatio);
  return min + steps;
}

// ../vidstack/src/components/ui/sliders/slider/events-controller.ts
var SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1
};
var SliderEventsController = class extends ViewController {
  #delegate;
  #media;
  #observer;
  constructor(delegate, media) {
    super();
    this.#delegate = delegate;
    this.#media = media;
  }
  onSetup() {
    if (hasProvidedContext(sliderObserverContext)) {
      this.#observer = useContext(sliderObserverContext);
    }
  }
  onConnect() {
    effect(this.#attachEventListeners.bind(this));
    effect(this.#attachPointerListeners.bind(this));
    if (this.#delegate.swipeGesture) effect(this.#watchSwipeGesture.bind(this));
  }
  #watchSwipeGesture() {
    const { pointer } = this.#media.$state;
    if (pointer() !== "coarse" || !this.#delegate.swipeGesture()) {
      this.#provider = null;
      return;
    }
    this.#provider = this.#media.player.el?.querySelector(
      "media-provider,[data-media-provider]"
    );
    if (!this.#provider) return;
    listenEvent(this.#provider, "touchstart", this.#onTouchStart.bind(this), {
      passive: true
    });
    listenEvent(this.#provider, "touchmove", this.#onTouchMove.bind(this), {
      passive: false
    });
  }
  #provider = null;
  #touch = null;
  #touchStartValue = null;
  #onTouchStart(event) {
    this.#touch = event.touches[0];
  }
  #onTouchMove(event) {
    if (isNull(this.#touch) || isTouchPinchEvent(event)) return;
    const touch = event.touches[0], xDiff = touch.clientX - this.#touch.clientX, yDiff = touch.clientY - this.#touch.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 5) {
      return;
    }
    if (isDragging) return;
    event.preventDefault();
    if (Math.abs(xDiff) > 20) {
      this.#touch = touch;
      this.#touchStartValue = this.$state.value();
      this.#onStartDragging(this.#touchStartValue, event);
    }
  }
  #attachEventListeners() {
    const { hidden } = this.$props;
    this.listen("focus", this.#onFocus.bind(this));
    this.listen("keydown", this.#onKeyDown.bind(this));
    this.listen("keyup", this.#onKeyUp.bind(this));
    if (hidden() || this.#delegate.isDisabled()) return;
    this.listen("pointerenter", this.#onPointerEnter.bind(this));
    this.listen("pointermove", this.#onPointerMove.bind(this));
    this.listen("pointerleave", this.#onPointerLeave.bind(this));
    this.listen("pointerdown", this.#onPointerDown.bind(this));
  }
  #attachPointerListeners() {
    if (this.#delegate.isDisabled() || !this.$state.dragging()) return;
    listenEvent(document, "pointerup", this.#onDocumentPointerUp.bind(this), { capture: true });
    listenEvent(document, "pointermove", this.#onDocumentPointerMove.bind(this));
    listenEvent(document, "touchmove", this.#onDocumentTouchMove.bind(this), {
      passive: false
    });
  }
  #onFocus() {
    this.#updatePointerValue(this.$state.value());
  }
  #updateValue(newValue, trigger) {
    const { value, min, max, dragging } = this.$state;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event);
    this.#delegate.onValueChange?.(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event2);
      this.#delegate.onDragValueChange?.(event2);
    }
  }
  #updatePointerValue(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this.#updateValue(value, trigger);
    }
  }
  #getPointerValue(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this.#touch && isNumber(this.#touchStartValue)) {
        const { width } = this.#provider.getBoundingClientRect(), rate = (event.clientX - this.#touch.clientX) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this.#touchStartValue - diff : this.#touchStartValue + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this.#delegate.roundValue(
          getValueFromRate(min(), max(), thumbPositionRate, this.#delegate.getStep())
        )
      )
    );
  }
  #onPointerEnter(event) {
    this.$state.pointing.set(true);
  }
  #onPointerMove(event) {
    const { dragging } = this.$state;
    if (dragging()) return;
    this.#updatePointerValue(this.#getPointerValue(event), event);
  }
  #onPointerLeave(event) {
    this.$state.pointing.set(false);
  }
  #onPointerDown(event) {
    if (event.button !== 0) return;
    const value = this.#getPointerValue(event);
    this.#onStartDragging(value, event);
    this.#updatePointerValue(value, event);
  }
  #onStartDragging(value, trigger) {
    const { dragging } = this.$state;
    if (dragging()) return;
    dragging.set(true);
    this.#media.remote.pauseControls(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event);
    this.#delegate.onDragStart?.(event);
    this.#observer?.onDragStart?.();
  }
  #onStopDragging(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging()) return;
    dragging.set(false);
    this.#media.remote.resumeControls(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event);
    this.#delegate.onDragEnd?.(event);
    this.#touch = null;
    this.#touchStartValue = null;
    this.#observer?.onDragEnd?.();
  }
  // -------------------------------------------------------------------------------------------
  // Keyboard Events
  // -------------------------------------------------------------------------------------------
  #lastDownKey;
  #repeatedKeys = false;
  #onKeyDown(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey) return;
    const { key: key2 } = event, jumpValue = this.#calcJumpValue(event);
    if (!isNull(jumpValue)) {
      this.#updatePointerValue(jumpValue, event);
      this.#updateValue(jumpValue, event);
      return;
    }
    const newValue = this.#calcNewKeyValue(event);
    if (!this.#repeatedKeys) {
      this.#repeatedKeys = key2 === this.#lastDownKey;
      if (!this.$state.dragging() && this.#repeatedKeys) {
        this.#onStartDragging(newValue, event);
      }
    }
    this.#updatePointerValue(newValue, event);
    this.#lastDownKey = key2;
  }
  #onKeyUp(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey || !isNull(this.#calcJumpValue(event))) return;
    const newValue = this.#repeatedKeys ? this.$state.pointerValue() : this.#calcNewKeyValue(event);
    this.#updateValue(newValue, event);
    this.#onStopDragging(newValue, event);
    this.#lastDownKey = "";
    this.#repeatedKeys = false;
  }
  #calcJumpValue(event) {
    let key2 = event.key, { min, max } = this.$state;
    if (key2 === "Home" || key2 === "PageUp") {
      return min();
    } else if (key2 === "End" || key2 === "PageDown") {
      return max();
    } else if (!event.metaKey && /^[0-9]$/.test(key2)) {
      return (max() - min()) / 10 * Number(key2);
    }
    return null;
  }
  #calcNewKeyValue(event) {
    const { key: key2, shiftKey } = event;
    event.preventDefault();
    event.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { min, max, value, pointerValue } = this.$state, step = this.#delegate.getStep(), keyStep = this.#delegate.getKeyStep();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key2]), diff = modifiedStep * direction, currentValue = this.#repeatedKeys ? pointerValue() : this.#delegate.getValue?.() ?? value(), steps = (currentValue + diff) / step;
    return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  #onDocumentPointerUp(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const value = this.#getPointerValue(event);
    this.#updatePointerValue(value, event);
    this.#onStopDragging(value, event);
  }
  #onDocumentTouchMove(event) {
    event.preventDefault();
  }
  #onDocumentPointerMove = functionThrottle(
    (event) => {
      this.#updatePointerValue(this.#getPointerValue(event), event);
    },
    20,
    { leading: true }
  );
};

// ../vidstack/src/components/ui/sliders/slider/format.ts
var sliderValueFormatContext = createContext(() => ({}));

// ../vidstack/src/components/ui/sliders/slider/slider-controller.ts
var SliderController = class extends ViewController {
  static props = {
    hidden: false,
    disabled: false,
    step: 1,
    keyStep: 1,
    orientation: "horizontal",
    shiftKeyMultiplier: 5
  };
  #media;
  #delegate;
  #isVisible = signal(true);
  #isIntersecting = signal(true);
  constructor(delegate) {
    super();
    this.#delegate = delegate;
  }
  onSetup() {
    this.#media = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      orientation: this.$props.orientation,
      disabled: this.#delegate.isDisabled,
      preview: signal(null)
    });
    effect(this.#watchValue.bind(this));
    effect(this.#watchStep.bind(this));
    effect(this.#watchDisabled.bind(this));
    this.#setupAttrs();
    new SliderEventsController(this.#delegate, this.#media).attach(this);
    new IntersectionObserverController({
      callback: this.#onIntersectionChange.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    if (IS_SERVER) this.#watchCSSVars();
    else effect(this.#watchCSSVars.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.#isVisible.set));
    effect(this.#watchHidden.bind(this));
  }
  #onIntersectionChange(entries) {
    this.#isIntersecting.set(entries[0].isIntersecting);
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  #watchHidden() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.#isVisible() || !this.#isIntersecting.bind(this));
  }
  #watchValue() {
    const { dragging, value, min, max } = this.$state;
    if (peek(dragging)) return;
    value.set(getClampedValue(min(), max(), value(), this.#delegate.getStep()));
  }
  #watchStep() {
    this.$state.step.set(this.#delegate.getStep());
  }
  #watchDisabled() {
    if (!this.#delegate.isDisabled()) return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  #getARIADisabled() {
    return ariaBool(this.#delegate.isDisabled());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  #setupAttrs() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this.#getARIADisabled.bind(this),
      "aria-valuemin": this.#delegate.aria.valueMin ?? this.$state.min,
      "aria-valuemax": this.#delegate.aria.valueMax ?? this.$state.max,
      "aria-valuenow": this.#delegate.aria.valueNow,
      "aria-valuetext": this.#delegate.aria.valueText,
      "aria-orientation": orientation
    });
  }
  #watchCSSVars() {
    const { fillPercent, pointerPercent } = this.$state;
    this.#updateSliderVars(round(fillPercent(), 3), round(pointerPercent(), 3));
  }
  #updateSliderVars = animationFrameThrottle((fillPercent, pointerPercent) => {
    this.el?.style.setProperty("--slider-fill", fillPercent + "%");
    this.el?.style.setProperty("--slider-pointer", pointerPercent + "%");
  });
};

// ../vidstack/src/components/ui/sliders/slider/slider.ts
var Slider = class extends Component {
  static props = {
    ...SliderController.props,
    min: 0,
    max: 100,
    value: 0
  };
  static state = sliderState;
  constructor() {
    super();
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.$props.disabled,
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      }
    });
  }
  onSetup() {
    effect(this.#watchValue.bind(this));
    effect(this.#watchMinMax.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  #getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  #getARIAValueText() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  #watchValue() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  #watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
};

// ../vidstack/src/components/ui/thumbnails/thumbnail-loader.ts
var cache = /* @__PURE__ */ new Map();
var pending = /* @__PURE__ */ new Map();
var warned2 = true ? /* @__PURE__ */ new Set() : void 0;
var ThumbnailsLoader = class _ThumbnailsLoader {
  #media;
  #src;
  #crossOrigin;
  $images = signal([]);
  static create(src, crossOrigin) {
    const media = useMediaContext();
    return new _ThumbnailsLoader(src, crossOrigin, media);
  }
  constructor(src, crossOrigin, media) {
    this.#src = src;
    this.#crossOrigin = crossOrigin;
    this.#media = media;
    effect(this.#onLoadCues.bind(this));
  }
  #onLoadCues() {
    const { canLoad } = this.#media.$state;
    if (!canLoad()) return;
    const src = this.#src();
    if (!src) return;
    if (isString(src) && cache.has(src)) {
      const cues = cache.get(src);
      cache.delete(src);
      cache.set(src, cues);
      if (cache.size > 99) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      this.$images.set(cache.get(src));
    } else if (isString(src)) {
      const crossOrigin = this.#crossOrigin(), currentKey = src + "::" + crossOrigin;
      if (!pending.has(currentKey)) {
        const promise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(src, {
              credentials: getRequestCredentials(crossOrigin)
            }), isJSON = response.headers.get("content-type") === "application/json";
            if (isJSON) {
              const json = await response.json();
              if (isArray(json)) {
                if (json[0] && "text" in json[0]) {
                  resolve(this.#processVTTCues(json));
                } else {
                  for (let i = 0; i < json.length; i++) {
                    const image = json[i];
                    assert(isObject(image), `Item not an object at index ${i}`);
                    assert(
                      "url" in image && isString(image.url),
                      `Invalid or missing \`url\` property at index ${i}`
                    );
                    assert(
                      "startTime" in image && isNumber(image.startTime),
                      `Invalid or missing \`startTime\` property at index ${i}`
                    );
                  }
                  resolve(json);
                }
              } else {
                resolve(this.#processStoryboard(json));
              }
              return;
            }
            import("media-captions").then(async ({ parseResponse }) => {
              try {
                const { cues } = await parseResponse(response);
                resolve(this.#processVTTCues(cues));
              } catch (e2) {
                reject(e2);
              }
            });
          } catch (e2) {
            reject(e2);
          }
        }).then((images) => {
          cache.set(currentKey, images);
          return images;
        }).catch((error) => {
          this.#onError(src, error);
        }).finally(() => {
          if (isString(currentKey)) pending.delete(currentKey);
        });
        pending.set(currentKey, promise);
      }
      pending.get(currentKey)?.then((images) => {
        this.$images.set(images || []);
      });
    } else if (isArray(src)) {
      try {
        this.$images.set(this.#processImages(src));
      } catch (error) {
        this.#onError(src, error);
      }
    } else {
      try {
        this.$images.set(this.#processStoryboard(src));
      } catch (error) {
        this.#onError(src, error);
      }
    }
    return () => {
      this.$images.set([]);
    };
  }
  #processImages(images) {
    const baseURL = this.#resolveBaseUrl();
    return images.map((img, i) => {
      assert(
        img.url && isString(img.url),
        `Invalid or missing \`url\` property at index ${i}`
      );
      assert(
        "startTime" in img && isNumber(img.startTime),
        `Invalid or missing \`startTime\` property at index ${i}`
      );
      return {
        ...img,
        url: isString(img.url) ? this.#resolveURL(img.url, baseURL) : img.url
      };
    });
  }
  #processStoryboard(board) {
    assert(isString(board.url), "Missing `url` in storyboard object");
    assert(isArray(board.tiles) && board.tiles?.length, `Empty tiles in storyboard`);
    const url = new URL(board.url), images = [];
    const tileWidth = "tile_width" in board ? board.tile_width : board.tileWidth, tileHeight = "tile_height" in board ? board.tile_height : board.tileHeight;
    for (const tile of board.tiles) {
      images.push({
        url,
        startTime: "start" in tile ? tile.start : tile.startTime,
        width: tileWidth,
        height: tileHeight,
        coords: { x: tile.x, y: tile.y }
      });
    }
    return images;
  }
  #processVTTCues(cues) {
    for (let i = 0; i < cues.length; i++) {
      const cue = cues[i];
      assert(
        "startTime" in cue && isNumber(cue.startTime),
        `Invalid or missing \`startTime\` property at index ${i}`
      );
      assert(
        "text" in cue && isString(cue.text),
        `Invalid or missing \`text\` property at index ${i}`
      );
    }
    const images = [], baseURL = this.#resolveBaseUrl();
    for (const cue of cues) {
      const [url, hash] = cue.text.split("#"), data = this.#resolveData(hash);
      images.push({
        url: this.#resolveURL(url, baseURL),
        startTime: cue.startTime,
        endTime: cue.endTime,
        width: data?.w,
        height: data?.h,
        coords: data && isNumber(data.x) && isNumber(data.y) ? { x: data.x, y: data.y } : void 0
      });
    }
    return images;
  }
  #resolveBaseUrl() {
    let baseURL = peek(this.#src);
    if (!isString(baseURL) || !/^https?:/.test(baseURL)) {
      return location.href;
    }
    return baseURL;
  }
  #resolveURL(src, baseURL) {
    return /^https?:/.test(src) ? new URL(src) : new URL(src, baseURL);
  }
  #resolveData(hash) {
    if (!hash) return {};
    const [hashProps, values] = hash.split("="), hashValues = values?.split(","), data = {};
    if (!hashProps || !hashValues) {
      return null;
    }
    for (let i = 0; i < hashProps.length; i++) {
      const value = +hashValues[i];
      if (!isNaN(value)) data[hashProps[i]] = value;
    }
    return data;
  }
  #onError(src, error) {
    if (warned2?.has(src)) return;
    this.#media.logger?.errorGroup("[vidstack] failed to load thumbnails").labelledLog("Src", src).labelledLog("Error", error).dispatch();
    warned2?.add(src);
  }
};

// ../vidstack/src/components/ui/thumbnails/thumbnail.ts
var Thumbnail = class extends Component {
  static props = {
    src: null,
    time: 0,
    crossOrigin: null
  };
  static state = new State({
    src: "",
    img: null,
    thumbnails: [],
    activeThumbnail: null,
    crossOrigin: null,
    loading: false,
    error: null,
    hidden: false
  });
  media;
  #loader;
  #styleResets = [];
  onSetup() {
    this.media = useMediaContext();
    this.#loader = ThumbnailsLoader.create(this.$props.src, this.$state.crossOrigin);
    this.#watchCrossOrigin();
    this.setAttributes({
      "data-loading": this.#isLoading.bind(this),
      "data-error": this.#hasError.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this.#watchImg.bind(this));
    effect(this.#watchHidden.bind(this));
    effect(this.#watchCrossOrigin.bind(this));
    effect(this.#onLoadStart.bind(this));
    effect(this.#onFindActiveThumbnail.bind(this));
    effect(this.#resize.bind(this));
  }
  #watchImg() {
    const img = this.$state.img();
    if (!img) return;
    listenEvent(img, "load", this.#onLoaded.bind(this));
    listenEvent(img, "error", this.#onError.bind(this));
  }
  #watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  #onLoadStart() {
    const { src, loading, error } = this.$state;
    if (src()) {
      loading.set(true);
      error.set(null);
    }
    return () => {
      this.#resetStyles();
      loading.set(false);
      error.set(null);
    };
  }
  #onLoaded() {
    const { loading, error } = this.$state;
    this.#resize();
    loading.set(false);
    error.set(null);
  }
  #onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
  #isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  #hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  #watchHidden() {
    const { hidden } = this.$state, { duration } = this.media.$state, images = this.#loader.$images();
    hidden.set(this.#hasError() || !Number.isFinite(duration()) || images.length === 0);
  }
  getTime() {
    return this.$props.time();
  }
  #onFindActiveThumbnail() {
    let images = this.#loader.$images();
    if (!images.length) return;
    let time = this.getTime(), { src, activeThumbnail } = this.$state, activeIndex = -1, activeImage = null;
    for (let i = images.length - 1; i >= 0; i--) {
      const image = images[i];
      if (time >= image.startTime && (!image.endTime || time < image.endTime)) {
        activeIndex = i;
        break;
      }
    }
    if (images[activeIndex]) {
      activeImage = images[activeIndex];
    }
    activeThumbnail.set(activeImage);
    src.set(activeImage?.url.href || "");
  }
  #resize() {
    if (!this.scope || this.$state.hidden()) return;
    const rootEl = this.el, imgEl = this.$state.img(), thumbnail = this.$state.activeThumbnail();
    if (!imgEl || !thumbnail || !rootEl) return;
    let width = thumbnail.width ?? imgEl.naturalWidth, height = thumbnail?.height ?? imgEl.naturalHeight, {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width: elWidth,
      height: elHeight
    } = getComputedStyle(this.el);
    if (minWidth === "100%") minWidth = parseFloat(elWidth) + "";
    if (minHeight === "100%") minHeight = parseFloat(elHeight) + "";
    let minRatio = Math.max(parseInt(minWidth) / width, parseInt(minHeight) / height), maxRatio = Math.min(
      Math.max(parseInt(minWidth), parseInt(maxWidth)) / width,
      Math.max(parseInt(minHeight), parseInt(maxHeight)) / height
    ), scale = !isNaN(maxRatio) && maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this.#style(rootEl, "--thumbnail-width", `${width * scale}px`);
    this.#style(rootEl, "--thumbnail-height", `${height * scale}px`);
    this.#style(imgEl, "width", `${imgEl.naturalWidth * scale}px`);
    this.#style(imgEl, "height", `${imgEl.naturalHeight * scale}px`);
    this.#style(
      imgEl,
      "transform",
      thumbnail.coords ? `translate(-${thumbnail.coords.x * scale}px, -${thumbnail.coords.y * scale}px)` : ""
    );
    this.#style(imgEl, "max-width", "none");
  }
  #style(el, name, value) {
    el.style.setProperty(name, value);
    this.#styleResets.push(() => el.style.removeProperty(name));
  }
  #resetStyles() {
    for (const reset of this.#styleResets) reset();
    this.#styleResets = [];
  }
};

// ../vidstack/src/components/ui/sliders/slider-thumbnail.ts
var SliderThumbnail = class extends Thumbnail {
  #slider;
  onAttach(el) {
    this.#slider = useState(Slider.state);
  }
  getTime() {
    const { duration, clipStartTime } = this.media.$state;
    return clipStartTime() + this.#slider.pointerRate() * duration();
  }
};

// ../vidstack/src/components/ui/sliders/slider-video.ts
var _video_dec, _a6, _media5, _slider, _init6, _SliderVideo_instances, watchVideo_fn, watchSrc_fn, watchCrossOrigin_fn, isLoading_fn, hasError_fn, watchHidden_fn, onSrcChange_fn, onCanPlay_fn, onError_fn, onUpdateTime_fn;
var SliderVideo = class extends (_a6 = Component, _video_dec = [prop], _a6) {
  constructor() {
    super(...arguments);
    __runInitializers(_init6, 5, this);
    __privateAdd(this, _SliderVideo_instances);
    __privateAdd(this, _media5);
    __privateAdd(this, _slider);
  }
  get video() {
    return this.$state.video();
  }
  onSetup() {
    __privateSet(this, _media5, useMediaContext());
    __privateSet(this, _slider, useState(Slider.state));
    __privateMethod(this, _SliderVideo_instances, watchCrossOrigin_fn).call(this);
    this.setAttributes({
      "data-loading": __privateMethod(this, _SliderVideo_instances, isLoading_fn).bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": __privateMethod(this, _SliderVideo_instances, hasError_fn).bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(__privateMethod(this, _SliderVideo_instances, watchVideo_fn).bind(this));
    effect(__privateMethod(this, _SliderVideo_instances, watchSrc_fn).bind(this));
    effect(__privateMethod(this, _SliderVideo_instances, watchCrossOrigin_fn).bind(this));
    effect(__privateMethod(this, _SliderVideo_instances, watchHidden_fn).bind(this));
    effect(__privateMethod(this, _SliderVideo_instances, onSrcChange_fn).bind(this));
    effect(__privateMethod(this, _SliderVideo_instances, onUpdateTime_fn).bind(this));
  }
};
_init6 = __decoratorStart(_a6);
_media5 = new WeakMap();
_slider = new WeakMap();
_SliderVideo_instances = new WeakSet();
watchVideo_fn = function() {
  const video = this.$state.video();
  if (!video) return;
  if (video.readyState >= 2) __privateMethod(this, _SliderVideo_instances, onCanPlay_fn).call(this);
  listenEvent(video, "canplay", __privateMethod(this, _SliderVideo_instances, onCanPlay_fn).bind(this));
  listenEvent(video, "error", __privateMethod(this, _SliderVideo_instances, onError_fn).bind(this));
};
watchSrc_fn = function() {
  const { src } = this.$state, { canLoad } = __privateGet(this, _media5).$state;
  src.set(canLoad() ? this.$props.src() : null);
};
watchCrossOrigin_fn = function() {
  const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = __privateGet(this, _media5).$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
  crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
};
isLoading_fn = function() {
  const { canPlay, hidden } = this.$state;
  return !canPlay() && !hidden();
};
hasError_fn = function() {
  const { error } = this.$state;
  return !isNull(error);
};
watchHidden_fn = function() {
  const { src, hidden } = this.$state, { canLoad, duration } = __privateGet(this, _media5).$state;
  hidden.set(canLoad() && (!src() || __privateMethod(this, _SliderVideo_instances, hasError_fn).call(this) || !Number.isFinite(duration())));
};
onSrcChange_fn = function() {
  const { src, canPlay, error } = this.$state;
  src();
  canPlay.set(false);
  error.set(null);
};
onCanPlay_fn = function(event) {
  const { canPlay, error } = this.$state;
  canPlay.set(true);
  error.set(null);
  this.dispatch("can-play", { trigger: event });
};
onError_fn = function(event) {
  const { canPlay, error } = this.$state;
  canPlay.set(false);
  error.set(event);
  this.dispatch("error", { trigger: event });
};
onUpdateTime_fn = function() {
  const { video, canPlay } = this.$state, { duration } = __privateGet(this, _media5).$state, { pointerRate } = __privateGet(this, _slider), media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
  if (canUpdate) {
    media.currentTime = pointerRate() * duration();
  }
};
__decorateElement(_init6, 2, "video", _video_dec, SliderVideo);
__decoratorMetadata(_init6, SliderVideo);
__publicField(SliderVideo, "props", {
  src: null,
  crossOrigin: null
});
__publicField(SliderVideo, "state", new State({
  video: null,
  src: null,
  crossOrigin: null,
  canPlay: false,
  error: null,
  hidden: false
}));

// ../vidstack/src/components/ui/sliders/slider-value.ts
var _getValueText_dec, _a7, _format, _text, _slider2, _init7;
var SliderValue = class extends (_a7 = Component, _getValueText_dec = [method], _a7) {
  constructor() {
    super(...arguments);
    __runInitializers(_init7, 5, this);
    __privateAdd(this, _format);
    __privateAdd(this, _text);
    __privateAdd(this, _slider2);
  }
  onSetup() {
    __privateSet(this, _slider2, useState(Slider.state));
    __privateSet(this, _format, useContext(sliderValueFormatContext));
    __privateSet(this, _text, computed(this.getValueText.bind(this)));
  }
  getValueText() {
    const {
      type,
      format: $format,
      decimalPlaces,
      padHours,
      padMinutes,
      showHours,
      showMs
    } = this.$props, { value: sliderValue, pointerValue, min, max } = __privateGet(this, _slider2), format = $format?.() ?? __privateGet(this, _format).default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (format === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (__privateGet(this, _format).percent ?? round)(percent, decimalPlaces()) + "%";
    } else if (format === "time") {
      return (__privateGet(this, _format).time ?? formatTime)(value, {
        padHrs: padHours(),
        padMins: padMinutes(),
        showHrs: showHours(),
        showMs: showMs()
      });
    } else {
      return (__privateGet(this, _format).value?.(value) ?? value.toFixed(2)) + "";
    }
  }
};
_init7 = __decoratorStart(_a7);
_format = new WeakMap();
_text = new WeakMap();
_slider2 = new WeakMap();
__decorateElement(_init7, 1, "getValueText", _getValueText_dec, SliderValue);
__decoratorMetadata(_init7, SliderValue);
__publicField(SliderValue, "props", {
  type: "pointer",
  format: null,
  showHours: false,
  showMs: false,
  padHours: null,
  padMinutes: null,
  decimalPlaces: 2
});

// ../vidstack/src/components/ui/sliders/slider-preview.ts
var SliderPreview = class extends Component {
  static props = {
    offset: 0,
    noClamp: false
  };
  #slider;
  onSetup() {
    this.#slider = useContext(sliderContext);
    const { active } = useState(Slider.state);
    this.setAttributes({
      "data-visible": active
    });
  }
  onAttach(el) {
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    const { preview } = this.#slider;
    preview.set(el);
    onDispose(() => preview.set(null));
    effect(this.#updatePlacement.bind(this));
    const resize = new ResizeObserver(this.#updatePlacement.bind(this));
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
  #updatePlacement = animationFrameThrottle(() => {
    const { disabled, orientation } = this.#slider;
    if (disabled()) return;
    const el = this.el, { offset, noClamp } = this.$props;
    if (!el) return;
    updateSliderPreviewPlacement(el, {
      clamp: !noClamp(),
      offset: offset(),
      orientation: orientation()
    });
  });
};
function updateSliderPreviewPlacement(el, {
  clamp,
  offset,
  orientation
}) {
  const computedStyle = getComputedStyle(el), width = parseFloat(computedStyle.width), height = parseFloat(computedStyle.height), styles = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  styles[orientation === "horizontal" ? "bottom" : "left"] = `calc(100% + var(--media-slider-preview-offset, ${offset}px))`;
  if (orientation === "horizontal") {
    const widthHalf = width / 2;
    if (!clamp) {
      styles.left = `calc(var(--slider-pointer) - ${widthHalf}px)`;
    } else {
      const leftClamp = `max(0px, calc(var(--slider-pointer) - ${widthHalf}px))`, rightClamp = `calc(100% - ${width}px)`;
      styles.left = `min(${leftClamp}, ${rightClamp})`;
    }
  } else {
    const heightHalf = height / 2;
    if (!clamp) {
      styles.bottom = `calc(var(--slider-pointer) - ${heightHalf}px)`;
    } else {
      const topClamp = `max(${heightHalf}px, calc(var(--slider-pointer) - ${heightHalf}px))`, bottomClamp = `calc(100% - ${height}px)`;
      styles.bottom = `min(${topClamp}, ${bottomClamp})`;
    }
  }
  Object.assign(el.style, styles);
}

// ../vidstack/src/components/ui/sliders/volume-slider.ts
var VolumeSlider = class extends Component {
  static props = {
    ...SliderController.props,
    keyStep: 5,
    shiftKeyMultiplier: 2
  };
  static state = sliderState;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    const { audioGain } = this.#media.$state;
    provideContext(sliderValueFormatContext, {
      default: "percent",
      value(value) {
        return (value * (audioGain() ?? 1)).toFixed(2);
      },
      percent(value) {
        return Math.round(value * (audioGain() ?? 1));
      }
    });
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueMax: this.#getARIAValueMax.bind(this),
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchVolume.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this.#media.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state, { audioGain } = this.#media.$state;
    return Math.round(value() * (audioGain() ?? 1));
  }
  #getARIAValueText() {
    const { value, max } = this.$state, { audioGain } = this.#media.$state;
    return round(value() / max() * (audioGain() ?? 1) * 100, 2) + "%";
  }
  #getARIAValueMax() {
    const { audioGain } = this.#media.$state;
    return this.$state.max() * (audioGain() ?? 1);
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetVolume } = this.#media.$state;
    return disabled() || !canSetVolume();
  }
  #watchVolume() {
    const { muted, volume } = this.#media.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  #throttleVolumeChange = functionThrottle(this.#onVolumeChange.bind(this), 25);
  #onVolumeChange(event) {
    if (!event.trigger) return;
    const mediaVolume = round(event.detail / 100, 3);
    this.#media.remote.changeVolume(mediaVolume, event);
  }
  #onValueChange(event) {
    this.#throttleVolumeChange(event);
  }
  #onDragValueChange(event) {
    this.#throttleVolumeChange(event);
  }
};

// ../vidstack/src/components/ui/sliders/audio-gain-slider.ts
var AudioGainSlider = class extends Component {
  static props = {
    ...SliderController.props,
    step: 25,
    keyStep: 25,
    shiftKeyMultiplier: 2,
    min: 0,
    max: 300
  };
  static state = sliderState;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent",
      percent: (_, decimalPlaces) => {
        return round(this.$state.value(), decimalPlaces) + "%";
      }
    });
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchMinMax.bind(this));
    effect(this.#watchAudioGain.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-audio-gain-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Audio Boost");
    const { canSetAudioGain } = this.#media.$state;
    this.setAttributes({
      "data-supported": canSetAudioGain,
      "aria-hidden": $ariaBool(() => !canSetAudioGain())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  #getARIAValueText() {
    const { value } = this.$state;
    return value() + "%";
  }
  #watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  #watchAudioGain() {
    const { audioGain } = this.#media.$state, value = ((audioGain() ?? 1) - 1) * 100;
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetAudioGain } = this.#media.$state;
    return disabled() || !canSetAudioGain();
  }
  #onAudioGainChange(event) {
    if (!event.trigger) return;
    const gain = round(1 + event.detail / 100, 2);
    this.#media.remote.changeAudioGain(gain, event);
  }
  #onValueChange(event) {
    this.#onAudioGainChange(event);
  }
  #onDragValueChange(event) {
    this.#onAudioGainChange(event);
  }
};

// ../vidstack/src/components/ui/sliders/speed-slider.ts
var SpeedSlider = class extends Component {
  static props = {
    ...SliderController.props,
    step: 0.25,
    keyStep: 0.25,
    shiftKeyMultiplier: 2,
    min: 0,
    max: 2
  };
  static state = sliderState;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: this.#roundValue,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchMinMax.bind(this));
    effect(this.#watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-speed-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Speed");
    const { canSetPlaybackRate } = this.#media.$state;
    this.setAttributes({
      "data-supported": canSetPlaybackRate,
      "aria-hidden": $ariaBool(() => !canSetPlaybackRate())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state;
    return value();
  }
  #getARIAValueText() {
    const { value } = this.$state;
    return value() + "x";
  }
  #watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  #watchPlaybackRate() {
    const { playbackRate } = this.#media.$state;
    const newValue = playbackRate();
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  #roundValue(value) {
    return round(value, 2);
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetPlaybackRate } = this.#media.$state;
    return disabled() || !canSetPlaybackRate();
  }
  #throttledSpeedChange = functionThrottle(this.#onPlaybackRateChange.bind(this), 25);
  #onPlaybackRateChange(event) {
    if (!event.trigger) return;
    const rate = event.detail;
    this.#media.remote.changePlaybackRate(rate, event);
  }
  #onValueChange(event) {
    this.#throttledSpeedChange(event);
  }
  #onDragValueChange(event) {
    this.#throttledSpeedChange(event);
  }
};

// ../vidstack/src/components/ui/sliders/quality-slider.ts
var QualitySlider = class extends Component {
  static props = {
    ...SliderController.props,
    step: 1,
    keyStep: 1,
    shiftKeyMultiplier: 1
  };
  static state = sliderState;
  #media;
  #sortedQualities = computed(() => {
    const { qualities } = this.#media.$state;
    return sortVideoQualities(qualities());
  });
  onSetup() {
    this.#media = useMediaContext();
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchMax.bind(this));
    effect(this.#watchQuality.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-quality-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Video Quality");
    const { qualities, canSetQuality } = this.#media.$state, $supported = computed(() => canSetQuality() && qualities().length > 0);
    this.setAttributes({
      "data-supported": $supported,
      "aria-hidden": $ariaBool(() => !$supported())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state;
    return value();
  }
  #getARIAValueText() {
    const { quality } = this.#media.$state;
    if (!quality()) return "";
    const { height, bitrate } = quality(), bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null;
    return height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : "Auto";
  }
  #watchMax() {
    const $qualities = this.#sortedQualities();
    this.$state.max.set(Math.max(0, $qualities.length - 1));
  }
  #watchQuality() {
    let { quality } = this.#media.$state, $qualities = this.#sortedQualities(), value = Math.max(0, $qualities.indexOf(quality()));
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetQuality, qualities } = this.#media.$state;
    return disabled() || qualities().length <= 1 || !canSetQuality();
  }
  #throttledQualityChange = functionThrottle(this.#onQualityChange.bind(this), 25);
  #onQualityChange(event) {
    if (!event.trigger) return;
    const { qualities } = this.#media, quality = peek(this.#sortedQualities)[event.detail];
    this.#media.remote.changeQuality(qualities.indexOf(quality), event);
  }
  #onValueChange(event) {
    this.#throttledQualityChange(event);
  }
  #onDragValueChange(event) {
    this.#throttledQualityChange(event);
  }
};

// ../vidstack/src/components/ui/sliders/time-slider/time-slider.ts
var TimeSlider = class extends Component {
  static props = {
    ...SliderController.props,
    step: 0.1,
    keyStep: 5,
    shiftKeyMultiplier: 2,
    pauseWhileDragging: false,
    noSwipeGesture: false,
    seekingRequestThrottle: 100
  };
  static state = sliderState;
  #media;
  #dispatchSeeking;
  #chapter = signal(null);
  constructor() {
    super();
    const { noSwipeGesture } = this.$props;
    new SliderController({
      swipeGesture: () => !noSwipeGesture(),
      getValue: this.#getValue.bind(this),
      getStep: this.#getStep.bind(this),
      getKeyStep: this.#getKeyStep.bind(this),
      roundValue: this.#roundValue,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragStart: this.#onDragStart.bind(this),
      onDragValueChange: this.#onDragValueChange.bind(this),
      onDragEnd: this.#onDragEnd.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this.#formatValue.bind(this),
      time: this.#formatTime.bind(this)
    });
    this.setAttributes({
      "data-chapters": this.#hasChapters.bind(this)
    });
    this.setStyles({
      "--slider-progress": this.#calcBufferedPercent.bind(this)
    });
    effect(this.#watchCurrentTime.bind(this));
    effect(this.#watchSeekingThrottle.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this.#watchPreviewing.bind(this));
    watchActiveTextTrack(this.#media.textTracks, "chapters", this.#chapter.set);
  }
  #calcBufferedPercent() {
    const { bufferedEnd, duration } = this.#media.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  #hasChapters() {
    const { duration } = this.#media.$state;
    return this.#chapter()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  #watchSeekingThrottle() {
    this.#dispatchSeeking = functionThrottle(
      this.#seeking.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  #watchCurrentTime() {
    if (this.$state.hidden()) return;
    const { value, dragging } = this.$state, newValue = this.#getValue();
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  #watchPreviewing() {
    const player = this.#media.player.el, { preview } = useContext(sliderContext);
    player && preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  #seeking(time, event) {
    this.#media.remote.seeking(time, event);
  }
  #seek(time, percent, event) {
    this.#dispatchSeeking.cancel();
    const { live } = this.#media.$state;
    if (live() && percent >= 99) {
      this.#media.remote.seekToLiveEdge(event);
      return;
    }
    this.#media.remote.seek(time, event);
  }
  #playingBeforeDragStart = false;
  #onDragStart(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this.#media.$state;
      this.#playingBeforeDragStart = !paused();
      this.#media.remote.pause(event);
    }
  }
  #onDragValueChange(event) {
    this.#dispatchSeeking(this.#percentToTime(event.detail), event);
  }
  #onDragEnd(event) {
    const { seeking } = this.#media.$state;
    if (!peek(seeking)) this.#seeking(this.#percentToTime(event.detail), event);
    const percent = event.detail;
    this.#seek(this.#percentToTime(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this.#playingBeforeDragStart) {
      this.#media.remote.play(event);
      this.#playingBeforeDragStart = false;
    }
  }
  #onValueChange(event) {
    const { dragging } = this.$state;
    if (dragging() || !event.trigger) return;
    this.#onDragEnd(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  #getValue() {
    const { currentTime } = this.#media.$state;
    return this.#timeToPercent(currentTime());
  }
  #getStep() {
    const value = this.$props.step() / this.#media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  #getKeyStep() {
    const value = this.$props.keyStep() / this.#media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  #roundValue(value) {
    return round(value, 3);
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSeek } = this.#media.$state;
    return disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  #getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  #getARIAValueText() {
    const time = this.#percentToTime(this.$state.value()), { duration } = this.#media.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  #percentToTime(percent) {
    const { duration } = this.#media.$state;
    return round(percent / 100 * duration(), 5);
  }
  #timeToPercent(time) {
    const { liveEdge, duration } = this.#media.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  #formatValue(percent) {
    const time = this.#percentToTime(percent), { live, duration } = this.#media.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  #formatTime(percent, options) {
    const time = this.#percentToTime(percent), { live, duration } = this.#media.$state, value = live() ? time - duration() : time;
    return Number.isFinite(time) ? `${value < 0 ? "-" : ""}${formatTime(Math.abs(value), options)}` : "LIVE";
  }
};

// ../vidstack/src/components/ui/sliders/time-slider/slider-chapters.ts
var _setRefs_dec, _activePointerCue_dec, _activeCue_dec, _cues_dec, _a8, _media6, _sliderState, _updateScope, _titleRef, _refs, _$track, _$cues, _activeIndex, _activePointerIndex, _bufferedIndex, _init8, _SliderChapters_instances, setTrack_fn, reset_fn, watch_fn, watchUpdates_fn, watchContainerWidths_fn, watchFillPercent_fn, watchPointerPercent_fn, updateFillPercents_fn, updateFillPercent_fn, findActiveChapterIndex_fn, watchBufferedPercent_fn, _updateBufferedPercent, _bufferedPercent, calcMediaBufferedPercent_fn, getEndTime_fn, calcPercent_fn, fillGaps_fn, watchSource_fn, onTrackChange_fn, watchMediaDuration_fn, _onCuesChange, onChapterTitleChange_fn, findParentSlider_fn, findChapterTitleRef_fn;
var SliderChapters = class extends (_a8 = Component, _cues_dec = [prop], _activeCue_dec = [prop], _activePointerCue_dec = [prop], _setRefs_dec = [method], _a8) {
  constructor() {
    super(...arguments);
    __runInitializers(_init8, 5, this);
    __privateAdd(this, _SliderChapters_instances);
    __privateAdd(this, _media6);
    __privateAdd(this, _sliderState);
    __privateAdd(this, _updateScope);
    __privateAdd(this, _titleRef, null);
    __privateAdd(this, _refs, []);
    __privateAdd(this, _$track, signal(null));
    __privateAdd(this, _$cues, signal([]));
    __privateAdd(this, _activeIndex, signal(-1));
    __privateAdd(this, _activePointerIndex, signal(-1));
    __privateAdd(this, _bufferedIndex, 0);
    __privateAdd(this, _updateBufferedPercent, animationFrameThrottle((bufferedPercent) => {
      let percent, cues = __privateGet(this, _$cues).call(this), { clipStartTime } = __privateGet(this, _media6).$state, startTime = clipStartTime(), endTime = __privateMethod(this, _SliderChapters_instances, getEndTime_fn).call(this, cues);
      for (let i = __privateGet(this, _bufferedIndex); i < __privateGet(this, _refs).length; i++) {
        percent = __privateMethod(this, _SliderChapters_instances, calcPercent_fn).call(this, cues[i], bufferedPercent, startTime, endTime);
        __privateGet(this, _refs)[i]?.style.setProperty("--chapter-progress", percent + "%");
        if (percent < 100) {
          __privateSet(this, _bufferedIndex, i);
          break;
        }
      }
    }));
    __privateAdd(this, _bufferedPercent, computed(__privateMethod(this, _SliderChapters_instances, calcMediaBufferedPercent_fn).bind(this)));
    __privateAdd(this, _onCuesChange, functionDebounce(
      () => {
        const track = peek(__privateGet(this, _$track));
        if (!this.scope || !track || !track.cues.length) return;
        __privateGet(this, _$cues).set(__privateMethod(this, _SliderChapters_instances, fillGaps_fn).call(this, track.cues));
        __privateGet(this, _activeIndex).set(0);
        __privateSet(this, _bufferedIndex, 0);
      },
      150,
      true
    ));
  }
  get cues() {
    return __privateGet(this, _$cues).call(this);
  }
  get activeCue() {
    return __privateGet(this, _$cues).call(this)[__privateGet(this, _activeIndex).call(this)] || null;
  }
  get activePointerCue() {
    return __privateGet(this, _$cues).call(this)[__privateGet(this, _activePointerIndex).call(this)] || null;
  }
  onSetup() {
    __privateSet(this, _media6, useMediaContext());
    __privateSet(this, _sliderState, useState(TimeSlider.state));
  }
  onAttach(el) {
    watchActiveTextTrack(__privateGet(this, _media6).textTracks, "chapters", __privateMethod(this, _SliderChapters_instances, setTrack_fn).bind(this));
    effect(__privateMethod(this, _SliderChapters_instances, watchSource_fn).bind(this));
  }
  onConnect() {
    onDispose(() => __privateMethod(this, _SliderChapters_instances, reset_fn).bind(this));
  }
  onDestroy() {
    __privateMethod(this, _SliderChapters_instances, setTrack_fn).call(this, null);
  }
  setRefs(refs) {
    __privateSet(this, _refs, refs);
    __privateGet(this, _updateScope)?.dispose();
    if (__privateGet(this, _refs).length === 1) {
      const el = __privateGet(this, _refs)[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (__privateGet(this, _refs).length > 0) {
      scoped(() => __privateMethod(this, _SliderChapters_instances, watch_fn).call(this), __privateSet(this, _updateScope, createScope()));
    }
  }
};
_init8 = __decoratorStart(_a8);
_media6 = new WeakMap();
_sliderState = new WeakMap();
_updateScope = new WeakMap();
_titleRef = new WeakMap();
_refs = new WeakMap();
_$track = new WeakMap();
_$cues = new WeakMap();
_activeIndex = new WeakMap();
_activePointerIndex = new WeakMap();
_bufferedIndex = new WeakMap();
_SliderChapters_instances = new WeakSet();
setTrack_fn = function(track) {
  if (peek(__privateGet(this, _$track)) === track) return;
  __privateMethod(this, _SliderChapters_instances, reset_fn).call(this);
  __privateGet(this, _$track).set(track);
};
reset_fn = function() {
  __privateSet(this, _refs, []);
  __privateGet(this, _$cues).set([]);
  __privateGet(this, _activeIndex).set(-1);
  __privateGet(this, _activePointerIndex).set(-1);
  __privateSet(this, _bufferedIndex, 0);
  __privateGet(this, _updateScope)?.dispose();
};
watch_fn = function() {
  if (!__privateGet(this, _refs).length) return;
  effect(__privateMethod(this, _SliderChapters_instances, watchUpdates_fn).bind(this));
};
watchUpdates_fn = function() {
  const { hidden } = __privateGet(this, _sliderState);
  if (hidden()) return;
  effect(__privateMethod(this, _SliderChapters_instances, watchContainerWidths_fn).bind(this));
  effect(__privateMethod(this, _SliderChapters_instances, watchFillPercent_fn).bind(this));
  effect(__privateMethod(this, _SliderChapters_instances, watchPointerPercent_fn).bind(this));
  effect(__privateMethod(this, _SliderChapters_instances, watchBufferedPercent_fn).bind(this));
};
watchContainerWidths_fn = function() {
  const cues = __privateGet(this, _$cues).call(this);
  if (!cues.length) return;
  let cue, { clipStartTime, clipEndTime } = __privateGet(this, _media6).$state, startTime = clipStartTime(), endTime = clipEndTime() || cues[cues.length - 1].endTime, duration = endTime - startTime, remainingWidth = 100;
  for (let i = 0; i < cues.length; i++) {
    cue = cues[i];
    if (__privateGet(this, _refs)[i]) {
      const width = i === cues.length - 1 ? remainingWidth : round((cue.endTime - Math.max(startTime, cue.startTime)) / duration * 100, 3);
      __privateGet(this, _refs)[i].style.width = width + "%";
      remainingWidth -= width;
    }
  }
};
watchFillPercent_fn = function() {
  let { liveEdge, clipStartTime, duration } = __privateGet(this, _media6).$state, { fillPercent, value } = __privateGet(this, _sliderState), cues = __privateGet(this, _$cues).call(this), isLiveEdge = liveEdge(), prevActiveIndex = peek(__privateGet(this, _activeIndex)), currentChapter = cues[prevActiveIndex];
  let currentActiveIndex = isLiveEdge ? __privateGet(this, _$cues).length - 1 : __privateMethod(this, _SliderChapters_instances, findActiveChapterIndex_fn).call(this, currentChapter ? currentChapter.startTime / duration() * 100 <= peek(value) ? prevActiveIndex : 0 : 0, fillPercent());
  if (isLiveEdge || !currentChapter) {
    __privateMethod(this, _SliderChapters_instances, updateFillPercents_fn).call(this, 0, cues.length, 100);
  } else if (currentActiveIndex > prevActiveIndex) {
    __privateMethod(this, _SliderChapters_instances, updateFillPercents_fn).call(this, prevActiveIndex, currentActiveIndex, 100);
  } else if (currentActiveIndex < prevActiveIndex) {
    __privateMethod(this, _SliderChapters_instances, updateFillPercents_fn).call(this, currentActiveIndex + 1, prevActiveIndex + 1, 0);
  }
  const percent = isLiveEdge ? 100 : __privateMethod(this, _SliderChapters_instances, calcPercent_fn).call(this, cues[currentActiveIndex], fillPercent(), clipStartTime(), __privateMethod(this, _SliderChapters_instances, getEndTime_fn).call(this, cues));
  __privateMethod(this, _SliderChapters_instances, updateFillPercent_fn).call(this, __privateGet(this, _refs)[currentActiveIndex], percent);
  __privateGet(this, _activeIndex).set(currentActiveIndex);
};
watchPointerPercent_fn = function() {
  let { pointing, pointerPercent } = __privateGet(this, _sliderState);
  if (!pointing()) {
    __privateGet(this, _activePointerIndex).set(-1);
    return;
  }
  const activeIndex = __privateMethod(this, _SliderChapters_instances, findActiveChapterIndex_fn).call(this, 0, pointerPercent());
  __privateGet(this, _activePointerIndex).set(activeIndex);
};
updateFillPercents_fn = function(start, end, percent) {
  for (let i = start; i < end; i++) __privateMethod(this, _SliderChapters_instances, updateFillPercent_fn).call(this, __privateGet(this, _refs)[i], percent);
};
updateFillPercent_fn = function(ref, percent) {
  if (!ref) return;
  ref.style.setProperty("--chapter-fill", percent + "%");
  setAttribute(ref, "data-active", percent > 0 && percent < 100);
  setAttribute(ref, "data-ended", percent === 100);
};
findActiveChapterIndex_fn = function(startIndex, percent) {
  let chapterPercent = 0, cues = __privateGet(this, _$cues).call(this);
  if (percent === 0) return 0;
  else if (percent === 100) return cues.length - 1;
  let { clipStartTime } = __privateGet(this, _media6).$state, startTime = clipStartTime(), endTime = __privateMethod(this, _SliderChapters_instances, getEndTime_fn).call(this, cues);
  for (let i = startIndex; i < cues.length; i++) {
    chapterPercent = __privateMethod(this, _SliderChapters_instances, calcPercent_fn).call(this, cues[i], percent, startTime, endTime);
    if (chapterPercent >= 0 && chapterPercent < 100) return i;
  }
  return 0;
};
watchBufferedPercent_fn = function() {
  __privateGet(this, _updateBufferedPercent).call(this, __privateGet(this, _bufferedPercent).call(this));
};
_updateBufferedPercent = new WeakMap();
_bufferedPercent = new WeakMap();
calcMediaBufferedPercent_fn = function() {
  const { bufferedEnd, duration } = __privateGet(this, _media6).$state;
  return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
};
getEndTime_fn = function(cues) {
  const { clipEndTime } = __privateGet(this, _media6).$state, endTime = clipEndTime();
  return endTime > 0 ? endTime : cues[cues.length - 1]?.endTime || 0;
};
calcPercent_fn = function(cue, percent, startTime, endTime) {
  const cues = __privateGet(this, _$cues).call(this);
  if (cues.length === 0) return 0;
  const duration = endTime - startTime, cueStartTime = Math.max(0, cue.startTime - startTime), cueEndTime = Math.min(endTime, cue.endTime) - startTime;
  const startRatio = cueStartTime / duration, startPercent = startRatio * 100, endPercent = Math.min(1, startRatio + (cueEndTime - cueStartTime) / duration) * 100;
  return Math.max(
    0,
    round(
      percent >= endPercent ? 100 : (percent - startPercent) / (endPercent - startPercent) * 100,
      3
    )
  );
};
fillGaps_fn = function(cues) {
  let chapters = [], { clipStartTime, clipEndTime, duration } = __privateGet(this, _media6).$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
  cues = cues.filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime);
  const firstCue = cues[0];
  if (firstCue && firstCue.startTime > startTime) {
    chapters.push(new window.VTTCue(startTime, firstCue.startTime, ""));
  }
  for (let i = 0; i < cues.length - 1; i++) {
    const currentCue = cues[i], nextCue = cues[i + 1];
    chapters.push(currentCue);
    if (nextCue) {
      const timeDiff = nextCue.startTime - currentCue.endTime;
      if (timeDiff > 0) {
        chapters.push(new window.VTTCue(currentCue.endTime, currentCue.endTime + timeDiff, ""));
      }
    }
  }
  const lastCue = cues[cues.length - 1];
  if (lastCue) {
    chapters.push(lastCue);
    const endTime2 = duration();
    if (endTime2 >= 0 && endTime2 - lastCue.endTime > 1) {
      chapters.push(new window.VTTCue(lastCue.endTime, duration(), ""));
    }
  }
  return chapters;
};
watchSource_fn = function() {
  const { source } = __privateGet(this, _media6).$state;
  source();
  __privateMethod(this, _SliderChapters_instances, onTrackChange_fn).call(this);
};
onTrackChange_fn = function() {
  if (!this.scope) return;
  const { disabled } = this.$props;
  if (disabled()) {
    __privateGet(this, _$cues).set([]);
    __privateGet(this, _activeIndex).set(0);
    __privateSet(this, _bufferedIndex, 0);
    return;
  }
  const track = __privateGet(this, _$track).call(this);
  if (track) {
    const onCuesChange = __privateGet(this, _onCuesChange).bind(this);
    onCuesChange();
    onDispose(listenEvent(track, "add-cue", onCuesChange));
    onDispose(listenEvent(track, "remove-cue", onCuesChange));
    effect(__privateMethod(this, _SliderChapters_instances, watchMediaDuration_fn).bind(this));
  }
  __privateSet(this, _titleRef, __privateMethod(this, _SliderChapters_instances, findChapterTitleRef_fn).call(this));
  if (__privateGet(this, _titleRef)) effect(__privateMethod(this, _SliderChapters_instances, onChapterTitleChange_fn).bind(this));
  return () => {
    if (__privateGet(this, _titleRef)) {
      __privateGet(this, _titleRef).textContent = "";
      __privateSet(this, _titleRef, null);
    }
  };
};
watchMediaDuration_fn = function() {
  __privateGet(this, _media6).$state.duration();
  __privateGet(this, _onCuesChange).call(this);
};
_onCuesChange = new WeakMap();
onChapterTitleChange_fn = function() {
  const cue = this.activePointerCue || this.activeCue;
  if (__privateGet(this, _titleRef)) __privateGet(this, _titleRef).textContent = cue?.text || "";
};
findParentSlider_fn = function() {
  let node = this.el;
  while (node && node.getAttribute("role") !== "slider") {
    node = node.parentElement;
  }
  return node;
};
findChapterTitleRef_fn = function() {
  const slider = __privateMethod(this, _SliderChapters_instances, findParentSlider_fn).call(this);
  return slider ? slider.querySelector('[data-part="chapter-title"]') : null;
};
__decorateElement(_init8, 2, "cues", _cues_dec, SliderChapters);
__decorateElement(_init8, 2, "activeCue", _activeCue_dec, SliderChapters);
__decorateElement(_init8, 2, "activePointerCue", _activePointerCue_dec, SliderChapters);
__decorateElement(_init8, 1, "setRefs", _setRefs_dec, SliderChapters);
__decoratorMetadata(_init8, SliderChapters);
__publicField(SliderChapters, "props", {
  disabled: false
});

// ../../../node_modules/.pnpm/compute-scroll-into-view@3.1.0/node_modules/compute-scroll-into-view/dist/index.js
var t = (t2) => "object" == typeof t2 && null != t2 && 1 === t2.nodeType;
var e = (t2, e2) => (!e2 || "hidden" !== t2) && ("visible" !== t2 && "clip" !== t2);
var n = (t2, n2) => {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    const o2 = getComputedStyle(t2, null);
    return e(o2.overflowY, n2) || e(o2.overflowX, n2) || ((t3) => {
      const e2 = ((t4) => {
        if (!t4.ownerDocument || !t4.ownerDocument.defaultView) return null;
        try {
          return t4.ownerDocument.defaultView.frameElement;
        } catch (t5) {
          return null;
        }
      })(t3);
      return !!e2 && (e2.clientHeight < t3.scrollHeight || e2.clientWidth < t3.scrollWidth);
    })(t2);
  }
  return false;
};
var o = (t2, e2, n2, o2, l2, r2, i, s2) => r2 < t2 && i > e2 || r2 > t2 && i < e2 ? 0 : r2 <= t2 && s2 <= n2 || i >= e2 && s2 >= n2 ? r2 - t2 - o2 : i > e2 && s2 < n2 || r2 < t2 && s2 > n2 ? i - e2 + l2 : 0;
var l = (t2) => {
  const e2 = t2.parentElement;
  return null == e2 ? t2.getRootNode().host || null : e2;
};
var r = (e2, r2) => {
  var i, s2, d2, h2;
  if ("undefined" == typeof document) return [];
  const { scrollMode: c, block: f, inline: u, boundary: a, skipOverflowHiddenElements: g } = r2, p = "function" == typeof a ? a : (t2) => t2 !== a;
  if (!t(e2)) throw new TypeError("Invalid target");
  const m2 = document.scrollingElement || document.documentElement, w = [];
  let W = e2;
  for (; t(W) && p(W); ) {
    if (W = l(W), W === m2) {
      w.push(W);
      break;
    }
    null != W && W === document.body && n(W) && !n(document.documentElement) || null != W && n(W, g) && w.push(W);
  }
  const b = null != (s2 = null == (i = window.visualViewport) ? void 0 : i.width) ? s2 : innerWidth, H = null != (h2 = null == (d2 = window.visualViewport) ? void 0 : d2.height) ? h2 : innerHeight, { scrollX: y, scrollY: M } = window, { height: v, width: E, top: x, right: C, bottom: I, left: R } = e2.getBoundingClientRect(), { top: T, right: B, bottom: F, left: V } = ((t2) => {
    const e3 = window.getComputedStyle(t2);
    return { top: parseFloat(e3.scrollMarginTop) || 0, right: parseFloat(e3.scrollMarginRight) || 0, bottom: parseFloat(e3.scrollMarginBottom) || 0, left: parseFloat(e3.scrollMarginLeft) || 0 };
  })(e2);
  let k = "start" === f || "nearest" === f ? x - T : "end" === f ? I + F : x + v / 2 - T + F, D = "center" === u ? R + E / 2 - V + B : "end" === u ? C + B : R - V;
  const L = [];
  for (let t2 = 0; t2 < w.length; t2++) {
    const e3 = w[t2], { height: n2, width: l2, top: r3, right: i2, bottom: s3, left: d3 } = e3.getBoundingClientRect();
    if ("if-needed" === c && x >= 0 && R >= 0 && I <= H && C <= b && x >= r3 && I <= s3 && R >= d3 && C <= i2) return L;
    const h3 = getComputedStyle(e3), a2 = parseInt(h3.borderLeftWidth, 10), g2 = parseInt(h3.borderTopWidth, 10), p2 = parseInt(h3.borderRightWidth, 10), W2 = parseInt(h3.borderBottomWidth, 10);
    let T2 = 0, B2 = 0;
    const F2 = "offsetWidth" in e3 ? e3.offsetWidth - e3.clientWidth - a2 - p2 : 0, V2 = "offsetHeight" in e3 ? e3.offsetHeight - e3.clientHeight - g2 - W2 : 0, S = "offsetWidth" in e3 ? 0 === e3.offsetWidth ? 0 : l2 / e3.offsetWidth : 0, X = "offsetHeight" in e3 ? 0 === e3.offsetHeight ? 0 : n2 / e3.offsetHeight : 0;
    if (m2 === e3) T2 = "start" === f ? k : "end" === f ? k - H : "nearest" === f ? o(M, M + H, H, g2, W2, M + k, M + k + v, v) : k - H / 2, B2 = "start" === u ? D : "center" === u ? D - b / 2 : "end" === u ? D - b : o(y, y + b, b, a2, p2, y + D, y + D + E, E), T2 = Math.max(0, T2 + M), B2 = Math.max(0, B2 + y);
    else {
      T2 = "start" === f ? k - r3 - g2 : "end" === f ? k - s3 + W2 + V2 : "nearest" === f ? o(r3, s3, n2, g2, W2 + V2, k, k + v, v) : k - (r3 + n2 / 2) + V2 / 2, B2 = "start" === u ? D - d3 - a2 : "center" === u ? D - (d3 + l2 / 2) + F2 / 2 : "end" === u ? D - i2 + p2 + F2 : o(d3, i2, l2, a2, p2 + F2, D, D + E, E);
      const { scrollLeft: t3, scrollTop: h4 } = e3;
      T2 = 0 === X ? 0 : Math.max(0, Math.min(h4 + T2 / X, e3.scrollHeight - n2 / X + V2)), B2 = 0 === S ? 0 : Math.max(0, Math.min(t3 + B2 / S, e3.scrollWidth - l2 / S + F2)), k += h4 - T2, D += t3 - B2;
    }
    L.push({ el: e3, top: T2, left: B2 });
  }
  return L;
};

// ../vidstack/src/utils/scroll.ts
function scrollIntoView(el, options) {
  const scrolls = r(el, options);
  for (const { el: el2, top, left } of scrolls) {
    el2.scroll({ top, left, behavior: options.behavior });
  }
}
function scrollIntoCenter(el, options = {}) {
  scrollIntoView(el, {
    scrollMode: "if-needed",
    block: "center",
    inline: "center",
    ...options
  });
}

// ../vidstack/src/components/ui/menu/menu-focus-controller.ts
var FOCUSABLE_ELEMENTS_SELECTOR = /* @__PURE__ */ [
  "a[href]",
  "[tabindex]",
  "input",
  "select",
  "button"
].map((selector) => `${selector}:not([aria-hidden='true'])`).join(",");
var VALID_KEYS = /* @__PURE__ */ new Set([
  "Escape",
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "PageUp",
  "End",
  "PageDown",
  "Enter",
  " "
]);
var MenuFocusController = class {
  #index = -1;
  #el = null;
  #elements = [];
  #delegate;
  get items() {
    return this.#elements;
  }
  constructor(delegate) {
    this.#delegate = delegate;
  }
  attachMenu(el) {
    listenEvent(el, "focus", this.#onFocus.bind(this));
    this.#el = el;
    onDispose(() => {
      this.#el = null;
    });
  }
  listen() {
    if (!this.#el) return;
    this.update();
    listenEvent(this.#el, "keyup", this.#onKeyUp.bind(this));
    listenEvent(this.#el, "keydown", this.#onKeyDown.bind(this));
    onDispose(() => {
      this.#index = -1;
      this.#elements = [];
    });
  }
  update() {
    this.#index = 0;
    this.#elements = this.#getFocusableElements();
  }
  scroll(index = this.#findActiveIndex()) {
    const element = this.#elements[index];
    if (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollIntoCenter(element, {
            behavior: "smooth",
            boundary: (el) => {
              return !el.hasAttribute("data-root");
            }
          });
        });
      });
    }
  }
  focusActive(scroll = true) {
    const index = this.#findActiveIndex();
    this.#focusAt(index >= 0 ? index : 0, scroll);
  }
  #focusAt(index, scroll = true) {
    this.#index = index;
    if (this.#elements[index]) {
      this.#elements[index].focus({ preventScroll: true });
      if (scroll) this.scroll(index);
    } else {
      this.#el?.focus({ preventScroll: true });
    }
  }
  #findActiveIndex() {
    return this.#elements.findIndex(
      (el) => document.activeElement === el || el.getAttribute("role") === "menuitemradio" && el.getAttribute("aria-checked") === "true"
    );
  }
  #onFocus() {
    if (this.#index >= 0) return;
    this.update();
    this.focusActive();
  }
  #validateKeyEvent(event) {
    const el = event.target;
    if (wasEnterKeyPressed(event) && el instanceof Element) {
      const role = el.getAttribute("role");
      return !/a|input|select|button/.test(el.localName) && !role;
    }
    return VALID_KEYS.has(event.key);
  }
  #onKeyUp(event) {
    if (!this.#validateKeyEvent(event)) return;
    event.stopPropagation();
    event.preventDefault();
  }
  #onKeyDown(event) {
    if (!this.#validateKeyEvent(event)) return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this.#delegate.closeMenu(event);
        break;
      case "Tab":
        this.#focusAt(this.#nextIndex(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this.#focusAt(this.#nextIndex(-1));
        break;
      case "ArrowDown":
        this.#focusAt(this.#nextIndex(1));
        break;
      case "Home":
      case "PageUp":
        this.#focusAt(0);
        break;
      case "End":
      case "PageDown":
        this.#focusAt(this.#elements.length - 1);
        break;
    }
  }
  #nextIndex(delta) {
    let index = this.#index;
    do {
      index = (index + delta + this.#elements.length) % this.#elements.length;
    } while (this.#elements[index]?.offsetParent === null);
    return index;
  }
  #getFocusableElements() {
    if (!this.#el) return [];
    const focusableElements = this.#el.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (isHTMLElement(el) && el.offsetParent !== null && // does not have display: none
      isElementParent(this.#el, el, is)) {
        elements.push(el);
      }
    }
    return elements;
  }
};

// ../vidstack/src/components/ui/menu/menu.ts
var idCount = 0;
var _close_dec, _open_dec, _isSubmenu_dec, _contentElement_dec, _triggerElement_dec, _a9, _media7, _menuId, _menuButtonId, _expanded, _disabled, _trigger, _content, _parentMenu, _submenus, _menuObserver, _popper, _focus, _isSliderActive, _isTriggerDisabled, _transitionCallbacks, _init9, _Menu_instances, observeSliders_fn, watchExpanded_fn, attachMenuButton_fn, attachMenuItems_fn, attachObserver_fn, updateMenuItemsHidden_fn, disableMenuButton_fn, _wasKeyboardExpand, onExpandedChange_fn, updateFocus_fn, isExpanded_fn, isDisabled_fn, disable_fn, onPointerUp_fn, onWindowPointerUp_fn, getCloseTarget_fn, toggleMediaControls_fn, addSubmenu_fn, _removeSubmenuBind, removeSubmenu_fn, _isSubmenuOpen, _onSubmenuOpenBind, onSubmenuOpen_fn, _onSubmenuCloseBind, onSubmenuClose_fn, _onResize, _isTransitionActive, onResizeTransition_fn;
var Menu = class extends (_a9 = Component, _triggerElement_dec = [prop], _contentElement_dec = [prop], _isSubmenu_dec = [prop], _open_dec = [method], _close_dec = [method], _a9) {
  constructor() {
    super();
    __runInitializers(_init9, 5, this);
    __privateAdd(this, _Menu_instances);
    __privateAdd(this, _media7);
    __privateAdd(this, _menuId);
    __privateAdd(this, _menuButtonId);
    __privateAdd(this, _expanded, signal(false));
    __privateAdd(this, _disabled, signal(false));
    __privateAdd(this, _trigger, signal(null));
    __privateAdd(this, _content, signal(null));
    __privateAdd(this, _parentMenu);
    __privateAdd(this, _submenus, /* @__PURE__ */ new Set());
    __privateAdd(this, _menuObserver, null);
    __privateAdd(this, _popper);
    __privateAdd(this, _focus);
    __privateAdd(this, _isSliderActive, false);
    __privateAdd(this, _isTriggerDisabled, signal(false));
    __privateAdd(this, _transitionCallbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _wasKeyboardExpand, false);
    __privateAdd(this, _removeSubmenuBind, __privateMethod(this, _Menu_instances, removeSubmenu_fn).bind(this));
    __privateAdd(this, _isSubmenuOpen, false);
    __privateAdd(this, _onSubmenuOpenBind, __privateMethod(this, _Menu_instances, onSubmenuOpen_fn).bind(this));
    __privateAdd(this, _onSubmenuCloseBind, __privateMethod(this, _Menu_instances, onSubmenuClose_fn).bind(this));
    __privateAdd(this, _onResize, animationFrameThrottle(() => {
      const content = peek(__privateGet(this, _content));
      if (!content || IS_SERVER) return;
      let height = 0, styles = getComputedStyle(content), children = [...content.children];
      for (const prop2 of ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"]) {
        height += parseFloat(styles[prop2]) || 0;
      }
      for (const child of children) {
        if (isHTMLElement(child) && child.style.display === "contents") {
          children.push(...child.children);
        } else if (child.nodeType === 3) {
          height += parseFloat(getComputedStyle(child).fontSize);
        } else if (isHTMLElement(child)) {
          if (!isElementVisible(child)) continue;
          const style = getComputedStyle(child);
          height += child.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
        }
      }
      setStyle(content, "--menu-height", height + "px");
    }));
    __privateAdd(this, _isTransitionActive, false);
    const { showDelay } = this.$props;
    __privateSet(this, _popper, new Popper({
      trigger: __privateGet(this, _trigger),
      content: __privateGet(this, _content),
      showDelay,
      listen: (trigger, show, hide) => {
        onPress(trigger, (event) => {
          if (__privateGet(this, _expanded).call(this)) hide(event);
          else show(event);
        });
        const closeTarget = __privateMethod(this, _Menu_instances, getCloseTarget_fn).call(this);
        if (closeTarget) {
          onPress(closeTarget, (event) => {
            event.stopPropagation();
            hide(event);
          });
        }
      },
      onChange: __privateMethod(this, _Menu_instances, onExpandedChange_fn).bind(this)
    }));
  }
  get triggerElement() {
    return __privateGet(this, _trigger).call(this);
  }
  get contentElement() {
    return __privateGet(this, _content).call(this);
  }
  get isSubmenu() {
    return !!__privateGet(this, _parentMenu);
  }
  onSetup() {
    __privateSet(this, _media7, useMediaContext());
    const currentIdCount = ++idCount;
    __privateSet(this, _menuId, `media-menu-${currentIdCount}`);
    __privateSet(this, _menuButtonId, `media-menu-button-${currentIdCount}`);
    __privateSet(this, _focus, new MenuFocusController({
      closeMenu: this.close.bind(this)
    }));
    if (hasProvidedContext(menuContext)) {
      __privateSet(this, _parentMenu, useContext(menuContext));
    }
    __privateMethod(this, _Menu_instances, observeSliders_fn).call(this);
    this.setAttributes({
      "data-open": __privateGet(this, _expanded),
      "data-root": !this.isSubmenu,
      "data-submenu": this.isSubmenu,
      "data-disabled": __privateMethod(this, _Menu_instances, isDisabled_fn).bind(this)
    });
    provideContext(menuContext, {
      button: __privateGet(this, _trigger),
      content: __privateGet(this, _content),
      expanded: __privateGet(this, _expanded),
      hint: signal(""),
      submenu: !!__privateGet(this, _parentMenu),
      disable: __privateMethod(this, _Menu_instances, disable_fn).bind(this),
      attachMenuButton: __privateMethod(this, _Menu_instances, attachMenuButton_fn).bind(this),
      attachMenuItems: __privateMethod(this, _Menu_instances, attachMenuItems_fn).bind(this),
      attachObserver: __privateMethod(this, _Menu_instances, attachObserver_fn).bind(this),
      disableMenuButton: __privateMethod(this, _Menu_instances, disableMenuButton_fn).bind(this),
      addSubmenu: __privateMethod(this, _Menu_instances, addSubmenu_fn).bind(this),
      onTransitionEvent: (callback) => {
        __privateGet(this, _transitionCallbacks).add(callback);
        onDispose(() => {
          __privateGet(this, _transitionCallbacks).delete(callback);
        });
      }
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onConnect(el) {
    effect(__privateMethod(this, _Menu_instances, watchExpanded_fn).bind(this));
    if (this.isSubmenu) {
      __privateGet(this, _parentMenu)?.addSubmenu(this);
    }
  }
  onDestroy() {
    __privateGet(this, _trigger).set(null);
    __privateGet(this, _content).set(null);
    __privateSet(this, _menuObserver, null);
    __privateGet(this, _transitionCallbacks).clear();
  }
  open(trigger) {
    if (peek(__privateGet(this, _expanded))) return;
    __privateGet(this, _popper).show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(__privateGet(this, _expanded))) return;
    __privateGet(this, _popper).hide(trigger);
    tick();
  }
};
_init9 = __decoratorStart(_a9);
_media7 = new WeakMap();
_menuId = new WeakMap();
_menuButtonId = new WeakMap();
_expanded = new WeakMap();
_disabled = new WeakMap();
_trigger = new WeakMap();
_content = new WeakMap();
_parentMenu = new WeakMap();
_submenus = new WeakMap();
_menuObserver = new WeakMap();
_popper = new WeakMap();
_focus = new WeakMap();
_isSliderActive = new WeakMap();
_isTriggerDisabled = new WeakMap();
_transitionCallbacks = new WeakMap();
_Menu_instances = new WeakSet();
observeSliders_fn = function() {
  let sliderActiveTimer = -1, parentSliderObserver = hasProvidedContext(sliderObserverContext) ? useContext(sliderObserverContext) : null;
  provideContext(sliderObserverContext, {
    onDragStart: () => {
      parentSliderObserver?.onDragStart?.();
      window.clearTimeout(sliderActiveTimer);
      sliderActiveTimer = -1;
      __privateSet(this, _isSliderActive, true);
    },
    onDragEnd: () => {
      parentSliderObserver?.onDragEnd?.();
      sliderActiveTimer = window.setTimeout(() => {
        __privateSet(this, _isSliderActive, false);
        sliderActiveTimer = -1;
      }, 300);
    }
  });
};
watchExpanded_fn = function() {
  const expanded = __privateMethod(this, _Menu_instances, isExpanded_fn).call(this);
  if (!this.isSubmenu) __privateGet(this, _onResize).call(this);
  __privateMethod(this, _Menu_instances, updateMenuItemsHidden_fn).call(this, expanded);
  if (!expanded) return;
  effect(() => {
    const { height } = __privateGet(this, _media7).$state, content = __privateGet(this, _content).call(this);
    content && setStyle(content, "--player-height", height() + "px");
  });
  __privateGet(this, _focus).listen();
  this.listen("pointerup", __privateMethod(this, _Menu_instances, onPointerUp_fn).bind(this));
  listenEvent(window, "pointerup", __privateMethod(this, _Menu_instances, onWindowPointerUp_fn).bind(this));
};
attachMenuButton_fn = function(button) {
  const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(__privateMethod(this, _Menu_instances, isDisabled_fn).bind(this));
  setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
  setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
  setAttribute(el, "id", __privateGet(this, _menuButtonId));
  setAttribute(el, "aria-haspopup", "menu");
  setAttribute(el, "aria-expanded", "false");
  setAttribute(el, "data-root", !this.isSubmenu);
  setAttribute(el, "data-submenu", this.isSubmenu);
  const watchAttrs = () => {
    setAttribute(el, "data-open", __privateGet(this, _expanded).call(this));
    setAttribute(el, "aria-disabled", isARIADisabled());
  };
  if (IS_SERVER) watchAttrs();
  else effect(watchAttrs);
  __privateGet(this, _trigger).set(el);
  onDispose(() => {
    __privateGet(this, _trigger).set(null);
  });
};
attachMenuItems_fn = function(items) {
  const el = items.el;
  el.style.setProperty("display", "none");
  setAttribute(el, "id", __privateGet(this, _menuId));
  setAttributeIfEmpty(el, "role", "menu");
  setAttributeIfEmpty(el, "tabindex", "-1");
  setAttribute(el, "data-root", !this.isSubmenu);
  setAttribute(el, "data-submenu", this.isSubmenu);
  __privateGet(this, _content).set(el);
  onDispose(() => __privateGet(this, _content).set(null));
  const watchAttrs = () => setAttribute(el, "data-open", __privateGet(this, _expanded).call(this));
  if (IS_SERVER) watchAttrs();
  else effect(watchAttrs);
  __privateGet(this, _focus).attachMenu(el);
  __privateMethod(this, _Menu_instances, updateMenuItemsHidden_fn).call(this, false);
  const onTransition = __privateMethod(this, _Menu_instances, onResizeTransition_fn).bind(this);
  if (!this.isSubmenu) {
    items.listen("transitionstart", onTransition);
    items.listen("transitionend", onTransition);
    items.listen("animationend", __privateGet(this, _onResize));
    items.listen("vds-menu-resize", __privateGet(this, _onResize));
  } else {
    __privateGet(this, _parentMenu)?.onTransitionEvent(onTransition);
  }
};
attachObserver_fn = function(observer) {
  __privateSet(this, _menuObserver, observer);
};
updateMenuItemsHidden_fn = function(expanded) {
  const content = peek(__privateGet(this, _content));
  if (content) setAttribute(content, "aria-hidden", ariaBool(!expanded));
};
disableMenuButton_fn = function(disabled) {
  __privateGet(this, _isTriggerDisabled).set(disabled);
};
_wasKeyboardExpand = new WeakMap();
onExpandedChange_fn = function(isExpanded, event) {
  __privateSet(this, _wasKeyboardExpand, isKeyboardEvent(event));
  event?.stopPropagation();
  if (__privateGet(this, _expanded).call(this) === isExpanded) return;
  if (__privateMethod(this, _Menu_instances, isDisabled_fn).call(this)) {
    if (isExpanded) __privateGet(this, _popper).hide(event);
    return;
  }
  this.el?.dispatchEvent(
    new Event("vds-menu-resize", {
      bubbles: true,
      composed: true
    })
  );
  const trigger = __privateGet(this, _trigger).call(this), content = __privateGet(this, _content).call(this);
  if (trigger) {
    setAttribute(trigger, "aria-controls", isExpanded && __privateGet(this, _menuId));
    setAttribute(trigger, "aria-expanded", ariaBool(isExpanded));
  }
  if (content) setAttribute(content, "aria-labelledby", isExpanded && __privateGet(this, _menuButtonId));
  __privateGet(this, _expanded).set(isExpanded);
  __privateMethod(this, _Menu_instances, toggleMediaControls_fn).call(this, event);
  tick();
  if (__privateGet(this, _wasKeyboardExpand)) {
    if (isExpanded) content?.focus();
    else trigger?.focus();
    for (const el of [this.el, content]) {
      el && el.setAttribute("data-keyboard", "");
    }
  } else {
    for (const el of [this.el, content]) {
      el && el.removeAttribute("data-keyboard");
    }
  }
  this.dispatch(isExpanded ? "open" : "close", { trigger: event });
  if (isExpanded) {
    if (!this.isSubmenu && __privateGet(this, _media7).activeMenu !== this) {
      __privateGet(this, _media7).activeMenu?.close(event);
      __privateGet(this, _media7).activeMenu = this;
    }
    __privateGet(this, _menuObserver)?.onOpen?.(event);
  } else {
    if (this.isSubmenu) {
      for (const el of __privateGet(this, _submenus)) el.close(event);
    } else {
      __privateGet(this, _media7).activeMenu = null;
    }
    __privateGet(this, _menuObserver)?.onClose?.(event);
  }
  if (isExpanded) {
    requestAnimationFrame(__privateMethod(this, _Menu_instances, updateFocus_fn).bind(this));
  }
};
updateFocus_fn = function() {
  if (__privateGet(this, _isTransitionActive) || __privateGet(this, _isSubmenuOpen)) return;
  __privateGet(this, _focus).update();
  requestAnimationFrame(() => {
    if (__privateGet(this, _wasKeyboardExpand)) {
      __privateGet(this, _focus).focusActive();
    } else {
      __privateGet(this, _focus).scroll();
    }
  });
};
isExpanded_fn = function() {
  return !__privateMethod(this, _Menu_instances, isDisabled_fn).call(this) && __privateGet(this, _expanded).call(this);
};
isDisabled_fn = function() {
  return __privateGet(this, _disabled).call(this) || __privateGet(this, _isTriggerDisabled).call(this);
};
disable_fn = function(disabled) {
  __privateGet(this, _disabled).set(disabled);
};
onPointerUp_fn = function(event) {
  const content = __privateGet(this, _content).call(this);
  if (__privateGet(this, _isSliderActive) || content && isEventInside(content, event)) {
    return;
  }
  event.stopPropagation();
};
onWindowPointerUp_fn = function(event) {
  const content = __privateGet(this, _content).call(this);
  if (__privateGet(this, _isSliderActive) || content && isEventInside(content, event)) {
    return;
  }
  this.close(event);
};
getCloseTarget_fn = function() {
  const target = this.el?.querySelector('[data-part="close-target"]');
  return this.el && target && isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
};
toggleMediaControls_fn = function(trigger) {
  if (this.isSubmenu) return;
  if (__privateGet(this, _expanded).call(this)) __privateGet(this, _media7).remote.pauseControls(trigger);
  else __privateGet(this, _media7).remote.resumeControls(trigger);
};
addSubmenu_fn = function(menu) {
  __privateGet(this, _submenus).add(menu);
  listenEvent(menu, "open", __privateGet(this, _onSubmenuOpenBind));
  listenEvent(menu, "close", __privateGet(this, _onSubmenuCloseBind));
  onDispose(__privateGet(this, _removeSubmenuBind));
};
_removeSubmenuBind = new WeakMap();
removeSubmenu_fn = function(menu) {
  __privateGet(this, _submenus).delete(menu);
};
_isSubmenuOpen = new WeakMap();
_onSubmenuOpenBind = new WeakMap();
onSubmenuOpen_fn = function(event) {
  __privateSet(this, _isSubmenuOpen, true);
  const content = __privateGet(this, _content).call(this);
  if (this.isSubmenu) {
    this.triggerElement?.setAttribute("aria-hidden", "true");
  }
  for (const target of __privateGet(this, _submenus)) {
    if (target !== event.target) {
      for (const el of [target.el, target.triggerElement]) {
        el?.setAttribute("aria-hidden", "true");
      }
    }
  }
  if (content) {
    const el = event.target.el;
    for (const child of content.children) {
      if (child.contains(el)) {
        child.setAttribute("data-open", "");
      } else if (child !== el) {
        child.setAttribute("data-hidden", "");
      }
    }
  }
};
_onSubmenuCloseBind = new WeakMap();
onSubmenuClose_fn = function(event) {
  __privateSet(this, _isSubmenuOpen, false);
  const content = __privateGet(this, _content).call(this);
  if (this.isSubmenu) {
    this.triggerElement?.setAttribute("aria-hidden", "false");
  }
  for (const target of __privateGet(this, _submenus)) {
    for (const el of [target.el, target.triggerElement]) {
      el?.setAttribute("aria-hidden", "false");
    }
  }
  if (content) {
    for (const child of content.children) {
      child.removeAttribute("data-open");
      child.removeAttribute("data-hidden");
    }
  }
};
_onResize = new WeakMap();
_isTransitionActive = new WeakMap();
onResizeTransition_fn = function(event) {
  const content = __privateGet(this, _content).call(this);
  if (content && event.propertyName === "height") {
    __privateSet(this, _isTransitionActive, event.type === "transitionstart");
    setAttribute(content, "data-transition", __privateGet(this, _isTransitionActive) ? "height" : null);
    if (__privateGet(this, _expanded).call(this)) __privateMethod(this, _Menu_instances, updateFocus_fn).call(this);
  }
  for (const callback of __privateGet(this, _transitionCallbacks)) callback(event);
};
__decorateElement(_init9, 2, "triggerElement", _triggerElement_dec, Menu);
__decorateElement(_init9, 2, "contentElement", _contentElement_dec, Menu);
__decorateElement(_init9, 2, "isSubmenu", _isSubmenu_dec, Menu);
__decorateElement(_init9, 1, "open", _open_dec, Menu);
__decorateElement(_init9, 1, "close", _close_dec, Menu);
__decoratorMetadata(_init9, Menu);
__publicField(Menu, "props", {
  showDelay: 0
});

// ../vidstack/src/components/ui/menu/menu-button.ts
var _expanded_dec, _a10, _menu3, _hintEl, _init10, _MenuButton_instances, watchDisabled_fn, watchHintEl_fn, onMutation_fn2;
var MenuButton = class extends (_a10 = Component, _expanded_dec = [prop], _a10) {
  constructor() {
    super();
    __runInitializers(_init10, 5, this);
    __privateAdd(this, _MenuButton_instances);
    __privateAdd(this, _menu3);
    __privateAdd(this, _hintEl, signal(null));
    new FocusVisibleController();
  }
  get expanded() {
    return __privateGet(this, _menu3)?.expanded() ?? false;
  }
  onSetup() {
    __privateSet(this, _menu3, useContext(menuContext));
  }
  onAttach(el) {
    __privateGet(this, _menu3).attachMenuButton(this);
    effect(__privateMethod(this, _MenuButton_instances, watchDisabled_fn).bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    effect(__privateMethod(this, _MenuButton_instances, watchHintEl_fn).bind(this));
    __privateMethod(this, _MenuButton_instances, onMutation_fn2).call(this);
    const mutations = new MutationObserver(__privateMethod(this, _MenuButton_instances, onMutation_fn2).bind(this));
    mutations.observe(el, { attributeFilter: ["data-part"], childList: true, subtree: true });
    onDispose(() => mutations.disconnect());
    onPress(el, (trigger) => {
      this.dispatch("select", { trigger });
    });
  }
};
_init10 = __decoratorStart(_a10);
_menu3 = new WeakMap();
_hintEl = new WeakMap();
_MenuButton_instances = new WeakSet();
watchDisabled_fn = function() {
  __privateGet(this, _menu3).disableMenuButton(this.$props.disabled());
};
watchHintEl_fn = function() {
  const el = __privateGet(this, _hintEl).call(this);
  if (!el) return;
  effect(() => {
    const text = __privateGet(this, _menu3).hint();
    if (text) el.textContent = text;
  });
};
onMutation_fn2 = function() {
  const hintEl = this.el?.querySelector('[data-part="hint"]');
  __privateGet(this, _hintEl).set(hintEl ?? null);
};
__decorateElement(_init10, 2, "expanded", _expanded_dec, MenuButton);
__decoratorMetadata(_init10, MenuButton);
__publicField(MenuButton, "props", {
  disabled: false
});

// ../vidstack/src/components/ui/menu/menu-item.ts
var MenuItem = class extends MenuButton {
};

// ../vidstack/src/components/ui/menu/menu-portal.ts
var MenuPortal = class extends Component {
  static props = {
    container: null,
    disabled: false
  };
  #target = null;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    provideContext(menuPortalContext, {
      attach: this.#attachElement.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  // Need this so connect scope is defined.
  onConnect(el) {
  }
  onDestroy() {
    this.#target?.remove();
    this.#target = null;
  }
  #attachElement(el) {
    this.#portal(false);
    this.#target = el;
    requestScopedAnimationFrame(() => {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        effect(this.#watchDisabled.bind(this));
      });
    });
  }
  #watchDisabled() {
    const { fullscreen } = this.#media.$state, { disabled } = this.$props;
    this.#portal(disabled() === "fullscreen" ? !fullscreen() : !disabled());
  }
  #portal(shouldPortal) {
    if (!this.#target) return;
    let container = this.#getContainer(this.$props.container());
    if (!container) return;
    const isPortalled = this.#target.parentElement === container;
    setAttribute(this.#target, "data-portal", shouldPortal);
    if (shouldPortal) {
      if (!isPortalled) {
        this.#target.remove();
        container.append(this.#target);
      }
    } else if (isPortalled && this.#target.parentElement === container) {
      this.#target.remove();
      this.el?.append(this.#target);
    }
  }
  #getContainer(selector) {
    if (isHTMLElement(selector)) return selector;
    return selector ? document.querySelector(selector) : document.body;
  }
};
var menuPortalContext = createContext();

// ../vidstack/src/components/ui/menu/menu-items.ts
var MenuItems = class extends Component {
  static props = {
    placement: null,
    offset: 0,
    alignOffset: 0
  };
  #menu;
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.#menu = useContext(menuContext);
    this.#menu.attachMenuItems(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal.attach(el);
        onDispose(() => portal.attach(null));
      }
    }
  }
  onConnect(el) {
    effect(this.#watchPlacement.bind(this));
  }
  #watchPlacement() {
    if (!this.el) return;
    const placement = this.$props.placement();
    if (placement) {
      Object.assign(this.el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content"
      });
      const { offset: mainOffset, alignOffset } = this.$props;
      return autoPlacement(this.el, this.#getButton(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  #getButton() {
    return this.#menu.button();
  }
};

// ../vidstack/src/components/ui/menu/radio/radio-group.ts
var _value_dec3, _values_dec, _a11, _controller3, _init11, _RadioGroup_instances, watchValue_fn3, onValueChange_fn3;
var RadioGroup = class extends (_a11 = Component, _values_dec = [prop], _value_dec3 = [prop], _a11) {
  constructor() {
    super();
    __runInitializers(_init11, 5, this);
    __privateAdd(this, _RadioGroup_instances);
    __privateAdd(this, _controller3);
    __privateSet(this, _controller3, new RadioGroupController());
    __privateGet(this, _controller3).onValueChange = __privateMethod(this, _RadioGroup_instances, onValueChange_fn3).bind(this);
  }
  get values() {
    return __privateGet(this, _controller3).values;
  }
  get value() {
    return __privateGet(this, _controller3).value;
  }
  set value(newValue) {
    __privateGet(this, _controller3).value = newValue;
  }
  onSetup() {
    if (IS_SERVER) __privateMethod(this, _RadioGroup_instances, watchValue_fn3).call(this);
    else effect(__privateMethod(this, _RadioGroup_instances, watchValue_fn3).bind(this));
  }
};
_init11 = __decoratorStart(_a11);
_controller3 = new WeakMap();
_RadioGroup_instances = new WeakSet();
watchValue_fn3 = function() {
  __privateGet(this, _controller3).value = this.$props.value();
};
onValueChange_fn3 = function(value, trigger) {
  const event = this.createEvent("change", { detail: value, trigger });
  this.dispatch(event);
};
__decorateElement(_init11, 2, "values", _values_dec, RadioGroup);
__decorateElement(_init11, 2, "value", _value_dec3, RadioGroup);
__decoratorMetadata(_init11, RadioGroup);
__publicField(RadioGroup, "props", {
  value: ""
});

// ../vidstack/src/components/ui/menu/radio/radio.ts
var _checked_dec, _a12, _checked, _controller4, _init12, _Radio_instances, onDisconnect_fn, addToGroup_fn, watchValue_fn4, onPress_fn, check_fn, onChange_fn, onSelect_fn;
var Radio = class extends (_a12 = Component, _checked_dec = [prop], _a12) {
  constructor() {
    super();
    __runInitializers(_init12, 5, this);
    __privateAdd(this, _Radio_instances);
    __privateAdd(this, _checked, signal(false));
    __privateAdd(this, _controller4, {
      value: this.$props.value,
      check: __privateMethod(this, _Radio_instances, check_fn).bind(this),
      onCheck: null
    });
    new FocusVisibleController();
  }
  get checked() {
    return __privateGet(this, _checked).call(this);
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      "data-checked": __privateGet(this, _checked),
      "aria-checked": $ariaBool(__privateGet(this, _checked))
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitemradio" : "radio");
    effect(__privateMethod(this, _Radio_instances, watchValue_fn4).bind(this));
  }
  onConnect(el) {
    __privateMethod(this, _Radio_instances, addToGroup_fn).call(this);
    onPress(el, __privateMethod(this, _Radio_instances, onPress_fn).bind(this));
    onDispose(__privateMethod(this, _Radio_instances, onDisconnect_fn).bind(this));
  }
};
_init12 = __decoratorStart(_a12);
_checked = new WeakMap();
_controller4 = new WeakMap();
_Radio_instances = new WeakSet();
onDisconnect_fn = function() {
  scoped(() => {
    const group = useContext(radioControllerContext);
    group.remove(__privateGet(this, _controller4));
  }, this.connectScope);
};
addToGroup_fn = function() {
  const group = useContext(radioControllerContext);
  group.add(__privateGet(this, _controller4));
};
watchValue_fn4 = function() {
  const { value } = this.$props, newValue = value();
  if (peek(__privateGet(this, _checked))) {
    __privateGet(this, _controller4).onCheck?.(newValue);
  }
};
onPress_fn = function(event) {
  if (peek(__privateGet(this, _checked))) return;
  __privateMethod(this, _Radio_instances, onChange_fn).call(this, true, event);
  __privateMethod(this, _Radio_instances, onSelect_fn).call(this, event);
  __privateGet(this, _controller4).onCheck?.(peek(this.$props.value), event);
};
check_fn = function(value, trigger) {
  if (peek(__privateGet(this, _checked)) === value) return;
  __privateMethod(this, _Radio_instances, onChange_fn).call(this, value, trigger);
};
onChange_fn = function(value, trigger) {
  __privateGet(this, _checked).set(value);
  this.dispatch("change", { detail: value, trigger });
};
onSelect_fn = function(trigger) {
  this.dispatch("select", { trigger });
};
__decorateElement(_init12, 2, "checked", _checked_dec, Radio);
__decoratorMetadata(_init12, Radio);
__publicField(Radio, "props", {
  value: ""
});

// ../vidstack/src/components/ui/gesture.ts
var Gesture = class extends Component {
  static props = {
    disabled: false,
    event: void 0,
    action: void 0
  };
  #media;
  #provider = null;
  onSetup() {
    this.#media = useMediaContext();
    const { event, action } = this.$props;
    this.setAttributes({
      event,
      action
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-gesture", "");
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    this.#provider = this.#media.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this.#attachListener.bind(this));
  }
  #attachListener() {
    let eventType = this.$props.event(), disabled = this.$props.disabled();
    if (!this.#provider || !eventType || disabled) return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this.#media.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this.#provider,
      eventType,
      this.#acceptEvent.bind(this),
      { passive: false }
    );
  }
  #presses = 0;
  #pressTimerId = -1;
  #acceptEvent(event) {
    if (this.$props.disabled() || isPointerEvent(event) && (event.button !== 0 || this.#media.activeMenu) || isTouchEvent(event) && this.#media.activeMenu || isTouchPinchEvent(event) || !this.#inBounds(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this.#presses === 0) {
        setTimeout(() => {
          if (this.#presses === 1) this.#handleEvent(event);
        }, 250);
      }
    } else if (this.#presses === 1) {
      queueMicrotask(() => this.#handleEvent(event));
      clearTimeout(this.#pressTimerId);
      this.#presses = 0;
      return;
    }
    if (this.#presses === 0) {
      this.#pressTimerId = window.setTimeout(() => {
        this.#presses = 0;
      }, 275);
    }
    this.#presses++;
  }
  #handleEvent(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this.#isTopLayer()) {
        this.#performAction(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  #inBounds(event) {
    if (!this.el) return false;
    if (isPointerEvent(event) || isMouseEvent(event) || isTouchEvent(event)) {
      const touch = isTouchEvent(event) ? event.changedTouches[0] ?? event.touches[0] : void 0;
      const clientX = touch?.clientX ?? event.clientX;
      const clientY = touch?.clientY ?? event.clientY;
      const rect = this.el.getBoundingClientRect();
      const inBounds = clientY >= rect.top && clientY <= rect.bottom && clientX >= rect.left && clientX <= rect.right;
      return event.type.includes("leave") ? !inBounds : inBounds;
    }
    return true;
  }
  /** Validate gesture has the highest z-index in this triggered group. */
  #isTopLayer() {
    const gestures = this.#media.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  #performAction(action, trigger) {
    if (!action) return;
    const willTriggerEvent = new DOMEvent("will-trigger", {
      detail: action,
      cancelable: true,
      trigger
    });
    this.dispatchEvent(willTriggerEvent);
    if (willTriggerEvent.defaultPrevented) return;
    const [method2, value] = action.replace(/:([a-z])/, "-$1").split(":");
    if (action.includes(":fullscreen")) {
      this.#media.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this.#media.remote.seek(peek(this.#media.$state.currentTime) + (+value || 0), trigger);
    } else {
      this.#media.remote[kebabToCamelCase(method2)](trigger);
    }
    this.dispatch("trigger", {
      detail: action,
      trigger
    });
  }
};

// ../vidstack/src/components/ui/captions/captions-renderer.ts
var CaptionsTextRenderer = class {
  priority = 10;
  #track = null;
  #disposal = createDisposalBin();
  #renderer;
  constructor(renderer) {
    this.#renderer = renderer;
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this.#disposal.empty();
    this.#renderer.reset();
    this.#track = null;
  }
  changeTrack(track) {
    if (!track || this.#track === track) return;
    this.#disposal.empty();
    if (track.readyState < 2) {
      this.#renderer.reset();
      this.#disposal.add(
        listenEvent(track, "load", () => this.#changeTrack(track), { once: true })
      );
    } else {
      this.#changeTrack(track);
    }
    this.#disposal.add(
      listenEvent(track, "add-cue", (event) => {
        this.#renderer.addCue(event.detail);
      }),
      listenEvent(track, "remove-cue", (event) => {
        this.#renderer.removeCue(event.detail);
      })
    );
    this.#track = track;
  }
  #changeTrack(track) {
    this.#renderer.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
};

// ../vidstack/src/components/ui/captions/captions.ts
var Captions = class _Captions extends Component {
  static props = {
    textDir: "ltr",
    exampleText: "Captions look like this."
  };
  #media;
  static lib = signal(null);
  onSetup() {
    this.#media = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this.#isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (!_Captions.lib()) {
      import("media-captions").then((lib) => _Captions.lib.set(lib));
    }
    effect(this.#watchViewType.bind(this));
  }
  #isHidden() {
    const { textTrack, remotePlaybackState, iOSControls } = this.#media.$state, track = textTrack();
    return iOSControls() || remotePlaybackState() === "connected" || !track || !isTrackCaptionKind(track);
  }
  #watchViewType() {
    if (!_Captions.lib()) return;
    const { viewType } = this.#media.$state;
    if (viewType() === "audio") {
      return this.#setupAudioView();
    } else {
      return this.#setupVideoView();
    }
  }
  #setupAudioView() {
    effect(this.#onTrackChange.bind(this));
    this.#listenToFontStyleChanges(null);
    return () => {
      this.el.textContent = "";
    };
  }
  #onTrackChange() {
    if (this.#isHidden()) return;
    this.#onCueChange();
    const { textTrack } = this.#media.$state;
    listenEvent(textTrack(), "cue-change", this.#onCueChange.bind(this));
    effect(this.#onUpdateTimedNodes.bind(this));
  }
  #onCueChange() {
    this.el.textContent = "";
    if (this.#hideExampleTimer >= 0) {
      this.#removeExample();
    }
    const { realCurrentTime, textTrack } = this.#media.$state, { renderVTTCueString } = _Captions.lib(), time = peek(realCurrentTime), activeCues = peek(textTrack).activeCues;
    for (const cue of activeCues) {
      const displayEl = this.#createCueDisplayElement(), cueEl = this.#createCueElement();
      cueEl.innerHTML = renderVTTCueString(cue, time);
      displayEl.append(cueEl);
      this.el.append(cueEl);
    }
  }
  #onUpdateTimedNodes() {
    const { realCurrentTime } = this.#media.$state, { updateTimedVTTCueNodes } = _Captions.lib();
    updateTimedVTTCueNodes(this.el, realCurrentTime());
  }
  #setupVideoView() {
    const { CaptionsRenderer } = _Captions.lib(), renderer = new CaptionsRenderer(this.el), textRenderer = new CaptionsTextRenderer(renderer);
    this.#media.textRenderers.add(textRenderer);
    effect(this.#watchTextDirection.bind(this, renderer));
    effect(this.#watchMediaTime.bind(this, renderer));
    this.#listenToFontStyleChanges(renderer);
    return () => {
      this.el.textContent = "";
      this.#media.textRenderers.remove(textRenderer);
      renderer.destroy();
    };
  }
  #watchTextDirection(renderer) {
    renderer.dir = this.$props.textDir();
  }
  #watchMediaTime(renderer) {
    if (this.#isHidden()) return;
    const { realCurrentTime, textTrack } = this.#media.$state;
    renderer.currentTime = realCurrentTime();
    if (this.#hideExampleTimer >= 0 && textTrack()?.activeCues[0]) {
      this.#removeExample();
    }
  }
  #listenToFontStyleChanges(renderer) {
    const player = this.#media.player;
    if (!player) return;
    const onChange = this.#onFontStyleChange.bind(this, renderer);
    listenEvent(player, "vds-font-change", onChange);
  }
  #onFontStyleChange(renderer) {
    if (this.#hideExampleTimer >= 0) {
      this.#hideExample();
      return;
    }
    const { textTrack } = this.#media.$state;
    if (!textTrack()?.activeCues[0]) {
      this.#showExample();
    } else {
      renderer?.update(true);
    }
  }
  #showExample() {
    const display = this.#createCueDisplayElement();
    setAttribute(display, "data-example", "");
    const cue = this.#createCueElement();
    setAttribute(cue, "data-example", "");
    cue.textContent = this.$props.exampleText();
    display?.append(cue);
    this.el?.append(display);
    this.el?.setAttribute("data-example", "");
    this.#hideExample();
  }
  #hideExampleTimer = -1;
  #hideExample() {
    window.clearTimeout(this.#hideExampleTimer);
    this.#hideExampleTimer = window.setTimeout(this.#removeExample.bind(this), 2500);
  }
  #removeExample() {
    this.el?.removeAttribute("data-example");
    if (this.el?.querySelector("[data-example]")) this.el.textContent = "";
    this.#hideExampleTimer = -1;
  }
  #createCueDisplayElement() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue-display");
    return el;
  }
  #createCueElement() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue");
    return el;
  }
};

// ../vidstack/src/components/ui/poster.ts
var Poster = class extends Component {
  static props = {
    src: null,
    alt: null,
    crossOrigin: null
  };
  static state = new State({
    img: null,
    src: null,
    alt: null,
    crossOrigin: null,
    loading: true,
    error: null,
    hidden: false
  });
  #media;
  onSetup() {
    this.#media = useMediaContext();
    this.#watchSrc();
    this.#watchAlt();
    this.#watchCrossOrigin();
    this.#watchHidden();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this.#watchImg.bind(this));
    effect(this.#watchSrc.bind(this));
    effect(this.#watchAlt.bind(this));
    effect(this.#watchCrossOrigin.bind(this));
    effect(this.#watchHidden.bind(this));
    const { started } = this.#media.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this.#isLoading.bind(this),
      "data-error": this.#hasError.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this.#onPreconnect.bind(this));
    effect(this.#onLoadStart.bind(this));
  }
  #hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  #onPreconnect() {
    const { canLoadPoster, poster } = this.#media.$state;
    if (!canLoadPoster() && poster()) preconnect(poster(), "preconnect");
  }
  #watchHidden() {
    const { src } = this.$props, { poster, nativeControls } = this.#media.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this.#hasError() || !(src() || poster()) || nativeControls());
  }
  #isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  #watchImg() {
    const img = this.$state.img();
    if (!img) return;
    listenEvent(img, "load", this.#onLoad.bind(this));
    listenEvent(img, "error", this.#onError.bind(this));
    if (img.complete) this.#onLoad();
  }
  #prevSrc = "";
  #watchSrc() {
    const { poster: defaultPoster } = this.#media.$props, { canLoadPoster, providedPoster, inferredPoster } = this.#media.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this.#prevSrc === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this.#prevSrc = src;
  }
  #watchAlt() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this.#media.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  #watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this.#media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  #onLoadStart() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this.#media.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  #onLoad() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  #onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
};

// ../vidstack/src/components/ui/time.ts
var Time = class extends Component {
  static props = {
    type: "current",
    showHours: false,
    padHours: null,
    padMinutes: null,
    remainder: false,
    toggle: false,
    hidden: false
  };
  static state = new State({
    timeText: "",
    hidden: false
  });
  #media;
  #invert = signal(null);
  #isVisible = signal(true);
  #isIntersecting = signal(true);
  onSetup() {
    this.#media = useMediaContext();
    this.#watchTime();
    const { type } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": this.#shouldInvert.bind(this)
    });
    new IntersectionObserverController({
      callback: this.#onIntersectionChange.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    if (!el.hasAttribute("role")) effect(this.#watchRole.bind(this));
    effect(this.#watchTime.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.#isVisible.set));
    effect(this.#watchHidden.bind(this));
    effect(this.#watchToggle.bind(this));
  }
  #onIntersectionChange(entries) {
    this.#isIntersecting.set(entries[0].isIntersecting);
  }
  #watchHidden() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.#isVisible() || !this.#isIntersecting());
  }
  #watchToggle() {
    if (!this.$props.toggle()) {
      this.#invert.set(null);
      return;
    }
    if (this.el) {
      onPress(this.el, this.#onToggle.bind(this));
    }
  }
  #watchTime() {
    const { hidden, timeText } = this.$state, { duration } = this.#media.$state;
    if (hidden()) return;
    const { type, padHours, padMinutes, showHours } = this.$props, seconds = this.#getSeconds(type()), $duration = duration(), shouldInvert = this.#shouldInvert();
    if (!Number.isFinite(seconds + $duration)) {
      timeText.set("LIVE");
      return;
    }
    const time = shouldInvert ? Math.max(0, $duration - seconds) : seconds, formattedTime = formatTime(time, {
      padHrs: padHours(),
      padMins: padMinutes(),
      showHrs: showHours()
    });
    timeText.set((shouldInvert ? "-" : "") + formattedTime);
  }
  #watchRole() {
    if (!this.el) return;
    const { toggle } = this.$props;
    setAttribute(this.el, "role", toggle() ? "timer" : null);
    setAttribute(this.el, "tabindex", toggle() ? 0 : null);
  }
  #getSeconds(type) {
    const { bufferedEnd, duration, currentTime } = this.#media.$state;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
  #shouldInvert() {
    return this.$props.remainder() && this.#invert() !== false;
  }
  #onToggle(event) {
    event.preventDefault();
    if (this.#invert() === null) {
      this.#invert.set(!this.$props.remainder());
      return;
    }
    this.#invert.set((v) => !v);
  }
};

// ../vidstack/src/components/layouts/plyr/plyr-layout.ts
function usePlyrLayoutClasses(el, media) {
  const {
    canAirPlay,
    canFullscreen: canFullscreen2,
    canPictureInPicture,
    controlsHidden,
    currentTime,
    fullscreen,
    hasCaptions,
    isAirPlayConnected,
    paused,
    pictureInPicture,
    playing,
    pointer,
    poster,
    textTrack,
    viewType,
    waiting
  } = media.$state;
  el.classList.add("plyr");
  el.classList.add("plyr--full-ui");
  const classes = {
    "plyr--airplay-active": isAirPlayConnected,
    "plyr--airplay-supported": canAirPlay,
    "plyr--fullscreen-active": fullscreen,
    "plyr--fullscreen-enabled": canFullscreen2,
    "plyr--hide-controls": controlsHidden,
    "plyr--is-touch": () => pointer() === "coarse",
    "plyr--loading": waiting,
    "plyr--paused": paused,
    "plyr--pip-active": pictureInPicture,
    "plyr--pip-enabled": canPictureInPicture,
    "plyr--playing": playing,
    "plyr__poster-enabled": poster,
    "plyr--stopped": () => paused() && currentTime() === 0,
    "plyr--captions-active": textTrack,
    "plyr--captions-enabled": hasCaptions
  };
  const disposal = createDisposalBin();
  for (const token of Object.keys(classes)) {
    disposal.add(effect(() => void el.classList.toggle(token, !!classes[token]())));
  }
  disposal.add(
    effect(() => {
      const token = `plyr--${viewType()}`;
      el.classList.add(token);
      return () => el.classList.remove(token);
    }),
    effect(() => {
      const { $provider } = media, type = $provider()?.type, token = `plyr--${isHTMLProvider(type) ? "html5" : type}`;
      el.classList.toggle(token, !!type);
      return () => el.classList.remove(token);
    })
  );
  return () => disposal.empty();
}
function isHTMLProvider(type) {
  return type === "audio" || type === "video";
}

// ../vidstack/src/index.ts
if (true) {
  console.warn("[vidstack] dev mode!");
}

// src/providers/remotion/type-check.ts
function isRemotionProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "REMOTION";
}
function isRemotionSrc(src) {
  return src?.type === "video/remotion";
}

export {
  isVideoQualitySrc,
  mediaState,
  softResetMediaState,
  mediaContext,
  useMediaContext,
  Logger,
  MediaRemoteControl,
  LocalMediaStorage,
  TextRenderers,
  LibASSTextRenderer,
  List,
  TextTrackList,
  AudioTrackList,
  VideoQualityList,
  sortVideoQualities,
  isAudioProvider,
  isVideoProvider,
  isHLSProvider,
  isDASHProvider,
  isYouTubeProvider,
  isVimeoProvider,
  isGoogleCastProvider,
  isHTMLAudioElement,
  isHTMLVideoElement,
  isHTMLMediaElement,
  isHTMLIFrameElement,
  MEDIA_KEY_SHORTCUTS,
  ARIAKeyShortcuts,
  MediaControls,
  FullscreenController,
  canFullscreen,
  ScreenOrientationController,
  AudioProviderLoader,
  VideoProviderLoader,
  HLSProviderLoader,
  DASHProviderLoader,
  VimeoProviderLoader,
  YouTubeProviderLoader,
  formatTime,
  formatSpokenTime,
  MediaPlayer,
  MediaProvider,
  MediaAnnouncer,
  Controls,
  ControlsGroup,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  ToggleButton,
  AirPlayButton,
  GoogleCastButton,
  PlayButton,
  CaptionButton,
  FullscreenButton,
  MuteButton,
  PIPButton,
  SeekButton,
  LiveButton,
  sliderState,
  Slider,
  ThumbnailsLoader,
  Thumbnail,
  SliderThumbnail,
  SliderVideo,
  SliderValue,
  SliderPreview,
  updateSliderPreviewPlacement,
  VolumeSlider,
  AudioGainSlider,
  SpeedSlider,
  QualitySlider,
  TimeSlider,
  SliderChapters,
  Menu,
  MenuButton,
  MenuItem,
  MenuPortal,
  MenuItems,
  RadioGroup,
  Radio,
  DEFAULT_AUDIO_GAINS,
  DEFAULT_PLAYBACK_RATES,
  Gesture,
  Captions,
  Poster,
  Time,
  usePlyrLayoutClasses,
  isRemotionProvider,
  isRemotionSrc
};
