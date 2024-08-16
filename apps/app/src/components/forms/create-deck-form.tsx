"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
    SubmitButton,
    Form,
    FormTextarea,
    FormTextInput,
    Spinner,
    toast
} from "@ui/components";
import { DeckFormValues, deckDefaultValues, deckFormSchema } from "@/validators/create-deck-validator";
import { useCreateDeck } from "@/components/hooks/deck/use-create-deck"
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@lingsquare/misc/utils";
import { ExclamationTriangleRegular, PlusRegular } from "@ui/icons";
import { Paths } from "@lingsquare/misc/constants";
import { useRouter } from "next/navigation";

export function CreateDeckForm({ className }: { className?: string }) {
    const createDeckMutation = useCreateDeck();
    const form = useForm<DeckFormValues>({
        resolver: zodResolver(deckFormSchema),
        defaultValues: deckDefaultValues,
    });

    const isLoading = createDeckMutation.isPending;

    const router = useRouter();

    const onSubmit: SubmitHandler<DeckFormValues> = (data) => {
        toast.promise(createDeckMutation.mutateAsync(data), {
            loading: "Creating deck",
            success: () => {
                form.reset();
                router.push(Paths.Review);
                return `Deck created`;
            },
            error: (error) => {
                return <>
                    <ExclamationTriangleRegular className="h-5 w-5 text-destructive" />
                    {error.message}
                </>;
            },
        });
    };

    return (
        <Card className={cn("col-span-12 w-full max-w-xl self-start justify-self-center border-0 md:border", className)}>
            <CardHeader className="px-2 md:px-6">
                <CardTitle>Create Deck</CardTitle>
                <CardDescription>
                    Provide a name and description for your new deck.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form >
                    <CardContent className="flex h-full flex-col gap-y-4 px-2 md:px-6">
                        <FormTextInput
                            name="name"
                            label="Name"
                            form={form}
                            disabled={isLoading}
                        />
                        <FormTextarea
                            name="description"
                            label="Description"
                            form={form}
                            disabled={isLoading}
                        />
                    </CardContent>

                    <CardFooter className="px-2 md:px-6">
                        <SubmitButton
                            className="mt-4 w-full"
                            size="default"
                            type="submit"
                            disabled={isLoading}
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {isLoading ? (
                                <div className="absolute inset-0 grid place-items-center">
                                    <Spinner className="h-4 w-4" />
                                </div>
                            )
                                :
                                <span className={cn(isLoading ? "opacity-0" : "flex gap-2 items-center")}>
                                    <PlusRegular className="w-3 h-3" />
                                    Create Deck
                                </span>
                            }
                        </SubmitButton>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}

CreateDeckForm.displayName = "CreateDeckForm";
