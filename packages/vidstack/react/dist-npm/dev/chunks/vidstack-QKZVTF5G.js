import {
  useSliderState
} from "./vidstack-EHSDOEFD.js";
import {
  AirPlayButtonInstance,
  CaptionButtonInstance,
  FullscreenButtonInstance,
  GestureInstance,
  LiveButtonInstance,
  MenuButtonInstance,
  MenuInstance,
  MenuItemInstance,
  MenuItemsInstance,
  MuteButtonInstance,
  PIPButtonInstance,
  PlayButtonInstance,
  Primitive,
  RadioGroupInstance,
  RadioInstance,
  SeekButtonInstance,
  SliderChaptersInstance,
  SliderInstance,
  SliderPreviewInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  ThumbnailInstance,
  TimeInstance,
  TimeSliderInstance,
  VolumeSliderInstance,
  useMediaState
} from "./vidstack-CDYAPKDM.js";
import {
  mediaContext,
  mediaState
} from "./vidstack-ALARDIAR.js";
import {
  isTrackCaptionKind
} from "./vidstack-A5V4LMVI.js";
import {
  IS_SERVER,
  composeRefs,
  createReactComponent,
  effect,
  isString,
  noop,
  signal,
  useReactContext,
  useSignal,
  useStateContext
} from "./vidstack-KAGOB6PR.js";
import {
  __export
} from "./vidstack-YJG6SZYI.js";

// src/hooks/use-media-context.ts
function useMediaContext() {
  return useReactContext(mediaContext);
}

