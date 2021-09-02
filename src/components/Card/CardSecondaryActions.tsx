import { Flex } from "@chakra-ui/react";
import React from "react";

export interface ICardSecondaryActionsProps {}

export const CardSecondaryActions: React.FC<ICardSecondaryActionsProps> = ({
  children,
}) => {
  return (
    <Flex flexGrow={1} justifyContent="flex-end">
      {children}
    </Flex>
  );
};
