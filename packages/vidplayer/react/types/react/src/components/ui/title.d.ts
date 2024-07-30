import * as React from 'react';
import { type PrimitivePropsWithRef } from '../primitives/nodes.jsx';
export interface TitleProps extends PrimitivePropsWithRef<'span'> {
}
/**
 * This component is used to load and display the current media title.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/title}
 * @example
 * ```tsx
 * <Title />
 * ```
 */
declare const Title: React.ForwardRefExoticComponent<Omit<TitleProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { Title };
