import type { FormatTimeOptions } from '../../../../utils/time.js';
export declare const sliderValueFormatContext: import("maverick.js").Context<SliderValueFormat>;
export interface SliderValueFormat {
    default?: 'value' | 'percent' | 'time';
    value?(value: number): string | number;
    percent?(percent: number, decimalPlaces: number): string | number;
    time?(value: number, options?: FormatTimeOptions): string;
}
