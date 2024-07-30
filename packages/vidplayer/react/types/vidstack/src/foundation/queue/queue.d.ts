export declare class Queue<Items> {
    protected _queue: Map<keyof Items, any>;
    /**
     * Queue the given `item` under the given `key` to be processed at a later time by calling
     * `serve(key)`.
     */
    _enqueue<T extends keyof Items>(key: T, item: Items[T]): void;
    /**
     * Process item in queue for the given `key`.
     */
    _serve<T extends keyof Items>(key: T): Items[T] | undefined;
    /**
     * Peek at item in queue for the given `key`.
     */
    _peek<T extends keyof Items>(key: T): Items[T] | undefined;
    /**
     * Removes queued item under the given `key`.
     */
    _delete(key: keyof Items): void;
    /**
     * Clear all items in the queue.
     */
    _clear(): void;
}
