import { Host, effect, setAttribute } from './vidstack-C6myozhB.js';
import { Poster } from './vidstack-CIkLfpg6.js';
import './vidstack-Cq-GdDcp.js';
import './vidstack-Vi2h5MrZ.js';
import './vidstack-B9TAFm_g.js';

class MediaPosterElement extends Host(HTMLElement, Poster) {
  constructor() {
    super(...arguments);
    this.Wm = document.createElement("img");
  }
  static {
    this.tagName = "media-poster";
  }
  static {
    this.attrs = {
      crossOrigin: "crossorigin"
    };
  }
  onSetup() {
    this.$state.img.set(this.Wm);
  }
  onConnect() {
    const { src, alt, crossOrigin } = this.$state;
    effect(() => {
      const { loading, hidden } = this.$state;
      this.Wm.style.display = loading() || hidden() ? "none" : "";
    });
    effect(() => {
      setAttribute(this.Wm, "alt", alt());
      setAttribute(this.Wm, "crossorigin", crossOrigin());
      setAttribute(this.Wm, "src", src());
    });
    if (this.Wm.parentNode !== this) {
      this.prepend(this.Wm);
    }
  }
}

export { MediaPosterElement };
