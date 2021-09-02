import React from "react";
import { Story } from "@storybook/react";
import { Carousel } from "./Carousel";
import { Box } from "@chakra-ui/react";

export default {
  title: "Components/Carousel",
  component: Carousel,
};

const CarouselStory: Story = ({ title, href }) => (
  <Carousel title={title} href={href}>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
    <Box bg="tomato" minW="230px" p={4} color="white">
      Some awesome content...
    </Box>
  </Carousel>
);

export const Main = CarouselStory.bind({});

Main.args = {
  title: "Title",
  href: "",
};
