import { Flex } from "@chakra-ui/react";
import React from "react";

export interface ICardActionAreaProps {}

export const CardActionArea: React.FC<ICardActionAreaProps> = ({
  children,
}) => {
  return (
    <Flex px={4} pb={4}>
      {children}
    </Flex>
  );
};
