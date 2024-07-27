import type { Src } from 'vidstack';
import type { RemotionProvider } from './provider.jsx';
import type { RemotionSrc } from './types.js';
/** @see {@link https://www.vidstack.io/docs/player/providers/remotion} */
export declare function isRemotionProvider(provider: any): provider is RemotionProvider;
export declare function isRemotionSrc(src?: Src | null): src is RemotionSrc;
