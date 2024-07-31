import { Component } from 'maverick.js';
import { type MediaContext } from '../../../core/api/media-context.js';
import { type PlyrLayoutProps } from './props.js';
export declare class PlyrLayout extends Component<PlyrLayoutProps> {
    static props: PlyrLayoutProps;
    protected _media: MediaContext;
    protected onSetup(): void;
}
export declare function usePlyrLayoutClasses(el: HTMLElement, media: MediaContext): () => void;
