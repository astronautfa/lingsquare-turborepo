/// <reference path="./dom.d.ts" />
/// <reference path="./google-cast.d.ts" />

import { m as MediaProviderLoader, A as AudioProvider, S as Src, n as MediaType, o as MediaContext, G as GoogleCastProvider, p as GoogleCastLoadedEvent, q as GoogleCastOptions, V as VideoProvider, r as DASHProvider, H as HLSProvider, s as VimeoProvider, Y as YouTubeProvider, t as Thumbnail, u as SliderOrientation, v as TextRenderer, w as TextTrack, x as TextTrackList, y as VideoQuality, z as MediaKeyShortcuts, B as DefaultLayoutTranslations } from './types/vidstack-CB8Klup7.js';
export { fY as AirPlayButton, fX as AirPlayButtonEvents, fW as AirPlayButtonProps, cX as AnyMediaProvider, hQ as AudioGainRadioGroup, hT as AudioGainRadioGroupChangeEvent, hS as AudioGainRadioGroupEvents, hR as AudioGainRadioGroupProps, gR as AudioGainSlider, gV as AudioGainSliderCSSVars, gU as AudioGainSliderEvents, gS as AudioGainSliderProps, gT as AudioGainSliderState, bW as AudioMimeType, hK as AudioRadioGroup, hO as AudioRadioGroupChangeEvent, hM as AudioRadioGroupEvents, hL as AudioRadioGroupProps, hN as AudioRadioOption, bV as AudioSrc, bX as AudioSrcMeta, cF as AudioTrack, cI as AudioTrackAddEvent, cK as AudioTrackChangeEvent, cE as AudioTrackList, cH as AudioTrackListEvent, cG as AudioTrackListEvents, cJ as AudioTrackRemoveEvent, g5 as CaptionButton, g4 as CaptionButtonEvents, g3 as CaptionButtonProps, ih as Captions, ig as CaptionsProps, hU as CaptionsRadioGroup, hY as CaptionsRadioGroupChangeEvent, hW as CaptionsRadioGroupEvents, hV as CaptionsRadioGroupProps, hX as CaptionsRadioOption, cL as ChangeAudioTrackEventDetail, hG as ChapterRadioGroupProps, hF as ChaptersRadioGroup, hI as ChaptersRadioGroupChangeEvent, hH as ChaptersRadioGroupEvents, hJ as ChaptersRadioOption, fH as Controls, fK as ControlsChangeEvent, fJ as ControlsEvents, fL as ControlsGroup, fI as ControlsProps, ff as DASHAdaptationSetRemovedNoCapabilitiesEvent, eL as DASHAllTextTracksAddedEvent, ed as DASHAstInFutureEvent, ee as DASHBaseUrlsUpdatedEvent, ei as DASHBufferLevelUpdatedEvent, eg as DASHBufferLoadedEvent, ef as DASHBufferStalledEvent, eh as DASHBufferStateChangedEvent, eU as DASHCanPlayEvent, eV as DASHCanPlayThroughEvent, eT as DASHCaptionContainerResizeEvent, eS as DASHCaptionRenderedEvent, fd as DASHConformanceViolationEvent, fk as DASHConstructor, fl as DASHConstructorLoader, fg as DASHContentSteeringRequestCompletedEvent, eN as DASHCueEnterEvent, eO as DASHCueExitEvent, ej as DASHDvbFontDownloadAddedEvent, ek as DASHDvbFontDownloadCompleteEvent, el as DASHDvbFontDownloadFailedEvent, em as DASHDynamicToStaticEvent, en as DASHErrorEvent, fc as DASHEventModeOnReceiveEvent, fb as DASHEventModeOnStartEvent, er as DASHFragmentLoadingAbandonedEvent, eo as DASHFragmentLoadingCompletedEvent, ep as DASHFragmentLoadingProgressEvent, eq as DASHFragmentLoadingStartedEvent, fh as DASHInbandPrftEvent, fp as DASHInstanceCallback, eb as DASHInstanceEvent, ea as DASHLibLoadErrorEvent, e8 as DASHLibLoadStartEvent, e9 as DASHLibLoadedEvent, fo as DASHLibrary, es as DASHLogEvent, fj as DASHManagedMediaSourceEndStreamingEvent, fi as DASHManagedMediaSourceStartStreamingEvent, ev as DASHManifestLoadedEvent, eu as DASHManifestLoadingFinishedEvent, et as DASHManifestLoadingStartedEvent, fa as DASHManifestValidityChangedEvent, e7 as DASHMediaEvent, ey as DASHMetricAddedEvent, ex as DASHMetricChangedEvent, ez as DASHMetricUpdatedEvent, ew as DASHMetricsChangedEvent, c2 as DASHMimeType, fm as DASHNamespace, fn as DASHNamespaceLoader, eB as DASHPeriodSwitchCompletedEvent, eA as DASHPeriodSwitchStartedEvent, eW as DASHPlaybackEndedEvent, eX as DASHPlaybackErrorEvent, e_ as DASHPlaybackLoadedDataEvent, eZ as DASHPlaybackMetaDataLoadedEvent, eY as DASHPlaybackNotAllowedEvent, e$ as DASHPlaybackPausedEvent, f0 as DASHPlaybackPlayingEvent, f1 as DASHPlaybackProgressEvent, f2 as DASHPlaybackRateChangedEvent, f3 as DASHPlaybackSeekedEvent, f4 as DASHPlaybackSeekingEvent, f5 as DASHPlaybackStalledEvent, f6 as DASHPlaybackStartedEvent, f7 as DASHPlaybackTimeUpdatedEvent, f8 as DASHPlaybackVolumeChangedEvent, f9 as DASHPlaybackWaitingEvent, e6 as DASHProviderEvents, eD as DASHQualityChangeRenderedEvent, eC as DASHQualityChangeRequestedEvent, fe as DASHRepresentationSwitchEvent, c1 as DASHSrc, eH as DASHStreamActivatedEvent, eI as DASHStreamDeactivatedEvent, eJ as DASHStreamInitializedEvent, eF as DASHStreamInitializingEvent, eK as DASHStreamTeardownCompleteEvent, eG as DASHStreamUpdatedEvent, eM as DASHTextTrackAddedEvent, eP as DASHThroughputMeasurementStoredEvent, eE as DASHTrackChangeRenderedEvent, eQ as DASHTtmlParsedEvent, eR as DASHTtmlToParseEvent, ec as DASHUnsupportedEvent, hP as DEFAULT_AUDIO_GAINS, hZ as DEFAULT_PLAYBACK_RATES, D as DefaultLayoutProps, fs as DefaultLayoutWord, F as FileDownloadInfo, ce as FindMediaPlayerEvent, cd as FindMediaPlayerEventDetail, Z as FullscreenAdapter, g8 as FullscreenButton, g7 as FullscreenButtonEvents, g6 as FullscreenButtonProps, $ as FullscreenChangeEvent, W as FullscreenController, a0 as FullscreenErrorEvent, _ as FullscreenEvents, i7 as Gesture, ia as GestureAction, ic as GestureEvent, i9 as GestureEventType, ib as GestureEvents, i8 as GestureProps, ie as GestureTriggerEvent, id as GestureWillTriggerEvent, f$ as GoogleCastButton, f_ as GoogleCastButtonEvents, fZ as GoogleCastButtonProps, c$ as GoogleCastEvent, c_ as GoogleCastEvents, d0 as GoogleCastLoadStartEvent, d2 as GoogleCastPromptError, d3 as GoogleCastPromptErrorCode, d4 as GoogleCastPromptErrorEvent, d1 as GoogleCastPromptEvent, dD as HLSAudioTrackLoadedEvent, dC as HLSAudioTrackLoadingEvent, dB as HLSAudioTrackSwitchedEvent, dA as HLSAudioTrackSwitchingEvent, dz as HLSAudioTracksUpdatedEvent, e1 as HLSBackBufferReachedEvent, dk as HLSBufferAppendedEvent, dj as HLSBufferAppendingEvent, dh as HLSBufferCodecsEvent, di as HLSBufferCreatedEvent, dl as HLSBufferEosEvent, dn as HLSBufferFlushedEvent, dm as HLSBufferFlushingEvent, dg as HLSBufferResetEvent, e2 as HLSConstructor, e3 as HLSConstructorLoader, dK as HLSCuesParsedEvent, d_ as HLSDestroyingEvent, dZ as HLSErrorEvent, dX as HLSFpsDropEvent, dY as HLSFpsDropLevelCappingEvent, dV as HLSFragBufferedDataEvent, dW as HLSFragChangedEvent, dQ as HLSFragDecryptedEvent, dO as HLSFragLoadEmergencyAbortedEvent, dP as HLSFragLoadedEvent, dN as HLSFragLoadingEvent, dU as HLSFragParsedEvent, dR as HLSFragParsingInitSegmentEvent, dT as HLSFragParsingMetadataEvent, dS as HLSFragParsingUserdataEvent, dM as HLSInitPtsFoundEvent, e5 as HLSInstanceCallback, da as HLSInstanceEvent, e0 as HLSKeyLoadedEvent, d$ as HLSKeyLoadingEvent, dv as HLSLevelLoadedEvent, du as HLSLevelLoadingEvent, dx as HLSLevelPtsUpdatedEvent, dt as HLSLevelSwitchedEvent, ds as HLSLevelSwitchingEvent, dw as HLSLevelUpdatedEvent, dy as HLSLevelsUpdatedEvent, d9 as HLSLibLoadErrorEvent, d7 as HLSLibLoadStartEvent, d8 as HLSLibLoadedEvent, e4 as HLSLibrary, dq as HLSManifestLoadedEvent, dp as HLSManifestLoadingEvent, dr as HLSManifestParsedEvent, dd as HLSMediaAttachedEvent, dc as HLSMediaAttachingEvent, df as HLSMediaDetachedEvent, de as HLSMediaDetachingEvent, d6 as HLSMediaEvent, c0 as HLSMimeType, dL as HLSNonNativeTextTracksFoundEvent, d5 as HLSProviderEvents, b$ as HLSSrc, dJ as HLSSubtitleFragProcessedEvent, dI as HLSSubtitleTrackLoadedEvent, dH as HLSSubtitleTrackLoadingEvent, dG as HLSSubtitleTrackSwitchEvent, dF as HLSSubtitleTracksClearedEvent, dE as HLSSubtitleTracksUpdatedEvent, db as HLSUnsupportedEvent, bU as HTMLMediaSrc, N as List, Q as ListAddEvent, O as ListEvents, K as ListItem, U as ListReadonlyChangeEvent, R as ListRemoveEvent, gk as LiveButton, gj as LiveButtonEvents, gi as LiveButtonProps, ag as LocalMediaStorage, a3 as LogEvent, a2 as LogEventDetail, C as Logger, a1 as LoggerEvents, aj as MediaAbortEvent, bg as MediaAirPlayRequestEvent, fB as MediaAnnouncer, fE as MediaAnnouncerEvents, fC as MediaAnnouncerProps, fD as MediaAnnouncerState, fG as MediaAnnouncerTranslations, fF as MediaAnnouncerWord, av as MediaAudioGainChangeEvent, bw as MediaAudioGainChangeRequestEvent, al as MediaAudioTrackChangeEvent, bm as MediaAudioTrackChangeRequestEvent, ak as MediaAudioTracksChangeEvent, am as MediaAutoPlayChangeEvent, aq as MediaAutoPlayEvent, ap as MediaAutoPlayEventDetail, ao as MediaAutoPlayFailEvent, an as MediaAutoPlayFailEventDetail, ar as MediaCanLoadEvent, as as MediaCanLoadPosterEvent, at as MediaCanPlayDetail, j as MediaCanPlayEvent, au as MediaCanPlayThroughEvent, ae as MediaControls, g as MediaControlsChangeEvent, bL as MediaCrossOrigin, az as MediaDestroyEvent, aA as MediaDurationChangeEvent, aB as MediaEmptiedEvent, aC as MediaEndEvent, aD as MediaEndedEvent, bn as MediaEnterFullscreenRequestEvent, bp as MediaEnterPIPRequestEvent, bQ as MediaErrorCode, bR as MediaErrorDetail, aE as MediaErrorEvent, ai as MediaEvent, e as MediaEvents, bo as MediaExitFullscreenRequestEvent, bq as MediaExitPIPRequestEvent, cZ as MediaFullscreenAdapter, h as MediaFullscreenChangeEvent, aF as MediaFullscreenErrorEvent, bl as MediaFullscreenRequestTarget, br as MediaGoogleCastRequestEvent, bF as MediaHidePosterRequestEvent, cV as MediaKeyShortcut, cU as MediaKeyTarget, cW as MediaKeysCallback, aJ as MediaLiveChangeEvent, aK as MediaLiveEdgeChangeEvent, bs as MediaLiveEdgeRequestEvent, aL as MediaLoadStartEvent, aG as MediaLoadedDataEvent, aH as MediaLoadedMetadataEvent, bO as MediaLoadingStrategy, aI as MediaLoopChangeEvent, bG as MediaLoopRequestEvent, bj as MediaMuteRequestEvent, b6 as MediaOrientationChangeEvent, bI as MediaOrientationLockRequestEvent, bJ as MediaOrientationUnlockRequestEvent, aY as MediaPIPChangeEvent, aZ as MediaPIPErrorEvent, bD as MediaPauseControlsRequestEvent, aN as MediaPauseEvent, bx as MediaPauseRequestEvent, aO as MediaPlayEvent, aP as MediaPlayFailEvent, bt as MediaPlayRequestEvent, fx as MediaPlayer, cc as MediaPlayerConnectEvent, ac as MediaPlayerEvents, M as MediaPlayerProps, cb as MediaPlayerQuery, b as MediaPlayerState, aQ as MediaPlayingEvent, aR as MediaPlaysInlineChangeEvent, aS as MediaPosterChangeEvent, bP as MediaPosterLoadingStrategy, bh as MediaPosterStartLoadingRequestEvent, aU as MediaProgressEvent, aT as MediaProgressEventDetail, fA as MediaProvider, cY as MediaProviderAdapter, aW as MediaProviderChangeEvent, aV as MediaProviderLoaderChangeEvent, fy as MediaProviderProps, aX as MediaProviderSetupEvent, fz as MediaProviderState, a_ as MediaQualitiesChangeEvent, a$ as MediaQualityChangeEvent, bu as MediaQualityChangeRequestEvent, i as MediaRateChangeEvent, bv as MediaRateChangeRequestEvent, ad as MediaRemoteControl, ax as MediaRemotePlaybackChangeEvent, aw as MediaRemotePlaybackChangeEventDetail, b7 as MediaReplayEvent, bf as MediaRequestEvents, bC as MediaResumeControlsRequestEvent, by as MediaSeekRequestEvent, b0 as MediaSeekedEvent, b1 as MediaSeekingEvent, bz as MediaSeekingRequestEvent, bE as MediaShowPosterRequestEvent, ay as MediaSourceChangeEvent, b2 as MediaSourcesChangeEvent, bS as MediaSrc, bT as MediaSrcObject, b3 as MediaStalledEvent, bA as MediaStartLoadingRequestEvent, b4 as MediaStartedEvent, ca as MediaState, ab as MediaStateAccessors, af as MediaStorage, c8 as MediaStore, bK as MediaStreamType, ba as MediaStreamTypeChangeEvent, b5 as MediaSuspendEvent, f as MediaTextTrackChangeEvent, bi as MediaTextTrackChangeRequestEvent, bb as MediaTextTracksChangeEvent, k as MediaTimeUpdateEvent, b8 as MediaTimeUpdateEventDetail, b9 as MediaTitleChangeEvent, aM as MediaTypeChangeEvent, bk as MediaUnmuteRequestEvent, cf as MediaUserEvents, bH as MediaUserLoopChangeRequestEvent, c as MediaViewType, bc as MediaViewTypeChangeEvent, bd as MediaVolumeChange, l as MediaVolumeChangeEvent, bB as MediaVolumeChangeRequestEvent, be as MediaWaitingEvent, hc as Menu, hh as MenuButton, hj as MenuButtonEvents, hi as MenuButtonProps, hk as MenuButtonSelectEvent, hg as MenuCloseEvent, he as MenuEvents, hl as MenuItem, hq as MenuItems, hu as MenuItemsProps, hf as MenuOpenEvent, hr as MenuPlacement, ht as MenuPlacementAlign, hs as MenuPlacementSide, hm as MenuPortal, ho as MenuPortalContext, hn as MenuPortalProps, hd as MenuProps, gb as MuteButton, ga as MuteButtonEvents, g9 as MuteButtonProps, iv as MuxThumbnailStoryboard, iw as MuxThumbnailTile, ge as PIPButton, gd as PIPButtonEvents, gc as PIPButtonProps, g2 as PlayButton, g1 as PlayButtonEvents, g0 as PlayButtonProps, d as PlayerSrc, c9 as PlayerStore, fu as PlyrControl, P as PlyrLayoutProps, a as PlyrLayoutTranslations, fv as PlyrLayoutWord, ft as PlyrMarker, ik as Poster, ii as PosterProps, ij as PosterState, i2 as QualityRadioGroup, i6 as QualityRadioGroupChangeEvent, i5 as QualityRadioGroupEvents, i3 as QualityRadioGroupProps, i4 as QualityRadioOption, g$ as QualitySlider, h3 as QualitySliderCSSVars, h2 as QualitySliderEvents, h0 as QualitySliderProps, h1 as QualitySliderState, hz as Radio, hC as RadioChangeEvent, hB as RadioEvents, hv as RadioGroup, hy as RadioGroupChangeEvent, hx as RadioGroupEvents, hw as RadioGroupProps, hE as RadioOption, hA as RadioProps, hD as RadioSelectEvent, bN as RemotePlaybackInfo, bM as RemotePlaybackType, a7 as ScreenOrientationChangeEvent, a6 as ScreenOrientationChangeEventDetail, a4 as ScreenOrientationController, a5 as ScreenOrientationEvents, a9 as ScreenOrientationLockType, a8 as ScreenOrientationType, gh as SeekButton, gg as SeekButtonEvents, gf as SeekButtonProps, ah as SerializedVideoQuality, gw as Slider, gs as SliderCSSVars, h9 as SliderChapters, hb as SliderChaptersCSSVars, ha as SliderChaptersProps, gz as SliderController, gA as SliderControllerProps, gy as SliderDelegate, go as SliderDragEndEvent, gn as SliderDragStartEvent, gq as SliderDragValueChangeEvent, gm as SliderEvent, gl as SliderEvents, gr as SliderPointerValueChangeEvent, gJ as SliderPreview, gL as SliderPreviewProps, gx as SliderProps, gv as SliderState, gu as SliderStore, gH as SliderValue, gp as SliderValueChangeEvent, gI as SliderValueProps, gB as SliderVideo, gF as SliderVideoCanPlayEvent, gG as SliderVideoErrorEvent, gE as SliderVideoEvents, gC as SliderVideoProps, gD as SliderVideoState, h_ as SpeedRadioGroup, i1 as SpeedRadioGroupChangeEvent, i0 as SpeedRadioGroupEvents, h$ as SpeedRadioGroupProps, gW as SpeedSlider, g_ as SpeedSliderCSSVars, gZ as SpeedSliderEvents, gX as SpeedSliderProps, gY as SpeedSliderState, cj as TextRenderers, ct as TextTrackAddCueEvent, cB as TextTrackAddEvent, cv as TextTrackCueChangeEvent, cs as TextTrackErrorEvent, cp as TextTrackEvent, co as TextTrackEvents, T as TextTrackInit, cA as TextTrackListEvent, cz as TextTrackListEvents, cD as TextTrackListModeChangeEvent, cr as TextTrackLoadEvent, cq as TextTrackLoadStartEvent, cw as TextTrackModeChangeEvent, ck as TextTrackReadyState, cu as TextTrackRemoveCueEvent, cC as TextTrackRemoveEvent, iz as ThumbnailCoords, iy as ThumbnailImage, ix as ThumbnailImageInit, ip as ThumbnailProps, is as ThumbnailSrc, iq as ThumbnailState, it as ThumbnailStoryboard, iu as ThumbnailTile, ir as ThumbnailsLoader, il as Time, im as TimeProps, cg as TimeRange, h4 as TimeSlider, h5 as TimeSliderCSSVars, h8 as TimeSliderEvents, h6 as TimeSliderProps, h7 as TimeSliderState, io as TimeState, fV as ToggleButton, fU as ToggleButtonProps, fM as Tooltip, fP as TooltipContent, fT as TooltipContentProps, fQ as TooltipPlacement, fS as TooltipPlacementAlign, fR as TooltipPlacementSide, fN as TooltipProps, fO as TooltipTrigger, cn as VTTContent, cl as VTTCueInit, cm as VTTRegionInit, bZ as VideoMimeType, fr as VideoPresentationChangeEvent, fq as VideoPresentationEvents, cP as VideoQualityAddEvent, cT as VideoQualityAutoChangeEvent, cR as VideoQualityChangeEvent, cS as VideoQualityChangeEventDetail, cM as VideoQualityList, cO as VideoQualityListEvent, cN as VideoQualityListEvents, cQ as VideoQualityRemoveEvent, bY as VideoSrc, b_ as VideoSrcMeta, c4 as VimeoSrc, gM as VolumeSlider, gQ as VolumeSliderCSSVars, gP as VolumeSliderEvents, gN as VolumeSliderProps, gO as VolumeSliderState, c3 as YouTubeSrc, X as canFullscreen, J as formatSpokenTime, I as formatTime, E as getDownloadFile, ci as getTimeRangesEnd, ch as getTimeRangesStart, cx as isTrackCaptionKind, c5 as isVideoQualitySrc, aa as mediaContext, c6 as mediaState, hp as menuPortalContext, cy as parseJSONCaptionsFile, gt as sliderState, c7 as softResetMediaState, gK as updateSliderPreviewPlacement, fw as usePlyrLayoutClasses } from './types/vidstack-CB8Klup7.js';
import { R as ReadSignal, W as WriteSignal, C as Context, E as EventsTarget, D as Dispose, V as ViewController } from './types/vidstack-r3TSzzgs.js';
export { a as appendTriggerEvent, f as findTriggerEvent, h as hasTriggerEvent, b as isKeyboardClick, c as isKeyboardEvent, i as isPointerEvent, w as walkTriggerEventChain } from './types/vidstack-r3TSzzgs.js';
import { VTTCue } from 'media-captions';
import 'dashjs';
import 'hls.js';

