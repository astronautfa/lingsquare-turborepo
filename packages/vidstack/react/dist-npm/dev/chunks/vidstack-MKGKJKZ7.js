import {
  thumbnail_default
} from "./vidstack-QYGROJHA.js";
import {
  useMediaState
} from "./vidstack-MS2S7JW7.js";

// src/providers/remotion/ui/poster.tsx
import * as React from "react";
var RemotionPoster = React.forwardRef((props, ref) => {
  const $isVisible = !useMediaState("started");
  return /* @__PURE__ */ React.createElement(
    thumbnail_default,
    {
      ...props,
      ref,
      "data-remotion-poster": true,
      "data-visible": $isVisible || null
    }
  );
});
RemotionPoster.displayName = "RemotionPoster";
var poster_default = RemotionPoster;

export {
  poster_default
};