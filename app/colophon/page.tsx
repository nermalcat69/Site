import Link from 'next/link'

export const metadata = {
  title: 'Colophon',
  description: 'About this website and the tools used to build it.',
}

export default function Page() {
  return (
    <section className="flex flex-col max-w-2xl xl:mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="hex-title text-2xl md:text-3xl">Colophon</h1>
          <p className="hex-text mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
            /ˈkɒləfən/ · A page describing the technical details of something
          </p>
        </div>
        <div className="hidden md:block">
          <img 
            src="/lemon.svg" 
            width="30"
            height="30"
            className="dark:invert" 
            alt="Decorative lemon"
            draggable="false"
          />
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p className="hex-text text-neutral-800 dark:text-neutral-200">
          This website represents my digital garden—a space where I experiment, learn, and share. It's built with a focus on simplicity and performance, while maintaining a distinct personality.
        </p>

        <h2 className="hex-subtitle mt-8 mb-4">Technology</h2>
        <p className="hex-text mb-4">
          The foundation is built on <a href="https://nextjs.org" target="_blank" className="Underlined">Next.js 14</a>, chosen for its perfect balance of developer experience and performance. I write everything in <a href="https://www.typescriptlang.org" target="_blank" className="Underlined">TypeScript</a> because I believe in catching errors before they catch me. The styling is handled by <a href="https://tailwindcss.com" target="_blank" className="Underlined">Tailwind CSS</a>, which has transformed the way I think about CSS.
        </p>
        <p className="hex-text mb-4">
          The site is hosted on <a href="https://zerops.io" target="_blank" className="Underlined">Zerops</a>, where I also contribute as a developer. All code is version-controlled with Git and hosted on <a href="https://github.com" target="_blank" className="Underlined">GitHub</a>, allowing me to iterate and experiment freely.
        </p>

        <h2 className="hex-subtitle mt-8 mb-4">Typography</h2>
        <p className="hex-text mb-4">
          Typography is the backbone of this site's personality. The headlines are set in HEX Franklin, a font that brings a perfect blend of modern aesthetics and readability. For body text, I use <a href="https://vercel.com/font" target="_blank" className="Underlined">Geist</a>, complemented by Geist Mono for code snippets. This combination creates a harmonious reading experience while maintaining a distinct character.
        </p>

        <h2 className="hex-subtitle mt-8 mb-4">Design Philosophy</h2>
        <p className="hex-text mb-4">
          The design follows a "content-first" approach, where every element serves a purpose. Dark mode isn't just a switch—it's carefully crafted to maintain readability and reduce eye strain. The responsive design ensures the site feels native on any device, from phones to ultrawide monitors.
        </p>
        <p className="hex-text mb-4">
          Animations and transitions are subtle yet meaningful, adding life to interactions without being distracting. Icons and decorative elements are thoughtfully placed to guide the eye and add personality without overwhelming the content.
        </p>

        <h2 className="hex-subtitle mt-8 mb-4">Content & Writing</h2>
        <p className="hex-text mb-4">
          Blog posts are written in MDX, allowing me to seamlessly blend prose with interactive components. Each image is optimized using Next.js's Image component, ensuring fast load times without sacrificing quality. Code blocks are highlighted using sugar-high, making technical content both readable and visually appealing.
        </p>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="hex-text text-sm text-neutral-600 dark:text-neutral-400">
            This site is constantly evolving. Check out the{' '}
            <a href="https://github.com/nermalcat69/portfolio" target="_blank" className="Underlined">
              source code
            </a>
            {' '}to see how it's built, or to suggest improvements.
          </p>
        </div>
      </div>
    </section>
  )
} 