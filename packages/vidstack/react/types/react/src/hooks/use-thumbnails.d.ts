import { type MediaCrossOrigin, type ThumbnailImage, type ThumbnailSrc } from 'vidstack';
/**
 * The function will return the resolved thumbnail images given a thumbnail resource. It's safe to
 * call this hook in multiple places with the same `src` argument as work is de-duped and cached
 * internally.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-thumbnails}
 */
export declare function useThumbnails(src: ThumbnailSrc, crossOrigin?: MediaCrossOrigin | null): ThumbnailImage[];
/**
 * Returns the active thumbnail image based on the given time.
 *
 * @param thumbnails - thumbnail images.
 * @param time - the current time to determine which thumbnail is active.
 */
export declare function useActiveThumbnail(thumbnails: ThumbnailImage[], time: number): ThumbnailImage | null;
