import { Component, State, effect, isNull, setAttribute, listenEvent } from './vidstack-fG_Sx3Q9.js';
import { useMediaContext } from './vidstack-DQ4Fz5gz.js';
import { preconnect } from './vidstack-n2fuk8wF.js';

class Poster extends Component {
  constructor() {
    super(...arguments);
    this._prevSrc = "";
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
    this._media = useMediaContext();
    this._watchSrc();
    this._watchAlt();
    this._watchCrossOrigin();
    this._watchHidden();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this._watchImg.bind(this));
    effect(this._watchSrc.bind(this));
    effect(this._watchAlt.bind(this));
    effect(this._watchCrossOrigin.bind(this));
    effect(this._watchHidden.bind(this));
    const { started } = this._media.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this._isLoading.bind(this),
      "data-error": this._hasError.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this._onPreconnect.bind(this));
    effect(this._onLoadStart.bind(this));
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  _onPreconnect() {
    const { canLoadPoster, poster } = this._media.$state;
    if (!canLoadPoster() && poster()) preconnect(poster(), "preconnect");
  }
  _watchHidden() {
    const { src } = this.$props, { poster, nativeControls } = this._media.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this._hasError() || !(src() || poster()) || nativeControls());
  }
  _isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  _watchImg() {
    const img = this.$state.img();
    if (!img) return;
    listenEvent(img, "load", this._onLoad.bind(this));
    listenEvent(img, "error", this._onError.bind(this));
    if (img.complete) this._onLoad();
  }
  _watchSrc() {
    const { poster: defaultPoster } = this._media.$props, { canLoadPoster, providedPoster, inferredPoster } = this._media.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this._prevSrc === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this._prevSrc = src;
  }
  _watchAlt() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this._media.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  _watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this._media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  _onLoadStart() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this._media.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  _onLoad() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  _onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
}

export { Poster };
