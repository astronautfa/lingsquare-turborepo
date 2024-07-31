"use client"

import * as React from 'react';
import { P as EventsTarget, D as DOMEvent, V as ViewController, l as listenEvent, v as onDispose, o as isFunction, n as isUndefined, Q as waitTimeout, s as signal, p as peek, i as isString, k as isBoolean, R as isNull, f as deferredPromise, j as isNumber, g as isArray, a as scoped, S as getScope, T as State, t as tick, U as createContext, O as useContext, W as Component, X as isDOMNode, Y as setAttribute, e as effect, z as isKeyboardClick, Z as isTouchEvent, _ as setStyle, y as isKeyboardEvent, q as untrack, m as camelToKebabCase, $ as useDisposalBin, a0 as isNil, d as createScope, a1 as waitIdlePeriod, a2 as provideContext, b as animationFrameThrottle, w as uppercaseFirstChar, L as computed, a3 as prop, a4 as method, A as noop, a5 as ariaBool$1, a6 as isWriteSignal, a7 as hasProvidedContext, h as isObject, a8 as useState, a9 as wasEnterKeyPressed, K as isPointerEvent, aa as isMouseEvent, ab as kebabToCamelCase, c as createDisposalBin, x as composeRefs, C as useStateContext, u as useSignal, E as useSignalRecord } from './vidstack-wClXxc1a.js';

var _a$2;
const GROUPED_LOG = Symbol(0);
const _GroupedLog = class _GroupedLog {
  constructor(logger, level, title, root, parent) {
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root;
    this.parent = parent;
    this[_a$2] = true;
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
_a$2 = GROUPED_LOG;
let GroupedLog = _GroupedLog;

const ADD = Symbol(0), REMOVE = Symbol(0), RESET = Symbol(0), SELECT = Symbol(0), READONLY = Symbol(0), SET_READONLY = Symbol(0), ON_RESET = Symbol(0), ON_REMOVE = Symbol(0), ON_USER_SELECT = Symbol(0);
const ListSymbol = {
  ea: ADD,
  dc: REMOVE,
  A: RESET,
  fa: SELECT,
  Zc: READONLY,
  Pd: SET_READONLY,
  Hf: ON_RESET,
  If: ON_REMOVE,
  Jf: ON_USER_SELECT
};

var _a$1;
class List extends EventsTarget {
  constructor() {
    super(...arguments);
    this.B = [];
    /** @internal */
    this[_a$1] = false;
  }
  get length() {
    return this.B.length;
  }
  get readonly() {
    return this[ListSymbol.Zc];
  }
  /**
   * Returns the index of the first occurrence of the given item, or -1 if it is not present.
   */
  indexOf(item) {
    return this.B.indexOf(item);
  }
  /**
   * Returns an item matching the given `id`, or `null` if not present.
   */
  getById(id) {
    if (id === "")
      return null;
    return this.B.find((item) => item.id === id) ?? null;
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.B];
  }
  [(_a$1 = ListSymbol.Zc, Symbol.iterator)]() {
    return this.B.values();
  }
  /** @internal */
  [ListSymbol.ea](item, trigger) {
    const index = this.B.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.B[index];
        }
      });
    }
    if (this.B.includes(item))
      return;
    this.B.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /** @internal */
  [ListSymbol.dc](item, trigger) {
    const index = this.B.indexOf(item);
    if (index >= 0) {
      this[ListSymbol.If]?.(item, trigger);
      this.B.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /** @internal */
  [ListSymbol.A](trigger) {
    for (const item of [...this.B])
      this[ListSymbol.dc](item, trigger);
    this.B = [];
    this[ListSymbol.Pd](false, trigger);
    this[ListSymbol.Hf]?.();
  }
  /** @internal */
  [ListSymbol.Pd](readonly, trigger) {
    if (this[ListSymbol.Zc] === readonly)
      return;
    this[ListSymbol.Zc] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
}

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
var document$1 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document$1 && Object.keys(key) || webkit[0] in document$1 && webkit || moz[0] in document$1 && moz || ms[0] in document$1 && ms || [];
var fscreen = {
  requestFullscreen: function(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document$1[vendor[key.exitFullscreen]].bind(document$1);
  },
  get fullscreenPseudoClass() {
    return ":" + vendor[key.fullscreen];
  },
  addEventListener: function(type, handler, options) {
    return document$1.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function(type, handler, options) {
    return document$1.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document$1[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {
  },
  get fullscreenElement() {
    return document$1[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {
  },
  get onfullscreenchange() {
    return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};

const CAN_FULLSCREEN = fscreen.fullscreenEnabled;
class FullscreenController extends ViewController {
  constructor() {
    super(...arguments);
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    this.ec = false;
    this.Qd = false;
  }
  get active() {
    return this.Qd;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen, "fullscreenchange", this.Rd.bind(this));
    listenEvent(fscreen, "fullscreenerror", this._c.bind(this));
    onDispose(this.Ga.bind(this));
  }
  async Ga() {
    if (CAN_FULLSCREEN)
      await this.exit();
  }
  Rd(event) {
    const active = isFullscreen(this.el);
    if (active === this.Qd)
      return;
    if (!active)
      this.ec = false;
    this.Qd = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  _c(event) {
    if (!this.ec)
      return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this.ec = false;
  }
  async enter() {
    try {
      this.ec = true;
      if (!this.el || isFullscreen(this.el))
        return;
      assertFullscreenAPI();
      return fscreen.requestFullscreen(this.el);
    } catch (error) {
      this.ec = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el))
      return;
    assertFullscreenAPI();
    return fscreen.exitFullscreen();
  }
}
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen.fullscreenElement === host)
    return true;
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
  if (CAN_FULLSCREEN)
    return;
  throw Error(
    "[vidstack] no fullscreen API"
  );
}

const IS_SERVER = typeof document === "undefined";

const UA = IS_SERVER ? "" : navigator?.userAgent.toLowerCase() || "";
const IS_IOS = !IS_SERVER && /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
const IS_IPHONE = !IS_SERVER && /(iphone|ipod)/gi.test(navigator?.platform || "");
const IS_CHROME = !IS_SERVER && !!window.chrome;
const IS_SAFARI = !IS_SERVER && (!!window.safari || IS_IOS);
function canOrientScreen() {
  return canRotateScreen() && isFunction(screen.orientation.unlock);
}
function canRotateScreen() {
  return !IS_SERVER && !isUndefined(window.screen.orientation) && !isUndefined(window.screen.orientation.lock);
}
function canPlayAudioType(audio, type) {
  if (IS_SERVER)
    return false;
  if (!audio)
    audio = document.createElement("audio");
  return audio.canPlayType(type).length > 0;
}
function canPlayVideoType(video, type) {
  if (IS_SERVER)
    return false;
  if (!video)
    video = document.createElement("video");
  return video.canPlayType(type).length > 0;
}
function canPlayHLSNatively(video) {
  if (IS_SERVER)
    return false;
  if (!video)
    video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl").length > 0;
}
function canUsePictureInPicture(video) {
  if (IS_SERVER)
    return false;
  return !!document.pictureInPictureEnabled && !video?.disablePictureInPicture;
}
function canUseVideoPresentation(video) {
  if (IS_SERVER)
    return false;
  return isFunction(video?.webkitSupportsPresentationMode) && isFunction(video?.webkitSetPresentationMode);
}
async function canChangeVolume() {
  const video = document.createElement("video");
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return IS_SERVER ? void 0 : window?.ManagedMediaSource ?? window?.MediaSource ?? window?.WebKitMediaSource;
}
function getSourceBuffer() {
  return IS_SERVER ? void 0 : window?.SourceBuffer ?? window?.WebKitSourceBuffer;
}
function isHLSSupported() {
  if (IS_SERVER)
    return false;
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource))
    return false;
  const isTypeSupported = MediaSource && isFunction(MediaSource.isTypeSupported) && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid = isUndefined(SourceBuffer) || !isUndefined(SourceBuffer.prototype) && isFunction(SourceBuffer.prototype.appendBuffer) && isFunction(SourceBuffer.prototype.remove);
  return !!isTypeSupported && !!isSourceBufferValid;
}
function isDASHSupported() {
  return isHLSSupported();
}

const _ScreenOrientationController = class _ScreenOrientationController extends ViewController {
  constructor() {
    super(...arguments);
    this.ma = signal(this.Kf());
    this.Db = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.ma();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.Db();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.ma().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.ma().startsWith("landscape");
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return _ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this.Lf.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.Lf.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this.Ga.bind(this));
  }
  async Ga() {
    if (this.supported && this.Db())
      await this.unlock();
  }
  Lf(event) {
    this.ma.set(this.Kf());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.ma),
        lock: this.$c
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
    if (peek(this.Db) || this.$c === lockType)
      return;
    this.Mf();
    await screen.orientation.lock(lockType);
    this.Db.set(true);
    this.$c = lockType;
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
    if (!peek(this.Db))
      return;
    this.Mf();
    this.$c = void 0;
    await screen.orientation.unlock();
    this.Db.set(false);
  }
  Mf() {
    if (this.supported)
      return;
    throw Error(
      "[vidstack] no orientation API"
    );
  }
  Kf() {
    if (IS_SERVER)
      return "portrait-primary";
    if (this.supported)
      return window.screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }
};
/**
 * Whether the native Screen Orientation API is available.
 */
_ScreenOrientationController.supported = canOrientScreen();
let ScreenOrientationController = _ScreenOrientationController;

const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
const AUDIO_TYPES = /* @__PURE__ */ new Set([
  "audio/mpeg",
  "audio/ogg",
  "audio/3gp",
  "audio/mp4",
  "audio/webm",
  "audio/flac"
]);
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
const VIDEO_TYPES = /* @__PURE__ */ new Set([
  "video/mp4",
  "video/webm",
  "video/3gp",
  "video/ogg",
  "video/avi",
  "video/mpeg"
]);
const HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
const DASH_VIDEO_EXTENSIONS = /\.(mpd)($|\?)/i;
const HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
  // Apple sanctioned
  "application/vnd.apple.mpegurl",
  // Apple sanctioned for backwards compatibility
  "audio/mpegurl",
  // Very common
  "audio/x-mpegurl",
  // Very common
  "application/x-mpegurl",
  // Included for completeness
  "video/x-mpegurl",
  "video/mpegurl",
  "application/mpegurl"
]);
const DASH_VIDEO_TYPES = /* @__PURE__ */ new Set(["application/dash+xml"]);
function isAudioSrc({ src, type }) {
  return isString(src) ? AUDIO_EXTENSIONS.test(src) || AUDIO_TYPES.has(type) || src.startsWith("blob:") && type === "audio/object" : type === "audio/object";
}
function isVideoSrc(src) {
  return isString(src.src) ? VIDEO_EXTENSIONS.test(src.src) || VIDEO_TYPES.has(src.type) || src.src.startsWith("blob:") && src.type === "video/object" || isHLSSrc(src) && (IS_SERVER || canPlayHLSNatively()) : src.type === "video/object";
}
function isHLSSrc({ src, type }) {
  return isString(src) && HLS_VIDEO_EXTENSIONS.test(src) || HLS_VIDEO_TYPES.has(type);
}
function isDASHSrc({ src, type }) {
  return isString(src) && DASH_VIDEO_EXTENSIONS.test(src) || DASH_VIDEO_TYPES.has(type);
}
function canGoogleCastSrc(src) {
  return isString(src.src) && (isAudioSrc(src) || isVideoSrc(src) || isHLSSrc(src));
}
function isMediaStream(src) {
  return !IS_SERVER && typeof window.MediaStream !== "undefined" && src instanceof window.MediaStream;
}

function appendParamsToURL(baseUrl, params) {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(params)) {
    searchParams.set(key, params[key] + "");
  }
  return baseUrl + "?" + searchParams.toString();
}
function preconnect(url, rel = "preconnect") {
  if (IS_SERVER)
    return false;
  const exists = document.querySelector(`link[href="${url}"]`);
  if (!isNull(exists))
    return true;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = url;
  link.crossOrigin = "true";
  document.head.append(link);
  return true;
}
const pendingRequests = {};
function loadScript(src) {
  if (pendingRequests[src])
    return pendingRequests[src].promise;
  const promise = deferredPromise(), exists = document.querySelector(`script[src="${src}"]`);
  if (!isNull(exists)) {
    promise.resolve();
    return promise.promise;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    promise.resolve();
    delete pendingRequests[src];
  };
  script.onerror = () => {
    promise.reject();
    delete pendingRequests[src];
  };
  setTimeout(() => document.head.append(script), 0);
  return promise.promise;
}
function getRequestCredentials(crossOrigin) {
  return crossOrigin === "use-credentials" ? "include" : isString(crossOrigin) ? "same-origin" : void 0;
}
function getDownloadFile({
  title,
  src,
  download
}) {
  const url = isBoolean(download) || download === "" ? src.src : isString(download) ? download : download?.url;
  if (!isValidFileDownload({ url, src, download }))
    return null;
  return {
    url,
    name: !isBoolean(download) && !isString(download) && download?.filename || title.toLowerCase() || "media"
  };
}
function isValidFileDownload({
  url,
  src,
  download
}) {
  return isString(url) && (download && download !== true || isAudioSrc(src) || isVideoSrc(src));
}

function isVideoQualitySrc(src) {
  return !isString(src) && "width" in src && "height" in src && isNumber(src.width) && isNumber(src.height);
}

class TimeRange {
  get length() {
    return this.ua.length;
  }
  constructor(start, end) {
    if (isArray(start)) {
      this.ua = start;
    } else if (!isUndefined(start) && !isUndefined(end)) {
      this.ua = [[start, end]];
    } else {
      this.ua = [];
    }
  }
  start(index) {
    return this.ua[index][0] ?? Infinity;
  }
  end(index) {
    return this.ua[index][1] ?? Infinity;
  }
}
function getTimeRangesStart(range) {
  if (!range.length)
    return null;
  let min = range.start(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.start(i);
    if (value < min)
      min = value;
  }
  return min;
}
function getTimeRangesEnd(range) {
  if (!range.length)
    return null;
  let max = range.end(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.end(i);
    if (value > max)
      max = value;
  }
  return max;
}

const CROSS_ORIGIN = Symbol(0), READY_STATE = Symbol(0), UPDATE_ACTIVE_CUES = Symbol(0), CAN_LOAD = Symbol(0), ON_MODE_CHANGE = Symbol(0), NATIVE = Symbol(0), NATIVE_HLS = Symbol(0);
const TextTrackSymbol = {
  Eb: CROSS_ORIGIN,
  na: READY_STATE,
  Fb: UPDATE_ACTIVE_CUES,
  _: CAN_LOAD,
  ib: ON_MODE_CHANGE,
  $: NATIVE,
  Nf: NATIVE_HLS
};

function findActiveCue(cues, time) {
  for (let i = 0, len = cues.length; i < len; i++) {
    if (isCueActive(cues[i], time))
      return cues[i];
  }
  return null;
}
function isCueActive(cue, time) {
  return time >= cue.startTime && time < cue.endTime;
}
function watchActiveTextTrack(tracks, kind, onChange) {
  let currentTrack = null, scope = getScope();
  function onModeChange() {
    const kinds = isString(kind) ? [kind] : kind, track = tracks.toArray().find((track2) => kinds.includes(track2.kind) && track2.mode === "showing");
    if (track === currentTrack)
      return;
    if (!track) {
      onChange(null);
      currentTrack = null;
      return;
    }
    if (track.readyState == 2) {
      onChange(track);
    } else {
      onChange(null);
      scoped(() => {
        const off = listenEvent(
          track,
          "load",
          () => {
            onChange(track);
            off();
          },
          { once: true }
        );
      }, scope);
    }
    currentTrack = track;
  }
  onModeChange();
  return listenEvent(tracks, "mode-change", onModeChange);
}
function watchCueTextChange(tracks, kind, callback) {
  watchActiveTextTrack(tracks, kind, (track) => {
    if (!track) {
      callback("");
      return;
    }
    const onCueChange = () => {
      const activeCue = track?.activeCues[0];
      callback(activeCue?.text || "");
    };
    onCueChange();
    listenEvent(track, "cue-change", onCueChange);
  });
}

var _a, _b, _c;
class TextTrack extends EventsTarget {
  constructor(init) {
    super();
    this.id = "";
    this.label = "";
    this.language = "";
    this.default = false;
    this._ = false;
    this.va = 0;
    this.V = "disabled";
    this.Of = {};
    this.ad = [];
    this.C = [];
    this.Gb = [];
    /** @internal */
    this[_a] = 0;
    /** @internal */
    this[_b] = null;
    /** @internal */
    this[_c] = null;
    for (const prop of Object.keys(init))
      this[prop] = init[prop];
    if (!this.type)
      this.type = "vtt";
    if (!IS_SERVER && init.content) {
      this.$h(init);
    } else if (!init.src) {
      this[TextTrackSymbol.na] = 2;
    }
  }
  static createId(track) {
    return `vds-${track.type}-${track.kind}-${track.src ?? track.label ?? "?"}`;
  }
  get metadata() {
    return this.Of;
  }
  get regions() {
    return this.ad;
  }
  get cues() {
    return this.C;
  }
  get activeCues() {
    return this.Gb;
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TextTrackSymbol.na];
  }
  get mode() {
    return this.V;
  }
  set mode(mode) {
    this.setMode(mode);
  }
  addCue(cue, trigger) {
    let i = 0, length = this.C.length;
    for (i = 0; i < length; i++)
      if (cue.endTime <= this.C[i].startTime)
        break;
    if (i === length)
      this.C.push(cue);
    else
      this.C.splice(i, 0, cue);
    if (!(cue instanceof TextTrackCue)) {
      this[TextTrackSymbol.$]?.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
    if (isCueActive(cue, this.va)) {
      this[TextTrackSymbol.Fb](this.va, trigger);
    }
  }
  removeCue(cue, trigger) {
    const index = this.C.indexOf(cue);
    if (index >= 0) {
      const isActive = this.Gb.includes(cue);
      this.C.splice(index, 1);
      this[TextTrackSymbol.$]?.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
      if (isActive) {
        this[TextTrackSymbol.Fb](this.va, trigger);
      }
    }
  }
  setMode(mode, trigger) {
    if (this.V === mode)
      return;
    this.V = mode;
    if (mode === "disabled") {
      this.Gb = [];
      this.Pf();
    } else if (this.readyState === 2) {
      this[TextTrackSymbol.Fb](this.va, trigger);
    } else {
      this.Qf();
    }
    this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
    this[TextTrackSymbol.ib]?.();
  }
  /** @internal */
  [(_a = TextTrackSymbol.na, _b = TextTrackSymbol.ib, _c = TextTrackSymbol.$, TextTrackSymbol.Fb)](currentTime, trigger) {
    this.va = currentTime;
    if (this.mode === "disabled" || !this.C.length)
      return;
    const activeCues = [];
    for (let i = 0, length = this.C.length; i < length; i++) {
      const cue = this.C[i];
      if (isCueActive(cue, currentTime))
        activeCues.push(cue);
    }
    let changed = activeCues.length !== this.Gb.length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!this.Gb.includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    this.Gb = activeCues;
    if (changed)
      this.Pf(trigger);
  }
  /** @internal */
  [TextTrackSymbol._]() {
    this._ = true;
    if (this.V !== "disabled")
      this.Qf();
  }
  $h(init) {
    import('media-captions').then(({ parseText, VTTCue, VTTRegion }) => {
      if (!isString(init.content) || init.type === "json") {
        this.Rf(init.content, VTTCue, VTTRegion);
        if (this.readyState !== 3)
          this.Ha();
      } else {
        parseText(init.content, { type: init.type }).then(({ cues, regions }) => {
          this.C = cues;
          this.ad = regions;
          this.Ha();
        });
      }
    });
  }
  async Qf() {
    if (!this._ || this[TextTrackSymbol.na] > 0)
      return;
    this[TextTrackSymbol.na] = 1;
    this.dispatchEvent(new DOMEvent("load-start"));
    if (!this.src) {
      this.Ha();
      return;
    }
    try {
      const { parseResponse, VTTCue, VTTRegion } = await import('media-captions'), crossOrigin = this[TextTrackSymbol.Eb]?.();
      const response = fetch(this.src, {
        headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
        credentials: getRequestCredentials(crossOrigin)
      });
      if (this.type === "json") {
        this.Rf(await (await response).text(), VTTCue, VTTRegion);
      } else {
        const { errors, metadata, regions, cues } = await parseResponse(response, {
          type: this.type,
          encoding: this.encoding
        });
        if (errors[0]?.code === 0) {
          throw errors[0];
        } else {
          this.Of = metadata;
          this.ad = regions;
          this.C = cues;
        }
      }
      this.Ha();
    } catch (error) {
      this.Sf(error);
    }
  }
  Ha() {
    this[TextTrackSymbol.na] = 2;
    if (!this.src || this.type !== "vtt") {
      const native = this[TextTrackSymbol.$];
      if (native && !native.managed) {
        for (const cue of this.C)
          native.track.addCue(cue);
      }
    }
    const loadEvent = new DOMEvent("load");
    this[TextTrackSymbol.Fb](this.va, loadEvent);
    this.dispatchEvent(loadEvent);
  }
  Sf(error) {
    this[TextTrackSymbol.na] = 3;
    this.dispatchEvent(new DOMEvent("error", { detail: error }));
  }
  Rf(json, VTTCue, VTTRegion) {
    try {
      const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
      this.ad = regions;
      this.C = cues;
    } catch (error) {
      this.Sf(error);
    }
  }
  Pf(trigger) {
    this.dispatchEvent(new DOMEvent("cue-change", { trigger }));
  }
}
const captionRE = /captions|subtitles/;
function isTrackCaptionKind(track) {
  return captionRE.test(track.kind);
}
function parseJSONCaptionsFile(json, Cue, Region) {
  const content = isString(json) ? JSON.parse(json) : json;
  let regions = [], cues = [];
  if (content.regions && Region) {
    regions = content.regions.map((region) => Object.assign(new Region(), region));
  }
  if (content.cues || isArray(content)) {
    cues = (isArray(content) ? content : content.cues).filter((content2) => isNumber(content2.startTime) && isNumber(content2.endTime)).map((cue) => Object.assign(new Cue(0, 0, ""), cue));
  }
  return { regions, cues };
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
    return this.clipStartTime > 0 ? Math.max(0, Math.min(this.realCurrentTime - this.clipStartTime, this.duration)) : this.realCurrentTime;
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

const mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}

