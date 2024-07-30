"use client"

import * as React from 'react';
import { u as useSignal, k as isBoolean, w as uppercaseFirstChar, n as isUndefined, g as isArray, m as camelToKebabCase, z as isKeyboardClick, l as listenEvent, N as toggleClass, O as useContext } from './vidstack-wClXxc1a.js';
import { l as createComputed, c as createSignal, M as MediaAnnouncer, R as Root, m as Trigger, n as Content, G as GoogleCastButton, d as Captions, k as useChapterOptions, o as Root$5, p as Root$6, r as Root$7, u as useScoped, f as updateFontCssVars, v as Root$a, w as Group, j as useChapterTitle, x as createEffect, i as useActiveTextTrack, C as ChapterTitle$1, T as Title, y as Root$b, z as Track$1, A as TrackFill$1 } from './vidstack-DgWj9tqh.js';
import { b as useColorSchemePreference, c as useActive, d as useResizeObserver, u as useLayoutName, e as useTransitionActive } from './vidstack-D6DLZE-6.js';
import { a as useMediaContext, M as MuteButton, P as PlayButton, C as CaptionButton, b as PIPButton, F as FullscreenButton, S as SeekButton, A as AirPlayButton, L as LiveButton, g as Items, i as Root$1, j as Item, R as Root$2, I as Img, f as Root$3, B as Button, y as Portal, w as Track, x as TrackFill, q as Thumb, p as Steps, u as useMediaPlayer, z as Root$4, h as useAudioOptions, k as useCaptionOptions, l as Root$8, d as Preview, V as Value, c as Root$9, D as Chapters, E as Progress, T as Thumbnail, H as ChapterTitle, e as Time, G as Gesture } from './vidstack-x8CsPVpc.js';
import { u as useMediaState, a6 as isTrackCaptionKind, o as getDownloadFile, m as isRemotionSrc, ag as FONT_FAMILY_OPTION, ah as FONT_SIZE_OPTION, af as FONT_COLOR_OPTION, ai as FONT_OPACITY_OPTION, aj as FONT_TEXT_SHADOW_OPTION, al as FONT_SIGNALS, am as onFontReset, s as sortVideoQualities, P as Primitive, Y as mediaContext } from './vidstack-1EoJRWh6.js';
import { flushSync } from 'react-dom';
import { R as RemotionThumbnail, b as RemotionSliderThumbnail } from './vidstack-Dw1DfPZl.js';

const DefaultLayoutContext = React.createContext({});
DefaultLayoutContext.displayName = "DefaultLayoutContext";
function useDefaultLayoutContext() {
  return React.useContext(DefaultLayoutContext);
}
function useDefaultLayoutWord(word) {
  const { translations } = useDefaultLayoutContext();
  return i18n(translations, word);
}
function i18n(translations, word) {
  return translations?.[word] ?? word;
}

function useColorSchemeClass(colorScheme) {
  const systemColorPreference = useColorSchemePreference();
  if (colorScheme === "default") {
    return null;
  } else if (colorScheme === "system") {
    return systemColorPreference;
  } else {
    return colorScheme;
  }
}

function createDefaultMediaLayout({
  type,
  smLayoutWhen,
  renderLayout
}) {
  const Layout = React.forwardRef(
    ({
      children,
      className,
      disableTimeSlider = false,
      hideQualityBitrate = false,
      icons,
      colorScheme = "system",
      download = null,
      menuContainer = null,
      menuGroup = "bottom",
      noAudioGain = false,
      audioGains = { min: 0, max: 300, step: 25 },
      noGestures = false,
      noKeyboardAnimations = false,
      noModal = false,
      noScrubGesture,
      playbackRates = { min: 0, max: 2, step: 0.25 },
      seekStep = 10,
      showMenuDelay,
      showTooltipDelay = 700,
      sliderChaptersMinWidth = 325,
      slots,
      smallLayoutWhen = smLayoutWhen,
      thumbnails = null,
      translations,
      ...props
    }, forwardRef) => {
      const media = useMediaContext(), $load = useSignal(media.$props.load), $canLoad = useMediaState("canLoad"), $viewType = useMediaState("viewType"), $streamType = useMediaState("streamType"), $smallWhen = createComputed(() => {
        return isBoolean(smallLayoutWhen) ? smallLayoutWhen : smallLayoutWhen(media.player.state);
      }, [smallLayoutWhen]), userPrefersAnnouncements = createSignal(true), userPrefersKeyboardAnimations = createSignal(true), isMatch = $viewType === type, isSmallLayout = $smallWhen(), isForcedLayout = isBoolean(smallLayoutWhen), isLoadLayout = $load === "play" && !$canLoad, canRender = $canLoad || isForcedLayout || isLoadLayout, colorSchemeClass = useColorSchemeClass(colorScheme);
      useSignal($smallWhen);
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          ...props,
          className: `vds-${type}-layout` + (colorSchemeClass ? ` ${colorSchemeClass}` : "") + (className ? ` ${className}` : ""),
          "data-match": isMatch ? "" : null,
          "data-sm": isSmallLayout ? "" : null,
          "data-lg": !isSmallLayout ? "" : null,
          "data-size": isSmallLayout ? "sm" : "lg",
          "data-no-scrub-gesture": noScrubGesture ? "" : null,
          ref: forwardRef
        },
        canRender && isMatch ? /* @__PURE__ */ React.createElement(
          DefaultLayoutContext.Provider,
          {
            value: {
              disableTimeSlider,
              hideQualityBitrate,
              icons,
              colorScheme,
              download,
              isSmallLayout,
              menuContainer,
              menuGroup,
              noAudioGain,
              audioGains,
              noGestures,
              noKeyboardAnimations,
              noModal,
              noScrubGesture,
              showMenuDelay,
              showTooltipDelay,
              sliderChaptersMinWidth,
              slots,
              seekStep,
              playbackRates,
              thumbnails,
              translations,
              userPrefersAnnouncements,
              userPrefersKeyboardAnimations
            }
          },
          renderLayout({ streamType: $streamType, isSmallLayout, isLoadLayout }),
          children
        ) : null
      );
    }
  );
  Layout.displayName = "DefaultMediaLayout";
  return Layout;
}

function useDefaultAudioLayoutSlots() {
  return React.useContext(DefaultLayoutContext).slots;
}
function useDefaultVideoLayoutSlots() {
  return React.useContext(DefaultLayoutContext).slots;
}
function slot(slots, name, defaultValue) {
  const slot2 = slots?.[name], capitalizedName = uppercaseFirstChar(name);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, slots?.[`before${capitalizedName}`], isUndefined(slot2) ? defaultValue : slot2, slots?.[`after${capitalizedName}`]);
}

function DefaultAnnouncer() {
  const { userPrefersAnnouncements, translations } = useDefaultLayoutContext(), $userPrefersAnnouncements = useSignal(userPrefersAnnouncements);
  if (!$userPrefersAnnouncements)
    return null;
  return /* @__PURE__ */ React.createElement(MediaAnnouncer, { translations });
}
DefaultAnnouncer.displayName = "DefaultAnnouncer";

function DefaultTooltip({ content, placement, children }) {
  const { showTooltipDelay } = useDefaultLayoutContext();
  return /* @__PURE__ */ React.createElement(Root, { showDelay: showTooltipDelay }, /* @__PURE__ */ React.createElement(Trigger, { asChild: true }, children), /* @__PURE__ */ React.createElement(Content, { className: "vds-tooltip-content", placement }, content));
}
DefaultTooltip.displayName = "DefaultTooltip";

function DefaultPlayButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), playText = useDefaultLayoutWord("Play"), pauseText = useDefaultLayoutWord("Pause"), $paused = useMediaState("paused"), $ended = useMediaState("ended");
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: $paused ? playText : pauseText, placement: tooltip }, /* @__PURE__ */ React.createElement(PlayButton, { className: "vds-play-button vds-button", "aria-label": playText }, $ended ? /* @__PURE__ */ React.createElement(Icons.PlayButton.Replay, { className: "vds-icon" }) : $paused ? /* @__PURE__ */ React.createElement(Icons.PlayButton.Play, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.PlayButton.Pause, { className: "vds-icon" })));
}
DefaultPlayButton.displayName = "DefaultPlayButton";
const DefaultMuteButton = React.forwardRef(
  ({ tooltip }, forwardRef) => {
    const { icons: Icons } = useDefaultLayoutContext(), muteText = useDefaultLayoutWord("Mute"), unmuteText = useDefaultLayoutWord("Unmute"), $muted = useMediaState("muted"), $volume = useMediaState("volume");
    return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: $muted ? unmuteText : muteText, placement: tooltip }, /* @__PURE__ */ React.createElement(MuteButton, { className: "vds-mute-button vds-button", "aria-label": muteText, ref: forwardRef }, $muted || $volume == 0 ? /* @__PURE__ */ React.createElement(Icons.MuteButton.Mute, { className: "vds-icon" }) : $volume < 0.5 ? /* @__PURE__ */ React.createElement(Icons.MuteButton.VolumeLow, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.MuteButton.VolumeHigh, { className: "vds-icon" })));
  }
);
DefaultMuteButton.displayName = "DefaultMuteButton";
function DefaultCaptionButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), captionsText = useDefaultLayoutWord("Captions"), onText = useDefaultLayoutWord("Closed-Captions On"), offText = useDefaultLayoutWord("Closed-Captions Off"), $track = useMediaState("textTrack"), isOn = $track && isTrackCaptionKind($track);
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: isOn ? onText : offText, placement: tooltip }, /* @__PURE__ */ React.createElement(CaptionButton, { className: "vds-caption-button vds-button", "aria-label": captionsText }, isOn ? /* @__PURE__ */ React.createElement(Icons.CaptionButton.On, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.CaptionButton.Off, { className: "vds-icon" })));
}
DefaultCaptionButton.displayName = "DefaultCaptionButton";
function DefaultPIPButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), pipText = useDefaultLayoutWord("PiP"), enterText = useDefaultLayoutWord("Enter PiP"), exitText = useDefaultLayoutWord("Exit PiP"), $pip = useMediaState("pictureInPicture");
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: $pip ? exitText : enterText, placement: tooltip }, /* @__PURE__ */ React.createElement(PIPButton, { className: "vds-pip-button vds-button", "aria-label": pipText }, $pip ? /* @__PURE__ */ React.createElement(Icons.PIPButton.Exit, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.PIPButton.Enter, { className: "vds-icon" })));
}
DefaultPIPButton.displayName = "DefaultPIPButton";
function DefaultFullscreenButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), fullscreenText = useDefaultLayoutWord("Fullscreen"), enterText = useDefaultLayoutWord("Enter Fullscreen"), exitText = useDefaultLayoutWord("Exit Fullscreen"), $fullscreen = useMediaState("fullscreen");
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: $fullscreen ? exitText : enterText, placement: tooltip }, /* @__PURE__ */ React.createElement(FullscreenButton, { className: "vds-fullscreen-button vds-button", "aria-label": fullscreenText }, $fullscreen ? /* @__PURE__ */ React.createElement(Icons.FullscreenButton.Exit, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.FullscreenButton.Enter, { className: "vds-icon" })));
}
DefaultFullscreenButton.displayName = "DefaultFullscreenButton";
function DefaultSeekButton({
  backward,
  tooltip
}) {
  const { icons: Icons, seekStep } = useDefaultLayoutContext(), seekForwardText = useDefaultLayoutWord("Seek Forward"), seekBackwardText = useDefaultLayoutWord("Seek Backward"), seconds = (backward ? -1 : 1) * seekStep, label = seconds >= 0 ? seekForwardText : seekBackwardText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: label, placement: tooltip }, /* @__PURE__ */ React.createElement(SeekButton, { className: "vds-seek-button vds-button", seconds, "aria-label": label }, seconds >= 0 ? /* @__PURE__ */ React.createElement(Icons.SeekButton.Forward, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.SeekButton.Backward, { className: "vds-icon" })));
}
DefaultSeekButton.displayName = "DefaultSeekButton";
function DefaultAirPlayButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), airPlayText = useDefaultLayoutWord("AirPlay"), $state = useMediaState("remotePlaybackState"), stateText = useDefaultLayoutWord(uppercaseFirstChar($state)), label = `${airPlayText} ${stateText}`, Icon = ($state === "connecting" ? Icons.AirPlayButton.Connecting : $state === "connected" ? Icons.AirPlayButton.Connected : null) ?? Icons.AirPlayButton.Default;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: airPlayText, placement: tooltip }, /* @__PURE__ */ React.createElement(AirPlayButton, { className: "vds-airplay-button vds-button", "aria-label": label }, /* @__PURE__ */ React.createElement(Icon, { className: "vds-icon" })));
}
DefaultAirPlayButton.displayName = "DefaultAirPlayButton";
function DefaultGoogleCastButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), googleCastText = useDefaultLayoutWord("Google Cast"), $state = useMediaState("remotePlaybackState"), stateText = useDefaultLayoutWord(uppercaseFirstChar($state)), label = `${googleCastText} ${stateText}`, Icon = ($state === "connecting" ? Icons.GoogleCastButton.Connecting : $state === "connected" ? Icons.GoogleCastButton.Connected : null) ?? Icons.GoogleCastButton.Default;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: googleCastText, placement: tooltip }, /* @__PURE__ */ React.createElement(GoogleCastButton, { className: "vds-google-cast-button vds-button", "aria-label": label }, /* @__PURE__ */ React.createElement(Icon, { className: "vds-icon" })));
}
DefaultGoogleCastButton.displayName = "DefaultGoogleCastButton";
function DefaultLiveButton() {
  const $live = useMediaState("live"), label = useDefaultLayoutWord("Skip To Live"), liveText = useDefaultLayoutWord("LIVE");
  return $live ? /* @__PURE__ */ React.createElement(LiveButton, { className: "vds-live-button", "aria-label": label }, /* @__PURE__ */ React.createElement("span", { className: "vds-live-button-text" }, liveText)) : null;
}
DefaultLiveButton.displayName = "DefaultLiveButton";
function DefaultDownloadButton() {
  const { download, icons: Icons } = useDefaultLayoutContext(), $src = useMediaState("source"), $title = useMediaState("title"), file = getDownloadFile({
    title: $title,
    src: $src,
    download
  }), downloadText = useDefaultLayoutWord("Download");
  return file ? /* @__PURE__ */ React.createElement(DefaultTooltip, { content: downloadText, placement: "top" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      role: "button",
      className: "vds-download-button vds-button",
      "aria-label": downloadText,
      href: file.url + `?download=${file.name}`,
      download: file.name,
      target: "_blank"
    },
    Icons.DownloadButton ? /* @__PURE__ */ React.createElement(Icons.DownloadButton.Default, { className: "vds-icon" }) : null
  )) : null;
}
DefaultDownloadButton.displayName = "DefaultDownloadButton";

function DefaultCaptions() {
  const exampleText = useDefaultLayoutWord("Captions look like this");
  return /* @__PURE__ */ React.createElement(Captions, { className: "vds-captions", exampleText });
}
DefaultCaptions.displayName = "DefaultCaptions";

function DefaultControlsSpacer() {
  return /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" });
}
DefaultControlsSpacer.displayName = "DefaultControlsSpacer";

function DefaultChaptersMenu({ tooltip, placement, portalClass = "" }) {
  const {
    showMenuDelay,
    noModal,
    isSmallLayout,
    icons: Icons,
    menuGroup,
    menuContainer,
    colorScheme
  } = useDefaultLayoutContext(), chaptersText = useDefaultLayoutWord("Chapters"), options = useChapterOptions(), disabled = !options.length, { thumbnails } = useDefaultLayoutContext(), $src = useMediaState("currentSrc"), $viewType = useMediaState("viewType"), $offset = !isSmallLayout && menuGroup === "bottom" && $viewType === "video" ? 26 : 0, $RemotionThumbnail = useSignal(RemotionThumbnail), colorSchemeClass = useColorSchemeClass(colorScheme), [isOpen, setIsOpen] = React.useState(false);
  if (disabled)
    return null;
  function onOpen() {
    flushSync(() => {
      setIsOpen(true);
    });
  }
  function onClose() {
    setIsOpen(false);
  }
  const Content = /* @__PURE__ */ React.createElement(
    Items,
    {
      className: "vds-chapters-menu-items vds-menu-items",
      placement,
      offset: $offset
    },
    isOpen ? /* @__PURE__ */ React.createElement(
      Root$1,
      {
        className: "vds-chapters-radio-group vds-radio-group",
        value: options.selectedValue,
        "data-thumbnails": thumbnails ? "" : null
      },
      options.map(
        ({ cue, label, value, startTimeText, durationText, select, setProgressVar }) => /* @__PURE__ */ React.createElement(
          Item,
          {
            className: "vds-chapter-radio vds-radio",
            value,
            key: value,
            onSelect: select,
            ref: setProgressVar
          },
          thumbnails ? /* @__PURE__ */ React.createElement(Root$2, { src: thumbnails, className: "vds-thumbnail", time: cue.startTime }, /* @__PURE__ */ React.createElement(Img, null)) : $RemotionThumbnail && isRemotionSrc($src) ? /* @__PURE__ */ React.createElement($RemotionThumbnail, { className: "vds-thumbnail", frame: cue.startTime * $src.fps }) : null,
          /* @__PURE__ */ React.createElement("div", { className: "vds-chapter-radio-content" }, /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-radio-label" }, label), /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-radio-start-time" }, startTimeText), /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-radio-duration" }, durationText))
        )
      )
    ) : null
  );
  return /* @__PURE__ */ React.createElement(
    Root$3,
    {
      className: "vds-chapters-menu vds-menu",
      showDelay: showMenuDelay,
      onOpen,
      onClose
    },
    /* @__PURE__ */ React.createElement(DefaultTooltip, { content: chaptersText, placement: tooltip }, /* @__PURE__ */ React.createElement(
      Button,
      {
        className: "vds-menu-button vds-button",
        disabled,
        "aria-label": chaptersText
      },
      /* @__PURE__ */ React.createElement(Icons.Menu.Chapters, { className: "vds-icon" })
    )),
    noModal || !isSmallLayout ? Content : /* @__PURE__ */ React.createElement(
      Portal,
      {
        container: menuContainer,
        className: portalClass + (colorSchemeClass ? ` ${colorSchemeClass}` : ""),
        disabled: "fullscreen",
        "data-sm": isSmallLayout ? "" : null,
        "data-lg": !isSmallLayout ? "" : null,
        "data-size": isSmallLayout ? "sm" : "lg"
      },
      Content
    )
  );
}
DefaultChaptersMenu.displayName = "DefaultChaptersMenu";

