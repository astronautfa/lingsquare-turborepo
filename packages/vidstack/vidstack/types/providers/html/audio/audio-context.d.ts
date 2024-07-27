export declare function getOrCreateAudioCtx(): AudioContext;
export declare function createGainNode(): GainNode;
export declare function createElementSource(el: HTMLMediaElement, gainNode?: GainNode): MediaElementAudioSourceNode;
export declare function destroyGainNode(node: GainNode): void;
export declare function destroyElementSource(src: MediaElementAudioSourceNode): void;
export declare function freeAudioCtxWhenAllResourcesFreed(): void;
