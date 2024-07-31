import {
  ErrorBoundary,
  REMOTION_PROVIDER_ID,
  RemotionContextProvider,
  RemotionLayoutEngine
} from "./vidstack-VN2N745P.js";
import {
  isRemotionSrc
} from "./vidstack-DYAEZIDU.js";
import "./vidstack-GOXJCRXV.js";
import "./vidstack-N3DBVVNQ.js";
import "./vidstack-O4WMABMP.js";
import "./vidstack-DQWSDQKN.js";
import "./vidstack-YIOQVQ2N.js";
import {
  TimeRange
} from "./vidstack-PKS56VNA.js";
import "./vidstack-HLIA5IIR.js";
import "./vidstack-B2HNNR5Q.js";
import "./vidstack-SN6ZVKJG.js";
import {
  createDisposalBin,
  createScope,
  deferredPromise,
  effect,
  isFunction,
  isNil,
  isNull,
  isNumber,
  isUndefined,
  listenEvent,
  peek,
  signal,
  tick,
  useSignal
} from "./vidstack-3R7QJDRC.js";
import "./vidstack-WBT4TVVV.js";

// src/providers/remotion/provider.tsx
import * as React from "react";
import {
  Internals
} from "remotion";

// src/providers/remotion/playback-engine.ts
var RemotionPlaybackEngine = class {
  #src;
  #onFrameChange;
  #onEnd;
  #disposal = createDisposalBin();
  #frame = 0;
  #framesAdvanced = 0;
  #playbackRate = 1;
  #playing = false;
  #rafId = -1;
  #timerId = -1;
  #startedAt = 0;
  #isRunningInBackground = false;
  get frame() {
    return this.#frame;
  }
  set frame(frame) {
    this.#frame = frame;
    this.#onFrameChange(frame);
  }
  constructor(src, onFrameChange, onEnd) {
    this.#src = src;
    this.#onFrameChange = onFrameChange;
    this.#onEnd = onEnd;
    this.#frame = src.initialFrame ?? 0;
    this.#disposal.add(
      listenEvent(document, "visibilitychange", this.#onVisibilityChange.bind(this))
    );
  }
  play() {
    this.#framesAdvanced = 0;
    this.#playing = true;
    this.#startedAt = performance.now();
    this.#tick();
  }
  stop() {
    this.#playing = false;
    if (this.#rafId >= 0) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = -1;
    }
    if (this.#timerId >= 0) {
      clearTimeout(this.#timerId);
      this.#timerId = -1;
    }
  }
  setPlaybackRate(rate) {
    this.#playbackRate = rate;
  }
  destroy() {
    this.#disposal.empty();
    this.stop();
  }
  #update() {
    const { nextFrame, framesToAdvance, ended } = this.#calculateNextFrame();
    this.#framesAdvanced += framesToAdvance;
    if (nextFrame !== this.#frame) {
      this.#onFrameChange(nextFrame);
      this.#frame = nextFrame;
    }
    if (ended) {
      this.#frame = this.#src.outFrame;
      this.stop();
      this.#onEnd();
    }
  }
  #tick = () => {
    this.#update();
    if (this.#playing) {
      this.#queueNextFrame(this.#tick);
    }
  };
  #queueNextFrame(callback) {
    if (this.#isRunningInBackground) {
      this.#timerId = window.setTimeout(callback, 1e3 / this.#src.fps);
    } else {
      this.#rafId = requestAnimationFrame(callback);
    }
  }
  #calculateNextFrame() {
    const round = this.#playbackRate < 0 ? Math.ceil : Math.floor, time = performance.now() - this.#startedAt, framesToAdvance = round(time * this.#playbackRate / (1e3 / this.#src.fps)) - this.#framesAdvanced, nextFrame = framesToAdvance + this.#frame, isCurrentFrameOutOfBounds = this.#frame > this.#src.outFrame || this.#frame < this.#src.inFrame, isNextFrameOutOfBounds = nextFrame > this.#src.outFrame || nextFrame < this.#src.inFrame, ended = isNextFrameOutOfBounds && !isCurrentFrameOutOfBounds;
    if (this.#playbackRate > 0 && !ended) {
      if (isNextFrameOutOfBounds) {
        return {
          nextFrame: this.#src.inFrame,
          framesToAdvance,
          ended
        };
      }
      return { nextFrame, framesToAdvance, ended };
    }
    if (isNextFrameOutOfBounds) {
      return {
        nextFrame: this.#src.outFrame,
        framesToAdvance,
        ended
      };
    }
    return { nextFrame, framesToAdvance, ended };
  }
  #onVisibilityChange() {
    this.#isRunningInBackground = document.visibilityState === "hidden";
    if (this.#playing) {
      this.stop();
      this.play();
    }
  }
};

