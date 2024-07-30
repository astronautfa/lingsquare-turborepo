import type { VTTCue } from 'media-captions';
import type { TextTrack } from 'vidstack';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-active-text-cues}
 */
export declare function useActiveTextCues(track: TextTrack | null): VTTCue[];
