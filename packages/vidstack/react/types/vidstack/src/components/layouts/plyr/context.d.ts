import { type ReadSignalRecord, type WriteSignal } from 'maverick.js';
import type { PlyrLayoutProps } from './props.js';
export interface PlyrLayoutContext extends ReadSignalRecord<PlyrLayoutProps> {
    previewTime: WriteSignal<number>;
}
export declare const plyrLayoutContext: import("maverick.js").Context<PlyrLayoutContext>;
export declare function usePlyrLayoutContext(): PlyrLayoutContext;