function DefaultMenuSection({ label, value, children }) {
  const id = React.useId();
  if (!label) {
    return /* @__PURE__ */ React.createElement("div", { className: "vds-menu-section" }, /* @__PURE__ */ React.createElement("div", { className: "vds-menu-section-body" }, children));
  }
  return /* @__PURE__ */ React.createElement("section", { className: "vds-menu-section", role: "group", "aria-labelledby": id }, /* @__PURE__ */ React.createElement("div", { className: "vds-menu-section-title" }, /* @__PURE__ */ React.createElement("header", { id }, label), value ? /* @__PURE__ */ React.createElement("div", { className: "vds-menu-section-value" }, value) : null), /* @__PURE__ */ React.createElement("div", { className: "vds-menu-section-body" }, children));
}
DefaultMenuSection.displayName = "DefaultMenuSection";
function DefaultMenuButton({ label, hint = "", Icon, disabled = false }) {
  const { icons: Icons } = React.useContext(DefaultLayoutContext);
  return /* @__PURE__ */ React.createElement(Button, { className: "vds-menu-item", disabled }, /* @__PURE__ */ React.createElement(Icons.Menu.ArrowLeft, { className: "vds-menu-close-icon vds-icon" }), Icon ? /* @__PURE__ */ React.createElement(Icon, { className: "vds-menu-item-icon vds-icon" }) : null, /* @__PURE__ */ React.createElement("span", { className: "vds-menu-item-label" }, label), /* @__PURE__ */ React.createElement("span", { className: "vds-menu-item-hint" }, hint), /* @__PURE__ */ React.createElement(Icons.Menu.ArrowRight, { className: "vds-menu-open-icon vds-icon" }));
}
DefaultMenuButton.displayName = "DefaultMenuButton";
function DefaultMenuItem({ label, children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "vds-menu-item" }, /* @__PURE__ */ React.createElement("div", { className: "vds-menu-item-label" }, label), children);
}
DefaultMenuItem.displayName = "DefaultMenuItem";
function DefaultMenuRadioGroup({ value, options, onChange }) {
  const { icons: Icons } = useDefaultLayoutContext();
  return /* @__PURE__ */ React.createElement(Root$1, { className: "vds-radio-group", value, onChange }, options.map((option) => /* @__PURE__ */ React.createElement(Item, { className: "vds-radio", value: option.value, key: option.value }, /* @__PURE__ */ React.createElement(Icons.Menu.RadioCheck, { className: "vds-icon" }), /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label", "data-part": "label" }, option.label))));
}
DefaultMenuRadioGroup.displayName = "DefaultMenuRadioGroup";
function createRadioOptions(entries) {
  return React.useMemo(
    () => isArray(entries) ? entries.map((entry) => ({ label: entry, value: entry.toLowerCase() })) : Object.keys(entries).map((label) => ({ label, value: entries[label] })),
    [entries]
  );
}

function DefaultMenuSliderItem({
  label,
  value,
  UpIcon,
  DownIcon,
  children,
  isMin,
  isMax
}) {
  const hasTitle = label || value, Content = /* @__PURE__ */ React.createElement(React.Fragment, null, DownIcon ? /* @__PURE__ */ React.createElement(DownIcon, { className: "vds-icon down" }) : null, children, UpIcon ? /* @__PURE__ */ React.createElement(UpIcon, { className: "vds-icon up" }) : null);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `vds-menu-item vds-menu-slider-item${hasTitle ? " group" : ""}`,
      "data-min": isMin ? "" : null,
      "data-max": isMax ? "" : null
    },
    hasTitle ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "vds-menu-slider-title" }, label ? /* @__PURE__ */ React.createElement("div", null, label) : null, value ? /* @__PURE__ */ React.createElement("div", null, value) : null), /* @__PURE__ */ React.createElement("div", { className: "vds-menu-slider-body" }, Content)) : Content
  );
}
DefaultMenuSliderItem.displayName = "DefaultMenuSliderItem";
function DefaultSliderParts() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React.createElement(Thumb, { className: "vds-slider-thumb" }));
}
DefaultSliderParts.displayName = "DefaultSliderParts";
function DefaultSliderSteps() {
  return /* @__PURE__ */ React.createElement(Steps, { className: "vds-slider-steps" }, (step) => /* @__PURE__ */ React.createElement("div", { className: "vds-slider-step", key: String(step) }));
}
DefaultSliderSteps.displayName = "DefaultSliderSteps";

function DefaultFontMenu() {
  const label = useDefaultLayoutWord("Caption Styles"), $hasCaptions = useMediaState("hasCaptions"), fontSectionLabel = useDefaultLayoutWord("Font"), textSectionLabel = useDefaultLayoutWord("Text"), textBgSectionLabel = useDefaultLayoutWord("Text Background"), displayBgSectionLabel = useDefaultLayoutWord("Display Background");
  if (!$hasCaptions)
    return null;
  return /* @__PURE__ */ React.createElement(Root$3, { className: "vds-font-menu vds-menu" }, /* @__PURE__ */ React.createElement(DefaultMenuButton, { label }), /* @__PURE__ */ React.createElement(Items, { className: "vds-font-style-items vds-menu-items" }, /* @__PURE__ */ React.createElement(DefaultMenuSection, { label: fontSectionLabel }, /* @__PURE__ */ React.createElement(DefaultFontFamilyMenu, null), /* @__PURE__ */ React.createElement(DefaultFontSizeSlider, null)), /* @__PURE__ */ React.createElement(DefaultMenuSection, { label: textSectionLabel }, /* @__PURE__ */ React.createElement(DefaultTextColorInput, null), /* @__PURE__ */ React.createElement(DefaultTextShadowMenu, null), /* @__PURE__ */ React.createElement(DefaultTextOpacitySlider, null)), /* @__PURE__ */ React.createElement(DefaultMenuSection, { label: textBgSectionLabel }, /* @__PURE__ */ React.createElement(DefaultTextBgInput, null), /* @__PURE__ */ React.createElement(DefaultTextBgOpacitySlider, null)), /* @__PURE__ */ React.createElement(DefaultMenuSection, { label: displayBgSectionLabel }, /* @__PURE__ */ React.createElement(DefaultDisplayBgInput, null), /* @__PURE__ */ React.createElement(DefaultDisplayBgOpacitySlider, null)), /* @__PURE__ */ React.createElement(DefaultMenuSection, null, /* @__PURE__ */ React.createElement(DefaultResetMenuItem, null))));
}
DefaultFontMenu.displayName = "DefaultFontMenu";
function DefaultFontFamilyMenu() {
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Family", type: "fontFamily", option: FONT_FAMILY_OPTION });
}
DefaultFontFamilyMenu.displayName = "DefaultFontFamilyMenu";
function DefaultFontSizeSlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_SIZE_OPTION,
    upIcon: Icons.Menu.FontSizeUp,
    downIcon: Icons.Menu.FontSizeDown
  };
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Size", type: "fontSize", option });
}
DefaultFontSizeSlider.displayName = "DefaultFontSizeSlider";
function DefaultTextColorInput() {
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Color", type: "textColor", option: FONT_COLOR_OPTION });
}
DefaultTextColorInput.displayName = "DefaultTextColorInput";
function DefaultTextOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_OPACITY_OPTION,
    upIcon: Icons.Menu.OpacityUp,
    downIcon: Icons.Menu.OpacityDown
  };
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Opacity", type: "textOpacity", option });
}
DefaultTextOpacitySlider.displayName = "DefaultTextOpacitySlider";
function DefaultTextShadowMenu() {
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Shadow", type: "textShadow", option: FONT_TEXT_SHADOW_OPTION });
}
DefaultTextShadowMenu.displayName = "DefaultTextShadowMenu";
function DefaultTextBgInput() {
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Color", type: "textBg", option: FONT_COLOR_OPTION });
}
DefaultTextBgInput.displayName = "DefaultTextBgInput";
function DefaultTextBgOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_OPACITY_OPTION,
    upIcon: Icons.Menu.OpacityUp,
    downIcon: Icons.Menu.OpacityDown
  };
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Opacity", type: "textBgOpacity", option });
}
DefaultTextBgOpacitySlider.displayName = "DefaultTextBgOpacitySlider";
function DefaultDisplayBgInput() {
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Color", type: "displayBg", option: FONT_COLOR_OPTION });
}
DefaultDisplayBgInput.displayName = "DefaultDisplayBgInput";
function DefaultDisplayBgOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_OPACITY_OPTION,
    upIcon: Icons.Menu.OpacityUp,
    downIcon: Icons.Menu.OpacityDown
  };
  return /* @__PURE__ */ React.createElement(DefaultFontSetting, { label: "Opacity", type: "displayBgOpacity", option });
}
DefaultDisplayBgOpacitySlider.displayName = "DefaultDisplayBgOpacitySlider";
function DefaultFontSetting({ label, option, type }) {
  const player = useMediaPlayer(), $currentValue = FONT_SIGNALS[type], $value = useSignal($currentValue), translatedLabel = useDefaultLayoutWord(label);
  const notify = React.useCallback(() => {
    player?.dispatchEvent(new Event("vds-font-change"));
  }, [player]);
  const onChange = React.useCallback(
    (newValue) => {
      $currentValue.set(newValue);
      notify();
    },
    [$currentValue, notify]
  );
  if (option.type === "color") {
    let onColorChange2 = function(event) {
      onChange(event.target.value);
    };
    return /* @__PURE__ */ React.createElement(DefaultMenuItem, { label: translatedLabel }, /* @__PURE__ */ React.createElement("input", { className: "vds-color-picker", type: "color", value: $value, onChange: onColorChange2 }));
  }
  if (option.type === "slider") {
    let onSliderValueChange2 = function(value) {
      onChange(value + "%");
    };
    const { min, max, step, upIcon, downIcon } = option;
    return /* @__PURE__ */ React.createElement(
      DefaultMenuSliderItem,
      {
        label: translatedLabel,
        value: $value,
        UpIcon: upIcon,
        DownIcon: downIcon,
        isMin: $value === min + "%",
        isMax: $value === max + "%"
      },
      /* @__PURE__ */ React.createElement(
        Root$4,
        {
          className: "vds-slider",
          min,
          max,
          step,
          keyStep: step,
          value: parseInt($value),
          "aria-label": translatedLabel,
          onValueChange: onSliderValueChange2,
          onDragValueChange: onSliderValueChange2
        },
        /* @__PURE__ */ React.createElement(DefaultSliderParts, null),
        /* @__PURE__ */ React.createElement(DefaultSliderSteps, null)
      )
    );
  }
  if (option.type === "radio") {
    return /* @__PURE__ */ React.createElement(
      DefaultFontRadioGroup,
      {
        id: camelToKebabCase(type),
        label: translatedLabel,
        value: $value,
        values: option.values,
        onChange
      }
    );
  }
  return null;
}
DefaultFontSetting.displayName = "DefaultFontSetting";
function DefaultFontRadioGroup({ id, label, value, values, onChange }) {
  const radioOptions = createRadioOptions(values), { translations } = useDefaultLayoutContext(), hint = React.useMemo(() => {
    const label2 = radioOptions.find((radio) => radio.value === value)?.label || "";
    return i18n(translations, label2);
  }, [value, radioOptions]);
  return /* @__PURE__ */ React.createElement(Root$3, { className: `vds-${id}-menu vds-menu` }, /* @__PURE__ */ React.createElement(DefaultMenuButton, { label, hint }), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React.createElement(DefaultMenuRadioGroup, { value, options: radioOptions, onChange })));
}
DefaultFontRadioGroup.displayName = "DefaultFontRadioGroup";
function DefaultResetMenuItem() {
  const resetText = useDefaultLayoutWord("Reset");
  return /* @__PURE__ */ React.createElement("button", { className: "vds-menu-item", role: "menuitem", onClick: onFontReset }, /* @__PURE__ */ React.createElement("span", { className: "vds-menu-item-label" }, resetText));
}
DefaultResetMenuItem.displayName = "DefaultResetMenuItem";

