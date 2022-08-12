import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import CardProduct from "../components/cards/CardProduct";

export default {
  title: "Components/Cards/Product",
  component: CardProduct,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CardProduct>;

const Template: ComponentStory<typeof CardProduct> = (args) => (
  <CardProduct {...args} className="max-w-sm" />
);

export const Minimal = Template.bind({});
Minimal.args = {};
