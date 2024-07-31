import * as React from 'react';
import type { WriteSignal } from 'maverick.js';
import type { DefaultLayoutProps } from './media-layout.jsx';
export declare const DefaultLayoutContext: React.Context<DefaultLayoutContext>;
interface DefaultLayoutContext extends DefaultLayoutProps {
    isSmallLayout: boolean;
    userPrefersAnnouncements: WriteSignal<boolean>;
    userPrefersKeyboardAnimations: WriteSignal<boolean>;
}
export declare function useDefaultLayoutContext(): DefaultLayoutContext;
export declare function useDefaultLayoutWord(word: string): any;
export declare function i18n(translations: any, word: string): any;
export {};
