import * as React from 'react';
import type { AnyRecord, Component, State } from 'maverick.js';
/**
 * This hook is used to subscribe to specific state on a component instance.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-state}
 */
export declare function useState<T extends AnyRecord, R extends keyof T>(ctor: {
    state: State<T>;
}, prop: R, ref: React.RefObject<Component<any, T, any, any> | null>): T[R];
/**
 * This hook is used to subscribe to multiple states on a component instance.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-store}
 */
export declare function useStore<T extends AnyRecord>(ctor: {
    state: State<T>;
}, ref: React.RefObject<Component<any, T, any, any> | null>): T;
