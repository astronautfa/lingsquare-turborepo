import {
  AirPlayButton,
  AudioGainSlider,
  CaptionButton,
  Captions,
  Controls,
  ControlsGroup,
  FullscreenButton,
  Gesture,
  GoogleCastButton,
  LiveButton,
  MediaAnnouncer,
  MediaPlayer,
  MediaProvider,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPortal,
  MuteButton,
  PIPButton,
  PlayButton,
  Poster,
  QualitySlider,
  Radio,
  RadioGroup,
  SeekButton,
  Slider,
  SliderChapters,
  SliderPreview,
  SliderThumbnail,
  SliderValue,
  SliderVideo,
  SpeedSlider,
  Thumbnail,
  Time,
  TimeSlider,
  ToggleButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  VolumeSlider,
  mediaState
} from "./vidstack-DYAEZIDU.js";
import {
  composeRefs,
  useSignal,
  useSignalRecord,
  useStateContext
} from "./vidstack-3R7QJDRC.js";

// src/components/primitives/instances.ts
var MediaPlayerInstance = class extends MediaPlayer {
};
var MediaProviderInstance = class extends MediaProvider {
};
var MediaAnnouncerInstance = class extends MediaAnnouncer {
};
var ControlsInstance = class extends Controls {
};
var ControlsGroupInstance = class extends ControlsGroup {
};
var ToggleButtonInstance = class extends ToggleButton {
};
var CaptionButtonInstance = class extends CaptionButton {
};
var FullscreenButtonInstance = class extends FullscreenButton {
};
var LiveButtonInstance = class extends LiveButton {
};
var MuteButtonInstance = class extends MuteButton {
};
var PIPButtonInstance = class extends PIPButton {
};
var PlayButtonInstance = class extends PlayButton {
};
var AirPlayButtonInstance = class extends AirPlayButton {
};
var GoogleCastButtonInstance = class extends GoogleCastButton {
};
var SeekButtonInstance = class extends SeekButton {
};
var TooltipInstance = class extends Tooltip {
};
var TooltipTriggerInstance = class extends TooltipTrigger {
};
var TooltipContentInstance = class extends TooltipContent {
};
var SliderInstance = class extends Slider {
};
var TimeSliderInstance = class extends TimeSlider {
};
var VolumeSliderInstance = class extends VolumeSlider {
};
var AudioGainSliderInstance = class extends AudioGainSlider {
};
var SpeedSliderInstance = class extends SpeedSlider {
};
var QualitySliderInstance = class extends QualitySlider {
};
var SliderThumbnailInstance = class extends SliderThumbnail {
};
var SliderValueInstance = class extends SliderValue {
};
var SliderVideoInstance = class extends SliderVideo {
};
var SliderPreviewInstance = class extends SliderPreview {
};
var SliderChaptersInstance = class extends SliderChapters {
};
var MenuInstance = class extends Menu {
};
var MenuButtonInstance = class extends MenuButton {
};
var MenuItemsInstance = class extends MenuItems {
};
var MenuItemInstance = class extends MenuItem {
};
var MenuPortalInstance = class extends MenuPortal {
};
var RadioGroupInstance = class extends RadioGroup {
};
var RadioInstance = class extends Radio {
};
var CaptionsInstance = class extends Captions {
};
var GestureInstance = class extends Gesture {
};
var PosterInstance = class extends Poster {
};
var ThumbnailInstance = class extends Thumbnail {
};
var TimeInstance = class extends Time {
};

// src/components/primitives/nodes.tsx
import * as React2 from "react";

// src/components/primitives/slot.tsx
import * as React from "react";
var Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1) return React.Children.only(null);
        return React.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ React.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, React.isValidElement(newElement) ? React.cloneElement(newElement, void 0, newChildren) : null);
  }
  return /* @__PURE__ */ React.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, children);
});
Slot.displayName = "Slot";
var SlotClone = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      ref: forwardedRef ? composeRefs(forwardedRef, children.ref) : children.ref
    });
  }
  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
function isSlottable(child) {
  return React.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}

// src/components/primitives/nodes.tsx
var NODES = ["button", "div", "span", "img", "video", "audio"];
var Primitive = NODES.reduce((primitives, node) => {
  const Node = React2.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    return /* @__PURE__ */ React2.createElement(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitives, [node]: Node };
}, {});

// src/hooks/use-media-state.ts
var mediaStateRecord = MediaPlayerInstance.state.record;
var initialMediaStore = Object.keys(mediaStateRecord).reduce(
  (store, prop) => ({
    ...store,
    [prop]() {
      return mediaStateRecord[prop];
    }
  }),
  {}
);
function useMediaState(prop, ref) {
  const $state = useStateContext(mediaState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useMediaState\` requires \`RefObject<MediaPlayerInstance>\` argument if called outside the \`<MediaPlayer>\` component`
    );
  }
  return useSignal((ref?.current?.$state || $state || initialMediaStore)[prop]);
}
function useMediaStore(ref) {
  const $state = useStateContext(mediaState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useMediaStore\` requires \`RefObject<MediaPlayerInstance>\` argument if called outside the \`<MediaPlayer>\` component`
    );
  }
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialMediaStore);
}

export {
  MediaPlayerInstance,
  MediaProviderInstance,
  MediaAnnouncerInstance,
  ControlsInstance,
  ControlsGroupInstance,
  ToggleButtonInstance,
  CaptionButtonInstance,
  FullscreenButtonInstance,
  LiveButtonInstance,
  MuteButtonInstance,
  PIPButtonInstance,
  PlayButtonInstance,
  AirPlayButtonInstance,
  GoogleCastButtonInstance,
  SeekButtonInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  TooltipContentInstance,
  SliderInstance,
  TimeSliderInstance,
  VolumeSliderInstance,
  AudioGainSliderInstance,
  SpeedSliderInstance,
  QualitySliderInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  SliderPreviewInstance,
  SliderChaptersInstance,
  MenuInstance,
  MenuButtonInstance,
  MenuItemsInstance,
  MenuItemInstance,
  MenuPortalInstance,
  RadioGroupInstance,
  RadioInstance,
  CaptionsInstance,
  GestureInstance,
  PosterInstance,
  ThumbnailInstance,
  TimeInstance,
  Primitive,
  useMediaState,
  useMediaStore
};
