import { Z as fscreen, a6 as ViewController, l as listenEvent, r as onDispose, f as signal, p as peek, i as isString, j as isNumber, D as DOMEvent, C as Component, g as effect, U as isKeyboardEvent, V as untrack, w as isArray, B as isKeyboardClick, a7 as waitIdlePeriod, _ as tick, o as deferredPromise, h as isUndefined, s as setAttribute, X as provideContext, M as animationFrameThrottle, a3 as uppercaseFirstChar, y as camelToKebabCase, a as setStyle, q as computed, a2 as prop, a8 as method, e as scoped, a4 as noop, Y as State, n as isNull, m as createContext, u as useContext, a9 as ariaBool, aa as isWriteSignal, ab as hasProvidedContext, v as isObject, O as useState, t as createScope, ac as r, ad as wasEnterKeyPressed, T as isPointerEvent, E as isTouchEvent, ae as isMouseEvent, k as kebabToCamelCase, c as createDisposalBin } from './vidstack-CBNXqr3M.js';
import { L as List, s as softResetMediaState, m as mediaState } from './vidstack-DopyK5ml.js';
import { u as useMediaContext, m as mediaContext } from './vidstack-DoOTQiYD.js';
import { i as isTrackCaptionKind, a as TextTrackSymbol, T as TextTrack, w as watchActiveTextTrack, b as isCueActive } from './vidstack-THZVvA_p.js';
import { j as isTouchPinchEvent, i as isHTMLElement, b as getTimeRangesEnd, g as getTimeRangesStart, T as TimeRange, s as setAttributeIfEmpty, k as hasAnimation, r as requestScopedAnimationFrame, m as autoPlacement, o as onPress, n as setARIALabel, p as observeVisibility, q as isElementParent, t as isEventInside, v as isElementVisible } from './vidstack-C5IKOUzO.js';
import { L as ListSymbol } from './vidstack-VrKElWm_.js';
import { Q as QualitySymbol } from './vidstack-BSXZsAhp.js';
import { f as canOrientScreen, i as isAudioSrc, t as canPlayAudioType, a as isVideoSrc, c as canPlayVideoType, u as isDASHSupported, q as isDASHSrc, s as isHLSSupported, p as isHLSSrc, I as IS_CHROME, b as IS_IOS, d as canGoogleCastSrc, e as canChangeVolume, v as IS_IPHONE } from './vidstack-DlGT_9qi.js';
import { c as coerceToError, a as assert } from './vidstack-BUqeBbTQ.js';
import { p as preconnect, b as getRequestCredentials } from './vidstack-BTmcG2zk.js';
import { c as clampNumber, r as round, g as getNumberOfDecimalPlaces } from './vidstack-ksPACRiU.js';
import { $ as $ariaBool, s as sortVideoQualities } from './vidstack-CSaHpIQV.js';

const CAN_FULLSCREEN = fscreen.fullscreenEnabled;
class FullscreenController extends ViewController {
  constructor() {
    super(...arguments);
    this.dc = false;
    this.Pd = false;
  }
  get active() {
    return this.Pd;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen, "fullscreenchange", this.Qd.bind(this));
    listenEvent(fscreen, "fullscreenerror", this.Zc.bind(this));
    onDispose(this.Fa.bind(this));
  }
  async Fa() {
    if (CAN_FULLSCREEN)
      await this.exit();
  }
  Qd(event) {
    const active = isFullscreen(this.el);
    if (active === this.Pd)
      return;
    if (!active)
      this.dc = false;
    this.Pd = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  Zc(event) {
    if (!this.dc)
      return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this.dc = false;
  }
  async enter() {
    try {
      this.dc = true;
      if (!this.el || isFullscreen(this.el))
        return;
      assertFullscreenAPI();
      return fscreen.requestFullscreen(this.el);
    } catch (error) {
      this.dc = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el))
      return;
    assertFullscreenAPI();
    return fscreen.exitFullscreen();
  }
}
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen.fullscreenElement === host)
    return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN)
    return;
  throw Error(
    "[vidstack] no fullscreen API"
  );
}

class ScreenOrientationController extends ViewController {
  constructor() {
    super(...arguments);
    this.la = signal(this.Jf());
    this.Cb = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.la();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.Cb();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.la().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.la().startsWith("landscape");
  }
  static {
    this.supported = canOrientScreen();
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this.Kf.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.Kf.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this.Fa.bind(this));
  }
  async Fa() {
    if (this.supported && this.Cb())
      await this.unlock();
  }
  Kf(event) {
    this.la.set(this.Jf());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.la),
        lock: this._c
      },
      trigger: event
    });
  }
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async lock(lockType) {
    if (peek(this.Cb) || this._c === lockType)
      return;
    this.Lf();
    await screen.orientation.lock(lockType);
    this.Cb.set(true);
    this._c = lockType;
  }
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async unlock() {
    if (!peek(this.Cb))
      return;
    this.Lf();
    this._c = void 0;
    await screen.orientation.unlock();
    this.Cb.set(false);
  }
  Lf() {
    if (this.supported)
      return;
    throw Error(
      "[vidstack] no orientation API"
    );
  }
  Jf() {
    if (this.supported)
      return window.screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }
}

function isVideoQualitySrc(src) {
  return !isString(src) && "width" in src && "height" in src && isNumber(src.width) && isNumber(src.height);
}

class MediaRemoteControl {
  constructor(_logger = void 0) {
    this.bc = _logger;
    this.G = null;
    this.f = null;
    this.Rd = -1;
  }
  /**
   * Set the target from which to dispatch media requests events from. The events should bubble
   * up from this target to the player element.
   *
   * @example
   * ```ts
   * const button = document.querySelector('button');
   * remote.setTarget(button);
   * ```
   */
  setTarget(target) {
    this.G = target;
  }
  /**
   * Returns the current player element. This method will attempt to find the player by
   * searching up from either the given `target` or default target set via `remote.setTarget`.
   *
   * @example
   * ```ts
   * const player = remote.getPlayer();
   * ```
   */
  getPlayer(target) {
    if (this.f)
      return this.f;
    (target ?? this.G)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this.f = player),
        bubbles: true,
        composed: true
      })
    );
    return this.f;
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this.f = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    this.s("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this.s("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this.s("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this.s("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.s("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.s("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.s("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.s("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this.s("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this.s("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this.s("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this.s("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this.s("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this.s("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.s("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.s("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.s("media-live-edge-request", trigger);
  }
  /**
   * Dispatch a request to update the media volume to the given `volume` level which is a value
   * between 0 and 1.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/audio-gain#remote-control}
   * @example
   * ```ts
   * remote.changeVolume(0); // 0%
   * remote.changeVolume(0.05); // 5%
   * remote.changeVolume(0.5); // 50%
   * remote.changeVolume(0.75); // 70%
   * remote.changeVolume(1); // 100%
   * ```
   */
  changeVolume(volume, trigger) {
    this.s("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
  }
  /**
   * Dispatch a request to change the current audio track.
   *
   * @example
   * ```ts
   * remote.changeAudioTrack(1); // track at index 1
   * ```
   */
  changeAudioTrack(index, trigger) {
    this.s("media-audio-track-change-request", trigger, index);
  }
  /**
   * Dispatch a request to change the video quality. The special value `-1` represents auto quality
   * selection.
   *
   * @example
   * ```ts
   * remote.changeQuality(-1); // auto
   * remote.changeQuality(1); // quality at index 1
   * ```
   */
  changeQuality(index, trigger) {
    this.s("media-quality-change-request", trigger, index);
  }
  /**
   * Request auto quality selection.
   */
  requestAutoQuality(trigger) {
    this.changeQuality(-1, trigger);
  }
  /**
   * Dispatch a request to change the mode of the text track at the given index.
   *
   * @example
   * ```ts
   * remote.changeTextTrackMode(1, 'showing'); // track at index 1
   * ```
   */
  changeTextTrackMode(index, mode, trigger) {
    this.s("media-text-track-change-request", trigger, {
      index,
      mode
    });
  }
  /**
   * Dispatch a request to change the media playback rate.
   *
   * @example
   * ```ts
   * remote.changePlaybackRate(0.5); // Half the normal speed
   * remote.changePlaybackRate(1); // Normal speed
   * remote.changePlaybackRate(1.5); // 50% faster than normal
   * remote.changePlaybackRate(2); // Double the normal speed
   * ```
   */
  changePlaybackRate(rate, trigger) {
    this.s("media-rate-change-request", trigger, rate);
  }
  /**
   * Dispatch a request to change the media audio gain.
   *
   * @example
   * ```ts
   * remote.changeAudioGain(1); // Disable audio gain
   * remote.changeAudioGain(1.5); // 50% louder
   * remote.changeAudioGain(2); // 100% louder
   * ```
   */
  changeAudioGain(gain, trigger) {
    this.s("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this.s("media-resume-controls-request", trigger);
  }
  /**
   * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
   * controls being visible until `remote.resumeControls()` is called. This method
   * is generally used when building custom controls and you'd like to prevent the UI from
   * disappearing.
   *
   * @example
   * ```ts
   * // Prevent controls hiding while menu is being interacted with.
   * function onSettingsOpen() {
   *   remote.pauseControls();
   * }
   *
   * function onSettingsClose() {
   *   remote.resumeControls();
   * }
   * ```
   */
  pauseControls(trigger) {
    this.s("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.paused)
      this.play(trigger);
    else
      this.pause(trigger);
  }
  /**
   * Dispatch a request to toggle the controls visibility.
   */
  toggleControls(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (!player.controls.showing) {
      player.controls.show(0, trigger);
    } else {
      player.controls.hide(0, trigger);
    }
  }
  /**
   * Dispatch a request to toggle the media muted state.
   */
  toggleMuted(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.muted)
      this.unmute(trigger);
    else
      this.mute(trigger);
  }
  /**
   * Dispatch a request to toggle the media fullscreen state.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  toggleFullscreen(target, trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.fullscreen)
      this.exitFullscreen(target, trigger);
    else
      this.enterFullscreen(target, trigger);
  }
  /**
   * Dispatch a request to toggle the media picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  togglePictureInPicture(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.pictureInPicture)
      this.exitPictureInPicture(trigger);
    else
      this.enterPictureInPicture(trigger);
  }
  /**
   * Show captions.
   */
  showCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    let tracks = player.state.textTracks, index = this.Rd;
    if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
      index = -1;
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track) && track.default);
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track));
    }
    if (index >= 0)
      this.changeTextTrackMode(index, "showing", trigger);
    this.Rd = -1;
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this.Rd = index;
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      return;
    }
    if (player.state.textTrack) {
      this.disableCaptions();
    } else {
      this.showCaptions();
    }
  }
  userPrefersLoopChange(prefersLoop, trigger) {
    this.s("media-user-loop-change-request", trigger, prefersLoop);
  }
  s(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component)
      target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this.f?.el && target instanceof Node && !this.f.el.contains(target);
    target = shouldUsePlayer ? this.G ?? this.getPlayer()?.el : target ?? this.G;
    if (this.f) {
      if (type === "media-play-request" && !this.f.state.canLoad) {
        target?.dispatchEvent(request);
      } else {
        this.f.canPlayQueue.k(type, () => target?.dispatchEvent(request));
      }
    } else {
      target?.dispatchEvent(request);
    }
  }
  Va(method) {
  }
}

class MediaPlayerController extends ViewController {
}

class MediaControls extends MediaPlayerController {
  constructor() {
    super(...arguments);
    this.Sd = -2;
    this.Gb = false;
    this.Sf = signal(false);
    this.Td = signal(false);
    this.ec = null;
    this.Ud = signal(true);
    this.defaultDelay = 2e3;
  }
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return this.Ud();
  }
  set canIdle(canIdle) {
    this.Ud.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this.Sf() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this.Sf.set(hide);
  }
  /**
   * Whether media controls are currently visible.
   */
  get showing() {
    return this.$state.controlsVisible();
  }
  /**
   * Show controls.
   */
  show(delay = 0, trigger) {
    this.Vd();
    if (!this.Gb) {
      this.ad(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this.Vd();
    if (!this.Gb) {
      this.ad(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this.Gb = true;
    this.Vd();
    this.ad(true, 0, trigger);
  }
  resume(trigger) {
    this.Gb = false;
    if (this.$state.paused())
      return;
    this.ad(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this.Hb.bind(this));
  }
  Hb() {
    const { viewType } = this.$state;
    if (!this.Ud())
      return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this.$h.bind(this));
    effect(this.fc.bind(this));
    const onPlay = this.gc.bind(this), onPause = this.ib.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  $h() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine")
      return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this.Td()) {
      effect(() => {
        if (!paused())
          this.listen("pointermove", this.Tf.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this.ai.bind(this));
      this.listen("mouseleave", this.bi.bind(this));
    }
  }
  fc() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started())
      return;
    const onStopIdle = this.Tf.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  gc(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  ib(event) {
    this.show(0, event);
  }
  ai(event) {
    this.Td.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  bi(event) {
    this.Td.set(true);
    this.hide(0, event);
  }
  Vd() {
    window.clearTimeout(this.Sd);
    this.Sd = -1;
  }
  Tf(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this.Gb || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this.ec = null;
      } else if (this.ec) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this.ec?.focus();
          this.ec = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  ad(visible, delay, trigger) {
    if (delay === 0) {
      this.E(visible, trigger);
      return;
    }
    this.Sd = window.setTimeout(() => {
      if (!this.scope)
        return;
      this.E(visible && !this.Gb, trigger);
    }, delay);
  }
  E(visible, trigger) {
    if (this.$state.controlsVisible() === visible)
      return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this.ec = document.activeElement;
      requestAnimationFrame(() => {
        this.el?.focus({ preventScroll: true });
      });
    }
    this.dispatch("controls-change", {
      detail: visible,
      trigger
    });
  }
}

var functionThrottle = throttle;

function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = (options && options.leading);
  var trailing = (options && options.trailing);

  if (leading == null) {
    leading = true; // default
  }

  if (trailing == null) {
    trailing = !leading; //default
  }

  if (leading == true) {
    trailing = false; // forced because there should be invocation per call
  }

  var cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  var flush = function() {
    var call = throttledFn;
    cancel();

    if (call) {
      call();
    }
  };

  var throttleWrapper = function() {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;

    throttledFn = function() {
      return fn.apply(context, args);
    };

    if (!timeoutId) {
      timeoutId = setTimeout(function() {
        timeoutId = null;

        if (trailing) {
          return throttledFn();
        }
      }, interval);
    }

    if (callNow) {
      callNow = false;
      return throttledFn();
    }
  };

  throttleWrapper.cancel = cancel;
  throttleWrapper.flush = flush;

  return throttleWrapper;
}

class LocalMediaStorage {
  constructor() {
    this.playerId = "vds-player";
    this.mediaId = null;
    this.H = {
      volume: null,
      muted: null,
      audioGain: null,
      time: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null
    };
    this.saveTimeThrottled = functionThrottle(this.saveTime.bind(this), 1e3);
  }
  async getVolume() {
    return this.H.volume;
  }
  async setVolume(volume) {
    this.H.volume = volume;
    this.save();
  }
  async getMuted() {
    return this.H.muted;
  }
  async setMuted(muted) {
    this.H.muted = muted;
    this.save();
  }
  async getTime() {
    return this.H.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this.H.time = !shouldClear ? time : null;
    if (shouldClear || ended)
      this.saveTime();
    else
      this.saveTimeThrottled();
  }
  async getLang() {
    return this.H.lang;
  }
  async setLang(lang) {
    this.H.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this.H.captions;
  }
  async setCaptions(enabled) {
    this.H.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this.H.rate;
  }
  async setPlaybackRate(rate) {
    this.H.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this.H.audioGain;
  }
  async setAudioGain(gain) {
    this.H.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this.H.quality;
  }
  async setVideoQuality(quality) {
    this.H.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this.H = {
      volume: null,
      muted: null,
      audioGain: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null,
      ...savedData ? JSON.parse(savedData) : {},
      time: savedTime ? +savedTime : null
    };
  }
  save() {
    if (!this.playerId)
      return;
    const data = JSON.stringify({ ...this.H, time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTime() {
    if (!this.mediaId)
      return;
    const data = (this.H.time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
}

class NativeTextRenderer {
  constructor() {
    this.priority = 0;
    this.Uf = true;
    this.m = null;
    this.J = null;
    this.va = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this.m = video;
    if (video)
      video.textTracks.onchange = this.E.bind(this);
  }
  addTrack(track) {
    this.va.add(track);
    this.ci(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol._]?.remove?.();
    track[TextTrackSymbol._] = null;
    this.va.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol._];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.J = track;
  }
  setDisplay(display) {
    this.Uf = display;
    this.E();
  }
  detach() {
    if (this.m)
      this.m.textTracks.onchange = null;
    for (const track of this.va)
      this.removeTrack(track);
    this.va.clear();
    this.m = null;
    this.J = null;
  }
  ci(track) {
    if (!this.m)
      return;
    const el = track[TextTrackSymbol._] ??= this.di(track);
    if (isHTMLElement(el)) {
      this.m.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  di(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.Vf(track, el.track);
    }
    return el;
  }
  Vf(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length)
      return;
    for (const cue of track.cues)
      native.addCue(cue);
  }
  E(event) {
    for (const track of this.va) {
      const native = track[TextTrackSymbol._];
      if (!native)
        continue;
      if (!this.Uf) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing)
        this.Vf(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this.a = _media;
    this.m = null;
    this.bd = [];
    this.Wf = false;
    this.wa = null;
    this.jb = null;
    const textTracks = _media.textTracks;
    this.Wd = textTracks;
    effect(this.Xd.bind(this));
    onDispose(this.ei.bind(this));
    listenEvent(textTracks, "add", this.Yd.bind(this));
    listenEvent(textTracks, "remove", this.fi.bind(this));
    listenEvent(textTracks, "mode-change", this.Ha.bind(this));
  }
  Xd() {
    const { nativeControls } = this.a.$state;
    this.Wf = nativeControls();
    this.Ha();
  }
  add(renderer) {
    this.bd.push(renderer);
    untrack(this.Ha.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this.bd.splice(this.bd.indexOf(renderer), 1);
    untrack(this.Ha.bind(this));
  }
  /** @internal */
  Xf(video) {
    requestAnimationFrame(() => {
      this.m = video;
      if (video) {
        this.wa = new NativeTextRenderer();
        this.wa.attach(video);
        for (const track of this.Wd)
          this.Yf(track);
      }
      this.Ha();
    });
  }
  Yf(track) {
    if (!isTrackCaptionKind(track))
      return;
    this.wa?.addTrack(track);
  }
  gi(track) {
    if (!isTrackCaptionKind(track))
      return;
    this.wa?.removeTrack(track);
  }
  Yd(event) {
    this.Yf(event.detail);
  }
  fi(event) {
    this.gi(event.detail);
  }
  Ha() {
    const currentTrack = this.Wd.selected;
    if (this.m && (this.Wf || currentTrack?.[TextTrackSymbol.Mf])) {
      this.jb?.changeTrack(null);
      this.wa?.setDisplay(true);
      this.wa?.changeTrack(currentTrack);
      return;
    }
    this.wa?.setDisplay(false);
    this.wa?.changeTrack(null);
    if (!currentTrack) {
      this.jb?.changeTrack(null);
      return;
    }
    const customRenderer = this.bd.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this.m));
    if (this.jb !== customRenderer) {
      this.jb?.detach();
      customRenderer?.attach(this.m);
      this.jb = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  ei() {
    this.wa?.detach();
    this.wa = null;
    this.jb?.detach();
    this.jb = null;
  }
}

var functionDebounce = debounce;

function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;

  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  };

  var flush = function() {
    var call = debouncedFn;
    clear();

    if (call) {
      call();
    }
  };

  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }

    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();

    debouncedFn = function() {
      fn.apply(context, args);
    };

    timeout = setTimeout(function() {
      timeout = null;

      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;

        return call();
      }
    }, wait);

    if (callNow) {
      return debouncedFn();
    }
  };

  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;

  return debounceWrapper;
}

class TextTrackList extends List {
  constructor() {
    super();
    this.Z = false;
    this.kb = {};
    this.lb = null;
    this.mb = null;
    this.bg = functionDebounce(async () => {
      if (!this.Z)
        return;
      if (!this.mb && this.lb) {
        this.mb = await this.lb.getLang();
      }
      const showCaptions = await this.lb?.getCaptions(), kinds = [
        ["captions", "subtitles"],
        "chapters",
        "descriptions",
        "metadata"
      ];
      for (const kind of kinds) {
        const tracks = this.getByKind(kind);
        if (tracks.find((t) => t.mode === "showing"))
          continue;
        const preferredTrack = this.mb ? tracks.find((track2) => track2.language === this.mb) : null;
        const defaultTrack = isArray(kind) ? this.kb[kind.find((kind2) => this.kb[kind2]) || ""] : this.kb[kind];
        const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
        if (track && (!isCaptionsKind || showCaptions !== false)) {
          track.mode = "showing";
          if (isCaptionsKind)
            this.cg(track);
        }
      }
    }, 300);
    this.Zd = null;
    this.ag = this.hi.bind(this);
  }
  get selected() {
    const track = this.A.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this.mb;
  }
  set preferredLang(lang) {
    this.mb = lang;
    this.$f(lang);
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init), kind = init.kind === "captions" || init.kind === "subtitles" ? "captions" : init.kind;
    if (this.kb[kind] && init.default)
      delete init.default;
    track.addEventListener("mode-change", this.ag);
    this[ListSymbol.da](track, trigger);
    track[TextTrackSymbol.Db] = this[TextTrackSymbol.Db];
    if (this.Z)
      track[TextTrackSymbol.Z]();
    if (init.default)
      this.kb[kind] = track;
    this.bg();
    return this;
  }
  remove(track, trigger) {
    this.Zd = track;
    if (!this.A.includes(track))
      return;
    if (track === this.kb[track.kind])
      delete this.kb[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol.hb] = null;
    track.removeEventListener("mode-change", this.ag);
    this[ListSymbol.cc](track, trigger);
    this.Zd = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this.A]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.A.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [(TextTrackSymbol.Z)]() {
    if (this.Z)
      return;
    for (const track of this.A)
      track[TextTrackSymbol.Z]();
    this.Z = true;
    this.bg();
  }
  hi(event) {
    const track = event.detail;
    if (this.lb && isTrackCaptionKind(track) && track !== this.Zd) {
      this.cg(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this.A) {
        if (t.mode === "showing" && t != track && kinds.includes(t.kind)) {
          t.mode = "disabled";
        }
      }
    }
    this.dispatchEvent(
      new DOMEvent("mode-change", {
        detail: event.detail,
        trigger: event
      })
    );
  }
  cg(track) {
    if (track.mode !== "disabled") {
      this.$f(track.language);
    }
    this.lb?.setCaptions?.(track.mode === "showing");
  }
  $f(lang) {
    this.lb?.setLang?.(this.mb = lang);
  }
  setStorage(storage) {
    this.lb = storage;
  }
}

const SELECTED = Symbol(0);
class SelectList extends List {
  get selected() {
    return this.A.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.A.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol.Hf](item, trigger) {
    this[ListSymbol.ea](item, false, trigger);
  }
  /** @internal */
  [ListSymbol.da](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly)
          return;
        this[ListSymbol.If]?.();
        this[ListSymbol.ea](item, selected);
      }
    });
    super[ListSymbol.da](item, trigger);
  }
  /** @internal */
  [ListSymbol.ea](item, selected, trigger) {
    if (selected === item?.[SELECTED])
      return;
    const prev = this.selected;
    if (item)
      item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev)
        prev[SELECTED] = false;
      this.dispatchEvent(
        new DOMEvent("change", {
          detail: {
            prev,
            current: this.selected
          },
          trigger
        })
      );
    }
  }
}

class AudioTrackList extends SelectList {
}

