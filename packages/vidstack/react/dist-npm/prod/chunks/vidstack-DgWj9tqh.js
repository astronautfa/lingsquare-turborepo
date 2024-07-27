"use client"

import { I as IS_SERVER, bP as useMediaContext, al as FONT_SIGNALS, ak as FONT_DEFAULTS, P as Primitive, bc as MediaAnnouncerInstance, bd as ControlsInstance, be as ControlsGroupInstance, bo as TooltipInstance, bp as TooltipTriggerInstance, bq as TooltipContentInstance, bm as GoogleCastButtonInstance, bw as QualitySliderInstance, bu as AudioGainSliderInstance, bv as SpeedSliderInstance, u as useMediaState, ac as watchActiveTextTrack, bJ as CaptionsInstance, B as formatTime, C as formatSpokenTime } from './vidstack-1EoJRWh6.js';
import { v as onDispose, a as scoped, r as keysOf, m as camelToKebabCase, e as effect, B as createReactComponent, x as composeRefs, l as listenEvent, F as useReactScope, s as signal, L as computed, c as createDisposalBin, u as useSignal } from './vidstack-wClXxc1a.js';
import * as React from 'react';
import { o as sliderCallbacks, d as Preview, p as Steps, q as Thumb, w as Track$1, x as TrackFill$1, V as Value, a as useMediaContext$1 } from './vidstack-x8CsPVpc.js';

function hexToRgb(hex) {
  const { style } = new Option();
  style.color = hex;
  return style.color.match(/\((.*?)\)/)[1].replace(/,/g, " ");
}

