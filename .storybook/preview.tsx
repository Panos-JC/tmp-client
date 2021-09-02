import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoryContext } from "@storybook/react";
import { theme } from "../src/styles/theme";
import "../src/styles/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const withChakra = (StoryFn: Function, context: StoryContext) => {
  return (
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
