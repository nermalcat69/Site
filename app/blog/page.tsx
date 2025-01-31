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
            <div className="hidden lg:block flex-shrink-0">
        <div className="grid grid-cols-2 ml-10 gap-4 max-w-lg relative">
          <div className="aspect-square relative">
            <Image 
              src="/flower.svg" 
              fill
              priority
              className="rounded-full hover:scale-115 transition-all duration-300 object-cover dark:brightness-90" 
              alt="Arjun Aditya"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(darkShimmer(700, 700))}`}
            />
          </div>
          <div className="aspect-square relative">
            <Image 
              src="/flower.svg" 
              fill
              priority
              className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90" 
              alt="Arjun Aditya"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(darkShimmer(700, 700))}`}
            />
          </div>
          <div className="aspect-square relative">
            <Image 
              src="/watermelon.svg" 
              fill
              draggable={false}
              className="rounded-full rotate-15 transition-all duration-300 select-none object-cover dark:brightness-90" 
              alt="Arjun Aditya"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(darkShimmer(150, 150))}`}
            />
          </div>
          <div className="aspect-square relative">
            <Image 
              src="/flower.svg" 
              fill
              className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:invert-80" 
              alt="Arjun Aditya"
            />
          </div>
        </div>
        <div className="flex ml-10 justify-center max-w-lg pt-8">
          <div className="aspect-video relative w-[400px]">
            <Image 
              src="/sunset.JPEG" 
              fill
              className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90" 
              alt="Arjun Aditya"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(darkShimmer(360, 360))}`}
            />
          </div>
        </div>
      </div>

    </section>
  )
}
