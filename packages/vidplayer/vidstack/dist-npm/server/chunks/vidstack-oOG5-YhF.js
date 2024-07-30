import { d as isVideoSrc, L as ListSymbol, T as TextTrack, e as TextTrackSymbol, f as canUsePictureInPicture, g as canUseVideoPresentation, h as canPlayHLSNatively, c as canPlayVideoType, j as canPlayAudioType, l as loadScript, k as isDASHSupported, p as preconnect, m as isDASHSrc, n as isHLSSupported, o as isHLSSrc } from './vidstack-B89aCpDg.js';
import { d as isUndefined, k as isNumber, u as useDisposalBin, m as effect, o as onDispose, l as listenEvent, p as peek, n as isNil, D as DOMEvent, q as createScope, r as setAttribute, i as isString, e as signal, j as scoped, v as camelToKebabCase, x as isFunction } from './vidstack-2WGWo9lS.js';

function round(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  return String(num).split(".")[1]?.length ?? 0;
}
function clampNumber(min, value, max) {
  return Math.max(min, Math.min(max, value));
}

const SET_AUTO = Symbol(0), ENABLE_AUTO = Symbol(0);
const QualitySymbol = {
  _setAuto: SET_AUTO,
  _enableAuto: ENABLE_AUTO
};

class VideoProviderLoader {
  constructor() {
    this.name = "video";
  }
  canPlay(src) {
    if (!isVideoSrc(src))
      return false;
    return true;
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    {
      throw Error("[vidstack] can not load video provider server-side");
    }
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
    this._media = _media;
    this._onChange = _onChange;
    this._gainNode = null;
    this._srcAudioNode = null;
  }
  get currentGain() {
    return this._gainNode?.gain?.value ?? null;
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
    if (!this._gainNode) {
      this._gainNode = createGainNode();
      if (this._srcAudioNode) {
        this._srcAudioNode.connect(this._gainNode);
      }
    }
    if (!this._srcAudioNode) {
      this._srcAudioNode = createElementSource(this._media, this._gainNode);
    }
    this._gainNode.gain.value = gain;
    this._onChange(gain);
  }
  removeGain() {
    if (!this._gainNode)
      return;
    if (this._srcAudioNode) {
      this._srcAudioNode.connect(getOrCreateAudioCtx().destination);
    }
    this._destroyGainNode();
    this._onChange(null);
  }
  destroy() {
    this._destroySrcNode();
    this._destroyGainNode();
  }
  _destroySrcNode() {
    if (!this._srcAudioNode)
      return;
    try {
      destroyElementSource(this._srcAudioNode);
    } catch (e) {
    } finally {
      this._srcAudioNode = null;
    }
  }
  _destroyGainNode() {
    if (!this._gainNode)
      return;
    try {
      destroyGainNode(this._gainNode);
    } catch (e) {
    } finally {
      this._gainNode = null;
    }
  }
}

class RAFLoop {
  constructor(_callback) {
    this._callback = _callback;
  }
  _start() {
    if (!isUndefined(this._id))
      return;
    this._loop();
  }
  _stop() {
    if (isNumber(this._id))
      window.cancelAnimationFrame(this._id);
    this._id = void 0;
  }
  _loop() {
    this._id = window.requestAnimationFrame(() => {
      if (isUndefined(this._id))
        return;
      this._callback();
      this._loop();
    });
  }
}

