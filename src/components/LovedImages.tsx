import ImageGallery from "./Images";

const Images = [
  {
    src: "IMG_1",
    width: 200,
    height: 200,
    alt: "IMG 1",
    rotate: -25,
  },
  {
    src: "IMG_2",
    width: 200,
    height: 200,
    alt: "IMG 2",
    rotate: 10,
  },
  {
    src: "IMG_3",
    width: 200,
    height: 200,
    alt: "IMG 3",
    rotate: -15,
  },
  {
    src: "IMG_4",
    width: 200,
    height: 200,
    alt: "IMG 4",
    rotate: 20,
  },
  {
    src: "IMG_5",
    width: 200,
    height: 200,
    alt: "IMG 5",
    rotate: -7,
  },
  {
    src: "IMG_6",
    width: 200,
    height: 200,
    alt: "IMG 6",
    rotate: 15,
  },
];

export default function LovedImages() {
  return (
    <div className="py-12  select-none">
      <ImageGallery images={Images} />
    </div>
  );
}
