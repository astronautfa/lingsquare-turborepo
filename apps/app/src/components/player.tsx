'use client'

import '@ui/styles/player-base.css';

import { useEffect, useRef } from 'react';

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  useMediaState,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@lingsquare/vidstack';

import { VideoLayout } from './layouts/video-layout';
import { textTracks } from './tracks';
// import { Skeleton } from './components/shadcn/skeleton';

export function Player() {
  let player = useRef<MediaPlayerInstance>(null);
  const isPIP = useMediaState('pictureInPicture', player),
    canPlay = useMediaState('canPlay', player);


  useEffect(() => {
    // Subscribe to state updates.
    return player.current!.subscribe((state) => {
      // console.log('is paused?', '->', state.bufferedEnd);
      // console.log('is audio view?', '->', state.viewType === 'audio');
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  // function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
  //   // ...
  // }

  //TODO : Responsiveness should be fixed

  return (
    <div className='w-1/2'>
      <MediaPlayer
        className="w-full aspect-video text-white font-sans overflow-hidden rounded-lg pl-5 ring-media-focus data-[focus]:ring-4"
        title="Sprite Fight"
        // src="https://www.youtube.com/embed/_cMxraX_5RE"
        src="/720p.mp4"
        crossOrigin
        playsInline
        onProviderChange={onProviderChange}
        // onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider style={{ display: isPIP ? 'none' : 'block' }}>
          <Poster
            className="absolute inset-0 block h-full w-full rounded opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src="/poster.png"
            alt="Agent"
          />
          {/* {!canPlay && <Skeleton
            className="absolute inset-0 block h-full w-full opacity-0 transition-opacity bg-blue-700/40 skeleton z-20 rounded"
          />} */}
          {textTracks.map((track) => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>
        <VideoLayout thumbnails='/thumbnails.vtt' />
      </MediaPlayer>
    </div>
  );
}
