import * as React from 'react';
export type SlotPositions<Name extends string> = `before${Capitalize<Name>}` | Name | `after${Capitalize<Name>}`;
export type Slots<Names extends string> = {
    [slotName in SlotPositions<Names>]?: React.ReactNode;
};
export type PlyrLayoutSlotName = 'airPlayButton' | 'captionsButton' | 'currentTime' | 'download' | 'duration' | 'fastForwardButton' | 'fullscreenButton' | 'liveButton' | 'muteButton' | 'pipButton' | 'playButton' | 'playLargeButton' | 'poster' | 'restartButton' | 'rewindButton' | 'rewindButton' | 'settings' | 'settingsButton' | 'timeSlider' | 'volumeSlider' | 'settingsMenu';
export interface PlyrLayoutSlots extends Slots<PlyrLayoutSlotName> {
}
export declare function slot(name: PlyrLayoutSlotName, defaultValue: React.ReactNode): React.ReactNode;