class HTMLMediaEvents {
  constructor(_provider, _ctx) {
    this._provider = _provider;
    this._ctx = _ctx;
    this._disposal = useDisposalBin();
    this._waiting = false;
    this._attachedLoadStart = false;
    this._attachedCanPlay = false;
    this._timeRAF = new RAFLoop(this._onAnimationFrame.bind(this));
    this._handlers = void 0;
    this._handleDevEvent = void 0;
    this._attachInitialListeners();
    effect(this._attachTimeUpdate.bind(this));
    onDispose(this._onDispose.bind(this));
  }
  get _media() {
    return this._provider.media;
  }
  get _notify() {
    return this._ctx.delegate._notify;
  }
  _onDispose() {
    this._attachedLoadStart = false;
    this._attachedCanPlay = false;
    this._timeRAF._stop();
    this._disposal.empty();
  }
  /**
   * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
   * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
   * resolve that by retrieving time updates in a request animation frame loop.
   */
  _onAnimationFrame() {
    const newTime = this._media.currentTime;
    if (this._ctx.$state.realCurrentTime() !== newTime)
      this._updateCurrentTime(newTime);
  }
  _attachInitialListeners() {
    this._attachEventListener("loadstart", this._onLoadStart);
    this._attachEventListener("abort", this._onAbort);
    this._attachEventListener("emptied", this._onEmptied);
    this._attachEventListener("error", this._onError);
    this._attachEventListener("volumechange", this._onVolumeChange);
  }
  _attachLoadStartListeners() {
    if (this._attachedLoadStart)
      return;
    this._disposal.add(
      this._attachEventListener("loadeddata", this._onLoadedData),
      this._attachEventListener("loadedmetadata", this._onLoadedMetadata),
      this._attachEventListener("canplay", this._onCanPlay),
      this._attachEventListener("canplaythrough", this._onCanPlayThrough),
      this._attachEventListener("durationchange", this._onDurationChange),
      this._attachEventListener("play", this._onPlay),
      this._attachEventListener("progress", this._onProgress),
      this._attachEventListener("stalled", this._onStalled),
      this._attachEventListener("suspend", this._onSuspend),
      this._attachEventListener("ratechange", this._onRateChange)
    );
    this._attachedLoadStart = true;
  }
  _attachCanPlayListeners() {
    if (this._attachedCanPlay)
      return;
    this._disposal.add(
      this._attachEventListener("pause", this._onPause),
      this._attachEventListener("playing", this._onPlaying),
      this._attachEventListener("seeked", this._onSeeked),
      this._attachEventListener("seeking", this._onSeeking),
      this._attachEventListener("ended", this._onEnded),
      this._attachEventListener("waiting", this._onWaiting)
    );
    this._attachedCanPlay = true;
  }
  _attachEventListener(eventType, handler) {
    return listenEvent(
      this._media,
      eventType,
      handler.bind(this)
    );
  }
  _onDevEvent(event2) {
    return;
  }
  _updateCurrentTime(time, trigger) {
    const detail = {
      // Avoid errors where `currentTime` can have higher precision.
      currentTime: Math.min(time, this._ctx.$state.seekableEnd()),
      played: this._media.played
    };
    this._notify("time-update", detail, trigger);
  }
  _onLoadStart(event2) {
    if (this._media.networkState === 3) {
      this._onAbort(event2);
      return;
    }
    this._attachLoadStartListeners();
    this._notify("load-start", void 0, event2);
  }
  _onAbort(event2) {
    this._notify("abort", void 0, event2);
  }
  _onEmptied() {
    this._notify("emptied", void 0, event);
  }
  _onLoadedData(event2) {
    this._notify("loaded-data", void 0, event2);
  }
  _onLoadedMetadata(event2) {
    this._attachCanPlayListeners();
    this._notify("loaded-metadata", void 0, event2);
  }
  _getCanPlayDetail() {
    return {
      provider: peek(this._ctx.$provider),
      duration: this._media.duration,
      buffered: this._media.buffered,
      seekable: this._media.seekable
    };
  }
  _onPlay(event2) {
    if (!this._ctx.$state.canPlay)
      return;
    this._notify("play", void 0, event2);
  }
  _onPause(event2) {
    if (this._media.readyState === 1 && !this._waiting)
      return;
    this._waiting = false;
    this._timeRAF._stop();
    this._notify("pause", void 0, event2);
  }
  _onCanPlay(event2) {
    this._ctx.delegate._ready(this._getCanPlayDetail(), event2);
  }
  _onCanPlayThrough(event2) {
    if (this._ctx.$state.started())
      return;
    this._notify("can-play-through", this._getCanPlayDetail(), event2);
  }
  _onPlaying(event2) {
    if (this._media.paused)
      return;
    this._waiting = false;
    this._notify("playing", void 0, event2);
    this._timeRAF._start();
  }
  _onStalled(event2) {
    this._notify("stalled", void 0, event2);
    if (this._media.readyState < 3) {
      this._waiting = true;
      this._notify("waiting", void 0, event2);
    }
  }
  _onWaiting(event2) {
    if (this._media.readyState < 3) {
      this._waiting = true;
      this._notify("waiting", void 0, event2);
    }
  }
  _onEnded(event2) {
    this._timeRAF._stop();
    this._updateCurrentTime(this._media.duration, event2);
    this._notify("end", void 0, event2);
    if (this._ctx.$state.loop()) {
      const hasCustomControls = isNil(this._media.controls);
      if (hasCustomControls)
        this._media.controls = false;
    }
  }
  _attachTimeUpdate() {
    if (this._ctx.$state.paused()) {
      listenEvent(this._media, "timeupdate", this._onTimeUpdate.bind(this));
    }
  }
  _onTimeUpdate(event2) {
    this._updateCurrentTime(this._media.currentTime, event2);
  }
  _onDurationChange(event2) {
    if (this._ctx.$state.ended()) {
      this._updateCurrentTime(this._media.duration, event2);
    }
    this._notify("duration-change", this._media.duration, event2);
  }
  _onVolumeChange(event2) {
    const detail = {
      volume: this._media.volume,
      muted: this._media.muted
    };
    this._notify("volume-change", detail, event2);
  }
  _onSeeked(event2) {
    this._updateCurrentTime(this._media.currentTime, event2);
    this._notify("seeked", this._media.currentTime, event2);
    if (Math.trunc(this._media.currentTime) === Math.trunc(this._media.duration) && getNumberOfDecimalPlaces(this._media.duration) > getNumberOfDecimalPlaces(this._media.currentTime)) {
      this._updateCurrentTime(this._media.duration, event2);
      if (!this._media.ended) {
        this._ctx.player.dispatch(
          new DOMEvent("media-play-request", {
            trigger: event2
          })
        );
      }
    }
  }
  _onSeeking(event2) {
    this._notify("seeking", this._media.currentTime, event2);
  }
  _onProgress(event2) {
    const detail = {
      buffered: this._media.buffered,
      seekable: this._media.seekable
    };
    this._notify("progress", detail, event2);
  }
  _onSuspend(event2) {
    this._notify("suspend", void 0, event2);
  }
  _onRateChange(event2) {
    this._notify("rate-change", this._media.playbackRate, event2);
  }
  _onError(event2) {
    const error = this._media.error;
    if (!error)
      return;
    const detail = {
      message: error.message,
      code: error.code,
      mediaError: error
    };
    this._notify("error", detail, event2);
  }
}

