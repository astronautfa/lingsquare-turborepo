import { EventsTarget, DOMEvent, fscreen, ViewController, listenEvent, onDispose, signal, peek, isString, isNumber, State, tick, Component, functionThrottle, effect, untrack, functionDebounce, isArray, isKeyboardClick, isKeyboardEvent, waitIdlePeriod, deferredPromise, isUndefined, provideContext, setAttribute, animationFrameThrottle, uppercaseFirstChar, camelToKebabCase, setStyle, computed, prop, method, scoped, noop } from './vidstack-C6myozhB.js';
import { mediaContext, useMediaContext } from './vidstack-Cq-GdDcp.js';
import { canOrientScreen, IS_IPHONE, isAudioSrc, canPlayAudioType, isVideoSrc, canPlayVideoType, isHLSSupported, isHLSSrc, isDASHSupported, isDASHSrc, IS_CHROME, IS_IOS, canGoogleCastSrc, canChangeVolume } from './vidstack-B9TAFm_g.js';
import { TimeRange, getTimeRangesStart, getTimeRangesEnd, updateTimeIntervals } from './vidstack-Dy-iOvF5.js';
import { isTrackCaptionKind, TextTrackSymbol, TextTrack } from './vidstack-B97tQYIP.js';
import { ListSymbol } from './vidstack-BoSiLpaP.js';
import { QualitySymbol } from './vidstack-DH8xaM_3.js';
import { coerceToError } from './vidstack-C9vIqaYT.js';
import { preconnect, getRequestCredentials } from './vidstack-Vi2h5MrZ.js';
import { isHTMLElement, isTouchPinchEvent, setAttributeIfEmpty } from './vidstack-BeyDmEgV.js';
import { clampNumber } from './vidstack-Dihypf8P.js';
import { FocusVisibleController } from './vidstack-D6_zYTXL.js';