// src/providers/remotion/validate.ts
import { Composition } from "remotion";
import { NoReactInternals } from "remotion/no-react";
function validateRemotionResource({
  src,
  compositionWidth: width,
  compositionHeight: height,
  fps,
  durationInFrames,
  initialFrame,
  inFrame,
  outFrame,
  numberOfSharedAudioTags
}) {
  if (false) return;
  validateComponent(src);
  validateInitialFrame(initialFrame, durationInFrames);
  validateDimension(width, "compositionWidth", "of the remotion source");
  validateDimension(height, "compositionHeight", "of the remotion source");
  validateDurationInFrames(durationInFrames, {
    component: "of the remotion source",
    allowFloats: false
  });
  validateFps(fps, "of the remotion source", false);
  validateInOutFrames(inFrame, outFrame, durationInFrames);
  validateSharedNumberOfAudioTags(numberOfSharedAudioTags);
}
var validateFps = NoReactInternals.validateFps;
var validateDimension = NoReactInternals.validateDimension;
var validateDurationInFrames = NoReactInternals.validateDurationInFrames;
function validateInitialFrame(initialFrame, frames) {
  if (false) return;
  if (!isNumber(frames)) {
    throw new Error(
      `[vidstack] \`durationInFrames\` must be a number, but is ${JSON.stringify(frames)}`
    );
  }
  if (isUndefined(initialFrame)) {
    return;
  }
  if (!isNumber(initialFrame)) {
    throw new Error(
      `[vidstack] \`initialFrame\` must be a number, but is ${JSON.stringify(initialFrame)}`
    );
  }
  if (Number.isNaN(initialFrame)) {
    throw new Error(`[vidstack] \`initialFrame\` must be a number, but is NaN`);
  }
  if (!Number.isFinite(initialFrame)) {
    throw new Error(`[vidstack] \`initialFrame\` must be a number, but is Infinity`);
  }
  if (initialFrame % 1 !== 0) {
    throw new Error(
      `[vidstack] \`initialFrame\` must be an integer, but is ${JSON.stringify(initialFrame)}`
    );
  }
  if (initialFrame > frames - 1) {
    throw new Error(
      `[vidstack] \`initialFrame\` must be less or equal than \`durationInFrames - 1\`, but is ${JSON.stringify(
        initialFrame
      )}`
    );
  }
}
function validateSingleFrame(frame, variableName) {
  if (false) return frame;
  if (isNil(frame)) {
    return frame ?? null;
  }
  if (!isNumber(frame)) {
    throw new TypeError(
      `[vidstack] \`${variableName}\` must be a number, but is ${JSON.stringify(frame)}`
    );
  }
  if (Number.isNaN(frame)) {
    throw new TypeError(
      `[vidstack] \`${variableName}\` must not be NaN, but is ${JSON.stringify(frame)}`
    );
  }
  if (!Number.isFinite(frame)) {
    throw new TypeError(
      `[vidstack] \`${variableName}\` must be finite, but is ${JSON.stringify(frame)}`
    );
  }
  if (frame % 1 !== 0) {
    throw new TypeError(
      `[vidstack] \`${variableName}\` must be an integer, but is ${JSON.stringify(frame)}`
    );
  }
  return frame;
}
function validateInOutFrames(inFrame, outFrame, frames) {
  if (false) return;
  const validatedInFrame = validateSingleFrame(inFrame, "inFrame"), validatedOutFrame = validateSingleFrame(outFrame, "outFrame");
  if (isNull(validatedInFrame) && isNull(validatedOutFrame)) {
    return;
  }
  if (!isNull(validatedInFrame) && validatedInFrame > frames - 1) {
    throw new Error(
      `[vidstack] \`inFrame\` must be less than (durationInFrames - 1), but is \`${validatedInFrame}\``
    );
  }
  if (!isNull(validatedOutFrame) && validatedOutFrame > frames) {
    throw new Error(
      `[vidstack] \`outFrame\` must be less than (durationInFrames), but is \`${validatedOutFrame}\``
    );
  }
  if (!isNull(validatedInFrame) && validatedInFrame < 0) {
    throw new Error(
      `[vidstack] \`inFrame\` must be greater than 0, but is \`${validatedInFrame}\``
    );
  }
  if (!isNull(validatedOutFrame) && validatedOutFrame <= 0) {
    throw new Error(
      `[vidstack] \`outFrame\` must be greater than 0, but is \`${validatedOutFrame}\`. If you want to render a single frame, use \`<RemotionThumbnail />\` instead.`
    );
  }
  if (!isNull(validatedOutFrame) && !isNull(validatedInFrame) && validatedOutFrame <= validatedInFrame) {
    throw new Error(
      "[vidstack] `outFrame` must be greater than `inFrame`, but is " + validatedOutFrame + " <= " + validatedInFrame
    );
  }
}
function validateSharedNumberOfAudioTags(tags) {
  if (isUndefined(tags)) return;
  if (tags % 1 !== 0 || !Number.isFinite(tags) || Number.isNaN(tags) || tags < 0) {
    throw new TypeError(
      `[vidstack] \`numberOfSharedAudioTags\` must be an integer but got \`${tags}\` instead`
    );
  }
}
function validatePlaybackRate(playbackRate) {
  if (false) return;
  if (playbackRate > 4) {
    throw new Error(
      `[vidstack] The highest possible playback rate with Remotion is 4. You passed: ${playbackRate}`
    );
  }
  if (playbackRate < -4) {
    throw new Error(
      `[vidstack] The lowest possible playback rate with Remotion is -4. You passed: ${playbackRate}`
    );
  }
  if (playbackRate === 0) {
    throw new Error(`[vidstack] A playback rate of 0 is not supported.`);
  }
}
function validateComponent(src) {
  if (false) return;
  if (src.type === Composition) {
    throw new TypeError(
      `[vidstack] \`src\` should not be an instance of \`<Composition/>\`. Pass the React component directly, and set the duration, fps and dimensions as source props.`
    );
  }
  if (src === Composition) {
    throw new TypeError(
      `[vidstack] \`src\` must not be the \`Composition\` component. Pass your own React component directly, and set the duration, fps and dimensions as source props.`
    );
  }
}

