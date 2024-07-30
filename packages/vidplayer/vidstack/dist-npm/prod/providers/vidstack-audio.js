import { e as scoped } from '../chunks/vidstack-CBNXqr3M.js';
import { HTMLMediaProvider } from './vidstack-html.js';
import { H as HTMLAirPlayAdapter } from '../chunks/vidstack-DHaZtYX6.js';
import '../chunks/vidstack-DlGT_9qi.js';
import '../chunks/vidstack-D5KHQxGY.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-VrKElWm_.js';

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
      this.b.delegate.c("provider-setup", this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this.a;
  }
}

export { AudioProvider };
