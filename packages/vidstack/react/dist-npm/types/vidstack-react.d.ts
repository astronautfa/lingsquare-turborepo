import { h as ReactElementProps, i as ReactProps, A as AnyRecord, S as State, e as Component, W as WriteSignal, p as DisposalBin, c as Scope, a as DeferredPromise, I as InferEventDetail } from './vidstack-framework.js';
import { M as MediaPlayer$1, a as MediaProvider$1, b as MediaAnnouncer$1, C as Controls, c as ControlsGroup, T as ToggleButton$1, d as CaptionButton$1, F as FullscreenButton$1, L as LiveButton$1, e as MuteButton$1, P as PIPButton$1, f as PlayButton$1, A as AirPlayButton$1, G as GoogleCastButton$1, S as SeekButton$1, g as Tooltip, h as TooltipTrigger, i as TooltipContent, j as Slider, k as TimeSlider, V as VolumeSlider, l as AudioGainSlider, m as SpeedSlider, Q as QualitySlider, n as SliderThumbnail, o as SliderValue, p as SliderVideo, q as SliderPreview, r as SliderChapters, s as Menu, t as MenuButton, u as MenuItems, v as MenuItem, w as MenuPortal, R as RadioGroup, x as Radio, y as Captions$1, z as Gesture$1, B as Poster$1, D as Thumbnail$1, E as Time$1, H as PlayerSrc$1, I as MediaProviderLoader, J as VTTContent, K as MediaContext, N as MediaProviderAdapter, O as MediaRemoteControl, U as MediaState, W as ThumbnailSrc, X as MediaCrossOrigin, Y as ThumbnailImage, Z as SliderState, _ as SliderOrientation, $ as TextTrack, a0 as TextTrackInit, a1 as AudioTrack, a2 as VideoQuality, a3 as FileDownloadInfo, a4 as MediaPlayerQuery, a5 as DefaultLayoutTranslations, a6 as TooltipPlacement, a8 as PlyrControl, a9 as PlyrMarker, aa as PlyrLayoutTranslations, ab as PlyrLayoutWord, cB as Src, cp as MediaType, cY as TimeRange, aR as MediaEvents } from './vidstack.js';
import * as React from 'react';
import { CaptionsFileFormat, CaptionsParserFactory, VTTCue } from 'media-captions';
import { PlayableMediaTag, TimelineContextValue, SetTimelineContextValue, SetMediaVolumeContextValue } from 'remotion';

declare class MediaPlayerInstance extends MediaPlayer$1 {
}
declare class MediaProviderInstance extends MediaProvider$1 {
}
declare class MediaAnnouncerInstance extends MediaAnnouncer$1 {
}
declare class ControlsInstance extends Controls {
}
declare class ControlsGroupInstance extends ControlsGroup {
}
declare class ToggleButtonInstance extends ToggleButton$1 {
}
declare class CaptionButtonInstance extends CaptionButton$1 {
}
declare class FullscreenButtonInstance extends FullscreenButton$1 {
}
declare class LiveButtonInstance extends LiveButton$1 {
}
declare class MuteButtonInstance extends MuteButton$1 {
}
declare class PIPButtonInstance extends PIPButton$1 {
}
declare class PlayButtonInstance extends PlayButton$1 {
}
declare class AirPlayButtonInstance extends AirPlayButton$1 {
}
declare class GoogleCastButtonInstance extends GoogleCastButton$1 {
}
declare class SeekButtonInstance extends SeekButton$1 {
}
declare class TooltipInstance extends Tooltip {
}
declare class TooltipTriggerInstance extends TooltipTrigger {
}
declare class TooltipContentInstance extends TooltipContent {
}
declare class SliderInstance extends Slider {
}
declare class TimeSliderInstance extends TimeSlider {
}
declare class VolumeSliderInstance extends VolumeSlider {
}
declare class AudioGainSliderInstance extends AudioGainSlider {
}
declare class SpeedSliderInstance extends SpeedSlider {
}
declare class QualitySliderInstance extends QualitySlider {
}
declare class SliderThumbnailInstance extends SliderThumbnail {
}
declare class SliderValueInstance extends SliderValue {
}
declare class SliderVideoInstance extends SliderVideo {
}
declare class SliderPreviewInstance extends SliderPreview {
}
declare class SliderChaptersInstance extends SliderChapters {
}
declare class MenuInstance extends Menu {
}
declare class MenuButtonInstance extends MenuButton {
}
declare class MenuItemsInstance extends MenuItems {
}
declare class MenuItemInstance extends MenuItem {
}
declare class MenuPortalInstance extends MenuPortal {
}
declare class RadioGroupInstance extends RadioGroup {
}
declare class RadioInstance extends Radio {
}
declare class CaptionsInstance extends Captions$1 {
}
declare class GestureInstance extends Gesture$1 {
}
declare class PosterInstance extends Poster$1 {
}
declare class ThumbnailInstance extends Thumbnail$1 {
}
declare class TimeInstance extends Time$1 {
}

interface RemotionSrc<InputProps extends RemotionInputProps = RemotionInputProps> {
    /** React component which is generally a Remotion video. */
    src: React.ComponentType;
    /** Remotion source type. */
    type: 'video/remotion';
    /**
     * Pass props to the component that you have specified using the component prop.
     */
    inputProps?: InputProps;
    /**
     * The width of the composition.
     *
     * @defaultValue 1920
     */
    compositionWidth?: number;
    /**
     * The height of the composition.
     *
     * @defaultValue 1080
     */
    compositionHeight?: number;
    /**
     * The frame rate of the video per second.
     *
     * @defaultValue 30
     */
    fps?: number;
    /**
     * The duration of the video in frames. Must be an integer and greater than 0.
     */
    durationInFrames: number;
    /**
     * Start the playback from a specific frame.
     *
     * @defaultValue 0
     */
    initialFrame?: number;
    /**
     * Limit playback to only play after a certain frame. The video will start from this frame and
     * move to this position once it has ended. Must be an integer, not smaller than 0, not bigger
     * than `outFrame` and not bigger than `durationInFrames - 1`.
     *
     * @defaultValue 0
     */
    inFrame?: number | null;
    /**
     * Limit playback to only play before a certain frame. The video will end at this frame
     * and move to the beginning once it has ended. Must be an integer, not smaller than 1, not
     * smaller than `inFrame` and not bigger than `durationInFrames`.
     *
     * @defaultValue `durationInFrames`
     */
    outFrame?: number;
    /**
     * If you use an `<Audio />` tag, it might not play in some browsers (specifically iOS Safari)
     * due to browser autoplay policies. This is why the player pre-mounts a set of audio tags with
     * silent audio that get played upon user interaction. These audio tags can then be used to play
     * real audio later and will not be subject to the autoplay policy of the browser.
     *
     * This option controls how many audio tags are being rendered, the default is 5. If you mount
     * more audio tags than shared audio tags are available, then an error will be thrown.
     *
     * If you'd like to opt out of this behavior, you can pass 0 to mount native audio tags
     * simultaneously as you mount Remotion's <Audio /> tags.
     *
     * @defaultValue 5
     */
    numberOfSharedAudioTags?: number;
    /**
     * A callback function that allows you to return a custom UI that gets displayed while the
     * provider is loading.
     */
    renderLoading?: RemotionLoadingRenderer;
    /**
     * A callback for rendering a custom error message.
     */
    errorFallback?: RemotionErrorRenderer;
    /**
     * Called when an error or uncaught exception has happened in the video.
     */
    onError?(error: Error): void;
}
interface RemotionInputProps extends Record<string, unknown> {
}
interface RemotionLoadingRenderer {
    (): React.ReactNode;
}
interface RemotionErrorRenderer {
    (error: Error): React.ReactNode;
}

type PlayerSrc = PlayerSrc$1 | RemotionSrc;

interface MediaPlayerProps extends Omit<ReactElementProps<MediaPlayerInstance>, 'src'> {
    /**
     * The URL or object of the current media resource/s to be considered for playback.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#sources}
     */
    src?: PlayerSrc;
    aspectRatio?: string;
    asChild?: boolean;
    children: React.ReactNode;
    ref?: React.Ref<MediaPlayerInstance>;
}
/**
 * All media components exist inside the `<MediaPlayer>` component. This component's main
 * responsibilities are to manage media state updates, dispatch media events, handle media
 * requests, and expose media state through HTML attributes and CSS properties for styling
 * purposes.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/player}
 * @example
 * ```tsx
 * <MediaPlayer src="...">
 *   <MediaProvider />
 * </MediaPlayer>
 * ```
 */
declare const MediaPlayer: React.ForwardRefExoticComponent<Omit<MediaPlayerProps, "ref"> & React.RefAttributes<MediaPlayerInstance>>;

interface MediaAnnouncerProps extends ReactElementProps<MediaAnnouncerInstance> {
    ref?: React.Ref<HTMLElement>;
}
/**
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/announcer}
 * @example
 * ```tsx
 * <MediaAnnouncer />
 * ```
 */
declare const MediaAnnouncer: React.ForwardRefExoticComponent<Omit<MediaAnnouncerProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface MediaProviderProps extends Omit<ReactElementProps<MediaProviderInstance>, 'loaders'> {
    loaders?: Array<{
        new (): MediaProviderLoader;
    }>;
    mediaProps?: React.HTMLAttributes<HTMLMediaElement>;
    children?: React.ReactNode;
    ref?: React.Ref<MediaProviderInstance>;
}
/**
 * Renders the current provider at this component location.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/provider}
 * @example
 * ```tsx
 * <MediaPlayer src="...">
 *   <MediaProvider />
 * </MediaPlayer>
 * ```
 */
declare const MediaProvider: React.ForwardRefExoticComponent<Omit<MediaProviderProps, "ref"> & React.RefAttributes<MediaProviderInstance>>;

interface IconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>, React.RefAttributes<SVGElement | SVGSVGElement> {
    /**
     * The horizontal (width) and vertical (height) length of the underlying `<svg>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height}
     */
    size?: number;
    part?: string;
    /** @internal */
    paths?: string;
}
interface IconComponent extends React.ForwardRefExoticComponent<IconProps> {
}
declare const Icon: IconComponent;

/**
 * Creates a new `TextTrack` object and adds it to the player.
 *
 * @see {@link https://www.vidstack.io/docs/player/api/text-tracks}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <Track
 *       src="english.vtt"
 *       kind="subtitles"
 *       label="English"
 *       lang="en-US"
 *       default
 *     />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare function Track$2({ lang, ...props }: TrackProps$2): null;
declare namespace Track$2 {
    var displayName: string;
}
interface TrackProps$2 {
    /**
     * A unique identifier.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/id}
     */
    readonly id?: string;
    /**
     * URL of the text track resource. This attribute must be specified and its URL value must have
     * the same origin as the document — unless the <audio> or <video> parent element of the track
     * element has a `crossorigin` attribute.
     */
    readonly src?: string;
    /**
     * Used to directly pass in text track file contents.
     */
    readonly content?: string | VTTContent;
    /**
     * The captions file format to be parsed or a custom parser factory (functions that returns a
     * captions parser). Supported types include: 'vtt', 'srt', 'ssa', 'ass', and 'json'.
     *
     * @defaultValue 'vtt'
     */
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    /**
     * The text encoding type to be used when decoding data bytes to text.
     *
     * @defaultValue 'utf-8'
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings}
     *
     */
    readonly encoding?: string;
    /**
     * Indicates that the track should be enabled unless the user's preferences indicate that
     * another track is more appropriate. This may only be used on one track element per media
     * element.
     *
     * @defaultValue false
     */
    readonly default?: boolean;
    /**
     * The kind of text track this object represents. This decides how the track will be handled
     * by the player.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind}
     */
    readonly kind: TextTrackKind;
    /**
     * A human-readable label for the text track. This will be displayed to the user.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/label}
     */
    readonly label?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly language?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese. This is a short alias for `language`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly lang?: TrackProps$2['language'];
    /**
     * React list key.
     */
    readonly key?: string;
}

