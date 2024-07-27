"use client"

import { listen, IS_CHROME, IS_IOS, canGoogleCastSrc, IS_SERVER, loadScript } from './vidstack-DVfG6VuV.js';
import { peek } from './vidstack-DcuYVyd0.js';

function getCastFrameworkURL() {
  return "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
}
function hasLoadedCastFramework() {
  return !!window.cast?.framework;
}
function isCastAvailable() {
  return !!window.chrome?.cast?.isAvailable;
}
function isCastConnected() {
  return getCastContext().getCastState() === cast.framework.CastState.CONNECTED;
}
function getCastContext() {
  return window.cast.framework.CastContext.getInstance();
}
function getCastSession() {
  return getCastContext().getCurrentSession();
}
function getCastSessionMedia() {
  return getCastSession()?.getSessionObj().media[0];
}
function hasActiveCastSession(src) {
  const contentId = getCastSessionMedia()?.media.contentId;
  return contentId === src?.src;
}
function getDefaultCastOptions() {
  return {
    language: "en-US",
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    resumeSavedSession: true,
    androidReceiverCompatible: true
  };
}
function getCastErrorMessage(code) {
  const defaultMessage = `Google Cast Error Code: ${code}`;
  return defaultMessage;
}
function listenCastContextEvent(type, handler) {
  return listen(getCastContext(), type, handler);
}

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
      loadEvent = await this.Fj(ctx);
      if (!this.f) {
        this.f = new cast.framework.RemotePlayer();
        new cast.framework.RemotePlayerController(this.f);
      }
      openEvent = ctx.player.createEvent("google-cast-prompt-open", {
        trigger: loadEvent
      });
      ctx.player.dispatchEvent(openEvent);
      this.De(ctx, "connecting", openEvent);
      await this.Gj(peek(ctx.$props.googleCast));
      ctx.$state.remotePlaybackInfo.set({
        deviceName: getCastSession()?.getCastDevice().friendlyName
      });
      if (isCastConnected()) this.De(ctx, "connected", openEvent);
    } catch (code) {
      const error = code instanceof Error ? code : this.Ee(
        (code + "").toUpperCase(),
        "Prompt failed."
      );
      errorEvent = ctx.player.createEvent("google-cast-prompt-error", {
        detail: error,
        trigger: openEvent ?? loadEvent,
        cancelable: true
      });
      ctx.player.dispatch(errorEvent);
      this.De(
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
    if (IS_SERVER) {
      throw Error("[vidstack] can not load google cast provider server-side");
    }
    if (!this.f) {
      throw Error("[vidstack] google cast player was not initialized");
    }
    return new (await import('./vidstack-CXFbjFnn.js')).GoogleCastProvider(this.f, ctx);
  }
  async Fj(ctx) {
    if (hasLoadedCastFramework()) return;
    const loadStartEvent = ctx.player.createEvent("google-cast-load-start");
    ctx.player.dispatch(loadStartEvent);
    await loadScript(getCastFrameworkURL());
    await customElements.whenDefined("google-cast-launcher");
    const loadedEvent = ctx.player.createEvent("google-cast-loaded", { trigger: loadStartEvent });
    ctx.player.dispatch(loadedEvent);
    if (!isCastAvailable()) {
      throw this.Ee("CAST_NOT_AVAILABLE", "Google Cast not available on this platform.");
    }
    return loadedEvent;
  }
  async Gj(options) {
    this.Hj(options);
    const errorCode = await this.cast.requestSession();
    if (errorCode) {
      throw this.Ee(
        errorCode.toUpperCase(),
        getCastErrorMessage(errorCode)
      );
    }
  }
  Hj(options) {
    this.cast?.setOptions({
      ...getDefaultCastOptions(),
      ...options
    });
  }
  De(ctx, state, trigger) {
    const detail = { type: "google-cast", state };
    ctx.delegate.c("remote-playback-change", detail, trigger);
  }
  Ee(code, message) {
    const error = Error(message);
    error.code = code;
    return error;
  }
}

var loader = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GoogleCastLoader: GoogleCastLoader
});

export { getCastContext, getCastErrorMessage, getCastSession, getCastSessionMedia, hasActiveCastSession, listenCastContextEvent, loader };
