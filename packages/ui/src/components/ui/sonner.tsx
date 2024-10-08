"use client";

// to fix the issue with intercepting routes
// https://github.com/shadcn-ui/ui/issues/2401

// import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { createPortal } from 'react-dom';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // const { theme } = useTheme();

  const toasterContent = (
    <Sonner
      // theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );

  // Only render in the browser
  if (typeof window === 'undefined') return null;

  return createPortal(toasterContent, document.body);
};

export { Toaster, toast };