declare class AudioProviderLoader implements MediaProviderLoader<AudioProvider> {
    readonly name = "audio";
    target: HTMLAudioElement;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<AudioProvider>;
}

declare class GoogleCastLoader implements MediaProviderLoader<GoogleCastProvider> {
    readonly name = "google-cast";
    target: HTMLElement;
    protected _player?: cast.framework.RemotePlayer;
    /**
     * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
     */
    get cast(): cast.framework.CastContext;
    mediaType(): MediaType;
    canPlay(src: Src): boolean;
    prompt(ctx: MediaContext): Promise<void>;
    load(ctx: MediaContext): Promise<GoogleCastProvider>;
    protected _loadCastFramework(ctx: MediaContext): Promise<GoogleCastLoadedEvent | undefined>;
    protected _showPrompt(options: GoogleCastOptions): Promise<void>;
    protected _setOptions(options?: GoogleCastOptions): void;
    protected _notifyRemoteStateChange(ctx: MediaContext, state: RemotePlaybackState, trigger?: Event): void;
    private _createError;
}

declare class VideoProviderLoader implements MediaProviderLoader<VideoProvider> {
    readonly name: string;
    target: HTMLVideoElement;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VideoProvider>;
}

declare class DASHProviderLoader extends VideoProviderLoader implements MediaProviderLoader<DASHProvider> {
    static supported: boolean;
    readonly name = "dash";
    canPlay(src: Src): boolean;
    load(context: any): Promise<DASHProvider>;
}

