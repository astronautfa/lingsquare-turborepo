'use client'

import { useRef, useEffect } from 'react'
import '@lingsquare/vidstack/player/styles/base.css';
import { MediaPlayer, MediaProvider, type MediaPlayerInstance, } from '@lingsquare/vidstack';


const VideoPage = () => {
    let player = useRef<MediaPlayerInstance>(null);

    useEffect(() => {
        // Subscribe to state updates.
        return player.current!.subscribe((state) => {
            // console.log(state)
            console.log('is paused?', '->', state.paused);
            console.log('is audio view?', '->', state.viewType === 'audio');
        });
    }, []);

    return (<div>
        <MediaPlayer
            className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
            title="Sprite Fight"
            src="/video/720p.mp4"
            crossOrigin
            playsInline
            ref={player}
        >
            <MediaProvider>
            </MediaProvider >
        </MediaPlayer >
    </div>)
}

export default VideoPage