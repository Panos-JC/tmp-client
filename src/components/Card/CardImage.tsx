import { Skeleton, Image } from "@chakra-ui/react";
import React from "react";

export interface ICardImageProps {
  src: string;
  alt: string;
  width?: string | {};
  isLoading?: boolean;
}

export const CardImage: React.FC<ICardImageProps> = props => {
  const { src, alt, width = "full", isLoading = false } = props;

  return (
    <>
      {isLoading ? (
        <Skeleton pt="56%" width="100%" roundedTop="lg" />
      ) : (
        <Image
          src={src}
          width={width}
          alt={alt}
          roundedTop="lg"
          fallbackSrc="https://via.placeholder.com/500x281/222636.png?text=%20"
        />
      )}
    </>
  );
};
