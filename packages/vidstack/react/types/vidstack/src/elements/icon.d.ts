import type { DirectiveResult } from 'lit-html/directive.js';
import { type ReadSignal } from 'maverick.js';
export declare function Icon({ name, class: _class, state, paths, viewBox }: IconProps): import("lit-html").TemplateResult<1>;
export interface IconProps {
    name?: string;
    class?: string;
    state?: string;
    viewBox?: string;
    paths: string | ReadSignal<string> | ReadSignal<DirectiveResult>;
}
