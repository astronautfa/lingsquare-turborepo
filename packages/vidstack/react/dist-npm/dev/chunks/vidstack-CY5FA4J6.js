import {
  Captions,
  ChapterTitle as ChapterTitle2,
  Content,
  GoogleCastButton,
  Group,
  MediaAnnouncer,
  Root,
  Root2,
  Root3 as Root5,
  Root4 as Root6,
  Root5 as Root7,
  Root6 as Root12,
  Title,
  Track as Track2,
  TrackFill as TrackFill2,
  Trigger,
  createComputed,
  createEffect,
  createSignal,
  useActiveTextTrack,
  useChapterOptions,
  useChapterTitle,
  useScoped
} from "./vidstack-YVS6V2IN.js";
import {
  useActive,
  useColorSchemePreference,
  useLayoutName,
  useResizeObserver,
  useTransitionActive
} from "./vidstack-HF3VRMKC.js";
import {
  AirPlayButton,
  Button,
  CaptionButton,
  ChapterTitle,
  Chapters,
  FullscreenButton,
  Gesture,
  Img,
  Item,
  Items,
  LiveButton,
  MuteButton,
  PIPButton,
  PlayButton,
  Portal,
  Preview,
  Progress,
  Root as Root3,
  Root2 as Root4,
  Root3 as Root8,
  Root4 as Root9,
  Root5 as Root10,
  Root6 as Root11,
  SeekButton,
  Steps,
  Thumb,
  Thumbnail,
  Time,
  Track,
  TrackFill,
  Value,
  useAudioOptions,
  useCaptionOptions,
  useMediaContext as useMediaContext2,
  useMediaPlayer
} from "./vidstack-QKZVTF5G.js";
import {
  RemotionSliderThumbnail,
  RemotionThumbnail
} from "./vidstack-HNEI4N5K.js";
import {
  Primitive,
  useMediaState
} from "./vidstack-CDYAPKDM.js";
import {
  isRemotionSrc,
  mediaContext,
  sortVideoQualities,
  useMediaContext
} from "./vidstack-ALARDIAR.js";
import {
  isTrackCaptionKind
} from "./vidstack-A5V4LMVI.js";
import {
  getDownloadFile
} from "./vidstack-KCGJG3AU.js";
import {
  IS_SERVER,
  camelToKebabCase,
  composeRefs,
  effect,
  isArray,
  isBoolean,
  isKeyboardClick,
  isString,
  isUndefined,
  keysOf,
  listenEvent,
  onDispose,
  scoped,
  signal,
  toggleClass,
  uppercaseFirstChar,
  useContext,
  useSignal
} from "./vidstack-KAGOB6PR.js";

// src/components/layouts/default/audio-layout.tsx
import * as React22 from "react";

// src/components/layouts/default/context.ts
import * as React from "react";
var DefaultLayoutContext = React.createContext({});
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

// src/components/layouts/default/media-layout.tsx
import * as React2 from "react";

// src/components/layouts/default/hooks.ts
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

// src/components/layouts/default/media-layout.tsx
function createDefaultMediaLayout({
  type,
  smLayoutWhen,
  renderLayout
}) {
  const Layout = React2.forwardRef(
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
    }, forwardRef4) => {
      const media = useMediaContext2(), $load = useSignal(media.$props.load), $canLoad = useMediaState("canLoad"), $viewType = useMediaState("viewType"), $streamType = useMediaState("streamType"), $smallWhen = createComputed(() => {
        return isBoolean(smallLayoutWhen) ? smallLayoutWhen : smallLayoutWhen(media.player.state);
      }, [smallLayoutWhen]), userPrefersAnnouncements = createSignal(true), userPrefersKeyboardAnimations = createSignal(true), isMatch = $viewType === type, isSmallLayout = $smallWhen(), isForcedLayout = isBoolean(smallLayoutWhen), isLoadLayout = $load === "play" && !$canLoad, canRender = $canLoad || isForcedLayout || isLoadLayout, colorSchemeClass = useColorSchemeClass(colorScheme), layoutEl = createSignal(null);
      useSignal($smallWhen);
      return /* @__PURE__ */ React2.createElement(
        "div",
        {
          ...props,
          className: `vds-${type}-layout` + (colorSchemeClass ? ` ${colorSchemeClass}` : "") + (className ? ` ${className}` : ""),
          "data-match": isMatch ? "" : null,
          "data-sm": isSmallLayout ? "" : null,
          "data-lg": !isSmallLayout ? "" : null,
          "data-size": isSmallLayout ? "sm" : "lg",
          "data-no-scrub-gesture": noScrubGesture ? "" : null,
          ref: composeRefs(layoutEl.set, forwardRef4)
        },
        canRender && isMatch ? /* @__PURE__ */ React2.createElement(
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
              layoutEl,
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

// src/components/layouts/default/slots.tsx
import * as React3 from "react";
function useDefaultAudioLayoutSlots() {
  return React3.useContext(DefaultLayoutContext).slots;
}
function useDefaultVideoLayoutSlots() {
  return React3.useContext(DefaultLayoutContext).slots;
}
function slot(slots, name, defaultValue) {
  const slot2 = slots?.[name], capitalizedName = uppercaseFirstChar(name);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, slots?.[`before${capitalizedName}`], isUndefined(slot2) ? defaultValue : slot2, slots?.[`after${capitalizedName}`]);
}

// src/components/layouts/default/ui/announcer.tsx
import * as React4 from "react";
function DefaultAnnouncer() {
  const { userPrefersAnnouncements, translations } = useDefaultLayoutContext(), $userPrefersAnnouncements = useSignal(userPrefersAnnouncements);
  if (!$userPrefersAnnouncements) return null;
  return /* @__PURE__ */ React4.createElement(MediaAnnouncer, { translations });
}
DefaultAnnouncer.displayName = "DefaultAnnouncer";

// src/components/layouts/default/ui/buttons.tsx
import * as React6 from "react";

// src/components/layouts/default/ui/tooltip.tsx
import * as React5 from "react";
function DefaultTooltip({ content, placement, children }) {
  const { showTooltipDelay } = useDefaultLayoutContext();
  return /* @__PURE__ */ React5.createElement(Root2, { showDelay: showTooltipDelay }, /* @__PURE__ */ React5.createElement(Trigger, { asChild: true }, children), /* @__PURE__ */ React5.createElement(Content, { className: "vds-tooltip-content", placement }, content));
}
DefaultTooltip.displayName = "DefaultTooltip";

// src/components/layouts/default/ui/buttons.tsx
function DefaultPlayButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), playText = useDefaultLayoutWord("Play"), pauseText = useDefaultLayoutWord("Pause"), $paused = useMediaState("paused"), $ended = useMediaState("ended");
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: $paused ? playText : pauseText, placement: tooltip }, /* @__PURE__ */ React6.createElement(PlayButton, { className: "vds-play-button vds-button", "aria-label": playText }, $ended ? /* @__PURE__ */ React6.createElement(Icons.PlayButton.Replay, { className: "vds-icon" }) : $paused ? /* @__PURE__ */ React6.createElement(Icons.PlayButton.Play, { className: "vds-icon" }) : /* @__PURE__ */ React6.createElement(Icons.PlayButton.Pause, { className: "vds-icon" })));
}
DefaultPlayButton.displayName = "DefaultPlayButton";
var DefaultMuteButton = React6.forwardRef(
  ({ tooltip }, forwardRef4) => {
    const { icons: Icons } = useDefaultLayoutContext(), muteText = useDefaultLayoutWord("Mute"), unmuteText = useDefaultLayoutWord("Unmute"), $muted = useMediaState("muted"), $volume = useMediaState("volume");
    return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: $muted ? unmuteText : muteText, placement: tooltip }, /* @__PURE__ */ React6.createElement(MuteButton, { className: "vds-mute-button vds-button", "aria-label": muteText, ref: forwardRef4 }, $muted || $volume == 0 ? /* @__PURE__ */ React6.createElement(Icons.MuteButton.Mute, { className: "vds-icon" }) : $volume < 0.5 ? /* @__PURE__ */ React6.createElement(Icons.MuteButton.VolumeLow, { className: "vds-icon" }) : /* @__PURE__ */ React6.createElement(Icons.MuteButton.VolumeHigh, { className: "vds-icon" })));
  }
);
DefaultMuteButton.displayName = "DefaultMuteButton";
function DefaultCaptionButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), captionsText = useDefaultLayoutWord("Captions"), onText = useDefaultLayoutWord("Closed-Captions On"), offText = useDefaultLayoutWord("Closed-Captions Off"), $track = useMediaState("textTrack"), isOn = $track && isTrackCaptionKind($track);
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: isOn ? onText : offText, placement: tooltip }, /* @__PURE__ */ React6.createElement(CaptionButton, { className: "vds-caption-button vds-button", "aria-label": captionsText }, isOn ? /* @__PURE__ */ React6.createElement(Icons.CaptionButton.On, { className: "vds-icon" }) : /* @__PURE__ */ React6.createElement(Icons.CaptionButton.Off, { className: "vds-icon" })));
}
DefaultCaptionButton.displayName = "DefaultCaptionButton";
function DefaultPIPButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), pipText = useDefaultLayoutWord("PiP"), enterText = useDefaultLayoutWord("Enter PiP"), exitText = useDefaultLayoutWord("Exit PiP"), $pip = useMediaState("pictureInPicture");
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: $pip ? exitText : enterText, placement: tooltip }, /* @__PURE__ */ React6.createElement(PIPButton, { className: "vds-pip-button vds-button", "aria-label": pipText }, $pip ? /* @__PURE__ */ React6.createElement(Icons.PIPButton.Exit, { className: "vds-icon" }) : /* @__PURE__ */ React6.createElement(Icons.PIPButton.Enter, { className: "vds-icon" })));
}
DefaultPIPButton.displayName = "DefaultPIPButton";
function DefaultFullscreenButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), fullscreenText = useDefaultLayoutWord("Fullscreen"), enterText = useDefaultLayoutWord("Enter Fullscreen"), exitText = useDefaultLayoutWord("Exit Fullscreen"), $fullscreen = useMediaState("fullscreen");
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: $fullscreen ? exitText : enterText, placement: tooltip }, /* @__PURE__ */ React6.createElement(FullscreenButton, { className: "vds-fullscreen-button vds-button", "aria-label": fullscreenText }, $fullscreen ? /* @__PURE__ */ React6.createElement(Icons.FullscreenButton.Exit, { className: "vds-icon" }) : /* @__PURE__ */ React6.createElement(Icons.FullscreenButton.Enter, { className: "vds-icon" })));
}
DefaultFullscreenButton.displayName = "DefaultFullscreenButton";
function DefaultSeekButton({
  backward,
  tooltip
}) {
  const { icons: Icons, seekStep } = useDefaultLayoutContext(), seekForwardText = useDefaultLayoutWord("Seek Forward"), seekBackwardText = useDefaultLayoutWord("Seek Backward"), seconds = (backward ? -1 : 1) * seekStep, label = seconds >= 0 ? seekForwardText : seekBackwardText;
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: label, placement: tooltip }, /* @__PURE__ */ React6.createElement(SeekButton, { className: "vds-seek-button vds-button", seconds, "aria-label": label }, seconds >= 0 ? /* @__PURE__ */ React6.createElement(Icons.SeekButton.Forward, { className: "vds-icon" }) : /* @__PURE__ */ React6.createElement(Icons.SeekButton.Backward, { className: "vds-icon" })));
}
DefaultSeekButton.displayName = "DefaultSeekButton";
function DefaultAirPlayButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), airPlayText = useDefaultLayoutWord("AirPlay"), $state = useMediaState("remotePlaybackState"), stateText = useDefaultLayoutWord(uppercaseFirstChar($state)), label = `${airPlayText} ${stateText}`, Icon = ($state === "connecting" ? Icons.AirPlayButton.Connecting : $state === "connected" ? Icons.AirPlayButton.Connected : null) ?? Icons.AirPlayButton.Default;
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: airPlayText, placement: tooltip }, /* @__PURE__ */ React6.createElement(AirPlayButton, { className: "vds-airplay-button vds-button", "aria-label": label }, /* @__PURE__ */ React6.createElement(Icon, { className: "vds-icon" })));
}
DefaultAirPlayButton.displayName = "DefaultAirPlayButton";
function DefaultGoogleCastButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(), googleCastText = useDefaultLayoutWord("Google Cast"), $state = useMediaState("remotePlaybackState"), stateText = useDefaultLayoutWord(uppercaseFirstChar($state)), label = `${googleCastText} ${stateText}`, Icon = ($state === "connecting" ? Icons.GoogleCastButton.Connecting : $state === "connected" ? Icons.GoogleCastButton.Connected : null) ?? Icons.GoogleCastButton.Default;
  return /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: googleCastText, placement: tooltip }, /* @__PURE__ */ React6.createElement(GoogleCastButton, { className: "vds-google-cast-button vds-button", "aria-label": label }, /* @__PURE__ */ React6.createElement(Icon, { className: "vds-icon" })));
}
DefaultGoogleCastButton.displayName = "DefaultGoogleCastButton";
function DefaultLiveButton() {
  const $live = useMediaState("live"), label = useDefaultLayoutWord("Skip To Live"), liveText = useDefaultLayoutWord("LIVE");
  return $live ? /* @__PURE__ */ React6.createElement(LiveButton, { className: "vds-live-button", "aria-label": label }, /* @__PURE__ */ React6.createElement("span", { className: "vds-live-button-text" }, liveText)) : null;
}
DefaultLiveButton.displayName = "DefaultLiveButton";
function DefaultDownloadButton() {
  const { download, icons: Icons } = useDefaultLayoutContext(), $src = useMediaState("source"), $title = useMediaState("title"), file = getDownloadFile({
    title: $title,
    src: $src,
    download
  }), downloadText = useDefaultLayoutWord("Download");
  return file ? /* @__PURE__ */ React6.createElement(DefaultTooltip, { content: downloadText, placement: "top" }, /* @__PURE__ */ React6.createElement(
    "a",
    {
      role: "button",
      className: "vds-download-button vds-button",
      "aria-label": downloadText,
      href: file.url + `?download=${file.name}`,
      download: file.name,
      target: "_blank"
    },
    Icons.DownloadButton ? /* @__PURE__ */ React6.createElement(Icons.DownloadButton.Default, { className: "vds-icon" }) : null
  )) : null;
}
DefaultDownloadButton.displayName = "DefaultDownloadButton";

