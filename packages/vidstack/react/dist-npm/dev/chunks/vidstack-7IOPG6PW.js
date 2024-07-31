import {
  RemotionPoster,
  RemotionSliderThumbnail,
  RemotionThumbnail
} from "./vidstack-Q2JODPQB.js";

// src/providers/remotion/loader.ts
import * as React from "react";
var RemotionProviderLoader = class {
  name = "remotion";
  target;
  constructor() {
    RemotionThumbnail.set(React.lazy(() => import("./vidstack-IRULZ5WS.js")));
    RemotionSliderThumbnail.set(React.lazy(() => import("./vidstack-6VZHEYEC.js")));
    RemotionPoster.set(React.lazy(() => import("./vidstack-4ZSI54T6.js")));
  }
  canPlay(src) {
    return src.type === "video/remotion";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    return new (await import("./vidstack-QJJTYGMS.js")).RemotionProvider(this.target, ctx);
  }
};

export {
  RemotionProviderLoader
};
