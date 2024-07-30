import { type Dispose } from 'maverick.js';
import type { VTTCue } from 'media-captions';
import type { TextTrack } from './text-track.js';
import type { TextTrackList } from './text-tracks.js';
export declare function findActiveCue(cues: readonly VTTCue[], time: number): VTTCue | null;
export declare function isCueActive(cue: VTTCue, time: number): boolean;
export declare function watchActiveTextTrack(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], onChange: (track: TextTrack | null) => void): Dispose;
export declare function watchCueTextChange(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], callback: (title: string) => void): void;
