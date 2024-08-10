import Link from 'next/link';
import { Post, allPosts } from "@/.contentlayer/generated";

const LandingBlog = () => {
    return (
        <section
            id="blog"
            className="md:mx-auto flex items-center justify-center pb-20" >
            <div className="relative md:py-20 sm:w-11/12 md:w-10/12 lg:w-8/12 xl:7/12 w-12/12 p-3 py-10 md:rounded-xl rounded-none">
                <div className="relative max-w-screen-2xl mx-auto md:px-8">
                    <div className="max-w-xl mx-auto space-y-3 px-6 sm:text-center sm:px-0 mb-12">
                        <h3 className="text-sky-700 font-semibold">Blog</h3>
                        <p className="text-3xl font-semibold sm:text-4xl">
                            Latest blog posts
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allPosts.slice(1).map((post, index) => (
                            <BlogItem post={post} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}

const BlogItem = ({ post }: { post: Post }) => {
    return (
        <Link href={`/blog${post.slug}`}>
            <div className="flex flex-col gap-2 hover:opacity-80 hover:text-sky-900 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4">
                    {

                    }
                </div>
                <h3 className="text-xl tracking-tight">{post.title}</h3>
                <p className="text-muted-foreground text-base">
                    {post.description}
                </p>
            </div>
        </Link>
    )
}

export default LandingBlog