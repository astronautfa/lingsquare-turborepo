import type { Src } from '../../core/api/src-types.js';
import type { MediaStreamType } from '../../core/api/types.js';
import type { TextTrack } from '../../core/tracks/text/text-track.js';
export declare class GoogleCastMediaInfoBuilder {
    protected _info: chrome.cast.media.MediaInfo;
    constructor(src: Src<string>);
    build(): chrome.cast.media.MediaInfo;
    _setStreamType(streamType: MediaStreamType): this;
    _setTracks(tracks: TextTrack[]): this;
    _setMetadata(title: string, poster: string): this;
    protected _buildCastTrack(track: TextTrack, trackId: number): chrome.cast.media.Track;
}
