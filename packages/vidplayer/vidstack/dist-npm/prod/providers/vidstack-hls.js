import { l as loadScript, p as preconnect } from '../chunks/vidstack-BTmcG2zk.js';
import { I as IS_CHROME, s as isHLSSupported } from '../chunks/vidstack-DlGT_9qi.js';
import { VideoProvider } from './vidstack-video.js';
import { p as peek, l as listenEvent, g as effect, D as DOMEvent, i as isString, y as camelToKebabCase, h as isUndefined, A as isFunction } from '../chunks/vidstack-CBNXqr3M.js';
import { Q as QualitySymbol } from '../chunks/vidstack-BSXZsAhp.js';
import { T as TextTrack, a as TextTrackSymbol } from '../chunks/vidstack-THZVvA_p.js';
import { L as ListSymbol } from '../chunks/vidstack-VrKElWm_.js';
import { R as RAFLoop } from '../chunks/vidstack-D5KHQxGY.js';
import { c as coerceToError } from '../chunks/vidstack-BUqeBbTQ.js';
import './vidstack-html.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-DHaZtYX6.js';

const toDOMEventType = (type) => camelToKebabCase(type);
class HLSController {
  constructor(_video, _ctx) {
    this.m = _video;
    this.b = _ctx;
    this.d = null;
    this.qb = null;
    this.rb = {};
    this.sb = /* @__PURE__ */ new Set();
    this.na = -1;
  }
  get instance() {
    return this.d;
  }
  setup(ctor) {
    const { streamType } = this.b.$state;
    const isLive = peek(streamType).includes("live"), isLiveLowLatency = peek(streamType).includes("ll-");
    this.d = new ctor({
      lowLatencyMode: isLiveLowLatency,
      backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
      renderTextTracksNatively: false,
      ...this.rb
    });
    const dispatcher = this.Oi.bind(this);
    for (const event of Object.values(ctor.Events))
      this.d.on(event, dispatcher);
    this.d.on(ctor.Events.ERROR, this.Q.bind(this));
    for (const callback of this.sb)
      callback(this.d);
    this.b.player.dispatch("hls-instance", {
      detail: this.d
    });
    this.d.attachMedia(this.m);
    this.d.on(ctor.Events.FRAG_LOADING, this.Pi.bind(this));
    this.d.on(ctor.Events.AUDIO_TRACK_SWITCHED, this.Qi.bind(this));
    this.d.on(ctor.Events.LEVEL_SWITCHED, this.Ri.bind(this));
    this.d.on(ctor.Events.LEVEL_LOADED, this.Si.bind(this));
    this.d.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this.Ti.bind(this));
    this.d.on(ctor.Events.CUES_PARSED, this.Ui.bind(this));
    this.b.qualities[QualitySymbol.Ia] = this.je.bind(this);
    listenEvent(this.b.qualities, "change", this.ke.bind(this));
    listenEvent(this.b.audioTracks, "change", this.le.bind(this));
    this.qb = effect(this.me.bind(this));
  }
  aa(type, data) {
    return new DOMEvent(toDOMEventType(type), { detail: data });
  }
  me() {
    if (!this.b.$state.live())
      return;
    const raf = new RAFLoop(this.ne.bind(this));
    raf.Xa();
    return raf.$.bind(raf);
  }
  ne() {
    this.b.$state.liveSyncPosition.set(this.d?.liveSyncPosition ?? Infinity);
  }
  Oi(type, data) {
    this.b.player?.dispatch(this.aa(type, data));
  }
  Ti(eventType, data) {
    const event = this.aa(eventType, data);
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
      track[TextTrackSymbol.ma] = 2;
      track[TextTrackSymbol.hb] = () => {
        if (track.mode === "showing") {
          this.d.subtitleTrack = i;
          currentTrack = i;
        } else if (currentTrack === i) {
          this.d.subtitleTrack = -1;
          currentTrack = -1;
        }
      };
      this.b.textTracks.add(track, event);
    }
  }
  Ui(eventType, data) {
    const index = this.d?.subtitleTrack, track = this.b.textTracks.getById(`hls-${data.type}-${index}`);
    if (!track)
      return;
    const event = this.aa(eventType, data);
    for (const cue of data.cues) {
      cue.positionAlign = "auto";
      track.addCue(cue, event);
    }
  }
  Qi(eventType, data) {
    const track = this.b.audioTracks[data.id];
    if (track) {
      const trigger = this.aa(eventType, data);
      this.b.audioTracks[ListSymbol.ea](track, true, trigger);
    }
  }
  Ri(eventType, data) {
    const quality = this.b.qualities[data.level];
    if (quality) {
      const trigger = this.aa(eventType, data);
      this.b.qualities[ListSymbol.ea](quality, true, trigger);
    }
  }
  Si(eventType, data) {
    if (this.b.$state.canPlay())
      return;
    const { type, live, totalduration: duration, targetduration } = data.details, trigger = this.aa(eventType, data);
    this.b.delegate.c(
      "stream-type-change",
      live ? type === "EVENT" && Number.isFinite(duration) && targetduration >= 10 ? "live:dvr" : "live" : "on-demand",
      trigger
    );
    this.b.delegate.c("duration-change", duration, trigger);
    const media = this.d.media;
    if (this.d.currentLevel === -1) {
      this.b.qualities[QualitySymbol.Wa](true, trigger);
    }
    for (const remoteTrack of this.d.audioTracks) {
      const localTrack = {
        id: remoteTrack.id.toString(),
        label: remoteTrack.name,
        language: remoteTrack.lang || "",
        kind: "main"
      };
      this.b.audioTracks[ListSymbol.da](localTrack, trigger);
    }
    for (const level of this.d.levels) {
      const videoQuality = {
        id: level.id?.toString() ?? level.height + "p",
        width: level.width,
        height: level.height,
        codec: level.codecSet,
        bitrate: level.bitrate
      };
      this.b.qualities[ListSymbol.da](videoQuality, trigger);
    }
    media.dispatchEvent(new DOMEvent("canplay", { trigger }));
  }
  Q(eventType, data) {
    if (data.fatal) {
      switch (data.type) {
        case "networkError":
          this.pe(data.error);
          break;
        case "mediaError":
          this.d?.recoverMediaError();
          break;
        default:
          this.qc(data.error);
          break;
      }
    }
  }
  Pi() {
    if (this.na >= 0)
      this._a();
  }
  pe(error) {
    this._a();
    this.d?.startLoad();
    this.na = window.setTimeout(() => {
      this.na = -1;
      this.qc(error);
    }, 5e3);
  }
  _a() {
    clearTimeout(this.na);
    this.na = -1;
  }
  qc(error) {
    this.b.delegate.c("error", {
      message: error.message,
      code: 1,
      error
    });
  }
  je() {
    if (this.d)
      this.d.currentLevel = -1;
  }
  ke() {
    const { qualities } = this.b;
    if (!this.d || qualities.auto)
      return;
    this.d[qualities.switch + "Level"] = qualities.selectedIndex;
    if (IS_CHROME) {
      this.m.currentTime = this.m.currentTime;
    }
  }
  le() {
    const { audioTracks } = this.b;
    if (this.d && this.d.audioTrack !== audioTracks.selectedIndex) {
      this.d.audioTrack = audioTracks.selectedIndex;
    }
  }
  Vi(src) {
    this._a();
    if (!isString(src.src))
      return;
    this.d?.loadSource(src.src);
  }
  Wi() {
    this._a();
    this.d?.destroy();
    this.d = null;
    this.qb?.();
    this.qb = null;
  }
}

