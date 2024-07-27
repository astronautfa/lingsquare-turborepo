import { loadScript, preconnect } from '../chunks/vidstack-n2fuk8wF.js';
import { IS_CHROME, isHLSSupported } from '../chunks/vidstack-C7y2WK8R.js';
import { VideoProvider } from './vidstack-video.js';
import { peek, listenEvent, effect, DOMEvent, isString, camelToKebabCase, isUndefined, isFunction } from '../chunks/vidstack-fG_Sx3Q9.js';
import { QualitySymbol } from '../chunks/vidstack-BYmCj-36.js';
import { TextTrack, TextTrackSymbol } from '../chunks/vidstack-C_Q-YmHq.js';
import { ListSymbol } from '../chunks/vidstack-sHzLCnVW.js';
import { RAFLoop } from '../chunks/vidstack-B2NpDfPa.js';
import { coerceToError } from '../chunks/vidstack-DbBJlz7I.js';
import './vidstack-html.js';
import '../chunks/vidstack-Dihypf8P.js';
import '../chunks/vidstack-C4-EsreN.js';
import '../chunks/vidstack-C_9SlM6s.js';

const toDOMEventType = (type) => camelToKebabCase(type);
class HLSController {
  constructor(_video, _ctx) {
    this._video = _video;
    this._ctx = _ctx;
    this._instance = null;
    this._stopLiveSync = null;
    this._config = {};
    this._callbacks = /* @__PURE__ */ new Set();
  }
  get instance() {
    return this._instance;
  }
  setup(ctor) {
    const { streamType } = this._ctx.$state;
    const isLive = peek(streamType).includes("live"), isLiveLowLatency = peek(streamType).includes("ll-");
    this._instance = new ctor({
      lowLatencyMode: isLiveLowLatency,
      backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
      renderTextTracksNatively: false,
      ...this._config
    });
    const dispatcher = this._dispatchHLSEvent.bind(this);
    for (const event of Object.values(ctor.Events)) this._instance.on(event, dispatcher);
    this._instance.on(ctor.Events.ERROR, this._onError.bind(this));
    for (const callback of this._callbacks) callback(this._instance);
    this._ctx.player.dispatch("hls-instance", {
      detail: this._instance
    });
    this._instance.attachMedia(this._video);
    this._instance.on(ctor.Events.AUDIO_TRACK_SWITCHED, this._onAudioSwitch.bind(this));
    this._instance.on(ctor.Events.LEVEL_SWITCHED, this._onLevelSwitched.bind(this));
    this._instance.on(ctor.Events.LEVEL_LOADED, this._onLevelLoaded.bind(this));
    this._instance.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this._onTracksFound.bind(this));
    this._instance.on(ctor.Events.CUES_PARSED, this._onCuesParsed.bind(this));
    this._ctx.qualities[QualitySymbol._enableAuto] = this._enableAutoQuality.bind(this);
    listenEvent(this._ctx.qualities, "change", this._onUserQualityChange.bind(this));
    listenEvent(this._ctx.audioTracks, "change", this._onUserAudioChange.bind(this));
    this._stopLiveSync = effect(this._liveSync.bind(this));
  }
  _createDOMEvent(type, data) {
    return new DOMEvent(toDOMEventType(type), { detail: data });
  }
  _liveSync() {
    if (!this._ctx.$state.live()) return;
    const raf = new RAFLoop(this._liveSyncPosition.bind(this));
    raf._start();
    return raf._stop.bind(raf);
  }
  _liveSyncPosition() {
    this._ctx.$state.liveSyncPosition.set(this._instance?.liveSyncPosition ?? Infinity);
  }
  _dispatchHLSEvent(type, data) {
    this._ctx.player?.dispatch(this._createDOMEvent(type, data));
  }
  _onTracksFound(eventType, data) {
    const event = this._createDOMEvent(eventType, data);
    let currentTrack = -1;
    for (let i = 0; i < data.tracks.length; i++) {
      const nonNativeTrack = data.tracks[i], init = nonNativeTrack.subtitleTrack ?? nonNativeTrack.closedCaptions, track = new TextTrack({
        id: `hls-${nonNativeTrack.kind}-${i}`,
        src: init?.url,
        label: nonNativeTrack.label,
        language: init?.lang,
        kind: nonNativeTrack.kind,
        default: nonNativeTrack.default
      });
      track[TextTrackSymbol._readyState] = 2;
      track[TextTrackSymbol._onModeChange] = () => {
        if (track.mode === "showing") {
          this._instance.subtitleTrack = i;
          currentTrack = i;
        } else if (currentTrack === i) {
          this._instance.subtitleTrack = -1;
          currentTrack = -1;
        }
      };
      this._ctx.textTracks.add(track, event);
    }
  }
  _onCuesParsed(eventType, data) {
    const index = this._instance?.subtitleTrack, track = this._ctx.textTracks.getById(`hls-${data.type}-${index}`);
    if (!track) return;
    const event = this._createDOMEvent(eventType, data);
    for (const cue of data.cues) {
      cue.positionAlign = "auto";
      track.addCue(cue, event);
    }
  }
  _onAudioSwitch(eventType, data) {
    const track = this._ctx.audioTracks[data.id];
    if (track) {
      const trigger = this._createDOMEvent(eventType, data);
      this._ctx.audioTracks[ListSymbol._select](track, true, trigger);
    }
  }
  _onLevelSwitched(eventType, data) {
    const quality = this._ctx.qualities[data.level];
    if (quality) {
      const trigger = this._createDOMEvent(eventType, data);
      this._ctx.qualities[ListSymbol._select](quality, true, trigger);
    }
  }
  _onLevelLoaded(eventType, data) {
    if (this._ctx.$state.canPlay()) return;
    const { type, live, totalduration: duration, targetduration } = data.details, trigger = this._createDOMEvent(eventType, data);
    this._ctx.delegate._notify(
      "stream-type-change",
      live ? type === "EVENT" && Number.isFinite(duration) && targetduration >= 10 ? "live:dvr" : "live" : "on-demand",
      trigger
    );
    this._ctx.delegate._notify("duration-change", duration, trigger);
    const media = this._instance.media;
    if (this._instance.currentLevel === -1) {
      this._ctx.qualities[QualitySymbol._setAuto](true, trigger);
    }
    for (const remoteTrack of this._instance.audioTracks) {
      const localTrack = {
        id: remoteTrack.id.toString(),
        label: remoteTrack.name,
        language: remoteTrack.lang || "",
        kind: "main"
      };
      this._ctx.audioTracks[ListSymbol._add](localTrack, trigger);
    }
    for (const level of this._instance.levels) {
      const videoQuality = {
        id: level.id?.toString() ?? level.height + "p",
        width: level.width,
        height: level.height,
        codec: level.codecSet,
        bitrate: level.bitrate
      };
      this._ctx.qualities[ListSymbol._add](videoQuality, trigger);
    }
    media.dispatchEvent(new DOMEvent("canplay", { trigger }));
  }
  _onError(eventType, data) {
    {
      this._ctx.logger?.errorGroup(`[vidstack] HLS error \`${eventType}\``).labelledLog("Media Element", this._instance?.media).labelledLog("HLS Instance", this._instance).labelledLog("Event Type", eventType).labelledLog("Data", data).labelledLog("Src", peek(this._ctx.$state.source)).labelledLog("Media Store", { ...this._ctx.$state }).dispatch();
    }
    if (data.fatal) {
      switch (data.type) {
        case "mediaError":
          this._instance?.recoverMediaError();
          break;
        default:
          this._onFatalError(data.error);
          break;
      }
    }
  }
  _onFatalError(error) {
    this._ctx.delegate._notify("error", {
      message: error.message,
      code: 1,
      error
    });
  }
  _enableAutoQuality() {
    if (this._instance) this._instance.currentLevel = -1;
  }
  _onUserQualityChange() {
    const { qualities } = this._ctx;
    if (!this._instance || qualities.auto) return;
    this._instance[qualities.switch + "Level"] = qualities.selectedIndex;
    if (IS_CHROME) {
      this._video.currentTime = this._video.currentTime;
    }
  }
  _onUserAudioChange() {
    const { audioTracks } = this._ctx;
    if (this._instance && this._instance.audioTrack !== audioTracks.selectedIndex) {
      this._instance.audioTrack = audioTracks.selectedIndex;
    }
  }
  _loadSource(src) {
    if (!isString(src.src)) return;
    this._instance?.loadSource(src.src);
  }
  _destroy() {
    this._instance?.destroy();
    this._instance = null;
    this._stopLiveSync?.();
    this._stopLiveSync = null;
    this._ctx?.logger?.info("\u{1F3D7}\uFE0F Destroyed HLS instance");
  }
}

