import { H as Host, g as effect, s as setAttribute, q as computed } from './vidstack-CBNXqr3M.js';
import { c as MediaProvider, d as MediaPlayer } from './vidstack-Dv7HWUBr.js';
import './vidstack-C5IKOUzO.js';
import { u as useMediaContext } from './vidstack-DoOTQiYD.js';
import './vidstack-DlGT_9qi.js';
import './vidstack-DuqfpSxk.js';

class MediaProviderElement extends Host(HTMLElement, MediaProvider) {
  constructor() {
    super(...arguments);
    this.G = null;
    this.Xm = null;
  }
  static {
    this.tagName = "media-provider";
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttribute("keep-alive", "");
  }
  onDestroy() {
    this.Xm?.remove();
    this.Xm = null;
    this.G?.remove();
    this.G = null;
  }
  onConnect() {
    effect(() => {
      const loader = this.$state.loader(), isYouTubeEmbed = loader?.name === "youtube", isVimeoEmbed = loader?.name === "vimeo", isEmbed = isYouTubeEmbed || isVimeoEmbed, isGoogleCast = loader?.name === "google-cast";
      const target = loader ? isGoogleCast ? this.kn() : isEmbed ? this.ln() : loader.mediaType() === "audio" ? this.mn() : this.an() : null;
      if (this.G !== target) {
        const parent = this.G?.parentElement ?? this;
        this.G?.remove();
        this.G = target;
        if (target)
          parent.prepend(target);
        if (isEmbed && target) {
          effect(() => {
            const { nativeControls, viewType } = this.a.$state, showNativeControls = nativeControls(), isAudioView = viewType() === "audio", showBlocker = showNativeControls && !isAudioView;
            if (showBlocker) {
              this.Xm = this.querySelector(".vds-blocker");
              if (!this.Xm) {
                this.Xm = document.createElement("div");
                this.Xm.classList.add("vds-blocker");
                target.after(this.Xm);
              }
            } else {
              this.Xm?.remove();
              this.Xm = null;
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
        this.Xm?.remove();
        this.Xm = null;
      }
      this.load(target);
    });
  }
  mn() {
    const audio = this.G instanceof HTMLAudioElement ? this.G : document.createElement("audio");
    setAttribute(audio, "preload", "none");
    setAttribute(audio, "aria-hidden", "true");
    const { controls, crossOrigin } = this.a.$state;
    effect(() => {
      setAttribute(audio, "controls", controls());
      setAttribute(audio, "crossorigin", crossOrigin());
    });
    return audio;
  }
  an() {
    const video = this.G instanceof HTMLVideoElement ? this.G : document.createElement("video");
    const { crossOrigin, poster, nativeControls } = this.a.$state, $controls = computed(() => nativeControls() ? "true" : null), $poster = computed(() => poster() && nativeControls() ? poster() : null);
    effect(() => {
      setAttribute(video, "controls", $controls());
      setAttribute(video, "crossorigin", crossOrigin());
      setAttribute(video, "poster", $poster());
    });
    return video;
  }
  ln() {
    const iframe = this.G instanceof HTMLIFrameElement ? this.G : document.createElement("iframe"), { nativeControls } = this.a.$state;
    effect(() => setAttribute(iframe, "tabindex", !nativeControls() ? -1 : null));
    return iframe;
  }
  kn() {
    if (this.G?.classList.contains("vds-google-cast")) {
      return this.G;
    }
    const container = document.createElement("div");
    container.classList.add("vds-google-cast");
    import('./vidstack-BY50sRPj.js').then(({ insertContent }) => {
      insertContent(container, this.a.$state);
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