interface RootProps$c extends ReactElementProps<ControlsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component creates a container for control groups.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls}
 * @example
 * ```tsx
 * <Controls.Root>
 *   <Controls.Group></Controls.Group>
 *   <Controls.Group></Controls.Group>
 * <Controls.Root>
 * ```
 */
declare const Root$c: React.ForwardRefExoticComponent<Omit<RootProps$c, "ref"> & React.RefAttributes<HTMLElement>>;
interface GroupProps extends ReactElementProps<ControlsGroupInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component creates a container for media controls.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls#group}
 * @example
 * ```tsx
 * <Controls.Root>
 *   <Controls.Group></Controls.Group>
 *   <Controls.Group></Controls.Group>
 * <Controls.Root>
 * ```
 */
declare const Group: React.ForwardRefExoticComponent<Omit<GroupProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const controls_d_Group: typeof Group;
type controls_d_GroupProps = GroupProps;
declare namespace controls_d {
  export { controls_d_Group as Group, type controls_d_GroupProps as GroupProps, Root$c as Root, type RootProps$c as RootProps };
}

interface RootProps$b extends ReactProps<TooltipInstance> {
    asChild?: boolean;
    children: React.ReactNode;
}
/**
 * A contextual text bubble that displays a description for an element that appears on pointer
 * hover or keyboard focus.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare function Root$b({ children, ...props }: RootProps$b): React.JSX.Element;
declare namespace Root$b {
    var displayName: string;
}
interface TriggerProps extends ReactElementProps<TooltipTriggerInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * Wraps the element that will trigger showing/hiding the tooltip on hover or keyboard focus. The
 * tooltip content is positioned relative to this element.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare const Trigger: React.ForwardRefExoticComponent<Omit<TriggerProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface ContentProps extends ReactElementProps<TooltipContentInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component contains the content that is visible when the tooltip trigger is interacted with.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare const Content: React.ForwardRefExoticComponent<Omit<ContentProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const tooltip_d_Content: typeof Content;
type tooltip_d_ContentProps = ContentProps;
declare const tooltip_d_Trigger: typeof Trigger;
type tooltip_d_TriggerProps = TriggerProps;
declare namespace tooltip_d {
  export { tooltip_d_Content as Content, type tooltip_d_ContentProps as ContentProps, Root$b as Root, type RootProps$b as RootProps, tooltip_d_Trigger as Trigger, type tooltip_d_TriggerProps as TriggerProps };
}

interface ToggleButtonProps extends ReactElementProps<ToggleButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A toggle button is a two-state button that can be either off (not pressed) or on (pressed).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/toggle-button}
 * @example
 * ```tsx
 * <ToggleButton aria-label="...">
 *   <OnIcon />
 *   <OffIcon />
 * </ToggleButton>
 * ```
 */
declare const ToggleButton: React.ForwardRefExoticComponent<Omit<ToggleButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface AirPlayButtonProps extends ReactElementProps<AirPlayButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for requesting to connect to Apple AirPlay.
 *
 * @see {@link https://www.apple.com/au/airplay}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/airplay-button}
 * @example
 * ```tsx
 * <AirPlayButton>
 *   <AirPlayIcon />
 * </AirPlayButton>
 * ```
 */
declare const AirPlayButton: React.ForwardRefExoticComponent<Omit<AirPlayButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface GoogleCastButtonProps extends ReactElementProps<GoogleCastButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for requesting Google Cast.
 *
 * @see {@link https://developers.google.com/cast/docs/overview}
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/google-cast-button}
 * @example
 * ```tsx
 * <GoogleCastButton>
 *   <ChromecastIcon />
 * </GoogleCastButton>
 * ```
 */
declare const GoogleCastButton: React.ForwardRefExoticComponent<Omit<GoogleCastButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface PlayButtonProps extends ReactElementProps<PlayButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/play-button}
 * @example
 * ```tsx
 * const isPaused = useMediaState('paused');
 *
 * <PlayButton>
 *   {isPaused ? <PlayIcon /> : <PauseIcon />}
 * </PlayButton>
 * ```
 */
declare const PlayButton: React.ForwardRefExoticComponent<Omit<PlayButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface CaptionButtonProps extends ReactElementProps<CaptionButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 * @example
 * ```tsx
 * const track = useMediaState('textTrack'),
 *   isOn = track && isTrackCaptionKind(track);
 *
 * <CaptionButton>
 *   {isOn ? <OnIcon /> : <OffIcon />}
 * </CaptionButton>
 * ```
 */
declare const CaptionButton: React.ForwardRefExoticComponent<Omit<CaptionButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface FullscreenButtonProps extends ReactElementProps<FullscreenButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the fullscreen mode of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/fullscreen-button}
 * @see {@link https://www.vidstack.io/docs/player/api/fullscreen}
 * @example
 * ```tsx
 * const isActive = useMediaState('fullscreen');
 *
 * <FullscreenButton>
 *   {!isActive ? <EnterIcon /> : <ExitIcon />}
 * </FullscreenButton>
 * ```
 */
declare const FullscreenButton: React.ForwardRefExoticComponent<Omit<FullscreenButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface MuteButtonProps extends ReactElementProps<MuteButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the muted state of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/mute-button}
 * @example
 * ```tsx
 * const volume = useMediaState('volume'),
 *   isMuted = useMediaState('muted');
 *
 * <MuteButton>
 *   {isMuted || volume == 0 ? (
 *     <MuteIcon />
 *   ) : volume < 0.5 ? (
 *     <VolumeLowIcon />
 *   ) : (
 *     <VolumeHighIcon />
 *   )}
 * </MuteButton>
 * ```
 */
declare const MuteButton: React.ForwardRefExoticComponent<Omit<MuteButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface PIPButtonProps extends ReactElementProps<PIPButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the picture-in-picture (PIP) mode of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/pip-button}
 * @see {@link https://www.vidstack.io/docs/player/api/picture-in-picture}
 * @example
 * ```tsx
 * const isActive = useMediaState('pictureInPicture');
 *
 * <PIPButton>
 *   {!isActive ? <EnterIcon /> : <ExitIcon />}
 * </PIPButton>
 * ```
 */
declare const PIPButton: React.ForwardRefExoticComponent<Omit<PIPButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface SeekButtonProps extends ReactElementProps<SeekButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for seeking the current media playback forwards or backwards by a specified amount.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/seek-button}
 * @example
 * ```tsx
 * <SeekButton seconds={-10}>
 *   <SeekBackwardIcon />
 * </SeekButton>
 *
 * <SeekButton seconds={10}>
 *   <SeekForwardIcon />
 * </SeekButton>
 * ```
 */
declare const SeekButton: React.ForwardRefExoticComponent<Omit<SeekButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface LiveButtonProps extends ReactElementProps<LiveButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * This component displays the current live status of the stream. This includes whether it's
 * live, at the live edge, or not live. In addition, this component is a button during live streams
 * and will skip ahead to the live edge when pressed.
 *
 * 🚨 This component will have `aria-hidden="true"` applied when the current stream is _not_
 * live.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/live-button}
 * @example
 * ```tsx
 * <LiveButton>
 *   <LiveIcon />
 * </LiveButton>
 * ```
 */
declare const LiveButton: React.ForwardRefExoticComponent<Omit<LiveButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

type PrimitivePropsWithRef<E extends React.ElementType> = Omit<React.ComponentProps<E>, 'style'> & React.Attributes & {
    asChild?: boolean;
    style?: React.CSSProperties | (React.CSSProperties & Record<`--${string}`, string | null | undefined>) | undefined;
};

interface SliderValueProps extends ReactElementProps<SliderValueInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}

interface RootProps$a extends ReactElementProps<SliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<SliderInstance>;
}
/**
 * Versatile and user-friendly input control designed for seamless cross-browser compatibility and
 * accessibility with ARIA support. It offers a smooth user experience for both mouse and touch
 * interactions and is highly customizable in terms of styling. Users can effortlessly input numeric
 * values within a specified range, defined by a minimum and maximum value.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider}
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Track>
 *     <Slider.TrackFill />
 *   </Slider.Track>
 *   <Slider.Thumb />
 * </Slider.Root>
 * ```
 */
declare const Root$a: React.ForwardRefExoticComponent<Omit<RootProps$a, "ref"> & React.RefAttributes<SliderInstance>>;
interface ThumbProps extends PrimitivePropsWithRef<'div'> {
}
/**
 * Purely visual element used to display a draggable handle to the user for adjusting the value
 * on the slider component.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Thumb />
 * </Slider.Root>
 * ```
 */
declare const Thumb: React.ForwardRefExoticComponent<Omit<ThumbProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface TrackProps$1 extends PrimitivePropsWithRef<'div'> {
}
/**
 * Visual element inside the slider that serves as a horizontal or vertical bar, providing a
 * visual reference for the range or values that can be selected by moving the slider thumb along
 * it. Users can interact with the slider by dragging the thumb along the track to set a specific
 * value.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Track>
 *     <Slider.TrackFill />
 *   </Slider.Track>
 * </Slider.Root>
 * ```
 */
declare const Track$1: React.ForwardRefExoticComponent<Omit<TrackProps$1, "ref"> & React.RefAttributes<HTMLElement>>;
interface TrackFillProps$1 extends PrimitivePropsWithRef<'div'> {
}
/**
 * Portion of the slider track that is visually filled or highlighted to indicate the selected or
 * currently chosen range or value. As the slider thumb is moved along the track, the track
 * fill dynamically adjusts to visually represent the portion of the track that corresponds to the
 * selected value or range, providing users with a clear visual indication of their selection.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Track>
 *     <Slider.TrackFill />
 *   </Slider.Track>
 * </Slider.Root>
 * ```
 */
declare const TrackFill$1: React.ForwardRefExoticComponent<Omit<TrackFillProps$1, "ref"> & React.RefAttributes<HTMLElement>>;
interface PreviewProps extends ReactElementProps<SliderPreviewInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to provide users with a real-time or interactive preview of the value or selection they
 * are making as they move the slider thumb. This can include displaying the current pointer
 * value numerically, or displaying a thumbnail over the time slider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider#preview}
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Preview>
 *     <Slider.Value />
 *   </Slider.Preview>
 * </Slider.Root>
 * ```
 */
declare const Preview: React.ForwardRefExoticComponent<Omit<PreviewProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ValueProps extends SliderValueProps {
}
/**
 * Displays the specific numeric representation of the current or pointer value of the slider.
 * When a user interacts with a slider by moving its thumb along the track, the slider value
 * changes accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider#preview}
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Preview>
 *     <Slider.Value />
 *   </Slider.Preview>
 * </Slider.Root>
 * ```
 */
declare const Value: React.ForwardRefExoticComponent<Omit<ValueProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface StepsProps extends Omit<PrimitivePropsWithRef<'div'>, 'children'> {
    children: (step: number) => React.ReactNode;
}
/**
 * Visual markers that can be used to indicate value steps on the slider track.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Steps className="steps">
 *     {(step) => <div className="step" key={String(step)}></div>}
 *   </Slider.Steps>
 * </Slider.Root>
 * ```
 */
