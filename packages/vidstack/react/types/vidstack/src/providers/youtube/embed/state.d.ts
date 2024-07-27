/**
 * @see {@link https://developers.google.com/youtube/iframe_api_reference#onStateChange}
 */
export declare const YouTubePlayerState: {
    readonly _Unstarted: -1;
    readonly _Ended: 0;
    readonly _Playing: 1;
    readonly _Paused: 2;
    readonly _Buffering: 3;
    readonly _Cued: 5;
};
export type YouTubePlayerStateValue = (typeof YouTubePlayerState)[keyof typeof YouTubePlayerState];
