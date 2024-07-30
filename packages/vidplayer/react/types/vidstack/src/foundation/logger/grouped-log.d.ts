import type { Logger } from './controller.js';
import type { LogLevel } from './log-level.js';
export declare const GROUPED_LOG: unique symbol;
export declare class GroupedLog {
    readonly logger: Logger;
    readonly level: LogLevel;
    readonly title: string;
    readonly root?: GroupedLog | undefined;
    readonly parent?: GroupedLog | undefined;
    readonly [GROUPED_LOG] = true;
    readonly logs: ({
        label?: string;
        data: any[];
    } | GroupedLog)[];
    constructor(logger: Logger, level: LogLevel, title: string, root?: GroupedLog | undefined, parent?: GroupedLog | undefined);
    log(...data: any[]): GroupedLog;
    labelledLog(label: string, ...data: any[]): GroupedLog;
    groupStart(title: string): GroupedLog;
    groupEnd(): GroupedLog;
    dispatch(): boolean;
}
export declare function isGroupedLog(data: any): data is GroupedLog;
