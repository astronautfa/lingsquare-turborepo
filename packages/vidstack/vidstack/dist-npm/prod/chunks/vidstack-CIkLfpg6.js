import { Component, State, effect, isNull, setAttribute, listenEvent } from './vidstack-C6myozhB.js';
import { useMediaContext } from './vidstack-Cq-GdDcp.js';
import { preconnect } from './vidstack-Vi2h5MrZ.js';

class Poster extends Component {
  constructor() {
    super(...arguments);
    this.Xh = "";
  }
  static {
    this.props = {
      src: null,
      alt: null,
      crossOrigin: null
    };
  }
  static {
    this.state = new State({
      img: null,
      src: null,
      alt: null,
      crossOrigin: null,
      loading: true,
      error: null,
      hidden: false
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.Mb();
    this.Wh();
    this.Ca();
    this.Ea();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this.kf.bind(this));
    effect(this.Mb.bind(this));
    effect(this.Wh.bind(this));
    effect(this.Ca.bind(this));
    effect(this.Ea.bind(this));
    const { started } = this.a.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this.Pc.bind(this),
      "data-error": this.fb.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this.Im.bind(this));
    effect(this.Ma.bind(this));
  }
  fb() {
    const { error } = this.$state;
    return !isNull(error());
  }
  Im() {
    const { canLoadPoster, poster } = this.a.$state;
    if (!canLoadPoster() && poster()) preconnect(poster(), "preconnect");
  }
  Ea() {
    const { src } = this.$props, { poster, nativeControls } = this.a.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this.fb() || !(src() || poster()) || nativeControls());
  }
  Pc() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  kf() {
    const img = this.$state.img();
    if (!img) return;
    listenEvent(img, "load", this.gd.bind(this));
    listenEvent(img, "error", this.Q.bind(this));
    if (img.complete) this.gd();
  }
  Mb() {
    const { poster: defaultPoster } = this.a.$props, { canLoadPoster, providedPoster, inferredPoster } = this.a.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this.Xh === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this.Xh = src;
  }
  Wh() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this.a.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  Ca() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this.a.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  Ma() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this.a.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  gd() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  Q(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
}

export { Poster };
