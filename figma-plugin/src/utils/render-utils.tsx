import React from "react";
import { Component, Frame, Svg, Text } from "react-figma";
import { Component as ComponentType, Leaf } from "../../types/nodes";
import { LoggingLevel } from "../../types/state";

import { defaultTextStyles } from "./default-styles";
import { getLayoutFromClasses } from "./get-figma-layout";
import { pickTextStyles } from "./pick-text-styles";

export const renderComponent = (
  c: ComponentType,
  loggingLevel: LoggingLevel = "LOGGING_NONE"
) => {
  return (
    <Component
      key={c.id}
      name={`${c.section}/${c.name}`}
      style={c.style}
      {...c.style}
      {...getLayoutFromClasses(c.class)}
    >
      {c.children &&
        renderChildren({
          childrenData: c.children,
          parentStyle: c.style,
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

    children = childrenData.map((c) => (
      <Frame
        key={c.name}
        name={c.name}
        style={c.style}
        {...c.style}
        {...getLayoutFromClasses(c.class)}
      >
        {c.children &&
          renderChildren({
            childrenData: c.children,
            parentStyle: c.style,
          })}
      </Frame>
    ));
  } else if (childrenData.tag === "svg") {
    /**
     * There can be a single SVG child
     */
    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("rendering an svg", childrenData.content);
    }

    children = <Svg source={`<svg>${childrenData.content}</svg>`} />;
  } else if (childrenData.tag === "text") {
    /**
     * There can be just a string as a child, which equates to a leaf-level text
     */
    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("rendering a leaf level text");
    }

    children = (
      <Text style={{ ...defaultTextStyles, ...pickTextStyles(parentStyle) }}>
        {(childrenData as Leaf).content}
      </Text>
    );
  }

  return children;
};
