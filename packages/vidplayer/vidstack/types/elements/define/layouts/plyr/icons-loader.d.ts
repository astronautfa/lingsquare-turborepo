import type { TemplateResult } from 'lit-html';
import { LayoutIconsLoader } from '../icons/layout-icons-loader.js';
export declare class PlyrLayoutIconsLoader extends LayoutIconsLoader {
    _load(): Promise<Record<string, TemplateResult>>;
}
