import { ViewController } from 'maverick.js';
import { GroupedLog } from './grouped-log.js';
import type { LogLevel } from './log-level.js';
export declare class LoggerController extends ViewController {
    private _logger;
    protected onConnect(el: HTMLElement): void;
    protected _onDisconnect(): void;
}
export declare class Logger {
    private _target;
    error(...data: any[]): boolean;
    warn(...data: any[]): boolean;
    info(...data: any[]): boolean;
    debug(...data: any[]): boolean;
    errorGroup(title: string): GroupedLog;
    warnGroup(title: string): GroupedLog;
    infoGroup(title: string): GroupedLog;
    debugGroup(title: string): GroupedLog;
    setTarget(newTarget: EventTarget | null): void;
    dispatch(level: LogLevel, ...data: any[]): boolean;
}
