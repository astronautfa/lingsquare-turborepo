import {
  EmbedProvider
} from "./vidstack-WFBSDUOA.js";
import {
  resolveYouTubeVideoId
} from "./vidstack-XNYO7UHS.js";
import {
  preconnect
} from "./vidstack-DQWSDQKN.js";
import {
  TimeRange
} from "./vidstack-PKS56VNA.js";
import "./vidstack-HLIA5IIR.js";
import {
  createScope,
  deferredPromise,
  effect,
  isBoolean,
  isNumber,
  isObject,
  isString,
  isUndefined,
  signal
} from "./vidstack-3R7QJDRC.js";
import "./vidstack-WBT4TVVV.js";

// ../vidstack/src/providers/youtube/embed/state.ts
var YouTubePlayerState = {
  Unstarted: -1,
  Ended: 0,
  Playing: 1,
  Paused: 2,
  Buffering: 3,
  Cued: 5
};

// ../vidstack/src/providers/youtube/provider.ts
var YouTubeProvider = class extends EmbedProvider {
  $$PROVIDER_TYPE = "YOUTUBE";
  scope = createScope();
  #ctx;
  #videoId = signal("");
  #state = -1;
  #currentSrc = null;
  #seekingTimer = -1;
  #pausedSeeking = false;
  #promises = /* @__PURE__ */ new Map();
  constructor(iframe, ctx) {
    super(iframe);
    this.#ctx = ctx;
  }
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
  language = "en";
  color = "red";
  /**
   * Whether cookies should be enabled on the embed. This is turned off by default to be
   * GDPR-compliant.
   *
   * @defaultValue `false`
   */
  cookies = false;
  get currentSrc() {
    return this.#currentSrc;
  }
  get type() {
    return "youtube";
  }
  get videoId() {
    return this.#videoId();
  }
  preconnect() {
    preconnect(this.getOrigin());
  }
  setup() {
    super.setup();
    effect(this.#watchVideoId.bind(this));
    this.#ctx.notify("provider-setup", this);
  }
  destroy() {
    this.#reset();
    const message = "provider destroyed";
    for (const promises of this.#promises.values()) {
      for (const { reject } of promises) reject(message);
    }
    this.#promises.clear();
  }
  async play() {
    return this.#remote("playVideo");
  }
  #playFail(message) {
    this.#getPromise("playVideo")?.reject(message);
  }
  async pause() {
    return this.#remote("pauseVideo");
  }
  #pauseFail(message) {
    this.#getPromise("pauseVideo")?.reject(message);
  }
  setMuted(muted) {
    if (muted) this.#remote("mute");
    else this.#remote("unMute");
  }
  setCurrentTime(time) {
    this.#pausedSeeking = this.#ctx.$state.paused();
    this.#remote("seekTo", time);
    this.#ctx.notify("seeking", time);
  }
  setVolume(volume) {
    this.#remote("setVolume", volume * 100);
  }
  setPlaybackRate(rate) {
    this.#remote("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this.#currentSrc = null;
      this.#videoId.set("");
      return;
    }
    const videoId = resolveYouTubeVideoId(src.src);
    this.#videoId.set(videoId ?? "");
    this.#currentSrc = src;
  }
  getOrigin() {
    return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  }
  #watchVideoId() {
    this.#reset();
    const videoId = this.#videoId();
    if (!videoId) {
      this.src.set("");
      return;
    }
    this.src.set(`${this.getOrigin()}/embed/${videoId}`);
    this.#ctx.notify("load-start");
  }
  buildParams() {
    const { keyDisabled } = this.#ctx.$props, { muted, playsInline, nativeControls } = this.#ctx.$state, showControls = nativeControls();
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
  #remote(command, arg) {
    let promise = deferredPromise(), promises = this.#promises.get(command);
    if (!promises) this.#promises.set(command, promises = []);
    promises.push(promise);
    this.postMessage({
      event: "command",
      func: command,
      args: arg ? [arg] : void 0
    });
    return promise.promise;
  }
  onLoad() {
    window.setTimeout(() => this.postMessage({ event: "listening" }), 100);
  }
  #onReady(trigger) {
    this.#ctx.notify("loaded-metadata");
    this.#ctx.notify("loaded-data");
    this.#ctx.delegate.ready(void 0, trigger);
  }
  #onPause(trigger) {
    this.#getPromise("pauseVideo")?.resolve();
    this.#ctx.notify("pause", void 0, trigger);
  }
  #onTimeUpdate(time, trigger) {
    const { duration, realCurrentTime } = this.#ctx.$state, hasEnded = this.#state === YouTubePlayerState.Ended, boundTime = hasEnded ? duration() : time;
    this.#ctx.notify("time-change", boundTime, trigger);
    if (!hasEnded && Math.abs(boundTime - realCurrentTime()) > 1) {
      this.#ctx.notify("seeking", boundTime, trigger);
    }
  }
  #onProgress(buffered, seekable, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable
    };
    this.#ctx.notify("progress", detail, trigger);
    const { seeking, realCurrentTime } = this.#ctx.$state;
    if (seeking() && buffered > realCurrentTime()) {
      this.#onSeeked(trigger);
    }
  }
  #onSeeked(trigger) {
    const { paused, realCurrentTime } = this.#ctx.$state;
    window.clearTimeout(this.#seekingTimer);
    this.#seekingTimer = window.setTimeout(
      () => {
        this.#ctx.notify("seeked", realCurrentTime(), trigger);
        this.#seekingTimer = -1;
      },
      paused() ? 100 : 0
    );
    this.#pausedSeeking = false;
  }
  #onEnded(trigger) {
    const { seeking } = this.#ctx.$state;
    if (seeking()) this.#onSeeked(trigger);
    this.#ctx.notify("pause", void 0, trigger);
    this.#ctx.notify("end", void 0, trigger);
  }
  #onStateChange(state, trigger) {
    const { started, paused, seeking } = this.#ctx.$state, isPlaying = state === YouTubePlayerState.Playing, isBuffering = state === YouTubePlayerState.Buffering, isPendingPlay = !isUndefined(this.#getPromise("playVideo")), isPlay = (paused() || isPendingPlay) && (isBuffering || isPlaying);
    if (isBuffering) this.#ctx.notify("waiting", void 0, trigger);
    if (seeking() && isPlaying) {
      this.#onSeeked(trigger);
    }
    if (!started() && isPlay && this.#pausedSeeking) {
      this.#playFail("invalid internal play operation");
      if (isPlaying) {
        this.pause();
        this.#pausedSeeking = false;
      }
      return;
    }
    if (isPlay) {
      this.#getPromise("playVideo")?.resolve();
      this.#ctx.notify("play", void 0, trigger);
    }
    switch (state) {
      case YouTubePlayerState.Unstarted:
        this.#playFail("provider rejected");
        this.#pauseFail("provider rejected");
        this.#ctx.notify("pause", void 0, trigger);
        break;
      case YouTubePlayerState.Cued:
        this.#onReady(trigger);
        break;
      case YouTubePlayerState.Playing:
        this.#ctx.notify("playing", void 0, trigger);
        break;
      case YouTubePlayerState.Paused:
        this.#onPause(trigger);
        break;
      case YouTubePlayerState.Ended:
        this.#onEnded(trigger);
        break;
    }
    this.#state = state;
  }
  onMessage({ info }, event) {
    if (!info) return;
    const { title, intrinsicDuration, playbackRate } = this.#ctx.$state;
    if (isObject(info.videoData) && info.videoData.title !== title()) {
      this.#ctx.notify("title-change", info.videoData.title, event);
    }
    if (isNumber(info.duration) && info.duration !== intrinsicDuration()) {
      if (isNumber(info.videoLoadedFraction)) {
        const buffered = info.progressState?.loaded ?? info.videoLoadedFraction * info.duration, seekable = new TimeRange(0, info.duration);
        this.#onProgress(buffered, seekable, event);
      }
      this.#ctx.notify("duration-change", info.duration, event);
    }
    if (isNumber(info.playbackRate) && info.playbackRate !== playbackRate()) {
      this.#ctx.notify("rate-change", info.playbackRate, event);
    }
    if (info.progressState) {
      const { current, seekableStart, seekableEnd, loaded, duration } = info.progressState;
      this.#onTimeUpdate(current, event);
      this.#onProgress(loaded, new TimeRange(seekableStart, seekableEnd), event);
      if (duration !== intrinsicDuration()) {
        this.#ctx.notify("duration-change", duration, event);
      }
    }
    if (isNumber(info.volume) && isBoolean(info.muted)) {
      const detail = {
        muted: info.muted,
        volume: info.volume / 100
      };
      this.#ctx.notify("volume-change", detail, event);
    }
    if (isNumber(info.playerState) && info.playerState !== this.#state) {
      this.#onStateChange(info.playerState, event);
    }
  }
  #reset() {
    this.#state = -1;
    this.#seekingTimer = -1;
    this.#pausedSeeking = false;
  }
  #getPromise(command) {
    return this.#promises.get(command)?.shift();
  }
};
export {
  YouTubeProvider
};