class NativeAudioTracks {
  constructor(_provider, _ctx) {
    this._provider = _provider;
    this._ctx = _ctx;
    this._nativeTracks.onaddtrack = this._onAddNativeTrack.bind(this);
    this._nativeTracks.onremovetrack = this._onRemoveNativeTrack.bind(this);
    this._nativeTracks.onchange = this._onChangeNativeTrack.bind(this);
    listenEvent(this._ctx.audioTracks, "change", this._onChangeTrack.bind(this));
  }
  get _nativeTracks() {
    return this._provider.media.audioTracks;
  }
  _onAddNativeTrack(event) {
    const _track = event.track;
    if (_track.label === "")
      return;
    const id = _track.id.toString() || `native-audio-${this._ctx.audioTracks.length}`, audioTrack = {
      id,
      label: _track.label,
      language: _track.language,
      kind: _track.kind,
      selected: false
    };
    this._ctx.audioTracks[ListSymbol._add](audioTrack, event);
    if (_track.enabled)
      audioTrack.selected = true;
  }
  _onRemoveNativeTrack(event) {
    const track = this._ctx.audioTracks.getById(event.track.id);
    if (track)
      this._ctx.audioTracks[ListSymbol._remove](track, event);
  }
  _onChangeNativeTrack(event) {
    let enabledTrack = this._getEnabledNativeTrack();
    if (!enabledTrack)
      return;
    const track = this._ctx.audioTracks.getById(enabledTrack.id);
    if (track)
      this._ctx.audioTracks[ListSymbol._select](track, true, event);
  }
  _getEnabledNativeTrack() {
    return Array.from(this._nativeTracks).find((track) => track.enabled);
  }
  _onChangeTrack(event) {
    const { current } = event.detail;
    if (!current)
      return;
    const track = this._nativeTracks.getTrackById(current.id);
    if (track) {
      const prev = this._getEnabledNativeTrack();
      if (prev)
        prev.enabled = false;
      track.enabled = true;
    }
  }
}

