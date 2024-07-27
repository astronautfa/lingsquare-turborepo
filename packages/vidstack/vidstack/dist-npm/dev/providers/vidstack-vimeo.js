import { createScope, signal, effect, peek, isString, deferredPromise, listenEvent, isArray } from '../chunks/vidstack-fG_Sx3Q9.js';
import { QualitySymbol } from '../chunks/vidstack-BYmCj-36.js';
import { TimeRange } from '../chunks/vidstack-CLRUrTzh.js';
import { TextTrack } from '../chunks/vidstack-C_Q-YmHq.js';
import { ListSymbol } from '../chunks/vidstack-sHzLCnVW.js';
import { RAFLoop } from '../chunks/vidstack-B2NpDfPa.js';
import { preconnect } from '../chunks/vidstack-n2fuk8wF.js';
import { EmbedProvider } from '../chunks/vidstack-BnfcPk2H.js';
import { resolveVimeoVideoId, getVimeoVideoInfo } from '../chunks/vidstack-krOAtKMi.js';
import '../chunks/vidstack-C_9SlM6s.js';
import '../chunks/vidstack-C7y2WK8R.js';

const trackedVimeoEvents = [
  "bufferend",
  "bufferstart",
  // 'cuechange',
  "durationchange",
  "ended",
  "enterpictureinpicture",
  "error",
  "fullscreenchange",
  "leavepictureinpicture",
  "loaded",
  // 'loadeddata',
  // 'loadedmetadata',
  // 'loadstart',
  "playProgress",
  "loadProgress",
  "pause",
  "play",
  "playbackratechange",
  // 'progress',
  "qualitychange",
  "seeked",
  "seeking",
  // 'texttrackchange',
  "timeupdate",
  "volumechange",
  "waiting"
  // 'adstarted',
  // 'adcompleted',
  // 'aderror',
  // 'adskipped',
  // 'adallcompleted',
  // 'adclicked',
  // 'chapterchange',
  // 'chromecastconnected',
  // 'remoteplaybackavailabilitychange',
  // 'remoteplaybackconnecting',
  // 'remoteplaybackconnect',
  // 'remoteplaybackdisconnect',
  // 'liveeventended',
  // 'liveeventstarted',
  // 'livestreamoffline',
  // 'livestreamonline',
];

