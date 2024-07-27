import * as React from 'react';
import { type DefaultLayoutMenuSlotName, type Slots } from '../../slots.jsx';
interface DefaultPlaybackMenuProps {
    slots?: Slots<DefaultLayoutMenuSlotName>;
}
declare function DefaultPlaybackMenu({ slots }: DefaultPlaybackMenuProps): React.JSX.Element;
declare namespace DefaultPlaybackMenu {
    var displayName: string;
}
export { DefaultPlaybackMenu };
