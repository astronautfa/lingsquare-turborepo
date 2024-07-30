import * as React from 'react';
import { type PrimitivePropsWithRef } from '../primitives/nodes.jsx';
export interface RootProps extends PrimitivePropsWithRef<'div'> {
    children?: React.ReactNode;
}
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Root };
export interface TextProps extends PrimitivePropsWithRef<'span'> {
}
declare const Text: React.ForwardRefExoticComponent<Omit<TextProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Text };
