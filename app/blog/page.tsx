import { BlogPosts } from 'app/components/posts'
import { toBase64, darkShimmer } from 'app/page'
import Image from 'next/image'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section className="flex flex-col xl:justify-center md:flex-row">
      <div>
        <h1 className="hex-title text-2xl mb-8">My Blog</h1>
        <BlogPosts />
      </div>
      <div className="hidden lg:block flex-shrink-0 lg:py-10 lg:ml-20">
        <div className="relative">
          <div className="absolute -top-12 -right-8 z-10">
            <Image 
              src="/orange.svg"
              width={100}
              draggable={false}
              height={100}
              className=" transition-all duration-300 grayscale hover:grayscale-0 dark:invert" 
              alt="Decorative sign"
            />
          </div>
          <Image 
            src="/mcleod.jpg" 
            width={200}
            height={300}
            draggable={false}
            className="rounded-md transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90" 
            alt="Arjun Aditya"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(darkShimmer(360, 360))}`}
          />
        </div>
      </div>
    </section>
  )
}
