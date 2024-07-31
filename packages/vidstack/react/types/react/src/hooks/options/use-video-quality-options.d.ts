import { type VideoQuality } from 'vidstack';
/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-video-quality-options}
 */
export declare function useVideoQualityOptions({ auto, sort, }?: UseVideoQualityOptions): VideoQualityOptions;
export interface UseVideoQualityOptions {
    /**
     * Whether an auto option should be included. A string can be provided to specify the label.
     */
    auto?: boolean | string;
    /**
     * Specifies how the options should be sorted. The sorting algorithm looks at both the quality
     * resolution and bitrate.
     *
     * - Ascending: 480p, 720p, 720p (higher bitrate), 1080p
     * - Descending: 1080p, 720p (higher bitrate), 720p, 480p
     *
     * @default 'descending'
     */
    sort?: 'ascending' | 'descending';
}
export type VideoQualityOptions = VideoQualityOption[] & {
    readonly disabled: boolean;
    readonly selectedQuality: VideoQuality | null;
    readonly selectedValue: string;
};
export interface VideoQualityOption {
    readonly quality: VideoQuality | null;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    readonly autoSelected: boolean;
    readonly bitrateText: string | null;
    select(trigger?: Event): void;
}