function DefaultMenuCheckbox({
  label,
  checked,
  storageKey,
  defaultChecked = false,
  onChange
}) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked), [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    const savedValue = storageKey ? localStorage.getItem(storageKey) : null, checked2 = !!(savedValue ?? defaultChecked);
    setIsChecked(checked2);
    onChange?.(checked2);
  }, []);
  React.useEffect(() => {
    if (isBoolean(checked))
      setIsChecked(checked);
  }, [checked]);
  function onPress(event) {
    if (event && "button" in event && event?.button === 1)
      return;
    const toggledCheck = !isChecked;
    setIsChecked(toggledCheck);
    if (storageKey)
      localStorage.setItem(storageKey, toggledCheck ? "1" : "");
    onChange?.(toggledCheck, event?.nativeEvent);
    setIsActive(false);
  }
  function onActive(event) {
    if (event.button !== 0)
      return;
    setIsActive(true);
  }
  function onKeyDown(event) {
    if (isKeyboardClick(event.nativeEvent))
      onPress();
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "vds-menu-checkbox",
      role: "menuitemcheckbox",
      tabIndex: 0,
      "aria-label": label,
      "aria-checked": isChecked ? "true" : "false",
      "data-active": isActive ? "" : null,
      onPointerUp: onPress,
      onPointerDown: onActive,
      onKeyDown
    }
  );
}
DefaultMenuCheckbox.displayName = "DefaultMenuCheckbox";

function DefaultAccessibilityMenu({ slots }) {
  const label = useDefaultLayoutWord("Accessibility"), { icons: Icons } = useDefaultLayoutContext();
  return /* @__PURE__ */ React.createElement(Root$3, { className: "vds-accessibility-menu vds-menu" }, /* @__PURE__ */ React.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Accessibility }), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, slot(slots, "accessibilityMenuItemsStart", null), /* @__PURE__ */ React.createElement(DefaultMenuSection, null, /* @__PURE__ */ React.createElement(DefaultAnnouncementsMenuCheckbox, null), /* @__PURE__ */ React.createElement(DefaultKeyboardAnimationsMenuCheckbox, null)), /* @__PURE__ */ React.createElement(DefaultMenuSection, null, /* @__PURE__ */ React.createElement(DefaultFontMenu, null)), slot(slots, "accessibilityMenuItemsEnd", null)));
}
DefaultAccessibilityMenu.displayName = "DefaultAccessibilityMenu";
function DefaultAnnouncementsMenuCheckbox() {
  const { userPrefersAnnouncements } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Announcements");
  function onChange(checked) {
    userPrefersAnnouncements.set(checked);
  }
  return /* @__PURE__ */ React.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React.createElement(
    DefaultMenuCheckbox,
    {
      label,
      defaultChecked: true,
      storageKey: "vds-player::announcements",
      onChange
    }
  ));
}
DefaultAnnouncementsMenuCheckbox.displayName = "DefaultAnnouncementsMenuCheckbox";
function DefaultKeyboardAnimationsMenuCheckbox() {
  const $viewType = useMediaState("viewType"), { userPrefersKeyboardAnimations, noKeyboardAnimations } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Keyboard Animations");
  if ($viewType !== "video" || noKeyboardAnimations)
    return null;
  function onChange(checked) {
    userPrefersKeyboardAnimations.set(checked);
  }
  return /* @__PURE__ */ React.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React.createElement(
    DefaultMenuCheckbox,
    {
      label,
      defaultChecked: true,
      storageKey: "vds-player::keyboard-animations",
      onChange
    }
  ));
}
DefaultKeyboardAnimationsMenuCheckbox.displayName = "DefaultKeyboardAnimationsMenuCheckbox";