class MediaRemoteControl {
  constructor(_logger = void 0) {
    this.cc = _logger;
    this.H = null;
    this.f = null;
    this.Sd = -1;
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
    this.H = target;
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
    if (this.f)
      return this.f;
    (target ?? this.H)?.dispatchEvent(
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
    this.t("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this.t("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this.t("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this.t("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.t("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.t("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.t("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.t("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this.t("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this.t("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this.t("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this.t("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this.t("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this.t("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.t("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.t("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.t("media-live-edge-request", trigger);
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
    this.t("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
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
    this.t("media-audio-track-change-request", trigger, index);
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
    this.t("media-quality-change-request", trigger, index);
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
    this.t("media-text-track-change-request", trigger, {
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
    this.t("media-rate-change-request", trigger, rate);
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
    this.t("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this.t("media-resume-controls-request", trigger);
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
    this.t("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.paused)
      this.play(trigger);
    else
      this.pause(trigger);
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
    if (player.state.muted)
      this.unmute(trigger);
    else
      this.mute(trigger);
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
    if (player.state.fullscreen)
      this.exitFullscreen(target, trigger);
    else
      this.enterFullscreen(target, trigger);
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
    if (player.state.pictureInPicture)
      this.exitPictureInPicture(trigger);
    else
      this.enterPictureInPicture(trigger);
  }
  /**
   * Show captions.
   */
  showCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    let tracks = player.state.textTracks, index = this.Sd;
    if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
      index = -1;
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track) && track.default);
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track));
    }
    if (index >= 0)
      this.changeTextTrackMode(index, "showing", trigger);
    this.Sd = -1;
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
      this.Sd = index;
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
    this.t("media-user-loop-change-request", trigger, prefersLoop);
  }
  t(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component)
      target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this.f?.el && target instanceof Node && !this.f.el.contains(target);
    target = shouldUsePlayer ? this.H ?? this.getPlayer()?.el : target ?? this.H;
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
  Wa(method) {
  }
}

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round$1 = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement$1(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement$1(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isTopLayer(currentNode)) {
      return null;
    }
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement$1(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement$1(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round$1(width) !== offsetWidth || round$1(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement$1(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round$1(rect.width) : rect.width) / width;
  let y = ($ ? round$1(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement$1(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement$1(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement$1(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement$1(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

function round(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  return String(num).split(".")[1]?.length ?? 0;
}
function clampNumber(min, value, max) {
  return Math.max(min, Math.min(max, value));
}

function listen(target, type, handler) {
  if (!target)
    return;
  return listenEvent(target, type, handler);
}
function isEventInside(el, event) {
  return isDOMNode(event.target) && el.contains(event.target);
}
const rafJobs = /* @__PURE__ */ new Set();
if (!IS_SERVER) {
  let processJobs = function() {
    for (const job of rafJobs) {
      try {
        job();
      } catch (e) {
      }
    }
    window.requestAnimationFrame(processJobs);
  };
  processJobs();
}
function scheduleRafJob(job) {
  rafJobs.add(job);
  return () => rafJobs.delete(job);
}
function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name))
    target.setAttribute(name, value);
}
function setARIALabel(target, $label) {
  if (target.hasAttribute("aria-label") || target.hasAttribute("data-no-label"))
    return;
  if (!isFunction($label)) {
    setAttribute(target, "aria-label", $label);
    return;
  }
  function updateAriaDescription() {
    setAttribute(target, "aria-label", $label());
  }
  if (IS_SERVER)
    updateAriaDescription();
  else
    effect(updateAriaDescription);
}
function isElementVisible(el) {
  const style = getComputedStyle(el);
  return style.display !== "none" && parseInt(style.opacity) > 0;
}
function checkVisibility(el) {
  return !!el && ("checkVisibility" in el ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) : isElementVisible(el));
}
function observeVisibility(el, callback) {
  return scheduleRafJob(() => callback(checkVisibility(el)));
}
function isElementParent(owner, node, test) {
  while (node) {
    if (node === owner) {
      return true;
    } else if (test?.(node)) {
      break;
    } else {
      node = node.parentElement;
    }
  }
  return false;
}
function onPress(target, handler) {
  listenEvent(target, "pointerup", (event) => {
    if (event.button === 0 && !event.defaultPrevented)
      handler(event);
  });
  listenEvent(target, "keydown", (event) => {
    if (isKeyboardClick(event))
      handler(event);
  });
}
function isTouchPinchEvent(event) {
  return isTouchEvent(event) && (event.touches.length > 1 || event.changedTouches.length > 1);
}
function requestScopedAnimationFrame(callback) {
  if (IS_SERVER)
    return callback();
  let scope = getScope(), id = window.requestAnimationFrame(() => {
    scoped(callback, scope);
    id = -1;
  });
  return () => void window.cancelAnimationFrame(id);
}
function autoPlacement(el, trigger, placement, {
  offsetVarName,
  xOffset,
  yOffset,
  ...options
}) {
  if (!el)
    return;
  const floatingPlacement = placement.replace(" ", "-").replace("-center", "");
  setStyle(el, "visibility", !trigger ? "hidden" : null);
  if (!trigger)
    return;
  let isTop = placement.includes("top");
  const negateX = (x) => placement.includes("left") ? `calc(-1 * ${x})` : x, negateY = (y) => isTop ? `calc(-1 * ${y})` : y;
  return autoUpdate(trigger, el, () => {
    computePosition(trigger, el, {
      placement: floatingPlacement,
      middleware: [
        ...options.middleware ?? [],
        flip({ fallbackAxisSideDirection: "start", crossAxis: false }),
        shift()
      ],
      ...options
    }).then(({ x, y, middlewareData }) => {
      const hasFlipped = !!middlewareData.flip?.index;
      isTop = placement.includes(hasFlipped ? "bottom" : "top");
      el.setAttribute(
        "data-placement",
        hasFlipped ? placement.startsWith("top") ? placement.replace("top", "bottom") : placement.replace("bottom", "top") : placement
      );
      Object.assign(el.style, {
        top: `calc(${y + "px"} + ${negateY(
          yOffset ? yOffset + "px" : `var(--${offsetVarName}-y-offset, 0px)`
        )})`,
        left: `calc(${x + "px"} + ${negateX(
          xOffset ? xOffset + "px" : `var(--${offsetVarName}-x-offset, 0px)`
        )})`
      });
    });
  });
}
function hasAnimation(el) {
  const styles = getComputedStyle(el);
  return styles.animationName !== "none";
}
function isHTMLElement(el) {
  return el instanceof HTMLElement;
}

class MediaPlayerController extends ViewController {
}

class MediaControls extends MediaPlayerController {
  constructor() {
    super(...arguments);
    this.Td = -2;
    this.Hb = false;
    this.Tf = signal(false);
    this.Ud = signal(false);
    this.fc = null;
    this.Vd = signal(true);
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
    return this.Vd();
  }
  set canIdle(canIdle) {
    this.Vd.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this.Tf() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this.Tf.set(hide);
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
    this.Wd();
    if (!this.Hb) {
      this.bd(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this.Wd();
    if (!this.Hb) {
      this.bd(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this.Hb = true;
    this.Wd();
    this.bd(true, 0, trigger);
  }
  resume(trigger) {
    this.Hb = false;
    if (this.$state.paused())
      return;
    this.bd(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this.Ib.bind(this));
  }
  Ib() {
    const { viewType } = this.$state;
    if (!this.Vd())
      return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this.ai.bind(this));
    effect(this.gc.bind(this));
    const onPlay = this.hc.bind(this), onPause = this.jb.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  ai() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine")
      return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this.Ud()) {
      effect(() => {
        if (!paused())
          this.listen("pointermove", this.Uf.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this.bi.bind(this));
      this.listen("mouseleave", this.ci.bind(this));
    }
  }
  gc() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started())
      return;
    const onStopIdle = this.Uf.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  hc(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  jb(event) {
    this.show(0, event);
  }
  bi(event) {
    this.Ud.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  ci(event) {
    this.Ud.set(true);
    this.hide(0, event);
  }
  Wd() {
    window.clearTimeout(this.Td);
    this.Td = -1;
  }
  Uf(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this.Hb || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this.fc = null;
      } else if (this.fc) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this.fc?.focus();
          this.fc = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  bd(visible, delay, trigger) {
    if (delay === 0) {
      this.F(visible, trigger);
      return;
    }
    this.Td = window.setTimeout(() => {
      if (!this.scope)
        return;
      this.F(visible && !this.Hb, trigger);
    }, delay);
  }
  F(visible, trigger) {
    if (this.$state.controlsVisible() === visible)
      return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this.fc = document.activeElement;
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

var functionThrottle = throttle;

function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = (options && options.leading);
  var trailing = (options && options.trailing);

  if (leading == null) {
    leading = true; // default
  }

  if (trailing == null) {
    trailing = !leading; //default
  }

  if (leading == true) {
    trailing = false; // forced because there should be invocation per call
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

class LocalMediaStorage {
  constructor() {
    this.playerId = "vds-player";
    this.mediaId = null;
    this.I = {
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
    return this.I.volume;
  }
  async setVolume(volume) {
    this.I.volume = volume;
    this.save();
  }
  async getMuted() {
    return this.I.muted;
  }
  async setMuted(muted) {
    this.I.muted = muted;
    this.save();
  }
  async getTime() {
    return this.I.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this.I.time = !shouldClear ? time : null;
    if (shouldClear || ended)
      this.saveTime();
    else
      this.saveTimeThrottled();
  }
  async getLang() {
    return this.I.lang;
  }
  async setLang(lang) {
    this.I.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this.I.captions;
  }
  async setCaptions(enabled) {
    this.I.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this.I.rate;
  }
  async setPlaybackRate(rate) {
    this.I.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this.I.audioGain;
  }
  async setAudioGain(gain) {
    this.I.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this.I.quality;
  }
  async setVideoQuality(quality) {
    this.I.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this.I = {
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
    if (IS_SERVER || !this.playerId)
      return;
    const data = JSON.stringify({ ...this.I, time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTime() {
    if (IS_SERVER || !this.mediaId)
      return;
    const data = (this.I.time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
}

class NativeTextRenderer {
  constructor() {
    this.priority = 0;
    this.Vf = true;
    this.m = null;
    this.K = null;
    this.wa = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this.m = video;
    if (video)
      video.textTracks.onchange = this.F.bind(this);
  }
  addTrack(track) {
    this.wa.add(track);
    this.di(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol.$]?.remove?.();
    track[TextTrackSymbol.$] = null;
    this.wa.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol.$];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.K = track;
  }
  setDisplay(display) {
    this.Vf = display;
    this.F();
  }
  detach() {
    if (this.m)
      this.m.textTracks.onchange = null;
    for (const track of this.wa)
      this.removeTrack(track);
    this.wa.clear();
    this.m = null;
    this.K = null;
  }
  di(track) {
    if (!this.m)
      return;
    const el = track[TextTrackSymbol.$] ??= this.ei(track);
    if (isHTMLElement(el)) {
      this.m.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  ei(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.Wf(track, el.track);
    }
    return el;
  }
  Wf(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length)
      return;
    for (const cue of track.cues)
      native.addCue(cue);
  }
  F(event) {
    for (const track of this.wa) {
      const native = track[TextTrackSymbol.$];
      if (!native)
        continue;
      if (!this.Vf) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing)
        this.Wf(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this.a = _media;
    this.m = null;
    this.cd = [];
    this.Xf = false;
    this.xa = null;
    this.kb = null;
    const textTracks = _media.textTracks;
    this.Xd = textTracks;
    effect(this.Yd.bind(this));
    onDispose(this.fi.bind(this));
    listenEvent(textTracks, "add", this.Zd.bind(this));
    listenEvent(textTracks, "remove", this.gi.bind(this));
    listenEvent(textTracks, "mode-change", this.Ia.bind(this));
  }
  Yd() {
    const { nativeControls } = this.a.$state;
    this.Xf = nativeControls();
    this.Ia();
  }
  add(renderer) {
    this.cd.push(renderer);
    untrack(this.Ia.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this.cd.splice(this.cd.indexOf(renderer), 1);
    untrack(this.Ia.bind(this));
  }
  /** @internal */
  Yf(video) {
    requestAnimationFrame(() => {
      this.m = video;
      if (video) {
        this.xa = new NativeTextRenderer();
        this.xa.attach(video);
        for (const track of this.Xd)
          this.Zf(track);
      }
      this.Ia();
    });
  }
  Zf(track) {
    if (!isTrackCaptionKind(track))
      return;
    this.xa?.addTrack(track);
  }
  hi(track) {
    if (!isTrackCaptionKind(track))
      return;
    this.xa?.removeTrack(track);
  }
  Zd(event) {
    this.Zf(event.detail);
  }
  gi(event) {
    this.hi(event.detail);
  }
  Ia() {
    const currentTrack = this.Xd.selected;
    if (this.m && (this.Xf || currentTrack?.[TextTrackSymbol.Nf])) {
      this.kb?.changeTrack(null);
      this.xa?.setDisplay(true);
      this.xa?.changeTrack(currentTrack);
      return;
    }
    this.xa?.setDisplay(false);
    this.xa?.changeTrack(null);
    if (!currentTrack) {
      this.kb?.changeTrack(null);
      return;
    }
    const customRenderer = this.cd.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this.m));
    if (this.kb !== customRenderer) {
      this.kb?.detach();
      customRenderer?.attach(this.m);
      this.kb = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  fi() {
    this.xa?.detach();
    this.xa = null;
    this.kb?.detach();
    this.kb = null;
  }
}

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

class TextTrackList extends List {
  constructor() {
    super();
    this._ = false;
    this.lb = {};
    this.mb = null;
    this.nb = null;
    this.cg = functionDebounce(async () => {
      if (!this._)
        return;
      if (!this.nb && this.mb) {
        this.nb = await this.mb.getLang();
      }
      const showCaptions = await this.mb?.getCaptions(), kinds = [
        ["captions", "subtitles"],
        "chapters",
        "descriptions",
        "metadata"
      ];
      for (const kind of kinds) {
        const tracks = this.getByKind(kind);
        if (tracks.find((t) => t.mode === "showing"))
          continue;
        const preferredTrack = this.nb ? tracks.find((track2) => track2.language === this.nb) : null;
        const defaultTrack = isArray(kind) ? this.lb[kind.find((kind2) => this.lb[kind2]) || ""] : this.lb[kind];
        const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
        if (track && (!isCaptionsKind || showCaptions !== false)) {
          track.mode = "showing";
          if (isCaptionsKind)
            this.dg(track);
        }
      }
    }, 300);
    this._d = null;
    this.bg = this.ii.bind(this);
  }
  get selected() {
    const track = this.B.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this.nb;
  }
  set preferredLang(lang) {
    this.nb = lang;
    this.ag(lang);
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init), kind = init.kind === "captions" || init.kind === "subtitles" ? "captions" : init.kind;
    if (this.lb[kind] && init.default)
      delete init.default;
    track.addEventListener("mode-change", this.bg);
    this[ListSymbol.ea](track, trigger);
    track[TextTrackSymbol.Eb] = this[TextTrackSymbol.Eb];
    if (this._)
      track[TextTrackSymbol._]();
    if (init.default)
      this.lb[kind] = track;
    this.cg();
    return this;
  }
  remove(track, trigger) {
    this._d = track;
    if (!this.B.includes(track))
      return;
    if (track === this.lb[track.kind])
      delete this.lb[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol.ib] = null;
    track.removeEventListener("mode-change", this.bg);
    this[ListSymbol.dc](track, trigger);
    this._d = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this.B]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.B.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [(TextTrackSymbol._)]() {
    if (this._)
      return;
    for (const track of this.B)
      track[TextTrackSymbol._]();
    this._ = true;
    this.cg();
  }
  ii(event) {
    const track = event.detail;
    if (this.mb && isTrackCaptionKind(track) && track !== this._d) {
      this.dg(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this.B) {
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
  dg(track) {
    if (track.mode !== "disabled") {
      this.ag(track.language);
    }
    this.mb?.setCaptions?.(track.mode === "showing");
  }
  ag(lang) {
    this.mb?.setLang?.(this.nb = lang);
  }
  setStorage(storage) {
    this.mb = storage;
  }
}

const SELECTED = Symbol(0);
class SelectList extends List {
  get selected() {
    return this.B.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.B.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol.If](item, trigger) {
    this[ListSymbol.fa](item, false, trigger);
  }
  /** @internal */
  [ListSymbol.ea](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly)
          return;
        this[ListSymbol.Jf]?.();
        this[ListSymbol.fa](item, selected);
      }
    });
    super[ListSymbol.ea](item, trigger);
  }
  /** @internal */
  [ListSymbol.fa](item, selected, trigger) {
    if (selected === item?.[SELECTED])
      return;
    const prev = this.selected;
    if (item)
      item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev)
        prev[SELECTED] = false;
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

const SET_AUTO = Symbol(0), ENABLE_AUTO = Symbol(0);
const QualitySymbol = {
  Xa: SET_AUTO,
  Ja: ENABLE_AUTO
};

class VideoQualityList extends SelectList {
  constructor() {
    super(...arguments);
    this.dd = false;
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
    return this.dd || this.readonly;
  }
  /** @internal */
  [(ListSymbol.Jf)]() {
    this[QualitySymbol.Xa](false);
  }
  /** @internal */
  [ListSymbol.Hf](trigger) {
    this[QualitySymbol.Ja] = void 0;
    this[QualitySymbol.Xa](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.dd || !this[QualitySymbol.Ja])
      return;
    this[QualitySymbol.Ja]?.(trigger);
    this[QualitySymbol.Xa](true, trigger);
  }
  getBySrc(src) {
    return this.B.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol.Xa](auto, trigger) {
    if (this.dd === auto)
      return;
    this.dd = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
}

function sortVideoQualities(qualities, desc) {
  return [...qualities].sort(desc ? compareVideoQualityDesc : compareVideoQualityAsc);
}
function compareVideoQualityAsc(a, b) {
  return a.height === b.height ? (a.bitrate ?? 0) - (b.bitrate ?? 0) : a.height - b.height;
}
function compareVideoQualityDesc(a, b) {
  return b.height === a.height ? (b.bitrate ?? 0) - (a.bitrate ?? 0) : b.height - a.height;
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
    this.Jb = null;
  }
  onConnect() {
    effect(this.ji.bind(this));
  }
  ji() {
    const { keyDisabled, keyTarget } = this.$props;
    if (keyDisabled())
      return;
    const target = keyTarget() === "player" ? this.el : document, $active = signal(false);
    if (target === this.el) {
      this.listen("focusin", () => $active.set(true));
      this.listen("focusout", (event) => {
        if (!this.el.contains(event.target))
          $active.set(false);
      });
    } else {
      if (!peek($active))
        $active.set(document.querySelector("[data-media-player]") === this.el);
      listenEvent(document, "focusin", (event) => {
        const activePlayer = event.composedPath().find((el) => el instanceof Element && el.localName === "media-player");
        if (activePlayer !== void 0)
          $active.set(this.el === activePlayer);
      });
    }
    effect(() => {
      if (!$active())
        return;
      listenEvent(target, "keyup", this.ic.bind(this));
      listenEvent(target, "keydown", this.jc.bind(this));
      listenEvent(target, "keydown", this.ki.bind(this), { capture: true });
    });
  }
  ic(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this.$d(event);
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
      if (this.Jb) {
        this.eg(event, method === "seekForward");
        this.Jb = null;
      } else {
        this.a.remote.seek(this.ed, event);
        this.ed = void 0;
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
  jc(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key))
      return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this.$d(event), isNumberPress = !event.metaKey && /^[0-9]$/.test(event.key);
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
    if (!method)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this.Ka(event, method, method === "seekForward");
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
  ki(event) {
    if (isHTMLMediaElement(event.target) && this.$d(event).method) {
      event.preventDefault();
    }
  }
  $d(event) {
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
  li(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this.ed = Math.max(
      0,
      Math.min(
        (this.ed ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  eg(event, forward) {
    this.Jb?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  Ka(event, type, forward) {
    if (!this.$state.canSeek())
      return;
    if (!this.Jb) {
      this.Jb = this.el.querySelector("[data-media-time-slider]");
    }
    if (this.Jb) {
      this.eg(event, forward);
    } else {
      this.a.remote.seeking(this.li(event, type), event);
    }
  }
}
const SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key) {
  return key.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}

class ARIAKeyShortcuts extends ViewController {
  constructor(_shortcut) {
    super();
    this.ae = _shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this.ae] = keys;
      if (!IS_SERVER) {
        onDispose(() => {
          delete ariaKeys[this.ae];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this.ae];
    if (shortcuts) {
      const keys2 = isArray(shortcuts) ? shortcuts.join(" ") : isString(shortcuts) ? shortcuts : shortcuts?.keys;
      el.setAttribute("aria-keyshortcuts", isArray(keys2) ? keys2.join(" ") : keys2);
    }
  }
}

const FONT_COLOR_OPTION = {
  type: "color"
};
const FONT_FAMILY_OPTION = {
  type: "radio",
  values: {
    "Monospaced Serif": "mono-serif",
    "Proportional Serif": "pro-serif",
    "Monospaced Sans-Serif": "mono-sans",
    "Proportional Sans-Serif": "pro-sans",
    Casual: "casual",
    Cursive: "cursive",
    "Small Capitals": "capitals"
  }
};
const FONT_SIZE_OPTION = {
  type: "slider",
  min: 0,
  max: 400,
  step: 25,
  upIcon: null,
  downIcon: null
};
const FONT_OPACITY_OPTION = {
  type: "slider",
  min: 0,
  max: 100,
  step: 5,
  upIcon: null,
  downIcon: null
};
const FONT_TEXT_SHADOW_OPTION = {
  type: "radio",
  values: ["None", "Drop Shadow", "Raised", "Depressed", "Outline"]
};
const FONT_DEFAULTS = {
  fontFamily: "pro-sans",
  fontSize: "100%",
  textColor: "#ffffff",
  textOpacity: "100%",
  textShadow: "none",
  textBg: "#000000",
  textBgOpacity: "100%",
  displayBg: "#000000",
  displayBgOpacity: "0%"
};
const FONT_SIGNALS = Object.keys(FONT_DEFAULTS).reduce(
  (prev, type) => ({
    ...prev,
    [type]: signal(FONT_DEFAULTS[type])
  }),
  {}
);
if (!IS_SERVER) {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const value = localStorage.getItem(`vds-player:${camelToKebabCase(type)}`);
    if (isString(value))
      FONT_SIGNALS[type].set(value);
  }
}
function onFontReset() {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const defaultValue = FONT_DEFAULTS[type];
    FONT_SIGNALS[type].set(defaultValue);
  }
}

class AudioProviderLoader {
  constructor() {
    this.name = "audio";
  }
  canPlay(src) {
    if (!isAudioSrc(src))
      return false;
    return IS_SERVER || !isString(src.src) || src.type === "?" || canPlayAudioType(this.target, src.type);
  }
  mediaType() {
    return "audio";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load audio provider server-side");
    }
    return new (await import('./vidstack-DU5TClmx.js')).AudioProvider(this.target, ctx);
  }
}

class VideoProviderLoader {
  constructor() {
    this.name = "video";
  }
  canPlay(src) {
    if (!isVideoSrc(src))
      return false;
    return IS_SERVER || !isString(src.src) || src.type === "?" || canPlayVideoType(this.target, src.type);
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load video provider server-side");
    }
    return new (await Promise.resolve().then(function () { return provider$1; })).VideoProvider(this.target, ctx);
  }
}

let audioContext = null, gainNodes = [], elAudioSources = [];
function getOrCreateAudioCtx() {
  return audioContext ??= new AudioContext();
}
function createGainNode() {
  const audioCtx = getOrCreateAudioCtx(), gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNodes.push(gainNode);
  return gainNode;
}
function createElementSource(el, gainNode) {
  const audioCtx = getOrCreateAudioCtx(), src = audioCtx.createMediaElementSource(el);
  if (gainNode) {
    src.connect(gainNode);
  }
  elAudioSources.push(src);
  return src;
}
function destroyGainNode(node) {
  const idx = gainNodes.indexOf(node);
  if (idx !== -1) {
    gainNodes.splice(idx, 1);
    node.disconnect();
    freeAudioCtxWhenAllResourcesFreed();
  }
}
function destroyElementSource(src) {
  const idx = elAudioSources.indexOf(src);
  if (idx !== -1) {
    elAudioSources.splice(idx, 1);
    src.disconnect();
    freeAudioCtxWhenAllResourcesFreed();
  }
}
function freeAudioCtxWhenAllResourcesFreed() {
  if (audioContext && gainNodes.length === 0 && elAudioSources.length === 0) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
}

class AudioGain {
  constructor(_media, _onChange) {
    this.a = _media;
    this.F = _onChange;
    this.ya = null;
    this.La = null;
  }
  get currentGain() {
    return this.ya?.gain?.value ?? null;
  }
  get supported() {
    return true;
  }
  setGain(gain) {
    const currGain = this.currentGain;
    if (gain === this.currentGain) {
      return;
    }
    if (gain === 1 && currGain !== 1) {
      this.removeGain();
      return;
    }
    if (!this.ya) {
      this.ya = createGainNode();
      if (this.La) {
        this.La.connect(this.ya);
      }
    }
    if (!this.La) {
      this.La = createElementSource(this.a, this.ya);
    }
    this.ya.gain.value = gain;
    this.F(gain);
  }
  removeGain() {
    if (!this.ya)
      return;
    if (this.La) {
      this.La.connect(getOrCreateAudioCtx().destination);
    }
    this.fg();
    this.F(null);
  }
  destroy() {
    this.mi();
    this.fg();
  }
  mi() {
    if (!this.La)
      return;
    try {
      destroyElementSource(this.La);
    } catch (e) {
    } finally {
      this.La = null;
    }
  }
  fg() {
    if (!this.ya)
      return;
    try {
      destroyGainNode(this.ya);
    } catch (e) {
    } finally {
      this.ya = null;
    }
  }
}

class RAFLoop {
  constructor(_callback) {
    this.Ma = _callback;
  }
  Ya() {
    if (!isUndefined(this.za))
      return;
    this.gg();
  }
  aa() {
    if (isNumber(this.za))
      window.cancelAnimationFrame(this.za);
    this.za = void 0;
  }
  gg() {
    this.za = window.requestAnimationFrame(() => {
      if (isUndefined(this.za))
        return;
      this.Ma();
      this.gg();
    });
  }
}

class HTMLMediaEvents {
  constructor(_provider, _ctx) {
    this.p = _provider;
    this.b = _ctx;
    this.Za = useDisposalBin();
    this.kc = false;
    this.be = false;
    this.ce = false;
    this.ga = new RAFLoop(this.lc.bind(this));
    this.ig = void 0;
    this.Ai = void 0;
    this.ni();
    effect(this.oi.bind(this));
    onDispose(this.de.bind(this));
  }
  get a() {
    return this.p.media;
  }
  get c() {
    return this.b.delegate.c;
  }
  de() {
    this.be = false;
    this.ce = false;
    this.ga.aa();
    this.Za.empty();
  }
  /**
   * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
   * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
   * resolve that by retrieving time updates in a request animation frame loop.
   */
  lc() {
    const newTime = this.a.currentTime;
    if (this.b.$state.realCurrentTime() !== newTime)
      this.Kb(newTime);
  }
  ni() {
    this.G("loadstart", this.Na);
    this.G("abort", this.hg);
    this.G("emptied", this.pi);
    this.G("error", this.R);
    this.G("volumechange", this.Oa);
  }
  qi() {
    if (this.be)
      return;
    this.Za.add(
      this.G("loadeddata", this.ri),
      this.G("loadedmetadata", this.si),
      this.G("canplay", this.fd),
      this.G("canplaythrough", this.ti),
      this.G("durationchange", this.ee),
      this.G("play", this.hc),
      this.G("progress", this.ob),
      this.G("stalled", this.ui),
      this.G("suspend", this.vi),
      this.G("ratechange", this.wi)
    );
    this.be = true;
  }
  xi() {
    if (this.ce)
      return;
    this.Za.add(
      this.G("pause", this.jb),
      this.G("playing", this.yi),
      this.G("seeked", this.pb),
      this.G("seeking", this.zi),
      this.G("ended", this.mc),
      this.G("waiting", this.fe)
    );
    this.ce = true;
  }
  G(eventType, handler) {
    return listenEvent(
      this.a,
      eventType,
      handler.bind(this)
    );
  }
  Bi(event2) {
    return;
  }
  Kb(time, trigger) {
    const detail = {
      // Avoid errors where `currentTime` can have higher precision.
      currentTime: Math.min(time, this.b.$state.seekableEnd()),
      played: this.a.played
    };
    this.c("time-update", detail, trigger);
  }
  Na(event2) {
    if (this.a.networkState === 3) {
      this.hg(event2);
      return;
    }
    this.qi();
    this.c("load-start", void 0, event2);
  }
  hg(event2) {
    this.c("abort", void 0, event2);
  }
  pi() {
    this.c("emptied", void 0, event);
  }
  ri(event2) {
    this.c("loaded-data", void 0, event2);
  }
  si(event2) {
    this.xi();
    this.c("loaded-metadata", void 0, event2);
    if (IS_IOS || IS_SAFARI && isHLSSrc(this.b.$state.source())) {
      this.b.delegate.Ha(this.ge(), event2);
    }
  }
  ge() {
    return {
      provider: peek(this.b.$provider),
      duration: this.a.duration,
      buffered: this.a.buffered,
      seekable: this.a.seekable
    };
  }
  hc(event2) {
    if (!this.b.$state.canPlay)
      return;
    this.c("play", void 0, event2);
  }
  jb(event2) {
    if (this.a.readyState === 1 && !this.kc)
      return;
    this.kc = false;
    this.ga.aa();
    this.c("pause", void 0, event2);
  }
  fd(event2) {
    this.b.delegate.Ha(this.ge(), event2);
  }
  ti(event2) {
    if (this.b.$state.started())
      return;
    this.c("can-play-through", this.ge(), event2);
  }
  yi(event2) {
    if (this.a.paused)
      return;
    this.kc = false;
    this.c("playing", void 0, event2);
    this.ga.Ya();
  }
  ui(event2) {
    this.c("stalled", void 0, event2);
    if (this.a.readyState < 3) {
      this.kc = true;
      this.c("waiting", void 0, event2);
    }
  }
  fe(event2) {
    if (this.a.readyState < 3) {
      this.kc = true;
      this.c("waiting", void 0, event2);
    }
  }
  mc(event2) {
    this.ga.aa();
    this.Kb(this.a.duration, event2);
    this.c("end", void 0, event2);
    if (this.b.$state.loop()) {
      const hasCustomControls = isNil(this.a.controls);
      if (hasCustomControls)
        this.a.controls = false;
    }
  }
  oi() {
    if (this.b.$state.paused()) {
      listenEvent(this.a, "timeupdate", this.nc.bind(this));
    }
  }
  nc(event2) {
    this.Kb(this.a.currentTime, event2);
  }
  ee(event2) {
    if (this.b.$state.ended()) {
      this.Kb(this.a.duration, event2);
    }
    this.c("duration-change", this.a.duration, event2);
  }
  Oa(event2) {
    const detail = {
      volume: this.a.volume,
      muted: this.a.muted
    };
    this.c("volume-change", detail, event2);
  }
  pb(event2) {
    this.Kb(this.a.currentTime, event2);
    this.c("seeked", this.a.currentTime, event2);
    if (Math.trunc(this.a.currentTime) === Math.trunc(this.a.duration) && getNumberOfDecimalPlaces(this.a.duration) > getNumberOfDecimalPlaces(this.a.currentTime)) {
      this.Kb(this.a.duration, event2);
      if (!this.a.ended) {
        this.b.player.dispatch(
          new DOMEvent("media-play-request", {
            trigger: event2
          })
        );
      }
    }
  }
  zi(event2) {
    this.c("seeking", this.a.currentTime, event2);
  }
  ob(event2) {
    const detail = {
      buffered: this.a.buffered,
      seekable: this.a.seekable
    };
    this.c("progress", detail, event2);
  }
  vi(event2) {
    this.c("suspend", void 0, event2);
  }
  wi(event2) {
    this.c("rate-change", this.a.playbackRate, event2);
  }
  R(event2) {
    const error = this.a.error;
    if (!error)
      return;
    const detail = {
      message: error.message,
      code: error.code,
      mediaError: error
    };
    this.c("error", detail, event2);
  }
}

class NativeAudioTracks {
  constructor(_provider, _ctx) {
    this.p = _provider;
    this.b = _ctx;
    this.oc.onaddtrack = this.Ci.bind(this);
    this.oc.onremovetrack = this.Di.bind(this);
    this.oc.onchange = this.Ei.bind(this);
    listenEvent(this.b.audioTracks, "change", this.Fi.bind(this));
  }
  get oc() {
    return this.p.media.audioTracks;
  }
  Ci(event) {
    const _track = event.track;
    if (_track.label === "")
      return;
    const id = _track.id.toString() || `native-audio-${this.b.audioTracks.length}`, audioTrack = {
      id,
      label: _track.label,
      language: _track.language,
      kind: _track.kind,
      selected: false
    };
    this.b.audioTracks[ListSymbol.ea](audioTrack, event);
    if (_track.enabled)
      audioTrack.selected = true;
  }
  Di(event) {
    const track = this.b.audioTracks.getById(event.track.id);
    if (track)
      this.b.audioTracks[ListSymbol.dc](track, event);
  }
  Ei(event) {
    let enabledTrack = this.jg();
    if (!enabledTrack)
      return;
    const track = this.b.audioTracks.getById(enabledTrack.id);
    if (track)
      this.b.audioTracks[ListSymbol.fa](track, true, event);
  }
  jg() {
    return Array.from(this.oc).find((track) => track.enabled);
  }
  Fi(event) {
    const { current } = event.detail;
    if (!current)
      return;
    const track = this.oc.getTrackById(current.id);
    if (track) {
      const prev = this.jg();
      if (prev)
        prev.enabled = false;
      track.enabled = true;
    }
  }
}

class HTMLMediaProvider {
  constructor(_media, _ctx) {
    this.a = _media;
    this.b = _ctx;
    this.scope = createScope();
    this.L = null;
    this.audioGain = new AudioGain(this.a, (gain) => {
      this.b.delegate.c("audio-gain-change", gain);
    });
  }
  setup() {
    new HTMLMediaEvents(this, this.b);
    if ("audioTracks" in this.media)
      new NativeAudioTracks(this, this.b);
    onDispose(() => {
      this.audioGain.destroy();
      this.a.srcObject = null;
      this.a.removeAttribute("src");
      for (const source of this.a.querySelectorAll("source"))
        source.remove();
      this.a.load();
    });
  }
  get type() {
    return "";
  }
  get media() {
    return this.a;
  }
  get currentSrc() {
    return this.L;
  }
  setPlaybackRate(rate) {
    this.a.playbackRate = rate;
  }
  async play() {
    return this.a.play();
  }
  async pause() {
    return this.a.pause();
  }
  setMuted(muted) {
    this.a.muted = muted;
  }
  setVolume(volume) {
    this.a.volume = volume;
  }
  setCurrentTime(time) {
    this.a.currentTime = time;
  }
  setPlaysInline(inline) {
    setAttribute(this.a, "playsinline", inline);
  }
  async loadSource({ src, type }, preload) {
    this.a.preload = preload || "";
    if (isMediaStream(src)) {
      this.pc();
      this.a.srcObject = src;
    } else {
      this.a.srcObject = null;
      if (isString(src)) {
        if (type !== "?") {
          this.he({ src, type });
        } else {
          this.pc();
          this.a.src = this.kg(src);
        }
      } else {
        this.pc();
        this.a.src = window.URL.createObjectURL(src);
      }
    }
    this.a.load();
    this.L = { src, type };
  }
  /**
   * Append source so it works when requesting AirPlay since hls.js will remove it.
   */
  he(src, defaultType) {
    const prevSource = this.a.querySelector("source[data-vds]"), source = prevSource ?? document.createElement("source");
    setAttribute(source, "src", this.kg(src.src));
    setAttribute(source, "type", src.type !== "?" ? src.type : defaultType);
    setAttribute(source, "data-vds", "");
    if (!prevSource)
      this.a.append(source);
  }
  pc() {
    this.a.querySelector("source[data-vds]")?.remove();
  }
  kg(src) {
    const { clipStartTime, clipEndTime } = this.b.$state, startTime = clipStartTime(), endTime = clipEndTime();
    if (startTime > 0 && endTime > 0) {
      return `${src}#t=${startTime},${endTime}`;
    } else if (startTime > 0) {
      return `${src}#t=${startTime}`;
    } else if (endTime > 0) {
      return `${src}#t=0,${endTime}`;
    }
    return src;
  }
}

class HTMLRemotePlaybackAdapter {
  constructor(_media, _ctx) {
    this.a = _media;
    this.b = _ctx;
    this.qb = signal(false);
    this.ie();
  }
  get supported() {
    return this.qb();
  }
  ie() {
    if (IS_SERVER || !this.a?.remote || !this.lg)
      return;
    this.a.remote.watchAvailability((available) => {
      this.qb.set(available);
    }).catch(() => {
      this.qb.set(false);
    });
    effect(this.Gi.bind(this));
  }
  Gi() {
    if (!this.qb())
      return;
    const events = ["connecting", "connect", "disconnect"], onStateChange = this.je.bind(this);
    onStateChange();
    listenEvent(this.a, "playing", onStateChange);
    for (const type of events) {
      listenEvent(this.a.remote, type, onStateChange);
    }
  }
  async prompt() {
    if (!this.supported)
      throw Error("Not supported on this platform.");
    if (this.ma === "airplay" && this.a.webkitShowPlaybackTargetPicker) {
      return this.a.webkitShowPlaybackTargetPicker();
    }
    return this.a.remote.prompt();
  }
  je(event) {
    const state = this.a.remote.state;
    if (state === this.Aa)
      return;
    const detail = { type: this.ma, state };
    this.b.delegate.c("remote-playback-change", detail, event);
    this.Aa = state;
  }
}
class HTMLAirPlayAdapter extends HTMLRemotePlaybackAdapter {
  constructor() {
    super(...arguments);
    this.ma = "airplay";
  }
  get lg() {
    return "WebKitPlaybackTargetAvailabilityEvent" in window;
  }
}

class NativeHLSTextTracks {
  constructor(_video, _ctx) {
    this.m = _video;
    this.b = _ctx;
    _video.textTracks.onaddtrack = this.Zd.bind(this);
    onDispose(this.de.bind(this));
  }
  Zd(event) {
    const nativeTrack = event.track;
    if (!nativeTrack || findTextTrackElement(this.m, nativeTrack))
      return;
    const track = new TextTrack({
      id: nativeTrack.id,
      kind: nativeTrack.kind,
      label: nativeTrack.label ?? "",
      language: nativeTrack.language,
      type: "vtt"
    });
    track[TextTrackSymbol.$] = { track: nativeTrack };
    track[TextTrackSymbol.na] = 2;
    track[TextTrackSymbol.Nf] = true;
    let lastIndex = 0;
    const onCueChange = (event2) => {
      if (!nativeTrack.cues)
        return;
      for (let i = lastIndex; i < nativeTrack.cues.length; i++) {
        track.addCue(nativeTrack.cues[i], event2);
        lastIndex++;
      }
    };
    onCueChange(event);
    nativeTrack.oncuechange = onCueChange;
    this.b.textTracks.add(track, event);
    track.setMode(nativeTrack.mode, event);
  }
  de() {
    this.m.textTracks.onaddtrack = null;
    for (const track of this.b.textTracks) {
      const nativeTrack = track[TextTrackSymbol.$]?.track;
      if (nativeTrack?.oncuechange)
        nativeTrack.oncuechange = null;
    }
  }
}
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}

class VideoPictureInPicture {
  constructor(_video, _media) {
    this.m = _video;
    this.a = _media;
    this.F = (active, event) => {
      this.a.delegate.c("picture-in-picture-change", active, event);
    };
    listenEvent(this.m, "enterpictureinpicture", this.Hi.bind(this));
    listenEvent(this.m, "leavepictureinpicture", this.Ii.bind(this));
  }
  get active() {
    return document.pictureInPictureElement === this.m;
  }
  get supported() {
    return canUsePictureInPicture(this.m);
  }
  async enter() {
    return this.m.requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
  Hi(event) {
    this.F(true, event);
  }
  Ii(event) {
    this.F(false, event);
  }
}

class VideoPresentation {
  constructor(_video, _media) {
    this.m = _video;
    this.a = _media;
    this.V = "inline";
    listenEvent(this.m, "webkitpresentationmodechanged", this.ib.bind(this));
  }
  get qb() {
    return canUseVideoPresentation(this.m);
  }
  async gd(mode) {
    if (this.V === mode)
      return;
    this.m.webkitSetPresentationMode(mode);
  }
  ib(event) {
    const prevMode = this.V;
    this.V = this.m.webkitPresentationMode;
    this.a.player?.dispatch(
      new DOMEvent("video-presentation-change", {
        detail: this.V,
        trigger: event
      })
    );
    ["fullscreen", "picture-in-picture"].forEach((type) => {
      if (this.V === type || prevMode === type) {
        this.a.delegate.c(`${type}-change`, this.V === type, event);
      }
    });
  }
}
class FullscreenPresentationAdapter {
  constructor(_presentation) {
    this.Pa = _presentation;
  }
  get active() {
    return this.Pa.V === "fullscreen";
  }
  get supported() {
    return this.Pa.qb;
  }
  async enter() {
    this.Pa.gd("fullscreen");
  }
  async exit() {
    this.Pa.gd("inline");
  }
}
class PIPPresentationAdapter {
  constructor(_presentation) {
    this.Pa = _presentation;
  }
  get active() {
    return this.Pa.V === "picture-in-picture";
  }
  get supported() {
    return this.Pa.qb;
  }
  async enter() {
    this.Pa.gd("picture-in-picture");
  }
  async exit() {
    this.Pa.gd("inline");
  }
}

class VideoProvider extends HTMLMediaProvider {
  constructor(video, ctx) {
    super(video, ctx);
    this.$$PROVIDER_TYPE = "VIDEO";
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(video, ctx);
      if (canUseVideoPresentation(video)) {
        const presentation = new VideoPresentation(video, ctx);
        this.fullscreen = new FullscreenPresentationAdapter(presentation);
        this.pictureInPicture = new PIPPresentationAdapter(presentation);
      } else if (canUsePictureInPicture(video)) {
        this.pictureInPicture = new VideoPictureInPicture(video, ctx);
      }
    }, this.scope);
  }
  get type() {
    return "video";
  }
  setup() {
    super.setup();
    if (canPlayHLSNatively(this.video)) {
      new NativeHLSTextTracks(this.video, this.b);
    }
    this.b.textRenderers.Yf(this.video);
    onDispose(() => {
      this.b.textRenderers.Yf(null);
    });
    if (this.type === "video")
      this.b.delegate.c("provider-setup", this);
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this.a;
  }
}

var provider$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VideoProvider: VideoProvider
});

function getLangName(langCode) {
  try {
    const displayNames = new Intl.DisplayNames(navigator.languages, { type: "language" });
    const languageName = displayNames.of(langCode);
    return languageName ?? null;
  } catch (err) {
    return null;
  }
}

const toDOMEventType = (type) => `dash-${camelToKebabCase(type)}`;
class DASHController {
  constructor(_video, _ctx) {
    this.m = _video;
    this.b = _ctx;
    this.d = null;
    this.rb = null;
    this.sb = {};
    this.tb = /* @__PURE__ */ new Set();
    this.Lb = null;
    this.pe = {};
    this.oa = -1;
  }
  get instance() {
    return this.d;
  }
  setup(ctor) {
    this.d = ctor().create();
    const dispatcher = this.Ji.bind(this);
    for (const event of Object.values(ctor.events))
      this.d.on(event, dispatcher);
    this.d.on(ctor.events.ERROR, this.R.bind(this));
    for (const callback of this.tb)
      callback(this.d);
    this.b.player.dispatch("dash-instance", {
      detail: this.d
    });
    this.d.initialize(this.m, void 0, false);
    this.d.updateSettings({
      streaming: {
        text: {
          // Disabling text rendering by dash.
          defaultEnabled: false,
          dispatchForManualRendering: true
        },
        buffer: {
          /// Enables buffer replacement when switching bitrates for faster switching.
          fastSwitchEnabled: true
        }
      },
      ...this.sb
    });
    this.d.on(ctor.events.FRAGMENT_LOADING_STARTED, this.Ki.bind(this));
    this.d.on(
      ctor.events.FRAGMENT_LOADING_COMPLETED,
      this.Li.bind(this)
    );
    this.d.on(ctor.events.MANIFEST_LOADED, this.Mi.bind(this));
    this.d.on(ctor.events.QUALITY_CHANGE_RENDERED, this._a.bind(this));
    this.d.on(ctor.events.TEXT_TRACKS_ADDED, this.Ni.bind(this));
    this.d.on(ctor.events.TRACK_CHANGE_RENDERED, this.qc.bind(this));
    this.b.qualities[QualitySymbol.Ja] = this.ke.bind(this);
    listenEvent(this.b.qualities, "change", this.le.bind(this));
    listenEvent(this.b.audioTracks, "change", this.me.bind(this));
    this.rb = effect(this.ne.bind(this));
  }
  ba(event) {
    return new DOMEvent(toDOMEventType(event.type), { detail: event });
  }
  ne() {
    if (!this.b.$state.live())
      return;
    const raf = new RAFLoop(this.oe.bind(this));
    raf.Ya();
    return raf.aa.bind(raf);
  }
  oe() {
    if (!this.d)
      return;
    const position = this.d.duration() - this.d.time();
    this.b.$state.liveSyncPosition.set(!isNaN(position) ? position : Infinity);
  }
  Ji(event) {
    this.b.player?.dispatch(this.ba(event));
  }
  Oi(event) {
    const native = this.Lb?.[TextTrackSymbol.$], cues = (native?.track).cues;
    if (!native || !cues)
      return;
    const id = this.Lb.id, startIndex = this.pe[id] ?? 0, trigger = this.ba(event);
    for (let i = startIndex; i < cues.length; i++) {
      const cue = cues[i];
      if (!cue.positionAlign)
        cue.positionAlign = "auto";
      this.Lb.addCue(cue, trigger);
    }
    this.pe[id] = cues.length;
  }
  Ni(event) {
    if (!this.d)
      return;
    const data = event.tracks, nativeTextTracks = [...this.m.textTracks].filter((track) => "manualMode" in track), trigger = this.ba(event);
    for (let i = 0; i < nativeTextTracks.length; i++) {
      const textTrackInfo = data[i], nativeTextTrack = nativeTextTracks[i];
      const id = `dash-${textTrackInfo.kind}-${i}`, track = new TextTrack({
        id,
        label: textTrackInfo?.label ?? textTrackInfo.labels.find((t) => t.text)?.text ?? (textTrackInfo?.lang && getLangName(textTrackInfo.lang)) ?? textTrackInfo?.lang ?? void 0,
        language: textTrackInfo.lang ?? void 0,
        kind: textTrackInfo.kind,
        default: textTrackInfo.defaultTrack
      });
      track[TextTrackSymbol.$] = {
        managed: true,
        track: nativeTextTrack
      };
      track[TextTrackSymbol.na] = 2;
      track[TextTrackSymbol.ib] = () => {
        if (!this.d)
          return;
        if (track.mode === "showing") {
          this.d.setTextTrack(i);
          this.Lb = track;
        } else {
          this.d.setTextTrack(-1);
          this.Lb = null;
        }
      };
      this.b.textTracks.add(track, trigger);
    }
  }
  qc(event) {
    const { mediaType, newMediaInfo } = event;
    if (mediaType === "audio") {
      const track = this.b.audioTracks.getById(`dash-audio-${newMediaInfo.index}`);
      if (track) {
        const trigger = this.ba(event);
        this.b.audioTracks[ListSymbol.fa](track, true, trigger);
      }
    }
  }
  _a(event) {
    if (event.mediaType !== "video")
      return;
    const quality = this.b.qualities[event.newQuality];
    if (quality) {
      const trigger = this.ba(event);
      this.b.qualities[ListSymbol.fa](quality, true, trigger);
    }
  }
  Mi(event) {
    if (this.b.$state.canPlay() || !this.d)
      return;
    const { type, mediaPresentationDuration } = event.data, trigger = this.ba(event);
    this.b.delegate.c(
      "stream-type-change",
      type !== "static" ? "live" : "on-demand",
      trigger
    );
    this.b.delegate.c("duration-change", mediaPresentationDuration, trigger);
    this.b.qualities[QualitySymbol.Xa](true, trigger);
    const media = this.d.getVideoElement();
    const videoQualities = this.d.getTracksForTypeFromManifest(
      "video",
      event.data
    );
    const supportedVideoMimeType = [...new Set(videoQualities.map((e) => e.mimeType))].find(
      (type2) => type2 && canPlayVideoType(media, type2)
    );
    const videoQuality = videoQualities.filter(
      (track) => supportedVideoMimeType === track.mimeType
    )[0];
    let audioTracks = this.d.getTracksForTypeFromManifest(
      "audio",
      event.data
    );
    const supportedAudioMimeType = [...new Set(audioTracks.map((e) => e.mimeType))].find(
      (type2) => type2 && canPlayAudioType(media, type2)
    );
    audioTracks = audioTracks.filter((track) => supportedAudioMimeType === track.mimeType);
    videoQuality.bitrateList.forEach((bitrate, index) => {
      const quality = {
        id: bitrate.id?.toString() ?? `dash-bitrate-${index}`,
        width: bitrate.width ?? 0,
        height: bitrate.height ?? 0,
        bitrate: bitrate.bandwidth ?? 0,
        codec: videoQuality.codec,
        index
      };
      this.b.qualities[ListSymbol.ea](quality, trigger);
    });
    if (isNumber(videoQuality.index)) {
      const quality = this.b.qualities[videoQuality.index];
      if (quality)
        this.b.qualities[ListSymbol.fa](quality, true, trigger);
    }
    audioTracks.forEach((audioTrack, index) => {
      const matchingLabel = audioTrack.labels.find((label2) => {
        return navigator.languages.some((language) => {
          return label2.lang && language.toLowerCase().startsWith(label2.lang.toLowerCase());
        });
      });
      const label = matchingLabel || audioTrack.labels[0];
      const localTrack = {
        id: `dash-audio-${audioTrack?.index}`,
        label: label?.text ?? (audioTrack.lang && getLangName(audioTrack.lang)) ?? audioTrack.lang ?? "",
        language: audioTrack.lang ?? "",
        kind: "main",
        mimeType: audioTrack.mimeType,
        codec: audioTrack.codec,
        index
      };
      this.b.audioTracks[ListSymbol.ea](localTrack, trigger);
    });
    media.dispatchEvent(new DOMEvent("canplay", { trigger }));
  }
  R(event) {
    const { type: eventType, error: data } = event;
    switch (data.code) {
      case 27:
        this.qe(data);
        break;
      default:
        this.rc(data);
        break;
    }
  }
  Ki() {
    if (this.oa >= 0)
      this.$a();
  }
  Li(event) {
    const mediaType = event.mediaType;
    if (mediaType === "text") {
      requestAnimationFrame(this.Oi.bind(this, event));
    }
  }
  qe(error) {
    this.$a();
    this.d?.play();
    this.oa = window.setTimeout(() => {
      this.oa = -1;
      this.rc(error);
    }, 5e3);
  }
  $a() {
    clearTimeout(this.oa);
    this.oa = -1;
  }
  rc(error) {
    this.b.delegate.c("error", {
      message: error.message ?? "",
      code: 1,
      error
    });
  }
  ke() {
    this.mg("video", true);
    const { qualities } = this.b;
    this.d?.setQualityFor("video", qualities.selectedIndex, true);
  }
  mg(type, auto) {
    this.d?.updateSettings({
      streaming: { abr: { autoSwitchBitrate: { [type]: auto } } }
    });
  }
  le() {
    const { qualities } = this.b;
    if (!this.d || qualities.auto || !qualities.selected)
      return;
    this.mg("video", false);
    this.d.setQualityFor("video", qualities.selectedIndex, qualities.switch === "current");
    if (IS_CHROME) {
      this.m.currentTime = this.m.currentTime;
    }
  }
  me() {
    if (!this.d)
      return;
    const { audioTracks } = this.b, selectedTrack = this.d.getTracksFor("audio").find(
      (track) => audioTracks.selected && audioTracks.selected.id === `dash-audio-${track.index}`
    );
    if (selectedTrack)
      this.d.setCurrentTrack(selectedTrack);
  }
  A() {
    this.$a();
    this.Lb = null;
    this.pe = {};
  }
  loadSource(src) {
    this.A();
    if (!isString(src.src))
      return;
    this.d?.attachSource(src.src);
  }
  destroy() {
    this.A();
    this.d?.destroy();
    this.d = null;
    this.rb?.();
    this.rb = null;
  }
}

function coerceToError(error) {
  return error instanceof Error ? error : Error(typeof error === "string" ? error : JSON.stringify(error));
}
function assert(condition, message) {
  if (!condition) {
    throw Error("Assertion failed.");
  }
}

class DASHLibLoader {
  constructor(_lib, _ctx, _callback) {
    this.M = _lib;
    this.b = _ctx;
    this.Ma = _callback;
    this.re();
  }
  async re() {
    const callbacks = {
      onLoadStart: this.Na.bind(this),
      onLoaded: this.ub.bind(this),
      onLoadError: this.se.bind(this)
    };
    let ctor = await loadDASHScript(this.M, callbacks);
    if (isUndefined(ctor) && !isString(this.M))
      ctor = await importDASH(this.M, callbacks);
    if (!ctor)
      return null;
    if (!window.dashjs.supportsMediaSource()) {
      const message = "[vidstack] `dash.js` is not supported in this environment";
      this.b.player.dispatch(new DOMEvent("dash-unsupported"));
      this.b.delegate.c("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  Na() {
    this.b.player.dispatch(new DOMEvent("dash-lib-load-start"));
  }
  ub(ctor) {
    this.b.player.dispatch(
      new DOMEvent("dash-lib-loaded", {
        detail: ctor
      })
    );
    this.Ma(ctor);
  }
  se(e) {
    const error = coerceToError(e);
    this.b.player.dispatch(
      new DOMEvent("dash-lib-load-error", {
        detail: error
      })
    );
    this.b.delegate.c("error", {
      message: error.message,
      code: 4,
      error
    });
  }
}
async function importDASH(loader, callbacks = {}) {
  if (isUndefined(loader))
    return void 0;
  callbacks.onLoadStart?.();
  if (isDASHConstructor(loader)) {
    callbacks.onLoaded?.(loader);
    return loader;
  }
  if (isDASHNamespace(loader)) {
    const ctor = loader.MediaPlayer;
    callbacks.onLoaded?.(ctor);
    return ctor;
  }
  try {
    const ctor = (await loader())?.default;
    if (isDASHNamespace(ctor)) {
      callbacks.onLoaded?.(ctor.MediaPlayer);
      return ctor.MediaPlayer;
    }
    if (ctor) {
      callbacks.onLoaded?.(ctor);
    } else {
      throw Error(
        false ? "[vidstack] failed importing `dash.js`. Dynamic import returned invalid object." : ""
      );
    }
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
async function loadDASHScript(src, callbacks = {}) {
  if (!isString(src))
    return void 0;
  callbacks.onLoadStart?.();
  try {
    await loadScript(src);
    if (!isFunction(window.dashjs.MediaPlayer)) {
      throw Error(
        false ? "[vidstack] failed loading `dash.js`. Could not find a valid `Dash` constructor on window" : ""
      );
    }
    const ctor = window.dashjs.MediaPlayer;
    callbacks.onLoaded?.(ctor);
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
function isDASHConstructor(value) {
  return value && value.prototype && value.prototype !== Function;
}
function isDASHNamespace(value) {
  return value && "MediaPlayer" in value;
}

const JS_DELIVR_CDN = "https://cdn.jsdelivr.net";
class DASHProvider extends VideoProvider {
  constructor() {
    super(...arguments);
    this.$$PROVIDER_TYPE = "DASH";
    this.sc = null;
    this.e = new DASHController(this.video, this.b);
    this.pa = `${JS_DELIVR_CDN}/npm/dashjs@4.7.4/dist/dash${".all.min.js"}`;
  }
  /**
   * The `dash.js` constructor.
   */
  get ctor() {
    return this.sc;
  }
  /**
   * The current `dash.js` instance.
   */
  get instance() {
    return this.e.instance;
  }
  get type() {
    return "dash";
  }
  get canLiveSync() {
    return true;
  }
  /**
   * The `dash.js` configuration object.
   *
   * @see {@link https://cdn.dashjs.org/latest/jsdoc/module-Settings.html}
   */
  get config() {
    return this.e.sb;
  }
  set config(config) {
    this.e.sb = config;
  }
  /**
   * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
   */
  get library() {
    return this.pa;
  }
  set library(library) {
    this.pa = library;
  }
  preconnect() {
    if (!isString(this.pa))
      return;
    preconnect(this.pa);
  }
  setup() {
    super.setup();
    new DASHLibLoader(this.pa, this.b, (ctor) => {
      this.sc = ctor;
      this.e.setup(ctor);
      this.b.delegate.c("provider-setup", this);
      const src = peek(this.b.$state.source);
      if (src)
        this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src)) {
      this.pc();
      return;
    }
    this.a.preload = preload || "";
    this.he(src, "application/x-mpegurl");
    this.e.loadSource(src);
    this.L = src;
  }
  /**
   * The given callback is invoked when a new `dash.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this.e.instance;
    if (instance)
      callback(instance);
    this.e.tb.add(callback);
    return () => this.e.tb.delete(callback);
  }
  destroy() {
    this.e.destroy();
  }
}
/**
 * Whether `dash.js` is supported in this environment.
 */
DASHProvider.supported = isDASHSupported();

var provider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DASHProvider: DASHProvider
});

const _DASHProviderLoader = class _DASHProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    this.name = "dash";
  }
  canPlay(src) {
    return _DASHProviderLoader.supported && isDASHSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load dash provider server-side");
    }
    return new (await Promise.resolve().then(function () { return provider; })).DASHProvider(this.target, context);
  }
};
_DASHProviderLoader.supported = isDASHSupported();
let DASHProviderLoader = _DASHProviderLoader;

const _HLSProviderLoader = class _HLSProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    this.name = "hls";
  }
  canPlay(src) {
    return _HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load hls provider server-side");
    }
    return new (await import('./vidstack-KL81mtuX.js')).HLSProvider(this.target, context);
  }
};
_HLSProviderLoader.supported = isHLSSupported();
let HLSProviderLoader = _HLSProviderLoader;

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
    if (IS_SERVER) {
      throw Error("[vidstack] can not load vimeo provider server-side");
    }
    return new (await import('./vidstack-DvyxEpc2.js')).VimeoProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId, getVimeoVideoInfo } = await import('./vidstack-BInq9zTH.js');
    if (!isString(src.src))
      return null;
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
    if (IS_SERVER) {
      throw Error("[vidstack] can not load youtube provider server-side");
    }
    return new (await import('./vidstack-7OYDZMfg.js')).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import('./vidstack-DscYSLiW.js');
    const videoId = isString(src.src) && resolveYouTubeVideoId(src.src);
    if (videoId)
      return findYouTubePoster(videoId, abort);
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
    this.ma = _type;
    this.Ma = _callback;
  }
  async onAttach(el) {
    if (IS_SERVER)
      return;
    const load = this.$props[this.ma]();
    if (load === "eager") {
      requestAnimationFrame(this.Ma);
    } else if (load === "idle") {
      waitIdlePeriod(this.Ma);
    } else if (load === "visible") {
      let dispose, observer = new IntersectionObserver((entries) => {
        if (!this.scope)
          return;
        if (entries[0].isIntersecting) {
          dispose?.();
          dispose = void 0;
          this.Ma();
        }
      });
      observer.observe(el);
      dispose = onDispose(() => observer.disconnect());
    }
  }
}

class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this.W = _handle;
    this.a = _media;
    this.c = (type, ...init) => {
      if (IS_SERVER)
        return;
      this.W(
        new DOMEvent(type, {
          detail: init?.[0],
          trigger: init?.[1]
        })
      );
    };
  }
  async Ha(info, trigger) {
    if (IS_SERVER)
      return;
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
      if (canPlay())
        return;
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
        if (audioGain > 1)
          provider.audioGain?.setGain?.(audioGain);
        provider.setPlaybackRate?.(await storage?.getPlaybackRate() ?? playbackRate());
        provider.setPlaysInline?.(playsInline());
        if (startTime > 0)
          provider.setCurrentTime(startTime);
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
        if (currentQuality)
          currentQuality.selected = true;
      }
      if (canPlay() && shouldAutoPlay) {
        await this.lj(trigger);
      } else if (storageTime && storageTime > 0) {
        this.c("started", void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
  async lj(trigger) {
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
  ye(key) {
    const value = this.sg(key);
    this.i.delete(key);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  sg(key) {
    return this.i.get(key);
  }
  /**
   * Removes queued item under the given `key`.
   */
  vb(key) {
    this.i.delete(key);
  }
  /**
   * Clear all items in the queue.
   */
  Qm() {
    this.i.clear();
  }
}

class RequestQueue {
  constructor() {
    this.xc = false;
    this.ze = deferredPromise();
    this.i = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get Rm() {
    return this.i.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get Sm() {
    return this.xc;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async Tm() {
    if (this.xc)
      return;
    await this.ze.promise;
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
    if (this.xc) {
      callback();
      return;
    }
    this.i.delete(key);
    this.i.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  ye(key) {
    this.i.get(key)?.();
    this.i.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  Ya() {
    this.tg();
    this.xc = true;
    if (this.i.size > 0)
      this.tg();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  aa() {
    this.xc = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  A() {
    this.aa();
    this.i.clear();
    this.ug();
  }
  tg() {
    for (const key of this.i.keys())
      this.ye(key);
    this.ug();
  }
  ug() {
    this.ze.resolve();
    this.ze = deferredPromise();
  }
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this.Ca = _stateMgr;
    this.g = _request;
    this.a = _media;
    this.Ac = new RequestQueue();
    this.Ge = false;
    this.D = _media.$provider;
    this.zc = new MediaControls();
    this.qd = new FullscreenController();
    this.cb = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this.Rd.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.Ij.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this.Jj();
    effect(this.Kj.bind(this));
    effect(this.Lj.bind(this));
    effect(this.Mj.bind(this));
    effect(this.Nj.bind(this));
    effect(this.Oj.bind(this));
    effect(this.Pj.bind(this));
    effect(this.Qj.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen())
        this.Mg("prefer-media", destroyEvent);
      if (pictureInPicture())
        this.He(destroyEvent);
    } catch (e) {
    }
    this.Ac.A();
  }
  Jj() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad())
      return;
    const off = this.listen("media-play-request", (event) => {
      this.Hg(event);
      off();
    });
  }
  Kj() {
    const provider = this.D(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this.Ac.Ya();
    }
    return () => {
      this.Ac.aa();
    };
  }
  Ij(event) {
    event.stopPropagation();
    if (event.defaultPrevented)
      return;
    if (!this[event.type])
      return;
    if (peek(this.D)) {
      this[event.type](event);
    } else {
      this.Ac.k(event.type, () => {
        if (peek(this.D))
          this[event.type](event);
      });
    }
  }
  async Bc(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, paused, autoPlaying } = this.$state;
    if (this.Hg(trigger))
      return;
    if (!peek(paused))
      return;
    if (trigger)
      this.g.i.k("media-play-request", trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider = peek(this.D);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.play();
    } catch (error) {
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoPlay = isAutoPlaying;
      this.Ca.W(errorEvent);
      throw error;
    }
  }
  Hg(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event);
      this.Ac.k("media-play-request", async () => {
        try {
          await this.Bc(event);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async Fe(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, paused } = this.$state;
    if (peek(paused))
      return;
    if (trigger) {
      this.g.i.k("media-pause-request", trigger);
    }
    try {
      const provider = peek(this.D);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.pause();
    } catch (error) {
      this.g.i.vb("media-pause-request");
      throw error;
    }
  }
  Ig(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain)
      return;
    const provider = this.D();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this.g.i.k("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  Jg(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek()))
      return;
    const provider = peek(this.D);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    if (trigger)
      this.g.i.k("media-seek-request", trigger);
    const end = seekableEnd() - 2;
    provider.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  async Kg(target = "prefer-media", trigger) {
    if (IS_SERVER)
      return;
    const adapter = this.Lg(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active)
      return;
    if (peek(this.$state.pictureInPicture)) {
      this.Ge = true;
      await this.He(trigger);
    }
    if (trigger) {
      this.g.i.k("media-enter-fullscreen-request", trigger);
    }
    return adapter.enter();
  }
  async Mg(target = "prefer-media", trigger) {
    if (IS_SERVER)
      return;
    const adapter = this.Lg(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active)
      return;
    if (trigger) {
      this.g.i.k("media-exit-fullscreen-request", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this.Ge && peek(this.$state.canPictureInPicture)) {
        await this.Ie();
      }
      return result;
    } finally {
      this.Ge = false;
    }
  }
  Lg(target) {
    const provider = peek(this.D);
    return target === "prefer-media" && this.qd.supported || target === "media" ? this.qd : provider?.fullscreen;
  }
  async Ie(trigger) {
    if (IS_SERVER)
      return;
    this.Ng();
    if (this.$state.pictureInPicture())
      return;
    if (trigger) {
      this.g.i.k("media-enter-pip-request", trigger);
    }
    return await this.D().pictureInPicture.enter();
  }
  async He(trigger) {
    if (IS_SERVER)
      return;
    this.Ng();
    if (!this.$state.pictureInPicture())
      return;
    if (trigger) {
      this.g.i.k("media-exit-pip-request", trigger);
    }
    return await this.D().pictureInPicture.exit();
  }
  Ng() {
    if (this.$state.canPictureInPicture())
      return;
    throw Error(
      "[vidstack] no pip support"
    );
  }
  Lj() {
    this.zc.defaultDelay = this.$props.controlsDelay();
  }
  Mj() {
    const { canSetAudioGain } = this.$state, supported = !!this.D()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  Nj() {
    const { canAirPlay } = this.$state, supported = !!this.D()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  Oj() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
    canGoogleCast.set(supported);
  }
  Pj() {
    const { canFullscreen } = this.$state, supported = this.qd.supported || !!this.D()?.fullscreen?.supported;
    canFullscreen.set(supported);
  }
  Qj() {
    const { canPictureInPicture } = this.$state, supported = !!this.D()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event) {
    try {
      await this.Og(event);
    } catch (error) {
    }
  }
  async Og(trigger) {
    try {
      const adapter = this.D()?.airPlay;
      if (!adapter?.supported) {
        throw Error(false ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this.g.i.k("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this.g.i.vb("media-airplay-request");
      throw error;
    }
  }
  async ["media-google-cast-request"](event) {
    try {
      await this.Pg(event);
    } catch (error) {
    }
  }
  async Pg(trigger) {
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
      if (!this.rd) {
        const $module = await import('./vidstack-H1spfgoW.js').then(function (n) { return n.d; });
        this.rd = new $module.GoogleCastLoader();
      }
      await this.rd.prompt(this.a);
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
      this.$state.remotePlaybackLoader.set(isConnecting ? this.rd : null);
    } catch (error) {
      this.g.i.vb("media-google-cast-request");
      throw error;
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
      await this.Kg(event.detail, event);
    } catch (error) {
      this._c(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this.Mg(event.detail, event);
    } catch (error) {
      this._c(error, event);
    }
  }
  async Rd(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || lockType === "none" || !this.cb.supported)
      return;
    if (isFullscreen) {
      if (this.cb.locked)
        return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this.cb.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  _c(error, request) {
    this.Ca.W(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    const key = event.type;
    try {
      this.g.i.k(key, event);
      await this.cb.lock(event.detail);
    } catch (error) {
      this.g.i.vb(key);
    }
  }
  async ["media-orientation-unlock-request"](event) {
    const key = event.type;
    try {
      this.g.i.k(key, event);
      await this.cb.unlock();
    } catch (error) {
      this.g.i.vb(key);
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this.Ie(event);
    } catch (error) {
      this.Qg(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this.He(event);
    } catch (error) {
      this.Qg(error, event);
    }
  }
  Qg(error, request) {
    this.Ca.W(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek())
      return;
    this.g.i.k("media-seek-request", event);
    try {
      this.Jg();
    } catch (error) {
      this.g.i.vb("media-seek-request");
    }
  }
  async ["media-loop-request"](event) {
    try {
      this.g.Pb = true;
      this.g.Cc = true;
      await this.Bc(event);
    } catch (error) {
      this.g.Pb = false;
    }
  }
  ["media-user-loop-change-request"](event) {
    this.$state.userPrefersLoop.set(event.detail);
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused())
      return;
    try {
      await this.Fe(event);
    } catch (error) {
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused())
      return;
    try {
      await this.Bc(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate())
      return;
    const provider = this.D();
    if (!provider?.setPlaybackRate)
      return;
    this.g.i.k("media-rate-change-request", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-audio-gain-change-request"](event) {
    try {
      this.Ig(event.detail, event);
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
      if (event.isOriginTrusted)
        storage?.setVideoQuality?.(null);
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
    this.zc.pause(event);
  }
  ["media-resume-controls-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.zc.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event.detail;
    if (ended())
      this.g.Cc = true;
    const key = event.type;
    this.g.Ka = false;
    this.g.i.vb(key);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek())
      return;
    this.g.i.k(key, event);
    this.D().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.$state.seeking.set(true);
    this.g.Ka = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.Ca.W(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event) {
    if (this.$state.canLoadPoster())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.Ca.W(this.createEvent("can-load-poster"));
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
    if (this.$state.muted())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.D().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.a.$provider().setMuted(false);
    if (volume() === 0) {
      this.g.i.k(key, event);
      this.D().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume)
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.D().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this.g.i.k(key, event);
      this.D().setMuted(false);
    }
  }
  Ra(title, error, request) {
    return;
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay)
    return;
  throw Error(
    "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported)
    return;
  throw Error(
    "[vidstack] no fullscreen support"
  );
}
class MediaRequestContext {
  constructor() {
    this.Ka = false;
    this.Pb = false;
    this.Cc = false;
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
    this.v = /* @__PURE__ */ new Map();
    this.sd = false;
    this.td = false;
    this.Dc = false;
    this.Le = null;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, realCurrentTime, paused } = this.$state;
        seeking.set(true);
        realCurrentTime.set(event.detail);
        this.E("media-seeking-request", event);
        if (paused()) {
          this.Qb = event;
          this.Me();
        }
      },
      150,
      { leading: true }
    );
    this.Me = functionDebounce(() => {
      if (!this.Qb)
        return;
      this.td = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this.Qb });
      this.v.set("waiting", event);
      this.dispatch(event);
      this.Qb = void 0;
      this.td = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this.Rj.bind(this));
    this.Sj();
    this.Tj();
    this.Uj();
    this.Vj();
    onDispose(this.Wj.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this.a;
    audioTracks[ListSymbol.A]();
    qualities[ListSymbol.A]();
    textTracks[ListSymbol.A]();
    this.Je();
  }
  W(event) {
    if (!this.scope)
      return;
    const type = event.type;
    untrack(() => this[event.type]?.(event));
    if (!IS_SERVER) {
      if (TRACKED_EVENT.has(type))
        this.v.set(type, event);
      this.dispatch(event);
    }
  }
  Vj() {
    if (!this.Dc)
      return;
    requestAnimationFrame(() => {
      if (!this.scope)
        return;
      this.a.remote.play(new DOMEvent("dom-connect"));
    });
    this.Dc = false;
  }
  Wj() {
    if (this.Dc)
      return;
    this.Dc = !this.$state.paused();
    this.a.$provider()?.pause();
  }
  wb() {
    this.Rg();
    this.sd = false;
    this.g.Cc = false;
    this.g.Pb = false;
    this.td = false;
    this.Qb = void 0;
    this.v.clear();
  }
  E(request, event) {
    const requestEvent = this.g.i.ye(request);
    if (!requestEvent)
      return;
    event.request = requestEvent;
    event.triggers.add(requestEvent);
  }
  Sj() {
    this.Ke();
    this.Sg();
    const textTracks = this.a.textTracks;
    listenEvent(textTracks, "add", this.Ke.bind(this));
    listenEvent(textTracks, "remove", this.Ke.bind(this));
    listenEvent(textTracks, "mode-change", this.Sg.bind(this));
  }
  Tj() {
    const qualities = this.a.qualities;
    listenEvent(qualities, "add", this.md.bind(this));
    listenEvent(qualities, "remove", this.md.bind(this));
    listenEvent(qualities, "change", this._a.bind(this));
    listenEvent(qualities, "auto-change", this.Xj.bind(this));
    listenEvent(qualities, "readonly-change", this.Yj.bind(this));
  }
  Uj() {
    const audioTracks = this.a.audioTracks;
    listenEvent(audioTracks, "add", this.Tg.bind(this));
    listenEvent(audioTracks, "remove", this.Tg.bind(this));
    listenEvent(audioTracks, "change", this.Zj.bind(this));
  }
  Ke(event) {
    const { textTracks } = this.$state;
    textTracks.set(this.a.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  Sg(event) {
    if (event)
      this.E("media-text-track-change-request", event);
    const current = this.a.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  Tg(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this.a.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  Zj(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this.a.audioTracks.selected);
    if (event)
      this.E("media-audio-track-change-request", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  md(event) {
    const { qualities } = this.$state;
    qualities.set(this.a.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  _a(event) {
    const { quality } = this.$state;
    quality.set(this.a.qualities.selected);
    if (event)
      this.E("media-quality-change-request", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  Xj() {
    const { qualities } = this.a, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto)
      this.Je();
  }
  Ug() {
    this.Je();
    this.Le = effect(() => {
      const { qualities } = this.a, { mediaWidth, mediaHeight } = this.$state, w = mediaWidth(), h = mediaHeight();
      if (w === 0 || h === 0)
        return;
      let selectedQuality = null, minScore = Infinity;
      for (const quality of qualities) {
        const score = Math.abs(quality.width - w) + Math.abs(quality.height - h);
        if (score < minScore) {
          minScore = score;
          selectedQuality = quality;
        }
      }
      if (selectedQuality) {
        qualities[ListSymbol.fa](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w, height: h } })
        );
      }
    });
  }
  Je() {
    this.Le?.();
    this.Le = null;
  }
  Yj() {
    this.$state.canSetQuality.set(!this.a.qualities.readonly);
  }
  Rj() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event) {
    const prevProvider = this.a.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type)
      return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this.a.$provider.set(event.detail);
    if (prevProvider && event.detail === null) {
      this.Vg(event);
    }
  }
  ["provider-loader-change"](event) {
  }
  ["auto-play"](event) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event) {
    this.$state.autoPlayError.set(event.detail);
    this.wb();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this.v.set("can-load", event);
    this.a.textTracks[TextTrackSymbol._]();
    this.E("media-start-loading", event);
  }
  ["can-load-poster"](event) {
    this.$state.canLoadPoster.set(true);
    this.v.set("can-load-poster", event);
    this.E("media-poster-start-loading", event);
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this.v.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event.detail : providedViewType;
    if (viewType !== currentViewType) {
      if (IS_SERVER) {
        this.$state.inferredViewType.set(currentViewType);
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.scope)
              return;
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
    const sourceChangeEvent = this.v.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    const { storage } = this.a, { canPlay } = this.$state;
    this.$state.playbackRate.set(event.detail);
    this.E("media-rate-change-request", event);
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
      this.E(key, event);
    } else {
      const requestEvent = this.g.i.sg(key);
      if (requestEvent) {
        event.request = requestEvent;
        event.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event) {
    const prevSources = this.$state.sources(), newSources = event.detail;
    this.$state.sources.set(newSources);
    this._j(prevSources, newSources, event);
  }
  _j(prevSources, newSources, trigger) {
    let { qualities } = this.a, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc))
        continue;
      const exists = newSources.some((s) => s.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol.dc](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol.A](trigger);
    }
    for (const src of newSources) {
      if (!isVideoQualitySrc(src) || qualities.getBySrc(src.src))
        continue;
      const quality = {
        id: src.id ?? src.height + "p",
        bitrate: null,
        codec: null,
        ...src,
        selected: false
      };
      qualities[ListSymbol.ea](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol.Ja]) {
      this.Ug();
      qualities[QualitySymbol.Ja] = this.Ug.bind(this);
      qualities[QualitySymbol.Xa](true, trigger);
    }
  }
  ["source-change"](event) {
    event.isQualityChange = event.originEvent?.type === "quality-change";
    const source = event.detail;
    this.Vg(event, event.isQualityChange);
    this.v.set(event.type, event);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
  }
  Vg(event, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this.a;
    if (!isSourceQualityChange) {
      audioTracks[ListSymbol.A](event);
      qualities[ListSymbol.A](event);
      softResetMediaState(this.$state, isSourceQualityChange);
      this.wb();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this.wb();
  }
  ["abort"](event) {
    const sourceChangeEvent = this.v.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this.v.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this.v.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this.v.get("abort");
    if (abortEvent)
      event.triggers.add(abortEvent);
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this.v.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this.v.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this.v.get("loaded-metadata");
    if (loadedMetadata)
      event.triggers.add(loadedMetadata);
    this.Wg(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this.Wg(event.detail);
    const canPlay = this.v.get("can-play");
    if (canPlay)
      event.triggers.add(canPlay);
  }
  Wg(detail) {
    const { seekable, buffered, intrinsicDuration, canPlay } = this.$state;
    canPlay.set(true);
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    const seekableEnd = getTimeRangesEnd(detail.seekable) ?? Infinity;
    intrinsicDuration.set(seekableEnd);
  }
  ["duration-change"](event) {
    const { live, intrinsicDuration, ended } = this.$state, time = event.detail;
    if (!live()) {
      const duration = !Number.isNaN(time) ? time : 0;
      intrinsicDuration.set(duration);
      if (ended())
        this.Xg(event);
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
    this.$j();
    if (!paused()) {
      event.stopImmediatePropagation();
      return;
    }
    event.autoPlay = autoPlaying();
    const waitingEvent = this.v.get("waiting");
    if (waitingEvent)
      event.triggers.add(waitingEvent);
    this.E("media-play-request", event);
    this.v.set("play", event);
    paused.set(false);
    autoPlayError.set(null);
    if (event.autoPlay) {
      this.W(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this.g.Cc) {
      this.g.Cc = false;
      ended.set(false);
      this.W(this.createEvent("replay", { trigger: event }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this.a.remote.enterFullscreen("prefer-media", event);
    }
    if (live() && !userBehindLiveEdge()) {
      this.a.remote.seekToLiveEdge(event);
    }
  }
  $j(trigger) {
    const provider = peek(this.a.$provider);
    if (!provider)
      return;
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
    const playEvent = this.v.get("play");
    if (playEvent)
      event.triggers.add(playEvent);
    this.E("media-play-request", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.wb();
    this.v.set("play-fail", event);
    if (event.autoPlay) {
      this.W(
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
    const playEvent = this.v.get("play"), seekedEvent = this.v.get("seeked");
    if (playEvent)
      event.triggers.add(playEvent);
    else if (seekedEvent)
      event.triggers.add(seekedEvent);
    setTimeout(() => this.wb(), 0);
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
    if (this.g.Pb) {
      this.g.Pb = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end))
        this.a.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.W(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this.Dc = true;
    }
    this.E("media-pause-request", event);
    const seekedEvent = this.v.get("seeked");
    if (seekedEvent)
      event.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this.sd) {
      setTimeout(() => {
        this.W(this.createEvent("end", { trigger: event }));
        this.sd = false;
      }, 0);
    }
    this.wb();
  }
  ["time-update"](event) {
    if (this.g.Pb) {
      event.stopImmediatePropagation();
      return;
    }
    const { realCurrentTime, played, waiting, clipEndTime } = this.$state, endTime = clipEndTime(), detail = event.detail;
    realCurrentTime.set(detail.currentTime);
    played.set(detail.played);
    waiting.set(false);
    for (const track of this.a.textTracks) {
      track[TextTrackSymbol.Fb](detail.currentTime, event);
    }
    if (endTime > 0 && detail.currentTime >= endTime) {
      this.sd = true;
      this.dispatch("media-pause-request", { trigger: event });
    }
    this.ak();
  }
  // Called to update time again incase duration precision has changed.
  Xg(trigger) {
    const { duration, played } = this.$state, playedStart = getTimeRangesStart(played()) ?? 0;
    this.W(
      this.createEvent("time-update", {
        detail: {
          currentTime: duration(),
          played: new TimeRange(playedStart, duration())
        },
        trigger
      })
    );
  }
  ak() {
    const { storage } = this.a, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event) {
    const { storage } = this.a, { canPlay, audioGain } = this.$state;
    audioGain.set(event.detail);
    this.E("media-audio-gain-change-request", event);
    if (canPlay())
      storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event) {
    const { storage } = this.a, { volume, muted, canPlay } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.E("media-volume-change-request", event);
    this.E(detail.muted ? "media-mute-request" : "media-unmute-request", event);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeked"](event) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this.g.Ka) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.v.get("waiting");
      if (waitingEvent)
        event.triggers.add(waitingEvent);
      const seekingEvent = this.v.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused())
        this.Rg();
      seeking.set(false);
      realCurrentTime.set(event.detail);
      this.E("media-seek-request", event);
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
    if (this.td || this.g.Ka)
      return;
    event.stopImmediatePropagation();
    this.Qb = event;
    this.Me();
  }
  ["end"](event) {
    const { loop, ended } = this.$state;
    if (!loop() && ended())
      return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.dispatch("media-loop-request", { trigger: event });
        });
      }, 10);
      return;
    }
    setTimeout(() => this.mc(event), 0);
  }
  mc(event) {
    const { storage } = this.a, { paused, seeking, ended, duration } = this.$state;
    this.Xg(event);
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
    this.wb();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event
    });
  }
  Rg() {
    this.Me.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    const isFullscreen = event.detail;
    this.$state.fullscreen.set(isFullscreen);
    this.E(
      isFullscreen ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event
    );
  }
  ["fullscreen-error"](event) {
    this.E("media-enter-fullscreen-request", event);
    this.E("media-exit-fullscreen-request", event);
  }
  ["orientation-change"](event) {
    const isLocked = event.detail.lock;
    this.E(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event
    );
  }
  ["picture-in-picture-change"](event) {
    const isPiP = event.detail;
    this.$state.pictureInPicture.set(isPiP);
    this.E(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event);
  }
  ["picture-in-picture-error"](event) {
    this.E("media-enter-pip-request", event);
    this.E("media-exit-pip-request", event);
  }
  ["title-change"](event) {
    if (!event.trigger)
      return;
    event.stopImmediatePropagation();
    this.$state.inferredTitle.set(event.detail);
  }
  ["poster-change"](event) {
    if (!event.trigger)
      return;
    event.stopImmediatePropagation();
    this.$state.inferredPoster.set(event.detail);
  }
}

class MediaStateSync extends MediaPlayerController {
  onSetup() {
    this.Ib();
    if (IS_SERVER)
      return;
    effect(this.ck.bind(this));
    effect(this.dk.bind(this));
    effect(this.ek.bind(this));
    effect(this.Yd.bind(this));
    effect(this.Da.bind(this));
    effect(this.fk.bind(this));
    effect(this.gk.bind(this));
    effect(this.hk.bind(this));
    effect(this.ik.bind(this));
    effect(this.jk.bind(this));
    effect(this.Ne.bind(this));
    effect(this.kk.bind(this));
    effect(this.lk.bind(this));
    effect(this.ud.bind(this));
  }
  Ib() {
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
      if (skip.has(prop))
        continue;
      this.$state[providedProps[prop] ?? prop]?.set(this.$props[prop]());
    }
    this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  // Sync "provided" props with internal state. Provided props are used to differentiate from
  // provider inferred values.
  lk() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  bk() {
    return;
  }
  ck() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  ud() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  dk() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  jk() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  Yd() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  kk() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  Da() {
    const _crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = _crossOrigin === true ? "" : _crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  fk() {
    const { providedDuration } = this.$state;
    providedDuration.set(this.$props.duration());
  }
  Ne() {
    const inline = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline);
    this.dispatch("plays-inline-change", { detail: inline });
  }
  ek() {
    const { clipStartTime, clipEndTime } = this.$props;
    this.$state.clipStartTime.set(clipStartTime());
    this.$state.clipEndTime.set(clipEndTime());
  }
  gk() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  ik() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  hk() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

const _NavigatorMediaSession = class _NavigatorMediaSession extends MediaPlayerController {
  constructor() {
    super();
  }
  onConnect() {
    effect(this.mk.bind(this));
    effect(this.nk.bind(this));
    const handleAction = this.ok.bind(this);
    for (const action of _NavigatorMediaSession.Yg) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this.Ga.bind(this));
  }
  Ga() {
    for (const action of _NavigatorMediaSession.Yg) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  mk() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  nk() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  ok(details) {
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
_NavigatorMediaSession.Yg = ["play", "pause", "seekforward", "seekbackward", "seekto"];
let NavigatorMediaSession = _NavigatorMediaSession;

let $keyboard = signal(false);
if (!IS_SERVER) {
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e) => {
    if (e.metaKey || e.altKey || e.ctrlKey)
      return;
    $keyboard.set(true);
  });
}
class FocusVisibleController extends ViewController {
  constructor() {
    super(...arguments);
    this.Ec = signal(false);
  }
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this.Ec.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this.Pe.bind(this));
        this.listen("pointerleave", this.Qe.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this.Ec.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this.Fc.bind(this));
      this.listen("blur", this.rk.bind(this));
    });
  }
  focused() {
    return this.Ec();
  }
  Fc() {
    this.Ec.set(true);
    updateFocusAttr(this.el, true);
  }
  rk() {
    this.Ec.set(false);
    updateFocusAttr(this.el, false);
  }
  Pe() {
    updateHoverAttr(this.el, true);
  }
  Qe() {
    updateHoverAttr(this.el, false);
  }
}
function updateFocusAttr(el, isFocused) {
  setAttribute(el, "data-focus", isFocused);
  setAttribute(el, "data-hocus", isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, "data-hocus", isHovering);
  setAttribute(el, "data-hover", isHovering);
}

var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
  return result;
};
const _MediaPlayer = class _MediaPlayer extends Component {
  constructor() {
    super();
    this.canPlayQueue = new RequestQueue();
    this.Se = false;
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
    context.textTracks[TextTrackSymbol.Eb] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this.a = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    const request = new MediaRequestContext();
    this.Ca = new MediaStateManager(request, context);
    this.X = new MediaRequestManager(this.Ca, request, context);
    context.delegate = new MediaPlayerDelegate(
      this.Ca.W.bind(this.Ca),
      context
    );
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      new NavigatorMediaSession();
    }
    new MediaLoadController("load", this.startLoading.bind(this));
    new MediaLoadController("posterLoad", this.startLoadingPoster.bind(this));
  }
  get p() {
    return this.a.$provider();
  }
  get wd() {
    return this.$props;
  }
  onSetup() {
    this.sk();
    effect(this.tk.bind(this));
    effect(this.uk.bind(this));
    effect(this.gc.bind(this));
    effect(this.Gc.bind(this));
    effect(this.Rb.bind(this));
    effect(this.Ne.bind(this));
    effect(this.Re.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this.vk.bind(this));
    if (IS_SERVER)
      this.ud();
    else
      effect(this.ud.bind(this));
    if (IS_SERVER)
      this.Zg();
    else
      effect(this.Zg.bind(this));
    listenEvent(el, "find-media-player", this.wk.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE)
      setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this._g(pointerQuery);
    pointerQuery.onchange = this._g.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this.qa.bind(this)));
    resize.observe(el);
    effect(this.qa.bind(this));
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
    this.canPlayQueue.A();
  }
  ud() {
    const el = this.$el, { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
    );
    if (!IS_SERVER && el?.hasAttribute("title")) {
      this.Se = true;
      el?.removeAttribute("title");
    }
  }
  Zg() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this.qa();
  }
  tk() {
    if (this.$state.canPlay() && this.p)
      this.canPlayQueue.Ya();
    else
      this.canPlayQueue.aa();
  }
  sk() {
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
  wk(event) {
    event.detail(this);
  }
  qa() {
    if (IS_SERVER || !this.el)
      return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  _g(queryList) {
    if (IS_SERVER)
      return;
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this.qa();
  }
  get provider() {
    return this.p;
  }
  get controls() {
    return this.X.zc;
  }
  set controls(controls) {
    this.wd.controls.set(controls);
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this.Se) {
      this.Se = false;
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
    this.wd.duration.set(duration);
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this.$g(paused);
  }
  gc() {
    this.$g(this.$props.paused());
  }
  $g(paused) {
    if (paused) {
      this.canPlayQueue.k("paused", () => this.X.Fe());
    } else
      this.canPlayQueue.k("paused", () => this.X.Bc());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    this.wd.muted.set(muted);
  }
  uk() {
    this.xk(this.$props.muted());
  }
  xk(muted) {
    this.canPlayQueue.k("muted", () => {
      if (this.p)
        this.p.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this.ah(time);
  }
  Rb() {
    this.ah(this.$props.currentTime());
  }
  ah(time) {
    this.canPlayQueue.k("currentTime", () => {
      const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
      if (time === peek(currentTime))
        return;
      peek(() => {
        if (!this.p)
          return;
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
    this.wd.volume.set(volume);
  }
  Gc() {
    this.yk(this.$props.volume());
  }
  yk(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue.k("volume", () => {
      if (this.p)
        this.p.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this.bh(rate);
  }
  Re() {
    this.bh(this.$props.playbackRate());
  }
  bh(rate) {
    this.canPlayQueue.k("rate", () => {
      if (this.p)
        this.p.setPlaybackRate?.(rate);
    });
  }
  Ne() {
    this.zk(this.$props.playsInline());
  }
  zk(inline) {
    this.canPlayQueue.k("playsinline", () => {
      if (this.p)
        this.p.setPlaysInline?.(inline);
    });
  }
  vk() {
    let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
    if (storage?.onChange) {
      const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(this.Ak.bind(this));
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
  Ak() {
    const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
    return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
  }
  async play(trigger) {
    return this.X.Bc(trigger);
  }
  async pause(trigger) {
    return this.X.Fe(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this.X.Kg(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this.X.Mg(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this.X.Ie(trigger);
  }
  exitPictureInPicture(trigger) {
    return this.X.He(trigger);
  }
  seekToLiveEdge(trigger) {
    this.X.Jg(trigger);
  }
  startLoading(trigger) {
    this.a.delegate.c("can-load", void 0, trigger);
  }
  startLoadingPoster(trigger) {
    this.a.delegate.c("can-load-poster", void 0, trigger);
  }
  requestAirPlay(trigger) {
    return this.X.Og(trigger);
  }
  requestGoogleCast(trigger) {
    return this.X.Pg(trigger);
  }
  setAudioGain(gain, trigger) {
    return this.X.Ig(gain, trigger);
  }
  destroy() {
    super.destroy();
    this.a.remote.setPlayer(null);
    this.dispatch("destroy");
  }
};
_MediaPlayer.props = mediaPlayerProps;
_MediaPlayer.state = mediaState;
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "canPlayQueue", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "remoteControl", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "provider", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "controls", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "orientation", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "title", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "qualities", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "audioTracks", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "textTracks", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "textRenderers", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "duration", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "paused", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "muted", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "currentTime", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "volume", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "playbackRate", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "play", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "pause", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "enterFullscreen", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "exitFullscreen", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "enterPictureInPicture", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "exitPictureInPicture", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "seekToLiveEdge", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "startLoading", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "startLoadingPoster", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "requestAirPlay", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "requestGoogleCast", 1);
__decorateClass$f([
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
    this.xd = _domSources;
    this.a = _media;
    this.Y = _loader;
    this.Te = false;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this.Ue = computed(() => {
      const remoteLoader = _media.$state.remotePlaybackLoader();
      const loaders = _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this.Ue().find((loader2) => loader2.canPlay(src));
      if (!loader)
        continue;
      const mediaType = loader.mediaType(src);
      this.a.$state.source.set(src);
      this.a.$state.mediaType.set(mediaType);
      this.a.$state.inferredViewType.set(mediaType);
      this.Y.set(loader);
      this.Te = true;
      break;
    }
  }
  get c() {
    return this.a.delegate.c;
  }
  connect() {
    const loader = this.Y();
    if (this.Te) {
      this.ch(this.a.$state.source(), loader);
      this.dh(loader);
      this.Te = false;
    }
    effect(this.Bk.bind(this));
    effect(this.Ck.bind(this));
    effect(this.Dk.bind(this));
    effect(this.Ek.bind(this));
    effect(this.Fk.bind(this));
  }
  Bk() {
    this.c("sources-change", [
      ...normalizeSrc(this.a.$props.src()),
      ...this.xd()
    ]);
  }
  Ck() {
    const { $state } = this.a;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this.eh(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
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
        if (abort.signal.aborted)
          return;
        this.eh(peek($state.source), sources2);
        tick();
      });
      return () => abort.abort();
    }
    tick();
  }
  eh(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this.Ue(), { started, paused, currentTime, quality, savedState } = this.a.$state;
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
      this.ch(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this.Y)) {
      this.dh(newLoader, triggerEvent);
    }
    return newSource;
  }
  ch(src, loader, trigger) {
    this.c("source-change", src, trigger);
    this.c("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  dh(loader, trigger) {
    this.a.$providerSetup.set(false);
    this.c("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this.a));
    this.Y.set(loader);
    this.c("provider-loader-change", loader, trigger);
  }
  Dk() {
    const provider = this.a.$provider();
    if (!provider || peek(this.a.$providerSetup))
      return;
    if (this.a.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this.a.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  Ek() {
    if (!this.a.$providerSetup())
      return;
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
  Fk() {
    const loader = this.Y(), { providedPoster, source, canLoadPoster } = this.a.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster())
      return;
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
    this.yd = _domTracks;
    this.a = _media;
    this.fh = [];
    effect(this.Gk.bind(this));
  }
  Gk() {
    const newTracks = this.yd();
    for (const oldTrack of this.fh) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this.a.textTracks.getById(oldTrack.id);
        if (track)
          this.a.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this.a.textTracks.getById(id)) {
        newTrack.id = id;
        this.a.textTracks.add(newTrack);
      }
    }
    this.fh = newTracks;
  }
}

var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$e(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$e(target, key, result);
  return result;
};
class MediaProvider extends Component {
  constructor() {
    super(...arguments);
    this.xd = signal([]);
    this.yd = signal([]);
    this.Y = null;
    this.Ve = -1;
  }
  onSetup() {
    this.a = useMediaContext();
    this.gh = new SourceSelection(
      this.xd,
      this.a,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this.gh.connect();
    new Tracks(this.yd, this.a);
    const resize = new ResizeObserver(animationFrameThrottle(this.qa.bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(this.Hc.bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    this.qa();
    this.Hc();
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    window.cancelAnimationFrame(this.Ve);
    this.Ve = requestAnimationFrame(() => this.Hk(target));
    onDispose(() => {
      window.cancelAnimationFrame(this.Ve);
    });
  }
  Hk(target) {
    if (!this.scope)
      return;
    const loader = this.$state.loader(), { $provider } = this.a;
    if (this.Y === loader && loader?.target === target && peek($provider))
      return;
    this.hh();
    this.Y = loader;
    if (loader)
      loader.target = target || null;
    if (!loader || !target)
      return;
    loader.load(this.a).then((provider) => {
      if (!this.scope)
        return;
      if (peek(this.$state.loader) !== loader)
        return;
      this.a.delegate.c("provider-change", provider);
    });
  }
  onDestroy() {
    this.Y = null;
    this.hh();
  }
  hh() {
    this.a?.delegate.c("provider-change", null);
  }
  qa() {
    if (!this.el)
      return;
    const { player, $state } = this.a, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player)
      return;
    $state.mediaWidth.set(width);
    $state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  Hc() {
    const sources = [], tracks = [], children = this.el.children;
    for (const el of children) {
      if (el.hasAttribute("data-vds"))
        continue;
      if (el instanceof HTMLSourceElement) {
        const src = {
          id: el.id,
          src: el.src,
          type: el.type
        };
        for (const prop of ["id", "src", "width", "height", "bitrate", "codec"]) {
          const value = el.getAttribute(`data-${prop}`);
          if (isString(value))
            src[prop] = /id|src|codec/.test(prop) ? value : Number(value);
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
    this.xd.set(sources);
    this.yd.set(tracks);
    tick();
  }
}
MediaProvider.props = {
  loaders: []
};
MediaProvider.state = new State({
  loader: null
});
__decorateClass$e([
  method
], MediaProvider.prototype, "load");

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

class MediaAnnouncer extends Component {
  constructor() {
    super(...arguments);
    this.We = false;
    this.Ic = -1;
    this.Ye = -1;
  }
  onSetup() {
    this.a = useMediaContext();
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
    this.We = true;
    effect(this.gc.bind(this));
    effect(this.Gc.bind(this));
    effect(this.Ik.bind(this));
    effect(this.Jk.bind(this));
    effect(this.Kk.bind(this));
    effect(this.Lk.bind(this));
    effect(this.Mk.bind(this));
    tick();
    this.We = false;
  }
  gc() {
    const { paused } = this.a.$state;
    this.Sb(!paused() ? "Play" : "Pause");
  }
  Jk() {
    const { fullscreen } = this.a.$state;
    this.Sb(fullscreen() ? "Enter Fullscreen" : "Exit Fullscreen");
  }
  Kk() {
    const { pictureInPicture } = this.a.$state;
    this.Sb(pictureInPicture() ? "Enter PiP" : "Exit PiP");
  }
  Ik() {
    const { textTrack } = this.a.$state;
    this.Sb(textTrack() ? "Closed-Captions On" : "Closed-Captions Off");
  }
  Gc() {
    const { muted, volume, audioGain } = this.a.$state;
    this.Sb(
      muted() || volume() === 0 ? "Mute" : `${Math.round(volume() * (audioGain() ?? 1) * 100)}% ${this.Xe("Volume")}`
    );
  }
  Lk() {
    const { seeking, currentTime } = this.a.$state, isSeeking = seeking();
    if (this.Ic > 0) {
      window.clearTimeout(this.Ye);
      this.Ye = window.setTimeout(() => {
        if (!this.scope)
          return;
        const newTime = peek(currentTime), seconds = Math.abs(newTime - this.Ic);
        if (seconds >= 1) {
          const isForward = newTime >= this.Ic, spokenTime = formatSpokenTime(seconds);
          this.Sb(
            `${this.Xe(isForward ? "Seek Forward" : "Seek Backward")} ${spokenTime}`
          );
        }
        this.Ic = -1;
        this.Ye = -1;
      }, 300);
    } else if (isSeeking) {
      this.Ic = peek(currentTime);
    }
  }
  Xe(word) {
    const { translations } = this.$props;
    return translations?.()?.[word || ""] ?? word;
  }
  Mk() {
    const { label, busy } = this.$state, $label = this.Xe(label());
    if (this.We)
      return;
    busy.set(true);
    const id = window.setTimeout(() => void busy.set(false), 150);
    this.el && setAttribute(this.el, "aria-label", $label);
    if (isString($label)) {
      this.dispatch("change", { detail: $label });
    }
    return () => window.clearTimeout(id);
  }
  Sb(word) {
    const { label } = this.$state;
    label.set(word);
  }
}
MediaAnnouncer.props = {
  translations: null
};
MediaAnnouncer.state = new State({
  label: null,
  busy: false
});

class Controls extends Component {
  onSetup() {
    this.a = useMediaContext();
    effect(this.Nk.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this.a.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this.ih.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this.ih() });
    });
    effect(this.Ok.bind(this));
    effect(() => {
      const isFullscreen = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen && `env(safe-area-inset-${side})`);
      }
    });
  }
  Ok() {
    if (!this.el)
      return;
    const { nativeControls } = this.a.$state, isHidden = nativeControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  Nk() {
    const { controls } = this.a.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this.a.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  ih() {
    const { controlsVisible } = this.a.$state;
    return controlsVisible();
  }
}
Controls.props = {
  hideDelay: 2e3,
  hideOnMouseLeave: false
};

class ControlsGroup extends Component {
  onAttach(el) {
    if (!el.style.pointerEvents)
      setStyle(el, "pointer-events", "auto");
  }
}

class Popper extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    this.Ad = -1;
    this.Bd = -1;
    this.xb = null;
    effect(this.Pk.bind(this));
  }
  onDestroy() {
    this.xb?.();
    this.xb = null;
  }
  Pk() {
    const trigger = this.j.N();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide = this.hide.bind(this);
    this.j.zd(trigger, show, hide);
  }
  show(trigger) {
    this.Ze();
    window.cancelAnimationFrame(this.Bd);
    this.Bd = -1;
    this.xb?.();
    this.xb = null;
    this.Ad = window.setTimeout(() => {
      this.Ad = -1;
      const content = this.j.q();
      if (content)
        content.style.removeProperty("display");
      peek(() => this.j.F(true, trigger));
    }, this.j.jh?.() ?? 0);
  }
  hide(trigger) {
    this.Ze();
    peek(() => this.j.F(false, trigger));
    this.Bd = requestAnimationFrame(() => {
      this.Ze();
      this.Bd = -1;
      const content = this.j.q();
      if (content) {
        const onHide = () => {
          content.style.display = "none";
          this.xb = null;
        };
        const isAnimated = hasAnimation(content);
        if (isAnimated) {
          this.xb?.();
          const stop = listenEvent(content, "animationend", onHide, { once: true });
          this.xb = stop;
        } else {
          onHide();
        }
      }
    });
  }
  Ze() {
    window.clearTimeout(this.Ad);
    this.Ad = -1;
  }
}

const tooltipContext = createContext();

let id = 0;
class Tooltip extends Component {
  constructor() {
    super();
    this.za = `media-tooltip-${++id}`;
    this.N = signal(null);
    this.q = signal(null);
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      N: this.N,
      q: this.q,
      jh: showDelay,
      zd(trigger, show, hide) {
        listenEvent(trigger, "touchstart", (e) => e.preventDefault(), {
          passive: false
        });
        effect(() => {
          if ($keyboard())
            listenEvent(trigger, "focus", show);
          listenEvent(trigger, "blur", hide);
        });
        listenEvent(trigger, "mouseenter", show);
        listenEvent(trigger, "mouseleave", hide);
      },
      F: this.Qk.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onSetup() {
    provideContext(tooltipContext, {
      N: this.N,
      q: this.q,
      _e: this._e.bind(this),
      $e: this.$e.bind(this),
      af: this.af.bind(this),
      bf: this.bf.bind(this)
    });
  }
  _e(el) {
    this.N.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this.za);
  }
  $e(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this.N.set(null);
  }
  af(el) {
    el.setAttribute("id", this.za);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this.q.set(el);
  }
  bf(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this.q.set(null);
  }
  Qk(isShowing) {
    const trigger = this.N(), content = this.q();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this.za : null);
    }
    for (const el of [this.el, trigger, content]) {
      el && setAttribute(el, "data-visible", isShowing);
    }
  }
}
Tooltip.props = {
  showDelay: 700
};

class TooltipTrigger extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        this.yb();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this.Cd();
          button && tooltip.$e(button);
        });
      })
    );
  }
  yb() {
    const button = this.Cd(), tooltip = useContext(tooltipContext);
    button && tooltip._e(button);
  }
  Cd() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
  }
}

class TooltipContent extends Component {
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.yb(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this.yb(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip.bf(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this.cf.bind(this));
      })
    );
  }
  yb(el) {
    const tooltip = useContext(tooltipContext);
    tooltip.af(el);
  }
  cf() {
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this.Rk(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  Rk() {
    return useContext(tooltipContext).N();
  }
}
TooltipContent.props = {
  placement: "top center",
  offset: 0,
  alignOffset: 0
};

class ToggleButtonController extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    new FocusVisibleController();
    if (_delegate.Tb) {
      new ARIAKeyShortcuts(_delegate.Tb);
    }
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      "data-pressed": this.j.o,
      "aria-pressed": this.Sk.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this.Tk.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this.Uk.bind(this));
    }
  }
  Sk() {
    return ariaBool$1(this.j.o());
  }
  Vk(event) {
    if (isWriteSignal(this.j.o)) {
      this.j.o.set((p) => !p);
    }
  }
  Tk(event) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    (this.j.s ?? this.Vk).call(this, event);
  }
  Uk(event) {
    if (this.$props.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
ToggleButtonController.props = {
  disabled: false
};

var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$d(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$d(target, key, result);
  return result;
};
class ToggleButton extends Component {
  constructor() {
    super();
    this.kh = signal(false);
    new ToggleButtonController({
      o: this.kh
    });
  }
  get pressed() {
    return this.kh();
  }
}
ToggleButton.props = {
  disabled: false,
  defaultPressed: false
};
__decorateClass$d([
  prop
], ToggleButton.prototype, "pressed");

function ariaBool(value) {
  return value ? "true" : "false";
}
function $ariaBool(signal) {
  return () => ariaBool(signal());
}

class AirPlayButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { canAirPlay, isAirPlayConnected } = this.a.$state;
    this.setAttributes({
      "data-active": isAirPlayConnected,
      "data-supported": canAirPlay,
      "data-state": this.Jc.bind(this),
      "aria-hidden": $ariaBool(() => !canAirPlay())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "airplay");
    setARIALabel(el, this.Kc.bind(this));
  }
  s(event) {
    const remote = this.a.remote;
    remote.requestAirPlay(event);
  }
  o() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState() !== "disconnected";
  }
  Jc() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState();
  }
  Kc() {
    const { remotePlaybackState } = this.a.$state;
    return `AirPlay ${remotePlaybackState()}`;
  }
}
AirPlayButton.props = ToggleButtonController.props;

class GoogleCastButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { canGoogleCast, isGoogleCastConnected } = this.a.$state;
    this.setAttributes({
      "data-active": isGoogleCastConnected,
      "data-supported": canGoogleCast,
      "data-state": this.Jc.bind(this),
      "aria-hidden": $ariaBool(() => !canGoogleCast())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "google-cast");
    setARIALabel(el, this.Kc.bind(this));
  }
  s(event) {
    const remote = this.a.remote;
    remote.requestGoogleCast(event);
  }
  o() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState() !== "disconnected";
  }
  Jc() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState();
  }
  Kc() {
    const { remotePlaybackState } = this.a.$state;
    return `Google Cast ${remotePlaybackState()}`;
  }
}
GoogleCastButton.props = ToggleButtonController.props;

class PlayButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Tb: "togglePaused",
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { paused, ended } = this.a.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, "Play");
  }
  s(event) {
    const remote = this.a.remote;
    this.o() ? remote.pause(event) : remote.play(event);
  }
  o() {
    const { paused } = this.a.$state;
    return !paused();
  }
}
PlayButton.props = ToggleButtonController.props;

class CaptionButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Tb: "toggleCaptions",
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "data-active": this.o.bind(this),
      "data-supported": () => !this.Ub(),
      "aria-hidden": $ariaBool(this.Ub.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, "Captions");
  }
  s(event) {
    this.a.remote.toggleCaptions(event);
  }
  o() {
    const { textTrack } = this.a.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  Ub() {
    const { hasCaptions } = this.a.$state;
    return !hasCaptions();
  }
}
CaptionButton.props = ToggleButtonController.props;

class FullscreenButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Tb: "toggleFullscreen",
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { fullscreen } = this.a.$state, isSupported = this.Lc.bind(this);
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
  s(event) {
    const remote = this.a.remote, target = this.$props.target();
    this.o() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  o() {
    const { fullscreen } = this.a.$state;
    return fullscreen();
  }
  Lc() {
    const { canFullscreen } = this.a.$state;
    return canFullscreen();
  }
}
FullscreenButton.props = {
  ...ToggleButtonController.props,
  target: "prefer-media"
};

class MuteButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Tb: "toggleMuted",
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "data-muted": this.o.bind(this),
      "data-state": this.Jc.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, "Mute");
  }
  s(event) {
    const remote = this.a.remote;
    this.o() ? remote.unmute(event) : remote.mute(event);
  }
  o() {
    const { muted, volume } = this.a.$state;
    return muted() || volume() === 0;
  }
  Jc() {
    const { muted, volume } = this.a.$state, $volume = volume();
    if (muted() || $volume === 0)
      return "muted";
    else if ($volume >= 0.5)
      return "high";
    else if ($volume < 0.5)
      return "low";
  }
}
MuteButton.props = ToggleButtonController.props;

class PIPButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Tb: "togglePictureInPicture",
      s: this.s.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { pictureInPicture } = this.a.$state, isSupported = this.Lc.bind(this);
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
  s(event) {
    const remote = this.a.remote;
    this.o() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  o() {
    const { pictureInPicture } = this.a.$state;
    return pictureInPicture();
  }
  Lc() {
    const { canPictureInPicture } = this.a.$state;
    return canPictureInPicture();
  }
}
PIPButton.props = ToggleButtonController.props;

class SeekButton extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.a = useMediaContext();
    const { seeking } = this.a.$state, { seconds } = this.$props, isSupported = this.Lc.bind(this);
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
    setARIALabel(el, this.Kc.bind(this));
  }
  onConnect(el) {
    onPress(el, this.s.bind(this));
  }
  Lc() {
    const { canSeek } = this.a.$state;
    return canSeek();
  }
  Kc() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  s(event) {
    const { seconds, disabled } = this.$props;
    if (disabled())
      return;
    const { currentTime } = this.a.$state, seekTo = currentTime() + seconds();
    this.a.remote.seek(seekTo, event);
  }
}
SeekButton.props = {
  disabled: false,
  seconds: 30
};

class LiveButton extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.a = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this.a.$state, isHidden = () => !live();
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
    onPress(el, this.s.bind(this));
  }
  s(event) {
    const { disabled } = this.$props, { liveEdge } = this.a.$state;
    if (disabled() || liveEdge())
      return;
    this.a.remote.seekToLiveEdge(event);
  }
}
LiveButton.props = {
  disabled: false
};

const sliderState = new State({
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

class IntersectionObserverController extends ViewController {
  constructor(_init) {
    super();
    this.Ib = _init;
  }
  onConnect(el) {
    this.Sa = new IntersectionObserver((entries) => {
      this.Ib.callback?.(entries, this.Sa);
    }, this.Ib);
    this.Sa.observe(el);
    onDispose(this.Wk.bind(this));
  }
  /**
   * Disconnect any active intersection observers.
   */
  Wk() {
    this.Sa?.disconnect();
    this.Sa = void 0;
  }
}

const sliderContext = createContext();
const sliderObserverContext = createContext();

function getClampedValue(min, max, value, step) {
  return clampNumber(min, round(value, getNumberOfDecimalPlaces(step)), max);
}
function getValueFromRate(min, max, rate, step) {
  const boundRate = clampNumber(0, rate, 1), range = max - min, fill = range * boundRate, stepRatio = fill / step, steps = step * Math.round(stepRatio);
  return min + steps;
}

const SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1
};
class SliderEventsController extends ViewController {
  constructor(_delegate, _media) {
    super();
    this.j = _delegate;
    this.a = _media;
    this.p = null;
    this.db = null;
    this.Vb = null;
    this.Kn = false;
    this.dl = functionThrottle(
      (event) => {
        this.eb(this.Dd(event), event);
      },
      20,
      { leading: true }
    );
  }
  onSetup() {
    if (hasProvidedContext(sliderObserverContext)) {
      this.Sa = useContext(sliderObserverContext);
    }
  }
  onConnect() {
    effect(this.Xk.bind(this));
    effect(this.Yk.bind(this));
    if (this.j.lh)
      effect(this.Zk.bind(this));
  }
  Zk() {
    const { pointer } = this.a.$state;
    if (pointer() !== "coarse" || !this.j.lh()) {
      this.p = null;
      return;
    }
    this.p = this.a.player.el?.querySelector(
      "media-provider,[data-media-provider]"
    );
    if (!this.p)
      return;
    listenEvent(this.p, "touchstart", this._k.bind(this), {
      passive: true
    });
    listenEvent(this.p, "touchmove", this.$k.bind(this), {
      passive: false
    });
  }
  _k(event) {
    this.db = event.touches[0];
  }
  $k(event) {
    if (isNull(this.db) || isTouchPinchEvent(event))
      return;
    const touch = event.touches[0], xDiff = touch.clientX - this.db.clientX, yDiff = touch.clientY - this.db.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 5) {
      return;
    }
    if (isDragging)
      return;
    event.preventDefault();
    if (Math.abs(xDiff) > 20) {
      this.db = touch;
      this.Vb = this.$state.value();
      this.df(this.Vb, event);
    }
  }
  Xk() {
    const { hidden } = this.$props;
    this.listen("focus", this.Fc.bind(this));
    this.listen("keydown", this.jc.bind(this));
    this.listen("keyup", this.ic.bind(this));
    if (hidden() || this.j.z())
      return;
    this.listen("pointerenter", this.Pe.bind(this));
    this.listen("pointermove", this.al.bind(this));
    this.listen("pointerleave", this.Qe.bind(this));
    this.listen("pointerdown", this.bl.bind(this));
  }
  Yk() {
    if (this.j.z() || !this.$state.dragging())
      return;
    listenEvent(document, "pointerup", this.cl.bind(this), { capture: true });
    listenEvent(document, "pointermove", this.dl.bind(this));
    listenEvent(document, "touchmove", this.fl.bind(this), {
      passive: false
    });
  }
  Fc() {
    this.eb(this.$state.value());
  }
  ef(newValue, trigger) {
    const { value, min, max, dragging } = this.$state;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event);
    this.j.l?.(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event2);
      this.j.T?.(event2);
    }
  }
  eb(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this.ef(value, trigger);
    }
  }
  Dd(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this.db && isNumber(this.Vb)) {
        const { width } = this.p.getBoundingClientRect(), rate = (event.clientX - this.db.clientX) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this.Vb - diff : this.Vb + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this.j.Ea(
          getValueFromRate(min(), max(), thumbPositionRate, this.j.ra())
        )
      )
    );
  }
  Pe(event) {
    this.$state.pointing.set(true);
  }
  al(event) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    this.eb(this.Dd(event), event);
  }
  Qe(event) {
    this.$state.pointing.set(false);
  }
  bl(event) {
    if (event.button !== 0)
      return;
    const value = this.Dd(event);
    this.df(value, event);
    this.eb(value, event);
  }
  df(value, trigger) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    dragging.set(true);
    this.a.remote.pauseControls(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event);
    this.j.ff?.(event);
    this.Sa?.onDragStart?.();
  }
  mh(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging())
      return;
    dragging.set(false);
    this.a.remote.resumeControls(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event);
    this.j.Ed?.(event);
    this.db = null;
    this.Vb = null;
    this.Sa?.onDragEnd?.();
  }
  jc(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey)
      return;
    const { key } = event, jumpValue = this.Ln(event);
    if (!isNull(jumpValue)) {
      this.eb(jumpValue, event);
      this.ef(jumpValue, event);
      return;
    }
    const newValue = this.Mn(event);
    if (!this.Kn) {
      this.Kn = key === this.gf;
      if (!this.$state.dragging() && this.Kn) {
        this.df(newValue, event);
      }
    }
    this.eb(newValue, event);
    this.gf = key;
  }
  ic(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey || !isNull(this.Ln(event)))
      return;
    const newValue = this.Kn ? this.$state.pointerValue() : this.Mn(event);
    this.ef(newValue, event);
    this.mh(newValue, event);
    this.gf = "";
    this.Kn = false;
  }
  Ln(event) {
    let key = event.key, { min, max } = this.$state;
    if (key === "Home" || key === "PageUp") {
      return min();
    } else if (key === "End" || key === "PageDown") {
      return max();
    } else if (!event.metaKey && /^[0-9]$/.test(key)) {
      return (max() - min()) / 10 * Number(key);
    }
    return null;
  }
  Mn(event) {
    const { key, shiftKey } = event;
    event.preventDefault();
    event.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { min, max, value, pointerValue } = this.$state, step = this.j.ra(), keyStep = this.j.fb();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key]), diff = modifiedStep * direction, currentValue = this.Kn ? pointerValue() : this.j.Z?.() ?? value(), steps = (currentValue + diff) / step;
    return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  cl(event) {
    if (event.button !== 0)
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const value = this.Dd(event);
    this.eb(value, event);
    this.mh(value, event);
  }
  fl(event) {
    event.preventDefault();
  }
}

const sliderValueFormatContext = createContext(() => ({}));

class SliderController extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    this.Mc = signal(true);
    this.Nc = signal(true);
    this.kl = animationFrameThrottle(
      (fillPercent, pointerPercent) => {
        this.el?.style.setProperty("--slider-fill", fillPercent + "%");
        this.el?.style.setProperty("--slider-pointer", pointerPercent + "%");
      }
    );
  }
  onSetup() {
    this.a = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      cb: this.$props.orientation,
      Fd: this.j.z,
      oh: signal(null)
    });
    effect(this.O.bind(this));
    effect(this.gl.bind(this));
    effect(this.Oc.bind(this));
    this.il();
    new SliderEventsController(this.j, this.a).attach(this);
    new IntersectionObserverController({
      callback: this.hf.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    if (IS_SERVER)
      this.ph();
    else
      effect(this.ph.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.Mc.set));
    effect(this.Fa.bind(this));
  }
  hf(entries) {
    this.Nc.set(entries[0].isIntersecting);
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  Fa() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.Mc() || !this.Nc.bind(this));
  }
  O() {
    const { dragging, value, min, max } = this.$state;
    if (peek(dragging))
      return;
    value.set(getClampedValue(min(), max(), value(), this.j.ra()));
  }
  gl() {
    this.$state.step.set(this.j.ra());
  }
  Oc() {
    if (!this.j.z())
      return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  jl() {
    return ariaBool$1(this.j.z());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  il() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this.jl.bind(this),
      "aria-valuemin": this.j.Um ?? this.$state.min,
      "aria-valuemax": this.j.jf ?? this.$state.max,
      "aria-valuenow": this.j.P,
      "aria-valuetext": this.j.Q,
      "aria-orientation": orientation
    });
  }
  ph() {
    const { fillPercent, pointerPercent } = this.$state;
    this.kl(round(fillPercent(), 3), round(pointerPercent(), 3));
  }
}
SliderController.props = {
  hidden: false,
  disabled: false,
  step: 1,
  keyStep: 1,
  orientation: "horizontal",
  shiftKeyMultiplier: 5
};

