import { ViewController } from 'maverick.js';
import { type LogLevel } from './log-level.js';
export declare class LogPrinter extends ViewController {
    private _level;
    private _lastLogged;
    /**
     * The current log level.
     */
    get logLevel(): LogLevel;
    set logLevel(level: LogLevel);
    protected onConnect(): void;
    private _printTimeDiff;
    private _calcLastLogTimeDiff;
}