class VideoQualityList extends SelectList {
  constructor() {
    super(...arguments);
    this.cd = false;
    this.switch = "current";
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this.cd || this.readonly;
  }
  /** @internal */
  [(ListSymbol.If)]() {
    this[QualitySymbol.Wa](false);
  }
  /** @internal */
  [ListSymbol.Gf](trigger) {
    this[QualitySymbol.Ia] = void 0;
    this[QualitySymbol.Wa](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.cd || !this[QualitySymbol.Ia])
      return;
    this[QualitySymbol.Ia]?.(trigger);
    this[QualitySymbol.Wa](true, trigger);
  }
  getBySrc(src) {
    return this.A.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol.Wa](auto, trigger) {
    if (this.cd === auto)
      return;
    this.cd = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
}

function isAudioProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "AUDIO";
}
function isVideoProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "VIDEO";
}
function isHLSProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "HLS";
}
function isDASHProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "DASH";
}
function isYouTubeProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "YOUTUBE";
}
function isVimeoProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "VIMEO";
}
function isGoogleCastProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "GOOGLE_CAST";
}
function isHTMLAudioElement(element) {
  return element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
function isHTMLIFrameElement(element) {
  return element instanceof HTMLIFrameElement;
}

const MEDIA_KEY_SHORTCUTS = {
  togglePaused: "k Space",
  toggleMuted: "m",
  toggleFullscreen: "f",
  togglePictureInPicture: "i",
  toggleCaptions: "c",
  seekBackward: "j J ArrowLeft",
  seekForward: "l L ArrowRight",
  volumeUp: "ArrowUp",
  volumeDown: "ArrowDown",
  speedUp: ">",
  slowDown: "<"
};
const MODIFIER_KEYS = /* @__PURE__ */ new Set(["Shift", "Alt", "Meta", "Ctrl"]), BUTTON_SELECTORS = 'button, [role="button"]', IGNORE_SELECTORS = 'input, textarea, select, [contenteditable], [role^="menuitem"], [role="timer"]';
class MediaKeyboardController extends MediaPlayerController {
  constructor(_media) {
    super();
    this.a = _media;
    this.Ib = null;
  }
  onConnect() {
    effect(this.ii.bind(this));
  }
  ii() {
    const { keyDisabled, keyTarget } = this.$props;
    if (keyDisabled())
      return;
    const target = keyTarget() === "player" ? this.el : document, $active = signal(false);
    if (target === this.el) {
      this.listen("focusin", () => $active.set(true));
      this.listen("focusout", (event) => {
        if (!this.el.contains(event.target))
          $active.set(false);
      });
    } else {
      if (!peek($active))
        $active.set(document.querySelector("[data-media-player]") === this.el);
      listenEvent(document, "focusin", (event) => {
        const activePlayer = event.composedPath().find((el) => el instanceof Element && el.localName === "media-player");
        if (activePlayer !== void 0)
          $active.set(this.el === activePlayer);
      });
    }
    effect(() => {
      if (!$active())
        return;
      listenEvent(target, "keyup", this.hc.bind(this));
      listenEvent(target, "keydown", this.ic.bind(this));
      listenEvent(target, "keydown", this.ji.bind(this), { capture: true });
    });
  }
  hc(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this._d(event);
    if (!isString(value) && !isArray(value)) {
      value?.onKeyUp?.({
        event,
        player: this.a.player,
        remote: this.a.remote
      });
      value?.callback?.(event, this.a.remote);
      return;
    }
    if (method?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this.Ib) {
        this.dg(event, method === "seekForward");
        this.Ib = null;
      } else {
        this.a.remote.seek(this.dd, event);
        this.dd = void 0;
      }
    }
    if (method?.startsWith("volume")) {
      const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
      volumeSlider?.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: method === "volumeUp" ? "Up" : "Down",
          shiftKey: event.shiftKey,
          trigger: event
        })
      );
    }
  }
  ic(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key))
      return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this._d(event), isNumberPress = !event.metaKey && /^[0-9]$/.test(event.key);
    if (!isString(value) && !isArray(value) && !isNumberPress) {
      value?.onKeyDown?.({
        event,
        player: this.a.player,
        remote: this.a.remote
      });
      value?.callback?.(event, this.a.remote);
      return;
    }
    if (!method && isNumberPress) {
      event.preventDefault();
      event.stopPropagation();
      this.a.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this.Ja(event, method, method === "seekForward");
        break;
      case "volumeUp":
      case "volumeDown":
        const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
        if (volumeSlider) {
          volumeSlider.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: method === "volumeUp" ? "Up" : "Down",
              shiftKey: event.shiftKey,
              trigger: event
            })
          );
        } else {
          const value2 = event.shiftKey ? 0.1 : 0.05;
          this.a.remote.changeVolume(
            this.$state.volume() + (method === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this.a.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this.a.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this.a.remote[method]?.(event);
    }
    this.$state.lastKeyboardAction.set({
      action: method,
      event
    });
  }
  ji(event) {
    if (isHTMLMediaElement(event.target) && this._d(event).method) {
      event.preventDefault();
    }
  }
  _d(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this.a.ariaKeys
    };
    const method = Object.keys(keyShortcuts).find((method2) => {
      const value = keyShortcuts[method2], keys = isArray(value) ? value.join(" ") : isString(value) ? value : value?.keys;
      const combinations = (isArray(keys) ? keys : keys?.split(" "))?.map(
        (key) => replaceSymbolKeys(key).replace(/Control/g, "Ctrl").split("+")
      );
      return combinations?.some((combo) => {
        const modifierKeys = new Set(combo.filter((key) => MODIFIER_KEYS.has(key)));
        for (const modKey of MODIFIER_KEYS) {
          const modKeyProp = modKey.toLowerCase() + "Key";
          if (!modifierKeys.has(modKey) && event[modKeyProp]) {
            return false;
          }
        }
        return combo.every((key) => {
          return MODIFIER_KEYS.has(key) ? event[key.toLowerCase() + "Key"] : event.key === key.replace("Space", " ");
        });
      });
    });
    return {
      method,
      value: method ? keyShortcuts[method] : null
    };
  }
  ki(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this.dd = Math.max(
      0,
      Math.min(
        (this.dd ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  dg(event, forward) {
    this.Ib?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  Ja(event, type, forward) {
    if (!this.$state.canSeek())
      return;
    if (!this.Ib) {
      this.Ib = this.el.querySelector("[data-media-time-slider]");
    }
    if (this.Ib) {
      this.dg(event, forward);
    } else {
      this.a.remote.seeking(this.ki(event, type), event);
    }
  }
}
const SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key) {
  return key.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}

class ARIAKeyShortcuts extends ViewController {
  constructor(_shortcut) {
    super();
    this.$d = _shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this.$d] = keys;
      {
        onDispose(() => {
          delete ariaKeys[this.$d];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this.$d];
    if (shortcuts) {
      const keys2 = isArray(shortcuts) ? shortcuts.join(" ") : isString(shortcuts) ? shortcuts : shortcuts?.keys;
      el.setAttribute("aria-keyshortcuts", isArray(keys2) ? keys2.join(" ") : keys2);
    }
  }
}

class AudioProviderLoader {
  constructor() {
    this.name = "audio";
  }
  canPlay(src) {
    if (!isAudioSrc(src))
      return false;
    return !isString(src.src) || src.type === "?" || canPlayAudioType(this.target, src.type);
  }
  mediaType() {
    return "audio";
  }
  async load(ctx) {
    return new (await import('../providers/vidstack-audio.js')).AudioProvider(this.target, ctx);
  }
}

class VideoProviderLoader {
  constructor() {
    this.name = "video";
  }
  canPlay(src) {
    if (!isVideoSrc(src))
      return false;
    return !isString(src.src) || src.type === "?" || canPlayVideoType(this.target, src.type);
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    return new (await import('../providers/vidstack-video.js')).VideoProvider(this.target, ctx);
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
    return new (await import('../providers/vidstack-dash.js')).DASHProvider(this.target, context);
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
    return new (await import('../providers/vidstack-hls.js')).HLSProvider(this.target, context);
  }
}

class VimeoProviderLoader {
  constructor() {
    this.name = "vimeo";
  }
  preconnect() {
    const connections = [
      "https://i.vimeocdn.com",
      "https://f.vimeocdn.com",
      "https://fresnel.vimeocdn.com"
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/vimeo";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    return new (await import('../providers/vidstack-vimeo.js')).VimeoProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId, getVimeoVideoInfo } = await import('./vidstack-BInq9zTH.js');
    if (!isString(src.src))
      return null;
    const { videoId, hash } = resolveVimeoVideoId(src.src);
    if (videoId) {
      return getVimeoVideoInfo(videoId, abort, hash).then((info) => info ? info.poster : null);
    }
    return null;
  }
}

class YouTubeProviderLoader {
  constructor() {
    this.name = "youtube";
  }
  preconnect() {
    const connections = [
      // Botguard script.
      "https://www.google.com",
      // Posters.
      "https://i.ytimg.com",
      // Ads.
      "https://googleads.g.doubleclick.net",
      "https://static.doubleclick.net"
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/youtube";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    return new (await import('../providers/vidstack-youtube.js')).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import('./vidstack-DscYSLiW.js');
    const videoId = isString(src.src) && resolveYouTubeVideoId(src.src);
    if (videoId)
      return findYouTubePoster(videoId, abort);
    return null;
  }
}

const MEDIA_ATTRIBUTES = Symbol(0);
const mediaAttributes = [
  "autoPlay",
  "canAirPlay",
  "canFullscreen",
  "canGoogleCast",
  "canLoad",
  "canLoadPoster",
  "canPictureInPicture",
  "canPlay",
  "canSeek",
  "ended",
  "fullscreen",
  "isAirPlayConnected",
  "isGoogleCastConnected",
  "live",
  "liveEdge",
  "loop",
  "mediaType",
  "muted",
  "paused",
  "pictureInPicture",
  "playing",
  "playsInline",
  "remotePlaybackState",
  "remotePlaybackType",
  "seeking",
  "started",
  "streamType",
  "viewType",
  "waiting"
];

const mediaPlayerProps = {
  artist: "",
  artwork: null,
  autoplay: false,
  autoPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  currentTime: 0,
  crossorigin: null,
  crossOrigin: null,
  duration: -1,
  fullscreenOrientation: "landscape",
  googleCast: {},
  load: "visible",
  posterLoad: "visible",
  logLevel: "silent",
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playsInline: false,
  playbackRate: 1,
  poster: "",
  preload: "metadata",
  preferNativeHLS: false,
  src: "",
  title: "",
  controlsDelay: 2e3,
  hideControlsOnMouseLeave: false,
  viewType: "unknown",
  streamType: "unknown",
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: "player",
  keyShortcuts: MEDIA_KEY_SHORTCUTS,
  storage: null
};

class MediaLoadController extends MediaPlayerController {
  constructor(_type, _callback) {
    super();
    this.la = _type;
    this.La = _callback;
  }
  async onAttach(el) {
    const load = this.$props[this.la]();
    if (load === "eager") {
      requestAnimationFrame(this.La);
    } else if (load === "idle") {
      waitIdlePeriod(this.La);
    } else if (load === "visible") {
      let dispose, observer = new IntersectionObserver((entries) => {
        if (!this.scope)
          return;
        if (entries[0].isIntersecting) {
          dispose?.();
          dispose = void 0;
          this.La();
        }
      });
      observer.observe(el);
      dispose = onDispose(() => observer.disconnect());
    }
  }
}

class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this.V = _handle;
    this.a = _media;
    this.c = (type, ...init) => {
      this.V(
        new DOMEvent(type, {
          detail: init?.[0],
          trigger: init?.[1]
        })
      );
    };
  }
  async Ga(info, trigger) {
    return untrack(async () => {
      this.a; const {
        autoPlay,
        canPlay,
        started,
        duration,
        seekable,
        buffered,
        remotePlaybackInfo,
        playsInline,
        savedState,
        source
      } = this.a.$state;
      if (canPlay())
        return;
      const detail = {
        duration: info?.duration ?? duration(),
        seekable: info?.seekable ?? seekable(),
        buffered: info?.buffered ?? buffered(),
        provider: this.a.$provider()
      };
      this.c("can-play", detail, trigger);
      tick();
      let provider = this.a.$provider(), { storage, qualities } = this.a, { muted, volume, clipStartTime, playbackRate } = this.a.$props;
      await storage?.onLoad?.(source());
      const savedPlaybackTime = savedState()?.currentTime, savedPlayingState = savedState()?.paused, storageTime = await storage?.getTime(), startTime = savedPlaybackTime ?? storageTime ?? clipStartTime(), shouldAutoPlay = savedPlayingState || savedPlayingState !== false && !started() && autoPlay();
      if (provider) {
        provider.setVolume(await storage?.getVolume() ?? volume());
        provider.setMuted(muted() || !!await storage?.getMuted());
        const audioGain = await storage?.getAudioGain() ?? 1;
        if (audioGain > 1)
          provider.audioGain?.setGain?.(audioGain);
        provider.setPlaybackRate?.(await storage?.getPlaybackRate() ?? playbackRate());
        provider.setPlaysInline?.(playsInline());
        if (startTime > 0)
          provider.setCurrentTime(startTime);
      }
      const prefQuality = await storage?.getVideoQuality();
      if (prefQuality && qualities.length) {
        let currentQuality = null, currentScore = Infinity;
        for (const quality of qualities) {
          const score = Math.abs(prefQuality.width - quality.width) + Math.abs(prefQuality.height - quality.height) + (prefQuality.bitrate ? Math.abs(prefQuality.bitrate - (quality.bitrate ?? 0)) : 0);
          if (score < currentScore) {
            currentQuality = quality;
            currentScore = score;
          }
        }
        if (currentQuality)
          currentQuality.selected = true;
      }
      if (canPlay() && shouldAutoPlay) {
        await this.kj(trigger);
      } else if (storageTime && storageTime > 0) {
        this.c("started", void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
  async kj(trigger) {
    const {
      player,
      $state: { autoPlaying, muted }
    } = this.a;
    autoPlaying.set(true);
    const attemptEvent = new DOMEvent("auto-play-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
    }
  }
}

class Queue {
  constructor() {
    this.i = /* @__PURE__ */ new Map();
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  k(key, item) {
    this.i.set(key, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  xe(key) {
    const value = this.rg(key);
    this.i.delete(key);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  rg(key) {
    return this.i.get(key);
  }
  /**
   * Removes queued item under the given `key`.
   */
  ub(key) {
    this.i.delete(key);
  }
  /**
   * Clear all items in the queue.
   */
  Pm() {
    this.i.clear();
  }
}

class RequestQueue {
  constructor() {
    this.wc = false;
    this.ye = deferredPromise();
    this.i = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get Qm() {
    return this.i.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get Rm() {
    return this.wc;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async Sm() {
    if (this.wc)
      return;
    await this.ye.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  k(key, callback) {
    if (this.wc) {
      callback();
      return;
    }
    this.i.delete(key);
    this.i.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  xe(key) {
    this.i.get(key)?.();
    this.i.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  Xa() {
    this.sg();
    this.wc = true;
    if (this.i.size > 0)
      this.sg();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  $() {
    this.wc = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  z() {
    this.$();
    this.i.clear();
    this.tg();
  }
  sg() {
    for (const key of this.i.keys())
      this.xe(key);
    this.tg();
  }
  tg() {
    this.ye.resolve();
    this.ye = deferredPromise();
  }
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this.Ba = _stateMgr;
    this.g = _request;
    this.a = _media;
    this.zc = new RequestQueue();
    this.Fe = false;
    this.C = _media.$provider;
    this.yc = new MediaControls();
    this.pd = new FullscreenController();
    this.bb = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this.Qd.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.Hj.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this.Ij();
    effect(this.Jj.bind(this));
    effect(this.Kj.bind(this));
    effect(this.Lj.bind(this));
    effect(this.Mj.bind(this));
    effect(this.Nj.bind(this));
    effect(this.Oj.bind(this));
    effect(this.Pj.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen())
        this.Lg("prefer-media", destroyEvent);
      if (pictureInPicture())
        this.Ge(destroyEvent);
    } catch (e) {
    }
    this.zc.z();
  }
  Ij() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad())
      return;
    const off = this.listen("media-play-request", (event) => {
      this.Gg(event);
      off();
    });
  }
  Jj() {
    const provider = this.C(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this.zc.Xa();
    }
    return () => {
      this.zc.$();
    };
  }
  Hj(event) {
    event.stopPropagation();
    if (event.defaultPrevented)
      return;
    if (!this[event.type])
      return;
    if (peek(this.C)) {
      this[event.type](event);
    } else {
      this.zc.k(event.type, () => {
        if (peek(this.C))
          this[event.type](event);
      });
    }
  }
  async Ac(trigger) {
    const { canPlay, paused, autoPlaying } = this.$state;
    if (this.Gg(trigger))
      return;
    if (!peek(paused))
      return;
    if (trigger)
      this.g.i.k("media-play-request", trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider = peek(this.C);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.play();
    } catch (error) {
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoPlay = isAutoPlaying;
      this.Ba.V(errorEvent);
      throw error;
    }
  }
  Gg(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event);
      this.zc.k("media-play-request", async () => {
        try {
          await this.Ac(event);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async Ee(trigger) {
    const { canPlay, paused } = this.$state;
    if (peek(paused))
      return;
    if (trigger) {
      this.g.i.k("media-pause-request", trigger);
    }
    try {
      const provider = peek(this.C);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.pause();
    } catch (error) {
      this.g.i.ub("media-pause-request");
      throw error;
    }
  }
  Hg(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain)
      return;
    const provider = this.C();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this.g.i.k("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  Ig(trigger) {
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek()))
      return;
    const provider = peek(this.C);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    if (trigger)
      this.g.i.k("media-seek-request", trigger);
    const end = seekableEnd() - 2;
    provider.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  async Jg(target = "prefer-media", trigger) {
    const adapter = this.Kg(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active)
      return;
    if (peek(this.$state.pictureInPicture)) {
      this.Fe = true;
      await this.Ge(trigger);
    }
    if (trigger) {
      this.g.i.k("media-enter-fullscreen-request", trigger);
    }
    return adapter.enter();
  }
  async Lg(target = "prefer-media", trigger) {
    const adapter = this.Kg(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active)
      return;
    if (trigger) {
      this.g.i.k("media-exit-fullscreen-request", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this.Fe && peek(this.$state.canPictureInPicture)) {
        await this.He();
      }
      return result;
    } finally {
      this.Fe = false;
    }
  }
  Kg(target) {
    const provider = peek(this.C);
    return target === "prefer-media" && this.pd.supported || target === "media" ? this.pd : provider?.fullscreen;
  }
  async He(trigger) {
    this.Mg();
    if (this.$state.pictureInPicture())
      return;
    if (trigger) {
      this.g.i.k("media-enter-pip-request", trigger);
    }
    return await this.C().pictureInPicture.enter();
  }
  async Ge(trigger) {
    this.Mg();
    if (!this.$state.pictureInPicture())
      return;
    if (trigger) {
      this.g.i.k("media-exit-pip-request", trigger);
    }
    return await this.C().pictureInPicture.exit();
  }
  Mg() {
    if (this.$state.canPictureInPicture())
      return;
    throw Error(
      "[vidstack] no pip support"
    );
  }
  Kj() {
    this.yc.defaultDelay = this.$props.controlsDelay();
  }
  Lj() {
    const { canSetAudioGain } = this.$state, supported = !!this.C()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  Mj() {
    const { canAirPlay } = this.$state, supported = !!this.C()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  Nj() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
    canGoogleCast.set(supported);
  }
  Oj() {
    const { canFullscreen } = this.$state, supported = this.pd.supported || !!this.C()?.fullscreen?.supported;
    canFullscreen.set(supported);
  }
  Pj() {
    const { canPictureInPicture } = this.$state, supported = !!this.C()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event) {
    try {
      await this.Ng(event);
    } catch (error) {
    }
  }
  async Ng(trigger) {
    try {
      const adapter = this.C()?.airPlay;
      if (!adapter?.supported) {
        throw Error(false ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this.g.i.k("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this.g.i.ub("media-airplay-request");
      throw error;
    }
  }
  async ["media-google-cast-request"](event) {
    try {
      await this.Og(event);
    } catch (error) {
    }
  }
  async Og(trigger) {
    try {
      const { canGoogleCast } = this.$state;
      if (!peek(canGoogleCast)) {
        const error = Error(
          false ? "Google Cast not available on this platform." : "Cast not available."
        );
        error.code = "CAST_NOT_AVAILABLE";
        throw error;
      }
      preconnect("https://www.gstatic.com");
      if (!this.qd) {
        const $module = await import('./vidstack-Dy6oA08L.js');
        this.qd = new $module.GoogleCastLoader();
      }
      await this.qd.prompt(this.a);
      if (trigger) {
        this.g.i.k("media-google-cast-request", trigger);
      }
      const isConnecting = peek(this.$state.remotePlaybackState) !== "disconnected";
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime)
        });
      }
      this.$state.remotePlaybackLoader.set(isConnecting ? this.qd : null);
    } catch (error) {
      this.g.i.ub("media-google-cast-request");
      throw error;
    }
  }
  ["media-audio-track-change-request"](event) {
    const { logger, audioTracks } = this.a;
    if (audioTracks.readonly) {
      return;
    }
    const index = event.detail, track = audioTracks[index];
    if (track) {
      const key = event.type;
      this.g.i.k(key, event);
      track.selected = true;
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this.Jg(event.detail, event);
    } catch (error) {
      this.Zc(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this.Lg(event.detail, event);
    } catch (error) {
      this.Zc(error, event);
    }
  }
  async Qd(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || lockType === "none" || !this.bb.supported)
      return;
    if (isFullscreen) {
      if (this.bb.locked)
        return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this.bb.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  Zc(error, request) {
    this.Ba.V(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    const key = event.type;
    try {
      this.g.i.k(key, event);
      await this.bb.lock(event.detail);
    } catch (error) {
      this.g.i.ub(key);
    }
  }
  async ["media-orientation-unlock-request"](event) {
    const key = event.type;
    try {
      this.g.i.k(key, event);
      await this.bb.unlock();
    } catch (error) {
      this.g.i.ub(key);
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this.He(event);
    } catch (error) {
      this.Pg(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this.Ge(event);
    } catch (error) {
      this.Pg(error, event);
    }
  }
  Pg(error, request) {
    this.Ba.V(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek())
      return;
    this.g.i.k("media-seek-request", event);
    try {
      this.Ig();
    } catch (error) {
      this.g.i.ub("media-seek-request");
    }
  }
  async ["media-loop-request"](event) {
    try {
      this.g.Ob = true;
      this.g.Bc = true;
      await this.Ac(event);
    } catch (error) {
      this.g.Ob = false;
    }
  }
  ["media-user-loop-change-request"](event) {
    this.$state.userPrefersLoop.set(event.detail);
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused())
      return;
    try {
      await this.Ee(event);
    } catch (error) {
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused())
      return;
    try {
      await this.Ac(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate())
      return;
    const provider = this.C();
    if (!provider?.setPlaybackRate)
      return;
    this.g.i.k("media-rate-change-request", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-audio-gain-change-request"](event) {
    try {
      this.Hg(event.detail, event);
    } catch (e) {
    }
  }
  ["media-quality-change-request"](event) {
    const { qualities, storage, logger } = this.a;
    if (qualities.readonly) {
      return;
    }
    this.g.i.k("media-quality-change-request", event);
    const index = event.detail;
    if (index < 0) {
      qualities.autoSelect(event);
      if (event.isOriginTrusted)
        storage?.setVideoQuality?.(null);
    } else {
      const quality = qualities[index];
      if (quality) {
        quality.selected = true;
        if (event.isOriginTrusted) {
          storage?.setVideoQuality?.({
            id: quality.id,
            width: quality.width,
            height: quality.height,
            bitrate: quality.bitrate
          });
        }
      }
    }
  }
  ["media-pause-controls-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.yc.pause(event);
  }
  ["media-resume-controls-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.yc.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event.detail;
    if (ended())
      this.g.Bc = true;
    const key = event.type;
    this.g.Ja = false;
    this.g.i.ub(key);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek())
      return;
    this.g.i.k(key, event);
    this.C().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    const key = event.type;
    this.g.i.k(key, event);
    this.$state.seeking.set(true);
    this.g.Ja = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.Ba.V(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event) {
    if (this.$state.canLoadPoster())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.Ba.V(this.createEvent("can-load-poster"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this.a.textTracks[index];
    if (track) {
      const key = event.type;
      this.g.i.k(key, event);
      track.setMode(mode, event);
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.C().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted())
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.a.$provider().setMuted(false);
    if (volume() === 0) {
      this.g.i.k(key, event);
      this.C().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume)
      return;
    const key = event.type;
    this.g.i.k(key, event);
    this.C().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this.g.i.k(key, event);
      this.C().setMuted(false);
    }
  }
  Qa(title, error, request) {
    return;
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay)
    return;
  throw Error(
    "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported)
    return;
  throw Error(
    "[vidstack] no fullscreen support"
  );
}
class MediaRequestContext {
  constructor() {
    this.Ja = false;
    this.Ob = false;
    this.Bc = false;
    this.i = new Queue();
  }
}

const TRACKED_EVENT = /* @__PURE__ */ new Set([
  "auto-play",
  "auto-play-fail",
  "can-load",
  "sources-change",
  "source-change",
  "load-start",
  "abort",
  "error",
  "loaded-metadata",
  "loaded-data",
  "can-play",
  "play",
  "play-fail",
  "pause",
  "playing",
  "seeking",
  "seeked",
  "waiting"
]);

class MediaStateManager extends MediaPlayerController {
  constructor(_request, _media) {
    super();
    this.g = _request;
    this.a = _media;
    this.u = /* @__PURE__ */ new Map();
    this.rd = false;
    this.sd = false;
    this.Cc = false;
    this.Ke = null;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, realCurrentTime, paused } = this.$state;
        seeking.set(true);
        realCurrentTime.set(event.detail);
        this.D("media-seeking-request", event);
        if (paused()) {
          this.Pb = event;
          this.Le();
        }
      },
      150,
      { leading: true }
    );
    this.Le = functionDebounce(() => {
      if (!this.Pb)
        return;
      this.sd = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this.Pb });
      this.u.set("waiting", event);
      this.dispatch(event);
      this.Pb = void 0;
      this.sd = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this.Qj.bind(this));
    this.Rj();
    this.Sj();
    this.Tj();
    this.Uj();
    onDispose(this.Vj.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this.a;
    audioTracks[ListSymbol.z]();
    qualities[ListSymbol.z]();
    textTracks[ListSymbol.z]();
    this.Ie();
  }
  V(event) {
    if (!this.scope)
      return;
    const type = event.type;
    untrack(() => this[event.type]?.(event));
    {
      if (TRACKED_EVENT.has(type))
        this.u.set(type, event);
      this.dispatch(event);
    }
  }
  Uj() {
    if (!this.Cc)
      return;
    requestAnimationFrame(() => {
      if (!this.scope)
        return;
      this.a.remote.play(new DOMEvent("dom-connect"));
    });
    this.Cc = false;
  }
  Vj() {
    if (this.Cc)
      return;
    this.Cc = !this.$state.paused();
    this.a.$provider()?.pause();
  }
  vb() {
    this.Qg();
    this.rd = false;
    this.g.Bc = false;
    this.g.Ob = false;
    this.sd = false;
    this.Pb = void 0;
    this.u.clear();
  }
  D(request, event) {
    const requestEvent = this.g.i.xe(request);
    if (!requestEvent)
      return;
    event.request = requestEvent;
    event.triggers.add(requestEvent);
  }
  Rj() {
    this.Je();
    this.Rg();
    const textTracks = this.a.textTracks;
    listenEvent(textTracks, "add", this.Je.bind(this));
    listenEvent(textTracks, "remove", this.Je.bind(this));
    listenEvent(textTracks, "mode-change", this.Rg.bind(this));
  }
  Sj() {
    const qualities = this.a.qualities;
    listenEvent(qualities, "add", this.ld.bind(this));
    listenEvent(qualities, "remove", this.ld.bind(this));
    listenEvent(qualities, "change", this.Za.bind(this));
    listenEvent(qualities, "auto-change", this.Wj.bind(this));
    listenEvent(qualities, "readonly-change", this.Xj.bind(this));
  }
  Tj() {
    const audioTracks = this.a.audioTracks;
    listenEvent(audioTracks, "add", this.Sg.bind(this));
    listenEvent(audioTracks, "remove", this.Sg.bind(this));
    listenEvent(audioTracks, "change", this.Yj.bind(this));
  }
  Je(event) {
    const { textTracks } = this.$state;
    textTracks.set(this.a.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  Rg(event) {
    if (event)
      this.D("media-text-track-change-request", event);
    const current = this.a.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  Sg(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this.a.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  Yj(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this.a.audioTracks.selected);
    if (event)
      this.D("media-audio-track-change-request", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  ld(event) {
    const { qualities } = this.$state;
    qualities.set(this.a.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  Za(event) {
    const { quality } = this.$state;
    quality.set(this.a.qualities.selected);
    if (event)
      this.D("media-quality-change-request", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  Wj() {
    const { qualities } = this.a, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto)
      this.Ie();
  }
  Tg() {
    this.Ie();
    this.Ke = effect(() => {
      const { qualities } = this.a, { mediaWidth, mediaHeight } = this.$state, w = mediaWidth(), h = mediaHeight();
      if (w === 0 || h === 0)
        return;
      let selectedQuality = null, minScore = Infinity;
      for (const quality of qualities) {
        const score = Math.abs(quality.width - w) + Math.abs(quality.height - h);
        if (score < minScore) {
          minScore = score;
          selectedQuality = quality;
        }
      }
      if (selectedQuality) {
        qualities[ListSymbol.ea](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w, height: h } })
        );
      }
    });
  }
  Ie() {
    this.Ke?.();
    this.Ke = null;
  }
  Xj() {
    this.$state.canSetQuality.set(!this.a.qualities.readonly);
  }
  Qj() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event) {
    const prevProvider = this.a.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type)
      return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this.a.$provider.set(event.detail);
    if (prevProvider && event.detail === null) {
      this.Ug(event);
    }
  }
  ["provider-loader-change"](event) {
  }
  ["auto-play"](event) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event) {
    this.$state.autoPlayError.set(event.detail);
    this.vb();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this.u.set("can-load", event);
    this.a.textTracks[TextTrackSymbol.Z]();
    this.D("media-start-loading", event);
  }
  ["can-load-poster"](event) {
    this.$state.canLoadPoster.set(true);
    this.u.set("can-load-poster", event);
    this.D("media-poster-start-loading", event);
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event.detail : providedViewType;
    if (viewType !== currentViewType) {
      {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.scope)
              return;
            this.$state.inferredViewType.set(event.detail);
            this.dispatch("view-type-change", {
              detail: currentViewType,
              trigger: event
            });
          });
        }, 0);
      }
    }
  }
  ["stream-type-change"](event) {
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    const { storage } = this.a, { canPlay } = this.$state;
    this.$state.playbackRate.set(event.detail);
    this.D("media-rate-change-request", event);
    if (canPlay()) {
      storage?.setPlaybackRate?.(event.detail);
    }
  }
  ["remote-playback-change"](event) {
    const { remotePlaybackState, remotePlaybackType } = this.$state, { type, state } = event.detail, isConnected = state === "connected";
    remotePlaybackType.set(type);
    remotePlaybackState.set(state);
    const key = type === "airplay" ? "media-airplay-request" : "media-google-cast-request";
    if (isConnected) {
      this.D(key, event);
    } else {
      const requestEvent = this.g.i.rg(key);
      if (requestEvent) {
        event.request = requestEvent;
        event.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event) {
    const prevSources = this.$state.sources(), newSources = event.detail;
    this.$state.sources.set(newSources);
    this.Zj(prevSources, newSources, event);
  }
  Zj(prevSources, newSources, trigger) {
    let { qualities } = this.a, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc))
        continue;
      const exists = newSources.some((s) => s.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol.cc](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol.z](trigger);
    }
    for (const src of newSources) {
      if (!isVideoQualitySrc(src) || qualities.getBySrc(src.src))
        continue;
      const quality = {
        id: src.id ?? src.height + "p",
        bitrate: null,
        codec: null,
        ...src,
        selected: false
      };
      qualities[ListSymbol.da](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol.Ia]) {
      this.Tg();
      qualities[QualitySymbol.Ia] = this.Tg.bind(this);
      qualities[QualitySymbol.Wa](true, trigger);
    }
  }
  ["source-change"](event) {
    event.isQualityChange = event.originEvent?.type === "quality-change";
    const source = event.detail;
    this.Ug(event, event.isQualityChange);
    this.u.set(event.type, event);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
  }
  Ug(event, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this.a;
    if (!isSourceQualityChange) {
      audioTracks[ListSymbol.z](event);
      qualities[ListSymbol.z](event);
      softResetMediaState(this.$state, isSourceQualityChange);
      this.vb();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this.vb();
  }
  ["abort"](event) {
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this.u.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this.u.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this.u.get("abort");
    if (abortEvent)
      event.triggers.add(abortEvent);
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this.u.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this.u.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this.u.get("loaded-metadata");
    if (loadedMetadata)
      event.triggers.add(loadedMetadata);
    this.Vg(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this.Vg(event.detail);
    const canPlay = this.u.get("can-play");
    if (canPlay)
      event.triggers.add(canPlay);
  }
  Vg(detail) {
    const { seekable, buffered, intrinsicDuration, canPlay } = this.$state;
    canPlay.set(true);
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    const seekableEnd = getTimeRangesEnd(detail.seekable) ?? Infinity;
    intrinsicDuration.set(seekableEnd);
  }
  ["duration-change"](event) {
    const { live, intrinsicDuration, ended } = this.$state, time = event.detail;
    if (!live()) {
      const duration = !Number.isNaN(time) ? time : 0;
      intrinsicDuration.set(duration);
      if (ended())
        this.Wg(event);
    }
  }
  ["progress"](event) {
    const { buffered, bufferedEnd, seekable, seekableEnd, live, intrinsicDuration } = this.$state, { buffered: newBuffered, seekable: newSeekable } = event.detail, newBufferedEnd = getTimeRangesEnd(newBuffered) ?? Infinity, hasBufferedLengthChanged = newBuffered.length !== buffered().length, hasBufferedEndChanged = newBufferedEnd > bufferedEnd(), newSeekableEnd = getTimeRangesEnd(newSeekable) ?? Infinity, hasSeekableLengthChanged = newSeekable.length !== seekable().length, hasSeekableEndChanged = newSeekableEnd > seekableEnd();
    if (hasBufferedLengthChanged || hasBufferedEndChanged) {
      buffered.set(newBuffered);
    }
    if (hasSeekableLengthChanged || hasSeekableEndChanged) {
      seekable.set(newSeekable);
    }
    if (live()) {
      intrinsicDuration.set(newSeekableEnd);
      this.dispatch("duration-change", {
        detail: newSeekableEnd,
        trigger: event
      });
    }
  }
  ["play"](event) {
    const {
      paused,
      autoPlayError,
      ended,
      autoPlaying,
      playsInline,
      pointer,
      muted,
      viewType,
      live,
      userBehindLiveEdge
    } = this.$state;
    this._j();
    if (!paused()) {
      event.stopImmediatePropagation();
      return;
    }
    event.autoPlay = autoPlaying();
    const waitingEvent = this.u.get("waiting");
    if (waitingEvent)
      event.triggers.add(waitingEvent);
    this.D("media-play-request", event);
    this.u.set("play", event);
    paused.set(false);
    autoPlayError.set(null);
    if (event.autoPlay) {
      this.V(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this.g.Bc) {
      this.g.Bc = false;
      ended.set(false);
      this.V(this.createEvent("replay", { trigger: event }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this.a.remote.enterFullscreen("prefer-media", event);
    }
    if (live() && !userBehindLiveEdge()) {
      this.a.remote.seekToLiveEdge(event);
    }
  }
  _j(trigger) {
    const provider = peek(this.a.$provider);
    if (!provider)
      return;
    const { ended, seekableStart, clipStartTime, clipEndTime, realCurrentTime, duration } = this.$state;
    const shouldReset = realCurrentTime() < clipStartTime() || clipEndTime() > 0 && realCurrentTime() >= clipEndTime() || Math.abs(realCurrentTime() - duration()) < 0.1 || ended();
    if (shouldReset) {
      this.dispatch("media-seek-request", {
        detail: (clipStartTime() > 0 ? 0 : seekableStart()) + 0.1,
        trigger
      });
    }
    return shouldReset;
  }
  ["play-fail"](event) {
    const { muted, autoPlaying } = this.$state;
    const playEvent = this.u.get("play");
    if (playEvent)
      event.triggers.add(playEvent);
    this.D("media-play-request", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.vb();
    this.u.set("play-fail", event);
    if (event.autoPlay) {
      this.V(
        this.createEvent("auto-play-fail", {
          detail: {
            muted: muted(),
            error: event.detail
          },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
  }
  ["playing"](event) {
    const playEvent = this.u.get("play"), seekedEvent = this.u.get("seeked");
    if (playEvent)
      event.triggers.add(playEvent);
    else if (seekedEvent)
      event.triggers.add(seekedEvent);
    setTimeout(() => this.vb(), 0);
    const {
      paused,
      playing,
      live,
      liveSyncPosition,
      seekableEnd,
      started,
      currentTime,
      seeking,
      ended
    } = this.$state;
    paused.set(false);
    playing.set(true);
    seeking.set(false);
    ended.set(false);
    if (this.g.Ob) {
      this.g.Ob = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end))
        this.a.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.V(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this.Cc = true;
    }
    this.D("media-pause-request", event);
    const seekedEvent = this.u.get("seeked");
    if (seekedEvent)
      event.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this.rd) {
      setTimeout(() => {
        this.V(this.createEvent("end", { trigger: event }));
        this.rd = false;
      }, 0);
    }
    this.vb();
  }
  ["time-update"](event) {
    if (this.g.Ob) {
      event.stopImmediatePropagation();
      return;
    }
    const { realCurrentTime, played, waiting, clipEndTime } = this.$state, endTime = clipEndTime(), detail = event.detail;
    realCurrentTime.set(detail.currentTime);
    played.set(detail.played);
    waiting.set(false);
    for (const track of this.a.textTracks) {
      track[TextTrackSymbol.Eb](detail.currentTime, event);
    }
    if (endTime > 0 && detail.currentTime >= endTime) {
      this.rd = true;
      this.dispatch("media-pause-request", { trigger: event });
    }
    this.$j();
  }
  // Called to update time again incase duration precision has changed.
  Wg(trigger) {
    const { duration, played } = this.$state, playedStart = getTimeRangesStart(played()) ?? 0;
    this.V(
      this.createEvent("time-update", {
        detail: {
          currentTime: duration(),
          played: new TimeRange(playedStart, duration())
        },
        trigger
      })
    );
  }
  $j() {
    const { storage } = this.a, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event) {
    const { storage } = this.a, { canPlay, audioGain } = this.$state;
    audioGain.set(event.detail);
    this.D("media-audio-gain-change-request", event);
    if (canPlay())
      storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event) {
    const { storage } = this.a, { volume, muted, canPlay } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.D("media-volume-change-request", event);
    this.D(detail.muted ? "media-mute-request" : "media-unmute-request", event);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeked"](event) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this.g.Ja) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.u.get("waiting");
      if (waitingEvent)
        event.triggers.add(waitingEvent);
      const seekingEvent = this.u.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused())
        this.Qg();
      seeking.set(false);
      realCurrentTime.set(event.detail);
      this.D("media-seek-request", event);
      const origin = event?.originEvent;
      if (origin?.isTrusted && !/seek/.test(origin.type)) {
        this["started"](event);
      }
    }
    if (Math.floor(currentTime()) !== Math.floor(seekableEnd())) {
      ended.set(false);
    } else {
      this.end(event);
    }
  }
  ["waiting"](event) {
    if (this.sd || this.g.Ja)
      return;
    event.stopImmediatePropagation();
    this.Pb = event;
    this.Le();
  }
  ["end"](event) {
    const { loop, ended } = this.$state;
    if (!loop() && ended())
      return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.dispatch("media-loop-request", { trigger: event });
        });
      }, 10);
      return;
    }
    setTimeout(() => this.lc(event), 0);
  }
  lc(event) {
    const { storage } = this.a, { paused, seeking, ended, duration } = this.$state;
    this.Wg(event);
    if (!paused()) {
      this.dispatch("pause", { trigger: event });
    }
    if (seeking()) {
      this.dispatch("seeked", {
        detail: duration(),
        trigger: event
      });
    }
    ended.set(true);
    this.vb();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event
    });
  }
  Qg() {
    this.Le.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    const isFullscreen = event.detail;
    this.$state.fullscreen.set(isFullscreen);
    this.D(
      isFullscreen ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event
    );
  }
  ["fullscreen-error"](event) {
    this.D("media-enter-fullscreen-request", event);
    this.D("media-exit-fullscreen-request", event);
  }
  ["orientation-change"](event) {
    const isLocked = event.detail.lock;
    this.D(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event
    );
  }
  ["picture-in-picture-change"](event) {
    const isPiP = event.detail;
    this.$state.pictureInPicture.set(isPiP);
    this.D(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event);
  }
  ["picture-in-picture-error"](event) {
    this.D("media-enter-pip-request", event);
    this.D("media-exit-pip-request", event);
  }
  ["title-change"](event) {
    if (!event.trigger)
      return;
    event.stopImmediatePropagation();
    this.$state.inferredTitle.set(event.detail);
  }
  ["poster-change"](event) {
    if (!event.trigger)
      return;
    event.stopImmediatePropagation();
    this.$state.inferredPoster.set(event.detail);
  }
}

class MediaStateSync extends MediaPlayerController {
  onSetup() {
    this.Hb();
    effect(this.bk.bind(this));
    effect(this.ck.bind(this));
    effect(this.dk.bind(this));
    effect(this.Xd.bind(this));
    effect(this.Ca.bind(this));
    effect(this.ek.bind(this));
    effect(this.fk.bind(this));
    effect(this.gk.bind(this));
    effect(this.hk.bind(this));
    effect(this.ik.bind(this));
    effect(this.Me.bind(this));
    effect(this.jk.bind(this));
    effect(this.kk.bind(this));
    effect(this.td.bind(this));
  }
  Hb() {
    const providedProps = {
      duration: "providedDuration",
      loop: "providedLoop",
      poster: "providedPoster",
      streamType: "providedStreamType",
      title: "providedTitle",
      viewType: "providedViewType"
    };
    const skip = /* @__PURE__ */ new Set([
      "currentTime",
      "paused",
      "playbackRate",
      "volume"
    ]);
    for (const prop of Object.keys(this.$props)) {
      if (skip.has(prop))
        continue;
      this.$state[providedProps[prop] ?? prop]?.set(this.$props[prop]());
    }
    this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  // Sync "provided" props with internal state. Provided props are used to differentiate from
  // provider inferred values.
  kk() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  ak() {
    return;
  }
  bk() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  td() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  ck() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  ik() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  Xd() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  jk() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  Ca() {
    const _crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = _crossOrigin === true ? "" : _crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  ek() {
    const { providedDuration } = this.$state;
    providedDuration.set(this.$props.duration());
  }
  Me() {
    const inline = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline);
    this.dispatch("plays-inline-change", { detail: inline });
  }
  dk() {
    const { clipStartTime, clipEndTime } = this.$props;
    this.$state.clipStartTime.set(clipStartTime());
    this.$state.clipEndTime.set(clipEndTime());
  }
  fk() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  hk() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  gk() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

class NavigatorMediaSession extends MediaPlayerController {
  static {
    this.Xg = ["play", "pause", "seekforward", "seekbackward", "seekto"];
  }
  constructor() {
    super();
  }
  onConnect() {
    effect(this.lk.bind(this));
    effect(this.mk.bind(this));
    const handleAction = this.nk.bind(this);
    for (const action of NavigatorMediaSession.Xg) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this.Fa.bind(this));
  }
  Fa() {
    for (const action of NavigatorMediaSession.Xg) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  lk() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  mk() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  nk(details) {
    const trigger = new DOMEvent(`media-session-action`, { detail: details });
    switch (details.action) {
      case "play":
        this.dispatch("media-play-request", { trigger });
        break;
      case "pause":
        this.dispatch("media-pause-request", { trigger });
        break;
      case "seekto":
      case "seekforward":
      case "seekbackward":
        this.dispatch("media-seek-request", {
          detail: isNumber(details.seekTime) ? details.seekTime : this.$state.currentTime() + (details.seekOffset ?? 10),
          trigger
        });
        break;
    }
  }
}

let $keyboard = signal(false);
{
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e) => {
    if (e.metaKey || e.altKey || e.ctrlKey)
      return;
    $keyboard.set(true);
  });
}
class FocusVisibleController extends ViewController {
  constructor() {
    super(...arguments);
    this.Dc = signal(false);
  }
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this.Dc.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this.Oe.bind(this));
        this.listen("pointerleave", this.Pe.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this.Dc.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this.Ec.bind(this));
      this.listen("blur", this.qk.bind(this));
    });
  }
  focused() {
    return this.Dc();
  }
  Ec() {
    this.Dc.set(true);
    updateFocusAttr(this.el, true);
  }
  qk() {
    this.Dc.set(false);
    updateFocusAttr(this.el, false);
  }
  Oe() {
    updateHoverAttr(this.el, true);
  }
  Pe() {
    updateHoverAttr(this.el, false);
  }
}
function updateFocusAttr(el, isFocused) {
  setAttribute(el, "data-focus", isFocused);
  setAttribute(el, "data-hocus", isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, "data-hocus", isHovering);
  setAttribute(el, "data-hover", isHovering);
}

var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
  return result;
};
const _MediaPlayer = class _MediaPlayer2 extends Component {
  constructor() {
    super();
    this.canPlayQueue = new RequestQueue();
    this.Re = false;
    new MediaStateSync();
    const context = {
      player: this,
      qualities: new VideoQualityList(),
      audioTracks: new AudioTrackList(),
      storage: null,
      $provider: signal(null),
      $providerSetup: signal(false),
      $props: this.$props,
      $state: this.$state
    };
    context.remote = this.remoteControl = new MediaRemoteControl(
      void 0
    );
    context.remote.setPlayer(this);
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol.Db] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this.a = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    const request = new MediaRequestContext();
    this.Ba = new MediaStateManager(request, context);
    this.W = new MediaRequestManager(this.Ba, request, context);
    context.delegate = new MediaPlayerDelegate(
      this.Ba.V.bind(this.Ba),
      context
    );
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      new NavigatorMediaSession();
    }
    new MediaLoadController("load", this.startLoading.bind(this));
    new MediaLoadController("posterLoad", this.startLoadingPoster.bind(this));
  }
  static {
    this.props = mediaPlayerProps;
  }
  static {
    this.state = mediaState;
  }
  get p() {
    return this.a.$provider();
  }
  get vd() {
    return this.$props;
  }
  onSetup() {
    this.rk();
    effect(this.sk.bind(this));
    effect(this.tk.bind(this));
    effect(this.fc.bind(this));
    effect(this.Fc.bind(this));
    effect(this.Qb.bind(this));
    effect(this.Me.bind(this));
    effect(this.Qe.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this.uk.bind(this));
    effect(this.td.bind(this));
    effect(this.Yg.bind(this));
    listenEvent(el, "find-media-player", this.vk.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE)
      setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this.Zg(pointerQuery);
    pointerQuery.onchange = this.Zg.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this.pa.bind(this)));
    resize.observe(el);
    effect(this.pa.bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
    });
  }
  onDestroy() {
    this.a.player = null;
    this.canPlayQueue.z();
  }
  td() {
    const el = this.$el, { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
    );
    if (el?.hasAttribute("title")) {
      this.Re = true;
      el?.removeAttribute("title");
    }
  }
  Yg() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this.pa();
  }
  sk() {
    if (this.$state.canPlay() && this.p)
      this.canPlayQueue.Xa();
    else
      this.canPlayQueue.$();
  }
  rk() {
    if (_MediaPlayer2[MEDIA_ATTRIBUTES]) {
      this.setAttributes(_MediaPlayer2[MEDIA_ATTRIBUTES]);
      return;
    }
    const $attrs = {
      "data-load": function() {
        return this.$props.load();
      },
      "data-captions": function() {
        const track = this.$state.textTrack();
        return !!track && isTrackCaptionKind(track);
      },
      "data-ios-controls": function() {
        return this.$state.iOSControls();
      },
      "data-controls": function() {
        return this.controls.showing;
      },
      "data-buffering": function() {
        const { canLoad, canPlay, waiting } = this.$state;
        return canLoad() && (!canPlay() || waiting());
      },
      "data-error": function() {
        const { error } = this.$state;
        return !!error();
      },
      "data-autoplay-error": function() {
        const { autoPlayError } = this.$state;
        return !!autoPlayError();
      }
    };
    const alias = {
      autoPlay: "autoplay",
      canAirPlay: "can-airplay",
      canPictureInPicture: "can-pip",
      pictureInPicture: "pip",
      playsInline: "playsinline",
      remotePlaybackState: "remote-state",
      remotePlaybackType: "remote-type",
      isAirPlayConnected: "airplay",
      isGoogleCastConnected: "google-cast"
    };
    for (const prop2 of mediaAttributes) {
      const attrName = "data-" + (alias[prop2] ?? camelToKebabCase(prop2));
      $attrs[attrName] = function() {
        return this.$state[prop2]();
      };
    }
    delete $attrs.title;
    _MediaPlayer2[MEDIA_ATTRIBUTES] = $attrs;
    this.setAttributes($attrs);
  }
  vk(event) {
    event.detail(this);
  }
  pa() {
    if (!this.el)
      return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  Zg(queryList) {
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this.pa();
  }
  get provider() {
    return this.p;
  }
  get controls() {
    return this.W.yc;
  }
  set controls(controls) {
    this.vd.controls.set(controls);
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this.Re) {
      this.Re = false;
      return;
    }
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return this.a.qualities;
  }
  get audioTracks() {
    return this.a.audioTracks;
  }
  get textTracks() {
    return this.a.textTracks;
  }
  get textRenderers() {
    return this.a.textRenderers;
  }
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    this.vd.duration.set(duration);
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this._g(paused);
  }
  fc() {
    this._g(this.$props.paused());
  }
  _g(paused) {
    if (paused) {
      this.canPlayQueue.k("paused", () => this.W.Ee());
    } else
      this.canPlayQueue.k("paused", () => this.W.Ac());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    this.vd.muted.set(muted);
  }
  tk() {
    this.wk(this.$props.muted());
  }
  wk(muted) {
    this.canPlayQueue.k("muted", () => {
      if (this.p)
        this.p.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this.$g(time);
  }
  Qb() {
    this.$g(this.$props.currentTime());
  }
  $g(time) {
    this.canPlayQueue.k("currentTime", () => {
      const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
      if (time === peek(currentTime))
        return;
      peek(() => {
        if (!this.p)
          return;
        const clippedTime = time + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
        if (Number.isFinite(boundTime)) {
          this.p.setCurrentTime(boundTime);
        }
      });
    });
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    this.vd.volume.set(volume);
  }
  Fc() {
    this.xk(this.$props.volume());
  }
  xk(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue.k("volume", () => {
      if (this.p)
        this.p.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this.ah(rate);
  }
  Qe() {
    this.ah(this.$props.playbackRate());
  }
  ah(rate) {
    this.canPlayQueue.k("rate", () => {
      if (this.p)
        this.p.setPlaybackRate?.(rate);
    });
  }
  Me() {
    this.yk(this.$props.playsInline());
  }
  yk(inline) {
    this.canPlayQueue.k("playsinline", () => {
      if (this.p)
        this.p.setPlaysInline?.(inline);
    });
  }
  uk() {
    let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
    if (storage?.onChange) {
      const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(this.zk.bind(this));
      effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
    }
    this.a.storage = storage;
    this.a.textTracks.setStorage(storage);
    onDispose(() => {
      storage?.onDestroy?.();
      this.a.storage = null;
      this.a.textTracks.setStorage(null);
    });
  }
  zk() {
    const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
    return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
  }
  async play(trigger) {
    return this.W.Ac(trigger);
  }
  async pause(trigger) {
    return this.W.Ee(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this.W.Jg(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this.W.Lg(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this.W.He(trigger);
  }
  exitPictureInPicture(trigger) {
    return this.W.Ge(trigger);
  }
  seekToLiveEdge(trigger) {
    this.W.Ig(trigger);
  }
  startLoading(trigger) {
    this.a.delegate.c("can-load", void 0, trigger);
  }
  startLoadingPoster(trigger) {
    this.a.delegate.c("can-load-poster", void 0, trigger);
  }
  requestAirPlay(trigger) {
    return this.W.Ng(trigger);
  }
  requestGoogleCast(trigger) {
    return this.W.Og(trigger);
  }
  setAudioGain(gain, trigger) {
    return this.W.Hg(gain, trigger);
  }
  destroy() {
    super.destroy();
    this.a.remote.setPlayer(null);
    this.dispatch("destroy");
  }
};
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "canPlayQueue", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "remoteControl", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "provider", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "controls", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "orientation", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "title", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "qualities", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "audioTracks", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "textTracks", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "textRenderers", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "duration", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "paused", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "muted", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "currentTime", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "volume", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "playbackRate", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "play", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "pause", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "enterFullscreen", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "exitFullscreen", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "enterPictureInPicture", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "exitPictureInPicture", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "seekToLiveEdge", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "startLoading", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "startLoadingPoster", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "requestAirPlay", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "requestGoogleCast", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "setAudioGain", 1);
let MediaPlayer = _MediaPlayer;

function resolveStreamTypeFromDASHManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    return /type="static"/.test(manifest) ? "on-demand" : "live";
  });
}
function resolveStreamTypeFromHLSManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    const renditionURI = resolveHLSRenditionURI(manifest);
    if (renditionURI) {
      return resolveStreamTypeFromHLSManifest(
        /^https?:/.test(renditionURI) ? renditionURI : new URL(renditionURI, manifestSrc).href,
        requestInit
      );
    }
    const streamType = /EXT-X-PLAYLIST-TYPE:\s*VOD/.test(manifest) ? "on-demand" : "live";
    if (streamType === "live" && resolveTargetDuration(manifest) >= 10 && (/#EXT-X-DVR-ENABLED:\s*true/.test(manifest) || manifest.includes("#EXT-X-DISCONTINUITY"))) {
      return "live:dvr";
    }
    return streamType;
  });
}
function resolveHLSRenditionURI(manifest) {
  const matches = manifest.match(/#EXT-X-STREAM-INF:[^\n]+(\n[^\n]+)*/g);
  return matches ? matches[0].split("\n")[1].trim() : null;
}
function resolveTargetDuration(manifest) {
  const lines = manifest.split("\n");
  for (const line of lines) {
    if (line.startsWith("#EXT-X-TARGETDURATION")) {
      const duration = parseFloat(line.split(":")[1]);
      if (!isNaN(duration)) {
        return duration;
      }
    }
  }
  return -1;
}

const sourceTypes = /* @__PURE__ */ new Map();
class SourceSelection {
  constructor(_domSources, _media, _loader, customLoaders = []) {
    this.wd = _domSources;
    this.a = _media;
    this.X = _loader;
    this.Se = false;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this.Te = computed(() => {
      const remoteLoader = _media.$state.remotePlaybackLoader();
      const loaders = _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this.Te().find((loader2) => loader2.canPlay(src));
      if (!loader)
        continue;
      const mediaType = loader.mediaType(src);
      this.a.$state.source.set(src);
      this.a.$state.mediaType.set(mediaType);
      this.a.$state.inferredViewType.set(mediaType);
      this.X.set(loader);
      this.Se = true;
      break;
    }
  }
  get c() {
    return this.a.delegate.c;
  }
  connect() {
    const loader = this.X();
    if (this.Se) {
      this.bh(this.a.$state.source(), loader);
      this.ch(loader);
      this.Se = false;
    }
    effect(this.Ak.bind(this));
    effect(this.Bk.bind(this));
    effect(this.Ck.bind(this));
    effect(this.Dk.bind(this));
    effect(this.Ek.bind(this));
  }
  Ak() {
    this.c("sources-change", [
      ...normalizeSrc(this.a.$props.src()),
      ...this.wd()
    ]);
  }
  Bk() {
    const { $state } = this.a;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this.dh(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
    if (noMatch) {
      const { crossOrigin } = $state, credentials = getRequestCredentials(crossOrigin()), abort = new AbortController();
      Promise.all(
        sources.map(
          (source) => isString(source.src) && source.type === "?" ? fetch(source.src, {
            method: "HEAD",
            credentials,
            signal: abort.signal
          }).then((res) => {
            source.type = res.headers.get("content-type") || "??";
            sourceTypes.set(source.src, source.type);
            return source;
          }).catch(() => source) : source
        )
      ).then((sources2) => {
        if (abort.signal.aborted)
          return;
        this.dh(peek($state.source), sources2);
        tick();
      });
      return () => abort.abort();
    }
    tick();
  }
  dh(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this.Te(), { started, paused, currentTime, quality, savedState } = this.a.$state;
    for (const src of sources) {
      const loader = loaders.find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
        break;
      }
    }
    if (isVideoQualitySrc(newSource)) {
      const currentQuality = quality(), sourceQuality = sources.find((s) => s.src === currentQuality?.src);
      if (peek(started)) {
        savedState.set({
          paused: peek(paused),
          currentTime: peek(currentTime)
        });
      } else {
        savedState.set(null);
      }
      if (sourceQuality) {
        newSource = sourceQuality;
        triggerEvent = new DOMEvent("quality-change", {
          detail: { quality: currentQuality }
        });
      }
    }
    if (!isSameSrc(currentSource, newSource)) {
      this.bh(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this.X)) {
      this.ch(newLoader, triggerEvent);
    }
    return newSource;
  }
  bh(src, loader, trigger) {
    this.c("source-change", src, trigger);
    this.c("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  ch(loader, trigger) {
    this.a.$providerSetup.set(false);
    this.c("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this.a));
    this.X.set(loader);
    this.c("provider-loader-change", loader, trigger);
  }
  Ck() {
    const provider = this.a.$provider();
    if (!provider || peek(this.a.$providerSetup))
      return;
    if (this.a.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this.a.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  Dk() {
    if (!this.a.$providerSetup())
      return;
    const provider = this.a.$provider(), source = this.a.$state.source(), crossOrigin = peek(this.a.$state.crossOrigin), preferNativeHLS = peek(this.a.$props.preferNativeHLS);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this.a.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (preferNativeHLS || !isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossOrigin),
            signal: abort.signal
          }).then((streamType) => {
            this.c("stream-type-change", streamType);
          }).catch(noop);
        }
      } else if (isDASHSrc(source)) {
        resolveStreamTypeFromDASHManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal
        }).then((streamType) => {
          this.c("stream-type-change", streamType);
        }).catch(noop);
      } else {
        this.c("stream-type-change", "on-demand");
      }
      peek(() => {
        const preload = peek(this.a.$state.preload);
        return provider?.loadSource(source, preload).catch((error) => {
        });
      });
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin);
    } catch (error) {
    }
  }
  Ek() {
    const loader = this.X(), { providedPoster, source, canLoadPoster } = this.a.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster())
      return;
    const abort = new AbortController(), trigger = new DOMEvent("source-change", { detail: source });
    loader.loadPoster(source(), this.a, abort).then((url) => {
      this.c("poster-change", url || "", trigger);
    }).catch(() => {
      this.c("poster-change", "", trigger);
    });
    return () => {
      abort.abort();
    };
  }
}
function normalizeSrc(src) {
  return (isArray(src) ? src : [src]).map((src2) => {
    if (isString(src2)) {
      return { src: src2, type: inferType(src2) };
    } else {
      return { ...src2, type: inferType(src2.src, src2.type) };
    }
  });
}
function inferType(src, type) {
  if (isString(type) && type.length) {
    return type;
  } else if (isString(src) && sourceTypes.has(src)) {
    return sourceTypes.get(src);
  } else if (!type && isHLSSrc({ src, type: "" })) {
    return "application/x-mpegurl";
  } else if (!type && isDASHSrc({ src, type: "" })) {
    return "application/dash+xml";
  } else if (!isString(src) || src.startsWith("blob:")) {
    return "video/object";
  } else if (src.includes("youtube") || src.includes("youtu.be")) {
    return "video/youtube";
  } else if (src.includes("vimeo") && !src.includes("progressive_redirect") && !src.includes(".m3u8")) {
    return "video/vimeo";
  }
  return "?";
}
function isSameSrc(a, b) {
  return a?.src === b?.src && a?.type === b?.type;
}

class Tracks {
  constructor(_domTracks, _media) {
    this.xd = _domTracks;
    this.a = _media;
    this.eh = [];
    effect(this.Fk.bind(this));
  }
  Fk() {
    const newTracks = this.xd();
    for (const oldTrack of this.eh) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this.a.textTracks.getById(oldTrack.id);
        if (track)
          this.a.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this.a.textTracks.getById(id)) {
        newTrack.id = id;
        this.a.textTracks.add(newTrack);
      }
    }
    this.eh = newTracks;
  }
}

var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$e(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$e(target, key, result);
  return result;
};
class MediaProvider extends Component {
  constructor() {
    super(...arguments);
    this.wd = signal([]);
    this.xd = signal([]);
    this.X = null;
    this.Ue = -1;
  }
  static {
    this.props = {
      loaders: []
    };
  }
  static {
    this.state = new State({
      loader: null
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.fh = new SourceSelection(
      this.wd,
      this.a,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this.fh.connect();
    new Tracks(this.xd, this.a);
    const resize = new ResizeObserver(animationFrameThrottle(this.pa.bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(this.Gc.bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    this.pa();
    this.Gc();
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    window.cancelAnimationFrame(this.Ue);
    this.Ue = requestAnimationFrame(() => this.Gk(target));
    onDispose(() => {
      window.cancelAnimationFrame(this.Ue);
    });
  }
  Gk(target) {
    if (!this.scope)
      return;
    const loader = this.$state.loader(), { $provider } = this.a;
    if (this.X === loader && loader?.target === target && peek($provider))
      return;
    this.gh();
    this.X = loader;
    if (loader)
      loader.target = target || null;
    if (!loader || !target)
      return;
    loader.load(this.a).then((provider) => {
      if (!this.scope)
        return;
      if (peek(this.$state.loader) !== loader)
        return;
      this.a.delegate.c("provider-change", provider);
    });
  }
  onDestroy() {
    this.X = null;
    this.gh();
  }
  gh() {
    this.a?.delegate.c("provider-change", null);
  }
  pa() {
    if (!this.el)
      return;
    const { player, $state } = this.a, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player)
      return;
    $state.mediaWidth.set(width);
    $state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  Gc() {
    const sources = [], tracks = [], children = this.el.children;
    for (const el of children) {
      if (el.hasAttribute("data-vds"))
        continue;
      if (el instanceof HTMLSourceElement) {
        const src = {
          id: el.id,
          src: el.src,
          type: el.type
        };
        for (const prop of ["id", "src", "width", "height", "bitrate", "codec"]) {
          const value = el.getAttribute(`data-${prop}`);
          if (isString(value))
            src[prop] = /id|src|codec/.test(prop) ? value : Number(value);
        }
        sources.push(src);
      } else if (el instanceof HTMLTrackElement) {
        const track = {
          src: el.src,
          kind: el.track.kind,
          language: el.srclang,
          label: el.label,
          default: el.default,
          type: el.getAttribute("data-type")
        };
        tracks.push({
          id: el.id || TextTrack.createId(track),
          ...track
        });
      }
    }
    this.wd.set(sources);
    this.xd.set(tracks);
    tick();
  }
}
__decorateClass$e([
  method
], MediaProvider.prototype, "load");

function padNumberWithZeroes(num, expectedLength) {
  const str = String(num);
  const actualLength = str.length;
  const shouldPad = actualLength < expectedLength;
  if (shouldPad) {
    const padLength = expectedLength - actualLength;
    const padding = `0`.repeat(padLength);
    return `${padding}${num}`;
  }
  return str;
}
function parseTime(duration) {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc(duration % 3600 / 60);
  const seconds = Math.trunc(duration % 60);
  const fraction = Number((duration - Math.trunc(duration)).toPrecision(3));
  return {
    hours,
    minutes,
    seconds,
    fraction
  };
}
function formatTime(duration, { padHrs = null, padMins = null, showHrs = false, showMs = false } = {}) {
  const { hours, minutes, seconds, fraction } = parseTime(duration), paddedHours = padHrs ? padNumberWithZeroes(hours, 2) : hours, paddedMinutes = padMins || isNull(padMins) && duration >= 3600 ? padNumberWithZeroes(minutes, 2) : minutes, paddedSeconds = padNumberWithZeroes(seconds, 2), paddedMs = showMs && fraction > 0 ? `.${String(fraction).replace(/^0?\./, "")}` : "", time = `${paddedMinutes}:${paddedSeconds}${paddedMs}`;
  return hours > 0 || showHrs ? `${paddedHours}:${time}` : time;
}
function formatSpokenTime(duration) {
  const spokenParts = [];
  const { hours, minutes, seconds } = parseTime(duration);
  if (hours > 0) {
    spokenParts.push(`${hours} hour`);
  }
  if (minutes > 0) {
    spokenParts.push(`${minutes} min`);
  }
  if (seconds > 0 || spokenParts.length === 0) {
    spokenParts.push(`${seconds} sec`);
  }
  return spokenParts.join(" ");
}

class MediaAnnouncer extends Component {
  constructor() {
    super(...arguments);
    this.Ve = false;
    this.Hc = -1;
    this.Xe = -1;
  }
  static {
    this.props = {
      translations: null
    };
  }
  static {
    this.state = new State({
      label: null,
      busy: false
    });
  }
  onSetup() {
    this.a = useMediaContext();
  }
  onAttach(el) {
    el.style.display = "contents";
  }
  onConnect(el) {
    el.setAttribute("data-media-announcer", "");
    setAttributeIfEmpty(el, "role", "status");
    setAttributeIfEmpty(el, "aria-live", "polite");
    const { busy } = this.$state;
    this.setAttributes({
      "aria-busy": () => busy() ? "true" : null
    });
    this.Ve = true;
    effect(this.fc.bind(this));
    effect(this.Fc.bind(this));
    effect(this.Hk.bind(this));
    effect(this.Ik.bind(this));
    effect(this.Jk.bind(this));
    effect(this.Kk.bind(this));
    effect(this.Lk.bind(this));
    tick();
    this.Ve = false;
  }
  fc() {
    const { paused } = this.a.$state;
    this.Rb(!paused() ? "Play" : "Pause");
  }
  Ik() {
    const { fullscreen } = this.a.$state;
    this.Rb(fullscreen() ? "Enter Fullscreen" : "Exit Fullscreen");
  }
  Jk() {
    const { pictureInPicture } = this.a.$state;
    this.Rb(pictureInPicture() ? "Enter PiP" : "Exit PiP");
  }
  Hk() {
    const { textTrack } = this.a.$state;
    this.Rb(textTrack() ? "Closed-Captions On" : "Closed-Captions Off");
  }
  Fc() {
    const { muted, volume, audioGain } = this.a.$state;
    this.Rb(
      muted() || volume() === 0 ? "Mute" : `${Math.round(volume() * (audioGain() ?? 1) * 100)}% ${this.We("Volume")}`
    );
  }
  Kk() {
    const { seeking, currentTime } = this.a.$state, isSeeking = seeking();
    if (this.Hc > 0) {
      window.clearTimeout(this.Xe);
      this.Xe = window.setTimeout(() => {
        if (!this.scope)
          return;
        const newTime = peek(currentTime), seconds = Math.abs(newTime - this.Hc);
        if (seconds >= 1) {
          const isForward = newTime >= this.Hc, spokenTime = formatSpokenTime(seconds);
          this.Rb(
            `${this.We(isForward ? "Seek Forward" : "Seek Backward")} ${spokenTime}`
          );
        }
        this.Hc = -1;
        this.Xe = -1;
      }, 300);
    } else if (isSeeking) {
      this.Hc = peek(currentTime);
    }
  }
  We(word) {
    const { translations } = this.$props;
    return translations?.()?.[word || ""] ?? word;
  }
  Lk() {
    const { label, busy } = this.$state, $label = this.We(label());
    if (this.Ve)
      return;
    busy.set(true);
    const id = window.setTimeout(() => void busy.set(false), 150);
    this.el && setAttribute(this.el, "aria-label", $label);
    if (isString($label)) {
      this.dispatch("change", { detail: $label });
    }
    return () => window.clearTimeout(id);
  }
  Rb(word) {
    const { label } = this.$state;
    label.set(word);
  }
}

class Controls extends Component {
  static {
    this.props = {
      hideDelay: 2e3,
      hideOnMouseLeave: false
    };
  }
  onSetup() {
    this.a = useMediaContext();
    effect(this.Mk.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this.a.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this.hh.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this.hh() });
    });
    effect(this.Nk.bind(this));
    effect(() => {
      const isFullscreen = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen && `env(safe-area-inset-${side})`);
      }
    });
  }
  Nk() {
    if (!this.el)
      return;
    const { nativeControls } = this.a.$state, isHidden = nativeControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  Mk() {
    const { controls } = this.a.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this.a.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  hh() {
    const { controlsVisible } = this.a.$state;
    return controlsVisible();
  }
}

class Popper extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    this.zd = -1;
    this.Ad = -1;
    this.wb = null;
    effect(this.Ok.bind(this));
  }
  onDestroy() {
    this.wb?.();
    this.wb = null;
  }
  Ok() {
    const trigger = this.j.M();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide = this.hide.bind(this);
    this.j.yd(trigger, show, hide);
  }
  show(trigger) {
    this.Ye();
    window.cancelAnimationFrame(this.Ad);
    this.Ad = -1;
    this.wb?.();
    this.wb = null;
    this.zd = window.setTimeout(() => {
      this.zd = -1;
      const content = this.j.q();
      if (content)
        content.style.removeProperty("display");
      peek(() => this.j.E(true, trigger));
    }, this.j.ih?.() ?? 0);
  }
  hide(trigger) {
    this.Ye();
    peek(() => this.j.E(false, trigger));
    this.Ad = requestAnimationFrame(() => {
      this.Ye();
      this.Ad = -1;
      const content = this.j.q();
      if (content) {
        const onHide = () => {
          content.style.display = "none";
          this.wb = null;
        };
        const isAnimated = hasAnimation(content);
        if (isAnimated) {
          this.wb?.();
          const stop = listenEvent(content, "animationend", onHide, { once: true });
          this.wb = stop;
        } else {
          onHide();
        }
      }
    });
  }
  Ye() {
    window.clearTimeout(this.zd);
    this.zd = -1;
  }
}

const tooltipContext = createContext();

let id = 0;
class Tooltip extends Component {
  constructor() {
    super();
    this.ya = `media-tooltip-${++id}`;
    this.M = signal(null);
    this.q = signal(null);
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      M: this.M,
      q: this.q,
      ih: showDelay,
      yd(trigger, show, hide) {
        listenEvent(trigger, "touchstart", (e) => e.preventDefault(), {
          passive: false
        });
        effect(() => {
          if ($keyboard())
            listenEvent(trigger, "focus", show);
          listenEvent(trigger, "blur", hide);
        });
        listenEvent(trigger, "mouseenter", show);
        listenEvent(trigger, "mouseleave", hide);
      },
      E: this.Pk.bind(this)
    });
  }
  static {
    this.props = {
      showDelay: 700
    };
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onSetup() {
    provideContext(tooltipContext, {
      M: this.M,
      q: this.q,
      Ze: this.Ze.bind(this),
      _e: this._e.bind(this),
      $e: this.$e.bind(this),
      af: this.af.bind(this)
    });
  }
  Ze(el) {
    this.M.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this.ya);
  }
  _e(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this.M.set(null);
  }
  $e(el) {
    el.setAttribute("id", this.ya);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this.q.set(el);
  }
  af(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this.q.set(null);
  }
  Pk(isShowing) {
    const trigger = this.M(), content = this.q();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this.ya : null);
    }
    for (const el of [this.el, trigger, content]) {
      el && setAttribute(el, "data-visible", isShowing);
    }
  }
}