// src/components/ui/buttons/airplay-button.tsx
import * as React from "react";
var AirPlayButtonBridge = createReactComponent(AirPlayButtonInstance, {
  domEventsRegex: /^onMedia/
});
var AirPlayButton = React.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React.createElement(AirPlayButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
AirPlayButton.displayName = "AirPlayButton";

// src/components/ui/buttons/play-button.tsx
import * as React2 from "react";
var PlayButtonBridge = createReactComponent(PlayButtonInstance, {
  domEventsRegex: /^onMedia/
});
var PlayButton = React2.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React2.createElement(PlayButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React2.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
PlayButton.displayName = "PlayButton";

// src/components/ui/buttons/caption-button.tsx
import * as React3 from "react";
var CaptionButtonBridge = createReactComponent(CaptionButtonInstance, {
  domEventsRegex: /^onMedia/
});
var CaptionButton = React3.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React3.createElement(CaptionButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React3.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
CaptionButton.displayName = "CaptionButton";

// src/components/ui/buttons/fullscreen-button.tsx
import * as React4 from "react";
var FullscreenButtonBridge = createReactComponent(FullscreenButtonInstance, {
  domEventsRegex: /^onMedia/
});
var FullscreenButton = React4.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React4.createElement(FullscreenButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React4.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
FullscreenButton.displayName = "FullscreenButton";

// src/components/ui/buttons/mute-button.tsx
import * as React5 from "react";
var MuteButtonBridge = createReactComponent(MuteButtonInstance, {
  domEventsRegex: /^onMedia/
});
var MuteButton = React5.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React5.createElement(MuteButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React5.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
MuteButton.displayName = "MuteButton";

// src/components/ui/buttons/pip-button.tsx
import * as React6 from "react";
var PIPButtonBridge = createReactComponent(PIPButtonInstance, {
  domEventsRegex: /^onMedia/
});
var PIPButton = React6.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React6.createElement(PIPButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React6.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
PIPButton.displayName = "PIPButton";

// src/components/ui/buttons/seek-button.tsx
import * as React7 from "react";
var SeekButtonBridge = createReactComponent(SeekButtonInstance, {
  domEventsRegex: /^onMedia/
});
var SeekButton = React7.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React7.createElement(SeekButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React7.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
SeekButton.displayName = "SeekButton";

// src/components/ui/buttons/live-button.tsx
import * as React8 from "react";
var LiveButtonBridge = createReactComponent(LiveButtonInstance, {
  domEventsRegex: /^onMedia/
});
var LiveButton = React8.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React8.createElement(LiveButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React8.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
LiveButton.displayName = "LiveButton";

// src/components/ui/sliders/slider.tsx
var slider_exports = {};
__export(slider_exports, {
  Preview: () => Preview,
  Root: () => Root,
  Steps: () => Steps,
  Thumb: () => Thumb,
  Track: () => Track,
  TrackFill: () => TrackFill,
  Value: () => Value
});
import * as React9 from "react";

// src/components/ui/sliders/slider-callbacks.ts
var sliderCallbacks = [
  "onDragStart",
  "onDragEnd",
  "onDragValueChange",
  "onValueChange",
  "onPointerValueChange"
];

// src/components/ui/sliders/slider-value.tsx
var SliderValueBridge = createReactComponent(SliderValueInstance);

// src/components/ui/sliders/slider.tsx
var SliderBridge = createReactComponent(SliderInstance, {
  events: sliderCallbacks
});
var Root = React9.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React9.createElement(SliderBridge, { ...props, ref: forwardRef17 }, (props2) => /* @__PURE__ */ React9.createElement(Primitive.div, { ...props2 }, children));
});
Root.displayName = "Slider";
var Thumb = React9.forwardRef((props, forwardRef17) => /* @__PURE__ */ React9.createElement(Primitive.div, { ...props, ref: forwardRef17 }));
Thumb.displayName = "SliderThumb";
var Track = React9.forwardRef((props, forwardRef17) => /* @__PURE__ */ React9.createElement(Primitive.div, { ...props, ref: forwardRef17 }));
Track.displayName = "SliderTrack";
var TrackFill = React9.forwardRef((props, forwardRef17) => /* @__PURE__ */ React9.createElement(Primitive.div, { ...props, ref: forwardRef17 }));
TrackFill.displayName = "SliderTrackFill";
var PreviewBridge = createReactComponent(SliderPreviewInstance);
var Preview = React9.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React9.createElement(PreviewBridge, { ...props }, (props2) => /* @__PURE__ */ React9.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
Preview.displayName = "SliderPreview";
var Value = React9.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React9.createElement(SliderValueBridge, { ...props }, (props2, instance) => {
    const $text = useSignal(() => instance.getValueText(), instance);
    return /* @__PURE__ */ React9.createElement(Primitive.div, { ...props2, ref: forwardRef17 }, $text, children);
  });
});
Value.displayName = "SliderValue";
var Steps = React9.forwardRef(({ children, ...props }, forwardRef17) => {
  const $min = useSliderState("min"), $max = useSliderState("max"), $step = useSliderState("step"), steps = ($max - $min) / $step;
  return /* @__PURE__ */ React9.createElement(Primitive.div, { ...props, ref: forwardRef17 }, Array.from({ length: Math.floor(steps) + 1 }).map((_, step) => children(step)));
});
Steps.displayName = "SliderSteps";

// src/components/ui/sliders/volume-slider.tsx
var volume_slider_exports = {};
__export(volume_slider_exports, {
  Preview: () => Preview,
  Root: () => Root2,
  Steps: () => Steps,
  Thumb: () => Thumb,
  Track: () => Track,
  TrackFill: () => TrackFill,
  Value: () => Value
});
import * as React10 from "react";
var VolumeSliderBridge = createReactComponent(VolumeSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
var Root2 = React10.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React10.createElement(VolumeSliderBridge, { ...props, ref: forwardRef17 }, (props2) => /* @__PURE__ */ React10.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root2.displayName = "VolumeSlider";

// src/components/ui/thumbnail.tsx
var thumbnail_exports = {};
__export(thumbnail_exports, {
  Img: () => Img,
  Root: () => Root3
});
import * as React11 from "react";
var ThumbnailBridge = createReactComponent(ThumbnailInstance);
var Root3 = React11.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React11.createElement(ThumbnailBridge, { ...props }, (props2) => /* @__PURE__ */ React11.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef17)
    },
    children
  ));
});
Root3.displayName = "Thumbnail";
var Img = React11.forwardRef(({ children, ...props }, forwardRef17) => {
  const { src, img, crossOrigin } = useStateContext(ThumbnailInstance.state), $src = useSignal(src), $crossOrigin = useSignal(crossOrigin);
  return /* @__PURE__ */ React11.createElement(
    Primitive.img,
    {
      crossOrigin: $crossOrigin,
      ...props,
      src: $src,
      ref: composeRefs(img.set, forwardRef17)
    },
    children
  );
});
Img.displayName = "ThumbnailImg";

// src/components/ui/sliders/time-slider.tsx
var time_slider_exports = {};
__export(time_slider_exports, {
  ChapterTitle: () => ChapterTitle,
  Chapters: () => Chapters,
  Preview: () => Preview,
  Progress: () => Progress,
  Root: () => Root4,
  Steps: () => Steps,
  Thumb: () => Thumb,
  Thumbnail: () => Thumbnail,
  Track: () => Track,
  TrackFill: () => TrackFill,
  Value: () => Value,
  Video: () => Video
});
import * as React12 from "react";

// src/utils.ts
function createVTTCue(startTime = 0, endTime = 0, text = "") {
  if (IS_SERVER) {
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

// src/components/ui/sliders/time-slider.tsx
var TimeSliderContext = React12.createContext({
  $chapters: signal(null)
});
TimeSliderContext.displayName = "TimeSliderContext";
var TimeSliderBridge = createReactComponent(TimeSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/
});
var Root4 = React12.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    const $chapters = React12.useMemo(() => signal(null), []);
    return /* @__PURE__ */ React12.createElement(TimeSliderContext.Provider, { value: { $chapters } }, /* @__PURE__ */ React12.createElement(TimeSliderBridge, { ...props, ref: forwardRef17 }, (props2) => /* @__PURE__ */ React12.createElement(Primitive.div, { ...props2 }, children)));
  }
);
Root4.displayName = "TimeSlider";
var SliderChaptersBridge = createReactComponent(SliderChaptersInstance);
var Chapters = React12.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React12.createElement(SliderChaptersBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React12.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      /* @__PURE__ */ React12.createElement(ChapterTracks, { instance }, children)
    ));
  }
);
Chapters.displayName = "SliderChapters";
function ChapterTracks({ instance, children }) {
  const $cues = useSignal(() => instance.cues, instance), refs = React12.useRef([]), emptyCue = React12.useRef(), { $chapters } = React12.useContext(TimeSliderContext);
  if (!emptyCue.current) {
    emptyCue.current = createVTTCue();
  }
  React12.useEffect(() => {
    $chapters.set(instance);
    return () => void $chapters.set(null);
  }, [instance]);
  React12.useEffect(() => {
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
var ChapterTitle = React12.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    const { $chapters } = React12.useContext(TimeSliderContext), [title, setTitle] = React12.useState();
    React12.useEffect(() => {
      return effect(() => {
        const chapters = $chapters(), cue = chapters?.activePointerCue || chapters?.activeCue;
        setTitle(cue?.text || "");
      });
    }, []);
    return /* @__PURE__ */ React12.createElement(Primitive.div, { ...props, ref: forwardRef17 }, title, children);
  }
);
ChapterTitle.displayName = "SliderChapterTitle";
var Progress = React12.forwardRef((props, forwardRef17) => /* @__PURE__ */ React12.createElement(Primitive.div, { ...props, ref: forwardRef17 }));
Progress.displayName = "SliderProgress";
var SliderThumbnailBridge = createReactComponent(SliderThumbnailInstance);
var ThumbnailRoot = React12.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React12.createElement(SliderThumbnailBridge, { ...props }, (props2) => /* @__PURE__ */ React12.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef17) }, children));
  }
);
ThumbnailRoot.displayName = "SliderThumbnail";
var Thumbnail = {
  Root: ThumbnailRoot,
  Img
};
var VideoBridge = createReactComponent(SliderVideoInstance, {
  events: ["onCanPlay", "onError"]
});
var Video = React12.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React12.createElement(VideoBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React12.createElement(
      VideoProvider,
      {
        ...props2,
        instance,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
Video.displayName = "SliderVideo";
var VideoProvider = React12.forwardRef(
  ({ instance, children, ...props }, forwardRef17) => {
    const { canLoad } = useStateContext(mediaState), { src, video, crossOrigin } = instance.$state, $src = useSignal(src), $canLoad = useSignal(canLoad), $crossOrigin = useSignal(crossOrigin);
    return /* @__PURE__ */ React12.createElement(
      Primitive.video,
      {
        style: { maxWidth: "unset" },
        ...props,
        src: $src || void 0,
        muted: true,
        playsInline: true,
        preload: $canLoad ? "auto" : "none",
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(video.set, forwardRef17)
      },
      children
    );
  }
);
VideoProvider.displayName = "SliderVideoProvider";

// src/components/ui/radio-group.tsx
var radio_group_exports = {};
__export(radio_group_exports, {
  Item: () => Item,
  Root: () => Root5
});
import * as React13 from "react";
var RadioGroupBridge = createReactComponent(RadioGroupInstance, {
  events: ["onChange"]
});
var Root5 = React13.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React13.createElement(RadioGroupBridge, { ...props, ref: forwardRef17 }, (props2) => /* @__PURE__ */ React13.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root5.displayName = "RadioGroup";
var ItemBridge = createReactComponent(RadioInstance, {
  events: ["onChange", "onSelect"]
});
var Item = React13.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React13.createElement(ItemBridge, { ...props }, (props2) => /* @__PURE__ */ React13.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef17)
    },
    children
  ));
});
Item.displayName = "RadioItem";