declare class HLSProviderLoader extends VideoProviderLoader implements MediaProviderLoader<HLSProvider> {
    static supported: boolean;
    readonly name = "hls";
    canPlay(src: Src): boolean;
    load(context: any): Promise<HLSProvider>;
}

declare class VimeoProviderLoader implements MediaProviderLoader<VimeoProvider> {
    readonly name = "vimeo";
    target: HTMLIFrameElement;
    preconnect(): void;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VimeoProvider>;
    loadPoster(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}

declare class YouTubeProviderLoader implements MediaProviderLoader<YouTubeProvider> {
    readonly name = "youtube";
    target: HTMLIFrameElement;
    preconnect(): void;
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<YouTubeProvider>;
    loadPoster(src: Src, ctx: MediaContext, abort: AbortController): Promise<string | null>;
}

/** @see {@link https://www.vidstack.io/docs/player/providers/audio} */
declare function isAudioProvider(provider: any): provider is AudioProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/video} */
declare function isVideoProvider(provider: any): provider is VideoProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/hls} */
declare function isHLSProvider(provider: any): provider is HLSProvider;
declare function isDASHProvider(provider: any): provider is DASHProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/youtube} */
declare function isYouTubeProvider(provider: any): provider is YouTubeProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/vimeo} */
declare function isVimeoProvider(provider: any): provider is VimeoProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/google-cast} */
declare function isGoogleCastProvider(provider: any): provider is GoogleCastProvider;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement} */
declare function isHTMLAudioElement(element: unknown): element is HTMLAudioElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement} */
declare function isHTMLVideoElement(element: unknown): element is HTMLVideoElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement} */
declare function isHTMLMediaElement(element: unknown): element is HTMLMediaElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement} */
declare function isHTMLIFrameElement(element: unknown): element is HTMLIFrameElement;

