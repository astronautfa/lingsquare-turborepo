import * as React from 'react';
import * as Menu from '../../../../ui/menu.jsx';
import type * as Tooltip from '../../../../ui/tooltip.jsx';
import { type DefaultLayoutMenuSlotName, type Slots } from '../../slots.jsx';
export interface DefaultMediaMenuProps {
    tooltip: Tooltip.ContentProps['placement'];
    placement: Menu.ContentProps['placement'];
    portalClass?: string;
    slots?: Slots<DefaultLayoutMenuSlotName>;
}
declare function DefaultSettingsMenu({ tooltip, placement, portalClass, slots, }: DefaultMediaMenuProps): React.JSX.Element;
declare namespace DefaultSettingsMenu {
    var displayName: string;
}
export { DefaultSettingsMenu };
