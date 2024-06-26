import { YoutubeIcon, BookIcon, LucideText } from "lucide-react";
import ExpandingArrow from "@ui/components/ui/expanding-arrow"
import Link from "next/link";

const items = [
  {
    name: "Youtube Lesson",
    description: "Import your favourite Youtube videos to start learning",
    href: "/import/new-youtube",
    icon: YoutubeIcon,
  },
  {
    name: "Text Lesson",
    description:
      "Import a text lesson to take advantage of LingSquare features",
    href: "/import/new-text",
    icon: LucideText,
  },
  {
    name: "Ebook",
    description: "Read your favourite epub locally right in the browser",
    href: "/import/new-book",
    icon: BookIcon,
  },
];

export default function EmptyState() {
  return (
    <div className="mx-5">
      <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-SKY-700 focus:ring-offset-2 backdrop-blur-xs transition-colors duration-400">
        <div className="mx-auto max-w-lg">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Import your first lesson
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Get started by importing a new lesson
          </p>
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <div className="group relative flex items-start space-x-3 py-4 backdrop-blur-md ">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-900 group-hover:bg-slate-900 transition-colors duration-400">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 ">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-black">
                      <a href={item.href}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {item.name}
                      </a>
                    </div>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    {/* <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    /> */}
                    <ExpandingArrow
                      className="-ml-4 h-4 w-4 text-sky-700 group-hover:text-sky-700"
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
                className="text-sm font-medium text-sky-800 hover:text-sky-900 pb-0.5"
              >
                Or explore our library
              </Link>
            </div>
            <ExpandingArrow
              className="h-4 w-4 text-sky-700 group-hover:text-sky-700 -ml-2"
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
