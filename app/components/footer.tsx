import { ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

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
  
  const content = (
    <div className={disabled ? `${baseClassName} cursor-not-allowed` : baseClassName}>
      <ArrowIcon />
      <span className={`ml-2 h-7 ${disabled ? 'cursor-not-allowed' : ''}`}>{children}</span>
    </div>
  )

  if (disabled) {
    return content
  }

  const linkContent = (
    <a 
      href={href} 
      {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
    >
      {content}
    </a>
  )

  if (tooltip) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {linkContent}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="rounded-md bg-neutral-800 px-4 py-2 text-sm text-white shadow-md"
              sideOffset={5}
              side="top"
              align="center"
            >
              {tooltip}
              <Tooltip.Arrow className="fill-neutral-800" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  }

  return linkContent
}

// Add type for the link items
type NavigationLink = {
  href: string
  label: string
  external?: boolean
}

type AdditionalLink = NavigationLink & {
  tooltip?: string
  disabled?: boolean
}

const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog", external: false },
  { href: "/", label: "Work", external: false },
  { href: "/", label: "Side Table", external: false },
  { href: "https://zerops.io", label: "Deployed on Zerops", external: true },
]

const additionalLinks: AdditionalLink[] = [
  // { 
  //   label: "dev", 
  //   href: "https://nermalcat69.dev/", 
  //   disabled: true 
  // },
  { 
    href: "/", 
    label: "Colophon", 
    external: false 
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
    <footer className="mb-16 md:mt-8 flex  flex-wrap gap-5 xl:justify-center">
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
