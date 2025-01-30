export const metadata = {
  title: 'Work',
  description: 'My work experience.',
}

const workExperience = [
  {
    company: 'Zerops',
    title: 'Full Stack Developer',
    period: '2023 - Present',
    description: 'Working on cloud infrastructure and developer tools. Building modern web applications using Next.js, TypeScript, and Tailwind CSS.',
    link: 'https://zerops.io'
  },
  {
    company: 'Gluo',
    title: 'Frontend Developer',
    period: '2022 - 2023',
    description: 'Developed responsive web applications using React and modern frontend technologies. Implemented UI/UX designs and improved application performance.',
    link: 'https://gluo.xyz'
  },
  {
    company: 'Freelance',
    title: 'Web Developer',
    period: '2021 - 2022',
    description: 'Worked with various clients to build custom websites and web applications. Focused on creating clean, efficient, and maintainable code.',
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
    <div className="mb-8">
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
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Work Experience</h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        {workExperience.map((work, index) => (
          <WorkItem key={index} {...work} />
        ))}
      </div>
    </section>
  )
}
