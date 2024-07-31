"use client"

import * as React from 'react';
import { c as createDisposalBin, l as listenEvent, d as createScope, s as signal, u as useSignal, t as tick, p as peek, e as effect, o as isFunction, f as deferredPromise } from './vidstack-wClXxc1a.js';
import { Internals } from 'remotion';
import { T as TimeRange, m as isRemotionSrc } from './vidstack-1EoJRWh6.js';
import { R as RemotionLayoutEngine, a as RemotionContextProvider, E as ErrorBoundary, b as REMOTION_PROVIDER_ID } from '../player/vidstack-remotion.js';
import { NoReactInternals } from 'remotion/no-react';
import './vidstack-Dw1DfPZl.js';

class RemotionPlaybackEngine {
  constructor(_src, _onFrameChange, _onEnd) {
    this.tc = _src;
    this.en = _onFrameChange;
    this.Bn = _onEnd;
    this.Za = createDisposalBin();
    this.r = 0;
    this.gn = 0;
    this.an = 1;
    this.bn = false;
    this.cn = -1;
    this.dn = -1;
    this.nn = 0;
    this.pn = false;
    this.qn = () => {
      this.Ia();
      if (this.bn) {
        this.Cn(this.qn);
      }
    };
    this.r = _src.initialFrame ?? 0;
    this.Za.add(
      listenEvent(document, "visibilitychange", this.zn.bind(this))
    );
  }
  get frame() {
    return this.r;
  }
  set frame(frame) {
    this.r = frame;
    this.en(frame);
  }
  play() {
    this.gn = 0;
    this.bn = true;
    this.nn = performance.now();
    this.qn();
  }
  stop() {
    this.bn = false;
    if (this.cn >= 0) {
      cancelAnimationFrame(this.cn);
      this.cn = -1;
    }
    if (this.dn >= 0) {
      clearTimeout(this.dn);
      this.dn = -1;
    }
  }
  setPlaybackRate(rate) {
    this.an = rate;
  }
  destroy() {
    this.Za.empty();
    this.stop();
  }
  Ia() {
    const { nextFrame, framesToAdvance, ended } = this.An();
    this.gn += framesToAdvance;
    if (nextFrame !== this.r) {
      this.en(nextFrame);
      this.r = nextFrame;
    }
    if (ended) {
      this.r = this.tc.outFrame;
      this.stop();
      this.Bn();
    }
  }
  Cn(callback) {
    if (this.pn) {
      this.dn = window.setTimeout(callback, 1e3 / this.tc.fps);
    } else {
      this.cn = requestAnimationFrame(callback);
    }
  }
  An() {
    const round = this.an < 0 ? Math.ceil : Math.floor, time = performance.now() - this.nn, framesToAdvance = round(time * this.an / (1e3 / this.tc.fps)) - this.gn, nextFrame = framesToAdvance + this.r, isCurrentFrameOutOfBounds = this.r > this.tc.outFrame || this.r < this.tc.inFrame, isNextFrameOutOfBounds = nextFrame > this.tc.outFrame || nextFrame < this.tc.inFrame, ended = isNextFrameOutOfBounds && !isCurrentFrameOutOfBounds;
    if (this.an > 0 && !ended) {
      if (isNextFrameOutOfBounds) {
        return {
          nextFrame: this.tc.inFrame,
          framesToAdvance,
          ended
        };
      }
      return { nextFrame, framesToAdvance, ended };
    }
    if (isNextFrameOutOfBounds) {
      return {
        nextFrame: this.tc.outFrame,
        framesToAdvance,
        ended
      };
    }
    return { nextFrame, framesToAdvance, ended };
  }
  zn() {
    this.pn = document.visibilityState === "hidden";
    if (this.bn) {
      this.stop();
      this.play();
    }
  }
}

NoReactInternals.validateFps;
NoReactInternals.validateDimension;
NoReactInternals.validateDurationInFrames;

