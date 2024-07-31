import {
  effect,
  listenEvent,
  signal
} from "./vidstack-LVHOI4SR.js";

// src/providers/html/remote-playback.ts
var HTMLRemotePlaybackAdapter = class {
  #media;
  #ctx;
  #state;
  #supported = signal(false);
  get supported() {
    return this.#supported();
  }
  constructor(media, ctx) {
    this.#media = media;
    this.#ctx = ctx;
    this.#setup();
  }
  #setup() {
    if (!this.#media?.remote || !this.canPrompt) return;
    this.#media.remote.watchAvailability((available) => {
      this.#supported.set(available);
    }).catch(() => {
      this.#supported.set(false);
    });
    effect(this.#watchSupported.bind(this));
  }
  #watchSupported() {
    if (!this.#supported()) return;
    const events = ["connecting", "connect", "disconnect"], onStateChange = this.#onStateChange.bind(this);
    onStateChange();
    listenEvent(this.#media, "playing", onStateChange);
    for (const type of events) {
      listenEvent(this.#media.remote, type, onStateChange);
    }
  }
  async prompt() {
    if (!this.supported) throw Error("Not supported on this platform.");
    if (this.type === "airplay" && this.#media.webkitShowPlaybackTargetPicker) {
      return this.#media.webkitShowPlaybackTargetPicker();
    }
    return this.#media.remote.prompt();
  }
  #onStateChange(event) {
    const state = this.#media.remote.state;
    if (state === this.#state) return;
    const detail = { type: this.type, state };
    this.#ctx.notify("remote-playback-change", detail, event);
    this.#state = state;
  }
};
var HTMLAirPlayAdapter = class extends HTMLRemotePlaybackAdapter {
  type = "airplay";
  get canPrompt() {
    return "WebKitPlaybackTargetAvailabilityEvent" in window;
  }
};

export {
  HTMLAirPlayAdapter
};