// src/components/layouts/default/ui/captions.tsx
import * as React7 from "react";
function DefaultCaptions() {
  const exampleText = useDefaultLayoutWord("Captions look like this");
  return /* @__PURE__ */ React7.createElement(Captions, { className: "vds-captions", exampleText });
}
DefaultCaptions.displayName = "DefaultCaptions";

// src/components/layouts/default/ui/controls.tsx
import * as React8 from "react";
function DefaultControlsSpacer() {
  return /* @__PURE__ */ React8.createElement("div", { className: "vds-controls-spacer" });
}
DefaultControlsSpacer.displayName = "DefaultControlsSpacer";

// src/components/layouts/default/ui/menus/chapters-menu.tsx
import * as React10 from "react";
import { flushSync } from "react-dom";

// src/components/layouts/default/ui/menus/utils.ts
import * as React9 from "react";
function useParentDialogEl() {
  const { layoutEl } = useDefaultLayoutContext(), $layoutEl = useSignal(layoutEl);
  return React9.useMemo(() => $layoutEl?.closest("dialog"), [$layoutEl]);
}

// src/components/layouts/default/ui/menus/chapters-menu.tsx
function DefaultChaptersMenu({ tooltip, placement, portalClass = "" }) {
  const {
    showMenuDelay,
    noModal,
    isSmallLayout,
    icons: Icons,
    menuGroup,
    menuContainer,
    colorScheme
  } = useDefaultLayoutContext(), chaptersText = useDefaultLayoutWord("Chapters"), options = useChapterOptions(), disabled = !options.length, { thumbnails } = useDefaultLayoutContext(), $src = useMediaState("currentSrc"), $viewType = useMediaState("viewType"), $offset = !isSmallLayout && menuGroup === "bottom" && $viewType === "video" ? 26 : 0, $RemotionThumbnail = useSignal(RemotionThumbnail), colorSchemeClass = useColorSchemeClass(colorScheme), [isOpen, setIsOpen] = React10.useState(false), dialogEl = useParentDialogEl();
  if (disabled) return null;
  function onOpen() {
    flushSync(() => {
      setIsOpen(true);
    });
  }
  function onClose() {
    setIsOpen(false);
  }
  const Content2 = /* @__PURE__ */ React10.createElement(
    Items,
    {
      className: "vds-chapters-menu-items vds-menu-items",
      placement,
      offset: $offset
    },
    isOpen ? /* @__PURE__ */ React10.createElement(
      Root10,
      {
        className: "vds-chapters-radio-group vds-radio-group",
        value: options.selectedValue,
        "data-thumbnails": thumbnails ? "" : null
      },
      options.map(
        ({ cue, label, value, startTimeText, durationText, select, setProgressVar }) => /* @__PURE__ */ React10.createElement(
          Item,
          {
            className: "vds-chapter-radio vds-radio",
            value,
            key: value,
            onSelect: select,
            ref: setProgressVar
          },
          thumbnails ? /* @__PURE__ */ React10.createElement(Root8, { src: thumbnails, className: "vds-thumbnail", time: cue.startTime }, /* @__PURE__ */ React10.createElement(Img, null)) : $RemotionThumbnail && isRemotionSrc($src) ? /* @__PURE__ */ React10.createElement($RemotionThumbnail, { className: "vds-thumbnail", frame: cue.startTime * $src.fps }) : null,
          /* @__PURE__ */ React10.createElement("div", { className: "vds-chapter-radio-content" }, /* @__PURE__ */ React10.createElement("span", { className: "vds-chapter-radio-label" }, label), /* @__PURE__ */ React10.createElement("span", { className: "vds-chapter-radio-start-time" }, startTimeText), /* @__PURE__ */ React10.createElement("span", { className: "vds-chapter-radio-duration" }, durationText))
        )
      )
    ) : null
  );
  return /* @__PURE__ */ React10.createElement(
    Root11,
    {
      className: "vds-chapters-menu vds-menu",
      showDelay: showMenuDelay,
      onOpen,
      onClose
    },
    /* @__PURE__ */ React10.createElement(DefaultTooltip, { content: chaptersText, placement: tooltip }, /* @__PURE__ */ React10.createElement(
      Button,
      {
        className: "vds-menu-button vds-button",
        disabled,
        "aria-label": chaptersText
      },
      /* @__PURE__ */ React10.createElement(Icons.Menu.Chapters, { className: "vds-icon" })
    )),
    noModal || !isSmallLayout ? Content2 : /* @__PURE__ */ React10.createElement(
      Portal,
      {
        container: menuContainer ?? dialogEl,
        className: portalClass + (colorSchemeClass ? ` ${colorSchemeClass}` : ""),
        disabled: "fullscreen",
        "data-sm": isSmallLayout ? "" : null,
        "data-lg": !isSmallLayout ? "" : null,
        "data-size": isSmallLayout ? "sm" : "lg"
      },
      Content2
    )
  );
}
DefaultChaptersMenu.displayName = "DefaultChaptersMenu";

