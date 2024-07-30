export type FilterPattern = Array<string | RegExp> | string | RegExp | null;
export interface UserOptions {
    include?: FilterPattern;
    exclude?: FilterPattern;
}
export declare const unplugin: import("unplugin").UnpluginInstance<UserOptions | undefined, boolean>;
export declare const vite: (options?: UserOptions) => import("vite").Plugin<any> | import("vite").Plugin<any>[];
export declare const rollup: (options?: UserOptions) => import("rollup").Plugin<any> | import("rollup").Plugin<any>[];
export declare const webpack: (options?: UserOptions) => WebpackPluginInstance;
export declare const rspack: (options?: UserOptions) => RspackPluginInstance;
export declare const esbuild: (options?: UserOptions) => import("esbuild").Plugin;
