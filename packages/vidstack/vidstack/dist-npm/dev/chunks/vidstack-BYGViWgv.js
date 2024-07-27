import { DOMEvent, EventsTarget, fscreen, ViewController, listenEvent, onDispose, signal, peek, isString, isNumber, State, tick, Component, functionThrottle, effect, untrack, functionDebounce, isArray, isKeyboardClick, isKeyboardEvent, waitIdlePeriod, deferredPromise, isUndefined, provideContext, setAttribute, animationFrameThrottle, uppercaseFirstChar, camelToKebabCase, setStyle, computed, prop, method, scoped, noop } from './vidstack-fG_Sx3Q9.js';
import { mediaContext, useMediaContext } from './vidstack-DQ4Fz5gz.js';
import { canOrientScreen, IS_IPHONE, isAudioSrc, canPlayAudioType, isVideoSrc, canPlayVideoType, isHLSSupported, isHLSSrc, isDASHSupported, isDASHSrc, IS_CHROME, IS_IOS, canGoogleCastSrc, canChangeVolume } from './vidstack-C7y2WK8R.js';
import { TimeRange, getTimeRangesStart, getTimeRangesEnd, updateTimeIntervals } from './vidstack-CLRUrTzh.js';
import { isTrackCaptionKind, TextTrackSymbol, TextTrack } from './vidstack-C_Q-YmHq.js';
import { ListSymbol } from './vidstack-sHzLCnVW.js';
import { QualitySymbol } from './vidstack-BYmCj-36.js';
import { coerceToError } from './vidstack-DbBJlz7I.js';
import { preconnect, getRequestCredentials } from './vidstack-n2fuk8wF.js';
import { isHTMLElement, isTouchPinchEvent, setAttributeIfEmpty } from './vidstack-DdUZGy1h.js';
import { round, clampNumber } from './vidstack-Dihypf8P.js';
import { FocusVisibleController } from './vidstack-DvBAQUpx.js';

var _a$1;
const GROUPED_LOG = Symbol("GROUPED_LOG" );
_a$1 = GROUPED_LOG;
const _GroupedLog = class _GroupedLog {
  constructor(logger, level, title, root, parent) {
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root;
    this.parent = parent;
    this[_a$1] = true;
    this.logs = [];
  }
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
let GroupedLog = _GroupedLog;
function isGroupedLog(data) {
  return !!data?.[GROUPED_LOG];
}

class Logger {
  constructor() {
    this._target = null;
  }
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
    this._target = newTarget;
  }
  dispatch(level, ...data) {
    return this._target?.dispatchEvent(
      new DOMEvent("vds-log", {
        bubbles: true,
        composed: true,
        detail: { level, data }
      })
    ) || false;
  }
}

var _a;
class List extends EventsTarget {
  constructor() {
    super(...arguments);
    this._items = [];
    /** @internal */
    this[_a] = false;
  }
  get length() {
    return this._items.length;
  }
  get readonly() {
    return this[ListSymbol._readonly];
  }
  /**
   * Returns the index of the first occurrence of the given item, or -1 if it is not present.
   */
  indexOf(item) {
    return this._items.indexOf(item);
  }
  /**
   * Returns an item matching the given `id`, or `null` if not present.
   */
  getById(id) {
    if (id === "") return null;
    return this._items.find((item) => item.id === id) ?? null;
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this._items];
  }
  [(_a = ListSymbol._readonly, Symbol.iterator)]() {
    return this._items.values();
  }
  /** @internal */
  [ListSymbol._add](item, trigger) {
    const index = this._items.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this._items[index];
        }
      });
    }
    if (this._items.includes(item)) return;
    this._items.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /** @internal */
  [ListSymbol._remove](item, trigger) {
    const index = this._items.indexOf(item);
    if (index >= 0) {
      this[ListSymbol._onRemove]?.(item, trigger);
      this._items.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /** @internal */
  [ListSymbol._reset](trigger) {
    for (const item of [...this._items]) this[ListSymbol._remove](item, trigger);
    this._items = [];
    this[ListSymbol._setReadonly](false, trigger);
    this[ListSymbol._onReset]?.();
  }
  /** @internal */
  [ListSymbol._setReadonly](readonly, trigger) {
    if (this[ListSymbol._readonly] === readonly) return;
    this[ListSymbol._readonly] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
}

const CAN_FULLSCREEN = fscreen.fullscreenEnabled;
class FullscreenController extends ViewController {
  constructor() {
    super(...arguments);
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    this._listening = false;
    this._active = false;
  }
  get active() {
    return this._active;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen, "fullscreenchange", this._onChange.bind(this));
    listenEvent(fscreen, "fullscreenerror", this._onError.bind(this));
    onDispose(this._onDisconnect.bind(this));
  }
  async _onDisconnect() {
    if (CAN_FULLSCREEN) await this.exit();
  }
  _onChange(event) {
    const active = isFullscreen(this.el);
    if (active === this._active) return;
    if (!active) this._listening = false;
    this._active = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  _onError(event) {
    if (!this._listening) return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this._listening = false;
  }
  async enter() {
    try {
      this._listening = true;
      if (!this.el || isFullscreen(this.el)) return;
      assertFullscreenAPI();
      return fscreen.requestFullscreen(this.el);
    } catch (error) {
      this._listening = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el)) return;
    assertFullscreenAPI();
    return fscreen.exitFullscreen();
  }
}
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen.fullscreenElement === host) return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN) return;
  throw Error(
    "[vidstack] fullscreen API is not enabled or supported in this environment" 
  );
}

class ScreenOrientationController extends ViewController {
  constructor() {
    super(...arguments);
    this._type = signal(this._getScreenOrientation());
    this._locked = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this._type();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this._locked();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this._type().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this._type().startsWith("landscape");
  }
  static {
    /**
     * Whether the native Screen Orientation API is available.
     */
    this.supported = canOrientScreen();
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this._onOrientationChange.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this._onOrientationChange.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this._onDisconnect.bind(this));
  }
  async _onDisconnect() {
    if (this.supported && this._locked()) await this.unlock();
  }
  _onOrientationChange(event) {
    this._type.set(this._getScreenOrientation());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this._type),
        lock: this._currentLock
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
    if (peek(this._locked) || this._currentLock === lockType) return;
    this._assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    this._locked.set(true);
    this._currentLock = lockType;
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
    if (!peek(this._locked)) return;
    this._assertScreenOrientationAPI();
    this._currentLock = void 0;
    await screen.orientation.unlock();
    this._locked.set(false);
  }
  _assertScreenOrientationAPI() {
    if (this.supported) return;
    throw Error(
      "[vidstack] screen orientation API is not available" 
    );
  }
  _getScreenOrientation() {
    if (this.supported) return window.screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }
}

function isVideoQualitySrc(src) {
  return !isString(src) && "width" in src && "height" in src && isNumber(src.width) && isNumber(src.height);
}

