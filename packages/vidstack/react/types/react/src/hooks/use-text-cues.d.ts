import type { VTTCue } from 'media-captions';
import type { TextTrack } from 'vidstack';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-text-cues}
 */
export declare function useTextCues(track: TextTrack | null): VTTCue[];
