import type { VimeoCommand } from './command.js';
import type { VimeoEventPayload } from './event.js';
export interface VimeoMessage {
    data?: any;
    value?: any;
    method?: VimeoCommand;
    event?: keyof VimeoEventPayload;
}
