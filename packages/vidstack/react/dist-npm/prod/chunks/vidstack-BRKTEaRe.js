"use client"

import { appendParamsToURL, IS_SERVER } from './vidstack-DVfG6VuV.js';
import { signal, listenEvent, effect, peek, isString } from './vidstack-DcuYVyd0.js';

class EmbedProvider {
  constructor(_iframe) {
    this.Mb = _iframe;
    this.tc = signal("");
    /**
     * Defines which referrer is sent when fetching the resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
     */
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
    return this.Mb;
  }
  setup() {
    listenEvent(window, "message", this.Yi.bind(this));
    listenEvent(this.Mb, "load", this.hd.bind(this));
    effect(this.Nb.bind(this));
  }
  Nb() {
    const src = this.tc();
    if (!src.length) {
      this.Mb.setAttribute("src", "");
      return;
    }
    const params = peek(() => this.ng());
    this.Mb.setAttribute("src", appendParamsToURL(src, params));
  }
  te(message, target) {
    if (IS_SERVER) return;
    this.Mb.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
  }
  Yi(event) {
    const origin = this.Ob(), isOriginMatch = (event.source === null || event.source === this.Mb?.contentWindow) && (!isString(origin) || origin === event.origin);
    if (!isOriginMatch) return;
    try {
      const message = JSON.parse(event.data);
      if (message) this.ue(message, event);
      return;
    } catch (e) {
    }
    if (event.data) this.ue(event.data, event);
  }
}

export { EmbedProvider };
