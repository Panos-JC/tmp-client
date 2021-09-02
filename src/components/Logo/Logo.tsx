import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface LogoProps {
  width?: string;
}

export const Logo: React.FC<LogoProps> = ({ width }) => {
  return (
    <Heading fontWeight="black" color="primary.500" lineHeight="1" w={width}>
      tmp
    </Heading>
  );
};
