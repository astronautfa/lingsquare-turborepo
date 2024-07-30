"use client"

import * as React from 'react';
import { O as useReactContext, E as createReactComponent, z as composeRefs, u as useSignal, C as noop, F as useStateContext, s as signal, e as effect, i as isString } from './vidstack-DwBltyvo.js';
import { Y as mediaContext, P as Primitive, bl as AirPlayButtonInstance, bk as PlayButtonInstance, bf as CaptionButtonInstance, bg as FullscreenButtonInstance, bi as MuteButtonInstance, bj as PIPButtonInstance, bn as SeekButtonInstance, bh as LiveButtonInstance, by as SliderValueInstance, q as useSliderState, br as SliderInstance, bA as SliderPreviewInstance, bt as VolumeSliderInstance, I as IS_SERVER$1, bL as ThumbnailInstance, bs as TimeSliderInstance, bB as SliderChaptersInstance, bx as SliderThumbnailInstance, bz as SliderVideoInstance, v as mediaState, bH as RadioGroupInstance, bI as RadioInstance, u as useMediaState, bC as MenuInstance, bD as MenuButtonInstance, bE as MenuItemsInstance, bF as MenuItemInstance, bK as GestureInstance, bM as TimeInstance, a6 as isTrackCaptionKind } from './vidstack-DLTRlLRp.js';
import { createPortal } from 'react-dom';

function useMediaContext() {
  return useReactContext(mediaContext);
}

const AirPlayButtonBridge = createReactComponent(AirPlayButtonInstance, {
  domEventsRegex: /^onMedia/
});
const AirPlayButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(AirPlayButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
AirPlayButton.displayName = "AirPlayButton";

const PlayButtonBridge = createReactComponent(PlayButtonInstance, {
  domEventsRegex: /^onMedia/
});
const PlayButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PlayButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
PlayButton.displayName = "PlayButton";

const CaptionButtonBridge = createReactComponent(CaptionButtonInstance, {
  domEventsRegex: /^onMedia/
});
const CaptionButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(CaptionButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
CaptionButton.displayName = "CaptionButton";

const FullscreenButtonBridge = createReactComponent(FullscreenButtonInstance, {
  domEventsRegex: /^onMedia/
});
const FullscreenButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(FullscreenButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
FullscreenButton.displayName = "FullscreenButton";

const MuteButtonBridge = createReactComponent(MuteButtonInstance, {
  domEventsRegex: /^onMedia/
});
const MuteButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(MuteButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
MuteButton.displayName = "MuteButton";

const PIPButtonBridge = createReactComponent(PIPButtonInstance, {
  domEventsRegex: /^onMedia/
});
const PIPButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PIPButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
PIPButton.displayName = "PIPButton";

const SeekButtonBridge = createReactComponent(SeekButtonInstance, {
  domEventsRegex: /^onMedia/
});
const SeekButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SeekButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
SeekButton.displayName = "SeekButton";

const LiveButtonBridge = createReactComponent(LiveButtonInstance, {
  domEventsRegex: /^onMedia/
});
const LiveButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(LiveButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
LiveButton.displayName = "LiveButton";

const sliderCallbacks = [
  "onDragStart",
  "onDragEnd",
  "onDragValueChange",
  "onValueChange",
  "onPointerValueChange"
];

const SliderValueBridge = createReactComponent(SliderValueInstance);

const SliderBridge = createReactComponent(SliderInstance, {
  events: sliderCallbacks
});
const Root$5 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(SliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
});
Root$5.displayName = "Slider";
const Thumb = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
Thumb.displayName = "SliderThumb";
const Track = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
Track.displayName = "SliderTrack";
const TrackFill = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
TrackFill.displayName = "SliderTrackFill";
const PreviewBridge = createReactComponent(SliderPreviewInstance);
const Preview = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PreviewBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
Preview.displayName = "SliderPreview";
const Value = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(SliderValueBridge, { ...props }, (props2, instance) => {
    const $text = useSignal(() => instance.getValueText(), instance);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: forwardRef }, $text, children);
  });
});
Value.displayName = "SliderValue";
const Steps = React.forwardRef(({ children, ...props }, forwardRef) => {
  const $min = useSliderState("min"), $max = useSliderState("max"), $step = useSliderState("step"), steps = ($max - $min) / $step;
  return /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }, Array.from({ length: Math.floor(steps) + 1 }).map((_, step) => children(step)));
});
Steps.displayName = "SliderSteps";

var slider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$5,
  Steps: Steps,
  Thumb: Thumb,
  Track: Track,
  TrackFill: TrackFill,
  Value: Value
});

const VolumeSliderBridge = createReactComponent(VolumeSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
const Root$4 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(VolumeSliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$4.displayName = "VolumeSlider";

var volumeSlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$4,
  Steps: Steps,
  Thumb: Thumb,
  Track: Track,
  TrackFill: TrackFill,
  Value: Value
});

function createVTTCue(startTime = 0, endTime = 0, text = "") {
  if (IS_SERVER$1) {
    return {
      startTime,
      endTime,
      text,
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: noop
    };
  }
  return new window.VTTCue(startTime, endTime, text);
}

