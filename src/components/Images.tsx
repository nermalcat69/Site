import { useState, useEffect } from "react";

interface ImageItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  rotate?: number;
}

interface ImagesProps {
  images?: ImageItem[];
}

export default function Images({ images = [] }: ImagesProps) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    images.forEach((image) => {
      const webpImage = new Image();
      webpImage.src = `${image.src}.webp`;
    });
  }, [images]);

  const handleClick = (index: number) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

  return (
    <>
      {clickedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setClickedIndex(null)}
          aria-hidden="true"
        />
      )}
      <div className="flex justify-center px-4 sm:px-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 relative w-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-card bg-white p-1.5 border border-[#E7E7E7] rounded-md mx-auto sm:mx-0
                cursor-pointer
                ${clickedIndex === index ? "selected z-50" : "z-0"}`}
              style={{
                transform:
                  clickedIndex === index
                    ? "scale(1.7)"
                    : image.rotate
                      ? `rotate(${image.rotate}deg)`
                      : "none",
                width: image.width,
                height: image.height,
                maxWidth: "100%",
              }}
              onClick={() => handleClick(index)}
            >
              <img
                src={`${image.src}${clickedIndex === index ? ".webp" : ".webp"}`}
                className="rounded-md w-full h-full object-cover"
                alt={image.alt}
                draggable="false"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
