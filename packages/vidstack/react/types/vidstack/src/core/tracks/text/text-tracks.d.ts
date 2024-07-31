import { DOMEvent } from 'maverick.js/std';
import { List, type ListReadonlyChangeEvent } from '../../../foundation/list/list.js';
import type { MediaStorage } from '../../state/media-storage.js';
import { TextTrackSymbol } from './symbols.js';
import { TextTrack, type TextTrackInit } from './text-track.js';
/**
 * @see {@link https://vidstack.io/docs/player/api/text-tracks}
 */
export declare class TextTrackList extends List<TextTrack, TextTrackListEvents> {
    private _canLoad;
    private _defaults;
    private _storage;
    private _preferredLang;
    /** @internal */
    [TextTrackSymbol._crossOrigin]?: () => string | null;
    constructor();
    get selected(): TextTrack | null;
    get selectedIndex(): number;
    get preferredLang(): string | null;
    set preferredLang(lang: string | null);
    add(init: TextTrackInit | TextTrack, trigger?: Event): this;
    remove(track: TextTrack, trigger?: Event): this | undefined;
    clear(trigger?: Event): this;
    getByKind(kind: TextTrackKind | TextTrackKind[]): TextTrack[];
    /** @internal */
    [TextTrackSymbol._canLoad](): void;
    private _selectTracks;
    private _pendingRemoval;
    private _onTrackModeChangeBind;
    private _onTrackModeChange;
    private _saveCaptionsTrack;
    private _saveLang;
    setStorage(storage: MediaStorage | null): void;
}
export interface TextTrackListEvents {
    add: TextTrackAddEvent;
    remove: TextTrackRemoveEvent;
    'mode-change': TextTrackListModeChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
export interface TextTrackListEvent<T> extends DOMEvent<T> {
    target: TextTrackList;
}
/**
 * Fired when a text track has been added to the list.
 *
 * @detail newTrack
 */
export interface TextTrackAddEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when a text track has been removed from the list.
 *
 * @detail removedTrack
 */
export interface TextTrackRemoveEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when the mode of any text track in the list has changed.
 *
 * @detail track
 */
export interface TextTrackListModeChangeEvent extends TextTrackListEvent<TextTrack> {
}
