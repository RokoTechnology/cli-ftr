import { AutoLayoutProps } from "react-figma/types";

export type Layout = {
  layoutMode?: AutoLayoutProps["layoutMode"];
  primaryAxisSizingMode?: AutoLayoutProps["primaryAxisSizingMode"];
  counterAxisSizingMode?: AutoLayoutProps["counterAxisSizingMode"];
  primaryAxisAlignItems?: AutoLayoutProps["primaryAxisAlignItems"];
  counterAxisAlignItems?: AutoLayoutProps["counterAxisAlignItems"];
  itemSpacing?: AutoLayoutProps["itemSpacing"];
};

const getLayoutFromClasses = (classes: string): Layout => {
  const classesArray = classes.split(" ");

  const isFlex = classesArray.includes("flex");
  const isFlexCol = classesArray.includes("flex-col");

  const itemsStart = classesArray.includes("items-start");
  const itemsCenter = classesArray.includes("items-center");

  const hasGap = classes.includes("gap");

  const layout: Layout = {
    layoutMode: !isFlex ? "HORIZONTAL" : isFlexCol ? "VERTICAL" : "HORIZONTAL",
    primaryAxisSizingMode: "AUTO",
    counterAxisSizingMode: "AUTO",
    // ...{ itemSpacing: hasGap ? 16 : null },
  };

  console.log("calculated layout", layout);

  return layout;
};

export { getLayoutFromClasses };