const mediaState = new State({
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
    return IS_IPHONE && this.mediaType === "video" && (!this.playsInline || !fscreen.fullscreenEnabled && this.fullscreen);
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
  logLevel: "warn" ,
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
const RESET_ON_SRC_QUALITY_CHANGE = /* @__PURE__ */ new Set([
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
const RESET_ON_SRC_CHANGE = /* @__PURE__ */ new Set([
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
  mediaState.reset($media, (prop) => filter.has(prop));
  tick();
}

class MediaRemoteControl {
  constructor(_logger = new Logger() ) {
    this._logger = _logger;
    this._target = null;
    this._player = null;
    this._prevTrackIndex = -1;
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
    this._target = target;
    this._logger?.setTarget(target);
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
    if (this._player) return this._player;
    (target ?? this._target)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this._player = player),
        bubbles: true,
        composed: true
      })
    );
    return this._player;
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this._player = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    this._dispatchRequest("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this._dispatchRequest("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this._dispatchRequest("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this._dispatchRequest("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this._dispatchRequest("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this._dispatchRequest("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this._dispatchRequest("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this._dispatchRequest("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this._dispatchRequest("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this._dispatchRequest("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this._dispatchRequest("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this._dispatchRequest("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this._dispatchRequest("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this._dispatchRequest("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this._dispatchRequest("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this._dispatchRequest("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this._dispatchRequest("media-live-edge-request", trigger);
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
    this._dispatchRequest("media-duration-change-request", trigger, duration);
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
    this._dispatchRequest("media-clip-start-change-request", trigger, startTime);
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
    this._dispatchRequest("media-clip-end-change-request", trigger, endTime);
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
    this._dispatchRequest("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
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
    this._dispatchRequest("media-audio-track-change-request", trigger, index);
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
    this._dispatchRequest("media-quality-change-request", trigger, index);
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
    this._dispatchRequest("media-text-track-change-request", trigger, {
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
    this._dispatchRequest("media-rate-change-request", trigger, rate);
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
    this._dispatchRequest("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this._dispatchRequest("media-resume-controls-request", trigger);
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
    this._dispatchRequest("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.togglePaused.name);
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
      this._noPlayerWarning(this.toggleControls.name);
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
      this._noPlayerWarning(this.toggleMuted.name);
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
      this._noPlayerWarning(this.toggleFullscreen.name);
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
      this._noPlayerWarning(this.togglePictureInPicture.name);
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
      this._noPlayerWarning(this.showCaptions.name);
      return;
    }
    let tracks = player.state.textTracks, index = this._prevTrackIndex;
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
    this._prevTrackIndex = -1;
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.disableCaptions.name);
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this._prevTrackIndex = index;
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.toggleCaptions.name);
      return;
    }
    if (player.state.textTrack) {
      this.disableCaptions();
    } else {
      this.showCaptions();
    }
  }
  userPrefersLoopChange(prefersLoop, trigger) {
    this._dispatchRequest("media-user-loop-change-request", trigger, prefersLoop);
  }
  _dispatchRequest(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component) target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this._player?.el && target instanceof Node && !this._player.el.contains(target);
    target = shouldUsePlayer ? this._target ?? this.getPlayer()?.el : target ?? this._target;
    {
      this._logger?.debugGroup(`\u{1F4E8} dispatching \`${type}\``).labelledLog("Target", target).labelledLog("Player", this._player).labelledLog("Request Event", request).labelledLog("Trigger Event", trigger).dispatch();
    }
    if (this._player) {
      if (type === "media-play-request" && !this._player.state.canLoad) {
        target?.dispatchEvent(request);
      } else {
        this._player.canPlayQueue._enqueue(type, () => target?.dispatchEvent(request));
      }
    } else {
      target?.dispatchEvent(request);
    }
  }
  _noPlayerWarning(method) {
    {
      console.warn(
        `[vidstack] attempted to call \`MediaRemoteControl.${method}\`() that requires player but failed because remote could not find a parent player element from target`
      );
    }
  }
}

class LocalMediaStorage {
  constructor() {
    this.playerId = "vds-player";
    this.mediaId = null;
    this._data = {
      volume: null,
      muted: null,
      audioGain: null,
      time: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null
    };
    this.saveTimeThrottled = functionThrottle(this.saveTime.bind(this), 1e3);
  }
  async getVolume() {
    return this._data.volume;
  }
  async setVolume(volume) {
    this._data.volume = volume;
    this.save();
  }
  async getMuted() {
    return this._data.muted;
  }
  async setMuted(muted) {
    this._data.muted = muted;
    this.save();
  }
  async getTime() {
    return this._data.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this._data.time = !shouldClear ? time : null;
    if (shouldClear || ended) this.saveTime();
    else this.saveTimeThrottled();
  }
  async getLang() {
    return this._data.lang;
  }
  async setLang(lang) {
    this._data.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this._data.captions;
  }
  async setCaptions(enabled) {
    this._data.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this._data.rate;
  }
  async setPlaybackRate(rate) {
    this._data.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this._data.audioGain;
  }
  async setAudioGain(gain) {
    this._data.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this._data.quality;
  }
  async setVideoQuality(quality) {
    this._data.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this._data = {
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
    if (!this.playerId) return;
    const data = JSON.stringify({ ...this._data, time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTime() {
    if (!this.mediaId) return;
    const data = (this._data.time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
}

class NativeTextRenderer {
  constructor() {
    this.priority = 0;
    this._display = true;
    this._video = null;
    this._track = null;
    this._tracks = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this._video = video;
    if (video) video.textTracks.onchange = this._onChange.bind(this);
  }
  addTrack(track) {
    this._tracks.add(track);
    this._attachTrack(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol._native]?.remove?.();
    track[TextTrackSymbol._native] = null;
    this._tracks.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol._native];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this._track = track;
  }
  setDisplay(display) {
    this._display = display;
    this._onChange();
  }
  detach() {
    if (this._video) this._video.textTracks.onchange = null;
    for (const track of this._tracks) this.removeTrack(track);
    this._tracks.clear();
    this._video = null;
    this._track = null;
  }
  _attachTrack(track) {
    if (!this._video) return;
    const el = track[TextTrackSymbol._native] ??= this._createTrackElement(track);
    if (isHTMLElement(el)) {
      this._video.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  _createTrackElement(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this._copyCues(track, el.track);
    }
    return el;
  }
  _copyCues(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length) return;
    for (const cue of track.cues) native.addCue(cue);
  }
  _onChange(event) {
    for (const track of this._tracks) {
      const native = track[TextTrackSymbol._native];
      if (!native) continue;
      if (!this._display) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing) this._copyCues(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this._media = _media;
    this._video = null;
    this._renderers = [];
    this._nativeDisplay = false;
    this._nativeRenderer = null;
    this._customRenderer = null;
    const textTracks = _media.textTracks;
    this._textTracks = textTracks;
    effect(this._watchControls.bind(this));
    onDispose(this._detach.bind(this));
    listenEvent(textTracks, "add", this._onAddTrack.bind(this));
    listenEvent(textTracks, "remove", this._onRemoveTrack.bind(this));
    listenEvent(textTracks, "mode-change", this._update.bind(this));
  }
  _watchControls() {
    const { nativeControls } = this._media.$state;
    this._nativeDisplay = nativeControls();
    this._update();
  }
  add(renderer) {
    this._renderers.push(renderer);
    untrack(this._update.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this._renderers.splice(this._renderers.indexOf(renderer), 1);
    untrack(this._update.bind(this));
  }
  /** @internal */
  _attachVideo(video) {
    requestAnimationFrame(() => {
      this._video = video;
      if (video) {
        this._nativeRenderer = new NativeTextRenderer();
        this._nativeRenderer.attach(video);
        for (const track of this._textTracks) this._addNativeTrack(track);
      }
      this._update();
    });
  }
  _addNativeTrack(track) {
    if (!isTrackCaptionKind(track)) return;
    this._nativeRenderer?.addTrack(track);
  }
  _removeNativeTrack(track) {
    if (!isTrackCaptionKind(track)) return;
    this._nativeRenderer?.removeTrack(track);
  }
  _onAddTrack(event) {
    this._addNativeTrack(event.detail);
  }
  _onRemoveTrack(event) {
    this._removeNativeTrack(event.detail);
  }
  _update() {
    const currentTrack = this._textTracks.selected;
    if (this._video && (this._nativeDisplay || currentTrack?.[TextTrackSymbol._nativeHLS])) {
      this._customRenderer?.changeTrack(null);
      this._nativeRenderer?.setDisplay(true);
      this._nativeRenderer?.changeTrack(currentTrack);
      return;
    }
    this._nativeRenderer?.setDisplay(false);
    this._nativeRenderer?.changeTrack(null);
    if (!currentTrack) {
      this._customRenderer?.changeTrack(null);
      return;
    }
    const customRenderer = this._renderers.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this._video));
    if (this._customRenderer !== customRenderer) {
      this._customRenderer?.detach();
      customRenderer?.attach(this._video);
      this._customRenderer = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  _detach() {
    this._nativeRenderer?.detach();
    this._nativeRenderer = null;
    this._customRenderer?.detach();
    this._customRenderer = null;
  }
}

class TextTrackList extends List {
  constructor() {
    super();
    this._canLoad = false;
    this._defaults = {};
    this._storage = null;
    this._preferredLang = null;
    this._selectTracks = functionDebounce(async () => {
      if (!this._canLoad) return;
      if (!this._preferredLang && this._storage) {
        this._preferredLang = await this._storage.getLang();
      }
      const showCaptions = await this._storage?.getCaptions(), kinds = [
        ["captions", "subtitles"],
        "chapters",
        "descriptions",
        "metadata"
      ];
      for (const kind of kinds) {
        const tracks = this.getByKind(kind);
        if (tracks.find((t) => t.mode === "showing")) continue;
        const preferredTrack = this._preferredLang ? tracks.find((track2) => track2.language === this._preferredLang) : null;
        const defaultTrack = isArray(kind) ? this._defaults[kind.find((kind2) => this._defaults[kind2]) || ""] : this._defaults[kind];
        const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
        if (track && (!isCaptionsKind || showCaptions !== false)) {
          track.mode = "showing";
          if (isCaptionsKind) this._saveCaptionsTrack(track);
        }
      }
    }, 300);
    this._pendingRemoval = null;
    this._onTrackModeChangeBind = this._onTrackModeChange.bind(this);
  }
  get selected() {
    const track = this._items.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this._preferredLang;
  }
  set preferredLang(lang) {
    this._preferredLang = lang;
    this._saveLang(lang);
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init), kind = init.kind === "captions" || init.kind === "subtitles" ? "captions" : init.kind;
    if (this._defaults[kind] && init.default) delete init.default;
    track.addEventListener("mode-change", this._onTrackModeChangeBind);
    this[ListSymbol._add](track, trigger);
    track[TextTrackSymbol._crossOrigin] = this[TextTrackSymbol._crossOrigin];
    if (this._canLoad) track[TextTrackSymbol._canLoad]();
    if (init.default) this._defaults[kind] = track;
    this._selectTracks();
    return this;
  }
  remove(track, trigger) {
    this._pendingRemoval = track;
    if (!this._items.includes(track)) return;
    if (track === this._defaults[track.kind]) delete this._defaults[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol._onModeChange] = null;
    track.removeEventListener("mode-change", this._onTrackModeChangeBind);
    this[ListSymbol._remove](track, trigger);
    this._pendingRemoval = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this._items]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this._items.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [(TextTrackSymbol._canLoad)]() {
    if (this._canLoad) return;
    for (const track of this._items) track[TextTrackSymbol._canLoad]();
    this._canLoad = true;
    this._selectTracks();
  }
  _onTrackModeChange(event) {
    const track = event.detail;
    if (this._storage && isTrackCaptionKind(track) && track !== this._pendingRemoval) {
      this._saveCaptionsTrack(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this._items) {
        if (t.mode === "showing" && t != track && kinds.includes(t.kind)) {
          t.mode = "disabled";
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
  _saveCaptionsTrack(track) {
    if (track.mode !== "disabled") {
      this._saveLang(track.language);
    }
    this._storage?.setCaptions?.(track.mode === "showing");
  }
  _saveLang(lang) {
    this._storage?.setLang?.(this._preferredLang = lang);
  }
  setStorage(storage) {
    this._storage = storage;
  }
}

const SELECTED = Symbol("SELECTED" );
class SelectList extends List {
  get selected() {
    return this._items.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this._items.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol._onRemove](item, trigger) {
    this[ListSymbol._select](item, false, trigger);
  }
  /** @internal */
  [ListSymbol._add](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly) return;
        this[ListSymbol._onUserSelect]?.();
        this[ListSymbol._select](item, selected);
      }
    });
    super[ListSymbol._add](item, trigger);
  }
  /** @internal */
  [ListSymbol._select](item, selected, trigger) {
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
}

class AudioTrackList extends SelectList {
}

class VideoQualityList extends SelectList {
  constructor() {
    super(...arguments);
    this._auto = false;
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
    this.switch = "current";
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this._auto || this.readonly;
  }
  /** @internal */
  [(ListSymbol._onUserSelect)]() {
    this[QualitySymbol._setAuto](false);
  }
  /** @internal */
  [ListSymbol._onReset](trigger) {
    this[QualitySymbol._enableAuto] = void 0;
    this[QualitySymbol._setAuto](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this._auto || !this[QualitySymbol._enableAuto]) return;
    this[QualitySymbol._enableAuto]?.(trigger);
    this[QualitySymbol._setAuto](true, trigger);
  }
  getBySrc(src) {
    return this._items.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol._setAuto](auto, trigger) {
    if (this._auto === auto) return;
    this._auto = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
}

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
  return element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
function isHTMLIFrameElement(element) {
  return element instanceof HTMLIFrameElement;
}

class MediaPlayerController extends ViewController {
}

const MEDIA_KEY_SHORTCUTS = {
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
const MODIFIER_KEYS = /* @__PURE__ */ new Set(["Shift", "Alt", "Meta", "Ctrl"]), BUTTON_SELECTORS = 'button, [role="button"]', IGNORE_SELECTORS = 'input, textarea, select, [contenteditable], [role^="menuitem"], [role="timer"]';
class MediaKeyboardController extends MediaPlayerController {
  constructor(_media) {
    super();
    this._media = _media;
    this._timeSlider = null;
  }
  onConnect() {
    effect(this._onTargetChange.bind(this));
  }
  _onTargetChange() {
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
      listenEvent(target, "keyup", this._onKeyUp.bind(this));
      listenEvent(target, "keydown", this._onKeyDown.bind(this));
      listenEvent(target, "keydown", this._onPreventVideoKeys.bind(this), { capture: true });
    });
  }
  _onKeyUp(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this._getMatchingMethod(event);
    if (!isString(value) && !isArray(value)) {
      value?.onKeyUp?.({
        event,
        player: this._media.player,
        remote: this._media.remote
      });
      value?.callback?.(event, this._media.remote);
      return;
    }
    if (method?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this._timeSlider) {
        this._forwardTimeKeyboardEvent(event, method === "seekForward");
        this._timeSlider = null;
      } else {
        this._media.remote.seek(this._seekTotal, event);
        this._seekTotal = void 0;
      }
    }
    if (method?.startsWith("volume")) {
      const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
      volumeSlider?.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: method === "volumeUp" ? "Up" : "Down",
          shiftKey: event.shiftKey,
          trigger: event
        })
      );
    }
  }
  _onKeyDown(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key)) return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this._getMatchingMethod(event), isNumberPress = !event.metaKey && /^[0-9]$/.test(event.key);
    if (!isString(value) && !isArray(value) && !isNumberPress) {
      value?.onKeyDown?.({
        event,
        player: this._media.player,
        remote: this._media.remote
      });
      value?.callback?.(event, this._media.remote);
      return;
    }
    if (!method && isNumberPress) {
      event.preventDefault();
      event.stopPropagation();
      this._media.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method) return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this._seeking(event, method, method === "seekForward");
        break;
      case "volumeUp":
      case "volumeDown":
        const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
        if (volumeSlider) {
          volumeSlider.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: method === "volumeUp" ? "Up" : "Down",
              shiftKey: event.shiftKey,
              trigger: event
            })
          );
        } else {
          const value2 = event.shiftKey ? 0.1 : 0.05;
          this._media.remote.changeVolume(
            this.$state.volume() + (method === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this._media.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this._media.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this._media.remote[method]?.(event);
    }
    this.$state.lastKeyboardAction.set({
      action: method,
      event
    });
  }
  _onPreventVideoKeys(event) {
    if (isHTMLMediaElement(event.target) && this._getMatchingMethod(event).method) {
      event.preventDefault();
    }
  }
  _getMatchingMethod(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this._media.ariaKeys
    };
    const method = Object.keys(keyShortcuts).find((method2) => {
      const value = keyShortcuts[method2], keys = isArray(value) ? value.join(" ") : isString(value) ? value : value?.keys;
      const combinations = (isArray(keys) ? keys : keys?.split(" "))?.map(
        (key) => replaceSymbolKeys(key).replace(/Control/g, "Ctrl").split("+")
      );
      return combinations?.some((combo) => {
        const modifierKeys = new Set(combo.filter((key) => MODIFIER_KEYS.has(key)));
        for (const modKey of MODIFIER_KEYS) {
          const modKeyProp = modKey.toLowerCase() + "Key";
          if (!modifierKeys.has(modKey) && event[modKeyProp]) {
            return false;
          }
        }
        return combo.every((key) => {
          return MODIFIER_KEYS.has(key) ? event[key.toLowerCase() + "Key"] : event.key === key.replace("Space", " ");
        });
      });
    });
    return {
      method,
      value: method ? keyShortcuts[method] : null
    };
  }
  _calcSeekAmount(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this._seekTotal = Math.max(
      0,
      Math.min(
        (this._seekTotal ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  _forwardTimeKeyboardEvent(event, forward) {
    this._timeSlider?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  _seeking(event, type, forward) {
    if (!this.$state.canSeek()) return;
    if (!this._timeSlider) {
      this._timeSlider = this.el.querySelector("[data-media-time-slider]");
    }
    if (this._timeSlider) {
      this._forwardTimeKeyboardEvent(event, forward);
    } else {
      this._media.remote.seeking(this._calcSeekAmount(event, type), event);
    }
  }
}
const SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key) {
  return key.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}

class MediaControls extends MediaPlayerController {
  constructor() {
    super(...arguments);
    this._idleTimer = -2;
    this._pausedTracking = false;
    this._hideOnMouseLeave = signal(false);
    this._isMouseOutside = signal(false);
    this._focusedItem = null;
    this._canIdle = signal(true);
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    this.defaultDelay = 2e3;
  }
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return this._canIdle();
  }
  set canIdle(canIdle) {
    this._canIdle.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this._hideOnMouseLeave() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this._hideOnMouseLeave.set(hide);
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
    this._clearIdleTimer();
    if (!this._pausedTracking) {
      this._changeVisibility(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this._clearIdleTimer();
    if (!this._pausedTracking) {
      this._changeVisibility(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this._pausedTracking = true;
    this._clearIdleTimer();
    this._changeVisibility(true, 0, trigger);
  }
  resume(trigger) {
    this._pausedTracking = false;
    if (this.$state.paused()) return;
    this._changeVisibility(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this._init.bind(this));
  }
  _init() {
    const { viewType } = this.$state;
    if (!this._canIdle()) return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this._watchMouse.bind(this));
    effect(this._watchPaused.bind(this));
    const onPlay = this._onPlay.bind(this), onPause = this._onPause.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  _watchMouse() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine") return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this._isMouseOutside()) {
      effect(() => {
        if (!paused()) this.listen("pointermove", this._onStopIdle.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this._onMouseEnter.bind(this));
      this.listen("mouseleave", this._onMouseLeave.bind(this));
    }
  }
  _watchPaused() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started()) return;
    const onStopIdle = this._onStopIdle.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  _onPlay(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  _onPause(event) {
    this.show(0, event);
  }
  _onMouseEnter(event) {
    this._isMouseOutside.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  _onMouseLeave(event) {
    this._isMouseOutside.set(true);
    this.hide(0, event);
  }
  _clearIdleTimer() {
    window.clearTimeout(this._idleTimer);
    this._idleTimer = -1;
  }
  _onStopIdle(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this._pausedTracking || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this._focusedItem = null;
      } else if (this._focusedItem) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this._focusedItem?.focus();
          this._focusedItem = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  _changeVisibility(visible, delay, trigger) {
    if (delay === 0) {
      this._onChange(visible, trigger);
      return;
    }
    this._idleTimer = window.setTimeout(() => {
      if (!this.scope) return;
      this._onChange(visible && !this._pausedTracking, trigger);
    }, delay);
  }
  _onChange(visible, trigger) {
    if (this.$state.controlsVisible() === visible) return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this._focusedItem = document.activeElement;
      requestAnimationFrame(() => {
        this.el?.focus({ preventScroll: true });
      });
    }
    this.dispatch("controls-change", {
      detail: visible,
      trigger
    });
  }
}

class AudioProviderLoader {
  constructor() {
    this.name = "audio";
  }
  canPlay(src) {
    if (!isAudioSrc(src)) return false;
    return !isString(src.src) || src.type === "?" || canPlayAudioType(this.target, src.type);
  }
  mediaType() {
    return "audio";
  }
  async load(ctx) {
    if (!this.target) {
      throw Error(
        "[vidstack] `<audio>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import('../providers/vidstack-audio.js')).AudioProvider(this.target, ctx);
  }
}

class VideoProviderLoader {
  constructor() {
    this.name = "video";
  }
  canPlay(src) {
    if (!isVideoSrc(src)) return false;
    return !isString(src.src) || src.type === "?" || canPlayVideoType(this.target, src.type);
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import('../providers/vidstack-video.js')).VideoProvider(this.target, ctx);
  }
}

class HLSProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    this.name = "hls";
  }
  static {
    this.supported = isHLSSupported();
  }
  canPlay(src) {
    return HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import('../providers/vidstack-hls.js')).HLSProvider(this.target, context);
  }
}

class DASHProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    this.name = "dash";
  }
  static {
    this.supported = isDASHSupported();
  }
  canPlay(src) {
    return DASHProviderLoader.supported && isDASHSrc(src);
  }
  async load(context) {
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import('../providers/vidstack-dash.js')).DASHProvider(this.target, context);
  }
}

class VimeoProviderLoader {
  constructor() {
    this.name = "vimeo";
  }
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
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import('../providers/vidstack-vimeo.js')).VimeoProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId, getVimeoVideoInfo } = await import('./vidstack-krOAtKMi.js');
    if (!isString(src.src)) return null;
    const { videoId, hash } = resolveVimeoVideoId(src.src);
    if (videoId) {
      return getVimeoVideoInfo(videoId, abort, hash).then((info) => info ? info.poster : null);
    }
    return null;
  }
}

class YouTubeProviderLoader {
  constructor() {
    this.name = "youtube";
  }
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
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import('../providers/vidstack-youtube.js')).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import('./vidstack-Zc3I7oOd.js');
    const videoId = isString(src.src) && resolveYouTubeVideoId(src.src);
    if (videoId) return findYouTubePoster(videoId, abort);
    return null;
  }
}

const MEDIA_ATTRIBUTES = Symbol("MEDIA_ATTRIBUTES" );
const mediaAttributes = [
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

const mediaPlayerProps = {
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
  logLevel: "warn" ,
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

const MEDIA_EVENTS = [
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
] ;
class MediaEventsLogger extends MediaPlayerController {
  constructor(_media) {
    super();
    this._media = _media;
  }
  onConnect() {
    const handler = this._onMediaEvent.bind(this);
    for (const eventType of MEDIA_EVENTS) this.listen(eventType, handler);
  }
  _onMediaEvent(event) {
    this._media.logger?.debugGroup(`\u{1F4E1} dispatching \`${event.type}\``).labelledLog("Media Store", { ...this.$state }).labelledLog("Event", event).dispatch();
  }
}

class MediaLoadController extends MediaPlayerController {
  constructor(_type, _callback) {
    super();
    this._type = _type;
    this._callback = _callback;
  }
  async onAttach(el) {
    const load = this.$props[this._type]();
    if (load === "eager") {
      requestAnimationFrame(this._callback);
    } else if (load === "idle") {
      waitIdlePeriod(this._callback);
    } else if (load === "visible") {
      let dispose, observer = new IntersectionObserver((entries) => {
        if (!this.scope) return;
        if (entries[0].isIntersecting) {
          dispose?.();
          dispose = void 0;
          this._callback();
        }
      });
      observer.observe(el);
      dispose = onDispose(() => observer.disconnect());
    }
  }
}

let seenAutoplayWarning = false;
class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this._handle = _handle;
    this._media = _media;
    this._notify = (type, ...init) => {
      this._handle(
        new DOMEvent(type, {
          detail: init?.[0],
          trigger: init?.[1]
        })
      );
    };
  }
  async _ready(info, trigger) {
    return untrack(async () => {
      const { logger } = this._media, {
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
      } = this._media.$state;
      if (canPlay()) return;
      const detail = {
        duration: info?.duration ?? duration(),
        seekable: info?.seekable ?? seekable(),
        buffered: info?.buffered ?? buffered(),
        provider: this._media.$provider()
      };
      this._notify("can-play", detail, trigger);
      tick();
      {
        logger?.infoGroup("-~-~-~-~-~-~- \u2705 MEDIA READY -~-~-~-~-~-~-").labelledLog("Media", this._media).labelledLog("Trigger Event", trigger).dispatch();
      }
      let provider = this._media.$provider(), { storage, qualities } = this._media, { muted, volume, clipStartTime, playbackRate } = this._media.$props;
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
        await this._attemptAutoplay(trigger);
      } else if (storageTime && storageTime > 0) {
        this._notify("started", void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
  async _attemptAutoplay(trigger) {
    const {
      player,
      $state: { autoPlaying, muted }
    } = this._media;
    autoPlaying.set(true);
    const attemptEvent = new DOMEvent("auto-play-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
      if (!seenAutoplayWarning) {
        const muteMsg = !muted() ? " Attempting with volume muted will most likely resolve the issue." : "";
        this._media.logger?.errorGroup("[vidstack] auto-play request failed").labelledLog(
          "Message",
          `Autoplay was requested but failed most likely due to browser autoplay policies.${muteMsg}`
        ).labelledLog("Trigger Event", trigger).labelledLog("Error", error).labelledLog("See", "https://developer.chrome.com/blog/autoplay").dispatch();
        seenAutoplayWarning = true;
      }
    }
  }
}

class Queue {
  constructor() {
    this._queue = /* @__PURE__ */ new Map();
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  _enqueue(key, item) {
    this._queue.set(key, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  _serve(key) {
    const value = this._peek(key);
    this._queue.delete(key);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  _peek(key) {
    return this._queue.get(key);
  }
  /**
   * Removes queued item under the given `key`.
   */
  _delete(key) {
    this._queue.delete(key);
  }
  /**
   * Clear all items in the queue.
   */
  _clear() {
    this._queue.clear();
  }
}

class RequestQueue {
  constructor() {
    this._serving = false;
    this._pending = deferredPromise();
    this._queue = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get _size() {
    return this._queue.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get _isServing() {
    return this._serving;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async _waitForFlush() {
    if (this._serving) return;
    await this._pending.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  _enqueue(key, callback) {
    if (this._serving) {
      callback();
      return;
    }
    this._queue.delete(key);
    this._queue.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  _serve(key) {
    this._queue.get(key)?.();
    this._queue.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  _start() {
    this._flush();
    this._serving = true;
    if (this._queue.size > 0) this._flush();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  _stop() {
    this._serving = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  _reset() {
    this._stop();
    this._queue.clear();
    this._release();
  }
  _flush() {
    for (const key of this._queue.keys()) this._serve(key);
    this._release();
  }
  _release() {
    this._pending.resolve();
    this._pending = deferredPromise();
  }
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this._stateMgr = _stateMgr;
    this._request = _request;
    this._media = _media;
    this._providerQueue = new RequestQueue();
    this._wasPIPActive = false;
    this._$provider = _media.$provider;
    this._controls = new MediaControls();
    this._fullscreen = new FullscreenController();
    this._orientation = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this._onFullscreenChange.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this._handleRequest.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this._attachLoadPlayListener();
    effect(this._watchProvider.bind(this));
    effect(this._watchControlsDelayChange.bind(this));
    effect(this._watchAudioGainSupport.bind(this));
    effect(this._watchAirPlaySupport.bind(this));
    effect(this._watchGoogleCastSupport.bind(this));
    effect(this._watchFullscreenSupport.bind(this));
    effect(this._watchPiPSupport.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen()) this._exitFullscreen("prefer-media", destroyEvent);
      if (pictureInPicture()) this._exitPictureInPicture(destroyEvent);
    } catch (e) {
    }
    this._providerQueue._reset();
  }
  _attachLoadPlayListener() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad()) return;
    const off = this.listen("media-play-request", (event) => {
      this._handleLoadPlayStrategy(event);
      off();
    });
  }
  _watchProvider() {
    const provider = this._$provider(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this._providerQueue._start();
    }
    return () => {
      this._providerQueue._stop();
    };
  }
  _handleRequest(event) {
    event.stopPropagation();
    if (event.defaultPrevented) return;
    {
      this._media.logger?.infoGroup(`\u{1F4EC} received \`${event.type}\``).labelledLog("Request", event).dispatch();
    }
    if (!this[event.type]) return;
    if (peek(this._$provider)) {
      this[event.type](event);
    } else {
      this._providerQueue._enqueue(event.type, () => {
        if (peek(this._$provider)) this[event.type](event);
      });
    }
  }
  async _play(trigger) {
    const { canPlay, paused, autoPlaying } = this.$state;
    if (this._handleLoadPlayStrategy(trigger)) return;
    if (!peek(paused)) return;
    if (trigger) this._request._queue._enqueue("media-play-request", trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider = peek(this._$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.play();
    } catch (error) {
      this._logError("play request failed", error, trigger);
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoPlay = isAutoPlaying;
      this._stateMgr._handle(errorEvent);
      throw error;
    }
  }
  _handleLoadPlayStrategy(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event);
      this._providerQueue._enqueue("media-play-request", async () => {
        try {
          await this._play(event);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async _pause(trigger) {
    const { canPlay, paused } = this.$state;
    if (peek(paused)) return;
    if (trigger) {
      this._request._queue._enqueue("media-pause-request", trigger);
    }
    try {
      const provider = peek(this._$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.pause();
    } catch (error) {
      this._request._queue._delete("media-pause-request");
      {
        this._logError("pause request failed", error, trigger);
      }
      throw error;
    }
  }
  _setAudioGain(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain) return;
    const provider = this._$provider();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this._request._queue._enqueue("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  _seekToLiveEdge(trigger) {
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek())) return;
    const provider = peek(this._$provider);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    if (trigger) this._request._queue._enqueue("media-seek-request", trigger);
    const end = seekableEnd() - 2;
    provider.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  async _enterFullscreen(target = "prefer-media", trigger) {
    const adapter = this._getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active) return;
    if (peek(this.$state.pictureInPicture)) {
      this._wasPIPActive = true;
      await this._exitPictureInPicture(trigger);
    }
    if (trigger) {
      this._request._queue._enqueue("media-enter-fullscreen-request", trigger);
    }
    return adapter.enter();
  }
  async _exitFullscreen(target = "prefer-media", trigger) {
    const adapter = this._getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active) return;
    if (trigger) {
      this._request._queue._enqueue("media-exit-fullscreen-request", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this._wasPIPActive && peek(this.$state.canPictureInPicture)) {
        await this._enterPictureInPicture();
      }
      return result;
    } finally {
      this._wasPIPActive = false;
    }
  }
  _getFullscreenAdapter(target) {
    const provider = peek(this._$provider);
    return target === "prefer-media" && this._fullscreen.supported || target === "media" ? this._fullscreen : provider?.fullscreen;
  }
  async _enterPictureInPicture(trigger) {
    this._throwIfPIPNotSupported();
    if (this.$state.pictureInPicture()) return;
    if (trigger) {
      this._request._queue._enqueue("media-enter-pip-request", trigger);
    }
    return await this._$provider().pictureInPicture.enter();
  }
  async _exitPictureInPicture(trigger) {
    this._throwIfPIPNotSupported();
    if (!this.$state.pictureInPicture()) return;
    if (trigger) {
      this._request._queue._enqueue("media-exit-pip-request", trigger);
    }
    return await this._$provider().pictureInPicture.exit();
  }
  _throwIfPIPNotSupported() {
    if (this.$state.canPictureInPicture()) return;
    throw Error(
      `[vidstack] picture-in-picture is not currently available` 
    );
  }
  _watchControlsDelayChange() {
    this._controls.defaultDelay = this.$props.controlsDelay();
  }
  _watchAudioGainSupport() {
    const { canSetAudioGain } = this.$state, supported = !!this._$provider()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  _watchAirPlaySupport() {
    const { canAirPlay } = this.$state, supported = !!this._$provider()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  _watchGoogleCastSupport() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
    canGoogleCast.set(supported);
  }
  _watchFullscreenSupport() {
    const { canFullscreen } = this.$state, supported = this._fullscreen.supported || !!this._$provider()?.fullscreen?.supported;
    canFullscreen.set(supported);
  }
  _watchPiPSupport() {
    const { canPictureInPicture } = this.$state, supported = !!this._$provider()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event) {
    try {
      await this._requestAirPlay(event);
    } catch (error) {
    }
  }
  async _requestAirPlay(trigger) {
    try {
      const adapter = this._$provider()?.airPlay;
      if (!adapter?.supported) {
        throw Error(true ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this._request._queue._enqueue("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this._request._queue._delete("media-airplay-request");
      {
        this._logError("airplay request failed", error, trigger);
      }
      throw error;
    }
  }
  async ["media-google-cast-request"](event) {
    try {
      await this._requestGoogleCast(event);
    } catch (error) {
    }
  }
  async _requestGoogleCast(trigger) {
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
      if (!this._googleCastLoader) {
        const $module = await import('./vidstack-DXjbW6-B.js');
        this._googleCastLoader = new $module.GoogleCastLoader();
      }
      await this._googleCastLoader.prompt(this._media);
      if (trigger) {
        this._request._queue._enqueue("media-google-cast-request", trigger);
      }
      const isConnecting = peek(this.$state.remotePlaybackState) !== "disconnected";
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime)
        });
      }
      this.$state.remotePlaybackLoader.set(isConnecting ? this._googleCastLoader : null);
    } catch (error) {
      this._request._queue._delete("media-google-cast-request");
      {
        this._logError("google cast request failed", error, trigger);
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
    const { logger, audioTracks } = this._media;
    if (audioTracks.readonly) {
      {
        logger?.warnGroup(`[vidstack] attempted to change audio track but it is currently read-only`).labelledLog("Request Event", event).dispatch();
      }
      return;
    }
    const index = event.detail, track = audioTracks[index];
    if (track) {
      const key = event.type;
      this._request._queue._enqueue(key, event);
      track.selected = true;
    } else {
      logger?.warnGroup("[vidstack] failed audio track change request (invalid index)").labelledLog("Audio Tracks", audioTracks.toArray()).labelledLog("Index", index).labelledLog("Request Event", event).dispatch();
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this._enterFullscreen(event.detail, event);
    } catch (error) {
      this._onFullscreenError(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this._exitFullscreen(event.detail, event);
    } catch (error) {
      this._onFullscreenError(error, event);
    }
  }
  async _onFullscreenChange(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || lockType === "none" || !this._orientation.supported) return;
    if (isFullscreen) {
      if (this._orientation.locked) return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this._orientation.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  _onFullscreenError(error, request) {
    {
      this._logError("fullscreen request failed", error, request);
    }
    this._stateMgr._handle(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    const key = event.type;
    try {
      this._request._queue._enqueue(key, event);
      await this._orientation.lock(event.detail);
    } catch (error) {
      this._request._queue._delete(key);
      {
        this._logError("failed to lock screen orientation", error, event);
      }
    }
  }
  async ["media-orientation-unlock-request"](event) {
    const key = event.type;
    try {
      this._request._queue._enqueue(key, event);
      await this._orientation.unlock();
    } catch (error) {
      this._request._queue._delete(key);
      {
        this._logError("failed to unlock screen orientation", error, event);
      }
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this._enterPictureInPicture(event);
    } catch (error) {
      this._onPictureInPictureError(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this._exitPictureInPicture(event);
    } catch (error) {
      this._onPictureInPictureError(error, event);
    }
  }
  _onPictureInPictureError(error, request) {
    {
      this._logError("pip request failed", error, request);
    }
    this._stateMgr._handle(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek()) return;
    this._request._queue._enqueue("media-seek-request", event);
    try {
      this._seekToLiveEdge();
    } catch (error) {
      this._request._queue._delete("media-seek-request");
      {
        this._logError("seek to live edge fail", error, event);
      }
    }
  }
  async ["media-loop-request"](event) {
    try {
      this._request._looping = true;
      this._request._replaying = true;
      await this._play(event);
    } catch (error) {
      this._request._looping = false;
    }
  }
  ["media-user-loop-change-request"](event) {
    this.$state.userPrefersLoop.set(event.detail);
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused()) return;
    try {
      await this._pause(event);
    } catch (error) {
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused()) return;
    try {
      await this._play(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate()) return;
    const provider = this._$provider();
    if (!provider?.setPlaybackRate) return;
    this._request._queue._enqueue("media-rate-change-request", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-audio-gain-change-request"](event) {
    try {
      this._setAudioGain(event.detail, event);
    } catch (e) {
    }
  }
  ["media-quality-change-request"](event) {
    const { qualities, storage, logger } = this._media;
    if (qualities.readonly) {
      {
        logger?.warnGroup(`[vidstack] attempted to change video quality but it is currently read-only`).labelledLog("Request Event", event).dispatch();
      }
      return;
    }
    this._request._queue._enqueue("media-quality-change-request", event);
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
      } else {
        logger?.warnGroup("[vidstack] failed quality change request (invalid index)").labelledLog("Qualities", qualities.toArray()).labelledLog("Index", index).labelledLog("Request Event", event).dispatch();
      }
    }
  }
  ["media-pause-controls-request"](event) {
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._controls.pause(event);
  }
  ["media-resume-controls-request"](event) {
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._controls.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event.detail;
    if (ended()) this._request._replaying = true;
    const key = event.type;
    this._request._seeking = false;
    this._request._queue._delete(key);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek()) return;
    this._request._queue._enqueue(key, event);
    this._$provider().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this.$state.seeking.set(true);
    this._request._seeking = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad()) return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._stateMgr._handle(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event) {
    if (this.$state.canLoadPoster()) return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._stateMgr._handle(this.createEvent("can-load-poster"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this._media.textTracks[index];
    if (track) {
      const key = event.type;
      this._request._queue._enqueue(key, event);
      track.setMode(mode, event);
    } else {
      this._media.logger?.warnGroup("[vidstack] failed text track change request (invalid index)").labelledLog("Text Tracks", this._media.textTracks.toArray()).labelledLog("Index", index).labelledLog("Request Event", event).dispatch();
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted()) return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._$provider().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted()) return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._media.$provider().setMuted(false);
    if (volume() === 0) {
      this._request._queue._enqueue(key, event);
      this._$provider().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume) return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._$provider().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this._request._queue._enqueue(key, event);
      this._$provider().setMuted(false);
    }
  }
  _logError(title, error, request) {
    this._media.logger?.errorGroup(`[vidstack] ${title}`).labelledLog("Error", error).labelledLog("Media Context", { ...this._media }).labelledLog("Trigger Event", request).dispatch();
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay) return;
  throw Error(
    `[vidstack] media is not ready - wait for \`can-play\` event.` 
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported) return;
  throw Error(
    `[vidstack] fullscreen is not currently available on target \`${target}\`` 
  );
}
class MediaRequestContext {
  constructor() {
    this._seeking = false;
    this._looping = false;
    this._replaying = false;
    this._queue = new Queue();
  }
}

const TRACKED_EVENT = /* @__PURE__ */ new Set([
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

class MediaStateManager extends MediaPlayerController {
  constructor(_request, _media) {
    super();
    this._request = _request;
    this._media = _media;
    this._trackedEvents = /* @__PURE__ */ new Map();
    this._clipEnded = false;
    this._playedIntervals = [];
    this._playedInterval = [-1, -1];
    this._firingWaiting = false;
    this._isPlayingOnDisconnect = false;
    this._stopQualityResizeEffect = null;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, realCurrentTime, paused } = this.$state;
        seeking.set(true);
        realCurrentTime.set(event.detail);
        this._satisfyRequest("media-seeking-request", event);
        if (paused()) {
          this._waitingTrigger = event;
          this._fireWaiting();
        }
        this._playedInterval = [-1, -1];
      },
      150,
      { leading: true }
    );
    this._fireWaiting = functionDebounce(() => {
      if (!this._waitingTrigger) return;
      this._firingWaiting = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this._waitingTrigger });
      this._trackedEvents.set("waiting", event);
      this.dispatch(event);
      this._waitingTrigger = void 0;
      this._firingWaiting = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this._watchCanSetVolume.bind(this));
    this._addTextTrackListeners();
    this._addQualityListeners();
    this._addAudioTrackListeners();
    this._resumePlaybackOnConnect();
    onDispose(this._pausePlaybackOnDisconnect.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this._media;
    audioTracks[ListSymbol._reset]();
    qualities[ListSymbol._reset]();
    textTracks[ListSymbol._reset]();
    this._stopWatchingQualityResize();
  }
  _handle(event) {
    if (!this.scope) return;
    const type = event.type;
    untrack(() => this[event.type]?.(event));
    {
      if (TRACKED_EVENT.has(type)) this._trackedEvents.set(type, event);
      this.dispatch(event);
    }
  }
  _resumePlaybackOnConnect() {
    if (!this._isPlayingOnDisconnect) return;
    requestAnimationFrame(() => {
      if (!this.scope) return;
      this._media.remote.play(new DOMEvent("dom-connect"));
    });
    this._isPlayingOnDisconnect = false;
  }
  _pausePlaybackOnDisconnect() {
    if (this._isPlayingOnDisconnect) return;
    this._isPlayingOnDisconnect = !this.$state.paused();
    this._media.$provider()?.pause();
  }
  _resetTracking() {
    this._stopWaiting();
    this._clipEnded = false;
    this._request._replaying = false;
    this._request._looping = false;
    this._firingWaiting = false;
    this._waitingTrigger = void 0;
    this._trackedEvents.clear();
  }
  _satisfyRequest(request, event) {
    const requestEvent = this._request._queue._serve(request);
    if (!requestEvent) return;
    event.request = requestEvent;
    event.triggers.add(requestEvent);
  }
  _addTextTrackListeners() {
    this._onTextTracksChange();
    this._onTextTrackModeChange();
    const textTracks = this._media.textTracks;
    listenEvent(textTracks, "add", this._onTextTracksChange.bind(this));
    listenEvent(textTracks, "remove", this._onTextTracksChange.bind(this));
    listenEvent(textTracks, "mode-change", this._onTextTrackModeChange.bind(this));
  }
  _addQualityListeners() {
    const qualities = this._media.qualities;
    listenEvent(qualities, "add", this._onQualitiesChange.bind(this));
    listenEvent(qualities, "remove", this._onQualitiesChange.bind(this));
    listenEvent(qualities, "change", this._onQualityChange.bind(this));
    listenEvent(qualities, "auto-change", this._onAutoQualityChange.bind(this));
    listenEvent(qualities, "readonly-change", this._onCanSetQualityChange.bind(this));
  }
  _addAudioTrackListeners() {
    const audioTracks = this._media.audioTracks;
    listenEvent(audioTracks, "add", this._onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "remove", this._onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "change", this._onAudioTrackChange.bind(this));
  }
  _onTextTracksChange(event) {
    const { textTracks } = this.$state;
    textTracks.set(this._media.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  _onTextTrackModeChange(event) {
    if (event) this._satisfyRequest("media-text-track-change-request", event);
    const current = this._media.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  _onAudioTracksChange(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this._media.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  _onAudioTrackChange(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this._media.audioTracks.selected);
    if (event) this._satisfyRequest("media-audio-track-change-request", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  _onQualitiesChange(event) {
    const { qualities } = this.$state;
    qualities.set(this._media.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  _onQualityChange(event) {
    const { quality } = this.$state;
    quality.set(this._media.qualities.selected);
    if (event) this._satisfyRequest("media-quality-change-request", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  _onAutoQualityChange() {
    const { qualities } = this._media, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto) this._stopWatchingQualityResize();
  }
  _watchQualityResize() {
    this._stopWatchingQualityResize();
    this._stopQualityResizeEffect = effect(() => {
      const { qualities } = this._media, { mediaWidth, mediaHeight } = this.$state, w = mediaWidth(), h = mediaHeight();
      if (w === 0 || h === 0) return;
      let selectedQuality = null, minScore = Infinity;
      for (const quality of qualities) {
        const score = Math.abs(quality.width - w) + Math.abs(quality.height - h);
        if (score < minScore) {
          minScore = score;
          selectedQuality = quality;
        }
      }
      if (selectedQuality) {
        qualities[ListSymbol._select](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w, height: h } })
        );
      }
    });
  }
  _stopWatchingQualityResize() {
    this._stopQualityResizeEffect?.();
    this._stopQualityResizeEffect = null;
  }
  _onCanSetQualityChange() {
    this.$state.canSetQuality.set(!this._media.qualities.readonly);
  }
  _watchCanSetVolume() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event) {
    const prevProvider = this._media.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type) return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this._media.$provider.set(event.detail);
    if (prevProvider && event.detail === null) {
      this._resetMediaState(event);
    }
  }
  ["provider-loader-change"](event) {
    {
      this._media.logger?.infoGroup(`Loader change \`${event.detail?.constructor.name}\``).labelledLog("Event", event).dispatch();
    }
  }
  ["auto-play"](event) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event) {
    this.$state.autoPlayError.set(event.detail);
    this._resetTracking();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this._trackedEvents.set("can-load", event);
    this._media.textTracks[TextTrackSymbol._canLoad]();
    this._satisfyRequest("media-start-loading", event);
  }
  ["can-load-poster"](event) {
    this.$state.canLoadPoster.set(true);
    this._trackedEvents.set("can-load-poster", event);
    this._satisfyRequest("media-poster-start-loading", event);
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event.detail : providedViewType;
    if (viewType !== currentViewType) {
      {
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
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    const { storage } = this._media, { canPlay } = this.$state;
    this.$state.playbackRate.set(event.detail);
    this._satisfyRequest("media-rate-change-request", event);
    if (canPlay()) {
      storage?.setPlaybackRate?.(event.detail);
    }
  }
  ["remote-playback-change"](event) {
    const { remotePlaybackState, remotePlaybackType } = this.$state, { type, state } = event.detail, isConnected = state === "connected";
    remotePlaybackType.set(type);
    remotePlaybackState.set(state);
    const key = type === "airplay" ? "media-airplay-request" : "media-google-cast-request";
    if (isConnected) {
      this._satisfyRequest(key, event);
    } else {
      const requestEvent = this._request._queue._peek(key);
      if (requestEvent) {
        event.request = requestEvent;
        event.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event) {
    const prevSources = this.$state.sources(), newSources = event.detail;
    this.$state.sources.set(newSources);
    this._onSourceQualitiesChange(prevSources, newSources, event);
  }
  _onSourceQualitiesChange(prevSources, newSources, trigger) {
    let { qualities } = this._media, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc)) continue;
      const exists = newSources.some((s) => s.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol._remove](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol._reset](trigger);
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
      qualities[ListSymbol._add](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol._enableAuto]) {
      this._watchQualityResize();
      qualities[QualitySymbol._enableAuto] = this._watchQualityResize.bind(this);
      qualities[QualitySymbol._setAuto](true, trigger);
    }
  }
  ["source-change"](event) {
    event.isQualityChange = event.originEvent?.type === "quality-change";
    const source = event.detail;
    this._resetMediaState(event, event.isQualityChange);
    this._trackedEvents.set(event.type, event);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
    {
      this._media.logger?.infoGroup("\u{1F4FC} Media source change").labelledLog("Source", source).dispatch();
    }
  }
  _resetMediaState(event, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this._media;
    if (!isSourceQualityChange) {
      this._playedIntervals = [];
      this._playedInterval = [-1, -1];
      audioTracks[ListSymbol._reset](event);
      qualities[ListSymbol._reset](event);
      softResetMediaState(this.$state, isSourceQualityChange);
      this._resetTracking();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this._resetTracking();
  }
  ["abort"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this._trackedEvents.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this._trackedEvents.get("abort");
    if (abortEvent) event.triggers.add(abortEvent);
    {
      this._media.logger?.errorGroup("Media Error").labelledLog("Error", event.detail).labelledLog("Event", event).labelledLog("Context", this._media).dispatch();
    }
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this._trackedEvents.get("load-start");
    if (loadStartEvent) event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this._trackedEvents.get("load-start");
    if (loadStartEvent) event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this._trackedEvents.get("loaded-metadata");
    if (loadedMetadata) event.triggers.add(loadedMetadata);
    this._onCanPlayDetail(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this._onCanPlayDetail(event.detail);
    const canPlay = this._trackedEvents.get("can-play");
    if (canPlay) event.triggers.add(canPlay);
  }
  _onCanPlayDetail(detail) {
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
      if (ended()) this._onEndPrecisionChange(event);
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
    this._resetPlaybackIfNeeded();
    if (!paused()) {
      event.stopImmediatePropagation();
      return;
    }
    event.autoPlay = autoPlaying();
    const waitingEvent = this._trackedEvents.get("waiting");
    if (waitingEvent) event.triggers.add(waitingEvent);
    this._satisfyRequest("media-play-request", event);
    this._trackedEvents.set("play", event);
    paused.set(false);
    autoPlayError.set(null);
    if (event.autoPlay) {
      this._handle(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this._request._replaying) {
      this._request._replaying = false;
      ended.set(false);
      this._handle(this.createEvent("replay", { trigger: event }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this._media.remote.enterFullscreen("prefer-media", event);
    }
    if (live() && !userBehindLiveEdge()) {
      this._media.remote.seekToLiveEdge(event);
    }
  }
  _resetPlaybackIfNeeded(trigger) {
    const provider = peek(this._media.$provider);
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
    const playEvent = this._trackedEvents.get("play");
    if (playEvent) event.triggers.add(playEvent);
    this._satisfyRequest("media-play-request", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this._resetTracking();
    this._trackedEvents.set("play-fail", event);
    if (event.autoPlay) {
      this._handle(
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
    const playEvent = this._trackedEvents.get("play"), seekedEvent = this._trackedEvents.get("seeked");
    if (playEvent) event.triggers.add(playEvent);
    else if (seekedEvent) event.triggers.add(seekedEvent);
    setTimeout(() => this._resetTracking(), 0);
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
    if (this._request._looping) {
      this._request._looping = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end)) this._media.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this._handle(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this._isPlayingOnDisconnect = true;
    }
    this._satisfyRequest("media-pause-request", event);
    const seekedEvent = this._trackedEvents.get("seeked");
    if (seekedEvent) event.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this._clipEnded) {
      setTimeout(() => {
        this._handle(this.createEvent("end", { trigger: event }));
        this._clipEnded = false;
      }, 0);
    }
    this._resetTracking();
  }
  ["time-change"](event) {
    if (this._request._looping) {
      event.stopImmediatePropagation();
      return;
    }
    let { waiting, played, clipEndTime, realCurrentTime, currentTime } = this.$state, newTime = event.detail, endTime = clipEndTime();
    realCurrentTime.set(newTime);
    this._updatePlayed();
    waiting.set(false);
    for (const track of this._media.textTracks) {
      track[TextTrackSymbol._updateActiveCues](newTime, event);
    }
    if (endTime > 0 && newTime >= endTime) {
      this._clipEnded = true;
      this.dispatch("media-pause-request", { trigger: event });
    }
    this._saveTime();
    this.dispatch("time-update", {
      detail: { currentTime: currentTime(), played: played() },
      trigger: event
    });
  }
  _updatePlayed() {
    const { currentTime, played, paused } = this.$state;
    if (paused()) return;
    this._playedInterval = updateTimeIntervals(
      this._playedIntervals,
      this._playedInterval,
      currentTime()
    );
    played.set(new TimeRange(this._playedIntervals));
  }
  // Called to update time again incase duration precision has changed.
  _onEndPrecisionChange(trigger) {
    const { clipStartTime, clipEndTime, duration } = this.$state, isClipped = clipStartTime() > 0 || clipEndTime() > 0;
    if (isClipped) return;
    this._handle(
      this.createEvent("time-change", {
        detail: duration(),
        trigger
      })
    );
  }
  _saveTime() {
    const { storage } = this._media, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event) {
    const { storage } = this._media, { canPlay, audioGain } = this.$state;
    audioGain.set(event.detail);
    this._satisfyRequest("media-audio-gain-change-request", event);
    if (canPlay()) storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event) {
    const { storage } = this._media, { volume, muted, canPlay } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this._satisfyRequest("media-volume-change-request", event);
    this._satisfyRequest(detail.muted ? "media-mute-request" : "media-unmute-request", event);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeked"](event) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this._request._seeking) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this._trackedEvents.get("waiting");
      if (waitingEvent) event.triggers.add(waitingEvent);
      const seekingEvent = this._trackedEvents.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused()) this._stopWaiting();
      seeking.set(false);
      realCurrentTime.set(event.detail);
      this._satisfyRequest("media-seek-request", event);
      const origin = event?.originEvent;
      if (origin?.isTrusted && !/seek/.test(origin.type)) {
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
    if (this._firingWaiting || this._request._seeking) return;
    event.stopImmediatePropagation();
    this._waitingTrigger = event;
    this._fireWaiting();
  }
  ["end"](event) {
    const { loop, ended } = this.$state;
    if (!loop() && ended()) return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this._resetPlaybackIfNeeded(event);
          this.dispatch("media-loop-request", { trigger: event });
        });
      }, 10);
      return;
    }
    setTimeout(() => this._onEnded(event), 0);
  }
  _onEnded(event) {
    const { storage } = this._media, { paused, seeking, ended, duration } = this.$state;
    this._onEndPrecisionChange(event);
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
    this._resetTracking();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event
    });
  }
  _stopWaiting() {
    this._fireWaiting.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    const isFullscreen = event.detail;
    this.$state.fullscreen.set(isFullscreen);
    this._satisfyRequest(
      isFullscreen ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event
    );
  }
  ["fullscreen-error"](event) {
    this._satisfyRequest("media-enter-fullscreen-request", event);
    this._satisfyRequest("media-exit-fullscreen-request", event);
  }
  ["orientation-change"](event) {
    const isLocked = event.detail.lock;
    this._satisfyRequest(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event
    );
  }
  ["picture-in-picture-change"](event) {
    const isPiP = event.detail;
    this.$state.pictureInPicture.set(isPiP);
    this._satisfyRequest(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event);
  }
  ["picture-in-picture-error"](event) {
    this._satisfyRequest("media-enter-pip-request", event);
    this._satisfyRequest("media-exit-pip-request", event);
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
}

class MediaStateSync extends MediaPlayerController {
  onSetup() {
    this._init();
    effect(this._watchLogLevel.bind(this));
    const effects = [
      this._watchMetadata,
      this._watchAutoplay,
      this._watchClipStartTime,
      this._watchClipEndTime,
      this._watchControls,
      this._watchCrossOrigin,
      this._watchDuration,
      this._watchLive,
      this._watchLiveEdge,
      this._watchLiveTolerance,
      this._watchLoop,
      this._watchPlaysInline,
      this._watchPoster,
      this._watchProvidedTypes,
      this._watchTitle
    ];
    for (const callback of effects) {
      effect(callback.bind(this));
    }
  }
  _init() {
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
    for (const prop of Object.keys(this.$props)) {
      if (skip.has(prop)) continue;
      this.$state[providedProps[prop] ?? prop]?.set(this.$props[prop]());
    }
    this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  // Sync "provided" props with internal state. Provided props are used to differentiate from
  // provider inferred values.
  _watchProvidedTypes() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  _watchLogLevel() {
    this.$state.logLevel.set(this.$props.logLevel());
  }
  _watchMetadata() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  _watchTitle() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  _watchAutoplay() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  _watchLoop() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  _watchControls() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  _watchPoster() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  _watchCrossOrigin() {
    const _crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = _crossOrigin === true ? "" : _crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  _watchDuration() {
    const { duration } = this.$props;
    this.dispatch("media-duration-change-request", {
      detail: duration()
    });
  }
  _watchPlaysInline() {
    const inline = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline);
    this.dispatch("plays-inline-change", { detail: inline });
  }
  _watchClipStartTime() {
    const { clipStartTime } = this.$props;
    this.dispatch("media-clip-start-change-request", {
      detail: clipStartTime()
    });
  }
  _watchClipEndTime() {
    const { clipEndTime } = this.$props;
    this.dispatch("media-clip-end-change-request", {
      detail: clipEndTime()
    });
  }
  _watchLive() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  _watchLiveTolerance() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  _watchLiveEdge() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

class NavigatorMediaSession extends MediaPlayerController {
  static {
    this._actions = ["play", "pause", "seekforward", "seekbackward", "seekto"];
  }
  constructor() {
    super();
  }
  onConnect() {
    effect(this._onMetadataChange.bind(this));
    effect(this._onPlaybackStateChange.bind(this));
    const handleAction = this._handleAction.bind(this);
    for (const action of NavigatorMediaSession._actions) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this._onDisconnect.bind(this));
  }
  _onDisconnect() {
    for (const action of NavigatorMediaSession._actions) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  _onMetadataChange() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  _onPlaybackStateChange() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  _handleAction(details) {
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
}

const LOCAL_STORAGE_KEY = "@vidstack/log-colors";
const savedColors = init();
function getLogColor(key) {
  return savedColors.get(key);
}
function saveLogColor(key, { color = generateColor(), overwrite = false } = {}) {
  if (!savedColors.has(key) || overwrite) {
    savedColors.set(key, color);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Object.entries(savedColors)));
  }
}
function generateColor() {
  return `hsl(${Math.random() * 360}, 55%, 70%)`;
}
function init() {
  let colors;
  try {
    colors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch {
  }
  return new Map(Object.entries(colors ?? {}));
}

const LogLevelValue = Object.freeze({
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
});
const LogLevelColor = Object.freeze({
  silent: "white",
  error: "hsl(6, 58%, 50%)",
  warn: "hsl(51, 58%, 50%)",
  info: "hsl(219, 58%, 50%)",
  debug: "hsl(280, 58%, 50%)"
});

const s = 1e3;
const m = s * 60;
const h = m * 60;
const d = h * 24;
function ms(val) {
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

class LogPrinter extends ViewController {
  constructor() {
    super(...arguments);
    this._level = "warn" ;
  }
  /**
   * The current log level.
   */
  get logLevel() {
    return this._level ;
  }
  set logLevel(level) {
    this._level = level;
  }
  onConnect() {
    this.listen("vds-log", (event) => {
      event.stopPropagation();
      const element = event.path?.[0] ?? (event.target instanceof ViewController ? event.target.el : event.target), eventTargetName = element?.$$COMPONENT_NAME?.replace(/^_/, "").replace(/Instance$/, "") ?? element?.tagName.toLowerCase() ?? "unknown";
      const { level = "warn", data } = event.detail ?? {};
      if (LogLevelValue[this._level] < LogLevelValue[level]) {
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
      this._printTimeDiff();
      printStackTrace();
      console.groupEnd();
    });
    onDispose(() => {
      this._lastLogged = void 0;
    });
  }
  _printTimeDiff() {
    labelledPrint("Time since last log", this._calcLastLogTimeDiff());
  }
  _calcLastLogTimeDiff() {
    const time = performance.now();
    const diff = time - (this._lastLogged ?? (this._lastLogged = performance.now()));
    this._lastLogged = time;
    return ms(diff);
  }
}
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

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
const _MediaPlayer = class _MediaPlayer extends Component {
  constructor() {
    super();
    this.canPlayQueue = new RequestQueue();
    this._skipTitleUpdate = false;
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
    {
      const logPrinter = new LogPrinter();
      effect(() => {
        logPrinter.logLevel = this.$props.logLevel();
      });
    }
    context.logger = new Logger();
    context.remote = this.remoteControl = new MediaRemoteControl(
      context.logger 
    );
    context.remote.setPlayer(this);
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol._crossOrigin] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this._media = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    new MediaEventsLogger(context);
    const request = new MediaRequestContext();
    this._stateMgr = new MediaStateManager(request, context);
    this._requestMgr = new MediaRequestManager(this._stateMgr, request, context);
    context.delegate = new MediaPlayerDelegate(
      this._stateMgr._handle.bind(this._stateMgr),
      context
    );
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      new NavigatorMediaSession();
    }
    new MediaLoadController("load", this.startLoading.bind(this));
    new MediaLoadController("posterLoad", this.startLoadingPoster.bind(this));
  }
  static {
    this.props = mediaPlayerProps;
  }
  static {
    this.state = mediaState;
  }
  get _provider() {
    return this._media.$provider();
  }
  get _$$props() {
    return this.$props;
  }
  onSetup() {
    this._setupMediaAttributes();
    effect(this._watchCanPlay.bind(this));
    effect(this._watchMuted.bind(this));
    effect(this._watchPaused.bind(this));
    effect(this._watchVolume.bind(this));
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchPlaysInline.bind(this));
    effect(this._watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this._watchStorage.bind(this));
    effect(this._watchTitle.bind(this));
    effect(this._watchOrientation.bind(this));
    listenEvent(el, "find-media-player", this._onFindPlayer.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE) setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this._onPointerChange(pointerQuery);
    pointerQuery.onchange = this._onPointerChange.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this._onResize.bind(this)));
    resize.observe(el);
    effect(this._onResize.bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    this._media.logger.setTarget(el);
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
      this._media.logger.setTarget(null);
    });
  }
  onDestroy() {
    this._media.player = null;
    this.canPlayQueue._reset();
  }
  _watchTitle() {
    const el = this.$el, { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
    );
    if (el?.hasAttribute("title")) {
      this._skipTitleUpdate = true;
      el?.removeAttribute("title");
    }
  }
  _watchOrientation() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this._onResize();
  }
  _watchCanPlay() {
    if (this.$state.canPlay() && this._provider) this.canPlayQueue._start();
    else this.canPlayQueue._stop();
  }
  _setupMediaAttributes() {
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
  }
  _onFindPlayer(event) {
    event.detail(this);
  }
  _onResize() {
    if (!this.el) return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  _onPointerChange(queryList) {
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this._onResize();
  }
  get provider() {
    return this._provider;
  }
  get controls() {
    return this._requestMgr._controls;
  }
  set controls(controls) {
    this._$$props.controls.set(controls);
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this._skipTitleUpdate) {
      this._skipTitleUpdate = false;
      return;
    }
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return this._media.qualities;
  }
  get audioTracks() {
    return this._media.audioTracks;
  }
  get textTracks() {
    return this._media.textTracks;
  }
  get textRenderers() {
    return this._media.textRenderers;
  }
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    this._$$props.duration.set(duration);
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this._queuePausedUpdate(paused);
  }
  _watchPaused() {
    this._queuePausedUpdate(this.$props.paused());
  }
  _queuePausedUpdate(paused) {
    if (paused) {
      this.canPlayQueue._enqueue("paused", () => this._requestMgr._pause());
    } else this.canPlayQueue._enqueue("paused", () => this._requestMgr._play());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    this._queueMutedUpdate(muted);
  }
  _watchMuted() {
    this._queueMutedUpdate(this.$props.muted());
  }
  _queueMutedUpdate(muted) {
    this.canPlayQueue._enqueue("muted", () => {
      if (this._provider) this._provider.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this._queueCurrentTimeUpdate(time);
  }
  _watchCurrentTime() {
    this._queueCurrentTimeUpdate(this.$props.currentTime());
  }
  _queueCurrentTimeUpdate(time) {
    this.canPlayQueue._enqueue("currentTime", () => {
      const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
      if (time === peek(currentTime)) return;
      peek(() => {
        if (!this._provider) return;
        const clippedTime = time + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
        if (Number.isFinite(boundTime)) {
          this._provider.setCurrentTime(boundTime);
        }
      });
    });
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    this._queueVolumeUpdate(volume);
  }
  _watchVolume() {
    this._queueVolumeUpdate(this.$props.volume());
  }
  _queueVolumeUpdate(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue._enqueue("volume", () => {
      if (this._provider) this._provider.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this._queuePlaybackRateUpdate(rate);
  }
  _watchPlaybackRate() {
    this._queuePlaybackRateUpdate(this.$props.playbackRate());
  }
  _queuePlaybackRateUpdate(rate) {
    this.canPlayQueue._enqueue("rate", () => {
      if (this._provider) this._provider.setPlaybackRate?.(rate);
    });
  }
  _watchPlaysInline() {
    this._queuePlaysInlineUpdate(this.$props.playsInline());
  }
  _queuePlaysInlineUpdate(inline) {
    this.canPlayQueue._enqueue("playsinline", () => {
      if (this._provider) this._provider.setPlaysInline?.(inline);
    });
  }
  _watchStorage() {
    let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
    if (storage?.onChange) {
      const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(this._computeMediaId.bind(this));
      effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
    }
    this._media.storage = storage;
    this._media.textTracks.setStorage(storage);
    onDispose(() => {
      storage?.onDestroy?.();
      this._media.storage = null;
      this._media.textTracks.setStorage(null);
    });
  }
  _computeMediaId() {
    const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
    return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
  }
  async play(trigger) {
    return this._requestMgr._play(trigger);
  }
  async pause(trigger) {
    return this._requestMgr._pause(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this._requestMgr._enterFullscreen(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this._requestMgr._exitFullscreen(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this._requestMgr._enterPictureInPicture(trigger);
  }
  exitPictureInPicture(trigger) {
    return this._requestMgr._exitPictureInPicture(trigger);
  }
  seekToLiveEdge(trigger) {
    this._requestMgr._seekToLiveEdge(trigger);
  }
  startLoading(trigger) {
    this._media.delegate._notify("can-load", void 0, trigger);
  }
  startLoadingPoster(trigger) {
    this._media.delegate._notify("can-load-poster", void 0, trigger);
  }
  requestAirPlay(trigger) {
    return this._requestMgr._requestAirPlay(trigger);
  }
  requestGoogleCast(trigger) {
    return this._requestMgr._requestGoogleCast(trigger);
  }
  setAudioGain(gain, trigger) {
    return this._requestMgr._setAudioGain(gain, trigger);
  }
  destroy() {
    super.destroy();
    this._media.remote.setPlayer(null);
    this.dispatch("destroy");
  }
};
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "canPlayQueue", 2);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "remoteControl", 2);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "provider", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "controls", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "orientation", 2);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "title", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "qualities", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "audioTracks", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "textTracks", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "textRenderers", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "duration", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "paused", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "muted", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "currentTime", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "volume", 1);
__decorateClass$1([
  prop
], _MediaPlayer.prototype, "playbackRate", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "play", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "pause", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "enterFullscreen", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "exitFullscreen", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "enterPictureInPicture", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "exitPictureInPicture", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "seekToLiveEdge", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "startLoading", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "startLoadingPoster", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "requestAirPlay", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "requestGoogleCast", 1);
__decorateClass$1([
  method
], _MediaPlayer.prototype, "setAudioGain", 1);
let MediaPlayer = _MediaPlayer;

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

let warned = /* @__PURE__ */ new Set() ;
const sourceTypes = /* @__PURE__ */ new Map();
class SourceSelection {
  constructor(_domSources, _media, _loader, customLoaders = []) {
    this._domSources = _domSources;
    this._media = _media;
    this._loader = _loader;
    this._initialize = false;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this._loaders = computed(() => {
      const remoteLoader = _media.$state.remotePlaybackLoader();
      const loaders = _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this._loaders().find((loader2) => loader2.canPlay(src));
      if (!loader) continue;
      const mediaType = loader.mediaType(src);
      this._media.$state.source.set(src);
      this._media.$state.mediaType.set(mediaType);
      this._media.$state.inferredViewType.set(mediaType);
      this._loader.set(loader);
      this._initialize = true;
      break;
    }
  }
  get _notify() {
    return this._media.delegate._notify;
  }
  connect() {
    const loader = this._loader();
    if (this._initialize) {
      this._notifySourceChange(this._media.$state.source(), loader);
      this._notifyLoaderChange(loader);
      this._initialize = false;
    }
    effect(this._onSourcesChange.bind(this));
    effect(this._onSourceChange.bind(this));
    effect(this._onSetup.bind(this));
    effect(this._onLoadSource.bind(this));
    effect(this._onLoadPoster.bind(this));
  }
  _onSourcesChange() {
    this._notify("sources-change", [
      ...normalizeSrc(this._media.$props.src()),
      ...this._domSources()
    ]);
  }
  _onSourceChange() {
    const { $state } = this._media;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this._findNewSource(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
    if (noMatch && !warned.has(newSource.src) && !peek(this._loader)) {
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
        const newSource2 = this._findNewSource(peek($state.source), sources2);
        tick();
        if (!newSource2.src) {
          this._notify("error", {
            message: "Failed to load resource.",
            code: 4
          });
        }
      });
      return () => abort.abort();
    }
    tick();
  }
  _findNewSource(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this._loaders(), { started, paused, currentTime, quality, savedState } = this._media.$state;
    for (const src of sources) {
      const loader = loaders.find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
        break;
      }
    }
    if (isVideoQualitySrc(newSource)) {
      const currentQuality = quality(), sourceQuality = sources.find((s) => s.src === currentQuality?.src);
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
      this._notifySourceChange(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this._loader)) {
      this._notifyLoaderChange(newLoader, triggerEvent);
    }
    return newSource;
  }
  _notifySourceChange(src, loader, trigger) {
    this._notify("source-change", src, trigger);
    this._notify("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  _notifyLoaderChange(loader, trigger) {
    this._media.$providerSetup.set(false);
    this._notify("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this._media));
    this._loader.set(loader);
    this._notify("provider-loader-change", loader, trigger);
  }
  _onSetup() {
    const provider = this._media.$provider();
    if (!provider || peek(this._media.$providerSetup)) return;
    if (this._media.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this._media.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  _onLoadSource() {
    if (!this._media.$providerSetup()) return;
    const provider = this._media.$provider(), source = this._media.$state.source(), crossOrigin = peek(this._media.$state.crossOrigin), preferNativeHLS = peek(this._media.$props.preferNativeHLS);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this._media.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (preferNativeHLS || !isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossOrigin),
            signal: abort.signal
          }).then((streamType) => {
            this._notify("stream-type-change", streamType);
          }).catch(noop);
        }
      } else if (isDASHSrc(source)) {
        resolveStreamTypeFromDASHManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal
        }).then((streamType) => {
          this._notify("stream-type-change", streamType);
        }).catch(noop);
      } else {
        this._notify("stream-type-change", "on-demand");
      }
      peek(() => {
        const preload = peek(this._media.$state.preload);
        return provider?.loadSource(source, preload).catch((error) => {
          {
            this._media.logger?.errorGroup("[vidstack] failed to load source").labelledLog("Error", error).labelledLog("Source", source).labelledLog("Provider", provider).labelledLog("Media Context", { ...this._media }).dispatch();
          }
        });
      });
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin);
    } catch (error) {
      {
        this._media.logger?.infoGroup(`Failed to preconnect to source: ${source.src}`).labelledLog("Error", error).dispatch();
      }
    }
  }
  _onLoadPoster() {
    const loader = this._loader(), { providedPoster, source, canLoadPoster } = this._media.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster()) return;
    const abort = new AbortController(), trigger = new DOMEvent("source-change", { detail: source });
    loader.loadPoster(source(), this._media, abort).then((url) => {
      this._notify("poster-change", url || "", trigger);
    }).catch(() => {
      this._notify("poster-change", "", trigger);
    });
    return () => {
      abort.abort();
    };
  }
}
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

class Tracks {
  constructor(_domTracks, _media) {
    this._domTracks = _domTracks;
    this._media = _media;
    this._prevTracks = [];
    effect(this._onTracksChange.bind(this));
  }
  _onTracksChange() {
    const newTracks = this._domTracks();
    for (const oldTrack of this._prevTracks) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this._media.textTracks.getById(oldTrack.id);
        if (track) this._media.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this._media.textTracks.getById(id)) {
        newTrack.id = id;
        this._media.textTracks.add(newTrack);
      }
    }
    this._prevTracks = newTracks;
  }
}

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class MediaProvider extends Component {
  constructor() {
    super(...arguments);
    this._domSources = signal([]);
    this._domTracks = signal([]);
    this._loader = null;
    this._loadRafId = -1;
  }
  static {
    this.props = {
      loaders: []
    };
  }
  static {
    this.state = new State({
      loader: null
    });
  }
  onSetup() {
    this._media = useMediaContext();
    this._sources = new SourceSelection(
      this._domSources,
      this._media,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this._sources.connect();
    new Tracks(this._domTracks, this._media);
    const resize = new ResizeObserver(animationFrameThrottle(this._onResize.bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(this._onMutation.bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    this._onResize();
    this._onMutation();
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    target?.setAttribute("aria-hidden", "true");
    window.cancelAnimationFrame(this._loadRafId);
    this._loadRafId = requestAnimationFrame(() => this._runLoader(target));
    onDispose(() => {
      window.cancelAnimationFrame(this._loadRafId);
    });
  }
  _runLoader(target) {
    if (!this.scope) return;
    const loader = this.$state.loader(), { $provider } = this._media;
    if (this._loader === loader && loader?.target === target && peek($provider)) return;
    this._destroyProvider();
    this._loader = loader;
    if (loader) loader.target = target || null;
    if (!loader || !target) return;
    loader.load(this._media).then((provider) => {
      if (!this.scope) return;
      if (peek(this.$state.loader) !== loader) return;
      this._media.delegate._notify("provider-change", provider);
    });
  }
  onDestroy() {
    this._loader = null;
    this._destroyProvider();
  }
  _destroyProvider() {
    this._media?.delegate._notify("provider-change", null);
  }
  _onResize() {
    if (!this.el) return;
    const { player, $state } = this._media, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player) return;
    $state.mediaWidth.set(width);
    $state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  _onMutation() {
    const sources = [], tracks = [], children = this.el.children;
    for (const el of children) {
      if (el.hasAttribute("data-vds")) continue;
      if (el instanceof HTMLSourceElement) {
        const src = {
          id: el.id,
          src: el.src,
          type: el.type
        };
        for (const prop of ["id", "src", "width", "height", "bitrate", "codec"]) {
          const value = el.getAttribute(`data-${prop}`);
          if (isString(value)) src[prop] = /id|src|codec/.test(prop) ? value : Number(value);
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
    this._domSources.set(sources);
    this._domTracks.set(tracks);
    tick();
  }
}
__decorateClass([
  method
], MediaProvider.prototype, "load");

export { AudioProviderLoader, AudioTrackList, DASHProviderLoader, FullscreenController, HLSProviderLoader, List, LocalMediaStorage, Logger, MEDIA_KEY_SHORTCUTS, MediaControls, MediaPlayer, MediaProvider, MediaRemoteControl, ScreenOrientationController, TextRenderers, TextTrackList, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, YouTubeProviderLoader, canFullscreen, isAudioProvider, isDASHProvider, isGoogleCastProvider, isHLSProvider, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isVideoProvider, isVideoQualitySrc, isVimeoProvider, isYouTubeProvider, mediaState, softResetMediaState };
