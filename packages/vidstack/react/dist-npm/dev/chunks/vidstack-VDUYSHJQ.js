import {
  ErrorBoundary,
  REMOTION_PROVIDER_ID,
  RemotionContextProvider,
  RemotionLayoutEngine
} from "./vidstack-3BN2DC2G.js";
import {
  Primitive,
  useMediaState
} from "./vidstack-CDYAPKDM.js";
import {
  isRemotionSrc
} from "./vidstack-ALARDIAR.js";
import {
  noop
} from "./vidstack-KAGOB6PR.js";

// src/providers/remotion/ui/thumbnail.tsx
import * as React from "react";
import { Internals, random } from "remotion";
var RemotionThumbnail = React.forwardRef(
  ({ frame, renderLoading, errorFallback, onError, ...props }, ref) => {
    let $src = useMediaState("currentSrc"), layoutEngine = React.useMemo(() => new RemotionLayoutEngine(), []);
    if (isRemotionSrc($src) && !$src.compositionWidth) {
      $src = {
        compositionWidth: 1920,
        compositionHeight: 1080,
        fps: 30,
        ...$src
      };
    }
    React.useEffect(() => {
      layoutEngine.setSrc(isRemotionSrc($src) ? $src : null);
      return () => void layoutEngine.setSrc(null);
    }, [$src]);
    const Component = Internals.useLazyComponent({
      component: $src.src
    });
    const thumbnailId = React.useMemo(() => String(random(null)), []), baseTimeline = React.useMemo(
      () => ({
        rootId: thumbnailId,
        frame: { [REMOTION_PROVIDER_ID]: frame },
        playing: false,
        playbackRate: 1,
        setPlaybackRate: noop,
        audioAndVideoTags: { current: [] },
        imperativePlaying: { current: false }
      }),
      [thumbnailId]
    ), timeline = React.useMemo(
      () => ({
        ...baseTimeline,
        frame: { [REMOTION_PROVIDER_ID]: frame }
      }),
      [baseTimeline, frame]
    ), volume = React.useMemo(
      () => ({
        mediaMuted: true,
        mediaVolume: 0,
        setMediaMuted: noop,
        setMediaVolume: noop
      }),
      []
    );
    const [, update] = React.useState(0);
    React.useEffect(() => {
      update(1);
    }, []);
    if (!isRemotionSrc($src)) return null;
    return /* @__PURE__ */ React.createElement(
      RemotionContextProvider,
      {
        src: $src,
        component: Component,
        timeline,
        mediaVolume: volume,
        setMediaVolume: volume,
        numberOfSharedAudioTags: 0
      },
      /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref, "data-remotion-thumbnail": true }, /* @__PURE__ */ React.createElement("div", { "data-remotion-canvas": true }, /* @__PURE__ */ React.createElement(
        "div",
        {
          "data-remotion-container": true,
          ref: (el) => {
            layoutEngine.setContainer(el);
          }
        },
        /* @__PURE__ */ React.createElement(
          RemotionThumbnailUI,
          {
            inputProps: $src.inputProps,
            renderLoading: renderLoading ?? $src.renderLoading,
            errorFallback: errorFallback ?? $src.errorFallback,
            onError: onError ?? $src.onError
          }
        )
      )))
    );
  }
);
RemotionThumbnail.displayName = "RemotionThumbnail";
var thumbnail_default = RemotionThumbnail;
function RemotionThumbnailUI({
  inputProps,
  renderLoading,
  errorFallback,
  onError
}) {
  const video = Internals.useVideo(), Video = video ? video.component : null, LoadingContent = React.useMemo(() => renderLoading?.(), [renderLoading]);
  return /* @__PURE__ */ React.createElement(React.Suspense, { fallback: LoadingContent }, Video ? /* @__PURE__ */ React.createElement(ErrorBoundary, { fallback: errorFallback, onError }, /* @__PURE__ */ React.createElement(Internals.ClipComposition, null, /* @__PURE__ */ React.createElement(Video, { ...video?.props, ...inputProps }))) : null);
}
RemotionThumbnailUI.displayName = "RemotionThumbnailUI";

export {
  thumbnail_default
};
