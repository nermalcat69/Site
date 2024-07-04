import { motion } from 'framer-motion';
import { NavLink, useLocation } from '@remix-run/react';

const SECTION_DATA = [
  { label: 'Docs', target: '_blank' , href: 'https://docs.merpi.dev/', x: '62%' },
  { label: 'Blog', href: '/blog', x: '38%' },
  { label: 'Templates', href: '/templates', x: '38%' },
  { label: 'Sponsors', href: '/sponsors', x: '0%' },
  { label: 'Showcase', href: '/showcase', x: '0%' },
  { label: 'Team', href: '/team', x: '0%' },
];

export default function NavigationSwitcher() {
  const { pathname } = useLocation();
  const activeSection = SECTION_DATA.find(
    (section) => section.href === pathname
  );

  const buttons = SECTION_DATA.map((section) => {
    return (

      <NavLink
        target={section.target}
        to={section.href}
        className={({ isActive, isPending }) =>
          `nav-link ${isActive ? 'active' : isPending ? 'pending' : ''}`
        }
        key={section.label}
      >
        {({ isActive }) => {
          return (
            <>
              <div style={{ position: 'relative', zIndex: 2 }}>
                {section.label}
              </div>
              {isActive ? (
                <>
                  <motion.div
                    aria-hidden
                    className="nav-glow"
                    layoutId="glow"
                    transition={{
                      delay: 0.03,
                      type: 'spring',
                      stiffness: 125,
                      damping: 20,
                      mass: 1,
                    }}
                    style={{ scale: 2, opacity: 0.2, rotate: 0.00001 }}
                  />
                  <motion.div
                    aria-hidden
                    className="nav-pill"
                    layoutId="pill"
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 20,
                      mass: 1,
                    }}
                  />
                </>
              ) : null}
            </>
          );
        }}
      </NavLink>
    );
  });

  return (
    <>
      <nav className='navbar hidden'>
        <div className="logo-with-text">
        <a href='/'>Arjun Aditya</a>
        </div>
        <div aria-hidden className="nav-stroke" />
        <div className="nav-switcher">{buttons}</div>  
        <div className='items-center flex flex-row flex-end space-x-3'>
          <button className="ButtonLink">
          <a target="_blank" href="https://github.com/trymerpi/" className="source flex flex-row border-gray-200 border text-black whitespace-nowrap	px-6  py-2 rounded-full font-medium w-full bg-white hover:bg-[#F2F2F2] duration-100 ease-in" rel="noreferrer">
            Sponsor Us
          </a>
          </button>
          <button className="ButtonLink">
          <a target="_blank" href="https://github.com/trymerpi/" className="source flex flex-row bg-black hover:bg-[#1F1F1F] duration-100 ease-in  text-white px-5  py-2 rounded-full font-medium" rel="noreferrer">
            Contribute
          </a>
          </button>
        </div>
      </nav>
    </>
  );
}
