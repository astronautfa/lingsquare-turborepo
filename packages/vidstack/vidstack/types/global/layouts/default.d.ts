import type { DefaultLayoutProps } from '../../components/index.js';
import type { VidstackPlayerLayoutLoader } from './loader.js';
export declare class VidstackPlayerLayout implements VidstackPlayerLayoutLoader {
    readonly props?: Partial<DefaultLayoutProps> | undefined;
    constructor(props?: Partial<DefaultLayoutProps> | undefined);
    readonly name = "vidstack";
    load(): Promise<void>;
    create(): (import("../../elements/index.js").MediaAudioLayoutElement | import("../../elements/index.js").MediaVideoLayoutElement)[];
}
