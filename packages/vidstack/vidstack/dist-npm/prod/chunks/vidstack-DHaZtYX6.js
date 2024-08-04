import { f as signal, g as effect, l as listenEvent } from './vidstack-CBNXqr3M.js';
import './vidstack-DlGT_9qi.js';

class HTMLRemotePlaybackAdapter {
  constructor(_media, _ctx) {
    this.a = _media;
    this.b = _ctx;
    this.pb = signal(false);
    this.he();
  }
  get supported() {
    return this.pb();
  }
  he() {
    if (!this.a?.remote || !this.kg)
      return;
    this.a.remote.watchAvailability((available) => {
      this.pb.set(available);
    }).catch(() => {
      this.pb.set(false);
    });
    effect(this.Fi.bind(this));
  }
  Fi() {
    if (!this.pb())
      return;
    const events = ["connecting", "connect", "disconnect"], onStateChange = this.ie.bind(this);
    onStateChange();
    listenEvent(this.a, "playing", onStateChange);
    for (const type of events) {
      listenEvent(this.a.remote, type, onStateChange);
    }
  }
  async prompt() {
    if (!this.supported)
      throw Error("Not supported on this platform.");
    if (this.la === "airplay" && this.a.webkitShowPlaybackTargetPicker) {
      return this.a.webkitShowPlaybackTargetPicker();
    }
    return this.a.remote.prompt();
  }
  ie(event) {
    const state = this.a.remote.state;
    if (state === this.za)
      return;
    const detail = { type: this.la, state };
    this.b.delegate.c("remote-playback-change", detail, event);
    this.za = state;
  }
}
class HTMLAirPlayAdapter extends HTMLRemotePlaybackAdapter {
  constructor() {
    super(...arguments);
    this.la = "airplay";
  }
  get kg() {
    return "WebKitPlaybackTargetAvailabilityEvent" in window;
  }
}

export { HTMLAirPlayAdapter as H };