// src/components/ui/menu.tsx
var menu_exports = {};
__export(menu_exports, {
  Button: () => Button,
  Content: () => Items,
  Item: () => Item2,
  Items: () => Items,
  Portal: () => Portal,
  Radio: () => Item,
  RadioGroup: () => Root5,
  Root: () => Root6
});
import * as React14 from "react";
import { createPortal } from "react-dom";
var MenuBridge = createReactComponent(MenuInstance, {
  events: ["onOpen", "onClose"],
  domEventsRegex: /^onMedia/
});
var Root6 = React14.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React14.createElement(MenuBridge, { ...props, ref: forwardRef17 }, (props2, instance) => /* @__PURE__ */ React14.createElement(
    Primitive.div,
    {
      ...props2,
      style: { display: !instance.isSubmenu ? "contents" : void 0, ...props2.style }
    },
    children
  ));
});
Root6.displayName = "Menu";
var ButtonBridge = createReactComponent(MenuButtonInstance, {
  events: ["onSelect"]
});
var Button = React14.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React14.createElement(ButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React14.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef17)
      },
      children
    ));
  }
);
Button.displayName = "MenuButton";
var Portal = React14.forwardRef(
  ({ container = null, disabled = false, children, ...props }, forwardRef17) => {
    let fullscreen = useMediaState("fullscreen"), shouldPortal = disabled === "fullscreen" ? !fullscreen : !disabled;
    const target = React14.useMemo(() => {
      if (IS_SERVER) return null;
      const node = isString(container) ? document.querySelector(container) : container;
      return node ?? document.body;
    }, [container]);
    return !target || !shouldPortal ? children : createPortal(
      /* @__PURE__ */ React14.createElement(
        Primitive.div,
        {
          ...props,
          style: { display: "contents", ...props.style },
          ref: forwardRef17
        },
        children
      ),
      target
    );
  }
);
Portal.displayName = "MenuPortal";
var ItemsBridge = createReactComponent(MenuItemsInstance);
var Items = React14.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React14.createElement(ItemsBridge, { ...props }, (props2) => /* @__PURE__ */ React14.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef17)
    },
    children
  ));
});
Items.displayName = "MenuItems";
var ItemBridge2 = createReactComponent(MenuItemInstance);
var Item2 = React14.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React14.createElement(ItemBridge2, { ...props }, (props2) => /* @__PURE__ */ React14.createElement(
    Primitive.div,
    {
      ...props2,
      ref: composeRefs(props2.ref, forwardRef17)
    },
    children
  ));
});
Item2.displayName = "MenuItem";

