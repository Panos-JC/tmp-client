import { Box, LinkOverlay, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export interface ICardTitleProps {
  href?: string;
  isLoading?: boolean;
}

export const CardTitle: React.FC<ICardTitleProps> = props => {
  const { href, isLoading = false, children } = props;

  return (
    <Box
      mt="1"
      px={4}
      pt={4}
      fontWeight="semibold"
      fontSize="lg"
      lineHeight="tight"
      isTruncated
    >
      {isLoading ? (
        <Skeleton height="20px" mb={3} />
      ) : href ? (
        <NextLink href={href} passHref>
          <LinkOverlay>
            <Text>{children}</Text>
          </LinkOverlay>
        </NextLink>
      ) : (
        <Text>{children}</Text>
      )}
    </Box>
  );
};
