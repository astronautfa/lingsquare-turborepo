import { type ReadSignal } from 'maverick.js';
import type { MenuPlacement } from '../../../../../../components/ui/menu/menu-items.js';
import type { TooltipPlacement } from '../../../../../../components/ui/tooltip/tooltip-content.js';
export declare function DefaultChaptersMenu({ placement, tooltip, portal, }: {
    portal?: boolean;
    placement: MenuPlacement | ReadSignal<MenuPlacement | null>;
    tooltip: TooltipPlacement | ReadSignal<TooltipPlacement>;
}): import("lit-html").TemplateResult<1> | null;