declare const Steps: React.ForwardRefExoticComponent<Omit<StepsProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const slider_d_Preview: typeof Preview;
type slider_d_PreviewProps = PreviewProps;
declare const slider_d_Steps: typeof Steps;
type slider_d_StepsProps = StepsProps;
declare const slider_d_Thumb: typeof Thumb;
type slider_d_ThumbProps = ThumbProps;
declare const slider_d_Value: typeof Value;
type slider_d_ValueProps = ValueProps;
declare namespace slider_d {
  export { slider_d_Preview as Preview, type slider_d_PreviewProps as PreviewProps, Root$a as Root, type RootProps$a as RootProps, slider_d_Steps as Steps, type slider_d_StepsProps as StepsProps, slider_d_Thumb as Thumb, type slider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, slider_d_Value as Value, type slider_d_ValueProps as ValueProps };
}

interface RootProps$9 extends ReactElementProps<VolumeSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<VolumeSliderInstance>;
}
/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 * @example
 * ```tsx
 * <VolumeSlider.Root>
 *   <VolumeSlider.Track>
 *     <VolumeSlider.TrackFill />
 *   </VolumeSlider.Track>
 *   <VolumeSlider.Thumb />
 * </VolumeSlider.Root>
 * ```
 */
declare const Root$9: React.ForwardRefExoticComponent<Omit<RootProps$9, "ref"> & React.RefAttributes<VolumeSliderInstance>>;

declare const volumeSlider_d_Preview: typeof Preview;
type volumeSlider_d_PreviewProps = PreviewProps;
declare const volumeSlider_d_Steps: typeof Steps;
type volumeSlider_d_StepsProps = StepsProps;
declare const volumeSlider_d_Thumb: typeof Thumb;
type volumeSlider_d_ThumbProps = ThumbProps;
declare const volumeSlider_d_Value: typeof Value;
type volumeSlider_d_ValueProps = ValueProps;
declare namespace volumeSlider_d {
  export { volumeSlider_d_Preview as Preview, type volumeSlider_d_PreviewProps as PreviewProps, Root$9 as Root, type RootProps$9 as RootProps, volumeSlider_d_Steps as Steps, type volumeSlider_d_StepsProps as StepsProps, volumeSlider_d_Thumb as Thumb, type volumeSlider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, volumeSlider_d_Value as Value, type volumeSlider_d_ValueProps as ValueProps };
}

interface RootProps$8 extends ReactElementProps<QualitySliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<QualitySliderInstance>;
}
/**
 * Versatile and user-friendly input video quality control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/quality-slider}
 * @example
 * ```tsx
 * <QualitySlider.Root>
 *   <QualitySlider.Track>
 *     <QualitySlider.TrackFill />
 *   </QualitySlider.Track>
 *   <QualitySlider.Thumb />
 * </QualitySlider.Root>
 * ```
 */
declare const Root$8: React.ForwardRefExoticComponent<Omit<RootProps$8, "ref"> & React.RefAttributes<QualitySliderInstance>>;

declare const qualitySlider_d_Preview: typeof Preview;
type qualitySlider_d_PreviewProps = PreviewProps;
declare const qualitySlider_d_Steps: typeof Steps;
type qualitySlider_d_StepsProps = StepsProps;
declare const qualitySlider_d_Thumb: typeof Thumb;
type qualitySlider_d_ThumbProps = ThumbProps;
declare const qualitySlider_d_Value: typeof Value;
type qualitySlider_d_ValueProps = ValueProps;
declare namespace qualitySlider_d {
  export { qualitySlider_d_Preview as Preview, type qualitySlider_d_PreviewProps as PreviewProps, Root$8 as Root, type RootProps$8 as RootProps, qualitySlider_d_Steps as Steps, type qualitySlider_d_StepsProps as StepsProps, qualitySlider_d_Thumb as Thumb, type qualitySlider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, qualitySlider_d_Value as Value, type qualitySlider_d_ValueProps as ValueProps };
}

interface RootProps$7 extends ReactElementProps<AudioGainSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<AudioGainSliderInstance>;
}
/**
 * Versatile and user-friendly audio boost control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the audio gain within the range 0 to 100.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/audio-gain-slider}
 * @example
 * ```tsx
 * <AudioGainSlider.Root>
 *   <AudioGainSlider.Track>
 *     <AudioGainSlider.TrackFill />
 *   </AudioGainSlider.Track>
 *   <AudioGainSlider.Thumb />
 * </AudioGainSlider.Root>
 * ```
 */
declare const Root$7: React.ForwardRefExoticComponent<Omit<RootProps$7, "ref"> & React.RefAttributes<AudioGainSliderInstance>>;

declare const audioGainSlider_d_Preview: typeof Preview;
type audioGainSlider_d_PreviewProps = PreviewProps;
declare const audioGainSlider_d_Steps: typeof Steps;
type audioGainSlider_d_StepsProps = StepsProps;
declare const audioGainSlider_d_Thumb: typeof Thumb;
type audioGainSlider_d_ThumbProps = ThumbProps;
declare const audioGainSlider_d_Value: typeof Value;
type audioGainSlider_d_ValueProps = ValueProps;
declare namespace audioGainSlider_d {
  export { audioGainSlider_d_Preview as Preview, type audioGainSlider_d_PreviewProps as PreviewProps, Root$7 as Root, type RootProps$7 as RootProps, audioGainSlider_d_Steps as Steps, type audioGainSlider_d_StepsProps as StepsProps, audioGainSlider_d_Thumb as Thumb, type audioGainSlider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, audioGainSlider_d_Value as Value, type audioGainSlider_d_ValueProps as ValueProps };
}

interface RootProps$6 extends ReactElementProps<SpeedSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<SpeedSliderInstance>;
}
/**
 * Versatile and user-friendly input playback rate control designed for seamless cross-browser and
 * provider compatibility and accessibility with ARIA support. It offers a smooth user experience
 * for both mouse and touch interactions and is highly customizable in terms of styling.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/speed-slider}
 * @example
 * ```tsx
 * <SpeedSlider.Root>
 *   <SpeedSlider.Track>
 *     <SpeedSlider.TrackFill />
 *   </SpeedSlider.Track>
 *   <SpeedSlider.Thumb />
 * </SpeedSlider.Root>
 * ```
 */
declare const Root$6: React.ForwardRefExoticComponent<Omit<RootProps$6, "ref"> & React.RefAttributes<SpeedSliderInstance>>;

declare const speedSlider_d_Preview: typeof Preview;
type speedSlider_d_PreviewProps = PreviewProps;
declare const speedSlider_d_Steps: typeof Steps;
type speedSlider_d_StepsProps = StepsProps;
declare const speedSlider_d_Thumb: typeof Thumb;
type speedSlider_d_ThumbProps = ThumbProps;
declare const speedSlider_d_Value: typeof Value;
type speedSlider_d_ValueProps = ValueProps;
declare namespace speedSlider_d {
  export { speedSlider_d_Preview as Preview, type speedSlider_d_PreviewProps as PreviewProps, Root$6 as Root, type RootProps$6 as RootProps, speedSlider_d_Steps as Steps, type speedSlider_d_StepsProps as StepsProps, speedSlider_d_Thumb as Thumb, type speedSlider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, speedSlider_d_Value as Value, type speedSlider_d_ValueProps as ValueProps };
}

interface RootProps$5 extends ReactElementProps<ThumbnailInstance, HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 * @example
 * ```tsx
 * <Thumbnail.Root src="thumbnails.vtt" time={10} >
 *   <Thumbnail.Img />
 * </Thumbnail.Root>
 * ```
 */
declare const Root$5: React.ForwardRefExoticComponent<Omit<RootProps$5, "ref"> & React.RefAttributes<HTMLElement>>;
interface ImgProps extends PrimitivePropsWithRef<'img'> {
    children?: React.ReactNode;
}
declare const Img: React.ForwardRefExoticComponent<Omit<ImgProps, "ref"> & React.RefAttributes<HTMLImageElement>>;

declare const thumbnail_d_Img: typeof Img;
type thumbnail_d_ImgProps = ImgProps;
declare namespace thumbnail_d {
  export { thumbnail_d_Img as Img, type thumbnail_d_ImgProps as ImgProps, Root$5 as Root, type RootProps$5 as RootProps };
}

interface RootProps$4 extends ReactElementProps<TimeSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<TimeSliderInstance>;
}
/**
 * Versatile and user-friendly input time control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the current playback time within the range 0 to seekable end.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/time-slider}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Track>
 *     <TimeSlider.TrackFill />
 *     <TimeSlider.Progress />
 *   </TimeSlider.Track>
 *   <TimeSlider.Thumb />
 * </TimeSlider.Root>
 * ```
 */
declare const Root$4: React.ForwardRefExoticComponent<Omit<RootProps$4, "ref"> & React.RefAttributes<TimeSliderInstance>>;
interface ChaptersProps extends Omit<ReactElementProps<SliderChaptersInstance>, 'children'> {
    children: (cues: VTTCue[], forwardRef: React.RefCallback<HTMLElement>) => React.ReactNode;
}
/**
 * Used to create predefined sections within a time slider interface based on the currently
 * active chapters text track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider-chapters}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Chapters>
 *     {(cues, forwardRef) =>
 *       cues.map((cue) => (
 *         <div key={cue.startTime} ref={forwardRef}>
 *           <TimeSlider.Track>
 *             <TimeSlider.TrackFill />
 *             <TimeSlider.Progress />
 *           </TimeSlider.Track>
 *        </div>
 *     ))}
 *   </TimeSlider.Chapters>
 * </TimeSlider.Root>
 * ```
 */
declare const Chapters: React.ForwardRefExoticComponent<ChaptersProps & React.RefAttributes<HTMLDivElement>>;
interface ChapterTitleProps$1 extends PrimitivePropsWithRef<'div'> {
}
/**
 * Used to display the active cue text based on the slider value and preview value.
 *
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Chapter />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const ChapterTitle$1: React.ForwardRefExoticComponent<Omit<ChapterTitleProps$1, "ref"> & React.RefAttributes<HTMLElement>>;
interface ProgressProps extends PrimitivePropsWithRef<'div'> {
}
/**
 * Visual element inside the slider that serves as a horizontal or vertical bar, providing a
 * visual reference for the range of playback that has buffered/loaded.
 *
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Track>
 *     <TimeSlider.Progress />
 *   </TimeSlider.Track>
 * </TimeSlider.Root>
 * ```
 */
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ThumbnailProps extends ReactElementProps<SliderThumbnailInstance, HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
type ThumbnailImgProps = ImgProps;
declare const Thumbnail: {
    readonly Root: React.ForwardRefExoticComponent<Omit<ThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;
    readonly Img: React.ForwardRefExoticComponent<Omit<ImgProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
};
interface VideoProps extends ReactElementProps<SliderVideoInstance, HTMLVideoElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLVideoElement>;
}
/**
 * Used to load a low-resolution video to be displayed when the user is hovering over or dragging
 * the time slider. The preview video will automatically be updated to be in-sync with the current
 * preview position, so ensure it has the same length as the original media (i.e., same duration).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-video}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Video src="preview.mp4" />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const Video: React.ForwardRefExoticComponent<Omit<VideoProps, "ref"> & React.RefAttributes<HTMLVideoElement>>;
interface VideoProviderProps {
    instance: SliderVideoInstance;
    children?: React.ReactNode;
}

declare const timeSlider_d_Chapters: typeof Chapters;
type timeSlider_d_ChaptersProps = ChaptersProps;
declare const timeSlider_d_Preview: typeof Preview;
type timeSlider_d_PreviewProps = PreviewProps;
declare const timeSlider_d_Progress: typeof Progress;
type timeSlider_d_ProgressProps = ProgressProps;
declare const timeSlider_d_Steps: typeof Steps;
type timeSlider_d_StepsProps = StepsProps;
declare const timeSlider_d_Thumb: typeof Thumb;
type timeSlider_d_ThumbProps = ThumbProps;
declare const timeSlider_d_Thumbnail: typeof Thumbnail;
type timeSlider_d_ThumbnailImgProps = ThumbnailImgProps;
type timeSlider_d_ThumbnailProps = ThumbnailProps;
declare const timeSlider_d_Value: typeof Value;
type timeSlider_d_ValueProps = ValueProps;
declare const timeSlider_d_Video: typeof Video;
type timeSlider_d_VideoProps = VideoProps;
type timeSlider_d_VideoProviderProps = VideoProviderProps;
declare namespace timeSlider_d {
  export { ChapterTitle$1 as ChapterTitle, type ChapterTitleProps$1 as ChapterTitleProps, timeSlider_d_Chapters as Chapters, type timeSlider_d_ChaptersProps as ChaptersProps, timeSlider_d_Preview as Preview, type timeSlider_d_PreviewProps as PreviewProps, timeSlider_d_Progress as Progress, type timeSlider_d_ProgressProps as ProgressProps, Root$4 as Root, type RootProps$4 as RootProps, timeSlider_d_Steps as Steps, type timeSlider_d_StepsProps as StepsProps, timeSlider_d_Thumb as Thumb, type timeSlider_d_ThumbProps as ThumbProps, timeSlider_d_Thumbnail as Thumbnail, type timeSlider_d_ThumbnailImgProps as ThumbnailImgProps, type timeSlider_d_ThumbnailProps as ThumbnailProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, timeSlider_d_Value as Value, type timeSlider_d_ValueProps as ValueProps, timeSlider_d_Video as Video, type timeSlider_d_VideoProps as VideoProps, type timeSlider_d_VideoProviderProps as VideoProviderProps };
}

interface RootProps$3 extends ReactElementProps<RadioGroupInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<RadioGroupInstance>;
}
/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 * @example
 * ```tsx
 * <RadioGroup.Root>
 *   <RadioGroup.Item value="1080">1080p</RadioGroup.Item>
 *   <RadioGroup.Item value="720">720p</RadioGroup.Item>
 * </RadioGroup.Root>
 * ```
 */
