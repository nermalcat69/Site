import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <div className="mb-8 ">
        <h1 className="text-4xl font-semibold tracking-tighter">Arjun Aditya</h1>
        <p className='opacity-50'>Based in Delhi, India</p>
      </div>
      <p className="mb-4 text-lg">
        {`I'm a Chronically Online Programmer / Designer who started interacting with computers in 2015 at age 9 before that I used to play Mini Militia on LAN. I love philosophy, photography and making random video diaries(which i dont post).`}
      </p>
      <p className="mb-4 text-lg">
        {`I'm lucky to say that I got the exposure in web3 before it was cool ~ currently trying to play around with solana.`}
      </p>
      <p className="mb-4 text-lg">
      🧸 Check my dev side if you're interested in that <a href="https://nermalcat69.dev" className='font-medium hover:underline'>nermalcat69.dev</a>.
      </p>
      <p className="mb-4 text-lg">
        {`Doodling and Analyzing world politics and economies while focusing on evolutionary biology and how humans behave the way they do - watching ads is my thing(i don't use adblockers).`}
      </p>
      <p className="mb-4 text-lg">
        I'd love to be a creative fun guy at a tech company <span className='italic'>(gotta be my fav role)</span> and cater to the public and company growth.
      </p>
      <p className="mb-4 text-lg text-blue-800 font-semibold">
        {`I Love Sharp Corners, Running and Talking ~ People think I'm High when I'm talking.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <div>
        <p className="mb-4 text-lg">
          You can mail me at <a href="mailto:hey@arjunaditya.xyz" className='underline text-blue-800'>hey@arjunaditya.xyz</a> or <a href="mailto:meow@nermalcat69.dev" className='underline text-blue-800'>meow@nermalcat69.dev</a>(work reasons).
        </p>
      </div>
      <div className="flex flex-row space-x-4 mb-10">
        <img src="badge1.gif" alt="Me" className="w-[60px] border border-neutral-400" draggable={false} />
      </div>
    </section>
  )
}
