import { Server } from "./Server";

export default function SomeComponent() {
  return (
    <div className="flex flex-col justify-center mb-5 sm:mb-10">
      <span className="group relative w-fit">
        <img
          src="mona-by-github.gif"
          className="gif"
          width={50}
          height={50}
          draggable="false"
          alt=""
        />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-float">
          <div className="bg-white border shadow-sm border-gray-200 text-gray-800 text-xs text-center rounded py-1.5 px-1.5 whitespace-nowrap">
            Namaste 🙏
          </div>
        </div>
      </span>
      <Server />
    </div>
  );
}