class TooltipContent extends Component {
  static {
    this.props = {
      placement: "top center",
      offset: 0,
      alignOffset: 0
    };
  }
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.xb(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this.xb(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip.af(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this.bf.bind(this));
      })
    );
  }
  xb(el) {
    const tooltip = useContext(tooltipContext);
    tooltip.$e(el);
  }
  bf() {
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this.Qk(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  Qk() {
    return useContext(tooltipContext).M();
  }
}

class ToggleButtonController extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    new FocusVisibleController();
    if (_delegate.Sb) {
      new ARIAKeyShortcuts(_delegate.Sb);
    }
  }
  static {
    this.props = {
      disabled: false
    };
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      "data-pressed": this.j.o,
      "aria-pressed": this.Rk.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this.Sk.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this.Tk.bind(this));
    }
  }
  Rk() {
    return ariaBool(this.j.o());
  }
  Uk(event) {
    if (isWriteSignal(this.j.o)) {
      this.j.o.set((p) => !p);
    }
  }
  Sk(event) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    (this.j.r ?? this.Uk).call(this, event);
  }
  Tk(event) {
    if (this.$props.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}

var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$d(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$d(target, key, result);
  return result;
};
class ToggleButton extends Component {
  constructor() {
    super();
    this.jh = signal(false);
    new ToggleButtonController({
      o: this.jh
    });
  }
  static {
    this.props = {
      disabled: false,
      defaultPressed: false
    };
  }
  get pressed() {
    return this.jh();
  }
}
__decorateClass$d([
  prop
], ToggleButton.prototype, "pressed");

class AirPlayButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { canAirPlay, isAirPlayConnected } = this.a.$state;
    this.setAttributes({
      "data-active": isAirPlayConnected,
      "data-supported": canAirPlay,
      "data-state": this.Ic.bind(this),
      "aria-hidden": $ariaBool(() => !canAirPlay())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "airplay");
    setARIALabel(el, this.Jc.bind(this));
  }
  r(event) {
    const remote = this.a.remote;
    remote.requestAirPlay(event);
  }
  o() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState() !== "disconnected";
  }
  Ic() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState();
  }
  Jc() {
    const { remotePlaybackState } = this.a.$state;
    return `AirPlay ${remotePlaybackState()}`;
  }
}

class GoogleCastButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { canGoogleCast, isGoogleCastConnected } = this.a.$state;
    this.setAttributes({
      "data-active": isGoogleCastConnected,
      "data-supported": canGoogleCast,
      "data-state": this.Ic.bind(this),
      "aria-hidden": $ariaBool(() => !canGoogleCast())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "google-cast");
    setARIALabel(el, this.Jc.bind(this));
  }
  r(event) {
    const remote = this.a.remote;
    remote.requestGoogleCast(event);
  }
  o() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState() !== "disconnected";
  }
  Ic() {
    const { remotePlaybackType, remotePlaybackState } = this.a.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState();
  }
  Jc() {
    const { remotePlaybackState } = this.a.$state;
    return `Google Cast ${remotePlaybackState()}`;
  }
}

class PlayButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Sb: "togglePaused",
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { paused, ended } = this.a.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, "Play");
  }
  r(event) {
    const remote = this.a.remote;
    this.o() ? remote.pause(event) : remote.play(event);
  }
  o() {
    const { paused } = this.a.$state;
    return !paused();
  }
}

class CaptionButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Sb: "toggleCaptions",
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "data-active": this.o.bind(this),
      "data-supported": () => !this.Tb(),
      "aria-hidden": $ariaBool(this.Tb.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, "Captions");
  }
  r(event) {
    this.a.remote.toggleCaptions(event);
  }
  o() {
    const { textTrack } = this.a.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  Tb() {
    const { hasCaptions } = this.a.$state;
    return !hasCaptions();
  }
}

