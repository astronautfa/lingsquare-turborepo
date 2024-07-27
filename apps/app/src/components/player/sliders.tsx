import { useEffect, useState, useMemo, Fragment } from 'react';

import * as Slider from '@radix-ui/react-slider';
import {
  formatTime,
  Thumbnail,
  useActiveTextTrack,
  useChapterOptions,
  useMediaRemote,
  useMediaState,
  useSliderPreview,
} from '@lingsquare/vidstack';

export function Volume() {
  const volume = useMediaState('volume'),
    canSetVolume = useMediaState('canSetVolume'),
    remote = useMediaRemote();

  if (!canSetVolume) return null;

  return (
    <Slider.Root
      className="group relative inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none"
      value={[volume * 100]}
      onValueChange={([value]) => {
        remote.changeVolume(value! / 100);
      }}
    >
      <Slider.Track className="h-[5px] w-full rounded-xl bg-white/30 relative">
        <Slider.Range className="bg-media-brand absolute h-full rounded-xl will-change-[width] bg-blue-500/80" />
      </Slider.Track>
      <Slider.Thumb
        aria-label="Volume"
        className="block h-[12px] w-[12px] rounded-full border border-[#cacaca] bg-white outline-none opacity-0 ring-white/40 transition-opacity group-hocus:opacity-100 focus:opacity-100 focus:ring-2 will-change-[left]"
      />
    </Slider.Root>
  );
}

export interface TimeSliderProps {
  thumbnails?: string;
}

// TODO : chapters should be added
// TODO : flashcards and important parts should be added
// TODO : passing ads and sponsors could be displayed

export function Time({ thumbnails }: TimeSliderProps) {
  const time = useMediaState('currentTime'),
    canSeek = useMediaState('canSeek'),
    duration = useMediaState('duration'),
    seeking = useMediaState('seeking'),
    bufferedEnd = useMediaState('bufferedEnd'),
    bufferedStart = useMediaState('bufferedStart'),
    remote = useMediaRemote(),
    step = (1 / duration) * 100,
    [value, setValue] = useState(0),
    { previewRootRef, previewRef, previewValue } = useSliderPreview({
      clamp: true,
      offset: 6,
      orientation: 'horizontal',
    }),
    previewTime = (previewValue / 100) * duration,
    options = useChapterOptions();

  const $track = useActiveTextTrack('chapters')

  // Keep slider value in-sync with playback.
  useEffect(() => {
    if (seeking) return;
    setValue((time / duration) * 100);
  }, [time, duration]);

  const previewChapter = useMemo(() => {
    let activeIndex = -1;

    if (!$track || !$track.cues) {
      return
    }

    for (let i = $track?.cues.length - 1; i >= 0; i--) {
      const chapter = $track?.cues[i]!;
      if (previewTime >= chapter.startTime && (!chapter.endTime || previewTime < chapter.endTime)) {
        activeIndex = i;
        break;
      }
    }

    try {
      return $track?.cues[activeIndex]!.text
    } catch (error) {
      return null
    }
  }, [$track, previewTime])

  return (
    <Slider.Root
      className="group relative inline-flex h-9 w-full cursor-pointer touch-none select-none items-center outline-none"
      value={[value]}
      disabled={!canSeek}
      step={Number.isFinite(step) ? step : 1}
      ref={previewRootRef}
      onValueChange={([value]) => {
        setValue(value!);
        remote.seeking((value! / 100) * duration);
      }}
      onValueCommit={([value]) => {
        remote.seek((value! / 100) * duration);
      }}
    >

      {options.map(
        ({ cue, label, value, startTimeText, durationText, select, setProgressVar }, i) => (
          <Fragment key={i}>
            {i > 0 && <div className='absolute z-10 bg-[#c6d2f5] h-[4px] w-[3px]' style={{ left: `${cue.startTime * 100 / duration}%` }} />}
            <Slider.Track className="h-[4px] rounded-md bg-white/80 absolute w-full hover:h-[8px] transition-all duration-400" style={{ left: `${cue.startTime * 100 / duration}%`, width: `${(cue.endTime - cue.startTime) * 100 / duration - 0.1}%` }} />
          </Fragment>
        )
      )}

      <>
        <Slider.Range className="bg-blue-300/80 absolute h-[4px] rounded-sm" style={{ left: `${bufferedStart * 100 / duration}%`, width: `${(bufferedEnd - bufferedStart) * 100 / duration - 0.1}%` }} />
        <Slider.Range className="bg-blue-500/80 absolute h-[4px] rounded-sm will-change-[width]" />
      </>

      <Slider.Thumb
        aria-label="Current Time"
        className="block h-[12px] w-[12px] rounded-full border border-[#cacaca] bg-white outline-none opacity-0 ring-white/40 transition-opacity group-focus:opacity-100 focus:opacity-100 focus:ring-2 will-change-[left]"
      />

      {/* Preview */}
      <div
        className="flex flex-col items-center absolute opacity-0 data-[visible]:opacity-100 transition-opacity duration-200 will-change-[left] pointer-events-none"
        ref={previewRef}
      >
        {/* TODO : figure out what thumbnails are and how to create one for youtube videos */}
        {thumbnails ? (
          <Thumbnail.Root
            src={thumbnails}
            time={previewTime}
            className="block rounded-lg mb-1 h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
          >
            <Thumbnail.Img />
          </Thumbnail.Root>
        ) : null}

        <span className="text-[13px] bg-black/70 p-1 rounded">{formatTime(previewTime)} | {previewChapter}</span>
      </div>
    </Slider.Root>
  );
}
