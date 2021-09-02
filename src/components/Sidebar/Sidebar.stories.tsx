import React from "react";
import { Story } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { Box } from "@chakra-ui/layout";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
};

const TheSidebar: Story = () => (
  <Box w="sm" justifyContent="center">
    <Sidebar />
  </Box>
);

export const Main = TheSidebar.bind({});
