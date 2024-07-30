import { L as ListSymbol, a as canOrientScreen, b as IS_IPHONE, i as isTrackCaptionKind } from './vidstack-B89aCpDg.js';
import { E as EventsTarget, D as DOMEvent, b as isArray, d as isUndefined, S as State, t as tick, e as signal } from './vidstack-2WGWo9lS.js';

var _a$1;
const GROUPED_LOG = Symbol(0);
class GroupedLog {
  constructor(logger, level, title, root, parent) {
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root;
    this.parent = parent;
    this[_a$1] = true;
    this.logs = [];
  }
  static {
    _a$1 = GROUPED_LOG;
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
    return new GroupedLog(this.logger, this.level, title, this.root ?? this, this);
  }
  groupEnd() {
    this.parent?.logs.push(this);
    return this.parent ?? this;
  }
  dispatch() {
    return this.logger.dispatch(this.level, this.root ?? this);
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
    if (id === "")
      return null;
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
    if (this._items.includes(item))
      return;
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
    for (const item of [...this._items])
      this[ListSymbol._remove](item, trigger);
    this._items = [];
    this[ListSymbol._setReadonly](false, trigger);
    this[ListSymbol._onReset]?.();
  }
  /** @internal */
  [ListSymbol._setReadonly](readonly, trigger) {
    if (this[ListSymbol._readonly] === readonly)
      return;
    this[ListSymbol._readonly] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
}

class TimeRange {
  get length() {
    return this._ranges.length;
  }
  constructor(start, end) {
    if (isArray(start)) {
      this._ranges = start;
    } else if (!isUndefined(start) && !isUndefined(end)) {
      this._ranges = [[start, end]];
    } else {
      this._ranges = [];
    }
  }
  start(index) {
    return this._ranges[index][0] ?? Infinity;
  }
  end(index) {
    return this._ranges[index][1] ?? Infinity;
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
    return IS_IPHONE  ;
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
function onFontReset() {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const defaultValue = FONT_DEFAULTS[type];
    FONT_SIGNALS[type].set(defaultValue);
  }
}

export { FONT_COLOR_OPTION as F, GroupedLog as G, List as L, TimeRange as T, getTimeRangesStart as a, FONT_FAMILY_OPTION as b, FONT_SIZE_OPTION as c, FONT_OPACITY_OPTION as d, FONT_TEXT_SHADOW_OPTION as e, FONT_DEFAULTS as f, getTimeRangesEnd as g, FONT_SIGNALS as h, mediaState as m, onFontReset as o, softResetMediaState as s };