/**
 * Used to display preview thumbnails when the user is hovering or dragging the time slider.
 * The time ranges in the WebVTT file will automatically be matched based on the current slider
 * pointer position.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-thumbnail}
 */
declare class SliderThumbnail extends Thumbnail {
    private _slider;
    protected onAttach(el: HTMLElement): void;
    protected _getTime(): number;
}

interface SliderContext {
    _disabled: ReadSignal<boolean>;
    _orientation: ReadSignal<SliderOrientation>;
    _preview: WriteSignal<HTMLElement | null>;
}
declare const sliderContext: Context<SliderContext>;

declare class LibASSTextRenderer implements TextRenderer {
    readonly loader: LibASSModuleLoader;
    config?: LibASSConfig | undefined;
    readonly priority = 1;
    private _instance;
    private _track;
    private _typeRE;
    constructor(loader: LibASSModuleLoader, config?: LibASSConfig | undefined);
    canRender(track: TextTrack, video: HTMLVideoElement | null): boolean;
    attach(video: HTMLVideoElement | null): void;
    changeTrack(track: TextTrack | null): void;
    detach(): void;
    private _freeTrack;
}
interface LibASSModuleLoader {
    (): Promise<{
        default: LibASSConstructor;
    }>;
}
interface LibASSConstructor {
    new (config?: {
        video: HTMLVideoElement;
        canvas?: HTMLCanvasElement;
        subUrl?: string;
    } & LibASSConfig): LibASSInstance;
}
interface LibASSInstance extends EventsTarget<LibASSInstanceEvents> {
    _video: HTMLVideoElement;
    _canvas: HTMLVideoElement | null;
    setTrackByUrl(url: string): void;
    setCurrentTime(time: number): void;
    freeTrack(): void;
    destroy(): void;
}
interface LibASSInstanceEvents {
    ready: LibASSReadyEvent;
    error: LibASSErrorEvent;
}
interface LibASSReadyEvent extends Event {
}
interface LibASSErrorEvent extends ErrorEvent {
}
/**
 * @see {@link https://github.com/ThaUnknown/jassub/tree/main#options}
 */
