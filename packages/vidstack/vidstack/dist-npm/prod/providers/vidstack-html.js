import { IS_SAFARI, IS_IOS, isHLSSrc, isMediaStream } from '../chunks/vidstack-B9TAFm_g.js';
import { signal, listenEvent, useDisposalBin, effect, onDispose, peek, isNil, DOMEvent, createScope, setAttribute, isString } from '../chunks/vidstack-C6myozhB.js';
import { RAFLoop } from '../chunks/vidstack-C-clE4br.js';
import { getNumberOfDecimalPlaces } from '../chunks/vidstack-Dihypf8P.js';
import { ListSymbol } from '../chunks/vidstack-BoSiLpaP.js';

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
    this.E = _onChange;
    this.xa = null;
    this.Ka = null;
  }
  get currentGain() {
    return this.xa?.gain?.value ?? null;
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
    if (!this.xa) {
      this.xa = createGainNode();
      if (this.Ka) {
        this.Ka.connect(this.xa);
      }
    }
    if (!this.Ka) {
      this.Ka = createElementSource(this.a, this.xa);
    }
    this.xa.gain.value = gain;
    this.E(gain);
  }
  removeGain() {
    if (!this.xa) return;
    if (this.Ka) {
      this.Ka.connect(getOrCreateAudioCtx().destination);
    }
    this.eg();
    this.E(null);
  }
  destroy() {
    this.li();
    this.eg();
  }
  li() {
    if (!this.Ka) return;
    try {
      destroyElementSource(this.Ka);
    } catch (e) {
    } finally {
      this.Ka = null;
    }
  }
  eg() {
    if (!this.xa) return;
    try {
      destroyGainNode(this.xa);
    } catch (e) {
    } finally {
      this.xa = null;
    }
  }
}

const PAGE_EVENTS = ["focus", "blur", "visibilitychange", "pageshow", "pagehide"];
class PageVisibility {
  constructor() {
    this.za = signal(determinePageState());
    this.on = signal(
      document.visibilityState
    );
  }
  connect() {
    for (const eventType of PAGE_EVENTS) {
      listenEvent(window, eventType, this.An.bind(this));
    }
    if (IS_SAFARI) {
      listenEvent(window, "beforeunload", (event) => {
        this.zn = setTimeout(() => {
          if (!(event.defaultPrevented || event.returnValue.length > 0)) {
            this.za.set("hidden");
            this.on.set("hidden");
          }
        }, 0);
      });
    }
  }
  /**
   * The current page state. Important to note we only account for a subset of page states, as
   * the rest aren't valuable to the player at the moment.
   *
   * - **active:** A page is in the active state if it is visible and has input focus.
   * - **passive:** A page is in the passive state if it is visible and does not have input focus.
   * - **hidden:** A page is in the hidden state if it is not visible.
   *
   * @see https://developers.google.com/web/updates/2018/07/page-lifecycle-api#states
   */
  get pageState() {
    return this.za();
  }
  /**
   * The current document visibility state.
   *
   * - **visible:** The page content may be at least partially visible. In practice, this means that
   * the page is the foreground tab of a non-minimized window.
   * - **hidden:** The page content is not visible to the user. In practice this means that the
   * document is either a background tab or part of a minimized window, or the OS screen lock is
   * active.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
   */
  get visibility() {
    return this.on();
  }
  An(event) {
    if (IS_SAFARI) window.clearTimeout(this.zn);
    if (event.type !== "blur" || this.za() === "active") {
      this.za.set(determinePageState(event));
      this.on.set(document.visibilityState == "hidden" ? "hidden" : "visible");
    }
  }
}
function determinePageState(event) {
  if (event?.type === "blur" || document.visibilityState === "hidden") return "hidden";
  if (document.hasFocus()) return "active";
  return "passive";
}

