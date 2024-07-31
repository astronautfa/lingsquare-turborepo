import {
  thumbnail_default
} from "./vidstack-QYGROJHA.js";
import {
  useSliderState
} from "./vidstack-M2U4INQ4.js";
import {
  useMediaState
} from "./vidstack-MS2S7JW7.js";
import {
  isRemotionSrc
} from "./vidstack-DYAEZIDU.js";

// src/providers/remotion/ui/slider-thumbnail.tsx
import * as React from "react";
var RemotionSliderThumbnail = React.forwardRef(
  (props, ref) => {
    const $src = useMediaState("currentSrc"), $percent = useSliderState("pointerPercent");
    if (!isRemotionSrc($src)) return null;
    return /* @__PURE__ */ React.createElement(
      thumbnail_default,
      {
        ...props,
        frame: $src.durationInFrames * ($percent / 100),
        ref,
        "data-remotion-slider-thumbnail": true
      }
    );
  }
);
RemotionSliderThumbnail.displayName = "RemotionSliderThumbnail";
var slider_thumbnail_default = RemotionSliderThumbnail;

export {
  slider_thumbnail_default
};
