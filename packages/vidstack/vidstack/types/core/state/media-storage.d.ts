import type { MaybeStopEffect } from 'maverick.js';
import type { Src } from '../api/src-types.js';
export interface MediaStorage {
    getVolume(): Promise<number | null>;
    setVolume?(volume: number): Promise<void>;
    getMuted(): Promise<boolean | null>;
    setMuted?(muted: boolean): Promise<void>;
    getTime(): Promise<number | null>;
    setTime?(time: number, ended?: boolean): Promise<void>;
    getLang(): Promise<string | null>;
    setLang?(lang: string | null): Promise<void>;
    getCaptions(): Promise<boolean | null>;
    setCaptions?(captions: boolean): Promise<void>;
    getPlaybackRate(): Promise<number | null>;
    setPlaybackRate?(rate: number): Promise<void>;
    getVideoQuality(): Promise<SerializedVideoQuality | null>;
    setVideoQuality?(quality: SerializedVideoQuality | null): Promise<void>;
    getAudioGain(): Promise<number | null>;
    setAudioGain?(gain: number | null): Promise<void>;
    /**
     * Called when media is ready for playback and new data can be loaded.
     */
    onLoad?(src: Src): void | Promise<void>;
    /**
     * Called when the `mediaId` has changed. This method can return a function to be called
     * before the next change.
     *
     * - The `mediaId` is computed from the current source and clip times. It will be `null` if
     * there is no source.
     *
     * - The `playerId` is the string provided to the player `storage` prop (if set), or the `id`
     *   set on the player element, otherwise `undefined`.
     */
    onChange?(src: Src, mediaId: string | null, playerId?: string): MaybeStopEffect;
    /**
     * Called when storage is being destroyed either because the `storage` property on the player
     * has changed, or the player is being destroyed.
     */
    onDestroy?(): void;
}
export interface SerializedVideoQuality {
    id: string;
    width: number;
    height: number;
    bitrate?: number | null;
}
export declare class LocalMediaStorage implements MediaStorage {
    protected playerId: string;
    protected mediaId: string | null;
    private _data;
    getVolume(): Promise<number | null>;
    setVolume(volume: number): Promise<void>;
    getMuted(): Promise<boolean | null>;
    setMuted(muted: boolean): Promise<void>;
    getTime(): Promise<number | null>;
    setTime(time: number, ended: boolean): Promise<void>;
    getLang(): Promise<string | null>;
    setLang(lang: string | null): Promise<void>;
    getCaptions(): Promise<boolean | null>;
    setCaptions(enabled: boolean): Promise<void>;
    getPlaybackRate(): Promise<number | null>;
    setPlaybackRate(rate: any): Promise<void>;
    getAudioGain(): Promise<number | null>;
    setAudioGain(gain: number | null): Promise<void>;
    getVideoQuality(): Promise<SerializedVideoQuality | null>;
    setVideoQuality(quality: SerializedVideoQuality | null): Promise<void>;
    onChange(src: Src, mediaId: string | null, playerId?: string): void;
    protected save(): void;
    protected saveTimeThrottled: (() => void) & {
        cancel: () => void;
        flush: () => void;
    };
    private saveTime;
}
