import { Component, Story } from "./nodes";

export type LoggingLevel = "LOGGING_NONE" | "LOGGING_VERBOSE";

export type State = {
  loggingLevel: LoggingLevel;
  stories: Story[];
  components: Component[];
};

export type Action =
  | ActionSetLoggingLevel
  | ActionSetStories
  | ActionAddComponent
  | ActionSetAllComponents;

export type ActionSetLoggingLevel = {
  type: "setLoggingLevel";
  payload: LoggingLevel;
};

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
