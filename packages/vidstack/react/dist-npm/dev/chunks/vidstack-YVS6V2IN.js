import {
  Preview,
  Steps,
  Thumb,
  Track,
  TrackFill,
  Value,
  sliderCallbacks,
  useMediaContext
} from "./vidstack-QKZVTF5G.js";
import {
  AudioGainSliderInstance,
  CaptionsInstance,
  ControlsGroupInstance,
  ControlsInstance,
  GoogleCastButtonInstance,
  MediaAnnouncerInstance,
  Primitive,
  QualitySliderInstance,
  SpeedSliderInstance,
  TooltipContentInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  useMediaState
} from "./vidstack-CDYAPKDM.js";
import {
  formatSpokenTime,
  formatTime
} from "./vidstack-ALARDIAR.js";
import {
  watchActiveTextTrack
} from "./vidstack-A5V4LMVI.js";
import {
  composeRefs,
  computed,
  createDisposalBin,
  createReactComponent,
  effect,
  listenEvent,
  scoped,
  signal,
  useReactScope,
  useSignal
} from "./vidstack-KAGOB6PR.js";
import {
  __export
} from "./vidstack-YJG6SZYI.js";

// src/components/announcer.tsx
import * as React from "react";
var MediaAnnouncerBridge = createReactComponent(MediaAnnouncerInstance, {
  events: ["onChange"]
});
var MediaAnnouncer = React.forwardRef(
  ({ style, children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React.createElement(MediaAnnouncerBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.div,
      {
        ...props2,
        style: { display: "contents", ...style },
        ref: composeRefs(props2.ref, forwardRef12)
      },
      children
    ));
  }
);
MediaAnnouncer.displayName = "MediaAnnouncer";

// src/components/ui/controls.tsx
var controls_exports = {};
__export(controls_exports, {
  Group: () => Group,
  Root: () => Root
});
import * as React2 from "react";
var ControlsBridge = createReactComponent(ControlsInstance);
var Root = React2.forwardRef(({ children, ...props }, forwardRef12) => {
  return /* @__PURE__ */ React2.createElement(ControlsBridge, { ...props }, (props2) => /* @__PURE__ */ React2.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef12)
    },
    children
  ));
});
Root.displayName = "Controls";
var ControlsGroupBridge = createReactComponent(ControlsGroupInstance);
var Group = React2.forwardRef(({ children, ...props }, forwardRef12) => {
  return /* @__PURE__ */ React2.createElement(ControlsGroupBridge, { ...props }, (props2) => /* @__PURE__ */ React2.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef12)
    },
    children
  ));
});
Group.displayName = "ControlsGroup";

// src/components/ui/tooltip.tsx
var tooltip_exports = {};
__export(tooltip_exports, {
  Content: () => Content,
  Root: () => Root2,
  Trigger: () => Trigger
});
import * as React3 from "react";
var TooltipBridge = createReactComponent(TooltipInstance);
function Root2({ children, ...props }) {
  return /* @__PURE__ */ React3.createElement(TooltipBridge, { ...props }, children);
}
Root2.displayName = "Tooltip";
var TriggerBridge = createReactComponent(TooltipTriggerInstance);
var Trigger = React3.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React3.createElement(TriggerBridge, { ...props }, (props2) => /* @__PURE__ */ React3.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef12)
      },
      children
    ));
  }
);
Trigger.displayName = "TooltipTrigger";
var ContentBridge = createReactComponent(TooltipContentInstance);
var Content = React3.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React3.createElement(ContentBridge, { ...props }, (props2) => /* @__PURE__ */ React3.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef12)
      },
      children
    ));
  }
);
Content.displayName = "TooltipContent";

// src/components/ui/buttons/google-cast-button.tsx
import * as React4 from "react";
var GoogleCastButtonBridge = createReactComponent(GoogleCastButtonInstance, {
  domEventsRegex: /^onMedia/
});
var GoogleCastButton = React4.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React4.createElement(GoogleCastButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React4.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef12)
      },
      children
    ));
  }
);
GoogleCastButton.displayName = "GoogleCastButton";

