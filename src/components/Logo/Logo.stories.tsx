import React from "react";
import { Story } from "@storybook/react";
import { Logo } from "./Logo";

export default {
  title: "Components/Logo",
  component: Logo,
};

const LogoStory: Story = ({ width }) => <Logo width={width} />;

export const Main = LogoStory.bind({});

Main.args = {
  width: "100",
};
