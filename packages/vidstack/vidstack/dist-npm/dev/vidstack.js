import {
  AudioProviderLoader,
  AudioTrackList,
  DASHProviderLoader,
  FullscreenController,
  HLSProviderLoader,
  List,
  LocalMediaStorage,
  Logger,
  MEDIA_KEY_SHORTCUTS,
  MediaControls,
  MediaPlayer,
  MediaProvider,
  MediaRemoteControl,
  ScreenOrientationController,
  TextRenderers,
  TextTrackList,
  VideoProviderLoader,
  VideoQualityList,
  VimeoProviderLoader,
  YouTubeProviderLoader,
  canFullscreen,
  isAudioProvider,
  isDASHProvider,
  isGoogleCastProvider,
  isHLSProvider,
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLMediaElement,
  isHTMLVideoElement,
  isVideoProvider,
  isVideoQualitySrc,
  isVimeoProvider,
  isYouTubeProvider,
  mediaState,
  softResetMediaState
} from "./chunks/vidstack-E2U3KYYB.js";
import "./chunks/vidstack-LGEXOBZ2.js";
import "./chunks/vidstack-KISR27XC.js";
import {
  TimeRange,
  getTimeRangesEnd,
  getTimeRangesStart,
  normalizeTimeIntervals,
  updateTimeIntervals
} from "./chunks/vidstack-5A4DIYIL.js";
import {
  AudioGainRadioGroup,
  AudioGainSlider,
  Captions,
  ChaptersRadioGroup,
  Controls,
  ControlsGroup,
  DEFAULT_AUDIO_GAINS,
  Gesture,
  GoogleCastButton,
  MediaAnnouncer,
  QualitySlider,
  Radio,
  RadioGroup,
  SliderChapters,
  SliderVideo,
  SpeedSlider,
  ToggleButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "./chunks/vidstack-VL7WHI4N.js";
import {
  ARIAKeyShortcuts,
  AirPlayButton,
  AudioRadioGroup,
  CaptionButton,
  CaptionsRadioGroup,
  DEFAULT_PLAYBACK_RATES,
  FullscreenButton,
  LiveButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPortal,
  MuteButton,
  PIPButton,
  PlayButton,
  QualityRadioGroup,
  SeekButton,
  Slider,
  SliderController,
  SliderPreview,
  SliderValue,
  SpeedRadioGroup,
  Thumbnail,
  ThumbnailsLoader,
  Time,
  TimeSlider,
  VolumeSlider,
  formatSpokenTime,
  formatTime,
  menuPortalContext,
  sliderContext,
  sliderState,
  updateSliderPreviewPlacement
} from "./chunks/vidstack-JNPTXWVG.js";
import {
  Poster
} from "./chunks/vidstack-5LAIUSBE.js";
import "./chunks/vidstack-52ODY4LU.js";
import "./chunks/vidstack-S7KFX33M.js";
import "./chunks/vidstack-XCGTB4OT.js";
import {
  TextTrack,
  TextTrackSymbol,
  isTrackCaptionKind,
  parseJSONCaptionsFile
} from "./chunks/vidstack-LAEAMMDT.js";
import {
  usePlyrLayoutClasses
} from "./chunks/vidstack-GC5DHOAU.js";
import {
  sortVideoQualities
} from "./chunks/vidstack-O4GORAHB.js";
import {
  mediaContext
} from "./chunks/vidstack-CJ2P7QXN.js";
import "./chunks/vidstack-365DTKRX.js";
import {
  findActiveCue,
  isCueActive,
  watchActiveTextTrack,
  watchCueTextChange
} from "./chunks/vidstack-QXGC5JTS.js";
import "./chunks/vidstack-M63U4DIJ.js";
import {
  getDownloadFile
} from "./chunks/vidstack-7GP6O6LE.js";
import {
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  DASH_VIDEO_EXTENSIONS,
  DASH_VIDEO_TYPES,
  HLS_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  canChangeVolume,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayHLSNatively,
  canRotateScreen,
  canUsePictureInPicture,
  canUseVideoPresentation,
  isAudioSrc,
  isDASHSrc,
  isHLSSrc,
  isMediaStream,
  isVideoSrc
} from "./chunks/vidstack-6IDPYHAE.js";
import {
  DOMEvent,
  appendTriggerEvent,
  findTriggerEvent,
  hasTriggerEvent,
  isKeyboardClick,
  isKeyboardEvent,
  isPointerEvent,
  isString,
  listenEvent,
  useState,
  walkTriggerEventChain
} from "./chunks/vidstack-LVHOI4SR.js";

// src/core/tracks/text/render/libass-text-renderer.ts
var LibASSTextRenderer = class {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
  }
  priority = 1;
  #instance = null;
  #track = null;
  #typeRE = /(ssa|ass)$/;
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this.#typeRE.test(track.type) || this.#typeRE.test(track.src));
  }
  attach(video) {
    if (!video) return;
    this.loader().then(async (mod) => {
      this.#instance = new mod.default({
        ...this.config,
        video,
        subUrl: this.#track?.src || ""
      });
      listenEvent(this.#instance, "ready", () => {
        const canvas = this.#instance?._canvas;
        if (canvas) canvas.style.pointerEvents = "none";
      });
      listenEvent(this.#instance, "error", (event) => {
        if (this.#track) {
          this.#track[TextTrackSymbol.readyState] = 3;
          this.#track.dispatchEvent(
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
      this.#freeTrack();
    } else if (this.#track !== track) {
      this.#instance?.setTrackByUrl(track.src);
      this.#track = track;
    }
  }
  detach() {
    this.#freeTrack();
  }
  #freeTrack() {
    this.#instance?.freeTrack();
    this.#track = null;
  }
};