// src/components/layouts/default/ui/menus/settings-menu.tsx
import * as React19 from "react";
import { flushSync as flushSync2 } from "react-dom";

// ../vidstack/src/core/font/font-options.ts
var FONT_COLOR_OPTION = {
  type: "color"
};
var FONT_FAMILY_OPTION = {
  type: "radio",
  values: {
    "Monospaced Serif": "mono-serif",
    "Proportional Serif": "pro-serif",
    "Monospaced Sans-Serif": "mono-sans",
    "Proportional Sans-Serif": "pro-sans",
    Casual: "casual",
    Cursive: "cursive",
    "Small Capitals": "capitals"
  }
};
var FONT_SIZE_OPTION = {
  type: "slider",
  min: 0,
  max: 400,
  step: 25,
  upIcon: null,
  downIcon: null
};
var FONT_OPACITY_OPTION = {
  type: "slider",
  min: 0,
  max: 100,
  step: 5,
  upIcon: null,
  downIcon: null
};
var FONT_TEXT_SHADOW_OPTION = {
  type: "radio",
  values: ["None", "Drop Shadow", "Raised", "Depressed", "Outline"]
};
var FONT_DEFAULTS = {
  fontFamily: "pro-sans",
  fontSize: "100%",
  textColor: "#ffffff",
  textOpacity: "100%",
  textShadow: "none",
  textBg: "#000000",
  textBgOpacity: "100%",
  displayBg: "#000000",
  displayBgOpacity: "0%"
};
var FONT_SIGNALS = Object.keys(FONT_DEFAULTS).reduce(
  (prev, type) => ({
    ...prev,
    [type]: signal(FONT_DEFAULTS[type])
  }),
  {}
);
if (!IS_SERVER) {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const value = localStorage.getItem(`vds-player:${camelToKebabCase(type)}`);
    if (isString(value)) FONT_SIGNALS[type].set(value);
  }
}
function onFontReset() {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const defaultValue = FONT_DEFAULTS[type];
    FONT_SIGNALS[type].set(defaultValue);
  }
}

// ../vidstack/src/utils/color.ts
function hexToRgb(hex) {
  const { style } = new Option();
  style.color = hex;
  return style.color.match(/\((.*?)\)/)[1].replace(/,/g, " ");
}

// ../vidstack/src/core/font/font-vars.ts
var isWatchingVars = false;
var players = /* @__PURE__ */ new Set();
function updateFontCssVars() {
  if (IS_SERVER) return;
  const { player } = useMediaContext();
  players.add(player);
  onDispose(() => players.delete(player));
  if (!isWatchingVars) {
    scoped(() => {
      for (const type of keysOf(FONT_SIGNALS)) {
        const $value = FONT_SIGNALS[type], defaultValue = FONT_DEFAULTS[type], varName = `--media-user-${camelToKebabCase(type)}`, storageKey = `vds-player:${camelToKebabCase(type)}`;
        effect(() => {
          const value = $value(), isDefaultVarValue = value === defaultValue, varValue = !isDefaultVarValue ? getCssVarValue(player, type, value) : null;
          for (const player2 of players) {
            player2.el?.style.setProperty(varName, varValue);
          }
          if (isDefaultVarValue) {
            localStorage.removeItem(storageKey);
          } else {
            localStorage.setItem(storageKey, value);
          }
        });
      }
    }, null);
    isWatchingVars = true;
  }
}
function getCssVarValue(player, type, value) {
  switch (type) {
    case "fontFamily":
      const fontVariant = value === "capitals" ? "small-caps" : "";
      player.el?.style.setProperty("--media-user-font-variant", fontVariant);
      return getFontFamilyCSSVarValue(value);
    case "fontSize":
    case "textOpacity":
    case "textBgOpacity":
    case "displayBgOpacity":
      return percentToRatio(value);
    case "textColor":
      return `rgb(${hexToRgb(value)} / var(--media-user-text-opacity, 1))`;
    case "textShadow":
      return getTextShadowCssVarValue(value);
    case "textBg":
      return `rgb(${hexToRgb(value)} / var(--media-user-text-bg-opacity, 1))`;
    case "displayBg":
      return `rgb(${hexToRgb(value)} / var(--media-user-display-bg-opacity, 1))`;
  }
}
function percentToRatio(value) {
  return (parseInt(value) / 100).toString();
}
function getFontFamilyCSSVarValue(value) {
  switch (value) {
    case "mono-serif":
      return '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
    case "mono-sans":
      return '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
    case "pro-sans":
      return 'Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';
    case "casual":
      return '"Comic Sans MS", Impact, Handlee, fantasy';
    case "cursive":
      return '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
    case "capitals":
      return '"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif + font-variant=small-caps';
    default:
      return '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
  }
}
function getTextShadowCssVarValue(value) {
  switch (value) {
    case "drop shadow":
      return "rgb(34, 34, 34) 1.86389px 1.86389px 2.79583px, rgb(34, 34, 34) 1.86389px 1.86389px 3.72778px, rgb(34, 34, 34) 1.86389px 1.86389px 4.65972px";
    case "raised":
      return "rgb(34, 34, 34) 1px 1px, rgb(34, 34, 34) 2px 2px";
    case "depressed":
      return "rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px";
    case "outline":
      return "rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px";
    default:
      return "";
  }
}

// src/components/layouts/default/ui/menus/accessibility-menu.tsx
import * as React15 from "react";

// src/components/layouts/default/ui/menus/font-menu.tsx
import * as React13 from "react";

// src/components/layouts/default/ui/menus/items/menu-items.tsx
import * as React11 from "react";
function DefaultMenuSection({ label, value, children }) {
  const id = React11.useId();
  if (!label) {
    return /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-section" }, /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-section-body" }, children));
  }
  return /* @__PURE__ */ React11.createElement("section", { className: "vds-menu-section", role: "group", "aria-labelledby": id }, /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-section-title" }, /* @__PURE__ */ React11.createElement("header", { id }, label), value ? /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-section-value" }, value) : null), /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-section-body" }, children));
}
DefaultMenuSection.displayName = "DefaultMenuSection";
function DefaultMenuButton({ label, hint = "", Icon, disabled = false }) {
  const { icons: Icons } = React11.useContext(DefaultLayoutContext);
  return /* @__PURE__ */ React11.createElement(Button, { className: "vds-menu-item", disabled }, /* @__PURE__ */ React11.createElement(Icons.Menu.ArrowLeft, { className: "vds-menu-close-icon vds-icon" }), Icon ? /* @__PURE__ */ React11.createElement(Icon, { className: "vds-menu-item-icon vds-icon" }) : null, /* @__PURE__ */ React11.createElement("span", { className: "vds-menu-item-label" }, label), /* @__PURE__ */ React11.createElement("span", { className: "vds-menu-item-hint" }, hint), /* @__PURE__ */ React11.createElement(Icons.Menu.ArrowRight, { className: "vds-menu-open-icon vds-icon" }));
}
DefaultMenuButton.displayName = "DefaultMenuButton";
function DefaultMenuItem({ label, children }) {
  return /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-item" }, /* @__PURE__ */ React11.createElement("div", { className: "vds-menu-item-label" }, label), children);
}
DefaultMenuItem.displayName = "DefaultMenuItem";
function DefaultMenuRadioGroup({ value, options, onChange }) {
  const { icons: Icons } = useDefaultLayoutContext();
  return /* @__PURE__ */ React11.createElement(Root10, { className: "vds-radio-group", value, onChange }, options.map((option) => /* @__PURE__ */ React11.createElement(Item, { className: "vds-radio", value: option.value, key: option.value }, /* @__PURE__ */ React11.createElement(Icons.Menu.RadioCheck, { className: "vds-icon" }), /* @__PURE__ */ React11.createElement("span", { className: "vds-radio-label", "data-part": "label" }, option.label))));
}
DefaultMenuRadioGroup.displayName = "DefaultMenuRadioGroup";
function createRadioOptions(entries) {
  return React11.useMemo(
    () => isArray(entries) ? entries.map((entry) => ({ label: entry, value: entry.toLowerCase() })) : Object.keys(entries).map((label) => ({ label, value: entries[label] })),
    [entries]
  );
}

// src/components/layouts/default/ui/menus/items/menu-slider.tsx
import * as React12 from "react";
function DefaultMenuSliderItem({
  label,
  value,
  UpIcon,
  DownIcon,
  children,
  isMin,
  isMax
}) {
  const hasTitle = label || value, Content2 = /* @__PURE__ */ React12.createElement(React12.Fragment, null, DownIcon ? /* @__PURE__ */ React12.createElement(DownIcon, { className: "vds-icon down" }) : null, children, UpIcon ? /* @__PURE__ */ React12.createElement(UpIcon, { className: "vds-icon up" }) : null);
  return /* @__PURE__ */ React12.createElement(
    "div",
    {
      className: `vds-menu-item vds-menu-slider-item${hasTitle ? " group" : ""}`,
      "data-min": isMin ? "" : null,
      "data-max": isMax ? "" : null
    },
    hasTitle ? /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement("div", { className: "vds-menu-slider-title" }, label ? /* @__PURE__ */ React12.createElement("div", null, label) : null, value ? /* @__PURE__ */ React12.createElement("div", null, value) : null), /* @__PURE__ */ React12.createElement("div", { className: "vds-menu-slider-body" }, Content2)) : Content2
  );
}
DefaultMenuSliderItem.displayName = "DefaultMenuSliderItem";
function DefaultSliderParts() {
  return /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React12.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React12.createElement(Thumb, { className: "vds-slider-thumb" }));
}
DefaultSliderParts.displayName = "DefaultSliderParts";
function DefaultSliderSteps() {
  return /* @__PURE__ */ React12.createElement(Steps, { className: "vds-slider-steps" }, (step) => /* @__PURE__ */ React12.createElement("div", { className: "vds-slider-step", key: String(step) }));
}
DefaultSliderSteps.displayName = "DefaultSliderSteps";

