export declare function waitForEvent<Event>(target: EventTarget, type: string, options?: (EventListenerOptions | AddEventListenerOptions) & {
    timeout?: number;
}): Promise<Event>;
