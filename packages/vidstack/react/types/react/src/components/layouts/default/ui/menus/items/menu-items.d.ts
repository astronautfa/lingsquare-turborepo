import * as React from 'react';
import type { DefaultLayoutIcon } from '../../../icons.jsx';
export interface DefaultMenuSectionProps {
    label?: string;
    value?: string;
    children: React.ReactNode;
}
declare function DefaultMenuSection({ label, value, children }: DefaultMenuSectionProps): React.JSX.Element;
declare namespace DefaultMenuSection {
    var displayName: string;
}
export { DefaultMenuSection };
export interface DefaultMenuButtonProps {
    label: string;
    hint?: string;
    disabled?: boolean;
    Icon?: DefaultLayoutIcon;
}
declare function DefaultMenuButton({ label, hint, Icon, disabled }: DefaultMenuButtonProps): React.JSX.Element;
declare namespace DefaultMenuButton {
    var displayName: string;
}
export { DefaultMenuButton };
export interface DefaultMenuItemProps {
    label: string;
    children: React.ReactNode;
}
declare function DefaultMenuItem({ label, children }: DefaultMenuItemProps): React.JSX.Element;
declare namespace DefaultMenuItem {
    var displayName: string;
}
export { DefaultMenuItem };
export interface DefaultMenuRadioGroupProps {
    value: string;
    options: {
        label: string;
        value: string;
    }[];
    onChange?(newValue: string): void;
}
declare function DefaultMenuRadioGroup({ value, options, onChange }: DefaultMenuRadioGroupProps): React.JSX.Element;
declare namespace DefaultMenuRadioGroup {
    var displayName: string;
}
export { DefaultMenuRadioGroup };
export declare function createRadioOptions(entries: string[] | Record<string, string>): {
    label: string;
    value: string;
}[];
