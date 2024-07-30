import { c as createDisposalBin, i as isString, s as setStyle, a as isBoolean, D as DOMEvent } from '../chunks/vidstack-2WGWo9lS.js';
import { m as mediaState } from '../chunks/vidstack-Cf8b5FVK.js';
import { c as canPlayVideoType } from '../chunks/vidstack-B89aCpDg.js';

let activePlyr = null, defaults = mediaState.record, eventMap = {
  ratechange: "rate-change",
  ready: "can-play",
  timeupdate: "time-update",
  volumechange: "volume-change"
};
class Plyr {
  constructor(target, config = {}) {
    this.target = target;
    this.config = config;
    this.fullscreen = new PlyrFullscreenAdapter(this);
    // These are only included for type defs, props are defined in constructor.
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
    this._source = null;
    this._ratio = null;
    this._disposal = createDisposalBin();
    this._listeners = [];
    {
      throw Error("[plyr] can not create player on server.");
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
    return this._source;
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
    this._source = source;
  }
  get ratio() {
    return this._ratio;
  }
  set ratio(ratio) {
    if (ratio)
      ratio = ratio.replace(/\s*:\s*/, " / ");
    setStyle(this.player, "aspect-ratio", ratio ?? "unset");
    this._ratio = ratio;
  }
  get download() {
    return this.layout.download;
  }
  set download(download) {
    this.layout.download = download;
  }
  _onPlay() {
    if (activePlyr !== this)
      activePlyr?.pause();
    activePlyr = this;
  }
  _onReset() {
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
    this._listen(type, callback);
  }
  once(type, callback) {
    this._listen(type, callback, { once: true });
  }
  off(type, callback) {
    this._listen(type, callback, { remove: true });
  }
  _listen(type, callback, options = {}) {
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
        index = this._listeners.findIndex((t) => t.type === type && t.callback === callback);
        if (index >= 0) {
          const { listener: listener2 } = this._listeners[index];
          this.player.removeEventListener(mappedEventType, listener2);
          this._listeners.splice(index, 1);
        }
      } while (index >= 0);
    } else {
      this._listeners.push({ type, callback, listener });
      this.player.addEventListener(mappedEventType, listener, { once: options.once });
    }
  }
  supports(type) {
    return !!type && canPlayVideoType();
  }
  destroy() {
    for (const { type, listener } of this._listeners) {
      this.player.removeEventListener(eventMap[type] ?? type, listener);
    }
    this._source = null;
    this._listeners.length = 0;
    if (activePlyr === this)
      activePlyr = null;
    this._disposal.empty();
    this.player.destroy();
  }
}
class PlyrFullscreenAdapter {
  constructor(_plyr) {
    this._plyr = _plyr;
  }
  get _player() {
    return this._plyr.player;
  }
  /**
   * 	Returns a boolean indicating if the current player has fullscreen enabled.
   */
  get enabled() {
    return this._player.state.canFullscreen;
  }
  /**
   * Returns a boolean indicating if the current player is in fullscreen mode.
   */
  get active() {
    return this._player.state.fullscreen;
  }
  /**
   * Request to enter fullscreen.
   */
  enter() {
    return this._player.requestFullscreen();
  }
  /**
   * Request to exit fullscreen.
   */
  exit() {
    return this._player.exitFullscreen();
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
