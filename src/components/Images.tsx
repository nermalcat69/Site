import { useState, useEffect } from 'react';

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
    const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
    const [webpLoaded, setWebpLoaded] = useState<{ [key: string]: boolean }>({});
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePngLoad = (src: string) => {
        setLoadedImages(prev => ({
            ...prev,
            [src]: true
        }));
    };

    const handleWebpLoad = (src: string) => {
        setWebpLoaded(prev => ({
            ...prev,
            [src]: true
        }));
    };

    const handleClick = (index: number) => {
        if (windowSize.width < 640) return;

        if (clickedIndex === index) {
            setClickedIndex(null);
            document.body.style.overflow = 'auto';
        } else {
            setClickedIndex(index);
            document.body.style.overflow = 'hidden';
        }
    };

    return (
        <>
            {clickedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
                    onClick={() => handleClick(clickedIndex)}
                />
            )}
            <div className="flex justify-center px-4 sm:px-0">
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 relative w-full sm:max-w-none sm:w-auto">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`image-card bg-white p-1.5 border border-[#E7E7E7] rounded-md mx-auto sm:mx-0
                                ${windowSize.width >= 640 ? 'cursor-pointer' : ''} 
                                ${clickedIndex === index ? 'selected z-50' : 'z-0'}`}
                            style={{
                                transform: clickedIndex === index
                                    ? 'scale(1.7) rotate(0deg)'
                                    : image.rotate
                                        ? `rotate(${image.rotate}deg)`
                                        : 'none',
                                width: image.width,
                                height: image.height,
                                maxWidth: '100%'
                            }}
                            onClick={() => handleClick(index)}
                        >
                            <div className="relative w-full h-full">
                                {image.webp && (
                                    <img
                                        src={image.webp}
                                        className={`rounded-md w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${loadedImages[image.src] ? 'opacity-0' : 'opacity-100'
                                            }`}
                                        loading="eager"
                                        decoding="async"
                                        draggable="false"
                                        alt={image.alt}
                                        onLoad={() => handleWebpLoad(image.src)}
                                    />
                                )}
                                <img
                                    src={image.src}
                                    className={`rounded-md w-full h-full object-cover transition-opacity duration-300 ${loadedImages[image.src] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    loading={webpLoaded[image.src] ? 'eager' : 'lazy'}
                                    decoding="async"
                                    draggable="false"
                                    alt={image.alt}
                                    onLoad={() => handlePngLoad(image.src)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}