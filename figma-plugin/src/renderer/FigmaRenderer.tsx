import cheerio from "cheerio";
import * as React from "react";
import { Component, Frame, Page, Svg, Text } from "react-figma";
import { defaultTextStyles } from "../helpers/default-styles";
import { getLayoutFromClasses } from "../helpers/get-layout-mode";
import { pickTextStyles } from "../helpers/pick-text-styles";
import {
  Component as ProcessedComponent,
  Leaf,
  processNode,
} from "../helpers/process-node";

export interface FigmaRendererProps {
  stories: {
    id: string;
    html: string;
    title: string;
    name: string;
  }[][];
}

export type Page = {
  title: string;
  components: ProcessedComponent[];
};

export type PreparedStories = { [key: string]: Page };

const FigmaRenderer: React.FC<FigmaRendererProps> = ({ stories }) => {
  const preparedStories = React.useMemo<PreparedStories>(() => {
    const pages: { [key: string]: Page } = {};

    stories.forEach(([s]) => {
      const $ = cheerio.load(s.html);

      const nodes = processNode({
        name: `${s.title}-${s.name}`,
        node: $("body").children()[0],
        $,
      });

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
  }, []);

  console.log("prepared stories", preparedStories);

  const renderDocument = React.useCallback(() => {
    console.log("building markup");
    const document = Object.values(preparedStories).map((p) => (
      <Page isCurrent name={p.title} key={p.title}>
        {p.components.map((c) => {
          console.log("rendering component", c.name);
          return (
            <Component
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
            </Component>
          );
        })}
      </Page>
    ));

    console.log("markup to render", document);

    return document;
  }, []);

  const renderChildren = React.useCallback(
    ({
      childrenData,
      parentStyle,
    }: {
      childrenData: ProcessedComponent[] | Leaf;
      parentStyle: object;
    }) => {
      let children: React.ReactNode = null;

      if (Array.isArray(childrenData)) {
        console.log("rendering", childrenData.length, "children");
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
        console.log("rendering an svg");
        children = <Svg source={`<svg>${childrenData.content}</svg>`} />;
      } else if (childrenData.tag === "text") {
        console.log("rendering a leaf level text");
        children = (
          <Text
            style={{ ...defaultTextStyles, ...pickTextStyles(parentStyle) }}
          >
            {(childrenData as Leaf).content}
          </Text>
        );
      }

      return children;
    },
    []
  );

  return <>{renderDocument()}</>;
};

export { FigmaRenderer };
