"use client"

import * as React from 'react';
import { createDisposalBin, animationFrameThrottle, noop } from '../chunks/vidstack-DcuYVyd0.js';
import { Internals, random } from 'remotion';
import { IS_SERVER, useMediaState, isRemotionSrc, Primitive, useSliderState } from '../chunks/vidstack-DVfG6VuV.js';
export { isRemotionProvider } from '../chunks/vidstack-DVfG6VuV.js';
import { RemotionThumbnail as RemotionThumbnail$1, RemotionSliderThumbnail as RemotionSliderThumbnail$1, RemotionPoster as RemotionPoster$1 } from '../chunks/vidstack-5ezil3Mm.js';
import '@floating-ui/dom';

class RemotionLayoutEngine {
  constructor() {
    this.tc = null;
    this.Zm = null;
    this.Om = null;
    this.fn = null;
    this.Za = createDisposalBin();
  }
  setSrc(src) {
    this.tc = src;
    this.setContainer(this.fn);
  }
  setContainer(container) {
    if (IS_SERVER) return;
    this.Za.empty();
    this.fn = container;
    this.Om = container?.parentElement ?? null;
    this.Zm = this.Om?.parentElement ?? null;
    if (this.tc && this.Zm) {
      const onResize = animationFrameThrottle(this.qa.bind(this));
      onResize();
      const observer = new ResizeObserver(onResize);
      observer.observe(this.Zm);
      this.Za.add(() => observer.disconnect());
    }
  }
  destroy() {
    this.Za.empty();
  }
  qa(entries) {
    if (!this.Zm || !this.tc) return;
    const rect = this.wn(this.Zm, entries?.[0]), scale = this.xn(rect), transform = this.yn(rect, scale);
    Object.assign(this.Om.style, {
      width: this.tc.compositionWidth * scale + "px",
      height: this.tc.compositionHeight * scale + "px",
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      left: transform.centerX,
      top: transform.centerY,
      overflow: "hidden"
    });
    Object.assign(this.fn.style, {
      position: "absolute",
      width: this.tc.compositionWidth + "px",
      height: this.tc.compositionHeight + "px",
      display: "flex",
      transform: `scale(${scale})`,
      marginLeft: transform.x,
      marginTop: transform.y,
      overflow: "hidden"
    });
  }
  wn(el, entry) {
    const rect = el.getBoundingClientRect();
    if (!entry) return rect;
    const { contentRect, target } = entry, newSize = target.getClientRects();
    if (!newSize?.[0]) return rect;
    const scale = contentRect.width === 0 ? 1 : newSize[0].width / contentRect.width, width = newSize[0].width * (1 / scale), height = newSize[0].height * (1 / scale);
    return {
      width,
      height,
      top: newSize[0].y,
      left: newSize[0].x
    };
  }
  xn(rect) {
    if (!this.tc) return 0;
    const heightRatio = rect.height / this.tc.compositionHeight, widthRatio = rect.width / this.tc.compositionWidth;
    return Math.min(heightRatio || 0, widthRatio || 0);
  }
  yn(rect, scale) {
    if (!this.tc) return {};
    const correction = 0 - (1 - scale) / 2, x = correction * this.tc.compositionWidth, y = correction * this.tc.compositionHeight, width = this.tc.compositionWidth * scale, height = this.tc.compositionHeight * scale, centerX = rect.width / 2 - width / 2, centerY = rect.height / 2 - height / 2;
    return { x, y, centerX, centerY };
  }
}

