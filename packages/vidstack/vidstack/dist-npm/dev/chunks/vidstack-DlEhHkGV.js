import { f as signal, g as effect, l as listenEvent } from './vidstack-ND4uzLKO.js';
import './vidstack-Ca9dj_1Q.js';

class HTMLRemotePlaybackAdapter {
  constructor(_media, _ctx) {
    this._media = _media;
    this._ctx = _ctx;
    this._supported = signal(false);
    this._setup();
  }
  get supported() {
    return this._supported();
  }
  _setup() {
    if (!this._media?.remote || !this._canPrompt)
      return;
    this._media.remote.watchAvailability((available) => {
      this._supported.set(available);
    }).catch(() => {
      this._supported.set(false);
    });
    effect(this._watchSupported.bind(this));
  }
  _watchSupported() {
    if (!this._supported())
      return;
    const events = ["connecting", "connect", "disconnect"], onStateChange = this._onStateChange.bind(this);
    onStateChange();
    listenEvent(this._media, "playing", onStateChange);
    for (const type of events) {
      listenEvent(this._media.remote, type, onStateChange);
    }
  }
  async prompt() {
    if (!this.supported)
      throw Error("Not supported on this platform.");
    if (this._type === "airplay" && this._media.webkitShowPlaybackTargetPicker) {
      return this._media.webkitShowPlaybackTargetPicker();
    }
    return this._media.remote.prompt();
  }
  _onStateChange(event) {
    const state = this._media.remote.state;
    if (state === this._state)
      return;
    const detail = { type: this._type, state };
    this._ctx.delegate._notify("remote-playback-change", detail, event);
    this._state = state;
  }
}
class HTMLAirPlayAdapter extends HTMLRemotePlaybackAdapter {
  constructor() {
    super(...arguments);
    this._type = "airplay";
  }
  get _canPrompt() {
    return "WebKitPlaybackTargetAvailabilityEvent" in window;
  }
}

export { HTMLAirPlayAdapter as H };
