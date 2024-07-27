import * as React from 'react';
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}
declare const Slot: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
declare const Slottable: ({ children }: {
    children: React.ReactNode;
}) => React.JSX.Element;
declare const Root: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
export { Slot, Slottable, Root };
export type { SlotProps };
