import cheerio from "cheerio";
import * as React from "react";
import { Component, Page, Rectangle, Text } from "react-figma";
import { defaultTextStyles } from "../helpers/default-styles";
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

export interface Page {
  title: string;
  components: ProcessedComponent[];
}

const FigmaRenderer: React.FC<FigmaRendererProps> = ({ stories }) => {
  const preparedStories = React.useMemo<{ [key: string]: Page }>(() => {
    const pages: { [key: string]: Page } = {};

    stories.forEach(([s]) => {
      const $ = cheerio.load(s.html);

      const nodes = processNode(
        $("body").children()[0],
        `${s.title}-${s.name}`,
        $
      );

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

  return (
    <>
      {Object.values(preparedStories).map((p) => (
        <Page isCurrent name={p.title} key={p.title}>
          {p.components.map((c) => (
            <Component
              key={c.name}
              name={c.name}
              layoutMode="HORIZONTAL"
              style={c.style}
              {...c.style}
            >
              {Array.isArray(c.children) ? (
                <Rectangle></Rectangle>
              ) : (
                <Text
                  style={{ ...defaultTextStyles, ...pickTextStyles(c.style) }}
                >
                  {(c.children as Leaf).content}
                </Text>
              )}
            </Component>
          ))}
        </Page>
      ))}
    </>
  );
};

export { FigmaRenderer };
