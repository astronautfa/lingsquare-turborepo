import { type MaybeStopEffect } from 'maverick.js';
export declare function createSignal<T>(initialValue: T, deps?: any[]): import("maverick.js").WriteSignal<T>;
export declare function createComputed<T>(compute: () => T, deps?: any[]): import("maverick.js").ReadSignal<T>;
export declare function createEffect(compute: () => MaybeStopEffect, deps?: any[]): void;
export declare function useScoped<T>(compute: () => T): NonNullable<T>;
