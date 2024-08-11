import ExpandingArrow from "@/components/expanding-arrow"
import Link from "next/link";
import { Mdx } from "@/components/mdx-components";
import TocDesktop, { TocMobile } from "@/components/toc";
import { allPosts } from "@/.contentlayer/generated";
import {
  formatDate,
  isArrayNotEmpty,
} from "@/lib/utils";
import { Calendar } from "lucide-react";
import { cn } from "@lingsquare/misc/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);
  if (!post) {
    null;
  }
  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: `LingSquare | ${post.title}`,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

// export const generateMetadata = ({
//   params,
// }: {
//   params: { slug: string };
// }): Metadata => {
//   console.log(allPosts)
//   const post = allPosts.find((post) => post.slug === params.slug);
//   console.log(post)
//   if (!post) notFound();

//   const { title, description, date } = post;
//   const imgParams = new URLSearchParams({ title, date: formatDate(date) });
//   //   const image = post.image ?? `/api/og?${imgParams.toString()}`;
//   return generateCommonMeta({ title });
// };

const Page = async ({ params }: PostProps) => {
  // const post = allPosts.find((post) => post.slug === params.slug);

  const post = await getPostFromParams(params);

  if (!post) notFound();

  const moreThanOneHeading = post.headings && post.headings.length > 1;

  return (
    <div className="min-h-full flex justify-center md:py-32 py-20 px-20">
      <main
        className={cn(
          "[--_space:2.5rem] lg:[--_space:4rem]"
        )}
      >
        <Link
          href={`/blog`}
          className="text-sm font-semibold leading-7 text-sky-600 flex gap-2 group hover:text-sky-700 no- mb-10"
        >
          <ExpandingArrow
            className="-ml-4 h-4 w-4 text-sky-600 group-hover:text-sky-700"
            direction="left"
          />
          Back to blog
        </Link>
        <div
          className={cn(
            "flex flex-col-reverse gap-8 pb-[--_space]",
            "border-b border-b-borders",
            "lg:flex-row [&>*]:flex-1"
          )}
        >

          <div className={cn("prose prose-custom lg:prose-lg")}>
            <div
              className={cn(
                "not-prose text-foreground-secondary text-sm font-medium",
                "flex gap-6 flex-wrap mb-6 lg:mb-10",
                "[&_svg]:text-xs [&>*]:flex [&>*]:gap-2"
              )}
            >

              <time dateTime={post.date} className="flex items-center">
                <Calendar />
                {formatDate(post.date, "full")}
              </time>
              {isArrayNotEmpty(post.tags) && (
                <div className={cn("flex gap-2 flex-wrap not-prose")}>
                  {post.tags &&
                    post.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 select-none capitalize"
                      >
                        {tag}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <h1 className="md:leading-tight">{post.title}</h1>
            <p className="mt-0 lg:mt-0">{post.description}</p>

          </div>
        </div>
        <div
          className={cn(
            "mt-[--_space]",
            "xl:flex xl:flex-row-reverse xl:justify-between"
          )}
        >
          {moreThanOneHeading && (
            <TocDesktop
              contents={post.headings}
              className={cn(
                "hidden sticky top-32 self-start flex-[0_0_25%] xl:block"
              )}
            />
          )}
          <div
            className={cn(
              "max-xl:mx-auto prose prose-custom lg:prose-lg",
              post.headings.length < 1 && "mx-auto"
            )}
          >
            {moreThanOneHeading && (
              <TocMobile contents={post.headings} className="xl:hidden" />
            )}
            <Mdx code={post.body.code} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