class Slider extends Component {
  constructor() {
    super();
    new SliderController({
      ra: this.$props.step,
      fb: this.$props.keyStep,
      Ea: Math.round,
      z: this.$props.disabled,
      P: this.P.bind(this),
      Q: this.Q.bind(this)
    });
  }
  onSetup() {
    effect(this.O.bind(this));
    effect(this.Pc.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  P() {
    const { value } = this.$state;
    return Math.round(value());
  }
  Q() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  O() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  Pc() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
}
Slider.props = {
  ...SliderController.props,
  min: 0,
  max: 100,
  value: 0
};
Slider.state = sliderState;

const cache = /* @__PURE__ */ new Map(), pending = /* @__PURE__ */ new Map();
class ThumbnailsLoader {
  constructor($src, $crossOrigin, _media) {
    this.$src = $src;
    this.$crossOrigin = $crossOrigin;
    this.a = _media;
    this.$images = signal([]);
    effect(this.ll.bind(this));
  }
  static create($src, $crossOrigin) {
    const media = useMediaContext();
    return new ThumbnailsLoader($src, $crossOrigin, media);
  }
  ll() {
    const { canLoad } = this.a.$state;
    if (!canLoad())
      return;
    const src = this.$src(), abort = new AbortController();
    if (!src)
      return;
    if (isString(src) && cache.has(src)) {
      const cues = cache.get(src);
      cache.delete(src);
      cache.set(src, cues);
      if (cache.size > 30) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      this.$images.set(cache.get(src));
    } else if (isString(src)) {
      const crossOrigin = this.$crossOrigin(), currentKey = src + "::" + crossOrigin;
      if (!pending.has(currentKey)) {
        const promise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(src, {
              signal: abort.signal,
              credentials: getRequestCredentials(crossOrigin)
            }), isJSON = response.headers.get("content-type") === "application/json";
            if (isJSON) {
              const json = await response.json();
              if (isArray(json)) {
                if (json[0] && "text" in json[0]) {
                  resolve(this.qh(json));
                } else {
                  for (let i = 0; i < json.length; i++) {
                    const image = json[i];
                    assert(isObject(image), false);
                    assert(
                      "url" in image && isString(image.url),
                      false
                    );
                    assert(
                      "startTime" in image && isNumber(image.startTime),
                      false
                    );
                  }
                  resolve(json);
                }
              } else {
                resolve(this.rh(json));
              }
              return;
            }
            import('media-captions').then(async ({ parseResponse }) => {
              try {
                const { cues } = await parseResponse(response);
                resolve(this.qh(cues));
              } catch (e) {
                reject(e);
              }
            });
          } catch (e) {
            reject(e);
          }
        }).then((images) => {
          if (!abort.signal.aborted)
            cache.set(currentKey, images);
          return images;
        }).catch((error) => {
          if (abort.signal.aborted)
            return;
          this.R(src, error);
        }).finally(() => {
          if (isString(currentKey))
            pending.delete(currentKey);
        });
        pending.set(currentKey, promise);
      }
      pending.get(currentKey)?.then((images) => {
        if (abort.signal.aborted)
          return;
        this.$images.set(images || []);
      });
    } else if (isArray(src)) {
      try {
        this.$images.set(this.ml(src));
      } catch (error) {
        this.R(src, error);
      }
    } else {
      try {
        this.$images.set(this.rh(src));
      } catch (error) {
        this.R(src, error);
      }
    }
    return () => {
      abort.abort();
      this.$images.set([]);
    };
  }
  ml(images) {
    const baseURL = this.sh();
    return images.map((img, i) => {
      assert(
        img.url && isString(img.url));
      assert(
        "startTime" in img && isNumber(img.startTime));
      return {
        ...img,
        url: isString(img.url) ? this.th(img.url, baseURL) : img.url
      };
    });
  }
  rh(board) {
    assert(isString(board.url));
    assert(isArray(board.tiles) && board.tiles?.length);
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
  qh(cues) {
    for (let i = 0; i < cues.length; i++) {
      const cue = cues[i];
      assert(
        "startTime" in cue && isNumber(cue.startTime));
      assert(
        "text" in cue && isString(cue.text));
    }
    const images = [], baseURL = this.sh();
    for (const cue of cues) {
      const [url, hash] = cue.text.split("#"), data = this.nl(hash);
      images.push({
        url: this.th(url, baseURL),
        startTime: cue.startTime,
        endTime: cue.endTime,
        width: data?.w,
        height: data?.h,
        coords: data && isNumber(data.x) && isNumber(data.y) ? { x: data.x, y: data.y } : void 0
      });
    }
    return images;
  }
  sh() {
    let baseURL = peek(this.$src);
    if (!isString(baseURL) || !/^https?:/.test(baseURL)) {
      return location.href;
    }
    return baseURL;
  }
  th(src, baseURL) {
    return /^https?:/.test(src) ? new URL(src) : new URL(src, baseURL);
  }
  nl(hash) {
    if (!hash)
      return {};
    const [hashProps, values] = hash.split("="), hashValues = values?.split(","), data = {};
    if (!hashProps || !hashValues) {
      return null;
    }
    for (let i = 0; i < hashProps.length; i++) {
      const value = +hashValues[i];
      if (!isNaN(value))
        data[hashProps[i]] = value;
    }
    return data;
  }
  R(src, error) {
    return;
  }
}

