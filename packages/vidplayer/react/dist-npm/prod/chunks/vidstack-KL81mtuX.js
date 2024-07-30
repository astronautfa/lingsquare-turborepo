"use client"

import { p as peek, l as listenEvent, e as effect, D as DOMEvent, i as isString, m as camelToKebabCase, n as isUndefined, o as isFunction } from './vidstack-wClXxc1a.js';
import { Q as QualitySymbol, R as RAFLoop, b as TextTrack, i as TextTrackSymbol, L as ListSymbol, d as IS_CHROME, j as coerceToError, g as loadScript, V as VideoProvider, p as preconnect, k as isHLSSupported } from './vidstack-1EoJRWh6.js';
import 'react';

const toDOMEventType = (type) => camelToKebabCase(type);
class HLSController {
  constructor(_video, _ctx) {
    this.m = _video;
    this.b = _ctx;
    this.d = null;
    this.rb = null;
    this.sb = {};
    this.tb = /* @__PURE__ */ new Set();
    this.oa = -1;
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
      ...this.sb
    });
    const dispatcher = this.Pi.bind(this);
    for (const event of Object.values(ctor.Events))
      this.d.on(event, dispatcher);
    this.d.on(ctor.Events.ERROR, this.R.bind(this));
    for (const callback of this.tb)
      callback(this.d);
    this.b.player.dispatch("hls-instance", {
      detail: this.d
    });
    this.d.attachMedia(this.m);
    this.d.on(ctor.Events.FRAG_LOADING, this.Qi.bind(this));
    this.d.on(ctor.Events.AUDIO_TRACK_SWITCHED, this.Ri.bind(this));
    this.d.on(ctor.Events.LEVEL_SWITCHED, this.Si.bind(this));
    this.d.on(ctor.Events.LEVEL_LOADED, this.Ti.bind(this));
    this.d.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this.Ui.bind(this));
    this.d.on(ctor.Events.CUES_PARSED, this.Vi.bind(this));
    this.b.qualities[QualitySymbol.Ja] = this.ke.bind(this);
    listenEvent(this.b.qualities, "change", this.le.bind(this));
    listenEvent(this.b.audioTracks, "change", this.me.bind(this));
    this.rb = effect(this.ne.bind(this));
  }
  ba(type, data) {
    return new DOMEvent(toDOMEventType(type), { detail: data });
  }
  ne() {
    if (!this.b.$state.live())
      return;
    const raf = new RAFLoop(this.oe.bind(this));
    raf.Ya();
    return raf.aa.bind(raf);
  }
  oe() {
    this.b.$state.liveSyncPosition.set(this.d?.liveSyncPosition ?? Infinity);
  }
  Pi(type, data) {
    this.b.player?.dispatch(this.ba(type, data));
  }
  Ui(eventType, data) {
    const event = this.ba(eventType, data);
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
      track[TextTrackSymbol.na] = 2;
      track[TextTrackSymbol.ib] = () => {
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
  Vi(eventType, data) {
    const index = this.d?.subtitleTrack, track = this.b.textTracks.getById(`hls-${data.type}-${index}`);
    if (!track)
      return;
    const event = this.ba(eventType, data);
    for (const cue of data.cues) {
      cue.positionAlign = "auto";
      track.addCue(cue, event);
    }
  }
  Ri(eventType, data) {
    const track = this.b.audioTracks[data.id];
    if (track) {
      const trigger = this.ba(eventType, data);
      this.b.audioTracks[ListSymbol.fa](track, true, trigger);
    }
  }
  Si(eventType, data) {
    const quality = this.b.qualities[data.level];
    if (quality) {
      const trigger = this.ba(eventType, data);
      this.b.qualities[ListSymbol.fa](quality, true, trigger);
    }
  }
  Ti(eventType, data) {
    if (this.b.$state.canPlay())
      return;
    const { type, live, totalduration: duration, targetduration } = data.details, trigger = this.ba(eventType, data);
    this.b.delegate.c(
      "stream-type-change",
      live ? type === "EVENT" && Number.isFinite(duration) && targetduration >= 10 ? "live:dvr" : "live" : "on-demand",
      trigger
    );
    this.b.delegate.c("duration-change", duration, trigger);
    const media = this.d.media;
    if (this.d.currentLevel === -1) {
      this.b.qualities[QualitySymbol.Xa](true, trigger);
    }
    for (const remoteTrack of this.d.audioTracks) {
      const localTrack = {
        id: remoteTrack.id.toString(),
        label: remoteTrack.name,
        language: remoteTrack.lang || "",
        kind: "main"
      };
      this.b.audioTracks[ListSymbol.ea](localTrack, trigger);
    }
    for (const level of this.d.levels) {
      const videoQuality = {
        id: level.id?.toString() ?? level.height + "p",
        width: level.width,
        height: level.height,
        codec: level.codecSet,
        bitrate: level.bitrate
      };
      this.b.qualities[ListSymbol.ea](videoQuality, trigger);
    }
    media.dispatchEvent(new DOMEvent("canplay", { trigger }));
  }
  R(eventType, data) {
    if (data.fatal) {
      switch (data.type) {
        case "networkError":
          this.qe(data.error);
          break;
        case "mediaError":
          this.d?.recoverMediaError();
          break;
        default:
          this.rc(data.error);
          break;
      }
    }
  }
  Qi() {
    if (this.oa >= 0)
      this.$a();
  }
  qe(error) {
    this.$a();
    this.d?.startLoad();
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
      message: error.message,
      code: 1,
      error
    });
  }
  ke() {
    if (this.d)
      this.d.currentLevel = -1;
  }
  le() {
    const { qualities } = this.b;
    if (!this.d || qualities.auto)
      return;
    this.d[qualities.switch + "Level"] = qualities.selectedIndex;
    if (IS_CHROME) {
      this.m.currentTime = this.m.currentTime;
    }
  }
  me() {
    const { audioTracks } = this.b;
    if (this.d && this.d.audioTrack !== audioTracks.selectedIndex) {
      this.d.audioTrack = audioTracks.selectedIndex;
    }
  }
  Wi(src) {
    this.$a();
    if (!isString(src.src))
      return;
    this.d?.loadSource(src.src);
  }
  Xi() {
    this.$a();
    this.d?.destroy();
    this.d = null;
    this.rb?.();
    this.rb = null;
  }
}

class HLSLibLoader {
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
    let ctor = await loadHLSScript(this.M, callbacks);
    if (isUndefined(ctor) && !isString(this.M))
      ctor = await importHLS(this.M, callbacks);
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
  Na() {
    this.b.player.dispatch(new DOMEvent("hls-lib-load-start"));
  }
  ub(ctor) {
    this.b.player.dispatch(
      new DOMEvent("hls-lib-loaded", {
        detail: ctor
      })
    );
    this.Ma(ctor);
  }
  se(e) {
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
    this.sc = null;
    this.e = new HLSController(this.video, this.b);
    this.pa = `${JS_DELIVR_CDN}/npm/hls.js@^1.5.0/dist/hls${".min.js"}`;
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return this.sc;
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return this.e.instance;
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
    return this.e.sb;
  }
  set config(config) {
    this.e.sb = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
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
    new HLSLibLoader(this.pa, this.b, (ctor) => {
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
    this.e.Wi(src);
    this.L = src;
  }
  /**
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
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
    this.e.Xi();
  }
}
/**
 * Whether `hls.js` is supported in this environment.
 */
HLSProvider.supported = isHLSSupported();

export { HLSProvider };
