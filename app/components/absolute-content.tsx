import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "https://zerops.io/": {
    name: "deploy",
  },
};

export function Absolute() {
  return (
    <div>
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
        <a
          href="http"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-200 sm:bottom-auto"
        >
        <svg width="25" viewBox="0 0 53 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.736 0.32959L3.18447 8.65807C2.24469 9.03061 1.43797 9.68122 0.869807 10.5248C0.301648 11.3684 -0.00150052 12.3658 5.58481e-06 13.3864V34.3534L9.90443 28.5983V16.8091L26.5037 10.3694V0C25.8997 0.00131553 25.3008 0.112972 24.736 0.32959Z" fill="#323232"/>
          <path d="M10.0799 47.2802L26.5037 37.7094V26.1484L1.12835 40.942C0.78677 41.1443 0.503128 41.433 0.305298 41.7797C0.107467 42.1264 0.00225512 42.5192 0 42.9195V50.6649C0.00852938 51.6768 0.316353 52.6631 0.883864 53.4967C1.45137 54.3303 2.2526 54.9732 3.18446 55.3425L24.736 63.671C25.3008 63.8876 25.8997 63.9993 26.5037 64.0006V53.6312L10.0799 47.2802Z" fill="#323232"/>
          <path d="M51.9115 22.8558C52.2354 22.6683 52.5038 22.3966 52.689 22.069C52.8741 21.7414 52.9693 21.3696 52.9647 20.9923V13.3864C52.9662 12.3658 52.663 11.3684 52.0949 10.5248C51.5267 9.68121 50.72 9.0306 49.7802 8.65807L28.2162 0.32959C27.6553 0.114468 27.0608 0.00283646 26.4609 0V10.3694L42.7593 16.7077L26.4609 26.2024V37.7634L51.9115 22.8558Z" fill="#1A1A1A"/>
          <path d="M28.2513 63.676L49.8154 55.3475C50.7472 54.9781 51.5485 54.3353 52.116 53.5017C52.6835 52.668 52.9913 51.6818 52.9998 50.6698V29.4873L43.0954 35.2678V47.2218L26.4961 53.6361V64.0056C27.096 64.0027 27.6904 63.8911 28.2513 63.676Z" fill="#1A1A1A"/>
        </svg>
        </a>
        <a
          href="https://github.com/nermalcat69/Site"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-200 sm:bottom-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

// <aside className="-ml-[8px] mb-16 tracking-tight">
//   <div className="lg:sticky lg:top-20">
//     <nav
//       className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
//       id="nav"
//     >
//       <div className="flex flex-row space-x-0 pr-10">
//         {Object.entries(navItems).map(([path, { name }]) => {
//           return (
//             <Link
//               key={path}
//               href={path}
//               className="transition-all hover:text-neutral-800 flex align-middle relative py-1 px-2 m-1"
//             >
//               {name}
//             </Link>
//           )
//         })}
//       </div>
//     </nav>
//   </div>
// </aside>
