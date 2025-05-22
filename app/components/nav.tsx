import Link from 'next/link'

type NavItem = {
  name: string;
  targetBlank?: boolean;
}

const navItems: Record<string, NavItem> = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Blog',
  },
  'https://nermalcat69.dev': {
    name: 'My Dev Side',
    targetBlank: true,
  },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20 border border-r-5 border-r-neutral-500 border-neutral-300">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name, targetBlank }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  target={targetBlank ? '_blank' : undefined}
                  rel={targetBlank ? 'noopener noreferrer' : undefined}
                  className="transition-all hover:underline hover:text-neutral-800 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
