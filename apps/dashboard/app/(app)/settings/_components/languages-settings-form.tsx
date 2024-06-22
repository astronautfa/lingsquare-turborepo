"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@ui/lib/utils"

import { Button } from "@ui/components/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/form"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@ui/components/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@ui/components/popover"
import { Input } from "@ui/components/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/components/select"
import { toast } from "sonner"
import { useState } from "react"
import { languages } from "@/consts/languages"
import { Check, ChevronsUpDown } from "lucide-react"

const languageSettingsFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        }),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: "Please enter a valid URL." }),
            })
        )
        .optional(),
})

// TODO : sort out the language form with levels and also being able to add and remove fields

type languageSettingsFormValues = z.infer<typeof languageSettingsFormSchema>

// This can come from your database or API.
const defaultValues: Partial<languageSettingsFormValues> = {
    urls: [
        { value: "https://alireza.com" },
        { value: "http://twitter.com/alireza" },
    ],
}

export function LanguageSettingsForm() {
    const form = useForm<languageSettingsFormValues>({
        resolver: zodResolver(languageSettingsFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    const [openSelect, setOpenSelect] = useState<boolean>(false)

    function onSubmit(data: languageSettingsFormValues) {
        toast(
            <div className="flex flex-col">
                <p>You submitted the following values:</p>
                <pre className="mt-2 w-[320px] rounded-md bg-slate-950 p-5">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel>Native Language</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? languages.find(
                                                    (language) => language.code === field.value
                                                )?.name
                                                : "Select language"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search language..." />
                                        <CommandEmpty>No language found.</CommandEmpty>
                                        <CommandList>
                                            <CommandGroup>
                                                {languages.map((language) => (
                                                    <CommandItem
                                                        value={language.name + " " + language.code}
                                                        key={language.code}
                                                        onSelect={() => {
                                                            form.setValue("email", language.code)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                language.code === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        <div className="flex gap-2">
                                                            <p>
                                                                {language.flag}
                                                            </p>
                                                            <p>
                                                                {language.name}
                                                            </p>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is your mother tongue meaning your first language, or all of the languages you grew up in if you grew up bilingual or multilingual.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} onOpenChange={setOpenSelect}>
                                <FormControl>
                                    <SelectTrigger open={openSelect} >
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage verified email addresses in your{" "}
                                <Link href="/examples/forms">email settings</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add links to your website, blog, or social media profiles.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: "" })}
                    >
                        Add Language
                    </Button>
                </div>
                <div className="flex justify-end w-full">
                    <Button type="submit">Update Languages</Button>
                </div>
            </form>
        </Form>
    )
}