function DefaultAudioMenu({ slots }) {
  const label = useDefaultLayoutWord("Audio"), $canSetAudioGain = useMediaState("canSetAudioGain"), $audioTracks = useMediaState("audioTracks"), { noAudioGain, icons: Icons } = useDefaultLayoutContext(), hasGainSlider = $canSetAudioGain && !noAudioGain, $disabled = !hasGainSlider && $audioTracks.length <= 1;
  if ($disabled)
    return null;
  return /* @__PURE__ */ React.createElement(Root$3, { className: "vds-audio-menu vds-menu" }, /* @__PURE__ */ React.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Audio }), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, slot(slots, "audioMenuItemsStart", null), /* @__PURE__ */ React.createElement(DefaultAudioTracksMenu, null), hasGainSlider ? /* @__PURE__ */ React.createElement(DefaultAudioBoostMenuSection, null) : null, slot(slots, "audioMenuItemsEnd", null)));
}
DefaultAudioMenu.displayName = "DefaultAudioMenu";
function DefaultAudioBoostMenuSection() {
  const $audioGain = useMediaState("audioGain"), label = useDefaultLayoutWord("Boost"), value = Math.round((($audioGain ?? 1) - 1) * 100) + "%", $canSetAudioGain = useMediaState("canSetAudioGain"), { noAudioGain, icons: Icons } = useDefaultLayoutContext(), $disabled = !$canSetAudioGain || noAudioGain, min = useGainMin(), max = useGainMax();
  if ($disabled)
    return null;
  return /* @__PURE__ */ React.createElement(DefaultMenuSection, { label, value }, /* @__PURE__ */ React.createElement(
    DefaultMenuSliderItem,
    {
      UpIcon: Icons.Menu.AudioBoostUp,
      DownIcon: Icons.Menu.AudioBoostDown,
      isMin: (($audioGain ?? 1) - 1) * 100 <= min,
      isMax: (($audioGain ?? 1) - 1) * 100 === max
    },
    /* @__PURE__ */ React.createElement(DefaultAudioGainSlider, null)
  ));
}
DefaultAudioBoostMenuSection.displayName = "DefaultAudioBoostMenuSection";
function useGainMin() {
  const { audioGains } = useDefaultLayoutContext(), min = isArray(audioGains) ? audioGains[0] : audioGains?.min;
  return min ?? 0;
}
function useGainMax() {
  const { audioGains } = useDefaultLayoutContext(), max = isArray(audioGains) ? audioGains[audioGains.length - 1] : audioGains?.max;
  return max ?? 300;
}
function useGainStep() {
  const { audioGains } = useDefaultLayoutContext(), step = isArray(audioGains) ? audioGains[1] - audioGains[0] : audioGains?.step;
  return step || 25;
}
function DefaultAudioGainSlider() {
  const label = useDefaultLayoutWord("Audio Boost"), min = useGainMin(), max = useGainMax(), step = useGainStep();
  return /* @__PURE__ */ React.createElement(
    Root$5,
    {
      className: "vds-audio-gain-slider vds-slider",
      "aria-label": label,
      min,
      max,
      step,
      keyStep: step
    },
    /* @__PURE__ */ React.createElement(DefaultSliderParts, null),
    /* @__PURE__ */ React.createElement(DefaultSliderSteps, null)
  );
}
DefaultAudioGainSlider.displayName = "DefaultAudioGainSlider";
function DefaultAudioTracksMenu() {
  const { icons: Icons } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Track"), defaultText = useDefaultLayoutWord("Default"), $track = useMediaState("audioTrack"), options = useAudioOptions();
  if (options.disabled)
    return null;
  return /* @__PURE__ */ React.createElement(Root$3, { className: "vds-audio-track-menu vds-menu" }, /* @__PURE__ */ React.createElement(
    DefaultMenuButton,
    {
      label,
      hint: $track?.label ?? defaultText,
      disabled: options.disabled,
      Icon: Icons.Menu.Audio
    }
  ), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React.createElement(
    Root$1,
    {
      className: "vds-audio-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React.createElement(
      Item,
      {
        className: "vds-audio-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React.createElement(Icons.Menu.RadioCheck, { className: "vds-icon" }),
      /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  )));
}
DefaultAudioTracksMenu.displayName = "DefaultAudioTracksMenu";

function DefaultCaptionMenu({ slots }) {
  const { icons: Icons } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Captions"), offText = useDefaultLayoutWord("Off"), options = useCaptionOptions({ off: offText }), hint = options.selectedTrack?.label ?? offText;
  if (options.disabled)
    return null;
  return /* @__PURE__ */ React.createElement(Root$3, { className: "vds-captions-menu vds-menu" }, /* @__PURE__ */ React.createElement(
    DefaultMenuButton,
    {
      label,
      hint,
      disabled: options.disabled,
      Icon: Icons.Menu.Captions
    }
  ), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, slot(slots, "captionsMenuItemsStart", null), /* @__PURE__ */ React.createElement(
    Root$1,
    {
      className: "vds-captions-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React.createElement(
      Item,
      {
        className: "vds-caption-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React.createElement(Icons.Menu.RadioCheck, { className: "vds-icon" }),
      /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  ), slot(slots, "captionsMenuItemsEnd", null)));
}
DefaultCaptionMenu.displayName = "DefaultCaptionMenu";

function DefaultPlaybackMenu({ slots }) {
  const label = useDefaultLayoutWord("Playback"), { icons: Icons } = useDefaultLayoutContext();
  return /* @__PURE__ */ React.createElement(Root$3, { className: "vds-playback-menu vds-menu" }, /* @__PURE__ */ React.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Playback }), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, slot(slots, "playbackMenuItemsStart", null), /* @__PURE__ */ React.createElement(DefaultMenuSection, null, slot(slots, "playbackMenuLoop", /* @__PURE__ */ React.createElement(DefaultLoopMenuCheckbox, null))), /* @__PURE__ */ React.createElement(DefaultSpeedMenuSection, null), /* @__PURE__ */ React.createElement(DefaultQualityMenuSection, null), slot(slots, "playbackMenuItemsEnd", null)));
}
DefaultPlaybackMenu.displayName = "DefaultPlaybackMenu";
function DefaultLoopMenuCheckbox() {
  const { remote } = useMediaContext(), label = useDefaultLayoutWord("Loop");
  function onChange(checked, trigger) {
    remote.userPrefersLoopChange(checked, trigger);
  }
  return /* @__PURE__ */ React.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React.createElement(DefaultMenuCheckbox, { label, storageKey: "vds-player::user-loop", onChange }));
}
DefaultLoopMenuCheckbox.displayName = "DefaultLoopMenuCheckbox";
function DefaultAutoQualityMenuCheckbox() {
  const { remote, qualities } = useMediaContext(), $autoQuality = useMediaState("autoQuality"), label = useDefaultLayoutWord("Auto");
  function onChange(checked, trigger) {
    if (checked) {
      remote.requestAutoQuality(trigger);
    } else {
      remote.changeQuality(qualities.selectedIndex, trigger);
    }
  }
  return /* @__PURE__ */ React.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React.createElement(
    DefaultMenuCheckbox,
    {
      label,
      checked: $autoQuality,
      onChange,
      defaultChecked: $autoQuality
    }
  ));
}
DefaultAutoQualityMenuCheckbox.displayName = "DefaultAutoQualityMenuCheckbox";
function DefaultQualityMenuSection() {
  const { hideQualityBitrate, icons: Icons } = useDefaultLayoutContext(), $canSetQuality = useMediaState("canSetQuality"), $qualities = useMediaState("qualities"), $quality = useMediaState("quality"), label = useDefaultLayoutWord("Quality"), autoText = useDefaultLayoutWord("Auto"), sortedQualities = React.useMemo(() => sortVideoQualities($qualities), [$qualities]);
  if (!$canSetQuality || $qualities.length <= 1)
    return null;
  const height = $quality?.height, bitrate = !hideQualityBitrate ? $quality?.bitrate : null, bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null, value = height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : autoText, isMin = sortedQualities[0] === $quality, isMax = sortedQualities.at(-1) === $quality;
  return /* @__PURE__ */ React.createElement(DefaultMenuSection, { label, value }, /* @__PURE__ */ React.createElement(
    DefaultMenuSliderItem,
    {
      UpIcon: Icons.Menu.QualityUp,
      DownIcon: Icons.Menu.QualityDown,
      isMin,
      isMax
    },
    /* @__PURE__ */ React.createElement(DefaultQualitySlider, null)
  ), /* @__PURE__ */ React.createElement(DefaultAutoQualityMenuCheckbox, null));
}
DefaultQualityMenuSection.displayName = "DefaultQualityMenuSection";
function DefaultQualitySlider() {
  const label = useDefaultLayoutWord("Quality");
  return /* @__PURE__ */ React.createElement(Root$6, { className: "vds-quality-slider vds-slider", "aria-label": label }, /* @__PURE__ */ React.createElement(DefaultSliderParts, null), /* @__PURE__ */ React.createElement(DefaultSliderSteps, null));
}
DefaultQualitySlider.displayName = "DefaultQualitySlider";
function DefaultSpeedMenuSection() {
  const { icons: Icons } = useDefaultLayoutContext(), $playbackRate = useMediaState("playbackRate"), $canSetPlaybackRate = useMediaState("canSetPlaybackRate"), label = useDefaultLayoutWord("Speed"), normalText = useDefaultLayoutWord("Normal"), min = useSpeedMin(), max = useSpeedMax(), value = $playbackRate === 1 ? normalText : $playbackRate + "x";
  if (!$canSetPlaybackRate)
    return null;
  return /* @__PURE__ */ React.createElement(DefaultMenuSection, { label, value }, /* @__PURE__ */ React.createElement(
    DefaultMenuSliderItem,
    {
      UpIcon: Icons.Menu.SpeedUp,
      DownIcon: Icons.Menu.SpeedDown,
      isMin: $playbackRate === min,
      isMax: $playbackRate === max
    },
    /* @__PURE__ */ React.createElement(DefaultSpeedSlider, null)
  ));
}
function useSpeedMin() {
  const { playbackRates } = useDefaultLayoutContext(), rates = playbackRates;
  return (isArray(rates) ? rates[0] : rates?.min) ?? 0;
}
function useSpeedMax() {
  const { playbackRates } = useDefaultLayoutContext(), rates = playbackRates;
  return (isArray(rates) ? rates[rates.length - 1] : rates?.max) ?? 2;
}
function useSpeedStep() {
  const { playbackRates } = useDefaultLayoutContext(), rates = playbackRates;
  return (isArray(rates) ? rates[1] - rates[0] : rates?.step) || 0.25;
}
function DefaultSpeedSlider() {
  const label = useDefaultLayoutWord("Speed"), min = useSpeedMin(), max = useSpeedMax(), step = useSpeedStep();
  return /* @__PURE__ */ React.createElement(
    Root$7,
    {
      className: "vds-speed-slider vds-slider",
      "aria-label": label,
      min,
      max,
      step,
      keyStep: step
    },
    /* @__PURE__ */ React.createElement(DefaultSliderParts, null),
    /* @__PURE__ */ React.createElement(DefaultSliderSteps, null)
  );
}
DefaultSpeedSlider.displayName = "DefaultSpeedSlider";

