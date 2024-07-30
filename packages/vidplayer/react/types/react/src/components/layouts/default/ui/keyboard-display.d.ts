import * as React from 'react';
import { type PrimitivePropsWithRef } from '../../../primitives/nodes.jsx';
import type { DefaultKeyboardDisplayIcons } from '../icons.jsx';
export interface DefaultKeyboardDisplayProps extends Omit<PrimitivePropsWithRef<'div'>, 'disabled'> {
    icons: Partial<DefaultKeyboardDisplayIcons>;
}
declare const DefaultKeyboardDisplay: React.ForwardRefExoticComponent<Omit<DefaultKeyboardDisplayProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { DefaultKeyboardDisplay };
