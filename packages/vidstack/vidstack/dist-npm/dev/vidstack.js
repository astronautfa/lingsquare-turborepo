export { AudioProviderLoader, AudioTrackList, DASHProviderLoader, FullscreenController, HLSProviderLoader, List, LocalMediaStorage, Logger, MEDIA_KEY_SHORTCUTS, MediaControls, MediaPlayer, MediaProvider, MediaRemoteControl, ScreenOrientationController, TextRenderers, TextTrackList, VideoProviderLoader, VideoQualityList, VimeoProviderLoader, YouTubeProviderLoader, canFullscreen, isAudioProvider, isDASHProvider, isGoogleCastProvider, isHLSProvider, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isVideoProvider, isVideoQualitySrc, isVimeoProvider, isYouTubeProvider, mediaState, softResetMediaState } from './chunks/vidstack-BYGViWgv.js';
export { mediaContext } from './chunks/vidstack-DQ4Fz5gz.js';
import { TextTrackSymbol } from './chunks/vidstack-C_Q-YmHq.js';
export { TextTrack, isTrackCaptionKind, parseJSONCaptionsFile } from './chunks/vidstack-C_Q-YmHq.js';
import { isString, listenEvent, DOMEvent, useState } from './chunks/vidstack-fG_Sx3Q9.js';
export { appendTriggerEvent, findTriggerEvent, hasTriggerEvent, isKeyboardClick, isKeyboardEvent, isPointerEvent, walkTriggerEventChain } from './chunks/vidstack-fG_Sx3Q9.js';
export { findActiveCue, isCueActive, watchActiveTextTrack, watchCueTextChange } from './chunks/vidstack-C_9SlM6s.js';
export { sortVideoQualities } from './chunks/vidstack-BOTZD4tC.js';
import { Thumbnail, Slider } from './chunks/vidstack-CHkmotlb.js';
export { ARIAKeyShortcuts, AirPlayButton, AudioRadioGroup, CaptionButton, CaptionsRadioGroup, DEFAULT_PLAYBACK_RATES, FullscreenButton, LiveButton, Menu, MenuButton, MenuItem, MenuItems, MenuPortal, MuteButton, PIPButton, PlayButton, QualityRadioGroup, SeekButton, SliderController, SliderPreview, SliderValue, SpeedRadioGroup, ThumbnailsLoader, Time, TimeSlider, VolumeSlider, formatSpokenTime, formatTime, menuPortalContext, sliderContext, sliderState, updateSliderPreviewPlacement } from './chunks/vidstack-CHkmotlb.js';
export { TimeRange, getTimeRangesEnd, getTimeRangesStart, normalizeTimeIntervals, updateTimeIntervals } from './chunks/vidstack-CLRUrTzh.js';
export { AudioGainRadioGroup, AudioGainSlider, Captions, ChaptersRadioGroup, Controls, ControlsGroup, DEFAULT_AUDIO_GAINS, Gesture, GoogleCastButton, MediaAnnouncer, QualitySlider, Radio, RadioGroup, SliderChapters, SliderVideo, SpeedSlider, ToggleButton, Tooltip, TooltipContent, TooltipTrigger } from './chunks/vidstack-h1mfdD-8.js';
export { Poster } from './chunks/vidstack-CG5C-V_W.js';
export { usePlyrLayoutClasses } from './chunks/vidstack-CrhQebqL.js';
export { getDownloadFile } from './chunks/vidstack-n2fuk8wF.js';
export { AUDIO_EXTENSIONS, AUDIO_TYPES, DASH_VIDEO_EXTENSIONS, DASH_VIDEO_TYPES, HLS_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, VIDEO_EXTENSIONS, VIDEO_TYPES, canChangeVolume, canGoogleCastSrc, canOrientScreen, canPlayHLSNatively, canRotateScreen, canUsePictureInPicture, canUseVideoPresentation, isAudioSrc, isDASHSrc, isHLSSrc, isMediaStream, isVideoSrc } from './chunks/vidstack-C7y2WK8R.js';
import './chunks/vidstack-sHzLCnVW.js';
import './chunks/vidstack-BYmCj-36.js';
import './chunks/vidstack-DbBJlz7I.js';
import './chunks/vidstack-DdUZGy1h.js';
import '@floating-ui/dom';
import './chunks/vidstack-Dihypf8P.js';
import './chunks/vidstack-DvBAQUpx.js';

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
    if (!video) return;
    this.loader().then(async (mod) => {
      this._instance = new mod.default({
        ...this.config,
        video,
        subUrl: this._track?.src || ""
      });
      listenEvent(this._instance, "ready", () => {
        const canvas = this._instance?._canvas;
        if (canvas) canvas.style.pointerEvents = "none";
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
