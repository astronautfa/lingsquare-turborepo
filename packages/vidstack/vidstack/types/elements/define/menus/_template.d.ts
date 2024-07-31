import { type Scope } from 'maverick.js';
import type { RadioOption } from '../../../components/index.js';
import type { MediaRadioElement } from './radio-element.js';
export declare function renderMenuItemsTemplate(el: HTMLElement & {
    connectScope: Scope | null;
    getOptions(): RadioOption[];
}, onCreate?: (el: MediaRadioElement, option: RadioOption, index: number) => void): void;
