import * as React from "react";
import { Page } from "react-figma";
import { PreparedStories, Story } from "../../types/nodes";
import { LoggingLevel } from "../../types/state";
import { prepareStories } from "../utils/process-node";
import { renderComponent } from "../utils/render-component";

export interface FigmaRendererProps {
  stories: Story[];
  loggingLevel?: LoggingLevel;
}

const FigmaRenderer: React.FC<FigmaRendererProps> = ({
  stories,
  loggingLevel = "LOGGING_NONE",
}) => {
  const preparedStories = React.useMemo<PreparedStories>(() => {
    const pages = prepareStories(stories);

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
