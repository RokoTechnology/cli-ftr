import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "react-daisyui";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click me!</Button>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  href: undefined,
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  href: undefined,
  color: "secondary",
};

export const Large = Template.bind({});
Large.args = {
  href: undefined,
  size: "lg",
};

export const Small = Template.bind({});
Small.args = {
  href: undefined,
  size: "sm",
};
