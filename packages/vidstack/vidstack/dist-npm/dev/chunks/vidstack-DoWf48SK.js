import { Host, effect, setAttribute } from './vidstack-fG_Sx3Q9.js';
import { Poster } from './vidstack-CG5C-V_W.js';
import './vidstack-DQ4Fz5gz.js';
import './vidstack-n2fuk8wF.js';
import './vidstack-C7y2WK8R.js';

class MediaPosterElement extends Host(HTMLElement, Poster) {
  constructor() {
    super(...arguments);
    this._img = document.createElement("img");
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
    this.$state.img.set(this._img);
  }
  onConnect() {
    const { src, alt, crossOrigin } = this.$state;
    effect(() => {
      const { loading, hidden } = this.$state;
      this._img.style.display = loading() || hidden() ? "none" : "";
    });
    effect(() => {
      setAttribute(this._img, "alt", alt());
      setAttribute(this._img, "crossorigin", crossOrigin());
      setAttribute(this._img, "src", src());
    });
    if (this._img.parentNode !== this) {
      this.prepend(this._img);
    }
  }
}

export { MediaPosterElement };
