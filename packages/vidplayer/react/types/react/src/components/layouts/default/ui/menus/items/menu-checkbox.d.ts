import * as React from 'react';
export interface DefaultMenuCheckboxProps {
    label: string;
    checked?: boolean;
    storageKey?: string;
    defaultChecked?: boolean;
    onChange?(checked: boolean, trigger?: Event): void;
}
declare function DefaultMenuCheckbox({ label, checked, storageKey, defaultChecked, onChange, }: DefaultMenuCheckboxProps): React.JSX.Element;
declare namespace DefaultMenuCheckbox {
    var displayName: string;
}
export { DefaultMenuCheckbox };
