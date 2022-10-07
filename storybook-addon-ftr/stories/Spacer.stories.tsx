import React from "react";
import { Spacer } from "./Spacer";

export default {
  title: "Example/Spacer",
  component: Spacer,
  parameters: {
    w: 16,
    h: 16,
    show: false,
  },
};

const Template = (args) => <Spacer {...args} />;

export const Default = Template.bind({});
Default.args = {
  w: 16,
  h: 16,
  show: false,
};