let isWatchingVars = false, players = /* @__PURE__ */ new Set();
function updateFontCssVars() {
  if (IS_SERVER)
    return;
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

const MediaAnnouncerBridge = createReactComponent(MediaAnnouncerInstance, {
  events: ["onChange"]
});
const MediaAnnouncer = React.forwardRef(
  ({ style, children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(MediaAnnouncerBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.div,
      {
        ...props2,
        style: { display: "contents", ...style },
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
MediaAnnouncer.displayName = "MediaAnnouncer";

const ControlsBridge = createReactComponent(ControlsInstance);
const Root$5 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ControlsBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Root$5.displayName = "Controls";
const ControlsGroupBridge = createReactComponent(ControlsGroupInstance);
const Group = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ControlsGroupBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Group.displayName = "ControlsGroup";

var controls = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Group: Group,
  Root: Root$5
});

const TooltipBridge = createReactComponent(TooltipInstance);
function Root$4({ children, ...props }) {
  return /* @__PURE__ */ React.createElement(TooltipBridge, { ...props }, children);
}
Root$4.displayName = "Tooltip";
const TriggerBridge = createReactComponent(TooltipTriggerInstance);
const Trigger = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(TriggerBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
Trigger.displayName = "TooltipTrigger";
const ContentBridge = createReactComponent(TooltipContentInstance);
const Content = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(ContentBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
Content.displayName = "TooltipContent";

var tooltip = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Content: Content,
  Root: Root$4,
  Trigger: Trigger
});

const GoogleCastButtonBridge = createReactComponent(GoogleCastButtonInstance, {
  domEventsRegex: /^onMedia/
});
const GoogleCastButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(GoogleCastButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
GoogleCastButton.displayName = "GoogleCastButton";

const QualitySliderBridge = createReactComponent(QualitySliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
const Root$3 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(QualitySliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$3.displayName = "QualitySlider";

var qualitySlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$3,
  Steps: Steps,
  Thumb: Thumb,
  Track: Track$1,
  TrackFill: TrackFill$1,
  Value: Value
});

const AudioGainSliderBridge = createReactComponent(AudioGainSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
const Root$2 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(AudioGainSliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$2.displayName = "AudioGainSlider";

var audioGainSlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$2,
  Steps: Steps,
  Thumb: Thumb,
  Track: Track$1,
  TrackFill: TrackFill$1,
  Value: Value
});

const SpeedSliderBridge = createReactComponent(SpeedSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
const Root$1 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SpeedSliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$1.displayName = "SpeedSlider";

var speedSlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$1,
  Steps: Steps,
  Thumb: Thumb,
  Track: Track$1,
  TrackFill: TrackFill$1,
  Value: Value
});

const Title = React.forwardRef(({ children, ...props }, forwardRef) => {
  const $title = useMediaState("title");
  return /* @__PURE__ */ React.createElement(Primitive.span, { ...props, ref: forwardRef }, $title, children);
});
Title.displayName = "Title";

function useActiveTextCues(track) {
  const [activeCues, setActiveCues] = React.useState([]);
  React.useEffect(() => {
    if (!track) {
      setActiveCues([]);
      return;
    }
    function onCuesChange() {
      setActiveCues(track.activeCues);
    }
    onCuesChange();
    return listenEvent(track, "cue-change", onCuesChange);
  }, [track]);
  return activeCues;
}

function useActiveTextTrack(kind) {
  const media = useMediaContext$1(), [track, setTrack] = React.useState(null);
  React.useEffect(() => {
    return watchActiveTextTrack(media.textTracks, kind, setTrack);
  }, [kind]);
  return track;
}

function useChapterTitle() {
  const $track = useActiveTextTrack("chapters"), $cues = useActiveTextCues($track);
  return $cues[0]?.text || "";
}

const ChapterTitle = React.forwardRef(
  ({ defaultText = "", children, ...props }, forwardRef) => {
    const $chapterTitle = useChapterTitle();
    return /* @__PURE__ */ React.createElement(Primitive.span, { ...props, ref: forwardRef }, $chapterTitle || defaultText, children);
  }
);
ChapterTitle.displayName = "ChapterTitle";

const CaptionsBridge = createReactComponent(CaptionsInstance);
const Captions = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(CaptionsBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Captions.displayName = "Captions";

const Root = React.forwardRef(
  ({ size = 96, children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: size,
        height: size,
        fill: "none",
        viewBox: "0 0 120 120",
        "aria-hidden": "true",
        "data-part": "root",
        ...props,
        ref: forwardRef
      },
      children
    );
  }
);
const Track = React.forwardRef(
  ({ width = 8, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "60",
      cy: "60",
      r: "54",
      stroke: "currentColor",
      strokeWidth: width,
      "data-part": "track",
      ...props,
      ref
    },
    children
  )
);
const TrackFill = React.forwardRef(
  ({ width = 8, fillPercent = 50, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "60",
      cy: "60",
      r: "54",
      stroke: "currentColor",
      pathLength: "100",
      strokeWidth: width,
      strokeDasharray: 100,
      strokeDashoffset: 100 - fillPercent,
      "data-part": "track-fill",
      ...props,
      ref
    },
    children
  )
);

var spinner = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Root: Root,
  Track: Track,
  TrackFill: TrackFill
});

function createSignal(initialValue, deps = []) {
  const scope = useReactScope();
  return React.useMemo(() => scoped(() => signal(initialValue), scope), [scope, ...deps]);
}
function createComputed(compute, deps = []) {
  const scope = useReactScope();
  return React.useMemo(() => scoped(() => computed(compute), scope), [scope, ...deps]);
}
function createEffect(compute, deps = []) {
  const scope = useReactScope();
  React.useEffect(() => scoped(() => effect(compute), scope), [scope, ...deps]);
}
function useScoped(compute) {
  const scope = useReactScope();
  return React.useMemo(() => scoped(compute, scope), [scope]);
}

function useTextCues(track) {
  const [cues, setCues] = React.useState([]);
  React.useEffect(() => {
    if (!track)
      return;
    function onCuesChange(track2) {
      setCues([...track2.cues]);
    }
    const disposal = createDisposalBin();
    disposal.add(
      listenEvent(track, "add-cue", () => onCuesChange(track)),
      listenEvent(track, "remove-cue", () => onCuesChange(track))
    );
    onCuesChange(track);
    return () => {
      disposal.empty();
      setCues([]);
    };
  }, [track]);
  return cues;
}

function useChapterOptions() {
  const media = useMediaContext$1(), track = useActiveTextTrack("chapters"), cues = useTextCues(track), $startTime = useSignal(media.$state.clipStartTime), $endTime = useSignal(media.$state.clipEndTime) || Infinity;
  useActiveTextCues(track);
  return React.useMemo(() => {
    const options = track ? cues.filter((cue) => cue.startTime <= $endTime && cue.endTime >= $startTime).map((cue, i) => {
      let currentRef = null, stopProgressEffect;
      return {
        cue,
        label: cue.text,
        value: i.toString(),
        startTimeText: formatTime(Math.max(0, cue.startTime - $startTime)),
        durationText: formatSpokenTime(
          Math.min($endTime, cue.endTime) - Math.max($startTime, cue.startTime)
        ),
        get selected() {
          return cue === track.activeCues[0];
        },
        setProgressVar(ref) {
          if (!ref || cue !== track.activeCues[0]) {
            stopProgressEffect?.();
            stopProgressEffect = void 0;
            ref?.style.setProperty("--progress", "0%");
            currentRef = null;
            return;
          }
          if (currentRef === ref)
            return;
          currentRef = ref;
          stopProgressEffect?.();
          stopProgressEffect = effect(() => {
            const { realCurrentTime } = media.$state, time = realCurrentTime(), cueStartTime = Math.max($startTime, cue.startTime), duration = Math.min($endTime, cue.endTime) - cueStartTime, progress = Math.max(0, time - cueStartTime) / duration * 100;
            ref.style.setProperty("--progress", progress.toFixed(3) + "%");
          });
        },
        select(trigger) {
          media.remote.seek(cue.startTime - $startTime, trigger);
        }
      };
    }) : [];
    Object.defineProperty(options, "selectedValue", {
      get() {
        const index = options.findIndex((option) => option.selected);
        return (index >= 0 ? index : 0).toString();
      }
    });
    return options;
  }, [cues, $startTime, $endTime]);
}

export { TrackFill as A, ChapterTitle as C, GoogleCastButton as G, MediaAnnouncer as M, Root$4 as R, Title as T, controls as a, audioGainSlider as b, createSignal as c, Captions as d, spinner as e, updateFontCssVars as f, useTextCues as g, useActiveTextCues as h, useActiveTextTrack as i, useChapterTitle as j, useChapterOptions as k, createComputed as l, Trigger as m, Content as n, Root$2 as o, Root$3 as p, qualitySlider as q, Root$1 as r, speedSlider as s, tooltip as t, useScoped as u, Root$5 as v, Group as w, createEffect as x, Root as y, Track as z };