var _a$1;
const GROUPED_LOG = Symbol(0);
_a$1 = GROUPED_LOG;
const _GroupedLog = class _GroupedLog2 {
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
    return new _GroupedLog2(this.logger, this.level, title, this.root ?? this, this);
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

var _a;
class List extends EventsTarget {
  constructor() {
    super(...arguments);
    this.A = [];
    this[_a] = false;
  }
  get length() {
    return this.A.length;
  }
  get readonly() {
    return this[ListSymbol.Yc];
  }
  /**
   * Returns the index of the first occurrence of the given item, or -1 if it is not present.
   */
  indexOf(item) {
    return this.A.indexOf(item);
  }
  /**
   * Returns an item matching the given `id`, or `null` if not present.
   */
  getById(id) {
    if (id === "") return null;
    return this.A.find((item) => item.id === id) ?? null;
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.A];
  }
  [(_a = ListSymbol.Yc, Symbol.iterator)]() {
    return this.A.values();
  }
  /** @internal */
  [ListSymbol.da](item, trigger) {
    const index = this.A.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.A[index];
        }
      });
    }
    if (this.A.includes(item)) return;
    this.A.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /** @internal */
  [ListSymbol.cc](item, trigger) {
    const index = this.A.indexOf(item);
    if (index >= 0) {
      this[ListSymbol.Hf]?.(item, trigger);
      this.A.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /** @internal */
  [ListSymbol.z](trigger) {
    for (const item of [...this.A]) this[ListSymbol.cc](item, trigger);
    this.A = [];
    this[ListSymbol.Od](false, trigger);
    this[ListSymbol.Gf]?.();
  }
  /** @internal */
  [ListSymbol.Od](readonly, trigger) {
    if (this[ListSymbol.Yc] === readonly) return;
    this[ListSymbol.Yc] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
}

const CAN_FULLSCREEN = fscreen.fullscreenEnabled;
class FullscreenController extends ViewController {
  constructor() {
    super(...arguments);
    this.dc = false;
    this.Pd = false;
  }
  get active() {
    return this.Pd;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen, "fullscreenchange", this.E.bind(this));
    listenEvent(fscreen, "fullscreenerror", this.Q.bind(this));
    onDispose(this.Fa.bind(this));
  }
  async Fa() {
    if (CAN_FULLSCREEN) await this.exit();
  }
  E(event) {
    const active = isFullscreen(this.el);
    if (active === this.Pd) return;
    if (!active) this.dc = false;
    this.Pd = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  Q(event) {
    if (!this.dc) return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this.dc = false;
  }
  async enter() {
    try {
      this.dc = true;
      if (!this.el || isFullscreen(this.el)) return;
      assertFullscreenAPI();
      return fscreen.requestFullscreen(this.el);
    } catch (error) {
      this.dc = false;
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
    "[vidstack] no fullscreen API"
  );
}

class ScreenOrientationController extends ViewController {
  constructor() {
    super(...arguments);
    this.la = signal(this.Jf());
    this.Cb = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.la();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.Cb();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.la().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.la().startsWith("landscape");
  }
  static {
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
      listenEvent(screen.orientation, "change", this.Kf.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.Kf.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this.Fa.bind(this));
  }
  async Fa() {
    if (this.supported && this.Cb()) await this.unlock();
  }
  Kf(event) {
    this.la.set(this.Jf());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.la),
        lock: this._c
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
    if (peek(this.Cb) || this._c === lockType) return;
    this.Lf();
    await screen.orientation.lock(lockType);
    this.Cb.set(true);
    this._c = lockType;
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
    if (!peek(this.Cb)) return;
    this.Lf();
    this._c = void 0;
    await screen.orientation.unlock();
    this.Cb.set(false);
  }
  Lf() {
    if (this.supported) return;
    throw Error(
      "[vidstack] no orientation API"
    );
  }
  Jf() {
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
  logLevel: "silent",
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
  constructor(_logger = void 0) {
    this.bc = _logger;
    this.G = null;
    this.f = null;
    this.Rd = -1;
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
    this.G = target;
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
    if (this.f) return this.f;
    (target ?? this.G)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this.f = player),
        bubbles: true,
        composed: true
      })
    );
    return this.f;
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this.f = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    this.s("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this.s("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this.s("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this.s("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.s("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.s("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.s("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.s("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this.s("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this.s("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this.s("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this.s("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this.s("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this.s("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.s("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.s("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.s("media-live-edge-request", trigger);
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
    this.s("media-duration-change-request", trigger, duration);
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
    this.s("media-clip-start-change-request", trigger, startTime);
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
    this.s("media-clip-end-change-request", trigger, endTime);
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
    this.s("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
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
    this.s("media-audio-track-change-request", trigger, index);
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
    this.s("media-quality-change-request", trigger, index);
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
    this.s("media-text-track-change-request", trigger, {
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
    this.s("media-rate-change-request", trigger, rate);
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
    this.s("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this.s("media-resume-controls-request", trigger);
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
    this.s("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
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
      return;
    }
    let tracks = player.state.textTracks, index = this.Rd;
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
    this.Rd = -1;
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this.Rd = index;
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.textTrack) {
      this.disableCaptions();
    } else {
      this.showCaptions();
    }
  }
  userPrefersLoopChange(prefersLoop, trigger) {
    this.s("media-user-loop-change-request", trigger, prefersLoop);
  }
  s(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component) target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this.f?.el && target instanceof Node && !this.f.el.contains(target);
    target = shouldUsePlayer ? this.G ?? this.getPlayer()?.el : target ?? this.G;
    if (this.f) {
      if (type === "media-play-request" && !this.f.state.canLoad) {
        target?.dispatchEvent(request);
      } else {
        this.f.canPlayQueue.k(type, () => target?.dispatchEvent(request));
      }
    } else {
      target?.dispatchEvent(request);
    }
  }
  Va(method) {
  }
}

class LocalMediaStorage {
  constructor() {
    this.playerId = "vds-player";
    this.mediaId = null;
    this.H = {
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
    return this.H.volume;
  }
  async setVolume(volume) {
    this.H.volume = volume;
    this.save();
  }
  async getMuted() {
    return this.H.muted;
  }
  async setMuted(muted) {
    this.H.muted = muted;
    this.save();
  }
  async getTime() {
    return this.H.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this.H.time = !shouldClear ? time : null;
    if (shouldClear || ended) this.saveTime();
    else this.saveTimeThrottled();
  }
  async getLang() {
    return this.H.lang;
  }
  async setLang(lang) {
    this.H.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this.H.captions;
  }
  async setCaptions(enabled) {
    this.H.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this.H.rate;
  }
  async setPlaybackRate(rate) {
    this.H.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this.H.audioGain;
  }
  async setAudioGain(gain) {
    this.H.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this.H.quality;
  }
  async setVideoQuality(quality) {
    this.H.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this.H = {
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
    const data = JSON.stringify({ ...this.H, time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTime() {
    if (!this.mediaId) return;
    const data = (this.H.time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
}

class NativeTextRenderer {
  constructor() {
    this.priority = 0;
    this.Uf = true;
    this.m = null;
    this.J = null;
    this.va = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this.m = video;
    if (video) video.textTracks.onchange = this.E.bind(this);
  }
  addTrack(track) {
    this.va.add(track);
    this.ci(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol._]?.remove?.();
    track[TextTrackSymbol._] = null;
    this.va.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol._];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.J = track;
  }
  setDisplay(display) {
    this.Uf = display;
    this.E();
  }
  detach() {
    if (this.m) this.m.textTracks.onchange = null;
    for (const track of this.va) this.removeTrack(track);
    this.va.clear();
    this.m = null;
    this.J = null;
  }
  ci(track) {
    if (!this.m) return;
    const el = track[TextTrackSymbol._] ??= this.di(track);
    if (isHTMLElement(el)) {
      this.m.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  di(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.Vf(track, el.track);
    }
    return el;
  }
  Vf(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length) return;
    for (const cue of track.cues) native.addCue(cue);
  }
  E(event) {
    for (const track of this.va) {
      const native = track[TextTrackSymbol._];
      if (!native) continue;
      if (!this.Uf) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing) this.Vf(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this.a = _media;
    this.m = null;
    this.bd = [];
    this.Wf = false;
    this.wa = null;
    this.jb = null;
    const textTracks = _media.textTracks;
    this.Wd = textTracks;
    effect(this.Xd.bind(this));
    onDispose(this.ei.bind(this));
    listenEvent(textTracks, "add", this.Yd.bind(this));
    listenEvent(textTracks, "remove", this.fi.bind(this));
    listenEvent(textTracks, "mode-change", this.Ha.bind(this));
  }
  Xd() {
    const { nativeControls } = this.a.$state;
    this.Wf = nativeControls();
    this.Ha();
  }
  add(renderer) {
    this.bd.push(renderer);
    untrack(this.Ha.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this.bd.splice(this.bd.indexOf(renderer), 1);
    untrack(this.Ha.bind(this));
  }
  /** @internal */
  Xf(video) {
    requestAnimationFrame(() => {
      this.m = video;
      if (video) {
        this.wa = new NativeTextRenderer();
        this.wa.attach(video);
        for (const track of this.Wd) this.Yf(track);
      }
      this.Ha();
    });
  }
  Yf(track) {
    if (!isTrackCaptionKind(track)) return;
    this.wa?.addTrack(track);
  }
  gi(track) {
    if (!isTrackCaptionKind(track)) return;
    this.wa?.removeTrack(track);
  }
  Yd(event) {
    this.Yf(event.detail);
  }
  fi(event) {
    this.gi(event.detail);
  }
  Ha() {
    const currentTrack = this.Wd.selected;
    if (this.m && (this.Wf || currentTrack?.[TextTrackSymbol.Mf])) {
      this.jb?.changeTrack(null);
      this.wa?.setDisplay(true);
      this.wa?.changeTrack(currentTrack);
      return;
    }
    this.wa?.setDisplay(false);
    this.wa?.changeTrack(null);
    if (!currentTrack) {
      this.jb?.changeTrack(null);
      return;
    }
    const customRenderer = this.bd.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this.m));
    if (this.jb !== customRenderer) {
      this.jb?.detach();
      customRenderer?.attach(this.m);
      this.jb = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  ei() {
    this.wa?.detach();
    this.wa = null;
    this.jb?.detach();
    this.jb = null;
  }
}

class TextTrackList extends List {
  constructor() {
    super();
    this.Z = false;
    this.kb = {};
    this.lb = null;
    this.mb = null;
    this.bg = functionDebounce(async () => {
      if (!this.Z) return;
      if (!this.mb && this.lb) {
        this.mb = await this.lb.getLang();
      }
      const showCaptions = await this.lb?.getCaptions(), kinds = [
        ["captions", "subtitles"],
        "chapters",
        "descriptions",
        "metadata"
      ];
      for (const kind of kinds) {
        const tracks = this.getByKind(kind);
        if (tracks.find((t) => t.mode === "showing")) continue;
        const preferredTrack = this.mb ? tracks.find((track2) => track2.language === this.mb) : null;
        const defaultTrack = isArray(kind) ? this.kb[kind.find((kind2) => this.kb[kind2]) || ""] : this.kb[kind];
        const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
        if (track && (!isCaptionsKind || showCaptions !== false)) {
          track.mode = "showing";
          if (isCaptionsKind) this.cg(track);
        }
      }
    }, 300);
    this.Zd = null;
    this.ag = this.hi.bind(this);
  }
  get selected() {
    const track = this.A.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this.mb;
  }
  set preferredLang(lang) {
    this.mb = lang;
    this.$f(lang);
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init), kind = init.kind === "captions" || init.kind === "subtitles" ? "captions" : init.kind;
    if (this.kb[kind] && init.default) delete init.default;
    track.addEventListener("mode-change", this.ag);
    this[ListSymbol.da](track, trigger);
    track[TextTrackSymbol.Db] = this[TextTrackSymbol.Db];
    if (this.Z) track[TextTrackSymbol.Z]();
    if (init.default) this.kb[kind] = track;
    this.bg();
    return this;
  }
  remove(track, trigger) {
    this.Zd = track;
    if (!this.A.includes(track)) return;
    if (track === this.kb[track.kind]) delete this.kb[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol.hb] = null;
    track.removeEventListener("mode-change", this.ag);
    this[ListSymbol.cc](track, trigger);
    this.Zd = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this.A]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.A.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [(TextTrackSymbol.Z)]() {
    if (this.Z) return;
    for (const track of this.A) track[TextTrackSymbol.Z]();
    this.Z = true;
    this.bg();
  }
  hi(event) {
    const track = event.detail;
    if (this.lb && isTrackCaptionKind(track) && track !== this.Zd) {
      this.cg(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this.A) {
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
  cg(track) {
    if (track.mode !== "disabled") {
      this.$f(track.language);
    }
    this.lb?.setCaptions?.(track.mode === "showing");
  }
  $f(lang) {
    this.lb?.setLang?.(this.mb = lang);
  }
  setStorage(storage) {
    this.lb = storage;
  }
}

const SELECTED = Symbol(0);
class SelectList extends List {
  get selected() {
    return this.A.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.A.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol.Hf](item, trigger) {
    this[ListSymbol.ea](item, false, trigger);
  }
  /** @internal */
  [ListSymbol.da](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly) return;
        this[ListSymbol.If]?.();
        this[ListSymbol.ea](item, selected);
      }
    });
    super[ListSymbol.da](item, trigger);
  }
  /** @internal */
  [ListSymbol.ea](item, selected, trigger) {
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
    this.cd = false;
    this.switch = "current";
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this.cd || this.readonly;
  }
  /** @internal */
  [(ListSymbol.If)]() {
    this[QualitySymbol.Wa](false);
  }
  /** @internal */
  [ListSymbol.Gf](trigger) {
    this[QualitySymbol.Ia] = void 0;
    this[QualitySymbol.Wa](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.cd || !this[QualitySymbol.Ia]) return;
    this[QualitySymbol.Ia]?.(trigger);
    this[QualitySymbol.Wa](true, trigger);
  }
  getBySrc(src) {
    return this.A.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol.Wa](auto, trigger) {
    if (this.cd === auto) return;
    this.cd = auto;
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
    this.a = _media;
    this.Ib = null;
  }
  onConnect() {
    effect(this.ii.bind(this));
  }
  ii() {
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
      listenEvent(target, "keyup", this.hc.bind(this));
      listenEvent(target, "keydown", this.ic.bind(this));
      listenEvent(target, "keydown", this.ji.bind(this), { capture: true });
    });
  }
  hc(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this._d(event);
    if (!isString(value) && !isArray(value)) {
      value?.onKeyUp?.({
        event,
        player: this.a.player,
        remote: this.a.remote
      });
      value?.callback?.(event, this.a.remote);
      return;
    }
    if (method?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this.Ib) {
        this.dg(event, method === "seekForward");
        this.Ib = null;
      } else {
        this.a.remote.seek(this.dd, event);
        this.dd = void 0;
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
  ic(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key)) return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this._d(event), isNumberPress = !event.metaKey && /^[0-9]$/.test(event.key);
    if (!isString(value) && !isArray(value) && !isNumberPress) {
      value?.onKeyDown?.({
        event,
        player: this.a.player,
        remote: this.a.remote
      });
      value?.callback?.(event, this.a.remote);
      return;
    }
    if (!method && isNumberPress) {
      event.preventDefault();
      event.stopPropagation();
      this.a.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method) return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this.Ja(event, method, method === "seekForward");
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
          this.a.remote.changeVolume(
            this.$state.volume() + (method === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this.a.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this.a.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this.a.remote[method]?.(event);
    }
    this.$state.lastKeyboardAction.set({
      action: method,
      event
    });
  }
  ji(event) {
    if (isHTMLMediaElement(event.target) && this._d(event).method) {
      event.preventDefault();
    }
  }
  _d(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this.a.ariaKeys
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
  ki(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this.dd = Math.max(
      0,
      Math.min(
        (this.dd ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  dg(event, forward) {
    this.Ib?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  Ja(event, type, forward) {
    if (!this.$state.canSeek()) return;
    if (!this.Ib) {
      this.Ib = this.el.querySelector("[data-media-time-slider]");
    }
    if (this.Ib) {
      this.dg(event, forward);
    } else {
      this.a.remote.seeking(this.ki(event, type), event);
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
    this.Sd = -2;
    this.Gb = false;
    this.Sf = signal(false);
    this.Td = signal(false);
    this.ec = null;
    this.Ud = signal(true);
    this.defaultDelay = 2e3;
  }
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return this.Ud();
  }
  set canIdle(canIdle) {
    this.Ud.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this.Sf() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this.Sf.set(hide);
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
    this.Vd();
    if (!this.Gb) {
      this.ad(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this.Vd();
    if (!this.Gb) {
      this.ad(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this.Gb = true;
    this.Vd();
    this.ad(true, 0, trigger);
  }
  resume(trigger) {
    this.Gb = false;
    if (this.$state.paused()) return;
    this.ad(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this.Hb.bind(this));
  }
  Hb() {
    const { viewType } = this.$state;
    if (!this.Ud()) return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this.$h.bind(this));
    effect(this.fc.bind(this));
    const onPlay = this.gc.bind(this), onPause = this.ib.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  $h() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine") return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this.Td()) {
      effect(() => {
        if (!paused()) this.listen("pointermove", this.Tf.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this.ai.bind(this));
      this.listen("mouseleave", this.bi.bind(this));
    }
  }
  fc() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started()) return;
    const onStopIdle = this.Tf.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  gc(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  ib(event) {
    this.show(0, event);
  }
  ai(event) {
    this.Td.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  bi(event) {
    this.Td.set(true);
    this.hide(0, event);
  }
  Vd() {
    window.clearTimeout(this.Sd);
    this.Sd = -1;
  }
  Tf(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this.Gb || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this.ec = null;
      } else if (this.ec) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this.ec?.focus();
          this.ec = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  ad(visible, delay, trigger) {
    if (delay === 0) {
      this.E(visible, trigger);
      return;
    }
    this.Sd = window.setTimeout(() => {
      if (!this.scope) return;
      this.E(visible && !this.Gb, trigger);
    }, delay);
  }
  E(visible, trigger) {
    if (this.$state.controlsVisible() === visible) return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this.ec = document.activeElement;
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
    return new (await import('../providers/vidstack-youtube.js')).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import('./vidstack-Zc3I7oOd.js');
    const videoId = isString(src.src) && resolveYouTubeVideoId(src.src);
    if (videoId) return findYouTubePoster(videoId, abort);
    return null;
  }
}

const MEDIA_ATTRIBUTES = Symbol(0);
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
  logLevel: "silent",
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

class MediaLoadController extends MediaPlayerController {
  constructor(_type, _callback) {
    super();
    this.la = _type;
    this.La = _callback;
  }
  async onAttach(el) {
    const load = this.$props[this.la]();
    if (load === "eager") {
      requestAnimationFrame(this.La);
    } else if (load === "idle") {
      waitIdlePeriod(this.La);
    } else if (load === "visible") {
      let dispose, observer = new IntersectionObserver((entries) => {
        if (!this.scope) return;
        if (entries[0].isIntersecting) {
          dispose?.();
          dispose = void 0;
          this.La();
        }
      });
      observer.observe(el);
      dispose = onDispose(() => observer.disconnect());
    }
  }
}

class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this.V = _handle;
    this.a = _media;
    this.c = (type, ...init) => {
      this.V(
        new DOMEvent(type, {
          detail: init?.[0],
          trigger: init?.[1]
        })
      );
    };
  }
  async Ga(info, trigger) {
    return untrack(async () => {
      this.a; const {
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
      } = this.a.$state;
      if (canPlay()) return;
      const detail = {
        duration: info?.duration ?? duration(),
        seekable: info?.seekable ?? seekable(),
        buffered: info?.buffered ?? buffered(),
        provider: this.a.$provider()
      };
      this.c("can-play", detail, trigger);
      tick();
      let provider = this.a.$provider(), { storage, qualities } = this.a, { muted, volume, clipStartTime, playbackRate } = this.a.$props;
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
        await this.kj(trigger);
      } else if (storageTime && storageTime > 0) {
        this.c("started", void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
  async kj(trigger) {
    const {
      player,
      $state: { autoPlaying, muted }
    } = this.a;
    autoPlaying.set(true);
    const attemptEvent = new DOMEvent("auto-play-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
    }
  }
}

class Queue {
  constructor() {
    this.i = /* @__PURE__ */ new Map();
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  k(key, item) {
    this.i.set(key, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  xe(key) {
    const value = this.rg(key);
    this.i.delete(key);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  rg(key) {
    return this.i.get(key);
  }
  /**
   * Removes queued item under the given `key`.
   */
  ub(key) {
    this.i.delete(key);
  }
  /**
   * Clear all items in the queue.
   */
  Pm() {
    this.i.clear();
  }
}

class RequestQueue {
  constructor() {
    this.wc = false;
    this.ye = deferredPromise();
    this.i = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get Qm() {
    return this.i.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get Rm() {
    return this.wc;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async Sm() {
    if (this.wc) return;
    await this.ye.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  k(key, callback) {
    if (this.wc) {
      callback();
      return;
    }
    this.i.delete(key);
    this.i.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  xe(key) {
    this.i.get(key)?.();
    this.i.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  Xa() {
    this.sg();
    this.wc = true;
    if (this.i.size > 0) this.sg();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  $() {
    this.wc = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  z() {
    this.$();
    this.i.clear();
    this.tg();
  }
  sg() {
    for (const key of this.i.keys()) this.xe(key);
    this.tg();
  }
  tg() {
    this.ye.resolve();
    this.ye = deferredPromise();
  }
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this.Ba = _stateMgr;
    this.g = _request;
    this.a = _media;
    this.zc = new RequestQueue();
    this.Fe = false;
    this.C = _media.$provider;
    this.yc = new MediaControls();
    this.pd = new FullscreenController();
    this.bb = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this.Qd.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.Hj.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this.Ij();
    effect(this.Jj.bind(this));
    effect(this.Kj.bind(this));
    effect(this.Lj.bind(this));
    effect(this.Mj.bind(this));
    effect(this.Nj.bind(this));
    effect(this.Oj.bind(this));
    effect(this.Pj.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen()) this.Lg("prefer-media", destroyEvent);
      if (pictureInPicture()) this.Ge(destroyEvent);
    } catch (e) {
    }
    this.zc.z();
  }
  Ij() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad()) return;
    const off = this.listen("media-play-request", (event) => {
      this.Gg(event);
      off();
    });
  }
  Jj() {
    const provider = this.C(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this.zc.Xa();
    }
    return () => {
      this.zc.$();
    };
  }
  Hj(event) {
    event.stopPropagation();
    if (event.defaultPrevented) return;
    if (!this[event.type]) return;
    if (peek(this.C)) {
      this[event.type](event);
    } else {
      this.zc.k(event.type, () => {
        if (peek(this.C)) this[event.type](event);
      });
    }
  }
  async Ac(trigger) {
    const { canPlay, paused, autoPlaying } = this.$state;
    if (this.Gg(trigger)) return;
    if (!peek(paused)) return;
    if (trigger) this.g.i.k("media-play-request", trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider = peek(this.C);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.play();
    } catch (error) {
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoPlay = isAutoPlaying;
      this.Ba.V(errorEvent);
      throw error;
    }
  }
  Gg(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event);
      this.zc.k("media-play-request", async () => {
        try {
          await this.Ac(event);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async Ee(trigger) {
    const { canPlay, paused } = this.$state;
    if (peek(paused)) return;
    if (trigger) {
      this.g.i.k("media-pause-request", trigger);
    }
    try {
      const provider = peek(this.C);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.pause();
    } catch (error) {
      this.g.i.ub("media-pause-request");
      throw error;
    }
  }
  Hg(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain) return;
    const provider = this.C();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this.g.i.k("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  Ig(trigger) {
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek())) return;
    const provider = peek(this.C);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    if (trigger) this.g.i.k("media-seek-request", trigger);
    const end = seekableEnd() - 2;
    provider.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  async Jg(target = "prefer-media", trigger) {
    const adapter = this.Kg(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active) return;
    if (peek(this.$state.pictureInPicture)) {
      this.Fe = true;
      await this.Ge(trigger);
    }
    if (trigger) {
      this.g.i.k("media-enter-fullscreen-request", trigger);
    }
    return adapter.enter();
  }
  async Lg(target = "prefer-media", trigger) {
    const adapter = this.Kg(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active) return;
    if (trigger) {
      this.g.i.k("media-exit-fullscreen-request", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this.Fe && peek(this.$state.canPictureInPicture)) {
        await this.He();
      }
      return result;
    } finally {
      this.Fe = false;
    }
  }
  Kg(target) {
    const provider = peek(this.C);
    return target === "prefer-media" && this.pd.supported || target === "media" ? this.pd : provider?.fullscreen;
  }
  async He(trigger) {
    this.Mg();
    if (this.$state.pictureInPicture()) return;
    if (trigger) {
      this.g.i.k("media-enter-pip-request", trigger);
    }
    return await this.C().pictureInPicture.enter();
  }
  async Ge(trigger) {
    this.Mg();
    if (!this.$state.pictureInPicture()) return;
    if (trigger) {
      this.g.i.k("media-exit-pip-request", trigger);
    }
    return await this.C().pictureInPicture.exit();
  }
  Mg() {
    if (this.$state.canPictureInPicture()) return;
    throw Error(
      "[vidstack] no pip support"
    );
  }
  Kj() {
    this.yc.defaultDelay = this.$props.controlsDelay();
  }
  Lj() {
    const { canSetAudioGain } = this.$state, supported = !!this.C()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  Mj() {
    const { canAirPlay } = this.$state, supported = !!this.C()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  Nj() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
    canGoogleCast.set(supported);
  }
  Oj() {
    const { canFullscreen } = this.$state, supported = this.pd.supported || !!this.C()?.fullscreen?.supported;
    canFullscreen.set(supported);
  }
  Pj() {
    const { canPictureInPicture } = this.$state, supported = !!this.C()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event) {
    try {
      await this.Ng(event);
    } catch (error) {
    }
  }
  async Ng(trigger) {
    try {
      const adapter = this.C()?.airPlay;
      if (!adapter?.supported) {
        throw Error(false ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this.g.i.k("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this.g.i.ub("media-airplay-request");
      throw error;
    }
  }
  async ["media-google-cast-request"](event) {
    try {
      await this.Og(event);
    } catch (error) {
    }
  }
  async Og(trigger) {
    try {
      const { canGoogleCast } = this.$state;
      if (!peek(canGoogleCast)) {
        const error = Error(
          false ? "Google Cast not available on this platform." : "Cast not available."
        );
        error.code = "CAST_NOT_AVAILABLE";
        throw error;
      }
      preconnect("https://www.gstatic.com");
      if (!this.qd) {
        const $module = await import('./vidstack-CMYUT9x7.js');
        this.qd = new $module.GoogleCastLoader();
      }
      await this.qd.prompt(this.a);
      if (trigger) {
        this.g.i.k("media-google-cast-request", trigger);
      }
      const isConnecting = peek(this.$state.remotePlaybackState) !== "disconnected";
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime)
        });
      }
      this.$state.remotePlaybackLoader.set(isConnecting ? this.qd : null);
    } catch (error) {
      this.g.i.ub("media-google-cast-request");
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
    const { logger, audioTracks } = this.a;
    if (audioTracks.readonly) {
      return;
    }
    const index = event.detail, track = audioTracks[index];
    if (track) {
      const key = event.type;
      this.g.i.k(key, event);
      track.selected = true;
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this.Jg(event.detail, event);
    } catch (error) {
      this.Zc(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this.Lg(event.detail, event);
    } catch (error) {
      this.Zc(error, event);
    }
  }
  async Qd(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || lockType === "none" || !this.bb.supported) return;
    if (isFullscreen) {
      if (this.bb.locked) return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this.bb.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  Zc(error, request) {
    this.Ba.V(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    const key = event.type;
    try {
      this.g.i.k(key, event);
      await this.bb.lock(event.detail);
    } catch (error) {
      this.g.i.ub(key);
    }
  }
  async ["media-orientation-unlock-request"](event) {
    const key = event.type;
    try {
      this.g.i.k(key, event);
      await this.bb.unlock();
    } catch (error) {
      this.g.i.ub(key);
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this.He(event);
    } catch (error) {
      this.Pg(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this.Ge(event);
    } catch (error) {
      this.Pg(error, event);
    }
  }
  Pg(error, request) {
    this.Ba.V(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek()) return;
    this.g.i.k("media-seek-request", event);
    try {
      this.Ig();
    } catch (error) {
      this.g.i.ub("media-seek-request");
    }
  }
  async ["media-loop-request"](event) {
    try {
      this.g.Ob = true;
      this.g.Bc = true;
      await this.Ac(event);
    } catch (error) {
      this.g.Ob = false;
    }
  }
  ["media-user-loop-change-request"](event) {
    this.$state.userPrefersLoop.set(event.detail);
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused()) return;
    try {
      await this.Ee(event);
    } catch (error) {
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused()) return;
    try {
      await this.Ac(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate()) return;
    const provider = this.C();
    if (!provider?.setPlaybackRate) return;
    this.g.i.k("media-rate-change-request", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-audio-gain-change-request"](event) {
    try {
      this.Hg(event.detail, event);
    } catch (e) {
    }
  }
  ["media-quality-change-request"](event) {
    const { qualities, storage, logger } = this.a;
    if (qualities.readonly) {
      return;
    }
    this.g.i.k("media-quality-change-request", event);
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
      }
    }
  }
  ["media-pause-controls-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.yc.pause(event);
  }
  ["media-resume-controls-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.yc.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event.detail;
    if (ended()) this.g.Bc = true;
    const key = event.type;
    this.g.Ja = false;
    this.g.i.ub(key);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek()) return;
    this.g.i.k(key, event);
    this.C().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.$state.seeking.set(true);
    this.g.Ja = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad()) return;
    const key = event.type;
    this.g.i.k(key, event);
    this.Ba.V(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event) {
    if (this.$state.canLoadPoster()) return;
    const key = event.type;
    this.g.i.k(key, event);
    this.Ba.V(this.createEvent("can-load-poster"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this.a.textTracks[index];
    if (track) {
      const key = event.type;
      this.g.i.k(key, event);
      track.setMode(mode, event);
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted()) return;
    const key = event.type;
    this.g.i.k(key, event);
    this.C().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted()) return;
    const key = event.type;
    this.g.i.k(key, event);
    this.a.$provider().setMuted(false);
    if (volume() === 0) {
      this.g.i.k(key, event);
      this.C().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume) return;
    const key = event.type;
    this.g.i.k(key, event);
    this.C().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this.g.i.k(key, event);
      this.C().setMuted(false);
    }
  }
  Qa(title, error, request) {
    return;
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay) return;
  throw Error(
    "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported) return;
  throw Error(
    "[vidstack] no fullscreen support"
  );
}
class MediaRequestContext {
  constructor() {
    this.Ja = false;
    this.Ob = false;
    this.Bc = false;
    this.i = new Queue();
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
    this.g = _request;
    this.a = _media;
    this.u = /* @__PURE__ */ new Map();
    this.rd = false;
    this.On = [];
    this.Ln = [-1, -1];
    this.sd = false;
    this.Cc = false;
    this.Ke = null;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, realCurrentTime, paused } = this.$state;
        seeking.set(true);
        realCurrentTime.set(event.detail);
        this.D("media-seeking-request", event);
        if (paused()) {
          this.Pb = event;
          this.Le();
        }
        this.Ln = [-1, -1];
      },
      150,
      { leading: true }
    );
    this.Le = functionDebounce(() => {
      if (!this.Pb) return;
      this.sd = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this.Pb });
      this.u.set("waiting", event);
      this.dispatch(event);
      this.Pb = void 0;
      this.sd = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this.Qj.bind(this));
    this.Rj();
    this.Sj();
    this.Tj();
    this.Uj();
    onDispose(this.Vj.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this.a;
    audioTracks[ListSymbol.z]();
    qualities[ListSymbol.z]();
    textTracks[ListSymbol.z]();
    this.Ie();
  }
  V(event) {
    if (!this.scope) return;
    const type = event.type;
    untrack(() => this[event.type]?.(event));
    {
      if (TRACKED_EVENT.has(type)) this.u.set(type, event);
      this.dispatch(event);
    }
  }
  Uj() {
    if (!this.Cc) return;
    requestAnimationFrame(() => {
      if (!this.scope) return;
      this.a.remote.play(new DOMEvent("dom-connect"));
    });
    this.Cc = false;
  }
  Vj() {
    if (this.Cc) return;
    this.Cc = !this.$state.paused();
    this.a.$provider()?.pause();
  }
  vb() {
    this.Qg();
    this.rd = false;
    this.g.Bc = false;
    this.g.Ob = false;
    this.sd = false;
    this.Pb = void 0;
    this.u.clear();
  }
  D(request, event) {
    const requestEvent = this.g.i.xe(request);
    if (!requestEvent) return;
    event.request = requestEvent;
    event.triggers.add(requestEvent);
  }
  Rj() {
    this.Je();
    this.Rg();
    const textTracks = this.a.textTracks;
    listenEvent(textTracks, "add", this.Je.bind(this));
    listenEvent(textTracks, "remove", this.Je.bind(this));
    listenEvent(textTracks, "mode-change", this.Rg.bind(this));
  }
  Sj() {
    const qualities = this.a.qualities;
    listenEvent(qualities, "add", this.ld.bind(this));
    listenEvent(qualities, "remove", this.ld.bind(this));
    listenEvent(qualities, "change", this.Za.bind(this));
    listenEvent(qualities, "auto-change", this.Wj.bind(this));
    listenEvent(qualities, "readonly-change", this.Xj.bind(this));
  }
  Tj() {
    const audioTracks = this.a.audioTracks;
    listenEvent(audioTracks, "add", this.Sg.bind(this));
    listenEvent(audioTracks, "remove", this.Sg.bind(this));
    listenEvent(audioTracks, "change", this.Yj.bind(this));
  }
  Je(event) {
    const { textTracks } = this.$state;
    textTracks.set(this.a.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  Rg(event) {
    if (event) this.D("media-text-track-change-request", event);
    const current = this.a.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  Sg(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this.a.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  Yj(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this.a.audioTracks.selected);
    if (event) this.D("media-audio-track-change-request", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  ld(event) {
    const { qualities } = this.$state;
    qualities.set(this.a.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  Za(event) {
    const { quality } = this.$state;
    quality.set(this.a.qualities.selected);
    if (event) this.D("media-quality-change-request", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  Wj() {
    const { qualities } = this.a, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto) this.Ie();
  }
  Tg() {
    this.Ie();
    this.Ke = effect(() => {
      const { qualities } = this.a, { mediaWidth, mediaHeight } = this.$state, w = mediaWidth(), h = mediaHeight();
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
        qualities[ListSymbol.ea](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w, height: h } })
        );
      }
    });
  }
  Ie() {
    this.Ke?.();
    this.Ke = null;
  }
  Xj() {
    this.$state.canSetQuality.set(!this.a.qualities.readonly);
  }
  Qj() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event) {
    const prevProvider = this.a.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type) return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this.a.$provider.set(event.detail);
    if (prevProvider && event.detail === null) {
      this.Ug(event);
    }
  }
  ["provider-loader-change"](event) {
  }
  ["auto-play"](event) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event) {
    this.$state.autoPlayError.set(event.detail);
    this.vb();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this.u.set("can-load", event);
    this.a.textTracks[TextTrackSymbol.Z]();
    this.D("media-start-loading", event);
  }
  ["can-load-poster"](event) {
    this.$state.canLoadPoster.set(true);
    this.u.set("can-load-poster", event);
    this.D("media-poster-start-loading", event);
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this.u.get("source-change");
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
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    const { storage } = this.a, { canPlay } = this.$state;
    this.$state.playbackRate.set(event.detail);
    this.D("media-rate-change-request", event);
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
      this.D(key, event);
    } else {
      const requestEvent = this.g.i.rg(key);
      if (requestEvent) {
        event.request = requestEvent;
        event.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event) {
    const prevSources = this.$state.sources(), newSources = event.detail;
    this.$state.sources.set(newSources);
    this.Zj(prevSources, newSources, event);
  }
  Zj(prevSources, newSources, trigger) {
    let { qualities } = this.a, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc)) continue;
      const exists = newSources.some((s) => s.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol.cc](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol.z](trigger);
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
      qualities[ListSymbol.da](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol.Ia]) {
      this.Tg();
      qualities[QualitySymbol.Ia] = this.Tg.bind(this);
      qualities[QualitySymbol.Wa](true, trigger);
    }
  }
  ["source-change"](event) {
    event.isQualityChange = event.originEvent?.type === "quality-change";
    const source = event.detail;
    this.Ug(event, event.isQualityChange);
    this.u.set(event.type, event);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
  }
  Ug(event, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this.a;
    if (!isSourceQualityChange) {
      this.On = [];
      this.Ln = [-1, -1];
      audioTracks[ListSymbol.z](event);
      qualities[ListSymbol.z](event);
      softResetMediaState(this.$state, isSourceQualityChange);
      this.vb();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this.vb();
  }
  ["abort"](event) {
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this.u.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent) event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this.u.get("abort");
    if (abortEvent) event.triggers.add(abortEvent);
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this.u.get("load-start");
    if (loadStartEvent) event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this.u.get("load-start");
    if (loadStartEvent) event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this.u.get("loaded-metadata");
    if (loadedMetadata) event.triggers.add(loadedMetadata);
    this.Vg(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this.Vg(event.detail);
    const canPlay = this.u.get("can-play");
    if (canPlay) event.triggers.add(canPlay);
  }
  Vg(detail) {
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
      if (ended()) this.Wg(event);
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
    this._j();
    if (!paused()) {
      event.stopImmediatePropagation();
      return;
    }
    event.autoPlay = autoPlaying();
    const waitingEvent = this.u.get("waiting");
    if (waitingEvent) event.triggers.add(waitingEvent);
    this.D("media-play-request", event);
    this.u.set("play", event);
    paused.set(false);
    autoPlayError.set(null);
    if (event.autoPlay) {
      this.V(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this.g.Bc) {
      this.g.Bc = false;
      ended.set(false);
      this.V(this.createEvent("replay", { trigger: event }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this.a.remote.enterFullscreen("prefer-media", event);
    }
    if (live() && !userBehindLiveEdge()) {
      this.a.remote.seekToLiveEdge(event);
    }
  }
  _j(trigger) {
    const provider = peek(this.a.$provider);
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
    const playEvent = this.u.get("play");
    if (playEvent) event.triggers.add(playEvent);
    this.D("media-play-request", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.vb();
    this.u.set("play-fail", event);
    if (event.autoPlay) {
      this.V(
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
    const playEvent = this.u.get("play"), seekedEvent = this.u.get("seeked");
    if (playEvent) event.triggers.add(playEvent);
    else if (seekedEvent) event.triggers.add(seekedEvent);
    setTimeout(() => this.vb(), 0);
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
    if (this.g.Ob) {
      this.g.Ob = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end)) this.a.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.V(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this.Cc = true;
    }
    this.D("media-pause-request", event);
    const seekedEvent = this.u.get("seeked");
    if (seekedEvent) event.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this.rd) {
      setTimeout(() => {
        this.V(this.createEvent("end", { trigger: event }));
        this.rd = false;
      }, 0);
    }
    this.vb();
  }
  ["time-change"](event) {
    if (this.g.Ob) {
      event.stopImmediatePropagation();
      return;
    }
    let { waiting, played, clipEndTime, realCurrentTime, currentTime } = this.$state, newTime = event.detail, endTime = clipEndTime();
    realCurrentTime.set(newTime);
    this.Pn();
    waiting.set(false);
    for (const track of this.a.textTracks) {
      track[TextTrackSymbol.Eb](newTime, event);
    }
    if (endTime > 0 && newTime >= endTime) {
      this.rd = true;
      this.dispatch("media-pause-request", { trigger: event });
    }
    this.$j();
    this.dispatch("time-update", {
      detail: { currentTime: currentTime(), played: played() },
      trigger: event
    });
  }
  Pn() {
    const { currentTime, played, paused } = this.$state;
    if (paused()) return;
    this.Ln = updateTimeIntervals(
      this.On,
      this.Ln,
      currentTime()
    );
    played.set(new TimeRange(this.On));
  }
  // Called to update time again incase duration precision has changed.
  Wg(trigger) {
    const { clipStartTime, clipEndTime, duration } = this.$state, isClipped = clipStartTime() > 0 || clipEndTime() > 0;
    if (isClipped) return;
    this.V(
      this.createEvent("time-change", {
        detail: duration(),
        trigger
      })
    );
  }
  $j() {
    const { storage } = this.a, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event) {
    const { storage } = this.a, { canPlay, audioGain } = this.$state;
    audioGain.set(event.detail);
    this.D("media-audio-gain-change-request", event);
    if (canPlay()) storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event) {
    const { storage } = this.a, { volume, muted, canPlay } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.D("media-volume-change-request", event);
    this.D(detail.muted ? "media-mute-request" : "media-unmute-request", event);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeked"](event) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this.g.Ja) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.u.get("waiting");
      if (waitingEvent) event.triggers.add(waitingEvent);
      const seekingEvent = this.u.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused()) this.Qg();
      seeking.set(false);
      realCurrentTime.set(event.detail);
      this.D("media-seek-request", event);
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
    if (this.sd || this.g.Ja) return;
    event.stopImmediatePropagation();
    this.Pb = event;
    this.Le();
  }
  ["end"](event) {
    const { loop, ended } = this.$state;
    if (!loop() && ended()) return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this._j(event);
          this.dispatch("media-loop-request", { trigger: event });
        });
      }, 10);
      return;
    }
    setTimeout(() => this.lc(event), 0);
  }
  lc(event) {
    const { storage } = this.a, { paused, seeking, ended, duration } = this.$state;
    this.Wg(event);
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
    this.vb();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event
    });
  }
  Qg() {
    this.Le.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    const isFullscreen = event.detail;
    this.$state.fullscreen.set(isFullscreen);
    this.D(
      isFullscreen ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event
    );
  }
  ["fullscreen-error"](event) {
    this.D("media-enter-fullscreen-request", event);
    this.D("media-exit-fullscreen-request", event);
  }
  ["orientation-change"](event) {
    const isLocked = event.detail.lock;
    this.D(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event
    );
  }
  ["picture-in-picture-change"](event) {
    const isPiP = event.detail;
    this.$state.pictureInPicture.set(isPiP);
    this.D(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event);
  }
  ["picture-in-picture-error"](event) {
    this.D("media-enter-pip-request", event);
    this.D("media-exit-pip-request", event);
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
    this.Hb();
    const effects = [
      this.bk,
      this.ck,
      this.Jn,
      this.Kn,
      this.Xd,
      this.Ca,
      this.ek,
      this.fk,
      this.gk,
      this.hk,
      this.ik,
      this.Me,
      this.jk,
      this.kk,
      this.td
    ];
    for (const callback of effects) {
      effect(callback.bind(this));
    }
  }
  Hb() {
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
  kk() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  ak() {
    return;
  }
  bk() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  td() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  ck() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  ik() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  Xd() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  jk() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  Ca() {
    const _crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = _crossOrigin === true ? "" : _crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  ek() {
    const { duration } = this.$props;
    this.dispatch("media-duration-change-request", {
      detail: duration()
    });
  }
  Me() {
    const inline = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline);
    this.dispatch("plays-inline-change", { detail: inline });
  }
  Jn() {
    const { clipStartTime } = this.$props;
    this.dispatch("media-clip-start-change-request", {
      detail: clipStartTime()
    });
  }
  Kn() {
    const { clipEndTime } = this.$props;
    this.dispatch("media-clip-end-change-request", {
      detail: clipEndTime()
    });
  }
  fk() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  hk() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  gk() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

class NavigatorMediaSession extends MediaPlayerController {
  static {
    this.Xg = ["play", "pause", "seekforward", "seekbackward", "seekto"];
  }
  constructor() {
    super();
  }
  onConnect() {
    effect(this.lk.bind(this));
    effect(this.mk.bind(this));
    const handleAction = this.nk.bind(this);
    for (const action of NavigatorMediaSession.Xg) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this.Fa.bind(this));
  }
  Fa() {
    for (const action of NavigatorMediaSession.Xg) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  lk() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  mk() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  nk(details) {
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
const _MediaPlayer = class _MediaPlayer2 extends Component {
  constructor() {
    super();
    this.canPlayQueue = new RequestQueue();
    this.Re = false;
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
    context.remote = this.remoteControl = new MediaRemoteControl(
      void 0
    );
    context.remote.setPlayer(this);
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol.Db] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this.a = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    const request = new MediaRequestContext();
    this.Ba = new MediaStateManager(request, context);
    this.W = new MediaRequestManager(this.Ba, request, context);
    context.delegate = new MediaPlayerDelegate(
      this.Ba.V.bind(this.Ba),
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
  get p() {
    return this.a.$provider();
  }
  get vd() {
    return this.$props;
  }
  onSetup() {
    this.rk();
    effect(this.sk.bind(this));
    effect(this.tk.bind(this));
    effect(this.fc.bind(this));
    effect(this.Fc.bind(this));
    effect(this.Qb.bind(this));
    effect(this.Me.bind(this));
    effect(this.Qe.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this.uk.bind(this));
    effect(this.td.bind(this));
    effect(this.Yg.bind(this));
    listenEvent(el, "find-media-player", this.vk.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE) setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this.Zg(pointerQuery);
    pointerQuery.onchange = this.Zg.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this.pa.bind(this)));
    resize.observe(el);
    effect(this.pa.bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
    });
  }
  onDestroy() {
    this.a.player = null;
    this.canPlayQueue.z();
  }
  td() {
    const el = this.$el, { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
    );
    if (el?.hasAttribute("title")) {
      this.Re = true;
      el?.removeAttribute("title");
    }
  }
  Yg() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this.pa();
  }
  sk() {
    if (this.$state.canPlay() && this.p) this.canPlayQueue.Xa();
    else this.canPlayQueue.$();
  }
  rk() {
    if (_MediaPlayer2[MEDIA_ATTRIBUTES]) {
      this.setAttributes(_MediaPlayer2[MEDIA_ATTRIBUTES]);
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
    _MediaPlayer2[MEDIA_ATTRIBUTES] = $attrs;
    this.setAttributes($attrs);
  }
  vk(event) {
    event.detail(this);
  }
  pa() {
    if (!this.el) return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  Zg(queryList) {
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this.pa();
  }
  get provider() {
    return this.p;
  }
  get controls() {
    return this.W.yc;
  }
  set controls(controls) {
    this.vd.controls.set(controls);
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this.Re) {
      this.Re = false;
      return;
    }
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return this.a.qualities;
  }
  get audioTracks() {
    return this.a.audioTracks;
  }
  get textTracks() {
    return this.a.textTracks;
  }
  get textRenderers() {
    return this.a.textRenderers;
  }
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    this.vd.duration.set(duration);
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this._g(paused);
  }
  fc() {
    this._g(this.$props.paused());
  }
  _g(paused) {
    if (paused) {
      this.canPlayQueue.k("paused", () => this.W.Ee());
    } else this.canPlayQueue.k("paused", () => this.W.Ac());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    this.wk(muted);
  }
  tk() {
    this.wk(this.$props.muted());
  }
  wk(muted) {
    this.canPlayQueue.k("muted", () => {
      if (this.p) this.p.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this.$g(time);
  }
  Qb() {
    this.$g(this.$props.currentTime());
  }
  $g(time) {
    this.canPlayQueue.k("currentTime", () => {
      const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
      if (time === peek(currentTime)) return;
      peek(() => {
        if (!this.p) return;
        const clippedTime = time + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
        if (Number.isFinite(boundTime)) {
          this.p.setCurrentTime(boundTime);
        }
      });
    });
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    this.xk(volume);
  }
  Fc() {
    this.xk(this.$props.volume());
  }
  xk(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue.k("volume", () => {
      if (this.p) this.p.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this.ah(rate);
  }
  Qe() {
    this.ah(this.$props.playbackRate());
  }
  ah(rate) {
    this.canPlayQueue.k("rate", () => {
      if (this.p) this.p.setPlaybackRate?.(rate);
    });
  }
  Me() {
    this.yk(this.$props.playsInline());
  }
  yk(inline) {
    this.canPlayQueue.k("playsinline", () => {
      if (this.p) this.p.setPlaysInline?.(inline);
    });
  }
  uk() {
    let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
    if (storage?.onChange) {
      const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(this.zk.bind(this));
      effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
    }
    this.a.storage = storage;
    this.a.textTracks.setStorage(storage);
    onDispose(() => {
      storage?.onDestroy?.();
      this.a.storage = null;
      this.a.textTracks.setStorage(null);
    });
  }
  zk() {
    const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
    return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
  }
  async play(trigger) {
    return this.W.Ac(trigger);
  }
  async pause(trigger) {
    return this.W.Ee(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this.W.Jg(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this.W.Lg(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this.W.He(trigger);
  }
  exitPictureInPicture(trigger) {
    return this.W.Ge(trigger);
  }
  seekToLiveEdge(trigger) {
    this.W.Ig(trigger);
  }
  startLoading(trigger) {
    this.a.delegate.c("can-load", void 0, trigger);
  }
  startLoadingPoster(trigger) {
    this.a.delegate.c("can-load-poster", void 0, trigger);
  }
  requestAirPlay(trigger) {
    return this.W.Ng(trigger);
  }
  requestGoogleCast(trigger) {
    return this.W.Og(trigger);
  }
  setAudioGain(gain, trigger) {
    return this.W.Hg(gain, trigger);
  }
  destroy() {
    super.destroy();
    this.a.remote.setPlayer(null);
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

const sourceTypes = /* @__PURE__ */ new Map();
class SourceSelection {
  constructor(_domSources, _media, _loader, customLoaders = []) {
    this.wd = _domSources;
    this.a = _media;
    this.X = _loader;
    this.Se = false;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this.Te = computed(() => {
      const remoteLoader = _media.$state.remotePlaybackLoader();
      const loaders = _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this.Te().find((loader2) => loader2.canPlay(src));
      if (!loader) continue;
      const mediaType = loader.mediaType(src);
      this.a.$state.source.set(src);
      this.a.$state.mediaType.set(mediaType);
      this.a.$state.inferredViewType.set(mediaType);
      this.X.set(loader);
      this.Se = true;
      break;
    }
  }
  get c() {
    return this.a.delegate.c;
  }
  connect() {
    const loader = this.X();
    if (this.Se) {
      this.bh(this.a.$state.source(), loader);
      this.ch(loader);
      this.Se = false;
    }
    effect(this.Ak.bind(this));
    effect(this.Bk.bind(this));
    effect(this.Ck.bind(this));
    effect(this.Dk.bind(this));
    effect(this.Ek.bind(this));
  }
  Ak() {
    this.c("sources-change", [
      ...normalizeSrc(this.a.$props.src()),
      ...this.wd()
    ]);
  }
  Bk() {
    const { $state } = this.a;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this.dh(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
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
        const newSource2 = this.dh(peek($state.source), sources2);
        tick();
        if (!newSource2.src) {
          this.c("error", {
            message: "Failed to load resource.",
            code: 4
          });
        }
      });
      return () => abort.abort();
    }
    tick();
  }
  dh(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this.Te(), { started, paused, currentTime, quality, savedState } = this.a.$state;
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
      this.bh(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this.X)) {
      this.ch(newLoader, triggerEvent);
    }
    return newSource;
  }
  bh(src, loader, trigger) {
    this.c("source-change", src, trigger);
    this.c("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  ch(loader, trigger) {
    this.a.$providerSetup.set(false);
    this.c("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this.a));
    this.X.set(loader);
    this.c("provider-loader-change", loader, trigger);
  }
  Ck() {
    const provider = this.a.$provider();
    if (!provider || peek(this.a.$providerSetup)) return;
    if (this.a.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this.a.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  Dk() {
    if (!this.a.$providerSetup()) return;
    const provider = this.a.$provider(), source = this.a.$state.source(), crossOrigin = peek(this.a.$state.crossOrigin), preferNativeHLS = peek(this.a.$props.preferNativeHLS);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this.a.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (preferNativeHLS || !isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossOrigin),
            signal: abort.signal
          }).then((streamType) => {
            this.c("stream-type-change", streamType);
          }).catch(noop);
        }
      } else if (isDASHSrc(source)) {
        resolveStreamTypeFromDASHManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal
        }).then((streamType) => {
          this.c("stream-type-change", streamType);
        }).catch(noop);
      } else {
        this.c("stream-type-change", "on-demand");
      }
      peek(() => {
        const preload = peek(this.a.$state.preload);
        return provider?.loadSource(source, preload).catch((error) => {
        });
      });
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin);
    } catch (error) {
    }
  }
  Ek() {
    const loader = this.X(), { providedPoster, source, canLoadPoster } = this.a.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster()) return;
    const abort = new AbortController(), trigger = new DOMEvent("source-change", { detail: source });
    loader.loadPoster(source(), this.a, abort).then((url) => {
      this.c("poster-change", url || "", trigger);
    }).catch(() => {
      this.c("poster-change", "", trigger);
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
    this.xd = _domTracks;
    this.a = _media;
    this.eh = [];
    effect(this.Fk.bind(this));
  }
  Fk() {
    const newTracks = this.xd();
    for (const oldTrack of this.eh) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this.a.textTracks.getById(oldTrack.id);
        if (track) this.a.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this.a.textTracks.getById(id)) {
        newTrack.id = id;
        this.a.textTracks.add(newTrack);
      }
    }
    this.eh = newTracks;
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
    this.wd = signal([]);
    this.xd = signal([]);
    this.X = null;
    this.Ue = -1;
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
    this.a = useMediaContext();
    this.fh = new SourceSelection(
      this.wd,
      this.a,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this.fh.connect();
    new Tracks(this.xd, this.a);
    const resize = new ResizeObserver(animationFrameThrottle(this.pa.bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(this.Gc.bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    this.pa();
    this.Gc();
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    target?.setAttribute("aria-hidden", "true");
    window.cancelAnimationFrame(this.Ue);
    this.Ue = requestAnimationFrame(() => this.Gk(target));
    onDispose(() => {
      window.cancelAnimationFrame(this.Ue);
    });
  }
  Gk(target) {
    if (!this.scope) return;
    const loader = this.$state.loader(), { $provider } = this.a;
    if (this.X === loader && loader?.target === target && peek($provider)) return;
    this.gh();
    this.X = loader;
    if (loader) loader.target = target || null;
    if (!loader || !target) return;
    loader.load(this.a).then((provider) => {
      if (!this.scope) return;
      if (peek(this.$state.loader) !== loader) return;
      this.a.delegate.c("provider-change", provider);
    });
  }
  onDestroy() {
    this.X = null;
    this.gh();
  }
  gh() {
    this.a?.delegate.c("provider-change", null);
  }
  pa() {
    if (!this.el) return;
    const { player, $state } = this.a, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player) return;
    $state.mediaWidth.set(width);
    $state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  Gc() {
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
    this.wd.set(sources);
    this.xd.set(tracks);
    tick();
  }
}
__decorateClass([
  method
], MediaProvider.prototype, "load");

export { AudioProviderLoader, AudioTrackList, DASHProviderLoader, FullscreenController, GroupedLog, HLSProviderLoader, List, LocalMediaStorage, MEDIA_KEY_SHORTCUTS, MediaControls, MediaPlayer, MediaProvider, MediaRemoteControl, ScreenOrientationController, TextRenderers, TextTrackList, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, YouTubeProviderLoader, canFullscreen, isAudioProvider, isDASHProvider, isGoogleCastProvider, isHLSProvider, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isVideoProvider, isVideoQualitySrc, isVimeoProvider, isYouTubeProvider, mediaState, softResetMediaState };
