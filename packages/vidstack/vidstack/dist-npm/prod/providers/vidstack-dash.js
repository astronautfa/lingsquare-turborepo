import { loadScript, preconnect } from '../chunks/vidstack-Vi2h5MrZ.js';
import { canPlayVideoType, canPlayAudioType, IS_CHROME, isDASHSupported } from '../chunks/vidstack-B9TAFm_g.js';
import { VideoProvider } from './vidstack-video.js';
import { listenEvent, effect, DOMEvent, isNumber, isString, camelToKebabCase, isUndefined, isFunction, peek } from '../chunks/vidstack-C6myozhB.js';
import { QualitySymbol } from '../chunks/vidstack-DH8xaM_3.js';
import { TextTrackSymbol, TextTrack } from '../chunks/vidstack-B97tQYIP.js';
import { ListSymbol } from '../chunks/vidstack-BoSiLpaP.js';
import { RAFLoop } from '../chunks/vidstack-C-clE4br.js';
import { coerceToError } from '../chunks/vidstack-C9vIqaYT.js';
import './vidstack-html.js';
import '../chunks/vidstack-Dihypf8P.js';
import '../chunks/vidstack-DuY_sHvx.js';
import '../chunks/vidstack-D2w309v1.js';

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
    this.qb = null;
    this.rb = {};
    this.sb = /* @__PURE__ */ new Set();
    this.Kb = null;
    this.oe = {};
    this.na = -1;
  }
  get instance() {
    return this.d;
  }
  setup(ctor) {
    this.d = ctor().create();
    const dispatcher = this.Ii.bind(this);
    for (const event of Object.values(ctor.events)) this.d.on(event, dispatcher);
    this.d.on(ctor.events.ERROR, this.Q.bind(this));
    for (const callback of this.sb) callback(this.d);
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
      ...this.rb
    });
    this.d.on(ctor.events.FRAGMENT_LOADING_STARTED, this.Ji.bind(this));
    this.d.on(
      ctor.events.FRAGMENT_LOADING_COMPLETED,
      this.Ki.bind(this)
    );
    this.d.on(ctor.events.MANIFEST_LOADED, this.Li.bind(this));
    this.d.on(ctor.events.QUALITY_CHANGE_RENDERED, this.Za.bind(this));
    this.d.on(ctor.events.TEXT_TRACKS_ADDED, this.Mi.bind(this));
    this.d.on(ctor.events.TRACK_CHANGE_RENDERED, this.pc.bind(this));
    this.b.qualities[QualitySymbol.Ia] = this.je.bind(this);
    listenEvent(this.b.qualities, "change", this.ke.bind(this));
    listenEvent(this.b.audioTracks, "change", this.le.bind(this));
    this.qb = effect(this.me.bind(this));
  }
  aa(event) {
    return new DOMEvent(toDOMEventType(event.type), { detail: event });
  }
  me() {
    if (!this.b.$state.live()) return;
    const raf = new RAFLoop(this.ne.bind(this));
    raf.Xa();
    return raf.$.bind(raf);
  }
  ne() {
    if (!this.d) return;
    const position = this.d.duration() - this.d.time();
    this.b.$state.liveSyncPosition.set(!isNaN(position) ? position : Infinity);
  }
  Ii(event) {
    this.b.player?.dispatch(this.aa(event));
  }
  Ni(event) {
    const native = this.Kb?.[TextTrackSymbol._], cues = (native?.track).cues;
    if (!native || !cues) return;
    const id = this.Kb.id, startIndex = this.oe[id] ?? 0, trigger = this.aa(event);
    for (let i = startIndex; i < cues.length; i++) {
      const cue = cues[i];
      if (!cue.positionAlign) cue.positionAlign = "auto";
      this.Kb.addCue(cue, trigger);
    }
    this.oe[id] = cues.length;
  }
  Mi(event) {
    if (!this.d) return;
    const data = event.tracks, nativeTextTracks = [...this.m.textTracks].filter((track) => "manualMode" in track), trigger = this.aa(event);
    for (let i = 0; i < nativeTextTracks.length; i++) {
      const textTrackInfo = data[i], nativeTextTrack = nativeTextTracks[i];
      const id = `dash-${textTrackInfo.kind}-${i}`, track = new TextTrack({
        id,
        label: textTrackInfo?.label ?? textTrackInfo.labels.find((t) => t.text)?.text ?? (textTrackInfo?.lang && getLangName(textTrackInfo.lang)) ?? textTrackInfo?.lang ?? void 0,
        language: textTrackInfo.lang ?? void 0,
        kind: textTrackInfo.kind,
        default: textTrackInfo.defaultTrack
      });
      track[TextTrackSymbol._] = {
        managed: true,
        track: nativeTextTrack
      };
      track[TextTrackSymbol.ma] = 2;
      track[TextTrackSymbol.hb] = () => {
        if (!this.d) return;
        if (track.mode === "showing") {
          this.d.setTextTrack(i);
          this.Kb = track;
        } else {
          this.d.setTextTrack(-1);
          this.Kb = null;
        }
      };
      this.b.textTracks.add(track, trigger);
    }
  }
  pc(event) {
    const { mediaType, newMediaInfo } = event;
    if (mediaType === "audio") {
      const track = this.b.audioTracks.getById(`dash-audio-${newMediaInfo.index}`);
      if (track) {
        const trigger = this.aa(event);
        this.b.audioTracks[ListSymbol.ea](track, true, trigger);
      }
    }
  }
  Za(event) {
    if (event.mediaType !== "video") return;
    const quality = this.b.qualities[event.newQuality];
    if (quality) {
      const trigger = this.aa(event);
      this.b.qualities[ListSymbol.ea](quality, true, trigger);
    }
  }
  Li(event) {
    if (this.b.$state.canPlay() || !this.d) return;
    const { type, mediaPresentationDuration } = event.data, trigger = this.aa(event);
    this.b.delegate.c(
      "stream-type-change",
      type !== "static" ? "live" : "on-demand",
      trigger
    );
    this.b.delegate.c("duration-change", mediaPresentationDuration, trigger);
    this.b.qualities[QualitySymbol.Wa](true, trigger);
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
      this.b.qualities[ListSymbol.da](quality, trigger);
    });
    if (isNumber(videoQuality.index)) {
      const quality = this.b.qualities[videoQuality.index];
      if (quality) this.b.qualities[ListSymbol.ea](quality, true, trigger);
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
      this.b.audioTracks[ListSymbol.da](localTrack, trigger);
    });
    media.dispatchEvent(new DOMEvent("canplay", { trigger }));
  }
  Q(event) {
    const { type: eventType, error: data } = event;
    switch (data.code) {
      case 27:
        this.pe(data);
        break;
      default:
        this.qc(data);
        break;
    }
  }
  Ji() {
    if (this.na >= 0) this._a();
  }
  Ki(event) {
    const mediaType = event.mediaType;
    if (mediaType === "text") {
      requestAnimationFrame(this.Ni.bind(this, event));
    }
  }
  pe(error) {
    this._a();
    this.d?.play();
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
      message: error.message ?? "",
      code: 1,
      error
    });
  }
  je() {
    this.lg("video", true);
    const { qualities } = this.b;
    this.d?.setQualityFor("video", qualities.selectedIndex, true);
  }
  lg(type, auto) {
    this.d?.updateSettings({
      streaming: { abr: { autoSwitchBitrate: { [type]: auto } } }
    });
  }
  ke() {
    const { qualities } = this.b;
    if (!this.d || qualities.auto || !qualities.selected) return;
    this.lg("video", false);
    this.d.setQualityFor("video", qualities.selectedIndex, qualities.switch === "current");
    if (IS_CHROME) {
      this.m.currentTime = this.m.currentTime;
    }
  }
  le() {
    if (!this.d) return;
    const { audioTracks } = this.b, selectedTrack = this.d.getTracksFor("audio").find(
      (track) => audioTracks.selected && audioTracks.selected.id === `dash-audio-${track.index}`
    );
    if (selectedTrack) this.d.setCurrentTrack(selectedTrack);
  }
  z() {
    this._a();
    this.Kb = null;
    this.oe = {};
  }
  loadSource(src) {
    this.z();
    if (!isString(src.src)) return;
    this.d?.attachSource(src.src);
  }
  destroy() {
    this.z();
    this.d?.destroy();
    this.d = null;
    this.qb?.();
    this.qb = null;
  }
}

