import { l as listenEvent, g as effect, V as untrack, t as createScope, x as keysOf, r as onDispose, D as DOMEvent, p as peek } from '../chunks/vidstack-CBNXqr3M.js';
import { T as TimeRange } from '../chunks/vidstack-C5IKOUzO.js';
import { R as RAFLoop } from '../chunks/vidstack-D5KHQxGY.js';
import { L as ListSymbol } from '../chunks/vidstack-VrKElWm_.js';
import { f as getCastSessionMedia, g as getCastContext, a as getCastSession, j as hasActiveCastSession, l as listenCastContextEvent, c as getCastErrorMessage } from '../chunks/vidstack-BTMNefP5.js';

class GoogleCastMediaInfoBuilder {
  constructor(src) {
    this.$a = new chrome.cast.media.MediaInfo(src.src, src.type);
  }
  build() {
    return this.$a;
  }
  lj(streamType) {
    if (streamType.includes("live")) {
      this.$a.streamType = chrome.cast.media.StreamType.LIVE;
    } else {
      this.$a.streamType = chrome.cast.media.StreamType.BUFFERED;
    }
    return this;
  }
  mj(tracks) {
    this.$a.tracks = tracks.map(this.nj);
    return this;
  }
  oj(title, poster) {
    this.$a.metadata = new chrome.cast.media.GenericMediaMetadata();
    this.$a.metadata.title = title;
    this.$a.metadata.images = [{ url: poster }];
    return this;
  }
  nj(track, trackId) {
    const castTrack = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.TEXT);
    castTrack.name = track.label;
    castTrack.trackContentId = track.src;
    castTrack.trackContentType = "text/vtt";
    castTrack.language = track.language;
    castTrack.subtype = track.kind.toUpperCase();
    return castTrack;
  }
}

const REMOTE_TRACK_TEXT_TYPE = chrome.cast.media.TrackType.TEXT, REMOTE_TRACK_AUDIO_TYPE = chrome.cast.media.TrackType.AUDIO;
class GoogleCastTracksManager {
  constructor(_cast, _ctx, _onNewLocalTracks) {
    this.od = _cast;
    this.b = _ctx;
    this.Ae = _onNewLocalTracks;
  }
  he() {
    const syncRemoteActiveIds = this.ug.bind(this);
    listenEvent(this.b.audioTracks, "change", syncRemoteActiveIds);
    listenEvent(this.b.textTracks, "mode-change", syncRemoteActiveIds);
    effect(this.pj.bind(this));
  }
  nd() {
    return this.b.$state.textTracks().filter((track) => track.src && track.type === "vtt");
  }
  vg() {
    return this.b.$state.audioTracks();
  }
  xc(type) {
    const tracks = this.od.mediaInfo?.tracks ?? [];
    return type ? tracks.filter((track) => track.type === type) : tracks;
  }
  qj() {
    const activeIds = [], activeLocalAudioTrack = this.vg().find((track) => track.selected), activeLocalTextTracks = this.nd().filter(
      (track) => track.mode === "showing"
    );
    if (activeLocalAudioTrack) {
      const remoteAudioTracks = this.xc(REMOTE_TRACK_AUDIO_TYPE), remoteAudioTrack = this.ze(remoteAudioTracks, activeLocalAudioTrack);
      if (remoteAudioTrack)
        activeIds.push(remoteAudioTrack.trackId);
    }
    if (activeLocalTextTracks?.length) {
      const remoteTextTracks = this.xc(REMOTE_TRACK_TEXT_TYPE);
      if (remoteTextTracks.length) {
        for (const localTrack of activeLocalTextTracks) {
          const remoteTextTrack = this.ze(remoteTextTracks, localTrack);
          if (remoteTextTrack)
            activeIds.push(remoteTextTrack.trackId);
        }
      }
    }
    return activeIds;
  }
  pj() {
    const localTextTracks = this.nd();
    if (!this.od.isMediaLoaded)
      return;
    const remoteTextTracks = this.xc(REMOTE_TRACK_TEXT_TYPE);
    for (const localTrack of localTextTracks) {
      const hasRemoteTrack = this.ze(remoteTextTracks, localTrack);
      if (!hasRemoteTrack) {
        untrack(() => this.Ae?.());
        break;
      }
    }
  }
  rj(event) {
    if (!this.od.isMediaLoaded)
      return;
    const localAudioTracks = this.vg(), localTextTracks = this.nd(), remoteAudioTracks = this.xc(REMOTE_TRACK_AUDIO_TYPE), remoteTextTracks = this.xc(REMOTE_TRACK_TEXT_TYPE);
    for (const remoteAudioTrack of remoteAudioTracks) {
      const hasLocalTrack = this.wg(localAudioTracks, remoteAudioTrack);
      if (hasLocalTrack)
        continue;
      const localAudioTrack = {
        id: remoteAudioTrack.trackId.toString(),
        label: remoteAudioTrack.name,
        language: remoteAudioTrack.language,
        kind: remoteAudioTrack.subtype ?? "main",
        selected: false
      };
      this.b.audioTracks[ListSymbol.da](localAudioTrack, event);
    }
    for (const remoteTextTrack of remoteTextTracks) {
      const hasLocalTrack = this.wg(localTextTracks, remoteTextTrack);
      if (hasLocalTrack)
        continue;
      const localTextTrack = {
        id: remoteTextTrack.trackId.toString(),
        src: remoteTextTrack.trackContentId,
        label: remoteTextTrack.name,
        language: remoteTextTrack.language,
        kind: remoteTextTrack.subtype.toLowerCase()
      };
      this.b.textTracks.add(localTextTrack, event);
    }
  }
  ug(event) {
    if (!this.od.isMediaLoaded)
      return;
    const activeIds = this.qj(), editRequest = new chrome.cast.media.EditTracksInfoRequest(activeIds);
    this.sj(editRequest).catch((error) => {
    });
  }
  sj(request) {
    const media = getCastSessionMedia();
    return new Promise((resolve, reject) => media?.editTracksInfo(request, resolve, reject));
  }
  wg(localTracks, remoteTrack) {
    return localTracks.find((localTrack) => this.xg(localTrack, remoteTrack));
  }
  ze(remoteTracks, localTrack) {
    return remoteTracks.find((remoteTrack) => this.xg(localTrack, remoteTrack));
  }
  // Note: we can't rely on id matching because they will differ between local/remote. A local
  // track id might not even exist.
  xg(localTrack, remoteTrack) {
    return remoteTrack.name === localTrack.label && remoteTrack.language === localTrack.language && remoteTrack.subtype.toLowerCase() === localTrack.kind.toLowerCase();
  }
}

