import React from "react";
import { Story } from "@storybook/react";

import { Slideshow } from "./Slideshow";

const slidesArray = [
  {
    backdrop_path: "/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
    title: "First Slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    genre_ids: [10759, 10765],
  },
  {
    backdrop_path: "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
    title: "Second Slide",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    genre_ids: [10759, 10765],
  },
  {
    backdrop_path: "/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg",
    title: "Third Slide",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    genre_ids: [12, 35, 16],
  },
  {
    backdrop_path: "/mYM8x2Atv4MaLulaV0KVJWI1Djv.jpg",
    title: "Fourth Slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    genre_ids: [12, 35, 16],
  },
  {
    backdrop_path: "/6zbKgwgaaCyyBXE4Sun4oWQfQmi.jpg",
    title: "Fifth Slide",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    genre_ids: [12, 35, 16],
  },
];

export default {
  title: "Components/Slideshow",
  component: Slideshow,
  argTypes: {
    slides: {
      control: {
        type: "object",
      },
    },
  },
};

const TheSlideshow: Story = ({ slides = slidesArray, loading }) => (
  <Slideshow slides={slides} loading={loading} />
);

export const Default = TheSlideshow.bind({});
