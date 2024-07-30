import { G as GroupedLog, L as List, s as softResetMediaState, g as getTimeRangesEnd, a as getTimeRangesStart, T as TimeRange, m as mediaState } from './chunks/vidstack-Cf8b5FVK.js';
export { F as FONT_COLOR_OPTION, f as FONT_DEFAULTS, b as FONT_FAMILY_OPTION, d as FONT_OPACITY_OPTION, h as FONT_SIGNALS, c as FONT_SIZE_OPTION, e as FONT_TEXT_SHADOW_OPTION, o as onFontReset } from './chunks/vidstack-Cf8b5FVK.js';
import { D as DOMEvent, y as fscreen, V as ViewController, l as listenEvent, o as onDispose, e as signal, p as peek, i as isString, k as isNumber, z as createContext, A as useContext, C as Component, B as isDOMNode, x as isFunction, r as setAttribute, F as isTouchEvent, s as setStyle, G as autoUpdate, H as computePosition, I as flip, J as shift, m as effect, K as isKeyboardEvent, L as untrack, b as isArray, M as isKeyboardClick, f as deferredPromise, d as isUndefined, N as provideContext, O as animationFrameThrottle, P as uppercaseFirstChar, v as camelToKebabCase, Q as computed, R as prop, T as method, t as tick, j as scoped, U as noop, S as State, g as isNull, W as ariaBool$1, X as isWriteSignal, Y as hasProvidedContext, Z as isObject, _ as useState, q as createScope, $ as r, a0 as wasEnterKeyPressed, a1 as isPointerEvent, a2 as isMouseEvent, a3 as kebabToCamelCase, c as createDisposalBin } from './chunks/vidstack-2WGWo9lS.js';
export { a7 as appendTriggerEvent, a6 as findTriggerEvent, a4 as hasTriggerEvent, a5 as walkTriggerEventChain } from './chunks/vidstack-2WGWo9lS.js';
import { a as canOrientScreen, i as isTrackCaptionKind, e as TextTrackSymbol, T as TextTrack, L as ListSymbol, q as isAudioSrc, p as preconnect, I as IS_CHROME, r as canChangeVolume, s as getRequestCredentials, o as isHLSSrc, n as isHLSSupported, m as isDASHSrc, w as watchActiveTextTrack, t as isCueActive } from './chunks/vidstack-B89aCpDg.js';
export { A as AUDIO_EXTENSIONS, B as AUDIO_TYPES, D as DASH_VIDEO_EXTENSIONS, F as DASH_VIDEO_TYPES, H as HLS_VIDEO_EXTENSIONS, E as HLS_VIDEO_TYPES, V as VIDEO_EXTENSIONS, C as VIDEO_TYPES, G as canGoogleCastSrc, h as canPlayHLSNatively, v as canRotateScreen, f as canUsePictureInPicture, g as canUseVideoPresentation, y as findActiveCue, u as getDownloadFile, J as isMediaStream, d as isVideoSrc, x as parseJSONCaptionsFile, z as watchCueTextChange } from './chunks/vidstack-B89aCpDg.js';
import { Q as QualitySymbol, c as coerceToError, a as clampNumber, D as DASHProviderLoader, H as HLSProviderLoader, V as VideoProviderLoader, r as round, g as getNumberOfDecimalPlaces, b as assert } from './chunks/vidstack-oOG5-YhF.js';

class Logger {
  constructor() {
    this._target = null;
  }
  error(...data) {
    return this.dispatch("error", ...data);
  }
  warn(...data) {
    return this.dispatch("warn", ...data);
  }
  info(...data) {
    return this.dispatch("info", ...data);
  }
  debug(...data) {
    return this.dispatch("debug", ...data);
  }
  errorGroup(title) {
    return new GroupedLog(this, "error", title);
  }
  warnGroup(title) {
    return new GroupedLog(this, "warn", title);
  }
  infoGroup(title) {
    return new GroupedLog(this, "info", title);
  }
  debugGroup(title) {
    return new GroupedLog(this, "debug", title);
  }
  setTarget(newTarget) {
    this._target = newTarget;
  }
  dispatch(level, ...data) {
    return this._target?.dispatchEvent(
      new DOMEvent("vds-log", {
        bubbles: true,
        composed: true,
        detail: { level, data }
      })
    ) || false;
  }
}

const CAN_FULLSCREEN = fscreen.fullscreenEnabled;
class FullscreenController extends ViewController {
  constructor() {
    super(...arguments);
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    this._listening = false;
    this._active = false;
  }
  get active() {
    return this._active;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen, "fullscreenchange", this._onFullscreenChange.bind(this));
    listenEvent(fscreen, "fullscreenerror", this._onFullscreenError.bind(this));
    onDispose(this._onDisconnect.bind(this));
  }
  async _onDisconnect() {
    if (CAN_FULLSCREEN)
      await this.exit();
  }
  _onFullscreenChange(event) {
    const active = isFullscreen(this.el);
    if (active === this._active)
      return;
    if (!active)
      this._listening = false;
    this._active = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  _onFullscreenError(event) {
    if (!this._listening)
      return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this._listening = false;
  }
  async enter() {
    try {
      this._listening = true;
      if (!this.el || isFullscreen(this.el))
        return;
      assertFullscreenAPI();
      return fscreen.requestFullscreen(this.el);
    } catch (error) {
      this._listening = false;
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
    this._type = signal(this._getScreenOrientation());
    this._locked = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this._type();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this._locked();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this._type().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this._type().startsWith("landscape");
  }
  static {
    /**
     * Whether the native Screen Orientation API is available.
     */
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
      listenEvent(screen.orientation, "change", this._onOrientationChange.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this._onOrientationChange.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this._onDisconnect.bind(this));
  }
  async _onDisconnect() {
    if (this.supported && this._locked())
      await this.unlock();
  }
  _onOrientationChange(event) {
    this._type.set(this._getScreenOrientation());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this._type),
        lock: this._currentLock
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
    if (peek(this._locked) || this._currentLock === lockType)
      return;
    this._assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    this._locked.set(true);
    this._currentLock = lockType;
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
    if (!peek(this._locked))
      return;
    this._assertScreenOrientationAPI();
    this._currentLock = void 0;
    await screen.orientation.unlock();
    this._locked.set(false);
  }
  _assertScreenOrientationAPI() {
    if (this.supported)
      return;
    throw Error(
      "[vidstack] no orientation API"
    );
  }
  _getScreenOrientation() {
    return "portrait-primary";
  }
}

function isVideoQualitySrc(src) {
  return !isString(src) && "width" in src && "height" in src && isNumber(src.width) && isNumber(src.height);
}

const mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}