function DefaultSettingsMenu({
  tooltip,
  placement,
  portalClass = "",
  slots
}) {
  const {
    showMenuDelay,
    icons: Icons,
    isSmallLayout,
    menuContainer,
    menuGroup,
    noModal,
    colorScheme
  } = useDefaultLayoutContext(), settingsText = useDefaultLayoutWord("Settings"), $viewType = useMediaState("viewType"), $offset = !isSmallLayout && menuGroup === "bottom" && $viewType === "video" ? 26 : 0, colorSchemeClass = useColorSchemeClass(colorScheme), [isOpen, setIsOpen] = React.useState(false);
  useScoped(updateFontCssVars);
  function onOpen() {
    flushSync(() => {
      setIsOpen(true);
    });
  }
  function onClose() {
    setIsOpen(false);
  }
  const Content = /* @__PURE__ */ React.createElement(
    Items,
    {
      className: "vds-settings-menu-items vds-menu-items",
      placement,
      offset: $offset
    },
    isOpen ? /* @__PURE__ */ React.createElement(React.Fragment, null, slot(slots, "settingsMenuItemsStart", null), slot(slots, "settingsMenuStartItems", null), /* @__PURE__ */ React.createElement(DefaultPlaybackMenu, { slots }), /* @__PURE__ */ React.createElement(DefaultAccessibilityMenu, { slots }), /* @__PURE__ */ React.createElement(DefaultAudioMenu, { slots }), /* @__PURE__ */ React.createElement(DefaultCaptionMenu, { slots }), slot(slots, "settingsMenuEndItems", null), slot(slots, "settingsMenuItemsEnd", null)) : null
  );
  return /* @__PURE__ */ React.createElement(
    Root$3,
    {
      className: "vds-settings-menu vds-menu",
      showDelay: showMenuDelay,
      onOpen,
      onClose
    },
    /* @__PURE__ */ React.createElement(DefaultTooltip, { content: settingsText, placement: tooltip }, /* @__PURE__ */ React.createElement(Button, { className: "vds-menu-button vds-button", "aria-label": settingsText }, /* @__PURE__ */ React.createElement(Icons.Menu.Settings, { className: "vds-icon vds-rotate-icon" }))),
    noModal || !isSmallLayout ? Content : /* @__PURE__ */ React.createElement(
      Portal,
      {
        className: portalClass + (colorSchemeClass ? ` ${colorSchemeClass}` : ""),
        container: menuContainer,
        disabled: "fullscreen",
        "data-sm": isSmallLayout ? "" : null,
        "data-lg": !isSmallLayout ? "" : null,
        "data-size": isSmallLayout ? "sm" : "lg",
        "data-view-type": $viewType
      },
      Content
    )
  );
}
DefaultSettingsMenu.displayName = "DefaultSettingsMenu";

function DefaultVolumePopup({ tooltip, orientation, slots }) {
  const $pointer = useMediaState("pointer"), $muted = useMediaState("muted"), $canSetVolume = useMediaState("canSetVolume"), [rootEl, setRootEl] = React.useState(null), isRootActive = useActive(rootEl), muteButton = slot(slots, "muteButton", /* @__PURE__ */ React.createElement(DefaultMuteButton, { tooltip }));
  if (!$canSetVolume) {
    return muteButton;
  }
  return $pointer === "coarse" && !$muted ? null : /* @__PURE__ */ React.createElement("div", { className: "vds-volume", "data-active": isRootActive ? "" : null, ref: setRootEl }, muteButton, /* @__PURE__ */ React.createElement("div", { className: "vds-volume-popup" }, slot(slots, "volumeSlider", /* @__PURE__ */ React.createElement(DefaultVolumeSlider, { orientation }))));
}
DefaultVolumePopup.displayName = "DefaultVolumePopup";
function DefaultVolumeSlider(props) {
  const label = useDefaultLayoutWord("Volume");
  return /* @__PURE__ */ React.createElement(Root$8, { className: "vds-volume-slider vds-slider", "aria-label": label, ...props }, /* @__PURE__ */ React.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React.createElement(Thumb, { className: "vds-slider-thumb" }), /* @__PURE__ */ React.createElement(Preview, { className: "vds-slider-preview", noClamp: true }, /* @__PURE__ */ React.createElement(Value, { className: "vds-slider-value" })));
}
DefaultVolumeSlider.displayName = "DefaultVolumeSlider";
function DefaultTimeSlider() {
  const [instance, setInstance] = React.useState(null), [width, setWidth] = React.useState(0), $src = useMediaState("currentSrc"), { thumbnails, sliderChaptersMinWidth, disableTimeSlider, seekStep, noScrubGesture } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Seek"), $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail);
  const onResize = React.useCallback(() => {
    const el = instance?.el;
    el && setWidth(el.clientWidth);
  }, [instance]);
  useResizeObserver(instance?.el, onResize);
  return /* @__PURE__ */ React.createElement(
    Root$9,
    {
      className: "vds-time-slider vds-slider",
      "aria-label": label,
      disabled: disableTimeSlider,
      noSwipeGesture: noScrubGesture,
      keyStep: seekStep,
      ref: setInstance
    },
    /* @__PURE__ */ React.createElement(
      Chapters,
      {
        className: "vds-slider-chapters",
        disabled: width < sliderChaptersMinWidth
      },
      (cues, forwardRef) => cues.map((cue) => /* @__PURE__ */ React.createElement("div", { className: "vds-slider-chapter", key: cue.startTime, ref: forwardRef }, /* @__PURE__ */ React.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React.createElement(Progress, { className: "vds-slider-progress vds-slider-track" })))
    ),
    /* @__PURE__ */ React.createElement(Thumb, { className: "vds-slider-thumb" }),
    /* @__PURE__ */ React.createElement(Preview, { className: "vds-slider-preview" }, thumbnails ? /* @__PURE__ */ React.createElement(
      Thumbnail.Root,
      {
        src: thumbnails,
        className: "vds-slider-thumbnail vds-thumbnail"
      },
      /* @__PURE__ */ React.createElement(Thumbnail.Img, null)
    ) : $RemotionSliderThumbnail && isRemotionSrc($src) ? /* @__PURE__ */ React.createElement($RemotionSliderThumbnail, { className: "vds-slider-thumbnail vds-thumbnail" }) : null, /* @__PURE__ */ React.createElement(ChapterTitle, { className: "vds-slider-chapter-title" }), /* @__PURE__ */ React.createElement(Value, { className: "vds-slider-value" }))
  );
}
DefaultTimeSlider.displayName = "DefaultTimeSlider";

function DefaultTimeGroup({ slots }) {
  const $duration = useMediaState("duration");
  if (!$duration)
    return null;
  return /* @__PURE__ */ React.createElement("div", { className: "vds-time-group" }, slot(slots, "currentTime", /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "current" })), slot(slots, "timeSeparator", /* @__PURE__ */ React.createElement("div", { className: "vds-time-divider" }, "/")), slot(slots, "endTime", /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "duration" })));
}
DefaultTimeGroup.displayName = "DefaultTimeGroup";
function DefaultTimeInfo({ slots }) {
  const $live = useMediaState("live");
  return $live ? slot(slots, "liveButton", /* @__PURE__ */ React.createElement(DefaultLiveButton, null)) : /* @__PURE__ */ React.createElement(DefaultTimeGroup, { slots });
}
DefaultTimeInfo.displayName = "DefaultTimeInfo";
function DefaultTimeInvert({ slots }) {
  const $live = useMediaState("live"), $duration = useMediaState("duration");
  return $live ? slot(slots, "liveButton", /* @__PURE__ */ React.createElement(DefaultLiveButton, null)) : slot(
    slots,
    "endTime",
    $duration ? /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "current", toggle: true, remainder: true }) : null
  );
}
DefaultTimeInvert.displayName = "DefaultTimeInvert";