// src/components/layouts/default/ui/menus/font-menu.tsx
function DefaultFontMenu() {
  const label = useDefaultLayoutWord("Caption Styles"), $hasCaptions = useMediaState("hasCaptions"), fontSectionLabel = useDefaultLayoutWord("Font"), textSectionLabel = useDefaultLayoutWord("Text"), textBgSectionLabel = useDefaultLayoutWord("Text Background"), displayBgSectionLabel = useDefaultLayoutWord("Display Background");
  if (!$hasCaptions) return null;
  return /* @__PURE__ */ React13.createElement(Root11, { className: "vds-font-menu vds-menu" }, /* @__PURE__ */ React13.createElement(DefaultMenuButton, { label }), /* @__PURE__ */ React13.createElement(Items, { className: "vds-font-style-items vds-menu-items" }, /* @__PURE__ */ React13.createElement(DefaultMenuSection, { label: fontSectionLabel }, /* @__PURE__ */ React13.createElement(DefaultFontFamilyMenu, null), /* @__PURE__ */ React13.createElement(DefaultFontSizeSlider, null)), /* @__PURE__ */ React13.createElement(DefaultMenuSection, { label: textSectionLabel }, /* @__PURE__ */ React13.createElement(DefaultTextColorInput, null), /* @__PURE__ */ React13.createElement(DefaultTextShadowMenu, null), /* @__PURE__ */ React13.createElement(DefaultTextOpacitySlider, null)), /* @__PURE__ */ React13.createElement(DefaultMenuSection, { label: textBgSectionLabel }, /* @__PURE__ */ React13.createElement(DefaultTextBgInput, null), /* @__PURE__ */ React13.createElement(DefaultTextBgOpacitySlider, null)), /* @__PURE__ */ React13.createElement(DefaultMenuSection, { label: displayBgSectionLabel }, /* @__PURE__ */ React13.createElement(DefaultDisplayBgInput, null), /* @__PURE__ */ React13.createElement(DefaultDisplayBgOpacitySlider, null)), /* @__PURE__ */ React13.createElement(DefaultMenuSection, null, /* @__PURE__ */ React13.createElement(DefaultResetMenuItem, null))));
}
DefaultFontMenu.displayName = "DefaultFontMenu";
function DefaultFontFamilyMenu() {
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Family", type: "fontFamily", option: FONT_FAMILY_OPTION });
}
DefaultFontFamilyMenu.displayName = "DefaultFontFamilyMenu";
function DefaultFontSizeSlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_SIZE_OPTION,
    upIcon: Icons.Menu.FontSizeUp,
    downIcon: Icons.Menu.FontSizeDown
  };
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Size", type: "fontSize", option });
}
DefaultFontSizeSlider.displayName = "DefaultFontSizeSlider";
function DefaultTextColorInput() {
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Color", type: "textColor", option: FONT_COLOR_OPTION });
}
DefaultTextColorInput.displayName = "DefaultTextColorInput";
function DefaultTextOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_OPACITY_OPTION,
    upIcon: Icons.Menu.OpacityUp,
    downIcon: Icons.Menu.OpacityDown
  };
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Opacity", type: "textOpacity", option });
}
DefaultTextOpacitySlider.displayName = "DefaultTextOpacitySlider";
function DefaultTextShadowMenu() {
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Shadow", type: "textShadow", option: FONT_TEXT_SHADOW_OPTION });
}
DefaultTextShadowMenu.displayName = "DefaultTextShadowMenu";
function DefaultTextBgInput() {
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Color", type: "textBg", option: FONT_COLOR_OPTION });
}
DefaultTextBgInput.displayName = "DefaultTextBgInput";
function DefaultTextBgOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_OPACITY_OPTION,
    upIcon: Icons.Menu.OpacityUp,
    downIcon: Icons.Menu.OpacityDown
  };
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Opacity", type: "textBgOpacity", option });
}
DefaultTextBgOpacitySlider.displayName = "DefaultTextBgOpacitySlider";
function DefaultDisplayBgInput() {
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Color", type: "displayBg", option: FONT_COLOR_OPTION });
}
DefaultDisplayBgInput.displayName = "DefaultDisplayBgInput";
function DefaultDisplayBgOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(), option = {
    ...FONT_OPACITY_OPTION,
    upIcon: Icons.Menu.OpacityUp,
    downIcon: Icons.Menu.OpacityDown
  };
  return /* @__PURE__ */ React13.createElement(DefaultFontSetting, { label: "Opacity", type: "displayBgOpacity", option });
}
DefaultDisplayBgOpacitySlider.displayName = "DefaultDisplayBgOpacitySlider";
function DefaultFontSetting({ label, option, type }) {
  const player = useMediaPlayer(), $currentValue = FONT_SIGNALS[type], $value = useSignal($currentValue), translatedLabel = useDefaultLayoutWord(label);
  const notify = React13.useCallback(() => {
    player?.dispatchEvent(new Event("vds-font-change"));
  }, [player]);
  const onChange = React13.useCallback(
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
    var onColorChange = onColorChange2;
    return /* @__PURE__ */ React13.createElement(DefaultMenuItem, { label: translatedLabel }, /* @__PURE__ */ React13.createElement("input", { className: "vds-color-picker", type: "color", value: $value, onChange: onColorChange2 }));
  }
  if (option.type === "slider") {
    let onSliderValueChange2 = function(value) {
      onChange(value + "%");
    };
    var onSliderValueChange = onSliderValueChange2;
    const { min, max, step, upIcon, downIcon } = option;
    return /* @__PURE__ */ React13.createElement(
      DefaultMenuSliderItem,
      {
        label: translatedLabel,
        value: $value,
        UpIcon: upIcon,
        DownIcon: downIcon,
        isMin: $value === min + "%",
        isMax: $value === max + "%"
      },
      /* @__PURE__ */ React13.createElement(
        Root3,
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
        /* @__PURE__ */ React13.createElement(DefaultSliderParts, null),
        /* @__PURE__ */ React13.createElement(DefaultSliderSteps, null)
      )
    );
  }
  if (option.type === "radio") {
    return /* @__PURE__ */ React13.createElement(
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
  const radioOptions = createRadioOptions(values), { translations } = useDefaultLayoutContext(), hint = React13.useMemo(() => {
    const label2 = radioOptions.find((radio) => radio.value === value)?.label || "";
    return i18n(translations, label2);
  }, [value, radioOptions]);
  return /* @__PURE__ */ React13.createElement(Root11, { className: `vds-${id}-menu vds-menu` }, /* @__PURE__ */ React13.createElement(DefaultMenuButton, { label, hint }), /* @__PURE__ */ React13.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React13.createElement(DefaultMenuRadioGroup, { value, options: radioOptions, onChange })));
}
DefaultFontRadioGroup.displayName = "DefaultFontRadioGroup";
function DefaultResetMenuItem() {
  const resetText = useDefaultLayoutWord("Reset");
  return /* @__PURE__ */ React13.createElement("button", { className: "vds-menu-item", role: "menuitem", onClick: onFontReset }, /* @__PURE__ */ React13.createElement("span", { className: "vds-menu-item-label" }, resetText));
}
DefaultResetMenuItem.displayName = "DefaultResetMenuItem";

// src/components/layouts/default/ui/menus/items/menu-checkbox.tsx
import * as React14 from "react";
function DefaultMenuCheckbox({
  label,
  checked,
  storageKey,
  defaultChecked = false,
  onChange
}) {
  const [isChecked, setIsChecked] = React14.useState(defaultChecked), [isActive, setIsActive] = React14.useState(false);
  React14.useEffect(() => {
    const savedValue = storageKey ? localStorage.getItem(storageKey) : null, checked2 = !!(savedValue ?? defaultChecked);
    setIsChecked(checked2);
    onChange?.(checked2);
  }, []);
  React14.useEffect(() => {
    if (isBoolean(checked)) setIsChecked(checked);
  }, [checked]);
  function onPress(event) {
    if (event && "button" in event && event?.button === 1) return;
    const toggledCheck = !isChecked;
    setIsChecked(toggledCheck);
    if (storageKey) localStorage.setItem(storageKey, toggledCheck ? "1" : "");
    onChange?.(toggledCheck, event?.nativeEvent);
    setIsActive(false);
  }
  function onActive(event) {
    if (event.button !== 0) return;
    setIsActive(true);
  }
  function onKeyDown(event) {
    if (isKeyboardClick(event.nativeEvent)) onPress();
  }
  return /* @__PURE__ */ React14.createElement(
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

// src/components/layouts/default/ui/menus/accessibility-menu.tsx
function DefaultAccessibilityMenu({ slots }) {
  const label = useDefaultLayoutWord("Accessibility"), { icons: Icons } = useDefaultLayoutContext();
  return /* @__PURE__ */ React15.createElement(Root11, { className: "vds-accessibility-menu vds-menu" }, /* @__PURE__ */ React15.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Accessibility }), /* @__PURE__ */ React15.createElement(Items, { className: "vds-menu-items" }, slot(slots, "accessibilityMenuItemsStart", null), /* @__PURE__ */ React15.createElement(DefaultMenuSection, null, /* @__PURE__ */ React15.createElement(DefaultAnnouncementsMenuCheckbox, null), /* @__PURE__ */ React15.createElement(DefaultKeyboardAnimationsMenuCheckbox, null)), /* @__PURE__ */ React15.createElement(DefaultMenuSection, null, /* @__PURE__ */ React15.createElement(DefaultFontMenu, null)), slot(slots, "accessibilityMenuItemsEnd", null)));
}
DefaultAccessibilityMenu.displayName = "DefaultAccessibilityMenu";
function DefaultAnnouncementsMenuCheckbox() {
  const { userPrefersAnnouncements } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Announcements");
  function onChange(checked) {
    userPrefersAnnouncements.set(checked);
  }
  return /* @__PURE__ */ React15.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React15.createElement(
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
  if ($viewType !== "video" || noKeyboardAnimations) return null;
  function onChange(checked) {
    userPrefersKeyboardAnimations.set(checked);
  }
  return /* @__PURE__ */ React15.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React15.createElement(
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

// src/components/layouts/default/ui/menus/audio-menu.tsx
import * as React16 from "react";
function DefaultAudioMenu({ slots }) {
  const label = useDefaultLayoutWord("Audio"), $canSetAudioGain = useMediaState("canSetAudioGain"), $audioTracks = useMediaState("audioTracks"), { noAudioGain, icons: Icons } = useDefaultLayoutContext(), hasGainSlider = $canSetAudioGain && !noAudioGain, $disabled = !hasGainSlider && $audioTracks.length <= 1;
  if ($disabled) return null;
  return /* @__PURE__ */ React16.createElement(Root11, { className: "vds-audio-menu vds-menu" }, /* @__PURE__ */ React16.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Audio }), /* @__PURE__ */ React16.createElement(Items, { className: "vds-menu-items" }, slot(slots, "audioMenuItemsStart", null), /* @__PURE__ */ React16.createElement(DefaultAudioTracksMenu, null), hasGainSlider ? /* @__PURE__ */ React16.createElement(DefaultAudioBoostMenuSection, null) : null, slot(slots, "audioMenuItemsEnd", null)));
}
DefaultAudioMenu.displayName = "DefaultAudioMenu";
function DefaultAudioBoostMenuSection() {
  const $audioGain = useMediaState("audioGain"), label = useDefaultLayoutWord("Boost"), value = Math.round((($audioGain ?? 1) - 1) * 100) + "%", $canSetAudioGain = useMediaState("canSetAudioGain"), { noAudioGain, icons: Icons } = useDefaultLayoutContext(), $disabled = !$canSetAudioGain || noAudioGain, min = useGainMin(), max = useGainMax();
  if ($disabled) return null;
  return /* @__PURE__ */ React16.createElement(DefaultMenuSection, { label, value }, /* @__PURE__ */ React16.createElement(
    DefaultMenuSliderItem,
    {
      UpIcon: Icons.Menu.AudioBoostUp,
      DownIcon: Icons.Menu.AudioBoostDown,
      isMin: (($audioGain ?? 1) - 1) * 100 <= min,
      isMax: (($audioGain ?? 1) - 1) * 100 === max
    },
    /* @__PURE__ */ React16.createElement(DefaultAudioGainSlider, null)
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
  return /* @__PURE__ */ React16.createElement(
    Root6,
    {
      className: "vds-audio-gain-slider vds-slider",
      "aria-label": label,
      min,
      max,
      step,
      keyStep: step
    },
    /* @__PURE__ */ React16.createElement(DefaultSliderParts, null),
    /* @__PURE__ */ React16.createElement(DefaultSliderSteps, null)
  );
}
DefaultAudioGainSlider.displayName = "DefaultAudioGainSlider";
function DefaultAudioTracksMenu() {
  const { icons: Icons } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Track"), defaultText = useDefaultLayoutWord("Default"), $track = useMediaState("audioTrack"), options = useAudioOptions();
  if (options.disabled) return null;
  return /* @__PURE__ */ React16.createElement(Root11, { className: "vds-audio-track-menu vds-menu" }, /* @__PURE__ */ React16.createElement(
    DefaultMenuButton,
    {
      label,
      hint: $track?.label ?? defaultText,
      disabled: options.disabled,
      Icon: Icons.Menu.Audio
    }
  ), /* @__PURE__ */ React16.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React16.createElement(
    Root10,
    {
      className: "vds-audio-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React16.createElement(
      Item,
      {
        className: "vds-audio-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React16.createElement(Icons.Menu.RadioCheck, { className: "vds-icon" }),
      /* @__PURE__ */ React16.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  )));
}
DefaultAudioTracksMenu.displayName = "DefaultAudioTracksMenu";

// src/components/layouts/default/ui/menus/captions-menu.tsx
import * as React17 from "react";
function DefaultCaptionMenu({ slots }) {
  const { icons: Icons } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Captions"), offText = useDefaultLayoutWord("Off"), options = useCaptionOptions({ off: offText }), hint = options.selectedTrack?.label ?? offText;
  if (options.disabled) return null;
  return /* @__PURE__ */ React17.createElement(Root11, { className: "vds-captions-menu vds-menu" }, /* @__PURE__ */ React17.createElement(
    DefaultMenuButton,
    {
      label,
      hint,
      disabled: options.disabled,
      Icon: Icons.Menu.Captions
    }
  ), /* @__PURE__ */ React17.createElement(Items, { className: "vds-menu-items" }, slot(slots, "captionsMenuItemsStart", null), /* @__PURE__ */ React17.createElement(
    Root10,
    {
      className: "vds-captions-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React17.createElement(
      Item,
      {
        className: "vds-caption-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React17.createElement(Icons.Menu.RadioCheck, { className: "vds-icon" }),
      /* @__PURE__ */ React17.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  ), slot(slots, "captionsMenuItemsEnd", null)));
}
DefaultCaptionMenu.displayName = "DefaultCaptionMenu";

// src/components/layouts/default/ui/menus/playback-menu.tsx
import * as React18 from "react";
function DefaultPlaybackMenu({ slots }) {
  const label = useDefaultLayoutWord("Playback"), { icons: Icons } = useDefaultLayoutContext();
  return /* @__PURE__ */ React18.createElement(Root11, { className: "vds-playback-menu vds-menu" }, /* @__PURE__ */ React18.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Playback }), /* @__PURE__ */ React18.createElement(Items, { className: "vds-menu-items" }, slot(slots, "playbackMenuItemsStart", null), /* @__PURE__ */ React18.createElement(DefaultMenuSection, null, slot(slots, "playbackMenuLoop", /* @__PURE__ */ React18.createElement(DefaultLoopMenuCheckbox, null))), /* @__PURE__ */ React18.createElement(DefaultSpeedMenuSection, null), /* @__PURE__ */ React18.createElement(DefaultQualityMenuSection, null), slot(slots, "playbackMenuItemsEnd", null)));
}
DefaultPlaybackMenu.displayName = "DefaultPlaybackMenu";
function DefaultLoopMenuCheckbox() {
  const { remote } = useMediaContext2(), label = useDefaultLayoutWord("Loop");
  function onChange(checked, trigger) {
    remote.userPrefersLoopChange(checked, trigger);
  }
  return /* @__PURE__ */ React18.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React18.createElement(DefaultMenuCheckbox, { label, storageKey: "vds-player::user-loop", onChange }));
}
DefaultLoopMenuCheckbox.displayName = "DefaultLoopMenuCheckbox";
function DefaultAutoQualityMenuCheckbox() {
  const { remote, qualities } = useMediaContext2(), $autoQuality = useMediaState("autoQuality"), label = useDefaultLayoutWord("Auto");
  function onChange(checked, trigger) {
    if (checked) {
      remote.requestAutoQuality(trigger);
    } else {
      remote.changeQuality(qualities.selectedIndex, trigger);
    }
  }
  return /* @__PURE__ */ React18.createElement(DefaultMenuItem, { label }, /* @__PURE__ */ React18.createElement(
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
  const { hideQualityBitrate, icons: Icons } = useDefaultLayoutContext(), $canSetQuality = useMediaState("canSetQuality"), $qualities = useMediaState("qualities"), $quality = useMediaState("quality"), label = useDefaultLayoutWord("Quality"), autoText = useDefaultLayoutWord("Auto"), sortedQualities = React18.useMemo(() => sortVideoQualities($qualities), [$qualities]);
  if (!$canSetQuality || $qualities.length <= 1) return null;
  const height = $quality?.height, bitrate = !hideQualityBitrate ? $quality?.bitrate : null, bitrateText = bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null, value = height ? `${height}p${bitrateText ? ` (${bitrateText})` : ""}` : autoText, isMin = sortedQualities[0] === $quality, isMax = sortedQualities.at(-1) === $quality;
  return /* @__PURE__ */ React18.createElement(DefaultMenuSection, { label, value }, /* @__PURE__ */ React18.createElement(
    DefaultMenuSliderItem,
    {
      UpIcon: Icons.Menu.QualityUp,
      DownIcon: Icons.Menu.QualityDown,
      isMin,
      isMax
    },
    /* @__PURE__ */ React18.createElement(DefaultQualitySlider, null)
  ), /* @__PURE__ */ React18.createElement(DefaultAutoQualityMenuCheckbox, null));
}
DefaultQualityMenuSection.displayName = "DefaultQualityMenuSection";
function DefaultQualitySlider() {
  const label = useDefaultLayoutWord("Quality");
  return /* @__PURE__ */ React18.createElement(Root5, { className: "vds-quality-slider vds-slider", "aria-label": label }, /* @__PURE__ */ React18.createElement(DefaultSliderParts, null), /* @__PURE__ */ React18.createElement(DefaultSliderSteps, null));
}
DefaultQualitySlider.displayName = "DefaultQualitySlider";
function DefaultSpeedMenuSection() {
  const { icons: Icons } = useDefaultLayoutContext(), $playbackRate = useMediaState("playbackRate"), $canSetPlaybackRate = useMediaState("canSetPlaybackRate"), label = useDefaultLayoutWord("Speed"), normalText = useDefaultLayoutWord("Normal"), min = useSpeedMin(), max = useSpeedMax(), value = $playbackRate === 1 ? normalText : $playbackRate + "x";
  if (!$canSetPlaybackRate) return null;
  return /* @__PURE__ */ React18.createElement(DefaultMenuSection, { label, value }, /* @__PURE__ */ React18.createElement(
    DefaultMenuSliderItem,
    {
      UpIcon: Icons.Menu.SpeedUp,
      DownIcon: Icons.Menu.SpeedDown,
      isMin: $playbackRate === min,
      isMax: $playbackRate === max
    },
    /* @__PURE__ */ React18.createElement(DefaultSpeedSlider, null)
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
  return /* @__PURE__ */ React18.createElement(
    Root7,
    {
      className: "vds-speed-slider vds-slider",
      "aria-label": label,
      min,
      max,
      step,
      keyStep: step
    },
    /* @__PURE__ */ React18.createElement(DefaultSliderParts, null),
    /* @__PURE__ */ React18.createElement(DefaultSliderSteps, null)
  );
}
DefaultSpeedSlider.displayName = "DefaultSpeedSlider";

// src/components/layouts/default/ui/menus/settings-menu.tsx
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
  } = useDefaultLayoutContext(), settingsText = useDefaultLayoutWord("Settings"), $viewType = useMediaState("viewType"), $offset = !isSmallLayout && menuGroup === "bottom" && $viewType === "video" ? 26 : 0, colorSchemeClass = useColorSchemeClass(colorScheme), [isOpen, setIsOpen] = React19.useState(false), dialogEl = useParentDialogEl();
  useScoped(updateFontCssVars);
  function onOpen() {
    flushSync2(() => {
      setIsOpen(true);
    });
  }
  function onClose() {
    setIsOpen(false);
  }
  const Content2 = /* @__PURE__ */ React19.createElement(
    Items,
    {
      className: "vds-settings-menu-items vds-menu-items",
      placement,
      offset: $offset
    },
    isOpen ? /* @__PURE__ */ React19.createElement(React19.Fragment, null, slot(slots, "settingsMenuItemsStart", null), slot(slots, "settingsMenuStartItems", null), /* @__PURE__ */ React19.createElement(DefaultPlaybackMenu, { slots }), /* @__PURE__ */ React19.createElement(DefaultAccessibilityMenu, { slots }), /* @__PURE__ */ React19.createElement(DefaultAudioMenu, { slots }), /* @__PURE__ */ React19.createElement(DefaultCaptionMenu, { slots }), slot(slots, "settingsMenuEndItems", null), slot(slots, "settingsMenuItemsEnd", null)) : null
  );
  return /* @__PURE__ */ React19.createElement(
    Root11,
    {
      className: "vds-settings-menu vds-menu",
      showDelay: showMenuDelay,
      onOpen,
      onClose
    },
    /* @__PURE__ */ React19.createElement(DefaultTooltip, { content: settingsText, placement: tooltip }, /* @__PURE__ */ React19.createElement(Button, { className: "vds-menu-button vds-button", "aria-label": settingsText }, /* @__PURE__ */ React19.createElement(Icons.Menu.Settings, { className: "vds-icon vds-rotate-icon" }))),
    noModal || !isSmallLayout ? Content2 : /* @__PURE__ */ React19.createElement(
      Portal,
      {
        className: portalClass + (colorSchemeClass ? ` ${colorSchemeClass}` : ""),
        container: menuContainer ?? dialogEl,
        disabled: "fullscreen",
        "data-sm": isSmallLayout ? "" : null,
        "data-lg": !isSmallLayout ? "" : null,
        "data-size": isSmallLayout ? "sm" : "lg",
        "data-view-type": $viewType
      },
      Content2
    )
  );
}
DefaultSettingsMenu.displayName = "DefaultSettingsMenu";

// src/components/layouts/default/ui/sliders.tsx
import * as React20 from "react";
function DefaultVolumePopup({ tooltip, orientation, slots }) {
  const $pointer = useMediaState("pointer"), $muted = useMediaState("muted"), $canSetVolume = useMediaState("canSetVolume"), [rootEl, setRootEl] = React20.useState(null), isRootActive = useActive(rootEl), muteButton = slot(slots, "muteButton", /* @__PURE__ */ React20.createElement(DefaultMuteButton, { tooltip }));
  if (!$canSetVolume) {
    return muteButton;
  }
  return $pointer === "coarse" && !$muted ? null : /* @__PURE__ */ React20.createElement("div", { className: "vds-volume", "data-active": isRootActive ? "" : null, ref: setRootEl }, muteButton, /* @__PURE__ */ React20.createElement("div", { className: "vds-volume-popup" }, slot(slots, "volumeSlider", /* @__PURE__ */ React20.createElement(DefaultVolumeSlider, { orientation }))));
}
DefaultVolumePopup.displayName = "DefaultVolumePopup";
function DefaultVolumeSlider(props) {
  const label = useDefaultLayoutWord("Volume");
  return /* @__PURE__ */ React20.createElement(Root4, { className: "vds-volume-slider vds-slider", "aria-label": label, ...props }, /* @__PURE__ */ React20.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React20.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React20.createElement(Thumb, { className: "vds-slider-thumb" }), /* @__PURE__ */ React20.createElement(Preview, { className: "vds-slider-preview", noClamp: true }, /* @__PURE__ */ React20.createElement(Value, { className: "vds-slider-value" })));
}
DefaultVolumeSlider.displayName = "DefaultVolumeSlider";
function DefaultTimeSlider() {
  const [instance, setInstance] = React20.useState(null), [width, setWidth] = React20.useState(0), $src = useMediaState("currentSrc"), { thumbnails, sliderChaptersMinWidth, disableTimeSlider, seekStep, noScrubGesture } = useDefaultLayoutContext(), label = useDefaultLayoutWord("Seek"), $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail);
  const onResize = React20.useCallback(() => {
    const el = instance?.el;
    el && setWidth(el.clientWidth);
  }, [instance]);
  useResizeObserver(instance?.el, onResize);
  return /* @__PURE__ */ React20.createElement(
    Root9,
    {
      className: "vds-time-slider vds-slider",
      "aria-label": label,
      disabled: disableTimeSlider,
      noSwipeGesture: noScrubGesture,
      keyStep: seekStep,
      ref: setInstance
    },
    /* @__PURE__ */ React20.createElement(
      Chapters,
      {
        className: "vds-slider-chapters",
        disabled: width < sliderChaptersMinWidth
      },
      (cues, forwardRef4) => cues.map((cue) => /* @__PURE__ */ React20.createElement("div", { className: "vds-slider-chapter", key: cue.startTime, ref: forwardRef4 }, /* @__PURE__ */ React20.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React20.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React20.createElement(Progress, { className: "vds-slider-progress vds-slider-track" })))
    ),
    /* @__PURE__ */ React20.createElement(Thumb, { className: "vds-slider-thumb" }),
    /* @__PURE__ */ React20.createElement(Preview, { className: "vds-slider-preview" }, thumbnails ? /* @__PURE__ */ React20.createElement(
      Thumbnail.Root,
      {
        src: thumbnails,
        className: "vds-slider-thumbnail vds-thumbnail"
      },
      /* @__PURE__ */ React20.createElement(Thumbnail.Img, null)
    ) : $RemotionSliderThumbnail && isRemotionSrc($src) ? /* @__PURE__ */ React20.createElement($RemotionSliderThumbnail, { className: "vds-slider-thumbnail vds-thumbnail" }) : null, /* @__PURE__ */ React20.createElement(ChapterTitle, { className: "vds-slider-chapter-title" }), /* @__PURE__ */ React20.createElement(Value, { className: "vds-slider-value" }))
  );
}
DefaultTimeSlider.displayName = "DefaultTimeSlider";

// src/components/layouts/default/ui/time.tsx
import * as React21 from "react";
function DefaultTimeGroup({ slots }) {
  const $duration = useMediaState("duration");
  if (!$duration) return null;
  return /* @__PURE__ */ React21.createElement("div", { className: "vds-time-group" }, slot(slots, "currentTime", /* @__PURE__ */ React21.createElement(Time, { className: "vds-time", type: "current" })), slot(slots, "timeSeparator", /* @__PURE__ */ React21.createElement("div", { className: "vds-time-divider" }, "/")), slot(slots, "endTime", /* @__PURE__ */ React21.createElement(Time, { className: "vds-time", type: "duration" })));
}
DefaultTimeGroup.displayName = "DefaultTimeGroup";
function DefaultTimeInfo({ slots }) {
  const $live = useMediaState("live");
  return $live ? slot(slots, "liveButton", /* @__PURE__ */ React21.createElement(DefaultLiveButton, null)) : /* @__PURE__ */ React21.createElement(DefaultTimeGroup, { slots });
}
DefaultTimeInfo.displayName = "DefaultTimeInfo";
function DefaultTimeInvert({ slots }) {
  const $live = useMediaState("live"), $duration = useMediaState("duration");
  return $live ? slot(slots, "liveButton", /* @__PURE__ */ React21.createElement(DefaultLiveButton, null)) : slot(
    slots,
    "endTime",
    $duration ? /* @__PURE__ */ React21.createElement(Time, { className: "vds-time", type: "current", toggle: true, remainder: true }) : null
  );
}
DefaultTimeInvert.displayName = "DefaultTimeInvert";

// src/components/layouts/default/audio-layout.tsx
var MediaLayout = createDefaultMediaLayout({
  type: "audio",
  smLayoutWhen({ width }) {
    return width < 576;
  },
  renderLayout: () => /* @__PURE__ */ React22.createElement(AudioLayout, null)
});
function DefaultAudioLayout(props) {
  const [scrubbing, setScrubbing] = React22.useState(false), $pointer = useMediaState("pointer");
  const onStartScrubbing = React22.useCallback((event) => {
    const { target } = event, hasTimeSlider = !!(target instanceof HTMLElement && target.closest(".vds-time-slider"));
    if (!hasTimeSlider) return;
    event.nativeEvent.stopImmediatePropagation();
    setScrubbing(true);
  }, []);
  const onStopScrubbing = React22.useCallback(() => {
    setScrubbing(false);
  }, []);
  React22.useEffect(() => {
    if (scrubbing) return listenEvent(window, "pointerdown", onStopScrubbing);
  }, [scrubbing, onStopScrubbing]);
  return /* @__PURE__ */ React22.createElement(
    MediaLayout,
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
  return /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement(DefaultAnnouncer, null), /* @__PURE__ */ React22.createElement(DefaultCaptions, null), /* @__PURE__ */ React22.createElement(Root, { className: "vds-controls" }, /* @__PURE__ */ React22.createElement(Group, { className: "vds-controls-group" }, slot(slots, "seekBackwardButton", /* @__PURE__ */ React22.createElement(DefaultSeekButton, { backward: true, tooltip: "top start" })), slot(slots, "playButton", /* @__PURE__ */ React22.createElement(DefaultPlayButton, { tooltip: "top center" })), slot(slots, "seekForwardButton", /* @__PURE__ */ React22.createElement(DefaultSeekButton, { tooltip: "top center" })), /* @__PURE__ */ React22.createElement(DefaultAudioTitle, null), slot(slots, "timeSlider", /* @__PURE__ */ React22.createElement(DefaultTimeSlider, null)), /* @__PURE__ */ React22.createElement(DefaultTimeInvert, { slots }), /* @__PURE__ */ React22.createElement(DefaultVolumePopup, { orientation: "vertical", tooltip: "top", slots }), slot(slots, "captionButton", /* @__PURE__ */ React22.createElement(DefaultCaptionButton, { tooltip: "top center" })), slot(slots, "downloadButton", /* @__PURE__ */ React22.createElement(DefaultDownloadButton, null)), /* @__PURE__ */ React22.createElement(DefaultAudioMenus, { slots }))));
}
AudioLayout.displayName = "AudioLayout";
function DefaultAudioMenus({ slots }) {
  const { isSmallLayout, noModal } = useDefaultLayoutContext(), placement = noModal ? "top end" : !isSmallLayout ? "top end" : null;
  return /* @__PURE__ */ React22.createElement(React22.Fragment, null, slot(
    slots,
    "chaptersMenu",
    /* @__PURE__ */ React22.createElement(DefaultChaptersMenu, { tooltip: "top", placement, portalClass: "vds-audio-layout" })
  ), slot(
    slots,
    "settingsMenu",
    /* @__PURE__ */ React22.createElement(
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
  const [rootEl, setRootEl] = React22.useState(null), media = useMediaContext2(), { translations } = useDefaultLayoutContext(), [isTextOverflowing, setIsTextOverflowing] = React22.useState(false);
  const isContinued = createComputed(() => {
    const { started, currentTime } = media.$state;
    return started() || currentTime() > 0;
  });
  const $title = useSignal(
    createComputed(() => {
      const { title, ended } = media.$state;
      if (!title()) return "";
      const word = ended() ? "Replay" : isContinued() ? "Continue" : "Play";
      return `${i18n(translations, word)}: ${title()}`;
    })
  );
  const chapterTitle = useChapterTitle(), $isContinued = useSignal(isContinued), $chapterTitle = $isContinued ? chapterTitle : "", isTransitionActive = useTransitionActive(rootEl);
  React22.useEffect(() => {
    if (isTransitionActive && document.activeElement === document.body) {
      media.player.el?.focus({ preventScroll: true });
    }
  }, []);
  const onResize = React22.useCallback(() => {
    const el = rootEl, isOverflowing = !!el && !isTransitionActive && el.clientWidth < el.children[0].clientWidth;
    if (el) toggleClass(el, "vds-marquee", isOverflowing);
    setIsTextOverflowing(isOverflowing);
  }, [rootEl, isTransitionActive]);
  useResizeObserver(rootEl, onResize);
  return $title ? /* @__PURE__ */ React22.createElement("span", { className: "vds-title", title: $title, ref: setRootEl }, /* @__PURE__ */ React22.createElement(AudioTitle, { title: $title, chapterTitle: $chapterTitle }), isTextOverflowing && !isTransitionActive ? /* @__PURE__ */ React22.createElement(AudioTitle, { title: $title, chapterTitle: $chapterTitle }) : null) : /* @__PURE__ */ React22.createElement(DefaultControlsSpacer, null);
}
DefaultAudioTitle.displayName = "DefaultAudioTitle";
function AudioTitle({ title, chapterTitle }) {
  const slots = useDefaultAudioLayoutSlots();
  return /* @__PURE__ */ React22.createElement("span", { className: "vds-title-text" }, slot(slots, "title", title), slot(slots, "chapterTitle", /* @__PURE__ */ React22.createElement("span", { className: "vds-chapter-title" }, chapterTitle)));
}
AudioTitle.displayName = "AudioTitle";

// src/components/layouts/default/video-layout.tsx
import * as React25 from "react";

// src/components/layouts/default/ui/keyboard-display.tsx
import * as React23 from "react";
var DefaultKeyboardDisplay = React23.forwardRef(
  ({ icons: Icons, ...props }, forwardRef4) => {
    const [visible, setVisible] = React23.useState(false), [Icon, setIcon] = React23.useState(null), [count, setCount] = React23.useState(0), $lastKeyboardAction = useMediaState("lastKeyboardAction");
    React23.useEffect(() => {
      setCount((n) => n + 1);
    }, [$lastKeyboardAction]);
    const actionDataAttr = React23.useMemo(() => {
      const action = $lastKeyboardAction?.action;
      return action && visible ? camelToKebabCase(action) : null;
    }, [visible, $lastKeyboardAction]);
    const className = React23.useMemo(
      () => `vds-kb-action${!visible ? " hidden" : ""}${props.className ? ` ${props.className}` : ""}`,
      [visible]
    );
    const $$text = createComputed(getText), $text = useSignal($$text);
    createEffect(() => {
      const Icon2 = getIcon(Icons);
      setIcon(() => Icon2);
    }, [Icons]);
    React23.useEffect(() => {
      setVisible(!!$lastKeyboardAction);
      const id = setTimeout(() => setVisible(false), 500);
      return () => {
        setVisible(false);
        window.clearTimeout(id);
      };
    }, [$lastKeyboardAction]);
    return Icon ? /* @__PURE__ */ React23.createElement(
      Primitive.div,
      {
        ...props,
        className,
        "data-action": actionDataAttr,
        ref: forwardRef4
      },
      /* @__PURE__ */ React23.createElement("div", { className: "vds-kb-text-wrapper" }, /* @__PURE__ */ React23.createElement("div", { className: "vds-kb-text" }, $text)),
      /* @__PURE__ */ React23.createElement("div", { className: "vds-kb-bezel", key: count }, /* @__PURE__ */ React23.createElement("div", { className: "vds-kb-icon" }, /* @__PURE__ */ React23.createElement(Icon, null)))
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

// src/components/layouts/default/ui/title.tsx
import * as React24 from "react";
function DefaultTitle() {
  const $started = useMediaState("started"), $title = useMediaState("title"), $hasChapters = useActiveTextTrack("chapters");
  return $hasChapters && ($started || !$title) ? /* @__PURE__ */ React24.createElement(ChapterTitle2, { className: "vds-chapter-title" }) : /* @__PURE__ */ React24.createElement(Title, { className: "vds-chapter-title" });
}
DefaultTitle.displayName = "DefaultTitle";

// src/components/layouts/default/video-layout.tsx
var MediaLayout2 = createDefaultMediaLayout({
  type: "video",
  smLayoutWhen({ width, height }) {
    return width < 576 || height < 380;
  },
  renderLayout(props) {
    return /* @__PURE__ */ React25.createElement(VideoLayout, { ...props });
  }
});
function DefaultVideoLayout(props) {
  return /* @__PURE__ */ React25.createElement(MediaLayout2, { ...props });
}
DefaultVideoLayout.displayName = "DefaultVideoLayout";
function VideoLayout({ streamType, isLoadLayout, isSmallLayout }) {
  useLayoutName("video");
  return isLoadLayout ? /* @__PURE__ */ React25.createElement(DefaultVideoLoadLayout, null) : streamType === "unknown" ? /* @__PURE__ */ React25.createElement(DefaultBufferingIndicator, null) : isSmallLayout ? /* @__PURE__ */ React25.createElement(DefaultVideoSmallLayout, null) : /* @__PURE__ */ React25.createElement(DefaultVideoLargeLayout, null);
}
VideoLayout.displayName = "VideoLayout";
function DefaultVideoLargeLayout() {
  const { menuGroup } = useDefaultLayoutContext(), baseSlots = useDefaultVideoLayoutSlots(), slots = { ...baseSlots, ...baseSlots?.largeLayout };
  return /* @__PURE__ */ React25.createElement(React25.Fragment, null, /* @__PURE__ */ React25.createElement(DefaultAnnouncer, null), /* @__PURE__ */ React25.createElement(DefaultVideoGestures, null), /* @__PURE__ */ React25.createElement(DefaultVideoKeyboardDisplay, null), slot(slots, "bufferingIndicator", /* @__PURE__ */ React25.createElement(DefaultBufferingIndicator, null)), slot(slots, "captions", /* @__PURE__ */ React25.createElement(DefaultCaptions, null)), /* @__PURE__ */ React25.createElement(Root, { className: "vds-controls" }, /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, slot(slots, "topControlsGroupStart", null), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "topControlsGroupCenter", null), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "topControlsGroupEnd", null), menuGroup === "top" && /* @__PURE__ */ React25.createElement(DefaultVideoMenus, { slots })), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, slot(slots, "centerControlsGroupStart", null), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupCenter", null), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupEnd", null)), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, slot(slots, "timeSlider", /* @__PURE__ */ React25.createElement(DefaultTimeSlider, null))), /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, slot(slots, "playButton", /* @__PURE__ */ React25.createElement(DefaultPlayButton, { tooltip: "top start" })), /* @__PURE__ */ React25.createElement(DefaultVolumePopup, { orientation: "horizontal", tooltip: "top", slots }), /* @__PURE__ */ React25.createElement(DefaultTimeInfo, { slots }), slot(slots, "chapterTitle", /* @__PURE__ */ React25.createElement(DefaultTitle, null)), slot(slots, "captionButton", /* @__PURE__ */ React25.createElement(DefaultCaptionButton, { tooltip: "top" })), menuGroup === "bottom" && /* @__PURE__ */ React25.createElement(DefaultVideoMenus, { slots }), slot(slots, "airPlayButton", /* @__PURE__ */ React25.createElement(DefaultAirPlayButton, { tooltip: "top" })), slot(slots, "googleCastButton", /* @__PURE__ */ React25.createElement(DefaultGoogleCastButton, { tooltip: "top" })), slot(slots, "downloadButton", /* @__PURE__ */ React25.createElement(DefaultDownloadButton, null)), slot(slots, "pipButton", /* @__PURE__ */ React25.createElement(DefaultPIPButton, { tooltip: "top" })), slot(slots, "fullscreenButton", /* @__PURE__ */ React25.createElement(DefaultFullscreenButton, { tooltip: "top end" })))));
}
DefaultVideoLargeLayout.displayName = "DefaultVideoLargeLayout";
function DefaultVideoSmallLayout() {
  const baseSlots = useDefaultVideoLayoutSlots(), slots = { ...baseSlots, ...baseSlots?.smallLayout };
  return /* @__PURE__ */ React25.createElement(React25.Fragment, null, /* @__PURE__ */ React25.createElement(DefaultAnnouncer, null), /* @__PURE__ */ React25.createElement(DefaultVideoGestures, null), /* @__PURE__ */ React25.createElement(DefaultVideoKeyboardDisplay, null), slot(slots, "bufferingIndicator", /* @__PURE__ */ React25.createElement(DefaultBufferingIndicator, null)), slot(slots, "captions", /* @__PURE__ */ React25.createElement(DefaultCaptions, null)), /* @__PURE__ */ React25.createElement(Root, { className: "vds-controls" }, /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, slot(slots, "topControlsGroupStart", null), slot(slots, "airPlayButton", /* @__PURE__ */ React25.createElement(DefaultAirPlayButton, { tooltip: "top start" })), slot(slots, "googleCastButton", /* @__PURE__ */ React25.createElement(DefaultGoogleCastButton, { tooltip: "top start" })), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "topControlsGroupCenter", null), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "captionButton", /* @__PURE__ */ React25.createElement(DefaultCaptionButton, { tooltip: "bottom" })), slot(slots, "downloadButton", /* @__PURE__ */ React25.createElement(DefaultDownloadButton, null)), /* @__PURE__ */ React25.createElement(DefaultVideoMenus, { slots }), /* @__PURE__ */ React25.createElement(DefaultVolumePopup, { orientation: "vertical", tooltip: "bottom end", slots }), slot(slots, "topControlsGroupEnd", null)), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group", style: { pointerEvents: "none" } }, slot(slots, "centerControlsGroupStart", null), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupCenter", null), slot(slots, "playButton", /* @__PURE__ */ React25.createElement(DefaultPlayButton, { tooltip: "top" })), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), slot(slots, "centerControlsGroupEnd", null)), /* @__PURE__ */ React25.createElement(DefaultControlsSpacer, null), /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React25.createElement(DefaultTimeInfo, { slots }), slot(slots, "chapterTitle", /* @__PURE__ */ React25.createElement(DefaultTitle, null)), slot(slots, "fullscreenButton", /* @__PURE__ */ React25.createElement(DefaultFullscreenButton, { tooltip: "top end" }))), /* @__PURE__ */ React25.createElement(Group, { className: "vds-controls-group" }, slot(slots, "timeSlider", /* @__PURE__ */ React25.createElement(DefaultTimeSlider, null)))), slot(slots, "startDuration", /* @__PURE__ */ React25.createElement(DefaultVideoStartDuration, null)));
}
DefaultVideoSmallLayout.displayName = "DefaultVideoSmallLayout";
function DefaultVideoStartDuration() {
  const $duration = useMediaState("duration");
  if ($duration === 0) return null;
  return /* @__PURE__ */ React25.createElement("div", { className: "vds-start-duration" }, /* @__PURE__ */ React25.createElement(Time, { className: "vds-time", type: "duration" }));
}
DefaultVideoStartDuration.displayName = "DefaultVideoStartDuration";
function DefaultVideoGestures() {
  const { noGestures } = useDefaultLayoutContext();
  if (noGestures) return null;
  return /* @__PURE__ */ React25.createElement("div", { className: "vds-gestures" }, /* @__PURE__ */ React25.createElement(Gesture, { className: "vds-gesture", event: "pointerup", action: "toggle:paused" }), /* @__PURE__ */ React25.createElement(Gesture, { className: "vds-gesture", event: "pointerup", action: "toggle:controls" }), /* @__PURE__ */ React25.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "toggle:fullscreen" }), /* @__PURE__ */ React25.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "seek:-10" }), /* @__PURE__ */ React25.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "seek:10" }));
}
DefaultVideoGestures.displayName = "DefaultVideoGestures";
function DefaultBufferingIndicator() {
  return /* @__PURE__ */ React25.createElement("div", { className: "vds-buffering-indicator" }, /* @__PURE__ */ React25.createElement(Root12, { className: "vds-buffering-spinner" }, /* @__PURE__ */ React25.createElement(Track2, { className: "vds-buffering-track" }), /* @__PURE__ */ React25.createElement(TrackFill2, { className: "vds-buffering-track-fill" })));
}
DefaultBufferingIndicator.displayName = "DefaultBufferingIndicator";
function DefaultVideoMenus({ slots }) {
  const { isSmallLayout, noModal, menuGroup } = useDefaultLayoutContext(), side = menuGroup === "top" || isSmallLayout ? "bottom" : "top", tooltip = `${side} end`, placement = noModal ? `${side} end` : !isSmallLayout ? `${side} end` : null;
  return /* @__PURE__ */ React25.createElement(React25.Fragment, null, slot(
    slots,
    "chaptersMenu",
    /* @__PURE__ */ React25.createElement(
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
    /* @__PURE__ */ React25.createElement(
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
  return /* @__PURE__ */ React25.createElement("div", { className: "vds-load-container" }, slot(slots, "bufferingIndicator", /* @__PURE__ */ React25.createElement(DefaultBufferingIndicator, null)), slot(slots, "loadButton", /* @__PURE__ */ React25.createElement(DefaultPlayButton, { tooltip: "top" })));
}
DefaultVideoLoadLayout.displayName = "DefaultVideoLoadLayout";
function DefaultVideoKeyboardDisplay() {
  const { noKeyboardAnimations, icons, userPrefersKeyboardAnimations } = useDefaultLayoutContext(), $userPrefersKeyboardAnimations = useSignal(userPrefersKeyboardAnimations), disabled = noKeyboardAnimations || !$userPrefersKeyboardAnimations;
  if (disabled || !icons.KeyboardDisplay) return null;
  return /* @__PURE__ */ React25.createElement(DefaultKeyboardDisplay, { icons: icons.KeyboardDisplay });
}
DefaultVideoKeyboardDisplay.displayName = "DefaultVideoKeyboardDisplay";

export {
  DefaultLayoutContext,
  useDefaultLayoutContext,
  useDefaultLayoutWord,
  i18n,
  DefaultTooltip,
  DefaultMenuSection,
  DefaultMenuButton,
  DefaultMenuItem,
  DefaultMenuRadioGroup,
  createRadioOptions,
  DefaultMenuSliderItem,
  DefaultSliderParts,
  DefaultSliderSteps,
  DefaultMenuCheckbox,
  DefaultAudioLayout,
  DefaultKeyboardDisplay,
  DefaultVideoLayout,
  DefaultVideoLargeLayout,
  DefaultVideoSmallLayout,
  DefaultVideoGestures,
  DefaultBufferingIndicator
};
