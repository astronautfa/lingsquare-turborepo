import type { PlayerSrc as BasePlayerSrc } from 'vidstack';
import type { RemotionSrc } from './providers/remotion/types.js';
export type PlayerSrc = BasePlayerSrc | RemotionSrc;
