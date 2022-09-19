import type { DecoratorFunction } from "@storybook/addons";
import { addons } from "@storybook/addons";
import { EVENT_CODE_RECEIVED } from "./constants";

export const withHTML: DecoratorFunction = (storyFn) => {
  setTimeout(() => {
    const channel = addons.getChannel();
    const rootSelector = "#root";
    const root = document.querySelector(rootSelector);
    channel.emit(EVENT_CODE_RECEIVED, { html: root.innerHTML });
  }, 0);
  return storyFn();
};
