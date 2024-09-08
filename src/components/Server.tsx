import { useState } from 'react';

export function Server() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="flex justify-center">

      <div className="z-50 bg-neutral-800 border border-neutral-700 p-3 px-5 py-3 font-mono text-xs register duration-100 w-[90%]">
          <div className="font-bold">
          I usually hang out in <a className='ext' href="https://discord.gg/stupidgeeks" target="_blank">Stupid Geeks Server</a>. Feel Free to Join
          </div>
      </div>
      <button
        className="z-30 right-0 px-3 text-sm bg-red-500 text-white hover:bg-red-600"
        onClick={handleClose}
      >
        X
      </button>
    </div>
  ) : null;
}
