export type YouTubePlaybackQuality = 'unknown' | 'tiny' | 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres' | 'max';
export declare function mapYouTubePlaybackQuality(quality: YouTubePlaybackQuality): 144 | 240 | 360 | 480 | 720 | 1080 | 1440 | 2160 | undefined;
