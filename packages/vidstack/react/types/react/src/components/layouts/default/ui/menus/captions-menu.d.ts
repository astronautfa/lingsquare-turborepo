import * as React from 'react';
import { type DefaultLayoutMenuSlotName, type Slots } from '../../slots.jsx';
interface DefaultCaptionMenuProps {
    slots?: Slots<DefaultLayoutMenuSlotName>;
}
declare function DefaultCaptionMenu({ slots }: DefaultCaptionMenuProps): React.JSX.Element | null;
declare namespace DefaultCaptionMenu {
    var displayName: string;
}
export { DefaultCaptionMenu };
