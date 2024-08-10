import { allPosts } from "@/.contentlayer/generated";
import ExpandingArrow from "@/components/expanding-arrow";
import { Mdx } from "@/components/mdx-components";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-white py-24 sm:py-40 min-h-full select-none">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
        <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
            <div className="not-prose text-foreground-secondary text-sm font-medium">
              <time dateTime={allPosts[0].date} className="flex items-end">
                {formatDate(allPosts[0].date, "full")}
              </time>
            </div>
            <div className="flex items-center justify-center gap-x-2 text-xs mb-2">
              {allPosts[0].tags &&
                allPosts[0].tags.map((tag, index) => (
                  <div
                    key={index}
                    className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 select-none capitalize"
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </div>
          <Link
            href={`blog${allPosts[0].slug}`}
            className="text-sm font-semibold leading-6 text-sky-600 hover:text-sky-700"
            aria-describedby="featured-post"
          >
            <h2
              id="featured-post"
              className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl hover:text-gray-600"
            >
              {allPosts[0].title}
            </h2>
          </Link>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {allPosts[0].description}
          </p>
          <div className="line-clamp-15 my-6 leading-7 select-text">
            <Mdx code={allPosts[0].body.code} />
          </div>
          <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col mr-4">
            <div className="flex justify-end">
              <Link
                href={`/blog${allPosts[0].slug}`}
                className="text-sm font-semibold leading-7 text-sky-600 flex gap-2 group hover:text-sky-700"
              >
                Continue reading
                <ExpandingArrow className="-mr-4 h-4 w-4 text-sky-600 group-hover:text-sky-700" />
              </Link>
            </div>
          </div>
        </article>
        <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
          <div className="-my-12 divide-y divide-gray-900/10">
            {allPosts.slice(1).map((post) => (
              <article key={post._id} className="pb-8 pt-12">
                <div className="group relative max-w-xl">
                  <div className="flex justify-between items-center">
                    <div className="not-prose text-foreground-secondary text-sm font-medium">
                      <time dateTime={post.date} className="flex items-end">
                        {formatDate(post.date, "full")}
                      </time>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 text-xs mb-2">
                      {post.tags &&
                        post?.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 select-none"
                          >
                            {tag}
                          </div>
                        ))}
                    </div>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="mt-3 flex flex-col justify-between gap-6 sm:mt-4 sm:flex-row-reverse sm:gap-8 lg:flex-col mr-4">
                  <div className="flex justify-end">
                    <Link
                      href={`/blog${post.slug}`}
                      className="text-sm font-semibold leading-7 text-sky-600 flex gap-2 group hover:text-sky-700"
                    >
                      Read post
                      <ExpandingArrow className="-mr-4 h-4 w-4 text-sky-600 group-hover:text-sky-700" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}