import { signal, listenEvent, effect, peek, isString } from './vidstack-fG_Sx3Q9.js';
import { appendParamsToURL } from './vidstack-n2fuk8wF.js';

class EmbedProvider {
  constructor(_iframe) {
    this._iframe = _iframe;
    this._src = signal("");
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
    return this._iframe;
  }
  setup() {
    listenEvent(window, "message", this._onWindowMessage.bind(this));
    listenEvent(this._iframe, "load", this._onLoad.bind(this));
    effect(this._watchSrc.bind(this));
  }
  _watchSrc() {
    const src = this._src();
    if (!src.length) {
      this._iframe.setAttribute("src", "");
      return;
    }
    const params = peek(() => this._buildParams());
    this._iframe.setAttribute("src", appendParamsToURL(src, params));
  }
  _postMessage(message, target) {
    this._iframe.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
  }
  _onWindowMessage(event) {
    const origin = this._getOrigin(), isOriginMatch = (event.source === null || event.source === this._iframe?.contentWindow) && (!isString(origin) || origin === event.origin);
    if (!isOriginMatch) return;
    try {
      const message = JSON.parse(event.data);
      if (message) this._onMessage(message, event);
      return;
    } catch (e) {
    }
    if (event.data) this._onMessage(event.data, event);
  }
}

export { EmbedProvider };