const ThumbnailBridge = createReactComponent(ThumbnailInstance);
const Root$3 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ThumbnailBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Root$3.displayName = "Thumbnail";
const Img = React.forwardRef(({ children, ...props }, forwardRef) => {
  const { src, img, crossOrigin } = useStateContext(ThumbnailInstance.state), $src = useSignal(src), $crossOrigin = useSignal(crossOrigin);
  return /* @__PURE__ */ React.createElement(
    Primitive.img,
    {
      crossOrigin: $crossOrigin,
      ...props,
      src: $src,
      ref: composeRefs(img.set, forwardRef)
    },
    children
  );
});
Img.displayName = "ThumbnailImg";

var thumbnail = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Img: Img,
  Root: Root$3
});

const TimeSliderContext = React.createContext({
  $chapters: signal(null)
});
TimeSliderContext.displayName = "TimeSliderContext";
const TimeSliderBridge = createReactComponent(TimeSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
const Root$2 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    const $chapters = React.useMemo(() => signal(null), []);
    return /* @__PURE__ */ React.createElement(TimeSliderContext.Provider, { value: { $chapters } }, /* @__PURE__ */ React.createElement(TimeSliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children)));
  }
);
Root$2.displayName = "TimeSlider";
const SliderChaptersBridge = createReactComponent(SliderChaptersInstance);
const Chapters = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SliderChaptersBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      /* @__PURE__ */ React.createElement(ChapterTracks, { instance }, children)
    ));
  }
);
Chapters.displayName = "SliderChapters";
function ChapterTracks({ instance, children }) {
  const $cues = useSignal(() => instance.cues, instance), refs = React.useRef([]), emptyCue = React.useRef(), { $chapters } = React.useContext(TimeSliderContext);
  if (!emptyCue.current) {
    emptyCue.current = createVTTCue();
  }
  React.useEffect(() => {
    $chapters.set(instance);
    return () => void $chapters.set(null);
  }, [instance]);
  React.useEffect(() => {
    instance.setRefs(refs.current);
  }, [$cues]);
  return children($cues.length ? $cues : [emptyCue.current], (el) => {
    if (!el) {
      refs.current.length = 0;
      return;
    }
    refs.current.push(el);
  });
}
ChapterTracks.displayName = "SliderChapterTracks";
const ChapterTitle = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    const { $chapters } = React.useContext(TimeSliderContext), [title, setTitle] = React.useState();
    React.useEffect(() => {
      return effect(() => {
        const chapters = $chapters(), cue = chapters?.activePointerCue || chapters?.activeCue;
        setTitle(cue?.text || "");
      });
    }, []);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }, title, children);
  }
);
ChapterTitle.displayName = "SliderChapterTitle";
const Progress = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
Progress.displayName = "SliderProgress";
const SliderThumbnailBridge = createReactComponent(SliderThumbnailInstance);
const ThumbnailRoot = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SliderThumbnailBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
ThumbnailRoot.displayName = "SliderThumbnail";
const Thumbnail = {
  Root: ThumbnailRoot,
  Img: Img
};
const VideoBridge = createReactComponent(SliderVideoInstance, {
  events: ["onCanPlay", "onError"]
});
const Video = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(VideoBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(
      VideoProvider,
      {
        ...props2,
        instance,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
Video.displayName = "SliderVideo";
const VideoProvider = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { canLoad } = useStateContext(mediaState), { src, video, crossOrigin } = instance.$state, $src = useSignal(src), $canLoad = useSignal(canLoad), $crossOrigin = useSignal(crossOrigin);
    return /* @__PURE__ */ React.createElement(
      Primitive.video,
      {
        style: { maxWidth: "unset" },
        ...props,
        src: $src || void 0,
        muted: true,
        playsInline: true,
        preload: $canLoad ? "auto" : "none",
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(video.set, forwardRef)
      },
      children
    );
  }
);
VideoProvider.displayName = "SliderVideoProvider";

var timeSlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ChapterTitle: ChapterTitle,
  Chapters: Chapters,
  Preview: Preview,
  Progress: Progress,
  Root: Root$2,
  Steps: Steps,
  Thumb: Thumb,
  Thumbnail: Thumbnail,
  Track: Track,
  TrackFill: TrackFill,
  Value: Value,
  Video: Video
});

const RadioGroupBridge = createReactComponent(RadioGroupInstance, {
  events: ["onChange"]
});
const Root$1 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(RadioGroupBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$1.displayName = "RadioGroup";
const ItemBridge$1 = createReactComponent(RadioInstance, {
  events: ["onChange", "onSelect"]
});
const Item$1 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ItemBridge$1, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Item$1.displayName = "RadioItem";

var radioGroup = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Item: Item$1,
  Root: Root$1
});

const IS_SERVER = typeof document === "undefined";

