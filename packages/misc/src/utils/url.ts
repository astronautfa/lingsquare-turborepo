import { env } from "@lingsquare/env/web/client";

export function absoluteUrl(path: string) {
    return new URL(path, env.NEXT_PUBLIC_APP_URL).href;
}