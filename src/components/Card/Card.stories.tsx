import React from "react";
import { Card } from "./Card";
import { Button } from "@chakra-ui/react";

export default {
  title: "Components/Card",
  component: Card,
};

export const Default: React.VFC<{}> = () => (
  <Card>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis eligendi
    illo animi beatae excepturi! Officiis numquam eveniet quas labore? Inventore
    dolor sed voluptas praesentium, ipsam officia error aut libero numquam.
  </Card>
);
export const WithImage: React.VFC<{}> = () => (
  <Card>
    <Card.CardImage src="https://via.placeholder.com/300.png" alt="" />
  </Card>
);
export const WithTitle: React.VFC<{}> = () => (
  <Card>
    <Card.CardImage src="https://via.placeholder.com/300.png" alt="" />
    <Card.CardTitle>Title</Card.CardTitle>
  </Card>
);
export const WithSubtitle: React.VFC<{}> = () => (
  <Card>
    <Card.CardImage src="https://via.placeholder.com/300.png" alt="" />
    <Card.CardTitle>Title</Card.CardTitle>
    <Card.CardSubtitle>Subtitle</Card.CardSubtitle>
  </Card>
);
export const WithActions: React.VFC<{}> = () => (
  <Card>
    <Card.CardImage src="https://via.placeholder.com/300.png" alt="" />
    <Card.CardTitle>Title</Card.CardTitle>
    <Card.CardSubtitle>Subtitle</Card.CardSubtitle>
    <Card.CardActionArea>
      <Card.CardPrimaryActions>
        <Button>Primary</Button>
      </Card.CardPrimaryActions>
      <Card.CardSecondaryActions>
        <Button>Secondary</Button>
      </Card.CardSecondaryActions>
    </Card.CardActionArea>
  </Card>
);
export const Loading: React.VFC<{}> = () => <Card loading />;
