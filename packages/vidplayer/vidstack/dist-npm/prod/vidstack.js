import { G as GroupedLog } from './chunks/vidstack-DopyK5ml.js';
export { b as FONT_COLOR_OPTION, a as FONT_DEFAULTS, c as FONT_FAMILY_OPTION, e as FONT_OPACITY_OPTION, F as FONT_SIGNALS, d as FONT_SIZE_OPTION, f as FONT_TEXT_SHADOW_OPTION, L as List, m as mediaState, o as onFontReset, s as softResetMediaState } from './chunks/vidstack-DopyK5ml.js';
import { D as DOMEvent, i as isString, l as listenEvent, O as useState } from './chunks/vidstack-CBNXqr3M.js';
export { S as appendTriggerEvent, R as findTriggerEvent, P as hasTriggerEvent, B as isKeyboardClick, U as isKeyboardEvent, T as isPointerEvent, Q as walkTriggerEventChain } from './chunks/vidstack-CBNXqr3M.js';
import { T as Thumbnail, S as Slider } from './chunks/vidstack-Dv7HWUBr.js';
export { A as ARIAKeyShortcuts, Q as AirPlayButton, am as AudioGainRadioGroup, a8 as AudioGainSlider, r as AudioProviderLoader, ak as AudioRadioGroup, q as AudioTrackList, W as CaptionButton, as as Captions, an as CaptionsRadioGroup, aj as ChaptersRadioGroup, J as Controls, D as DASHProviderLoader, al as DEFAULT_AUDIO_GAINS, ao as DEFAULT_PLAYBACK_RATES, X as FullscreenButton, g as FullscreenController, ar as Gesture, R as GoogleCastButton, H as HLSProviderLoader, a0 as LiveButton, L as LocalMediaStorage, m as MEDIA_KEY_SHORTCUTS, I as MediaAnnouncer, l as MediaControls, d as MediaPlayer, c as MediaProvider, k as MediaRemoteControl, ad as Menu, M as MenuButton, ag as MenuItems, ae as MenuPortal, Z as MuteButton, _ as PIPButton, U as PlayButton, P as Poster, aq as QualityRadioGroup, aa as QualitySlider, ai as Radio, ah as RadioGroup, j as ScreenOrientationController, $ as SeekButton, ac as SliderChapters, a2 as SliderController, a5 as SliderPreview, a4 as SliderValue, a3 as SliderVideo, ap as SpeedRadioGroup, a9 as SpeedSlider, o as TextRenderers, p as TextTrackList, au as ThumbnailsLoader, at as Time, ab as TimeSlider, O as ToggleButton, K as Tooltip, N as TooltipContent, s as VideoProviderLoader, V as VideoQualityList, u as VimeoProviderLoader, a7 as VolumeSlider, Y as YouTubeProviderLoader, h as canFullscreen, e as formatSpokenTime, f as formatTime, v as isAudioProvider, y as isDASHProvider, C as isGoogleCastProvider, x as isHLSProvider, i as isHTMLAudioElement, b as isHTMLIFrameElement, E as isHTMLMediaElement, a as isHTMLVideoElement, w as isVideoProvider, n as isVideoQualitySrc, B as isVimeoProvider, z as isYouTubeProvider, af as menuPortalContext, G as sliderContext, a1 as sliderState, a6 as updateSliderPreviewPlacement } from './chunks/vidstack-Dv7HWUBr.js';
export { g as getDownloadFile } from './chunks/vidstack-BTmcG2zk.js';
export { T as TimeRange, b as getTimeRangesEnd, g as getTimeRangesStart } from './chunks/vidstack-C5IKOUzO.js';
export { m as mediaContext } from './chunks/vidstack-DoOTQiYD.js';
import { a as TextTrackSymbol } from './chunks/vidstack-THZVvA_p.js';
export { T as TextTrack, f as findActiveCue, b as isCueActive, i as isTrackCaptionKind, p as parseJSONCaptionsFile, w as watchActiveTextTrack, c as watchCueTextChange } from './chunks/vidstack-THZVvA_p.js';
export { s as sortVideoQualities } from './chunks/vidstack-CSaHpIQV.js';
export { u as updateFontCssVars } from './chunks/vidstack-MhieM_9o.js';
export { C as ControlsGroup, T as TooltipTrigger } from './chunks/vidstack-DtwleE_9.js';
export { M as MenuItem } from './chunks/vidstack-CysHdt3L.js';
export { u as usePlyrLayoutClasses } from './chunks/vidstack-DuqfpSxk.js';
export { A as AUDIO_EXTENSIONS, l as AUDIO_TYPES, D as DASH_VIDEO_EXTENSIONS, o as DASH_VIDEO_TYPES, H as HLS_VIDEO_EXTENSIONS, n as HLS_VIDEO_TYPES, V as VIDEO_EXTENSIONS, m as VIDEO_TYPES, e as canChangeVolume, d as canGoogleCastSrc, f as canOrientScreen, g as canPlayHLSNatively, k as canRotateScreen, h as canUsePictureInPicture, j as canUseVideoPresentation, i as isAudioSrc, q as isDASHSrc, p as isHLSSrc, r as isMediaStream, a as isVideoSrc } from './chunks/vidstack-DlGT_9qi.js';
import './chunks/vidstack-VrKElWm_.js';
import './chunks/vidstack-BSXZsAhp.js';
import './chunks/vidstack-BUqeBbTQ.js';
import './chunks/vidstack-ksPACRiU.js';