class HTMLMediaProvider {
  constructor(_media, _ctx) {
    this._media = _media;
    this._ctx = _ctx;
    this.scope = createScope();
    this._currentSrc = null;
    this.audioGain = new AudioGain(this._media, (gain) => {
      this._ctx.delegate._notify("audio-gain-change", gain);
    });
  }
  setup() {
    new HTMLMediaEvents(this, this._ctx);
    if ("audioTracks" in this.media)
      new NativeAudioTracks(this, this._ctx);
    onDispose(() => {
      this.audioGain.destroy();
      this._media.srcObject = null;
      this._media.removeAttribute("src");
      for (const source of this._media.querySelectorAll("source"))
        source.remove();
      this._media.load();
    });
  }
  get type() {
    return "";
  }
  get media() {
    return this._media;
  }
  get currentSrc() {
    return this._currentSrc;
  }
  setPlaybackRate(rate) {
    this._media.playbackRate = rate;
  }
  async play() {
    return this._media.play();
  }
  async pause() {
    return this._media.pause();
  }
  setMuted(muted) {
    this._media.muted = muted;
  }
  setVolume(volume) {
    this._media.volume = volume;
  }
  setCurrentTime(time) {
    this._media.currentTime = time;
  }
  setPlaysInline(inline) {
    setAttribute(this._media, "playsinline", inline);
  }
  async loadSource({ src, type }, preload) {
    this._media.preload = preload || "";
    {
      this._media.srcObject = null;
      if (isString(src)) {
        if (type !== "?") {
          this._appendSource({ src, type });
        } else {
          this._removeSource();
          this._media.src = this._appendMediaFragment(src);
        }
      } else {
        this._removeSource();
        this._media.src = window.URL.createObjectURL(src);
      }
    }
    this._media.load();
    this._currentSrc = { src, type };
  }
  /**
   * Append source so it works when requesting AirPlay since hls.js will remove it.
   */
  _appendSource(src, defaultType) {
    const prevSource = this._media.querySelector("source[data-vds]"), source = prevSource ?? document.createElement("source");
    setAttribute(source, "src", this._appendMediaFragment(src.src));
    setAttribute(source, "type", src.type !== "?" ? src.type : defaultType);
    setAttribute(source, "data-vds", "");
    if (!prevSource)
      this._media.append(source);
  }
  _removeSource() {
    this._media.querySelector("source[data-vds]")?.remove();
  }
  _appendMediaFragment(src) {
    const { clipStartTime, clipEndTime } = this._ctx.$state, startTime = clipStartTime(), endTime = clipEndTime();
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
    this._media = _media;
    this._ctx = _ctx;
    this._supported = signal(false);
    this._setup();
  }
  get supported() {
    return this._supported();
  }
  _setup() {
    return;
  }
  _watchSupported() {
    if (!this._supported())
      return;
    const events = ["connecting", "connect", "disconnect"], onStateChange = this._onStateChange.bind(this);
    onStateChange();
    listenEvent(this._media);
    for (const type of events) {
      listenEvent(this._media.remote);
    }
  }
  async prompt() {
    if (!this.supported)
      throw Error("Not supported on this platform.");
    if (this._type === "airplay" && this._media.webkitShowPlaybackTargetPicker) {
      return this._media.webkitShowPlaybackTargetPicker();
    }
    return this._media.remote.prompt();
  }
  _onStateChange(event) {
    const state = this._media.remote.state;
    if (state === this._state)
      return;
    const detail = { type: this._type, state };
    this._ctx.delegate._notify("remote-playback-change", detail, event);
    this._state = state;
  }
}
class HTMLAirPlayAdapter extends HTMLRemotePlaybackAdapter {
  constructor() {
    super(...arguments);
    this._type = "airplay";
  }
  get _canPrompt() {
    return "WebKitPlaybackTargetAvailabilityEvent" in window;
  }
}

