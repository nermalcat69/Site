import { useState } from 'react';

export function DarkMode() {
  const [isVisible, setIsVisible] = useState(true); // Initial state is visible

  const handleClose = () => {
    setIsVisible(false); // Hide the message when close button is clicked
  };

  return isVisible ? (
    <div className="flex">

      <div className="dark:block z-50 bg-[#f7f7f7] border border-[#D7D7D7] p-3 px-5 py-3 font-mono text-xs hover:bg-[#f3f3f3] text-[#333] duration-100 w-[50%]">
        <a href="https://x.com/zNermo" target="_blank">
          <div className="font-bold">
            Sorry, I don't prefer Dark mode on my personal site.
          </div>
        </a>
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
