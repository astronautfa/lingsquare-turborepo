import { l as loadScript, p as preconnect } from '../chunks/vidstack-CkfyfBu0.js';
import { c as canPlayVideoType, t as canPlayAudioType, I as IS_CHROME, u as isDASHSupported } from '../chunks/vidstack-Ca9dj_1Q.js';
import { VideoProvider } from './vidstack-video.js';
import { l as listenEvent, g as effect, D as DOMEvent, j as isNumber, p as peek, i as isString, y as camelToKebabCase, h as isUndefined, A as isFunction } from '../chunks/vidstack-ND4uzLKO.js';
import { Q as QualitySymbol } from '../chunks/vidstack-1gmLGa6x.js';
import { a as TextTrackSymbol, T as TextTrack } from '../chunks/vidstack-DpIrri-f.js';
import { L as ListSymbol } from '../chunks/vidstack-CnaYRoc3.js';
import { R as RAFLoop } from '../chunks/vidstack-D6nVZmKR.js';
import { c as coerceToError } from '../chunks/vidstack-DM_McBs5.js';
import './vidstack-html.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-DlEhHkGV.js';

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
    this._video = _video;
    this._ctx = _ctx;
    this._instance = null;
    this._stopLiveSync = null;
    this._config = {};
    this._callbacks = /* @__PURE__ */ new Set();
    this._currentTrack = null;
    this._cueTracker = {};
    this._retryLoadingTimer = -1;
  }
  get instance() {
    return this._instance;
  }
  setup(ctor) {
    this._instance = ctor().create();
    const dispatcher = this._dispatchDASHEvent.bind(this);
    for (const event of Object.values(ctor.events))
      this._instance.on(event, dispatcher);
    this._instance.on(ctor.events.ERROR, this._onError.bind(this));
    for (const callback of this._callbacks)
      callback(this._instance);
    this._ctx.player.dispatch("dash-instance", {
      detail: this._instance
    });
    this._instance.initialize(this._video, void 0, false);
    this._instance.updateSettings({
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
      ...this._config
    });
    this._instance.on(ctor.events.FRAGMENT_LOADING_STARTED, this._onFragmentLoadStart.bind(this));
    this._instance.on(
      ctor.events.FRAGMENT_LOADING_COMPLETED,
      this._onFragmentLoadComplete.bind(this)
    );
    this._instance.on(ctor.events.MANIFEST_LOADED, this._onManifestLoaded.bind(this));
    this._instance.on(ctor.events.QUALITY_CHANGE_RENDERED, this._onQualityChange.bind(this));
    this._instance.on(ctor.events.TEXT_TRACKS_ADDED, this._onTextTracksAdded.bind(this));
    this._instance.on(ctor.events.TRACK_CHANGE_RENDERED, this._onTrackChange.bind(this));
    this._ctx.qualities[QualitySymbol._enableAuto] = this._enableAutoQuality.bind(this);
    listenEvent(this._ctx.qualities, "change", this._onUserQualityChange.bind(this));
    listenEvent(this._ctx.audioTracks, "change", this._onUserAudioChange.bind(this));
    this._stopLiveSync = effect(this._liveSync.bind(this));
  }
  _createDOMEvent(event) {
    return new DOMEvent(toDOMEventType(event.type), { detail: event });
  }
  _liveSync() {
    if (!this._ctx.$state.live())
      return;
    const raf = new RAFLoop(this._liveSyncPosition.bind(this));
    raf._start();
    return raf._stop.bind(raf);
  }
  _liveSyncPosition() {
    if (!this._instance)
      return;
    const position = this._instance.duration() - this._instance.time();
    this._ctx.$state.liveSyncPosition.set(!isNaN(position) ? position : Infinity);
  }
  _dispatchDASHEvent(event) {
    this._ctx.player?.dispatch(this._createDOMEvent(event));
  }
  _onTextFragmentLoaded(event) {
    const native = this._currentTrack?.[TextTrackSymbol._native], cues = (native?.track).cues;
    if (!native || !cues)
      return;
    const id = this._currentTrack.id, startIndex = this._cueTracker[id] ?? 0, trigger = this._createDOMEvent(event);
    for (let i = startIndex; i < cues.length; i++) {
      const cue = cues[i];
      if (!cue.positionAlign)
        cue.positionAlign = "auto";
      this._currentTrack.addCue(cue, trigger);
    }
    this._cueTracker[id] = cues.length;
  }
  _onTextTracksAdded(event) {
    if (!this._instance)
      return;
    const data = event.tracks, nativeTextTracks = [...this._video.textTracks].filter((track) => "manualMode" in track), trigger = this._createDOMEvent(event);
    for (let i = 0; i < nativeTextTracks.length; i++) {
      const textTrackInfo = data[i], nativeTextTrack = nativeTextTracks[i];
      const id = `dash-${textTrackInfo.kind}-${i}`, track = new TextTrack({
        id,
        label: textTrackInfo?.label ?? textTrackInfo.labels.find((t) => t.text)?.text ?? (textTrackInfo?.lang && getLangName(textTrackInfo.lang)) ?? textTrackInfo?.lang ?? void 0,
        language: textTrackInfo.lang ?? void 0,
        kind: textTrackInfo.kind,
        default: textTrackInfo.defaultTrack
      });
      track[TextTrackSymbol._native] = {
        managed: true,
        track: nativeTextTrack
      };
      track[TextTrackSymbol._readyState] = 2;
      track[TextTrackSymbol._onModeChange] = () => {
        if (!this._instance)
          return;
        if (track.mode === "showing") {
          this._instance.setTextTrack(i);
          this._currentTrack = track;
        } else {
          this._instance.setTextTrack(-1);
          this._currentTrack = null;
        }
      };
      this._ctx.textTracks.add(track, trigger);
    }
  }
  _onTrackChange(event) {
    const { mediaType, newMediaInfo } = event;
    if (mediaType === "audio") {
      const track = this._ctx.audioTracks.getById(`dash-audio-${newMediaInfo.index}`);
      if (track) {
        const trigger = this._createDOMEvent(event);
        this._ctx.audioTracks[ListSymbol._select](track, true, trigger);
      }
    }
  }
  _onQualityChange(event) {
    if (event.mediaType !== "video")
      return;
    const quality = this._ctx.qualities[event.newQuality];
    if (quality) {
      const trigger = this._createDOMEvent(event);
      this._ctx.qualities[ListSymbol._select](quality, true, trigger);
    }
  }
  _onManifestLoaded(event) {
    if (this._ctx.$state.canPlay() || !this._instance)
      return;
    const { type, mediaPresentationDuration } = event.data, trigger = this._createDOMEvent(event);
    this._ctx.delegate._notify(
      "stream-type-change",
      type !== "static" ? "live" : "on-demand",
      trigger
    );
    this._ctx.delegate._notify("duration-change", mediaPresentationDuration, trigger);
    this._ctx.qualities[QualitySymbol._setAuto](true, trigger);
    const media = this._instance.getVideoElement();
    const videoQualities = this._instance.getTracksForTypeFromManifest(
      "video",
      event.data
    );
    const supportedVideoMimeType = [...new Set(videoQualities.map((e) => e.mimeType))].find(
      (type2) => type2 && canPlayVideoType(media, type2)
    );
    const videoQuality = videoQualities.filter(
      (track) => supportedVideoMimeType === track.mimeType
    )[0];
    let audioTracks = this._instance.getTracksForTypeFromManifest(
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
      this._ctx.qualities[ListSymbol._add](quality, trigger);
    });
    if (isNumber(videoQuality.index)) {
      const quality = this._ctx.qualities[videoQuality.index];
      if (quality)
        this._ctx.qualities[ListSymbol._select](quality, true, trigger);
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
      this._ctx.audioTracks[ListSymbol._add](localTrack, trigger);
    });
    media.dispatchEvent(new DOMEvent("canplay", { trigger }));
  }
  _onError(event) {
    const { type: eventType, error: data } = event;
    {
      this._ctx.logger?.errorGroup(`[vidstack] DASH error \`${data.message}\``).labelledLog("Media Element", this._video).labelledLog("DASH Instance", this._instance).labelledLog("Event Type", eventType).labelledLog("Data", data).labelledLog("Src", peek(this._ctx.$state.source)).labelledLog("Media Store", { ...this._ctx.$state }).dispatch();
    }
    switch (data.code) {
      case 27:
        this._onNetworkError(data);
        break;
      default:
        this._onFatalError(data);
        break;
    }
  }
  _onFragmentLoadStart() {
    if (this._retryLoadingTimer >= 0)
      this._clearRetryTimer();
  }
  _onFragmentLoadComplete(event) {
    const mediaType = event.mediaType;
    if (mediaType === "text") {
      requestAnimationFrame(this._onTextFragmentLoaded.bind(this, event));
    }
  }
  _onNetworkError(error) {
    this._clearRetryTimer();
    this._instance?.play();
    this._retryLoadingTimer = window.setTimeout(() => {
      this._retryLoadingTimer = -1;
      this._onFatalError(error);
    }, 5e3);
  }
  _clearRetryTimer() {
    clearTimeout(this._retryLoadingTimer);
    this._retryLoadingTimer = -1;
  }
  _onFatalError(error) {
    this._ctx.delegate._notify("error", {
      message: error.message ?? "",
      code: 1,
      error
    });
  }
  _enableAutoQuality() {
    this._switchAutoBitrate("video", true);
    const { qualities } = this._ctx;
    this._instance?.setQualityFor("video", qualities.selectedIndex, true);
  }
  _switchAutoBitrate(type, auto) {
    this._instance?.updateSettings({
      streaming: { abr: { autoSwitchBitrate: { [type]: auto } } }
    });
  }
  _onUserQualityChange() {
    const { qualities } = this._ctx;
    if (!this._instance || qualities.auto || !qualities.selected)
      return;
    this._switchAutoBitrate("video", false);
    this._instance.setQualityFor("video", qualities.selectedIndex, qualities.switch === "current");
    if (IS_CHROME) {
      this._video.currentTime = this._video.currentTime;
    }
  }
  _onUserAudioChange() {
    if (!this._instance)
      return;
    const { audioTracks } = this._ctx, selectedTrack = this._instance.getTracksFor("audio").find(
      (track) => audioTracks.selected && audioTracks.selected.id === `dash-audio-${track.index}`
    );
    if (selectedTrack)
      this._instance.setCurrentTrack(selectedTrack);
  }
  _reset() {
    this._clearRetryTimer();
    this._currentTrack = null;
    this._cueTracker = {};
  }
  loadSource(src) {
    this._reset();
    if (!isString(src.src))
      return;
    this._instance?.attachSource(src.src);
  }
  destroy() {
    this._reset();
    this._instance?.destroy();
    this._instance = null;
    this._stopLiveSync?.();
    this._stopLiveSync = null;
    this._ctx?.logger?.info("\u{1F3D7}\uFE0F Destroyed DASH instance");
  }
}

