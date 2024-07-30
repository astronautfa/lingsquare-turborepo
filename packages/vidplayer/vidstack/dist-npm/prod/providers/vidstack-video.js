import { r as onDispose, l as listenEvent, D as DOMEvent, e as scoped } from '../chunks/vidstack-CBNXqr3M.js';
import { h as canUsePictureInPicture, j as canUseVideoPresentation, g as canPlayHLSNatively } from '../chunks/vidstack-DlGT_9qi.js';
import { HTMLMediaProvider } from './vidstack-html.js';
import { H as HTMLAirPlayAdapter } from '../chunks/vidstack-DHaZtYX6.js';
import { T as TextTrack, a as TextTrackSymbol } from '../chunks/vidstack-THZVvA_p.js';
import '../chunks/vidstack-D5KHQxGY.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-VrKElWm_.js';
import '../chunks/vidstack-BTmcG2zk.js';

class NativeHLSTextTracks {
  constructor(_video, _ctx) {
    this.m = _video;
    this.b = _ctx;
    _video.textTracks.onaddtrack = this.Yd.bind(this);
    onDispose(this.ce.bind(this));
  }
  Yd(event) {
    const nativeTrack = event.track;
    if (!nativeTrack || findTextTrackElement(this.m, nativeTrack))
      return;
    const track = new TextTrack({
      id: nativeTrack.id,
      kind: nativeTrack.kind,
      label: nativeTrack.label ?? "",
      language: nativeTrack.language,
      type: "vtt"
    });
    track[TextTrackSymbol._] = { track: nativeTrack };
    track[TextTrackSymbol.ma] = 2;
    track[TextTrackSymbol.Mf] = true;
    let lastIndex = 0;
    const onCueChange = (event2) => {
      if (!nativeTrack.cues)
        return;
      for (let i = lastIndex; i < nativeTrack.cues.length; i++) {
        track.addCue(nativeTrack.cues[i], event2);
        lastIndex++;
      }
    };
    onCueChange(event);
    nativeTrack.oncuechange = onCueChange;
    this.b.textTracks.add(track, event);
    track.setMode(nativeTrack.mode, event);
  }
  ce() {
    this.m.textTracks.onaddtrack = null;
    for (const track of this.b.textTracks) {
      const nativeTrack = track[TextTrackSymbol._]?.track;
      if (nativeTrack?.oncuechange)
        nativeTrack.oncuechange = null;
    }
  }
}
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}

class VideoPictureInPicture {
  constructor(_video, _media) {
    this.m = _video;
    this.a = _media;
    this.E = (active, event) => {
      this.a.delegate.c("picture-in-picture-change", active, event);
    };
    listenEvent(this.m, "enterpictureinpicture", this.Gi.bind(this));
    listenEvent(this.m, "leavepictureinpicture", this.Hi.bind(this));
  }
  get active() {
    return document.pictureInPictureElement === this.m;
  }
  get supported() {
    return canUsePictureInPicture(this.m);
  }
  async enter() {
    return this.m.requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
  Gi(event) {
    this.E(true, event);
  }
  Hi(event) {
    this.E(false, event);
  }
}

class VideoPresentation {
  constructor(_video, _media) {
    this.m = _video;
    this.a = _media;
    this.U = "inline";
    listenEvent(this.m, "webkitpresentationmodechanged", this.hb.bind(this));
  }
  get pb() {
    return canUseVideoPresentation(this.m);
  }
  async fd(mode) {
    if (this.U === mode)
      return;
    this.m.webkitSetPresentationMode(mode);
  }
  hb(event) {
    const prevMode = this.U;
    this.U = this.m.webkitPresentationMode;
    this.a.player?.dispatch(
      new DOMEvent("video-presentation-change", {
        detail: this.U,
        trigger: event
      })
    );
    ["fullscreen", "picture-in-picture"].forEach((type) => {
      if (this.U === type || prevMode === type) {
        this.a.delegate.c(`${type}-change`, this.U === type, event);
      }
    });
  }
}
class FullscreenPresentationAdapter {
  constructor(_presentation) {
    this.Oa = _presentation;
  }
  get active() {
    return this.Oa.U === "fullscreen";
  }
  get supported() {
    return this.Oa.pb;
  }
  async enter() {
    this.Oa.fd("fullscreen");
  }
  async exit() {
    this.Oa.fd("inline");
  }
}
class PIPPresentationAdapter {
  constructor(_presentation) {
    this.Oa = _presentation;
  }
  get active() {
    return this.Oa.U === "picture-in-picture";
  }
  get supported() {
    return this.Oa.pb;
  }
  async enter() {
    this.Oa.fd("picture-in-picture");
  }
  async exit() {
    this.Oa.fd("inline");
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
      new NativeHLSTextTracks(this.video, this.b);
    }
    this.b.textRenderers.Xf(this.video);
    onDispose(() => {
      this.b.textRenderers.Xf(null);
    });
    if (this.type === "video")
      this.b.delegate.c("provider-setup", this);
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this.a;
  }
}

export { VideoProvider };
