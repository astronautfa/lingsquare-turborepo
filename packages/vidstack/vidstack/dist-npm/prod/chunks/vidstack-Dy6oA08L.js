import { I as IS_CHROME, b as IS_IOS, d as canGoogleCastSrc } from './vidstack-DlGT_9qi.js';
import { l as loadScript } from './vidstack-BTmcG2zk.js';
import { g as getCastContext, a as getCastSession, i as isCastConnected, h as hasLoadedCastFramework, b as isCastAvailable, c as getCastErrorMessage, d as getDefaultCastOptions, e as getCastFrameworkURL } from './vidstack-BTMNefP5.js';
import { p as peek } from './vidstack-CBNXqr3M.js';
import './vidstack-C5IKOUzO.js';

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
      loadEvent = await this.Ej(ctx);
      if (!this.f) {
        this.f = new cast.framework.RemotePlayer();
        new cast.framework.RemotePlayerController(this.f);
      }
      openEvent = ctx.player.createEvent("google-cast-prompt-open", {
        trigger: loadEvent
      });
      ctx.player.dispatchEvent(openEvent);
      this.Ce(ctx, "connecting", openEvent);
      await this.Fj(peek(ctx.$props.googleCast));
      ctx.$state.remotePlaybackInfo.set({
        deviceName: getCastSession()?.getCastDevice().friendlyName
      });
      if (isCastConnected())
        this.Ce(ctx, "connected", openEvent);
    } catch (code) {
      const error = code instanceof Error ? code : this.De(
        (code + "").toUpperCase(),
        "Prompt failed."
      );
      errorEvent = ctx.player.createEvent("google-cast-prompt-error", {
        detail: error,
        trigger: openEvent ?? loadEvent,
        cancelable: true
      });
      ctx.player.dispatch(errorEvent);
      this.Ce(
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
    if (!this.f) {
      throw Error("[vidstack] google cast player was not initialized");
    }
    return new (await import('../providers/vidstack-google-cast.js')).GoogleCastProvider(this.f, ctx);
  }
  async Ej(ctx) {
    if (hasLoadedCastFramework())
      return;
    const loadStartEvent = ctx.player.createEvent("google-cast-load-start");
    ctx.player.dispatch(loadStartEvent);
    await loadScript(getCastFrameworkURL());
    await customElements.whenDefined("google-cast-launcher");
    const loadedEvent = ctx.player.createEvent("google-cast-loaded", { trigger: loadStartEvent });
    ctx.player.dispatch(loadedEvent);
    if (!isCastAvailable()) {
      throw this.De("CAST_NOT_AVAILABLE", "Google Cast not available on this platform.");
    }
    return loadedEvent;
  }
  async Fj(options) {
    this.Gj(options);
    const errorCode = await this.cast.requestSession();
    if (errorCode) {
      throw this.De(
        errorCode.toUpperCase(),
        getCastErrorMessage(errorCode)
      );
    }
  }
  Gj(options) {
    this.cast?.setOptions({
      ...getDefaultCastOptions(),
      ...options
    });
  }
  Ce(ctx, state, trigger) {
    const detail = { type: "google-cast", state };
    ctx.delegate.c("remote-playback-change", detail, trigger);
  }
  De(code, message) {
    const error = Error(message);
    error.code = code;
    return error;
  }
}

export { GoogleCastLoader };