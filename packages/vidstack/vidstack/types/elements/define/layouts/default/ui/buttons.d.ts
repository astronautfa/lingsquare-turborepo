import { type RefOrCallback } from 'lit-html/directives/ref.js';
import type { TooltipPlacement } from '../../../../../components/ui/tooltip/tooltip-content.js';
export declare function DefaultAirPlayButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultGoogleCastButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultPlayButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultMuteButton({ tooltip, ref, }: {
    tooltip: TooltipPlacement;
    ref?: RefOrCallback;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultCaptionButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultPIPButton(): import("lit-html").TemplateResult<1>;
export declare function DefaultFullscreenButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultSeekButton({ backward, tooltip, }: {
    backward?: boolean;
    tooltip: TooltipPlacement;
}): import("lit-html").TemplateResult<1>;
export declare function DefaultLiveButton(): import("lit-html").TemplateResult<1> | null;
export declare function DefaultDownloadButton(): any;
