"use client"

import { scoped } from './vidstack-3hs3-8i_.js';
import { HTMLMediaProvider, HTMLAirPlayAdapter } from './vidstack-Dw0Lpul5.js';
import 'react';
import '@floating-ui/dom';

class AudioProvider extends HTMLMediaProvider {
  constructor(audio, ctx) {
    super(audio, ctx);
    this.$$PROVIDER_TYPE = "AUDIO";
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(this.media, ctx);
    }, this.scope);
  }
  get type() {
    return "audio";
  }
  setup() {
    super.setup();
    if (this.type === "audio") this._ctx.delegate._notify("provider-setup", this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this._media;
  }
}

export { AudioProvider };
