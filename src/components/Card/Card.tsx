import { LinkBox } from "@chakra-ui/layout";
import { Box, Skeleton, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { CardActionArea, ICardActionAreaProps } from "./CardActionArea";
import { CardImage, ICardImageProps } from "./CardImage";
import {
  CardPrimaryActions,
  ICardPrimaryActionsProps,
} from "./CardPrimaryActions";
import {
  CardSecondaryActions,
  ICardSecondaryActionsProps,
} from "./CardSecondaryActions";
import { CardSubtitle, ICardSubtitleProps } from "./CardSubtitle";
import { CardTitle, ICardTitleProps } from "./CardTitle";

interface ICardComposition {
  CardImage?: React.FC<ICardImageProps>;
  CardTitle?: React.FC<ICardTitleProps>;
  CardSubtitle?: React.FC<ICardSubtitleProps>;
  CardActionArea?: React.FC<ICardActionAreaProps>;
  CardPrimaryActions?: React.FC<ICardPrimaryActionsProps>;
  CardSecondaryActions?: React.FC<ICardSecondaryActionsProps>;
}

interface ICardProps {
  width?: string | {};
  minW?: string;
  loading?: boolean;
}

export const Card: React.FC<ICardProps> & ICardComposition = ({
  children,
  width = "260px",
  minW = "inherit",
  loading = false,
}) => {
  if (loading) {
    return (
      <LinkBox minW={minW} h="full">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          width={width}
          rounded="lg"
          shadow="lg"
          onClick={() => {}}
          h="full"
        >
          <CardImage src="" alt="" isLoading={true} />
          <CardTitle isLoading={true} />
          <CardSubtitle isLoading={true} />
          <CardActionArea>
            <CardSecondaryActions>
              <Skeleton w="32px" h="32px" borderRadius="lg" />
            </CardSecondaryActions>
          </CardActionArea>
        </Box>
      </LinkBox>
    );
  }
  return (
    <LinkBox minW={minW} h="full">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        width={width}
        rounded="lg"
        shadow="lg"
        onClick={() => {}}
        h="full"
      >
        {children}
      </Box>
    </LinkBox>
  );
};

Card.CardImage = CardImage;
Card.CardTitle = CardTitle;
Card.CardSubtitle = CardSubtitle;
Card.CardActionArea = CardActionArea;
Card.CardPrimaryActions = CardPrimaryActions;
Card.CardSecondaryActions = CardSecondaryActions;
