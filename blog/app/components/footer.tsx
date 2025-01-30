function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16 mt-5 flex flex-wrap gap-5 xl:justify-center">
      <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            href="/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Home</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/blog"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Blog</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/side-table"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Side Table</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://zerops.io"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Deployed on Zerops</p>
          </a>
        </li>
      </ul>
      <ul className="font-sm  flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <p
            className="flex cursor-not-allowed items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          >
            <ArrowIcon />
            <span className="ml-2 h-7 cursor-not-allowed">dev</span>
          </p>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/colophon"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Colophon</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:hey@arjunaditya.xyz"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">hey@arjunaditya.xyz</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:meow@nermalcat69.dev"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">meow@nermalcat69.dev</p>
          </a>
        </li>
      </ul>
    </footer>
  )
}