class VimeoProvider extends EmbedProvider {
  constructor(iframe, _ctx) {
    super(iframe);
    this._ctx = _ctx;
    this.$$PROVIDER_TYPE = "VIMEO";
    this.scope = createScope();
    this._videoId = signal("");
    this._pro = signal(false);
    this._hash = null;
    this._currentSrc = null;
    this._fullscreenActive = false;
    this._seekableRange = new TimeRange(0, 0);
    this._timeRAF = new RAFLoop(this._onAnimationFrame.bind(this));
    this._currentCue = null;
    this._chaptersTrack = null;
    this._promises = /* @__PURE__ */ new Map();
    this._videoInfoPromise = null;
    /**
     * Whether tracking session data should be enabled on the embed, including cookies and analytics.
     * This is turned off by default to be GDPR-compliant.
     *
     * @defaultValue `false`
     */
    this.cookies = false;
    this.title = true;
    this.byline = true;
    this.portrait = true;
    this.color = "00ADEF";
    // Embed will sometimes dispatch 0 at end of playback.
    this._preventTimeUpdates = false;
    const self = this;
    this.fullscreen = {
      get active() {
        return self._fullscreenActive;
      },
      supported: true,
      enter: () => this._remote("requestFullscreen"),
      exit: () => this._remote("exitFullscreen")
    };
  }
  get _notify() {
    return this._ctx.delegate._notify;
  }
  get type() {
    return "vimeo";
  }
  get currentSrc() {
    return this._currentSrc;
  }
  get videoId() {
    return this._videoId();
  }
  get hash() {
    return this._hash;
  }
  get isPro() {
    return this._pro();
  }
  preconnect() {
    preconnect(this._getOrigin());
  }
  setup() {
    super.setup();
    effect(this._watchVideoId.bind(this));
    effect(this._watchVideoInfo.bind(this));
    effect(this._watchPro.bind(this));
    this._notify("provider-setup", this);
  }
  destroy() {
    this._reset();
    this.fullscreen = void 0;
    const message = "provider destroyed";
    for (const promises of this._promises.values()) {
      for (const { reject } of promises) reject(message);
    }
    this._promises.clear();
    this._remote("destroy");
  }
  async play() {
    return this._remote("play");
  }
  async pause() {
    return this._remote("pause");
  }
  setMuted(muted) {
    this._remote("setMuted", muted);
  }
  setCurrentTime(time) {
    this._remote("seekTo", time);
    this._notify("seeking", time);
  }
  setVolume(volume) {
    this._remote("setVolume", volume);
    this._remote("setMuted", peek(this._ctx.$state.muted));
  }
  setPlaybackRate(rate) {
    this._remote("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this._currentSrc = null;
      this._hash = null;
      this._videoId.set("");
      return;
    }
    const { videoId, hash } = resolveVimeoVideoId(src.src);
    this._videoId.set(videoId ?? "");
    this._hash = hash ?? null;
    this._currentSrc = src;
  }
  _watchVideoId() {
    this._reset();
    const videoId = this._videoId();
    if (!videoId) {
      this._src.set("");
      return;
    }
    this._src.set(`${this._getOrigin()}/video/${videoId}`);
    this._notify("load-start");
  }
  _watchVideoInfo() {
    const videoId = this._videoId();
    if (!videoId) return;
    const promise = deferredPromise(), abort = new AbortController();
    this._videoInfoPromise = promise;
    getVimeoVideoInfo(videoId, abort, this._hash).then((info) => {
      promise.resolve(info);
    }).catch((e) => {
      promise.reject();
      {
        this._ctx.logger?.warnGroup(`Failed to fetch vimeo video info for id \`${videoId}\`.`).labelledLog("Error", e).dispatch();
      }
    });
    return () => {
      promise.reject();
      abort.abort();
    };
  }
  _watchPro() {
    const isPro = this._pro(), { $state, qualities } = this._ctx;
    $state.canSetPlaybackRate.set(isPro);
    qualities[ListSymbol._setReadonly](!isPro);
    if (isPro) {
      return listenEvent(qualities, "change", () => {
        if (qualities.auto) return;
        const id = qualities.selected?.id;
        if (id) this._remote("setQuality", id);
      });
    }
  }
  _getOrigin() {
    return "https://player.vimeo.com";
  }
  _buildParams() {
    const { keyDisabled } = this._ctx.$props, { playsInline, nativeControls } = this._ctx.$state, showControls = nativeControls();
    return {
      title: this.title,
      byline: this.byline,
      color: this.color,
      portrait: this.portrait,
      controls: showControls,
      h: this.hash,
      keyboard: showControls && !keyDisabled(),
      transparent: true,
      playsinline: playsInline(),
      dnt: !this.cookies
    };
  }
  _onAnimationFrame() {
    this._remote("getCurrentTime");
  }
  _onTimeUpdate(time, trigger) {
    if (this._preventTimeUpdates && time === 0) return;
    const { realCurrentTime, realDuration, paused, bufferedEnd } = this._ctx.$state;
    if (realCurrentTime() === time) return;
    const prevTime = realCurrentTime();
    this._notify("time-change", time, trigger);
    if (Math.abs(prevTime - time) > 1.5) {
      this._notify("seeking", time, trigger);
      if (!paused() && bufferedEnd() < time) {
        this._notify("waiting", void 0, trigger);
      }
    }
    if (realDuration() - time < 0.01) {
      this._notify("end", void 0, trigger);
      this._preventTimeUpdates = true;
      setTimeout(() => {
        this._preventTimeUpdates = false;
      }, 500);
    }
  }
  _onSeeked(time, trigger) {
    this._notify("seeked", time, trigger);
  }
  _onLoaded(trigger) {
    const videoId = this._videoId();
    this._videoInfoPromise?.promise.then((info) => {
      if (!info) return;
      const { title, poster, duration, pro } = info;
      this._pro.set(pro);
      this._notify("title-change", title, trigger);
      this._notify("poster-change", poster, trigger);
      this._notify("duration-change", duration, trigger);
      this._onReady(duration, trigger);
    }).catch(() => {
      if (videoId !== this._videoId()) return;
      this._remote("getVideoTitle");
      this._remote("getDuration");
    });
  }
  _onReady(duration, trigger) {
    const { nativeControls } = this._ctx.$state, showEmbedControls = nativeControls();
    this._seekableRange = new TimeRange(0, duration);
    const detail = {
      buffered: new TimeRange(0, 0),
      seekable: this._seekableRange,
      duration
    };
    this._ctx.delegate._ready(detail, trigger);
    if (!showEmbedControls) {
      this._remote("_hideOverlay");
    }
    this._remote("getQualities");
    this._remote("getChapters");
  }
  _onMethod(method, data, trigger) {
    switch (method) {
      case "getVideoTitle":
        const videoTitle = data;
        this._notify("title-change", videoTitle, trigger);
        break;
      case "getDuration":
        const duration = data;
        if (!this._ctx.$state.canPlay()) {
          this._onReady(duration, trigger);
        } else {
          this._notify("duration-change", duration, trigger);
        }
        break;
      case "getCurrentTime":
        this._onTimeUpdate(data, trigger);
        break;
      case "getBuffered":
        if (isArray(data) && data.length) {
          this._onLoadProgress(data[data.length - 1][1], trigger);
        }
        break;
      case "setMuted":
        this._onVolumeChange(peek(this._ctx.$state.volume), data, trigger);
        break;
      case "getChapters":
        this._onChaptersChange(data);
        break;
      case "getQualities":
        this._onQualitiesChange(data, trigger);
        break;
    }
    this._getPromise(method)?.resolve();
  }
  _attachListeners() {
    for (const type of trackedVimeoEvents) {
      this._remote("addEventListener", type);
    }
  }
  _onPause(trigger) {
    this._timeRAF._stop();
    this._notify("pause", void 0, trigger);
  }
  _onPlay(trigger) {
    this._timeRAF._start();
    this._notify("play", void 0, trigger);
  }
  _onPlayProgress(trigger) {
    const { paused } = this._ctx.$state;
    if (!paused() && !this._preventTimeUpdates) {
      this._notify("playing", void 0, trigger);
    }
  }
  _onLoadProgress(buffered, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable: this._seekableRange
    };
    this._notify("progress", detail, trigger);
  }
  _onBufferStart(trigger) {
    this._notify("waiting", void 0, trigger);
  }
  _onBufferEnd(trigger) {
    const { paused } = this._ctx.$state;
    if (!paused()) this._notify("playing", void 0, trigger);
  }
  _onWaiting(trigger) {
    const { paused } = this._ctx.$state;
    if (paused()) {
      this._notify("play", void 0, trigger);
    }
    this._notify("waiting", void 0, trigger);
  }
  _onVolumeChange(volume, muted, trigger) {
    const detail = { volume, muted };
    this._notify("volume-change", detail, trigger);
  }
  // protected _onTextTrackChange(track: VimeoTextTrack, trigger: Event) {
  //   const textTrack = this._ctx.textTracks.toArray().find((t) => t.language === track.language);
  //   if (textTrack) textTrack.mode = track.mode;
  // }
  // protected _onTextTracksChange(tracks: VimeoTextTrack[], trigger: Event) {
  //   for (const init of tracks) {
  //     const textTrack = new TextTrack({
  //       ...init,
  //       label: init.label.replace('auto-generated', 'auto'),
  //     });
  //     textTrack[TextTrackSymbol._readyState] = 2;
  //     this._ctx.textTracks.add(textTrack, trigger);
  //     textTrack.setMode(init.mode, trigger);
  //   }
  // }
  // protected _onCueChange(cue: VimeoTextCue, trigger: Event) {
  //   const { textTracks, $state } = this._ctx,
  //     { currentTime } = $state,
  //     track = textTracks.selected;
  //   if (this._currentCue) track?.removeCue(this._currentCue, trigger);
  //   this._currentCue = new window.VTTCue(currentTime(), Number.MAX_SAFE_INTEGER, cue.text);
  //   track?.addCue(this._currentCue, trigger);
  // }
  _onChaptersChange(chapters) {
    this._removeChapters();
    if (!chapters.length) return;
    const track = new TextTrack({
      kind: "chapters",
      default: true
    }), { realDuration } = this._ctx.$state;
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i], nextChapter = chapters[i + 1];
      track.addCue(
        new window.VTTCue(
          chapter.startTime,
          nextChapter?.startTime ?? realDuration(),
          chapter.title
        )
      );
    }
    this._chaptersTrack = track;
    this._ctx.textTracks.add(track);
  }
  _removeChapters() {
    if (!this._chaptersTrack) return;
    this._ctx.textTracks.remove(this._chaptersTrack);
    this._chaptersTrack = null;
  }
  _onQualitiesChange(qualities, trigger) {
    this._ctx.qualities[QualitySymbol._enableAuto] = qualities.some((q) => q.id === "auto") ? () => this._remote("setQuality", "auto") : void 0;
    for (const quality of qualities) {
      if (quality.id === "auto") continue;
      const height = +quality.id.slice(0, -1);
      if (isNaN(height)) continue;
      this._ctx.qualities[ListSymbol._add](
        {
          id: quality.id,
          width: height * (16 / 9),
          height,
          codec: "avc1,h.264",
          bitrate: -1
        },
        trigger
      );
    }
    this._onQualityChange(
      qualities.find((q) => q.active),
      trigger
    );
  }
  _onQualityChange({ id } = {}, trigger) {
    if (!id) return;
    const isAuto = id === "auto", newQuality = this._ctx.qualities.getById(id);
    if (isAuto) {
      this._ctx.qualities[QualitySymbol._setAuto](isAuto, trigger);
      this._ctx.qualities[ListSymbol._select](void 0, true, trigger);
    } else {
      this._ctx.qualities[ListSymbol._select](newQuality ?? void 0, true, trigger);
    }
  }
  _onEvent(event, payload, trigger) {
    switch (event) {
      case "ready":
        this._attachListeners();
        break;
      case "loaded":
        this._onLoaded(trigger);
        break;
      case "play":
        this._onPlay(trigger);
        break;
      case "playProgress":
        this._onPlayProgress(trigger);
        break;
      case "pause":
        this._onPause(trigger);
        break;
      case "loadProgress":
        this._onLoadProgress(payload.seconds, trigger);
        break;
      case "waiting":
        this._onWaiting(trigger);
        break;
      case "bufferstart":
        this._onBufferStart(trigger);
        break;
      case "bufferend":
        this._onBufferEnd(trigger);
        break;
      case "volumechange":
        this._onVolumeChange(payload.volume, peek(this._ctx.$state.muted), trigger);
        break;
      case "durationchange":
        this._seekableRange = new TimeRange(0, payload.duration);
        this._notify("duration-change", payload.duration, trigger);
        break;
      case "playbackratechange":
        this._notify("rate-change", payload.playbackRate, trigger);
        break;
      case "qualitychange":
        this._onQualityChange(payload, trigger);
        break;
      case "fullscreenchange":
        this._fullscreenActive = payload.fullscreen;
        this._notify("fullscreen-change", payload.fullscreen, trigger);
        break;
      case "enterpictureinpicture":
        this._notify("picture-in-picture-change", true, trigger);
        break;
      case "leavepictureinpicture":
        this._notify("picture-in-picture-change", false, trigger);
        break;
      case "ended":
        this._notify("end", void 0, trigger);
        break;
      case "error":
        this._onError(payload, trigger);
        break;
      case "seek":
      case "seeked":
        this._onSeeked(payload.seconds, trigger);
        break;
    }
  }
  _onError(error, trigger) {
    const { message, method } = error;
    if (method === "setPlaybackRate") {
      this._pro.set(false);
    }
    if (method) {
      this._getPromise(method)?.reject(message);
    }
    {
      this._ctx.logger?.errorGroup(`[vimeo]: ${message}`).labelledLog("Error", error).labelledLog("Provider", this).labelledLog("Event", trigger).dispatch();
    }
  }
  _onMessage(message, event) {
    if (message.event) {
      this._onEvent(message.event, message.data, event);
    } else if (message.method) {
      this._onMethod(message.method, message.value, event);
    }
  }
  _onLoad() {
  }
  async _remote(command, arg) {
    let promise = deferredPromise(), promises = this._promises.get(command);
    if (!promises) this._promises.set(command, promises = []);
    promises.push(promise);
    this._postMessage({
      method: command,
      value: arg
    });
    return promise.promise;
  }
  _reset() {
    this._timeRAF._stop();
    this._seekableRange = new TimeRange(0, 0);
    this._videoInfoPromise = null;
    this._currentCue = null;
    this._pro.set(false);
    this._removeChapters();
  }
  _getPromise(command) {
    return this._promises.get(command)?.shift();
  }
}

export { VimeoProvider };
