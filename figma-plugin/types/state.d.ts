import { Component, Story } from "./nodes";

export type State = {
  stories: Story[];
  components: Component[];
};

export type Action =
  | ActionSetStories
  | ActionAddComponent
  | ActionSetAllComponents;

export type ActionSetStories = {
  type: "setStories";
  payload: Story[];
};

export type ActionAddComponent = {
  type: "addComponent";
  payload: Component;
};

export type ActionSetAllComponents = {
  type: "setAllComponents";
  payload: Component[];
};
