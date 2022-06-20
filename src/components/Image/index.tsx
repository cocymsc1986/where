import { Image as ImageType } from "../../types";

type ImageProps = {
  activeIndex: number;
  correctGuessIndex?: number;
  images: ImageType[];
};

const Image = ({ activeIndex, correctGuessIndex, images }: ImageProps) => {
  const getCurrentImage = (): ImageType => {
    const currentImage = images[correctGuessIndex || activeIndex];

    return activeIndex < 5 ? currentImage : images[4];
  };

  const image = getCurrentImage();

  return <img src={image.imageUrl} alt={image.name} />;
};

export { Image };
