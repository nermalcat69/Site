import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="mb-8 h-screen flex flex-col justify-center">
      {/* <Image src="/kid.avif" alt="kid profile photo" width={100} height={100} className="rounded-full backdrop-hue-rotate-180 backdrop-saturate-125 mb-2" draggable={false} /> */}
      <h1 className="text-5xl md:text-7xl tracking-wide leading-normal font-semibold  tracking-tighter text-neutral-900 dark:text-neutral-100">
        Arjun is {" "}
        <a href="https://indie.nermalcat69.dev" target='_blank' className='underline underline-offset-10 relative hover:text-neutral-600 cursor-alias dark:hover:text-neutral-400 transition-colors'>
          Indie Hacking
        </a>.
      </h1>
        <p className='opacity-50 mt-2 text-neutral-600 dark:text-neutral-400'>Based in Delhi, India</p>
        <p className="mt-5 mb-4 text-xl font-medium max-w-2xl tracking-wide text-neutral-800 dark:text-neutral-300">
        {`I'm a Chronically Online Programmer / Designer who started interacting with computers in 2015.`}
        <br />
        <br />
        {`I'm more of a creative & annoying guy than just a tech guy.`}
      </p>
      </div>
      <div>
      <p className="mb-4 text-xl text-neutral-800 dark:text-neutral-200">
        {`Doodling and Analyzing world politics and economies while focusing on evolutionary biology and how humans behave the way they do - watching ads is my thing(i don't use adblockers).`}
      </p>
      <p className="mb-4 text-xl text-neutral-800 dark:text-neutral-200 font-medium">
        {`I Love Sharp Corners, Running and Talking ~ People think I'm High when I'm talking.`}
      </p>
      <p className="mb-4 text-xl text-neutral-800 dark:text-neutral-200 font-medium">
        Previously worked at <a href="https://zerops.io" target='_blank' className='underline underline-offset-4 relative hover:text-neutral-600 cursor-alias dark:hover:text-neutral-400 transition-colors'>Zerops</a>, a startup that provides a platform for developers to deploy their apps.
      </p>
      {/* <div className="my-8"> */}
        {/* <BlogPosts /> */}
      {/* </div> */}
      <div>
        <p className="mb-4 text-xl text-neutral-800 dark:text-neutral-200">
          You can mail me at <a href="mailto:hey@arjunaditya.xyz" className='underline underline-offset-4 text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-100'>hey@arjunaditya.xyz</a> or <a href="mailto:meow@nermalcat69.dev" className='underline underline-offset-4 text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-100'>meow@nermalcat69.dev</a>(dev reasons).
        </p>
      </div>
      </div>
    </section>
  )
}
