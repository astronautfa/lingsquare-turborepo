import {
  HTMLAirPlayAdapter,
  HTMLMediaProvider
} from "./vidstack-YARHYZTE.js";
import "./vidstack-NC4HUCS6.js";
import "./vidstack-SI23L3CL.js";
import "./vidstack-B2HNNR5Q.js";
import "./vidstack-SN6ZVKJG.js";
import {
  scoped
} from "./vidstack-KAGOB6PR.js";
import "./vidstack-YJG6SZYI.js";

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
