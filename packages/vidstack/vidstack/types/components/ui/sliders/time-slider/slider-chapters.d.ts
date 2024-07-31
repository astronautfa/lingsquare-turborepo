import { Component } from 'maverick.js';
import type { VTTCue } from 'media-captions';
/**
 * Used to create predefined sections within a time slider interface based on the currently
 * active chapters text track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-chapters}
 */
export declare class SliderChapters extends Component<SliderChaptersProps, {}, SliderChaptersCSSVars> {
    static props: SliderChaptersProps;
    private _media;
    private _sliderState;
    private _updateScope?;
    private _titleRef;
    private _refs;
    private _$track;
    private _$cues;
    private _activeIndex;
    private _activePointerIndex;
    private _bufferedIndex;
    get cues(): VTTCue[];
    get activeCue(): VTTCue | null;
    get activePointerCue(): VTTCue | null;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(): void;
    protected onDestroy(): void;
    setRefs(refs: HTMLElement[]): void;
    private _setTrack;
    private _reset;
    private _watch;
    private _watchUpdates;
    private _watchContainerWidths;
    private _watchFillPercent;
    private _watchPointerPercent;
    private _updateFillPercents;
    private _updateFillPercent;
    private _findActiveChapterIndex;
    private _watchBufferedPercent;
    private _updateBufferedPercent;
    private _bufferedPercent;
    private _calcMediaBufferedPercent;
    private _getEndTime;
    private _calcPercent;
    private _fillGaps;
    private _watchSource;
    private _onTrackChange;
    private _watchMediaDuration;
    private _onCuesChange;
    private _onChapterTitleChange;
    private _findParentSlider;
    private _findChapterTitleRef;
}
export interface SliderChaptersProps {
    /**
     * Whether chapters should be disabled.
     */
    disabled: boolean;
}
export interface SliderChaptersCSSVars {
    /**
     * The percentage of the chapter that is filled.
     */
    readonly 'chapter-fill': string;
    /**
     * The percentage of the chapter that has been buffered.
     */
    readonly 'chapter-progress': string;
}
