import { o as deferredPromise, f as signal, l as listenEvent, g as effect, p as peek, i as isString } from './vidstack-CBNXqr3M.js';
import { a as appendParamsToURL } from './vidstack-BTmcG2zk.js';

function timedPromise(callback, ms = 3e3) {
  const promise = deferredPromise();
  setTimeout(() => {
    const rejection = callback();
    if (rejection)
      promise.reject(rejection);
  }, ms);
  return promise;
}

class EmbedProvider {
  constructor(_iframe) {
    this.Lb = _iframe;
    this.sc = signal("");
    this.referrerPolicy = null;
    _iframe.setAttribute("frameBorder", "0");
    _iframe.setAttribute("aria-hidden", "true");
    _iframe.setAttribute(
      "allow",
      "autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
    );
    if (this.referrerPolicy !== null) {
      _iframe.setAttribute("referrerpolicy", this.referrerPolicy);
    }
  }
  get iframe() {
    return this.Lb;
  }
  setup() {
    listenEvent(window, "message", this.Xi.bind(this));
    listenEvent(this.Lb, "load", this.gd.bind(this));
    effect(this.Mb.bind(this));
  }
  Mb() {
    const src = this.sc();
    if (!src.length) {
      this.Lb.setAttribute("src", "");
      return;
    }
    const params = peek(() => this.mg());
    this.Lb.setAttribute("src", appendParamsToURL(src, params));
  }
  se(message, target) {
    this.Lb.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
  }
  Xi(event) {
    const origin = this.Nb(), isOriginMatch = (event.source === null || event.source === this.Lb?.contentWindow) && (!isString(origin) || origin === event.origin);
    if (!isOriginMatch)
      return;
    try {
      const message = JSON.parse(event.data);
      if (message)
        this.te(message, event);
      return;
    } catch (e) {
    }
    if (event.data)
      this.te(event.data, event);
  }
}

export { EmbedProvider as E, timedPromise as t };
