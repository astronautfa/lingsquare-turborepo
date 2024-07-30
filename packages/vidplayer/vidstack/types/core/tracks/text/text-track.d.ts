import { DOMEvent, EventsTarget } from 'maverick.js/std';
import type { CaptionsFileFormat, CaptionsParserFactory, VTTCue, VTTHeaderMetadata, VTTRegion } from 'media-captions';
import { TextTrackSymbol } from './symbols.js';
/**
 * - 0: Not Loading
 * - 1: Loading
 * - 2: Ready
 * - 3: Error
 */
export type TextTrackReadyState = 0 | 1 | 2 | 3;
export interface VTTCueInit extends Omit<Partial<VTTCue>, 'startTime' | 'endTime' | 'text'>, Pick<VTTCue, 'startTime' | 'endTime' | 'text'> {
}
export interface VTTRegionInit extends Omit<Partial<VTTRegion>, 'id'>, Pick<VTTRegion, 'id'> {
}
export interface VTTContent {
    cues?: VTTCueInit[];
    regions?: VTTRegionInit[];
}
export declare class TextTrack extends EventsTarget<TextTrackEvents> {
    static createId(track: TextTrack | TextTrackInit): string;
    readonly src?: string;
    readonly content?: TextTrackInit['content'];
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    readonly encoding?: string;
    readonly id = "";
    readonly label = "";
    readonly language = "";
    readonly kind: TextTrackKind;
    readonly default = false;
    private _canLoad;
    private _currentTime;
    private _mode;
    private _metadata;
    private _regions;
    private _cues;
    private _activeCues;
    /** @internal */
    [TextTrackSymbol._readyState]: TextTrackReadyState;
    /** @internal */
    [TextTrackSymbol._crossOrigin]?: () => string | null;
    /** @internal */
    [TextTrackSymbol._onModeChange]: (() => void) | null;
    /** @internal */
    [TextTrackSymbol._native]: {
        default?: boolean;
        managed?: boolean;
        track: {
            mode: TextTrackMode;
            addCue(cue: any): void;
            removeCue(cue: any): void;
        };
        remove?(): void;
    } | null;
    get metadata(): Readonly<VTTHeaderMetadata>;
    get regions(): ReadonlyArray<VTTRegion>;
    get cues(): ReadonlyArray<VTTCue>;
    get activeCues(): ReadonlyArray<VTTCue>;
    /**
     * - 0: Not Loading
     * - 1: Loading
     * - 2: Ready
     * - 3: Error
     */
    get readyState(): TextTrackReadyState;
    get mode(): TextTrackMode;
    set mode(mode: TextTrackMode);
    constructor(init: TextTrackInit);
    addCue(cue: VTTCue, trigger?: Event): void;
    removeCue(cue: VTTCue, trigger?: Event): void;
    setMode(mode: TextTrackMode, trigger?: Event): void;
    /** @internal */
    [TextTrackSymbol._updateActiveCues](currentTime: number, trigger?: Event): void;
    /** @internal */
    [TextTrackSymbol._canLoad](): void;
    private _parseContent;
    private _load;
    private _ready;
    private _error;
    private _parseJSON;
    private _activeCuesChanged;
}
export interface TextTrackInit {
    /**
     * A unique identifier.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/id}
     */
    id?: string;
    /**
     * URL of the text track resource. This attribute must be specified and its URL value must have
     * the same origin as the document — unless the <audio> or <video> parent element of the track
     * element has a `crossorigin` attribute.
     */
    readonly src?: string;
    /**
     * Used to directly pass in text track file contents.
     */
    readonly content?: string | VTTContent;
    /**
     * The captions file format to be parsed or a custom parser factory (functions that returns a
     * captions parser). Supported types include: 'vtt', 'srt', 'ssa', 'ass', and 'json'.
     *
     * @defaultValue 'vtt'
     */
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    /**
     * The text encoding type to be used when decoding data bytes to text.
     *
     * @defaultValue 'utf-8'
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings}
     *
     */
    readonly encoding?: string;
    /**
     * Indicates that the track should be enabled unless the user's preferences indicate that
     * another track is more appropriate. This may only be used on one track element per media
     * element.
     *
     * @defaultValue false
     */
    default?: boolean;
    /**
     * The kind of text track this object represents. This decides how the track will be handled
     * by the player.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind}
     */
    readonly kind: TextTrackKind;
    /**
     * A human-readable label for the text track. This will be displayed to the user.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/label}
     */
    readonly label?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly language?: string;
}
export interface TextTrackEvents {
    'load-start': TextTrackLoadStartEvent;
    load: TextTrackLoadEvent;
    error: TextTrackErrorEvent;
    'add-cue': TextTrackAddCueEvent;
    'remove-cue': TextTrackRemoveCueEvent;
    'cue-change': TextTrackCueChangeEvent;
    'mode-change': TextTrackModeChangeEvent;
}
export interface TextTrackEvent<T> extends DOMEvent<T> {
    target: TextTrack;
}
/**
 * Fired when the text track begins the loading/parsing process.
 */
export interface TextTrackLoadStartEvent extends TextTrackEvent<void> {
}
/**
 * Fired when the text track has finished loading/parsing.
 */
export interface TextTrackLoadEvent extends TextTrackEvent<void> {
}
/**
 * Fired when loading or parsing the text track fails.
 */
export interface TextTrackErrorEvent extends TextTrackEvent<Error> {
}
/**
 * Fired when a cue is added to the text track.
 */
export interface TextTrackAddCueEvent extends TextTrackEvent<VTTCue> {
}
/**
 * Fired when a cue is removed from the text track.
 */
export interface TextTrackRemoveCueEvent extends TextTrackEvent<VTTCue> {
}
/**
 * Fired when the active cues for the current text track have changed.
 */
export interface TextTrackCueChangeEvent extends TextTrackEvent<void> {
}
/**
 * Fired when the text track mode (showing/hidden/disabled) has changed.
 */
export interface TextTrackModeChangeEvent extends TextTrackEvent<TextTrack> {
}
export declare function isTrackCaptionKind(track: TextTrack): boolean;
export declare function parseJSONCaptionsFile(json: string | VTTContent, Cue: typeof VTTCue, Region?: typeof VTTRegion): {
    regions: VTTRegion[];
    cues: VTTCue[];
};
