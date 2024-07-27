"use client"

import * as React from 'react';
import { createReactComponent, composeRefs, listenEvent, useReactScope, scoped, signal, computed, effect, createDisposalBin, useSignal } from './vidstack-DcuYVyd0.js';
import { Primitive, MediaAnnouncerInstance, ControlsInstance, ControlsGroupInstance, TooltipInstance, TooltipTriggerInstance, TooltipContentInstance, GoogleCastButtonInstance, QualitySliderInstance, AudioGainSliderInstance, SpeedSliderInstance, useMediaState, watchActiveTextTrack, CaptionsInstance, formatTime, formatSpokenTime } from './vidstack-DVfG6VuV.js';
import { sliderCallbacks, Preview, Steps, Thumb, Track as Track$1, TrackFill as TrackFill$1, Value, useMediaContext } from './vidstack-C0BKR3Mz.js';

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
  const media = useMediaContext(), [track, setTrack] = React.useState(null);
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
    if (!track) return;
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
  const media = useMediaContext(), track = useActiveTextTrack("chapters"), cues = useTextCues(track), $startTime = useSignal(media.$state.clipStartTime), $endTime = useSignal(media.$state.clipEndTime) || Infinity;
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
          if (currentRef === ref) return;
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

export { Captions, ChapterTitle, Content, GoogleCastButton, Group, MediaAnnouncer, Root$4 as Root, Root$2 as Root$1, Root$3 as Root$2, Root$1 as Root$3, Root$5 as Root$4, Root as Root$5, Title, Track, TrackFill, Trigger, audioGainSlider, controls, createComputed, createEffect, createSignal, qualitySlider, speedSlider, spinner, tooltip, useActiveTextCues, useActiveTextTrack, useChapterOptions, useChapterTitle, useScoped, useTextCues };
