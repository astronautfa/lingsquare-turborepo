import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import type { VTTCue } from 'media-captions';
import { SliderChaptersInstance, SliderThumbnailInstance, SliderVideoInstance, TimeSliderInstance } from '../../primitives/instances.js';
import { type PrimitivePropsWithRef } from '../../primitives/nodes.jsx';
import * as ThumbnailBase from '../thumbnail.jsx';
export interface RootProps extends ReactElementProps<TimeSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<TimeSliderInstance>;
}
/**
 * Versatile and user-friendly input time control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the current playback time within the range 0 to seekable end.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/time-slider}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Track>
 *     <TimeSlider.TrackFill />
 *     <TimeSlider.Progress />
 *   </TimeSlider.Track>
 *   <TimeSlider.Thumb />
 * </TimeSlider.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<TimeSliderInstance>>;
export interface ChaptersProps extends Omit<ReactElementProps<SliderChaptersInstance>, 'children'> {
    children: (cues: VTTCue[], forwardRef: React.RefCallback<HTMLElement>) => React.ReactNode;
}
/**
 * Used to create predefined sections within a time slider interface based on the currently
 * active chapters text track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider-chapters}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Chapters>
 *     {(cues, forwardRef) =>
 *       cues.map((cue) => (
 *         <div key={cue.startTime} ref={forwardRef}>
 *           <TimeSlider.Track>
 *             <TimeSlider.TrackFill />
 *             <TimeSlider.Progress />
 *           </TimeSlider.Track>
 *        </div>
 *     ))}
 *   </TimeSlider.Chapters>
 * </TimeSlider.Root>
 * ```
 */
declare const Chapters: React.ForwardRefExoticComponent<ChaptersProps & React.RefAttributes<HTMLDivElement>>;
export interface ChapterTitleProps extends PrimitivePropsWithRef<'div'> {
}
/**
 * Used to display the active cue text based on the slider value and preview value.
 *
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Chapter />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const ChapterTitle: React.ForwardRefExoticComponent<Omit<ChapterTitleProps, "ref"> & React.RefAttributes<HTMLElement>>;
export interface ProgressProps extends PrimitivePropsWithRef<'div'> {
}
/**
 * Visual element inside the slider that serves as a horizontal or vertical bar, providing a
 * visual reference for the range of playback that has buffered/loaded.
 *
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Track>
 *     <TimeSlider.Progress />
 *   </TimeSlider.Track>
 * </TimeSlider.Root>
 * ```
 */
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & React.RefAttributes<HTMLElement>>;
export interface ThumbnailProps extends ReactElementProps<SliderThumbnailInstance, HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
export type ThumbnailImgProps = ThumbnailBase.ImgProps;
declare const Thumbnail: {
    readonly Root: React.ForwardRefExoticComponent<Omit<ThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;
    readonly Img: React.ForwardRefExoticComponent<Omit<ThumbnailBase.ImgProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
};
export interface VideoProps extends ReactElementProps<SliderVideoInstance, HTMLVideoElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLVideoElement>;
}
/**
 * Used to load a low-resolution video to be displayed when the user is hovering over or dragging
 * the time slider. The preview video will automatically be updated to be in-sync with the current
 * preview position, so ensure it has the same length as the original media (i.e., same duration).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-video}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Video src="preview.mp4" />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const Video: React.ForwardRefExoticComponent<Omit<VideoProps, "ref"> & React.RefAttributes<HTMLVideoElement>>;
export interface VideoProviderProps {
    instance: SliderVideoInstance;
    children?: React.ReactNode;
}
export * from './slider.jsx';
export { Root, Progress, Thumbnail, Video, Chapters, ChapterTitle };
