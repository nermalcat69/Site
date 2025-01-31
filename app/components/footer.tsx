import { ReactNode } from 'react'

type FooterLinkProps = {
  href: string
  children: ReactNode
  external?: boolean
  tooltip?: string
  disabled?: boolean
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

function FooterLink({ href, children, external, tooltip, disabled }: FooterLinkProps) {
  const baseClassName = "flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
  
  if (disabled) {
    return (
      <p className={`${baseClassName} cursor-not-allowed`}>
        <ArrowIcon />
        <span className="ml-2 h-7 cursor-not-allowed">{children}</span>
      </p>
    )
  }

  const linkProps = external ? {
    rel: "noopener noreferrer",
    target: "_blank"
  } : {}

  const content = (
    <a href={href} className={baseClassName} {...linkProps}>
      <ArrowIcon />
      <p className="ml-2 h-7">{children}</p>
    </a>
  )

  if (tooltip) {
    return (
      <div className="group relative inline-block">
        {content}
        <div className="absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-md border border-neutral-200 bg-white p-2 text-sm text-neutral-800 transition-opacity group-hover:block dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {tooltip}
        </div>
      </div>
    )
  }

  return content
}

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog", external: false },
  { href: "/work", label: "Work", external: false },
  { href: "/side-table", label: "Side Table", external: false },
  { href: "https://zerops.io", label: "Deployed on Zerops", external: true },
]

const additionalLinks = [
  // { 
  //   label: "dev", 
  //   href: "https://nermalcat69.dev/", 
  //   disabled: true 
  // },
  { 
    href: "/colophon", 
    label: "Colophon", 
    external: true 
  },
  {
    href: "mailto:hey@arjunaditya.xyz",
    label: "hey@arjunaditya.xyz",
    external: true,
    tooltip: "For general inquiries, collaborations, and business opportunities"
  },
  {
    href: "mailto:meow@nermalcat69.dev",
    label: "meow@nermalcat69.dev",
    external: true,
    tooltip: "For development and technical inquiries only"
  }
]

export default function Footer() {
  return (
    <footer className="mb-16 md:mt-5 flex  flex-wrap gap-5 xl:justify-center">
      <nav aria-label="Primary footer navigation" className="w-full xl:w-auto">
        <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          {navigationLinks.map(({ href, label, external }) => (
            <li key={href}>
              <FooterLink href={href} external={external}>
                {label}
              </FooterLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Secondary footer navigation" className="w-full xl:w-auto">
        <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          {additionalLinks.map(({ href, label, external, disabled, tooltip }) => (
            <li key={href}>
              <FooterLink 
                href={href}
                external={external}
                disabled={disabled}
                tooltip={tooltip}
              >
                {label}
              </FooterLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