class HLSLibLoader {
  constructor(_lib, _ctx, _callback) {
    this._lib = _lib;
    this._ctx = _ctx;
    this._callback = _callback;
    this._startLoading();
  }
  async _startLoading() {
    this._ctx.logger?.info("\u{1F3D7}\uFE0F Loading HLS Library");
    const callbacks = {
      onLoadStart: this._onLoadStart.bind(this),
      onLoaded: this._onLoaded.bind(this),
      onLoadError: this._onLoadError.bind(this)
    };
    let ctor = await loadHLSScript(this._lib, callbacks);
    if (isUndefined(ctor) && !isString(this._lib)) ctor = await importHLS(this._lib, callbacks);
    if (!ctor) return null;
    if (!ctor.isSupported()) {
      const message = "[vidstack] `hls.js` is not supported in this environment";
      this._ctx.logger?.error(message);
      this._ctx.player.dispatch(new DOMEvent("hls-unsupported"));
      this._ctx.delegate._notify("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  _onLoadStart() {
    {
      this._ctx.logger?.infoGroup("Starting to load `hls.js`").labelledLog("URL", this._lib).dispatch();
    }
    this._ctx.player.dispatch(new DOMEvent("hls-lib-load-start"));
  }
  _onLoaded(ctor) {
    {
      this._ctx.logger?.infoGroup("Loaded `hls.js`").labelledLog("Library", this._lib).labelledLog("Constructor", ctor).dispatch();
    }
    this._ctx.player.dispatch(
      new DOMEvent("hls-lib-loaded", {
        detail: ctor
      })
    );
    this._callback(ctor);
  }
  _onLoadError(e) {
    const error = coerceToError(e);
    {
      this._ctx.logger?.errorGroup("[vidstack] Failed to load `hls.js`").labelledLog("Library", this._lib).labelledLog("Error", e).dispatch();
    }
    this._ctx.player.dispatch(
      new DOMEvent("hls-lib-load-error", {
        detail: error
      })
    );
    this._ctx.delegate._notify("error", {
      message: error.message,
      code: 4,
      error
    });
  }
}
async function importHLS(loader, callbacks = {}) {
  if (isUndefined(loader)) return void 0;
  callbacks.onLoadStart?.();
  if (loader.prototype && loader.prototype !== Function) {
    callbacks.onLoaded?.(loader);
    return loader;
  }
  try {
    const ctor = (await loader())?.default;
    if (ctor && !!ctor.isSupported) {
      callbacks.onLoaded?.(ctor);
    } else {
      throw Error(
        true ? "[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor." : ""
      );
    }
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
async function loadHLSScript(src, callbacks = {}) {
  if (!isString(src)) return void 0;
  callbacks.onLoadStart?.();
  try {
    await loadScript(src);
    if (!isFunction(window.Hls)) {
      throw Error(
        true ? "[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window" : ""
      );
    }
    const ctor = window.Hls;
    callbacks.onLoaded?.(ctor);
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}

const JS_DELIVR_CDN = "https://cdn.jsdelivr.net";
class HLSProvider extends VideoProvider {
  constructor() {
    super(...arguments);
    this.$$PROVIDER_TYPE = "HLS";
    this._ctor = null;
    this._controller = new HLSController(this.video, this._ctx);
    this._library = `${JS_DELIVR_CDN}/npm/hls.js@^1.5.0/dist/hls${".js" }`;
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return this._ctor;
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return this._controller.instance;
  }
  static {
    /**
     * Whether `hls.js` is supported in this environment.
     */
    this.supported = isHLSSupported();
  }
  get type() {
    return "hls";
  }
  get canLiveSync() {
    return true;
  }
  /**
   * The `hls.js` configuration object.
   *
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
   */
  get config() {
    return this._controller._config;
  }
  set config(config) {
    this._controller._config = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
   */
  get library() {
    return this._library;
  }
  set library(library) {
    this._library = library;
  }
  preconnect() {
    if (!isString(this._library)) return;
    preconnect(this._library);
  }
  setup() {
    super.setup();
    new HLSLibLoader(this._library, this._ctx, (ctor) => {
      this._ctor = ctor;
      this._controller.setup(ctor);
      this._ctx.delegate._notify("provider-setup", this);
      const src = peek(this._ctx.$state.source);
      if (src) this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src)) {
      this._removeSource();
      return;
    }
    this._media.preload = preload || "";
    this._appendSource(src, "application/x-mpegurl");
    this._controller._loadSource(src);
    this._currentSrc = src;
  }
  /**
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this._controller.instance;
    if (instance) callback(instance);
    this._controller._callbacks.add(callback);
    return () => this._controller._callbacks.delete(callback);
  }
  destroy() {
    this._controller._destroy();
  }
}

export { HLSProvider };
