import * as React from 'react';
import { type PrimitivePropsWithRef } from '../../primitives/nodes.jsx';
import { type PlyrLayoutProps } from './props.js';
export interface PlyrLayoutElementProps extends PlyrLayoutProps, PrimitivePropsWithRef<'div'> {
}
declare const PlyrLayout: React.ForwardRefExoticComponent<Omit<PlyrLayoutElementProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { PlyrLayout };
declare function PlyrAudioLayout(): React.JSX.Element;
declare namespace PlyrAudioLayout {
    var displayName: string;
}
export { PlyrAudioLayout };
declare function PlyrVideoLayout(): React.JSX.Element;
declare namespace PlyrVideoLayout {
    var displayName: string;
}
export { PlyrVideoLayout };
