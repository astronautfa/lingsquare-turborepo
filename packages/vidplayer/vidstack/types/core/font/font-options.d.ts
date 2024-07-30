import { type WriteSignal } from 'maverick.js';
import type { DefaultLayoutTranslations } from '../../components/index.js';
export declare const FONT_COLOR_OPTION: FontOption;
export declare const FONT_FAMILY_OPTION: FontOption;
export declare const FONT_SIZE_OPTION: FontSliderOption;
export declare const FONT_OPACITY_OPTION: FontSliderOption;
export declare const FONT_TEXT_SHADOW_OPTION: FontOption;
export declare const FONT_DEFAULTS: {
    readonly fontFamily: "pro-sans";
    readonly fontSize: "100%";
    readonly textColor: "#ffffff";
    readonly textOpacity: "100%";
    readonly textShadow: "none";
    readonly textBg: "#000000";
    readonly textBgOpacity: "100%";
    readonly displayBg: "#000000";
    readonly displayBgOpacity: "0%";
};
export declare const FONT_SIGNALS: Record<"fontFamily" | "fontSize" | "textShadow" | "textColor" | "textOpacity" | "textBg" | "textBgOpacity" | "displayBg" | "displayBgOpacity", WriteSignal<string>>;
export type FontSignal = keyof typeof FONT_DEFAULTS;
export declare function onFontReset(): void;
export interface FontRadioOption {
    type: 'radio';
    values: string[] | Record<string, string>;
}
export interface FontSliderOption {
    type: 'slider';
    min: number;
    max: number;
    step: number;
    upIcon: unknown;
    downIcon: unknown;
}
export interface FontColorOption {
    type: 'color';
}
export type FontOption = FontRadioOption | FontSliderOption | FontColorOption;
export interface DefaultFontSettingProps {
    label: keyof DefaultLayoutTranslations;
    type: FontSignal;
    option: FontOption;
}
