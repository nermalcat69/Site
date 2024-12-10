import IMGs from "./IMGs";

const IMGs = [
    {
        src: "https://res.cloudinary.com/dyndvyaiu/IMG/upload/f_auto,q_auto/jurckpoqu6mkjdsol0xw",
        webp: "IMG_1.webp",
        width: 200,
        height: 200,
        alt: "IMG 1",
        rotate: -25
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/IMG/upload/f_auto,q_auto/bj2qxhyacuzvijj62dre",
        webp: "IMG_2.webp",
        width: 200,
        height: 200,
        alt: "IMG 2",
        rotate: 10
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/IMG/upload/f_auto,q_auto/dp6wqeppvoy96iz8yvhg",
        webp: "IMG_3.webp",
        width: 200,
        height: 200,
        alt: "IMG 3",
        rotate: -15
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/IMG/upload/f_auto,q_auto/wdv33hxli0ihsa1onpe0",
        webp: "IMG_4.webp",
        width: 200,
        height: 200,
        alt: "IMG 4",
        rotate: 20
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/IMG/upload/f_auto,q_auto/rf2mi9wzr9rzkx0byyjc",
        webp: "IMG_5.webp",
        width: 200,
        height: 200,
        alt: "IMG 5",
        rotate: -7
    },
    {
        src: "https://res.cloudinary.com/dyndvyaiu/IMG/upload/f_auto,q_auto/jxwwea8piulz4qvwyr0c",
        webp: "IMG_6.webp",
        width: 200,
        height: 200,
        alt: "IMG 6",
        rotate: 15
    }
];

export default function LovedIMGs() {
    return (
        <div className="py-12  select-none">
            <IMGs IMGs={IMGs} />
        </div>
    );
}