import Image from 'next/image'
import Badge from 'app/components/Badge'

export const metadata = {
  title: 'Work',
  description: 'My work experience.',
}

const workExperience = [
  {
    company: 'Zerops',
    title: 'Full Stack Developer',
    period: '2024 - Present',
    description: 'Working on cloud infrastructure and developer tools. Building modern web applications using TypeScript, PostgresSQL, Redis, and more.',
    link: 'https://zerops.io'
  },
  // {
  //   company: 'Gluo',
  //   title: 'Frontend Developer',
  //   period: '2022 - 2023',
  //   description: 'Designed in Figma and Rewrote a bit of it in Svelte.',
  //   link: 'https://gluo.xyz'
  // },
  {
    company: 'Freelance',
    title: 'Web Developer',
    period: '2020 - 2024',
    description: 'Built custom static sites and full stack web applications. Worked with WordPress and Ghost.',
    link: null
  }
];

function WorkItem({ company, title, period, description, link }: {
  company: string;
  title: string;
  period: string;
  description: string;
  link: string | null;
}) {
  return (
    <div className="mb-8 group">
      <h2 className="font-medium text-xl mb-1 text-neutral-800 dark:text-neutral-100">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {company}
          </a>
        ) : (
          company
        )}
      </h2>
      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
        <span>{title}</span>
        <span>•</span>
        <span>{period}</span>
      </div>
      <p className="mt-3 text-neutral-700 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
}

export default function WorkPage() {
  return (
    <section className="relative">
      <div className="absolute z-10 top-0 right-0">
      <p className="hidden sm:block text-md italic md:text-lg max-w-md">
          Started programming and video editing in 2017. Explored Web Development and Financial Markets in 2021, followed by freelance work with WordPress and <a href="https://ghost.org" target="_blank" className="Underlined">Ghost</a> in 2022.
        </p>
      </div>
      <div className="absolute hidden xl:block -z-10 bottom-0 left-0">
        <Image 
          src="/seaweed.svg" 
          width={200} 
          height={200} 
          alt="Decorative circles"
          className="opacity-40 dark:opacity-90"
          draggable={false}
        />
      </div>

      {/* Main content */}
      <div className="max-w-2xl xl:mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="hex-title text-2xl md:text-3xl">Work</h1>
            <p className="hex-text mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
              My professional journey
            </p>
          </div>
          {/* <div className="hidden md:block">
            <Image 
              src="/cube.svg" 
              width={40} 
              height={40} 
              priority
              className="dark:invert" 
              alt="Decorative cube"
              draggable={false}
            />
          </div> */}
        </div>

        <div className="prose prose-neutral dark:prose-invert">
          {workExperience.map((work, index) => (
            <WorkItem key={index} {...work} />
          ))}
        </div>

        <Badge />
      </div>
    </section>
  )
}
