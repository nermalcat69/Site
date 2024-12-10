import { useState, useEffect } from "react";

interface ImageItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  rotate?: number;
  webp?: string;
}

interface ImagesProps {
  images: ImageItem[];
}

interface WindowSize {
  width: number;
  height: number;
}

export default function Images({ images }: ImagesProps) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState<WindowSize | null>(null);

  useEffect(() => {
    // This will only run on the client
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial window size on the client
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (index: number) => {
    if (!windowSize || windowSize.width < 640) return; // Check for client-side windowSize

    if (clickedIndex === index) {
      setClickedIndex(null);
      document.body.style.overflow = "auto"; // Restore scrolling
    } else {
      setClickedIndex(index);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  };

  return (
    <>
      {/* Overlay for clicked image */}
      {clickedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => handleClick(clickedIndex)}
          aria-hidden="true"
        />
      )}
      <div className="flex justify-center px-4 sm:px-0">
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 relative w-full sm:max-w-none sm:w-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-card bg-white p-1.5 border border-[#E7E7E7] rounded-md mx-auto sm:mx-0
                ${windowSize && windowSize.width >= 640 ? "cursor-pointer" : ""} 
                ${clickedIndex === index ? "selected z-50" : "z-0"}`}
              style={{
                transform:
                  clickedIndex === index
                    ? "scale(1.7) rotate(0deg)"
                    : image.rotate
                    ? `rotate(${image.rotate}deg)`
                    : "none",
                width: image.width,
                height: image.height,
                maxWidth: "100%",
              }}
              onClick={() => handleClick(index)}
            >
              <div className="relative w-full h-full">
                {image.webp && (
                  <img
                    src={image.webp}
                    className={`rounded-md w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                      clickedIndex === index ? "opacity-100" : "opacity-100"
                    }`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    alt={image.alt}
                  />
                )}
                <img
                  src={image.src}
                  className={`rounded-md w-full h-full object-cover transition-opacity duration-300 ${
                    clickedIndex !== index && image.webp ? "opacity-0" : "opacity-100"
                  }`}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  alt={image.alt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
