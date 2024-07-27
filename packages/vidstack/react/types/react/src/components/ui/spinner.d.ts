import * as React from 'react';
export interface RootProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>, React.RefAttributes<SVGElement | SVGSVGElement> {
    /**
     * The horizontal (width) and vertical (height) length of the spinner.
     *
     * @defaultValue 96
     */
    size?: number;
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/display/buffering-indicator}
 * @example
 * ```html
 * <Spinner.Root>
 *   <Spinner.Track />
 *   <Spinner.TrackFill />
 * </Spinner>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<SVGSVGElement | SVGElement>>;
export interface TrackProps extends React.PropsWithoutRef<React.SVGProps<SVGCircleElement>>, React.RefAttributes<SVGCircleElement> {
}
declare const Track: React.ForwardRefExoticComponent<Omit<TrackProps, "ref"> & React.RefAttributes<SVGCircleElement>>;
export interface TrackFillProps extends React.PropsWithoutRef<React.SVGProps<SVGCircleElement>>, React.RefAttributes<SVGCircleElement> {
    /**
     * The percentage of the track that should be filled.
     */
    fillPercent?: number;
}
declare const TrackFill: React.ForwardRefExoticComponent<Omit<TrackFillProps, "ref"> & React.RefAttributes<SVGCircleElement>>;
export { Root, Track, TrackFill };