class FullscreenButton extends Component {
  static {
    this.props = {
      ...ToggleButtonController.props,
      target: "prefer-media"
    };
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Sb: "toggleFullscreen",
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { fullscreen } = this.a.$state, isSupported = this.Kc.bind(this);
    this.setAttributes({
      "data-active": fullscreen,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "fullscreen");
    setARIALabel(el, "Fullscreen");
  }
  r(event) {
    const remote = this.a.remote, target = this.$props.target();
    this.o() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  o() {
    const { fullscreen } = this.a.$state;
    return fullscreen();
  }
  Kc() {
    const { canFullscreen } = this.a.$state;
    return canFullscreen();
  }
}

class MuteButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Sb: "toggleMuted",
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "data-muted": this.o.bind(this),
      "data-state": this.Ic.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, "Mute");
  }
  r(event) {
    const remote = this.a.remote;
    this.o() ? remote.unmute(event) : remote.mute(event);
  }
  o() {
    const { muted, volume } = this.a.$state;
    return muted() || volume() === 0;
  }
  Ic() {
    const { muted, volume } = this.a.$state, $volume = volume();
    if (muted() || $volume === 0)
      return "muted";
    else if ($volume >= 0.5)
      return "high";
    else if ($volume < 0.5)
      return "low";
  }
}

class PIPButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      o: this.o.bind(this),
      Sb: "togglePictureInPicture",
      r: this.r.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { pictureInPicture } = this.a.$state, isSupported = this.Kc.bind(this);
    this.setAttributes({
      "data-active": pictureInPicture,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "pip");
    setARIALabel(el, "PiP");
  }
  r(event) {
    const remote = this.a.remote;
    this.o() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  o() {
    const { pictureInPicture } = this.a.$state;
    return pictureInPicture();
  }
  Kc() {
    const { canPictureInPicture } = this.a.$state;
    return canPictureInPicture();
  }
}

class SeekButton extends Component {
  static {
    this.props = {
      disabled: false,
      seconds: 30
    };
  }
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.a = useMediaContext();
    const { seeking } = this.a.$state, { seconds } = this.$props, isSupported = this.Kc.bind(this);
    this.setAttributes({
      seconds,
      "data-seeking": seeking,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "seek");
    setARIALabel(el, this.Jc.bind(this));
  }
  onConnect(el) {
    onPress(el, this.r.bind(this));
  }
  Kc() {
    const { canSeek } = this.a.$state;
    return canSeek();
  }
  Jc() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  r(event) {
    const { seconds, disabled } = this.$props;
    if (disabled())
      return;
    const { currentTime } = this.a.$state, seekTo = currentTime() + seconds();
    this.a.remote.seek(seekTo, event);
  }
}

class LiveButton extends Component {
  static {
    this.props = {
      disabled: false
    };
  }
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.a = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this.a.$state, isHidden = () => !live();
    this.setAttributes({
      "data-edge": liveEdge,
      "data-hidden": isHidden,
      "aria-disabled": $ariaBool(() => disabled() || liveEdge()),
      "aria-hidden": $ariaBool(isHidden)
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "live");
  }
  onConnect(el) {
    onPress(el, this.r.bind(this));
  }
  r(event) {
    const { disabled } = this.$props, { liveEdge } = this.a.$state;
    if (disabled() || liveEdge())
      return;
    this.a.remote.seekToLiveEdge(event);
  }
}

const sliderState = new State({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  pointerValue: 0,
  focused: false,
  dragging: false,
  pointing: false,
  hidden: false,
  get active() {
    return this.dragging || this.focused || this.pointing;
  },
  get fillRate() {
    return calcRate(this.min, this.max, this.value);
  },
  get fillPercent() {
    return this.fillRate * 100;
  },
  get pointerRate() {
    return calcRate(this.min, this.max, this.pointerValue);
  },
  get pointerPercent() {
    return this.pointerRate * 100;
  }
});
function calcRate(min, max, value) {
  const range = max - min, offset = value - min;
  return range > 0 ? offset / range : 0;
}

class IntersectionObserverController extends ViewController {
  constructor(_init) {
    super();
    this.Hb = _init;
  }
  onConnect(el) {
    this.Ra = new IntersectionObserver((entries) => {
      this.Hb.callback?.(entries, this.Ra);
    }, this.Hb);
    this.Ra.observe(el);
    onDispose(this.Vk.bind(this));
  }
  /**
   * Disconnect any active intersection observers.
   */
  Vk() {
    this.Ra?.disconnect();
    this.Ra = void 0;
  }
}

const sliderContext = createContext();
const sliderObserverContext = createContext();

function getClampedValue(min, max, value, step) {
  return clampNumber(min, round(value, getNumberOfDecimalPlaces(step)), max);
}
function getValueFromRate(min, max, rate, step) {
  const boundRate = clampNumber(0, rate, 1), range = max - min, fill = range * boundRate, stepRatio = fill / step, steps = step * Math.round(stepRatio);
  return min + steps;
}

const SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1
};
class SliderEventsController extends ViewController {
  constructor(_delegate, _media) {
    super();
    this.j = _delegate;
    this.a = _media;
    this.p = null;
    this.cb = null;
    this.Ub = null;
    this.Bn = false;
    this.cl = functionThrottle(
      (event) => {
        this.db(this.Cd(event), event);
      },
      20,
      { leading: true }
    );
  }
  onSetup() {
    if (hasProvidedContext(sliderObserverContext)) {
      this.Ra = useContext(sliderObserverContext);
    }
  }
  onConnect() {
    effect(this.Wk.bind(this));
    effect(this.Xk.bind(this));
    if (this.j.kh)
      effect(this.Yk.bind(this));
  }
  Yk() {
    const { pointer } = this.a.$state;
    if (pointer() !== "coarse" || !this.j.kh()) {
      this.p = null;
      return;
    }
    this.p = this.a.player.el?.querySelector(
      "media-provider,[data-media-provider]"
    );
    if (!this.p)
      return;
    listenEvent(this.p, "touchstart", this.Zk.bind(this), {
      passive: true
    });
    listenEvent(this.p, "touchmove", this._k.bind(this), {
      passive: false
    });
  }
  Zk(event) {
    this.cb = event.touches[0];
  }
  _k(event) {
    if (isNull(this.cb) || isTouchPinchEvent(event))
      return;
    const touch = event.touches[0], xDiff = touch.clientX - this.cb.clientX, yDiff = touch.clientY - this.cb.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 5) {
      return;
    }
    if (isDragging)
      return;
    event.preventDefault();
    if (Math.abs(xDiff) > 20) {
      this.cb = touch;
      this.Ub = this.$state.value();
      this.cf(this.Ub, event);
    }
  }
  Wk() {
    const { hidden } = this.$props;
    this.listen("focus", this.Ec.bind(this));
    this.listen("keydown", this.ic.bind(this));
    this.listen("keyup", this.hc.bind(this));
    if (hidden() || this.j.v())
      return;
    this.listen("pointerenter", this.Oe.bind(this));
    this.listen("pointermove", this.$k.bind(this));
    this.listen("pointerleave", this.Pe.bind(this));
    this.listen("pointerdown", this.al.bind(this));
  }
  Xk() {
    if (this.j.v() || !this.$state.dragging())
      return;
    listenEvent(document, "pointerup", this.bl.bind(this), { capture: true });
    listenEvent(document, "pointermove", this.cl.bind(this));
    listenEvent(document, "touchmove", this.dl.bind(this), {
      passive: false
    });
  }
  Ec() {
    this.db(this.$state.value());
  }
  df(newValue, trigger) {
    const { value, min, max, dragging } = this.$state;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event);
    this.j.l?.(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event2);
      this.j.S?.(event2);
    }
  }
  db(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this.df(value, trigger);
    }
  }
  Cd(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this.cb && isNumber(this.Ub)) {
        const { width } = this.p.getBoundingClientRect(), rate = (event.clientX - this.cb.clientX) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this.Ub - diff : this.Ub + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this.j.Da(
          getValueFromRate(min(), max(), thumbPositionRate, this.j.qa())
        )
      )
    );
  }
  Oe(event) {
    this.$state.pointing.set(true);
  }
  $k(event) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    this.db(this.Cd(event), event);
  }
  Pe(event) {
    this.$state.pointing.set(false);
  }
  al(event) {
    if (event.button !== 0)
      return;
    const value = this.Cd(event);
    this.cf(value, event);
    this.db(value, event);
  }
  cf(value, trigger) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    dragging.set(true);
    this.a.remote.pauseControls(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event);
    this.j.ef?.(event);
    this.Ra?.onDragStart?.();
  }
  lh(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging())
      return;
    dragging.set(false);
    this.a.remote.resumeControls(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event);
    this.j.Dd?.(event);
    this.cb = null;
    this.Ub = null;
    this.Ra?.onDragEnd?.();
  }
  ic(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey)
      return;
    const { key } = event, jumpValue = this.Cn(event);
    if (!isNull(jumpValue)) {
      this.db(jumpValue, event);
      this.df(jumpValue, event);
      return;
    }
    const newValue = this.Dn(event);
    if (!this.Bn) {
      this.Bn = key === this.ff;
      if (!this.$state.dragging() && this.Bn) {
        this.cf(newValue, event);
      }
    }
    this.db(newValue, event);
    this.ff = key;
  }
  hc(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey || !isNull(this.Cn(event)))
      return;
    const newValue = this.Bn ? this.$state.pointerValue() : this.Dn(event);
    this.df(newValue, event);
    this.lh(newValue, event);
    this.ff = "";
    this.Bn = false;
  }
  Cn(event) {
    let key = event.key, { min, max } = this.$state;
    if (key === "Home" || key === "PageUp") {
      return min();
    } else if (key === "End" || key === "PageDown") {
      return max();
    } else if (!event.metaKey && /^[0-9]$/.test(key)) {
      return (max() - min()) / 10 * Number(key);
    }
    return null;
  }
  Dn(event) {
    const { key, shiftKey } = event;
    event.preventDefault();
    event.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { min, max, value, pointerValue } = this.$state, step = this.j.qa(), keyStep = this.j.eb();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key]), diff = modifiedStep * direction, currentValue = this.Bn ? pointerValue() : this.j.Y?.() ?? value(), steps = (currentValue + diff) / step;
    return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  bl(event) {
    if (event.button !== 0)
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const value = this.Cd(event);
    this.db(value, event);
    this.lh(value, event);
  }
  dl(event) {
    event.preventDefault();
  }
}

const sliderValueFormatContext = createContext(() => ({}));

class SliderController extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    this.Lc = signal(true);
    this.Mc = signal(true);
    this.jl = animationFrameThrottle(
      (fillPercent, pointerPercent) => {
        this.el?.style.setProperty("--slider-fill", fillPercent + "%");
        this.el?.style.setProperty("--slider-pointer", pointerPercent + "%");
      }
    );
  }
  static {
    this.props = {
      hidden: false,
      disabled: false,
      step: 1,
      keyStep: 1,
      orientation: "horizontal",
      shiftKeyMultiplier: 5
    };
  }
  onSetup() {
    this.a = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      bb: this.$props.orientation,
      Ed: this.j.v,
      nh: signal(null)
    });
    effect(this.N.bind(this));
    effect(this.fl.bind(this));
    effect(this.Nc.bind(this));
    this.gl();
    new SliderEventsController(this.j, this.a).attach(this);
    new IntersectionObserverController({
      callback: this.gf.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    effect(this.oh.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.Lc.set));
    effect(this.Ea.bind(this));
  }
  gf(entries) {
    this.Mc.set(entries[0].isIntersecting);
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  Ea() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.Lc() || !this.Mc.bind(this));
  }
  N() {
    const { dragging, value, min, max } = this.$state;
    if (peek(dragging))
      return;
    value.set(getClampedValue(min(), max(), value(), this.j.qa()));
  }
  fl() {
    this.$state.step.set(this.j.qa());
  }
  Nc() {
    if (!this.j.v())
      return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  il() {
    return ariaBool(this.j.v());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  gl() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this.il.bind(this),
      "aria-valuemin": this.j.Tm ?? this.$state.min,
      "aria-valuemax": this.j.hf ?? this.$state.max,
      "aria-valuenow": this.j.O,
      "aria-valuetext": this.j.P,
      "aria-orientation": orientation
    });
  }
  oh() {
    const { fillPercent, pointerPercent } = this.$state;
    this.jl(round(fillPercent(), 3), round(pointerPercent(), 3));
  }
}

class Slider extends Component {
  static {
    this.props = {
      ...SliderController.props,
      min: 0,
      max: 100,
      value: 0
    };
  }
  static {
    this.state = sliderState;
  }
  constructor() {
    super();
    new SliderController({
      qa: this.$props.step,
      eb: this.$props.keyStep,
      Da: Math.round,
      v: this.$props.disabled,
      O: this.O.bind(this),
      P: this.P.bind(this)
    });
  }
  onSetup() {
    effect(this.N.bind(this));
    effect(this.Oc.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  O() {
    const { value } = this.$state;
    return Math.round(value());
  }
  P() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  N() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  Oc() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
}

const cache = /* @__PURE__ */ new Map(), pending = /* @__PURE__ */ new Map();
class ThumbnailsLoader {
  constructor($src, $crossOrigin, _media) {
    this.$src = $src;
    this.$crossOrigin = $crossOrigin;
    this.a = _media;
    this.$images = signal([]);
    effect(this.kl.bind(this));
  }
  static create($src, $crossOrigin) {
    const media = useMediaContext();
    return new ThumbnailsLoader($src, $crossOrigin, media);
  }
  kl() {
    const { canLoad } = this.a.$state;
    if (!canLoad())
      return;
    const src = this.$src(), abort = new AbortController();
    if (!src)
      return;
    if (isString(src) && cache.has(src)) {
      const cues = cache.get(src);
      cache.delete(src);
      cache.set(src, cues);
      if (cache.size > 30) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      this.$images.set(cache.get(src));
    } else if (isString(src)) {
      const crossOrigin = this.$crossOrigin(), currentKey = src + "::" + crossOrigin;
      if (!pending.has(currentKey)) {
        const promise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(src, {
              signal: abort.signal,
              credentials: getRequestCredentials(crossOrigin)
            }), isJSON = response.headers.get("content-type") === "application/json";
            if (isJSON) {
              const json = await response.json();
              if (isArray(json)) {
                if (json[0] && "text" in json[0]) {
                  resolve(this.ph(json));
                } else {
                  for (let i = 0; i < json.length; i++) {
                    const image = json[i];
                    assert(isObject(image), false);
                    assert(
                      "url" in image && isString(image.url),
                      false
                    );
                    assert(
                      "startTime" in image && isNumber(image.startTime),
                      false
                    );
                  }
                  resolve(json);
                }
              } else {
                resolve(this.qh(json));
              }
              return;
            }
            import('media-captions').then(async ({ parseResponse }) => {
              try {
                const { cues } = await parseResponse(response);
                resolve(this.ph(cues));
              } catch (e) {
                reject(e);
              }
            });
          } catch (e) {
            reject(e);
          }
        }).then((images) => {
          if (!abort.signal.aborted)
            cache.set(currentKey, images);
          return images;
        }).catch((error) => {
          if (abort.signal.aborted)
            return;
          this.Q(src, error);
        }).finally(() => {
          if (isString(currentKey))
            pending.delete(currentKey);
        });
        pending.set(currentKey, promise);
      }
      pending.get(currentKey)?.then((images) => {
        if (abort.signal.aborted)
          return;
        this.$images.set(images || []);
      });
    } else if (isArray(src)) {
      try {
        this.$images.set(this.ll(src));
      } catch (error) {
        this.Q(src, error);
      }
    } else {
      try {
        this.$images.set(this.qh(src));
      } catch (error) {
        this.Q(src, error);
      }
    }
    return () => {
      abort.abort();
      this.$images.set([]);
    };
  }
  ll(images) {
    const baseURL = this.rh();
    return images.map((img, i) => {
      assert(
        img.url && isString(img.url));
      assert(
        "startTime" in img && isNumber(img.startTime));
      return {
        ...img,
        url: isString(img.url) ? this.sh(img.url, baseURL) : img.url
      };
    });
  }
  qh(board) {
    assert(isString(board.url));
    assert(isArray(board.tiles) && board.tiles?.length);
    const url = new URL(board.url), images = [];
    const tileWidth = "tile_width" in board ? board.tile_width : board.tileWidth, tileHeight = "tile_height" in board ? board.tile_height : board.tileHeight;
    for (const tile of board.tiles) {
      images.push({
        url,
        startTime: "start" in tile ? tile.start : tile.startTime,
        width: tileWidth,
        height: tileHeight,
        coords: { x: tile.x, y: tile.y }
      });
    }
    return images;
  }
  ph(cues) {
    for (let i = 0; i < cues.length; i++) {
      const cue = cues[i];
      assert(
        "startTime" in cue && isNumber(cue.startTime));
      assert(
        "text" in cue && isString(cue.text));
    }
    const images = [], baseURL = this.rh();
    for (const cue of cues) {
      const [url, hash] = cue.text.split("#"), data = this.ml(hash);
      images.push({
        url: this.sh(url, baseURL),
        startTime: cue.startTime,
        endTime: cue.endTime,
        width: data?.w,
        height: data?.h,
        coords: data && isNumber(data.x) && isNumber(data.y) ? { x: data.x, y: data.y } : void 0
      });
    }
    return images;
  }
  rh() {
    let baseURL = peek(this.$src);
    if (!isString(baseURL) || !/^https?:/.test(baseURL)) {
      return location.href;
    }
    return baseURL;
  }
  sh(src, baseURL) {
    return /^https?:/.test(src) ? new URL(src) : new URL(src, baseURL);
  }
  ml(hash) {
    if (!hash)
      return {};
    const [hashProps, values] = hash.split("="), hashValues = values?.split(","), data = {};
    if (!hashProps || !hashValues) {
      return null;
    }
    for (let i = 0; i < hashProps.length; i++) {
      const value = +hashValues[i];
      if (!isNaN(value))
        data[hashProps[i]] = value;
    }
    return data;
  }
  Q(src, error) {
    return;
  }
}

