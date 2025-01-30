import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export const workExperience = [
  {
    company: 'Gluo',
    title: 'Frontend Developer',
    description: 'My work experience.',
  },
  {
    company: 'Zerops',
    title: 'Full Stack Developer',
    description: 'My work experience.',
  },
]

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Work Experience</h1>

    </section>
  )
}
