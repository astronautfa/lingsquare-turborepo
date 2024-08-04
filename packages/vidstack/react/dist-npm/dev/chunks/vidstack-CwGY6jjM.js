"use client"

import { l as listenEvent, e as effect, v as untrack, d as createScope, w as keysOf, x as onDispose, D as DOMEvent, p as peek } from './vidstack-DwBltyvo.js';
import { L as ListSymbol, T as TimeRange, R as RAFLoop } from './vidstack-DLTRlLRp.js';
import { g as getCastSessionMedia, a as getCastContext, b as getCastSession, h as hasActiveCastSession, l as listenCastContextEvent, c as getCastErrorMessage } from './vidstack-d0DfyhDQ.js';
import 'react';

class GoogleCastMediaInfoBuilder {
  constructor(src) {
    this._info = new chrome.cast.media.MediaInfo(src.src, src.type);
  }
  build() {
    return this._info;
  }
  _setStreamType(streamType) {
    if (streamType.includes("live")) {
      this._info.streamType = chrome.cast.media.StreamType.LIVE;
    } else {
      this._info.streamType = chrome.cast.media.StreamType.BUFFERED;
    }
    return this;
  }
  _setTracks(tracks) {
    this._info.tracks = tracks.map(this._buildCastTrack);
    return this;
  }
  _setMetadata(title, poster) {
    this._info.metadata = new chrome.cast.media.GenericMediaMetadata();
    this._info.metadata.title = title;
    this._info.metadata.images = [{ url: poster }];
    return this;
  }
  _buildCastTrack(track, trackId) {
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
    this._cast = _cast;
    this._ctx = _ctx;
    this._onNewLocalTracks = _onNewLocalTracks;
  }
  _setup() {
    const syncRemoteActiveIds = this._syncRemoteActiveIds.bind(this);
    listenEvent(this._ctx.audioTracks, "change", syncRemoteActiveIds);
    listenEvent(this._ctx.textTracks, "mode-change", syncRemoteActiveIds);
    effect(this._syncLocalTracks.bind(this));
  }
  _getLocalTextTracks() {
    return this._ctx.$state.textTracks().filter((track) => track.src && track.type === "vtt");
  }
  _getLocalAudioTracks() {
    return this._ctx.$state.audioTracks();
  }
  _getRemoteTracks(type) {
    const tracks = this._cast.mediaInfo?.tracks ?? [];
    return type ? tracks.filter((track) => track.type === type) : tracks;
  }
  _getRemoteActiveIds() {
    const activeIds = [], activeLocalAudioTrack = this._getLocalAudioTracks().find((track) => track.selected), activeLocalTextTracks = this._getLocalTextTracks().filter(
      (track) => track.mode === "showing"
    );
    if (activeLocalAudioTrack) {
      const remoteAudioTracks = this._getRemoteTracks(REMOTE_TRACK_AUDIO_TYPE), remoteAudioTrack = this._findRemoteTrack(remoteAudioTracks, activeLocalAudioTrack);
      if (remoteAudioTrack)
        activeIds.push(remoteAudioTrack.trackId);
    }
    if (activeLocalTextTracks?.length) {
      const remoteTextTracks = this._getRemoteTracks(REMOTE_TRACK_TEXT_TYPE);
      if (remoteTextTracks.length) {
        for (const localTrack of activeLocalTextTracks) {
          const remoteTextTrack = this._findRemoteTrack(remoteTextTracks, localTrack);
          if (remoteTextTrack)
            activeIds.push(remoteTextTrack.trackId);
        }
      }
    }
    return activeIds;
  }
  _syncLocalTracks() {
    const localTextTracks = this._getLocalTextTracks();
    if (!this._cast.isMediaLoaded)
      return;
    const remoteTextTracks = this._getRemoteTracks(REMOTE_TRACK_TEXT_TYPE);
    for (const localTrack of localTextTracks) {
      const hasRemoteTrack = this._findRemoteTrack(remoteTextTracks, localTrack);
      if (!hasRemoteTrack) {
        untrack(() => this._onNewLocalTracks?.());
        break;
      }
    }
  }
  _syncRemoteTracks(event) {
    if (!this._cast.isMediaLoaded)
      return;
    const localAudioTracks = this._getLocalAudioTracks(), localTextTracks = this._getLocalTextTracks(), remoteAudioTracks = this._getRemoteTracks(REMOTE_TRACK_AUDIO_TYPE), remoteTextTracks = this._getRemoteTracks(REMOTE_TRACK_TEXT_TYPE);
    for (const remoteAudioTrack of remoteAudioTracks) {
      const hasLocalTrack = this._findLocalTrack(localAudioTracks, remoteAudioTrack);
      if (hasLocalTrack)
        continue;
      const localAudioTrack = {
        id: remoteAudioTrack.trackId.toString(),
        label: remoteAudioTrack.name,
        language: remoteAudioTrack.language,
        kind: remoteAudioTrack.subtype ?? "main",
        selected: false
      };
      this._ctx.audioTracks[ListSymbol._add](localAudioTrack, event);
    }
    for (const remoteTextTrack of remoteTextTracks) {
      const hasLocalTrack = this._findLocalTrack(localTextTracks, remoteTextTrack);
      if (hasLocalTrack)
        continue;
      const localTextTrack = {
        id: remoteTextTrack.trackId.toString(),
        src: remoteTextTrack.trackContentId,
        label: remoteTextTrack.name,
        language: remoteTextTrack.language,
        kind: remoteTextTrack.subtype.toLowerCase()
      };
      this._ctx.textTracks.add(localTextTrack, event);
    }
  }
  _syncRemoteActiveIds(event) {
    if (!this._cast.isMediaLoaded)
      return;
    const activeIds = this._getRemoteActiveIds(), editRequest = new chrome.cast.media.EditTracksInfoRequest(activeIds);
    this._editTracksInfo(editRequest).catch((error) => {
      {
        this._ctx.logger?.errorGroup("[vidstack] failed to edit cast tracks info").labelledLog("Edit Request", editRequest).labelledLog("Error", error).dispatch();
      }
    });
  }
  _editTracksInfo(request) {
    const media = getCastSessionMedia();
    return new Promise((resolve, reject) => media?.editTracksInfo(request, resolve, reject));
  }
  _findLocalTrack(localTracks, remoteTrack) {
    return localTracks.find((localTrack) => this._isMatch(localTrack, remoteTrack));
  }
  _findRemoteTrack(remoteTracks, localTrack) {
    return remoteTracks.find((remoteTrack) => this._isMatch(localTrack, remoteTrack));
  }
  // Note: we can't rely on id matching because they will differ between local/remote. A local
  // track id might not even exist.
  _isMatch(localTrack, remoteTrack) {
    return remoteTrack.name === localTrack.label && remoteTrack.language === localTrack.language && remoteTrack.subtype.toLowerCase() === localTrack.kind.toLowerCase();
  }
}

