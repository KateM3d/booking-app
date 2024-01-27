import React from "react";

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src }) => {
  src =
    src && src.includes("https://")
      ? src
      : "http://localhost:4000/uploads/" + src;
  return (
    <img
      src={src}
      alt="image"
      className="rounded-2xl object-cover aspect-square"
    />
  );
};

export default Image;