class NativeHLSTextTracks {
  constructor(_video, _ctx) {
    this._video = _video;
    this._ctx = _ctx;
    _video.textTracks.onaddtrack = this._onAddTrack.bind(this);
    onDispose(this._onDispose.bind(this));
  }
  _onAddTrack(event) {
    const nativeTrack = event.track;
    if (!nativeTrack || findTextTrackElement(this._video, nativeTrack))
      return;
    const track = new TextTrack({
      id: nativeTrack.id,
      kind: nativeTrack.kind,
      label: nativeTrack.label ?? "",
      language: nativeTrack.language,
      type: "vtt"
    });
    track[TextTrackSymbol._native] = { track: nativeTrack };
    track[TextTrackSymbol._readyState] = 2;
    track[TextTrackSymbol._nativeHLS] = true;
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
    this._ctx.textTracks.add(track, event);
    track.setMode(nativeTrack.mode, event);
  }
  _onDispose() {
    this._video.textTracks.onaddtrack = null;
    for (const track of this._ctx.textTracks) {
      const nativeTrack = track[TextTrackSymbol._native]?.track;
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
    this._video = _video;
    this._media = _media;
    this._onChange = (active, event) => {
      this._media.delegate._notify("picture-in-picture-change", active, event);
    };
    listenEvent(this._video, "enterpictureinpicture", this._onEnter.bind(this));
    listenEvent(this._video, "leavepictureinpicture", this._onExit.bind(this));
  }
  get active() {
    return document.pictureInPictureElement === this._video;
  }
  get supported() {
    return canUsePictureInPicture(this._video);
  }
  async enter() {
    return this._video.requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
  _onEnter(event) {
    this._onChange(true, event);
  }
  _onExit(event) {
    this._onChange(false, event);
  }
}

class VideoPresentation {
  constructor(_video, _media) {
    this._video = _video;
    this._media = _media;
    this._mode = "inline";
    listenEvent(this._video, "webkitpresentationmodechanged", this._onModeChange.bind(this));
  }
  get _supported() {
    return canUseVideoPresentation(this._video);
  }
  async _setPresentationMode(mode) {
    if (this._mode === mode)
      return;
    this._video.webkitSetPresentationMode(mode);
  }
  _onModeChange(event) {
    const prevMode = this._mode;
    this._mode = this._video.webkitPresentationMode;
    this._media.player?.dispatch(
      new DOMEvent("video-presentation-change", {
        detail: this._mode,
        trigger: event
      })
    );
    ["fullscreen", "picture-in-picture"].forEach((type) => {
      if (this._mode === type || prevMode === type) {
        this._media.delegate._notify(`${type}-change`, this._mode === type, event);
      }
    });
  }
}
class FullscreenPresentationAdapter {
  constructor(_presentation) {
    this._presentation = _presentation;
  }
  get active() {
    return this._presentation._mode === "fullscreen";
  }
  get supported() {
    return this._presentation._supported;
  }
  async enter() {
    this._presentation._setPresentationMode("fullscreen");
  }
  async exit() {
    this._presentation._setPresentationMode("inline");
  }
}
class PIPPresentationAdapter {
  constructor(_presentation) {
    this._presentation = _presentation;
  }
  get active() {
    return this._presentation._mode === "picture-in-picture";
  }
  get supported() {
    return this._presentation._supported;
  }
  async enter() {
    this._presentation._setPresentationMode("picture-in-picture");
  }
  async exit() {
    this._presentation._setPresentationMode("inline");
  }
}

class VideoProvider extends HTMLMediaProvider {
  constructor(video, ctx) {
    super(video, ctx);
    this.$$PROVIDER_TYPE = "VIDEO";
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(video, ctx);
      if (canUseVideoPresentation()) {
        const presentation = new VideoPresentation(video, ctx);
        this.fullscreen = new FullscreenPresentationAdapter(presentation);
        this.pictureInPicture = new PIPPresentationAdapter(presentation);
      } else if (canUsePictureInPicture()) {
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
      new NativeHLSTextTracks(this.video, this._ctx);
    }
    this._ctx.textRenderers._attachVideo(this.video);
    onDispose(() => {
      this._ctx.textRenderers._attachVideo(null);
    });
    if (this.type === "video")
      this._ctx.delegate._notify("provider-setup", this);
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this._media;
  }
}

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
      (type2) => type2 && canPlayVideoType()
    );
    const videoQuality = videoQualities.filter(
      (track) => supportedVideoMimeType === track.mimeType
    )[0];
    let audioTracks = this._instance.getTracksForTypeFromManifest(
      "audio",
      event.data
    );
    const supportedAudioMimeType = [...new Set(audioTracks.map((e) => e.mimeType))].find(
      (type2) => type2 && canPlayAudioType()
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
    this._lib = _lib;
    this._ctx = _ctx;
    this._callback = _callback;
    this._startLoading();
  }
  async _startLoading() {
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
      this._ctx.player.dispatch(new DOMEvent("dash-unsupported"));
      this._ctx.delegate._notify("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  _onLoadStart() {
    this._ctx.player.dispatch(new DOMEvent("dash-lib-load-start"));
  }
  _onLoaded(ctor) {
    this._ctx.player.dispatch(
      new DOMEvent("dash-lib-loaded", {
        detail: ctor
      })
    );
    this._callback(ctor);
  }
  _onLoadError(e) {
    const error = coerceToError(e);
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
    this._ctor = null;
    this._controller = new DASHController(this.video, this._ctx);
    this._library = `${JS_DELIVR_CDN}/npm/dashjs@4.7.4/dist/dash${".all.min.js"}`;
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

class DASHProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    this.name = "dash";
  }
  static {
    this.supported = isDASHSupported();
  }
  canPlay(src) {
    return DASHProviderLoader.supported && isDASHSrc(src);
  }
  async load(context) {
    {
      throw Error("[vidstack] can not load dash provider server-side");
    }
  }
}

class HLSProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    this.name = "hls";
  }
  static {
    this.supported = isHLSSupported();
  }
  canPlay(src) {
    return HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    {
      throw Error("[vidstack] can not load hls provider server-side");
    }
  }
}

export { DASHProviderLoader as D, HLSProviderLoader as H, QualitySymbol as Q, VideoProviderLoader as V, clampNumber as a, assert as b, coerceToError as c, getNumberOfDecimalPlaces as g, round as r };