const REMOTION_PROVIDER_ID = "vds-remotion-provider";
function RemotionContextProvider({
  src: {
    compositionWidth: width,
    compositionHeight: height,
    fps,
    durationInFrames,
    numberOfSharedAudioTags
  },
  component,
  timeline,
  mediaVolume,
  setMediaVolume,
  children,
  numberOfSharedAudioTags: providedNumberOfAudioTags
}) {
  const compositionManager = React.useMemo(() => {
    return {
      compositions: [
        {
          id: REMOTION_PROVIDER_ID,
          component,
          durationInFrames,
          width,
          height,
          fps,
          nonce: 777,
          folderName: null,
          parentFolderName: null,
          schema: null,
          calculateMetadata: null
        }
      ],
      folders: [],
      registerFolder: () => void 0,
      unregisterFolder: () => void 0,
      registerComposition: () => void 0,
      unregisterComposition: () => void 0,
      updateCompositionDefaultProps: noop,
      currentCompositionMetadata: null,
      setCurrentCompositionMetadata: () => void 0,
      canvasContent: { type: "composition", compositionId: REMOTION_PROVIDER_ID },
      setCanvasContent: () => void 0
    };
  }, [component, width, height, fps, durationInFrames]);
  const sequenceManager = React.useMemo(() => {
    let sequences = [];
    return {
      get sequences() {
        return sequences;
      },
      registerSequence(sequence) {
        sequences = [...sequences, sequence];
      },
      unregisterSequence(sequence) {
        sequences = sequences.filter((s) => s.id !== sequence);
      }
    };
  }, []);
  return /* @__PURE__ */ React.createElement(Internals.IsPlayerContextProvider, null, /* @__PURE__ */ React.createElement(Internals.CanUseRemotionHooksProvider, null, /* @__PURE__ */ React.createElement(Internals.Timeline.TimelineContext.Provider, { value: timeline }, /* @__PURE__ */ React.createElement(Internals.CompositionManager.Provider, { value: compositionManager }, /* @__PURE__ */ React.createElement(Internals.SequenceManager.Provider, { value: sequenceManager }, /* @__PURE__ */ React.createElement(Internals.ResolveCompositionConfig, null, /* @__PURE__ */ React.createElement(Internals.PrefetchProvider, null, /* @__PURE__ */ React.createElement(Internals.DurationsContextProvider, null, /* @__PURE__ */ React.createElement(Internals.MediaVolumeContext.Provider, { value: mediaVolume }, /* @__PURE__ */ React.createElement(Internals.NativeLayersProvider, null, /* @__PURE__ */ React.createElement(Internals.SetMediaVolumeContext.Provider, { value: setMediaVolume }, /* @__PURE__ */ React.createElement(
    Internals.SharedAudioContextProvider,
    {
      numberOfAudioTags: providedNumberOfAudioTags ?? numberOfSharedAudioTags,
      component
    },
    children
  ))))))))))));
}
RemotionContextProvider.displayName = "RemotionContextProvider";

const errorStyle = {};
class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: null };
  }
  static getDerivedStateFromError(hasError) {
    return { hasError };
  }
  componentDidCatch(error) {
    this.props.onError?.(error);
  }
  render() {
    const error = this.state.hasError;
    if (error) {
      return /* @__PURE__ */ React.createElement("div", { style: errorStyle }, this.props.fallback?.(error) ?? /* @__PURE__ */ React.createElement("div", { style: { fontWeight: "bold" } }, "An error has occurred, see console for more information."));
    }
    return this.props.children;
  }
}
ErrorBoundary.displayName = "ErrorBoundary";

const RemotionThumbnail = React.forwardRef(
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
    const [, _update] = React.useState(0);
    React.useEffect(() => {
      _update(1);
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

var thumbnail = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: RemotionThumbnail
});

const RemotionPoster = React.forwardRef((props, ref) => {
  const $isVisible = !useMediaState("started");
  return /* @__PURE__ */ React.createElement(
    RemotionThumbnail,
    {
      ...props,
      ref,
      "data-remotion-poster": true,
      "data-visible": $isVisible || null
    }
  );
});
RemotionPoster.displayName = "RemotionPoster";

var poster = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: RemotionPoster
});

const RemotionSliderThumbnail = React.forwardRef(
  (props, ref) => {
    const $src = useMediaState("currentSrc"), $percent = useSliderState("pointerPercent");
    if (!isRemotionSrc($src)) return null;
    return /* @__PURE__ */ React.createElement(
      RemotionThumbnail,
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

var sliderThumbnail = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: RemotionSliderThumbnail
});

class RemotionProviderLoader {
  constructor() {
    this.name = "remotion";
    RemotionThumbnail$1.set(React.lazy(() => Promise.resolve().then(function () { return thumbnail; })));
    RemotionSliderThumbnail$1.set(React.lazy(() => Promise.resolve().then(function () { return sliderThumbnail; })));
    RemotionPoster$1.set(React.lazy(() => Promise.resolve().then(function () { return poster; })));
  }
  canPlay(src) {
    return src.type === "video/remotion";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    return new (await import('../chunks/vidstack-CUUMVEt-.js')).RemotionProvider(this.target, ctx);
  }
}

export { ErrorBoundary, REMOTION_PROVIDER_ID, RemotionContextProvider, RemotionLayoutEngine, RemotionPoster, RemotionProviderLoader, RemotionSliderThumbnail, RemotionThumbnail, isRemotionSrc as isRemotionSource, isRemotionSrc };