class RemotionProvider {
  constructor(container, _ctx) {
    this.container = container;
    this.b = _ctx;
    this.$$PROVIDER_TYPE = "REMOTION";
    this.scope = createScope();
    this.tc = signal(null);
    this.ie = false;
    this.hn = false;
    this.ha = 0;
    this.ca = new TimeRange(0, 0);
    this.jn = null;
    this.kc = signal(false);
    this.Ym = null;
    this.kn = signal([]);
    this.ln = signal([]);
    this._m = /* @__PURE__ */ new Set();
    this.mn = null;
    this.r = signal({ [REMOTION_PROVIDER_ID]: 0 });
    this.rn = new RemotionLayoutEngine();
    this.Xm = null;
    this.Dn = {
      setFrame: this.$m.bind(this),
      setPlaying: this.sn.bind(this)
    };
    this.En = {
      setMediaMuted: this.setMuted.bind(this),
      setMediaVolume: this.setVolume.bind(this)
    };
    this.render = () => {
      const $src = useSignal(this.tc);
      if (!$src) {
        throw Error(
          "[vidstack] no src"
        );
      }
      React.useEffect(() => {
        if (!isRemotionSrc($src))
          return;
        const rafId = requestAnimationFrame(() => {
          if (!this.ie) {
            this.c("provider-setup", this);
            this.ie = true;
          }
          if (!this.hn) {
            this.c("load-start");
            this.hn = true;
          }
          this.tn();
          tick();
          if (!this.kc())
            this.Ha($src);
        });
        return () => {
          cancelAnimationFrame(rafId);
          this.hn = false;
        };
      }, [$src]);
      const Component = Internals.useLazyComponent({
        component: $src.src
      });
      const { $state } = this.b, $volume = useSignal($state.volume), $isMuted = useSignal($state.muted);
      const mediaVolume = React.useMemo(() => {
        const { muted, volume } = this.b.$state;
        return { mediaMuted: muted(), mediaVolume: volume() };
      }, [$isMuted, $volume]);
      return /* @__PURE__ */ React.createElement(
        RemotionContextProvider,
        {
          src: $src,
          component: Component,
          timeline: this.mn,
          mediaVolume,
          setMediaVolume: this.En
        },
        /* @__PURE__ */ React.createElement(Internals.Timeline.SetTimelineContext.Provider, { value: this.Dn }, React.createElement(this.renderVideo, { src: $src }))
      );
    };
    this.renderVideo = ({ src }) => {
      const video = Internals.useVideo(), Video = video ? video.component : null, audioContext = React.useContext(Internals.SharedAudioContext);
      const { $state } = this.b;
      useSignal(this.r);
      useSignal($state.playing);
      useSignal($state.playbackRate);
      React.useEffect(() => {
        this.jn = audioContext;
        return () => {
          this.jn = null;
        };
      }, [audioContext]);
      const LoadingContent = React.useMemo(() => src.renderLoading?.(), [src]);
      const Content = Video ? /* @__PURE__ */ React.createElement(ErrorBoundary, { fallback: src.errorFallback, onError: src.onError }, /* @__PURE__ */ React.createElement(Internals.ClipComposition, null, /* @__PURE__ */ React.createElement(Video, { ...video?.props, ...src.inputProps }))) : null;
      return /* @__PURE__ */ React.createElement(React.Suspense, { fallback: LoadingContent }, Content);
    };
    this.rn.setContainer(container);
  }
  get c() {
    return this.b.delegate.c;
  }
  get type() {
    return "remotion";
  }
  get currentSrc() {
    return peek(this.tc);
  }
  get frame() {
    return this.r();
  }
  setup() {
    effect(this.Fn.bind(this));
    effect(this.Gn.bind(this));
    effect(this.Hn.bind(this));
  }
  Gn() {
    this.kn();
    this.tn();
  }
  tn() {
    const elements = [...this.container.querySelectorAll("audio,video")];
    this.ln.set(elements);
  }
  Hn() {
    const elements = this.ln();
    for (const tag of elements) {
      const onWait = this.un.bind(this, tag), onStopWaiting = this.vn.bind(this, tag);
      if (tag.currentSrc && tag.readyState < 4) {
        this.un(tag);
        listenEvent(tag, "canplay", onStopWaiting);
      }
      listenEvent(tag, "waiting", onWait);
      listenEvent(tag, "playing", onStopWaiting);
    }
    for (const el of this._m) {
      if (!elements.includes(el))
        this.vn(el);
    }
  }
  en(frame) {
    const { inFrame, fps } = this.tc(), { seeking } = this.b.$state, time = Math.max(0, frame - inFrame) / fps;
    this.r.set((record) => ({
      ...record,
      [REMOTION_PROVIDER_ID]: frame
    }));
    this.c("time-update", {
      currentTime: time,
      played: this.vc(time)
    });
    if (seeking()) {
      tick();
      this.c("seeked", time);
    }
  }
  In() {
    this.pause();
    this.c("end");
  }
  async play() {
    const { ended } = this.b.$state;
    if (peek(ended)) {
      this.$m({ [REMOTION_PROVIDER_ID]: 0 });
    }
    try {
      const mediaElements = peek(this.ln);
      if (mediaElements.length) {
        await Promise.all(mediaElements.map((media) => media.play()));
      }
      this.c("play");
      tick();
      if (this.Ym) {
        this.c("waiting");
        return this.Ym.promise;
      } else {
        this.Xm?.play();
        this.c("playing");
      }
    } catch (error) {
      throw error;
    }
  }
  async pause() {
    this.b.$state;
    this.Xm?.stop();
    this.c("pause");
  }
  setMuted(value) {
    if (!this.b)
      return;
    const { muted, volume } = this.b.$state;
    if (isFunction(value)) {
      this.setMuted(value(muted()));
      return;
    }
    this.c("volume-change", {
      volume: peek(volume),
      muted: value
    });
  }
  setCurrentTime(time) {
    const { fps } = this.tc(), frame = time * fps;
    this.c("seeking", time);
    this.$m({ [REMOTION_PROVIDER_ID]: frame });
  }
  setVolume(value) {
    if (!this.b)
      return;
    const { volume, muted } = this.b.$state;
    if (isFunction(value)) {
      this.setVolume(value(volume()));
      return;
    }
    this.c("volume-change", {
      volume: value,
      muted: peek(muted)
    });
  }
  setPlaybackRate(rate) {
    if (isFunction(rate)) {
      const { playbackRate } = this.b.$state;
      this.setPlaybackRate(rate(peek(playbackRate)));
      return;
    }
    this.Xm?.setPlaybackRate(rate);
    this.c("rate-change", rate);
  }
  vc(time) {
    return this.ha >= time ? this.ca : this.ca = new TimeRange(0, this.ha = time);
  }
  async loadSource(src) {
    if (!isRemotionSrc(src))
      return;
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
        this.pause();
        this.c("error", {
          message: error.message,
          code: 1
        });
        onUserError?.(error);
      }
    };
    this.tc.set(resolvedSrc);
    for (const prop of Object.keys(resolvedSrc)) {
      src[prop] = resolvedSrc[prop];
    }
    this.changeSrc(resolvedSrc);
  }
  destroy() {
    this.changeSrc(null);
  }
  changeSrc(src) {
    this.Xm?.destroy();
    this.ha = 0;
    this.ca = new TimeRange(0, 0);
    this.kc.set(false);
    this.Ym?.reject("src changed");
    this.Ym = null;
    this.jn = null;
    this.mn = null;
    this.Xm = null;
    this.kn.set([]);
    this._m.clear();
    this.r.set({ [REMOTION_PROVIDER_ID]: 0 });
    this.rn.setSrc(src);
    if (src) {
      this.mn = this.Jn();
      this.Xm = new RemotionPlaybackEngine(
        src,
        this.en.bind(this),
        this.In.bind(this)
      );
    }
  }
  Ha(src) {
    if (!src)
      return;
    const { outFrame, inFrame, fps } = src, duration = (outFrame - inFrame) / fps;
    this.c("loaded-metadata");
    this.c("loaded-data");
    this.b.delegate.Ha({
      duration,
      seekable: new TimeRange(0, duration),
      buffered: new TimeRange(0, duration)
    });
    if (src.initialFrame) {
      this.$m({
        [REMOTION_PROVIDER_ID]: src.initialFrame
      });
    }
  }
  un(el) {
    this._m.add(el);
    this.kc.set(true);
    if (!this.Ym) {
      this.Ym = deferredPromise();
    }
  }
  vn(el) {
    this._m.delete(el);
    if (this._m.size)
      return;
    this.kc.set(false);
    this.Ym?.resolve();
    this.Ym = null;
    const { canPlay } = this.b.$state;
    if (!peek(canPlay)) {
      this.Ha(peek(this.tc));
    }
  }
  Fn() {
    this.kc();
    const { paused } = this.b.$state;
    if (peek(paused))
      return;
    if (this.kc()) {
      this.Xm?.stop();
      this.c("waiting");
    } else {
      this.Xm?.play();
      this.c("playing");
    }
  }
  $m(value) {
    if (isFunction(value)) {
      this.$m(value(this.r()));
      return;
    }
    this.r.set((record) => ({ ...record, ...value }));
    const nextFrame = value[REMOTION_PROVIDER_ID];
    if (this.Xm && this.Xm.frame !== nextFrame) {
      this.Xm.frame = nextFrame;
    }
  }
  sn(value) {
    const { playing } = this.b.$state;
    if (isFunction(value)) {
      this.sn(value(playing()));
      return;
    }
    if (value) {
      this.play();
    } else if (!value) {
      this.pause();
    }
  }
  Jn() {
    const { playing, playbackRate } = this.b.$state, frame = this.r, mediaTags = this.kn, setPlaybackRate = this.setPlaybackRate.bind(this);
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
}

export { RemotionProvider };