class Logger {
  constructor() {
    this.G = null;
  }
  error(...data) {
    return this.dispatch("error", ...data);
  }
  warn(...data) {
    return this.dispatch("warn", ...data);
  }
  info(...data) {
    return this.dispatch("info", ...data);
  }
  debug(...data) {
    return this.dispatch("debug", ...data);
  }
  errorGroup(title) {
    return new GroupedLog(this, "error", title);
  }
  warnGroup(title) {
    return new GroupedLog(this, "warn", title);
  }
  infoGroup(title) {
    return new GroupedLog(this, "info", title);
  }
  debugGroup(title) {
    return new GroupedLog(this, "debug", title);
  }
  setTarget(newTarget) {
    this.G = newTarget;
  }
  dispatch(level, ...data) {
    return this.G?.dispatchEvent(
      new DOMEvent("vds-log", {
        bubbles: true,
        composed: true,
        detail: { level, data }
      })
    ) || false;
  }
}

class LibASSTextRenderer {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
    this.priority = 1;
    this.d = null;
    this.J = null;
    this.Zf = /(ssa|ass)$/;
  }
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this.Zf.test(track.type) || this.Zf.test(track.src));
  }
  attach(video) {
    if (!video)
      return;
    this.loader().then(async (mod) => {
      this.d = new mod.default({
        ...this.config,
        video,
        subUrl: this.J?.src || ""
      });
      listenEvent(this.d, "ready", () => {
        const canvas = this.d?.Nm;
        if (canvas)
          canvas.style.pointerEvents = "none";
      });
      listenEvent(this.d, "error", (event) => {
        if (this.J) {
          this.J[TextTrackSymbol.ma] = 3;
          this.J.dispatchEvent(
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
      this._f();
    } else if (this.J !== track) {
      this.d?.setTrackByUrl(track.src);
      this.J = track;
    }
  }
  detach() {
    this._f();
  }
  _f() {
    this.d?.freeTrack();
    this.J = null;
  }
}

class SliderThumbnail extends Thumbnail {
  onAttach(el) {
    this.ia = useState(Slider.state);
  }
  uh() {
    const { duration, clipStartTime } = this.a.$state;
    return clipStartTime() + this.ia.pointerRate() * duration();
  }
}

export { LibASSTextRenderer, Logger, Slider, SliderThumbnail, Thumbnail };