declare const Root$3: React.ForwardRefExoticComponent<Omit<RootProps$3, "ref"> & React.RefAttributes<RadioGroupInstance>>;
interface ItemProps$1 extends ReactElementProps<RadioInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 * @example
 * ```tsx
 * <RadioGroup.Item value="1080">1080p</RadioGroup.Item>
 * ```
 */
declare const Item$1: React.ForwardRefExoticComponent<Omit<ItemProps$1, "ref"> & React.RefAttributes<HTMLElement>>;

declare namespace radioGroup_d {
  export { Item$1 as Item, type ItemProps$1 as ItemProps, Root$3 as Root, type RootProps$3 as RootProps };
}

interface RootProps$2 extends ReactElementProps<MenuInstance> {
    asChild?: boolean;
    children: React.ReactNode;
    ref?: React.Ref<MenuInstance>;
}
/**
 * Root menu container used to hold and manage a menu button and menu items. This component is
 * used to display options in a floating panel. They can be nested to create submenus.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end"></Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Root$2: React.ForwardRefExoticComponent<Omit<RootProps$2, "ref"> & React.RefAttributes<MenuInstance>>;
interface ButtonProps extends ReactElementProps<MenuButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * `menuitem` when used inside a submenu.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end"></Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface PortalProps extends ReactElementProps<MenuPortalInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Portals menu items into the given container.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu#portal}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Portal>
 *     <Menu.Content placement="top end"></Menu.Content>
 *   </Menu.Portal>
 * </Menu.Root>
 * ```
 */
declare const Portal: React.ForwardRefExoticComponent<Omit<PortalProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ItemsProps extends ReactElementProps<MenuItemsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to group and display settings or arbitrary content in a floating panel.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Items placement="top end"></Menu.Items>
 * </Menu.Root>
 * ```
 */
declare const Items: React.ForwardRefExoticComponent<Omit<ItemsProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ItemProps extends ReactElementProps<MenuItemInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Represents a specific option or action, typically displayed as a text label or icon, which
 * users can select to access or perform a particular function or view related content.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end">
 *     <Menu.Item></Menu.Item>
 *   </Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Item: React.ForwardRefExoticComponent<Omit<ItemProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const menu_d_Button: typeof Button;
type menu_d_ButtonProps = ButtonProps;
declare const menu_d_Item: typeof Item;
type menu_d_ItemProps = ItemProps;
declare const menu_d_Items: typeof Items;
type menu_d_ItemsProps = ItemsProps;
declare const menu_d_Portal: typeof Portal;
type menu_d_PortalProps = PortalProps;
declare namespace menu_d {
  export { menu_d_Button as Button, type menu_d_ButtonProps as ButtonProps, Items as Content, type ItemsProps as ContentProps, menu_d_Item as Item, type menu_d_ItemProps as ItemProps, menu_d_Items as Items, type menu_d_ItemsProps as ItemsProps, menu_d_Portal as Portal, type menu_d_PortalProps as PortalProps, Item$1 as Radio, Root$3 as RadioGroup, type RootProps$3 as RadioGroupProps, type ItemProps$1 as RadioProps, Root$2 as Root, type RootProps$2 as RootProps };
}

interface TitleProps extends PrimitivePropsWithRef<'span'> {
}
/**
 * This component is used to load and display the current media title.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/title}
 * @example
 * ```tsx
 * <Title />
 * ```
 */
declare const Title: React.ForwardRefExoticComponent<Omit<TitleProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface ChapterTitleProps extends PrimitivePropsWithRef<'span'> {
    /**
     * Specify text to be displayed when no chapter title is available.
     */
    defaultText?: string;
}
/**
 * This component is used to load and display the current chapter title based on the text tracks
 * provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/chapter-title}
 * @example
 * ```tsx
 * <ChapterTitle />
 * ```
 */
declare const ChapterTitle: React.ForwardRefExoticComponent<Omit<ChapterTitleProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface GestureProps extends ReactElementProps<GestureInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<GestureInstance>;
}
/**
 * This component enables actions to be performed on the media based on user gestures.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/gesture}
 * @example
 * ```tsx
 * <Gesture event="pointerup" action="toggle:paused" />
 * <Gesture event="dblpointerup" action="toggle:fullscreen" />
 * ```
 */
declare const Gesture: React.ForwardRefExoticComponent<Omit<GestureProps, "ref"> & React.RefAttributes<GestureInstance>>;

interface CaptionsProps extends ReactElementProps<CaptionsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<CaptionsInstance>;
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 * @example
 * ```tsx
 * <Captions />
 * ```
 */
declare const Captions: React.ForwardRefExoticComponent<Omit<CaptionsProps, "ref"> & React.RefAttributes<CaptionsInstance>>;

interface PosterProps extends ReactElementProps<PosterInstance, HTMLImageElement> {
    alt?: string;
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLImageElement>;
}
/**
 * Loads and displays the current media poster image. By default, the media provider's
 * loading strategy is respected meaning the poster won't load until the media can.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/poster}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <Poster src="..." alt="..." />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare const Poster: React.ForwardRefExoticComponent<Omit<PosterProps, "ref"> & React.RefAttributes<HTMLImageElement>>;

interface TimeProps extends ReactElementProps<TimeInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Outputs a media duration (eg: `currentTime`, `duration`, `bufferedAmount`, etc.) value as time
 * formatted text.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/time}
 * @example
 * ```tsx
 * <Time type="current" />
 * ```
 */
declare const Time: React.ForwardRefExoticComponent<Omit<TimeProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface RootProps$1 extends PrimitivePropsWithRef<'div'> {
    children?: React.ReactNode;
}
declare const Root$1: React.ForwardRefExoticComponent<Omit<RootProps$1, "ref"> & React.RefAttributes<HTMLElement>>;

interface TextProps extends PrimitivePropsWithRef<'span'> {
}
declare const Text: React.ForwardRefExoticComponent<Omit<TextProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const caption_d_Text: typeof Text;
type caption_d_TextProps = TextProps;
declare namespace caption_d {
  export { Root$1 as Root, type RootProps$1 as RootProps, caption_d_Text as Text, type caption_d_TextProps as TextProps };
}

interface RootProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>, React.RefAttributes<SVGElement | SVGSVGElement> {
    /**
     * The horizontal (width) and vertical (height) length of the spinner.
     *
     * @defaultValue 96
     */
    size?: number;
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/display/buffering-indicator}
 * @example
 * ```html
 * <Spinner.Root>
 *   <Spinner.Track />
 *   <Spinner.TrackFill />
 * </Spinner>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<SVGSVGElement | SVGElement>>;
interface TrackProps extends React.PropsWithoutRef<React.SVGProps<SVGCircleElement>>, React.RefAttributes<SVGCircleElement> {
}
declare const Track: React.ForwardRefExoticComponent<Omit<TrackProps, "ref"> & React.RefAttributes<SVGCircleElement>>;
interface TrackFillProps extends React.PropsWithoutRef<React.SVGProps<SVGCircleElement>>, React.RefAttributes<SVGCircleElement> {
    /**
     * The percentage of the track that should be filled.
     */
    fillPercent?: number;
}
declare const TrackFill: React.ForwardRefExoticComponent<Omit<TrackFillProps, "ref"> & React.RefAttributes<SVGCircleElement>>;

declare const spinner_d_Root: typeof Root;
type spinner_d_RootProps = RootProps;
declare const spinner_d_Track: typeof Track;
declare const spinner_d_TrackFill: typeof TrackFill;
type spinner_d_TrackFillProps = TrackFillProps;
type spinner_d_TrackProps = TrackProps;
declare namespace spinner_d {
  export { spinner_d_Root as Root, type spinner_d_RootProps as RootProps, spinner_d_Track as Track, spinner_d_TrackFill as TrackFill, type spinner_d_TrackFillProps as TrackFillProps, type spinner_d_TrackProps as TrackProps };
}

/**
 * This hook is used to subscribe to specific state on a component instance.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-state}
 */
declare function useState<T extends AnyRecord, R extends keyof T>(ctor: {
    state: State<T>;
}, prop: R, ref: React.RefObject<Component<any, T, any, any> | null>): T[R];
/**
 * This hook is used to subscribe to multiple states on a component instance.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-store}
 */
declare function useStore<T extends AnyRecord>(ctor: {
    state: State<T>;
}, ref: React.RefObject<Component<any, T, any, any> | null>): T;

declare function useMediaContext(): MediaContext;

/**
 * Returns the nearest parent player component.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-player}
 */
declare function useMediaPlayer(): MediaPlayerInstance | null;

/**
 * Returns the current parent media provider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-provider}
 */
declare function useMediaProvider(): MediaProviderAdapter | null;

/**
 * A media remote provides a simple facade for dispatching media requests to the nearest media
 * player.
 *
 * @param target - The DOM event target to dispatch request events from. Defaults to player
 * if no target is provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-remote}
 */
declare function useMediaRemote(target?: EventTarget | null | React.RefObject<EventTarget | null>): MediaRemoteControl;

/**
 * This hook is used to subscribe to a specific media state.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-state}
 */
declare function useMediaState<T extends keyof MediaState>(prop: T, ref?: React.RefObject<MediaPlayerInstance | null>): MediaState[T];
/**
 * This hook is used to subscribe to the current media state on the nearest parent player.
 *
 * @docs {@link https://vidstack.io/docs/player/core-concepts/state-management#reading}
 */
declare function useMediaStore(ref?: React.RefObject<MediaPlayerInstance | null>): Readonly<MediaState>;

/**
 * The function will return the resolved thumbnail images given a thumbnail resource. It's safe to
 * call this hook in multiple places with the same `src` argument as work is de-duped and cached
 * internally.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-thumbnails}
 */
declare function useThumbnails(src: ThumbnailSrc, crossOrigin?: MediaCrossOrigin | null): ThumbnailImage[];
/**
 * Returns the active thumbnail image based on the given time.
 *
 * @param thumbnails - thumbnail images.
 * @param time - the current time to determine which thumbnail is active.
 */