class HTMLMediaEvents {
  constructor(_provider, _ctx) {
    this.p = _provider;
    this.b = _ctx;
    this.Ya = useDisposalBin();
    this.jc = false;
    this.ae = false;
    this.be = false;
    this.fa = new RAFLoop(this.kc.bind(this));
    this.Qn = new PageVisibility();
    this.Mn = 0;
    this.Nn = -1;
    this.hg = void 0;
    this.zi = void 0;
    this.mi();
    this.Qn.connect();
    effect(this.ni.bind(this));
    onDispose(this.ce.bind(this));
  }
  get a() {
    return this.p.media;
  }
  get c() {
    return this.b.delegate.c;
  }
  ce() {
    this.ae = false;
    this.be = false;
    this.fa.$();
    this.Ya.empty();
  }
  kc() {
    const newTime = this.a.currentTime;
    const didStutter = IS_SAFARI && newTime - this.Nn < 0.35;
    if (!didStutter && this.Mn !== newTime) {
      this.Jb(newTime);
      this.Mn = newTime;
    }
  }
  mi() {
    this.F("loadstart", this.Ma);
    this.F("abort", this.gg);
    this.F("emptied", this.oi);
    this.F("error", this.Q);
    this.F("volumechange", this.Na);
  }
  pi() {
    if (this.ae) return;
    this.Ya.add(
      this.F("loadeddata", this.qi),
      this.F("loadedmetadata", this.ri),
      this.F("canplay", this.ed),
      this.F("canplaythrough", this.si),
      this.F("durationchange", this.de),
      this.F("play", this.gc),
      this.F("progress", this.nb),
      this.F("stalled", this.ti),
      this.F("suspend", this.ui),
      this.F("ratechange", this.vi)
    );
    this.ae = true;
  }
  wi() {
    if (this.be) return;
    this.Ya.add(
      this.F("pause", this.ib),
      this.F("playing", this.xi),
      this.F("seeked", this.ob),
      this.F("seeking", this.yi),
      this.F("ended", this.lc),
      this.F("waiting", this.ee)
    );
    this.be = true;
  }
  F(eventType, handler) {
    return listenEvent(
      this.a,
      eventType,
      handler.bind(this)
    );
  }
  Ai(event2) {
    return;
  }
  Jb(time, trigger) {
    const newTime = Math.min(time, this.b.$state.seekableEnd());
    this.c("time-change", newTime, trigger);
  }
  Ma(event2) {
    if (this.a.networkState === 3) {
      this.gg(event2);
      return;
    }
    this.pi();
    this.c("load-start", void 0, event2);
  }
  gg(event2) {
    this.c("abort", void 0, event2);
  }
  oi() {
    this.c("emptied", void 0, event);
  }
  qi(event2) {
    this.c("loaded-data", void 0, event2);
  }
  ri(event2) {
    this.Mn = 0;
    this.Nn = -1;
    this.wi();
    this.c("loaded-metadata", void 0, event2);
    if (IS_IOS || IS_SAFARI && isHLSSrc(this.b.$state.source())) {
      this.b.delegate.Ga(this.fe(), event2);
    }
  }
  fe() {
    return {
      provider: peek(this.b.$provider),
      duration: this.a.duration,
      buffered: this.a.buffered,
      seekable: this.a.seekable
    };
  }
  gc(event2) {
    if (!this.b.$state.canPlay) return;
    this.c("play", void 0, event2);
  }
  ib(event2) {
    if (this.a.readyState === 1 && !this.jc) return;
    this.jc = false;
    this.fa.$();
    this.c("pause", void 0, event2);
  }
  ed(event2) {
    this.b.delegate.Ga(this.fe(), event2);
  }
  si(event2) {
    if (this.b.$state.started()) return;
    this.c("can-play-through", this.fe(), event2);
  }
  xi(event2) {
    if (this.a.paused) return;
    this.jc = false;
    this.c("playing", void 0, event2);
    this.fa.Xa();
  }
  ti(event2) {
    this.c("stalled", void 0, event2);
    if (this.a.readyState < 3) {
      this.jc = true;
      this.c("waiting", void 0, event2);
    }
  }
  ee(event2) {
    if (this.a.readyState < 3) {
      this.jc = true;
      this.c("waiting", void 0, event2);
    }
  }
  lc(event2) {
    this.fa.$();
    this.Jb(this.a.duration, event2);
    this.c("end", void 0, event2);
    if (this.b.$state.loop()) {
      const hasCustomControls = isNil(this.a.controls);
      if (hasCustomControls) this.a.controls = false;
    }
  }
  ni() {
    const isPaused = this.b.$state.paused(), isPageHidden = this.Qn.visibility === "hidden", shouldListenToTimeUpdates = isPaused || isPageHidden;
    if (shouldListenToTimeUpdates) {
      listenEvent(this.a, "timeupdate", this.mc.bind(this));
    }
  }
  mc(event2) {
    this.Jb(this.a.currentTime, event2);
  }
  de(event2) {
    if (this.b.$state.ended()) {
      this.Jb(this.a.duration, event2);
    }
    this.c("duration-change", this.a.duration, event2);
  }
  Na(event2) {
    const detail = {
      volume: this.a.volume,
      muted: this.a.muted
    };
    this.c("volume-change", detail, event2);
  }
  ob(event2) {
    this.Nn = this.a.currentTime;
    this.Jb(this.a.currentTime, event2);
    this.c("seeked", this.a.currentTime, event2);
    if (Math.trunc(this.a.currentTime) === Math.trunc(this.a.duration) && getNumberOfDecimalPlaces(this.a.duration) > getNumberOfDecimalPlaces(this.a.currentTime)) {
      this.Jb(this.a.duration, event2);
      if (!this.a.ended) {
        this.b.player.dispatch(
          new DOMEvent("media-play-request", {
            trigger: event2
          })
        );
      }
    }
  }
  yi(event2) {
    this.c("seeking", this.a.currentTime, event2);
  }
  nb(event2) {
    const detail = {
      buffered: this.a.buffered,
      seekable: this.a.seekable
    };
    this.c("progress", detail, event2);
  }
  ui(event2) {
    this.c("suspend", void 0, event2);
  }
  vi(event2) {
    this.c("rate-change", this.a.playbackRate, event2);
  }
  Q(event2) {
    const error = this.a.error;
    if (!error) return;
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
    this.nc.onaddtrack = this.Bi.bind(this);
    this.nc.onremovetrack = this.Ci.bind(this);
    this.nc.onchange = this.Di.bind(this);
    listenEvent(this.b.audioTracks, "change", this.Ei.bind(this));
  }
  get nc() {
    return this.p.media.audioTracks;
  }
  Bi(event) {
    const _track = event.track;
    if (_track.label === "") return;
    const id = _track.id.toString() || `native-audio-${this.b.audioTracks.length}`, audioTrack = {
      id,
      label: _track.label,
      language: _track.language,
      kind: _track.kind,
      selected: false
    };
    this.b.audioTracks[ListSymbol.da](audioTrack, event);
    if (_track.enabled) audioTrack.selected = true;
  }
  Ci(event) {
    const track = this.b.audioTracks.getById(event.track.id);
    if (track) this.b.audioTracks[ListSymbol.cc](track, event);
  }
  Di(event) {
    let enabledTrack = this.ig();
    if (!enabledTrack) return;
    const track = this.b.audioTracks.getById(enabledTrack.id);
    if (track) this.b.audioTracks[ListSymbol.ea](track, true, event);
  }
  ig() {
    return Array.from(this.nc).find((track) => track.enabled);
  }
  Ei(event) {
    const { current } = event.detail;
    if (!current) return;
    const track = this.nc.getTrackById(current.id);
    if (track) {
      const prev = this.ig();
      if (prev) prev.enabled = false;
      track.enabled = true;
    }
  }
}

