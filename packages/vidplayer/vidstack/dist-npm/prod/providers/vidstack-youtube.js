import { t as createScope, f as signal, g as effect, i as isString, v as isObject, j as isNumber, b as isBoolean } from '../chunks/vidstack-CBNXqr3M.js';
import '../chunks/vidstack-DopyK5ml.js';
import { T as TimeRange } from '../chunks/vidstack-C5IKOUzO.js';
import '../chunks/vidstack-THZVvA_p.js';
import { p as preconnect } from '../chunks/vidstack-BTmcG2zk.js';
import { E as EmbedProvider, t as timedPromise } from '../chunks/vidstack-DE9VIItP.js';
import { resolveYouTubeVideoId } from '../chunks/vidstack-DscYSLiW.js';
import '../chunks/vidstack-VrKElWm_.js';
import '../chunks/vidstack-DlGT_9qi.js';

const YouTubePlayerState = {
  Om: -1,
  pg: 0,
  qg: 1,
  gj: 2,
  hj: 3,
  ij: 5
};

class YouTubeProvider extends EmbedProvider {
  constructor(iframe, _ctx) {
    super(iframe);
    this.b = _ctx;
    this.$$PROVIDER_TYPE = "YOUTUBE";
    this.scope = createScope();
    this.ha = signal("");
    this.za = -1;
    this.md = -1;
    this.vc = false;
    this.ga = 0;
    this.ba = new TimeRange(0, 0);
    this.K = null;
    this.I = null;
    this.R = null;
    this.language = "en";
    this.color = "red";
    this.cookies = false;
  }
  get c() {
    return this.b.delegate.c;
  }
  get currentSrc() {
    return this.K;
  }
  get type() {
    return "youtube";
  }
  get videoId() {
    return this.ha();
  }
  preconnect() {
    preconnect(this.Nb());
  }
  setup() {
    super.setup();
    effect(this.we.bind(this));
    this.c("provider-setup", this);
  }
  async play() {
    const { paused } = this.b.$state;
    if (!this.I) {
      this.I = timedPromise(() => {
        this.I = null;
        if (paused())
          return "Timed out.";
      });
      this.t("playVideo");
    }
    return this.I.promise;
  }
  async pause() {
    const { paused } = this.b.$state;
    if (!this.R) {
      this.R = timedPromise(() => {
        this.R = null;
        if (!paused())
          ;
      });
      this.t("pauseVideo");
    }
    return this.R.promise;
  }
  setMuted(muted) {
    if (muted)
      this.t("mute");
    else
      this.t("unMute");
  }
  setCurrentTime(time) {
    this.vc = this.b.$state.paused();
    this.t("seekTo", time);
    this.c("seeking", time);
  }
  setVolume(volume) {
    this.t("setVolume", volume * 100);
  }
  setPlaybackRate(rate) {
    this.t("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this.K = null;
      this.ha.set("");
      return;
    }
    const videoId = resolveYouTubeVideoId(src.src);
    this.ha.set(videoId ?? "");
    this.K = src;
  }
  Nb() {
    return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  }
  we() {
    this.z();
    const videoId = this.ha();
    if (!videoId) {
      this.sc.set("");
      return;
    }
    this.sc.set(`${this.Nb()}/embed/${videoId}`);
    this.c("load-start");
  }
  mg() {
    const { keyDisabled } = this.b.$props, { muted, playsInline, nativeControls } = this.b.$state, showControls = nativeControls();
    return {
      autoplay: 0,
      cc_lang_pref: this.language,
      cc_load_policy: showControls ? 1 : void 0,
      color: this.color,
      controls: showControls ? 1 : 0,
      disablekb: !showControls || keyDisabled() ? 1 : 0,
      enablejsapi: 1,
      fs: 1,
      hl: this.language,
      iv_load_policy: showControls ? 1 : 3,
      mute: muted() ? 1 : 0,
      playsinline: playsInline() ? 1 : 0
    };
  }
  t(command, arg) {
    this.se({
      event: "command",
      func: command,
      args: arg ? [arg] : void 0
    });
  }
  gd() {
    window.setTimeout(() => this.se({ event: "listening" }), 100);
  }
  kd(trigger) {
    this.c("loaded-metadata");
    this.c("loaded-data");
    this.b.delegate.Ga(void 0, trigger);
  }
  ib(trigger) {
    this.R?.resolve();
    this.R = null;
    this.c("pause", void 0, trigger);
  }
  mc(time, trigger) {
    const { duration, realCurrentTime } = this.b.$state, hasEnded = this.za === YouTubePlayerState.pg, boundTime = hasEnded ? duration() : time, detail = {
      currentTime: boundTime,
      played: this.uc(boundTime)
    };
    this.c("time-update", detail, trigger);
    if (!hasEnded && Math.abs(boundTime - realCurrentTime()) > 1) {
      this.c("seeking", boundTime, trigger);
    }
  }
  uc(time) {
    return this.ga >= time ? this.ba : this.ba = new TimeRange(0, this.ga = time);
  }
  nb(buffered, seekable, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable
    };
    this.c("progress", detail, trigger);
    const { seeking, realCurrentTime } = this.b.$state;
    if (seeking() && buffered > realCurrentTime()) {
      this.ob(trigger);
    }
  }
  ob(trigger) {
    const { paused, realCurrentTime } = this.b.$state;
    window.clearTimeout(this.md);
    this.md = window.setTimeout(
      () => {
        this.c("seeked", realCurrentTime(), trigger);
        this.md = -1;
      },
      paused() ? 100 : 0
    );
    this.vc = false;
  }
  lc(trigger) {
    const { seeking } = this.b.$state;
    if (seeking())
      this.ob(trigger);
    this.c("pause", void 0, trigger);
    this.c("end", void 0, trigger);
  }
  ie(state, trigger) {
    const { started, paused, seeking } = this.b.$state, isPlaying = state === YouTubePlayerState.qg, isBuffering = state === YouTubePlayerState.hj, isPlay = (paused() || this.I) && (isBuffering || isPlaying);
    if (isBuffering)
      this.c("waiting", void 0, trigger);
    if (seeking() && isPlaying) {
      this.ob(trigger);
    }
    if (!started() && isPlay && this.vc) {
      this.I?.reject("invalid internal play operation");
      this.I = null;
      if (isPlaying) {
        this.pause();
        this.vc = false;
      }
      return;
    }
    if (isPlay) {
      this.I?.resolve();
      this.I = null;
      this.c("play", void 0, trigger);
    }
    switch (state) {
      case YouTubePlayerState.ij:
        this.kd(trigger);
        break;
      case YouTubePlayerState.qg:
        this.c("playing", void 0, trigger);
        break;
      case YouTubePlayerState.gj:
        this.ib(trigger);
        break;
      case YouTubePlayerState.pg:
        this.lc(trigger);
        break;
    }
    this.za = state;
  }
  te({ info }, event) {
    if (!info)
      return;
    const { title, intrinsicDuration, playbackRate } = this.b.$state;
    if (isObject(info.videoData) && info.videoData.title !== title()) {
      this.c("title-change", info.videoData.title, event);
    }
    if (isNumber(info.duration) && info.duration !== intrinsicDuration()) {
      if (isNumber(info.videoLoadedFraction)) {
        const buffered = info.progressState?.loaded ?? info.videoLoadedFraction * info.duration, seekable = new TimeRange(0, info.duration);
        this.nb(buffered, seekable, event);
      }
      this.c("duration-change", info.duration, event);
    }
    if (isNumber(info.playbackRate) && info.playbackRate !== playbackRate()) {
      this.c("rate-change", info.playbackRate, event);
    }
    if (info.progressState) {
      const {
        current,
        seekableStart,
        seekableEnd,
        loaded,
        duration: _duration
      } = info.progressState;
      this.mc(current, event);
      this.nb(loaded, new TimeRange(seekableStart, seekableEnd), event);
      if (_duration !== intrinsicDuration()) {
        this.c("duration-change", _duration, event);
      }
    }
    if (isNumber(info.volume) && isBoolean(info.muted)) {
      const detail = {
        muted: info.muted,
        volume: info.volume / 100
      };
      this.c("volume-change", detail, event);
    }
    if (isNumber(info.playerState) && info.playerState !== this.za) {
      this.ie(info.playerState, event);
    }
  }
  z() {
    this.za = -1;
    this.md = -1;
    this.ga = 0;
    this.ba = new TimeRange(0, 0);
    this.I = null;
    this.R = null;
    this.vc = false;
  }
}

export { YouTubeProvider };
