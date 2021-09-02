import { Jumbotron } from "./Jumbotron";
import { Text } from "@chakra-ui/react";
import { Story } from "@storybook/react";

export default {
  title: "Components/Jumbotron",
  component: Jumbotron,
};

const data = {
  img: "https://fakeimg.pl/2000x450/?text=Image",
};

const JumbotronStory: Story = ({ loading, img = data.img, p, h }) => (
  <Jumbotron img={img} loading={loading} p={p} h={h}>
    <Text>Awesome Content</Text>
  </Jumbotron>
);

export const Main = JumbotronStory.bind({});

Main.args = {
  loading: false,
  img: data.img,
};
