import {
  RemotionPoster,
  RemotionSliderThumbnail,
  RemotionThumbnail
} from "./vidstack-HNEI4N5K.js";

// src/providers/remotion/loader.ts
import * as React from "react";
var RemotionProviderLoader = class {
  name = "remotion";
  target;
  constructor() {
    RemotionThumbnail.set(React.lazy(() => import("./vidstack-UALMC5KK.js")));
    RemotionSliderThumbnail.set(React.lazy(() => import("./vidstack-OUWUVFKG.js")));
    RemotionPoster.set(React.lazy(() => import("./vidstack-BODIRYH4.js")));
  }
  canPlay(src) {
    return src.type === "video/remotion";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    return new (await import("./vidstack-PC2DTSNS.js")).RemotionProvider(this.target, ctx);
  }
};

export {
  RemotionProviderLoader
};
