import {
  HTMLAirPlayAdapter
} from "../chunks/vidstack-JIPM25FJ.js";
import {
  HTMLMediaProvider
} from "../chunks/vidstack-7YJ2776L.js";
import "../chunks/vidstack-JMHA6GI7.js";
import "../chunks/vidstack-KISR27XC.js";
import "../chunks/vidstack-M63U4DIJ.js";
import "../chunks/vidstack-6IDPYHAE.js";
import {
  scoped
} from "../chunks/vidstack-LVHOI4SR.js";

// src/providers/audio/provider.ts
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
