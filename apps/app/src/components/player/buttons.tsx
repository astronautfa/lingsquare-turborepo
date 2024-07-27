import { Tooltip as ShadcnTooltip, TooltipTrigger, TooltipContent } from '@ui/components/tooltip';

import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  useMediaState,
} from '@lingsquare/vidstack';

import {
  Minimize as FullscreenExitIcon,
  Maximize as FullscreenIcon,
  VolumeX as MuteIcon,
  PauseIcon,
  PictureInPictureIcon as PictureInPictureExitIcon,
  PictureInPicture2 as PictureInPictureIcon,
  PlayIcon,
  SubtitlesIcon,
  Volume2 as VolumeHighIcon,
  Volume1 as VolumeLowIcon,
} from 'lucide-react';

// import * as Popover from '@radix-ui/react-popover';

import { RxMixerHorizontal } from 'react-icons/rx';
import ChaptersMenu from './chapters-menu';
import { Button } from '@ui/components/button';
import { PopoverContent, Popover as ShadcnPopover, PopoverTrigger } from '@ui/components/popover';

// TODO : fix tooltip style and add shadcn

// TODO : add next and previous subtitle seeking

// TODO : sort out button disable on player not loaded player.current!.subscribe('canPlay)

export const buttonClass =
  'group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 focus-visible:ring-4 aria-disabled:hidden';

export const tooltipClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden';

export function Play() {
  const isPaused = useMediaState('paused');
  return (
    <ShadcnTooltip>
      <TooltipTrigger>
        <Button size={"icon"} variant={"ghost"}>
          <PlayButton className={buttonClass} >
            {isPaused ? (
              <PlayIcon className="w-7 h-7 translate-x-px" />
            ) : (
              <PauseIcon className="w-7 h-7" />
            )}
          </PlayButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isPaused ? 'Play' : 'Pause'}</p>
      </TooltipContent>
    </ShadcnTooltip>
  );
}

export function Mute() {
  const volume = useMediaState('volume'),
    isMuted = useMediaState('muted');
  return (
    <ShadcnTooltip>
      <TooltipTrigger>
        <Button size={"icon"} variant={"ghost"}>
          <MuteButton className={buttonClass}>
            {isMuted || volume == 0 ? (
              <MuteIcon className="w-7 h-7" />
            ) : volume < 0.5 ? (
              <VolumeLowIcon className="w-7 h-7" />
            ) : (
              <VolumeHighIcon className="w-7 h-7" />
            )}
          </MuteButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isMuted ? 'Unmute' : 'Mute'}</p>
      </TooltipContent>
    </ShadcnTooltip>
  );
}

export function Caption() {
  const track = useMediaState('textTrack'),
    isOn = track && isTrackCaptionKind(track);
  return (
    <ShadcnPopover>
      <ShadcnTooltip delayDuration={100}>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <CaptionButton className={buttonClass}>
                <SubtitlesIcon className={`w-7 h-7 ${!isOn ? 'text-white/60' : ''}`} />
              </CaptionButton>
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent
          side="top"
          className="bg-secondary font-semibold text-foreground"
        >
          <p>{isOn ? 'Closed-Captions Off' : 'Closed-Captions On'}</p>
        </TooltipContent>
      </ShadcnTooltip>
      <PopoverContent side="top">
      </PopoverContent>
    </ShadcnPopover>
  );
}

// TODO : when picture in picture remove the blank element from page
export function PIP() {
  const isActive = useMediaState('pictureInPicture');
  return (
    <ShadcnTooltip>
      <TooltipTrigger>
        <Button size={"icon"} variant={"ghost"}>
          <PIPButton className={buttonClass}>
            {isActive ? (
              <PictureInPictureExitIcon className="w-7 h-7" />
            ) : (
              <PictureInPictureIcon className="w-7 h-7" />
            )}
          </PIPButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isActive ? 'Exit PIP' : 'Enter PIP'}</p>
      </TooltipContent>
    </ShadcnTooltip>
  );
}

// TODO : figure out how this is working, Theater mode and reader mode could be made with the same concept

export function Fullscreen() {
  const isActive = useMediaState('fullscreen');
  return (
    <ShadcnTooltip>
      <TooltipTrigger>
        <Button size={"icon"} variant={"ghost"}>
          <FullscreenButton className={buttonClass}>
            {isActive ? (
              <FullscreenExitIcon className="w-7 h-7" />
            ) : (
              <FullscreenIcon className="w-7 h-7" />
            )}
          </FullscreenButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}</p>
      </TooltipContent>
    </ShadcnTooltip>
  );
}

export function Chapters({
  thumbnails
}: {
  thumbnails: string | undefined
}) {
  return (
    <ShadcnPopover>
      <ShadcnTooltip delayDuration={100}>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <RxMixerHorizontal className="w-7 h-7" />
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent
          side="top"
          className="bg-secondary font-semibold text-foreground"
        >
          <p>Chapters</p>
        </TooltipContent>
      </ShadcnTooltip>
      <PopoverContent side="top">
        <ChaptersMenu thumbnails={thumbnails} />
      </PopoverContent>
    </ShadcnPopover>
  )
}
