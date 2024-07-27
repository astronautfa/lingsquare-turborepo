import * as React from 'react';
import { type PrimitivePropsWithRef } from '../primitives/nodes.jsx';
export interface ChapterTitleProps extends PrimitivePropsWithRef<'span'> {
    /**
     * Specify text to be displayed when no chapter title is available.
     */
    defaultText?: string;
}
/**
 * This component is used to load and display the current chapter title based on the text tracks
 * provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/chapter-title}
 * @example
 * ```tsx
 * <ChapterTitle />
 * ```
 */
declare const ChapterTitle: React.ForwardRefExoticComponent<Omit<ChapterTitleProps, "ref"> & React.RefAttributes<HTMLElement>>;
export { ChapterTitle };
