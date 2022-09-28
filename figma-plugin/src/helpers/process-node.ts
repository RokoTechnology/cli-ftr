import postcss from "postcss";
import postcssJs from "postcss-js";
import {
  getConvertedClasses as getConvertedClassesCSS,
  getConvertedClasses as getConvertedClassesObject,
} from "./tailwind-object-parser";

export interface Component {
  name: string;
  tag: string; // TODO better typing
  class: string;
  style: object;
  children: Component[] | Leaf;
}

export interface Leaf {
  tag: "text";
  content: string;
}

export const processNode = (
  node: any,
  name: string,
  $: cheerio.Root
): Component => {
  let currentElement = $("body").children()[0];

  const style = getConvertedClassesObject($(currentElement).attr("class"));

  const component: Component = {
    name,
    // @ts-ignore
    tag: currentElement.name,
    class: $(currentElement).attr("class"),
    style,
    children:
      $(currentElement).children().length > 0
        ? ($(currentElement)
            .children()
            .map((index, el) =>
              processNode(el, "child", $)
            ) as unknown as Component[])
        : {
            tag: "text",
            content: $(currentElement).html(),
          },
  };

  return component;
};

export const processNodePostCSS = (
  node: any,
  name: string,
  $: cheerio.Root
): Component => {
  let currentElement = $("body").children()[0];

  const style = postcssJs.objectify(
    postcss.parse(getConvertedClassesCSS($(currentElement).attr("class")))
  );

  console.log("generated style", style);

  const component: Component = {
    name,
    // @ts-ignore
    tag: currentElement.name,
    class: $(currentElement).attr("class"),
    style,
    children:
      $(currentElement).children().length > 0
        ? ($(currentElement)
            .children()
            .map((index, el) =>
              processNode(el, "child", $)
            ) as unknown as Component[])
        : {
            tag: "text",
            content: $(currentElement).html(),
          },
  };

  return component;
};
