import {
  appendParamsToURL
} from "./vidstack-7GP6O6LE.js";
import {
  effect,
  isString,
  listenEvent,
  peek,
  signal
} from "./vidstack-LVHOI4SR.js";

// src/providers/embed/EmbedProvider.ts
var EmbedProvider = class {
  #iframe;
  src = signal("");
  /**
   * Defines which referrer is sent when fetching the resource.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
   */
  referrerPolicy = null;
  get iframe() {
    return this.#iframe;
  }
  constructor(iframe) {
    this.#iframe = iframe;
    iframe.setAttribute("frameBorder", "0");
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute(
      "allow",
      "autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
    );
    if (this.referrerPolicy !== null) {
      iframe.setAttribute("referrerpolicy", this.referrerPolicy);
    }
  }
  setup() {
    listenEvent(window, "message", this.#onWindowMessage.bind(this));
    listenEvent(this.#iframe, "load", this.onLoad.bind(this));
    effect(this.#watchSrc.bind(this));
  }
  #watchSrc() {
    const src = this.src();
    if (!src.length) {
      this.#iframe.setAttribute("src", "");
      return;
    }
    const params = peek(() => this.buildParams());
    this.#iframe.setAttribute("src", appendParamsToURL(src, params));
  }
  postMessage(message, target) {
    if (false) return;
    this.#iframe.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
  }
  #onWindowMessage(event) {
    const origin = this.getOrigin(), isOriginMatch = (event.source === null || event.source === this.#iframe?.contentWindow) && (!isString(origin) || origin === event.origin);
    if (!isOriginMatch) return;
    try {
      const message = JSON.parse(event.data);
      if (message) this.onMessage(message, event);
      return;
    } catch (e) {
    }
    if (event.data) this.onMessage(event.data, event);
  }
};

export {
  EmbedProvider
};