// src/components/ui/sliders/slider-thumbnail.ts
var SliderThumbnail = class extends Thumbnail {
  #slider;
  onAttach(el) {
    this.#slider = useState(Slider.state);
  }
  getTime() {
    const { duration, clipStartTime } = this.media.$state;
    return clipStartTime() + this.#slider.pointerRate() * duration();
  }
};

// src/index.ts
if (true) {
  console.warn("[vidstack] dev mode!");
}
export {
  ARIAKeyShortcuts,
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  AirPlayButton,
  AudioGainRadioGroup,
  AudioGainSlider,
  AudioProviderLoader,
  AudioRadioGroup,
  AudioTrackList,
  CaptionButton,
  Captions,
  CaptionsRadioGroup,
  ChaptersRadioGroup,
  Controls,
  ControlsGroup,
  DASHProviderLoader,
  DASH_VIDEO_EXTENSIONS,
  DASH_VIDEO_TYPES,
  DEFAULT_AUDIO_GAINS,
  DEFAULT_PLAYBACK_RATES,
  FullscreenButton,
  FullscreenController,
  Gesture,
  GoogleCastButton,
  HLSProviderLoader,
  HLS_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  LibASSTextRenderer,
  List,
  LiveButton,
  LocalMediaStorage,
  Logger,
  MEDIA_KEY_SHORTCUTS,
  MediaAnnouncer,
  MediaControls,
  MediaPlayer,
  MediaProvider,
  MediaRemoteControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPortal,
  MuteButton,
  PIPButton,
  PlayButton,
  Poster,
  QualityRadioGroup,
  QualitySlider,
  Radio,
  RadioGroup,
  ScreenOrientationController,
  SeekButton,
  Slider,
  SliderChapters,
  SliderController,
  SliderPreview,
  SliderThumbnail,
  SliderValue,
  SliderVideo,
  SpeedRadioGroup,
  SpeedSlider,
  TextRenderers,
  TextTrack,
  TextTrackList,
  Thumbnail,
  ThumbnailsLoader,
  Time,
  TimeRange,
  TimeSlider,
  ToggleButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  VideoProviderLoader,
  VideoQualityList,
  VimeoProviderLoader,
  VolumeSlider,
  YouTubeProviderLoader,
  appendTriggerEvent,
  canChangeVolume,
  canFullscreen,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayHLSNatively,
  canRotateScreen,
  canUsePictureInPicture,
  canUseVideoPresentation,
  findActiveCue,
  findTriggerEvent,
  formatSpokenTime,
  formatTime,
  getDownloadFile,
  getTimeRangesEnd,
  getTimeRangesStart,
  hasTriggerEvent,
  isAudioProvider,
  isAudioSrc,
  isCueActive,
  isDASHProvider,
  isDASHSrc,
  isGoogleCastProvider,
  isHLSProvider,
  isHLSSrc,
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLMediaElement,
  isHTMLVideoElement,
  isKeyboardClick,
  isKeyboardEvent,
  isMediaStream,
  isPointerEvent,
  isTrackCaptionKind,
  isVideoProvider,
  isVideoQualitySrc,
  isVideoSrc,
  isVimeoProvider,
  isYouTubeProvider,
  mediaContext,
  mediaState,
  menuPortalContext,
  normalizeTimeIntervals,
  parseJSONCaptionsFile,
  sliderContext,
  sliderState,
  softResetMediaState,
  sortVideoQualities,
  updateSliderPreviewPlacement,
  updateTimeIntervals,
  usePlyrLayoutClasses,
  walkTriggerEventChain,
  watchActiveTextTrack,
  watchCueTextChange
};
