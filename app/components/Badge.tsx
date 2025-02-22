import Link from 'next/link'

export default function Badge() {
  return (
    <div className="flex items-center gap-4 my-10 py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="h-14 w-24 rounded-md bg-gradient-to-br from-neutral-400 to-neutral-500 dark:from-neutral-800 dark:to-neutral-600" />
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