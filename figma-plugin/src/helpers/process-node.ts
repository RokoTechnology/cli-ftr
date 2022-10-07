import { getConvertedClasses as getConvertedClassesObject } from "./tailwind-object-parser";

export type Component = {
  name: string;
  type: "text" | "tag" | "script" | "style" | "comment";
  tag: string; // TODO better typing
  class: string;
  style: object;
  children: Component[] | Leaf;
};

export type Leaf = LeafText | LeafSVG;

export type LeafText = {
  tag: "text";
  content: string;
};

export type LeafSVG = {
  tag: "svg";
  content: string;
};

// TODO: Arbitrary classes like "w-[16px]" are not respected
// TODO: padding is not respected, needs to be paddingVertical, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingBottom
// TODO: gap is not working

export const processNode = ({
  name,
  node,
  $,
}: {
  name: string;
  node: cheerio.Element;
  $: cheerio.Root;
}): Component => {
  const currentElement = node;

  const type = currentElement.type;
  const tag = currentElement.type === "tag" ? currentElement.name : "text";

  const classes = $(currentElement).attr("class");
  const style = classes ? getConvertedClassesObject(classes) : {};

  // console.log("node classes", classes);
  // console.log("node type", type);
  // console.log("node tag", tag);

  const c = $(currentElement).children();

  let children = null;

  if (tag !== "svg" && c.length > 0) {
    // there are actual children and it's not an svg
    // console.log("got", c.length, "children");
    children = [];
    c.map((index, el) => {
      children.push(
        processNode({
          name: `${name}-${
            (el as cheerio.TagElement).name || "child"
          }-${index}`,
          node: el,
          $,
        })
      );
    });
  } else if (tag === "svg") {
    // it's an svg
    // console.log("got an svg node");
    children = {
      tag: "svg",
      content: $(currentElement).html(),
    };
  } else if ($(currentElement).html() !== "") {
    // console.log("got a leaf level text node");
    children = {
      tag: "text",
      content: $(currentElement).html(),
    };
  }

  // console.log("children", children);

  const component: Component = {
    name,
    type,
    tag,
    class: classes,
    style,
    children,
  };

  return component;
};
