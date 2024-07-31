import * as React from 'react';
import { type MediaVolumeContextValue, type SetMediaVolumeContextValue, type TimelineContextValue } from 'remotion';
import type { RemotionSrc } from '../types.js';
export declare const REMOTION_PROVIDER_ID = "vds-remotion-provider";
export interface RemotionContextProviderProps {
    src: RemotionSrc;
    component: React.LazyExoticComponent<React.ComponentType<unknown>>;
    timeline: TimelineContextValue;
    mediaVolume: MediaVolumeContextValue;
    setMediaVolume: SetMediaVolumeContextValue;
    children: React.ReactNode;
    numberOfSharedAudioTags?: number;
}
export declare function RemotionContextProvider({ src: { compositionWidth: width, compositionHeight: height, fps, durationInFrames, numberOfSharedAudioTags, }, component, timeline, mediaVolume, setMediaVolume, children, numberOfSharedAudioTags: providedNumberOfAudioTags, }: RemotionContextProviderProps): React.JSX.Element;
export declare namespace RemotionContextProvider {
    var displayName: string;
}
