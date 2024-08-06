import { NewDeck } from "@lingsquare/drizzle/schema";

export function newDeck(
  userId: string,
  {
    name,
    description,
  }: {
    name: string;
    description?: string;
  },
): NewDeck {
  return {
    id: crypto.randomUUID(),
    name,
    description: description ?? "",
    userId,
  };
}
