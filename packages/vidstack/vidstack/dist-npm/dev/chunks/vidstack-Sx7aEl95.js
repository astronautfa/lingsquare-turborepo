import { H as Host, g as effect, s as setAttribute } from './vidstack-ND4uzLKO.js';
import { P as Poster } from './vidstack-Ga5LXVQf.js';
import './vidstack-BNJih9gD.js';
import './vidstack-Ca9dj_1Q.js';
import './vidstack-pWEcRV_H.js';
import './vidstack-BmzHu3v_.js';
import './vidstack-CnaYRoc3.js';
import './vidstack-DpIrri-f.js';
import './vidstack-CkfyfBu0.js';
import './vidstack-BuYg7N1V.js';
import './vidstack-1gmLGa6x.js';
import './vidstack-DM_McBs5.js';
import './vidstack-ksPACRiU.js';
import './vidstack-CSaHpIQV.js';

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
    if (this._img.parentNode !== this) {
      this.prepend(this._img);
    }
    effect(() => {
      setAttribute(this._img, "alt", alt());
      setAttribute(this._img, "crossorigin", crossOrigin());
      setAttribute(this._img, "src", src() || "");
    });
    effect(() => {
      const { loading, hidden } = this.$state;
      this._img.style.display = loading() || hidden() ? "none" : "";
    });
  }
}

export { MediaPosterElement };