class GoogleCastProvider {
  constructor(_player, _ctx) {
    this._player = _player;
    this._ctx = _ctx;
    this.$$PROVIDER_TYPE = "GOOGLE_CAST";
    this.scope = createScope();
    this._currentSrc = null;
    this._state = "disconnected";
    this._currentTime = 0;
    this._played = 0;
    this._playedRange = new TimeRange(0, 0);
    this._seekableRange = new TimeRange(0, 0);
    this._timeRAF = new RAFLoop(this._onAnimationFrame.bind(this));
    this._reloadInfo = null;
    this._isIdle = false;
    this._tracks = new GoogleCastTracksManager(
      this._player,
      this._ctx,
      this._onNewLocalTracks.bind(this)
    );
  }
  get _notify() {
    return this._ctx.delegate._notify;
  }
  get type() {
    return "google-cast";
  }
  get currentSrc() {
    return this._currentSrc;
  }
  /**
   * The Google Cast remote player.
   *
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.RemotePlayer}
   */
  get player() {
    return this._player;
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
    return hasActiveCastSession(this._currentSrc);
  }
  setup() {
    this._attachCastContextEventListeners();
    this._attachCastPlayerEventListeners();
    this._tracks._setup();
    this._notify("provider-setup", this);
  }
  _attachCastContextEventListeners() {
    listenCastContextEvent(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      this._onCastStateChange.bind(this)
    );
  }
  _attachCastPlayerEventListeners() {
    const Event2 = cast.framework.RemotePlayerEventType, handlers = {
      [Event2.IS_CONNECTED_CHANGED]: this._onCastStateChange,
      [Event2.IS_MEDIA_LOADED_CHANGED]: this._onMediaLoadedChange,
      [Event2.CAN_CONTROL_VOLUME_CHANGED]: this._onCanControlVolumeChange,
      [Event2.CAN_SEEK_CHANGED]: this._onCanSeekChange,
      [Event2.DURATION_CHANGED]: this._onDurationChange,
      [Event2.IS_MUTED_CHANGED]: this._onVolumeChange,
      [Event2.VOLUME_LEVEL_CHANGED]: this._onVolumeChange,
      [Event2.IS_PAUSED_CHANGED]: this._onPausedChange,
      [Event2.LIVE_SEEKABLE_RANGE_CHANGED]: this._onProgress,
      [Event2.PLAYER_STATE_CHANGED]: this._onPlayerStateChange
    };
    this._playerEventHandlers = handlers;
    const handler = this._onRemotePlayerEvent.bind(this);
    for (const type of keysOf(handlers)) {
      this._player.controller.addEventListener(type, handler);
    }
    onDispose(() => {
      for (const type of keysOf(handlers)) {
        this._player.controller.removeEventListener(type, handler);
      }
    });
  }
  async play() {
    if (!this._player.isPaused && !this._isIdle)
      return;
    if (this._isIdle) {
      await this._reload(false, 0);
      return;
    }
    this._player.controller?.playOrPause();
  }
  async pause() {
    if (this._player.isPaused)
      return;
    this._player.controller?.playOrPause();
  }
  getMediaStatus(request) {
    return new Promise((resolve, reject) => {
      this.media?.getStatus(request, resolve, reject);
    });
  }
  setMuted(muted) {
    const hasChanged = muted && !this._player.isMuted || !muted && this._player.isMuted;
    if (hasChanged)
      this._player.controller?.muteOrUnmute();
  }
  setCurrentTime(time) {
    this._player.currentTime = time;
    this._notify("seeking", time);
    this._player.controller?.seek();
  }
  setVolume(volume) {
    this._player.volumeLevel = volume;
    this._player.controller?.setVolumeLevel();
  }
  async loadSource(src) {
    if (this._reloadInfo?.src !== src)
      this._reloadInfo = null;
    if (hasActiveCastSession(src)) {
      this._resumeSession();
      this._currentSrc = src;
      return;
    }
    this._notify("load-start");
    const loadRequest = this._buildLoadRequest(src), errorCode = await this.session.loadMedia(loadRequest);
    if (errorCode) {
      this._currentSrc = null;
      this._notify("error", Error(getCastErrorMessage(errorCode)));
      return;
    }
    this._currentSrc = src;
  }
  destroy() {
    this._reset();
    this._endSession();
  }
  _reset() {
    if (!this._reloadInfo) {
      this._played = 0;
      this._playedRange = new TimeRange(0, 0);
      this._seekableRange = new TimeRange(0, 0);
    }
    this._timeRAF._stop();
    this._currentTime = 0;
    this._reloadInfo = null;
  }
  _resumeSession() {
    const resumeSessionEvent = new DOMEvent("resume-session", { detail: this.session });
    this._onMediaLoadedChange(resumeSessionEvent);
    const { muted, volume, savedState } = this._ctx.$state, localState = savedState();
    this.setCurrentTime(Math.max(this._player.currentTime, localState?.currentTime ?? 0));
    this.setMuted(muted());
    this.setVolume(volume());
    if (localState?.paused === false)
      this.play();
  }
  _endSession() {
    this.cast.endCurrentSession(true);
    const { remotePlaybackLoader } = this._ctx.$state;
    remotePlaybackLoader.set(null);
  }
  _disconnectFromReceiver() {
    const { savedState } = this._ctx.$state;
    savedState.set({
      paused: this._player.isPaused,
      currentTime: this._player.currentTime
    });
    this._endSession();
  }
  _onAnimationFrame() {
    this._onCurrentTimeChange();
  }
  _onRemotePlayerEvent(event) {
    this._playerEventHandlers[event.type].call(this, event);
  }
  _onCastStateChange(data) {
    const castState = this.cast.getCastState(), state = castState === cast.framework.CastState.CONNECTED ? "connected" : castState === cast.framework.CastState.CONNECTING ? "connecting" : "disconnected";
    if (this._state === state)
      return;
    const detail = { type: "google-cast", state }, trigger = this._createEvent(data);
    this._state = state;
    this._notify("remote-playback-change", detail, trigger);
    if (state === "disconnected") {
      this._disconnectFromReceiver();
    }
  }
  _onMediaLoadedChange(event) {
    const hasLoaded = !!this._player.isMediaLoaded;
    if (!hasLoaded)
      return;
    const src = peek(this._ctx.$state.source);
    Promise.resolve().then(() => {
      if (src !== peek(this._ctx.$state.source) || !this._player.isMediaLoaded)
        return;
      this._reset();
      const duration = this._player.duration;
      this._seekableRange = new TimeRange(0, duration);
      const detail = {
        provider: this,
        duration,
        buffered: this._playedRange,
        seekable: this._getSeekableRange()
      }, trigger = this._createEvent(event);
      this._notify("loaded-metadata", void 0, trigger);
      this._notify("loaded-data", void 0, trigger);
      this._notify("can-play", detail, trigger);
      this._onCanControlVolumeChange();
      this._onCanSeekChange(event);
      const { volume, muted } = this._ctx.$state;
      this.setVolume(volume());
      this.setMuted(muted());
      this._timeRAF._start();
      this._tracks._syncRemoteTracks(trigger);
      this._tracks._syncRemoteActiveIds(trigger);
    });
  }
  _onCanControlVolumeChange() {
    this._ctx.$state.canSetVolume.set(this._player.canControlVolume);
  }
  _onCanSeekChange(event) {
    const trigger = this._createEvent(event);
    this._notify("stream-type-change", this._getStreamType(), trigger);
  }
  _getStreamType() {
    const streamType = this._player.mediaInfo?.streamType;
    return streamType === chrome.cast.media.StreamType.LIVE ? this._player.canSeek ? "live:dvr" : "live" : "on-demand";
  }
  _onCurrentTimeChange() {
    if (this._reloadInfo)
      return;
    const currentTime = this._player.currentTime;
    if (currentTime === this._currentTime)
      return;
    const prevPlayed = this._played, played = this._getPlayedRange(currentTime), detail = { currentTime, played };
    this._notify("time-update", detail);
    if (currentTime > prevPlayed)
      this._onProgress();
    if (this._ctx.$state.seeking()) {
      this._notify("seeked", currentTime);
    }
    this._currentTime = currentTime;
  }
  _getPlayedRange(time) {
    return this._played >= time ? this._playedRange : this._playedRange = new TimeRange(0, this._played = time);
  }
  _onDurationChange(event) {
    if (!this._player.isMediaLoaded || this._reloadInfo)
      return;
    const duration = this._player.duration, trigger = this._createEvent(event);
    this._seekableRange = new TimeRange(0, duration);
    this._notify("duration-change", duration, trigger);
  }
  _onVolumeChange(event) {
    if (!this._player.isMediaLoaded)
      return;
    const detail = {
      muted: this._player.isMuted,
      volume: this._player.volumeLevel
    }, trigger = this._createEvent(event);
    this._notify("volume-change", detail, trigger);
  }
  _onPausedChange(event) {
    const trigger = this._createEvent(event);
    if (this._player.isPaused) {
      this._notify("pause", void 0, trigger);
    } else {
      this._notify("play", void 0, trigger);
    }
  }
  _onProgress(event) {
    const detail = {
      seekable: this._getSeekableRange(),
      buffered: this._playedRange
    }, trigger = event ? this._createEvent(event) : void 0;
    this._notify("progress", detail, trigger);
  }
  _onPlayerStateChange(event) {
    const state = this._player.playerState, PlayerState = chrome.cast.media.PlayerState;
    this._isIdle = state === PlayerState.IDLE;
    if (state === PlayerState.PAUSED)
      return;
    const trigger = this._createEvent(event);
    switch (state) {
      case PlayerState.PLAYING:
        this._notify("playing", void 0, trigger);
        break;
      case PlayerState.BUFFERING:
        this._notify("waiting", void 0, trigger);
        break;
      case PlayerState.IDLE:
        this._timeRAF._stop();
        this._notify("pause");
        this._notify("end");
        break;
    }
  }
  _getSeekableRange() {
    return this._player.liveSeekableRange ? new TimeRange(this._player.liveSeekableRange.start, this._player.liveSeekableRange.end) : this._seekableRange;
  }
  _createEvent(detail) {
    return detail instanceof Event ? detail : new DOMEvent(detail.type, { detail });
  }
  _buildMediaInfo(src) {
    const { streamType, title, poster } = this._ctx.$state;
    return new GoogleCastMediaInfoBuilder(src)._setMetadata(title(), poster())._setStreamType(streamType())._setTracks(this._tracks._getLocalTextTracks()).build();
  }
  _buildLoadRequest(src) {
    const mediaInfo = this._buildMediaInfo(src), request = new chrome.cast.media.LoadRequest(mediaInfo), savedState = this._ctx.$state.savedState();
    request.autoplay = (this._reloadInfo?.paused ?? savedState?.paused) === false;
    request.currentTime = this._reloadInfo?.time ?? savedState?.currentTime ?? 0;
    return request;
  }
  async _reload(paused, time) {
    const src = peek(this._ctx.$state.source);
    this._reloadInfo = { src, paused, time };
    await this.loadSource(src);
  }
  _onNewLocalTracks() {
    this._reload(this._player.isPaused, this._player.currentTime).catch((error) => {
      {
        this._ctx.logger?.errorGroup("[vidstack] cast failed to load new local tracks").labelledLog("Error", error).dispatch();
      }
    });
  }
}

export { GoogleCastProvider };