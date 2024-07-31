import {
  IS_SERVER,
  animationFrameThrottle,
  createDisposalBin,
  noop
} from "./vidstack-3R7QJDRC.js";

// src/providers/remotion/layout-engine.ts
var RemotionLayoutEngine = class {
  #src = null;
  #viewport = null;
  #canvas = null;
  #container = null;
  #disposal = createDisposalBin();
  constructor() {
  }
  setSrc(src) {
    this.#src = src;
    this.setContainer(this.#container);
  }
  setContainer(container) {
    if (IS_SERVER) return;
    this.#disposal.empty();
    this.#container = container;
    this.#canvas = container?.parentElement ?? null;
    this.#viewport = this.#canvas?.parentElement ?? null;
    if (this.#src && this.#viewport) {
      const onResize = animationFrameThrottle(this.#onResize.bind(this));
      onResize();
      const observer = new ResizeObserver(onResize);
      observer.observe(this.#viewport);
      this.#disposal.add(() => observer.disconnect());
    }
  }
  destroy() {
    this.#disposal.empty();
  }
  #onResize(entries) {
    if (!this.#viewport || !this.#src) return;
    const rect = this.#getRect(this.#viewport, entries?.[0]), scale = this.#calcScale(rect), transform = this.#calcTransform(rect, scale);
    Object.assign(this.#canvas.style, {
      width: this.#src.compositionWidth * scale + "px",
      height: this.#src.compositionHeight * scale + "px",
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      left: transform.centerX,
      top: transform.centerY,
      overflow: "hidden"
    });
    Object.assign(this.#container.style, {
      position: "absolute",
      width: this.#src.compositionWidth + "px",
      height: this.#src.compositionHeight + "px",
      display: "flex",
      transform: `scale(${scale})`,
      marginLeft: transform.x,
      marginTop: transform.y,
      overflow: "hidden"
    });
  }
  #getRect(el, entry) {
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
  #calcScale(rect) {
    if (!this.#src) return 0;
    const heightRatio = rect.height / this.#src.compositionHeight, widthRatio = rect.width / this.#src.compositionWidth;
    return Math.min(heightRatio || 0, widthRatio || 0);
  }
  #calcTransform(rect, scale) {
    if (!this.#src) return {};
    const correction = 0 - (1 - scale) / 2, x = correction * this.#src.compositionWidth, y = correction * this.#src.compositionHeight, width = this.#src.compositionWidth * scale, height = this.#src.compositionHeight * scale, centerX = rect.width / 2 - width / 2, centerY = rect.height / 2 - height / 2;
    return { x, y, centerX, centerY };
  }
};

// src/providers/remotion/ui/context.tsx
import * as React from "react";
import {
  Internals
} from "remotion";
var REMOTION_PROVIDER_ID = "vds-remotion-provider";
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

// src/providers/remotion/ui/error-boundary.tsx
import * as React2 from "react";
var errorStyle = true ? {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "	#ff3333",
  padding: "24px",
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%"
} : {};
var ErrorBoundary = class extends React2.Component {
  static displayName = "ErrorBoundary";
  state = { hasError: null };
  static getDerivedStateFromError(hasError) {
    return { hasError };
  }
  componentDidCatch(error) {
    this.props.onError?.(error);
  }
  render() {
    const error = this.state.hasError;
    if (error) {
      return /* @__PURE__ */ React2.createElement("div", { style: errorStyle }, this.props.fallback?.(error) ?? /* @__PURE__ */ React2.createElement("div", { style: { fontWeight: "bold" } }, "An error has occurred, see console for more information."));
    }
    return this.props.children;
  }
};

export {
  RemotionLayoutEngine,
  REMOTION_PROVIDER_ID,
  RemotionContextProvider,
  ErrorBoundary
};