class HLSLibLoader {
  constructor(_lib, _ctx, _callback) {
    this.L = _lib;
    this.b = _ctx;
    this.La = _callback;
    this.qe();
  }
  async qe() {
    const callbacks = {
      onLoadStart: this.Ma.bind(this),
      onLoaded: this.tb.bind(this),
      onLoadError: this.re.bind(this)
    };
    let ctor = await loadHLSScript(this.L, callbacks);
    if (isUndefined(ctor) && !isString(this.L))
      ctor = await importHLS(this.L, callbacks);
    if (!ctor)
      return null;
    if (!ctor.isSupported()) {
      const message = "[vidstack] `hls.js` is not supported in this environment";
      this.b.player.dispatch(new DOMEvent("hls-unsupported"));
      this.b.delegate.c("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  Ma() {
    this.b.player.dispatch(new DOMEvent("hls-lib-load-start"));
  }
  tb(ctor) {
    this.b.player.dispatch(
      new DOMEvent("hls-lib-loaded", {
        detail: ctor
      })
    );
    this.La(ctor);
  }
  re(e) {
    const error = coerceToError(e);
    this.b.player.dispatch(
      new DOMEvent("hls-lib-load-error", {
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
async function importHLS(loader, callbacks = {}) {
  if (isUndefined(loader))
    return void 0;
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
        false ? "[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor." : ""
      );
    }
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
async function loadHLSScript(src, callbacks = {}) {
  if (!isString(src))
    return void 0;
  callbacks.onLoadStart?.();
  try {
    await loadScript(src);
    if (!isFunction(window.Hls)) {
      throw Error(
        false ? "[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window" : ""
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
    this.rc = null;
    this.e = new HLSController(this.video, this.b);
    this.oa = `${JS_DELIVR_CDN}/npm/hls.js@^1.5.0/dist/hls${".min.js"}`;
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return this.rc;
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return this.e.instance;
  }
  static {
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
    return this.e.rb;
  }
  set config(config) {
    this.e.rb = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
   */
  get library() {
    return this.oa;
  }
  set library(library) {
    this.oa = library;
  }
  preconnect() {
    if (!isString(this.oa))
      return;
    preconnect(this.oa);
  }
  setup() {
    super.setup();
    new HLSLibLoader(this.oa, this.b, (ctor) => {
      this.rc = ctor;
      this.e.setup(ctor);
      this.b.delegate.c("provider-setup", this);
      const src = peek(this.b.$state.source);
      if (src)
        this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src)) {
      this.oc();
      return;
    }
    this.a.preload = preload || "";
    this.ge(src, "application/x-mpegurl");
    this.e.Vi(src);
    this.K = src;
  }
  /**
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this.e.instance;
    if (instance)
      callback(instance);
    this.e.sb.add(callback);
    return () => this.e.sb.delete(callback);
  }
  destroy() {
    this.e.Wi();
  }
}

export { HLSProvider };
