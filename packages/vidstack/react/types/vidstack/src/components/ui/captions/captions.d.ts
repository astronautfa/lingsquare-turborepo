import { Component } from 'maverick.js';
export interface CaptionsProps {
    textDir: 'ltr' | 'rtl';
    /**
     * The text to be displayed when an example caption is being shown.
     */
    exampleText: string;
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 */
export declare class Captions extends Component<CaptionsProps> {
    static props: CaptionsProps;
    private _media;
    private static _lib;
    private get _lib();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _isHidden;
    private _watchViewType;
    private _setupAudioView;
    private _onTrackChange;
    private _onCueChange;
    private _onUpdateTimedNodes;
    private _setupVideoView;
    private _watchTextDirection;
    private _watchMediaTime;
    private _listenToFontStyleChanges;
    private _onFontStyleChange;
    private _showExample;
    private _hideExampleTimer;
    private _hideExample;
    private _removeExample;
    private _createCueDisplayElement;
    private _createCueElement;
}
