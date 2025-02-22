import { BlogPosts } from 'app/components/posts';
import { toBase64, darkShimmer } from 'app/lib/shimmer';

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
            <img 
              src="/orange.svg"
              width="100"
              height="100"
              draggable="false"
              className="transition-all duration-300 grayscale hover:grayscale-0 dark:invert" 
              alt="Decorative sign"
            />
          </div>
          <img 
            src="/IMG_4.webp"
            width="200"
            height="300"
            draggable="false"
            className="rounded-md transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90" 
            alt="Arjun Aditya"
          />
        </div>
      </div>
    </section>
  )
}
