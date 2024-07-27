import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/tooltip"

import { useCaptionOptions, useMediaPlayer } from '@lingsquare/vidstack';
import { CheckCircle, CircleIcon, SubtitlesIcon } from 'lucide-react';

import { buttonClass, tooltipClass } from './buttons';
import { Button } from '@ui/components/button';

export interface MenuProps {
  side?: DropdownMenu.MenuContentProps['side'];
  align?: DropdownMenu.MenuContentProps['align'];
  offset?: DropdownMenu.MenuContentProps['sideOffset'];
}

// We can reuse this class for other menus.
const menuClass =
  'animate-out z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none fade-out slide-in-from-bottom-4 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-out-to-bottom-2 flex max-h-[400px] flex-col p-2.5 font-sans text-md outline-none backdrop-blur-sm duration-300';

export function Captions({
  side = 'top',
  align = 'center',
  offset = 0,
}: MenuProps) {
  const player = useMediaPlayer(),
    options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? 'Off';
  return (
    <DropdownMenu.Root>
      <ShadcnTooltip>
        <TooltipTrigger>
          <DropdownMenu.Trigger
            aria-label="Settings"
            className={buttonClass}
            disabled={options.disabled}
          >
            <Button size={"icon"} variant={"ghost"}>
              <SubtitlesIcon className="w-7 h-7" />
            </Button>
          </DropdownMenu.Trigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Captions</p>
        </TooltipContent>
      </ShadcnTooltip>
      <DropdownMenu.Content
        className={menuClass}
        side={side}
        align={align}
        sideOffset={offset}
        collisionBoundary={player?.el}
      >
        <DropdownMenu.Label className="flex items-center w-full px-1.5 mb-2 font-medium text-[15px]">
          <SubtitlesIcon className="w-5 h-5 mr-1.5 translate-y-px" />
          Captions
          <span className="ml-auto text-sm text-slate-900">{hint}</span>
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          aria-label="Captions"
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function Radio({ children, ...props }: DropdownMenu.MenuRadioItemProps) {
  return (
    <DropdownMenu.RadioItem
      className="ring-media-focus group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none hocus:bg-white/10 data-[focus]:ring-[3px] text-sm"
      {...props}
    >
      <CircleIcon className="h-4 w-4 text-slate-700 group-data-[state=checked]:hidden" />
      <CheckCircle className="text-media-brand hidden h-4 w-4 group-data-[state=checked]:block" />
      <span className="ml-2">{children}</span>
    </DropdownMenu.RadioItem>
  );
}
