import React from "react";
import { Component, Frame, Svg, Text } from "react-figma";
import { BlendStyleProperties } from "react-figma/styleTransformers/transformBlendProperties";
import { LayoutStyleProperties } from "react-figma/styleTransformers/transformLayoutStyleProperties";
import { TextStyleProperties } from "react-figma/styleTransformers/transformTextStyleProperties";
import { StyleOf } from "react-figma/types";
import { YogaStyleProperties } from "react-figma/yoga/YogaStyleProperties";
import { Component as ComponentType, Leaf } from "../../types/nodes";
import { LoggingLevel } from "../../types/state";

import { defaultTextStyles } from "./default-styles";
import { getLayoutFromClasses } from "./get-figma-layout";
import { pickTextStyles } from "./pick-text-styles";

export const renderComponent = (
  c: ComponentType,
  loggingLevel: LoggingLevel = "LOGGING_NONE"
) => {
  const layout = React.useMemo(() => {
    const l = getLayoutFromClasses(c.class, true);

    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("component level layout", c.class, l);
    }

    return l;
  }, []);

  return (
    <Component
      key={c.id}
      name={`${c.section}/${c.name}`}
      style={c.style}
      {...c.style}
      {...layout}
    >
      {c.children &&
        renderChildren({
          childrenData: c.children,
          parentStyle: c.style,
          loggingLevel,
        })}
    </Component>
  );
};

const renderChildren = ({
  childrenData,
  parentStyle,
  loggingLevel = "LOGGING_NONE",
}: {
  childrenData: ComponentType[] | Leaf;
  parentStyle: object;
  loggingLevel?: LoggingLevel;
}) => {
  let children: React.ReactNode = null;

  if (Array.isArray(childrenData)) {
    /**
     * There can be multiple children
     */

    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("rendering", childrenData.length, "children");
    }

    children = childrenData.map((c) => {
      const layout = getLayoutFromClasses(c.class);

      if (loggingLevel === "LOGGING_VERBOSE") {
        console.log("component child layout", c.class, layout);
      }

      return (
        <Frame
          key={c.id}
          name={c.name}
          style={c.style}
          {...c.style}
          {...layout}
        >
          {c.children &&
            renderChildren({
              childrenData: c.children,
              parentStyle: { ...parentStyle, ...c.style },
              loggingLevel,
            })}
        </Frame>
      );
    });
  } else if (childrenData.tag === "svg") {
    /**
     * There can be a single SVG child
     */

    // TODO: How to make fill and border colors work if those are set dynamically with e.g. "currentColor"?

    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("rendering an svg", childrenData.content);
    }

    children = <Svg source={childrenData.content} />;
  } else if (childrenData.tag === "text") {
    /**
     * There can be just a string as a child, which equates to a leaf-level text
     */

    const textStyles = pickTextStyles(parentStyle);

    const combinedStyle: StyleOf<
      YogaStyleProperties &
        LayoutStyleProperties &
        TextStyleProperties &
        BlendStyleProperties
    > = {
      ...defaultTextStyles,
      ...textStyles,
      fontWeight: "bold",
    };

    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("rendering a leaf level text");
      console.log("picking text styles form parent styles", combinedStyle);
    }

    children = (
      <Text style={combinedStyle}>{(childrenData as Leaf).content}</Text>
    );
  }

  return children;
};
