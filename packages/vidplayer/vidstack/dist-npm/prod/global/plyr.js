import '../define/vidstack-player.js';
import '../define/plyr-layout.js';
import { c as createDisposalBin, i as isString, l as listenEvent, s as setAttribute, k as kebabToCamelCase, a as setStyle, b as isBoolean, D as DOMEvent } from '../chunks/vidstack-CBNXqr3M.js';
import { m as mediaState } from '../chunks/vidstack-DopyK5ml.js';
import '../chunks/vidstack-THZVvA_p.js';
import { i as isHTMLElement } from '../chunks/vidstack-C5IKOUzO.js';
import { i as isHTMLAudioElement, a as isHTMLVideoElement, b as isHTMLIFrameElement } from '../chunks/vidstack-Dv7HWUBr.js';
import { c as canPlayVideoType } from '../chunks/vidstack-DlGT_9qi.js';
import '../chunks/vidstack-DP50xYm7.js';
import '../chunks/vidstack-DoOTQiYD.js';
import '../chunks/vidstack-DuqfpSxk.js';
import '../chunks/vidstack-CtdwOTCT.js';
import '../chunks/vidstack-CysHdt3L.js';
import '../define/plyr-layout-el.js';
import '../chunks/vidstack-Bf6opHxk.js';
import '../chunks/vidstack-_f_0FzgB.js';
import '../chunks/vidstack-rsZGrNIW.js';
import '../chunks/vidstack-BTmcG2zk.js';
import '../chunks/vidstack-BuXAfxgW.js';
import '../chunks/vidstack-VrKElWm_.js';
import '../chunks/vidstack-BSXZsAhp.js';
import '../chunks/vidstack-BUqeBbTQ.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-CSaHpIQV.js';