class DASHLibLoader {
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
    let ctor = await loadDASHScript(this.L, callbacks);
    if (isUndefined(ctor) && !isString(this.L)) ctor = await importDASH(this.L, callbacks);
    if (!ctor) return null;
    if (!window.dashjs.supportsMediaSource()) {
      const message = "[vidstack] `dash.js` is not supported in this environment";
      this.b.player.dispatch(new DOMEvent("dash-unsupported"));
      this.b.delegate.c("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  Ma() {
    this.b.player.dispatch(new DOMEvent("dash-lib-load-start"));
  }
  tb(ctor) {
    this.b.player.dispatch(
      new DOMEvent("dash-lib-loaded", {
        detail: ctor
      })
    );
    this.La(ctor);
  }
  re(e) {
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
  if (isUndefined(loader)) return void 0;
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
  if (!isString(src)) return void 0;
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
    this.rc = null;
    this.e = new DASHController(this.video, this.b);
    this.oa = `${JS_DELIVR_CDN}/npm/dashjs@4.7.4/dist/dash${".all.min.js"}`;
  }
  /**
   * The `dash.js` constructor.
   */
  get ctor() {
    return this.rc;
  }
  /**
   * The current `dash.js` instance.
   */
  get instance() {
    return this.e.instance;
  }
  static {
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
    return this.e.rb;
  }
  set config(config) {
    this.e.rb = config;
  }
  /**
   * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
   */
  get library() {
    return this.oa;
  }
  set library(library) {
    this.oa = library;
  }
  preconnect() {
    if (!isString(this.oa)) return;
    preconnect(this.oa);
  }
  setup() {
    super.setup();
    new DASHLibLoader(this.oa, this.b, (ctor) => {
      this.rc = ctor;
      this.e.setup(ctor);
      this.b.delegate.c("provider-setup", this);
      const src = peek(this.b.$state.source);
      if (src) this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src)) {
      this.oc();
      return;
    }
    this.a.preload = preload || "";
    this.ge(src, "application/x-mpegurl");
    this.e.loadSource(src);
    this.K = src;
  }
  /**
   * The given callback is invoked when a new `dash.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this.e.instance;
    if (instance) callback(instance);
    this.e.sb.add(callback);
    return () => this.e.sb.delete(callback);
  }
  destroy() {
    this.e.destroy();
  }
}

export { DASHProvider };
