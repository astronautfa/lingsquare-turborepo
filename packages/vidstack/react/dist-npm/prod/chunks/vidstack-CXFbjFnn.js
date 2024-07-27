"use client"

import { listenEvent, effect, untrack, createScope, keysOf, onDispose, DOMEvent, peek } from './vidstack-DcuYVyd0.js';
import { ListSymbol, TimeRange, RAFLoop } from './vidstack-DVfG6VuV.js';
import { getCastSessionMedia, getCastContext, getCastSession, hasActiveCastSession, listenCastContextEvent, getCastErrorMessage } from './vidstack-BO-L-6zu.js';
import 'react';
import '@floating-ui/dom';

class GoogleCastMediaInfoBuilder {
  constructor(src) {
    this.ab = new chrome.cast.media.MediaInfo(src.src, src.type);
  }
  build() {
    return this.ab;
  }
  mj(streamType) {
    if (streamType.includes("live")) {
      this.ab.streamType = chrome.cast.media.StreamType.LIVE;
    } else {
      this.ab.streamType = chrome.cast.media.StreamType.BUFFERED;
    }
    return this;
  }
  nj(tracks) {
    this.ab.tracks = tracks.map(this.oj);
    return this;
  }
  pj(title, poster) {
    this.ab.metadata = new chrome.cast.media.GenericMediaMetadata();
    this.ab.metadata.title = title;
    this.ab.metadata.images = [{ url: poster }];
    return this;
  }
  oj(track, trackId) {
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
    this.pd = _cast;
    this.b = _ctx;
    this.Be = _onNewLocalTracks;
  }
  ie() {
    const syncRemoteActiveIds = this.vg.bind(this);
    listenEvent(this.b.audioTracks, "change", syncRemoteActiveIds);
    listenEvent(this.b.textTracks, "mode-change", syncRemoteActiveIds);
    effect(this.qj.bind(this));
  }
  od() {
    return this.b.$state.textTracks().filter((track) => track.src && track.type === "vtt");
  }
  wg() {
    return this.b.$state.audioTracks();
  }
  yc(type) {
    const tracks = this.pd.mediaInfo?.tracks ?? [];
    return type ? tracks.filter((track) => track.type === type) : tracks;
  }
  rj() {
    const activeIds = [], activeLocalAudioTrack = this.wg().find((track) => track.selected), activeLocalTextTracks = this.od().filter(
      (track) => track.mode === "showing"
    );
    if (activeLocalAudioTrack) {
      const remoteAudioTracks = this.yc(REMOTE_TRACK_AUDIO_TYPE), remoteAudioTrack = this.Ae(remoteAudioTracks, activeLocalAudioTrack);
      if (remoteAudioTrack) activeIds.push(remoteAudioTrack.trackId);
    }
    if (activeLocalTextTracks?.length) {
      const remoteTextTracks = this.yc(REMOTE_TRACK_TEXT_TYPE);
      if (remoteTextTracks.length) {
        for (const localTrack of activeLocalTextTracks) {
          const remoteTextTrack = this.Ae(remoteTextTracks, localTrack);
          if (remoteTextTrack) activeIds.push(remoteTextTrack.trackId);
        }
      }
    }
    return activeIds;
  }
  qj() {
    const localTextTracks = this.od();
    if (!this.pd.isMediaLoaded) return;
    const remoteTextTracks = this.yc(REMOTE_TRACK_TEXT_TYPE);
    for (const localTrack of localTextTracks) {
      const hasRemoteTrack = this.Ae(remoteTextTracks, localTrack);
      if (!hasRemoteTrack) {
        untrack(() => this.Be?.());
        break;
      }
    }
  }
  sj(event) {
    if (!this.pd.isMediaLoaded) return;
    const localAudioTracks = this.wg(), localTextTracks = this.od(), remoteAudioTracks = this.yc(REMOTE_TRACK_AUDIO_TYPE), remoteTextTracks = this.yc(REMOTE_TRACK_TEXT_TYPE);
    for (const remoteAudioTrack of remoteAudioTracks) {
      const hasLocalTrack = this.xg(localAudioTracks, remoteAudioTrack);
      if (hasLocalTrack) continue;
      const localAudioTrack = {
        id: remoteAudioTrack.trackId.toString(),
        label: remoteAudioTrack.name,
        language: remoteAudioTrack.language,
        kind: remoteAudioTrack.subtype ?? "main",
        selected: false
      };
      this.b.audioTracks[ListSymbol.ea](localAudioTrack, event);
    }
    for (const remoteTextTrack of remoteTextTracks) {
      const hasLocalTrack = this.xg(localTextTracks, remoteTextTrack);
      if (hasLocalTrack) continue;
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
  vg(event) {
    if (!this.pd.isMediaLoaded) return;
    const activeIds = this.rj(), editRequest = new chrome.cast.media.EditTracksInfoRequest(activeIds);
    this.tj(editRequest).catch((error) => {
    });
  }
  tj(request) {
    const media = getCastSessionMedia();
    return new Promise((resolve, reject) => media?.editTracksInfo(request, resolve, reject));
  }
  xg(localTracks, remoteTrack) {
    return localTracks.find((localTrack) => this.yg(localTrack, remoteTrack));
  }
  Ae(remoteTracks, localTrack) {
    return remoteTracks.find((remoteTrack) => this.yg(localTrack, remoteTrack));
  }
  // Note: we can't rely on id matching because they will differ between local/remote. A local
  // track id might not even exist.
  yg(localTrack, remoteTrack) {
    return remoteTrack.name === localTrack.label && remoteTrack.language === localTrack.language && remoteTrack.subtype.toLowerCase() === localTrack.kind.toLowerCase();
  }
}

class GoogleCastProvider {
  constructor(_player, _ctx) {
    this.f = _player;
    this.b = _ctx;
    this.$$PROVIDER_TYPE = "GOOGLE_CAST";
    this.scope = createScope();
    this.L = null;
    this.Aa = "disconnected";
    this.va = 0;
    this.ha = 0;
    this.Ba = new TimeRange(0, 0);
    this.ga = new RAFLoop(this.lc.bind(this));
    this.Qa = null;
    this.Ce = false;
    this.wa = new GoogleCastTracksManager(
      this.f,
      this.b,
      this.Be.bind(this)
    );
  }
  get c() {
    return this.b.delegate.c;
  }
  get type() {
    return "google-cast";
  }
  get currentSrc() {
    return this.L;
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
    return hasActiveCastSession(this.L);
  }
  setup() {
    this.uj();
    this.vj();
    this.wa.ie();
    this.c("provider-setup", this);
  }
  uj() {
    listenCastContextEvent(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      this.Ag.bind(this)
    );
  }
  vj() {
    const Event2 = cast.framework.RemotePlayerEventType, handlers = {
      [Event2.IS_CONNECTED_CHANGED]: this.Ag,
      [Event2.IS_MEDIA_LOADED_CHANGED]: this.Bg,
      [Event2.CAN_CONTROL_VOLUME_CHANGED]: this.Cg,
      [Event2.CAN_SEEK_CHANGED]: this.Dg,
      [Event2.DURATION_CHANGED]: this.ee,
      [Event2.IS_MUTED_CHANGED]: this.Oa,
      [Event2.VOLUME_LEVEL_CHANGED]: this.Oa,
      [Event2.IS_PAUSED_CHANGED]: this.wj,
      [Event2.LIVE_SEEKABLE_RANGE_CHANGED]: this.ob,
      [Event2.PLAYER_STATE_CHANGED]: this.xj
    };
    this.zg = handlers;
    const handler = this.yj.bind(this);
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
    if (!this.f.isPaused && !this.Ce) return;
    if (this.Ce) {
      await this.Eg(false, 0);
      return;
    }
    this.f.controller?.playOrPause();
  }
  async pause() {
    if (this.f.isPaused) return;
    this.f.controller?.playOrPause();
  }
  getMediaStatus(request) {
    return new Promise((resolve, reject) => {
      this.media?.getStatus(request, resolve, reject);
    });
  }
  setMuted(muted) {
    const hasChanged = muted && !this.f.isMuted || !muted && this.f.isMuted;
    if (hasChanged) this.f.controller?.muteOrUnmute();
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
    if (this.Qa?.src !== src) this.Qa = null;
    if (hasActiveCastSession(src)) {
      this.zj();
      this.L = src;
      return;
    }
    this.c("load-start");
    const loadRequest = this.Aj(src), errorCode = await this.session.loadMedia(loadRequest);
    if (errorCode) {
      this.L = null;
      this.c("error", Error(getCastErrorMessage(errorCode)));
      return;
    }
    this.L = src;
  }
  destroy() {
    this.A();
    this.Fg();
  }
  A() {
    if (!this.Qa) {
      this.ha = 0;
      this.Ba = new TimeRange(0, 0);
    }
    this.ga.aa();
    this.va = 0;
    this.Qa = null;
  }
  zj() {
    const resumeSessionEvent = new DOMEvent("resume-session", { detail: this.session });
    this.Bg(resumeSessionEvent);
    const { muted, volume, savedState } = this.b.$state, localState = savedState();
    this.setCurrentTime(Math.max(this.f.currentTime, localState?.currentTime ?? 0));
    this.setMuted(muted());
    this.setVolume(volume());
    if (localState?.paused === false) this.play();
  }
  Fg() {
    this.cast.endCurrentSession(true);
    const { remotePlaybackLoader } = this.b.$state;
    remotePlaybackLoader.set(null);
  }
  Bj() {
    const { savedState } = this.b.$state;
    savedState.set({
      paused: this.f.isPaused,
      currentTime: this.f.currentTime
    });
    this.Fg();
  }
  lc() {
    this.Cj();
  }
  yj(event) {
    this.zg[event.type].call(this, event);
  }
  Ag(data) {
    const castState = this.cast.getCastState(), state = castState === cast.framework.CastState.CONNECTED ? "connected" : castState === cast.framework.CastState.CONNECTING ? "connecting" : "disconnected";
    if (this.Aa === state) return;
    const detail = { type: "google-cast", state }, trigger = this.bb(data);
    this.Aa = state;
    this.c("remote-playback-change", detail, trigger);
    if (state === "disconnected") {
      this.Bj();
    }
  }
  Bg(event) {
    const hasLoaded = !!this.f.isMediaLoaded;
    if (!hasLoaded) return;
    const src = peek(this.b.$state.source);
    Promise.resolve().then(() => {
      if (src !== peek(this.b.$state.source) || !this.f.isMediaLoaded) return;
      this.A();
      const duration = this.f.duration;
      this.Ba = new TimeRange(0, duration);
      const detail = {
        provider: this,
        duration,
        buffered: new TimeRange(0, 0),
        seekable: this.Gg()
      }, trigger = this.bb(event);
      this.c("loaded-metadata", void 0, trigger);
      this.c("loaded-data", void 0, trigger);
      this.c("can-play", detail, trigger);
      this.Cg();
      this.Dg(event);
      const { volume, muted } = this.b.$state;
      this.setVolume(volume());
      this.setMuted(muted());
      this.ga.Ya();
      this.wa.sj(trigger);
      this.wa.vg(trigger);
    });
  }
  Cg() {
    this.b.$state.canSetVolume.set(this.f.canControlVolume);
  }
  Dg(event) {
    const trigger = this.bb(event);
    this.c("stream-type-change", this.Dj(), trigger);
  }
  Dj() {
    const streamType = this.f.mediaInfo?.streamType;
    return streamType === chrome.cast.media.StreamType.LIVE ? this.f.canSeek ? "live:dvr" : "live" : "on-demand";
  }
  Cj() {
    if (this.Qa) return;
    const currentTime = this.f.currentTime;
    if (currentTime === this.va) return;
    this.c("time-change", currentTime);
    if (currentTime > this.ha) {
      this.ha = currentTime;
      this.ob();
    }
    if (this.b.$state.seeking()) {
      this.c("seeked", currentTime);
    }
    this.va = currentTime;
  }
  ee(event) {
    if (!this.f.isMediaLoaded || this.Qa) return;
    const duration = this.f.duration, trigger = this.bb(event);
    this.Ba = new TimeRange(0, duration);
    this.c("duration-change", duration, trigger);
  }
  Oa(event) {
    if (!this.f.isMediaLoaded) return;
    const detail = {
      muted: this.f.isMuted,
      volume: this.f.volumeLevel
    }, trigger = this.bb(event);
    this.c("volume-change", detail, trigger);
  }
  wj(event) {
    const trigger = this.bb(event);
    if (this.f.isPaused) {
      this.c("pause", void 0, trigger);
    } else {
      this.c("play", void 0, trigger);
    }
  }
  ob(event) {
    const detail = {
      seekable: this.Gg(),
      buffered: new TimeRange(0, this.ha)
    }, trigger = event ? this.bb(event) : void 0;
    this.c("progress", detail, trigger);
  }
  xj(event) {
    const state = this.f.playerState, PlayerState = chrome.cast.media.PlayerState;
    this.Ce = state === PlayerState.IDLE;
    if (state === PlayerState.PAUSED) return;
    const trigger = this.bb(event);
    switch (state) {
      case PlayerState.PLAYING:
        this.c("playing", void 0, trigger);
        break;
      case PlayerState.BUFFERING:
        this.c("waiting", void 0, trigger);
        break;
      case PlayerState.IDLE:
        this.ga.aa();
        this.c("pause");
        this.c("end");
        break;
    }
  }
  Gg() {
    return this.f.liveSeekableRange ? new TimeRange(this.f.liveSeekableRange.start, this.f.liveSeekableRange.end) : this.Ba;
  }
  bb(detail) {
    return detail instanceof Event ? detail : new DOMEvent(detail.type, { detail });
  }
  Ej(src) {
    const { streamType, title, poster } = this.b.$state;
    return new GoogleCastMediaInfoBuilder(src).pj(title(), poster()).mj(streamType()).nj(this.wa.od()).build();
  }
  Aj(src) {
    const mediaInfo = this.Ej(src), request = new chrome.cast.media.LoadRequest(mediaInfo), savedState = this.b.$state.savedState();
    request.autoplay = (this.Qa?.paused ?? savedState?.paused) === false;
    request.currentTime = this.Qa?.time ?? savedState?.currentTime ?? 0;
    return request;
  }
  async Eg(paused, time) {
    const src = peek(this.b.$state.source);
    this.Qa = { src, paused, time };
    await this.loadSource(src);
  }
  Be() {
    this.Eg(this.f.isPaused, this.f.currentTime).catch((error) => {
    });
  }
}

export { GoogleCastProvider };
