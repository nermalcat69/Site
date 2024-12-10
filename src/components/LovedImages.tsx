import Images from "./Images";

const images = [
    { 
        src: "IMG_1.png", 
        webp: "IMG_1.webp",
        width: 200, 
        height: 200, 
        alt: "Image 1",
        rotate: -25 
    },
    { 
        src: "IMG_2.png", 
        webp: "IMG_2.webp",
        width: 200, 
        height: 200, 
        alt: "Image 2",
        rotate: 10
    },
    { 
        src: "IMG_3.png", 
        webp: "IMG_3.webp",
        width: 200, 
        height: 200, 
        alt: "Image 3",
        rotate: -15
    },
    { 
        src: "IMG_4.png", 
        webp: "IMG_4.webp",
        width: 200, 
        height: 200, 
        alt: "Image 4",
        rotate: 20
    },
    { 
        src: "IMG_5.png", 
        webp: "IMG_5.webp",
        width: 200, 
        height: 200, 
        alt: "Image 5",
        rotate: -7
    },
    { 
        src: "IMG_6.png", 
        webp: "IMG_6.webp",
        width: 200, 
        height: 200, 
        alt: "Image 6",
        rotate: 15
    }
];

export default function LovedImages() {
    return (
        <div className="py-12  select-none">
            <Images images={images} />
        </div>
    );
}