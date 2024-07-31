/**
 * @see {@link https://github.com/vimeo/player.js#events}
 */
export declare const trackedVimeoEvents: VimeoEvent[];
export type VimeoEvent = 'bufferend' | 'bufferstart' | 'cuechange' | 'durationchange' | 'ended' | 'enterpictureinpicture' | 'error' | 'fullscreenchange' | 'leavepictureinpicture' | 'loaded' | 'loadeddata' | 'loadedmetadata' | 'loadProgress' | 'loadstart' | 'pause' | 'play' | 'playbackratechange' | 'playProgress' | 'progress' | 'qualitychange' | 'ready' | 'seek' | 'seeked' | 'seeking' | 'texttrackchange' | 'volumechange' | 'waiting' | 'timeupdate';
export interface VimeoProgressPayload {
    seconds: number;
    percent: number;
    duration: number;
}
export interface VimeoPlayPayload {
    seconds: number;
    percent: number;
    duration: number;
}
export interface VimeoErrorPayload {
    name: string;
    message: string;
    method?: string;
}
export interface VimeoEventPayload {
    play: VimeoPlayPayload;
    pause: void;
    ready: void;
    playProgress: VimeoProgressPayload;
    loadProgress: VimeoProgressPayload;
    bufferstart: void;
    bufferend: void;
    loaded: {
        id: number;
    };
    ended: void;
    seeking: void;
    seek: void;
    seeked: void;
    cuechange: void;
    fullscreenchange: {
        fullscreen: boolean;
    };
    volumechange: {
        volume: number;
    };
    durationchange: {
        duration: number;
    };
    playbackratechange: {
        playbackRate: number;
    };
    texttrackchange: void;
    error: any;
    loadeddata: any;
    loadstart: any;
    loadedmetadata: any;
    enterpictureinpicture: void;
    leavepictureinpicture: void;
    qualitychange: any;
    waiting: void;
}
