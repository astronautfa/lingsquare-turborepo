export declare function timedPromise<Resolved, Rejected>(callback: () => Rejected | void, ms?: number): import("maverick.js/std").DeferredPromise<Resolved, Rejected>;
