import { Box, Skeleton, Text } from "@chakra-ui/react";
import React from "react";

export interface ICardSubtitleProps {
  isLoading?: boolean;
}

export const CardSubtitle: React.FC<ICardSubtitleProps> = props => {
  const { isLoading = false, children } = props;
  return (
    <Box px={4} pb={4}>
      {isLoading ? (
        <Skeleton height="10px" />
      ) : (
        <Text
          fontSize="smaller"
          overflow="hidden"
          whiteSpace="nowrap"
          color="InactiveCaptionText"
        >
          {children}
        </Text>
      )}
    </Box>
  );
};
