import {
  getRequestCredentials
} from "./vidstack-KCGJG3AU.js";
import {
  DOMEvent,
  EventsTarget,
  IS_SERVER,
  getScope,
  isArray,
  isNumber,
  isString,
  listenEvent,
  scoped
} from "./vidstack-KAGOB6PR.js";

// ../vidstack/src/core/tracks/text/utils.ts
function findActiveCue(cues, time) {
  for (let i = 0, len = cues.length; i < len; i++) {
    if (isCueActive(cues[i], time)) return cues[i];
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
    if (track === currentTrack) return;
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

// ../vidstack/src/core/tracks/text/symbols.ts
var CROSS_ORIGIN = Symbol(true ? "TEXT_TRACK_CROSS_ORIGIN" : 0);
var READY_STATE = Symbol(true ? "TEXT_TRACK_READY_STATE" : 0);
var UPDATE_ACTIVE_CUES = Symbol(true ? "TEXT_TRACK_UPDATE_ACTIVE_CUES" : 0);
var CAN_LOAD = Symbol(true ? "TEXT_TRACK_CAN_LOAD" : 0);
var ON_MODE_CHANGE = Symbol(true ? "TEXT_TRACK_ON_MODE_CHANGE" : 0);
var NATIVE = Symbol(true ? "TEXT_TRACK_NATIVE" : 0);
var NATIVE_HLS = Symbol(true ? "TEXT_TRACK_NATIVE_HLS" : 0);
var TextTrackSymbol = {
  crossOrigin: CROSS_ORIGIN,
  readyState: READY_STATE,
  updateActiveCues: UPDATE_ACTIVE_CUES,
  canLoad: CAN_LOAD,
  onModeChange: ON_MODE_CHANGE,
  native: NATIVE,
  nativeHLS: NATIVE_HLS
};

// ../vidstack/src/core/tracks/text/text-track.ts
var TextTrack = class extends EventsTarget {
  static createId(track) {
    return `vds-${track.type}-${track.kind}-${track.src ?? track.label ?? "?"}`;
  }
  src;
  content;
  type;
  encoding;
  id = "";
  label = "";
  language = "";
  kind;
  default = false;
  #canLoad = false;
  #currentTime = 0;
  #mode = "disabled";
  #metadata = {};
  #regions = [];
  #cues = [];
  #activeCues = [];
  /** @internal */
  [TextTrackSymbol.readyState] = 0;
  /** @internal */
  [TextTrackSymbol.crossOrigin];
  /** @internal */
  [TextTrackSymbol.onModeChange] = null;
  /** @internal */
  [TextTrackSymbol.native] = null;
  get metadata() {
    return this.#metadata;
  }
  get regions() {
    return this.#regions;
  }
  get cues() {
    return this.#cues;
  }
  get activeCues() {
    return this.#activeCues;
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TextTrackSymbol.readyState];
  }
  get mode() {
    return this.#mode;
  }
  set mode(mode) {
    this.setMode(mode);
  }
  constructor(init) {
    super();
    for (const prop of Object.keys(init)) this[prop] = init[prop];
    if (!this.type) this.type = "vtt";
    if (!IS_SERVER && init.content) {
      this.#parseContent(init);
    } else if (!init.src) {
      this[TextTrackSymbol.readyState] = 2;
    }
    if (isTrackCaptionKind(this) && !this.label) {
      console.warn(`[vidstack] captions text track created without label: \`${this.src}\``);
    }
  }
  addCue(cue, trigger) {
    let i = 0, length = this.#cues.length;
    for (i = 0; i < length; i++) if (cue.endTime <= this.#cues[i].startTime) break;
    if (i === length) this.#cues.push(cue);
    else this.#cues.splice(i, 0, cue);
    if (!(cue instanceof TextTrackCue)) {
      this[TextTrackSymbol.native]?.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
    if (isCueActive(cue, this.#currentTime)) {
      this[TextTrackSymbol.updateActiveCues](this.#currentTime, trigger);
    }
  }
  removeCue(cue, trigger) {
    const index = this.#cues.indexOf(cue);
    if (index >= 0) {
      const isActive = this.#activeCues.includes(cue);
      this.#cues.splice(index, 1);
      this[TextTrackSymbol.native]?.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
      if (isActive) {
        this[TextTrackSymbol.updateActiveCues](this.#currentTime, trigger);
      }
    }
  }
  setMode(mode, trigger) {
    if (this.#mode === mode) return;
    this.#mode = mode;
    if (mode === "disabled") {
      this.#activeCues = [];
      this.#activeCuesChanged();
    } else if (this.readyState === 2) {
      this[TextTrackSymbol.updateActiveCues](this.#currentTime, trigger);
    } else {
      this.#load();
    }
    this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
    this[TextTrackSymbol.onModeChange]?.();
  }
  /** @internal */
  [TextTrackSymbol.updateActiveCues](currentTime, trigger) {
    this.#currentTime = currentTime;
    if (this.mode === "disabled" || !this.#cues.length) return;
    const activeCues = [];
    for (let i = 0, length = this.#cues.length; i < length; i++) {
      const cue = this.#cues[i];
      if (isCueActive(cue, currentTime)) activeCues.push(cue);
    }
    let changed = activeCues.length !== this.#activeCues.length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!this.#activeCues.includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    this.#activeCues = activeCues;
    if (changed) this.#activeCuesChanged(trigger);
  }
  /** @internal */
  [TextTrackSymbol.canLoad]() {
    this.#canLoad = true;
    if (this.#mode !== "disabled") this.#load();
  }
  #parseContent(init) {
    import("media-captions").then(({ parseText, VTTCue, VTTRegion }) => {
      if (!isString(init.content) || init.type === "json") {
        this.#parseJSON(init.content, VTTCue, VTTRegion);
        if (this.readyState !== 3) this.#ready();
      } else {
        parseText(init.content, { type: init.type }).then(({ cues, regions }) => {
          this.#cues = cues;
          this.#regions = regions;
          this.#ready();
        });
      }
    });
  }
  async #load() {
    if (!this.#canLoad || this[TextTrackSymbol.readyState] > 0) return;
    this[TextTrackSymbol.readyState] = 1;
    this.dispatchEvent(new DOMEvent("load-start"));
    if (!this.src) {
      this.#ready();
      return;
    }
    try {
      const { parseResponse, VTTCue, VTTRegion } = await import("media-captions"), crossOrigin = this[TextTrackSymbol.crossOrigin]?.();
      const response = fetch(this.src, {
        headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
        credentials: getRequestCredentials(crossOrigin)
      });
      if (this.type === "json") {
        this.#parseJSON(await (await response).text(), VTTCue, VTTRegion);
      } else {
        const { errors, metadata, regions, cues } = await parseResponse(response, {
          type: this.type,
          encoding: this.encoding
        });
        if (errors[0]?.code === 0) {
          throw errors[0];
        } else {
          this.#metadata = metadata;
          this.#regions = regions;
          this.#cues = cues;
        }
      }
      this.#ready();
    } catch (error) {
      this.#error(error);
    }
  }
  #ready() {
    this[TextTrackSymbol.readyState] = 2;
    if (!this.src || this.type !== "vtt") {
      const native = this[TextTrackSymbol.native];
      if (native && !native.managed) {
        for (const cue of this.#cues) native.track.addCue(cue);
      }
    }
    const loadEvent = new DOMEvent("load");
    this[TextTrackSymbol.updateActiveCues](this.#currentTime, loadEvent);
    this.dispatchEvent(loadEvent);
  }
  #error(error) {
    this[TextTrackSymbol.readyState] = 3;
    this.dispatchEvent(new DOMEvent("error", { detail: error }));
  }
  #parseJSON(json, VTTCue, VTTRegion) {
    try {
      const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
      this.#regions = regions;
      this.#cues = cues;
    } catch (error) {
      if (true) {
        console.error(`[vidstack] failed to parse JSON captions at: \`${this.src}\`

`, error);
      }
      this.#error(error);
    }
  }
  #activeCuesChanged(trigger) {
    this.dispatchEvent(new DOMEvent("cue-change", { trigger }));
  }
};
var captionRE = /captions|subtitles/;
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

export {
  TextTrackSymbol,
  findActiveCue,
  isCueActive,
  watchActiveTextTrack,
  watchCueTextChange,
  TextTrack,
  isTrackCaptionKind,
  parseJSONCaptionsFile
};