class MediaRemoteControl {
  constructor(_logger = void 0) {
    this._logger = _logger;
    this._target = null;
    this._player = null;
    this._prevTrackIndex = -1;
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
    this._target = target;
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
    if (this._player)
      return this._player;
    (target ?? this._target)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this._player = player),
        bubbles: true,
        composed: true
      })
    );
    return this._player;
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this._player = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    this._dispatchRequest("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this._dispatchRequest("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this._dispatchRequest("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this._dispatchRequest("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this._dispatchRequest("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this._dispatchRequest("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this._dispatchRequest("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this._dispatchRequest("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this._dispatchRequest("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this._dispatchRequest("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this._dispatchRequest("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this._dispatchRequest("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this._dispatchRequest("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this._dispatchRequest("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this._dispatchRequest("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this._dispatchRequest("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this._dispatchRequest("media-live-edge-request", trigger);
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
    this._dispatchRequest("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
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
    this._dispatchRequest("media-audio-track-change-request", trigger, index);
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
    this._dispatchRequest("media-quality-change-request", trigger, index);
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
    this._dispatchRequest("media-text-track-change-request", trigger, {
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
    this._dispatchRequest("media-rate-change-request", trigger, rate);
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
    this._dispatchRequest("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this._dispatchRequest("media-resume-controls-request", trigger);
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
    this._dispatchRequest("media-pause-controls-request", trigger);
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
    let tracks = player.state.textTracks, index = this._prevTrackIndex;
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
    this._prevTrackIndex = -1;
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
      this._prevTrackIndex = index;
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
    this._dispatchRequest("media-user-loop-change-request", trigger, prefersLoop);
  }
  _dispatchRequest(type, trigger, detail) {
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
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this._player?.el && target instanceof Node && !this._player.el.contains(target);
    target = shouldUsePlayer ? this._target ?? this.getPlayer()?.el : target ?? this._target;
    if (this._player) {
      if (type === "media-play-request" && !this._player.state.canLoad) {
        target?.dispatchEvent(request);
      } else {
        this._player.canPlayQueue._enqueue(type, () => target?.dispatchEvent(request));
      }
    } else {
      target?.dispatchEvent(request);
    }
  }
  _noPlayerWarning(method) {
  }
}

function isEventInside(el, event) {
  return isDOMNode(event.target) && el.contains(event.target);
}
const rafJobs = /* @__PURE__ */ new Set();
function scheduleRafJob(job) {
  rafJobs.add(job);
  return () => rafJobs.delete(job);
}
function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name))
    target.setAttribute(name, value);
}
function setARIALabel(target, $label) {
  if (target.hasAttribute("aria-label") || target.hasAttribute("data-no-label"))
    return;
  if (!isFunction($label)) {
    setAttribute(target, "aria-label", $label);
    return;
  }
  function updateAriaDescription() {
    setAttribute(target, "aria-label", $label());
  }
  updateAriaDescription();
}
function isElementVisible(el) {
  const style = getComputedStyle(el);
  return style.display !== "none" && parseInt(style.opacity) > 0;
}
function checkVisibility(el) {
  return !!el && ("checkVisibility" in el ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) : isElementVisible(el));
}
function observeVisibility(el, callback) {
  return scheduleRafJob(() => callback(checkVisibility(el)));
}
function isElementParent(owner, node, test) {
  while (node) {
    if (node === owner) {
      return true;
    } else if (test?.(node)) {
      break;
    } else {
      node = node.parentElement;
    }
  }
  return false;
}
function onPress(target, handler) {
}
function isTouchPinchEvent(event) {
  return isTouchEvent(event) && (event.touches.length > 1 || event.changedTouches.length > 1);
}
function requestScopedAnimationFrame(callback) {
  return callback();
}
function autoPlacement(el, trigger, placement, {
  offsetVarName,
  xOffset,
  yOffset,
  ...options
}) {
  if (!el)
    return;
  const floatingPlacement = placement.replace(" ", "-").replace("-center", "");
  setStyle(el, "visibility", !trigger ? "hidden" : null);
  if (!trigger)
    return;
  let isTop = placement.includes("top");
  const negateX = (x) => placement.includes("left") ? `calc(-1 * ${x})` : x, negateY = (y) => isTop ? `calc(-1 * ${y})` : y;
  return autoUpdate(trigger, el, () => {
    computePosition(trigger, el, {
      placement: floatingPlacement,
      middleware: [
        ...options.middleware ?? [],
        flip({ fallbackAxisSideDirection: "start", crossAxis: false }),
        shift()
      ],
      ...options
    }).then(({ x, y, middlewareData }) => {
      const hasFlipped = !!middlewareData.flip?.index;
      isTop = placement.includes(hasFlipped ? "bottom" : "top");
      el.setAttribute(
        "data-placement",
        hasFlipped ? placement.startsWith("top") ? placement.replace("top", "bottom") : placement.replace("bottom", "top") : placement
      );
      Object.assign(el.style, {
        top: `calc(${y + "px"} + ${negateY(
          yOffset ? yOffset + "px" : `var(--${offsetVarName}-y-offset, 0px)`
        )})`,
        left: `calc(${x + "px"} + ${negateX(
          xOffset ? xOffset + "px" : `var(--${offsetVarName}-x-offset, 0px)`
        )})`
      });
    });
  });
}
function hasAnimation(el) {
  const styles = getComputedStyle(el);
  return styles.animationName !== "none";
}
function isHTMLElement(el) {
  return el instanceof HTMLElement;
}

class MediaPlayerController extends ViewController {
}

class MediaControls extends MediaPlayerController {
  constructor() {
    super(...arguments);
    this._idleTimer = -2;
    this._pausedTracking = false;
    this._hideOnMouseLeave = signal(false);
    this._isMouseOutside = signal(false);
    this._focusedItem = null;
    this._canIdle = signal(true);
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    this.defaultDelay = 2e3;
  }
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return this._canIdle();
  }
  set canIdle(canIdle) {
    this._canIdle.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this._hideOnMouseLeave() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this._hideOnMouseLeave.set(hide);
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
    this._clearIdleTimer();
    if (!this._pausedTracking) {
      this._changeVisibility(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this._clearIdleTimer();
    if (!this._pausedTracking) {
      this._changeVisibility(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this._pausedTracking = true;
    this._clearIdleTimer();
    this._changeVisibility(true, 0, trigger);
  }
  resume(trigger) {
    this._pausedTracking = false;
    if (this.$state.paused())
      return;
    this._changeVisibility(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this._init.bind(this));
  }
  _init() {
    const { viewType } = this.$state;
    if (!this._canIdle())
      return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this._watchMouse.bind(this));
    effect(this._watchPaused.bind(this));
    const onPlay = this._onPlay.bind(this), onPause = this._onPause.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  _watchMouse() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine")
      return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this._isMouseOutside()) {
      effect(() => {
        if (!paused())
          this.listen("pointermove", this._onStopIdle.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this._onMouseEnter.bind(this));
      this.listen("mouseleave", this._onMouseLeave.bind(this));
    }
  }
  _watchPaused() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started())
      return;
    const onStopIdle = this._onStopIdle.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  _onPlay(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  _onPause(event) {
    this.show(0, event);
  }
  _onMouseEnter(event) {
    this._isMouseOutside.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  _onMouseLeave(event) {
    this._isMouseOutside.set(true);
    this.hide(0, event);
  }
  _clearIdleTimer() {
    window.clearTimeout(this._idleTimer);
    this._idleTimer = -1;
  }
  _onStopIdle(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this._pausedTracking || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this._focusedItem = null;
      } else if (this._focusedItem) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this._focusedItem?.focus();
          this._focusedItem = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  _changeVisibility(visible, delay, trigger) {
    if (delay === 0) {
      this._onChange(visible, trigger);
      return;
    }
    this._idleTimer = window.setTimeout(() => {
      if (!this.scope)
        return;
      this._onChange(visible && !this._pausedTracking, trigger);
    }, delay);
  }
  _onChange(visible, trigger) {
    if (this.$state.controlsVisible() === visible)
      return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this._focusedItem = document.activeElement;
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
    this._data = {
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
    return this._data.volume;
  }
  async setVolume(volume) {
    this._data.volume = volume;
    this.save();
  }
  async getMuted() {
    return this._data.muted;
  }
  async setMuted(muted) {
    this._data.muted = muted;
    this.save();
  }
  async getTime() {
    return this._data.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this._data.time = !shouldClear ? time : null;
    if (shouldClear || ended)
      this.saveTime();
    else
      this.saveTimeThrottled();
  }
  async getLang() {
    return this._data.lang;
  }
  async setLang(lang) {
    this._data.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this._data.captions;
  }
  async setCaptions(enabled) {
    this._data.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this._data.rate;
  }
  async setPlaybackRate(rate) {
    this._data.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this._data.audioGain;
  }
  async setAudioGain(gain) {
    this._data.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this._data.quality;
  }
  async setVideoQuality(quality) {
    this._data.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this._data = {
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
    return;
  }
  saveTime() {
    return;
  }
}

class NativeTextRenderer {
  constructor() {
    this.priority = 0;
    this._display = true;
    this._video = null;
    this._track = null;
    this._tracks = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this._video = video;
    if (video)
      video.textTracks.onchange = this._onChange.bind(this);
  }
  addTrack(track) {
    this._tracks.add(track);
    this._attachTrack(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol._native]?.remove?.();
    track[TextTrackSymbol._native] = null;
    this._tracks.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol._native];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this._track = track;
  }
  setDisplay(display) {
    this._display = display;
    this._onChange();
  }
  detach() {
    if (this._video)
      this._video.textTracks.onchange = null;
    for (const track of this._tracks)
      this.removeTrack(track);
    this._tracks.clear();
    this._video = null;
    this._track = null;
  }
  _attachTrack(track) {
    if (!this._video)
      return;
    const el = track[TextTrackSymbol._native] ??= this._createTrackElement(track);
    if (isHTMLElement(el)) {
      this._video.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  _createTrackElement(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this._copyCues(track, el.track);
    }
    return el;
  }
  _copyCues(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length)
      return;
    for (const cue of track.cues)
      native.addCue(cue);
  }
  _onChange(event) {
    for (const track of this._tracks) {
      const native = track[TextTrackSymbol._native];
      if (!native)
        continue;
      if (!this._display) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing)
        this._copyCues(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this._media = _media;
    this._video = null;
    this._renderers = [];
    this._nativeDisplay = false;
    this._nativeRenderer = null;
    this._customRenderer = null;
    const textTracks = _media.textTracks;
    this._textTracks = textTracks;
    effect(this._watchControls.bind(this));
    onDispose(this._detach.bind(this));
    listenEvent(textTracks, "add", this._onAddTrack.bind(this));
    listenEvent(textTracks, "remove", this._onRemoveTrack.bind(this));
    listenEvent(textTracks, "mode-change", this._update.bind(this));
  }
  _watchControls() {
    const { nativeControls } = this._media.$state;
    this._nativeDisplay = nativeControls();
    this._update();
  }
  add(renderer) {
    this._renderers.push(renderer);
    untrack(this._update.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this._renderers.splice(this._renderers.indexOf(renderer), 1);
    untrack(this._update.bind(this));
  }
  /** @internal */
  _attachVideo(video) {
    requestAnimationFrame(() => {
      this._video = video;
      if (video) {
        this._nativeRenderer = new NativeTextRenderer();
        this._nativeRenderer.attach(video);
        for (const track of this._textTracks)
          this._addNativeTrack(track);
      }
      this._update();
    });
  }
  _addNativeTrack(track) {
    if (!isTrackCaptionKind(track))
      return;
    this._nativeRenderer?.addTrack(track);
  }
  _removeNativeTrack(track) {
    if (!isTrackCaptionKind(track))
      return;
    this._nativeRenderer?.removeTrack(track);
  }
  _onAddTrack(event) {
    this._addNativeTrack(event.detail);
  }
  _onRemoveTrack(event) {
    this._removeNativeTrack(event.detail);
  }
  _update() {
    const currentTrack = this._textTracks.selected;
    if (this._video && (this._nativeDisplay || currentTrack?.[TextTrackSymbol._nativeHLS])) {
      this._customRenderer?.changeTrack(null);
      this._nativeRenderer?.setDisplay(true);
      this._nativeRenderer?.changeTrack(currentTrack);
      return;
    }
    this._nativeRenderer?.setDisplay(false);
    this._nativeRenderer?.changeTrack(null);
    if (!currentTrack) {
      this._customRenderer?.changeTrack(null);
      return;
    }
    const customRenderer = this._renderers.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this._video));
    if (this._customRenderer !== customRenderer) {
      this._customRenderer?.detach();
      customRenderer?.attach(this._video);
      this._customRenderer = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  _detach() {
    this._nativeRenderer?.detach();
    this._nativeRenderer = null;
    this._customRenderer?.detach();
    this._customRenderer = null;
  }
}

class LibASSTextRenderer {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
    this.priority = 1;
    this._instance = null;
    this._track = null;
    this._typeRE = /(ssa|ass)$/;
  }
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this._typeRE.test(track.type) || this._typeRE.test(track.src));
  }
  attach(video) {
    if (!video)
      return;
    this.loader().then(async (mod) => {
      this._instance = new mod.default({
        ...this.config,
        video,
        subUrl: this._track?.src || ""
      });
      listenEvent(this._instance);
      listenEvent(this._instance);
    });
  }
  changeTrack(track) {
    if (!track || track.readyState === 3) {
      this._freeTrack();
    } else if (this._track !== track) {
      this._instance?.setTrackByUrl(track.src);
      this._track = track;
    }
  }
  detach() {
    this._freeTrack();
  }
  _freeTrack() {
    this._instance?.freeTrack();
    this._track = null;
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
    this._canLoad = false;
    this._defaults = {};
    this._storage = null;
    this._preferredLang = null;
    this._selectTracks = functionDebounce(async () => {
      if (!this._canLoad)
        return;
      if (!this._preferredLang && this._storage) {
        this._preferredLang = await this._storage.getLang();
      }
      const showCaptions = await this._storage?.getCaptions(), kinds = [
        ["captions", "subtitles"],
        "chapters",
        "descriptions",
        "metadata"
      ];
      for (const kind of kinds) {
        const tracks = this.getByKind(kind);
        if (tracks.find((t) => t.mode === "showing"))
          continue;
        const preferredTrack = this._preferredLang ? tracks.find((track2) => track2.language === this._preferredLang) : null;
        const defaultTrack = isArray(kind) ? this._defaults[kind.find((kind2) => this._defaults[kind2]) || ""] : this._defaults[kind];
        const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
        if (track && (!isCaptionsKind || showCaptions !== false)) {
          track.mode = "showing";
          if (isCaptionsKind)
            this._saveCaptionsTrack(track);
        }
      }
    }, 300);
    this._pendingRemoval = null;
    this._onTrackModeChangeBind = this._onTrackModeChange.bind(this);
  }
  get selected() {
    const track = this._items.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this._preferredLang;
  }
  set preferredLang(lang) {
    this._preferredLang = lang;
    this._saveLang(lang);
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init), kind = init.kind === "captions" || init.kind === "subtitles" ? "captions" : init.kind;
    if (this._defaults[kind] && init.default)
      delete init.default;
    track.addEventListener("mode-change", this._onTrackModeChangeBind);
    this[ListSymbol._add](track, trigger);
    track[TextTrackSymbol._crossOrigin] = this[TextTrackSymbol._crossOrigin];
    if (this._canLoad)
      track[TextTrackSymbol._canLoad]();
    if (init.default)
      this._defaults[kind] = track;
    this._selectTracks();
    return this;
  }
  remove(track, trigger) {
    this._pendingRemoval = track;
    if (!this._items.includes(track))
      return;
    if (track === this._defaults[track.kind])
      delete this._defaults[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol._onModeChange] = null;
    track.removeEventListener("mode-change", this._onTrackModeChangeBind);
    this[ListSymbol._remove](track, trigger);
    this._pendingRemoval = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this._items]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this._items.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [(TextTrackSymbol._canLoad)]() {
    if (this._canLoad)
      return;
    for (const track of this._items)
      track[TextTrackSymbol._canLoad]();
    this._canLoad = true;
    this._selectTracks();
  }
  _onTrackModeChange(event) {
    const track = event.detail;
    if (this._storage && isTrackCaptionKind(track) && track !== this._pendingRemoval) {
      this._saveCaptionsTrack(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this._items) {
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
  _saveCaptionsTrack(track) {
    if (track.mode !== "disabled") {
      this._saveLang(track.language);
    }
    this._storage?.setCaptions?.(track.mode === "showing");
  }
  _saveLang(lang) {
    this._storage?.setLang?.(this._preferredLang = lang);
  }
  setStorage(storage) {
    this._storage = storage;
  }
}

const SELECTED = Symbol(0);
class SelectList extends List {
  get selected() {
    return this._items.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this._items.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol._onRemove](item, trigger) {
    this[ListSymbol._select](item, false, trigger);
  }
  /** @internal */
  [ListSymbol._add](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly)
          return;
        this[ListSymbol._onUserSelect]?.();
        this[ListSymbol._select](item, selected);
      }
    });
    super[ListSymbol._add](item, trigger);
  }
  /** @internal */
  [ListSymbol._select](item, selected, trigger) {
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
    this._auto = false;
    /**
     * Configures quality switching:
     *
     * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
     * request if any, flush the whole buffer, and fetch fragment matching with current position
     * and requested quality level.
     *
     * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
     * already buffered next fragment.
     *
     * - `load`: Set quality level for next loaded fragment.
     *
     * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
     */
    this.switch = "current";
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this._auto || this.readonly;
  }
  /** @internal */
  [(ListSymbol._onUserSelect)]() {
    this[QualitySymbol._setAuto](false);
  }
  /** @internal */
  [ListSymbol._onReset](trigger) {
    this[QualitySymbol._enableAuto] = void 0;
    this[QualitySymbol._setAuto](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this._auto || !this[QualitySymbol._enableAuto])
      return;
    this[QualitySymbol._enableAuto]?.(trigger);
    this[QualitySymbol._setAuto](true, trigger);
  }
  getBySrc(src) {
    return this._items.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol._setAuto](auto, trigger) {
    if (this._auto === auto)
      return;
    this._auto = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
}

function sortVideoQualities(qualities, desc) {
  return [...qualities].sort(desc ? compareVideoQualityDesc : compareVideoQualityAsc);
}
function compareVideoQualityAsc(a, b) {
  return a.height === b.height ? (a.bitrate ?? 0) - (b.bitrate ?? 0) : a.height - b.height;
}
function compareVideoQualityDesc(a, b) {
  return b.height === a.height ? (b.bitrate ?? 0) - (a.bitrate ?? 0) : b.height - a.height;
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
  return false;
}
function isHTMLVideoElement(element) {
  return false;
}
function isHTMLMediaElement(element) {
  return isHTMLVideoElement();
}
function isHTMLIFrameElement(element) {
  return false;
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
    this._media = _media;
    this._timeSlider = null;
  }
  onConnect() {
    effect(this._onTargetChange.bind(this));
  }
  _onTargetChange() {
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
    }
    effect(() => {
      if (!$active())
        return;
      listenEvent(target, "keyup", this._onKeyUp.bind(this));
      listenEvent(target, "keydown", this._onKeyDown.bind(this));
      listenEvent(target, "keydown", this._onPreventVideoKeys.bind(this));
    });
  }
  _onKeyUp(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this._getMatchingMethod(event);
    if (!isString(value) && !isArray(value)) {
      value?.onKeyUp?.({
        event,
        player: this._media.player,
        remote: this._media.remote
      });
      value?.callback?.(event, this._media.remote);
      return;
    }
    if (method?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this._timeSlider) {
        this._forwardTimeKeyboardEvent(event, method === "seekForward");
        this._timeSlider = null;
      } else {
        this._media.remote.seek(this._seekTotal, event);
        this._seekTotal = void 0;
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
  _onKeyDown(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key))
      return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this._getMatchingMethod(event), isNumberPress = !event.metaKey && /^[0-9]$/.test(event.key);
    if (!isString(value) && !isArray(value) && !isNumberPress) {
      value?.onKeyDown?.({
        event,
        player: this._media.player,
        remote: this._media.remote
      });
      value?.callback?.(event, this._media.remote);
      return;
    }
    if (!method && isNumberPress) {
      event.preventDefault();
      event.stopPropagation();
      this._media.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this._seeking(event, method, method === "seekForward");
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
          this._media.remote.changeVolume(
            this.$state.volume() + (method === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this._media.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this._media.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this._media.remote[method]?.(event);
    }
    this.$state.lastKeyboardAction.set({
      action: method,
      event
    });
  }
  _onPreventVideoKeys(event) {
    if (isHTMLMediaElement(event.target) ) ;
  }
  _getMatchingMethod(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this._media.ariaKeys
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
  _calcSeekAmount(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this._seekTotal = Math.max(
      0,
      Math.min(
        (this._seekTotal ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  _forwardTimeKeyboardEvent(event, forward) {
    this._timeSlider?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  _seeking(event, type, forward) {
    if (!this.$state.canSeek())
      return;
    if (!this._timeSlider) {
      this._timeSlider = this.el.querySelector("[data-media-time-slider]");
    }
    if (this._timeSlider) {
      this._forwardTimeKeyboardEvent(event, forward);
    } else {
      this._media.remote.seeking(this._calcSeekAmount(event, type), event);
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
    this._shortcut = _shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this._shortcut] = keys;
      return;
    }
    const shortcuts = $props.keyShortcuts()[this._shortcut];
    if (shortcuts) {
      const keys2 = isArray(shortcuts) ? shortcuts.join(" ") : isString(shortcuts) ? shortcuts : shortcuts?.keys;
      el.setAttribute("aria-keyshortcuts", isArray(keys2) ? keys2.join(" ") : keys2);
    }
  }
}

function updateFontCssVars() {
  return;
}

class AudioProviderLoader {
  constructor() {
    this.name = "audio";
  }
  canPlay(src) {
    if (!isAudioSrc(src))
      return false;
    return true;
  }
  mediaType() {
    return "audio";
  }
  async load(ctx) {
    {
      throw Error("[vidstack] can not load audio provider server-side");
    }
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
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/vimeo";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    {
      throw Error("[vidstack] can not load vimeo provider server-side");
    }
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId, getVimeoVideoInfo } = await import('./chunks/vidstack-BInq9zTH.js');
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
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/youtube";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    {
      throw Error("[vidstack] can not load youtube provider server-side");
    }
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import('./chunks/vidstack-DscYSLiW.js');
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
    this._type = _type;
    this._callback = _callback;
  }
  async onAttach(el) {
    return;
  }
}

class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this._handle = _handle;
    this._media = _media;
    this._notify = (type, ...init) => {
      return;
    };
  }
  async _ready(info, trigger) {
    return;
  }
  async _attemptAutoplay(trigger) {
    const {
      player,
      $state: { autoPlaying, muted }
    } = this._media;
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
    this._queue = /* @__PURE__ */ new Map();
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  _enqueue(key, item) {
    this._queue.set(key, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  _serve(key) {
    const value = this._peek(key);
    this._queue.delete(key);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  _peek(key) {
    return this._queue.get(key);
  }
  /**
   * Removes queued item under the given `key`.
   */
  _delete(key) {
    this._queue.delete(key);
  }
  /**
   * Clear all items in the queue.
   */
  _clear() {
    this._queue.clear();
  }
}

class RequestQueue {
  constructor() {
    this._serving = false;
    this._pending = deferredPromise();
    this._queue = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get _size() {
    return this._queue.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get _isServing() {
    return this._serving;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async _waitForFlush() {
    if (this._serving)
      return;
    await this._pending.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  _enqueue(key, callback) {
    if (this._serving) {
      callback();
      return;
    }
    this._queue.delete(key);
    this._queue.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  _serve(key) {
    this._queue.get(key)?.();
    this._queue.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  _start() {
    this._flush();
    this._serving = true;
    if (this._queue.size > 0)
      this._flush();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  _stop() {
    this._serving = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  _reset() {
    this._stop();
    this._queue.clear();
    this._release();
  }
  _flush() {
    for (const key of this._queue.keys())
      this._serve(key);
    this._release();
  }
  _release() {
    this._pending.resolve();
    this._pending = deferredPromise();
  }
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this._stateMgr = _stateMgr;
    this._request = _request;
    this._media = _media;
    this._providerQueue = new RequestQueue();
    this._wasPIPActive = false;
    this._$provider = _media.$provider;
    this._controls = new MediaControls();
    this._fullscreen = new FullscreenController();
    this._orientation = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this._onFullscreenChange.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this._handleRequest.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this._attachLoadPlayListener();
    effect(this._watchProvider.bind(this));
    effect(this._watchControlsDelayChange.bind(this));
    effect(this._watchAudioGainSupport.bind(this));
    effect(this._watchAirPlaySupport.bind(this));
    effect(this._watchGoogleCastSupport.bind(this));
    effect(this._watchFullscreenSupport.bind(this));
    effect(this._watchPiPSupport.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen())
        this._exitFullscreen("prefer-media", destroyEvent);
      if (pictureInPicture())
        this._exitPictureInPicture(destroyEvent);
    } catch (e) {
    }
    this._providerQueue._reset();
  }
  _attachLoadPlayListener() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad())
      return;
    const off = this.listen("media-play-request", (event) => {
      this._handleLoadPlayStrategy(event);
      off();
    });
  }
  _watchProvider() {
    const provider = this._$provider(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this._providerQueue._start();
    }
    return () => {
      this._providerQueue._stop();
    };
  }
  _handleRequest(event) {
    event.stopPropagation();
    if (event.defaultPrevented)
      return;
    if (!this[event.type])
      return;
    if (peek(this._$provider)) {
      this[event.type](event);
    } else {
      this._providerQueue._enqueue(event.type, () => {
        if (peek(this._$provider))
          this[event.type](event);
      });
    }
  }
  async _play(trigger) {
    return;
  }
  _handleLoadPlayStrategy(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event);
      this._providerQueue._enqueue("media-play-request", async () => {
        try {
          await this._play(event);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async _pause(trigger) {
    return;
  }
  _setAudioGain(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain)
      return;
    const provider = this._$provider();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this._request._queue._enqueue("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  _seekToLiveEdge(trigger) {
    return;
  }
  async _enterFullscreen(target = "prefer-media", trigger) {
    return;
  }
  async _exitFullscreen(target = "prefer-media", trigger) {
    return;
  }
  _getFullscreenAdapter(target) {
    const provider = peek(this._$provider);
    return target === "prefer-media" && this._fullscreen.supported || target === "media" ? this._fullscreen : provider?.fullscreen;
  }
  async _enterPictureInPicture(trigger) {
    return;
  }
  async _exitPictureInPicture(trigger) {
    return;
  }
  _throwIfPIPNotSupported() {
    if (this.$state.canPictureInPicture())
      return;
    throw Error(
      "[vidstack] no pip support"
    );
  }
  _watchControlsDelayChange() {
    this._controls.defaultDelay = this.$props.controlsDelay();
  }
  _watchAudioGainSupport() {
    const { canSetAudioGain } = this.$state, supported = !!this._$provider()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  _watchAirPlaySupport() {
    const { canAirPlay } = this.$state, supported = !!this._$provider()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  _watchGoogleCastSupport() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME  ;
    canGoogleCast.set(supported);
  }
  _watchFullscreenSupport() {
    const { canFullscreen } = this.$state, supported = this._fullscreen.supported || !!this._$provider()?.fullscreen?.supported;
    canFullscreen.set(supported);
  }
  _watchPiPSupport() {
    const { canPictureInPicture } = this.$state, supported = !!this._$provider()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event) {
    try {
      await this._requestAirPlay(event);
    } catch (error) {
    }
  }
  async _requestAirPlay(trigger) {
    try {
      const adapter = this._$provider()?.airPlay;
      if (!adapter?.supported) {
        throw Error(false ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this._request._queue._enqueue("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this._request._queue._delete("media-airplay-request");
      throw error;
    }
  }
  async ["media-google-cast-request"](event) {
    try {
      await this._requestGoogleCast(event);
    } catch (error) {
    }
  }
  async _requestGoogleCast(trigger) {
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
      if (!this._googleCastLoader) {
        const $module = await import('./chunks/vidstack-D8Vh85If.js');
        this._googleCastLoader = new $module.GoogleCastLoader();
      }
      await this._googleCastLoader.prompt(this._media);
      if (trigger) {
        this._request._queue._enqueue("media-google-cast-request", trigger);
      }
      const isConnecting = peek(this.$state.remotePlaybackState) !== "disconnected";
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime)
        });
      }
      this.$state.remotePlaybackLoader.set(isConnecting ? this._googleCastLoader : null);
    } catch (error) {
      this._request._queue._delete("media-google-cast-request");
      throw error;
    }
  }
  ["media-audio-track-change-request"](event) {
    const { logger, audioTracks } = this._media;
    if (audioTracks.readonly) {
      return;
    }
    const index = event.detail, track = audioTracks[index];
    if (track) {
      const key = event.type;
      this._request._queue._enqueue(key, event);
      track.selected = true;
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this._enterFullscreen(event.detail, event);
    } catch (error) {
      this._onFullscreenError(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this._exitFullscreen(event.detail, event);
    } catch (error) {
      this._onFullscreenError(error, event);
    }
  }
  async _onFullscreenChange(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || lockType === "none" || !this._orientation.supported)
      return;
    if (isFullscreen) {
      if (this._orientation.locked)
        return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this._orientation.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  _onFullscreenError(error, request) {
    this._stateMgr._handle(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    const key = event.type;
    try {
      this._request._queue._enqueue(key, event);
      await this._orientation.lock(event.detail);
    } catch (error) {
      this._request._queue._delete(key);
    }
  }
  async ["media-orientation-unlock-request"](event) {
    const key = event.type;
    try {
      this._request._queue._enqueue(key, event);
      await this._orientation.unlock();
    } catch (error) {
      this._request._queue._delete(key);
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this._enterPictureInPicture(event);
    } catch (error) {
      this._onPictureInPictureError(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this._exitPictureInPicture(event);
    } catch (error) {
      this._onPictureInPictureError(error, event);
    }
  }
  _onPictureInPictureError(error, request) {
    this._stateMgr._handle(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek())
      return;
    this._request._queue._enqueue("media-seek-request", event);
    try {
      this._seekToLiveEdge();
    } catch (error) {
      this._request._queue._delete("media-seek-request");
    }
  }
  async ["media-loop-request"](event) {
    try {
      this._request._looping = true;
      this._request._replaying = true;
      await this._play(event);
    } catch (error) {
      this._request._looping = false;
    }
  }
  ["media-user-loop-change-request"](event) {
    this.$state.userPrefersLoop.set(event.detail);
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused())
      return;
    try {
      await this._pause(event);
    } catch (error) {
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused())
      return;
    try {
      await this._play(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate())
      return;
    const provider = this._$provider();
    if (!provider?.setPlaybackRate)
      return;
    this._request._queue._enqueue("media-rate-change-request", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-audio-gain-change-request"](event) {
    try {
      this._setAudioGain(event.detail, event);
    } catch (e) {
    }
  }
  ["media-quality-change-request"](event) {
    const { qualities, storage, logger } = this._media;
    if (qualities.readonly) {
      return;
    }
    this._request._queue._enqueue("media-quality-change-request", event);
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
    this._request._queue._enqueue(key, event);
    this._controls.pause(event);
  }
  ["media-resume-controls-request"](event) {
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._controls.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event.detail;
    if (ended())
      this._request._replaying = true;
    const key = event.type;
    this._request._seeking = false;
    this._request._queue._delete(key);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek())
      return;
    this._request._queue._enqueue(key, event);
    this._$provider().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this.$state.seeking.set(true);
    this._request._seeking = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad())
      return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._stateMgr._handle(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event) {
    if (this.$state.canLoadPoster())
      return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._stateMgr._handle(this.createEvent("can-load-poster"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this._media.textTracks[index];
    if (track) {
      const key = event.type;
      this._request._queue._enqueue(key, event);
      track.setMode(mode, event);
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted())
      return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._$provider().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted())
      return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._media.$provider().setMuted(false);
    if (volume() === 0) {
      this._request._queue._enqueue(key, event);
      this._$provider().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume)
      return;
    const key = event.type;
    this._request._queue._enqueue(key, event);
    this._$provider().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this._request._queue._enqueue(key, event);
      this._$provider().setMuted(false);
    }
  }
  _logError(title, error, request) {
    return;
  }
}
class MediaRequestContext {
  constructor() {
    this._seeking = false;
    this._looping = false;
    this._replaying = false;
    this._queue = new Queue();
  }
}

class MediaStateManager extends MediaPlayerController {
  constructor(_request, _media) {
    super();
    this._request = _request;
    this._media = _media;
    this._trackedEvents = /* @__PURE__ */ new Map();
    this._clipEnded = false;
    this._firingWaiting = false;
    this._isPlayingOnDisconnect = false;
    this._stopQualityResizeEffect = null;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, realCurrentTime, paused } = this.$state;
        seeking.set(true);
        realCurrentTime.set(event.detail);
        this._satisfyRequest("media-seeking-request", event);
        if (paused()) {
          this._waitingTrigger = event;
          this._fireWaiting();
        }
      },
      150,
      { leading: true }
    );
    this._fireWaiting = functionDebounce(() => {
      if (!this._waitingTrigger)
        return;
      this._firingWaiting = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this._waitingTrigger });
      this._trackedEvents.set("waiting", event);
      this.dispatch(event);
      this._waitingTrigger = void 0;
      this._firingWaiting = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this._watchCanSetVolume.bind(this));
    this._addTextTrackListeners();
    this._addQualityListeners();
    this._addAudioTrackListeners();
    this._resumePlaybackOnConnect();
    onDispose(this._pausePlaybackOnDisconnect.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this._media;
    audioTracks[ListSymbol._reset]();
    qualities[ListSymbol._reset]();
    textTracks[ListSymbol._reset]();
    this._stopWatchingQualityResize();
  }
  _handle(event) {
    if (!this.scope)
      return;
    event.type;
    untrack(() => this[event.type]?.(event));
  }
  _resumePlaybackOnConnect() {
    if (!this._isPlayingOnDisconnect)
      return;
    requestAnimationFrame(() => {
      if (!this.scope)
        return;
      this._media.remote.play(new DOMEvent("dom-connect"));
    });
    this._isPlayingOnDisconnect = false;
  }
  _pausePlaybackOnDisconnect() {
    if (this._isPlayingOnDisconnect)
      return;
    this._isPlayingOnDisconnect = !this.$state.paused();
    this._media.$provider()?.pause();
  }
  _resetTracking() {
    this._stopWaiting();
    this._clipEnded = false;
    this._request._replaying = false;
    this._request._looping = false;
    this._firingWaiting = false;
    this._waitingTrigger = void 0;
    this._trackedEvents.clear();
  }
  _satisfyRequest(request, event) {
    const requestEvent = this._request._queue._serve(request);
    if (!requestEvent)
      return;
    event.request = requestEvent;
    event.triggers.add(requestEvent);
  }
  _addTextTrackListeners() {
    this._onTextTracksChange();
    this._onTextTrackModeChange();
    const textTracks = this._media.textTracks;
    listenEvent(textTracks, "add", this._onTextTracksChange.bind(this));
    listenEvent(textTracks, "remove", this._onTextTracksChange.bind(this));
    listenEvent(textTracks, "mode-change", this._onTextTrackModeChange.bind(this));
  }
  _addQualityListeners() {
    const qualities = this._media.qualities;
    listenEvent(qualities, "add", this._onQualitiesChange.bind(this));
    listenEvent(qualities, "remove", this._onQualitiesChange.bind(this));
    listenEvent(qualities, "change", this._onQualityChange.bind(this));
    listenEvent(qualities, "auto-change", this._onAutoQualityChange.bind(this));
    listenEvent(qualities, "readonly-change", this._onCanSetQualityChange.bind(this));
  }
  _addAudioTrackListeners() {
    const audioTracks = this._media.audioTracks;
    listenEvent(audioTracks, "add", this._onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "remove", this._onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "change", this._onAudioTrackChange.bind(this));
  }
  _onTextTracksChange(event) {
    const { textTracks } = this.$state;
    textTracks.set(this._media.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  _onTextTrackModeChange(event) {
    if (event)
      this._satisfyRequest("media-text-track-change-request", event);
    const current = this._media.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  _onAudioTracksChange(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this._media.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  _onAudioTrackChange(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this._media.audioTracks.selected);
    if (event)
      this._satisfyRequest("media-audio-track-change-request", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  _onQualitiesChange(event) {
    const { qualities } = this.$state;
    qualities.set(this._media.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  _onQualityChange(event) {
    const { quality } = this.$state;
    quality.set(this._media.qualities.selected);
    if (event)
      this._satisfyRequest("media-quality-change-request", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  _onAutoQualityChange() {
    const { qualities } = this._media, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto)
      this._stopWatchingQualityResize();
  }
  _watchQualityResize() {
    this._stopWatchingQualityResize();
    this._stopQualityResizeEffect = effect(() => {
      const { qualities } = this._media, { mediaWidth, mediaHeight } = this.$state, w = mediaWidth(), h = mediaHeight();
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
        qualities[ListSymbol._select](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w, height: h } })
        );
      }
    });
  }
  _stopWatchingQualityResize() {
    this._stopQualityResizeEffect?.();
    this._stopQualityResizeEffect = null;
  }
  _onCanSetQualityChange() {
    this.$state.canSetQuality.set(!this._media.qualities.readonly);
  }
  _watchCanSetVolume() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event) {
    const prevProvider = this._media.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type)
      return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this._media.$provider.set(event.detail);
    if (prevProvider && event.detail === null) {
      this._resetMediaState(event);
    }
  }
  ["provider-loader-change"](event) {
  }
  ["auto-play"](event) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event) {
    this.$state.autoPlayError.set(event.detail);
    this._resetTracking();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this._trackedEvents.set("can-load", event);
    this._media.textTracks[TextTrackSymbol._canLoad]();
    this._satisfyRequest("media-start-loading", event);
  }
  ["can-load-poster"](event) {
    this.$state.canLoadPoster.set(true);
    this._trackedEvents.set("can-load-poster", event);
    this._satisfyRequest("media-poster-start-loading", event);
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event.detail : providedViewType;
    if (viewType !== currentViewType) {
      {
        this.$state.inferredViewType.set(currentViewType);
      }
    }
  }
  ["stream-type-change"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    const { storage } = this._media, { canPlay } = this.$state;
    this.$state.playbackRate.set(event.detail);
    this._satisfyRequest("media-rate-change-request", event);
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
      this._satisfyRequest(key, event);
    } else {
      const requestEvent = this._request._queue._peek(key);
      if (requestEvent) {
        event.request = requestEvent;
        event.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event) {
    const prevSources = this.$state.sources(), newSources = event.detail;
    this.$state.sources.set(newSources);
    this._onSourceQualitiesChange(prevSources, newSources, event);
  }
  _onSourceQualitiesChange(prevSources, newSources, trigger) {
    let { qualities } = this._media, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc))
        continue;
      const exists = newSources.some((s) => s.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol._remove](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol._reset](trigger);
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
      qualities[ListSymbol._add](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol._enableAuto]) {
      this._watchQualityResize();
      qualities[QualitySymbol._enableAuto] = this._watchQualityResize.bind(this);
      qualities[QualitySymbol._setAuto](true, trigger);
    }
  }
  ["source-change"](event) {
    event.isQualityChange = event.originEvent?.type === "quality-change";
    const source = event.detail;
    this._resetMediaState(event, event.isQualityChange);
    this._trackedEvents.set(event.type, event);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
  }
  _resetMediaState(event, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this._media;
    if (!isSourceQualityChange) {
      audioTracks[ListSymbol._reset](event);
      qualities[ListSymbol._reset](event);
      softResetMediaState(this.$state, isSourceQualityChange);
      this._resetTracking();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this._resetTracking();
  }
  ["abort"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this._trackedEvents.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this._trackedEvents.get("abort");
    if (abortEvent)
      event.triggers.add(abortEvent);
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this._trackedEvents.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this._trackedEvents.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this._trackedEvents.get("loaded-metadata");
    if (loadedMetadata)
      event.triggers.add(loadedMetadata);
    this._onCanPlayDetail(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this._onCanPlayDetail(event.detail);
    const canPlay = this._trackedEvents.get("can-play");
    if (canPlay)
      event.triggers.add(canPlay);
  }
  _onCanPlayDetail(detail) {
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
        this._onEndPrecisionChange(event);
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
    this._resetPlaybackIfNeeded();
    if (!paused()) {
      event.stopImmediatePropagation();
      return;
    }
    event.autoPlay = autoPlaying();
    const waitingEvent = this._trackedEvents.get("waiting");
    if (waitingEvent)
      event.triggers.add(waitingEvent);
    this._satisfyRequest("media-play-request", event);
    this._trackedEvents.set("play", event);
    paused.set(false);
    autoPlayError.set(null);
    if (event.autoPlay) {
      this._handle(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this._request._replaying) {
      this._request._replaying = false;
      ended.set(false);
      this._handle(this.createEvent("replay", { trigger: event }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this._media.remote.enterFullscreen("prefer-media", event);
    }
    if (live() && !userBehindLiveEdge()) {
      this._media.remote.seekToLiveEdge(event);
    }
  }
  _resetPlaybackIfNeeded(trigger) {
    const provider = peek(this._media.$provider);
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
    const playEvent = this._trackedEvents.get("play");
    if (playEvent)
      event.triggers.add(playEvent);
    this._satisfyRequest("media-play-request", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this._resetTracking();
    this._trackedEvents.set("play-fail", event);
    if (event.autoPlay) {
      this._handle(
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
    const playEvent = this._trackedEvents.get("play"), seekedEvent = this._trackedEvents.get("seeked");
    if (playEvent)
      event.triggers.add(playEvent);
    else if (seekedEvent)
      event.triggers.add(seekedEvent);
    setTimeout(() => this._resetTracking(), 0);
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
    if (this._request._looping) {
      this._request._looping = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end))
        this._media.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this._handle(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this._isPlayingOnDisconnect = true;
    }
    this._satisfyRequest("media-pause-request", event);
    const seekedEvent = this._trackedEvents.get("seeked");
    if (seekedEvent)
      event.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this._clipEnded) {
      setTimeout(() => {
        this._handle(this.createEvent("end", { trigger: event }));
        this._clipEnded = false;
      }, 0);
    }
    this._resetTracking();
  }
  ["time-update"](event) {
    if (this._request._looping) {
      event.stopImmediatePropagation();
      return;
    }
    const { realCurrentTime, played, waiting, clipEndTime } = this.$state, endTime = clipEndTime(), detail = event.detail;
    realCurrentTime.set(detail.currentTime);
    played.set(detail.played);
    waiting.set(false);
    for (const track of this._media.textTracks) {
      track[TextTrackSymbol._updateActiveCues](detail.currentTime, event);
    }
    if (endTime > 0 && detail.currentTime >= endTime) {
      this._clipEnded = true;
      this.dispatch("media-pause-request", { trigger: event });
    }
    this._saveTime();
  }
  // Called to update time again incase duration precision has changed.
  _onEndPrecisionChange(trigger) {
    const { duration, played } = this.$state, playedStart = getTimeRangesStart(played()) ?? 0;
    this._handle(
      this.createEvent("time-update", {
        detail: {
          currentTime: duration(),
          played: new TimeRange(playedStart, duration())
        },
        trigger
      })
    );
  }
  _saveTime() {
    const { storage } = this._media, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event) {
    const { storage } = this._media, { canPlay, audioGain } = this.$state;
    audioGain.set(event.detail);
    this._satisfyRequest("media-audio-gain-change-request", event);
    if (canPlay())
      storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event) {
    const { storage } = this._media, { volume, muted, canPlay } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this._satisfyRequest("media-volume-change-request", event);
    this._satisfyRequest(detail.muted ? "media-mute-request" : "media-unmute-request", event);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeked"](event) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this._request._seeking) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this._trackedEvents.get("waiting");
      if (waitingEvent)
        event.triggers.add(waitingEvent);
      const seekingEvent = this._trackedEvents.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused())
        this._stopWaiting();
      seeking.set(false);
      realCurrentTime.set(event.detail);
      this._satisfyRequest("media-seek-request", event);
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
    if (this._firingWaiting || this._request._seeking)
      return;
    event.stopImmediatePropagation();
    this._waitingTrigger = event;
    this._fireWaiting();
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
    setTimeout(() => this._onEnded(event), 0);
  }
  _onEnded(event) {
    const { storage } = this._media, { paused, seeking, ended, duration } = this.$state;
    this._onEndPrecisionChange(event);
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
    this._resetTracking();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event
    });
  }
  _stopWaiting() {
    this._fireWaiting.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    const isFullscreen = event.detail;
    this.$state.fullscreen.set(isFullscreen);
    this._satisfyRequest(
      isFullscreen ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event
    );
  }
  ["fullscreen-error"](event) {
    this._satisfyRequest("media-enter-fullscreen-request", event);
    this._satisfyRequest("media-exit-fullscreen-request", event);
  }
  ["orientation-change"](event) {
    const isLocked = event.detail.lock;
    this._satisfyRequest(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event
    );
  }
  ["picture-in-picture-change"](event) {
    const isPiP = event.detail;
    this.$state.pictureInPicture.set(isPiP);
    this._satisfyRequest(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event);
  }
  ["picture-in-picture-error"](event) {
    this._satisfyRequest("media-enter-pip-request", event);
    this._satisfyRequest("media-exit-pip-request", event);
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
    this._init();
    return;
  }
  _init() {
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
  _watchProvidedTypes() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  _watchLogLevel() {
    return;
  }
  _watchMetadata() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  _watchTitle() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  _watchAutoplay() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  _watchLoop() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  _watchControls() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  _watchPoster() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  _watchCrossOrigin() {
    const _crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = _crossOrigin === true ? "" : _crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  _watchDuration() {
    const { providedDuration } = this.$state;
    providedDuration.set(this.$props.duration());
  }
  _watchPlaysInline() {
    const inline = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline);
    this.dispatch("plays-inline-change", { detail: inline });
  }
  _watchClipTimes() {
    const { clipStartTime, clipEndTime } = this.$props;
    this.$state.clipStartTime.set(clipStartTime());
    this.$state.clipEndTime.set(clipEndTime());
  }
  _watchLive() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  _watchLiveTolerance() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  _watchLiveEdge() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

class NavigatorMediaSession extends MediaPlayerController {
  static {
    this._actions = ["play", "pause", "seekforward", "seekbackward", "seekto"];
  }
  constructor() {
    super();
  }
  onConnect() {
    effect(this._onMetadataChange.bind(this));
    effect(this._onPlaybackStateChange.bind(this));
    const handleAction = this._handleAction.bind(this);
    for (const action of NavigatorMediaSession._actions) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this._onDisconnect.bind(this));
  }
  _onDisconnect() {
    for (const action of NavigatorMediaSession._actions) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  _onMetadataChange() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  _onPlaybackStateChange() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  _handleAction(details) {
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
class FocusVisibleController extends ViewController {
  constructor() {
    super(...arguments);
    this._focused = signal(false);
  }
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this._focused.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this._onPointerEnter.bind(this));
        this.listen("pointerleave", this._onPointerLeave.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this._focused.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this._onFocus.bind(this));
      this.listen("blur", this._onBlur.bind(this));
    });
  }
  focused() {
    return this._focused();
  }
  _onFocus() {
    this._focused.set(true);
    updateFocusAttr(this.el, true);
  }
  _onBlur() {
    this._focused.set(false);
    updateFocusAttr(this.el, false);
  }
  _onPointerEnter() {
    updateHoverAttr(this.el, true);
  }
  _onPointerLeave() {
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
const _MediaPlayer = class _MediaPlayer extends Component {
  constructor() {
    super();
    this.canPlayQueue = new RequestQueue();
    this._skipTitleUpdate = false;
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
    context.textTracks[TextTrackSymbol._crossOrigin] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this._media = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    const request = new MediaRequestContext();
    this._stateMgr = new MediaStateManager(request, context);
    this._requestMgr = new MediaRequestManager(this._stateMgr, request, context);
    context.delegate = new MediaPlayerDelegate(
      this._stateMgr._handle.bind(this._stateMgr),
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
  get _provider() {
    return this._media.$provider();
  }
  get _$$props() {
    return this.$props;
  }
  onSetup() {
    this._setupMediaAttributes();
    effect(this._watchCanPlay.bind(this));
    effect(this._watchMuted.bind(this));
    effect(this._watchPaused.bind(this));
    effect(this._watchVolume.bind(this));
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchPlaysInline.bind(this));
    effect(this._watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this._watchStorage.bind(this));
    this._watchTitle();
    this._watchOrientation();
    listenEvent(el, "find-media-player", this._onFindPlayer.bind(this));
  }
  onConnect(el) {
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this._onPointerChange(pointerQuery);
    pointerQuery.onchange = this._onPointerChange.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this._onResize.bind(this)));
    resize.observe(el);
    effect(this._onResize.bind(this));
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
    this._media.player = null;
    this.canPlayQueue._reset();
  }
  _watchTitle() {
    this.$el; const { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
    );
  }
  _watchOrientation() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this._onResize();
  }
  _watchCanPlay() {
    if (this.$state.canPlay() && this._provider)
      this.canPlayQueue._start();
    else
      this.canPlayQueue._stop();
  }
  _setupMediaAttributes() {
    if (_MediaPlayer[MEDIA_ATTRIBUTES]) {
      this.setAttributes(_MediaPlayer[MEDIA_ATTRIBUTES]);
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
    _MediaPlayer[MEDIA_ATTRIBUTES] = $attrs;
    this.setAttributes($attrs);
  }
  _onFindPlayer(event) {
    event.detail(this);
  }
  _onResize() {
    return;
  }
  _onPointerChange(queryList) {
    return;
  }
  get provider() {
    return this._provider;
  }
  get controls() {
    return this._requestMgr._controls;
  }
  set controls(controls) {
    this._$$props.controls.set(controls);
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this._skipTitleUpdate) {
      this._skipTitleUpdate = false;
      return;
    }
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return this._media.qualities;
  }
  get audioTracks() {
    return this._media.audioTracks;
  }
  get textTracks() {
    return this._media.textTracks;
  }
  get textRenderers() {
    return this._media.textRenderers;
  }
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    this._$$props.duration.set(duration);
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this._queuePausedUpdate(paused);
  }
  _watchPaused() {
    this._queuePausedUpdate(this.$props.paused());
  }
  _queuePausedUpdate(paused) {
    if (paused) {
      this.canPlayQueue._enqueue("paused", () => this._requestMgr._pause());
    } else
      this.canPlayQueue._enqueue("paused", () => this._requestMgr._play());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    this._$$props.muted.set(muted);
  }
  _watchMuted() {
    this._queueMutedUpdate(this.$props.muted());
  }
  _queueMutedUpdate(muted) {
    this.canPlayQueue._enqueue("muted", () => {
      if (this._provider)
        this._provider.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this._queueCurrentTimeUpdate(time);
  }
  _watchCurrentTime() {
    this._queueCurrentTimeUpdate(this.$props.currentTime());
  }
  _queueCurrentTimeUpdate(time) {
    this.canPlayQueue._enqueue("currentTime", () => {
      const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
      if (time === peek(currentTime))
        return;
      peek(() => {
        if (!this._provider)
          return;
        const clippedTime = time + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
        if (Number.isFinite(boundTime)) {
          this._provider.setCurrentTime(boundTime);
        }
      });
    });
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    this._$$props.volume.set(volume);
  }
  _watchVolume() {
    this._queueVolumeUpdate(this.$props.volume());
  }
  _queueVolumeUpdate(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue._enqueue("volume", () => {
      if (this._provider)
        this._provider.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this._queuePlaybackRateUpdate(rate);
  }
  _watchPlaybackRate() {
    this._queuePlaybackRateUpdate(this.$props.playbackRate());
  }
  _queuePlaybackRateUpdate(rate) {
    this.canPlayQueue._enqueue("rate", () => {
      if (this._provider)
        this._provider.setPlaybackRate?.(rate);
    });
  }
  _watchPlaysInline() {
    this._queuePlaysInlineUpdate(this.$props.playsInline());
  }
  _queuePlaysInlineUpdate(inline) {
    this.canPlayQueue._enqueue("playsinline", () => {
      if (this._provider)
        this._provider.setPlaysInline?.(inline);
    });
  }
  _watchStorage() {
    let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
    if (storage?.onChange) {
      const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(this._computeMediaId.bind(this));
      effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
    }
    this._media.storage = storage;
    this._media.textTracks.setStorage(storage);
    onDispose(() => {
      storage?.onDestroy?.();
      this._media.storage = null;
      this._media.textTracks.setStorage(null);
    });
  }
  _computeMediaId() {
    const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
    return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
  }
  async play(trigger) {
    return this._requestMgr._play(trigger);
  }
  async pause(trigger) {
    return this._requestMgr._pause(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this._requestMgr._enterFullscreen(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this._requestMgr._exitFullscreen(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this._requestMgr._enterPictureInPicture(trigger);
  }
  exitPictureInPicture(trigger) {
    return this._requestMgr._exitPictureInPicture(trigger);
  }
  seekToLiveEdge(trigger) {
    this._requestMgr._seekToLiveEdge(trigger);
  }
  startLoading(trigger) {
    this._media.delegate._notify("can-load", void 0, trigger);
  }
  startLoadingPoster(trigger) {
    this._media.delegate._notify("can-load-poster", void 0, trigger);
  }
  requestAirPlay(trigger) {
    return this._requestMgr._requestAirPlay(trigger);
  }
  requestGoogleCast(trigger) {
    return this._requestMgr._requestGoogleCast(trigger);
  }
  setAudioGain(gain, trigger) {
    return this._requestMgr._setAudioGain(gain, trigger);
  }
  destroy() {
    super.destroy();
    this._media.remote.setPlayer(null);
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
    this._domSources = _domSources;
    this._media = _media;
    this._loader = _loader;
    this._initialize = false;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this._loaders = computed(() => {
      const remoteLoader = _media.$state.remotePlaybackLoader();
      const loaders = _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this._loaders().find((loader2) => loader2.canPlay(src));
      if (!loader)
        continue;
      const mediaType = loader.mediaType(src);
      this._media.$state.source.set(src);
      this._media.$state.mediaType.set(mediaType);
      this._media.$state.inferredViewType.set(mediaType);
      this._loader.set(loader);
      this._initialize = true;
      break;
    }
  }
  get _notify() {
    return this._media.delegate._notify;
  }
  connect() {
    const loader = this._loader();
    if (this._initialize) {
      this._notifySourceChange(this._media.$state.source(), loader);
      this._notifyLoaderChange(loader);
      this._initialize = false;
    }
    effect(this._onSourcesChange.bind(this));
    effect(this._onSourceChange.bind(this));
    effect(this._onSetup.bind(this));
    effect(this._onLoadSource.bind(this));
    effect(this._onLoadPoster.bind(this));
  }
  _onSourcesChange() {
    this._notify("sources-change", [
      ...normalizeSrc(this._media.$props.src()),
      ...this._domSources()
    ]);
  }
  _onSourceChange() {
    const { $state } = this._media;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this._findNewSource(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
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
        this._findNewSource(peek($state.source), sources2);
        tick();
      });
      return () => abort.abort();
    }
    tick();
  }
  _findNewSource(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this._loaders(), { started, paused, currentTime, quality, savedState } = this._media.$state;
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
      this._notifySourceChange(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this._loader)) {
      this._notifyLoaderChange(newLoader, triggerEvent);
    }
    return newSource;
  }
  _notifySourceChange(src, loader, trigger) {
    this._notify("source-change", src, trigger);
    this._notify("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  _notifyLoaderChange(loader, trigger) {
    this._media.$providerSetup.set(false);
    this._notify("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this._media));
    this._loader.set(loader);
    this._notify("provider-loader-change", loader, trigger);
  }
  _onSetup() {
    const provider = this._media.$provider();
    if (!provider || peek(this._media.$providerSetup))
      return;
    if (this._media.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this._media.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  _onLoadSource() {
    if (!this._media.$providerSetup())
      return;
    const provider = this._media.$provider(), source = this._media.$state.source(), crossOrigin = peek(this._media.$state.crossOrigin), preferNativeHLS = peek(this._media.$props.preferNativeHLS);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this._media.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (preferNativeHLS || !isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossOrigin),
            signal: abort.signal
          }).then((streamType) => {
            this._notify("stream-type-change", streamType);
          }).catch(noop);
        }
      } else if (isDASHSrc(source)) {
        resolveStreamTypeFromDASHManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal
        }).then((streamType) => {
          this._notify("stream-type-change", streamType);
        }).catch(noop);
      } else {
        this._notify("stream-type-change", "on-demand");
      }
      peek(() => {
        const preload = peek(this._media.$state.preload);
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
  _onLoadPoster() {
    const loader = this._loader(), { providedPoster, source, canLoadPoster } = this._media.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster())
      return;
    const abort = new AbortController(), trigger = new DOMEvent("source-change", { detail: source });
    loader.loadPoster(source(), this._media, abort).then((url) => {
      this._notify("poster-change", url || "", trigger);
    }).catch(() => {
      this._notify("poster-change", "", trigger);
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
    this._domTracks = _domTracks;
    this._media = _media;
    this._prevTracks = [];
    effect(this._onTracksChange.bind(this));
  }
  _onTracksChange() {
    const newTracks = this._domTracks();
    for (const oldTrack of this._prevTracks) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this._media.textTracks.getById(oldTrack.id);
        if (track)
          this._media.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this._media.textTracks.getById(id)) {
        newTrack.id = id;
        this._media.textTracks.add(newTrack);
      }
    }
    this._prevTracks = newTracks;
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
    this._domSources = signal([]);
    this._domTracks = signal([]);
    this._loader = null;
    this._loadRafId = -1;
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
    this._media = useMediaContext();
    this._sources = new SourceSelection(
      this._domSources,
      this._media,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this._sources.connect();
    new Tracks(this._domTracks, this._media);
    const resize = new ResizeObserver(animationFrameThrottle(this._onResize.bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(this._onMutation.bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    this._onResize();
    this._onMutation();
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    window.cancelAnimationFrame(this._loadRafId);
    this._loadRafId = requestAnimationFrame(() => this._runLoader(target));
    onDispose(() => {
      window.cancelAnimationFrame(this._loadRafId);
    });
  }
  _runLoader(target) {
    if (!this.scope)
      return;
    const loader = this.$state.loader(), { $provider } = this._media;
    if (this._loader === loader && loader?.target === target && peek($provider))
      return;
    this._destroyProvider();
    this._loader = loader;
    if (loader)
      loader.target = target || null;
    if (!loader || !target)
      return;
    loader.load(this._media).then((provider) => {
      if (!this.scope)
        return;
      if (peek(this.$state.loader) !== loader)
        return;
      this._media.delegate._notify("provider-change", provider);
    });
  }
  onDestroy() {
    this._loader = null;
    this._destroyProvider();
  }
  _destroyProvider() {
    this._media?.delegate._notify("provider-change", null);
  }
  _onResize() {
    if (!this.el)
      return;
    const { player, $state } = this._media, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player)
      return;
    $state.mediaWidth.set(width);
    $state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  _onMutation() {
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
    this._domSources.set(sources);
    this._domTracks.set(tracks);
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
    this._initializing = false;
    this._startedSeekingAt = -1;
    this._seekTimer = -1;
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
    this._media = useMediaContext();
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
    this._initializing = true;
    effect(this._watchPaused.bind(this));
    effect(this._watchVolume.bind(this));
    effect(this._watchCaptions.bind(this));
    effect(this._watchFullscreen.bind(this));
    effect(this._watchPiP.bind(this));
    effect(this._watchSeeking.bind(this));
    effect(this._watchLabel.bind(this));
    tick();
    this._initializing = false;
  }
  _watchPaused() {
    const { paused } = this._media.$state;
    this._setLabel(!paused() ? "Play" : "Pause");
  }
  _watchFullscreen() {
    const { fullscreen } = this._media.$state;
    this._setLabel(fullscreen() ? "Enter Fullscreen" : "Exit Fullscreen");
  }
  _watchPiP() {
    const { pictureInPicture } = this._media.$state;
    this._setLabel(pictureInPicture() ? "Enter PiP" : "Exit PiP");
  }
  _watchCaptions() {
    const { textTrack } = this._media.$state;
    this._setLabel(textTrack() ? "Closed-Captions On" : "Closed-Captions Off");
  }
  _watchVolume() {
    const { muted, volume, audioGain } = this._media.$state;
    this._setLabel(
      muted() || volume() === 0 ? "Mute" : `${Math.round(volume() * (audioGain() ?? 1) * 100)}% ${this._translate("Volume")}`
    );
  }
  _watchSeeking() {
    const { seeking, currentTime } = this._media.$state, isSeeking = seeking();
    if (this._startedSeekingAt > 0) {
      window.clearTimeout(this._seekTimer);
      this._seekTimer = window.setTimeout(() => {
        if (!this.scope)
          return;
        const newTime = peek(currentTime), seconds = Math.abs(newTime - this._startedSeekingAt);
        if (seconds >= 1) {
          const isForward = newTime >= this._startedSeekingAt, spokenTime = formatSpokenTime(seconds);
          this._setLabel(
            `${this._translate(isForward ? "Seek Forward" : "Seek Backward")} ${spokenTime}`
          );
        }
        this._startedSeekingAt = -1;
        this._seekTimer = -1;
      }, 300);
    } else if (isSeeking) {
      this._startedSeekingAt = peek(currentTime);
    }
  }
  _translate(word) {
    const { translations } = this.$props;
    return translations?.()?.[word || ""] ?? word;
  }
  _watchLabel() {
    const { label, busy } = this.$state, $label = this._translate(label());
    if (this._initializing)
      return;
    busy.set(true);
    const id = window.setTimeout(() => void busy.set(false), 150);
    this.el && setAttribute(this.el, "aria-label", $label);
    if (isString($label)) {
      this.dispatch("change", { detail: $label });
    }
    return () => window.clearTimeout(id);
  }
  _setLabel(word) {
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
    this._media = useMediaContext();
    effect(this._watchProps.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this._media.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this._isShowing.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this._isShowing() });
    });
    effect(this._hideControls.bind(this));
    effect(() => {
      const isFullscreen = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen && `env(safe-area-inset-${side})`);
      }
    });
  }
  _hideControls() {
    if (!this.el)
      return;
    const { nativeControls } = this._media.$state, isHidden = nativeControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  _watchProps() {
    const { controls } = this._media.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this._media.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  _isShowing() {
    const { controlsVisible } = this._media.$state;
    return controlsVisible();
  }
}

class ControlsGroup extends Component {
  onAttach(el) {
    if (!el.style.pointerEvents)
      setStyle(el, "pointer-events", "auto");
  }
}

class Popper extends ViewController {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
    this._showTimerId = -1;
    this._hideRafId = -1;
    this._stopAnimationEndListener = null;
    effect(this._watchTrigger.bind(this));
  }
  onDestroy() {
    this._stopAnimationEndListener?.();
    this._stopAnimationEndListener = null;
  }
  _watchTrigger() {
    const trigger = this._delegate._trigger();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide = this.hide.bind(this);
    this._delegate._listen(trigger, show, hide);
  }
  show(trigger) {
    this._cancelShowing();
    window.cancelAnimationFrame(this._hideRafId);
    this._hideRafId = -1;
    this._stopAnimationEndListener?.();
    this._stopAnimationEndListener = null;
    this._showTimerId = window.setTimeout(() => {
      this._showTimerId = -1;
      const content = this._delegate._content();
      if (content)
        content.style.removeProperty("display");
      peek(() => this._delegate._onChange(true, trigger));
    }, this._delegate._showDelay?.() ?? 0);
  }
  hide(trigger) {
    this._cancelShowing();
    peek(() => this._delegate._onChange(false, trigger));
    this._hideRafId = requestAnimationFrame(() => {
      this._cancelShowing();
      this._hideRafId = -1;
      const content = this._delegate._content();
      if (content) {
        const onHide = () => {
          content.style.display = "none";
          this._stopAnimationEndListener = null;
        };
        const isAnimated = hasAnimation(content);
        if (isAnimated) {
          this._stopAnimationEndListener?.();
          const stop = listenEvent();
          this._stopAnimationEndListener = stop;
        } else {
          onHide();
        }
      }
    });
  }
  _cancelShowing() {
    window.clearTimeout(this._showTimerId);
    this._showTimerId = -1;
  }
}

const tooltipContext = createContext();

let id = 0;
class Tooltip extends Component {
  constructor() {
    super();
    this._id = `media-tooltip-${++id}`;
    this._trigger = signal(null);
    this._content = signal(null);
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      _trigger: this._trigger,
      _content: this._content,
      _showDelay: showDelay,
      _listen(trigger, show, hide) {
        effect(() => {
          if ($keyboard())
            ;
        });
      },
      _onChange: this._onShowingChange.bind(this)
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
      _trigger: this._trigger,
      _content: this._content,
      _attachTrigger: this._attachTrigger.bind(this),
      _detachTrigger: this._detachTrigger.bind(this),
      _attachContent: this._attachContent.bind(this),
      _detachContent: this._detachContent.bind(this)
    });
  }
  _attachTrigger(el) {
    this._trigger.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this._id);
  }
  _detachTrigger(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this._trigger.set(null);
  }
  _attachContent(el) {
    el.setAttribute("id", this._id);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this._content.set(el);
  }
  _detachContent(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this._content.set(null);
  }
  _onShowingChange(isShowing) {
    const trigger = this._trigger(), content = this._content();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this._id : null);
    }
    for (const el of [this.el, trigger, content]) {
      el && setAttribute(el, "data-visible", isShowing);
    }
  }
}

class TooltipTrigger extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        this._attach();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this._getButton();
          button && tooltip._detachTrigger(button);
        });
      })
    );
  }
  _attach() {
    const button = this._getButton(), tooltip = useContext(tooltipContext);
    button && tooltip._attachTrigger(button);
  }
  _getButton() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
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
    this._attach(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this._attach(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip._detachContent(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this._watchPlacement.bind(this));
      })
    );
  }
  _attach(el) {
    const tooltip = useContext(tooltipContext);
    tooltip._attachContent(el);
  }
  _watchPlacement() {
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this._getTrigger(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  _getTrigger() {
    return useContext(tooltipContext)._trigger();
  }
}

class ToggleButtonController extends ViewController {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
    new FocusVisibleController();
    if (_delegate._keyShortcut) {
      new ARIAKeyShortcuts(_delegate._keyShortcut);
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
      "data-pressed": this._delegate._isPressed,
      "aria-pressed": this._isARIAPressed.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this._onMaybePress.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this._onInteraction.bind(this));
    }
  }
  _isARIAPressed() {
    return ariaBool$1(this._delegate._isPressed());
  }
  _onPressed(event) {
    if (isWriteSignal(this._delegate._isPressed)) {
      this._delegate._isPressed.set((p) => !p);
    }
  }
  _onMaybePress(event) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    (this._delegate._onPress ?? this._onPressed).call(this, event);
  }
  _onInteraction(event) {
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
    this._pressed = signal(false);
    new ToggleButtonController({
      _isPressed: this._pressed
    });
  }
  static {
    this.props = {
      disabled: false,
      defaultPressed: false
    };
  }
  get pressed() {
    return this._pressed();
  }
}
__decorateClass$d([
  prop
], ToggleButton.prototype, "pressed");

function ariaBool(value) {
  return value ? "true" : "false";
}
function $ariaBool(signal) {
  return () => ariaBool(signal());
}

class AirPlayButton extends Component {
  static {
    this.props = ToggleButtonController.props;
  }
  constructor() {
    super();
    new ToggleButtonController({
      _isPressed: this._isPressed.bind(this),
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { canAirPlay, isAirPlayConnected } = this._media.$state;
    this.setAttributes({
      "data-active": isAirPlayConnected,
      "data-supported": canAirPlay,
      "data-state": this._getState.bind(this),
      "aria-hidden": $ariaBool(() => !canAirPlay())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "airplay");
    setARIALabel(el, this._getDefaultLabel.bind(this));
  }
  _onPress(event) {
    const remote = this._media.remote;
    remote.requestAirPlay(event);
  }
  _isPressed() {
    const { remotePlaybackType, remotePlaybackState } = this._media.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState() !== "disconnected";
  }
  _getState() {
    const { remotePlaybackType, remotePlaybackState } = this._media.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState();
  }
  _getDefaultLabel() {
    const { remotePlaybackState } = this._media.$state;
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
      _isPressed: this._isPressed.bind(this),
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { canGoogleCast, isGoogleCastConnected } = this._media.$state;
    this.setAttributes({
      "data-active": isGoogleCastConnected,
      "data-supported": canGoogleCast,
      "data-state": this._getState.bind(this),
      "aria-hidden": $ariaBool(() => !canGoogleCast())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "google-cast");
    setARIALabel(el, this._getDefaultLabel.bind(this));
  }
  _onPress(event) {
    const remote = this._media.remote;
    remote.requestGoogleCast(event);
  }
  _isPressed() {
    const { remotePlaybackType, remotePlaybackState } = this._media.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState() !== "disconnected";
  }
  _getState() {
    const { remotePlaybackType, remotePlaybackState } = this._media.$state;
    return remotePlaybackType() === "google-cast" && remotePlaybackState();
  }
  _getDefaultLabel() {
    const { remotePlaybackState } = this._media.$state;
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
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "togglePaused",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { paused, ended } = this._media.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, "Play");
  }
  _onPress(event) {
    const remote = this._media.remote;
    this._isPressed() ? remote.pause(event) : remote.play(event);
  }
  _isPressed() {
    const { paused } = this._media.$state;
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
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "toggleCaptions",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    this.setAttributes({
      "data-active": this._isPressed.bind(this),
      "data-supported": () => !this._isHidden(),
      "aria-hidden": $ariaBool(this._isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, "Captions");
  }
  _onPress(event) {
    this._media.remote.toggleCaptions(event);
  }
  _isPressed() {
    const { textTrack } = this._media.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  _isHidden() {
    const { hasCaptions } = this._media.$state;
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
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "toggleFullscreen",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { fullscreen } = this._media.$state, isSupported = this._isSupported.bind(this);
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
  _onPress(event) {
    const remote = this._media.remote, target = this.$props.target();
    this._isPressed() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  _isPressed() {
    const { fullscreen } = this._media.$state;
    return fullscreen();
  }
  _isSupported() {
    const { canFullscreen } = this._media.$state;
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
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "toggleMuted",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    this.setAttributes({
      "data-muted": this._isPressed.bind(this),
      "data-state": this._getState.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, "Mute");
  }
  _onPress(event) {
    const remote = this._media.remote;
    this._isPressed() ? remote.unmute(event) : remote.mute(event);
  }
  _isPressed() {
    const { muted, volume } = this._media.$state;
    return muted() || volume() === 0;
  }
  _getState() {
    const { muted, volume } = this._media.$state, $volume = volume();
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
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "togglePictureInPicture",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { pictureInPicture } = this._media.$state, isSupported = this._isSupported.bind(this);
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
  _onPress(event) {
    const remote = this._media.remote;
    this._isPressed() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  _isPressed() {
    const { pictureInPicture } = this._media.$state;
    return pictureInPicture();
  }
  _isSupported() {
    const { canPictureInPicture } = this._media.$state;
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
    this._media = useMediaContext();
    const { seeking } = this._media.$state, { seconds } = this.$props, isSupported = this._isSupported.bind(this);
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
    setARIALabel(el, this._getDefaultLabel.bind(this));
  }
  onConnect(el) {
    onPress(el, this._onPress.bind(this));
  }
  _isSupported() {
    const { canSeek } = this._media.$state;
    return canSeek();
  }
  _getDefaultLabel() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  _onPress(event) {
    const { seconds, disabled } = this.$props;
    if (disabled())
      return;
    const { currentTime } = this._media.$state, seekTo = currentTime() + seconds();
    this._media.remote.seek(seekTo, event);
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
    this._media = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this._media.$state, isHidden = () => !live();
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
    onPress(el, this._onPress.bind(this));
  }
  _onPress(event) {
    const { disabled } = this.$props, { liveEdge } = this._media.$state;
    if (disabled() || liveEdge())
      return;
    this._media.remote.seekToLiveEdge(event);
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
    this._init = _init;
  }
  onConnect(el) {
    this._observer = new IntersectionObserver((entries) => {
      this._init.callback?.(entries, this._observer);
    }, this._init);
    this._observer.observe(el);
    onDispose(this._disconnect.bind(this));
  }
  /**
   * Disconnect any active intersection observers.
   */
  _disconnect() {
    this._observer?.disconnect();
    this._observer = void 0;
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
    this._delegate = _delegate;
    this._media = _media;
    this._provider = null;
    this._touch = null;
    this._touchStartValue = null;
    this._repeatedKeys = false;
    this._onDocumentPointerMove = functionThrottle(
      (event) => {
        this._updatePointerValue(this._getPointerValue(event), event);
      },
      20,
      { leading: true }
    );
  }
  onSetup() {
    if (hasProvidedContext(sliderObserverContext)) {
      this._observer = useContext(sliderObserverContext);
    }
  }
  onConnect() {
    effect(this._attachEventListeners.bind(this));
    effect(this._attachPointerListeners.bind(this));
    if (this._delegate._swipeGesture)
      effect(this._watchSwipeGesture.bind(this));
  }
  _watchSwipeGesture() {
    const { pointer } = this._media.$state;
    if (pointer() !== "coarse" || !this._delegate._swipeGesture()) {
      this._provider = null;
      return;
    }
    this._provider = this._media.player.el?.querySelector(
      "media-provider,[data-media-provider]"
    );
    if (!this._provider)
      return;
    listenEvent(this._provider, "touchstart", this._onTouchStart.bind(this));
    listenEvent(this._provider, "touchmove", this._onTouchMove.bind(this));
  }
  _onTouchStart(event) {
    this._touch = event.touches[0];
  }
  _onTouchMove(event) {
    if (isNull(this._touch) || isTouchPinchEvent(event))
      return;
    const touch = event.touches[0], xDiff = touch.clientX - this._touch.clientX, yDiff = touch.clientY - this._touch.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 5) {
      return;
    }
    if (isDragging)
      return;
    event.preventDefault();
    if (Math.abs(xDiff) > 20) {
      this._touch = touch;
      this._touchStartValue = this.$state.value();
      this._onStartDragging(this._touchStartValue, event);
    }
  }
  _attachEventListeners() {
    const { hidden } = this.$props;
    this.listen("focus", this._onFocus.bind(this));
    this.listen("keydown", this._onKeyDown.bind(this));
    this.listen("keyup", this._onKeyUp.bind(this));
    if (hidden() || this._delegate._isDisabled())
      return;
    this.listen("pointerenter", this._onPointerEnter.bind(this));
    this.listen("pointermove", this._onPointerMove.bind(this));
    this.listen("pointerleave", this._onPointerLeave.bind(this));
    this.listen("pointerdown", this._onPointerDown.bind(this));
  }
  _attachPointerListeners() {
    if (this._delegate._isDisabled() || !this.$state.dragging())
      return;
    listenEvent(document, "pointerup", this._onDocumentPointerUp.bind(this));
    listenEvent(document, "pointermove", this._onDocumentPointerMove.bind(this));
    listenEvent(document, "touchmove", this._onDocumentTouchMove.bind(this));
  }
  _onFocus() {
    this._updatePointerValue(this.$state.value());
  }
  _updateValue(newValue, trigger) {
    const { value, min, max, dragging } = this.$state;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event);
    this._delegate._onValueChange?.(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event2);
      this._delegate._onDragValueChange?.(event2);
    }
  }
  _updatePointerValue(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this._updateValue(value, trigger);
    }
  }
  _getPointerValue(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this._touch && isNumber(this._touchStartValue)) {
        const { width } = this._provider.getBoundingClientRect(), rate = (event.clientX - this._touch.clientX) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this._touchStartValue - diff : this._touchStartValue + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this._delegate._roundValue(
          getValueFromRate(min(), max(), thumbPositionRate, this._delegate._getStep())
        )
      )
    );
  }
  _onPointerEnter(event) {
    this.$state.pointing.set(true);
  }
  _onPointerMove(event) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    this._updatePointerValue(this._getPointerValue(event), event);
  }
  _onPointerLeave(event) {
    this.$state.pointing.set(false);
  }
  _onPointerDown(event) {
    if (event.button !== 0)
      return;
    const value = this._getPointerValue(event);
    this._onStartDragging(value, event);
    this._updatePointerValue(value, event);
  }
  _onStartDragging(value, trigger) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    dragging.set(true);
    this._media.remote.pauseControls(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event);
    this._delegate._onDragStart?.(event);
    this._observer?.onDragStart?.();
  }
  _onStopDragging(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging())
      return;
    dragging.set(false);
    this._media.remote.resumeControls(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event);
    this._delegate._onDragEnd?.(event);
    this._touch = null;
    this._touchStartValue = null;
    this._observer?.onDragEnd?.();
  }
  _onKeyDown(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey)
      return;
    const { key } = event, jumpValue = this._calcJumpValue(event);
    if (!isNull(jumpValue)) {
      this._updatePointerValue(jumpValue, event);
      this._updateValue(jumpValue, event);
      return;
    }
    const newValue = this._calcNewKeyValue(event);
    if (!this._repeatedKeys) {
      this._repeatedKeys = key === this._lastDownKey;
      if (!this.$state.dragging() && this._repeatedKeys) {
        this._onStartDragging(newValue, event);
      }
    }
    this._updatePointerValue(newValue, event);
    this._lastDownKey = key;
  }
  _onKeyUp(event) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event.key);
    if (!isValidKey || !isNull(this._calcJumpValue(event)))
      return;
    const newValue = this._repeatedKeys ? this.$state.pointerValue() : this._calcNewKeyValue(event);
    this._updateValue(newValue, event);
    this._onStopDragging(newValue, event);
    this._lastDownKey = "";
    this._repeatedKeys = false;
  }
  _calcJumpValue(event) {
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
  _calcNewKeyValue(event) {
    const { key, shiftKey } = event;
    event.preventDefault();
    event.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { min, max, value, pointerValue } = this.$state, step = this._delegate._getStep(), keyStep = this._delegate._getKeyStep();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key]), diff = modifiedStep * direction, currentValue = this._repeatedKeys ? pointerValue() : this._delegate._getValue?.() ?? value(), steps = (currentValue + diff) / step;
    return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  _onDocumentPointerUp(event) {
    if (event.button !== 0)
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const value = this._getPointerValue(event);
    this._updatePointerValue(value, event);
    this._onStopDragging(value, event);
  }
  _onDocumentTouchMove(event) {
    event.preventDefault();
  }
}

const sliderValueFormatContext = createContext(() => ({}));

class SliderController extends ViewController {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
    this._isVisible = signal(true);
    this._isIntersecting = signal(true);
    this._updateSliderVars = animationFrameThrottle();
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
    this._media = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      _orientation: this.$props.orientation,
      _disabled: this._delegate._isDisabled,
      _preview: signal(null)
    });
    effect(this._watchValue.bind(this));
    effect(this._watchStep.bind(this));
    effect(this._watchDisabled.bind(this));
    this._setupAttrs();
    new SliderEventsController(this._delegate, this._media).attach(this);
    new IntersectionObserverController({
      callback: this._onIntersectionChange.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    this._watchCSSVars();
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this._isVisible.set));
    effect(this._watchHidden.bind(this));
  }
  _onIntersectionChange(entries) {
    this._isIntersecting.set(entries[0].isIntersecting);
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  _watchHidden() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this._isVisible() || !this._isIntersecting.bind(this));
  }
  _watchValue() {
    const { dragging, value, min, max } = this.$state;
    if (peek(dragging))
      return;
    value.set(getClampedValue(min(), max(), value(), this._delegate._getStep()));
  }
  _watchStep() {
    this.$state.step.set(this._delegate._getStep());
  }
  _watchDisabled() {
    if (!this._delegate._isDisabled())
      return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  _getARIADisabled() {
    return ariaBool$1(this._delegate._isDisabled());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  _setupAttrs() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this._getARIADisabled.bind(this),
      "aria-valuemin": this._delegate._getARIAValueMin ?? this.$state.min,
      "aria-valuemax": this._delegate._getARIAValueMax ?? this.$state.max,
      "aria-valuenow": this._delegate._getARIAValueNow,
      "aria-valuetext": this._delegate._getARIAValueText,
      "aria-orientation": orientation
    });
  }
  _watchCSSVars() {
    const { fillPercent, pointerPercent } = this.$state;
    this._updateSliderVars(round(fillPercent(), 3), round(pointerPercent(), 3));
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
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _roundValue: Math.round,
      _isDisabled: this.$props.disabled,
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this)
    });
  }
  onSetup() {
    effect(this._watchValue.bind(this));
    effect(this._watchMinMax.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  _getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  _getARIAValueText() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  _watchValue() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  _watchMinMax() {
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
    this._media = _media;
    this.$images = signal([]);
    effect(this._onLoadCues.bind(this));
  }
  static create($src, $crossOrigin) {
    const media = useMediaContext();
    return new ThumbnailsLoader($src, $crossOrigin, media);
  }
  _onLoadCues() {
    const { canLoad } = this._media.$state;
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
                  resolve(this._processVTTCues(json));
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
                resolve(this._processStoryboard(json));
              }
              return;
            }
            import('media-captions').then(async ({ parseResponse }) => {
              try {
                const { cues } = await parseResponse(response);
                resolve(this._processVTTCues(cues));
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
          this._onError(src, error);
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
        this.$images.set(this._processImages(src));
      } catch (error) {
        this._onError(src, error);
      }
    } else {
      try {
        this.$images.set(this._processStoryboard(src));
      } catch (error) {
        this._onError(src, error);
      }
    }
    return () => {
      abort.abort();
      this.$images.set([]);
    };
  }
  _processImages(images) {
    const baseURL = this._resolveBaseUrl();
    return images.map((img, i) => {
      assert(
        img.url && isString(img.url));
      assert(
        "startTime" in img && isNumber(img.startTime));
      return {
        ...img,
        url: isString(img.url) ? this._resolveURL(img.url, baseURL) : img.url
      };
    });
  }
  _processStoryboard(board) {
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
  _processVTTCues(cues) {
    for (let i = 0; i < cues.length; i++) {
      const cue = cues[i];
      assert(
        "startTime" in cue && isNumber(cue.startTime));
      assert(
        "text" in cue && isString(cue.text));
    }
    const images = [], baseURL = this._resolveBaseUrl();
    for (const cue of cues) {
      const [url, hash] = cue.text.split("#"), data = this._resolveData(hash);
      images.push({
        url: this._resolveURL(url, baseURL),
        startTime: cue.startTime,
        endTime: cue.endTime,
        width: data?.w,
        height: data?.h,
        coords: data && isNumber(data.x) && isNumber(data.y) ? { x: data.x, y: data.y } : void 0
      });
    }
    return images;
  }
  _resolveBaseUrl() {
    let baseURL = peek(this.$src);
    if (!isString(baseURL) || !/^https?:/.test(baseURL)) {
      return location.href;
    }
    return baseURL;
  }
  _resolveURL(src, baseURL) {
    return /^https?:/.test(src) ? new URL(src) : new URL(src, baseURL);
  }
  _resolveData(hash) {
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
  _onError(src, error) {
    return;
  }
}

class Thumbnail extends Component {
  constructor() {
    super(...arguments);
    this._styleResets = [];
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
    this._media = useMediaContext();
    this._loader = ThumbnailsLoader.create(this.$props.src, this.$state.crossOrigin);
    this._watchCrossOrigin();
    this.setAttributes({
      "data-loading": this._isLoading.bind(this),
      "data-error": this._hasError.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this._watchImg.bind(this));
    effect(this._watchHidden.bind(this));
    effect(this._watchCrossOrigin.bind(this));
    effect(this._onLoadStart.bind(this));
    effect(this._onFindActiveThumbnail.bind(this));
    effect(this._resize.bind(this));
  }
  _watchImg() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this._onLoaded.bind(this));
    listenEvent(img, "error", this._onError.bind(this));
  }
  _watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this._media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  _onLoadStart() {
    const { src, loading, error } = this.$state;
    if (src()) {
      loading.set(true);
      error.set(null);
    }
    return () => {
      this._resetStyles();
      loading.set(false);
      error.set(null);
    };
  }
  _onLoaded() {
    const { loading, error } = this.$state;
    this._resize();
    loading.set(false);
    error.set(null);
  }
  _onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
  _isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  _watchHidden() {
    const { hidden } = this.$state, { duration } = this._media.$state, images = this._loader.$images();
    hidden.set(this._hasError() || !Number.isFinite(duration()) || images.length === 0);
  }
  _getTime() {
    return this.$props.time();
  }
  _onFindActiveThumbnail() {
    let images = this._loader.$images();
    if (!images.length)
      return;
    let time = this._getTime(), { src, activeThumbnail } = this.$state, activeIndex = -1, activeImage = null;
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
  _resize() {
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
    this._style(rootEl, "--thumbnail-width", `${width * scale}px`);
    this._style(rootEl, "--thumbnail-height", `${height * scale}px`);
    this._style(imgEl, "width", `${imgEl.naturalWidth * scale}px`);
    this._style(imgEl, "height", `${imgEl.naturalHeight * scale}px`);
    this._style(
      imgEl,
      "transform",
      thumbnail.coords ? `translate(-${thumbnail.coords.x * scale}px, -${thumbnail.coords.y * scale}px)` : ""
    );
    this._style(imgEl, "max-width", "none");
  }
  _style(el, name, value) {
    el.style.setProperty(name, value);
    this._styleResets.push(() => el.style.removeProperty(name));
  }
  _resetStyles() {
    for (const reset of this._styleResets)
      reset();
    this._styleResets = [];
  }
}

class SliderThumbnail extends Thumbnail {
  onAttach(el) {
    this._slider = useState(Slider.state);
  }
  _getTime() {
    const { duration, clipStartTime } = this._media.$state;
    return clipStartTime() + this._slider.pointerRate() * duration();
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
    this._media = useMediaContext();
    this._slider = useState(Slider.state);
    this._watchCrossOrigin();
    this.setAttributes({
      "data-loading": this._isLoading.bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": this._hasError.bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(this._watchVideo.bind(this));
    effect(this._watchSrc.bind(this));
    effect(this._watchCrossOrigin.bind(this));
    effect(this._watchHidden.bind(this));
    effect(this._onSrcChange.bind(this));
    effect(this._onUpdateTime.bind(this));
  }
  _watchVideo() {
    const video = this.$state.video();
    if (!video)
      return;
    if (video.readyState >= 2)
      this._onCanPlay();
    listenEvent(video, "canplay", this._onCanPlay.bind(this));
    listenEvent(video, "error", this._onError.bind(this));
  }
  _watchSrc() {
    const { src } = this.$state, { canLoad } = this._media.$state;
    src.set(canLoad() ? this.$props.src() : null);
  }
  _watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this._media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  _isLoading() {
    const { canPlay, hidden } = this.$state;
    return !canPlay() && !hidden();
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error);
  }
  _watchHidden() {
    const { src, hidden } = this.$state, { canLoad, duration } = this._media.$state;
    hidden.set(canLoad() && (!src() || this._hasError() || !Number.isFinite(duration())));
  }
  _onSrcChange() {
    const { src, canPlay, error } = this.$state;
    src();
    canPlay.set(false);
    error.set(null);
  }
  _onCanPlay(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(true);
    error.set(null);
    this.dispatch("can-play", { trigger: event });
  }
  _onError(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(false);
    error.set(event);
    this.dispatch("error", { trigger: event });
  }
  _onUpdateTime() {
    const { video, canPlay } = this.$state, { duration } = this._media.$state, { pointerRate } = this._slider, media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
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
    this._slider = useState(Slider.state);
    this._format = useContext(sliderValueFormatContext);
    this._text = computed(this.getValueText.bind(this));
  }
  getValueText() {
    const { type, format, decimalPlaces, padHours, padMinutes, showHours, showMs } = this.$props, { value: sliderValue, pointerValue, min, max } = this._slider, _format = format?.() ?? this._format.default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (_format === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (this._format.percent ?? round)(percent, decimalPlaces()) + "%";
    } else if (_format === "time") {
      return (this._format.time ?? formatTime)(value, {
        padHrs: padHours(),
        padMins: padMinutes(),
        showHrs: showHours(),
        showMs: showMs()
      });
    } else {
      return (this._format.value?.(value) ?? value.toFixed(2)) + "";
    }
  }
}
__decorateClass$b([
  method
], SliderValue.prototype, "getValueText");

class SliderPreview extends Component {
  constructor() {
    super(...arguments);
    this._updatePlacement = animationFrameThrottle();
  }
  static {
    this.props = {
      offset: 0,
      noClamp: false
    };
  }
  onSetup() {
    this._slider = useContext(sliderContext);
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
    const { _preview } = this._slider;
    _preview.set(el);
    onDispose(() => _preview.set(null));
    effect(this._updatePlacement.bind(this));
    const resize = new ResizeObserver(this._updatePlacement.bind(this));
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
    this._throttleVolumeChange = functionThrottle(this._onVolumeChange.bind(this), 25);
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
    this._media = useMediaContext();
    const { audioGain } = this._media.$state;
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
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _roundValue: Math.round,
      _isDisabled: this._isDisabled.bind(this),
      _getARIAValueMax: this._getARIAValueMax.bind(this),
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onValueChange: this._onValueChange.bind(this)
    }).attach(this);
    effect(this._watchVolume.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this._media.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  _getARIAValueNow() {
    const { value } = this.$state, { audioGain } = this._media.$state;
    return Math.round(value() * (audioGain() ?? 1));
  }
  _getARIAValueText() {
    const { value, max } = this.$state, { audioGain } = this._media.$state;
    return round(value() / max() * (audioGain() ?? 1) * 100, 2) + "%";
  }
  _getARIAValueMax() {
    const { audioGain } = this._media.$state;
    return this.$state.max() * (audioGain() ?? 1);
  }
  _isDisabled() {
    const { disabled } = this.$props, { canSetVolume } = this._media.$state;
    return disabled() || !canSetVolume();
  }
  _watchVolume() {
    const { muted, volume } = this._media.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  _onVolumeChange(event) {
    if (!event.trigger)
      return;
    const mediaVolume = round(event.detail / 100, 3);
    this._media.remote.changeVolume(mediaVolume, event);
  }
  _onValueChange(event) {
    this._throttleVolumeChange(event);
  }
  _onDragValueChange(event) {
    this._throttleVolumeChange(event);
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
    this._media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent",
      percent: (_, decimalPlaces) => {
        return round(this.$state.value(), decimalPlaces) + "%";
      }
    });
    new SliderController({
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _roundValue: Math.round,
      _isDisabled: this._isDisabled.bind(this),
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onValueChange: this._onValueChange.bind(this)
    }).attach(this);
    effect(this._watchMinMax.bind(this));
    effect(this._watchAudioGain.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-audio-gain-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Audio Boost");
    const { canSetAudioGain } = this._media.$state;
    this.setAttributes({
      "data-supported": canSetAudioGain,
      "aria-hidden": $ariaBool(() => !canSetAudioGain())
    });
  }
  _getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  _getARIAValueText() {
    const { value } = this.$state;
    return value() + "%";
  }
  _watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  _watchAudioGain() {
    const { audioGain } = this._media.$state, value = ((audioGain() ?? 1) - 1) * 100;
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  _isDisabled() {
    const { disabled } = this.$props, { canSetAudioGain } = this._media.$state;
    return disabled() || !canSetAudioGain();
  }
  _onAudioGainChange(event) {
    if (!event.trigger)
      return;
    const gain = round(1 + event.detail / 100, 2);
    this._media.remote.changeAudioGain(gain, event);
  }
  _onValueChange(event) {
    this._onAudioGainChange(event);
  }
  _onDragValueChange(event) {
    this._onAudioGainChange(event);
  }
}

class SpeedSlider extends Component {
  constructor() {
    super(...arguments);
    this._throttledSpeedChange = functionThrottle(this._onPlaybackRateChange.bind(this), 25);
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
    this._media = useMediaContext();
    new SliderController({
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _roundValue: this._roundValue,
      _isDisabled: this._isDisabled.bind(this),
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onValueChange: this._onValueChange.bind(this)
    }).attach(this);
    effect(this._watchMinMax.bind(this));
    effect(this._watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-speed-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Speed");
    const { canSetPlaybackRate } = this._media.$state;
    this.setAttributes({
      "data-supported": canSetPlaybackRate,
      "aria-hidden": $ariaBool(() => !canSetPlaybackRate())
    });
  }
  _getARIAValueNow() {
    const { value } = this.$state;
    return value();
  }
  _getARIAValueText() {
    const { value } = this.$state;
    return value() + "x";
  }
  _watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
  _watchPlaybackRate() {
    const { playbackRate } = this._media.$state;
    const newValue = playbackRate();
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  _roundValue(value) {
    return round(value, 2);
  }
  _isDisabled() {
    const { disabled } = this.$props, { canSetPlaybackRate } = this._media.$state;
    return disabled() || !canSetPlaybackRate();
  }
  _onPlaybackRateChange(event) {
    if (!event.trigger)
      return;
    const rate = event.detail;
    this._media.remote.changePlaybackRate(rate, event);
  }
  _onValueChange(event) {
    this._throttledSpeedChange(event);
  }
  _onDragValueChange(event) {
    this._throttledSpeedChange(event);
  }
}

class QualitySlider extends Component {
  constructor() {
    super(...arguments);
    this._sortedQualities = computed(() => {
      const { qualities } = this._media.$state;
      return sortVideoQualities(qualities());
    });
    this._throttledQualityChange = functionThrottle(this._onQualityChange.bind(this), 25);
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
    this._media = useMediaContext();
    new SliderController({
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _roundValue: Math.round,
      _isDisabled: this._isDisabled.bind(this),
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onValueChange: this._onValueChange.bind(this)
    }).attach(this);
    effect(this._watchMax.bind(this));
    effect(this._watchQuality.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-quality-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Video Quality");
    const { qualities, canSetQuality } = this._media.$state, $supported = computed(() => canSetQuality() && qualities().length > 0);
    this.setAttributes({
      "data-supported": $supported,
      "aria-hidden": $ariaBool(() => !$supported())
    });
  }
  _getARIAValueNow() {
    const { value } = this.$state;
    return value();
  }
  _getARIAValueText() {
    const { quality } = this._media.$state;
    if (!quality())
      return "";
    const { height, bitrate } = quality(), bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null;
    return height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : "Auto";
  }
  _watchMax() {
    const $qualities = this._sortedQualities();
    this.$state.max.set(Math.max(0, $qualities.length - 1));
  }
  _watchQuality() {
    let { quality } = this._media.$state, $qualities = this._sortedQualities(), value = Math.max(0, $qualities.indexOf(quality()));
    this.$state.value.set(value);
    this.dispatch("value-change", { detail: value });
  }
  _isDisabled() {
    const { disabled } = this.$props, { canSetQuality, qualities } = this._media.$state;
    return disabled() || qualities().length <= 1 || !canSetQuality();
  }
  _onQualityChange(event) {
    if (!event.trigger)
      return;
    const { qualities } = this._media, quality = peek(this._sortedQualities)[event.detail];
    this._media.remote.changeQuality(qualities.indexOf(quality), event);
  }
  _onValueChange(event) {
    this._throttledQualityChange(event);
  }
  _onDragValueChange(event) {
    this._throttledQualityChange(event);
  }
}

class TimeSlider extends Component {
  constructor() {
    super();
    this._chapter = signal(null);
    this._playingBeforeDragStart = false;
    const { noSwipeGesture } = this.$props;
    new SliderController({
      _swipeGesture: () => !noSwipeGesture(),
      _getValue: this._getValue.bind(this),
      _getStep: this._getStep.bind(this),
      _getKeyStep: this._getKeyStep.bind(this),
      _roundValue: this._roundValue,
      _isDisabled: this._isDisabled.bind(this),
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragStart: this._onDragStart.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onDragEnd: this._onDragEnd.bind(this),
      _onValueChange: this._onValueChange.bind(this)
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
    this._media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this._formatValue.bind(this),
      time: this._formatTime.bind(this)
    });
    this.setAttributes({
      "data-chapters": this._hasChapters.bind(this)
    });
    this.setStyles({
      "--slider-progress": this._calcBufferedPercent.bind(this)
    });
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchSeekingThrottle.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this._watchPreviewing.bind(this));
    watchActiveTextTrack(this._media.textTracks, "chapters", this._chapter.set);
  }
  _calcBufferedPercent() {
    const { bufferedEnd, duration } = this._media.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  _hasChapters() {
    const { duration } = this._media.$state;
    return this._chapter()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  _watchSeekingThrottle() {
    this._dispatchSeeking = functionThrottle(
      this._seeking.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  _watchCurrentTime() {
    if (this.$state.hidden())
      return;
    const { value, dragging } = this.$state, newValue = this._getValue();
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  _watchPreviewing() {
    const player = this._media.player.el, { _preview } = useContext(sliderContext);
    player && _preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  _seeking(time, event) {
    this._media.remote.seeking(time, event);
  }
  _seek(time, percent, event) {
    this._dispatchSeeking.cancel();
    const { live } = this._media.$state;
    if (live() && percent >= 99) {
      this._media.remote.seekToLiveEdge(event);
      return;
    }
    this._media.remote.seek(time, event);
  }
  _onDragStart(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this._media.$state;
      this._playingBeforeDragStart = !paused();
      this._media.remote.pause(event);
    }
  }
  _onDragValueChange(event) {
    this._dispatchSeeking(this._percentToTime(event.detail), event);
  }
  _onDragEnd(event) {
    const { seeking } = this._media.$state;
    if (!peek(seeking))
      this._seeking(this._percentToTime(event.detail), event);
    const percent = event.detail;
    this._seek(this._percentToTime(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this._playingBeforeDragStart) {
      this._media.remote.play(event);
      this._playingBeforeDragStart = false;
    }
  }
  _onValueChange(event) {
    const { dragging } = this.$state;
    if (dragging() || !event.trigger)
      return;
    this._onDragEnd(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  _getValue() {
    const { currentTime } = this._media.$state;
    return this._timeToPercent(currentTime());
  }
  _getStep() {
    const value = this.$props.step() / this._media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  _getKeyStep() {
    const value = this.$props.keyStep() / this._media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  _roundValue(value) {
    return round(value, 3);
  }
  _isDisabled() {
    const { disabled } = this.$props, { canSeek } = this._media.$state;
    return disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  _getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  _getARIAValueText() {
    const time = this._percentToTime(this.$state.value()), { duration } = this._media.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  _percentToTime(percent) {
    const { duration } = this._media.$state;
    return round(percent / 100 * duration(), 5);
  }
  _timeToPercent(time) {
    const { liveEdge, duration } = this._media.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  _formatValue(percent) {
    const time = this._percentToTime(percent), { live, duration } = this._media.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  _formatTime(percent, options) {
    const time = this._percentToTime(percent), { live, duration } = this._media.$state, value = live() ? time - duration() : time;
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
    this._titleRef = null;
    this._refs = [];
    this._$track = signal(null);
    this._$cues = signal([]);
    this._activeIndex = signal(-1);
    this._activePointerIndex = signal(-1);
    this._bufferedIndex = 0;
    this._updateBufferedPercent = animationFrameThrottle();
    this._bufferedPercent = computed(this._calcMediaBufferedPercent.bind(this));
    this._onCuesChange = functionDebounce(
      () => {
        const track = peek(this._$track);
        if (!this.scope || !track || !track.cues.length)
          return;
        this._$cues.set(this._fillGaps(track.cues));
        this._activeIndex.set(0);
        this._bufferedIndex = 0;
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
    return this._$cues();
  }
  get activeCue() {
    return this._$cues()[this._activeIndex()] || null;
  }
  get activePointerCue() {
    return this._$cues()[this._activePointerIndex()] || null;
  }
  onSetup() {
    this._media = useMediaContext();
    this._sliderState = useState(TimeSlider.state);
  }
  onAttach(el) {
    watchActiveTextTrack(this._media.textTracks, "chapters", this._setTrack.bind(this));
    effect(this._watchSource.bind(this));
  }
  onConnect() {
    onDispose(() => this._reset.bind(this));
  }
  onDestroy() {
    this._setTrack(null);
  }
  setRefs(refs) {
    this._refs = refs;
    this._updateScope?.dispose();
    if (this._refs.length === 1) {
      const el = this._refs[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (this._refs.length > 0) {
      scoped(() => this._watch(), this._updateScope = createScope());
    }
  }
  _setTrack(track) {
    if (peek(this._$track) === track)
      return;
    this._reset();
    this._$track.set(track);
  }
  _reset() {
    this._refs = [];
    this._$cues.set([]);
    this._activeIndex.set(-1);
    this._activePointerIndex.set(-1);
    this._bufferedIndex = 0;
    this._updateScope?.dispose();
  }
  _watch() {
    if (!this._refs.length)
      return;
    effect(this._watchUpdates.bind(this));
  }
  _watchUpdates() {
    const { hidden } = this._sliderState;
    if (hidden())
      return;
    effect(this._watchContainerWidths.bind(this));
    effect(this._watchFillPercent.bind(this));
    effect(this._watchPointerPercent.bind(this));
    effect(this._watchBufferedPercent.bind(this));
  }
  _watchContainerWidths() {
    const cues = this._$cues();
    if (!cues.length)
      return;
    let cue, { clipStartTime, clipEndTime } = this._media.$state, startTime = clipStartTime(), endTime = clipEndTime() || cues[cues.length - 1].endTime, duration = endTime - startTime, remainingWidth = 100;
    for (let i = 0; i < cues.length; i++) {
      cue = cues[i];
      if (this._refs[i]) {
        const width = i === cues.length - 1 ? remainingWidth : round((cue.endTime - Math.max(startTime, cue.startTime)) / duration * 100, 3);
        this._refs[i].style.width = width + "%";
        remainingWidth -= width;
      }
    }
  }
  _watchFillPercent() {
    let { liveEdge, clipStartTime, duration } = this._media.$state, { fillPercent, value } = this._sliderState, cues = this._$cues(), isLiveEdge = liveEdge(), prevActiveIndex = peek(this._activeIndex), currentChapter = cues[prevActiveIndex];
    let currentActiveIndex = isLiveEdge ? this._$cues.length - 1 : this._findActiveChapterIndex(
      currentChapter ? currentChapter.startTime / duration() * 100 <= peek(value) ? prevActiveIndex : 0 : 0,
      fillPercent()
    );
    if (isLiveEdge || !currentChapter) {
      this._updateFillPercents(0, cues.length, 100);
    } else if (currentActiveIndex > prevActiveIndex) {
      this._updateFillPercents(prevActiveIndex, currentActiveIndex, 100);
    } else if (currentActiveIndex < prevActiveIndex) {
      this._updateFillPercents(currentActiveIndex + 1, prevActiveIndex + 1, 0);
    }
    const percent = isLiveEdge ? 100 : this._calcPercent(
      cues[currentActiveIndex],
      fillPercent(),
      clipStartTime(),
      this._getEndTime(cues)
    );
    this._updateFillPercent(this._refs[currentActiveIndex], percent);
    this._activeIndex.set(currentActiveIndex);
  }
  _watchPointerPercent() {
    let { pointing, pointerPercent } = this._sliderState;
    if (!pointing()) {
      this._activePointerIndex.set(-1);
      return;
    }
    const activeIndex = this._findActiveChapterIndex(0, pointerPercent());
    this._activePointerIndex.set(activeIndex);
  }
  _updateFillPercents(start, end, percent) {
    for (let i = start; i < end; i++)
      this._updateFillPercent(this._refs[i], percent);
  }
  _updateFillPercent(ref, percent) {
    if (!ref)
      return;
    ref.style.setProperty("--chapter-fill", percent + "%");
    setAttribute(ref, "data-active", percent > 0 && percent < 100);
    setAttribute(ref, "data-ended", percent === 100);
  }
  _findActiveChapterIndex(startIndex, percent) {
    let chapterPercent = 0, cues = this._$cues();
    if (percent === 0)
      return 0;
    else if (percent === 100)
      return cues.length - 1;
    let { clipStartTime } = this._media.$state, startTime = clipStartTime(), endTime = this._getEndTime(cues);
    for (let i = startIndex; i < cues.length; i++) {
      chapterPercent = this._calcPercent(cues[i], percent, startTime, endTime);
      if (chapterPercent >= 0 && chapterPercent < 100)
        return i;
    }
    return 0;
  }
  _watchBufferedPercent() {
    this._updateBufferedPercent(this._bufferedPercent());
  }
  _calcMediaBufferedPercent() {
    const { bufferedEnd, duration } = this._media.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  _getEndTime(cues) {
    const { clipEndTime } = this._media.$state, endTime = clipEndTime();
    return endTime > 0 ? endTime : cues[cues.length - 1]?.endTime || 0;
  }
  _calcPercent(cue, percent, startTime, endTime) {
    const cues = this._$cues();
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
  _fillGaps(cues) {
    let chapters = [], { clipStartTime, clipEndTime, duration } = this._media.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
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
  _watchSource() {
    const { source } = this._media.$state;
    source();
    this._onTrackChange();
  }
  _onTrackChange() {
    if (!this.scope)
      return;
    const { disabled } = this.$props;
    if (disabled()) {
      this._$cues.set([]);
      this._activeIndex.set(0);
      this._bufferedIndex = 0;
      return;
    }
    const track = this._$track();
    if (track) {
      const onCuesChange = this._onCuesChange.bind(this);
      onCuesChange();
      onDispose(listenEvent());
      onDispose(listenEvent());
      effect(this._watchMediaDuration.bind(this));
    }
    this._titleRef = this._findChapterTitleRef();
    if (this._titleRef)
      effect(this._onChapterTitleChange.bind(this));
    return () => {
      if (this._titleRef) {
        this._titleRef.textContent = "";
        this._titleRef = null;
      }
    };
  }
  _watchMediaDuration() {
    this._media.$state.duration();
    this._onCuesChange();
  }
  _onChapterTitleChange() {
    const cue = this.activePointerCue || this.activeCue;
    if (this._titleRef)
      this._titleRef.textContent = cue?.text || "";
  }
  _findParentSlider() {
    let node = this.el;
    while (node && node.getAttribute("role") !== "slider") {
      node = node.parentElement;
    }
    return node;
  }
  _findChapterTitleRef() {
    const slider = this._findParentSlider();
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
    this._delegate = _delegate;
    this._index = -1;
    this._el = null;
    this._elements = [];
  }
  get _items() {
    return this._elements;
  }
  _attachMenu(el) {
    listenEvent(el, "focus", this._onFocus.bind(this));
    this._el = el;
    onDispose(() => {
      this._el = null;
    });
  }
  _listen() {
    if (!this._el)
      return;
    this._update();
    listenEvent(this._el, "keyup", this._onKeyUp.bind(this));
    listenEvent(this._el, "keydown", this._onKeyDown.bind(this));
    onDispose(() => {
      this._index = -1;
      this._elements = [];
    });
  }
  _update() {
    this._index = 0;
    this._elements = this._getFocusableElements();
  }
  _scroll(index = this._findActiveIndex()) {
    const element = this._elements[index];
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
  _focusActive(scroll = true) {
    const index = this._findActiveIndex();
    this._focusAt(index >= 0 ? index : 0, scroll);
  }
  _focusAt(index, scroll = true) {
    this._index = index;
    if (this._elements[index]) {
      this._elements[index].focus({ preventScroll: true });
      if (scroll)
        this._scroll(index);
    } else {
      this._el?.focus({ preventScroll: true });
    }
  }
  _findActiveIndex() {
    return this._elements.findIndex(
      (el) => document.activeElement === el || el.getAttribute("role") === "menuitemradio" && el.getAttribute("aria-checked") === "true"
    );
  }
  _onFocus() {
    if (this._index >= 0)
      return;
    this._update();
    this._focusActive();
  }
  _validateKeyEvent(event) {
    const el = event.target;
    if (wasEnterKeyPressed(event) && el instanceof Element) {
      const role = el.getAttribute("role");
      return !/a|input|select|button/.test(el.localName) && !role;
    }
    return VALID_KEYS.has(event.key);
  }
  _onKeyUp(event) {
    if (!this._validateKeyEvent(event))
      return;
    event.stopPropagation();
    event.preventDefault();
  }
  _onKeyDown(event) {
    if (!this._validateKeyEvent(event))
      return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this._delegate._closeMenu(event);
        break;
      case "Tab":
        this._focusAt(this._nextIndex(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this._focusAt(this._nextIndex(-1));
        break;
      case "ArrowDown":
        this._focusAt(this._nextIndex(1));
        break;
      case "Home":
      case "PageUp":
        this._focusAt(0);
        break;
      case "End":
      case "PageDown":
        this._focusAt(this._elements.length - 1);
        break;
    }
  }
  _nextIndex(delta) {
    let index = this._index;
    do {
      index = (index + delta + this._elements.length) % this._elements.length;
    } while (this._elements[index]?.offsetParent === null);
    return index;
  }
  _getFocusableElements() {
    if (!this._el)
      return [];
    const focusableElements = this._el.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (isHTMLElement(el) && el.offsetParent !== null && // does not have display: none
      isElementParent(this._el, el, is)) {
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
    this._expanded = signal(false);
    this._disabled = signal(false);
    this._trigger = signal(null);
    this._content = signal(null);
    this._submenus = /* @__PURE__ */ new Set();
    this._menuObserver = null;
    this._isSliderActive = false;
    this._isTriggerDisabled = signal(false);
    this._transitionCallbacks = /* @__PURE__ */ new Set();
    this._wasKeyboardExpand = false;
    this._removeSubmenuBind = this._removeSubmenu.bind(this);
    this._isSubmenuOpen = false;
    this._onSubmenuOpenBind = this._onSubmenuOpen.bind(this);
    this._onSubmenuCloseBind = this._onSubmenuClose.bind(this);
    this._onResize = animationFrameThrottle();
    this._isTransitionActive = false;
    const { showDelay } = this.$props;
    this._popper = new Popper({
      _trigger: this._trigger,
      _content: this._content,
      _showDelay: showDelay,
      _listen: (trigger, show, hide) => {
        this._getCloseTarget();
      },
      _onChange: this._onExpandedChange.bind(this)
    });
  }
  static {
    this.props = {
      showDelay: 0
    };
  }
  get triggerElement() {
    return this._trigger();
  }
  get contentElement() {
    return this._content();
  }
  get isSubmenu() {
    return !!this._parentMenu;
  }
  onSetup() {
    this._media = useMediaContext();
    const currentIdCount = ++idCount;
    this._menuId = `media-menu-${currentIdCount}`;
    this._menuButtonId = `media-menu-button-${currentIdCount}`;
    this._focus = new MenuFocusController({
      _closeMenu: this.close.bind(this)
    });
    if (hasProvidedContext(menuContext)) {
      this._parentMenu = useContext(menuContext);
    }
    this._observeSliders();
    this.setAttributes({
      "data-open": this._expanded,
      "data-root": !this.isSubmenu,
      "data-submenu": this.isSubmenu,
      "data-disabled": this._isDisabled.bind(this)
    });
    provideContext(menuContext, {
      _button: this._trigger,
      _content: this._content,
      _expanded: this._expanded,
      _hint: signal(""),
      _submenu: !!this._parentMenu,
      _disable: this._disable.bind(this),
      _attachMenuButton: this._attachMenuButton.bind(this),
      _attachMenuItems: this._attachMenuItems.bind(this),
      _attachObserver: this._attachObserver.bind(this),
      _disableMenuButton: this._disableMenuButton.bind(this),
      _addSubmenu: this._addSubmenu.bind(this),
      _onTransitionEvent: (callback) => {
        this._transitionCallbacks.add(callback);
        onDispose(() => {
          this._transitionCallbacks.delete(callback);
        });
      }
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onConnect(el) {
    effect(this._watchExpanded.bind(this));
    if (this.isSubmenu) {
      this._parentMenu?._addSubmenu(this);
    }
  }
  onDestroy() {
    this._trigger.set(null);
    this._content.set(null);
    this._menuObserver = null;
    this._transitionCallbacks.clear();
  }
  _observeSliders() {
    let sliderActiveTimer = -1, parentSliderObserver = hasProvidedContext(sliderObserverContext) ? useContext(sliderObserverContext) : null;
    provideContext(sliderObserverContext, {
      onDragStart: () => {
        parentSliderObserver?.onDragStart?.();
        window.clearTimeout(sliderActiveTimer);
        sliderActiveTimer = -1;
        this._isSliderActive = true;
      },
      onDragEnd: () => {
        parentSliderObserver?.onDragEnd?.();
        sliderActiveTimer = window.setTimeout(() => {
          this._isSliderActive = false;
          sliderActiveTimer = -1;
        }, 300);
      }
    });
  }
  _watchExpanded() {
    const expanded = this._isExpanded();
    if (!this.isSubmenu)
      this._onResize();
    this._updateMenuItemsHidden(expanded);
    if (!expanded)
      return;
    effect(() => {
      const { height } = this._media.$state, content = this._content();
      content && setStyle(content, "--player-height", height() + "px");
    });
    this._focus._listen();
    this.listen("pointerup", this._onPointerUp.bind(this));
    listenEvent(window, "pointerup", this._onWindowPointerUp.bind(this));
  }
  _attachMenuButton(button) {
    const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(this._isDisabled.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this._menuButtonId);
    setAttribute(el, "aria-haspopup", "menu");
    setAttribute(el, "aria-expanded", "false");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    const watchAttrs = () => {
      setAttribute(el, "data-open", this._expanded());
      setAttribute(el, "aria-disabled", isARIADisabled());
    };
    watchAttrs();
    this._trigger.set(el);
    onDispose(() => {
      this._trigger.set(null);
    });
  }
  _attachMenuItems(items) {
    const el = items.el;
    el.style.setProperty("display", "none");
    setAttribute(el, "id", this._menuId);
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    this._content.set(el);
    onDispose(() => this._content.set(null));
    const watchAttrs = () => setAttribute(el, "data-open", this._expanded());
    watchAttrs();
    this._focus._attachMenu(el);
    this._updateMenuItemsHidden(false);
    const onTransition = this._onResizeTransition.bind(this);
    if (!this.isSubmenu) {
      items.listen("transitionstart", onTransition);
      items.listen("transitionend", onTransition);
      items.listen("animationend", this._onResize);
      items.listen("vds-menu-resize", this._onResize);
    } else {
      this._parentMenu?._onTransitionEvent(onTransition);
    }
  }
  _attachObserver(observer) {
    this._menuObserver = observer;
  }
  _updateMenuItemsHidden(expanded) {
    const content = peek(this._content);
    if (content)
      setAttribute(content, "aria-hidden", ariaBool$1(!expanded));
  }
  _disableMenuButton(disabled) {
    this._isTriggerDisabled.set(disabled);
  }
  _onExpandedChange(isExpanded, event) {
    this._wasKeyboardExpand = isKeyboardEvent(event);
    event?.stopPropagation();
    if (this._expanded() === isExpanded)
      return;
    if (this._isDisabled()) {
      if (isExpanded)
        this._popper.hide(event);
      return;
    }
    this.el?.dispatchEvent(
      new Event("vds-menu-resize", {
        bubbles: true,
        composed: true
      })
    );
    const trigger = this._trigger(), content = this._content();
    if (trigger) {
      setAttribute(trigger, "aria-controls", isExpanded && this._menuId);
      setAttribute(trigger, "aria-expanded", ariaBool$1(isExpanded));
    }
    if (content)
      setAttribute(content, "aria-labelledby", isExpanded && this._menuButtonId);
    this._expanded.set(isExpanded);
    this._toggleMediaControls(event);
    tick();
    if (this._wasKeyboardExpand) {
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
      if (!this.isSubmenu && this._media.activeMenu !== this) {
        this._media.activeMenu?.close(event);
        this._media.activeMenu = this;
      }
      this._menuObserver?._onOpen?.(event);
    } else {
      if (this.isSubmenu) {
        for (const el of this._submenus)
          el.close(event);
      } else {
        this._media.activeMenu = null;
      }
      this._menuObserver?._onClose?.(event);
    }
    if (isExpanded) {
      requestAnimationFrame(this._updateFocus.bind(this));
    }
  }
  _updateFocus() {
    if (this._isTransitionActive || this._isSubmenuOpen)
      return;
    this._focus._update();
    requestAnimationFrame(() => {
      if (this._wasKeyboardExpand) {
        this._focus._focusActive();
      } else {
        this._focus._scroll();
      }
    });
  }
  _isExpanded() {
    return !this._isDisabled() && this._expanded();
  }
  _isDisabled() {
    return this._disabled() || this._isTriggerDisabled();
  }
  _disable(disabled) {
    this._disabled.set(disabled);
  }
  _onPointerUp(event) {
    const content = this._content();
    if (this._isSliderActive || content && isEventInside(content, event)) {
      return;
    }
    event.stopPropagation();
  }
  _onWindowPointerUp(event) {
    const content = this._content();
    if (this._isSliderActive || content && isEventInside(content, event)) {
      return;
    }
    this.close(event);
  }
  _getCloseTarget() {
    const target = this.el?.querySelector('[data-part="close-target"]');
    return this.el && target && isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
  }
  _toggleMediaControls(trigger) {
    if (this.isSubmenu)
      return;
    if (this._expanded())
      this._media.remote.pauseControls(trigger);
    else
      this._media.remote.resumeControls(trigger);
  }
  _addSubmenu(menu) {
    this._submenus.add(menu);
    listenEvent(menu, "open", this._onSubmenuOpenBind);
    listenEvent(menu, "close", this._onSubmenuCloseBind);
    onDispose(this._removeSubmenuBind);
  }
  _removeSubmenu(menu) {
    this._submenus.delete(menu);
  }
  _onSubmenuOpen(event) {
    this._isSubmenuOpen = true;
    const content = this._content();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "true");
    }
    for (const target of this._submenus) {
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
  _onSubmenuClose(event) {
    this._isSubmenuOpen = false;
    const content = this._content();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "false");
    }
    for (const target of this._submenus) {
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
  _onResizeTransition(event) {
    const content = this._content();
    if (content && event.propertyName === "height") {
      this._isTransitionActive = event.type === "transitionstart";
      setAttribute(content, "data-transition", this._isTransitionActive ? "height" : null);
      if (this._expanded())
        this._updateFocus();
    }
    for (const callback of this._transitionCallbacks)
      callback(event);
  }
  open(trigger) {
    if (peek(this._expanded))
      return;
    this._popper.show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(this._expanded))
      return;
    this._popper.hide(trigger);
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
    this._hintEl = signal(null);
    new FocusVisibleController();
  }
  static {
    this.props = {
      disabled: false
    };
  }
  get expanded() {
    return this._menu?._expanded() ?? false;
  }
  onSetup() {
    this._menu = useContext(menuContext);
  }
  onAttach(el) {
    this._menu._attachMenuButton(this);
    effect(this._watchDisabled.bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    effect(this._watchHintEl.bind(this));
    this._onMutation();
    const mutations = new MutationObserver(this._onMutation.bind(this));
    mutations.observe(el, { attributeFilter: ["data-part"], childList: true, subtree: true });
    onDispose(() => mutations.disconnect());
  }
  _watchDisabled() {
    this._menu._disableMenuButton(this.$props.disabled());
  }
  _watchHintEl() {
    const el = this._hintEl();
    if (!el)
      return;
    effect(() => {
      const text = this._menu._hint();
      if (text)
        el.textContent = text;
    });
  }
  _onMutation() {
    const hintEl = this.el?.querySelector('[data-part="hint"]');
    this._hintEl.set(hintEl ?? null);
  }
}
__decorateClass$8([
  prop
], MenuButton.prototype, "expanded");

class MenuItem extends MenuButton {
}

class MenuPortal extends Component {
  constructor() {
    super(...arguments);
    this._target = null;
  }
  static {
    this.props = {
      container: null,
      disabled: false
    };
  }
  onSetup() {
    this._media = useMediaContext();
    provideContext(menuPortalContext, {
      _attach: this._attachElement.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  // Need this so connect scope is defined.
  onConnect(el) {
  }
  onDestroy() {
    this._target?.remove();
    this._target = null;
  }
  _attachElement(el) {
    this._portal(false);
    this._target = el;
    requestScopedAnimationFrame(() => {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this._watchDisabled.bind(this));
      });
    });
  }
  _watchDisabled() {
    const { fullscreen } = this._media.$state, { disabled } = this.$props, _disabled = disabled();
    this._portal(_disabled === "fullscreen" ? !fullscreen() : !_disabled);
  }
  _portal(shouldPortal) {
    if (!this._target)
      return;
    let container = this._getContainer(this.$props.container());
    if (!container)
      return;
    const isPortalled = this._target.parentElement === container;
    setAttribute(this._target, "data-portal", shouldPortal);
    if (shouldPortal) {
      if (!isPortalled) {
        this._target.remove();
        container.append(this._target);
      }
    } else if (isPortalled && this._target.parentElement === container) {
      this._target.remove();
      this.el?.append(this._target);
    }
  }
  _getContainer(selector) {
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
    this._menu = useContext(menuContext);
    this._menu._attachMenuItems(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal._attach(el);
        onDispose(() => portal._attach(null));
      }
    }
  }
  onConnect(el) {
    effect(this._watchPlacement.bind(this));
  }
  _watchPlacement() {
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
      return autoPlacement(this.el, this._getButton(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  _getButton() {
    return this._menu._button();
  }
}

const radioControllerContext = createContext();

class RadioGroupController extends ViewController {
  constructor() {
    super(...arguments);
    this._group = /* @__PURE__ */ new Set();
    this._value = signal("");
    this._controller = null;
    this._onChangeBind = this._onChange.bind(this);
  }
  get _values() {
    return Array.from(this._group).map((radio) => radio._value());
  }
  get value() {
    return this._value();
  }
  set value(value) {
    this._onChange(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this._addRadio.bind(this),
      remove: this._removeRadio.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem)
      setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this._value });
  }
  onDestroy() {
    this._group.clear();
  }
  _addRadio(radio) {
    if (this._group.has(radio))
      return;
    this._group.add(radio);
    radio._onCheck = this._onChangeBind;
    radio._check(radio._value() === this._value());
  }
  _removeRadio(radio) {
    radio._onCheck = null;
    this._group.delete(radio);
  }
  _onChange(newValue, trigger) {
    const currentValue = peek(this._value);
    if (!newValue || newValue === currentValue)
      return;
    const currentRadio = this._findRadio(currentValue), newRadio = this._findRadio(newValue);
    currentRadio?._check(false, trigger);
    newRadio?._check(true, trigger);
    this._value.set(newValue);
    this._onValueChange?.(newValue, trigger);
  }
  _findRadio(newValue) {
    for (const radio of this._group) {
      if (newValue === peek(radio._value))
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
    return this._controller._values;
  }
  get value() {
    return this._controller.value;
  }
  set value(newValue) {
    this._controller.value = newValue;
  }
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  onSetup() {
    this._watchValue();
  }
  _watchValue() {
    this._controller.value = this.$props.value();
  }
  _onValueChange(value, trigger) {
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
    this._checked = signal(false);
    this._controller = {
      _value: this.$props.value,
      _check: this._check.bind(this),
      _onCheck: null
    };
    new FocusVisibleController();
  }
  static {
    this.props = {
      value: ""
    };
  }
  get checked() {
    return this._checked();
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      "data-checked": this._checked,
      "aria-checked": $ariaBool(this._checked)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitemradio" : "radio");
    effect(this._watchValue.bind(this));
  }
  onConnect(el) {
    this._addToGroup();
    onPress(el, this._onPress.bind(this));
    onDispose(this._onDisconnect.bind(this));
  }
  _onDisconnect() {
    scoped(() => {
      const group = useContext(radioControllerContext);
      group.remove(this._controller);
    }, this.connectScope);
  }
  _addToGroup() {
    const group = useContext(radioControllerContext);
    group.add(this._controller);
  }
  _watchValue() {
    const { value } = this.$props, newValue = value();
    if (peek(this._checked)) {
      this._controller._onCheck?.(newValue);
    }
  }
  _onPress(event) {
    if (peek(this._checked))
      return;
    this._onChange(true, event);
    this._onSelect(event);
    this._controller._onCheck?.(peek(this.$props.value), event);
  }
  _check(value, trigger) {
    if (peek(this._checked) === value)
      return;
    this._onChange(value, trigger);
  }
  _onChange(value, trigger) {
    this._checked.set(value);
    this.dispatch("change", { detail: value, trigger });
  }
  _onSelect(trigger) {
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
    this._track = signal(null);
    this._cues = signal([]);
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  static {
    this.props = {
      thumbnails: null
    };
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    return !this._cues()?.length;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
    const { thumbnails } = this.$props;
    this.setAttributes({
      "data-thumbnails": () => !!thumbnails()
    });
  }
  onAttach(el) {
    this._menu?._attachObserver({
      _onOpen: this._onOpen.bind(this)
    });
  }
  getOptions() {
    const { clipStartTime, clipEndTime } = this._media.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    return this._cues().map((cue, i) => ({
      cue,
      value: i.toString(),
      label: cue.text,
      startTime: formatTime(Math.max(0, cue.startTime - startTime)),
      duration: formatSpokenTime(
        Math.min(endTime, cue.endTime) - Math.max(startTime, cue.startTime)
      )
    }));
  }
  _onOpen() {
    peek(() => this._watchCurrentTime());
  }
  onConnect(el) {
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchTrack.bind(this));
    watchActiveTextTrack(this._media.textTracks, "chapters", this._track.set);
  }
  _watchTrack() {
    const track = this._track();
    if (!track)
      return;
    const onCuesChange = this._onCuesChange.bind(this, track);
    onCuesChange();
    return () => {
      this._cues.set([]);
    };
  }
  _onCuesChange(track) {
    const { clipStartTime, clipEndTime } = this._media.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity;
    this._cues.set(
      [...track.cues].filter((cue) => cue.startTime <= endTime && cue.endTime >= startTime)
    );
  }
  _watchCurrentTime() {
    if (!this._menu?._expanded())
      return;
    const track = this._track();
    if (!track) {
      this._controller.value = "-1";
      return;
    }
    const { realCurrentTime, clipStartTime, clipEndTime } = this._media.$state, startTime = clipStartTime(), endTime = clipEndTime() || Infinity, time = realCurrentTime(), activeCueIndex = this._cues().findIndex((cue) => isCueActive(cue, time));
    this._controller.value = activeCueIndex.toString();
    if (activeCueIndex >= 0) {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        const cue = this._cues()[activeCueIndex], radio = this.el.querySelector(`[aria-checked='true']`), cueStartTime = Math.max(startTime, cue.startTime), duration = Math.min(endTime, cue.endTime) - cueStartTime, playedPercent = Math.max(0, time - cueStartTime) / duration * 100;
        radio && setStyle(radio, "--progress", round(playedPercent, 3) + "%");
      });
    }
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _onValueChange(value, trigger) {
    if (this.disabled || !trigger)
      return;
    const index = +value, cues = this._cues(), { clipStartTime } = this._media.$state;
    if (isNumber(index) && cues?.[index]) {
      this._controller.value = index.toString();
      this._media.remote.seek(cues[index].startTime - clipStartTime(), trigger);
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
    return this._controller.value;
  }
  get disabled() {
    const { audioTracks } = this._media.$state;
    return audioTracks().length <= 1;
  }
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }
  getOptions() {
    const { audioTracks } = this._media.$state;
    return audioTracks().map((track) => ({
      track,
      label: track.label,
      value: track.label.toLowerCase()
    }));
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { emptyLabel } = this.$props, { audioTrack } = this._media.$state, track = audioTrack();
    this._menu?._hint.set(track?.label ?? emptyLabel());
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { audioTrack } = this._media.$state;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    const index = this._media.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0) {
      const track = this._media.audioTracks[index];
      this._media.remote.changeAudioTrack(index, trigger);
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
    return this._controller.value;
  }
  get disabled() {
    const { gains } = this.$props, { canSetAudioGain } = this._media.$state;
    return !canSetAudioGain() || gains().length === 0;
  }
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchHintText.bind(this));
    effect(this._watchControllerDisabled.bind(this));
  }
  getOptions() {
    const { gains, normalLabel } = this.$props;
    return gains().map((gain) => ({
      label: gain === 1 || gain === null ? normalLabel : String(gain * 100) + "%",
      value: gain.toString()
    }));
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { normalLabel } = this.$props, { audioGain } = this._media.$state, gain = audioGain();
    this._menu?._hint.set(gain === 1 || gain == null ? normalLabel() : String(gain * 100) + "%");
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { audioGain } = this._media.$state;
    return audioGain()?.toString() ?? "1";
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    const gain = +value;
    this._media.remote.changeAudioGain(gain, trigger);
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
    return this._controller.value;
  }
  get disabled() {
    const { hasCaptions } = this._media.$state;
    return !hasCaptions();
  }
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    super.onConnect?.(el);
    effect(this._watchValue.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }
  getOptions() {
    const { offLabel } = this.$props, { textTracks } = this._media.$state;
    return [
      { value: "off", label: offLabel },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        track,
        label: track.label,
        value: this._getTrackValue(track)
      }))
    ];
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { offLabel } = this.$props, { textTrack } = this._media.$state, track = textTrack();
    this._menu?._hint.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { textTrack } = this._media.$state, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? this._getTrackValue(track) : "off";
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    if (value === "off") {
      const track = this._media.textTracks.selected;
      if (track) {
        const index2 = this._media.textTracks.indexOf(track);
        this._media.remote.changeTextTrackMode(index2, "disabled", trigger);
        this.dispatch("change", { detail: null, trigger });
      }
      return;
    }
    const index = this._media.textTracks.toArray().findIndex((track) => this._getTrackValue(track) === value);
    if (index >= 0) {
      const track = this._media.textTracks[index];
      this._media.remote.changeTextTrackMode(index, "showing", trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
  _getTrackValue(track) {
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
    return this._controller.value;
  }
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = this._media.$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchHintText.bind(this));
    effect(this._watchControllerDisabled.bind(this));
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate.toString()
    }));
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { normalLabel } = this.$props, { playbackRate } = this._media.$state, rate = playbackRate();
    this._menu?._hint.set(rate === 1 ? normalLabel() : rate + "\xD7");
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { playbackRate } = this._media.$state;
    return playbackRate().toString();
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    const rate = +value;
    this._media.remote.changePlaybackRate(rate, trigger);
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
    this._sortedQualities = computed(() => {
      const { sort } = this.$props, { qualities } = this._media.$state;
      return sortVideoQualities(qualities(), sort() === "descending");
    });
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  static {
    this.props = {
      autoLabel: "Auto",
      hideBitrate: false,
      sort: "descending"
    };
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    const { canSetQuality, qualities } = this._media.$state;
    return !canSetQuality() || qualities().length <= 1;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }
  getOptions() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", label: autoLabel },
      ...this._sortedQualities().map((quality) => {
        const bitrate = quality.bitrate && quality.bitrate >= 0 ? `${round(quality.bitrate / 1e6, 2)} Mbps` : null;
        return {
          quality,
          label: quality.height + "p",
          value: this._getQualityId(quality),
          bitrate: () => !hideBitrate() ? bitrate : null
        };
      })
    ];
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this._media.$state, qualityText = quality() ? quality().height + "p" : "";
    this._menu?._hint.set(
      !autoQuality() ? qualityText : autoLabel() + (qualityText ? ` (${qualityText})` : "")
    );
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    if (value === "auto") {
      this._media.remote.changeQuality(-1, trigger);
      this.dispatch("change", { detail: "auto", trigger });
      return;
    }
    const { qualities } = this._media.$state, index = peek(qualities).findIndex((quality) => this._getQualityId(quality) === value);
    if (index >= 0) {
      const quality = peek(qualities)[index];
      this._media.remote.changeQuality(index, trigger);
      this.dispatch("change", { detail: quality, trigger });
    }
  }
  _getValue() {
    const { quality, autoQuality } = this._media.$state;
    if (autoQuality())
      return "auto";
    const currentQuality = quality();
    return currentQuality ? this._getQualityId(currentQuality) : "auto";
  }
  _getQualityId(quality) {
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
    this._provider = null;
    this._presses = 0;
    this._pressTimerId = -1;
  }
  static {
    this.props = {
      disabled: false,
      event: void 0,
      action: void 0
    };
  }
  onSetup() {
    this._media = useMediaContext();
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
    this._provider = this._media.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this._attachListener.bind(this));
  }
  _attachListener() {
    let eventType = this.$props.event(), disabled = this.$props.disabled();
    if (!this._provider || !eventType || disabled)
      return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this._media.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this._provider,
      eventType,
      this._acceptEvent.bind(this));
  }
  _acceptEvent(event) {
    if (this.$props.disabled() || isPointerEvent(event) && (event.button !== 0 || this._media.activeMenu) || isTouchEvent(event) && this._media.activeMenu || isTouchPinchEvent(event) || !this._inBounds(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this._presses === 0) {
        setTimeout(() => {
          if (this._presses === 1)
            this._handleEvent(event);
        }, 250);
      }
    } else if (this._presses === 1) {
      queueMicrotask(() => this._handleEvent(event));
      clearTimeout(this._pressTimerId);
      this._presses = 0;
      return;
    }
    if (this._presses === 0) {
      this._pressTimerId = window.setTimeout(() => {
        this._presses = 0;
      }, 275);
    }
    this._presses++;
  }
  _handleEvent(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this._isTopLayer()) {
        this._performAction(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  _inBounds(event) {
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
  _isTopLayer() {
    const gestures = this._media.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  _performAction(action, trigger) {
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
      this._media.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this._media.remote.seek(peek(this._media.$state.currentTime) + (+value || 0), trigger);
    } else {
      this._media.remote[kebabToCamelCase(method)](trigger);
    }
    this.dispatch("trigger", {
      detail: action,
      trigger
    });
  }
}

class CaptionsTextRenderer {
  constructor(_renderer) {
    this._renderer = _renderer;
    this.priority = 10;
    this._track = null;
    this._disposal = createDisposalBin();
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this._disposal.empty();
    this._renderer.reset();
    this._track = null;
  }
  changeTrack(track) {
    if (!track || this._track === track)
      return;
    this._disposal.empty();
    if (track.readyState < 2) {
      this._renderer.reset();
      this._disposal.add(
        listenEvent()
      );
    } else {
      this._changeTrack(track);
    }
    this._disposal.add(
      listenEvent(),
      listenEvent()
    );
    this._track = track;
  }
  _changeTrack(track) {
    this._renderer.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}

class Captions extends Component {
  constructor() {
    super(...arguments);
    this._hideExampleTimer = -1;
  }
  static {
    this.props = {
      textDir: "ltr",
      exampleText: "Captions look like this."
    };
  }
  static {
    this._lib = signal(null);
  }
  get _lib() {
    return Captions._lib;
  }
  onSetup() {
    this._media = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this._isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (!this._lib()) {
      import('media-captions').then((lib) => this._lib.set(lib));
    }
    effect(this._watchViewType.bind(this));
  }
  _isHidden() {
    const { textTrack, remotePlaybackState, iOSControls } = this._media.$state, track = textTrack();
    return iOSControls() || remotePlaybackState() === "connected" || !track || !isTrackCaptionKind(track);
  }
  _watchViewType() {
    if (!this._lib())
      return;
    const { viewType } = this._media.$state;
    if (viewType() === "audio") {
      return this._setupAudioView();
    } else {
      return this._setupVideoView();
    }
  }
  _setupAudioView() {
    effect(this._onTrackChange.bind(this));
    this._listenToFontStyleChanges(null);
    return () => {
      this.el.textContent = "";
    };
  }
  _onTrackChange() {
    if (this._isHidden())
      return;
    this._onCueChange();
    const { textTrack } = this._media.$state;
    listenEvent(textTrack(), "cue-change", this._onCueChange.bind(this));
    effect(this._onUpdateTimedNodes.bind(this));
  }
  _onCueChange() {
    this.el.textContent = "";
    if (this._hideExampleTimer >= 0) {
      this._removeExample();
    }
    const { realCurrentTime, textTrack } = this._media.$state, { renderVTTCueString } = this._lib(), time = peek(realCurrentTime), activeCues = peek(textTrack).activeCues;
    for (const cue of activeCues) {
      const displayEl = this._createCueDisplayElement(), cueEl = this._createCueElement();
      cueEl.innerHTML = renderVTTCueString(cue, time);
      displayEl.append(cueEl);
      this.el.append(cueEl);
    }
  }
  _onUpdateTimedNodes() {
    const { realCurrentTime } = this._media.$state, { updateTimedVTTCueNodes } = this._lib();
    updateTimedVTTCueNodes(this.el, realCurrentTime());
  }
  _setupVideoView() {
    const { CaptionsRenderer } = this._lib(), renderer = new CaptionsRenderer(this.el), textRenderer = new CaptionsTextRenderer(renderer);
    this._media.textRenderers.add(textRenderer);
    effect(this._watchTextDirection.bind(this, renderer));
    effect(this._watchMediaTime.bind(this, renderer));
    this._listenToFontStyleChanges(renderer);
    return () => {
      this.el.textContent = "";
      this._media.textRenderers.remove(textRenderer);
      renderer.destroy();
    };
  }
  _watchTextDirection(renderer) {
    renderer.dir = this.$props.textDir();
  }
  _watchMediaTime(renderer) {
    if (this._isHidden())
      return;
    const { realCurrentTime, textTrack } = this._media.$state;
    renderer.currentTime = realCurrentTime();
    if (this._hideExampleTimer >= 0 && textTrack()?.activeCues[0]) {
      this._removeExample();
    }
  }
  _listenToFontStyleChanges(renderer) {
    const player = this._media.player;
    if (!player)
      return;
    this._onFontStyleChange.bind(this, renderer);
  }
  _onFontStyleChange(renderer) {
    if (this._hideExampleTimer >= 0) {
      this._hideExample();
      return;
    }
    const { textTrack } = this._media.$state;
    if (!textTrack()?.activeCues[0]) {
      this._showExample();
    } else {
      renderer?.update(true);
    }
  }
  _showExample() {
    const display = this._createCueDisplayElement();
    setAttribute(display, "data-example", "");
    const cue = this._createCueElement();
    setAttribute(cue, "data-example", "");
    cue.textContent = this.$props.exampleText();
    display?.append(cue);
    this.el?.append(display);
    this.el?.setAttribute("data-example", "");
    this._hideExample();
  }
  _hideExample() {
    window.clearTimeout(this._hideExampleTimer);
    this._hideExampleTimer = window.setTimeout(this._removeExample.bind(this), 2500);
  }
  _removeExample() {
    this.el?.removeAttribute("data-example");
    if (this.el?.querySelector("[data-example]"))
      this.el.textContent = "";
    this._hideExampleTimer = -1;
  }
  _createCueDisplayElement() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue-display");
    return el;
  }
  _createCueElement() {
    const el = document.createElement("div");
    setAttribute(el, "data-part", "cue");
    return el;
  }
}

class Poster extends Component {
  constructor() {
    super(...arguments);
    this._prevSrc = "";
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
    this._media = useMediaContext();
    this._watchSrc();
    this._watchAlt();
    this._watchCrossOrigin();
    this._watchHidden();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this._watchImg.bind(this));
    effect(this._watchSrc.bind(this));
    effect(this._watchAlt.bind(this));
    effect(this._watchCrossOrigin.bind(this));
    effect(this._watchHidden.bind(this));
    const { started } = this._media.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this._isLoading.bind(this),
      "data-error": this._hasError.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this._onPreconnect.bind(this));
    effect(this._onLoadStart.bind(this));
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  _onPreconnect() {
    const { canLoadPoster, poster } = this._media.$state;
    if (!canLoadPoster() && poster())
      preconnect(poster(), "preconnect");
  }
  _watchHidden() {
    const { src } = this.$props, { poster, nativeControls } = this._media.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this._hasError() || !(src() || poster()) || nativeControls());
  }
  _isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  _watchImg() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this._onLoad.bind(this));
    listenEvent(img, "error", this._onError.bind(this));
  }
  _watchSrc() {
    const { poster: defaultPoster } = this._media.$props, { canLoadPoster, providedPoster, inferredPoster } = this._media.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this._prevSrc === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this._prevSrc = src;
  }
  _watchAlt() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this._media.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  _watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this._media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  _onLoadStart() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this._media.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  _onLoad() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  _onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
}

class Time extends Component {
  constructor() {
    super(...arguments);
    this._invert = signal(null);
    this._isVisible = signal(true);
    this._isIntersecting = signal(true);
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
    this._media = useMediaContext();
    this._watchTime();
    const { type } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": this._shouldInvert.bind(this)
    });
    new IntersectionObserverController({
      callback: this._onIntersectionChange.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    if (!el.hasAttribute("role"))
      effect(this._watchRole.bind(this));
    effect(this._watchTime.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this._isVisible.set));
    effect(this._watchHidden.bind(this));
    effect(this._watchToggle.bind(this));
  }
  _onIntersectionChange(entries) {
    this._isIntersecting.set(entries[0].isIntersecting);
  }
  _watchHidden() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this._isVisible() || !this._isIntersecting());
  }
  _watchToggle() {
    if (!this.$props.toggle()) {
      this._invert.set(null);
      return;
    }
    if (this.el) {
      onPress(this.el, this._onToggle.bind(this));
    }
  }
  _watchTime() {
    const { hidden, timeText } = this.$state, { duration } = this._media.$state;
    if (hidden())
      return;
    const { type, padHours, padMinutes, showHours } = this.$props, seconds = this._getSeconds(type()), $duration = duration(), shouldInvert = this._shouldInvert();
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
  _watchRole() {
    if (!this.el)
      return;
    const { toggle } = this.$props;
    setAttribute(this.el, "role", toggle() ? "timer" : null);
    setAttribute(this.el, "tabindex", toggle() ? 0 : null);
  }
  _getSeconds(type) {
    const { bufferedEnd, duration, currentTime } = this._media.$state;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
  _shouldInvert() {
    return this.$props.remainder() && this._invert() !== false;
  }
  _onToggle(event) {
    event.preventDefault();
    if (this._invert() === null) {
      this._invert.set(!this.$props.remainder());
      return;
    }
    this._invert.set((v) => !v);
  }
}

const plyrLayoutContext = createContext();

const plyrLayoutProps = {
  clickToPlay: true,
  clickToFullscreen: true,
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute+volume",
    "captions",
    "settings",
    "pip",
    "airplay",
    "fullscreen"
  ],
  customIcons: false,
  displayDuration: false,
  download: null,
  markers: null,
  invertTime: true,
  thumbnails: null,
  toggleTime: true,
  translations: null,
  seekTime: 10,
  speed: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
};

class PlyrLayout extends Component {
  static {
    this.props = plyrLayoutProps;
  }
  onSetup() {
    this._media = useMediaContext();
    provideContext(plyrLayoutContext, {
      ...this.$props,
      previewTime: signal(0)
    });
  }
}
function usePlyrLayoutClasses(el, media) {
  const {
    canAirPlay,
    canFullscreen,
    canPictureInPicture,
    controlsHidden,
    currentTime,
    fullscreen,
    hasCaptions,
    isAirPlayConnected,
    paused,
    pictureInPicture,
    playing,
    pointer,
    poster,
    textTrack,
    viewType,
    waiting
  } = media.$state;
  el.classList.add("plyr");
  el.classList.add("plyr--full-ui");
  const classes = {
    "plyr--airplay-active": isAirPlayConnected,
    "plyr--airplay-supported": canAirPlay,
    "plyr--fullscreen-active": fullscreen,
    "plyr--fullscreen-enabled": canFullscreen,
    "plyr--hide-controls": controlsHidden,
    "plyr--is-touch": () => pointer() === "coarse",
    "plyr--loading": waiting,
    "plyr--paused": paused,
    "plyr--pip-active": pictureInPicture,
    "plyr--pip-enabled": canPictureInPicture,
    "plyr--playing": playing,
    "plyr__poster-enabled": poster,
    "plyr--stopped": () => paused() && currentTime() === 0,
    "plyr--captions-active": textTrack,
    "plyr--captions-enabled": hasCaptions
  };
  const disposal = createDisposalBin();
  for (const token of Object.keys(classes)) {
    disposal.add(effect(() => void el.classList.toggle(token, !!classes[token]())));
  }
  disposal.add(
    effect(() => {
      const token = `plyr--${viewType()}`;
      el.classList.add(token);
      return () => el.classList.remove(token);
    }),
    effect(() => {
      const { $provider } = media, type = $provider()?.type, token = `plyr--${isHTMLProvider(type) ? "html5" : type}`;
      el.classList.toggle(token, !!type);
      return () => el.classList.remove(token);
    })
  );
  return () => disposal.empty();
}
function isHTMLProvider(type) {
  return type === "audio" || type === "video";
}

export { ARIAKeyShortcuts, AirPlayButton, AudioGainRadioGroup, AudioGainSlider, AudioProviderLoader, AudioRadioGroup, AudioTrackList, CaptionButton, Captions, CaptionsRadioGroup, ChaptersRadioGroup, Controls, ControlsGroup, DASHProviderLoader, DEFAULT_AUDIO_GAINS, DEFAULT_PLAYBACK_RATES, FullscreenButton, FullscreenController, Gesture, GoogleCastButton, HLSProviderLoader, LibASSTextRenderer, List, LiveButton, LocalMediaStorage, Logger, MEDIA_KEY_SHORTCUTS, MediaAnnouncer, MediaControls, MediaPlayer, MediaProvider, MediaRemoteControl, Menu, MenuButton, MenuItem, MenuItems, MenuPortal, MuteButton, PIPButton, PlayButton, Poster, QualityRadioGroup, QualitySlider, Radio, RadioGroup, ScreenOrientationController, SeekButton, Slider, SliderChapters, SliderController, SliderPreview, SliderThumbnail, SliderValue, SliderVideo, SpeedRadioGroup, SpeedSlider, TextRenderers, TextTrack, TextTrackList, Thumbnail, ThumbnailsLoader, Time, TimeRange, TimeSlider, ToggleButton, Tooltip, TooltipContent, TooltipTrigger, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, VolumeSlider, YouTubeProviderLoader, canChangeVolume, canFullscreen, canOrientScreen, formatSpokenTime, formatTime, getTimeRangesEnd, getTimeRangesStart, isAudioProvider, isAudioSrc, isCueActive, isDASHProvider, isDASHSrc, isGoogleCastProvider, isHLSProvider, isHLSSrc, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isKeyboardClick, isKeyboardEvent, isPointerEvent, isTrackCaptionKind, isVideoProvider, isVideoQualitySrc, isVimeoProvider, isYouTubeProvider, mediaContext, mediaState, menuPortalContext, sliderContext, sliderState, softResetMediaState, sortVideoQualities, updateFontCssVars, updateSliderPreviewPlacement, usePlyrLayoutClasses, watchActiveTextTrack };
