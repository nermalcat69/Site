import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import NavigationSwitcher from '~/nav';

import '~/styles/main.css';


export default function App() {
  return (
    <html lang="en" title="Open Source Boilerplates - WeekShip">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* <NavigationSwitcher /> */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
