import React from "react";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    variant: "secondary",
    label: "Button",
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};
