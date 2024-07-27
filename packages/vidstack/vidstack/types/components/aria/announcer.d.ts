import { Component, State } from 'maverick.js';
import { type DOMEvent } from 'maverick.js/std';
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/display/announcer}
 */
export declare class MediaAnnouncer extends Component<MediaAnnouncerProps, MediaAnnouncerState, MediaAnnouncerEvents> {
    static props: MediaAnnouncerProps;
    static state: State<MediaAnnouncerState>;
    private _media;
    private _initializing;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _watchPaused;
    private _watchFullscreen;
    private _watchPiP;
    private _watchCaptions;
    private _watchVolume;
    private _startedSeekingAt;
    private _seekTimer;
    private _watchSeeking;
    private _translate;
    private _watchLabel;
    private _setLabel;
}
export interface MediaAnnouncerProps {
    translations: Partial<MediaAnnouncerTranslations> | null;
}
export interface MediaAnnouncerState {
    label: string | null;
    busy: boolean;
}
export interface MediaAnnouncerEvents {
    change: DOMEvent<string>;
}
export type MediaAnnouncerWord = 'Play' | 'Pause' | 'Enter Fullscreen' | 'Exit Fullscreen' | 'Enter PiP' | 'Exit PiP' | 'Closed-Captions On' | 'Closed-Captions Off' | 'Mute' | 'Volume' | 'Seek Forward' | 'Seek Backward';
export type MediaAnnouncerTranslations = {
    [word in MediaAnnouncerWord]: string;
};
