import { F as getScope, l as listenEvent, e as scoped, i as isString, W as EventsTarget, D as DOMEvent, w as isArray, j as isNumber } from './vidstack-ND4uzLKO.js';
import { b as getRequestCredentials } from './vidstack-CkfyfBu0.js';

const CROSS_ORIGIN = Symbol("TEXT_TRACK_CROSS_ORIGIN" ), READY_STATE = Symbol("TEXT_TRACK_READY_STATE" ), UPDATE_ACTIVE_CUES = Symbol("TEXT_TRACK_UPDATE_ACTIVE_CUES" ), CAN_LOAD = Symbol("TEXT_TRACK_CAN_LOAD" ), ON_MODE_CHANGE = Symbol("TEXT_TRACK_ON_MODE_CHANGE" ), NATIVE = Symbol("TEXT_TRACK_NATIVE" ), NATIVE_HLS = Symbol("TEXT_TRACK_NATIVE_HLS" );
const TextTrackSymbol = {
  _crossOrigin: CROSS_ORIGIN,
  _readyState: READY_STATE,
  _updateActiveCues: UPDATE_ACTIVE_CUES,
  _canLoad: CAN_LOAD,
  _onModeChange: ON_MODE_CHANGE,
  _native: NATIVE,
  _nativeHLS: NATIVE_HLS
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
    this._canLoad = false;
    this._currentTime = 0;
    this._mode = "disabled";
    this._metadata = {};
    this._regions = [];
    this._cues = [];
    this._activeCues = [];
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
    if (init.content) {
      this._parseContent(init);
    } else if (!init.src) {
      this[TextTrackSymbol._readyState] = 2;
    }
    if (isTrackCaptionKind(this) && !this.label) {
      console.warn(`[vidstack] captions text track created without label: \`${this.src}\``);
    }
  }
  static createId(track) {
    return `vds-${track.type}-${track.kind}-${track.src ?? track.label ?? "?"}`;
  }
  get metadata() {
    return this._metadata;
  }
  get regions() {
    return this._regions;
  }
  get cues() {
    return this._cues;
  }
  get activeCues() {
    return this._activeCues;
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TextTrackSymbol._readyState];
  }
  get mode() {
    return this._mode;
  }
  set mode(mode) {
    this.setMode(mode);
  }
  addCue(cue, trigger) {
    let i = 0, length = this._cues.length;
    for (i = 0; i < length; i++)
      if (cue.endTime <= this._cues[i].startTime)
        break;
    if (i === length)
      this._cues.push(cue);
    else
      this._cues.splice(i, 0, cue);
    if (!(cue instanceof TextTrackCue)) {
      this[TextTrackSymbol._native]?.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
    if (isCueActive(cue, this._currentTime)) {
      this[TextTrackSymbol._updateActiveCues](this._currentTime, trigger);
    }
  }
  removeCue(cue, trigger) {
    const index = this._cues.indexOf(cue);
    if (index >= 0) {
      const isActive = this._activeCues.includes(cue);
      this._cues.splice(index, 1);
      this[TextTrackSymbol._native]?.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
      if (isActive) {
        this[TextTrackSymbol._updateActiveCues](this._currentTime, trigger);
      }
    }
  }
  setMode(mode, trigger) {
    if (this._mode === mode)
      return;
    this._mode = mode;
    if (mode === "disabled") {
      this._activeCues = [];
      this._activeCuesChanged();
    } else if (this.readyState === 2) {
      this[TextTrackSymbol._updateActiveCues](this._currentTime, trigger);
    } else {
      this._load();
    }
    this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
    this[TextTrackSymbol._onModeChange]?.();
  }
  /** @internal */
  [(_a = TextTrackSymbol._readyState, _b = TextTrackSymbol._onModeChange, _c = TextTrackSymbol._native, TextTrackSymbol._updateActiveCues)](currentTime, trigger) {
    this._currentTime = currentTime;
    if (this.mode === "disabled" || !this._cues.length)
      return;
    const activeCues = [];
    for (let i = 0, length = this._cues.length; i < length; i++) {
      const cue = this._cues[i];
      if (isCueActive(cue, currentTime))
        activeCues.push(cue);
    }
    let changed = activeCues.length !== this._activeCues.length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!this._activeCues.includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    this._activeCues = activeCues;
    if (changed)
      this._activeCuesChanged(trigger);
  }
  /** @internal */
  [TextTrackSymbol._canLoad]() {
    this._canLoad = true;
    if (this._mode !== "disabled")
      this._load();
  }
  _parseContent(init) {
    import('media-captions').then(({ parseText, VTTCue, VTTRegion }) => {
      if (!isString(init.content) || init.type === "json") {
        this._parseJSON(init.content, VTTCue, VTTRegion);
        if (this.readyState !== 3)
          this._ready();
      } else {
        parseText(init.content, { type: init.type }).then(({ cues, regions }) => {
          this._cues = cues;
          this._regions = regions;
          this._ready();
        });
      }
    });
  }
  async _load() {
    if (!this._canLoad || this[TextTrackSymbol._readyState] > 0)
      return;
    this[TextTrackSymbol._readyState] = 1;
    this.dispatchEvent(new DOMEvent("load-start"));
    if (!this.src) {
      this._ready();
      return;
    }
    try {
      const { parseResponse, VTTCue, VTTRegion } = await import('media-captions'), crossOrigin = this[TextTrackSymbol._crossOrigin]?.();
      const response = fetch(this.src, {
        headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
        credentials: getRequestCredentials(crossOrigin)
      });
      if (this.type === "json") {
        this._parseJSON(await (await response).text(), VTTCue, VTTRegion);
      } else {
        const { errors, metadata, regions, cues } = await parseResponse(response, {
          type: this.type,
          encoding: this.encoding
        });
        if (errors[0]?.code === 0) {
          throw errors[0];
        } else {
          this._metadata = metadata;
          this._regions = regions;
          this._cues = cues;
        }
      }
      this._ready();
    } catch (error) {
      this._error(error);
    }
  }
  _ready() {
    this[TextTrackSymbol._readyState] = 2;
    if (!this.src || this.type !== "vtt") {
      const native = this[TextTrackSymbol._native];
      if (native && !native.managed) {
        for (const cue of this._cues)
          native.track.addCue(cue);
      }
    }
    const loadEvent = new DOMEvent("load");
    this[TextTrackSymbol._updateActiveCues](this._currentTime, loadEvent);
    this.dispatchEvent(loadEvent);
  }
  _error(error) {
    this[TextTrackSymbol._readyState] = 3;
    this.dispatchEvent(new DOMEvent("error", { detail: error }));
  }
  _parseJSON(json, VTTCue, VTTRegion) {
    try {
      const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
      this._regions = regions;
      this._cues = cues;
    } catch (error) {
      {
        console.error(`[vidstack] failed to parse JSON captions at: \`${this.src}\`

`, error);
      }
      this._error(error);
    }
  }
  _activeCuesChanged(trigger) {
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

export { TextTrack as T, TextTrackSymbol as a, isCueActive as b, watchCueTextChange as c, findActiveCue as f, isTrackCaptionKind as i, parseJSONCaptionsFile as p, watchActiveTextTrack as w };