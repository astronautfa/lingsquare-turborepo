import type { MediaContext } from '../../core/api/media-context.js';
import type { AudioTrack } from '../../core/tracks/audio-tracks.js';
import type { TextTrack } from '../../core/tracks/text/text-track.js';
export declare class GoogleCastTracksManager {
    protected _cast: cast.framework.RemotePlayer;
    protected _ctx: MediaContext;
    protected _onNewLocalTracks?: (() => void) | undefined;
    constructor(_cast: cast.framework.RemotePlayer, _ctx: MediaContext, _onNewLocalTracks?: (() => void) | undefined);
    _setup(): void;
    _getLocalTextTracks(): TextTrack[];
    _getLocalAudioTracks(): AudioTrack[];
    _getRemoteTracks(type?: chrome.cast.media.TrackType): chrome.cast.media.Track[];
    _getRemoteActiveIds(): number[];
    _syncLocalTracks(): void;
    _syncRemoteTracks(event?: Event): void;
    _syncRemoteActiveIds(event?: Event): void;
    protected _editTracksInfo(request: chrome.cast.media.EditTracksInfoRequest): Promise<unknown>;
    protected _findLocalTrack<T extends AudioTrack | TextTrack>(localTracks: T[], remoteTrack: chrome.cast.media.Track): T | undefined;
    protected _findRemoteTrack(remoteTracks: chrome.cast.media.Track[], localTrack: AudioTrack | TextTrack): chrome.cast.media.Track | undefined;
    protected _isMatch(localTrack: AudioTrack | TextTrack, remoteTrack: chrome.cast.media.Track): boolean;
}
