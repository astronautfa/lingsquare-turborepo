/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-audio-gain-options}
 */
export declare function useAudioGainOptions({ gains, disabledLabel, }?: UseAudioGainOptions): AudioGainOptions;
export interface UseAudioGainOptions {
    gains?: (number | {
        label: string;
        gain: number;
    })[];
    disabledLabel?: string | null;
}
export type AudioGainOptions = AudioGainOption[] & {
    readonly disabled: boolean;
    readonly selectedValue: string | undefined;
};
export interface AudioGainOption {
    readonly label: string;
    readonly value: string;
    readonly gain: number;
    readonly selected: boolean;
    select(trigger?: Event): void;
}
