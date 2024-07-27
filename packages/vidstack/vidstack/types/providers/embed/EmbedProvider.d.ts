export declare abstract class EmbedProvider<Message> {
    protected readonly _iframe: HTMLIFrameElement;
    protected _src: import("maverick.js").WriteSignal<string>;
    protected abstract _getOrigin(): string;
    protected abstract _buildParams(): Record<string, any>;
    protected abstract _onMessage(message: Message, event: MessageEvent): void;
    protected abstract _onLoad(): void;
    /**
     * Defines which referrer is sent when fetching the resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
     */
    referrerPolicy: ReferrerPolicy | null;
    get iframe(): HTMLIFrameElement;
    constructor(_iframe: HTMLIFrameElement);
    setup(): void;
    protected _watchSrc(): void;
    protected _postMessage(message: any, target?: string): void;
    protected _onWindowMessage(event: MessageEvent): void;
}
