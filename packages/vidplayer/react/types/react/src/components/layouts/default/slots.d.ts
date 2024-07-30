import * as React from 'react';
export type SlotPositions<Name extends string> = `before${Capitalize<Name>}` | Name | `after${Capitalize<Name>}`;
export type Slots<Names extends string> = {
    [slotName in SlotPositions<Names>]?: React.ReactNode;
};
export type DefaultLayoutSlotName = 'bufferingIndicator' | 'captionButton' | 'captions' | 'title' | 'chapterTitle' | 'currentTime' | 'endTime' | 'fullscreenButton' | 'liveButton' | 'livePlayButton' | 'muteButton' | 'pipButton' | 'airPlayButton' | 'googleCastButton' | 'downloadButton' | 'playButton' | 'loadButton' | 'seekBackwardButton' | 'seekForwardButton' | 'startDuration' | 'timeSlider' | 'volumeSlider' | 'topControlsGroupStart' | 'topControlsGroupCenter' | 'topControlsGroupEnd' | 'centerControlsGroupStart' | 'centerControlsGroupCenter' | 'centerControlsGroupEnd' | DefaultLayoutMenuSlotName;
export type DefaultLayoutMenuSlotName = 'chaptersMenu' | 'settingsMenu'
/** @deprecated - use `settingsMenuItemsStart` */
 | 'settingsMenuStartItems'
/** @deprecated - use `settingsMenuItemsEnd` */
 | 'settingsMenuEndItems' | 'settingsMenuItemsStart' | 'settingsMenuItemsEnd' | 'playbackMenuItemsStart' | 'playbackMenuItemsEnd' | 'playbackMenuLoop' | 'accessibilityMenuItemsStart' | 'accessibilityMenuItemsEnd' | 'audioMenuItemsStart' | 'audioMenuItemsEnd' | 'captionsMenuItemsStart' | 'captionsMenuItemsEnd';
export interface DefaultLayoutSlots extends Slots<DefaultLayoutSlotName> {
}
export interface DefaultAudioLayoutSlots extends DefaultLayoutSlots {
}
export interface DefaultVideoLayoutSlots extends DefaultLayoutSlots {
    smallLayout?: DefaultLayoutSlots;
    largeLayout?: DefaultLayoutSlots;
}
export declare function useDefaultAudioLayoutSlots(): DefaultAudioLayoutSlots | undefined;
export declare function useDefaultVideoLayoutSlots(): DefaultVideoLayoutSlots | undefined;
export declare function slot<T>(slots: T | undefined, name: keyof T, defaultValue: React.ReactNode): React.ReactNode;
