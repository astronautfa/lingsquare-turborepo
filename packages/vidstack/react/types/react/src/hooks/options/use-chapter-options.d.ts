import type { VTTCue } from 'media-captions';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-chapter-options}
 */
export declare function useChapterOptions(): ChapterOptions;
export type ChapterOptions = ChapterOption[] & {
    readonly selectedValue: string | undefined;
};
export interface ChapterOption {
    readonly cue: VTTCue;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    readonly startTimeText: string;
    readonly durationText: string;
    select(trigger?: Event): void;
    setProgressVar(ref: HTMLElement | null): void;
}
