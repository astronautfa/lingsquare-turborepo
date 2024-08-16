import { MAX_INPUT_LENGTH } from "@lingsquare/misc/constants";
import { z } from "zod";

// Create Deck
export const deckFormSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required.",
        })
        .max(50, {
            message: "Name is too long.",
        }),
    description: z.string().max(MAX_INPUT_LENGTH, {
        message: "Description is too long.",
    }),
});

export type DeckFormValues = z.infer<typeof deckFormSchema>;

export const deckDefaultValues = {
    name: "",
    description: "",
} satisfies DeckFormValues;