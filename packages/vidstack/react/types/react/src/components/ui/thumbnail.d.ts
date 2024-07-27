import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { ThumbnailInstance } from '../primitives/instances.js';
import { type PrimitivePropsWithRef } from '../primitives/nodes.jsx';
export interface RootProps extends ReactElementProps<ThumbnailInstance, HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 * @example
 * ```tsx
 * <Thumbnail.Root src="thumbnails.vtt" time={10} >
 *   <Thumbnail.Img />
 * </Thumbnail.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<HTMLElement>>;
export interface ImgProps extends PrimitivePropsWithRef<'img'> {
    children?: React.ReactNode;
}
declare const Img: React.ForwardRefExoticComponent<Omit<ImgProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
export { Root, Img };
