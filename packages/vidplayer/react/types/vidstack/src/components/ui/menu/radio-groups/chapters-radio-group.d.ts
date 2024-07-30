import { Component } from 'maverick.js';
import { DOMEvent } from 'maverick.js/std';
import type { VTTCue } from 'media-captions';
import type { TextTrack } from '../../../../core/tracks/text/text-track.js';
import type { ThumbnailSrc } from '../../thumbnails/thumbnail-loader.js';
import type { RadioOption } from '../radio/radio.js';
/**
 * This component manages media chapters inside of a radio group.
 *
 * @attr data-thumbnails - Whether thumbnails are available.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/chapters-radio-group}
 */
export declare class ChaptersRadioGroup extends Component<ChapterRadioGroupProps, {}, ChaptersRadioGroupEvents> {
    static props: ChapterRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    private _track;
    private _cues;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    getOptions(): ChaptersRadioOption[];
    private _onOpen;
    protected onConnect(el: HTMLElement): void;
    protected _watchTrack(): (() => void) | undefined;
    protected _onCuesChange(track: TextTrack): void;
    private _watchCurrentTime;
    private _watchControllerDisabled;
    private _onValueChange;
}
export interface ChapterRadioGroupProps {
    /**
     * The thumbnails resource.
     *
     * @see {@link https://www.vidstack.io/docs/player/core-concepts/loading#thumbnails}
     */
    thumbnails: ThumbnailSrc;
}
export interface ChaptersRadioGroupEvents {
    change: ChaptersRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail cue
 */
export interface ChaptersRadioGroupChangeEvent extends DOMEvent<VTTCue> {
    target: ChaptersRadioGroup;
}
export interface ChaptersRadioOption extends RadioOption {
    cue: VTTCue;
    startTime: string;
    duration: string;
}
