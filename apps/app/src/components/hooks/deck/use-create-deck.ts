import { type Deck } from "@lingsquare/drizzle/schema";
import { ReactQueryOptions } from "@lingsquare/trpc";
import { api } from "@lingsquare/trpc/client";

type CreateMutationOptions = ReactQueryOptions["deck"]["create"];
type CreateMutation = ReturnType<typeof api.deck.create.useMutation>;

/**
 * Hook to create a {@link Deck}
 */
export function useCreateDeck(options?: CreateMutationOptions): CreateMutation {
  const utils = api.useUtils();

  return api.deck.create.useMutation({
    ...options,
    onSuccess: async () => {
      await utils.card.sessionData.invalidate();
    },

    onError: (error) => {
      console.error(error.message);
    },
  });
}
