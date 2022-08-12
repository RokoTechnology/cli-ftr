import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import HeaderMain from "../components/headers/HeaderMain";

export default {
  title: "Components/Headers",
  component: HeaderMain,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HeaderMain>;

const Template: ComponentStory<typeof HeaderMain> = (args) => <HeaderMain />;

export const Minimal = Template.bind({});
Minimal.args = {};
