import { Box, Button, chakra, Flex, Heading, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface CarouselProps {
  title: string;
  href?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  title,
  href,
  children,
}) => {
  return (
    <Box mt={10}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl">{title}</Heading>

        {href && (
          <NextLink href={href}>
            <Button size="xs" w="20">
              See All
            </Button>
          </NextLink>
        )}
      </Flex>
      <chakra.div
        pos="relative"
        css={{
          "&:after": {
            content: "''",
            width: "60px",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(14,17,26,0) 0%, #0E111A 100%)",
          },
        }}
      >
        <HStack overflowY="hidden" spacing="6" py={6}>
          {children}
        </HStack>
      </chakra.div>
    </Box>
  );
};