// src/components/ui/gesture.tsx
import * as React15 from "react";
var GestureBridge = createReactComponent(GestureInstance, {
  events: ["onWillTrigger", "onTrigger"]
});
var Gesture = React15.forwardRef(
  ({ children, ...props }, forwardRef17) => {
    return /* @__PURE__ */ React15.createElement(GestureBridge, { ...props, ref: forwardRef17 }, (props2) => /* @__PURE__ */ React15.createElement(Primitive.div, { ...props2 }, children));
  }
);
Gesture.displayName = "Gesture";

// src/components/ui/time.tsx
import * as React16 from "react";
var TimeBridge = createReactComponent(TimeInstance);
var Time = React16.forwardRef(({ children, ...props }, forwardRef17) => {
  return /* @__PURE__ */ React16.createElement(TimeBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React16.createElement(
    TimeText,
    {
      ...props2,
      instance,
      ref: composeRefs(props2.ref, forwardRef17)
    },
    children
  ));
});
Time.displayName = "Time";
var TimeText = React16.forwardRef(
  ({ instance, children, ...props }, forwardRef17) => {
    const { timeText } = instance.$state, $timeText = useSignal(timeText);
    return /* @__PURE__ */ React16.createElement(Primitive.div, { ...props, ref: forwardRef17 }, $timeText, children);
  }
);
TimeText.displayName = "TimeText";

