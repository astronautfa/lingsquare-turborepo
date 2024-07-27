import { onDispose, listenEvent, DOMEvent, scoped } from '../chunks/vidstack-fG_Sx3Q9.js';
import { canUsePictureInPicture, canUseVideoPresentation, canPlayHLSNatively } from '../chunks/vidstack-C7y2WK8R.js';
import { HTMLMediaProvider } from './vidstack-html.js';
import { HTMLAirPlayAdapter } from '../chunks/vidstack-C4-EsreN.js';
import { TextTrack, TextTrackSymbol } from '../chunks/vidstack-C_Q-YmHq.js';
import '../chunks/vidstack-B2NpDfPa.js';
import '../chunks/vidstack-Dihypf8P.js';
import '../chunks/vidstack-sHzLCnVW.js';
import '../chunks/vidstack-n2fuk8wF.js';
import '../chunks/vidstack-C_9SlM6s.js';

class NativeHLSTextTracks {
  constructor(_video, _ctx) {
    this._video = _video;
    this._ctx = _ctx;
    _video.textTracks.onaddtrack = this._onAddTrack.bind(this);
    onDispose(this._onDispose.bind(this));
  }
  _onAddTrack(event) {
    const nativeTrack = event.track;
    if (!nativeTrack || findTextTrackElement(this._video, nativeTrack)) return;
    const track = new TextTrack({
      id: nativeTrack.id,
      kind: nativeTrack.kind,
      label: nativeTrack.label ?? "",
      language: nativeTrack.language,
      type: "vtt"
    });
    track[TextTrackSymbol._native] = { track: nativeTrack };
    track[TextTrackSymbol._readyState] = 2;
    track[TextTrackSymbol._nativeHLS] = true;
    let lastIndex = 0;
    const onCueChange = (event2) => {
      if (!nativeTrack.cues) return;
      for (let i = lastIndex; i < nativeTrack.cues.length; i++) {
        track.addCue(nativeTrack.cues[i], event2);
        lastIndex++;
      }
    };
    onCueChange(event);
    nativeTrack.oncuechange = onCueChange;
    this._ctx.textTracks.add(track, event);
    track.setMode(nativeTrack.mode, event);
  }
  _onDispose() {
    this._video.textTracks.onaddtrack = null;
    for (const track of this._ctx.textTracks) {
      const nativeTrack = track[TextTrackSymbol._native]?.track;
      if (nativeTrack?.oncuechange) nativeTrack.oncuechange = null;
    }
  }
}
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}

class VideoPictureInPicture {
  constructor(_video, _media) {
    this._video = _video;
    this._media = _media;
    this._onChange = (active, event) => {
      this._media.delegate._notify("picture-in-picture-change", active, event);
    };
    listenEvent(this._video, "enterpictureinpicture", this._onEnter.bind(this));
    listenEvent(this._video, "leavepictureinpicture", this._onExit.bind(this));
  }
  get active() {
    return document.pictureInPictureElement === this._video;
  }
  get supported() {
    return canUsePictureInPicture(this._video);
  }
  async enter() {
    return this._video.requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
  _onEnter(event) {
    this._onChange(true, event);
  }
  _onExit(event) {
    this._onChange(false, event);
  }
}

class VideoPresentation {
  constructor(_video, _media) {
    this._video = _video;
    this._media = _media;
    this._mode = "inline";
    listenEvent(this._video, "webkitpresentationmodechanged", this._onModeChange.bind(this));
  }
  get _supported() {
    return canUseVideoPresentation(this._video);
  }
  async _setPresentationMode(mode) {
    if (this._mode === mode) return;
    this._video.webkitSetPresentationMode(mode);
  }
  _onModeChange(event) {
    const prevMode = this._mode;
    this._mode = this._video.webkitPresentationMode;
    {
      this._media.logger?.infoGroup("presentation mode change").labelledLog("Mode", this._mode).labelledLog("Event", event).dispatch();
    }
    this._media.player?.dispatch(
      new DOMEvent("video-presentation-change", {
        detail: this._mode,
        trigger: event
      })
    );
    ["fullscreen", "picture-in-picture"].forEach((type) => {
      if (this._mode === type || prevMode === type) {
        this._media.delegate._notify(`${type}-change`, this._mode === type, event);
      }
    });
  }
}
class FullscreenPresentationAdapter {
  constructor(_presentation) {
    this._presentation = _presentation;
  }
  get active() {
    return this._presentation._mode === "fullscreen";
  }
  get supported() {
    return this._presentation._supported;
  }
  async enter() {
    this._presentation._setPresentationMode("fullscreen");
  }
  async exit() {
    this._presentation._setPresentationMode("inline");
  }
}
class PIPPresentationAdapter {
  constructor(_presentation) {
    this._presentation = _presentation;
  }
  get active() {
    return this._presentation._mode === "picture-in-picture";
  }
  get supported() {
    return this._presentation._supported;
  }
  async enter() {
    this._presentation._setPresentationMode("picture-in-picture");
  }
  async exit() {
    this._presentation._setPresentationMode("inline");
  }
}

class VideoProvider extends HTMLMediaProvider {
  constructor(video, ctx) {
    super(video, ctx);
    this.$$PROVIDER_TYPE = "VIDEO";
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(video, ctx);
      if (canUseVideoPresentation(video)) {
        const presentation = new VideoPresentation(video, ctx);
        this.fullscreen = new FullscreenPresentationAdapter(presentation);
        this.pictureInPicture = new PIPPresentationAdapter(presentation);
      } else if (canUsePictureInPicture(video)) {
        this.pictureInPicture = new VideoPictureInPicture(video, ctx);
      }
    }, this.scope);
  }
  get type() {
    return "video";
  }
  setup() {
    super.setup();
    if (canPlayHLSNatively(this.video)) {
      new NativeHLSTextTracks(this.video, this._ctx);
    }
    this._ctx.textRenderers._attachVideo(this.video);
    onDispose(() => {
      this._ctx.textRenderers._attachVideo(null);
    });
    if (this.type === "video") this._ctx.delegate._notify("provider-setup", this);
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this._media;
  }
}

export { VideoProvider };
