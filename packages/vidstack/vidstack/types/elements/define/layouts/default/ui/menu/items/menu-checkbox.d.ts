import { type ReadSignal } from 'maverick.js';
export declare function DefaultMenuCheckbox({ label, checked, defaultChecked, storageKey, onChange, }: {
    label: string;
    storageKey?: string;
    checked?: ReadSignal<boolean>;
    defaultChecked?: boolean;
    onChange(checked: boolean, trigger?: Event): void;
}): import("lit-html").TemplateResult<1>;
