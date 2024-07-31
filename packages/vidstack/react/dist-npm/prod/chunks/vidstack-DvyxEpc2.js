"use client"

import { d as createScope, s as signal, e as effect, p as peek, i as isString, f as deferredPromise, l as listenEvent, g as isArray } from './vidstack-wClXxc1a.js';
import { T as TimeRange, R as RAFLoop, p as preconnect, L as ListSymbol, b as TextTrack, Q as QualitySymbol } from './vidstack-1EoJRWh6.js';
import { E as EmbedProvider, t as timedPromise } from './vidstack-DdHOTkh5.js';
import { resolveVimeoVideoId, getVimeoVideoInfo } from './vidstack-BInq9zTH.js';
import 'react';

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
    this.b = _ctx;
    this.$$PROVIDER_TYPE = "VIMEO";
    this.scope = createScope();
    this.ha = 0;
    this.ca = new TimeRange(0, 0);
    this.Ba = new TimeRange(0, 0);
    this.J = null;
    this.S = null;
    this.ve = null;
    this.ia = signal("");
    this.uc = signal(false);
    this.we = null;
    this.L = null;
    this.Zi = null;
    this.ga = new RAFLoop(this.lc.bind(this));
    this.jd = null;
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
    this.kd = false;
  }
  get c() {
    return this.b.delegate.c;
  }
  get type() {
    return "vimeo";
  }
  get currentSrc() {
    return this.L;
  }
  get videoId() {
    return this.ia();
  }
  get hash() {
    return this.we;
  }
  get isPro() {
    return this.uc();
  }
  preconnect() {
    preconnect(this.Ob());
  }
  setup() {
    super.setup();
    effect(this.xe.bind(this));
    effect(this._i.bind(this));
    effect(this.$i.bind(this));
    this.c("provider-setup", this);
  }
  destroy() {
    this.A();
    this.u("destroy");
  }
  async play() {
    const { paused } = this.b.$state;
    if (!this.J) {
      this.J = timedPromise(() => {
        this.J = null;
        if (paused())
          return "Timed out.";
      });
      this.u("play");
    }
    return this.J.promise;
  }
  async pause() {
    const { paused } = this.b.$state;
    if (!this.S) {
      this.S = timedPromise(() => {
        this.S = null;
        if (!paused())
          return "Timed out.";
      });
      this.u("pause");
    }
    return this.S.promise;
  }
  setMuted(muted) {
    this.u("setMuted", muted);
  }
  setCurrentTime(time) {
    this.u("seekTo", time);
    this.c("seeking", time);
  }
  setVolume(volume) {
    this.u("setVolume", volume);
    this.u("setMuted", peek(this.b.$state.muted));
  }
  setPlaybackRate(rate) {
    this.u("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this.L = null;
      this.we = null;
      this.ia.set("");
      return;
    }
    const { videoId, hash } = resolveVimeoVideoId(src.src);
    this.ia.set(videoId ?? "");
    this.we = hash ?? null;
    this.L = src;
  }
  xe() {
    this.A();
    const videoId = this.ia();
    if (!videoId) {
      this.tc.set("");
      return;
    }
    this.tc.set(`${this.Ob()}/video/${videoId}`);
    this.c("load-start");
  }
  _i() {
    const videoId = this.ia();
    if (!videoId)
      return;
    const promise = deferredPromise(), abort = new AbortController();
    this.ve = promise;
    getVimeoVideoInfo(videoId, abort, this.we).then((info) => {
      promise.resolve(info);
    }).catch((e) => {
      promise.reject();
    });
    return () => {
      promise.reject();
      abort.abort();
    };
  }
  $i() {
    const isPro = this.uc(), { $state, qualities } = this.b;
    $state.canSetPlaybackRate.set(isPro);
    qualities[ListSymbol.Pd](!isPro);
    if (isPro) {
      return listenEvent(qualities, "change", () => {
        if (qualities.auto)
          return;
        const id = qualities.selected?.id;
        if (id)
          this.u("setQuality", id);
      });
    }
  }
  Ob() {
    return "https://player.vimeo.com";
  }
  ng() {
    const { keyDisabled } = this.b.$props, { playsInline, nativeControls } = this.b.$state, showControls = nativeControls();
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
  lc() {
    this.u("getCurrentTime");
  }
  nc(time, trigger) {
    if (this.kd && time === 0)
      return;
    const { realCurrentTime, realDuration, paused, bufferedEnd } = this.b.$state;
    if (realCurrentTime() === time)
      return;
    const prevTime = realCurrentTime(), detail = {
      currentTime: time,
      played: this.vc(time)
    };
    this.c("time-update", detail, trigger);
    if (Math.abs(prevTime - time) > 1.5) {
      this.c("seeking", time, trigger);
      if (!paused() && bufferedEnd() < time) {
        this.c("waiting", void 0, trigger);
      }
    }
    if (realDuration() - time < 0.01) {
      this.c("end", void 0, trigger);
      this.kd = true;
      setTimeout(() => {
        this.kd = false;
      }, 500);
    }
  }
  vc(time) {
    return this.ha >= time ? this.ca : this.ca = new TimeRange(0, this.ha = time);
  }
  pb(time, trigger) {
    this.c("seeked", time, trigger);
  }
  ub(trigger) {
    const videoId = this.ia();
    this.ve?.promise.then((info) => {
      if (!info)
        return;
      const { title, poster, duration, pro } = info;
      this.uc.set(pro);
      this.c("title-change", title, trigger);
      this.c("poster-change", poster, trigger);
      this.c("duration-change", duration, trigger);
      this.ld(duration, trigger);
    }).catch(() => {
      if (videoId !== this.ia())
        return;
      this.u("getVideoTitle");
      this.u("getDuration");
    });
  }
  ld(duration, trigger) {
    const { nativeControls } = this.b.$state, showEmbedControls = nativeControls();
    this.Ba = new TimeRange(0, duration);
    const detail = {
      buffered: new TimeRange(0, 0),
      seekable: this.Ba,
      duration
    };
    this.b.delegate.Ha(detail, trigger);
    if (!showEmbedControls) {
      this.u("_hideOverlay");
    }
    this.u("getQualities");
    this.u("getChapters");
  }
  aj(method, data, trigger) {
    switch (method) {
      case "getVideoTitle":
        const videoTitle = data;
        this.c("title-change", videoTitle, trigger);
        break;
      case "getDuration":
        const duration = data;
        if (!this.b.$state.canPlay()) {
          this.ld(duration, trigger);
        } else {
          this.c("duration-change", duration, trigger);
        }
        break;
      case "getCurrentTime":
        this.nc(data, trigger);
        break;
      case "getBuffered":
        if (isArray(data) && data.length) {
          this.og(data[data.length - 1][1], trigger);
        }
        break;
      case "setMuted":
        this.Oa(peek(this.b.$state.volume), data, trigger);
        break;
      case "getChapters":
        this.bj(data);
        break;
      case "getQualities":
        this.md(data, trigger);
        break;
    }
  }
  cj() {
    for (const type of trackedVimeoEvents) {
      this.u("addEventListener", type);
    }
  }
  jb(trigger) {
    this.ga.aa();
    this.c("pause", void 0, trigger);
    this.S?.resolve();
    this.S = null;
  }
  hc(trigger) {
    this.ga.Ya();
    this.c("play", void 0, trigger);
    this.J?.resolve();
    this.J = null;
  }
  dj(trigger) {
    const { paused } = this.b.$state;
    if (!paused() && !this.kd) {
      this.c("playing", void 0, trigger);
    }
  }
  og(buffered, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable: this.Ba
    };
    this.c("progress", detail, trigger);
  }
  ej(trigger) {
    this.c("waiting", void 0, trigger);
  }
  fj(trigger) {
    const { paused } = this.b.$state;
    if (!paused())
      this.c("playing", void 0, trigger);
  }
  fe(trigger) {
    const { paused } = this.b.$state;
    if (paused()) {
      this.c("play", void 0, trigger);
    }
    this.c("waiting", void 0, trigger);
  }
  Oa(volume, muted, trigger) {
    const detail = { volume, muted };
    this.c("volume-change", detail, trigger);
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
  bj(chapters) {
    this.pg();
    if (!chapters.length)
      return;
    const track = new TextTrack({
      kind: "chapters",
      default: true
    }), { realDuration } = this.b.$state;
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
    this.jd = track;
    this.b.textTracks.add(track);
  }
  pg() {
    if (!this.jd)
      return;
    this.b.textTracks.remove(this.jd);
    this.jd = null;
  }
  md(qualities, trigger) {
    this.b.qualities[QualitySymbol.Ja] = qualities.some((q) => q.id === "auto") ? () => this.u("setQuality", "auto") : void 0;
    for (const quality of qualities) {
      if (quality.id === "auto")
        continue;
      const height = +quality.id.slice(0, -1);
      if (isNaN(height))
        continue;
      this.b.qualities[ListSymbol.ea](
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
    this._a(
      qualities.find((q) => q.active),
      trigger
    );
  }
  _a({ id } = {}, trigger) {
    if (!id)
      return;
    const isAuto = id === "auto", newQuality = this.b.qualities.getById(id);
    if (isAuto) {
      this.b.qualities[QualitySymbol.Xa](isAuto, trigger);
      this.b.qualities[ListSymbol.fa](void 0, true, trigger);
    } else {
      this.b.qualities[ListSymbol.fa](newQuality ?? void 0, true, trigger);
    }
  }
  gj(event, payload, trigger) {
    switch (event) {
      case "ready":
        this.cj();
        break;
      case "loaded":
        this.ub(trigger);
        break;
      case "play":
        this.hc(trigger);
        break;
      case "playProgress":
        this.dj(trigger);
        break;
      case "pause":
        this.jb(trigger);
        break;
      case "loadProgress":
        this.og(payload.seconds, trigger);
        break;
      case "waiting":
        this.fe(trigger);
        break;
      case "bufferstart":
        this.ej(trigger);
        break;
      case "bufferend":
        this.fj(trigger);
        break;
      case "volumechange":
        this.Oa(payload.volume, peek(this.b.$state.muted), trigger);
        break;
      case "durationchange":
        this.Ba = new TimeRange(0, payload.duration);
        this.c("duration-change", payload.duration, trigger);
        break;
      case "playbackratechange":
        this.c("rate-change", payload.playbackRate, trigger);
        break;
      case "qualitychange":
        this._a(payload, trigger);
        break;
      case "fullscreenchange":
        this.c("fullscreen-change", payload.fullscreen, trigger);
        break;
      case "enterpictureinpicture":
        this.c("picture-in-picture-change", true, trigger);
        break;
      case "leavepictureinpicture":
        this.c("picture-in-picture-change", false, trigger);
        break;
      case "ended":
        this.c("end", void 0, trigger);
        break;
      case "error":
        this.R(payload, trigger);
        break;
      case "seek":
      case "seeked":
        this.pb(payload.seconds, trigger);
        break;
    }
  }
  R(error, trigger) {
    if (error.method === "setPlaybackRate") {
      this.uc.set(false);
    }
    if (error.method === "play") {
      this.J?.reject(error.message);
      return;
    }
  }
  ue(message, event) {
    if (message.event) {
      this.gj(message.event, message.data, event);
    } else if (message.method) {
      this.aj(message.method, message.value, event);
    }
  }
  hd() {
  }
  u(command, arg) {
    return this.te({
      method: command,
      value: arg
    });
  }
  A() {
    this.ga.aa();
    this.ha = 0;
    this.ca = new TimeRange(0, 0);
    this.Ba = new TimeRange(0, 0);
    this.J = null;
    this.S = null;
    this.ve = null;
    this.Zi = null;
    this.uc.set(false);
    this.pg();
  }
}

export { VimeoProvider };
