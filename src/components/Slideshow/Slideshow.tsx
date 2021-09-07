import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Stack,
  Text,
  HStack,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import React, { useState } from "react";
import { Movie } from "../../redux/slices/movie/types";
import getImageUrl from "../../utils/getImageUrl";
import { movieGenres } from "../../utils/constants/genreIds";
import { Tv } from "../../redux/slices/tv/types";

const arrowStyles = {
  cursor: "pointer",
  top: "50%",
  w: "auto",
  mt: "-22px",
  p: "16px",
  color: "whiteAlpha.500",
  fontWeight: "bold",
  fontSize: "35px",
  transition: "0.3s ease",
  _hover: {
    color: "whiteAlpha.800",
  },
};

interface SlideshowProps {
  slides: Movie[] | Tv[];
  loading: boolean;
}

export const Slideshow: React.FC<SlideshowProps> = ({ slides, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide(s => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide(s => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = slide => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  if (loading) {
    return (
      <Box h="450px" w="full" bg="backgroundLight" borderRadius="lg">
        <VStack
          align={{ base: "center", md: "flex-start" }}
          pos="relative"
          justify="center"
          boxSize="full"
          borderRadius="lg"
          p={{ base: "10", md: "100" }}
          spacing="6"
        >
          <Skeleton height="21px" minW="20%" />
          <Skeleton height="40px" minW="40%" />
          <VStack align="flex-start" w="full">
            <Skeleton height="16px" minW="50%" />
            <Skeleton height="16px" minW="50%" />
            <Skeleton height="16px" minW="50%" />
            <Skeleton height="16px" minW="35%" />
          </VStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Flex w="full" pos="relative" overflow="hidden" shadow="lg">
      <Flex h="450px" w="full" {...carouselStyle}>
        {slides.map((slide, i) => (
          <Box
            key={`slide-${i}`}
            boxSize="full"
            backgroundImage={`linear-gradient(to right, rgba(14, 17, 26, 0.8) 0%, rgba(14, 17, 26, 0) 100%), url(${getImageUrl(
              1280,
              slide.backdrop_path
            )});`}
            bgPos="center"
            bgSize="cover"
            shadow="md"
            flex="none"
            borderRadius="lg"
          >
            <VStack
              align={{ base: "center", md: "flex-start" }}
              pos="relative"
              justify="center"
              boxSize="full"
              borderRadius="lg"
              p={{ base: "10", md: "100" }}
              spacing="6"
            >
              <Breadcrumb
                fontWeight="medium"
                color="gray.300"
                separator="|"
                fontSize="sm"
              >
                {slide.genre_ids.map(id => (
                  <BreadcrumbItem key={id}>
                    <BreadcrumbLink href="#">{movieGenres[id]}</BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
              <Heading fontWeight="black">{slide.title || slide.name}</Heading>
              {/* <HStack spacing="6">
                  <Button
                    leftIcon={<FaPlay />}
                    w="160px"
                    iconSpacing="10%"
                    bg="rgba(34, 38, 54, 0.7)"
                    size="sm"
                  >
                    Watch Trailer
                  </Button>
                  <Button
                    leftIcon={<IoMdCheckmark />}
                    w="160px"
                    iconSpacing="10%"
                    bg="rgba(34, 38, 54, 0.7)"
                    size="sm"
                  >
                    Mark as Seen
                  </Button>
                </HStack> */}
              <Text
                lineHeight="1.1"
                color="gray.300"
                w={{ base: "full", md: "55%" }}
                textAlign="justify"
              >
                {slide.overview}
              </Text>
            </VStack>
          </Box>
        ))}
      </Flex>
      <Text pos="absolute" {...arrowStyles} left="0" onClick={prevSlide}>
        <MdKeyboardArrowLeft />
      </Text>
      <Text pos="absolute" {...arrowStyles} right="0" onClick={nextSlide}>
        <MdKeyboardArrowRight />
      </Text>
      <HStack justify="center" pos="absolute" bottom="8px" w="full">
        {Array.from({ length: slidesCount }).map((_, slide) => (
          <Box
            key={`dots-${slide}`}
            cursor="pointer"
            w={[5, , 10]}
            h="0.5"
            m="0 2px"
            bg={currentSlide === slide ? "primary.500" : "whiteAlpha.500"}
            display="inline-block"
            transition="background-color 0.3s ease"
            _hover={{ bg: "whiteAlpha.800" }}
            onClick={() => setSlide(slide)}
          ></Box>
        ))}
      </HStack>
    </Flex>
  );
};