declare function useActiveThumbnail(thumbnails: ThumbnailImage[], time: number): ThumbnailImage | null;

/**
 * This hook is used to subscribe to a specific slider state.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-state}
 */
declare function useSliderState<T extends keyof SliderState>(prop: T, ref?: React.RefObject<SliderInstance | VolumeSliderInstance | TimeSliderInstance | null>): SliderState[T];
/**
 * This hook is used to subscribe to the current slider state on the given or nearest slider
 * component.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-state#store}
 */
declare function useSliderStore(ref?: React.RefObject<SliderInstance | VolumeSliderInstance | TimeSliderInstance | null>): Readonly<SliderState>;

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-preview}
 */
declare function useSliderPreview({ clamp, offset, orientation, }?: UseSliderPreview): {
    previewRootRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    previewRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    previewValue: number;
    isPreviewVisible: boolean;
};
interface UseSliderPreview {
    /**
     * Whether the preview should be clamped to the start and end of the slider root. If `true` the
     * preview won't be placed outside the root bounds.
     */
    clamp?: boolean;
    /**
     * The distance in pixels between the preview and the slider root. You can also set
     * the CSS variable `--media-slider-preview-offset` to adjust this offset.
     */
    offset?: number;
    /**
     * The orientation of the slider.
     */
    orientation?: SliderOrientation;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-text-cues}
 */
declare function useTextCues(track: TextTrack | null): VTTCue[];

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-active-text-cues}
 */
declare function useActiveTextCues(track: TextTrack | null): VTTCue[];

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-active-text-track}
 */
declare function useActiveTextTrack(kind: TextTrackKind | TextTrackKind[]): TextTrack | null;

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-chapter-title}
 */
declare function useChapterTitle(): string;

/**
 * Creates a new `TextTrack` object and adds it to the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/create-text-track}
 */
declare function createTextTrack(init: TextTrackInit): TextTrack;

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-audio-gain-options}
 */
declare function useAudioGainOptions({ gains, disabledLabel, }?: UseAudioGainOptions): AudioGainOptions;
interface UseAudioGainOptions {
    gains?: (number | {
        label: string;
        gain: number;
    })[];
    disabledLabel?: string | null;
}
type AudioGainOptions = AudioGainOption[] & {
    readonly disabled: boolean;
    readonly selectedValue: string | undefined;
};
interface AudioGainOption {
    readonly label: string;
    readonly value: string;
    readonly gain: number;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-audio-options}
 */
declare function useAudioOptions(): AudioOptions;
type AudioOptions = AudioOption[] & {
    readonly disabled: boolean;
    readonly selectedTrack: AudioTrack | null;
    readonly selectedValue: string | undefined;
};
interface AudioOption {
    readonly track: AudioTrack;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-caption-options}
 */
declare function useCaptionOptions({ off }?: UseCaptionOptions): CaptionOptions;
interface UseCaptionOptions {
    /**
     * Whether an option should be included for turning off all captions. A string can be provided
     * to specify the label.
     */
    off?: boolean | string;
}
type CaptionOptions = CaptionOption[] & {
    readonly disabled: boolean;
    readonly selectedTrack: TextTrack | null;
    readonly selectedValue: string;
};
interface CaptionOption {
    readonly track: TextTrack | null;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-chapter-options}
 */
declare function useChapterOptions(): ChapterOptions;
type ChapterOptions = ChapterOption[] & {
    readonly selectedValue: string | undefined;
};
interface ChapterOption {
    readonly cue: VTTCue;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    readonly startTimeText: string;
    readonly durationText: string;
    select(trigger?: Event): void;
    setProgressVar(ref: HTMLElement | null): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-video-quality-options}
 */
declare function useVideoQualityOptions({ auto, sort, }?: UseVideoQualityOptions): VideoQualityOptions;
interface UseVideoQualityOptions {
    /**
     * Whether an auto option should be included. A string can be provided to specify the label.
     */
    auto?: boolean | string;
    /**
     * Specifies how the options should be sorted. The sorting algorithm looks at both the quality
     * resolution and bitrate.
     *
     * - Ascending: 480p, 720p, 720p (higher bitrate), 1080p
     * - Descending: 1080p, 720p (higher bitrate), 720p, 480p
     *
     * @default 'descending'
     */
    sort?: 'ascending' | 'descending';
}
type VideoQualityOptions = VideoQualityOption[] & {
    readonly disabled: boolean;
    readonly selectedQuality: VideoQuality | null;
    readonly selectedValue: string;
};
interface VideoQualityOption {
    readonly quality: VideoQuality | null;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    readonly autoSelected: boolean;
    readonly bitrateText: string | null;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-playback-rate-options}
 */
