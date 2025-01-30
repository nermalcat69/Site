import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import Image from 'next/image'

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
      <p className="mb-4 text-2xl opacity-60">
        Checkout my <Link href="/work" className='Underlined'>Work</Link>, <a href="https://x.com/arjvnz" target="_blank" className='Underlined'>Twitter</a>, <a href="https://github.com/nermalcat69" target="_blank" className='Underlined'>Github</a>, <a href="https://instagram.com/nermalcat69" target="_blank" className='Underlined'>Instagram</a>, <a href="https://bento.me/arjunaditya" target="_blank" className='Underlined' >Bento</a>, and more.
      </p>
      <div className="my-8">
        <BlogPosts />
        </div>
      </div>
      <div className="flex flex-col hidden md:block">
      <div className="grid grid-cols-2 ml-10 gap-4 max-w-lg">
        <Image src="/portrait.png" draggable={false} className="rounded-full hover:scale-115 transition-all duration-300" alt="Arjun Aditya" width={700} height={700} />
        <Image src="/explaining.jpg" draggable={false} className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0" alt="Arjun Aditya" width={700} height={700} />
        <Image src="/kid.avif" draggable={false} className="rounded-full hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0" alt="Arjun Aditya" width={150} height={150} />
      </div>
      <div className="flex justify-end max-w-lg pt-4">
        <Image src="/sunset.JPEG" draggable={false} className="rounded-md hover:scale-115 transition-all duration-300 grayscale hover:grayscale-0" alt="Arjun Aditya" width={360} height={360} />
      </div>
      </div>
    </section>
  )
}
