import {
  thumbnail_default
} from "./vidstack-VDUYSHJQ.js";
import {
  useSliderState
} from "./vidstack-EHSDOEFD.js";
import {
  useMediaState
} from "./vidstack-CDYAPKDM.js";
import {
  isRemotionSrc
} from "./vidstack-ALARDIAR.js";

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