interface LibASSConfig {
    /**
     * Which image blending mode to use. WASM will perform better on lower end devices, JS will
     * perform better if the device and browser supports hardware acceleration.
     *
     * @defaultValue "js"
     */
    blendMode?: 'js' | 'wasm';
    /**
     * Whether or not to use async rendering, which offloads the CPU by creating image bitmaps on
     * the GPU.
     *
     * @defaultValue true
     */
    asyncRender?: boolean;
    /**
     * Whether or not to render things fully on the worker, greatly reduces CPU usage.
     *
     * @defaultValue true
     */
    offscreenRender?: boolean;
    /**
     * Whether or not to render subtitles as the video player renders frames, rather than predicting
     * which frame the player is on using events.
     *
     * @defaultValue true
     */
    onDemandRender?: boolean;
    /**
     * Target FPS to render subtitles at. Ignored when onDemandRender is enabled.
     *
     * @defaultValue 24
     */
    targetFps?: number;
    /**
     * Subtitle time offset in seconds.
     *
     * @defaultValue 0
     */
    timeOffset?: number;
    /**
     * Whether or not to print debug information.
     *
     * @defaultValue false
     */
    debug?: boolean;
    /**
     * Scale down (< 1.0) the subtitles canvas to improve performance at the expense of quality, or
     * scale it up (> 1.0).
     *
     * @defaultValue 1.0
     */
    prescaleFactor?: number;
    /**
     * The height in pixels beyond which the subtitles canvas won't be pre-scaled.
     *
     * @defaultValue 1080
     */
    prescaleHeightLimit?: number;
    /**
     * The maximum rendering height in pixels of the subtitles canvas. Beyond this subtitles will
     * be up-scaled by the browser.
     *
     * @defaultValue 0
     */
    maxRenderHeight?: number;
    /**
     * Attempt to discard all animated tags. Enabling this may severely mangle complex subtitles
     * and should only be considered as an last ditch effort of uncertain success for hardware
     * otherwise incapable of displaying anything. Will not reliably work with manually edited or
     * allocated events.
     *
     * @defaultValue false
     */
    dropAllAnimations?: boolean;
    /**
     * The URL of the worker.
     *
     * @defaultValue "jassub-worker.js"
     */
    workerUrl?: string;
    /**
     * The URL of the legacy worker. Only loaded if the browser doesn't support WASM.
     *
     * @defaultValue "jassub-worker-legacy.js"
     */
    legacyWorkerUrl?: string;
    /**
     * The URL of the subtitle file to play.
     *
     */
    subUrl?: string;
    /**
     * The content of the subtitle file to play.
     *
     */
    subContent?: string;
    /**
     * An array of links or `Uint8Array` to the fonts used in the subtitle. If `Uint8Array` is used
     * the array is copied, not referenced. This forces all the fonts in this array to be loaded
     * by the renderer, regardless of if they are used.
     *
     */
    fonts?: string[] | Uint8Array[];
    /**
     * Object with all available fonts. Key is font family in lower case, value is link or
     * `Uint8Array`. These fonts are selectively loaded if detected as used in the current
     * subtitle track.
     *
     * @defaultValue {'liberation sans': './default.woff2'}}
     */
    availableFonts?: Record<string, string>;
    /**
     * The font family key of the fallback font in `availableFonts` to use if the other font
     * for the style is missing special glyphs or unicode.
     *
     * @defaultValue "liberation sans"
     */
    fallbackFont?: string;
    /**
     * If the Local Font Access API is enabled `[chrome://flags/#font-access]`, the library will
     * query for permissions to use local fonts and use them if any are missing. The permission can
     * be queried beforehand using `navigator.permissions.request({ name: 'local-fonts' })`.
     *
     * @defaultValue true
     */
    useLocalFonts?: boolean;
    /**
     * libass bitmap cache memory limit in MiB (approximate).
     */
    libassMemoryLimit?: number;
    /**
     * libass glyph cache memory limit in MiB (approximate).
     */
    libassGlyphLimit?: number;
}