class GoogleCastProvider {
  constructor(_player, _ctx) {
    this.f = _player;
    this.b = _ctx;
    this.$$PROVIDER_TYPE = "GOOGLE_CAST";
    this.scope = createScope();
    this.K = null;
    this.za = "disconnected";
    this.ua = 0;
    this.ga = 0;
    this.ba = new TimeRange(0, 0);
    this.Aa = new TimeRange(0, 0);
    this.fa = new RAFLoop(this.kc.bind(this));
    this.Pa = null;
    this.Be = false;
    this.va = new GoogleCastTracksManager(
      this.f,
      this.b,
      this.Ae.bind(this)
    );
  }
  get c() {
    return this.b.delegate.c;
  }
  get type() {
    return "google-cast";
  }
  get currentSrc() {
    return this.K;
  }
  /**
   * The Google Cast remote player.
   *
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.RemotePlayer}
   */
  get player() {
    return this.f;
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
   */
  get cast() {
    return getCastContext();
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastSession}
   */
  get session() {
    return getCastSession();
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.Media}
   */
  get media() {
    return getCastSessionMedia();
  }
  /**
   * Whether the current Google Cast session belongs to this provider.
   */
  get hasActiveSession() {
    return hasActiveCastSession(this.K);
  }
  setup() {
    this.tj();
    this.uj();
    this.va.he();
    this.c("provider-setup", this);
  }
  tj() {
    listenCastContextEvent(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      this.zg.bind(this)
    );
  }
  uj() {
    const Event2 = cast.framework.RemotePlayerEventType, handlers = {
      [Event2.IS_CONNECTED_CHANGED]: this.zg,
      [Event2.IS_MEDIA_LOADED_CHANGED]: this.Ag,
      [Event2.CAN_CONTROL_VOLUME_CHANGED]: this.Bg,
      [Event2.CAN_SEEK_CHANGED]: this.Cg,
      [Event2.DURATION_CHANGED]: this.de,
      [Event2.IS_MUTED_CHANGED]: this.Na,
      [Event2.VOLUME_LEVEL_CHANGED]: this.Na,
      [Event2.IS_PAUSED_CHANGED]: this.vj,
      [Event2.LIVE_SEEKABLE_RANGE_CHANGED]: this.nb,
      [Event2.PLAYER_STATE_CHANGED]: this.wj
    };
    this.yg = handlers;
    const handler = this.xj.bind(this);
    for (const type of keysOf(handlers)) {
      this.f.controller.addEventListener(type, handler);
    }
    onDispose(() => {
      for (const type of keysOf(handlers)) {
        this.f.controller.removeEventListener(type, handler);
      }
    });
  }
  async play() {
    if (!this.f.isPaused && !this.Be)
      return;
    if (this.Be) {
      await this.Dg(false, 0);
      return;
    }
    this.f.controller?.playOrPause();
  }
  async pause() {
    if (this.f.isPaused)
      return;
    this.f.controller?.playOrPause();
  }
  getMediaStatus(request) {
    return new Promise((resolve, reject) => {
      this.media?.getStatus(request, resolve, reject);
    });
  }
  setMuted(muted) {
    const hasChanged = muted && !this.f.isMuted || !muted && this.f.isMuted;
    if (hasChanged)
      this.f.controller?.muteOrUnmute();
  }
  setCurrentTime(time) {
    this.f.currentTime = time;
    this.c("seeking", time);
    this.f.controller?.seek();
  }
  setVolume(volume) {
    this.f.volumeLevel = volume;
    this.f.controller?.setVolumeLevel();
  }
  async loadSource(src) {
    if (this.Pa?.src !== src)
      this.Pa = null;
    if (hasActiveCastSession(src)) {
      this.yj();
      this.K = src;
      return;
    }
    this.c("load-start");
    const loadRequest = this.zj(src), errorCode = await this.session.loadMedia(loadRequest);
    if (errorCode) {
      this.K = null;
      this.c("error", Error(getCastErrorMessage(errorCode)));
      return;
    }
    this.K = src;
  }
  destroy() {
    this.z();
    this.Eg();
  }
  z() {
    if (!this.Pa) {
      this.ga = 0;
      this.ba = new TimeRange(0, 0);
      this.Aa = new TimeRange(0, 0);
    }
    this.fa.$();
    this.ua = 0;
    this.Pa = null;
  }
  yj() {
    const resumeSessionEvent = new DOMEvent("resume-session", { detail: this.session });
    this.Ag(resumeSessionEvent);
    const { muted, volume, savedState } = this.b.$state, localState = savedState();
    this.setCurrentTime(Math.max(this.f.currentTime, localState?.currentTime ?? 0));
    this.setMuted(muted());
    this.setVolume(volume());
    if (localState?.paused === false)
      this.play();
  }
  Eg() {
    this.cast.endCurrentSession(true);
    const { remotePlaybackLoader } = this.b.$state;
    remotePlaybackLoader.set(null);
  }
  Aj() {
    const { savedState } = this.b.$state;
    savedState.set({
      paused: this.f.isPaused,
      currentTime: this.f.currentTime
    });
    this.Eg();
  }
  kc() {
    this.Bj();
  }
  xj(event) {
    this.yg[event.type].call(this, event);
  }
  zg(data) {
    const castState = this.cast.getCastState(), state = castState === cast.framework.CastState.CONNECTED ? "connected" : castState === cast.framework.CastState.CONNECTING ? "connecting" : "disconnected";
    if (this.za === state)
      return;
    const detail = { type: "google-cast", state }, trigger = this.ab(data);
    this.za = state;
    this.c("remote-playback-change", detail, trigger);
    if (state === "disconnected") {
      this.Aj();
    }
  }
  Ag(event) {
    const hasLoaded = !!this.f.isMediaLoaded;
    if (!hasLoaded)
      return;
    const src = peek(this.b.$state.source);
    Promise.resolve().then(() => {
      if (src !== peek(this.b.$state.source) || !this.f.isMediaLoaded)
        return;
      this.z();
      const duration = this.f.duration;
      this.Aa = new TimeRange(0, duration);
      const detail = {
        provider: this,
        duration,
        buffered: this.ba,
        seekable: this.Fg()
      }, trigger = this.ab(event);
      this.c("loaded-metadata", void 0, trigger);
      this.c("loaded-data", void 0, trigger);
      this.c("can-play", detail, trigger);
      this.Bg();
      this.Cg(event);
      const { volume, muted } = this.b.$state;
      this.setVolume(volume());
      this.setMuted(muted());
      this.fa.Xa();
      this.va.rj(trigger);
      this.va.ug(trigger);
    });
  }
  Bg() {
    this.b.$state.canSetVolume.set(this.f.canControlVolume);
  }
  Cg(event) {
    const trigger = this.ab(event);
    this.c("stream-type-change", this.Cj(), trigger);
  }
  Cj() {
    const streamType = this.f.mediaInfo?.streamType;
    return streamType === chrome.cast.media.StreamType.LIVE ? this.f.canSeek ? "live:dvr" : "live" : "on-demand";
  }
  Bj() {
    if (this.Pa)
      return;
    const currentTime = this.f.currentTime;
    if (currentTime === this.ua)
      return;
    const prevPlayed = this.ga, played = this.uc(currentTime), detail = { currentTime, played };
    this.c("time-update", detail);
    if (currentTime > prevPlayed)
      this.nb();
    if (this.b.$state.seeking()) {
      this.c("seeked", currentTime);
    }
    this.ua = currentTime;
  }
  uc(time) {
    return this.ga >= time ? this.ba : this.ba = new TimeRange(0, this.ga = time);
  }
  de(event) {
    if (!this.f.isMediaLoaded || this.Pa)
      return;
    const duration = this.f.duration, trigger = this.ab(event);
    this.Aa = new TimeRange(0, duration);
    this.c("duration-change", duration, trigger);
  }
  Na(event) {
    if (!this.f.isMediaLoaded)
      return;
    const detail = {
      muted: this.f.isMuted,
      volume: this.f.volumeLevel
    }, trigger = this.ab(event);
    this.c("volume-change", detail, trigger);
  }
  vj(event) {
    const trigger = this.ab(event);
    if (this.f.isPaused) {
      this.c("pause", void 0, trigger);
    } else {
      this.c("play", void 0, trigger);
    }
  }
  nb(event) {
    const detail = {
      seekable: this.Fg(),
      buffered: this.ba
    }, trigger = event ? this.ab(event) : void 0;
    this.c("progress", detail, trigger);
  }
  wj(event) {
    const state = this.f.playerState, PlayerState = chrome.cast.media.PlayerState;
    this.Be = state === PlayerState.IDLE;
    if (state === PlayerState.PAUSED)
      return;
    const trigger = this.ab(event);
    switch (state) {
      case PlayerState.PLAYING:
        this.c("playing", void 0, trigger);
        break;
      case PlayerState.BUFFERING:
        this.c("waiting", void 0, trigger);
        break;
      case PlayerState.IDLE:
        this.fa.$();
        this.c("pause");
        this.c("end");
        break;
    }
  }
  Fg() {
    return this.f.liveSeekableRange ? new TimeRange(this.f.liveSeekableRange.start, this.f.liveSeekableRange.end) : this.Aa;
  }
  ab(detail) {
    return detail instanceof Event ? detail : new DOMEvent(detail.type, { detail });
  }
  Dj(src) {
    const { streamType, title, poster } = this.b.$state;
    return new GoogleCastMediaInfoBuilder(src).oj(title(), poster()).lj(streamType()).mj(this.va.nd()).build();
  }
  zj(src) {
    const mediaInfo = this.Dj(src), request = new chrome.cast.media.LoadRequest(mediaInfo), savedState = this.b.$state.savedState();
    request.autoplay = (this.Pa?.paused ?? savedState?.paused) === false;
    request.currentTime = this.Pa?.time ?? savedState?.currentTime ?? 0;
    return request;
  }
  async Dg(paused, time) {
    const src = peek(this.b.$state.source);
    this.Pa = { src, paused, time };
    await this.loadSource(src);
  }
  Ae() {
    this.Dg(this.f.isPaused, this.f.currentTime).catch((error) => {
    });
  }
}

export { GoogleCastProvider };
