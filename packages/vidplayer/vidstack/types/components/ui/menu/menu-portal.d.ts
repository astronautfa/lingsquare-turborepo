import { Component } from 'maverick.js';
/**
 * Portals menu items into the document body.
 *
 * @attr data-portal - Whether portal is active (determined by `disabled` prop).
 * @docs {@link https://www.vidstack.io/docs/player/components/menu#portal}
 */
export declare class MenuPortal extends Component<MenuPortalProps> {
    static props: MenuPortalProps;
    private _target;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _attachElement;
    private _watchDisabled;
    private _portal;
    private _getContainer;
}
export interface MenuPortalProps {
    /**
     * Specifies a DOM element or query selector for the container that the menu should be portalled
     * inside. Defaults to `document.body` when set to `null`.
     */
    container: string | HTMLElement | null;
    /**
     * Whether the portal should be disabled. The value can be the string "fullscreen" to disable
     * portals while media is fullscreen. This is to ensure the menu remains visible.
     */
    disabled: boolean | 'fullscreen';
}
export interface MenuPortalContext {
    _attach(element: HTMLElement | null): void;
}
export declare const menuPortalContext: import("maverick.js").Context<MenuPortalContext | null>;
