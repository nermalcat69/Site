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
  const [loadedSrcImages, setLoadedSrcImages] = useState<Set<number>>(new Set());
  const [loadedWebpImages, setLoadedWebpImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (index: number) => {
    if (!windowSize || windowSize.width < 640) return;

    if (clickedIndex === index) {
      setClickedIndex(null);
      document.body.style.overflow = "auto";
    } else {
      setClickedIndex(index);
      document.body.style.overflow = "hidden";
    }
  };

  const handleImageLoad = (index: number, type: 'webp' | 'original') => {
    if (type === 'webp') {
      setLoadedWebpImages(prev => new Set(prev).add(index));
      // Start loading the original image after WebP is loaded
      const img = new Image();
      img.src = images[index].src;
      img.onload = () => {
        setLoadedSrcImages(prev => new Set(prev).add(index));
      };
    } else {
      setLoadedSrcImages(prev => new Set(prev).add(index));
    }
  };

  return (
    <>
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
                ${clickedIndex === index ? "selected z-50" : "z-0"}
                ${!loadedWebpImages.has(index) ? "animate-pulse" : ""}`}
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
                {/* Show original image if it's loaded */}
                {loadedSrcImages.has(index) && (
                  <img
                    src={image.src}
                    className="rounded-md w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    alt={image.alt}
                  />
                )}

                {/* Show WebP until original is loaded */}
                {!loadedSrcImages.has(index) && image.webp && (
                  <img
                    src={image.webp}
                    className="rounded-md w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    alt={image.alt}
                    onLoad={() => handleImageLoad(index, 'webp')}
                  />
                )}

                {/* Fallback if no WebP */}
                {!loadedSrcImages.has(index) && !image.webp && (
                  <img
                    src={image.src}
                    className="rounded-md w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    alt={image.alt}
                    onLoad={() => handleImageLoad(index, 'original')}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}