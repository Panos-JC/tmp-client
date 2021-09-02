import {
  Box,
  Skeleton,
  useColorModeValue,
  Image,
  Link,
  Text,
  Flex,
  SkeletonCircle,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface PersonCardProps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  isLoading?: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  id,
  img,
  title,
  subtitle,
  isLoading = false,
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      width="180px"
      rounded="lg"
      shadow="lg"
      onClick={() => {}}
    >
      {isLoading ? (
        <Skeleton pt="56%" width="180px" roundedTop="lg" />
      ) : (
        <Image
          src={img}
          maxWidth="180px"
          width="180px"
          alt={"Image"}
          roundedTop="lg"
          fallbackSrc="https://via.placeholder.com/185x278/222636.png?text=%20"
        />
      )}

      <Box p="4">
        <Box mt="1" lineHeight="tight" isTruncated>
          {isLoading ? (
            <Skeleton height="20px" mb={3} />
          ) : (
            <>
              <NextLink href={`/person/${id}`}>
                <Link>
                  <Text fontWeight="semibold" fontSize="lg" as="h4">
                    {title}
                  </Text>
                </Link>
              </NextLink>
              <Text fontWeight="hairline" fontSize="xs">
                {subtitle}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
