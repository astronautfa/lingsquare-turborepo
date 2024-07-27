"use client"

import { createScope, signal, effect, isString, deferredPromise, isUndefined, isObject, isNumber, isBoolean } from './vidstack-DcuYVyd0.js';
import { preconnect, TimeRange } from './vidstack-DVfG6VuV.js';
import { EmbedProvider } from './vidstack-BRKTEaRe.js';
import { resolveYouTubeVideoId } from './vidstack-Zc3I7oOd.js';
import 'react';
import '@floating-ui/dom';

const YouTubePlayerState = {
  Pm: -1,
  qg: 0,
  rg: 1,
  hj: 2,
  ij: 3,
  jj: 5
};

class YouTubeProvider extends EmbedProvider {
  constructor(iframe, _ctx) {
    super(iframe);
    this.b = _ctx;
    this.$$PROVIDER_TYPE = "YOUTUBE";
    this.scope = createScope();
    this.ia = signal("");
    this.Aa = -1;
    this.L = null;
    this.nd = -1;
    this.wc = false;
    this.$n = /* @__PURE__ */ new Map();
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
     * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
     * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular
     * user based on the user's individual language preferences and the availability of caption tracks.
     *
     * @defaultValue 'en'
     */
    this.language = "en";
    this.color = "red";
    /**
     * Whether cookies should be enabled on the embed. This is turned off by default to be
     * GDPR-compliant.
     *
     * @defaultValue `false`
     */
    this.cookies = false;
  }
  get c() {
    return this.b.delegate.c;
  }
  get currentSrc() {
    return this.L;
  }
  get type() {
    return "youtube";
  }
  get videoId() {
    return this.ia();
  }
  preconnect() {
    preconnect(this.Ob());
  }
  setup() {
    super.setup();
    effect(this.xe.bind(this));
    this.c("provider-setup", this);
  }
  destroy() {
    this.A();
    const message = "provider destroyed";
    for (const promises of this.$n.values()) {
      for (const { reject } of promises) reject(message);
    }
    this.$n.clear();
  }
  async play() {
    return this.u("playVideo");
  }
  On(message) {
    this.ao("playVideo")?.reject(message);
  }
  async pause() {
    return this.u("pauseVideo");
  }
  Pn(message) {
    this.ao("pauseVideo")?.reject(message);
  }
  setMuted(muted) {
    if (muted) this.u("mute");
    else this.u("unMute");
  }
  setCurrentTime(time) {
    this.wc = this.b.$state.paused();
    this.u("seekTo", time);
    this.c("seeking", time);
  }
  setVolume(volume) {
    this.u("setVolume", volume * 100);
  }
  setPlaybackRate(rate) {
    this.u("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this.L = null;
      this.ia.set("");
      return;
    }
    const videoId = resolveYouTubeVideoId(src.src);
    this.ia.set(videoId ?? "");
    this.L = src;
  }
  Ob() {
    return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  }
  xe() {
    this.A();
    const videoId = this.ia();
    if (!videoId) {
      this.tc.set("");
      return;
    }
    this.tc.set(`${this.Ob()}/embed/${videoId}`);
    this.c("load-start");
  }
  ng() {
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
  u(command, arg) {
    let promise = deferredPromise(), promises = this.$n.get(command);
    if (!promises) this.$n.set(command, promises = []);
    promises.push(promise);
    this.te({
      event: "command",
      func: command,
      args: arg ? [arg] : void 0
    });
    return promise.promise;
  }
  hd() {
    window.setTimeout(() => this.te({ event: "listening" }), 100);
  }
  ld(trigger) {
    this.c("loaded-metadata");
    this.c("loaded-data");
    this.b.delegate.Ha(void 0, trigger);
  }
  jb(trigger) {
    this.ao("pauseVideo")?.resolve();
    this.c("pause", void 0, trigger);
  }
  nc(time, trigger) {
    const { duration, realCurrentTime } = this.b.$state, hasEnded = this.Aa === YouTubePlayerState.qg, boundTime = hasEnded ? duration() : time;
    this.c("time-change", boundTime, trigger);
    if (!hasEnded && Math.abs(boundTime - realCurrentTime()) > 1) {
      this.c("seeking", boundTime, trigger);
    }
  }
  ob(buffered, seekable, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable
    };
    this.c("progress", detail, trigger);
    const { seeking, realCurrentTime } = this.b.$state;
    if (seeking() && buffered > realCurrentTime()) {
      this.pb(trigger);
    }
  }
  pb(trigger) {
    const { paused, realCurrentTime } = this.b.$state;
    window.clearTimeout(this.nd);
    this.nd = window.setTimeout(
      () => {
        this.c("seeked", realCurrentTime(), trigger);
        this.nd = -1;
      },
      paused() ? 100 : 0
    );
    this.wc = false;
  }
  mc(trigger) {
    const { seeking } = this.b.$state;
    if (seeking()) this.pb(trigger);
    this.c("pause", void 0, trigger);
    this.c("end", void 0, trigger);
  }
  je(state, trigger) {
    const { started, paused, seeking } = this.b.$state, isPlaying = state === YouTubePlayerState.rg, isBuffering = state === YouTubePlayerState.ij, isPendingPlay = !isUndefined(this.ao("playVideo")), isPlay = (paused() || isPendingPlay) && (isBuffering || isPlaying);
    if (isBuffering) this.c("waiting", void 0, trigger);
    if (seeking() && isPlaying) {
      this.pb(trigger);
    }
    if (!started() && isPlay && this.wc) {
      this.On("invalid internal play operation");
      if (isPlaying) {
        this.pause();
        this.wc = false;
      }
      return;
    }
    if (isPlay) {
      this.ao("playVideo")?.resolve();
      this.c("play", void 0, trigger);
    }
    switch (state) {
      case YouTubePlayerState.Pm:
        this.On("provider rejected");
        this.Pn("provider rejected");
        this.c("pause", void 0, trigger);
        break;
      case YouTubePlayerState.jj:
        this.ld(trigger);
        break;
      case YouTubePlayerState.rg:
        this.c("playing", void 0, trigger);
        break;
      case YouTubePlayerState.hj:
        this.jb(trigger);
        break;
      case YouTubePlayerState.qg:
        this.mc(trigger);
        break;
    }
    this.Aa = state;
  }
  ue({ info }, event) {
    if (!info) return;
    const { title, intrinsicDuration, playbackRate } = this.b.$state;
    if (isObject(info.videoData) && info.videoData.title !== title()) {
      this.c("title-change", info.videoData.title, event);
    }
    if (isNumber(info.duration) && info.duration !== intrinsicDuration()) {
      if (isNumber(info.videoLoadedFraction)) {
        const buffered = info.progressState?.loaded ?? info.videoLoadedFraction * info.duration, seekable = new TimeRange(0, info.duration);
        this.ob(buffered, seekable, event);
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
      this.nc(current, event);
      this.ob(loaded, new TimeRange(seekableStart, seekableEnd), event);
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
    if (isNumber(info.playerState) && info.playerState !== this.Aa) {
      this.je(info.playerState, event);
    }
  }
  A() {
    this.Aa = -1;
    this.nd = -1;
    this.wc = false;
  }
  ao(command) {
    return this.$n.get(command)?.shift();
  }
}

export { YouTubeProvider };