class Thumbnail extends Component {
  constructor() {
    super(...arguments);
    this.jf = [];
  }
  static {
    this.props = {
      src: null,
      time: 0,
      crossOrigin: null
    };
  }
  static {
    this.state = new State({
      src: "",
      img: null,
      thumbnails: [],
      activeThumbnail: null,
      crossOrigin: null,
      loading: false,
      error: null,
      hidden: false
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.X = ThumbnailsLoader.create(this.$props.src, this.$state.crossOrigin);
    this.Ca();
    this.setAttributes({
      "data-loading": this.Pc.bind(this),
      "data-error": this.fb.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this.kf.bind(this));
    effect(this.Ea.bind(this));
    effect(this.Ca.bind(this));
    effect(this.Ma.bind(this));
    effect(this.nl.bind(this));
    effect(this.th.bind(this));
  }
  kf() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this.tb.bind(this));
    listenEvent(img, "error", this.Q.bind(this));
  }
  Ca() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  Ma() {
    const { src, loading, error } = this.$state;
    if (src()) {
      loading.set(true);
      error.set(null);
    }
    return () => {
      this.ol();
      loading.set(false);
      error.set(null);
    };
  }
  tb() {
    const { loading, error } = this.$state;
    this.th();
    loading.set(false);
    error.set(null);
  }
  Q(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
  Pc() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  fb() {
    const { error } = this.$state;
    return !isNull(error());
  }
  Ea() {
    const { hidden } = this.$state, { duration } = this.a.$state, images = this.X.$images();
    hidden.set(this.fb() || !Number.isFinite(duration()) || images.length === 0);
  }
  uh() {
    return this.$props.time();
  }
  nl() {
    let images = this.X.$images();
    if (!images.length)
      return;
    let time = this.uh(), { src, activeThumbnail } = this.$state, activeIndex = -1, activeImage = null;
    for (let i = images.length - 1; i >= 0; i--) {
      const image = images[i];
      if (time >= image.startTime && (!image.endTime || time < image.endTime)) {
        activeIndex = i;
        break;
      }
    }
    if (images[activeIndex]) {
      activeImage = images[activeIndex];
    }
    activeThumbnail.set(activeImage);
    src.set(activeImage?.url.href || "");
  }
  th() {
    if (!this.scope || this.$state.hidden())
      return;
    const rootEl = this.el, imgEl = this.$state.img(), thumbnail = this.$state.activeThumbnail();
    if (!imgEl || !thumbnail || !rootEl)
      return;
    let width = thumbnail.width ?? imgEl.naturalWidth, height = thumbnail?.height ?? imgEl.naturalHeight, {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width: elWidth,
      height: elHeight
    } = getComputedStyle(this.el);
    if (minWidth === "100%")
      minWidth = parseFloat(elWidth) + "";
    if (minHeight === "100%")
      minHeight = parseFloat(elHeight) + "";
    let minRatio = Math.max(parseInt(minWidth) / width, parseInt(minHeight) / height), maxRatio = Math.min(
      Math.max(parseInt(minWidth), parseInt(maxWidth)) / width,
      Math.max(parseInt(minHeight), parseInt(maxHeight)) / height
    ), scale = !isNaN(maxRatio) && maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this.Vb(rootEl, "--thumbnail-width", `${width * scale}px`);
    this.Vb(rootEl, "--thumbnail-height", `${height * scale}px`);
    this.Vb(imgEl, "width", `${imgEl.naturalWidth * scale}px`);
    this.Vb(imgEl, "height", `${imgEl.naturalHeight * scale}px`);
    this.Vb(
      imgEl,
      "transform",
      thumbnail.coords ? `translate(-${thumbnail.coords.x * scale}px, -${thumbnail.coords.y * scale}px)` : ""
    );
    this.Vb(imgEl, "max-width", "none");
  }
  Vb(el, name, value) {
    el.style.setProperty(name, value);
    this.jf.push(() => el.style.removeProperty(name));
  }
  ol() {
    for (const reset of this.jf)
      reset();
    this.jf = [];
  }
}

var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$c(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$c(target, key, result);
  return result;
};
class SliderVideo extends Component {
  static {
    this.props = {
      src: null,
      crossOrigin: null
    };
  }
  static {
    this.state = new State({
      video: null,
      src: null,
      crossOrigin: null,
      canPlay: false,
      error: null,
      hidden: false
    });
  }
  get video() {
    return this.$state.video();
  }
  onSetup() {
    this.a = useMediaContext();
    this.ia = useState(Slider.state);
    this.Ca();
    this.setAttributes({
      "data-loading": this.Pc.bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": this.fb.bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(this.pl.bind(this));
    effect(this.Mb.bind(this));
    effect(this.Ca.bind(this));
    effect(this.Ea.bind(this));
    effect(this.ql.bind(this));
    effect(this.rl.bind(this));
  }
  pl() {
    const video = this.$state.video();
    if (!video)
      return;
    if (video.readyState >= 2)
      this.ed();
    listenEvent(video, "canplay", this.ed.bind(this));
    listenEvent(video, "error", this.Q.bind(this));
  }
  Mb() {
    const { src } = this.$state, { canLoad } = this.a.$state;
    src.set(canLoad() ? this.$props.src() : null);
  }
  Ca() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  Pc() {
    const { canPlay, hidden } = this.$state;
    return !canPlay() && !hidden();
  }
  fb() {
    const { error } = this.$state;
    return !isNull(error);
  }
  Ea() {
    const { src, hidden } = this.$state, { canLoad, duration } = this.a.$state;
    hidden.set(canLoad() && (!src() || this.fb() || !Number.isFinite(duration())));
  }
  ql() {
    const { src, canPlay, error } = this.$state;
    src();
    canPlay.set(false);
    error.set(null);
  }
  ed(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(true);
    error.set(null);
    this.dispatch("can-play", { trigger: event });
  }
  Q(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(false);
    error.set(event);
    this.dispatch("error", { trigger: event });
  }
  rl() {
    const { video, canPlay } = this.$state, { duration } = this.a.$state, { pointerRate } = this.ia, media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
    if (canUpdate) {
      media.currentTime = pointerRate() * duration();
    }
  }
}
__decorateClass$c([
  prop
], SliderVideo.prototype, "video");

var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$b(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$b(target, key, result);
  return result;
};
class SliderValue extends Component {
  static {
    this.props = {
      type: "pointer",
      format: null,
      showHours: false,
      showMs: false,
      padHours: null,
      padMinutes: null,
      decimalPlaces: 2
    };
  }
  onSetup() {
    this.ia = useState(Slider.state);
    this.Qc = useContext(sliderValueFormatContext);
    this.sl = computed(this.getValueText.bind(this));
  }
  getValueText() {
    const { type, format, decimalPlaces, padHours, padMinutes, showHours, showMs } = this.$props, { value: sliderValue, pointerValue, min, max } = this.ia, _format = format?.() ?? this.Qc.default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (_format === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (this.Qc.percent ?? round)(percent, decimalPlaces()) + "%";
    } else if (_format === "time") {
      return (this.Qc.time ?? formatTime)(value, {
        padHrs: padHours(),
        padMins: padMinutes(),
        showHrs: showHours(),
        showMs: showMs()
      });
    } else {
      return (this.Qc.value?.(value) ?? value.toFixed(2)) + "";
    }
  }
}
__decorateClass$b([
  method
], SliderValue.prototype, "getValueText");

class SliderPreview extends Component {
  constructor() {
    super(...arguments);
    this.vh = animationFrameThrottle(() => {
      const { Ed: _disabled, bb: _orientation } = this.ia;
      if (_disabled())
        return;
      const el = this.el, { offset, noClamp } = this.$props;
      if (!el)
        return;
      updateSliderPreviewPlacement(el, {
        clamp: !noClamp(),
        offset: offset(),
        orientation: _orientation()
      });
    });
  }
  static {
    this.props = {
      offset: 0,
      noClamp: false
    };
  }
  onSetup() {
    this.ia = useContext(sliderContext);
    const { active } = useState(Slider.state);
    this.setAttributes({
      "data-visible": active
    });
  }
  onAttach(el) {
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    const { nh: _preview } = this.ia;
    _preview.set(el);
    onDispose(() => _preview.set(null));
    effect(this.vh.bind(this));
    const resize = new ResizeObserver(this.vh.bind(this));
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
}
function updateSliderPreviewPlacement(el, {
  clamp,
  offset,
  orientation
}) {
  const computedStyle = getComputedStyle(el), width = parseFloat(computedStyle.width), height = parseFloat(computedStyle.height), styles = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  styles[orientation === "horizontal" ? "bottom" : "left"] = `calc(100% + var(--media-slider-preview-offset, ${offset}px))`;
  if (orientation === "horizontal") {
    const widthHalf = width / 2;
    if (!clamp) {
      styles.left = `calc(var(--slider-pointer) - ${widthHalf}px)`;
    } else {
      const leftClamp = `max(0px, calc(var(--slider-pointer) - ${widthHalf}px))`, rightClamp = `calc(100% - ${width}px)`;
      styles.left = `min(${leftClamp}, ${rightClamp})`;
    }
  } else {
    const heightHalf = height / 2;
    if (!clamp) {
      styles.bottom = `calc(var(--slider-pointer) - ${heightHalf}px)`;
    } else {
      const topClamp = `max(${heightHalf}px, calc(var(--slider-pointer) - ${heightHalf}px))`, bottomClamp = `calc(100% - ${height}px)`;
      styles.bottom = `min(${topClamp}, ${bottomClamp})`;
    }
  }
  Object.assign(el.style, styles);
}

class VolumeSlider extends Component {
  constructor() {
    super(...arguments);
    this.wh = functionThrottle(this.Na.bind(this), 25);
  }
  static {
    this.props = {
      ...SliderController.props,
      keyStep: 5,
      shiftKeyMultiplier: 2
    };
  }
  static {
    this.state = sliderState;
  }
  onSetup() {
    this.a = useMediaContext();
    const { audioGain } = this.a.$state;
    provideContext(sliderValueFormatContext, {
      default: "percent",
      value(value) {
        return (value * (audioGain() ?? 1)).toFixed(2);
      },
      percent(value) {
        return Math.round(value * (audioGain() ?? 1));
      }
    });
    new SliderController({
      qa: this.$props.step,
      eb: this.$props.keyStep,
      Da: Math.round,
      v: this.v.bind(this),
      hf: this.hf.bind(this),
      O: this.O.bind(this),
      P: this.P.bind(this),
      S: this.S.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.Fc.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  O() {
    const { value } = this.$state, { audioGain } = this.a.$state;
    return Math.round(value() * (audioGain() ?? 1));
  }
  P() {
    const { value, max } = this.$state, { audioGain } = this.a.$state;
    return round(value() / max() * (audioGain() ?? 1) * 100, 2) + "%";
  }
  hf() {
    const { audioGain } = this.a.$state;
    return this.$state.max() * (audioGain() ?? 1);
  }
  v() {
    const { disabled } = this.$props, { canSetVolume } = this.a.$state;
    return disabled() || !canSetVolume();
  }
  Fc() {
    const { muted, volume } = this.a.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  Na(event) {
    if (!event.trigger)
      return;
    const mediaVolume = round(event.detail / 100, 3);
    this.a.remote.changeVolume(mediaVolume, event);
  }
  l(event) {
    this.wh(event);
  }
  S(event) {
    this.wh(event);
  }
}

class AudioGainSlider extends Component {
  static {
    this.props = {
      ...SliderController.props,
      step: 25,
      keyStep: 25,
      shiftKeyMultiplier: 2,
      min: 0,
      max: 300
    };
  }
  static {
    this.state = sliderState;
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent",
      percent: (_, decimalPlaces) => {
        return round(this.$state.value(), decimalPlaces) + "%";
      }
    });
    new SliderController({
      qa: this.$props.step,
      eb: this.$props.keyStep,
      Da: Math.round,
      v: this.v.bind(this),
      O: this.O.bind(this),
      P: this.P.bind(this),
      S: this.S.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.Oc.bind(this));
    effect(this.tl.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-audio-gain-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Audio Boost");
    const { canSetAudioGain } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetAudioGain,
      "aria-hidden": $ariaBool(() => !canSetAudioGain())
    });
  }
  O() {
    const { value } = this.$state;
    return Math.round(value());
  }
  P() {
    const { value } = this.$state;
    return value() + "%";
  }
  Oc() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  tl() {
    const { audioGain } = this.a.$state, value = ((audioGain() ?? 1) - 1) * 100;
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  v() {
    const { disabled } = this.$props, { canSetAudioGain } = this.a.$state;
    return disabled() || !canSetAudioGain();
  }
  xh(event) {
    if (!event.trigger)
      return;
    const gain = round(1 + event.detail / 100, 2);
    this.a.remote.changeAudioGain(gain, event);
  }
  l(event) {
    this.xh(event);
  }
  S(event) {
    this.xh(event);
  }
}

class SpeedSlider extends Component {
  constructor() {
    super(...arguments);
    this.yh = functionThrottle(this.ul.bind(this), 25);
  }
  static {
    this.props = {
      ...SliderController.props,
      step: 0.25,
      keyStep: 0.25,
      shiftKeyMultiplier: 2,
      min: 0,
      max: 2
    };
  }
  static {
    this.state = sliderState;
  }
  onSetup() {
    this.a = useMediaContext();
    new SliderController({
      qa: this.$props.step,
      eb: this.$props.keyStep,
      Da: this.Da,
      v: this.v.bind(this),
      O: this.O.bind(this),
      P: this.P.bind(this),
      S: this.S.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.Oc.bind(this));
    effect(this.Qe.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-speed-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Speed");
    const { canSetPlaybackRate } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetPlaybackRate,
      "aria-hidden": $ariaBool(() => !canSetPlaybackRate())
    });
  }
  O() {
    const { value } = this.$state;
    return value();
  }
  P() {
    const { value } = this.$state;
    return value() + "x";
  }
  Oc() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  Qe() {
    const { playbackRate } = this.a.$state;
    const newValue = playbackRate();
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  Da(value) {
    return round(value, 2);
  }
  v() {
    const { disabled } = this.$props, { canSetPlaybackRate } = this.a.$state;
    return disabled() || !canSetPlaybackRate();
  }
  ul(event) {
    if (!event.trigger)
      return;
    const rate = event.detail;
    this.a.remote.changePlaybackRate(rate, event);
  }
  l(event) {
    this.yh(event);
  }
  S(event) {
    this.yh(event);
  }
}

class QualitySlider extends Component {
  constructor() {
    super(...arguments);
    this.Rc = computed(() => {
      const { qualities } = this.a.$state;
      return sortVideoQualities(qualities());
    });
    this.zh = functionThrottle(this.Za.bind(this), 25);
  }
  static {
    this.props = {
      ...SliderController.props,
      step: 1,
      keyStep: 1,
      shiftKeyMultiplier: 1
    };
  }
  static {
    this.state = sliderState;
  }
  onSetup() {
    this.a = useMediaContext();
    new SliderController({
      qa: this.$props.step,
      eb: this.$props.keyStep,
      Da: Math.round,
      v: this.v.bind(this),
      O: this.O.bind(this),
      P: this.P.bind(this),
      S: this.S.bind(this),
      l: this.l.bind(this)
    }).attach(this);
    effect(this.vl.bind(this));
    effect(this.wl.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-quality-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Video Quality");
    const { qualities, canSetQuality } = this.a.$state, $supported = computed(() => canSetQuality() && qualities().length > 0);
    this.setAttributes({
      "data-supported": $supported,
      "aria-hidden": $ariaBool(() => !$supported())
    });
  }
  O() {
    const { value } = this.$state;
    return value();
  }
  P() {
    const { quality } = this.a.$state;
    if (!quality())
      return "";
    const { height, bitrate } = quality(), bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null;
    return height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : "Auto";
  }
  vl() {
    const $qualities = this.Rc();
    this.$state.max.set(Math.max(0, $qualities.length - 1));
  }
  wl() {
    let { quality } = this.a.$state, $qualities = this.Rc(), value = Math.max(0, $qualities.indexOf(quality()));
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  v() {
    const { disabled } = this.$props, { canSetQuality, qualities } = this.a.$state;
    return disabled() || qualities().length <= 1 || !canSetQuality();
  }
  Za(event) {
    if (!event.trigger)
      return;
    const { qualities } = this.a, quality = peek(this.Rc)[event.detail];
    this.a.remote.changeQuality(qualities.indexOf(quality), event);
  }
  l(event) {
    this.zh(event);
  }
  S(event) {
    this.zh(event);
  }
}

class TimeSlider extends Component {
  constructor() {
    super();
    this.Ah = signal(null);
    this.mf = false;
    const { noSwipeGesture } = this.$props;
    new SliderController({
      kh: () => !noSwipeGesture(),
      Y: this.Y.bind(this),
      qa: this.qa.bind(this),
      eb: this.eb.bind(this),
      Da: this.Da,
      v: this.v.bind(this),
      O: this.O.bind(this),
      P: this.P.bind(this),
      ef: this.ef.bind(this),
      S: this.S.bind(this),
      Dd: this.Dd.bind(this),
      l: this.l.bind(this)
    });
  }
  static {
    this.props = {
      ...SliderController.props,
      step: 0.1,
      keyStep: 5,
      shiftKeyMultiplier: 2,
      pauseWhileDragging: false,
      noSwipeGesture: false,
      seekingRequestThrottle: 100
    };
  }
  static {
    this.state = sliderState;
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this.xl.bind(this),
      time: this.yl.bind(this)
    });
    this.setAttributes({
      "data-chapters": this.zl.bind(this)
    });
    this.setStyles({
      "--slider-progress": this.Al.bind(this)
    });
    effect(this.Qb.bind(this));
    effect(this.Bl.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this.Cl.bind(this));
    watchActiveTextTrack(this.a.textTracks, "chapters", this.Ah.set);
  }
  Al() {
    const { bufferedEnd, duration } = this.a.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  zl() {
    const { duration } = this.a.$state;
    return this.Ah()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  Bl() {
    this.lf = functionThrottle(
      this.Ja.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  Qb() {
    if (this.$state.hidden())
      return;
    const { value, dragging } = this.$state, newValue = this.Y();
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  Cl() {
    const player = this.a.player.el, { nh: _preview } = useContext(sliderContext);
    player && _preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  Ja(time, event) {
    this.a.remote.seeking(time, event);
  }
  Dl(time, percent, event) {
    this.lf.cancel();
    const { live } = this.a.$state;
    if (live() && percent >= 99) {
      this.a.remote.seekToLiveEdge(event);
      return;
    }
    this.a.remote.seek(time, event);
  }
  ef(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this.a.$state;
      this.mf = !paused();
      this.a.remote.pause(event);
    }
  }
  S(event) {
    this.lf(this.Wb(event.detail), event);
  }
  Dd(event) {
    const { seeking } = this.a.$state;
    if (!peek(seeking))
      this.Ja(this.Wb(event.detail), event);
    const percent = event.detail;
    this.Dl(this.Wb(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this.mf) {
      this.a.remote.play(event);
      this.mf = false;
    }
  }
  l(event) {
    const { dragging } = this.$state;
    if (dragging() || !event.trigger)
      return;
    this.Dd(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  Y() {
    const { currentTime } = this.a.$state;
    return this.El(currentTime());
  }
  qa() {
    const value = this.$props.step() / this.a.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  eb() {
    const value = this.$props.keyStep() / this.a.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  Da(value) {
    return round(value, 3);
  }
  v() {
    const { disabled } = this.$props, { canSeek } = this.a.$state;
    return disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  O() {
    const { value } = this.$state;
    return Math.round(value());
  }
  P() {
    const time = this.Wb(this.$state.value()), { duration } = this.a.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  Wb(percent) {
    const { duration } = this.a.$state;
    return round(percent / 100 * duration(), 5);
  }
  El(time) {
    const { liveEdge, duration } = this.a.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  xl(percent) {
    const time = this.Wb(percent), { live, duration } = this.a.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  yl(percent, options) {
    const time = this.Wb(percent), { live, duration } = this.a.$state, value = live() ? time - duration() : time;
    return Number.isFinite(time) ? `${value < 0 ? "-" : ""}${formatTime(Math.abs(value), options)}` : "LIVE";
  }
}

var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$a(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$a(target, key, result);
  return result;
};
class SliderChapters extends Component {
  constructor() {
    super(...arguments);
    this.yb = null;
    this.ja = [];
    this.Gd = signal(null);
    this.ka = signal([]);
    this.Xb = signal(-1);
    this.Hd = signal(-1);
    this.Sc = 0;
    this.Ml = animationFrameThrottle((bufferedPercent) => {
      let percent, cues = this.ka(), { clipStartTime } = this.a.$state, startTime = clipStartTime(), endTime = this.qf(cues);
      for (let i = this.Sc; i < this.ja.length; i++) {
        percent = this.pf(cues[i], bufferedPercent, startTime, endTime);
        this.ja[i]?.style.setProperty("--chapter-progress", percent + "%");
        if (percent < 100) {
          this.Sc = i;
          break;
        }
      }
    });
    this.Nl = computed(this.Ol.bind(this));
    this.Id = functionDebounce(
      () => {
        const track = peek(this.Gd);
        if (!this.scope || !track || !track.cues.length)
          return;
        this.ka.set(this.Pl(track.cues));
        this.Xb.set(0);
        this.Sc = 0;
      },
      150,
      true
    );
  }
  static {
    this.props = {
      disabled: false
    };
  }
  get cues() {
    return this.ka();
  }
  get activeCue() {
    return this.ka()[this.Xb()] || null;
  }
  get activePointerCue() {
    return this.ka()[this.Hd()] || null;
  }
  onSetup() {
    this.a = useMediaContext();
    this.Fd = useState(TimeSlider.state);
  }
  onAttach(el) {
    watchActiveTextTrack(this.a.textTracks, "chapters", this.Bh.bind(this));
    effect(this.Fl.bind(this));
  }
  onConnect() {
    onDispose(() => this.z.bind(this));
  }
  onDestroy() {
    this.Bh(null);
  }
  setRefs(refs) {
    this.ja = refs;
    this.nf?.dispose();
    if (this.ja.length === 1) {
      const el = this.ja[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (this.ja.length > 0) {
      scoped(() => this.Gl(), this.nf = createScope());
    }
  }
  Bh(track) {
    if (peek(this.Gd) === track)
      return;
    this.z();
    this.Gd.set(track);
  }
  z() {
    this.ja = [];
    this.ka.set([]);
    this.Xb.set(-1);
    this.Hd.set(-1);
    this.Sc = 0;
    this.nf?.dispose();
  }
  Gl() {
    if (!this.ja.length)
      return;
    effect(this.Hl.bind(this));
  }
  Hl() {
    const { hidden } = this.Fd;
    if (hidden())
      return;
    effect(this.Il.bind(this));
    effect(this.Jl.bind(this));
    effect(this.Kl.bind(this));
    effect(this.Ll.bind(this));
  }
  Il() {
    const cues = this.ka();
    if (!cues.length)
      return;
    let cue, { clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || cues[cues.length - 1].endTime, duration = endTime - startTime, remainingWidth = 100;
    for (let i = 0; i < cues.length; i++) {
      cue = cues[i];
      if (this.ja[i]) {
        const width = i === cues.length - 1 ? remainingWidth : round((cue.endTime - Math.max(startTime, cue.startTime)) / duration * 100, 3);
        this.ja[i].style.width = width + "%";
        remainingWidth -= width;
      }
    }
  }
  Jl() {
    let { liveEdge, clipStartTime, duration } = this.a.$state, { fillPercent, value } = this.Fd, cues = this.ka(), isLiveEdge = liveEdge(), prevActiveIndex = peek(this.Xb), currentChapter = cues[prevActiveIndex];
    let currentActiveIndex = isLiveEdge ? this.ka.length - 1 : this.Ch(
      currentChapter ? currentChapter.startTime / duration() * 100 <= peek(value) ? prevActiveIndex : 0 : 0,
      fillPercent()
    );
    if (isLiveEdge || !currentChapter) {
      this.of(0, cues.length, 100);
    } else if (currentActiveIndex > prevActiveIndex) {
      this.of(prevActiveIndex, currentActiveIndex, 100);
    } else if (currentActiveIndex < prevActiveIndex) {
      this.of(currentActiveIndex + 1, prevActiveIndex + 1, 0);
    }
    const percent = isLiveEdge ? 100 : this.pf(
      cues[currentActiveIndex],
      fillPercent(),
      clipStartTime(),
      this.qf(cues)
    );
    this.Dh(this.ja[currentActiveIndex], percent);
    this.Xb.set(currentActiveIndex);
  }
  Kl() {
    let { pointing, pointerPercent } = this.Fd;
    if (!pointing()) {
      this.Hd.set(-1);
      return;
    }
    const activeIndex = this.Ch(0, pointerPercent());
    this.Hd.set(activeIndex);
  }
  of(start, end, percent) {
    for (let i = start; i < end; i++)
      this.Dh(this.ja[i], percent);
  }
  Dh(ref, percent) {
    if (!ref)
      return;
    ref.style.setProperty("--chapter-fill", percent + "%");
    setAttribute(ref, "data-active", percent > 0 && percent < 100);
    setAttribute(ref, "data-ended", percent === 100);
  }
  Ch(startIndex, percent) {
    let chapterPercent = 0, cues = this.ka();
    if (percent === 0)
      return 0;
    else if (percent === 100)
      return cues.length - 1;
    let { clipStartTime } = this.a.$state, startTime = clipStartTime(), endTime = this.qf(cues);
    for (let i = startIndex; i < cues.length; i++) {
      chapterPercent = this.pf(cues[i], percent, startTime, endTime);
      if (chapterPercent >= 0 && chapterPercent < 100)
        return i;
    }
    return 0;
  }
  Ll() {
    this.Ml(this.Nl());
  }
  Ol() {
    const { bufferedEnd, duration } = this.a.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  qf(cues) {
    const { clipEndTime } = this.a.$state, endTime = clipEndTime();
    return endTime > 0 ? endTime : cues[cues.length - 1]?.endTime || 0;
  }
  pf(cue, percent, startTime, endTime) {
    const cues = this.ka();
    if (cues.length === 0)
      return 0;
    const duration = endTime - startTime, cueStartTime = Math.max(0, cue.startTime - startTime), cueEndTime = Math.min(endTime, cue.endTime) - startTime;
    const startRatio = cueStartTime / duration, startPercent = startRatio * 100, endPercent = Math.min(1, startRatio + (cueEndTime - cueStartTime) / duration) * 100;
    return Math.max(
      0,
      round(
        percent >= endPercent ? 100 : (percent - startPercent) / (endPercent - startPercent) * 100,
        3
      )
    );
  }
  Pl(cues) {
    let chapters = [], { clipStartTime, clipEndTime, duration } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    cues = cues.filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime);
    const firstCue = cues[0];
    if (firstCue && firstCue.startTime > startTime) {
      chapters.push(new window.VTTCue(startTime, firstCue.startTime, ""));
    }
    for (let i = 0; i < cues.length - 1; i++) {
      const currentCue = cues[i], nextCue = cues[i + 1];
      chapters.push(currentCue);
      if (nextCue) {
        const timeDiff = nextCue.startTime - currentCue.endTime;
        if (timeDiff > 0) {
          chapters.push(new window.VTTCue(currentCue.endTime, currentCue.endTime + timeDiff, ""));
        }
      }
    }
    const lastCue = cues[cues.length - 1];
    if (lastCue) {
      chapters.push(lastCue);
      const endTime2 = duration();
      if (endTime2 >= 0 && endTime2 - lastCue.endTime > 1) {
        chapters.push(new window.VTTCue(lastCue.endTime, duration(), ""));
      }
    }
    return chapters;
  }
  Fl() {
    const { source } = this.a.$state;
    source();
    this.pc();
  }
  pc() {
    if (!this.scope)
      return;
    const { disabled } = this.$props;
    if (disabled()) {
      this.ka.set([]);
      this.Xb.set(0);
      this.Sc = 0;
      return;
    }
    const track = this.Gd();
    if (track) {
      const onCuesChange = this.Id.bind(this);
      onCuesChange();
      onDispose(listenEvent(track, "add-cue", onCuesChange));
      onDispose(listenEvent(track, "remove-cue", onCuesChange));
      effect(this.Ql.bind(this));
    }
    this.yb = this.Rl();
    if (this.yb)
      effect(this.Sl.bind(this));
    return () => {
      if (this.yb) {
        this.yb.textContent = "";
        this.yb = null;
      }
    };
  }
  Ql() {
    this.a.$state.duration();
    this.Id();
  }
  Sl() {
    const cue = this.activePointerCue || this.activeCue;
    if (this.yb)
      this.yb.textContent = cue?.text || "";
  }
  Tl() {
    let node = this.el;
    while (node && node.getAttribute("role") !== "slider") {
      node = node.parentElement;
    }
    return node;
  }
  Rl() {
    const slider = this.Tl();
    return slider ? slider.querySelector('[data-part="chapter-title"]') : null;
  }
}
__decorateClass$a([
  prop
], SliderChapters.prototype, "cues");
__decorateClass$a([
  prop
], SliderChapters.prototype, "activeCue");
__decorateClass$a([
  prop
], SliderChapters.prototype, "activePointerCue");
__decorateClass$a([
  method
], SliderChapters.prototype, "setRefs");

const menuContext = createContext();

function scrollIntoView(el, options) {
  const scrolls = r(el, options);
  for (const { el: el2, top, left } of scrolls) {
    el2.scroll({ top, left, behavior: options.behavior });
  }
}
function scrollIntoCenter(el, options = {}) {
  scrollIntoView(el, {
    scrollMode: "if-needed",
    block: "center",
    inline: "center",
    ...options
  });
}

const FOCUSABLE_ELEMENTS_SELECTOR = /* @__PURE__ */ [
  "a[href]",
  "[tabindex]",
  "input",
  "select",
  "button"
].map((selector) => `${selector}:not([aria-hidden='true'])`).join(",");
const VALID_KEYS = /* @__PURE__ */ new Set([
  "Escape",
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "PageUp",
  "End",
  "PageDown",
  "Enter",
  " "
]);
class MenuFocusController {
  constructor(_delegate) {
    this.j = _delegate;
    this.Tc = -1;
    this.Sa = null;
    this.ra = [];
  }
  get A() {
    return this.ra;
  }
  Ul(el) {
    listenEvent(el, "focus", this.Ec.bind(this));
    this.Sa = el;
    onDispose(() => {
      this.Sa = null;
    });
  }
  yd() {
    if (!this.Sa)
      return;
    this.Ha();
    listenEvent(this.Sa, "keyup", this.hc.bind(this));
    listenEvent(this.Sa, "keydown", this.ic.bind(this));
    onDispose(() => {
      this.Tc = -1;
      this.ra = [];
    });
  }
  Ha() {
    this.Tc = 0;
    this.ra = this.Vl();
  }
  Eh(index = this.Fh()) {
    const element = this.ra[index];
    if (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollIntoCenter(element, {
            behavior: "smooth",
            boundary: (el) => {
              return !el.hasAttribute("data-root");
            }
          });
        });
      });
    }
  }
  Gh(scroll = true) {
    const index = this.Fh();
    this.Yb(index >= 0 ? index : 0, scroll);
  }
  Yb(index, scroll = true) {
    this.Tc = index;
    if (this.ra[index]) {
      this.ra[index].focus({ preventScroll: true });
      if (scroll)
        this.Eh(index);
    } else {
      this.Sa?.focus({ preventScroll: true });
    }
  }
  Fh() {
    return this.ra.findIndex(
      (el) => document.activeElement === el || el.getAttribute("role") === "menuitemradio" && el.getAttribute("aria-checked") === "true"
    );
  }
  Ec() {
    if (this.Tc >= 0)
      return;
    this.Ha();
    this.Gh();
  }
  Hh(event) {
    const el = event.target;
    if (wasEnterKeyPressed(event) && el instanceof Element) {
      const role = el.getAttribute("role");
      return !/a|input|select|button/.test(el.localName) && !role;
    }
    return VALID_KEYS.has(event.key);
  }
  hc(event) {
    if (!this.Hh(event))
      return;
    event.stopPropagation();
    event.preventDefault();
  }
  ic(event) {
    if (!this.Hh(event))
      return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this.j.Wl(event);
        break;
      case "Tab":
        this.Yb(this.rf(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this.Yb(this.rf(-1));
        break;
      case "ArrowDown":
        this.Yb(this.rf(1));
        break;
      case "Home":
      case "PageUp":
        this.Yb(0);
        break;
      case "End":
      case "PageDown":
        this.Yb(this.ra.length - 1);
        break;
    }
  }
  rf(delta) {
    let index = this.Tc;
    do {
      index = (index + delta + this.ra.length) % this.ra.length;
    } while (this.ra[index]?.offsetParent === null);
    return index;
  }
  Vl() {
    if (!this.Sa)
      return [];
    const focusableElements = this.Sa.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (isHTMLElement(el) && el.offsetParent !== null && // does not have display: none
      isElementParent(this.Sa, el, is)) {
        elements.push(el);
      }
    }
    return elements;
  }
}

var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$9(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$9(target, key, result);
  return result;
};
let idCount = 0;
class Menu extends Component {
  constructor() {
    super();
    this.T = signal(false);
    this.Ed = signal(false);
    this.M = signal(null);
    this.q = signal(null);
    this.Vc = /* @__PURE__ */ new Set();
    this.Jd = null;
    this.Ld = false;
    this.Ih = signal(false);
    this.Md = /* @__PURE__ */ new Set();
    this.zf = false;
    this.im = this.jm.bind(this);
    this.Cf = false;
    this.gm = this.km.bind(this);
    this.hm = this.lm.bind(this);
    this.pa = animationFrameThrottle(() => {
      const content = peek(this.q);
      if (!content || false)
        return;
      let height = 0, styles = getComputedStyle(content), children = [...content.children];
      for (const prop2 of ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"]) {
        height += parseFloat(styles[prop2]) || 0;
      }
      for (const child of children) {
        if (isHTMLElement(child) && child.style.display === "contents") {
          children.push(...child.children);
        } else if (child.nodeType === 3) {
          height += parseFloat(getComputedStyle(child).fontSize);
        } else if (isHTMLElement(child)) {
          if (!isElementVisible(child))
            continue;
          const style = getComputedStyle(child);
          height += child.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
        }
      }
      setStyle(content, "--menu-height", height + "px");
    });
    this.Bf = false;
    const { showDelay } = this.$props;
    this.Kd = new Popper({
      M: this.M,
      q: this.q,
      ih: showDelay,
      yd: (trigger, show, hide) => {
        onPress(trigger, (event) => {
          if (this.T())
            hide(event);
          else
            show(event);
        });
        const closeTarget = this.Xl();
        if (closeTarget) {
          onPress(closeTarget, (event) => {
            event.stopPropagation();
            hide(event);
          });
        }
      },
      E: this.Yl.bind(this)
    });
  }
  static {
    this.props = {
      showDelay: 0
    };
  }
  get triggerElement() {
    return this.M();
  }
  get contentElement() {
    return this.q();
  }
  get isSubmenu() {
    return !!this.Uc;
  }
  onSetup() {
    this.a = useMediaContext();
    const currentIdCount = ++idCount;
    this.sf = `media-menu-${currentIdCount}`;
    this.tf = `media-menu-button-${currentIdCount}`;
    this.Zb = new MenuFocusController({
      Wl: this.close.bind(this)
    });
    if (hasProvidedContext(menuContext)) {
      this.Uc = useContext(menuContext);
    }
    this.Zl();
    this.setAttributes({
      "data-open": this.T,
      "data-root": !this.isSubmenu,
      "data-submenu": this.isSubmenu,
      "data-disabled": this.v.bind(this)
    });
    provideContext(menuContext, {
      _l: this.M,
      q: this.q,
      T: this.T,
      _b: signal(""),
      Um: !!this.Uc,
      gb: this.gb.bind(this),
      uf: this.uf.bind(this),
      vf: this.vf.bind(this),
      wf: this.wf.bind(this),
      xf: this.xf.bind(this),
      yf: this.yf.bind(this),
      $l: (callback) => {
        this.Md.add(callback);
        onDispose(() => {
          this.Md.delete(callback);
        });
      }
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onConnect(el) {
    effect(this.am.bind(this));
    if (this.isSubmenu) {
      this.Uc?.yf(this);
    }
  }
  onDestroy() {
    this.M.set(null);
    this.q.set(null);
    this.Jd = null;
    this.Md.clear();
  }
  Zl() {
    let sliderActiveTimer = -1, parentSliderObserver = hasProvidedContext(sliderObserverContext) ? useContext(sliderObserverContext) : null;
    provideContext(sliderObserverContext, {
      onDragStart: () => {
        parentSliderObserver?.onDragStart?.();
        window.clearTimeout(sliderActiveTimer);
        sliderActiveTimer = -1;
        this.Ld = true;
      },
      onDragEnd: () => {
        parentSliderObserver?.onDragEnd?.();
        sliderActiveTimer = window.setTimeout(() => {
          this.Ld = false;
          sliderActiveTimer = -1;
        }, 300);
      }
    });
  }
  am() {
    const expanded = this.bm();
    if (!this.isSubmenu)
      this.pa();
    this.Jh(expanded);
    if (!expanded)
      return;
    effect(() => {
      const { height } = this.a.$state, content = this.q();
      content && setStyle(content, "--player-height", height() + "px");
    });
    this.Zb.yd();
    this.listen("pointerup", this.cm.bind(this));
    listenEvent(window, "pointerup", this.dm.bind(this));
  }
  uf(button) {
    const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(this.v.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this.tf);
    setAttribute(el, "aria-haspopup", "menu");
    setAttribute(el, "aria-expanded", "false");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    const watchAttrs = () => {
      setAttribute(el, "data-open", this.T());
      setAttribute(el, "aria-disabled", isARIADisabled());
    };
    effect(watchAttrs);
    this.M.set(el);
    onDispose(() => {
      this.M.set(null);
    });
  }
  vf(items) {
    const el = items.el;
    el.style.setProperty("display", "none");
    setAttribute(el, "id", this.sf);
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    this.q.set(el);
    onDispose(() => this.q.set(null));
    const watchAttrs = () => setAttribute(el, "data-open", this.T());
    effect(watchAttrs);
    this.Zb.Ul(el);
    this.Jh(false);
    const onTransition = this.em.bind(this);
    if (!this.isSubmenu) {
      items.listen("transitionstart", onTransition);
      items.listen("transitionend", onTransition);
      items.listen("animationend", this.pa);
      items.listen("vds-menu-resize", this.pa);
    } else {
      this.Uc?.$l(onTransition);
    }
  }
  wf(observer) {
    this.Jd = observer;
  }
  Jh(expanded) {
    const content = peek(this.q);
    if (content)
      setAttribute(content, "aria-hidden", ariaBool(!expanded));
  }
  xf(disabled) {
    this.Ih.set(disabled);
  }
  Yl(isExpanded, event) {
    this.zf = isKeyboardEvent(event);
    event?.stopPropagation();
    if (this.T() === isExpanded)
      return;
    if (this.v()) {
      if (isExpanded)
        this.Kd.hide(event);
      return;
    }
    this.el?.dispatchEvent(
      new Event("vds-menu-resize", {
        bubbles: true,
        composed: true
      })
    );
    const trigger = this.M(), content = this.q();
    if (trigger) {
      setAttribute(trigger, "aria-controls", isExpanded && this.sf);
      setAttribute(trigger, "aria-expanded", ariaBool(isExpanded));
    }
    if (content)
      setAttribute(content, "aria-labelledby", isExpanded && this.tf);
    this.T.set(isExpanded);
    this.fm(event);
    tick();
    if (this.zf) {
      if (isExpanded)
        content?.focus();
      else
        trigger?.focus();
      for (const el of [this.el, content]) {
        el && el.setAttribute("data-keyboard", "");
      }
    } else {
      for (const el of [this.el, content]) {
        el && el.removeAttribute("data-keyboard");
      }
    }
    this.dispatch(isExpanded ? "open" : "close", { trigger: event });
    if (isExpanded) {
      if (!this.isSubmenu && this.a.activeMenu !== this) {
        this.a.activeMenu?.close(event);
        this.a.activeMenu = this;
      }
      this.Jd?.Af?.(event);
    } else {
      if (this.isSubmenu) {
        for (const el of this.Vc)
          el.close(event);
      } else {
        this.a.activeMenu = null;
      }
      this.Jd?.Vm?.(event);
    }
    if (isExpanded) {
      requestAnimationFrame(this.Kh.bind(this));
    }
  }
  Kh() {
    if (this.Bf || this.Cf)
      return;
    this.Zb.Ha();
    requestAnimationFrame(() => {
      if (this.zf) {
        this.Zb.Gh();
      } else {
        this.Zb.Eh();
      }
    });
  }
  bm() {
    return !this.v() && this.T();
  }
  v() {
    return this.Ed() || this.Ih();
  }
  gb(disabled) {
    this.Ed.set(disabled);
  }
  cm(event) {
    const content = this.q();
    if (this.Ld || content && isEventInside(content, event)) {
      return;
    }
    event.stopPropagation();
  }
  dm(event) {
    const content = this.q();
    if (this.Ld || content && isEventInside(content, event)) {
      return;
    }
    this.close(event);
  }
  Xl() {
    const target = this.el?.querySelector('[data-part="close-target"]');
    return this.el && target && isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
  }
  fm(trigger) {
    if (this.isSubmenu)
      return;
    if (this.T())
      this.a.remote.pauseControls(trigger);
    else
      this.a.remote.resumeControls(trigger);
  }
  yf(menu) {
    this.Vc.add(menu);
    listenEvent(menu, "open", this.gm);
    listenEvent(menu, "close", this.hm);
    onDispose(this.im);
  }
  jm(menu) {
    this.Vc.delete(menu);
  }
  km(event) {
    this.Cf = true;
    const content = this.q();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "true");
    }
    for (const target of this.Vc) {
      if (target !== event.target) {
        for (const el of [target.el, target.triggerElement]) {
          el?.setAttribute("aria-hidden", "true");
        }
      }
    }
    if (content) {
      const el = event.target.el;
      for (const child of content.children) {
        if (child.contains(el)) {
          child.setAttribute("data-open", "");
        } else if (child !== el) {
          child.setAttribute("data-hidden", "");
        }
      }
    }
  }
  lm(event) {
    this.Cf = false;
    const content = this.q();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "false");
    }
    for (const target of this.Vc) {
      for (const el of [target.el, target.triggerElement]) {
        el?.setAttribute("aria-hidden", "false");
      }
    }
    if (content) {
      for (const child of content.children) {
        child.removeAttribute("data-open");
        child.removeAttribute("data-hidden");
      }
    }
  }
  em(event) {
    const content = this.q();
    if (content && event.propertyName === "height") {
      this.Bf = event.type === "transitionstart";
      setAttribute(content, "data-transition", this.Bf ? "height" : null);
      if (this.T())
        this.Kh();
    }
    for (const callback of this.Md)
      callback(event);
  }
  open(trigger) {
    if (peek(this.T))
      return;
    this.Kd.show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(this.T))
      return;
    this.Kd.hide(trigger);
    tick();
  }
}
__decorateClass$9([
  prop
], Menu.prototype, "triggerElement");
__decorateClass$9([
  prop
], Menu.prototype, "contentElement");
__decorateClass$9([
  prop
], Menu.prototype, "isSubmenu");
__decorateClass$9([
  method
], Menu.prototype, "open");
__decorateClass$9([
  method
], Menu.prototype, "close");

var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$8(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$8(target, key, result);
  return result;
};
class MenuButton extends Component {
  constructor() {
    super();
    this.Lh = signal(null);
    new FocusVisibleController();
  }
  static {
    this.props = {
      disabled: false
    };
  }
  get expanded() {
    return this.n?.T() ?? false;
  }
  onSetup() {
    this.n = useContext(menuContext);
  }
  onAttach(el) {
    this.n.uf(this);
    effect(this.Nc.bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    effect(this.mm.bind(this));
    this.Gc();
    const mutations = new MutationObserver(this.Gc.bind(this));
    mutations.observe(el, { attributeFilter: ["data-part"], childList: true, subtree: true });
    onDispose(() => mutations.disconnect());
    onPress(el, (trigger) => {
      this.dispatch("select", { trigger });
    });
  }
  Nc() {
    this.n.xf(this.$props.disabled());
  }
  mm() {
    const el = this.Lh();
    if (!el)
      return;
    effect(() => {
      const text = this.n._b();
      if (text)
        el.textContent = text;
    });
  }
  Gc() {
    const hintEl = this.el?.querySelector('[data-part="hint"]');
    this.Lh.set(hintEl ?? null);
  }
}
__decorateClass$8([
  prop
], MenuButton.prototype, "expanded");

class MenuPortal extends Component {
  constructor() {
    super(...arguments);
    this.G = null;
  }
  static {
    this.props = {
      container: null,
      disabled: false
    };
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(menuPortalContext, {
      xb: this.nm.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  // Need this so connect scope is defined.
  onConnect(el) {
  }
  onDestroy() {
    this.G?.remove();
    this.G = null;
  }
  nm(el) {
    this.Mh(false);
    this.G = el;
    requestScopedAnimationFrame(() => {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this.Nc.bind(this));
      });
    });
  }
  Nc() {
    const { fullscreen } = this.a.$state, { disabled } = this.$props, _disabled = disabled();
    this.Mh(_disabled === "fullscreen" ? !fullscreen() : !_disabled);
  }
  Mh(shouldPortal) {
    if (!this.G)
      return;
    let container = this.om(this.$props.container());
    if (!container)
      return;
    const isPortalled = this.G.parentElement === container;
    setAttribute(this.G, "data-portal", shouldPortal);
    if (shouldPortal) {
      if (!isPortalled) {
        this.G.remove();
        container.append(this.G);
      }
    } else if (isPortalled && this.G.parentElement === container) {
      this.G.remove();
      this.el?.append(this.G);
    }
  }
  om(selector) {
    if (isHTMLElement(selector))
      return selector;
    return selector ? document.querySelector(selector) : document.body;
  }
}
const menuPortalContext = createContext();

class MenuItems extends Component {
  static {
    this.props = {
      placement: null,
      offset: 0,
      alignOffset: 0
    };
  }
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.n = useContext(menuContext);
    this.n.vf(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal.xb(el);
        onDispose(() => portal.xb(null));
      }
    }
  }
  onConnect(el) {
    effect(this.bf.bind(this));
  }
  bf() {
    if (!this.el)
      return;
    const placement = this.$props.placement();
    if (placement) {
      Object.assign(this.el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content"
      });
      const { offset: mainOffset, alignOffset } = this.$props;
      return autoPlacement(this.el, this.Bd(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  Bd() {
    return this.n._l();
  }
}

const radioControllerContext = createContext();

class RadioGroupController extends ViewController {
  constructor() {
    super(...arguments);
    this.$b = /* @__PURE__ */ new Set();
    this.Ta = signal("");
    this.e = null;
    this.sm = this.E.bind(this);
  }
  get pm() {
    return Array.from(this.$b).map((radio) => radio.Ta());
  }
  get value() {
    return this.Ta();
  }
  set value(value) {
    this.E(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this.qm.bind(this),
      remove: this.rm.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem)
      setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this.Ta });
  }
  onDestroy() {
    this.$b.clear();
  }
  qm(radio) {
    if (this.$b.has(radio))
      return;
    this.$b.add(radio);
    radio.Nd = this.sm;
    radio.Wc(radio.Ta() === this.Ta());
  }
  rm(radio) {
    radio.Nd = null;
    this.$b.delete(radio);
  }
  E(newValue, trigger) {
    const currentValue = peek(this.Ta);
    if (!newValue || newValue === currentValue)
      return;
    const currentRadio = this.Nh(currentValue), newRadio = this.Nh(newValue);
    currentRadio?.Wc(false, trigger);
    newRadio?.Wc(true, trigger);
    this.Ta.set(newValue);
    this.l?.(newValue, trigger);
  }
  Nh(newValue) {
    for (const radio of this.$b) {
      if (newValue === peek(radio.Ta))
        return radio;
    }
    return null;
  }
}

var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$7(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$7(target, key, result);
  return result;
};
class RadioGroup extends Component {
  static {
    this.props = {
      value: ""
    };
  }
  get values() {
    return this.e.pm;
  }
  get value() {
    return this.e.value;
  }
  set value(newValue) {
    this.e.value = newValue;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    effect(this.N.bind(this));
  }
  N() {
    this.e.value = this.$props.value();
  }
  l(value, trigger) {
    const event = this.createEvent("change", { detail: value, trigger });
    this.dispatch(event);
  }
}
__decorateClass$7([
  prop
], RadioGroup.prototype, "values");
__decorateClass$7([
  prop
], RadioGroup.prototype, "value");

var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$6(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$6(target, key, result);
  return result;
};
class Radio extends Component {
  constructor() {
    super();
    this.zb = signal(false);
    this.e = {
      Ta: this.$props.value,
      Wc: this.Wc.bind(this),
      Nd: null
    };
    new FocusVisibleController();
  }
  static {
    this.props = {
      value: ""
    };
  }
  get checked() {
    return this.zb();
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      "data-checked": this.zb,
      "aria-checked": $ariaBool(this.zb)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitemradio" : "radio");
    effect(this.N.bind(this));
  }
  onConnect(el) {
    this.tm();
    onPress(el, this.r.bind(this));
    onDispose(this.Fa.bind(this));
  }
  Fa() {
    scoped(() => {
      const group = useContext(radioControllerContext);
      group.remove(this.e);
    }, this.connectScope);
  }
  tm() {
    const group = useContext(radioControllerContext);
    group.add(this.e);
  }
  N() {
    const { value } = this.$props, newValue = value();
    if (peek(this.zb)) {
      this.e.Nd?.(newValue);
    }
  }
  r(event) {
    if (peek(this.zb))
      return;
    this.E(true, event);
    this.um(event);
    this.e.Nd?.(peek(this.$props.value), event);
  }
  Wc(value, trigger) {
    if (peek(this.zb) === value)
      return;
    this.E(value, trigger);
  }
  E(value, trigger) {
    this.zb.set(value);
    this.dispatch("change", { detail: value, trigger });
  }
  um(trigger) {
    this.dispatch("select", { trigger });
  }
}
__decorateClass$6([
  prop
], Radio.prototype, "checked");

var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$5(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$5(target, key, result);
  return result;
};
class ChaptersRadioGroup extends Component {
  constructor() {
    super();
    this.J = signal(null);
    this.B = signal([]);
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  static {
    this.props = {
      thumbnails: null
    };
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    return !this.B()?.length;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
    const { thumbnails } = this.$props;
    this.setAttributes({
      "data-thumbnails": () => !!thumbnails()
    });
  }
  onAttach(el) {
    this.n?.wf({
      Af: this.Af.bind(this)
    });
  }
  getOptions() {
    const { clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    return this.B().map((cue, i) => ({
      cue,
      value: i.toString(),
      label: cue.text,
      startTime: formatTime(Math.max(0, cue.startTime - startTime)),
      duration: formatSpokenTime(
        Math.min(endTime, cue.endTime) - Math.max(startTime, cue.startTime)
      )
    }));
  }
  Af() {
    peek(() => this.Qb());
  }
  onConnect(el) {
    effect(this.Qb.bind(this));
    effect(this.sa.bind(this));
    effect(this.vm.bind(this));
    watchActiveTextTrack(this.a.textTracks, "chapters", this.J.set);
  }
  vm() {
    const track = this.J();
    if (!track)
      return;
    const onCuesChange = this.Id.bind(this, track);
    onCuesChange();
    listenEvent(track, "add-cue", onCuesChange);
    listenEvent(track, "remove-cue", onCuesChange);
    return () => {
      this.B.set([]);
    };
  }
  Id(track) {
    const { clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    this.B.set(
      [...track.cues].filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime)
    );
  }
  Qb() {
    if (!this.n?.T())
      return;
    const track = this.J();
    if (!track) {
      this.e.value = "-1";
      return;
    }
    const { realCurrentTime, clipStartTime, clipEndTime } = this.a.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity, time = realCurrentTime(), activeCueIndex = this.B().findIndex((cue) => isCueActive(cue, time));
    this.e.value = activeCueIndex.toString();
    if (activeCueIndex >= 0) {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        const cue = this.B()[activeCueIndex], radio = this.el.querySelector(`[aria-checked='true']`), cueStartTime = Math.max(startTime, cue.startTime), duration = Math.min(endTime, cue.endTime) - cueStartTime, playedPercent = Math.max(0, time - cueStartTime) / duration * 100;
        radio && setStyle(radio, "--progress", round(playedPercent, 3) + "%");
      });
    }
  }
  sa() {
    this.n?.gb(this.disabled);
  }
  l(value, trigger) {
    if (this.disabled || !trigger)
      return;
    const index = +value, cues = this.B(), { clipStartTime } = this.a.$state;
    if (isNumber(index) && cues?.[index]) {
      this.e.value = index.toString();
      this.a.remote.seek(cues[index].startTime - clipStartTime(), trigger);
      this.dispatch("change", { detail: cues[index], trigger });
    }
  }
}
__decorateClass$5([
  prop
], ChaptersRadioGroup.prototype, "value");
__decorateClass$5([
  prop
], ChaptersRadioGroup.prototype, "disabled");
__decorateClass$5([
  method
], ChaptersRadioGroup.prototype, "getOptions");

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$4(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$4(target, key, result);
  return result;
};
class AudioRadioGroup extends Component {
  static {
    this.props = {
      emptyLabel: "Default"
    };
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { audioTracks } = this.a.$state;
    return audioTracks().length <= 1;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.N.bind(this));
    effect(this.sa.bind(this));
    effect(this.Ua.bind(this));
  }
  getOptions() {
    const { audioTracks } = this.a.$state;
    return audioTracks().map((track) => ({
      track,
      label: track.label,
      value: track.label.toLowerCase()
    }));
  }
  N() {
    this.e.value = this.Y();
  }
  Ua() {
    const { emptyLabel } = this.$props, { audioTrack } = this.a.$state, track = audioTrack();
    this.n?._b.set(track?.label ?? emptyLabel());
  }
  sa() {
    this.n?.gb(this.disabled);
  }
  Y() {
    const { audioTrack } = this.a.$state;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    const index = this.a.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0) {
      const track = this.a.audioTracks[index];
      this.a.remote.changeAudioTrack(index, trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
}
__decorateClass$4([
  prop
], AudioRadioGroup.prototype, "value");
__decorateClass$4([
  prop
], AudioRadioGroup.prototype, "disabled");
__decorateClass$4([
  method
], AudioRadioGroup.prototype, "getOptions");

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$3(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$3(target, key, result);
  return result;
};
const DEFAULT_AUDIO_GAINS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
class AudioGainRadioGroup extends Component {
  static {
    this.props = {
      normalLabel: "Disabled",
      gains: DEFAULT_AUDIO_GAINS
    };
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { gains } = this.$props, { canSetAudioGain } = this.a.$state;
    return !canSetAudioGain() || gains().length === 0;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.N.bind(this));
    effect(this.Ua.bind(this));
    effect(this.sa.bind(this));
  }
  getOptions() {
    const { gains, normalLabel } = this.$props;
    return gains().map((gain) => ({
      label: gain === 1 || gain === null ? normalLabel : String(gain * 100) + "%",
      value: gain.toString()
    }));
  }
  N() {
    this.e.value = this.Y();
  }
  Ua() {
    const { normalLabel } = this.$props, { audioGain } = this.a.$state, gain = audioGain();
    this.n?._b.set(gain === 1 || gain == null ? normalLabel() : String(gain * 100) + "%");
  }
  sa() {
    this.n?.gb(this.disabled);
  }
  Y() {
    const { audioGain } = this.a.$state;
    return audioGain()?.toString() ?? "1";
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    const gain = +value;
    this.a.remote.changeAudioGain(gain, trigger);
    this.dispatch("change", { detail: gain, trigger });
  }
}
__decorateClass$3([
  prop
], AudioGainRadioGroup.prototype, "value");
__decorateClass$3([
  prop
], AudioGainRadioGroup.prototype, "disabled");
__decorateClass$3([
  method
], AudioGainRadioGroup.prototype, "getOptions");

var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$2(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$2(target, key, result);
  return result;
};
class CaptionsRadioGroup extends Component {
  static {
    this.props = {
      offLabel: "Off"
    };
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { hasCaptions } = this.a.$state;
    return !hasCaptions();
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    super.onConnect?.(el);
    effect(this.N.bind(this));
    effect(this.sa.bind(this));
    effect(this.Ua.bind(this));
  }
  getOptions() {
    const { offLabel } = this.$props, { textTracks } = this.a.$state;
    return [
      { value: "off", label: offLabel },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        track,
        label: track.label,
        value: this.Df(track)
      }))
    ];
  }
  N() {
    this.e.value = this.Y();
  }
  Ua() {
    const { offLabel } = this.$props, { textTrack } = this.a.$state, track = textTrack();
    this.n?._b.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  sa() {
    this.n?.gb(this.disabled);
  }
  Y() {
    const { textTrack } = this.a.$state, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? this.Df(track) : "off";
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    if (value === "off") {
      const track = this.a.textTracks.selected;
      if (track) {
        const index2 = this.a.textTracks.indexOf(track);
        this.a.remote.changeTextTrackMode(index2, "disabled", trigger);
        this.dispatch("change", { detail: null, trigger });
      }
      return;
    }
    const index = this.a.textTracks.toArray().findIndex((track) => this.Df(track) === value);
    if (index >= 0) {
      const track = this.a.textTracks[index];
      this.a.remote.changeTextTrackMode(index, "showing", trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
  Df(track) {
    return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
  }
}
__decorateClass$2([
  prop
], CaptionsRadioGroup.prototype, "value");
__decorateClass$2([
  prop
], CaptionsRadioGroup.prototype, "disabled");
__decorateClass$2([
  method
], CaptionsRadioGroup.prototype, "getOptions");

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$1(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp$1(target, key, result);
  return result;
};
const DEFAULT_PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
class SpeedRadioGroup extends Component {
  static {
    this.props = {
      normalLabel: "Normal",
      rates: DEFAULT_PLAYBACK_RATES
    };
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = this.a.$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  constructor() {
    super();
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.N.bind(this));
    effect(this.Ua.bind(this));
    effect(this.sa.bind(this));
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate.toString()
    }));
  }
  N() {
    this.e.value = this.Y();
  }
  Ua() {
    const { normalLabel } = this.$props, { playbackRate } = this.a.$state, rate = playbackRate();
    this.n?._b.set(rate === 1 ? normalLabel() : rate + "\xD7");
  }
  sa() {
    this.n?.gb(this.disabled);
  }
  Y() {
    const { playbackRate } = this.a.$state;
    return playbackRate().toString();
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    const rate = +value;
    this.a.remote.changePlaybackRate(rate, trigger);
    this.dispatch("change", { detail: rate, trigger });
  }
}
__decorateClass$1([
  prop
], SpeedRadioGroup.prototype, "value");
__decorateClass$1([
  prop
], SpeedRadioGroup.prototype, "disabled");
__decorateClass$1([
  method
], SpeedRadioGroup.prototype, "getOptions");

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result)
    __defProp(target, key, result);
  return result;
};
class QualityRadioGroup extends Component {
  constructor() {
    super();
    this.Rc = computed(() => {
      const { sort } = this.$props, { qualities } = this.a.$state;
      return sortVideoQualities(qualities(), sort() === "descending");
    });
    this.e = new RadioGroupController();
    this.e.l = this.l.bind(this);
  }
  static {
    this.props = {
      autoLabel: "Auto",
      hideBitrate: false,
      sort: "descending"
    };
  }
  get value() {
    return this.e.value;
  }
  get disabled() {
    const { canSetQuality, qualities } = this.a.$state;
    return !canSetQuality() || qualities().length <= 1;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.n = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.N.bind(this));
    effect(this.sa.bind(this));
    effect(this.Ua.bind(this));
  }
  getOptions() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", label: autoLabel },
      ...this.Rc().map((quality) => {
        const bitrate = quality.bitrate && quality.bitrate >= 0 ? `${round(quality.bitrate / 1e6, 2)} Mbps` : null;
        return {
          quality,
          label: quality.height + "p",
          value: this.Ef(quality),
          bitrate: () => !hideBitrate() ? bitrate : null
        };
      })
    ];
  }
  N() {
    this.e.value = this.Y();
  }
  Ua() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this.a.$state, qualityText = quality() ? quality().height + "p" : "";
    this.n?._b.set(
      !autoQuality() ? qualityText : autoLabel() + (qualityText ? ` (${qualityText})` : "")
    );
  }
  sa() {
    this.n?.gb(this.disabled);
  }
  l(value, trigger) {
    if (this.disabled)
      return;
    if (value === "auto") {
      this.a.remote.changeQuality(-1, trigger);
      this.dispatch("change", { detail: "auto", trigger });
      return;
    }
    const { qualities } = this.a.$state, index = peek(qualities).findIndex((quality) => this.Ef(quality) === value);
    if (index >= 0) {
      const quality = peek(qualities)[index];
      this.a.remote.changeQuality(index, trigger);
      this.dispatch("change", { detail: quality, trigger });
    }
  }
  Y() {
    const { quality, autoQuality } = this.a.$state;
    if (autoQuality())
      return "auto";
    const currentQuality = quality();
    return currentQuality ? this.Ef(currentQuality) : "auto";
  }
  Ef(quality) {
    return quality.height + "_" + quality.bitrate;
  }
}
__decorateClass([
  prop
], QualityRadioGroup.prototype, "value");
__decorateClass([
  prop
], QualityRadioGroup.prototype, "disabled");
__decorateClass([
  method
], QualityRadioGroup.prototype, "getOptions");

class Gesture extends Component {
  constructor() {
    super(...arguments);
    this.p = null;
    this.Ab = 0;
    this.Oh = -1;
  }
  static {
    this.props = {
      disabled: false,
      event: void 0,
      action: void 0
    };
  }
  onSetup() {
    this.a = useMediaContext();
    const { event, action } = this.$props;
    this.setAttributes({
      event,
      action
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-gesture", "");
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    this.p = this.a.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this.wm.bind(this));
  }
  wm() {
    let eventType = this.$props.event(), disabled = this.$props.disabled();
    if (!this.p || !eventType || disabled)
      return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this.a.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this.p,
      eventType,
      this.xm.bind(this),
      { passive: false }
    );
  }
  xm(event) {
    if (this.$props.disabled() || isPointerEvent(event) && (event.button !== 0 || this.a.activeMenu) || isTouchEvent(event) && this.a.activeMenu || isTouchPinchEvent(event) || !this.ym(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this.Ab === 0) {
        setTimeout(() => {
          if (this.Ab === 1)
            this.Ph(event);
        }, 250);
      }
    } else if (this.Ab === 1) {
      queueMicrotask(() => this.Ph(event));
      clearTimeout(this.Oh);
      this.Ab = 0;
      return;
    }
    if (this.Ab === 0) {
      this.Oh = window.setTimeout(() => {
        this.Ab = 0;
      }, 275);
    }
    this.Ab++;
  }
  Ph(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this.zm()) {
        this.Am(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  ym(event) {
    if (!this.el)
      return false;
    if (isPointerEvent(event) || isMouseEvent(event) || isTouchEvent(event)) {
      const touch = isTouchEvent(event) ? event.changedTouches[0] ?? event.touches[0] : void 0;
      const clientX = touch?.clientX ?? event.clientX;
      const clientY = touch?.clientY ?? event.clientY;
      const rect = this.el.getBoundingClientRect();
      const inBounds = clientY >= rect.top && clientY <= rect.bottom && clientX >= rect.left && clientX <= rect.right;
      return event.type.includes("leave") ? !inBounds : inBounds;
    }
    return true;
  }
  /** Validate gesture has the highest z-index in this triggered group. */
  zm() {
    const gestures = this.a.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  Am(action, trigger) {
    if (!action)
      return;
    const willTriggerEvent = new DOMEvent("will-trigger", {
      detail: action,
      cancelable: true,
      trigger
    });
    this.dispatchEvent(willTriggerEvent);
    if (willTriggerEvent.defaultPrevented)
      return;
    const [method, value] = action.replace(/:([a-z])/, "-$1").split(":");
    if (action.includes(":fullscreen")) {
      this.a.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this.a.remote.seek(peek(this.a.$state.currentTime) + (+value || 0), trigger);
    } else {
      this.a.remote[kebabToCamelCase(method)](trigger);
    }
    this.dispatch("trigger", {
      detail: action,
      trigger
    });
  }
}

class CaptionsTextRenderer {
  constructor(_renderer) {
    this.ca = _renderer;
    this.priority = 10;
    this.J = null;
    this.Ya = createDisposalBin();
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this.Ya.empty();
    this.ca.reset();
    this.J = null;
  }
  changeTrack(track) {
    if (!track || this.J === track)
      return;
    this.Ya.empty();
    if (track.readyState < 2) {
      this.ca.reset();
      this.Ya.add(
        listenEvent(track, "load", () => this.Qh(track), { once: true })
      );
    } else {
      this.Qh(track);
    }
    this.Ya.add(
      listenEvent(track, "add-cue", (event) => {
        this.ca.addCue(event.detail);
      }),
      listenEvent(track, "remove-cue", (event) => {
        this.ca.removeCue(event.detail);
      })
    );
    this.J = track;
  }
  Qh(track) {
    this.ca.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}

class Captions extends Component {
  constructor() {
    super(...arguments);
    this.ac = -1;
  }
  static {
    this.props = {
      textDir: "ltr",
      exampleText: "Captions look like this."
    };
  }
  static {
    this.L = signal(null);
  }
  get L() {
    return Captions.L;
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this.Tb.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (!this.L()) {
      import('media-captions').then((lib) => this.L.set(lib));
    }
    effect(this.Rh.bind(this));
  }
  Tb() {
    const { textTrack, remotePlaybackState, iOSControls } = this.a.$state, track = textTrack();
    return iOSControls() || remotePlaybackState() === "connected" || !track || !isTrackCaptionKind(track);
  }
  Rh() {
    if (!this.L())
      return;
    const { viewType } = this.a.$state;
    if (viewType() === "audio") {
      return this.Cm();
    } else {
      return this.Dm();
    }
  }
  Cm() {
    effect(this.pc.bind(this));
    this.Gn(null);
    return () => {
      this.el.textContent = "";
    };
  }
  pc() {
    if (this.Tb())
      return;
    this.Sh();
    const { textTrack } = this.a.$state;
    listenEvent(textTrack(), "cue-change", this.Sh.bind(this));
    effect(this.Em.bind(this));
  }
  Sh() {
    this.el.textContent = "";
    if (this.ac >= 0) {
      this.Ff();
    }
    const { realCurrentTime, textTrack } = this.a.$state, { renderVTTCueString } = this.L(), time = peek(realCurrentTime), activeCues = peek(textTrack).activeCues;
    for (const cue of activeCues) {
      const displayEl = this.Th(), cueEl = this.Uh();
      cueEl.innerHTML = renderVTTCueString(cue, time);
      displayEl.append(cueEl);
      this.el.append(cueEl);
    }
  }
  Em() {
    const { realCurrentTime } = this.a.$state, { updateTimedVTTCueNodes } = this.L();
    updateTimedVTTCueNodes(this.el, realCurrentTime());
  }
  Dm() {
    const { CaptionsRenderer } = this.L(), renderer = new CaptionsRenderer(this.el), textRenderer = new CaptionsTextRenderer(renderer);
    this.a.textRenderers.add(textRenderer);
    effect(this.Fm.bind(this, renderer));
    effect(this.Gm.bind(this, renderer));
    this.Gn(renderer);
    return () => {
      this.el.textContent = "";
      this.a.textRenderers.remove(textRenderer);
      renderer.destroy();
    };
  }
  Fm(renderer) {
    renderer.dir = this.$props.textDir();
  }
  Gm(renderer) {
    if (this.Tb())
      return;
    const { realCurrentTime, textTrack } = this.a.$state;
    renderer.currentTime = realCurrentTime();
    if (this.ac >= 0 && textTrack()?.activeCues[0]) {
      this.Ff();
    }
  }
  Gn(renderer) {
    const player = this.a.player;
    if (!player)
      return;
    const onChange = this.Bm.bind(this, renderer);
    listenEvent(player, "vds-font-change", onChange);
  }
  Bm(renderer) {
    if (this.ac >= 0) {
      this.Vh();
      return;
    }
    const { textTrack } = this.a.$state;
    if (!textTrack()?.activeCues[0]) {
      this.Hm();
    } else {
      renderer?.update(true);
    }
  }
  Hm() {
    const display = this.Th();
    setAttribute(display, "data-example", "");
    const cue = this.Uh();
    setAttribute(cue, "data-example", "");
    cue.textContent = this.$props.exampleText();
    display?.append(cue);
    this.el?.append(display);
    this.el?.setAttribute("data-example", "");
    this.Vh();
  }
  Vh() {
    window.clearTimeout(this.ac);
    this.ac = window.setTimeout(this.Ff.bind(this), 2500);
  }
  Ff() {
    this.el?.removeAttribute("data-example");
    if (this.el?.querySelector("[data-example]"))
      this.el.textContent = "";
    this.ac = -1;
  }
  Th() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue-display");
    return el;
  }
  Uh() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue");
    return el;
  }
}

class Poster extends Component {
  constructor() {
    super(...arguments);
    this.Xh = "";
  }
  static {
    this.props = {
      src: null,
      alt: null,
      crossOrigin: null
    };
  }
  static {
    this.state = new State({
      img: null,
      src: null,
      alt: null,
      crossOrigin: null,
      loading: true,
      error: null,
      hidden: false
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.Mb();
    this.Wh();
    this.Ca();
    this.Ea();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this.kf.bind(this));
    effect(this.Mb.bind(this));
    effect(this.Wh.bind(this));
    effect(this.Ca.bind(this));
    effect(this.Ea.bind(this));
    const { started } = this.a.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this.Pc.bind(this),
      "data-error": this.fb.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this.Im.bind(this));
    effect(this.Ma.bind(this));
  }
  fb() {
    const { error } = this.$state;
    return !isNull(error());
  }
  Im() {
    const { canLoadPoster, poster } = this.a.$state;
    if (!canLoadPoster() && poster())
      preconnect(poster(), "preconnect");
  }
  Ea() {
    const { src } = this.$props, { poster, nativeControls } = this.a.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this.fb() || !(src() || poster()) || nativeControls());
  }
  Pc() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  kf() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this.gd.bind(this));
    listenEvent(img, "error", this.Q.bind(this));
  }
  Mb() {
    const { poster: defaultPoster } = this.a.$props, { canLoadPoster, providedPoster, inferredPoster } = this.a.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this.Xh === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this.Xh = src;
  }
  Wh() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this.a.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  Ca() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  Ma() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this.a.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  gd() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  Q(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
}

class Time extends Component {
  constructor() {
    super(...arguments);
    this.Xc = signal(null);
    this.Lc = signal(true);
    this.Mc = signal(true);
  }
  static {
    this.props = {
      type: "current",
      showHours: false,
      padHours: null,
      padMinutes: null,
      remainder: false,
      toggle: false,
      hidden: false
    };
  }
  static {
    this.state = new State({
      timeText: "",
      hidden: false
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.Yh();
    const { type } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": this.Zh.bind(this)
    });
    new IntersectionObserverController({
      callback: this.gf.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    if (!el.hasAttribute("role"))
      effect(this.Jm.bind(this));
    effect(this.Yh.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.Lc.set));
    effect(this.Ea.bind(this));
    effect(this.Km.bind(this));
  }
  gf(entries) {
    this.Mc.set(entries[0].isIntersecting);
  }
  Ea() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.Lc() || !this.Mc());
  }
  Km() {
    if (!this.$props.toggle()) {
      this.Xc.set(null);
      return;
    }
    if (this.el) {
      onPress(this.el, this.Lm.bind(this));
    }
  }
  Yh() {
    const { hidden, timeText } = this.$state, { duration } = this.a.$state;
    if (hidden())
      return;
    const { type, padHours, padMinutes, showHours } = this.$props, seconds = this.Mm(type()), $duration = duration(), shouldInvert = this.Zh();
    if (!Number.isFinite(seconds + $duration)) {
      timeText.set("LIVE");
      return;
    }
    const time = shouldInvert ? Math.max(0, $duration - seconds) : seconds, formattedTime = formatTime(time, {
      padHrs: padHours(),
      padMins: padMinutes(),
      showHrs: showHours()
    });
    timeText.set((shouldInvert ? "-" : "") + formattedTime);
  }
  Jm() {
    if (!this.el)
      return;
    const { toggle } = this.$props;
    setAttribute(this.el, "role", toggle() ? "timer" : null);
    setAttribute(this.el, "tabindex", toggle() ? 0 : null);
  }
  Mm(type) {
    const { bufferedEnd, duration, currentTime } = this.a.$state;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
  Zh() {
    return this.$props.remainder() && this.Xc() !== false;
  }
  Lm(event) {
    event.preventDefault();
    if (this.Xc() === null) {
      this.Xc.set(!this.$props.remainder());
      return;
    }
    this.Xc.set((v) => !v);
  }
}

export { SeekButton as $, ARIAKeyShortcuts as A, isVimeoProvider as B, isGoogleCastProvider as C, DASHProviderLoader as D, isHTMLMediaElement as E, FocusVisibleController as F, sliderContext as G, HLSProviderLoader as H, MediaAnnouncer as I, Controls as J, Tooltip as K, LocalMediaStorage as L, MenuButton as M, TooltipContent as N, ToggleButton as O, Poster as P, AirPlayButton as Q, GoogleCastButton as R, Slider as S, Thumbnail as T, PlayButton as U, VideoQualityList as V, CaptionButton as W, FullscreenButton as X, YouTubeProviderLoader as Y, MuteButton as Z, PIPButton as _, isHTMLVideoElement as a, LiveButton as a0, sliderState as a1, SliderController as a2, SliderVideo as a3, SliderValue as a4, SliderPreview as a5, updateSliderPreviewPlacement as a6, VolumeSlider as a7, AudioGainSlider as a8, SpeedSlider as a9, QualitySlider as aa, TimeSlider as ab, SliderChapters as ac, Menu as ad, MenuPortal as ae, menuPortalContext as af, MenuItems as ag, RadioGroup as ah, Radio as ai, ChaptersRadioGroup as aj, AudioRadioGroup as ak, DEFAULT_AUDIO_GAINS as al, AudioGainRadioGroup as am, CaptionsRadioGroup as an, DEFAULT_PLAYBACK_RATES as ao, SpeedRadioGroup as ap, QualityRadioGroup as aq, Gesture as ar, Captions as as, Time as at, ThumbnailsLoader as au, isHTMLIFrameElement as b, MediaProvider as c, MediaPlayer as d, formatSpokenTime as e, formatTime as f, FullscreenController as g, canFullscreen as h, isHTMLAudioElement as i, ScreenOrientationController as j, MediaRemoteControl as k, MediaControls as l, MEDIA_KEY_SHORTCUTS as m, isVideoQualitySrc as n, TextRenderers as o, TextTrackList as p, AudioTrackList as q, AudioProviderLoader as r, VideoProviderLoader as s, tooltipContext as t, VimeoProviderLoader as u, isAudioProvider as v, isVideoProvider as w, isHLSProvider as x, isDASHProvider as y, isYouTubeProvider as z };