declare function usePlaybackRateOptions({ rates, normalLabel, }?: UsePlaybackRateOptions): PlaybackRateOptions;
interface UsePlaybackRateOptions {
    rates?: (number | {
        label: string;
        rate: number;
    })[];
    normalLabel?: string | null;
}
type PlaybackRateOptions = PlaybackRateOption[] & {
    readonly disabled: boolean;
    readonly selectedValue: string | undefined;
};
interface PlaybackRateOption {
    readonly label: string;
    readonly value: string;
    readonly rate: number;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

type SlotPositions$1<Name extends string> = `before${Capitalize<Name>}` | Name | `after${Capitalize<Name>}`;
type Slots$1<Names extends string> = {
    [slotName in SlotPositions$1<Names>]?: React.ReactNode;
};
type DefaultLayoutSlotName = 'bufferingIndicator' | 'captionButton' | 'captions' | 'title' | 'chapterTitle' | 'currentTime' | 'endTime' | 'fullscreenButton' | 'liveButton' | 'livePlayButton' | 'muteButton' | 'pipButton' | 'airPlayButton' | 'googleCastButton' | 'downloadButton' | 'playButton' | 'loadButton' | 'seekBackwardButton' | 'seekForwardButton' | 'startDuration' | 'timeSlider' | 'volumeSlider' | 'topControlsGroupStart' | 'topControlsGroupCenter' | 'topControlsGroupEnd' | 'centerControlsGroupStart' | 'centerControlsGroupCenter' | 'centerControlsGroupEnd' | DefaultLayoutMenuSlotName;
type DefaultLayoutMenuSlotName = 'chaptersMenu' | 'settingsMenu'
/** @deprecated - use `settingsMenuItemsStart` */
 | 'settingsMenuStartItems'
/** @deprecated - use `settingsMenuItemsEnd` */
 | 'settingsMenuEndItems' | 'settingsMenuItemsStart' | 'settingsMenuItemsEnd' | 'playbackMenuItemsStart' | 'playbackMenuItemsEnd' | 'playbackMenuLoop' | 'accessibilityMenuItemsStart' | 'accessibilityMenuItemsEnd' | 'audioMenuItemsStart' | 'audioMenuItemsEnd' | 'captionsMenuItemsStart' | 'captionsMenuItemsEnd';
interface DefaultLayoutSlots extends Slots$1<DefaultLayoutSlotName> {
}
interface DefaultAudioLayoutSlots extends DefaultLayoutSlots {
}
interface DefaultVideoLayoutSlots extends DefaultLayoutSlots {
    smallLayout?: DefaultLayoutSlots;
    largeLayout?: DefaultLayoutSlots;
}

declare const defaultLayoutIcons: DefaultLayoutIcons;
interface DefaultLayoutIconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> {
}
interface DefaultLayoutIcon {
    (props: DefaultLayoutIconProps): React.ReactNode;
}
interface DefaultAirPlayButtonIcons {
    Default: DefaultLayoutIcon;
    Connecting?: DefaultLayoutIcon;
    Connected?: DefaultLayoutIcon;
}
interface DefaultGoogleCastButtonIcons {
    Default: DefaultLayoutIcon;
    Connecting?: DefaultLayoutIcon;
    Connected?: DefaultLayoutIcon;
}
interface DefaultPlayButtonIcons {
    Play: DefaultLayoutIcon;
    Pause: DefaultLayoutIcon;
    Replay: DefaultLayoutIcon;
}
interface DefaultMuteButtonIcons {
    Mute: DefaultLayoutIcon;
    VolumeLow: DefaultLayoutIcon;
    VolumeHigh: DefaultLayoutIcon;
}
interface DefaultCaptionButtonIcons {
    On: DefaultLayoutIcon;
    Off: DefaultLayoutIcon;
}
interface DefaultPIPButtonIcons {
    Enter: DefaultLayoutIcon;
    Exit: DefaultLayoutIcon;
}
interface DefaultFullscreenButtonIcons {
    Enter: DefaultLayoutIcon;
    Exit: DefaultLayoutIcon;
}
interface DefaultSeekButtonIcons {
    Backward: DefaultLayoutIcon;
    Forward: DefaultLayoutIcon;
}
interface DefaultDownloadButtonIcons {
    Default: DefaultLayoutIcon;
}
interface DefaultMenuIcons {
    Accessibility: DefaultLayoutIcon;
    ArrowLeft: DefaultLayoutIcon;
    ArrowRight: DefaultLayoutIcon;
    Audio: DefaultLayoutIcon;
    AudioBoostUp: DefaultLayoutIcon;
    AudioBoostDown: DefaultLayoutIcon;
    Chapters: DefaultLayoutIcon;
    Captions: DefaultLayoutIcon;
    Playback: DefaultLayoutIcon;
    Settings: DefaultLayoutIcon;
    SpeedUp: DefaultLayoutIcon;
    SpeedDown: DefaultLayoutIcon;
    QualityUp: DefaultLayoutIcon;
    QualityDown: DefaultLayoutIcon;
    FontSizeUp: DefaultLayoutIcon;
    FontSizeDown: DefaultLayoutIcon;
    OpacityUp: DefaultLayoutIcon;
    OpacityDown: DefaultLayoutIcon;
    RadioCheck: DefaultLayoutIcon;
}
interface DefaultKeyboardDisplayIcons {
    Play: DefaultLayoutIcon;
    Pause: DefaultLayoutIcon;
    Mute: DefaultLayoutIcon;
    VolumeUp: DefaultLayoutIcon;
    VolumeDown: DefaultLayoutIcon;
    EnterFullscreen: DefaultLayoutIcon;
    ExitFullscreen: DefaultLayoutIcon;
    EnterPiP: DefaultLayoutIcon;
    ExitPiP: DefaultLayoutIcon;
    CaptionsOn: DefaultLayoutIcon;
    CaptionsOff: DefaultLayoutIcon;
    SeekForward: DefaultLayoutIcon;
    SeekBackward: DefaultLayoutIcon;
}
interface DefaultLayoutIcons {
    AirPlayButton: DefaultAirPlayButtonIcons;
    GoogleCastButton: DefaultGoogleCastButtonIcons;
    PlayButton: DefaultPlayButtonIcons;
    MuteButton: DefaultMuteButtonIcons;
    CaptionButton: DefaultCaptionButtonIcons;
    PIPButton: DefaultPIPButtonIcons;
    FullscreenButton: DefaultFullscreenButtonIcons;
    SeekButton: DefaultSeekButtonIcons;
    DownloadButton?: DefaultDownloadButtonIcons;
    Menu: DefaultMenuIcons;
    KeyboardDisplay?: Partial<DefaultKeyboardDisplayIcons>;
}

interface DefaultLayoutProps<Slots = unknown> extends PrimitivePropsWithRef<'div'> {
    children?: React.ReactNode;
    /**
     * The icons to be rendered and displayed inside the layout.
     */
    icons: DefaultLayoutIcons;
    /**
     * Whether light or dark color theme should be active. Defaults to user operating system
     * preference.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme}
     */
    colorScheme?: 'light' | 'dark' | 'system' | 'default';
    /**
     * Sets the download URL and filename for the download button.
     */
    download?: FileDownloadInfo;
    /**
     * Specifies the number of milliseconds to wait before tooltips are visible after interacting
     * with a control.
     *
     * @defaultValue 700
     */
    showTooltipDelay?: number;
    /**
     * Specifies the number of milliseconds to wait before menus are visible after opening them.
     *
     * @defaultValue 0
     */
    showMenuDelay?: number;
    /**
     * Whether the bitrate should be hidden in the settings quality menu next to each option.
     *
     * @defaultValue false
     */
    hideQualityBitrate?: boolean;
    /**
     * Determines when the small (e.g., mobile) UI should be displayed.
     *
     * @defaultValue `({ width, height }) => width < 576 || height < 380`
     */
    smallLayoutWhen?: boolean | MediaPlayerQuery;
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/wc/player/core-concepts/loading#thumbnails}
     */
    thumbnails?: ThumbnailSrc;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations?: Partial<DefaultLayoutTranslations> | null;
    /**
     * A document query selector string or `HTMLElement` to mount menus inside.
     *
     * @defaultValue `document.body`
     */
    menuContainer?: string | HTMLElement | null;
    /**
     * Specifies whether menu buttons should be placed in the top or bottom controls group. This
     * only applies to the large video layout.
     */
    menuGroup?: 'top' | 'bottom';
    /**
     * Disable audio boost slider in the settings menu.
     */
    noAudioGain?: boolean;
    /**
     * The audio gain options to be displayed in the settings menu.
     */
    audioGains?: number[] | {
        min: number;
        max: number;
        step: number;
    };
    /**
     * Whether modal menus should be disabled when the small layout is active. A modal menu is
     * a floating panel that floats up from the bottom of the screen (outside of the player). It's
     * enabled by default as it provides a better user experience for touch devices.
     */
    noModal?: boolean;
    /**
     * Whether to disable scrubbing by touch swiping left or right on the player canvas.
     */
    noScrubGesture?: boolean;
    /**
     * The minimum width of the slider to start displaying slider chapters when available.
     */
    sliderChaptersMinWidth?: number;
    /**
     * Whether the time slider should be disabled.
     */
    disableTimeSlider?: boolean;
    /**
     * Whether all gestures such as press to play or seek should not be active.
     */
    noGestures?: boolean;
    /**
     * Whether keyboard actions should not be displayed.
     */
    noKeyboardAnimations?: boolean;
    /**
     * The playback rate options to be displayed in the settings menu.
     */
    playbackRates?: number[] | {
        min: number;
        max: number;
        step: number;
    };
    /**
     * The number of seconds to seek forward or backward when pressing the seek button or using
     * keyboard shortcuts.
     */
    seekStep?: number;
    /**
     * Provide additional content to be inserted in specific positions.
     */
    slots?: Slots;
}

declare const DefaultLayoutContext: React.Context<DefaultLayoutContext>;
interface DefaultLayoutContext extends DefaultLayoutProps {
    isSmallLayout: boolean;
    userPrefersAnnouncements: WriteSignal<boolean>;
    userPrefersKeyboardAnimations: WriteSignal<boolean>;
}
declare function useDefaultLayoutContext(): DefaultLayoutContext;
declare function useDefaultLayoutWord(word: string): any;
declare function i18n$1(translations: any, word: string): any;

interface DefaultAudioLayoutProps extends DefaultLayoutProps<DefaultAudioLayoutSlots> {
}
/**
 * The audio layout is our production-ready UI that's displayed when the media view type is set to
 * 'audio'. It includes support for audio tracks, slider chapters, captions, live streams
 * and more out of the box.
 *
 * @attr data-match - Whether this layout is being used.
 * @attr data-sm - The small layout is active
 * @attr data-lg - The large layout is active.
 * @attr data-size - The active layout size (sm or lg).
 * @example
 * ```tsx
 * <MediaPlayer src="audio.mp3">
 *   <MediaProvider />
 *   <DefaultAudioLayout icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
declare function DefaultAudioLayout(props: DefaultAudioLayoutProps): React.JSX.Element;
declare namespace DefaultAudioLayout {
    var displayName: string;
}

interface DefaultVideoLayoutProps extends DefaultLayoutProps<DefaultVideoLayoutSlots> {
}
/**
 * The video layout is our production-ready UI that's displayed when the media view type is set to
 * 'video'. It includes support for picture-in-picture, fullscreen, slider chapters, slider
 * previews, captions, audio/quality settings, live streams, and more out of the box.
 *
 * @attr data-match - Whether this layout is being used.
 * @attr data-sm - The small layout is active
 * @attr data-lg - The large layout is active.
 * @attr data-size - The active layout size (sm or lg).
 * @example
 * ```tsx
 * <MediaPlayer src="video.mp4">
 *   <MediaProvider />
 *   <DefaultVideoLayout thumbnails="/thumbnails.vtt" icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
declare function DefaultVideoLayout(props: DefaultVideoLayoutProps): React.JSX.Element;
declare namespace DefaultVideoLayout {
    var displayName: string;
}

declare function DefaultVideoLargeLayout(): React.JSX.Element;
declare namespace DefaultVideoLargeLayout {
    var displayName: string;
}

declare function DefaultVideoSmallLayout(): React.JSX.Element;
declare namespace DefaultVideoSmallLayout {
    var displayName: string;
}

declare function DefaultVideoGestures(): React.JSX.Element | null;
declare namespace DefaultVideoGestures {
    var displayName: string;
}

declare function DefaultBufferingIndicator(): React.JSX.Element;
declare namespace DefaultBufferingIndicator {
    var displayName: string;
}

interface DefaultMenuCheckboxProps {
    label: string;
    checked?: boolean;
    storageKey?: string;
    defaultChecked?: boolean;
    onChange?(checked: boolean, trigger?: Event): void;
}
declare function DefaultMenuCheckbox({ label, checked, storageKey, defaultChecked, onChange, }: DefaultMenuCheckboxProps): React.JSX.Element;
declare namespace DefaultMenuCheckbox {
    var displayName: string;
}

interface DefaultMenuSectionProps {
    label?: string;
    value?: string;
    children: React.ReactNode;
}
declare function DefaultMenuSection({ label, value, children }: DefaultMenuSectionProps): React.JSX.Element;
declare namespace DefaultMenuSection {
    var displayName: string;
}

interface DefaultMenuButtonProps {
    label: string;
    hint?: string;
    disabled?: boolean;
    Icon?: DefaultLayoutIcon;
}
declare function DefaultMenuButton({ label, hint, Icon, disabled }: DefaultMenuButtonProps): React.JSX.Element;
declare namespace DefaultMenuButton {
    var displayName: string;
}

interface DefaultMenuItemProps {
    label: string;
    children: React.ReactNode;
}
declare function DefaultMenuItem({ label, children }: DefaultMenuItemProps): React.JSX.Element;
declare namespace DefaultMenuItem {
    var displayName: string;
}

interface DefaultMenuRadioGroupProps {
    value: string;
    options: {
        label: string;
        value: string;
    }[];
    onChange?(newValue: string): void;
}
declare function DefaultMenuRadioGroup({ value, options, onChange }: DefaultMenuRadioGroupProps): React.JSX.Element;
declare namespace DefaultMenuRadioGroup {
    var displayName: string;
}

declare function createRadioOptions(entries: string[] | Record<string, string>): {
    label: string;
    value: string;
}[];

interface DefaultMenuSliderItemProps {
    label?: string;
    value?: string;
    UpIcon?: DefaultLayoutIcon;
    DownIcon?: DefaultLayoutIcon;
    children: React.ReactNode;
    isMin: boolean;
    isMax: boolean;
}
declare function DefaultMenuSliderItem({ label, value, UpIcon, DownIcon, children, isMin, isMax, }: DefaultMenuSliderItemProps): React.JSX.Element;
declare namespace DefaultMenuSliderItem {
    var displayName: string;
}

declare function DefaultSliderParts(): React.JSX.Element;
declare namespace DefaultSliderParts {
    var displayName: string;
}

declare function DefaultSliderSteps(): React.JSX.Element;
declare namespace DefaultSliderSteps {
    var displayName: string;
}

interface DefaultTooltipProps {
    content: string;
    placement?: TooltipPlacement;
    children: React.ReactNode;
}
declare function DefaultTooltip({ content, placement, children }: DefaultTooltipProps): React.JSX.Element;
declare namespace DefaultTooltip {
    var displayName: string;
}

interface DefaultKeyboardDisplayProps extends Omit<PrimitivePropsWithRef<'div'>, 'disabled'> {
    icons: Partial<DefaultKeyboardDisplayIcons>;
}
declare const DefaultKeyboardDisplay: React.ForwardRefExoticComponent<Omit<DefaultKeyboardDisplayProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const plyrLayoutIcons: PlyrLayoutIcons;
interface PlyrLayoutIconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> {
}
interface PlyrLayoutIcon {
    (props: PlyrLayoutIconProps): React.ReactNode;
}
interface PlyrLayoutIcons {
    AirPlay: PlyrLayoutIcon;
    CaptionsOff: PlyrLayoutIcon;
    CaptionsOn: PlyrLayoutIcon;
    Download: PlyrLayoutIcon;
    EnterFullscreen: PlyrLayoutIcon;
    EnterPiP: PlyrLayoutIcon;
    ExitFullscreen: PlyrLayoutIcon;
    ExitPiP: PlyrLayoutIcon;
    FastForward: PlyrLayoutIcon;
    Muted: PlyrLayoutIcon;
    Pause: PlyrLayoutIcon;
    Play: PlyrLayoutIcon;
    Restart: PlyrLayoutIcon;
    Rewind: PlyrLayoutIcon;
    Settings: PlyrLayoutIcon;
    Volume: PlyrLayoutIcon;
}

type SlotPositions<Name extends string> = `before${Capitalize<Name>}` | Name | `after${Capitalize<Name>}`;
type Slots<Names extends string> = {
    [slotName in SlotPositions<Names>]?: React.ReactNode;
};
type PlyrLayoutSlotName = 'airPlayButton' | 'captionsButton' | 'currentTime' | 'download' | 'duration' | 'fastForwardButton' | 'fullscreenButton' | 'liveButton' | 'muteButton' | 'pipButton' | 'playButton' | 'playLargeButton' | 'poster' | 'restartButton' | 'rewindButton' | 'rewindButton' | 'settings' | 'settingsButton' | 'timeSlider' | 'volumeSlider' | 'settingsMenu';
interface PlyrLayoutSlots extends Slots<PlyrLayoutSlotName> {
}

interface PlyrLayoutProps {
    /**
     * The icons to be rendered and displayed inside the layout.
     */
    icons: PlyrLayoutIcons;
    /**
     * The frame of the video to use as the poster. This only works with Remotion sources at the
     * moment.
     */
    posterFrame?: number;
    /**
     * Press the video container to toggle play/pause.
     */
    clickToPlay?: boolean;
    /**
     * Double-press the video container to toggle fullscreen.
     */
    clickToFullscreen?: boolean;
    /**
     * The controls to be included in the layout and their order specified by the position in the
     * array.
     */
    controls?: PlyrControl[];
    /**
     * Whether the duration should be displayed. This is ignored if `toggleTime` is `true`.
     */
    displayDuration?: boolean;
    /**
     * Sets the download URL and filename for the download button. The download button must be
     * included in the `controls` prop for this to take effect.
     */
    download?: FileDownloadInfo;
    /**
     * Points on the time slider which should be visually marked for the user.
     */
    markers?: PlyrMarker[] | null;
    /**
     * Display the current time as a countdown rather than an incremental counter.
     */
    invertTime?: boolean;
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/wc/player/core-concepts/loading#thumbnails}
     */
    thumbnails?: ThumbnailSrc;
    /**
     * Allow users to press to toggle the inverted time.
     */
    toggleTime?: boolean;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations?: Partial<PlyrLayoutTranslations> | null;
    /**
     * The time, in seconds, to seek when a user hits fast forward or rewind.
     */
    seekTime?: number;
    /**
     * The speed options to display in the UI.
     */
    speed?: (string | number)[];
    /**
     * Provide additional content to be inserted in specific positions.
     */
    slots?: PlyrLayoutSlots;
}