// src/hooks/use-media-player.ts
function useMediaPlayer() {
  const context = useMediaContext();
  if (!context) {
    throw Error(
      "[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?"
    );
  }
  return context?.player || null;
}

// src/hooks/options/use-audio-options.ts
import * as React17 from "react";
function useAudioOptions() {
  const media = useMediaContext(), { audioTracks, audioTrack } = media.$state, $audioTracks = useSignal(audioTracks);
  useSignal(audioTrack);
  return React17.useMemo(() => {
    const options = $audioTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue(track),
      get selected() {
        return audioTrack() === track;
      },
      select(trigger) {
        const index = audioTracks().indexOf(track);
        if (index >= 0) media.remote.changeAudioTrack(index, trigger);
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
        return track ? getTrackValue(track) : void 0;
      }
    });
    return options;
  }, [$audioTracks]);
}
function getTrackValue(track) {
  return track.label.toLowerCase();
}

// src/hooks/options/use-caption-options.ts
import * as React18 from "react";
function useCaptionOptions({ off = true } = {}) {
  const media = useMediaContext(), { textTracks, textTrack } = media.$state, $textTracks = useSignal(textTracks);
  useSignal(textTrack);
  return React18.useMemo(() => {
    const captionTracks = $textTracks.filter(isTrackCaptionKind), options = captionTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue2(track),
      get selected() {
        return textTrack() === track;
      },
      select(trigger) {
        const index = textTracks().indexOf(track);
        if (index >= 0) media.remote.changeTextTrackMode(index, "showing", trigger);
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
        return track ? getTrackValue2(track) : "off";
      }
    });
    return options;
  }, [$textTracks]);
}
function getTrackValue2(track) {
  return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
}

export {
  useMediaContext,
  AirPlayButton,
  PlayButton,
  CaptionButton,
  FullscreenButton,
  MuteButton,
  PIPButton,
  SeekButton,
  LiveButton,
  sliderCallbacks,
  Root,
  Thumb,
  Track,
  TrackFill,
  Preview,
  Value,
  Steps,
  slider_exports,
  Root2,
  volume_slider_exports,
  Root3,
  Img,
  thumbnail_exports,
  Root4,
  Chapters,
  ChapterTitle,
  Progress,
  Thumbnail,
  time_slider_exports,
  Root5,
  Item,
  radio_group_exports,
  Root6,
  Button,
  Portal,
  Items,
  menu_exports,
  Gesture,
  Time,
  useMediaPlayer,
  useAudioOptions,
  useCaptionOptions
};
