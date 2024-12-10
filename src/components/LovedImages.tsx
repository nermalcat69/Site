import Images from "./Images";

const images = [
    {
        src: "https://res.cloudinary.com/dyndvyaiu/image/upload/f_auto,q_auto/jurckpoqu6mkjdsol0xw",
        webp: "Image_1.webp",
        width: 200,
        height: 200,
        alt: "Image 1",
        rotate: -25
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/image/upload/f_auto,q_auto/bj2qxhyacuzvijj62dre",
        webp: "Image_2.webp",
        width: 200,
        height: 200,
        alt: "Image 2",
        rotate: 10
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/image/upload/f_auto,q_auto/dp6wqeppvoy96iz8yvhg",
        webp: "Image_3.webp",
        width: 200,
        height: 200,
        alt: "Image 3",
        rotate: -15
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/image/upload/f_auto,q_auto/wdv33hxli0ihsa1onpe0",
        webp: "Image_4.webp",
        width: 200,
        height: 200,
        alt: "Image 4",
        rotate: 20
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/image/upload/f_auto,q_auto/rf2mi9wzr9rzkx0byyjc",
        webp: "Image_5.webp",
        width: 200,
        height: 200,
        alt: "Image 5",
        rotate: -7
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/image/upload/f_auto,q_auto/jxwwea8piulz4qvwyr0c",
        webp: "Image_6.webp",
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