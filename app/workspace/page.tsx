export default function Workspace() {
  return (
    <section className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-7xl font-semibold tracking-normal text-neutral-900 dark:text-neutral-100">My Workspace</h1>
        <p className='mt-2 opacity-50 text-neutral-600 dark:text-neutral-400'>Random Tech Stuff I Own</p>
      </div>
      <ul className="mb-4 text-lg text-neutral-800 dark:text-neutral-200">
        <li>
          - iMac 2017 (i5 6th Gen, 28GB RAM & 1TB HDD)
        </li>
        <li>
          - Macbook Air (M3, 16GB RAM & 256GB SSD)
        </li>
        <li>
          - iPhone 15 (128GB)
        </li>
        <li>
          - Canon Rebel T6I (750D)
        </li>
        <li>
          - Rode NT USB Mini
        </li>
      </ul>
    </section>
  )
}