declare function findActiveCue(cues: readonly VTTCue[], time: number): VTTCue | null;
declare function isCueActive(cue: VTTCue, time: number): boolean;
declare function watchActiveTextTrack(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], onChange: (track: TextTrack | null) => void): Dispose;
declare function watchCueTextChange(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], callback: (title: string) => void): void;

declare function sortVideoQualities(qualities: VideoQuality[], desc?: boolean): VideoQuality[];

declare const MEDIA_KEY_SHORTCUTS: MediaKeyShortcuts;

declare class ARIAKeyShortcuts extends ViewController {
    private _shortcut;
    constructor(_shortcut: string);
    protected onAttach(el: HTMLElement): void;
}

declare const FONT_COLOR_OPTION: FontOption;
declare const FONT_FAMILY_OPTION: FontOption;
declare const FONT_SIZE_OPTION: FontSliderOption;
declare const FONT_OPACITY_OPTION: FontSliderOption;
declare const FONT_TEXT_SHADOW_OPTION: FontOption;
declare const FONT_DEFAULTS: {
    readonly fontFamily: "pro-sans";
    readonly fontSize: "100%";
    readonly textColor: "#ffffff";
    readonly textOpacity: "100%";
    readonly textShadow: "none";
    readonly textBg: "#000000";
    readonly textBgOpacity: "100%";
    readonly displayBg: "#000000";
    readonly displayBgOpacity: "0%";
};
declare const FONT_SIGNALS: Record<"fontFamily" | "fontSize" | "textShadow" | "textColor" | "textOpacity" | "textBg" | "textBgOpacity" | "displayBg" | "displayBgOpacity", WriteSignal<string>>;
type FontSignal = keyof typeof FONT_DEFAULTS;
declare function onFontReset(): void;
interface FontRadioOption {
    type: 'radio';
    values: string[] | Record<string, string>;
}
interface FontSliderOption {
    type: 'slider';
    min: number;
    max: number;
    step: number;
    upIcon: unknown;
    downIcon: unknown;
}
interface FontColorOption {
    type: 'color';
}
type FontOption = FontRadioOption | FontSliderOption | FontColorOption;
interface DefaultFontSettingProps {
    label: keyof DefaultLayoutTranslations;
    type: FontSignal;
    option: FontOption;
}

