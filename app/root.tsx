import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import BG from './components/particles/BackParticles';
import NavigationSwitcher from '~/components/nav';
import { useEffect } from 'react';

import '~/styles/main.css';


export default function App() {
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavigationSwitcher />
      <BG
        className="absolute inset-0 z-20 animate-fade-in"
        quantity={400}
      />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
