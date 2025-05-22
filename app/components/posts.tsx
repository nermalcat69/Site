import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 border border-neutral-400 hover:bg-neutral-950 text-neutral-900 hover:text-neutral-50 p-4 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className=" w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p> ∞
              <p className="tracking-tight font-medium">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
