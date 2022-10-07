import { AutoLayoutProps } from "react-figma/types";

const getLayoutFromClasses = (
  classes: string
): {
  layoutMode: AutoLayoutProps["layoutMode"];
  primaryAxisSizingMode: AutoLayoutProps["primaryAxisSizingMode"];
  counterAxisSizingMode: AutoLayoutProps["counterAxisSizingMode"];
  // itemSpacing: number;
} => {
  const classesArray = classes.split(" ");

  const isFlex = classesArray.includes("flex");
  const isFlexCol = classesArray.includes("flex-col");

  const itemsStart = classesArray.includes("items-start");
  const itemsCenter = classesArray.includes("items-center");

  const hasGap = classes.includes("gap");

  return {
    layoutMode: !isFlex ? "HORIZONTAL" : isFlexCol ? "VERTICAL" : "HORIZONTAL",
    primaryAxisSizingMode: "AUTO",
    counterAxisSizingMode: "AUTO",
    // ...{ itemSpacing: hasGap ? 16 : null },
  };
};

export { getLayoutFromClasses };