interface PlyrLayoutElementProps extends PlyrLayoutProps, PrimitivePropsWithRef<'div'> {
}
declare const PlyrLayout: React.ForwardRefExoticComponent<Omit<PlyrLayoutElementProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare function PlyrAudioLayout(): React.JSX.Element;
declare namespace PlyrAudioLayout {
    var displayName: string;
}

declare function PlyrVideoLayout(): React.JSX.Element;
declare namespace PlyrVideoLayout {
    var displayName: string;
}

interface PlyrLayoutContext extends PlyrLayoutProps {
    previewTime: WriteSignal<number>;
}
declare const PlyrLayoutContext: React.Context<PlyrLayoutContext>;
declare function usePlyrLayoutContext(): PlyrLayoutContext;
declare function usePlyrLayoutWord(word: PlyrLayoutWord): any;
declare function i18n(translations: any, word: string): any;

/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=accessibility) */
declare const AccessibilityIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add-note) */
declare const AddNoteIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add-playlist) */
declare const AddPlaylistIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add-user) */
declare const AddUserIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add) */
declare const AddIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=airplay) */
declare const AirPlayIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-collapse-in) */
declare const ArrowCollapseInIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-collapse) */
declare const ArrowCollapseIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-down) */
declare const ArrowDownIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-expand-out) */
declare const ArrowExpandOutIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-expand) */
declare const ArrowExpandIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-left) */
declare const ArrowLeftIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-right) */
declare const ArrowRightIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-up) */
declare const ArrowUpIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=bookmark) */
declare const BookmarkIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=camera) */
declare const CameraIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chapters) */
declare const ChaptersIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chat-collapse) */
declare const ChatCollapseIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chat) */
declare const ChatIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=check) */
declare const CheckIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-down) */
declare const ChevronDownIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-left) */
declare const ChevronLeftIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-right) */
declare const ChevronRightIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-up) */
declare const ChevronUpIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chromecast) */
declare const ChromecastIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=clip) */
declare const ClipIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=closed-captions-on) */
declare const ClosedCaptionsOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=closed-captions) */
declare const ClosedCaptionsIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=comment) */
declare const CommentIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=computer) */
declare const ComputerIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=device) */
declare const DeviceIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=download) */
declare const DownloadIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=episodes) */
declare const EpisodesIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=eye) */
declare const EyeIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fast-backward) */
declare const FastBackwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fast-forward) */
declare const FastForwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=flag) */
declare const FlagIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen-arrow-exit) */
declare const FullscreenArrowExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen-arrow) */
declare const FullscreenArrowIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen-exit) */
declare const FullscreenExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen) */
declare const FullscreenIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=heart) */
declare const HeartIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=info) */
declare const InfoIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=language) */
declare const LanguageIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=link) */
declare const LinkIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=lock-closed) */
declare const LockClosedIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=lock-open) */
declare const LockOpenIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=menu-horizontal) */
declare const MenuHorizontalIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=menu-vertical) */
declare const MenuVerticalIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=microphone) */
declare const MicrophoneIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=mobile) */
declare const MobileIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=moon) */
declare const MoonIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=music-off) */
declare const MusicOffIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=music) */
declare const MusicIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=mute) */
declare const MuteIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=next) */
declare const NextIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=no-eye) */
declare const NoEyeIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=notification) */
declare const NotificationIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=odometer) */
declare const OdometerIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=pause) */
declare const PauseIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=picture-in-picture-exit) */
declare const PictureInPictureExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=picture-in-picture) */
declare const PictureInPictureIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=play) */
declare const PlayIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=playback-speed-circle) */
declare const PlaybackSpeedCircleIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=playlist) */
declare const PlaylistIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=previous) */
declare const PreviousIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=question-mark) */
declare const QuestionMarkIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=queue-list) */
declare const QueueListIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=radio-button-selected) */
declare const RadioButtonSelectedIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=radio-button) */
declare const RadioButtonIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat-on) */
declare const RepeatOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat-square-on) */
declare const RepeatSquareOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat-square) */
declare const RepeatSquareIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat) */
declare const RepeatIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=replay) */
declare const ReplayIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=rotate) */
declare const RotateIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=search) */
declare const SearchIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward-10) */
declare const SeekBackward10Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward-15) */
declare const SeekBackward15Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward-30) */
declare const SeekBackward30Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward) */
declare const SeekBackwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward-10) */
declare const SeekForward10Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward-15) */
declare const SeekForward15Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward-30) */
declare const SeekForward30Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward) */
declare const SeekForwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=send) */
declare const SendIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=settings-menu) */
declare const SettingsMenuIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=settings-switch) */
declare const SettingsSwitchIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=settings) */
declare const SettingsIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=share-arrow) */
declare const ShareArrowIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=share) */
declare const ShareIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=shuffle-on) */
declare const ShuffleOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=shuffle) */
declare const ShuffleIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=stop) */
declare const StopIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=subtitles) */
declare const SubtitlesIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=sun) */
declare const SunIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=theatre-mode-exit) */
declare const TheatreModeExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=theatre-mode) */
declare const TheatreModeIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=thumbs-down) */
declare const ThumbsDownIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=thumbs-up) */
declare const ThumbsUpIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=timer) */
declare const TimerIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=transcript) */
declare const TranscriptIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=tv) */
declare const TvIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=user) */
declare const UserIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=volume-high) */
declare const VolumeHighIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=volume-low) */
declare const VolumeLowIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=x-mark) */
declare const XMarkIcon: IconComponent;

interface RemotionThumbnailProps extends Omit<PrimitivePropsWithRef<'div'>, 'children' | 'onError'> {
    /** The video frame to display. */
    frame: number;
    /**
     * A callback function that allows you to return a custom UI that gets displayed while the
     * thumbnail is loading. If this prop is not provided it will default to the loading renderer
     * given to the player source.
     */
    renderLoading?: RemotionLoadingRenderer;
    /**
     * A callback for rendering a custom error message. If this prop is not provided it will default
     * to the error renderer given to the player source.
     */
    errorFallback?: RemotionErrorRenderer;
    /**
     * Called when an error or uncaught exception has happened in the video. If this prop is not
     * provided it will default to the error callback given to the player source.
     */
    onError?(error: Error): void;
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-thumbnail}
 * @example
 * ```tsx
 * <RemotionThumbnail frame={100} />
 * ```
 */
declare const RemotionThumbnail: React.ForwardRefExoticComponent<Omit<RemotionThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface RemotionPosterProps extends RemotionThumbnailProps {
}
/**
 * @attr data-visible - Whether poster should be shown.
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-poster}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <RemotionPoster frame={100} />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare const RemotionPoster: React.ForwardRefExoticComponent<Omit<RemotionPosterProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface RemotionSliderThumbnailProps extends Omit<RemotionThumbnailProps, 'frame'> {
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-slider-thumbnail}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <RemotionSliderThumbnail />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const RemotionSliderThumbnail: React.ForwardRefExoticComponent<Omit<RemotionSliderThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare class RemotionProviderLoader implements MediaProviderLoader {
    readonly name = "remotion";
    target: HTMLElement;
    constructor();
    canPlay(src: Src): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<MediaProviderAdapter>;
}

declare class RemotionLayoutEngine {
    protected _src: RemotionSrc | null;
    protected _viewport: HTMLElement | null;
    protected _canvas: HTMLElement | null;
    protected _container: HTMLElement | null;
    protected _disposal: DisposalBin;
    constructor();
    setSrc(src: RemotionSrc | null): void;
    setContainer(container: HTMLElement | null): void;
    destroy(): void;
    protected _onResize(entries?: ResizeObserverEntry[]): void;
    protected _getRect(el: HTMLElement, entry?: ResizeObserverEntry): LayoutRect;
    protected _calcScale(rect: LayoutRect): number;
    protected _calcTransform(rect: LayoutRect, scale: number): {
        x?: undefined;
        y?: undefined;
        centerX?: undefined;
        centerY?: undefined;
    } | {
        x: number;
        y: number;
        centerX: number;
        centerY: number;
    };
}
interface LayoutRect {
    width: number;
    height: number;
    top: number;
    left: number;
}

declare class RemotionPlaybackEngine {
    protected _src: RemotionSrc;
    protected _onFrameChange: (frame: number) => void;
    protected _onEnd: () => void;
    protected _disposal: DisposalBin;
    protected _frame: number;
    protected _framesAdvanced: number;
    protected _playbackRate: number;
    protected _playing: boolean;
    protected _rafId: number;
    protected _timerId: number;
    protected _startedAt: number;
    protected _isRunningInBackground: boolean;
    get frame(): number;
    set frame(frame: number);
    constructor(_src: RemotionSrc, _onFrameChange: (frame: number) => void, _onEnd: () => void);
    play(): void;
    stop(): void;
    setPlaybackRate(rate: number): void;
    destroy(): void;
    protected _update(): void;
    protected _tick: () => void;
    protected _queueNextFrame(callback: () => void): void;
    protected _calculateNextFrame(): {
        nextFrame: number;
        framesToAdvance: number;
        ended: boolean;
    };
    protected _onVisibilityChange(): void;
}

declare class RemotionProvider implements MediaProviderAdapter {
    readonly container: HTMLElement;
    protected readonly _ctx: MediaContext;
    protected readonly $$PROVIDER_TYPE = "REMOTION";
    readonly scope: Scope;
    protected _src: WriteSignal<RemotionSrc<RemotionInputProps> | null>;
    protected _setup: boolean;
    protected _loadStart: boolean;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _audio: any;
    protected _waiting: WriteSignal<boolean>;
    protected _waitingPromise: DeferredPromise<void, string> | null;
    protected _mediaTags: WriteSignal<PlayableMediaTag[]>;
    protected _mediaElements: WriteSignal<HTMLMediaElement[]>;
    protected _bufferingElements: Set<HTMLMediaElement>;
    protected _timeline: TimelineContextValue | null;
    protected _frame: WriteSignal<Record<string, number>>;
    protected _layoutEngine: RemotionLayoutEngine;
    protected _playbackEngine: RemotionPlaybackEngine | null;
    protected _setTimeline: SetTimelineContextValue;
    protected _setMediaVolume: SetMediaVolumeContextValue;
    protected get _notify(): <Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    get type(): string;
    get currentSrc(): RemotionSrc<RemotionInputProps> | null;
    get frame(): Record<string, number>;
    constructor(container: HTMLElement, _ctx: MediaContext);
    setup(): void;
    protected _watchMediaTags(): void;
    protected _discoverMediaElements(): void;
    protected _watchMediaElements(): void;
    protected _onFrameChange(frame: number): void;
    protected _onFrameEnd(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(value: React.SetStateAction<boolean>): void;
    setCurrentTime(time: number): void;
    setVolume(value: React.SetStateAction<number>): void;
    setPlaybackRate(rate: React.SetStateAction<number>): void;
    protected _getPlayedRange(time: number): TimeRange;
    loadSource(src: Src): Promise<void>;
    destroy(): void;
    changeSrc(src: RemotionSrc | null): void;
    render: () => React.ReactNode;
    renderVideo: ({ src }: {
        src: RemotionSrc;
    }) => React.ReactNode;
    protected _ready(src: RemotionSrc | null): void;
    protected _onWaitFor(el: HTMLMediaElement): void;
    protected _onStopWaitingFor(el: HTMLMediaElement): void;
    protected _watchWaiting(): void;
    protected _setFrame(value: React.SetStateAction<Record<string, number>>): void;
    protected _setPlaying(value: React.SetStateAction<boolean>): void;
    protected _createTimelineContextValue(): TimelineContextValue;
}

/** @see {@link https://www.vidstack.io/docs/player/providers/remotion} */
declare function isRemotionProvider(provider: any): provider is RemotionProvider;
declare function isRemotionSrc(src?: Src | null): src is RemotionSrc;

