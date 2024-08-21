import type { AppRouter } from "../root";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { ssrPrepass } from '@trpc/next/ssrPrepass';
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { env } from "@lingsquare/env/web/server";


function getBaseUrl() {
    if (typeof window !== "undefined")
        // browser should use relative path
        return "";

    if (env.VERCEL_URL)
        // reference for vercel.com
        return `https://${env.VERCEL_URL}`;

    // assume localhost
    return `http://localhost:${env.PORT ?? 3000}`;
}

// See https://trpc.io/docs/client/react/infer-types#infer-react-query-options-based-on-your-router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc: any = createTRPCNext<AppRouter>({
    ssr: true,
    ssrPrepass,
    transformer: superjson,
    config(opts) {
        const { ctx } = opts;
        if (typeof window !== "undefined") {
            // during client requests
            return {
                links: [
                    httpBatchLink({
                        url: "/api/trpc",
                        transformer: superjson,
                    }),
                ],
            };
        }

        return {
            links: [
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @link https://trpc.io/docs/v11/ssr
                     **/
                    url: `${getBaseUrl()}/api/trpc`,
                    transformer: superjson,

                    // You can pass any HTTP headers you wish here
                    async headers() {
                        if (!ctx?.req?.headers) {
                            return {};
                        }
                        // To use SSR properly, you need to forward client headers to the server
                        // This is so you can pass through things like cookies when we're server-side rendering
                        return {
                            cookie: ctx.req.headers.cookie,
                        };
                    },
                }),
            ],
        };
    },
});
