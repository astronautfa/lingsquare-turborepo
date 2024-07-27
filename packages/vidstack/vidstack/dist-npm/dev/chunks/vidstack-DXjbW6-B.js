import { IS_CHROME, IS_IOS, canGoogleCastSrc } from './vidstack-C7y2WK8R.js';
import { loadScript } from './vidstack-n2fuk8wF.js';
import { getCastContext, getCastSession, isCastConnected, hasLoadedCastFramework, isCastAvailable, getCastErrorMessage, getDefaultCastOptions, getCastFrameworkURL } from './vidstack-DkpLxM2C.js';
import { peek } from './vidstack-fG_Sx3Q9.js';
import './vidstack-DdUZGy1h.js';
import '@floating-ui/dom';

class GoogleCastLoader {
  constructor() {
    this.name = "google-cast";
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
   */
  get cast() {
    return getCastContext();
  }
  mediaType() {
    return "video";
  }
  canPlay(src) {
    return IS_CHROME && !IS_IOS && canGoogleCastSrc(src);
  }
  async prompt(ctx) {
    let loadEvent, openEvent, errorEvent;
    try {
      loadEvent = await this._loadCastFramework(ctx);
      if (!this._player) {
        this._player = new cast.framework.RemotePlayer();
        new cast.framework.RemotePlayerController(this._player);
      }
      openEvent = ctx.player.createEvent("google-cast-prompt-open", {
        trigger: loadEvent
      });
      ctx.player.dispatchEvent(openEvent);
      this._notifyRemoteStateChange(ctx, "connecting", openEvent);
      await this._showPrompt(peek(ctx.$props.googleCast));
      ctx.$state.remotePlaybackInfo.set({
        deviceName: getCastSession()?.getCastDevice().friendlyName
      });
      if (isCastConnected()) this._notifyRemoteStateChange(ctx, "connected", openEvent);
    } catch (code) {
      const error = code instanceof Error ? code : this._createError(
        (code + "").toUpperCase(),
        "Prompt failed."
      );
      errorEvent = ctx.player.createEvent("google-cast-prompt-error", {
        detail: error,
        trigger: openEvent ?? loadEvent,
        cancelable: true
      });
      ctx.player.dispatch(errorEvent);
      this._notifyRemoteStateChange(
        ctx,
        isCastConnected() ? "connected" : "disconnected",
        errorEvent
      );
      throw error;
    } finally {
      ctx.player.dispatch("google-cast-prompt-close", {
        trigger: errorEvent ?? openEvent ?? loadEvent
      });
    }
  }
  async load(ctx) {
    if (!this._player) {
      throw Error("[vidstack] google cast player was not initialized");
    }
    return new (await import('../providers/vidstack-google-cast.js')).GoogleCastProvider(this._player, ctx);
  }
  async _loadCastFramework(ctx) {
    if (hasLoadedCastFramework()) return;
    const loadStartEvent = ctx.player.createEvent("google-cast-load-start");
    ctx.player.dispatch(loadStartEvent);
    await loadScript(getCastFrameworkURL());
    await customElements.whenDefined("google-cast-launcher");
    const loadedEvent = ctx.player.createEvent("google-cast-loaded", { trigger: loadStartEvent });
    ctx.player.dispatch(loadedEvent);
    if (!isCastAvailable()) {
      throw this._createError("CAST_NOT_AVAILABLE", "Google Cast not available on this platform.");
    }
    return loadedEvent;
  }
  async _showPrompt(options) {
    this._setOptions(options);
    const errorCode = await this.cast.requestSession();
    if (errorCode) {
      throw this._createError(
        errorCode.toUpperCase(),
        getCastErrorMessage(errorCode)
      );
    }
  }
  _setOptions(options) {
    this.cast?.setOptions({
      ...getDefaultCastOptions(),
      ...options
    });
  }
  _notifyRemoteStateChange(ctx, state, trigger) {
    const detail = { type: "google-cast", state };
    ctx.delegate._notify("remote-playback-change", detail, trigger);
  }
  _createError(code, message) {
    const error = Error(message);
    error.code = code;
    return error;
  }
}

export { GoogleCastLoader };
