import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import SomeComponent from 'app/components/SomeComponent'
import Spanner from "./components/spanner"
import { getBlogPosts, formatDate } from 'app/blog/utils'

export default function Page() {
  const latestPosts = getBlogPosts()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .slice(0, 3)

  return (
    <section className="flex flex-col xl:justify-center md:flex-row">
      <div className="flex flex-col max-w-xl">
        <h1 className="mb-8 font-semibold text-2xl md:text-4xl">
          Arjun Aditya
        </h1>
        <p className="mb-4 text-xl md:text-2xl">
          A Mix of Design, Programming, Financial Markets, Economics,  and Philosophy.
        </p>
        <p className="mb-4 text-xl md:text-2xl">
          Started my journey with Computers in 2015 at age 9 with a Computer with no Internet.
        </p>
        <p className="mb-4 text-xl md:text-2xl">
          Currently working at <a href="https://zerops.io" target="_blank" className='Underlined'> Zerops</a>.
        </p>
        {/* <div className="pb-6 pt-2">
          <div className="space-y-5 ">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex justify-between items-center gap-8">
                  <p className="tracking-tight hover:underline hover:text-black dark:hover:text-neutral-100 text-neutral-900 dark:text-neutral-100 text-xl flex-1">
                    {post.metadata.title}
                  </p>
                  <p className="hex-text text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-4">
            <Link 
              href="/blog" 
              className="tracking-tight hover:underline text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Read all posts →
            </Link>
          </div>
        </div> */}
        <p className="mb-4 text-xl md:text-2xl opacity-100 dark:opacity-90">
          Checkout my <Link href="/work" className='Underlined'>Work</Link>, <a href="https://x.com/arjvnz" target="_blank" className='Underlined'>Twitter</a>, <a href="https://github.com/nermalcat69" target="_blank" className='Underlined'>Github</a>, <a href="https://instagram.com/nermalcat69" target="_blank" className='Underlined'>Instagram</a>, <a href="https://bento.me/arjunaditya" target="_blank" className='Underlined' >Bento</a>, and more.
        </p>
        {/* <SomeComponent /> */}
      </div>

      <div className="hidden lg:block flex-shrink-0">
        <div className="grid grid-cols-2 ml-10 gap-4 max-w-lg relative">
          <div className="aspect-square relative">
            <img 
              src="/portrait.png" 
              className="rounded-full hover:scale-115 transition-all duration-300 object-cover dark:brightness-90 absolute inset-0 w-full h-full" 
              alt="Arjun Aditya"
            />
          </div>
          <div className="aspect-square relative">
            <img 
              src="/explaining.jpg" 
              className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90 absolute inset-0 w-full h-full" 
              alt="Arjun Aditya"
            />
          </div>
          <div className="aspect-square relative">
            <img 
              src="/kid.avif" 
              className="rounded-full hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90 absolute inset-0 w-full h-full" 
              alt="Arjun Aditya"
            />
          </div>
          <div className="aspect-square relative">
            <img 
              src="/flower.svg" 
              className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:invert-80 absolute inset-0 w-full h-full" 
              alt="Arjun Aditya"
            />
          </div>
        </div>
        <div className="flex ml-10 justify-center max-w-lg pt-8">
          <div className="aspect-video relative w-[400px]">
            <img 
              src="/sunset.JPEG" 
              className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90 absolute inset-0 w-full h-full" 
              alt="Arjun Aditya"
            />
          </div>
        </div>
      </div>

      <div className="md:block lg:hidden absolute -z-50 top-5 left-5">
        <img 
          src="/flower.svg" 
          width="50"
          height="50"
          className="rotate-20 dark:invert" 
          alt="Arjun Aditya"
        />
      </div>

      <div className="hidden md:block lg:hidden fixed -z-50 -right-5">
        <img 
          src="/sign.svg" 
          width="150"
          height="150"
          className="rotate-20 dark:invert" 
          alt="Arjun Aditya"
        />
      </div>
    </section>
  )
}