// src/providers/remotion/provider.tsx
var RemotionProvider = class {
  $$PROVIDER_TYPE = "REMOTION";
  scope = createScope();
  #src = signal(null);
  #setup = false;
  #loadStart = false;
  #audio = null;
  #waiting = signal(false);
  #waitingPromise = null;
  #mediaTags = signal([]);
  #mediaElements = signal([]);
  #bufferingElements = /* @__PURE__ */ new Set();
  #timeline = null;
  #frame = signal({ [REMOTION_PROVIDER_ID]: 0 });
  #layoutEngine = new RemotionLayoutEngine();
  #playbackEngine = null;
  #container;
  #ctx;
  #setTimeline;
  #setMediaVolume = {
    setMediaMuted: this.setMuted.bind(this),
    setMediaVolume: this.setVolume.bind(this)
  };
  get type() {
    return "remotion";
  }
  get currentSrc() {
    return peek(this.#src);
  }
  get frame() {
    return this.#frame();
  }
  constructor(container, ctx) {
    this.#container = container;
    this.#ctx = ctx;
    this.#setTimeline = {
      setFrame: this.#setFrame.bind(this),
      setPlaying: this.#setPlaying.bind(this)
    };
    this.#layoutEngine.setContainer(container);
  }
  setup() {
    effect(this.#watchWaiting.bind(this));
    effect(this.#watchMediaTags.bind(this));
    effect(this.#watchMediaElements.bind(this));
  }
  #watchMediaTags() {
    this.#mediaTags();
    this.#discoverMediaElements();
  }
  #discoverMediaElements() {
    const elements = [...this.#container.querySelectorAll("audio,video")];
    this.#mediaElements.set(elements);
  }
  #watchMediaElements() {
    const elements = this.#mediaElements();
    for (const tag of elements) {
      const onWait = this.#onWaitFor.bind(this, tag), onStopWaiting = this.#onStopWaitingFor.bind(this, tag);
      if (tag.currentSrc && tag.readyState < 4) {
        this.#onWaitFor(tag);
        listenEvent(tag, "canplay", onStopWaiting);
      }
      listenEvent(tag, "waiting", onWait);
      listenEvent(tag, "playing", onStopWaiting);
    }
    for (const el of this.#bufferingElements) {
      if (!elements.includes(el)) this.#onStopWaitingFor(el);
    }
  }
  #onFrameChange(frame) {
    const { inFrame, fps } = this.#src(), { seeking } = this.#ctx.$state, time = Math.max(0, frame - inFrame) / fps;
    this.#frame.set((record) => ({
      ...record,
      [REMOTION_PROVIDER_ID]: frame
    }));
    this.#ctx.notify("time-change", time);
    if (seeking()) {
      tick();
      this.#ctx.notify("seeked", time);
    }
  }
  #onFrameEnd() {
    this.pause();
    this.#ctx.notify("end");
  }
  async play() {
    const { ended } = this.#ctx.$state;
    if (peek(ended)) {
      this.#setFrame({ [REMOTION_PROVIDER_ID]: 0 });
    }
    try {
      const mediaElements = peek(this.#mediaElements);
      if (mediaElements.length) {
        await Promise.all(mediaElements.map((media) => media.play()));
      }
      this.#ctx.notify("play");
      tick();
      if (this.#waitingPromise) {
        this.#ctx.notify("waiting");
        return this.#waitingPromise.promise;
      } else {
        this.#playbackEngine?.play();
        this.#ctx.notify("playing");
      }
    } catch (error) {
      throw error;
    }
  }
  async pause() {
    const { paused } = this.#ctx.$state;
    this.#playbackEngine?.stop();
    this.#ctx.notify("pause");
  }
  setMuted(value) {
    if (!this.#ctx) return;
    const { muted, volume } = this.#ctx.$state;
    if (isFunction(value)) {
      this.setMuted(value(muted()));
      return;
    }
    this.#ctx.notify("volume-change", {
      volume: peek(volume),
      muted: value
    });
  }
  setCurrentTime(time) {
    const { fps } = this.#src(), frame = time * fps;
    this.#ctx.notify("seeking", time);
    this.#setFrame({ [REMOTION_PROVIDER_ID]: frame });
  }
  setVolume(value) {
    if (!this.#ctx) return;
    const { volume, muted } = this.#ctx.$state;
    if (isFunction(value)) {
      this.setVolume(value(volume()));
      return;
    }
    this.#ctx.notify("volume-change", {
      volume: value,
      muted: peek(muted)
    });
  }
  setPlaybackRate(rate) {
    if (isFunction(rate)) {
      const { playbackRate } = this.#ctx.$state;
      this.setPlaybackRate(rate(peek(playbackRate)));
      return;
    }
    if (true) validatePlaybackRate(rate);
    this.#playbackEngine?.setPlaybackRate(rate);
    this.#ctx.notify("rate-change", rate);
  }
  async loadSource(src) {
    if (!isRemotionSrc(src)) return;
    const onUserError = src.onError, resolvedSrc = {
      compositionWidth: 1920,
      compositionHeight: 1080,
      fps: 30,
      initialFrame: 0,
      inFrame: 0,
      outFrame: src.durationInFrames,
      numberOfSharedAudioTags: 5,
      inputProps: {},
      ...src,
      onError: (error) => {
        if (true) {
          this.#ctx.logger?.errorGroup(`[vidstack] ${error.message}`).labelledLog("Source", peek(this.#src)).labelledLog("Error", error).dispatch();
        }
        this.pause();
        this.#ctx.notify("error", {
          message: error.message,
          code: 1
        });
        onUserError?.(error);
      }
    };
    this.#src.set(resolvedSrc);
    for (const prop of Object.keys(resolvedSrc)) {
      src[prop] = resolvedSrc[prop];
    }
    this.changeSrc(resolvedSrc);
  }
  destroy() {
    this.changeSrc(null);
  }
  changeSrc(src) {
    this.#playbackEngine?.destroy();
    this.#waiting.set(false);
    this.#waitingPromise?.reject("src changed");
    this.#waitingPromise = null;
    this.#audio = null;
    this.#timeline = null;
    this.#playbackEngine = null;
    this.#mediaTags.set([]);
    this.#bufferingElements.clear();
    this.#frame.set({ [REMOTION_PROVIDER_ID]: 0 });
    this.#layoutEngine.setSrc(src);
    if (src) {
      this.#timeline = this.#createTimelineContextValue();
      this.#playbackEngine = new RemotionPlaybackEngine(
        src,
        this.#onFrameChange.bind(this),
        this.#onFrameEnd.bind(this)
      );
    }
  }
  render = () => {
    const $src = useSignal(this.#src);
    if (!$src) {
      throw Error(
        true ? "[vidstack] attempting to render remotion provider without src" : "[vidstack] no src"
      );
    }
    React.useEffect(() => {
      if (!isRemotionSrc($src)) return;
      validateRemotionResource($src);
      const rafId = requestAnimationFrame(() => {
        if (!this.#setup) {
          this.#ctx.notify("provider-setup", this);
          this.#setup = true;
        }
        if (!this.#loadStart) {
          this.#ctx.notify("load-start");
          this.#loadStart = true;
        }
        this.#discoverMediaElements();
        tick();
        if (!this.#waiting()) this.#ready($src);
      });
      return () => {
        cancelAnimationFrame(rafId);
        this.#loadStart = false;
      };
    }, [$src]);
    const Component = Internals.useLazyComponent({
      component: $src.src
    });
    const { $state } = this.#ctx, $volume = useSignal($state.volume), $isMuted = useSignal($state.muted);
    const mediaVolume = React.useMemo(() => {
      const { muted, volume } = this.#ctx.$state;
      return { mediaMuted: muted(), mediaVolume: volume() };
    }, [$isMuted, $volume]);
    return /* @__PURE__ */ React.createElement(
      RemotionContextProvider,
      {
        src: $src,
        component: Component,
        timeline: this.#timeline,
        mediaVolume,
        setMediaVolume: this.#setMediaVolume
      },
      /* @__PURE__ */ React.createElement(Internals.Timeline.SetTimelineContext.Provider, { value: this.#setTimeline }, React.createElement(this.renderVideo, { src: $src }))
    );
  };
  renderVideo = ({ src }) => {
    const video = Internals.useVideo(), Video = video ? video.component : null, audioContext = React.useContext(Internals.SharedAudioContext);
    const { $state } = this.#ctx;
    useSignal(this.#frame);
    useSignal($state.playing);
    useSignal($state.playbackRate);
    React.useEffect(() => {
      this.#audio = audioContext;
      return () => {
        this.#audio = null;
      };
    }, [audioContext]);
    const LoadingContent = React.useMemo(() => src.renderLoading?.(), [src]);
    const Content = Video ? /* @__PURE__ */ React.createElement(ErrorBoundary, { fallback: src.errorFallback, onError: src.onError }, /* @__PURE__ */ React.createElement(Internals.ClipComposition, null, /* @__PURE__ */ React.createElement(Video, { ...video?.props, ...src.inputProps }))) : null;
    return /* @__PURE__ */ React.createElement(React.Suspense, { fallback: LoadingContent }, Content);
  };
  #ready(src) {
    if (!src) return;
    const { outFrame, inFrame, fps } = src, duration = (outFrame - inFrame) / fps;
    this.#ctx.notify("loaded-metadata");
    this.#ctx.notify("loaded-data");
    this.#ctx.delegate.ready({
      duration,
      seekable: new TimeRange(0, duration),
      buffered: new TimeRange(0, duration)
    });
    if (src.initialFrame) {
      this.#setFrame({
        [REMOTION_PROVIDER_ID]: src.initialFrame
      });
    }
  }
  #onWaitFor(el) {
    this.#bufferingElements.add(el);
    this.#waiting.set(true);
    if (!this.#waitingPromise) {
      this.#waitingPromise = deferredPromise();
    }
  }
  #onStopWaitingFor(el) {
    this.#bufferingElements.delete(el);
    if (this.#bufferingElements.size) return;
    this.#waiting.set(false);
    this.#waitingPromise?.resolve();
    this.#waitingPromise = null;
    const { canPlay } = this.#ctx.$state;
    if (!peek(canPlay)) {
      this.#ready(peek(this.#src));
    }
  }
  #watchWaiting() {
    this.#waiting();
    const { paused } = this.#ctx.$state;
    if (peek(paused)) return;
    if (this.#waiting()) {
      this.#playbackEngine?.stop();
      this.#ctx.notify("waiting");
    } else {
      this.#playbackEngine?.play();
      this.#ctx.notify("playing");
    }
  }
  #setFrame(value) {
    if (isFunction(value)) {
      this.#setFrame(value(this.#frame()));
      return;
    }
    this.#frame.set((record) => ({ ...record, ...value }));
    const nextFrame = value[REMOTION_PROVIDER_ID];
    if (this.#playbackEngine && this.#playbackEngine.frame !== nextFrame) {
      this.#playbackEngine.frame = nextFrame;
    }
  }
  #setPlaying(value) {
    const { playing } = this.#ctx.$state;
    if (isFunction(value)) {
      this.#setPlaying(value(playing()));
      return;
    }
    if (value) {
      this.play();
    } else if (!value) {
      this.pause();
    }
  }
  #createTimelineContextValue() {
    const { playing, playbackRate } = this.#ctx.$state, frame = this.#frame, mediaTags = this.#mediaTags, setPlaybackRate = this.setPlaybackRate.bind(this);
    return {
      rootId: REMOTION_PROVIDER_ID,
      get frame() {
        return frame();
      },
      get playing() {
        return playing();
      },
      get playbackRate() {
        return playbackRate();
      },
      imperativePlaying: {
        get current() {
          return playing();
        }
      },
      setPlaybackRate,
      audioAndVideoTags: {
        get current() {
          return mediaTags();
        },
        set current(tags) {
          mediaTags.set(tags);
        }
      }
    };
  }
};
export {
  RemotionProvider
};
