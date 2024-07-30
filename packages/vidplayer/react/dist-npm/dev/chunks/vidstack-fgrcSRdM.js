"use client"

import { d as createScope, s as signal, e as effect, i as isString, h as isObject, j as isNumber, k as isBoolean } from './vidstack-DwBltyvo.js';
import { T as TimeRange, p as preconnect } from './vidstack-DLTRlLRp.js';
import { E as EmbedProvider, t as timedPromise } from './vidstack-CPsBHVXg.js';
import { resolveYouTubeVideoId } from './vidstack-DscYSLiW.js';
import 'react';

const YouTubePlayerState = {
  _Unstarted: -1,
  _Ended: 0,
  _Playing: 1,
  _Paused: 2,
  _Buffering: 3,
  _Cued: 5
};

class YouTubeProvider extends EmbedProvider {
  constructor(iframe, _ctx) {
    super(iframe);
    this._ctx = _ctx;
    this.$$PROVIDER_TYPE = "YOUTUBE";
    this.scope = createScope();
    this._videoId = signal("");
    this._state = -1;
    this._seekingTimer = -1;
    this._pausedSeeking = false;
    this._played = 0;
    this._playedRange = new TimeRange(0, 0);
    this._currentSrc = null;
    this._playPromise = null;
    this._pausePromise = null;
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
  get _notify() {
    return this._ctx.delegate._notify;
  }
  get currentSrc() {
    return this._currentSrc;
  }
  get type() {
    return "youtube";
  }
  get videoId() {
    return this._videoId();
  }
  preconnect() {
    preconnect(this._getOrigin());
  }
  setup() {
    super.setup();
    effect(this._watchVideoId.bind(this));
    this._notify("provider-setup", this);
  }
  async play() {
    const { paused } = this._ctx.$state;
    if (!this._playPromise) {
      this._playPromise = timedPromise(() => {
        this._playPromise = null;
        if (paused())
          return "Timed out.";
      });
      this._remote("playVideo");
    }
    return this._playPromise.promise;
  }
  async pause() {
    const { paused } = this._ctx.$state;
    if (!this._pausePromise) {
      this._pausePromise = timedPromise(() => {
        this._pausePromise = null;
        if (!paused())
          ;
      });
      this._remote("pauseVideo");
    }
    return this._pausePromise.promise;
  }
  setMuted(muted) {
    if (muted)
      this._remote("mute");
    else
      this._remote("unMute");
  }
  setCurrentTime(time) {
    this._pausedSeeking = this._ctx.$state.paused();
    this._remote("seekTo", time);
    this._notify("seeking", time);
  }
  setVolume(volume) {
    this._remote("setVolume", volume * 100);
  }
  setPlaybackRate(rate) {
    this._remote("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this._currentSrc = null;
      this._videoId.set("");
      return;
    }
    const videoId = resolveYouTubeVideoId(src.src);
    this._videoId.set(videoId ?? "");
    this._currentSrc = src;
  }
  _getOrigin() {
    return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  }
  _watchVideoId() {
    this._reset();
    const videoId = this._videoId();
    if (!videoId) {
      this._src.set("");
      return;
    }
    this._src.set(`${this._getOrigin()}/embed/${videoId}`);
    this._notify("load-start");
  }
  _buildParams() {
    const { keyDisabled } = this._ctx.$props, { muted, playsInline, nativeControls } = this._ctx.$state, showControls = nativeControls();
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
  _remote(command, arg) {
    this._postMessage({
      event: "command",
      func: command,
      args: arg ? [arg] : void 0
    });
  }
  _onLoad() {
    window.setTimeout(() => this._postMessage({ event: "listening" }), 100);
  }
  _onReady(trigger) {
    this._notify("loaded-metadata");
    this._notify("loaded-data");
    this._ctx.delegate._ready(void 0, trigger);
  }
  _onPause(trigger) {
    this._pausePromise?.resolve();
    this._pausePromise = null;
    this._notify("pause", void 0, trigger);
  }
  _onTimeUpdate(time, trigger) {
    const { duration, realCurrentTime } = this._ctx.$state, hasEnded = this._state === YouTubePlayerState._Ended, boundTime = hasEnded ? duration() : time, detail = {
      currentTime: boundTime,
      played: this._getPlayedRange(boundTime)
    };
    this._notify("time-update", detail, trigger);
    if (!hasEnded && Math.abs(boundTime - realCurrentTime()) > 1) {
      this._notify("seeking", boundTime, trigger);
    }
  }
  _getPlayedRange(time) {
    return this._played >= time ? this._playedRange : this._playedRange = new TimeRange(0, this._played = time);
  }
  _onProgress(buffered, seekable, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable
    };
    this._notify("progress", detail, trigger);
    const { seeking, realCurrentTime } = this._ctx.$state;
    if (seeking() && buffered > realCurrentTime()) {
      this._onSeeked(trigger);
    }
  }
  _onSeeked(trigger) {
    const { paused, realCurrentTime } = this._ctx.$state;
    window.clearTimeout(this._seekingTimer);
    this._seekingTimer = window.setTimeout(
      () => {
        this._notify("seeked", realCurrentTime(), trigger);
        this._seekingTimer = -1;
      },
      paused() ? 100 : 0
    );
    this._pausedSeeking = false;
  }
  _onEnded(trigger) {
    const { seeking } = this._ctx.$state;
    if (seeking())
      this._onSeeked(trigger);
    this._notify("pause", void 0, trigger);
    this._notify("end", void 0, trigger);
  }
  _onStateChange(state, trigger) {
    const { started, paused, seeking } = this._ctx.$state, isPlaying = state === YouTubePlayerState._Playing, isBuffering = state === YouTubePlayerState._Buffering, isPlay = (paused() || this._playPromise) && (isBuffering || isPlaying);
    if (isBuffering)
      this._notify("waiting", void 0, trigger);
    if (seeking() && isPlaying) {
      this._onSeeked(trigger);
    }
    if (!started() && isPlay && this._pausedSeeking) {
      this._playPromise?.reject("invalid internal play operation");
      this._playPromise = null;
      if (isPlaying) {
        this.pause();
        this._pausedSeeking = false;
      }
      return;
    }
    if (isPlay) {
      this._playPromise?.resolve();
      this._playPromise = null;
      this._notify("play", void 0, trigger);
    }
    switch (state) {
      case YouTubePlayerState._Cued:
        this._onReady(trigger);
        break;
      case YouTubePlayerState._Playing:
        this._notify("playing", void 0, trigger);
        break;
      case YouTubePlayerState._Paused:
        this._onPause(trigger);
        break;
      case YouTubePlayerState._Ended:
        this._onEnded(trigger);
        break;
    }
    this._state = state;
  }
  _onMessage({ info }, event) {
    if (!info)
      return;
    const { title, intrinsicDuration, playbackRate } = this._ctx.$state;
    if (isObject(info.videoData) && info.videoData.title !== title()) {
      this._notify("title-change", info.videoData.title, event);
    }
    if (isNumber(info.duration) && info.duration !== intrinsicDuration()) {
      if (isNumber(info.videoLoadedFraction)) {
        const buffered = info.progressState?.loaded ?? info.videoLoadedFraction * info.duration, seekable = new TimeRange(0, info.duration);
        this._onProgress(buffered, seekable, event);
      }
      this._notify("duration-change", info.duration, event);
    }
    if (isNumber(info.playbackRate) && info.playbackRate !== playbackRate()) {
      this._notify("rate-change", info.playbackRate, event);
    }
    if (info.progressState) {
      const {
        current,
        seekableStart,
        seekableEnd,
        loaded,
        duration: _duration
      } = info.progressState;
      this._onTimeUpdate(current, event);
      this._onProgress(loaded, new TimeRange(seekableStart, seekableEnd), event);
      if (_duration !== intrinsicDuration()) {
        this._notify("duration-change", _duration, event);
      }
    }
    if (isNumber(info.volume) && isBoolean(info.muted)) {
      const detail = {
        muted: info.muted,
        volume: info.volume / 100
      };
      this._notify("volume-change", detail, event);
    }
    if (isNumber(info.playerState) && info.playerState !== this._state) {
      this._onStateChange(info.playerState, event);
    }
  }
  _reset() {
    this._state = -1;
    this._seekingTimer = -1;
    this._played = 0;
    this._playedRange = new TimeRange(0, 0);
    this._playPromise = null;
    this._pausePromise = null;
    this._pausedSeeking = false;
  }
}

export { YouTubeProvider };
