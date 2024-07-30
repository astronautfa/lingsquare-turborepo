import * as React from 'react';
import { type WriteSignal } from 'maverick.js';
import type { PlyrLayoutWord } from 'vidstack';
import type { PlyrLayoutProps } from './props.js';
interface PlyrLayoutContext extends PlyrLayoutProps {
    previewTime: WriteSignal<number>;
}
export declare const PlyrLayoutContext: React.Context<PlyrLayoutContext>;
export declare function usePlyrLayoutContext(): PlyrLayoutContext;
export declare function usePlyrLayoutWord(word: PlyrLayoutWord): any;
export declare function i18n(translations: any, word: string): any;
export {};
