import cheerio from "cheerio";
import { Component, Page, PreparedStories, Story } from "../../types/nodes";
import { getConvertedClasses as getConvertedClassesObject } from "./tailwind-object-parser";

// TODO: Arbitrary classes like "w-[16px]" are currently not respected
// TODO: padding is not respected, needs to be paddingVertical, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingBottom
// TODO: gap is not working

type SimpleComponent = Omit<Component, "section" | "name">;

export const processNode = ({
  id,
  node,
  $,
}: {
  id: string;
  node: cheerio.Element;
  $: cheerio.Root;
}): SimpleComponent => {
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
          id: `${name}-${(el as cheerio.TagElement).name || "child"}-${index}`,
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
      content: $(currentElement).parent().html(),
    };
  } else if ($(currentElement).html() !== "") {
    // console.log("got a leaf level text node");
    children = {
      tag: "text",
      content: $(currentElement).html(),
    };
  }

  const component: SimpleComponent = {
    id,
    type,
    tag,
    class: classes,
    style,
    children,
  };

  return component;
};

export const prepareStories = (stories: Story[]): PreparedStories => {
  const pages: { [key: string]: Page } = {};

  stories.forEach((s) => {
    const $ = cheerio.load(s.html);

    const nodes = {
      ...processNode({
        id: s.id,
        node: $("body").children()[0],
        $,
      }),
      section: s.title,
      name: s.name,
    };

    if (!pages[s.title]) {
      pages[s.title] = {
        title: s.title,
        components: [nodes],
      };
    } else {
      pages[s.title].components.push(nodes);
    }
  });

  return pages;
};