export { PlyrLayout as $, type DefaultMenuButtonProps as A, type DefaultMenuItemProps as B, type DefaultMenuRadioGroupProps as C, type DefaultLayoutSlots as D, createRadioOptions as E, DefaultMenuSliderItem as F, DefaultSliderParts as G, DefaultSliderSteps as H, type DefaultMenuSliderItemProps as I, DefaultTooltip as J, type DefaultTooltipProps as K, defaultLayoutIcons as L, type DefaultLayoutIconProps as M, type DefaultLayoutIcon as N, type DefaultAirPlayButtonIcons as O, type DefaultGoogleCastButtonIcons as P, type DefaultPlayButtonIcons as Q, type DefaultMuteButtonIcons as R, type DefaultCaptionButtonIcons as S, type DefaultPIPButtonIcons as T, type DefaultFullscreenButtonIcons as U, type DefaultSeekButtonIcons as V, type DefaultDownloadButtonIcons as W, type DefaultMenuIcons as X, type DefaultKeyboardDisplayIcons as Y, type DefaultLayoutIcons as Z, type PlyrLayoutElementProps as _, type DefaultAudioLayoutSlots as a, type RootProps$7 as a$, PlyrAudioLayout as a0, PlyrVideoLayout as a1, type PlyrLayoutProps as a2, type PlyrLayoutSlots as a3, type PlyrLayoutSlotName as a4, plyrLayoutIcons as a5, type PlyrLayoutIconProps as a6, type PlyrLayoutIcon as a7, type PlyrLayoutIcons as a8, PlyrLayoutContext as a9, type GoogleCastButtonProps as aA, GoogleCastButton as aB, type PlayButtonProps as aC, PlayButton as aD, type CaptionButtonProps as aE, CaptionButton as aF, type FullscreenButtonProps as aG, FullscreenButton as aH, type MuteButtonProps as aI, MuteButton as aJ, type PIPButtonProps as aK, PIPButton as aL, type SeekButtonProps as aM, SeekButton as aN, type LiveButtonProps as aO, LiveButton as aP, slider_d as aQ, volumeSlider_d as aR, qualitySlider_d as aS, audioGainSlider_d as aT, speedSlider_d as aU, timeSlider_d as aV, type RootProps$a as aW, type ValueProps as aX, type PreviewProps as aY, type StepsProps as aZ, type RootProps$9 as a_, usePlyrLayoutContext as aa, usePlyrLayoutWord as ab, i18n as ac, type PlayerSrc as ad, type MediaPlayerProps as ae, MediaPlayer as af, type MediaAnnouncerProps as ag, MediaAnnouncer as ah, type MediaProviderProps as ai, MediaProvider as aj, type IconProps as ak, Icon as al, type IconComponent as am, Track$2 as an, type TrackProps$2 as ao, controls_d as ap, type RootProps$c as aq, type GroupProps as ar, tooltip_d as as, type RootProps$b as at, type TriggerProps as au, type ContentProps as av, type ToggleButtonProps as aw, ToggleButton as ax, type AirPlayButtonProps as ay, AirPlayButton as az, type DefaultVideoLayoutSlots as b, SliderThumbnailInstance as b$, type RootProps$6 as b0, type RootProps$8 as b1, type RootProps$4 as b2, type ChaptersProps as b3, type ChapterTitleProps$1 as b4, type ThumbnailProps as b5, type ThumbnailImgProps as b6, type VideoProps as b7, radioGroup_d as b8, type RootProps$3 as b9, type RootProps as bA, type TrackProps as bB, type TrackFillProps as bC, MediaPlayerInstance as bD, MediaProviderInstance as bE, MediaAnnouncerInstance as bF, ControlsInstance as bG, ControlsGroupInstance as bH, ToggleButtonInstance as bI, CaptionButtonInstance as bJ, FullscreenButtonInstance as bK, LiveButtonInstance as bL, MuteButtonInstance as bM, PIPButtonInstance as bN, PlayButtonInstance as bO, AirPlayButtonInstance as bP, GoogleCastButtonInstance as bQ, SeekButtonInstance as bR, TooltipInstance as bS, TooltipTriggerInstance as bT, TooltipContentInstance as bU, SliderInstance as bV, TimeSliderInstance as bW, VolumeSliderInstance as bX, AudioGainSliderInstance as bY, SpeedSliderInstance as bZ, QualitySliderInstance as b_, type ItemProps$1 as ba, menu_d as bb, type RootProps$2 as bc, type ButtonProps as bd, type PortalProps as be, type ItemsProps as bf, type ItemProps as bg, Title as bh, type TitleProps as bi, ChapterTitle as bj, type ChapterTitleProps as bk, type GestureProps as bl, Gesture as bm, Captions as bn, type CaptionsProps as bo, type PosterProps as bp, Poster as bq, type TimeProps as br, Time as bs, caption_d as bt, type RootProps$1 as bu, type TextProps as bv, thumbnail_d as bw, type RootProps$5 as bx, type ImgProps as by, spinner_d as bz, type DefaultLayoutSlotName as c, ArrowCollapseInIcon as c$, SliderValueInstance as c0, SliderVideoInstance as c1, SliderPreviewInstance as c2, SliderChaptersInstance as c3, MenuInstance as c4, MenuButtonInstance as c5, MenuItemsInstance as c6, MenuItemInstance as c7, MenuPortalInstance as c8, RadioGroupInstance as c9, type UseAudioGainOptions as cA, type AudioGainOptions as cB, type AudioGainOption as cC, useAudioOptions as cD, type AudioOptions as cE, type AudioOption as cF, useCaptionOptions as cG, type UseCaptionOptions as cH, type CaptionOptions as cI, type CaptionOption as cJ, useChapterOptions as cK, type ChapterOptions as cL, type ChapterOption as cM, useVideoQualityOptions as cN, type UseVideoQualityOptions as cO, type VideoQualityOptions as cP, type VideoQualityOption as cQ, usePlaybackRateOptions as cR, type UsePlaybackRateOptions as cS, type PlaybackRateOptions as cT, type PlaybackRateOption as cU, AccessibilityIcon as cV, AddNoteIcon as cW, AddPlaylistIcon as cX, AddUserIcon as cY, AddIcon as cZ, AirPlayIcon as c_, RadioInstance as ca, CaptionsInstance as cb, GestureInstance as cc, PosterInstance as cd, ThumbnailInstance as ce, TimeInstance as cf, useState as cg, useStore as ch, useMediaContext as ci, useMediaPlayer as cj, useMediaProvider as ck, useMediaRemote as cl, useMediaState as cm, useMediaStore as cn, useThumbnails as co, useActiveThumbnail as cp, useSliderState as cq, useSliderStore as cr, useSliderPreview as cs, type UseSliderPreview as ct, useTextCues as cu, useActiveTextCues as cv, useActiveTextTrack as cw, useChapterTitle as cx, createTextTrack as cy, useAudioGainOptions as cz, type DefaultLayoutMenuSlotName as d, RadioButtonIcon as d$, ArrowCollapseIcon as d0, ArrowDownIcon as d1, ArrowExpandOutIcon as d2, ArrowExpandIcon as d3, ArrowLeftIcon as d4, ArrowRightIcon as d5, ArrowUpIcon as d6, BookmarkIcon as d7, CameraIcon as d8, ChaptersIcon as d9, InfoIcon as dA, LanguageIcon as dB, LinkIcon as dC, LockClosedIcon as dD, LockOpenIcon as dE, MenuHorizontalIcon as dF, MenuVerticalIcon as dG, MicrophoneIcon as dH, MobileIcon as dI, MoonIcon as dJ, MusicOffIcon as dK, MusicIcon as dL, MuteIcon as dM, NextIcon as dN, NoEyeIcon as dO, NotificationIcon as dP, OdometerIcon as dQ, PauseIcon as dR, PictureInPictureExitIcon as dS, PictureInPictureIcon as dT, PlayIcon as dU, PlaybackSpeedCircleIcon as dV, PlaylistIcon as dW, PreviousIcon as dX, QuestionMarkIcon as dY, QueueListIcon as dZ, RadioButtonSelectedIcon as d_, ChatCollapseIcon as da, ChatIcon as db, CheckIcon as dc, ChevronDownIcon as dd, ChevronLeftIcon as de, ChevronRightIcon as df, ChevronUpIcon as dg, ChromecastIcon as dh, ClipIcon as di, ClosedCaptionsOnIcon as dj, ClosedCaptionsIcon as dk, CommentIcon as dl, ComputerIcon as dm, DeviceIcon as dn, DownloadIcon as dp, EpisodesIcon as dq, EyeIcon as dr, FastBackwardIcon as ds, FastForwardIcon as dt, FlagIcon as du, FullscreenArrowExitIcon as dv, FullscreenArrowIcon as dw, FullscreenExitIcon as dx, FullscreenIcon as dy, HeartIcon as dz, type DefaultLayoutProps as e, RepeatOnIcon as e0, RepeatSquareOnIcon as e1, RepeatSquareIcon as e2, RepeatIcon as e3, ReplayIcon as e4, RotateIcon as e5, SearchIcon as e6, SeekBackward10Icon as e7, SeekBackward15Icon as e8, SeekBackward30Icon as e9, XMarkIcon as eA, type RemotionThumbnailProps as eB, RemotionThumbnail as eC, type RemotionPosterProps as eD, RemotionPoster as eE, type RemotionSliderThumbnailProps as eF, RemotionSliderThumbnail as eG, RemotionProviderLoader as eH, RemotionProvider as eI, isRemotionProvider as eJ, isRemotionSrc as eK, type RemotionSrc as eL, type RemotionInputProps as eM, type RemotionLoadingRenderer as eN, type RemotionErrorRenderer as eO, SeekBackwardIcon as ea, SeekForward10Icon as eb, SeekForward15Icon as ec, SeekForward30Icon as ed, SeekForwardIcon as ee, SendIcon as ef, SettingsMenuIcon as eg, SettingsSwitchIcon as eh, SettingsIcon as ei, ShareArrowIcon as ej, ShareIcon as ek, ShuffleOnIcon as el, ShuffleIcon as em, StopIcon as en, SubtitlesIcon as eo, SunIcon as ep, TheatreModeExitIcon as eq, TheatreModeIcon as er, ThumbsDownIcon as es, ThumbsUpIcon as et, TimerIcon as eu, TranscriptIcon as ev, TvIcon as ew, UserIcon as ex, VolumeHighIcon as ey, VolumeLowIcon as ez, DefaultLayoutContext as f, useDefaultLayoutWord as g, DefaultKeyboardDisplay as h, i18n$1 as i, type DefaultKeyboardDisplayProps as j, DefaultAudioLayout as k, type DefaultAudioLayoutProps as l, DefaultVideoLayout as m, DefaultVideoLargeLayout as n, DefaultVideoSmallLayout as o, DefaultVideoGestures as p, DefaultBufferingIndicator as q, type DefaultVideoLayoutProps as r, DefaultMenuCheckbox as s, type DefaultMenuCheckboxProps as t, useDefaultLayoutContext as u, DefaultMenuSection as v, DefaultMenuButton as w, DefaultMenuItem as x, DefaultMenuRadioGroup as y, type DefaultMenuSectionProps as z };