class Thumbnail extends Component {
  constructor() {
    super(...arguments);
    this.kf = [];
  }
  onSetup() {
    this.a = useMediaContext();
    this.Y = ThumbnailsLoader.create(this.$props.src, this.$state.crossOrigin);
    this.Da();
    this.setAttributes({
      "data-loading": this.Qc.bind(this),
      "data-error": this.gb.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this.lf.bind(this));
    effect(this.Fa.bind(this));
    effect(this.Da.bind(this));
    effect(this.Na.bind(this));
    effect(this.ol.bind(this));
    effect(this.uh.bind(this));
  }
  lf() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this.ub.bind(this));
    listenEvent(img, "error", this.R.bind(this));
  }
  Da() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  Na() {
    const { src, loading, error } = this.$state;
    if (src()) {
      loading.set(true);
      error.set(null);
    }
    return () => {
      this.pl();
      loading.set(false);
      error.set(null);
    };
  }
  ub() {
    const { loading, error } = this.$state;
    this.uh();
    loading.set(false);
    error.set(null);
  }
  R(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
  Qc() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  gb() {
    const { error } = this.$state;
    return !isNull(error());
  }
  Fa() {
    const { hidden } = this.$state, { duration } = this.a.$state, images = this.Y.$images();
    hidden.set(this.gb() || !Number.isFinite(duration()) || images.length === 0);
  }
  vh() {
    return this.$props.time();
  }
  ol() {
    let images = this.Y.$images();
    if (!images.length)
      return;
    let time = this.vh(), { src, activeThumbnail } = this.$state, activeIndex = -1, activeImage = null;
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
  uh() {
    if (!this.scope || this.$state.hidden())
      return;
    const rootEl = this.el, imgEl = this.$state.img(), thumbnail = this.$state.activeThumbnail();
    if (!imgEl || !thumbnail || !rootEl)
      return;
    let width = thumbnail.width ?? imgEl.naturalWidth, height = thumbnail?.height ?? imgEl.naturalHeight, {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width: elWidth,
      height: elHeight
    } = getComputedStyle(this.el);
    if (minWidth === "100%")
      minWidth = parseFloat(elWidth) + "";
    if (minHeight === "100%")
      minHeight = parseFloat(elHeight) + "";
    let minRatio = Math.max(parseInt(minWidth) / width, parseInt(minHeight) / height), maxRatio = Math.min(
      Math.max(parseInt(minWidth), parseInt(maxWidth)) / width,
      Math.max(parseInt(minHeight), parseInt(maxHeight)) / height
    ), scale = !isNaN(maxRatio) && maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this.Wb(rootEl, "--thumbnail-width", `${width * scale}px`);
    this.Wb(rootEl, "--thumbnail-height", `${height * scale}px`);
    this.Wb(imgEl, "width", `${imgEl.naturalWidth * scale}px`);
    this.Wb(imgEl, "height", `${imgEl.naturalHeight * scale}px`);
    this.Wb(
      imgEl,
      "transform",
      thumbnail.coords ? `translate(-${thumbnail.coords.x * scale}px, -${thumbnail.coords.y * scale}px)` : ""
    );
    this.Wb(imgEl, "max-width", "none");
  }
  Wb(el, name, value) {
    el.style.setProperty(name, value);
    this.kf.push(() => el.style.removeProperty(name));
  }
  pl() {
    for (const reset of this.kf)
      reset();
    this.kf = [];
  }
}
Thumbnail.props = {
  src: null,
  time: 0,
  crossOrigin: null
};
Thumbnail.state = new State({
  src: "",
  img: null,
  thumbnails: [],
  activeThumbnail: null,
  crossOrigin: null,
  loading: false,
  error: null,
  hidden: false
});

class SliderThumbnail extends Thumbnail {
  onAttach(el) {
    this.ja = useState(Slider.state);
  }
  vh() {
    const { duration, clipStartTime } = this.a.$state;
    return clipStartTime() + this.ja.pointerRate() * duration();
  }
}

var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$c(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$c(target, key, result);
  return result;
};
class SliderVideo extends Component {
  get video() {
    return this.$state.video();
  }
  onSetup() {
    this.a = useMediaContext();
    this.ja = useState(Slider.state);
    this.Da();
    this.setAttributes({
      "data-loading": this.Qc.bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": this.gb.bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(this.ql.bind(this));
    effect(this.Nb.bind(this));
    effect(this.Da.bind(this));
    effect(this.Fa.bind(this));
    effect(this.rl.bind(this));
    effect(this.sl.bind(this));
  }
  ql() {
    const video = this.$state.video();
    if (!video)
      return;
    if (video.readyState >= 2)
      this.fd();
    listenEvent(video, "canplay", this.fd.bind(this));
    listenEvent(video, "error", this.R.bind(this));
  }
  Nb() {
    const { src } = this.$state, { canLoad } = this.a.$state;
    src.set(canLoad() ? this.$props.src() : null);
  }
  Da() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  Qc() {
    const { canPlay, hidden } = this.$state;
    return !canPlay() && !hidden();
  }
  gb() {
    const { error } = this.$state;
    return !isNull(error);
  }
  Fa() {
    const { src, hidden } = this.$state, { canLoad, duration } = this.a.$state;
    hidden.set(canLoad() && (!src() || this.gb() || !Number.isFinite(duration())));
  }
  rl() {
    const { src, canPlay, error } = this.$state;
    src();
    canPlay.set(false);
    error.set(null);
  }
  fd(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(true);
    error.set(null);
    this.dispatch("can-play", { trigger: event });
  }
  R(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(false);
    error.set(event);
    this.dispatch("error", { trigger: event });
  }
  sl() {
    const { video, canPlay } = this.$state, { duration } = this.a.$state, { pointerRate } = this.ja, media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
    if (canUpdate) {
      media.currentTime = pointerRate() * duration();
    }
  }
}
SliderVideo.props = {
  src: null,
  crossOrigin: null
};
SliderVideo.state = new State({
  video: null,
  src: null,
  crossOrigin: null,
  canPlay: false,
  error: null,
  hidden: false
});
__decorateClass$c([
  prop
], SliderVideo.prototype, "video");

var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$b(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$b(target, key, result);
  return result;
};
class SliderValue extends Component {
  onSetup() {
    this.ja = useState(Slider.state);
    this.Rc = useContext(sliderValueFormatContext);
    this.tl = computed(this.getValueText.bind(this));
  }
  getValueText() {
    const { type, format, decimalPlaces, padHours, padMinutes, showHours, showMs } = this.$props, { value: sliderValue, pointerValue, min, max } = this.ja, _format = format?.() ?? this.Rc.default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (_format === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (this.Rc.percent ?? round)(percent, decimalPlaces()) + "%";
    } else if (_format === "time") {
      return (this.Rc.time ?? formatTime)(value, {
        padHrs: padHours(),
        padMins: padMinutes(),
        showHrs: showHours(),
        showMs: showMs()
      });
    } else {
      return (this.Rc.value?.(value) ?? value.toFixed(2)) + "";
    }
  }
}
SliderValue.props = {
  type: "pointer",
  format: null,
  showHours: false,
  showMs: false,
  padHours: null,
  padMinutes: null,
  decimalPlaces: 2
};
__decorateClass$b([
  method
], SliderValue.prototype, "getValueText");

class SliderPreview extends Component {
  constructor() {
    super(...arguments);
    this.wh = animationFrameThrottle(() => {
      const { Fd: _disabled, cb: _orientation } = this.ja;
      if (_disabled())
        return;
      const el = this.el, { offset, noClamp } = this.$props;
      if (!el)
        return;
      updateSliderPreviewPlacement(el, {
        clamp: !noClamp(),
        offset: offset(),
        orientation: _orientation()
      });
    });
  }
  onSetup() {
    this.ja = useContext(sliderContext);
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
    const { oh: _preview } = this.ja;
    _preview.set(el);
    onDispose(() => _preview.set(null));
    effect(this.wh.bind(this));
    const resize = new ResizeObserver(this.wh.bind(this));
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
}
SliderPreview.props = {
  offset: 0,
  noClamp: false
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

class VolumeSlider extends Component {
  constructor() {
    super(...arguments);
    this.xh = functionThrottle(this.Oa.bind(this), 25);
  }
  onSetup() {
    this.a = useMediaContext();
    const { audioGain } = this.a.$state;
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
      ra: this.$props.step,
      fb: this.$props.keyStep,
      Ea: Math.round,
      z: this.z.bind(this),
      jf: this.jf.bind(this),
      P: this.P.bind(this),
      Q: this.Q.bind(this),
      T: this.T.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.Gc.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  P() {
    const { value } = this.$state, { audioGain } = this.a.$state;
    return Math.round(value() * (audioGain() ?? 1));
  }
  Q() {
    const { value, max } = this.$state, { audioGain } = this.a.$state;
    return round(value() / max() * (audioGain() ?? 1) * 100, 2) + "%";
  }
  jf() {
    const { audioGain } = this.a.$state;
    return this.$state.max() * (audioGain() ?? 1);
  }
  z() {
    const { disabled } = this.$props, { canSetVolume } = this.a.$state;
    return disabled() || !canSetVolume();
  }
  Gc() {
    const { muted, volume } = this.a.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  Oa(event) {
    if (!event.trigger)
      return;
    const mediaVolume = round(event.detail / 100, 3);
    this.a.remote.changeVolume(mediaVolume, event);
  }
  l(event) {
    this.xh(event);
  }
  T(event) {
    this.xh(event);
  }
}
VolumeSlider.props = {
  ...SliderController.props,
  keyStep: 5,
  shiftKeyMultiplier: 2
};
VolumeSlider.state = sliderState;

class AudioGainSlider extends Component {
  onSetup() {
    this.a = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent",
      percent: (_, decimalPlaces) => {
        return round(this.$state.value(), decimalPlaces) + "%";
      }
    });
    new SliderController({
      ra: this.$props.step,
      fb: this.$props.keyStep,
      Ea: Math.round,
      z: this.z.bind(this),
      P: this.P.bind(this),
      Q: this.Q.bind(this),
      T: this.T.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.Pc.bind(this));
    effect(this.ul.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-audio-gain-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Audio Boost");
    const { canSetAudioGain } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetAudioGain,
      "aria-hidden": $ariaBool(() => !canSetAudioGain())
    });
  }
  P() {
    const { value } = this.$state;
    return Math.round(value());
  }
  Q() {
    const { value } = this.$state;
    return value() + "%";
  }
  Pc() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  ul() {
    const { audioGain } = this.a.$state, value = ((audioGain() ?? 1) - 1) * 100;
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  z() {
    const { disabled } = this.$props, { canSetAudioGain } = this.a.$state;
    return disabled() || !canSetAudioGain();
  }
  yh(event) {
    if (!event.trigger)
      return;
    const gain = round(1 + event.detail / 100, 2);
    this.a.remote.changeAudioGain(gain, event);
  }
  l(event) {
    this.yh(event);
  }
  T(event) {
    this.yh(event);
  }
}
AudioGainSlider.props = {
  ...SliderController.props,
  step: 25,
  keyStep: 25,
  shiftKeyMultiplier: 2,
  min: 0,
  max: 300
};
AudioGainSlider.state = sliderState;

class SpeedSlider extends Component {
  constructor() {
    super(...arguments);
    this.zh = functionThrottle(this.vl.bind(this), 25);
  }
  onSetup() {
    this.a = useMediaContext();
    new SliderController({
      ra: this.$props.step,
      fb: this.$props.keyStep,
      Ea: this.Ea,
      z: this.z.bind(this),
      P: this.P.bind(this),
      Q: this.Q.bind(this),
      T: this.T.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.Pc.bind(this));
    effect(this.Re.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-speed-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Speed");
    const { canSetPlaybackRate } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetPlaybackRate,
      "aria-hidden": $ariaBool(() => !canSetPlaybackRate())
    });
  }
  P() {
    const { value } = this.$state;
    return value();
  }
  Q() {
    const { value } = this.$state;
    return value() + "x";
  }
  Pc() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  Re() {
    const { playbackRate } = this.a.$state;
    const newValue = playbackRate();
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  Ea(value) {
    return round(value, 2);
  }
  z() {
    const { disabled } = this.$props, { canSetPlaybackRate } = this.a.$state;
    return disabled() || !canSetPlaybackRate();
  }
  vl(event) {
    if (!event.trigger)
      return;
    const rate = event.detail;
    this.a.remote.changePlaybackRate(rate, event);
  }
  l(event) {
    this.zh(event);
  }
  T(event) {
    this.zh(event);
  }
}
SpeedSlider.props = {
  ...SliderController.props,
  step: 0.25,
  keyStep: 0.25,
  shiftKeyMultiplier: 2,
  min: 0,
  max: 2
};
SpeedSlider.state = sliderState;

class QualitySlider extends Component {
  constructor() {
    super(...arguments);
    this.Sc = computed(() => {
      const { qualities } = this.a.$state;
      return sortVideoQualities(qualities());
    });
    this.Ah = functionThrottle(this._a.bind(this), 25);
  }
  onSetup() {
    this.a = useMediaContext();
    new SliderController({
      ra: this.$props.step,
      fb: this.$props.keyStep,
      Ea: Math.round,
      z: this.z.bind(this),
      P: this.P.bind(this),
      Q: this.Q.bind(this),
      T: this.T.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.wl.bind(this));
    effect(this.xl.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-quality-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Video Quality");
    const { qualities, canSetQuality } = this.a.$state, $supported = computed(() => canSetQuality() && qualities().length > 0);
    this.setAttributes({
      "data-supported": $supported,
      "aria-hidden": $ariaBool(() => !$supported())
    });
  }
  P() {
    const { value } = this.$state;
    return value();
  }
  Q() {
    const { quality } = this.a.$state;
    if (!quality())
      return "";
    const { height, bitrate } = quality(), bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null;
    return height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : "Auto";
  }
  wl() {
    const $qualities = this.Sc();
    this.$state.max.set(Math.max(0, $qualities.length - 1));
  }
  xl() {
    let { quality } = this.a.$state, $qualities = this.Sc(), value = Math.max(0, $qualities.indexOf(quality()));
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  z() {
    const { disabled } = this.$props, { canSetQuality, qualities } = this.a.$state;
    return disabled() || qualities().length <= 1 || !canSetQuality();
  }
  _a(event) {
    if (!event.trigger)
      return;
    const { qualities } = this.a, quality = peek(this.Sc)[event.detail];
    this.a.remote.changeQuality(qualities.indexOf(quality), event);
  }
  l(event) {
    this.Ah(event);
  }
  T(event) {
    this.Ah(event);
  }
}
QualitySlider.props = {
  ...SliderController.props,
  step: 1,
  keyStep: 1,
  shiftKeyMultiplier: 1
};
QualitySlider.state = sliderState;

class TimeSlider extends Component {
  constructor() {
    super();
    this.Bh = signal(null);
    this.nf = false;
    const { noSwipeGesture } = this.$props;
    new SliderController({
      lh: () => !noSwipeGesture(),
      Z: this.Z.bind(this),
      ra: this.ra.bind(this),
      fb: this.fb.bind(this),
      Ea: this.Ea,
      z: this.z.bind(this),
      P: this.P.bind(this),
      Q: this.Q.bind(this),
      ff: this.ff.bind(this),
      T: this.T.bind(this),
      Ed: this.Ed.bind(this),
      l: this.l.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this.yl.bind(this),
      time: this.zl.bind(this)
    });
    this.setAttributes({
      "data-chapters": this.Al.bind(this)
    });
    this.setStyles({
      "--slider-progress": this.Bl.bind(this)
    });
    effect(this.Rb.bind(this));
    effect(this.Cl.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this.Dl.bind(this));
    watchActiveTextTrack(this.a.textTracks, "chapters", this.Bh.set);
  }
  Bl() {
    const { bufferedEnd, duration } = this.a.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  Al() {
    const { duration } = this.a.$state;
    return this.Bh()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  Cl() {
    this.mf = functionThrottle(
      this.Ka.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  Rb() {
    if (this.$state.hidden())
      return;
    const { value, dragging } = this.$state, newValue = this.Z();
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  Dl() {
    const player = this.a.player.el, { oh: _preview } = useContext(sliderContext);
    player && _preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  Ka(time, event) {
    this.a.remote.seeking(time, event);
  }
  El(time, percent, event) {
    this.mf.cancel();
    const { live } = this.a.$state;
    if (live() && percent >= 99) {
      this.a.remote.seekToLiveEdge(event);
      return;
    }
    this.a.remote.seek(time, event);
  }
  ff(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this.a.$state;
      this.nf = !paused();
      this.a.remote.pause(event);
    }
  }
  T(event) {
    this.mf(this.Xb(event.detail), event);
  }
  Ed(event) {
    const { seeking } = this.a.$state;
    if (!peek(seeking))
      this.Ka(this.Xb(event.detail), event);
    const percent = event.detail;
    this.El(this.Xb(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this.nf) {
      this.a.remote.play(event);
      this.nf = false;
    }
  }
  l(event) {
    const { dragging } = this.$state;
    if (dragging() || !event.trigger)
      return;
    this.Ed(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  Z() {
    const { currentTime } = this.a.$state;
    return this.Fl(currentTime());
  }
  ra() {
    const value = this.$props.step() / this.a.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  fb() {
    const value = this.$props.keyStep() / this.a.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  Ea(value) {
    return round(value, 3);
  }
  z() {
    const { disabled } = this.$props, { canSeek } = this.a.$state;
    return disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  P() {
    const { value } = this.$state;
    return Math.round(value());
  }
  Q() {
    const time = this.Xb(this.$state.value()), { duration } = this.a.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  Xb(percent) {
    const { duration } = this.a.$state;
    return round(percent / 100 * duration(), 5);
  }
  Fl(time) {
    const { liveEdge, duration } = this.a.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  yl(percent) {
    const time = this.Xb(percent), { live, duration } = this.a.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  zl(percent, options) {
    const time = this.Xb(percent), { live, duration } = this.a.$state, value = live() ? time - duration() : time;
    return Number.isFinite(time) ? `${value < 0 ? "-" : ""}${formatTime(Math.abs(value), options)}` : "LIVE";
  }
}
TimeSlider.props = {
  ...SliderController.props,
  step: 0.1,
  keyStep: 5,
  shiftKeyMultiplier: 2,
  pauseWhileDragging: false,
  noSwipeGesture: false,
  seekingRequestThrottle: 100
};
TimeSlider.state = sliderState;

var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$a(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$a(target, key, result);
  return result;
};
class SliderChapters extends Component {
  constructor() {
    super(...arguments);
    this.zb = null;
    this.ka = [];
    this.Hd = signal(null);
    this.la = signal([]);
    this.Yb = signal(-1);
    this.Id = signal(-1);
    this.Tc = 0;
    this.Nl = animationFrameThrottle((bufferedPercent) => {
      let percent, cues = this.la(), { clipStartTime } = this.a.$state, startTime = clipStartTime(), endTime = this.rf(cues);
      for (let i = this.Tc; i < this.ka.length; i++) {
        percent = this.qf(cues[i], bufferedPercent, startTime, endTime);
        this.ka[i]?.style.setProperty("--chapter-progress", percent + "%");
        if (percent < 100) {
          this.Tc = i;
          break;
        }
      }
    });
    this.Ol = computed(this.Pl.bind(this));
    this.Jd = functionDebounce(
      () => {
        const track = peek(this.Hd);
        if (!this.scope || !track || !track.cues.length)
          return;
        this.la.set(this.Ql(track.cues));
        this.Yb.set(0);
        this.Tc = 0;
      },
      150,
      true
    );
  }
  get cues() {
    return this.la();
  }
  get activeCue() {
    return this.la()[this.Yb()] || null;
  }
  get activePointerCue() {
    return this.la()[this.Id()] || null;
  }
  onSetup() {
    this.a = useMediaContext();
    this.Gd = useState(TimeSlider.state);
  }
  onAttach(el) {
    watchActiveTextTrack(this.a.textTracks, "chapters", this.Ch.bind(this));
    effect(this.Gl.bind(this));
  }
  onConnect() {
    onDispose(() => this.A.bind(this));
  }
  onDestroy() {
    this.Ch(null);
  }
  setRefs(refs) {
    this.ka = refs;
    this.of?.dispose();
    if (this.ka.length === 1) {
      const el = this.ka[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (this.ka.length > 0) {
      scoped(() => this.Hl(), this.of = createScope());
    }
  }
  Ch(track) {
    if (peek(this.Hd) === track)
      return;
    this.A();
    this.Hd.set(track);
  }
  A() {
    this.ka = [];
    this.la.set([]);
    this.Yb.set(-1);
    this.Id.set(-1);
    this.Tc = 0;
    this.of?.dispose();
  }
  Hl() {
    if (!this.ka.length)
      return;
    effect(this.Il.bind(this));
  }
  Il() {
    const { hidden } = this.Gd;
    if (hidden())
      return;
    effect(this.Jl.bind(this));
    effect(this.Kl.bind(this));
    effect(this.Ll.bind(this));
    effect(this.Ml.bind(this));
  }
  Jl() {
    const cues = this.la();
    if (!cues.length)
      return;
    let cue, { clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || cues[cues.length - 1].endTime, duration = endTime - startTime, remainingWidth = 100;
    for (let i = 0; i < cues.length; i++) {
      cue = cues[i];
      if (this.ka[i]) {
        const width = i === cues.length - 1 ? remainingWidth : round((cue.endTime - Math.max(startTime, cue.startTime)) / duration * 100, 3);
        this.ka[i].style.width = width + "%";
        remainingWidth -= width;
      }
    }
  }
  Kl() {
    let { liveEdge, clipStartTime, duration } = this.a.$state, { fillPercent, value } = this.Gd, cues = this.la(), isLiveEdge = liveEdge(), prevActiveIndex = peek(this.Yb), currentChapter = cues[prevActiveIndex];
    let currentActiveIndex = isLiveEdge ? this.la.length - 1 : this.Dh(
      currentChapter ? currentChapter.startTime / duration() * 100 <= peek(value) ? prevActiveIndex : 0 : 0,
      fillPercent()
    );
    if (isLiveEdge || !currentChapter) {
      this.pf(0, cues.length, 100);
    } else if (currentActiveIndex > prevActiveIndex) {
      this.pf(prevActiveIndex, currentActiveIndex, 100);
    } else if (currentActiveIndex < prevActiveIndex) {
      this.pf(currentActiveIndex + 1, prevActiveIndex + 1, 0);
    }
    const percent = isLiveEdge ? 100 : this.qf(
      cues[currentActiveIndex],
      fillPercent(),
      clipStartTime(),
      this.rf(cues)
    );
    this.Eh(this.ka[currentActiveIndex], percent);
    this.Yb.set(currentActiveIndex);
  }
  Ll() {
    let { pointing, pointerPercent } = this.Gd;
    if (!pointing()) {
      this.Id.set(-1);
      return;
    }
    const activeIndex = this.Dh(0, pointerPercent());
    this.Id.set(activeIndex);
  }
  pf(start, end, percent) {
    for (let i = start; i < end; i++)
      this.Eh(this.ka[i], percent);
  }
  Eh(ref, percent) {
    if (!ref)
      return;
    ref.style.setProperty("--chapter-fill", percent + "%");
    setAttribute(ref, "data-active", percent > 0 && percent < 100);
    setAttribute(ref, "data-ended", percent === 100);
  }
  Dh(startIndex, percent) {
    let chapterPercent = 0, cues = this.la();
    if (percent === 0)
      return 0;
    else if (percent === 100)
      return cues.length - 1;
    let { clipStartTime } = this.a.$state, startTime = clipStartTime(), endTime = this.rf(cues);
    for (let i = startIndex; i < cues.length; i++) {
      chapterPercent = this.qf(cues[i], percent, startTime, endTime);
      if (chapterPercent >= 0 && chapterPercent < 100)
        return i;
    }
    return 0;
  }
  Ml() {
    this.Nl(this.Ol());
  }
  Pl() {
    const { bufferedEnd, duration } = this.a.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  rf(cues) {
    const { clipEndTime } = this.a.$state, endTime = clipEndTime();
    return endTime > 0 ? endTime : cues[cues.length - 1]?.endTime || 0;
  }
  qf(cue, percent, startTime, endTime) {
    const cues = this.la();
    if (cues.length === 0)
      return 0;
    const duration = endTime - startTime, cueStartTime = Math.max(0, cue.startTime - startTime), cueEndTime = Math.min(endTime, cue.endTime) - startTime;
    const startRatio = cueStartTime / duration, startPercent = startRatio * 100, endPercent = Math.min(1, startRatio + (cueEndTime - cueStartTime) / duration) * 100;
    return Math.max(
      0,
      round(
        percent >= endPercent ? 100 : (percent - startPercent) / (endPercent - startPercent) * 100,
        3
      )
    );
  }
  Ql(cues) {
    let chapters = [], { clipStartTime, clipEndTime, duration } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
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
  }
  Gl() {
    const { source } = this.a.$state;
    source();
    this.qc();
  }
  qc() {
    if (!this.scope)
      return;
    const { disabled } = this.$props;
    if (disabled()) {
      this.la.set([]);
      this.Yb.set(0);
      this.Tc = 0;
      return;
    }
    const track = this.Hd();
    if (track) {
      const onCuesChange = this.Jd.bind(this);
      onCuesChange();
      onDispose(listenEvent(track, "add-cue", onCuesChange));
      onDispose(listenEvent(track, "remove-cue", onCuesChange));
      effect(this.Rl.bind(this));
    }
    this.zb = this.Sl();
    if (this.zb)
      effect(this.Tl.bind(this));
    return () => {
      if (this.zb) {
        this.zb.textContent = "";
        this.zb = null;
      }
    };
  }
  Rl() {
    this.a.$state.duration();
    this.Jd();
  }
  Tl() {
    const cue = this.activePointerCue || this.activeCue;
    if (this.zb)
      this.zb.textContent = cue?.text || "";
  }
  Ul() {
    let node = this.el;
    while (node && node.getAttribute("role") !== "slider") {
      node = node.parentElement;
    }
    return node;
  }
  Sl() {
    const slider = this.Ul();
    return slider ? slider.querySelector('[data-part="chapter-title"]') : null;
  }
}
SliderChapters.props = {
  disabled: false
};
__decorateClass$a([
  prop
], SliderChapters.prototype, "cues");
__decorateClass$a([
  prop
], SliderChapters.prototype, "activeCue");
__decorateClass$a([
  prop
], SliderChapters.prototype, "activePointerCue");
__decorateClass$a([
  method
], SliderChapters.prototype, "setRefs");

const menuContext = createContext();

const t = (t2) => "object" == typeof t2 && null != t2 && 1 === t2.nodeType, e = (t2, e2) => (!e2 || "hidden" !== t2) && ("visible" !== t2 && "clip" !== t2), n = (t2, n2) => {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    const o2 = getComputedStyle(t2, null);
    return e(o2.overflowY, n2) || e(o2.overflowX, n2) || ((t3) => {
      const e2 = ((t4) => {
        if (!t4.ownerDocument || !t4.ownerDocument.defaultView)
          return null;
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
}, o = (t2, e2, n2, o2, l2, r2, i, s) => r2 < t2 && i > e2 || r2 > t2 && i < e2 ? 0 : r2 <= t2 && s <= n2 || i >= e2 && s >= n2 ? r2 - t2 - o2 : i > e2 && s < n2 || r2 < t2 && s > n2 ? i - e2 + l2 : 0, l = (t2) => {
  const e2 = t2.parentElement;
  return null == e2 ? t2.getRootNode().host || null : e2;
}, r = (e2, r2) => {
  var i, s, d, h;
  if ("undefined" == typeof document)
    return [];
  const { scrollMode: c, block: f, inline: u, boundary: a, skipOverflowHiddenElements: g } = r2, p = "function" == typeof a ? a : (t2) => t2 !== a;
  if (!t(e2))
    throw new TypeError("Invalid target");
  const m = document.scrollingElement || document.documentElement, w = [];
  let W = e2;
  for (; t(W) && p(W); ) {
    if (W = l(W), W === m) {
      w.push(W);
      break;
    }
    null != W && W === document.body && n(W) && !n(document.documentElement) || null != W && n(W, g) && w.push(W);
  }
  const b = null != (s = null == (i = window.visualViewport) ? void 0 : i.width) ? s : innerWidth, H = null != (h = null == (d = window.visualViewport) ? void 0 : d.height) ? h : innerHeight, { scrollX: y, scrollY: M } = window, { height: v, width: E, top: x, right: C, bottom: I, left: R } = e2.getBoundingClientRect(), { top: T, right: B, bottom: F, left: V } = ((t2) => {
    const e3 = window.getComputedStyle(t2);
    return { top: parseFloat(e3.scrollMarginTop) || 0, right: parseFloat(e3.scrollMarginRight) || 0, bottom: parseFloat(e3.scrollMarginBottom) || 0, left: parseFloat(e3.scrollMarginLeft) || 0 };
  })(e2);
  let k = "start" === f || "nearest" === f ? x - T : "end" === f ? I + F : x + v / 2 - T + F, D = "center" === u ? R + E / 2 - V + B : "end" === u ? C + B : R - V;
  const L = [];
  for (let t2 = 0; t2 < w.length; t2++) {
    const e3 = w[t2], { height: n2, width: l2, top: r3, right: i2, bottom: s2, left: d2 } = e3.getBoundingClientRect();
    if ("if-needed" === c && x >= 0 && R >= 0 && I <= H && C <= b && x >= r3 && I <= s2 && R >= d2 && C <= i2)
      return L;
    const h2 = getComputedStyle(e3), a2 = parseInt(h2.borderLeftWidth, 10), g2 = parseInt(h2.borderTopWidth, 10), p2 = parseInt(h2.borderRightWidth, 10), W2 = parseInt(h2.borderBottomWidth, 10);
    let T2 = 0, B2 = 0;
    const F2 = "offsetWidth" in e3 ? e3.offsetWidth - e3.clientWidth - a2 - p2 : 0, V2 = "offsetHeight" in e3 ? e3.offsetHeight - e3.clientHeight - g2 - W2 : 0, S = "offsetWidth" in e3 ? 0 === e3.offsetWidth ? 0 : l2 / e3.offsetWidth : 0, X = "offsetHeight" in e3 ? 0 === e3.offsetHeight ? 0 : n2 / e3.offsetHeight : 0;
    if (m === e3)
      T2 = "start" === f ? k : "end" === f ? k - H : "nearest" === f ? o(M, M + H, H, g2, W2, M + k, M + k + v, v) : k - H / 2, B2 = "start" === u ? D : "center" === u ? D - b / 2 : "end" === u ? D - b : o(y, y + b, b, a2, p2, y + D, y + D + E, E), T2 = Math.max(0, T2 + M), B2 = Math.max(0, B2 + y);
    else {
      T2 = "start" === f ? k - r3 - g2 : "end" === f ? k - s2 + W2 + V2 : "nearest" === f ? o(r3, s2, n2, g2, W2 + V2, k, k + v, v) : k - (r3 + n2 / 2) + V2 / 2, B2 = "start" === u ? D - d2 - a2 : "center" === u ? D - (d2 + l2 / 2) + F2 / 2 : "end" === u ? D - i2 + p2 + F2 : o(d2, i2, l2, a2, p2 + F2, D, D + E, E);
      const { scrollLeft: t3, scrollTop: h3 } = e3;
      T2 = 0 === X ? 0 : Math.max(0, Math.min(h3 + T2 / X, e3.scrollHeight - n2 / X + V2)), B2 = 0 === S ? 0 : Math.max(0, Math.min(t3 + B2 / S, e3.scrollWidth - l2 / S + F2)), k += h3 - T2, D += t3 - B2;
    }
    L.push({ el: e3, top: T2, left: B2 });
  }
  return L;
};

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

const FOCUSABLE_ELEMENTS_SELECTOR = /* @__PURE__ */ [
  "a[href]",
  "[tabindex]",
  "input",
  "select",
  "button"
].map((selector) => `${selector}:not([aria-hidden='true'])`).join(",");
const VALID_KEYS = /* @__PURE__ */ new Set([
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
class MenuFocusController {
  constructor(_delegate) {
    this.j = _delegate;
    this.Uc = -1;
    this.Ta = null;
    this.sa = [];
  }
  get B() {
    return this.sa;
  }
  Vl(el) {
    listenEvent(el, "focus", this.Fc.bind(this));
    this.Ta = el;
    onDispose(() => {
      this.Ta = null;
    });
  }
  zd() {
    if (!this.Ta)
      return;
    this.Ia();
    listenEvent(this.Ta, "keyup", this.ic.bind(this));
    listenEvent(this.Ta, "keydown", this.jc.bind(this));
    onDispose(() => {
      this.Uc = -1;
      this.sa = [];
    });
  }
  Ia() {
    this.Uc = 0;
    this.sa = this.Wl();
  }
  Fh(index = this.Gh()) {
    const element = this.sa[index];
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
  Hh(scroll = true) {
    const index = this.Gh();
    this.Zb(index >= 0 ? index : 0, scroll);
  }
  Zb(index, scroll = true) {
    this.Uc = index;
    if (this.sa[index]) {
      this.sa[index].focus({ preventScroll: true });
      if (scroll)
        this.Fh(index);
    } else {
      this.Ta?.focus({ preventScroll: true });
    }
  }
  Gh() {
    return this.sa.findIndex(
      (el) => document.activeElement === el || el.getAttribute("role") === "menuitemradio" && el.getAttribute("aria-checked") === "true"
    );
  }
  Fc() {
    if (this.Uc >= 0)
      return;
    this.Ia();
    this.Hh();
  }
  Ih(event) {
    const el = event.target;
    if (wasEnterKeyPressed(event) && el instanceof Element) {
      const role = el.getAttribute("role");
      return !/a|input|select|button/.test(el.localName) && !role;
    }
    return VALID_KEYS.has(event.key);
  }
  ic(event) {
    if (!this.Ih(event))
      return;
    event.stopPropagation();
    event.preventDefault();
  }
  jc(event) {
    if (!this.Ih(event))
      return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this.j.Xl(event);
        break;
      case "Tab":
        this.Zb(this.sf(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this.Zb(this.sf(-1));
        break;
      case "ArrowDown":
        this.Zb(this.sf(1));
        break;
      case "Home":
      case "PageUp":
        this.Zb(0);
        break;
      case "End":
      case "PageDown":
        this.Zb(this.sa.length - 1);
        break;
    }
  }
  sf(delta) {
    let index = this.Uc;
    do {
      index = (index + delta + this.sa.length) % this.sa.length;
    } while (this.sa[index]?.offsetParent === null);
    return index;
  }
  Wl() {
    if (!this.Ta)
      return [];
    const focusableElements = this.Ta.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (isHTMLElement(el) && el.offsetParent !== null && // does not have display: none
      isElementParent(this.Ta, el, is)) {
        elements.push(el);
      }
    }
    return elements;
  }
}

var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$9(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$9(target, key, result);
  return result;
};
let idCount = 0;
class Menu extends Component {
  constructor() {
    super();
    this.U = signal(false);
    this.Fd = signal(false);
    this.N = signal(null);
    this.q = signal(null);
    this.Wc = /* @__PURE__ */ new Set();
    this.Kd = null;
    this.Md = false;
    this.Jh = signal(false);
    this.Nd = /* @__PURE__ */ new Set();
    this.Af = false;
    this.jm = this.km.bind(this);
    this.Df = false;
    this.hm = this.lm.bind(this);
    this.im = this.mm.bind(this);
    this.qa = animationFrameThrottle(() => {
      const content = peek(this.q);
      if (!content || IS_SERVER)
        return;
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
          if (!isElementVisible(child))
            continue;
          const style = getComputedStyle(child);
          height += child.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
        }
      }
      setStyle(content, "--menu-height", height + "px");
    });
    this.Cf = false;
    const { showDelay } = this.$props;
    this.Ld = new Popper({
      N: this.N,
      q: this.q,
      jh: showDelay,
      zd: (trigger, show, hide) => {
        onPress(trigger, (event) => {
          if (this.U())
            hide(event);
          else
            show(event);
        });
        const closeTarget = this.Yl();
        if (closeTarget) {
          onPress(closeTarget, (event) => {
            event.stopPropagation();
            hide(event);
          });
        }
      },
      F: this.Zl.bind(this)
    });
  }
  get triggerElement() {
    return this.N();
  }
  get contentElement() {
    return this.q();
  }
  get isSubmenu() {
    return !!this.Vc;
  }
  onSetup() {
    this.a = useMediaContext();
    const currentIdCount = ++idCount;
    this.tf = `media-menu-${currentIdCount}`;
    this.uf = `media-menu-button-${currentIdCount}`;
    this._b = new MenuFocusController({
      Xl: this.close.bind(this)
    });
    if (hasProvidedContext(menuContext)) {
      this.Vc = useContext(menuContext);
    }
    this._l();
    this.setAttributes({
      "data-open": this.U,
      "data-root": !this.isSubmenu,
      "data-submenu": this.isSubmenu,
      "data-disabled": this.z.bind(this)
    });
    provideContext(menuContext, {
      $l: this.N,
      q: this.q,
      U: this.U,
      $b: signal(""),
      Vm: !!this.Vc,
      hb: this.hb.bind(this),
      vf: this.vf.bind(this),
      wf: this.wf.bind(this),
      xf: this.xf.bind(this),
      yf: this.yf.bind(this),
      zf: this.zf.bind(this),
      am: (callback) => {
        this.Nd.add(callback);
        onDispose(() => {
          this.Nd.delete(callback);
        });
      }
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onConnect(el) {
    effect(this.bm.bind(this));
    if (this.isSubmenu) {
      this.Vc?.zf(this);
    }
  }
  onDestroy() {
    this.N.set(null);
    this.q.set(null);
    this.Kd = null;
    this.Nd.clear();
  }
  _l() {
    let sliderActiveTimer = -1, parentSliderObserver = hasProvidedContext(sliderObserverContext) ? useContext(sliderObserverContext) : null;
    provideContext(sliderObserverContext, {
      onDragStart: () => {
        parentSliderObserver?.onDragStart?.();
        window.clearTimeout(sliderActiveTimer);
        sliderActiveTimer = -1;
        this.Md = true;
      },
      onDragEnd: () => {
        parentSliderObserver?.onDragEnd?.();
        sliderActiveTimer = window.setTimeout(() => {
          this.Md = false;
          sliderActiveTimer = -1;
        }, 300);
      }
    });
  }
  bm() {
    const expanded = this.cm();
    if (!this.isSubmenu)
      this.qa();
    this.Kh(expanded);
    if (!expanded)
      return;
    effect(() => {
      const { height } = this.a.$state, content = this.q();
      content && setStyle(content, "--player-height", height() + "px");
    });
    this._b.zd();
    this.listen("pointerup", this.dm.bind(this));
    listenEvent(window, "pointerup", this.em.bind(this));
  }
  vf(button) {
    const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(this.z.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this.uf);
    setAttribute(el, "aria-haspopup", "menu");
    setAttribute(el, "aria-expanded", "false");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    const watchAttrs = () => {
      setAttribute(el, "data-open", this.U());
      setAttribute(el, "aria-disabled", isARIADisabled());
    };
    if (IS_SERVER)
      watchAttrs();
    else
      effect(watchAttrs);
    this.N.set(el);
    onDispose(() => {
      this.N.set(null);
    });
  }
  wf(items) {
    const el = items.el;
    el.style.setProperty("display", "none");
    setAttribute(el, "id", this.tf);
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    this.q.set(el);
    onDispose(() => this.q.set(null));
    const watchAttrs = () => setAttribute(el, "data-open", this.U());
    if (IS_SERVER)
      watchAttrs();
    else
      effect(watchAttrs);
    this._b.Vl(el);
    this.Kh(false);
    const onTransition = this.fm.bind(this);
    if (!this.isSubmenu) {
      items.listen("transitionstart", onTransition);
      items.listen("transitionend", onTransition);
      items.listen("animationend", this.qa);
      items.listen("vds-menu-resize", this.qa);
    } else {
      this.Vc?.am(onTransition);
    }
  }
  xf(observer) {
    this.Kd = observer;
  }
  Kh(expanded) {
    const content = peek(this.q);
    if (content)
      setAttribute(content, "aria-hidden", ariaBool$1(!expanded));
  }
  yf(disabled) {
    this.Jh.set(disabled);
  }
  Zl(isExpanded, event) {
    this.Af = isKeyboardEvent(event);
    event?.stopPropagation();
    if (this.U() === isExpanded)
      return;
    if (this.z()) {
      if (isExpanded)
        this.Ld.hide(event);
      return;
    }
    this.el?.dispatchEvent(
      new Event("vds-menu-resize", {
        bubbles: true,
        composed: true
      })
    );
    const trigger = this.N(), content = this.q();
    if (trigger) {
      setAttribute(trigger, "aria-controls", isExpanded && this.tf);
      setAttribute(trigger, "aria-expanded", ariaBool$1(isExpanded));
    }
    if (content)
      setAttribute(content, "aria-labelledby", isExpanded && this.uf);
    this.U.set(isExpanded);
    this.gm(event);
    tick();
    if (this.Af) {
      if (isExpanded)
        content?.focus();
      else
        trigger?.focus();
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
      if (!this.isSubmenu && this.a.activeMenu !== this) {
        this.a.activeMenu?.close(event);
        this.a.activeMenu = this;
      }
      this.Kd?.Bf?.(event);
    } else {
      if (this.isSubmenu) {
        for (const el of this.Wc)
          el.close(event);
      } else {
        this.a.activeMenu = null;
      }
      this.Kd?.Wm?.(event);
    }
    if (isExpanded) {
      requestAnimationFrame(this.Lh.bind(this));
    }
  }
  Lh() {
    if (this.Cf || this.Df)
      return;
    this._b.Ia();
    requestAnimationFrame(() => {
      if (this.Af) {
        this._b.Hh();
      } else {
        this._b.Fh();
      }
    });
  }
  cm() {
    return !this.z() && this.U();
  }
  z() {
    return this.Fd() || this.Jh();
  }
  hb(disabled) {
    this.Fd.set(disabled);
  }
  dm(event) {
    const content = this.q();
    if (this.Md || content && isEventInside(content, event)) {
      return;
    }
    event.stopPropagation();
  }
  em(event) {
    const content = this.q();
    if (this.Md || content && isEventInside(content, event)) {
      return;
    }
    this.close(event);
  }
  Yl() {
    const target = this.el?.querySelector('[data-part="close-target"]');
    return this.el && target && isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
  }
  gm(trigger) {
    if (this.isSubmenu)
      return;
    if (this.U())
      this.a.remote.pauseControls(trigger);
    else
      this.a.remote.resumeControls(trigger);
  }
  zf(menu) {
    this.Wc.add(menu);
    listenEvent(menu, "open", this.hm);
    listenEvent(menu, "close", this.im);
    onDispose(this.jm);
  }
  km(menu) {
    this.Wc.delete(menu);
  }
  lm(event) {
    this.Df = true;
    const content = this.q();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "true");
    }
    for (const target of this.Wc) {
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
  }
  mm(event) {
    this.Df = false;
    const content = this.q();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "false");
    }
    for (const target of this.Wc) {
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
  }
  fm(event) {
    const content = this.q();
    if (content && event.propertyName === "height") {
      this.Cf = event.type === "transitionstart";
      setAttribute(content, "data-transition", this.Cf ? "height" : null);
      if (this.U())
        this.Lh();
    }
    for (const callback of this.Nd)
      callback(event);
  }
  open(trigger) {
    if (peek(this.U))
      return;
    this.Ld.show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(this.U))
      return;
    this.Ld.hide(trigger);
    tick();
  }
}
Menu.props = {
  showDelay: 0
};
__decorateClass$9([
  prop
], Menu.prototype, "triggerElement");
__decorateClass$9([
  prop
], Menu.prototype, "contentElement");
__decorateClass$9([
  prop
], Menu.prototype, "isSubmenu");
__decorateClass$9([
  method
], Menu.prototype, "open");
__decorateClass$9([
  method
], Menu.prototype, "close");

var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$8(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$8(target, key, result);
  return result;
};
class MenuButton extends Component {
  constructor() {
    super();
    this.Mh = signal(null);
    new FocusVisibleController();
  }
  get expanded() {
    return this.n?.U() ?? false;
  }
  onSetup() {
    this.n = useContext(menuContext);
  }
  onAttach(el) {
    this.n.vf(this);
    effect(this.Oc.bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    effect(this.nm.bind(this));
    this.Hc();
    const mutations = new MutationObserver(this.Hc.bind(this));
    mutations.observe(el, { attributeFilter: ["data-part"], childList: true, subtree: true });
    onDispose(() => mutations.disconnect());
    onPress(el, (trigger) => {
      this.dispatch("select", { trigger });
    });
  }
  Oc() {
    this.n.yf(this.$props.disabled());
  }
  nm() {
    const el = this.Mh();
    if (!el)
      return;
    effect(() => {
      const text = this.n.$b();
      if (text)
        el.textContent = text;
    });
  }
  Hc() {
    const hintEl = this.el?.querySelector('[data-part="hint"]');
    this.Mh.set(hintEl ?? null);
  }
}
MenuButton.props = {
  disabled: false
};
__decorateClass$8([
  prop
], MenuButton.prototype, "expanded");

class MenuItem extends MenuButton {
}

class MenuPortal extends Component {
  constructor() {
    super(...arguments);
    this.H = null;
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(menuPortalContext, {
      yb: this.om.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  // Need this so connect scope is defined.
  onConnect(el) {
  }
  onDestroy() {
    this.H?.remove();
    this.H = null;
  }
  om(el) {
    this.Nh(false);
    this.H = el;
    requestScopedAnimationFrame(() => {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this.Oc.bind(this));
      });
    });
  }
  Oc() {
    const { fullscreen } = this.a.$state, { disabled } = this.$props, _disabled = disabled();
    this.Nh(_disabled === "fullscreen" ? !fullscreen() : !_disabled);
  }
  Nh(shouldPortal) {
    if (!this.H)
      return;
    let container = this.pm(this.$props.container());
    if (!container)
      return;
    const isPortalled = this.H.parentElement === container;
    setAttribute(this.H, "data-portal", shouldPortal);
    if (shouldPortal) {
      if (!isPortalled) {
        this.H.remove();
        container.append(this.H);
      }
    } else if (isPortalled && this.H.parentElement === container) {
      this.H.remove();
      this.el?.append(this.H);
    }
  }
  pm(selector) {
    if (isHTMLElement(selector))
      return selector;
    return selector ? document.querySelector(selector) : document.body;
  }
}
MenuPortal.props = {
  container: null,
  disabled: false
};
const menuPortalContext = createContext();

class MenuItems extends Component {
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.n = useContext(menuContext);
    this.n.wf(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal.yb(el);
        onDispose(() => portal.yb(null));
      }
    }
  }
  onConnect(el) {
    effect(this.cf.bind(this));
  }
  cf() {
    if (!this.el)
      return;
    const placement = this.$props.placement();
    if (placement) {
      Object.assign(this.el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content"
      });
      const { offset: mainOffset, alignOffset } = this.$props;
      return autoPlacement(this.el, this.Cd(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  Cd() {
    return this.n.$l();
  }
}
MenuItems.props = {
  placement: null,
  offset: 0,
  alignOffset: 0
};

const radioControllerContext = createContext();

class RadioGroupController extends ViewController {
  constructor() {
    super(...arguments);
    this.ac = /* @__PURE__ */ new Set();
    this.Ua = signal("");
    this.e = null;
    this.tm = this.F.bind(this);
  }
  get qm() {
    return Array.from(this.ac).map((radio) => radio.Ua());
  }
  get value() {
    return this.Ua();
  }
  set value(value) {
    this.F(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this.rm.bind(this),
      remove: this.sm.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem)
      setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this.Ua });
  }
  onDestroy() {
    this.ac.clear();
  }
  rm(radio) {
    if (this.ac.has(radio))
      return;
    this.ac.add(radio);
    radio.Od = this.tm;
    radio.Xc(radio.Ua() === this.Ua());
  }
  sm(radio) {
    radio.Od = null;
    this.ac.delete(radio);
  }
  F(newValue, trigger) {
    const currentValue = peek(this.Ua);
    if (!newValue || newValue === currentValue)
      return;
    const currentRadio = this.Oh(currentValue), newRadio = this.Oh(newValue);
    currentRadio?.Xc(false, trigger);
    newRadio?.Xc(true, trigger);
    this.Ua.set(newValue);
    this.l?.(newValue, trigger);
  }
  Oh(newValue) {
    for (const radio of this.ac) {
      if (newValue === peek(radio.Ua))
        return radio;
    }
    return null;
  }
}

var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$7(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$7(target, key, result);
  return result;
};
class RadioGroup extends Component {
  get values() {
    return this.e.qm;
  }
  get value() {
    return this.e.value;
  }
  set value(newValue) {
    this.e.value = newValue;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    if (IS_SERVER)
      this.O();
    else
      effect(this.O.bind(this));
  }
  O() {
    this.e.value = this.$props.value();
  }
  l(value, trigger) {
    const event = this.createEvent("change", { detail: value, trigger });
    this.dispatch(event);
  }
}
RadioGroup.props = {
  value: ""
};
__decorateClass$7([
  prop
], RadioGroup.prototype, "values");
__decorateClass$7([
  prop
], RadioGroup.prototype, "value");

var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$6(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$6(target, key, result);
  return result;
};
class Radio extends Component {
  constructor() {
    super();
    this.Ab = signal(false);
    this.e = {
      Ua: this.$props.value,
      Xc: this.Xc.bind(this),
      Od: null
    };
    new FocusVisibleController();
  }
  get checked() {
    return this.Ab();
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      "data-checked": this.Ab,
      "aria-checked": $ariaBool(this.Ab)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitemradio" : "radio");
    effect(this.O.bind(this));
  }
  onConnect(el) {
    this.um();
    onPress(el, this.s.bind(this));
    onDispose(this.Ga.bind(this));
  }
  Ga() {
    scoped(() => {
      const group = useContext(radioControllerContext);
      group.remove(this.e);
    }, this.connectScope);
  }
  um() {
    const group = useContext(radioControllerContext);
    group.add(this.e);
  }
  O() {
    const { value } = this.$props, newValue = value();
    if (peek(this.Ab)) {
      this.e.Od?.(newValue);
    }
  }
  s(event) {
    if (peek(this.Ab))
      return;
    this.F(true, event);
    this.vm(event);
    this.e.Od?.(peek(this.$props.value), event);
  }
  Xc(value, trigger) {
    if (peek(this.Ab) === value)
      return;
    this.F(value, trigger);
  }
  F(value, trigger) {
    this.Ab.set(value);
    this.dispatch("change", { detail: value, trigger });
  }
  vm(trigger) {
    this.dispatch("select", { trigger });
  }
}
Radio.props = {
  value: ""
};
__decorateClass$6([
  prop
], Radio.prototype, "checked");

var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$5(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$5(target, key, result);
  return result;
};
class ChaptersRadioGroup extends Component {
  constructor() {
    super();
    this.K = signal(null);
    this.C = signal([]);
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    return !this.C()?.length;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
    const { thumbnails } = this.$props;
    this.setAttributes({
      "data-thumbnails": () => !!thumbnails()
    });
  }
  onAttach(el) {
    this.n?.xf({
      Bf: this.Bf.bind(this)
    });
  }
  getOptions() {
    const { clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    return this.C().map((cue, i) => ({
      cue,
      value: i.toString(),
      label: cue.text,
      startTime: formatTime(Math.max(0, cue.startTime - startTime)),
      duration: formatSpokenTime(
        Math.min(endTime, cue.endTime) - Math.max(startTime, cue.startTime)
      )
    }));
  }
  Bf() {
    peek(() => this.Rb());
  }
  onConnect(el) {
    effect(this.Rb.bind(this));
    effect(this.ta.bind(this));
    effect(this.wm.bind(this));
    watchActiveTextTrack(this.a.textTracks, "chapters", this.K.set);
  }
  wm() {
    const track = this.K();
    if (!track)
      return;
    const onCuesChange = this.Jd.bind(this, track);
    onCuesChange();
    listenEvent(track, "add-cue", onCuesChange);
    listenEvent(track, "remove-cue", onCuesChange);
    return () => {
      this.C.set([]);
    };
  }
  Jd(track) {
    const { clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    this.C.set(
      [...track.cues].filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime)
    );
  }
  Rb() {
    if (!this.n?.U())
      return;
    const track = this.K();
    if (!track) {
      this.e.value = "-1";
      return;
    }
    const { realCurrentTime, clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity, time = realCurrentTime(), activeCueIndex = this.C().findIndex((cue) => isCueActive(cue, time));
    this.e.value = activeCueIndex.toString();
    if (activeCueIndex >= 0) {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        const cue = this.C()[activeCueIndex], radio = this.el.querySelector(`[aria-checked='true']`), cueStartTime = Math.max(startTime, cue.startTime), duration = Math.min(endTime, cue.endTime) - cueStartTime, playedPercent = Math.max(0, time - cueStartTime) / duration * 100;
        radio && setStyle(radio, "--progress", round(playedPercent, 3) + "%");
      });
    }
  }
  ta() {
    this.n?.hb(this.disabled);
  }
  l(value, trigger) {
    if (this.disabled || !trigger)
      return;
    const index = +value, cues = this.C(), { clipStartTime } = this.a.$state;
    if (isNumber(index) && cues?.[index]) {
      this.e.value = index.toString();
      this.a.remote.seek(cues[index].startTime - clipStartTime(), trigger);
      this.dispatch("change", { detail: cues[index], trigger });
    }
  }
}
ChaptersRadioGroup.props = {
  thumbnails: null
};
__decorateClass$5([
  prop
], ChaptersRadioGroup.prototype, "value");
__decorateClass$5([
  prop
], ChaptersRadioGroup.prototype, "disabled");
__decorateClass$5([
  method
], ChaptersRadioGroup.prototype, "getOptions");

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$4(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$4(target, key, result);
  return result;
};
class AudioRadioGroup extends Component {
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { audioTracks } = this.a.$state;
    return audioTracks().length <= 1;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.O.bind(this));
    effect(this.ta.bind(this));
    effect(this.Va.bind(this));
  }
  getOptions() {
    const { audioTracks } = this.a.$state;
    return audioTracks().map((track) => ({
      track,
      label: track.label,
      value: track.label.toLowerCase()
    }));
  }
  O() {
    this.e.value = this.Z();
  }
  Va() {
    const { emptyLabel } = this.$props, { audioTrack } = this.a.$state, track = audioTrack();
    this.n?.$b.set(track?.label ?? emptyLabel());
  }
  ta() {
    this.n?.hb(this.disabled);
  }
  Z() {
    const { audioTrack } = this.a.$state;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    const index = this.a.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0) {
      const track = this.a.audioTracks[index];
      this.a.remote.changeAudioTrack(index, trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
}
AudioRadioGroup.props = {
  emptyLabel: "Default"
};
__decorateClass$4([
  prop
], AudioRadioGroup.prototype, "value");
__decorateClass$4([
  prop
], AudioRadioGroup.prototype, "disabled");
__decorateClass$4([
  method
], AudioRadioGroup.prototype, "getOptions");

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$3(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$3(target, key, result);
  return result;
};
const DEFAULT_AUDIO_GAINS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
class AudioGainRadioGroup extends Component {
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { gains } = this.$props, { canSetAudioGain } = this.a.$state;
    return !canSetAudioGain() || gains().length === 0;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.O.bind(this));
    effect(this.Va.bind(this));
    effect(this.ta.bind(this));
  }
  getOptions() {
    const { gains, normalLabel } = this.$props;
    return gains().map((gain) => ({
      label: gain === 1 || gain === null ? normalLabel : String(gain * 100) + "%",
      value: gain.toString()
    }));
  }
  O() {
    this.e.value = this.Z();
  }
  Va() {
    const { normalLabel } = this.$props, { audioGain } = this.a.$state, gain = audioGain();
    this.n?.$b.set(gain === 1 || gain == null ? normalLabel() : String(gain * 100) + "%");
  }
  ta() {
    this.n?.hb(this.disabled);
  }
  Z() {
    const { audioGain } = this.a.$state;
    return audioGain()?.toString() ?? "1";
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    const gain = +value;
    this.a.remote.changeAudioGain(gain, trigger);
    this.dispatch("change", { detail: gain, trigger });
  }
}
AudioGainRadioGroup.props = {
  normalLabel: "Disabled",
  gains: DEFAULT_AUDIO_GAINS
};
__decorateClass$3([
  prop
], AudioGainRadioGroup.prototype, "value");
__decorateClass$3([
  prop
], AudioGainRadioGroup.prototype, "disabled");
__decorateClass$3([
  method
], AudioGainRadioGroup.prototype, "getOptions");

var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$2(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$2(target, key, result);
  return result;
};
class CaptionsRadioGroup extends Component {
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { hasCaptions } = this.a.$state;
    return !hasCaptions();
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    super.onConnect?.(el);
    effect(this.O.bind(this));
    effect(this.ta.bind(this));
    effect(this.Va.bind(this));
  }
  getOptions() {
    const { offLabel } = this.$props, { textTracks } = this.a.$state;
    return [
      { value: "off", label: offLabel },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        track,
        label: track.label,
        value: this.Ef(track)
      }))
    ];
  }
  O() {
    this.e.value = this.Z();
  }
  Va() {
    const { offLabel } = this.$props, { textTrack } = this.a.$state, track = textTrack();
    this.n?.$b.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  ta() {
    this.n?.hb(this.disabled);
  }
  Z() {
    const { textTrack } = this.a.$state, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? this.Ef(track) : "off";
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    if (value === "off") {
      const track = this.a.textTracks.selected;
      if (track) {
        const index2 = this.a.textTracks.indexOf(track);
        this.a.remote.changeTextTrackMode(index2, "disabled", trigger);
        this.dispatch("change", { detail: null, trigger });
      }
      return;
    }
    const index = this.a.textTracks.toArray().findIndex((track) => this.Ef(track) === value);
    if (index >= 0) {
      const track = this.a.textTracks[index];
      this.a.remote.changeTextTrackMode(index, "showing", trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
  Ef(track) {
    return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
  }
}
CaptionsRadioGroup.props = {
  offLabel: "Off"
};
__decorateClass$2([
  prop
], CaptionsRadioGroup.prototype, "value");
__decorateClass$2([
  prop
], CaptionsRadioGroup.prototype, "disabled");
__decorateClass$2([
  method
], CaptionsRadioGroup.prototype, "getOptions");

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$1(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$1(target, key, result);
  return result;
};
const DEFAULT_PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
class SpeedRadioGroup extends Component {
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = this.a.$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.O.bind(this));
    effect(this.Va.bind(this));
    effect(this.ta.bind(this));
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate.toString()
    }));
  }
  O() {
    this.e.value = this.Z();
  }
  Va() {
    const { normalLabel } = this.$props, { playbackRate } = this.a.$state, rate = playbackRate();
    this.n?.$b.set(rate === 1 ? normalLabel() : rate + "\xD7");
  }
  ta() {
    this.n?.hb(this.disabled);
  }
  Z() {
    const { playbackRate } = this.a.$state;
    return playbackRate().toString();
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    const rate = +value;
    this.a.remote.changePlaybackRate(rate, trigger);
    this.dispatch("change", { detail: rate, trigger });
  }
}
SpeedRadioGroup.props = {
  normalLabel: "Normal",
  rates: DEFAULT_PLAYBACK_RATES
};
__decorateClass$1([
  prop
], SpeedRadioGroup.prototype, "value");
__decorateClass$1([
  prop
], SpeedRadioGroup.prototype, "disabled");
__decorateClass$1([
  method
], SpeedRadioGroup.prototype, "getOptions");

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp(target, key, result);
  return result;
};
class QualityRadioGroup extends Component {
  constructor() {
    super();
    this.Sc = computed(() => {
      const { sort } = this.$props, { qualities } = this.a.$state;
      return sortVideoQualities(qualities(), sort() === "descending");
    });
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { canSetQuality, qualities } = this.a.$state;
    return !canSetQuality() || qualities().length <= 1;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.O.bind(this));
    effect(this.ta.bind(this));
    effect(this.Va.bind(this));
  }
  getOptions() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", label: autoLabel },
      ...this.Sc().map((quality) => {
        const bitrate = quality.bitrate && quality.bitrate >= 0 ? `${round(quality.bitrate / 1e6, 2)} Mbps` : null;
        return {
          quality,
          label: quality.height + "p",
          value: this.Ff(quality),
          bitrate: () => !hideBitrate() ? bitrate : null
        };
      })
    ];
  }
  O() {
    this.e.value = this.Z();
  }
  Va() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this.a.$state, qualityText = quality() ? quality().height + "p" : "";
    this.n?.$b.set(
      !autoQuality() ? qualityText : autoLabel() + (qualityText ? ` (${qualityText})` : "")
    );
  }
  ta() {
    this.n?.hb(this.disabled);
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    if (value === "auto") {
      this.a.remote.changeQuality(-1, trigger);
      this.dispatch("change", { detail: "auto", trigger });
      return;
    }
    const { qualities } = this.a.$state, index = peek(qualities).findIndex((quality) => this.Ff(quality) === value);
    if (index >= 0) {
      const quality = peek(qualities)[index];
      this.a.remote.changeQuality(index, trigger);
      this.dispatch("change", { detail: quality, trigger });
    }
  }
  Z() {
    const { quality, autoQuality } = this.a.$state;
    if (autoQuality())
      return "auto";
    const currentQuality = quality();
    return currentQuality ? this.Ff(currentQuality) : "auto";
  }
  Ff(quality) {
    return quality.height + "_" + quality.bitrate;
  }
}
QualityRadioGroup.props = {
  autoLabel: "Auto",
  hideBitrate: false,
  sort: "descending"
};
__decorateClass([
  prop
], QualityRadioGroup.prototype, "value");
__decorateClass([
  prop
], QualityRadioGroup.prototype, "disabled");
__decorateClass([
  method
], QualityRadioGroup.prototype, "getOptions");

class Gesture extends Component {
  constructor() {
    super(...arguments);
    this.p = null;
    this.Bb = 0;
    this.Ph = -1;
  }
  onSetup() {
    this.a = useMediaContext();
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
    this.p = this.a.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this.xm.bind(this));
  }
  xm() {
    let eventType = this.$props.event(), disabled = this.$props.disabled();
    if (!this.p || !eventType || disabled)
      return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this.a.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this.p,
      eventType,
      this.ym.bind(this),
      { passive: false }
    );
  }
  ym(event) {
    if (this.$props.disabled() || isPointerEvent(event) && (event.button !== 0 || this.a.activeMenu) || isTouchEvent(event) && this.a.activeMenu || isTouchPinchEvent(event) || !this.zm(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this.Bb === 0) {
        setTimeout(() => {
          if (this.Bb === 1)
            this.Qh(event);
        }, 250);
      }
    } else if (this.Bb === 1) {
      queueMicrotask(() => this.Qh(event));
      clearTimeout(this.Ph);
      this.Bb = 0;
      return;
    }
    if (this.Bb === 0) {
      this.Ph = window.setTimeout(() => {
        this.Bb = 0;
      }, 275);
    }
    this.Bb++;
  }
  Qh(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this.Am()) {
        this.Bm(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  zm(event) {
    if (!this.el)
      return false;
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
  Am() {
    const gestures = this.a.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  Bm(action, trigger) {
    if (!action)
      return;
    const willTriggerEvent = new DOMEvent("will-trigger", {
      detail: action,
      cancelable: true,
      trigger
    });
    this.dispatchEvent(willTriggerEvent);
    if (willTriggerEvent.defaultPrevented)
      return;
    const [method, value] = action.replace(/:([a-z])/, "-$1").split(":");
    if (action.includes(":fullscreen")) {
      this.a.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this.a.remote.seek(peek(this.a.$state.currentTime) + (+value || 0), trigger);
    } else {
      this.a.remote[kebabToCamelCase(method)](trigger);
    }
    this.dispatch("trigger", {
      detail: action,
      trigger
    });
  }
}
Gesture.props = {
  disabled: false,
  event: void 0,
  action: void 0
};

class CaptionsTextRenderer {
  constructor(_renderer) {
    this.da = _renderer;
    this.priority = 10;
    this.K = null;
    this.Za = createDisposalBin();
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this.Za.empty();
    this.da.reset();
    this.K = null;
  }
  changeTrack(track) {
    if (!track || this.K === track)
      return;
    this.Za.empty();
    if (track.readyState < 2) {
      this.da.reset();
      this.Za.add(
        listenEvent(track, "load", () => this.Rh(track), { once: true })
      );
    } else {
      this.Rh(track);
    }
    this.Za.add(
      listenEvent(track, "add-cue", (event) => {
        this.da.addCue(event.detail);
      }),
      listenEvent(track, "remove-cue", (event) => {
        this.da.removeCue(event.detail);
      })
    );
    this.K = track;
  }
  Rh(track) {
    this.da.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}

const _Captions = class _Captions extends Component {
  constructor() {
    super(...arguments);
    this.bc = -1;
  }
  get M() {
    return _Captions.M;
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this.Ub.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (!this.M()) {
      import('media-captions').then((lib) => this.M.set(lib));
    }
    effect(this.Sh.bind(this));
  }
  Ub() {
    const { textTrack, remotePlaybackState, iOSControls } = this.a.$state, track = textTrack();
    return iOSControls() || remotePlaybackState() === "connected" || !track || !isTrackCaptionKind(track);
  }
  Sh() {
    if (!this.M())
      return;
    const { viewType } = this.a.$state;
    if (viewType() === "audio") {
      return this.Dm();
    } else {
      return this.Em();
    }
  }
  Dm() {
    effect(this.qc.bind(this));
    this.Nn(null);
    return () => {
      this.el.textContent = "";
    };
  }
  qc() {
    if (this.Ub())
      return;
    this.Th();
    const { textTrack } = this.a.$state;
    listenEvent(textTrack(), "cue-change", this.Th.bind(this));
    effect(this.Fm.bind(this));
  }
  Th() {
    this.el.textContent = "";
    if (this.bc >= 0) {
      this.Gf();
    }
    const { realCurrentTime, textTrack } = this.a.$state, { renderVTTCueString } = this.M(), time = peek(realCurrentTime), activeCues = peek(textTrack).activeCues;
    for (const cue of activeCues) {
      const displayEl = this.Uh(), cueEl = this.Vh();
      cueEl.innerHTML = renderVTTCueString(cue, time);
      displayEl.append(cueEl);
      this.el.append(cueEl);
    }
  }
  Fm() {
    const { realCurrentTime } = this.a.$state, { updateTimedVTTCueNodes } = this.M();
    updateTimedVTTCueNodes(this.el, realCurrentTime());
  }
  Em() {
    const { CaptionsRenderer } = this.M(), renderer = new CaptionsRenderer(this.el), textRenderer = new CaptionsTextRenderer(renderer);
    this.a.textRenderers.add(textRenderer);
    effect(this.Gm.bind(this, renderer));
    effect(this.Hm.bind(this, renderer));
    this.Nn(renderer);
    return () => {
      this.el.textContent = "";
      this.a.textRenderers.remove(textRenderer);
      renderer.destroy();
    };
  }
  Gm(renderer) {
    renderer.dir = this.$props.textDir();
  }
  Hm(renderer) {
    if (this.Ub())
      return;
    const { realCurrentTime, textTrack } = this.a.$state;
    renderer.currentTime = realCurrentTime();
    if (this.bc >= 0 && textTrack()?.activeCues[0]) {
      this.Gf();
    }
  }
  Nn(renderer) {
    const player = this.a.player;
    if (!player)
      return;
    const onChange = this.Cm.bind(this, renderer);
    listenEvent(player, "vds-font-change", onChange);
  }
  Cm(renderer) {
    if (this.bc >= 0) {
      this.Wh();
      return;
    }
    const { textTrack } = this.a.$state;
    if (!textTrack()?.activeCues[0]) {
      this.Im();
    } else {
      renderer?.update(true);
    }
  }
  Im() {
    const display = this.Uh();
    setAttribute(display, "data-example", "");
    const cue = this.Vh();
    setAttribute(cue, "data-example", "");
    cue.textContent = this.$props.exampleText();
    display?.append(cue);
    this.el?.append(display);
    this.el?.setAttribute("data-example", "");
    this.Wh();
  }
  Wh() {
    window.clearTimeout(this.bc);
    this.bc = window.setTimeout(this.Gf.bind(this), 2500);
  }
  Gf() {
    this.el?.removeAttribute("data-example");
    if (this.el?.querySelector("[data-example]"))
      this.el.textContent = "";
    this.bc = -1;
  }
  Uh() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue-display");
    return el;
  }
  Vh() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue");
    return el;
  }
};
_Captions.props = {
  textDir: "ltr",
  exampleText: "Captions look like this."
};
_Captions.M = signal(null);
let Captions = _Captions;

class Poster extends Component {
  constructor() {
    super(...arguments);
    this.Yh = "";
  }
  onSetup() {
    this.a = useMediaContext();
    this.Nb();
    this.Xh();
    this.Da();
    this.Fa();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this.lf.bind(this));
    effect(this.Nb.bind(this));
    effect(this.Xh.bind(this));
    effect(this.Da.bind(this));
    effect(this.Fa.bind(this));
    const { started } = this.a.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this.Qc.bind(this),
      "data-error": this.gb.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this.Jm.bind(this));
    effect(this.Na.bind(this));
  }
  gb() {
    const { error } = this.$state;
    return !isNull(error());
  }
  Jm() {
    const { canLoadPoster, poster } = this.a.$state;
    if (!canLoadPoster() && poster())
      preconnect(poster(), "preconnect");
  }
  Fa() {
    const { src } = this.$props, { poster, nativeControls } = this.a.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this.gb() || !(src() || poster()) || nativeControls());
  }
  Qc() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  lf() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this.hd.bind(this));
    listenEvent(img, "error", this.R.bind(this));
  }
  Nb() {
    const { poster: defaultPoster } = this.a.$props, { canLoadPoster, providedPoster, inferredPoster } = this.a.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this.Yh === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this.Yh = src;
  }
  Xh() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this.a.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  Da() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  Na() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this.a.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  hd() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  R(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
}
Poster.props = {
  src: null,
  alt: null,
  crossOrigin: null
};
Poster.state = new State({
  img: null,
  src: null,
  alt: null,
  crossOrigin: null,
  loading: true,
  error: null,
  hidden: false
});

class Time extends Component {
  constructor() {
    super(...arguments);
    this.Yc = signal(null);
    this.Mc = signal(true);
    this.Nc = signal(true);
  }
  onSetup() {
    this.a = useMediaContext();
    this.Zh();
    const { type } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": this._h.bind(this)
    });
    new IntersectionObserverController({
      callback: this.hf.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    if (!el.hasAttribute("role"))
      effect(this.Km.bind(this));
    effect(this.Zh.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.Mc.set));
    effect(this.Fa.bind(this));
    effect(this.Lm.bind(this));
  }
  hf(entries) {
    this.Nc.set(entries[0].isIntersecting);
  }
  Fa() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.Mc() || !this.Nc());
  }
  Lm() {
    if (!this.$props.toggle()) {
      this.Yc.set(null);
      return;
    }
    if (this.el) {
      onPress(this.el, this.Mm.bind(this));
    }
  }
  Zh() {
    const { hidden, timeText } = this.$state, { duration } = this.a.$state;
    if (hidden())
      return;
    const { type, padHours, padMinutes, showHours } = this.$props, seconds = this.Nm(type()), $duration = duration(), shouldInvert = this._h();
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
  Km() {
    if (!this.el)
      return;
    const { toggle } = this.$props;
    setAttribute(this.el, "role", toggle() ? "timer" : null);
    setAttribute(this.el, "tabindex", toggle() ? 0 : null);
  }
  Nm(type) {
    const { bufferedEnd, duration, currentTime } = this.a.$state;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
  _h() {
    return this.$props.remainder() && this.Yc() !== false;
  }
  Mm(event) {
    event.preventDefault();
    if (this.Yc() === null) {
      this.Yc.set(!this.$props.remainder());
      return;
    }
    this.Yc.set((v) => !v);
  }
}
Time.props = {
  type: "current",
  showHours: false,
  padHours: null,
  padMinutes: null,
  remainder: false,
  toggle: false,
  hidden: false
};
Time.state = new State({
  timeText: "",
  hidden: false
});

const plyrLayoutContext = createContext();

const plyrLayoutProps = {
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
  customIcons: false,
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

class PlyrLayout extends Component {
  onSetup() {
    this.a = useMediaContext();
    provideContext(plyrLayoutContext, {
      ...this.$props,
      previewTime: signal(0)
    });
  }
}
PlyrLayout.props = plyrLayoutProps;
function usePlyrLayoutClasses(el, media) {
  const {
    canAirPlay,
    canFullscreen,
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
    "plyr--fullscreen-enabled": canFullscreen,
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

class MediaPlayerInstance extends MediaPlayer {
}
class MediaProviderInstance extends MediaProvider {
}
class MediaAnnouncerInstance extends MediaAnnouncer {
}
class ControlsInstance extends Controls {
}
class ControlsGroupInstance extends ControlsGroup {
}
class ToggleButtonInstance extends ToggleButton {
}
class CaptionButtonInstance extends CaptionButton {
}
class FullscreenButtonInstance extends FullscreenButton {
}
class LiveButtonInstance extends LiveButton {
}
class MuteButtonInstance extends MuteButton {
}
class PIPButtonInstance extends PIPButton {
}
class PlayButtonInstance extends PlayButton {
}
class AirPlayButtonInstance extends AirPlayButton {
}
class GoogleCastButtonInstance extends GoogleCastButton {
}
class SeekButtonInstance extends SeekButton {
}
class TooltipInstance extends Tooltip {
}
class TooltipTriggerInstance extends TooltipTrigger {
}
class TooltipContentInstance extends TooltipContent {
}
class SliderInstance extends Slider {
}
class TimeSliderInstance extends TimeSlider {
}
class VolumeSliderInstance extends VolumeSlider {
}
class AudioGainSliderInstance extends AudioGainSlider {
}
class SpeedSliderInstance extends SpeedSlider {
}
class QualitySliderInstance extends QualitySlider {
}
class SliderThumbnailInstance extends SliderThumbnail {
}
class SliderValueInstance extends SliderValue {
}
class SliderVideoInstance extends SliderVideo {
}
class SliderPreviewInstance extends SliderPreview {
}
class SliderChaptersInstance extends SliderChapters {
}
class MenuInstance extends Menu {
}
class MenuButtonInstance extends MenuButton {
}
class MenuItemsInstance extends MenuItems {
}
class MenuItemInstance extends MenuItem {
}
class MenuPortalInstance extends MenuPortal {
}
class RadioGroupInstance extends RadioGroup {
}
class RadioInstance extends Radio {
}
class CaptionsInstance extends Captions {
}
class GestureInstance extends Gesture {
}
class PosterInstance extends Poster {
}
class ThumbnailInstance extends Thumbnail {
}
class TimeInstance extends Time {
}

const Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1)
          return React.Children.only(null);
        return React.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ React.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, React.isValidElement(newElement) ? React.cloneElement(newElement, void 0, newChildren) : null);
  }
  return /* @__PURE__ */ React.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, children);
});
Slot.displayName = "Slot";
const SlotClone = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      ref: forwardedRef ? composeRefs(forwardedRef, children.ref) : children.ref
    });
  }
  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
const Slottable = ({ children }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
function isSlottable(child) {
  return React.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}

const NODES = ["button", "div", "span", "img", "video", "audio"];
const Primitive = NODES.reduce((primitives, node) => {
  const Node = React.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    return /* @__PURE__ */ React.createElement(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitives, [node]: Node };
}, {});

function isRemotionProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "REMOTION";
}
function isRemotionSrc(src) {
  return src?.type === "video/remotion";
}

const sliderStateRecord = SliderInstance.state.record, initialSliderStore = Object.keys(sliderStateRecord).reduce(
  (store, prop) => ({
    ...store,
    [prop]() {
      return sliderStateRecord[prop];
    }
  }),
  {}
);
function useSliderState(prop, ref) {
  const $state = useStateContext(sliderState);
  return useSignal((ref?.current?.$state || $state || initialSliderStore)[prop]);
}
function useSliderStore(ref) {
  const $state = useStateContext(sliderState);
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialSliderStore);
}

const mediaStateRecord = MediaPlayerInstance.state.record, initialMediaStore = Object.keys(mediaStateRecord).reduce(
  (store, prop) => ({
    ...store,
    [prop]() {
      return mediaStateRecord[prop];
    }
  }),
  {}
);
function useMediaState(prop, ref) {
  const $state = useStateContext(mediaState);
  return useSignal((ref?.current?.$state || $state || initialMediaStore)[prop]);
}
function useMediaStore(ref) {
  const $state = useStateContext(mediaState);
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialMediaStore);
}

export { MEDIA_KEY_SHORTCUTS as $, DEFAULT_AUDIO_GAINS as A, formatTime as B, formatSpokenTime as C, DEFAULT_PLAYBACK_RATES as D, canChangeVolume as E, canOrientScreen as F, GroupedLog as G, HTMLMediaProvider as H, IS_SERVER as I, canPlayHLSNatively as J, canUsePictureInPicture as K, ListSymbol as L, MediaRemoteControl as M, canUseVideoPresentation as N, canRotateScreen as O, Primitive as P, QualitySymbol as Q, RAFLoop as R, List as S, TimeRange as T, FullscreenController as U, VideoProvider as V, canFullscreen as W, ScreenOrientationController as X, mediaContext as Y, MediaControls as Z, LocalMediaStorage as _, HTMLAirPlayAdapter as a, AUDIO_EXTENSIONS as a$, ARIAKeyShortcuts as a0, isVideoQualitySrc as a1, softResetMediaState as a2, getTimeRangesStart as a3, getTimeRangesEnd as a4, TextRenderers as a5, isTrackCaptionKind as a6, parseJSONCaptionsFile as a7, TextTrackList as a8, AudioTrackList as a9, isHTMLAudioElement as aA, isHTMLVideoElement as aB, isHTMLMediaElement as aC, isHTMLIFrameElement as aD, sliderContext as aE, ControlsGroup as aF, TooltipTrigger as aG, TooltipContent as aH, sliderState as aI, SliderController as aJ, SliderThumbnail as aK, SliderVideo as aL, SliderValue as aM, SliderPreview as aN, SliderChapters as aO, MenuButton as aP, MenuItem as aQ, MenuPortal as aR, menuPortalContext as aS, MenuItems as aT, Radio as aU, ChaptersRadioGroup as aV, AudioRadioGroup as aW, AudioGainRadioGroup as aX, CaptionsRadioGroup as aY, SpeedRadioGroup as aZ, QualityRadioGroup as a_, findActiveCue as aa, isCueActive as ab, watchActiveTextTrack as ac, watchCueTextChange as ad, VideoQualityList as ae, FONT_COLOR_OPTION as af, FONT_FAMILY_OPTION as ag, FONT_SIZE_OPTION as ah, FONT_OPACITY_OPTION as ai, FONT_TEXT_SHADOW_OPTION as aj, FONT_DEFAULTS as ak, FONT_SIGNALS as al, onFontReset as am, AudioProviderLoader as an, DASHProviderLoader as ao, HLSProviderLoader as ap, VideoProviderLoader as aq, VimeoProviderLoader as ar, YouTubeProviderLoader as as, isAudioProvider as at, isVideoProvider as au, isHLSProvider as av, isDASHProvider as aw, isYouTubeProvider as ax, isVimeoProvider as ay, isGoogleCastProvider as az, TextTrack as b, AUDIO_TYPES as b0, VIDEO_EXTENSIONS as b1, VIDEO_TYPES as b2, HLS_VIDEO_EXTENSIONS as b3, DASH_VIDEO_EXTENSIONS as b4, HLS_VIDEO_TYPES as b5, DASH_VIDEO_TYPES as b6, isAudioSrc as b7, isVideoSrc as b8, isHLSSrc as b9, SliderPreviewInstance as bA, SliderChaptersInstance as bB, MenuInstance as bC, MenuButtonInstance as bD, MenuItemsInstance as bE, MenuItemInstance as bF, MenuPortalInstance as bG, RadioGroupInstance as bH, RadioInstance as bI, CaptionsInstance as bJ, GestureInstance as bK, ThumbnailInstance as bL, TimeInstance as bM, useMediaStore as bN, useSliderStore as bO, useMediaContext as bP, isDASHSrc as ba, isMediaStream as bb, MediaAnnouncerInstance as bc, ControlsInstance as bd, ControlsGroupInstance as be, CaptionButtonInstance as bf, FullscreenButtonInstance as bg, LiveButtonInstance as bh, MuteButtonInstance as bi, PIPButtonInstance as bj, PlayButtonInstance as bk, AirPlayButtonInstance as bl, GoogleCastButtonInstance as bm, SeekButtonInstance as bn, TooltipInstance as bo, TooltipTriggerInstance as bp, TooltipContentInstance as bq, SliderInstance as br, TimeSliderInstance as bs, VolumeSliderInstance as bt, AudioGainSliderInstance as bu, SpeedSliderInstance as bv, QualitySliderInstance as bw, SliderThumbnailInstance as bx, SliderValueInstance as by, SliderVideoInstance as bz, appendParamsToURL as c, IS_CHROME as d, IS_IOS as e, canGoogleCastSrc as f, loadScript as g, MediaPlayerInstance as h, TextTrackSymbol as i, coerceToError as j, isHLSSupported as k, listen as l, isRemotionSrc as m, usePlyrLayoutClasses as n, getDownloadFile as o, preconnect as p, useSliderState as q, isRemotionProvider as r, sortVideoQualities as s, MediaProviderInstance as t, useMediaState as u, mediaState as v, ToggleButtonInstance as w, PosterInstance as x, ThumbnailsLoader as y, updateSliderPreviewPlacement as z };