const MediaLayout$1 = createDefaultMediaLayout({
  type: "audio",
  smLayoutWhen({ width }) {
    return width < 576;
  },
  renderLayout: () => /* @__PURE__ */ React.createElement(AudioLayout, null)
});
function DefaultAudioLayout(props) {
  const [scrubbing, setScrubbing] = React.useState(false), $pointer = useMediaState("pointer");
  const onStartScrubbing = React.useCallback((event) => {
    const { target } = event, hasTimeSlider = !!(target instanceof HTMLElement && target.closest(".vds-time-slider"));
    if (!hasTimeSlider)
      return;
    event.nativeEvent.stopImmediatePropagation();
    setScrubbing(true);
  }, []);
  const onStopScrubbing = React.useCallback(() => {
    setScrubbing(false);
  }, []);
  React.useEffect(() => {
    if (scrubbing)
      return listenEvent(window, "pointerdown", onStopScrubbing);
  }, [scrubbing, onStopScrubbing]);
  return /* @__PURE__ */ React.createElement(
    MediaLayout$1,
    {
      ...props,
      "data-scrubbing": scrubbing ? "" : null,
      onPointerDown: scrubbing ? (e) => e.stopPropagation() : void 0,
      onPointerDownCapture: $pointer === "coarse" && !scrubbing ? onStartScrubbing : void 0
    }
  );
}
DefaultAudioLayout.displayName = "DefaultAudioLayout";
function AudioLayout() {
  const slots = useDefaultAudioLayoutSlots();
  useLayoutName("audio");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultAnnouncer, null), /* @__PURE__ */ React.createElement(DefaultCaptions, null), /* @__PURE__ */ React.createElement(Root$a, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "seekBackwardButton", /* @__PURE__ */ React.createElement(DefaultSeekButton, { backward: true, tooltip: "top start" })), slot(slots, "playButton", /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top center" })), slot(slots, "seekForwardButton", /* @__PURE__ */ React.createElement(DefaultSeekButton, { tooltip: "top center" })), /* @__PURE__ */ React.createElement(DefaultAudioTitle, null), slot(slots, "timeSlider", /* @__PURE__ */ React.createElement(DefaultTimeSlider, null)), /* @__PURE__ */ React.createElement(DefaultTimeInvert, { slots }), /* @__PURE__ */ React.createElement(DefaultVolumePopup, { orientation: "vertical", tooltip: "top", slots }), slot(slots, "captionButton", /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "top center" })), slot(slots, "downloadButton", /* @__PURE__ */ React.createElement(DefaultDownloadButton, null)), /* @__PURE__ */ React.createElement(DefaultAudioMenus, { slots }))));
}
AudioLayout.displayName = "AudioLayout";
function DefaultAudioMenus({ slots }) {
  const { isSmallLayout, noModal } = useDefaultLayoutContext(), placement = noModal ? "top end" : !isSmallLayout ? "top end" : null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, slot(
    slots,
    "chaptersMenu",
    /* @__PURE__ */ React.createElement(DefaultChaptersMenu, { tooltip: "top", placement, portalClass: "vds-audio-layout" })
  ), slot(
    slots,
    "settingsMenu",
    /* @__PURE__ */ React.createElement(
      DefaultSettingsMenu,
      {
        tooltip: "top end",
        placement,
        portalClass: "vds-audio-layout",
        slots
      }
    )
  ));
}
DefaultAudioMenus.displayName = "DefaultAudioMenus";
function DefaultAudioTitle() {
  const [rootEl, setRootEl] = React.useState(null), media = useMediaContext(), { translations } = useDefaultLayoutContext(), [isTextOverflowing, setIsTextOverflowing] = React.useState(false);
  const isContinued = createComputed(() => {
    const { started, currentTime } = media.$state;
    return started() || currentTime() > 0;
  });
  const $title = useSignal(
    createComputed(() => {
      const { title, ended } = media.$state;
      if (!title())
        return "";
      const word = ended() ? "Replay" : isContinued() ? "Continue" : "Play";
      return `${i18n(translations, word)}: ${title()}`;
    })
  );
  const chapterTitle = useChapterTitle(), $isContinued = useSignal(isContinued), $chapterTitle = $isContinued ? chapterTitle : "", isTransitionActive = useTransitionActive(rootEl);
  React.useEffect(() => {
    if (isTransitionActive && document.activeElement === document.body) {
      media.player.el?.focus();
    }
  }, []);
  const onResize = React.useCallback(() => {
    const el = rootEl, isOverflowing = !!el && !isTransitionActive && el.clientWidth < el.children[0].clientWidth;
    if (el)
      toggleClass(el, "vds-marquee", isOverflowing);
    setIsTextOverflowing(isOverflowing);
  }, [rootEl, isTransitionActive]);
  useResizeObserver(rootEl, onResize);
  return $title ? /* @__PURE__ */ React.createElement("span", { className: "vds-title", title: $title, ref: setRootEl }, /* @__PURE__ */ React.createElement(AudioTitle, { title: $title, chapterTitle: $chapterTitle }), isTextOverflowing && !isTransitionActive ? /* @__PURE__ */ React.createElement(AudioTitle, { title: $title, chapterTitle: $chapterTitle }) : null) : /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null);
}
DefaultAudioTitle.displayName = "DefaultAudioTitle";
function AudioTitle({ title, chapterTitle }) {
  const slots = useDefaultAudioLayoutSlots();
  return /* @__PURE__ */ React.createElement("span", { className: "vds-title-text" }, slot(slots, "title", title), slot(slots, "chapterTitle", /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-title" }, chapterTitle)));
}
AudioTitle.displayName = "AudioTitle";

const DefaultKeyboardDisplay = React.forwardRef(
  ({ icons: Icons, ...props }, forwardRef) => {
    const [visible, setVisible] = React.useState(false), [Icon, setIcon] = React.useState(null), [count, setCount] = React.useState(0), $lastKeyboardAction = useMediaState("lastKeyboardAction");
    React.useEffect(() => {
      setCount((n) => n + 1);
    }, [$lastKeyboardAction]);
    const actionDataAttr = React.useMemo(() => {
      const action = $lastKeyboardAction?.action;
      return action && visible ? camelToKebabCase(action) : null;
    }, [visible, $lastKeyboardAction]);
    const className = React.useMemo(
      () => `vds-kb-action${!visible ? " hidden" : ""}${props.className ? ` ${props.className}` : ""}`,
      [visible]
    );
    const $$text = createComputed(getText), $text = useSignal($$text);
    createEffect(() => {
      const Icon2 = getIcon(Icons);
      setIcon(() => Icon2);
    }, [Icons]);
    React.useEffect(() => {
      setVisible(!!$lastKeyboardAction);
      const id = setTimeout(() => setVisible(false), 500);
      return () => {
        setVisible(false);
        window.clearTimeout(id);
      };
    }, [$lastKeyboardAction]);
    return Icon ? /* @__PURE__ */ React.createElement(
      Primitive.div,
      {
        ...props,
        className,
        "data-action": actionDataAttr,
        ref: forwardRef
      },
      /* @__PURE__ */ React.createElement("div", { className: "vds-kb-text-wrapper" }, /* @__PURE__ */ React.createElement("div", { className: "vds-kb-text" }, $text)),
      /* @__PURE__ */ React.createElement("div", { className: "vds-kb-bezel", key: count }, /* @__PURE__ */ React.createElement("div", { className: "vds-kb-icon" }, /* @__PURE__ */ React.createElement(Icon, null)))
    ) : null;
  }
);
DefaultKeyboardDisplay.displayName = "DefaultKeyboardDisplay";
function getText() {
  const { $state } = useContext(mediaContext), action = $state.lastKeyboardAction()?.action, audioGain = $state.audioGain() ?? 1;
  switch (action) {
    case "toggleMuted":
      return $state.muted() ? "0%" : getVolumeText($state.volume(), audioGain);
    case "volumeUp":
    case "volumeDown":
      return getVolumeText($state.volume(), audioGain);
    default:
      return "";
  }
}
function getVolumeText(volume, gain) {
  return `${Math.round(volume * gain * 100)}%`;
}
function getIcon(Icons) {
  const { $state } = useContext(mediaContext), action = $state.lastKeyboardAction()?.action;
  switch (action) {
    case "togglePaused":
      return !$state.paused() ? Icons.Play : Icons.Pause;
    case "toggleMuted":
      return $state.muted() || $state.volume() === 0 ? Icons.Mute : $state.volume() >= 0.5 ? Icons.VolumeUp : Icons.VolumeDown;
    case "toggleFullscreen":
      return $state.fullscreen() ? Icons.EnterFullscreen : Icons.ExitFullscreen;
    case "togglePictureInPicture":
      return $state.pictureInPicture() ? Icons.EnterPiP : Icons.ExitPiP;
    case "toggleCaptions":
      return $state.hasCaptions() ? $state.textTrack() ? Icons.CaptionsOn : Icons.CaptionsOff : null;
    case "volumeUp":
      return Icons.VolumeUp;
    case "volumeDown":
      return Icons.VolumeDown;
    case "seekForward":
      return Icons.SeekForward;
    case "seekBackward":
      return Icons.SeekBackward;
    default:
      return null;
  }
}

function DefaultTitle() {
  const $started = useMediaState("started"), $title = useMediaState("title"), $hasChapters = useActiveTextTrack("chapters");
  return $hasChapters && ($started || !$title) ? /* @__PURE__ */ React.createElement(ChapterTitle$1, { className: "vds-chapter-title" }) : /* @__PURE__ */ React.createElement(Title, { className: "vds-chapter-title" });
}
DefaultTitle.displayName = "DefaultTitle";

const MediaLayout = createDefaultMediaLayout({
  type: "video",
  smLayoutWhen({ width, height }) {
    return width < 576 || height < 380;
  },
  renderLayout(props) {
    return /* @__PURE__ */ React.createElement(VideoLayout, { ...props });
  }
});
function DefaultVideoLayout(props) {
  return /* @__PURE__ */ React.createElement(MediaLayout, { ...props });
}
DefaultVideoLayout.displayName = "DefaultVideoLayout";
function VideoLayout({ streamType, isLoadLayout, isSmallLayout }) {
  useLayoutName("video");
  return isLoadLayout ? /* @__PURE__ */ React.createElement(DefaultVideoLoadLayout, null) : streamType === "unknown" ? /* @__PURE__ */ React.createElement(DefaultBufferingIndicator, null) : isSmallLayout ? /* @__PURE__ */ React.createElement(DefaultVideoSmallLayout, null) : /* @__PURE__ */ React.createElement(DefaultVideoLargeLayout, null);
}
VideoLayout.displayName = "VideoLayout";
function DefaultVideoLargeLayout() {
  const { menuGroup } = useDefaultLayoutContext(), baseSlots = useDefaultVideoLayoutSlots(), slots = { ...baseSlots, ...baseSlots?.largeLayout };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultAnnouncer, null), /* @__PURE__ */ React.createElement(DefaultVideoGestures, null), /* @__PURE__ */ React.createElement(DefaultVideoKeyboardDisplay, null), slot(slots, "bufferingIndicator", /* @__PURE__ */ React.createElement(DefaultBufferingIndicator, null)), slot(slots, "captions", /* @__PURE__ */ React.createElement(DefaultCaptions, null)), /* @__PURE__ */ React.createElement(Root$a, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "topControlsGroupStart", null), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "topControlsGroupCenter", null), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "topControlsGroupEnd", null), menuGroup === "top" && /* @__PURE__ */ React.createElement(DefaultVideoMenus, { slots })), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "centerControlsGroupStart", null), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupCenter", null), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupEnd", null)), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "timeSlider", /* @__PURE__ */ React.createElement(DefaultTimeSlider, null))), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "playButton", /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top start" })), /* @__PURE__ */ React.createElement(DefaultVolumePopup, { orientation: "horizontal", tooltip: "top", slots }), /* @__PURE__ */ React.createElement(DefaultTimeInfo, { slots }), slot(slots, "chapterTitle", /* @__PURE__ */ React.createElement(DefaultTitle, null)), slot(slots, "captionButton", /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "top" })), menuGroup === "bottom" && /* @__PURE__ */ React.createElement(DefaultVideoMenus, { slots }), slot(slots, "airPlayButton", /* @__PURE__ */ React.createElement(DefaultAirPlayButton, { tooltip: "top" })), slot(slots, "googleCastButton", /* @__PURE__ */ React.createElement(DefaultGoogleCastButton, { tooltip: "top" })), slot(slots, "downloadButton", /* @__PURE__ */ React.createElement(DefaultDownloadButton, null)), slot(slots, "pipButton", /* @__PURE__ */ React.createElement(DefaultPIPButton, { tooltip: "top" })), slot(slots, "fullscreenButton", /* @__PURE__ */ React.createElement(DefaultFullscreenButton, { tooltip: "top end" })))));
}
DefaultVideoLargeLayout.displayName = "DefaultVideoLargeLayout";
function DefaultVideoSmallLayout() {
  const baseSlots = useDefaultVideoLayoutSlots(), slots = { ...baseSlots, ...baseSlots?.smallLayout };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultAnnouncer, null), /* @__PURE__ */ React.createElement(DefaultVideoGestures, null), /* @__PURE__ */ React.createElement(DefaultVideoKeyboardDisplay, null), slot(slots, "bufferingIndicator", /* @__PURE__ */ React.createElement(DefaultBufferingIndicator, null)), slot(slots, "captions", /* @__PURE__ */ React.createElement(DefaultCaptions, null)), /* @__PURE__ */ React.createElement(Root$a, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "topControlsGroupStart", null), slot(slots, "airPlayButton", /* @__PURE__ */ React.createElement(DefaultAirPlayButton, { tooltip: "top start" })), slot(slots, "googleCastButton", /* @__PURE__ */ React.createElement(DefaultGoogleCastButton, { tooltip: "top start" })), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "topControlsGroupCenter", null), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "captionButton", /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "bottom" })), slot(slots, "downloadButton", /* @__PURE__ */ React.createElement(DefaultDownloadButton, null)), /* @__PURE__ */ React.createElement(DefaultVideoMenus, { slots }), /* @__PURE__ */ React.createElement(DefaultVolumePopup, { orientation: "vertical", tooltip: "bottom end", slots }), slot(slots, "topControlsGroupEnd", null)), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group", style: { pointerEvents: "none" } }, slot(slots, "centerControlsGroupStart", null), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupCenter", null), slot(slots, "playButton", /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top" })), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupEnd", null)), /* @__PURE__ */ React.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultTimeInfo, { slots }), slot(slots, "chapterTitle", /* @__PURE__ */ React.createElement(DefaultTitle, null)), slot(slots, "fullscreenButton", /* @__PURE__ */ React.createElement(DefaultFullscreenButton, { tooltip: "top end" }))), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, slot(slots, "timeSlider", /* @__PURE__ */ React.createElement(DefaultTimeSlider, null)))), slot(slots, "startDuration", /* @__PURE__ */ React.createElement(DefaultVideoStartDuration, null)));
}
DefaultVideoSmallLayout.displayName = "DefaultVideoSmallLayout";
function DefaultVideoStartDuration() {
  const $duration = useMediaState("duration");
  if ($duration === 0)
    return null;
  return /* @__PURE__ */ React.createElement("div", { className: "vds-start-duration" }, /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "duration" }));
}
DefaultVideoStartDuration.displayName = "DefaultVideoStartDuration";
function DefaultVideoGestures() {
  const { noGestures } = useDefaultLayoutContext();
  if (noGestures)
    return null;
  return /* @__PURE__ */ React.createElement("div", { className: "vds-gestures" }, /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "pointerup", action: "toggle:paused" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "pointerup", action: "toggle:controls" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "toggle:fullscreen" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "seek:-10" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "seek:10" }));
}
DefaultVideoGestures.displayName = "DefaultVideoGestures";
function DefaultBufferingIndicator() {
  return /* @__PURE__ */ React.createElement("div", { className: "vds-buffering-indicator" }, /* @__PURE__ */ React.createElement(Root$b, { className: "vds-buffering-spinner" }, /* @__PURE__ */ React.createElement(Track$1, { className: "vds-buffering-track" }), /* @__PURE__ */ React.createElement(TrackFill$1, { className: "vds-buffering-track-fill" })));
}
DefaultBufferingIndicator.displayName = "DefaultBufferingIndicator";
function DefaultVideoMenus({ slots }) {
  const { isSmallLayout, noModal, menuGroup } = useDefaultLayoutContext(), side = menuGroup === "top" || isSmallLayout ? "bottom" : "top", tooltip = `${side} end`, placement = noModal ? `${side} end` : !isSmallLayout ? `${side} end` : null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, slot(
    slots,
    "chaptersMenu",
    /* @__PURE__ */ React.createElement(
      DefaultChaptersMenu,
      {
        tooltip,
        placement,
        portalClass: "vds-video-layout"
      }
    )
  ), slot(
    slots,
    "settingsMenu",
    /* @__PURE__ */ React.createElement(
      DefaultSettingsMenu,
      {
        tooltip,
        placement,
        portalClass: "vds-video-layout",
        slots
      }
    )
  ));
}
DefaultVideoMenus.displayName = "DefaultVideoMenus";
function DefaultVideoLoadLayout() {
  const { isSmallLayout } = useDefaultLayoutContext(), baseSlots = useDefaultVideoLayoutSlots(), slots = { ...baseSlots, ...baseSlots?.[isSmallLayout ? "smallLayout" : "largeLayout"] };
  return /* @__PURE__ */ React.createElement("div", { className: "vds-load-container" }, slot(slots, "bufferingIndicator", /* @__PURE__ */ React.createElement(DefaultBufferingIndicator, null)), slot(slots, "loadButton", /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top" })));
}
DefaultVideoLoadLayout.displayName = "DefaultVideoLoadLayout";
function DefaultVideoKeyboardDisplay() {
  const { noKeyboardAnimations, icons, userPrefersKeyboardAnimations } = useDefaultLayoutContext(), $userPrefersKeyboardAnimations = useSignal(userPrefersKeyboardAnimations), disabled = noKeyboardAnimations || !$userPrefersKeyboardAnimations;
  if (disabled || !icons.KeyboardDisplay)
    return null;
  return /* @__PURE__ */ React.createElement(DefaultKeyboardDisplay, { icons: icons.KeyboardDisplay });
}
DefaultVideoKeyboardDisplay.displayName = "DefaultVideoKeyboardDisplay";

export { DefaultLayoutContext as D, useDefaultLayoutWord as a, DefaultKeyboardDisplay as b, DefaultAudioLayout as c, DefaultVideoLayout as d, DefaultVideoLargeLayout as e, DefaultVideoSmallLayout as f, DefaultVideoGestures as g, DefaultBufferingIndicator as h, i18n as i, DefaultMenuCheckbox as j, DefaultMenuSection as k, DefaultMenuButton as l, DefaultMenuItem as m, DefaultMenuRadioGroup as n, createRadioOptions as o, DefaultMenuSliderItem as p, DefaultSliderParts as q, DefaultSliderSteps as r, DefaultTooltip as s, useDefaultLayoutContext as u };
