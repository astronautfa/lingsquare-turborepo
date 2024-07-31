import { type TemplateResult } from 'lit-html';
import { type ReadSignal } from 'maverick.js';
import type { RadioGroupChangeEvent, RadioOption } from '../../../../../../../components/index.js';
export declare function DefaultMenuSection({ label, value, children }: {
    label?: string | undefined;
    value?: string | undefined;
    children: any;
}): TemplateResult<1>;
export declare function DefaultMenuItem({ label, children }: {
    label: any;
    children: any;
}): TemplateResult<1>;
export declare function DefaultMenuButton({ label, icon, hint, }: {
    label: ReadSignal<string>;
    icon?: string;
    hint?: ReadSignal<string> | null;
}): TemplateResult<1>;
export declare function DefaultRadioGroup({ value, options, hideLabel, children, onChange, }: {
    value?: string | ReadSignal<string> | null;
    options: RadioOption[] | ReadSignal<RadioOption[]>;
    hideLabel?: boolean;
    children?: TemplateResult | ((option: RadioOption) => TemplateResult | null) | null;
    onChange?: ((event: RadioGroupChangeEvent) => void) | null;
}): TemplateResult<1>;
export declare function createRadioOptions(entries: string[] | Record<string, string>): RadioOption[];