// src/components/ui/sliders/quality-slider.tsx
var quality_slider_exports = {};
__export(quality_slider_exports, {
  Preview: () => Preview,
  Root: () => Root3,
  Steps: () => Steps,
  Thumb: () => Thumb,
  Track: () => Track,
  TrackFill: () => TrackFill,
  Value: () => Value
});
import * as React5 from "react";
var QualitySliderBridge = createReactComponent(QualitySliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
var Root3 = React5.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React5.createElement(QualitySliderBridge, { ...props, ref: forwardRef12 }, (props2) => /* @__PURE__ */ React5.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root3.displayName = "QualitySlider";

// src/components/ui/sliders/audio-gain-slider.tsx
var audio_gain_slider_exports = {};
__export(audio_gain_slider_exports, {
  Preview: () => Preview,
  Root: () => Root4,
  Steps: () => Steps,
  Thumb: () => Thumb,
  Track: () => Track,
  TrackFill: () => TrackFill,
  Value: () => Value
});
import * as React6 from "react";
var AudioGainSliderBridge = createReactComponent(AudioGainSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
var Root4 = React6.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React6.createElement(AudioGainSliderBridge, { ...props, ref: forwardRef12 }, (props2) => /* @__PURE__ */ React6.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root4.displayName = "AudioGainSlider";

// src/components/ui/sliders/speed-slider.tsx
var speed_slider_exports = {};
__export(speed_slider_exports, {
  Preview: () => Preview,
  Root: () => Root5,
  Steps: () => Steps,
  Thumb: () => Thumb,
  Track: () => Track,
  TrackFill: () => TrackFill,
  Value: () => Value
});
import * as React7 from "react";
var SpeedSliderBridge = createReactComponent(SpeedSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
var Root5 = React7.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React7.createElement(SpeedSliderBridge, { ...props, ref: forwardRef12 }, (props2) => /* @__PURE__ */ React7.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root5.displayName = "SpeedSlider";

// src/components/ui/title.tsx
import * as React8 from "react";
var Title = React8.forwardRef(({ children, ...props }, forwardRef12) => {
  const $title = useMediaState("title");
  return /* @__PURE__ */ React8.createElement(Primitive.span, { ...props, ref: forwardRef12 }, $title, children);
});
Title.displayName = "Title";

// src/hooks/use-active-text-cues.ts
import * as React9 from "react";
function useActiveTextCues(track) {
  const [activeCues, setActiveCues] = React9.useState([]);
  React9.useEffect(() => {
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

// src/hooks/use-active-text-track.ts
import * as React10 from "react";
function useActiveTextTrack(kind) {
  const media = useMediaContext(), [track, setTrack] = React10.useState(null);
  React10.useEffect(() => {
    return watchActiveTextTrack(media.textTracks, kind, setTrack);
  }, [kind]);
  return track;
}

// src/hooks/use-chapter-title.ts
function useChapterTitle() {
  const $track = useActiveTextTrack("chapters"), $cues = useActiveTextCues($track);
  return $cues[0]?.text || "";
}

// src/components/ui/chapter-title.tsx
import * as React11 from "react";
var ChapterTitle = React11.forwardRef(
  ({ defaultText = "", children, ...props }, forwardRef12) => {
    const $chapterTitle = useChapterTitle();
    return /* @__PURE__ */ React11.createElement(Primitive.span, { ...props, ref: forwardRef12 }, $chapterTitle || defaultText, children);
  }
);
ChapterTitle.displayName = "ChapterTitle";

// src/components/ui/captions.tsx
import * as React12 from "react";
var CaptionsBridge = createReactComponent(CaptionsInstance);
var Captions = React12.forwardRef(
  ({ children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React12.createElement(CaptionsBridge, { ...props, ref: forwardRef12 }, (props2) => /* @__PURE__ */ React12.createElement(Primitive.div, { ...props2 }, children));
  }
);
Captions.displayName = "Captions";

// src/components/ui/spinner.tsx
var spinner_exports = {};
__export(spinner_exports, {
  Root: () => Root6,
  Track: () => Track2,
  TrackFill: () => TrackFill2
});
import * as React13 from "react";
var Root6 = React13.forwardRef(
  ({ size = 96, children, ...props }, forwardRef12) => {
    return /* @__PURE__ */ React13.createElement(
      "svg",
      {
        width: size,
        height: size,
        fill: "none",
        viewBox: "0 0 120 120",
        "aria-hidden": "true",
        "data-part": "root",
        ...props,
        ref: forwardRef12
      },
      children
    );
  }
);
var Track2 = React13.forwardRef(
  ({ width = 8, children, ...props }, ref) => /* @__PURE__ */ React13.createElement(
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
var TrackFill2 = React13.forwardRef(
  ({ width = 8, fillPercent = 50, children, ...props }, ref) => /* @__PURE__ */ React13.createElement(
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

// src/hooks/use-text-cues.ts
import * as React14 from "react";
function useTextCues(track) {
  const [cues, setCues] = React14.useState([]);
  React14.useEffect(() => {
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

// src/hooks/options/use-chapter-options.ts
import * as React15 from "react";
function useChapterOptions() {
  const media = useMediaContext(), track = useActiveTextTrack("chapters"), cues = useTextCues(track), $startTime = useSignal(media.$state.clipStartTime), $endTime = useSignal(media.$state.clipEndTime) || Infinity;
  useActiveTextCues(track);
  return React15.useMemo(() => {
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

// src/hooks/use-signals.ts
import * as React16 from "react";
function createSignal(initialValue, deps = []) {
  const scope = useReactScope();
  return React16.useMemo(() => scoped(() => signal(initialValue), scope), [scope, ...deps]);
}
function createComputed(compute, deps = []) {
  const scope = useReactScope();
  return React16.useMemo(() => scoped(() => computed(compute), scope), [scope, ...deps]);
}
function createEffect(compute, deps = []) {
  const scope = useReactScope();
  React16.useEffect(() => scoped(() => effect(compute), scope), [scope, ...deps]);
}
function useScoped(compute) {
  const scope = useReactScope();
  return React16.useMemo(() => scoped(compute, scope), [scope]);
}

export {
  MediaAnnouncer,
  Root,
  Group,
  controls_exports,
  Root2,
  Trigger,
  Content,
  tooltip_exports,
  GoogleCastButton,
  Root3,
  quality_slider_exports,
  Root4,
  audio_gain_slider_exports,
  Root5,
  speed_slider_exports,
  Title,
  useActiveTextCues,
  useActiveTextTrack,
  useChapterTitle,
  ChapterTitle,
  Captions,
  Root6,
  Track2 as Track,
  TrackFill2 as TrackFill,
  spinner_exports,
  createSignal,
  createComputed,
  createEffect,
  useScoped,
  useTextCues,
  useChapterOptions
};
