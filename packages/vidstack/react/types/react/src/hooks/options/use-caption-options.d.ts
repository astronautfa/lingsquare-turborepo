import { type TextTrack } from 'vidstack';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-caption-options}
 */
export declare function useCaptionOptions({ off }?: UseCaptionOptions): CaptionOptions;
export interface UseCaptionOptions {
    /**
     * Whether an option should be included for turning off all captions. A string can be provided
     * to specify the label.
     */
    off?: boolean | string;
}
export type CaptionOptions = CaptionOption[] & {
    readonly disabled: boolean;
    readonly selectedTrack: TextTrack | null;
    readonly selectedValue: string;
};
export interface CaptionOption {
    readonly track: TextTrack | null;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    select(trigger?: Event): void;
}
