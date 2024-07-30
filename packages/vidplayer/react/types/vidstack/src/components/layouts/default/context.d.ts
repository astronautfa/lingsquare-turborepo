import { type ReadSignalRecord, type WriteSignal } from 'maverick.js';
import type { DefaultLayoutProps } from './props.js';
export interface DefaultLayoutContext extends ReadSignalRecord<DefaultLayoutProps> {
    menuPortal: WriteSignal<HTMLElement | null>;
    userPrefersAnnouncements: WriteSignal<boolean>;
    userPrefersKeyboardAnimations: WriteSignal<boolean>;
}
export declare const defaultLayoutContext: import("maverick.js").Context<DefaultLayoutContext>;
export declare function useDefaultLayoutContext(): DefaultLayoutContext;
