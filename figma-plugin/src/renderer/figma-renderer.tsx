import cheerio from "cheerio";
import * as React from "react";
import { Page } from "react-figma";
import { Page as PageType, PreparedStories, Story } from "../../types/nodes";
import { LoggingLevel } from "../../types/state";
import { processNode } from "../utils/process-node";
import { renderComponent } from "../utils/render-utils";

export interface FigmaRendererProps {
  stories: Story[];
  loggingLevel?: LoggingLevel;
}

const FigmaRenderer: React.FC<FigmaRendererProps> = ({
  stories,
  loggingLevel = "LOGGING_NONE",
}) => {
  const preparedStories = React.useMemo<PreparedStories>(() => {
    const pages: { [key: string]: PageType } = {};

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

    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("figma renderer initialized");
      console.log("prepared stories", pages);
    }

    return pages;
  }, []);

  return (
    <Page isCurrent name="library">
      {Object.values(preparedStories).map((p) => (
        <React.Fragment key={p.title}>
          {p.components.map((c) => renderComponent(c, loggingLevel))}
        </React.Fragment>
      ))}
    </Page>
  );
};

export { FigmaRenderer };