class HTMLMediaProvider {
  constructor(_media, _ctx) {
    this.a = _media;
    this.b = _ctx;
    this.scope = createScope();
    this.K = null;
    this.audioGain = new AudioGain(this.a, (gain) => {
      this.b.delegate.c("audio-gain-change", gain);
    });
  }
  setup() {
    new HTMLMediaEvents(this, this.b);
    if ("audioTracks" in this.media) new NativeAudioTracks(this, this.b);
    onDispose(() => {
      this.audioGain.destroy();
      this.a.srcObject = null;
      this.a.removeAttribute("src");
      for (const source of this.a.querySelectorAll("source")) source.remove();
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
    return this.K;
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
      this.oc();
      this.a.srcObject = src;
    } else {
      this.a.srcObject = null;
      if (isString(src)) {
        if (type !== "?") {
          this.ge({ src, type });
        } else {
          this.oc();
          this.a.src = this.jg(src);
        }
      } else {
        this.oc();
        this.a.src = window.URL.createObjectURL(src);
      }
    }
    this.a.load();
    this.K = { src, type };
  }
  /**
   * Append source so it works when requesting AirPlay since hls.js will remove it.
   */
  ge(src, defaultType) {
    const prevSource = this.a.querySelector("source[data-vds]"), source = prevSource ?? document.createElement("source");
    setAttribute(source, "src", this.jg(src.src));
    setAttribute(source, "type", src.type !== "?" ? src.type : defaultType);
    setAttribute(source, "data-vds", "");
    if (!prevSource) this.a.append(source);
  }
  oc() {
    this.a.querySelector("source[data-vds]")?.remove();
  }
  jg(src) {
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

export { HTMLMediaProvider };
