import { H as Host, g as effect, s as setAttribute } from './vidstack-CBNXqr3M.js';
import { P as Poster } from './vidstack-Dv7HWUBr.js';
import './vidstack-C5IKOUzO.js';
import './vidstack-DlGT_9qi.js';
import './vidstack-DuqfpSxk.js';
import './vidstack-DopyK5ml.js';
import './vidstack-VrKElWm_.js';
import './vidstack-THZVvA_p.js';
import './vidstack-BTmcG2zk.js';
import './vidstack-DoOTQiYD.js';
import './vidstack-BSXZsAhp.js';
import './vidstack-BUqeBbTQ.js';
import './vidstack-ksPACRiU.js';
import './vidstack-CSaHpIQV.js';

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
    if (this.Wm.parentNode !== this) {
      this.prepend(this.Wm);
    }
    effect(() => {
      setAttribute(this.Wm, "alt", alt());
      setAttribute(this.Wm, "crossorigin", crossOrigin());
      setAttribute(this.Wm, "src", src() || "");
    });
    effect(() => {
      const { loading, hidden } = this.$state;
      this.Wm.style.display = loading() || hidden() ? "none" : "";
    });
  }
}

export { MediaPosterElement };
