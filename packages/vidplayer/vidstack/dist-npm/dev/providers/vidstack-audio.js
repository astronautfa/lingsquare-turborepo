import { e as scoped } from '../chunks/vidstack-ND4uzLKO.js';
import { HTMLMediaProvider } from './vidstack-html.js';
import { H as HTMLAirPlayAdapter } from '../chunks/vidstack-DlEhHkGV.js';
import '../chunks/vidstack-Ca9dj_1Q.js';
import '../chunks/vidstack-D6nVZmKR.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-CnaYRoc3.js';

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
    if (this.type === "audio")
      this._ctx.delegate._notify("provider-setup", this);
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
