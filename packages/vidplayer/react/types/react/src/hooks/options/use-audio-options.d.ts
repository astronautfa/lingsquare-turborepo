import { type AudioTrack } from 'vidstack';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-audio-options}
 */
export declare function useAudioOptions(): AudioOptions;
export type AudioOptions = AudioOption[] & {
    readonly disabled: boolean;
    readonly selectedTrack: AudioTrack | null;
    readonly selectedValue: string | undefined;
};
export interface AudioOption {
    readonly track: AudioTrack;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    select(trigger?: Event): void;
}
