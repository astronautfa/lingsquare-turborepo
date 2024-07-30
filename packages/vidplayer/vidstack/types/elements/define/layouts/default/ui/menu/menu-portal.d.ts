import { type TemplateResult } from 'lit-html';
import { type ReadSignal } from 'maverick.js';
export declare function MenuPortal(container: ReadSignal<string | HTMLElement | null>, template: TemplateResult): TemplateResult<1>;
export declare function createMenuContainer(rootSelector: string | HTMLElement | null, className: string, isSmallLayout: ReadSignal<boolean>): HTMLDivElement;
