import { cardRouter } from "./router/card";
import { deckRouter } from "./router/deck";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  card: cardRouter,
  deck: deckRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
