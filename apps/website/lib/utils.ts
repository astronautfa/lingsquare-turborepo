import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatDate = (
    date: string | Date,
    dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium",
) => {
    if (typeof date === "string") date = new Date(date);
    return Intl.DateTimeFormat("en-US", { dateStyle: dateStyle }).format(date);
};

export const isArrayNotEmpty = <T>(arr: T[] | undefined): arr is T[] => {
    if (Array.isArray(arr) && arr.length > 0) return true;
    return false;
};