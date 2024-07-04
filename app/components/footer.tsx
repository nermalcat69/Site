import * as React from 'react';

export function Footer() {
  return (
    <footer className="items-center">
      <a target="_blank" href="https://zerops.io" aria-label="Zerops" rel="noreferrer" className="zerops">
      <img src="zerops.svg" width="30px" alt="" draggable="false" />
      </a>

      <div className="details">
        <p>
          Powered by{' '}
          <button className="ExLink">
          <a className="font-semibold" target="_blank" href="https://remix.run" rel="noreferrer">
            Remix
          </a>
          </button>{' '}
          on{' '}
          <button className="ExLink">
          <a className="font-semibold" target="_blank" href="https://zerops.io" rel="noreferrer">
            Zerops
          </a>
          </button>
        </p>
      </div>

      <a target="_blank" href="/changelog" className="source font-medium bg-neutral-50  text-black px-4 py-2" rel="noreferrer">
        Changelog
      </a>
    </footer>
  );
}
