import { Flex } from "@chakra-ui/react";
import React from "react";

export interface ICardPrimaryActionsProps {}

export const CardPrimaryActions: React.FC<ICardPrimaryActionsProps> = ({
  children,
}) => {
  return <Flex justifyContent="flex-start">{children}</Flex>;
};
