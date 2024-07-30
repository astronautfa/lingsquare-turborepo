import { H as Host, g as effect, s as setAttribute, q as computed } from './vidstack-ND4uzLKO.js';
import { c as MediaProvider, d as MediaPlayer } from './vidstack-Ga5LXVQf.js';
import './vidstack-BNJih9gD.js';
import { u as useMediaContext } from './vidstack-BuYg7N1V.js';
import './vidstack-Ca9dj_1Q.js';
import './vidstack-pWEcRV_H.js';

class MediaProviderElement extends Host(HTMLElement, MediaProvider) {
  constructor() {
    super(...arguments);
    this._target = null;
    this._blocker = null;
  }
  static {
    this.tagName = "media-provider";
  }
  onSetup() {
    this._media = useMediaContext();
    this.setAttribute("keep-alive", "");
  }
  onDestroy() {
    this._blocker?.remove();
    this._blocker = null;
    this._target?.remove();
    this._target = null;
  }
  onConnect() {
    effect(() => {
      const loader = this.$state.loader(), isYouTubeEmbed = loader?.name === "youtube", isVimeoEmbed = loader?.name === "vimeo", isEmbed = isYouTubeEmbed || isVimeoEmbed, isGoogleCast = loader?.name === "google-cast";
      const target = loader ? isGoogleCast ? this._createGoogleCastContainer() : isEmbed ? this._createIFrame() : loader.mediaType() === "audio" ? this._createAudio() : this._createVideo() : null;
      if (this._target !== target) {
        const parent = this._target?.parentElement ?? this;
        this._target?.remove();
        this._target = target;
        if (target)
          parent.prepend(target);
        if (isEmbed && target) {
          effect(() => {
            const { nativeControls, viewType } = this._media.$state, showNativeControls = nativeControls(), isAudioView = viewType() === "audio", showBlocker = showNativeControls && !isAudioView;
            if (showBlocker) {
              this._blocker = this.querySelector(".vds-blocker");
              if (!this._blocker) {
                this._blocker = document.createElement("div");
                this._blocker.classList.add("vds-blocker");
                target.after(this._blocker);
              }
            } else {
              this._blocker?.remove();
              this._blocker = null;
            }
            setAttribute(target, "data-no-controls", !showNativeControls);
          });
        }
      }
      if (isYouTubeEmbed)
        target?.classList.add("vds-youtube");
      else if (isVimeoEmbed)
        target?.classList.add("vds-vimeo");
      if (!isEmbed) {
        this._blocker?.remove();
        this._blocker = null;
      }
      this.load(target);
    });
  }
  _createAudio() {
    const audio = this._target instanceof HTMLAudioElement ? this._target : document.createElement("audio");
    setAttribute(audio, "preload", "none");
    setAttribute(audio, "aria-hidden", "true");
    const { controls, crossOrigin } = this._media.$state;
    effect(() => {
      setAttribute(audio, "controls", controls());
      setAttribute(audio, "crossorigin", crossOrigin());
    });
    return audio;
  }
  _createVideo() {
    const video = this._target instanceof HTMLVideoElement ? this._target : document.createElement("video");
    const { crossOrigin, poster, nativeControls } = this._media.$state, $controls = computed(() => nativeControls() ? "true" : null), $poster = computed(() => poster() && nativeControls() ? poster() : null);
    effect(() => {
      setAttribute(video, "controls", $controls());
      setAttribute(video, "crossorigin", crossOrigin());
      setAttribute(video, "poster", $poster());
    });
    return video;
  }
  _createIFrame() {
    const iframe = this._target instanceof HTMLIFrameElement ? this._target : document.createElement("iframe"), { nativeControls } = this._media.$state;
    effect(() => setAttribute(iframe, "tabindex", !nativeControls() ? -1 : null));
    return iframe;
  }
  _createGoogleCastContainer() {
    if (this._target?.classList.contains("vds-google-cast")) {
      return this._target;
    }
    const container = document.createElement("div");
    container.classList.add("vds-google-cast");
    import('./vidstack-ESYl4gQZ.js').then(({ insertContent }) => {
      insertContent(container, this._media.$state);
    });
    return container;
  }
}

class MediaPlayerElement extends Host(HTMLElement, MediaPlayer) {
  static {
    this.tagName = "media-player";
  }
  static {
    this.attrs = {
      autoPlay: "autoplay",
      crossOrigin: "crossorigin",
      playsInline: "playsinline",
      preferNativeHLS: "prefer-native-hls",
      minLiveDVRWindow: "min-live-dvr-window"
    };
  }
}

export { MediaProviderElement as M, MediaPlayerElement as a };