declare function updateFontCssVars(): void;

declare const AUDIO_EXTENSIONS: RegExp;
declare const AUDIO_TYPES: Set<string>;
declare const VIDEO_EXTENSIONS: RegExp;
declare const VIDEO_TYPES: Set<string>;
declare const HLS_VIDEO_EXTENSIONS: RegExp;
declare const DASH_VIDEO_EXTENSIONS: RegExp;
declare const HLS_VIDEO_TYPES: Set<string>;
declare const DASH_VIDEO_TYPES: Set<string>;
declare function isAudioSrc({ src, type }: Src): boolean;
declare function isVideoSrc(src: Src): boolean;
declare function isHLSSrc({ src, type }: Src): boolean;
declare function isDASHSrc({ src, type }: Src): boolean;
declare function canGoogleCastSrc(src: Src): boolean;
declare function isMediaStream(src: unknown): src is MediaStream;

/**
 * Checks if the ScreenOrientation API is available.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
declare function canOrientScreen(): boolean;
/**
 * Checks if the screen orientation can be changed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
declare function canRotateScreen(): boolean;
/**
 * Checks if the native HTML5 video player can play HLS.
 */
declare function canPlayHLSNatively(video?: HTMLVideoElement | null): boolean;
/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the Chrome browser.
 *
 * @see {@link https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture}
 */
