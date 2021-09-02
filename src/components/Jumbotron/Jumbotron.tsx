import { Box, Skeleton, VStack } from "@chakra-ui/react";
import React from "react";

interface JumbotronProps {
  img: string;
  loading: boolean;
  h?: string;
  p?: string;
}

export const Jumbotron: React.FC<JumbotronProps> = ({
  children,
  img,
  h = "450px",
  p = "100",
  loading,
}) => {
  return (
    <Skeleton borderRadius="lg" isLoaded={!loading}>
      <Box
        w="full"
        h={h}
        shadow="lg"
        borderRadius="lg"
        backgroundImage={`linear-gradient(to right, rgba(14, 17, 26, 0.8) 0%, rgba(14, 17, 26, 0) 100%), url(${img});`}
        bgPos="center"
        bgSize="cover"
      >
        <VStack
          align={{ base: "center", md: "flex-start" }}
          pos="relative"
          justify="center"
          boxSize="full"
          borderRadius="lg"
          p={{ base: "10", md: p }}
          spacing="6"
        >
          {children}
        </VStack>
      </Box>
    </Skeleton>
  );
};
