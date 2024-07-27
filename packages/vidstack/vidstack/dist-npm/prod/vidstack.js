import { GroupedLog } from './chunks/vidstack-D6Aq2zVp.js';
export { AudioProviderLoader, AudioTrackList, DASHProviderLoader, FullscreenController, HLSProviderLoader, List, LocalMediaStorage, MEDIA_KEY_SHORTCUTS, MediaControls, MediaPlayer, MediaProvider, MediaRemoteControl, ScreenOrientationController, TextRenderers, TextTrackList, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, YouTubeProviderLoader, canFullscreen, isAudioProvider, isDASHProvider, isGoogleCastProvider, isHLSProvider, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isVideoProvider, isVideoQualitySrc, isVimeoProvider, isYouTubeProvider, mediaState, softResetMediaState } from './chunks/vidstack-D6Aq2zVp.js';
import { DOMEvent, isString, listenEvent, useState } from './chunks/vidstack-C6myozhB.js';
export { appendTriggerEvent, findTriggerEvent, hasTriggerEvent, isKeyboardClick, isKeyboardEvent, isPointerEvent, walkTriggerEventChain } from './chunks/vidstack-C6myozhB.js';
export { mediaContext } from './chunks/vidstack-Cq-GdDcp.js';
import { TextTrackSymbol } from './chunks/vidstack-B97tQYIP.js';
export { TextTrack, isTrackCaptionKind, parseJSONCaptionsFile } from './chunks/vidstack-B97tQYIP.js';
export { findActiveCue, isCueActive, watchActiveTextTrack, watchCueTextChange } from './chunks/vidstack-D2w309v1.js';
export { sortVideoQualities } from './chunks/vidstack-BOTZD4tC.js';
import { Thumbnail, Slider } from './chunks/vidstack-DVw4uMVF.js';
export { ARIAKeyShortcuts, AirPlayButton, AudioRadioGroup, CaptionButton, CaptionsRadioGroup, DEFAULT_PLAYBACK_RATES, FullscreenButton, LiveButton, Menu, MenuButton, MenuItem, MenuItems, MenuPortal, MuteButton, PIPButton, PlayButton, QualityRadioGroup, SeekButton, SliderController, SliderPreview, SliderValue, SpeedRadioGroup, ThumbnailsLoader, Time, TimeSlider, VolumeSlider, formatSpokenTime, formatTime, menuPortalContext, sliderContext, sliderState, updateSliderPreviewPlacement } from './chunks/vidstack-DVw4uMVF.js';
export { TimeRange, getTimeRangesEnd, getTimeRangesStart, normalizeTimeIntervals, updateTimeIntervals } from './chunks/vidstack-Dy-iOvF5.js';
export { AudioGainRadioGroup, AudioGainSlider, Captions, ChaptersRadioGroup, Controls, ControlsGroup, DEFAULT_AUDIO_GAINS, Gesture, GoogleCastButton, MediaAnnouncer, QualitySlider, Radio, RadioGroup, SliderChapters, SliderVideo, SpeedSlider, ToggleButton, Tooltip, TooltipContent, TooltipTrigger } from './chunks/vidstack-izWupyUY.js';
export { Poster } from './chunks/vidstack-CIkLfpg6.js';
export { usePlyrLayoutClasses } from './chunks/vidstack-YHpR-fLm.js';
export { getDownloadFile } from './chunks/vidstack-Vi2h5MrZ.js';
export { AUDIO_EXTENSIONS, AUDIO_TYPES, DASH_VIDEO_EXTENSIONS, DASH_VIDEO_TYPES, HLS_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, VIDEO_EXTENSIONS, VIDEO_TYPES, canChangeVolume, canGoogleCastSrc, canOrientScreen, canPlayHLSNatively, canRotateScreen, canUsePictureInPicture, canUseVideoPresentation, isAudioSrc, isDASHSrc, isHLSSrc, isMediaStream, isVideoSrc } from './chunks/vidstack-B9TAFm_g.js';
import './chunks/vidstack-BoSiLpaP.js';
import './chunks/vidstack-DH8xaM_3.js';
import './chunks/vidstack-C9vIqaYT.js';
import './chunks/vidstack-BeyDmEgV.js';
import '@floating-ui/dom';
import './chunks/vidstack-Dihypf8P.js';
import './chunks/vidstack-D6_zYTXL.js';

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
    if (!video) return;
    this.loader().then(async (mod) => {
      this.d = new mod.default({
        ...this.config,
        video,
        subUrl: this.J?.src || ""
      });
      listenEvent(this.d, "ready", () => {
        const canvas = this.d?.Nm;
        if (canvas) canvas.style.pointerEvents = "none";
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
