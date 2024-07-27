import * as React from 'react';
import { type DefaultLayoutMenuSlotName, type Slots } from '../../slots.jsx';
interface DefaultAccessibilityMenuProps {
    slots?: Slots<DefaultLayoutMenuSlotName>;
}
declare function DefaultAccessibilityMenu({ slots }: DefaultAccessibilityMenuProps): React.JSX.Element;
declare namespace DefaultAccessibilityMenu {
    var displayName: string;
}
export { DefaultAccessibilityMenu };