const MenuBridge = createReactComponent(MenuInstance, {
  events: ["onOpen", "onClose"],
  domEventsRegex: /^onMedia/
});
const Root = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(MenuBridge, { ...props, ref: forwardRef }, (props2, instance) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      style: { display: !instance.isSubmenu ? "contents" : void 0, ...props2.style }
    },
    children
  ));
});
Root.displayName = "Menu";
const ButtonBridge = createReactComponent(MenuButtonInstance, {
  events: ["onSelect"]
});
const Button = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(ButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef)
      },
      children
    ));
  }
);
Button.displayName = "MenuButton";
const Portal = React.forwardRef(
  ({ container = null, disabled = false, children, ...props }, forwardRef) => {
    let fullscreen = useMediaState("fullscreen"), shouldPortal = disabled === "fullscreen" ? !fullscreen : !disabled;
    const target = React.useMemo(() => {
      if (IS_SERVER)
        return null;
      const node = isString(container) ? document.querySelector(container) : container;
      return node ?? document.body;
    }, [container]);
    return IS_SERVER || !shouldPortal ? children : createPortal(
      /* @__PURE__ */ React.createElement(
        Primitive.div,
        {
          ...props,
          style: { display: "contents", ...props.style },
          ref: forwardRef
        },
        children
      ),
      target
    );
  }
);
Portal.displayName = "MenuPortal";
const ItemsBridge = createReactComponent(MenuItemsInstance);
const Items = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ItemsBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Items.displayName = "MenuItems";
const ItemBridge = createReactComponent(MenuItemInstance);
const Item = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ItemBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Item.displayName = "MenuItem";

var menu = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Button: Button,
  Content: Items,
  Item: Item,
  Items: Items,
  Portal: Portal,
  Radio: Item$1,
  RadioGroup: Root$1,
  Root: Root
});

const GestureBridge = createReactComponent(GestureInstance, {
  events: ["onWillTrigger", "onTrigger"]
});
const Gesture = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(GestureBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Gesture.displayName = "Gesture";

const TimeBridge = createReactComponent(TimeInstance);
const Time = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(TimeBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(
    TimeText,
    {
      ...props2,
      instance,
      ref: composeRefs(props2.ref, forwardRef)
    },
    children
  ));
});
Time.displayName = "Time";
const TimeText = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { timeText } = instance.$state, $timeText = useSignal(timeText);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }, $timeText, children);
  }
);
TimeText.displayName = "TimeText";

function useMediaPlayer() {
  const context = useMediaContext();
  if (!context) {
    throw Error(
      "[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?"
    );
  }
  return context?.player || null;
}

function useAudioOptions() {
  const media = useMediaContext(), { audioTracks, audioTrack } = media.$state, $audioTracks = useSignal(audioTracks);
  useSignal(audioTrack);
  return React.useMemo(() => {
    const options = $audioTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue$1(track),
      get selected() {
        return audioTrack() === track;
      },
      select(trigger) {
        const index = audioTracks().indexOf(track);
        if (index >= 0)
          media.remote.changeAudioTrack(index, trigger);
      }
    }));
    Object.defineProperty(options, "disabled", {
      get() {
        return options.length <= 1;
      }
    });
    Object.defineProperty(options, "selectedTrack", {
      get() {
        return audioTrack();
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        const track = audioTrack();
        return track ? getTrackValue$1(track) : void 0;
      }
    });
    return options;
  }, [$audioTracks]);
}
function getTrackValue$1(track) {
  return track.label.toLowerCase();
}

function useCaptionOptions({ off = true } = {}) {
  const media = useMediaContext(), { textTracks, textTrack } = media.$state, $textTracks = useSignal(textTracks);
  useSignal(textTrack);
  return React.useMemo(() => {
    const captionTracks = $textTracks.filter(isTrackCaptionKind), options = captionTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue(track),
      get selected() {
        return textTrack() === track;
      },
      select(trigger) {
        const index = textTracks().indexOf(track);
        if (index >= 0)
          media.remote.changeTextTrackMode(index, "showing", trigger);
      }
    }));
    if (off) {
      options.unshift({
        track: null,
        label: isString(off) ? off : "Off",
        value: "off",
        get selected() {
          return !textTrack();
        },
        select(trigger) {
          media.remote.toggleCaptions(trigger);
        }
      });
    }
    Object.defineProperty(options, "disabled", {
      get() {
        return !captionTracks.length;
      }
    });
    Object.defineProperty(options, "selectedTrack", {
      get() {
        return textTrack();
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        const track = textTrack();
        return track ? getTrackValue(track) : "off";
      }
    });
    return options;
  }, [$textTracks]);
}
function getTrackValue(track) {
  return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
}

export { AirPlayButton as A, Button as B, CaptionButton as C, Chapters as D, Progress as E, FullscreenButton as F, Gesture as G, ChapterTitle as H, Img as I, LiveButton as L, MuteButton as M, PlayButton as P, Root$3 as R, SeekButton as S, Thumbnail as T, Value as V, useMediaContext as a, PIPButton as b, Root$2 as c, Preview as d, Time as e, Root as f, Items as g, useAudioOptions as h, Root$1 as i, Item$1 as j, useCaptionOptions as k, Root$4 as l, menu as m, thumbnail as n, sliderCallbacks as o, Steps as p, Thumb as q, radioGroup as r, slider as s, timeSlider as t, useMediaPlayer as u, volumeSlider as v, Track as w, TrackFill as x, Portal as y, Root$5 as z };
