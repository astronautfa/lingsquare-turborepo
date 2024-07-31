import {
  Poster
} from "./vidstack-5LAIUSBE.js";
import {
  Host
} from "./vidstack-F4GL2AHS.js";
import {
  effect,
  setAttribute
} from "./vidstack-LVHOI4SR.js";

// src/elements/define/poster-element.ts
var MediaPosterElement = class extends Host(HTMLElement, Poster) {
  static tagName = "media-poster";
  static attrs = {
    crossOrigin: "crossorigin"
  };
  #img = document.createElement("img");
  onSetup() {
    this.$state.img.set(this.#img);
  }
  onConnect() {
    const { src, alt, crossOrigin } = this.$state;
    effect(() => {
      const { loading, hidden } = this.$state;
      this.#img.style.display = loading() || hidden() ? "none" : "";
    });
    effect(() => {
      setAttribute(this.#img, "alt", alt());
      setAttribute(this.#img, "crossorigin", crossOrigin());
      setAttribute(this.#img, "src", src());
    });
    if (this.#img.parentNode !== this) {
      this.prepend(this.#img);
    }
  }
};

export {
  MediaPosterElement
};
