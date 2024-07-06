// import { Suspense } from 'react';
// import { Await, useLoaderData } from '@remix-run/react';

import { Footer } from '~/components/footer';

type Props = {
  children: React.ReactNode
}

export default function Team({children}: Props) {
  return (
    <>
      <main>
      <h2 className='text-2xl font-medium items-center justify-center'>Comin Soon. Join our <a href="https://discord.gg/NrYft2Mq" target="_blank" className="font-semibold underline">Discord Server</a> for now.</h2>
      {/* {children} */}
      </main>

      <Footer>
      </Footer>
    </>
  );
}
