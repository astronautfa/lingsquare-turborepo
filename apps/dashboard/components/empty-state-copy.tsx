import { LucideText } from "lucide-react";
import { BsYoutube, BsBookHalf } from "react-icons/bs";
import ExpandingArrow from "@ui/components/expanding-arrow"
import Link from "next/link";

// TODO : rename and clean this code !

const items = [
  {
    name: "Youtube Lesson",
    description: "Import your favourite Youtube videos ",
    href: "/import/new-youtube",
    icon: BsYoutube,
  },
  {
    name: "Text Lesson",
    description:
      "Import a text lesson",
    href: "/import/new-text",
    icon: LucideText,
  },
  {
    name: "Ebook",
    description: "Read your favourite Ebook",
    href: "/import/new-book",
    icon: BsBookHalf,
  },
];

export default function EmptyState() {
  return (
    <div className="w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Import</h2>
        <p className="text-muted-foreground">
          Import your own content and start learning.
        </p>
      </div>
      <ul
        role="list"
        className="mt-6 divide-y  border-b border-t "
      >
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="group relative flex items-start space-x-3 py-4 backdrop-blur-md ">
              <div className="flex-shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-400">
                  <item.icon
                    className="h-5 w-5 text-muted-foreground group-hover:text-inherit"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="min-w-0 flex-1 ">
                <div className="text-sm font-medium">
                  <a href={item.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.name}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ExpandingArrow
                  className="-ml-4 h-4 w-4 "
                  direction="right"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-4 items-center group justify-end pr-1">
        <div>
          <Link
            href="/"
            className="text-sm font-medium pb-0.5 text-muted-foreground group-hover:text-inherit"
          >
            Or explore our library
          </Link>
        </div>
        <ExpandingArrow
          className="h-4 w-4 -ml-3 mt-0.5"
          direction="right"
        />
      </div>
    </div>
  );
}
