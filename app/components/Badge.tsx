import Image from 'next/image'
import Link from 'next/link'

export default function Badge() {
  return (
    <div className="flex items-center gap-4 my-10 py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="h-14 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
      <p className="hex-text text-sm text-neutral-600 dark:text-neutral-400">
        Download my badge to link to this site, or check out the{' '}
        <Link href="/badges" className="Underlined">
          badge collection
        </Link>
        . Let me know if you have a badge you want me to link to.
      </p>
    </div>
  )
} 