import { Host, effect, computed, setAttribute } from './vidstack-fG_Sx3Q9.js';
import { MediaProvider, MediaPlayer } from './vidstack-BYGViWgv.js';
import { useMediaContext } from './vidstack-DQ4Fz5gz.js';

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
        if (target) parent.prepend(target);
        if (isEmbed && target) {
          effect(() => {
            const { nativeControls, viewType } = this._media.$state, showNativeControls = nativeControls(), isAudioView = viewType() === "audio", showBlocker = !showNativeControls && !isAudioView;
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
      if (isYouTubeEmbed) target?.classList.add("vds-youtube");
      else if (isVimeoEmbed) target?.classList.add("vds-vimeo");
      if (!isEmbed) {
        this._blocker?.remove();
        this._blocker = null;
      }
      this.load(target);
    });
  }
  _createAudio() {
    const audio = this._target instanceof HTMLAudioElement ? this._target : document.createElement("audio");
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
    import('./vidstack-CEp8aUby.js').then(({ insertContent }) => {
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

export { MediaPlayerElement, MediaProviderElement };
