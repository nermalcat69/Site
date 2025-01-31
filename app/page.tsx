import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import Image from 'next/image'

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f6f6" offset="20%" />
      <stop stop-color="#f0f0f0" offset="50%" />
      <stop stop-color="#f6f6f6" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const darkShimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#222" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function Page() {
  return (
    <section className="flex flex-col xl:justify-center md:flex-row">
      <div className="flex flex-col max-w-xl">
        <h1 className="mb-3 text-2xl">
          Arjun Aditya
        </h1>
        <p className="mb-4 text-2xl">
          {`I'm a person who does almost everything. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
        </p>
        <p className="mb-4 text-2xl opacity-80 dark:opacity-90">
          Checkout my <Link href="/work" className='Underlined'>Work</Link>, <a href="https://x.com/arjvnz" target="_blank" className='Underlined'>Twitter</a>, <a href="https://github.com/nermalcat69" target="_blank" className='Underlined'>Github</a>, <a href="https://instagram.com/nermalcat69" target="_blank" className='Underlined'>Instagram</a>, <a href="https://bento.me/arjunaditya" target="_blank" className='Underlined' >Bento</a>, and more.
        </p>
        <div className="my-8">
          <BlogPosts />
        </div>
      </div>

      <div className="hidden lg:block flex-shrink-0">
        <div className="grid grid-cols-2 ml-10 gap-4 max-w-lg relative">
          <div className="aspect-square relative">
            <Image 
              src="/portrait.png" 
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
              src="/explaining.jpg" 
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
              src="/kid.avif" 
              fill
              className="rounded-full hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0 object-cover dark:brightness-90" 
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
        <div className="flex justify-center max-w-lg pt-8">
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


      <div className=" md:block lg:hidden absolute -z-50 top-5 left-5">
        <Image 
          src="/flower.svg" 
          width={50} 
          height={50} 
          priority
          className="rotate-20 dark:invert" 
          alt="Arjun Aditya"
        />
      </div>

      <div className="hidden md:block lg:hidden fixed -z-50 -right-5">
        <Image 
          src="/sign.svg" 
          width={150} 
          height={150} 
          priority
          className="rotate-20 dark:invert" 
          alt="Arjun Aditya"
        />
      </div>
    </section>
  )
}
