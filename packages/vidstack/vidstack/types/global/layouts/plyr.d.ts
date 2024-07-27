import type { PlyrLayoutProps } from '../../components/index.js';
import type { VidstackPlayerLayoutLoader } from './loader.js';
export declare class PlyrLayout implements VidstackPlayerLayoutLoader {
    readonly props?: Partial<PlyrLayoutProps> | undefined;
    constructor(props?: Partial<PlyrLayoutProps> | undefined);
    readonly name = "plyr";
    load(): Promise<void>;
    create(): import("../../elements/index.js").MediaPlyrLayoutElement[];
}
