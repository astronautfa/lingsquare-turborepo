import { type ReadSignal } from 'maverick.js';
import type { MenuPlacement } from '../../../../../../components/ui/menu/menu-items.js';
import type { TooltipPlacement } from '../../../../../../components/ui/tooltip/tooltip-content.js';
export declare function DefaultSettingsMenu({ placement, portal, tooltip, }: {
    portal?: boolean;
    tooltip: TooltipPlacement | ReadSignal<TooltipPlacement>;
    placement: MenuPlacement | ReadSignal<MenuPlacement | null>;
}): any;
