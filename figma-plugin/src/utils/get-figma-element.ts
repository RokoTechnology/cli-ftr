import { Rectangle, Svg, Text } from "react-figma";

const mapToFigma = (htmlElement) => {
  switch (htmlElement) {
    case "div":
    case "button":
    case "hr":
      return Rectangle;

    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "span":
    case "p":
      return Text;

    case "svg":
      return Svg;

    default:
      return Rectangle;
  }
};

export { mapToFigma };