declare function canUsePictureInPicture(video: HTMLVideoElement | null): boolean;
/**
 * Checks if the native HTML5 video player can use the presentation API in Safari.
 *
 * @see {@link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode}
 */
declare function canUseVideoPresentation(video: HTMLVideoElement | null): boolean;
declare function canChangeVolume(): Promise<boolean>;

export { ARIAKeyShortcuts, AUDIO_EXTENSIONS, AUDIO_TYPES, AudioProvider, AudioProviderLoader, DASHProvider, DASHProviderLoader, DASH_VIDEO_EXTENSIONS, DASH_VIDEO_TYPES, type DefaultFontSettingProps, DefaultLayoutTranslations, FONT_COLOR_OPTION, FONT_DEFAULTS, FONT_FAMILY_OPTION, FONT_OPACITY_OPTION, FONT_SIGNALS, FONT_SIZE_OPTION, FONT_TEXT_SHADOW_OPTION, type FontColorOption, type FontOption, type FontRadioOption, type FontSignal, type FontSliderOption, GoogleCastLoadedEvent, GoogleCastLoader, GoogleCastProvider, HLSProvider, HLSProviderLoader, HLS_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, type LibASSConfig, type LibASSConstructor, type LibASSErrorEvent, type LibASSInstance, type LibASSInstanceEvents, type LibASSModuleLoader, type LibASSReadyEvent, LibASSTextRenderer, MEDIA_KEY_SHORTCUTS, MediaContext, MediaKeyShortcuts, MediaProviderLoader, MediaType, type SliderContext, SliderOrientation, SliderThumbnail, Src, TextRenderer, TextTrack, TextTrackList, Thumbnail, VIDEO_EXTENSIONS, VIDEO_TYPES, VideoProvider, VideoProviderLoader, VideoQuality, VimeoProvider, VimeoProviderLoader, YouTubeProvider, YouTubeProviderLoader, canChangeVolume, canGoogleCastSrc, canOrientScreen, canPlayHLSNatively, canRotateScreen, canUsePictureInPicture, canUseVideoPresentation, findActiveCue, isAudioProvider, isAudioSrc, isCueActive, isDASHProvider, isDASHSrc, isGoogleCastProvider, isHLSProvider, isHLSSrc, isHTMLAudioElement, isHTMLIFrameElement, isHTMLMediaElement, isHTMLVideoElement, isMediaStream, isVideoProvider, isVideoSrc, isVimeoProvider, isYouTubeProvider, onFontReset, sliderContext, sortVideoQualities, updateFontCssVars, watchActiveTextTrack, watchCueTextChange };