class DASHLibLoader {
  constructor(_lib, _ctx, _callback) {
    this._lib = _lib;
    this._ctx = _ctx;
    this._callback = _callback;
    this._startLoading();
  }
  async _startLoading() {
    this._ctx.logger?.info("\u{1F3D7}\uFE0F Loading DASH Library");
    const callbacks = {
      onLoadStart: this._onLoadStart.bind(this),
      onLoaded: this._onLoaded.bind(this),
      onLoadError: this._onLoadError.bind(this)
    };
    let ctor = await loadDASHScript(this._lib, callbacks);
    if (isUndefined(ctor) && !isString(this._lib))
      ctor = await importDASH(this._lib, callbacks);
    if (!ctor)
      return null;
    if (!window.dashjs.supportsMediaSource()) {
      const message = "[vidstack] `dash.js` is not supported in this environment";
      this._ctx.logger?.error(message);
      this._ctx.player.dispatch(new DOMEvent("dash-unsupported"));
      this._ctx.delegate._notify("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  _onLoadStart() {
    {
      this._ctx.logger?.infoGroup("Starting to load `dash.js`").labelledLog("URL", this._lib).dispatch();
    }
    this._ctx.player.dispatch(new DOMEvent("dash-lib-load-start"));
  }
  _onLoaded(ctor) {
    {
      this._ctx.logger?.infoGroup("Loaded `dash.js`").labelledLog("Library", this._lib).labelledLog("Constructor", ctor).dispatch();
    }
    this._ctx.player.dispatch(
      new DOMEvent("dash-lib-loaded", {
        detail: ctor
      })
    );
    this._callback(ctor);
  }
  _onLoadError(e) {
    const error = coerceToError(e);
    {
      this._ctx.logger?.errorGroup("[vidstack] Failed to load `dash.js`").labelledLog("Library", this._lib).labelledLog("Error", e).dispatch();
    }
    this._ctx.player.dispatch(
      new DOMEvent("dash-lib-load-error", {
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
        true ? "[vidstack] failed importing `dash.js`. Dynamic import returned invalid object." : ""
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
        true ? "[vidstack] failed loading `dash.js`. Could not find a valid `Dash` constructor on window" : ""
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
    this._ctor = null;
    this._controller = new DASHController(this.video, this._ctx);
    this._library = `${JS_DELIVR_CDN}/npm/dashjs@4.7.4/dist/dash${".all.debug.js" }`;
  }
  /**
   * The `dash.js` constructor.
   */
  get ctor() {
    return this._ctor;
  }
  /**
   * The current `dash.js` instance.
   */
  get instance() {
    return this._controller.instance;
  }
  static {
    /**
     * Whether `dash.js` is supported in this environment.
     */
    this.supported = isDASHSupported();
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
    return this._controller._config;
  }
  set config(config) {
    this._controller._config = config;
  }
  /**
   * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
   */
  get library() {
    return this._library;
  }
  set library(library) {
    this._library = library;
  }
  preconnect() {
    if (!isString(this._library))
      return;
    preconnect(this._library);
  }
  setup() {
    super.setup();
    new DASHLibLoader(this._library, this._ctx, (ctor) => {
      this._ctor = ctor;
      this._controller.setup(ctor);
      this._ctx.delegate._notify("provider-setup", this);
      const src = peek(this._ctx.$state.source);
      if (src)
        this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src)) {
      this._removeSource();
      return;
    }
    this._media.preload = preload || "";
    this._appendSource(src, "application/x-mpegurl");
    this._controller.loadSource(src);
    this._currentSrc = src;
  }
  /**
   * The given callback is invoked when a new `dash.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this._controller.instance;
    if (instance)
      callback(instance);
    this._controller._callbacks.add(callback);
    return () => this._controller._callbacks.delete(callback);
  }
  destroy() {
    this._controller.destroy();
  }
}

export { DASHProvider };
