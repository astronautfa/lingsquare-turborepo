import * as React from 'react';
import type { TooltipPlacement } from 'vidstack';
export interface DefaultTooltipProps {
    content: string;
    placement?: TooltipPlacement;
    children: React.ReactNode;
}
declare function DefaultTooltip({ content, placement, children }: DefaultTooltipProps): React.JSX.Element;
declare namespace DefaultTooltip {
    var displayName: string;
}
export { DefaultTooltip };
