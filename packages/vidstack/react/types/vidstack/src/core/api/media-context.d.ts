import { type ReadSignalRecord, type WriteSignal } from 'maverick.js';
import type { MediaPlayer } from '../../components/player.js';
import type { Logger } from '../../foundation/logger/controller.js';
import type { MediaProviderAdapter } from '../../providers/types.js';
import type { MediaKeyShortcuts } from '../keyboard/types.js';
import type { VideoQualityList } from '../quality/video-quality.js';
import type { MediaPlayerDelegate } from '../state/media-player-delegate.js';
import type { MediaStorage } from '../state/media-storage.js';
import type { MediaRemoteControl } from '../state/remote-control.js';
import type { AudioTrackList } from '../tracks/audio-tracks.js';
import type { TextRenderers } from '../tracks/text/render/text-renderer.js';
import type { TextTrackList } from '../tracks/text/text-tracks.js';
import type { MediaPlayerProps } from './player-props.js';
import type { PlayerStore } from './player-state.js';
export interface MediaContext {
    player: MediaPlayer;
    storage: MediaStorage | null;
    remote: MediaRemoteControl;
    delegate: MediaPlayerDelegate;
    qualities: VideoQualityList;
    audioTracks: AudioTrackList;
    textTracks: TextTrackList;
    textRenderers: TextRenderers;
    ariaKeys: MediaKeyShortcuts;
    logger?: Logger;
    $provider: WriteSignal<MediaProviderAdapter | null>;
    $providerSetup: WriteSignal<boolean>;
    $props: ReadSignalRecord<MediaPlayerProps>;
    $state: PlayerStore;
    activeMenu?: {
        close(trigger?: Event): void;
    } | null;
}
export declare const mediaContext: import("maverick.js").Context<MediaContext>;
export declare function useMediaContext(): MediaContext;
export declare function useMediaState(): PlayerStore;
