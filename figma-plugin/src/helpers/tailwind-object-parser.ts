import CheatSheet from "./tailwind-object-cheatsheet";

const arbitrarySupportedClasses = {
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  p: "padding",
  mb: "marginBottom",
  m: "margin",
  mt: "marginTop",
  ml: "marginLeft",
  mr: "marginRight",
  w: "width",
  h: "height",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  bg: "background",
  text: "color",
};

const convertToCss = (classNames: string[]) => {
  // console.log("class names", classNames);

  let cssCode = {};
  CheatSheet.forEach((element) => {
    element.content.forEach((content) => {
      content.table.forEach((list) => {
        if (classNames.includes(list[0])) {
          // console.log("match", list);
          cssCode = { ...cssCode, ...list[1] };
        }

        if (classNames.includes(list[1])) {
          // console.log("match", list);
          cssCode = { ...cssCode, ...list[2] };
        }
      });
    });
  });

  const arbitraryClasses = classNames.filter((className) =>
    className.includes("[")
  );

  return cssCode;
};

const getBreakPoints = (input: String, breakpoint: String) => {
  return input
    .split(" ")
    .filter((i: String) => i.startsWith(breakpoint + ":"))
    .map((i: String) => "." + i.substring(3));
};

const getHoverClass = (input: String) => {
  return input
    .split(" ")
    .filter((i) => i.startsWith("hover:"))
    .map((i) => i.replace("hover:", "."));
};

export const getConvertedClasses = (input) => {
  const classNames = input.split(/\s+/).map((i) => "." + i.trim());
  const breakpoints = CheatSheet[0].content[3].table;

  const hoverClasses = getHoverClass(input);

  const smClasses = getBreakPoints(input, "sm");
  const mdClasses = getBreakPoints(input, "md");
  const lgClasses = getBreakPoints(input, "lg");
  const xlClasses = getBreakPoints(input, "xl");
  const _2xlClasses = getBreakPoints(input, "2xl");

  let resultCss = convertToCss(classNames);

  // ${
  //   smClasses.length !== 0
  //     ? breakpoints[0][1].replace("...", "\n  " + convertToCss(smClasses))
  //     : ""
  // }
  // ${
  //   mdClasses.length !== 0
  //     ? breakpoints[1][1].replace("...", "\n  " + convertToCss(mdClasses))
  //     : ""
  // }
  // ${
  //   lgClasses.length !== 0
  //     ? breakpoints[2][1].replace("...", "\n  " + convertToCss(lgClasses))
  //     : ""
  // }
  // ${
  //   xlClasses.length !== 0
  //     ? breakpoints[3][1].replace("...", "\n  " + convertToCss(xlClasses))
  //     : ""
  // }
  // ${
  //   _2xlClasses.length !== 0
  //     ? breakpoints[4][1].replace("...", "\n  " + convertToCss(_2xlClasses))
  //     : ""
  // }
  // ${hoverClasses.length !== 0 ? `:hover {\n ${convertToCss(hoverClasses)} }` : ""}
  // `;

  return resultCss;
};
