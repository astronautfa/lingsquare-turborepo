/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-playback-rate-options}
 */
export declare function usePlaybackRateOptions({ rates, normalLabel, }?: UsePlaybackRateOptions): PlaybackRateOptions;
export interface UsePlaybackRateOptions {
    rates?: (number | {
        label: string;
        rate: number;
    })[];
    normalLabel?: string | null;
}
export type PlaybackRateOptions = PlaybackRateOption[] & {
    readonly disabled: boolean;
    readonly selectedValue: string | undefined;
};
export interface PlaybackRateOption {
    readonly label: string;
    readonly value: string;
    readonly rate: number;
    readonly selected: boolean;
    select(trigger?: Event): void;
}
