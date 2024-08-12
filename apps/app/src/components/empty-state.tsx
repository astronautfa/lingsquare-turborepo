import { ExpandingArrow } from "@ui/components"
import Link from "next/link";

const items = [
  {
    name: "Youtube Lesson",
    description: "Import your favourite Youtube videos to start learning",
    href: "/import/new-youtube",
  },
  {
    name: "Text Lesson",
    description:
      "Import a text lesson to take advantage of LingSquare features",
    href: "/import/new-text",
  },
  {
    name: "Ebook",
    description: "Read your favourite epub locally right in the browser",
    href: "/import/new-book",
  },
];

export default function EmptyState() {
  return (
    <div className="mx-5">
      <div className="relative block w-full rounded-lg border-2 border-dashed p-12 text-center focus:outline-none focus:ring-2 focus:ring-SKY-700 focus:ring-offset-2 backdrop-blur-xs transition-colors duration-400">
        <div className="mx-auto max-w-lg">
          <h2 className="text-base font-semibold leading-6">
            Import your first lesson
          </h2>
          <p className="mt-1 text-sm ">
            Get started by importing a new lesson
          </p>
          <ul
            role="list"
            className="mt-6 divide-y  border-b border-t "
          >
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <div className="group relative flex items-start space-x-3 py-4 backdrop-blur-md ">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-400">
                      {/* <item.icon
                        className="h-4 w-4 text-muted-foreground group-hover:text-inherit"
                        aria-hidden="true"
                      /> */}
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
          <div className="mt-6 flex gap-4 items-center group">
            <div>
              <Link
                href="/explore"
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
      </div>
    </div>
  );
}