let activePlyr = null, defaults = mediaState.record, forwardedPlayerState = [
  "playing",
  "paused",
  "ended",
  "currentTime",
  "seeking",
  "duration",
  "volume",
  "muted",
  "loop",
  "poster"
], eventMap = {
  ratechange: "rate-change",
  ready: "can-play",
  timeupdate: "time-update",
  volumechange: "volume-change"
}, icons = [
  "airplay",
  "captions-off",
  "captions-on",
  "download",
  "enter-fullscreen",
  "exit-fullscreen",
  "fast-forward",
  "muted",
  "pause",
  "pip",
  "play",
  "restart",
  "rewind",
  "settings",
  "volume"
];
class Plyr {
  constructor(target, config = {}) {
    this.target = target;
    this.config = config;
    this.fullscreen = new PlyrFullscreenAdapter(this);
    this.playing = defaults.playing;
    this.paused = defaults.paused;
    this.ended = defaults.ended;
    this.currentTime = defaults.currentTime;
    this.seeking = defaults.seeking;
    this.duration = defaults.duration;
    this.volume = defaults.volume;
    this.muted = defaults.muted;
    this.loop = defaults.loop;
    this.poster = defaults.poster;
    this.wn = null;
    this.xn = null;
    this.Ya = createDisposalBin();
    this.vn = [];
    if (isString(target)) {
      target = document.querySelector(target);
    } else if (!isHTMLElement(target)) {
      target = target[0];
    }
    if (!isHTMLElement(target)) {
      throw Error(`[plyr] target must be of type \`HTMLElement\`, found \`${typeof target}\``);
    }
    const dataConfig = target.getAttribute("data-plyr-config");
    if (dataConfig) {
      try {
        config = { ...config, ...JSON.parse(dataConfig) };
      } catch (error) {
      }
    }
    const {
      enabled = true,
      debug = "error",
      autoPause = true,
      ratio = null,
      hideControls = true,
      resetOnEnd = false,
      disableContextMenu = true,
      iconUrl = null,
      iconPrefix = "plyr",
      keyboard = { focused: true, global: false },
      i18n = null,
      ...props
    } = config;
    this.player = document.createElement("media-player");
    this.provider = document.createElement("media-provider");
    this.layout = document.createElement("media-plyr-layout");
    if (!enabled)
      return;
    for (const prop of forwardedPlayerState) {
      Object.defineProperty(this, prop, {
        get: () => this.player[prop],
        set: (value) => void (this.player[prop] = value)
      });
    }
    if (isString(debug)) {
      this.player.logLevel = debug;
    } else if (debug) {
      this.player.logLevel = "warn";
    }
    if (autoPause) {
      this.Ya.add(listenEvent(this.player, "play", this.gc.bind(this)));
    }
    this.ratio = ratio;
    this.layout.translations = i18n;
    if (!hideControls) {
      this.player.controls.canIdle = false;
    }
    if (resetOnEnd) {
      this.Ya.add(listenEvent(this.player, "ended", this.Gf.bind(this)));
    }
    if (iconUrl) {
      this.layout.customIcons = true;
      const id = `sprite-${iconPrefix}`, exists = document.getElementById(id);
      const addIcons = () => {
        for (const icon of icons) {
          const namepsace = "http://www.w3.org/2000/svg";
          const svg = document.createElementNS(namepsace, "svg");
          setAttribute(svg, "fill", "none");
          setAttribute(svg, "slot", `${icon}-icon`);
          setAttribute(svg, "aria-hidden", "true");
          setAttribute(svg, "viewBox", "0 0 18 18");
          const use = document.createElementNS(namepsace, "use");
          use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${iconPrefix}-${icon}`);
          svg.append(use);
          this.layout.append(svg);
        }
      };
      if (!exists) {
        fetch(iconUrl).then((response) => response.text()).then((data) => {
          const container = document.createElement("div");
          setAttribute(container, "id", id);
          setAttribute(container, "hidden", "");
          container.innerHTML = data;
          document.body.insertAdjacentElement("afterbegin", container);
          addIcons();
        }).catch((error) => {
          this.layout.customIcons = false;
        });
      } else {
        addIcons();
      }
    }
    if (keyboard.global) {
      this.player.keyTarget = "document";
    } else if (keyboard.focused) {
      this.player.keyTarget = "player";
    } else {
      this.player.keyDisabled = true;
    }
    target.removeAttribute("controls");
    const title = target.getAttribute("title");
    if (title)
      this.player.setAttribute("title", title);
    const width = target.getAttribute("width"), height = target.getAttribute("height");
    if (width || height) {
      if (width)
        this.player.style.width = width;
      if (height)
        this.player.style.height = height;
      this.player.style.aspectRatio = "unset";
    }
    for (const attr of target.attributes) {
      const name = attr.name.replace("data-", ""), propName = kebabToCamelCase(name);
      if (propName in this.player) {
        this.player.setAttribute(name, attr.value);
      } else if (propName in this.layout) {
        this.layout.setAttribute(name, attr.value);
      }
    }
    for (const [prop, value] of Object.entries(props)) {
      if (prop in this.player) {
        this.player[prop] = value;
      } else if (prop in this.layout) {
        this.layout[prop] = value;
      }
    }
    this.player.append(this.provider, this.layout);
    const isTargetContainer = !isHTMLAudioElement(target) && !isHTMLVideoElement(target) && !isHTMLIFrameElement(target);
    if (isTargetContainer) {
      target.append(this.player);
    } else {
      for (const child of [...target.children])
        this.provider.append(child);
      target.replaceWith(this.player);
    }
    const embedProvider = target.getAttribute("data-plyr-provider"), embedId = target.getAttribute("data-plyr-embed-id");
    if (embedProvider && /youtube|vimeo/.test(embedProvider) && embedId) {
      this.player.src = `${embedProvider}/${embedId}`;
    }
  }
  static setup(targets, config) {
    if (isString(targets)) {
      targets = document.querySelectorAll(targets);
    }
    return [...targets].map((target) => new Plyr(target, config));
  }
  static supported(type, provider) {
    return true;
  }
  get type() {
    return this.player.provider?.type ?? "";
  }
  get isHTML5() {
    return /audio|video|hls/.test(this.type);
  }
  get isEmbed() {
    return /youtube|vimeo/.test(this.type);
  }
  get buffered() {
    const { bufferedEnd, seekableEnd } = this.player.state;
    return seekableEnd > 0 ? bufferedEnd / seekableEnd : 0;
  }
  get stopped() {
    return this.paused && this.currentTime === 0;
  }
  get hasAudio() {
    if (!this.isHTML5)
      return true;
    const media = this.player.provider.media;
    return Boolean(
      media.mozHasAudio || media.webkitAudioDecodedByteCount || media.audioTracks?.length || this.player.audioTracks.length
    );
  }
  get speed() {
    return this.player.playbackRate;
  }
  set speed(speed) {
    this.player.remoteControl.changePlaybackRate(speed);
  }
  get currentTrack() {
    return this.player.textTracks.selectedIndex;
  }
  set currentTrack(index) {
    this.player.remoteControl.changeTextTrackMode(index, "showing");
  }
  get pip() {
    return this.player.state.pictureInPicture;
  }
  set pip(isActive) {
    if (isActive)
      this.player.enterPictureInPicture();
    else
      this.player.exitPictureInPicture();
  }
  get quality() {
    return this.player.state.quality?.height ?? null;
  }
  set quality(value) {
    let qualities = this.player.qualities, index = -1;
    if (value !== null) {
      let minScore = Infinity;
      for (let i = 0; i < qualities.length; i++) {
        const score = Math.abs(qualities[i].height - value);
        if (score < minScore) {
          index = i;
          minScore = score;
        }
      }
    }
    this.player.remoteControl.changeQuality(index);
  }
  get source() {
    return this.wn;
  }
  set source(source) {
    const {
      type: viewType = "video",
      sources = "",
      title = "",
      poster = "",
      thumbnails = "",
      tracks = []
    } = source ?? {};
    this.player.src = sources;
    this.player.viewType = viewType;
    this.player.title = title;
    this.player.poster = poster;
    this.layout.thumbnails = thumbnails;
    this.player.textTracks.clear();
    for (const track of tracks)
      this.player.textTracks.add(track);
    this.wn = source;
  }
  get ratio() {
    return this.xn;
  }
  set ratio(ratio) {
    if (ratio)
      ratio = ratio.replace(/\s*:\s*/, " / ");
    setStyle(this.player, "aspect-ratio", ratio ?? "unset");
    this.xn = ratio;
  }
  get download() {
    return this.layout.download;
  }
  set download(download) {
    this.layout.download = download;
  }
  gc() {
    if (activePlyr !== this)
      activePlyr?.pause();
    activePlyr = this;
  }
  Gf() {
    this.currentTime = 0;
    this.paused = true;
  }
  play() {
    return this.player.play();
  }
  pause() {
    return this.player.pause();
  }
  togglePlay(toggle = this.paused) {
    if (toggle) {
      return this.player.play();
    } else {
      return this.player.pause();
    }
  }
  toggleCaptions(toggle = !this.player.textTracks.selected) {
    const controller = this.player.remoteControl;
    if (toggle) {
      controller.showCaptions();
    } else {
      controller.disableCaptions();
    }
  }
  toggleControls(toggle = !this.player.controls.showing) {
    const controls = this.player.controls;
    if (toggle) {
      controls.show();
    } else {
      controls.hide();
    }
  }
  restart() {
    this.currentTime = 0;
  }
  stop() {
    this.pause();
    this.player.currentTime = 0;
  }
  forward(seekTime = this.config.seekTime ?? 10) {
    this.currentTime += seekTime;
  }
  rewind(seekTime = this.config.seekTime ?? 10) {
    this.currentTime -= seekTime;
  }
  increaseVolume(step = 5) {
    this.volume += step;
  }
  decreaseVolume(step = 5) {
    this.volume -= step;
  }
  airplay() {
    return this.player.requestAirPlay();
  }
  on(type, callback) {
    this.yd(type, callback);
  }
  once(type, callback) {
    this.yd(type, callback, { once: true });
  }
  off(type, callback) {
    this.yd(type, callback, { remove: true });
  }
  yd(type, callback, options = {}) {
    let eventType = type, toggle = null;
    switch (type) {
      case "captionsenabled":
      case "captionsdisabled":
        eventType = "text-track-change";
        toggle = type === "captionsenabled";
        break;
      case "controlsshown":
      case "controlshidden":
        eventType = "controls-change";
        toggle = type === "controlsshown";
        break;
      case "enterfullscreen":
      case "exitfullscreen":
        eventType = "fullscreen-change";
        toggle = type === "enterfullscreen";
        break;
    }
    const mappedEventType = eventMap[eventType] ?? eventType;
    const listener = (event) => {
      if (isBoolean(toggle) && !!event.detail !== toggle)
        return;
      if (mappedEventType !== type) {
        callback(new DOMEvent(type, { ...event, trigger: event }));
        return;
      }
      callback(event);
    };
    if (options.remove) {
      let index = -1;
      do {
        index = this.vn.findIndex((t) => t.type === type && t.callback === callback);
        if (index >= 0) {
          const { listener: listener2 } = this.vn[index];
          this.player.removeEventListener(mappedEventType, listener2);
          this.vn.splice(index, 1);
        }
      } while (index >= 0);
    } else {
      this.vn.push({ type, callback, listener });
      this.player.addEventListener(mappedEventType, listener, { once: options.once });
    }
  }
  supports(type) {
    return !!type && canPlayVideoType(null, type);
  }
  destroy() {
    for (const { type, listener } of this.vn) {
      this.player.removeEventListener(eventMap[type] ?? type, listener);
    }
    this.wn = null;
    this.vn.length = 0;
    if (activePlyr === this)
      activePlyr = null;
    this.Ya.empty();
    this.player.destroy();
  }
}
class PlyrFullscreenAdapter {
  constructor(_plyr) {
    this.yn = _plyr;
  }
  get f() {
    return this.yn.player;
  }
  /**
   * 	Returns a boolean indicating if the current player has fullscreen enabled.
   */
  get enabled() {
    return this.f.state.canFullscreen;
  }
  /**
   * Returns a boolean indicating if the current player is in fullscreen mode.
   */
  get active() {
    return this.f.state.fullscreen;
  }
  /**
   * Request to enter fullscreen.
   */
  enter() {
    return this.f.requestFullscreen();
  }
  /**
   * Request to exit fullscreen.
   */
  exit() {
    return this.f.exitFullscreen();
  }
  /**
   * Request to toggle fullscreen.
   */
  toggle() {
    if (this.active)
      return this.exit();
    else
      return this.enter();
  }
}

export { Plyr, PlyrFullscreenAdapter };
