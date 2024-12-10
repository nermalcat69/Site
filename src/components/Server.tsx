import { useState } from 'react';

export function Server() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="flex justify-center">

      <div className="z-10 text-[#464646] border border-[#E7E7E7] p-3 px-5 py-3 font-mono text-xs register duration-100 w-[90%]">
          <div className="font-bold">
          I usually hang out in my <a href="https://discord.gg/eYwPEBwD49" target="_blank">Nermo Server</a>. Feel Free to Join!
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
