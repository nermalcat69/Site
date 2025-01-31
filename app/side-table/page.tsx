import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Side Table',
  description: 'Collection of side projects and experiments.',
}

type Project = {
  title: string
  description: string
  link: string
  category: 'featured' | 'open-source' | 'experiment'
}

const projects: Project[] = [
  {
    title: 'Gluo',
    description: 'A minimal, modern starter template for building fast web applications.',
    link: 'https://github.com/nermalcat69/gluo',
    category: 'featured'
  },
  {
    title: 'Ghost Themes',
    description: 'Collection of minimal and modern Ghost CMS themes.',
    link: 'https://github.com/nermalcat69/ghost-themes',
    category: 'featured'
  },
  {
    title: 'Dotfiles',
    description: 'My personal dotfiles and system configuration.',
    link: 'https://github.com/nermalcat69/dotfiles',
    category: 'open-source'
  },
  // Add more projects as needed
]

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-1"
      aria-hidden="true"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link 
      href={project.link} 
      target="_blank"
      className="group block"
    >
      <div className="flex flex-col space-y-2">
        <h3 className="hex-subtitle text-lg group-hover:text-neutral-800 dark:group-hover:text-neutral-100">
          {project.title}
          <ArrowIcon />
        </h3>
        <p className="hex-text text-sm text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>
      </div>
    </Link>
  )
}

export default function SideTablePage() {
  return (
    <section className="max-w-2xl xl:mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="hex-title text-2xl md:text-3xl">Side Table</h1>
          <p className="hex-text mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
            A collection of projects and experiments
          </p>
        </div>
        <div className="hidden md:block">
          <Image 
            src="/orange.svg" 
            width={40} 
            height={40} 
            priority
            className="dark:invert" 
            alt="Decorative orange"
            draggable={false}
          />
        </div>
      </div>

      <div className="space-y-16">
        {/* Featured Projects */}
        <div>
          <h2 className="hex-subtitle text-xl mb-6">Featured</h2>
          <div className="space-y-8">
            {projects
              .filter(p => p.category === 'featured')
              .map(project => (
                <ProjectCard key={project.title} project={project} />
              ))}
          </div>
        </div>

        {/* Open Source */}
        <div>
          <h2 className="hex-subtitle text-xl mb-6">Open Source</h2>
          <div className="space-y-8">
            {projects
              .filter(p => p.category === 'open-source')
              .map(project => (
                <ProjectCard key={project.title} project={project} />
              ))}
          </div>
        </div>

        {/* Experiments */}
        <div>
          <h2 className="hex-subtitle text-xl mb-6">Experiments</h2>
          <div className="space-y-8">
            {projects
              .filter(p => p.category === 'experiment')
              .map(project => (
                <ProjectCard key={project.title} project={project} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
