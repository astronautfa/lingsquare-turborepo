import {
  HTMLAirPlayAdapter,
  HTMLMediaProvider
} from "./vidstack-YOCKS765.js";
import "./vidstack-NKP3RIR4.js";
import "./vidstack-HLIA5IIR.js";
import "./vidstack-B2HNNR5Q.js";
import "./vidstack-SN6ZVKJG.js";
import {
  scoped
} from "./vidstack-3R7QJDRC.js";
import "./vidstack-WBT4TVVV.js";

// ../vidstack/src/providers/audio/provider.ts
var AudioProvider = class extends HTMLMediaProvider {
  $$PROVIDER_TYPE = "AUDIO";
  get type() {
    return "audio";
  }
  airPlay;
  constructor(audio, ctx) {
    super(audio, ctx);
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(this.media, ctx);
    }, this.scope);
  }
  setup() {
    super.setup();
    if (this.type === "audio") this.ctx.notify("provider-setup", this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this.media;
  }
};
export {
  AudioProvider
};
