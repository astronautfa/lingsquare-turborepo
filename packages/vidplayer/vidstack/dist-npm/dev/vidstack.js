import { T as Thumbnail, S as Slider } from './chunks/vidstack-Ga5LXVQf.js';
export { A as ARIAKeyShortcuts, R as AirPlayButton, an as AudioGainRadioGroup, a9 as AudioGainSlider, s as AudioProviderLoader, al as AudioRadioGroup, r as AudioTrackList, X as CaptionButton, at as Captions, ao as CaptionsRadioGroup, ak as ChaptersRadioGroup, K as Controls, D as DASHProviderLoader, am as DEFAULT_AUDIO_GAINS, ap as DEFAULT_PLAYBACK_RATES, Z as FullscreenButton, g as FullscreenController, as as Gesture, U as GoogleCastButton, H as HLSProviderLoader, a1 as LiveButton, m as LocalMediaStorage, L as Logger, n as MEDIA_KEY_SHORTCUTS, J as MediaAnnouncer, l as MediaControls, d as MediaPlayer, c as MediaProvider, k as MediaRemoteControl, ae as Menu, M as MenuButton, ah as MenuItems, af as MenuPortal, _ as MuteButton, $ as PIPButton, W as PlayButton, P as Poster, ar as QualityRadioGroup, ab as QualitySlider, aj as Radio, ai as RadioGroup, j as ScreenOrientationController, a0 as SeekButton, ad as SliderChapters, a3 as SliderController, a6 as SliderPreview, a5 as SliderValue, a4 as SliderVideo, aq as SpeedRadioGroup, aa as SpeedSlider, p as TextRenderers, q as TextTrackList, av as ThumbnailsLoader, au as Time, ac as TimeSlider, Q as ToggleButton, N as Tooltip, O as TooltipContent, u as VideoProviderLoader, V as VideoQualityList, v as VimeoProviderLoader, a8 as VolumeSlider, Y as YouTubeProviderLoader, h as canFullscreen, e as formatSpokenTime, f as formatTime, w as isAudioProvider, z as isDASHProvider, E as isGoogleCastProvider, y as isHLSProvider, i as isHTMLAudioElement, b as isHTMLIFrameElement, G as isHTMLMediaElement, a as isHTMLVideoElement, x as isVideoProvider, o as isVideoQualitySrc, C as isVimeoProvider, B as isYouTubeProvider, ag as menuPortalContext, I as sliderContext, a2 as sliderState, a7 as updateSliderPreviewPlacement } from './chunks/vidstack-Ga5LXVQf.js';
export { b as FONT_COLOR_OPTION, a as FONT_DEFAULTS, c as FONT_FAMILY_OPTION, e as FONT_OPACITY_OPTION, F as FONT_SIGNALS, d as FONT_SIZE_OPTION, f as FONT_TEXT_SHADOW_OPTION, L as List, m as mediaState, o as onFontReset, s as softResetMediaState } from './chunks/vidstack-BmzHu3v_.js';
export { g as getDownloadFile } from './chunks/vidstack-CkfyfBu0.js';
export { T as TimeRange, b as getTimeRangesEnd, g as getTimeRangesStart } from './chunks/vidstack-BNJih9gD.js';
export { m as mediaContext } from './chunks/vidstack-BuYg7N1V.js';
import { a as TextTrackSymbol } from './chunks/vidstack-DpIrri-f.js';
export { T as TextTrack, f as findActiveCue, b as isCueActive, i as isTrackCaptionKind, p as parseJSONCaptionsFile, w as watchActiveTextTrack, c as watchCueTextChange } from './chunks/vidstack-DpIrri-f.js';
import { i as isString, l as listenEvent, D as DOMEvent, O as useState } from './chunks/vidstack-ND4uzLKO.js';
export { S as appendTriggerEvent, R as findTriggerEvent, P as hasTriggerEvent, B as isKeyboardClick, U as isKeyboardEvent, T as isPointerEvent, Q as walkTriggerEventChain } from './chunks/vidstack-ND4uzLKO.js';
export { s as sortVideoQualities } from './chunks/vidstack-CSaHpIQV.js';
export { u as updateFontCssVars } from './chunks/vidstack-sLaeyx8c.js';
export { C as ControlsGroup, T as TooltipTrigger } from './chunks/vidstack-CdyrXrBE.js';
export { M as MenuItem } from './chunks/vidstack-DDJ8xFNz.js';
export { u as usePlyrLayoutClasses } from './chunks/vidstack-pWEcRV_H.js';
export { A as AUDIO_EXTENSIONS, l as AUDIO_TYPES, D as DASH_VIDEO_EXTENSIONS, o as DASH_VIDEO_TYPES, H as HLS_VIDEO_EXTENSIONS, n as HLS_VIDEO_TYPES, V as VIDEO_EXTENSIONS, m as VIDEO_TYPES, e as canChangeVolume, d as canGoogleCastSrc, f as canOrientScreen, g as canPlayHLSNatively, k as canRotateScreen, h as canUsePictureInPicture, j as canUseVideoPresentation, i as isAudioSrc, q as isDASHSrc, p as isHLSSrc, r as isMediaStream, a as isVideoSrc } from './chunks/vidstack-Ca9dj_1Q.js';
import './chunks/vidstack-CnaYRoc3.js';
import './chunks/vidstack-1gmLGa6x.js';
import './chunks/vidstack-DM_McBs5.js';
import './chunks/vidstack-ksPACRiU.js';

class LibASSTextRenderer {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
    this.priority = 1;
    this._instance = null;
    this._track = null;
    this._typeRE = /(ssa|ass)$/;
  }
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this._typeRE.test(track.type) || this._typeRE.test(track.src));
  }
  attach(video) {
    if (!video)
      return;
    this.loader().then(async (mod) => {
      this._instance = new mod.default({
        ...this.config,
        video,
        subUrl: this._track?.src || ""
      });
      listenEvent(this._instance, "ready", () => {
        const canvas = this._instance?._canvas;
        if (canvas)
          canvas.style.pointerEvents = "none";
      });
      listenEvent(this._instance, "error", (event) => {
        if (this._track) {
          this._track[TextTrackSymbol._readyState] = 3;
          this._track.dispatchEvent(
            new DOMEvent("error", {
              trigger: event,
              detail: event.error
            })
          );
        }
      });
    });
  }
  changeTrack(track) {
    if (!track || track.readyState === 3) {
      this._freeTrack();
    } else if (this._track !== track) {
      this._instance?.setTrackByUrl(track.src);
      this._track = track;
    }
  }
  detach() {
    this._freeTrack();
  }
  _freeTrack() {
    this._instance?.freeTrack();
    this._track = null;
  }
}

class SliderThumbnail extends Thumbnail {
  onAttach(el) {
    this._slider = useState(Slider.state);
  }
  _getTime() {
    const { duration, clipStartTime } = this._media.$state;
    return clipStartTime() + this._slider.pointerRate() * duration();
  }
}

{
  console.warn("[vidstack] dev mode!");
}

export { LibASSTextRenderer, Slider, SliderThumbnail, Thumbnail };
