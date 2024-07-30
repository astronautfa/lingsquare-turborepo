import { Component } from 'maverick.js';
import { type MediaContext } from '../../../core/api/media-context.js';
import type { MediaPlayerQuery } from '../../../core/api/player-state.js';
import { type DefaultLayoutProps } from './props.js';
export declare class DefaultLayout extends Component<DefaultLayoutProps> {
    static props: DefaultLayoutProps;
    protected _media: MediaContext;
    protected _when: import("maverick.js").ReadSignal<boolean>;
    protected _smallWhen: import("maverick.js").ReadSignal<boolean>;
    get isMatch(): boolean;
    get isSmallLayout(): boolean;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected _matches(query: 'never' | boolean | MediaPlayerQuery): boolean;
}
