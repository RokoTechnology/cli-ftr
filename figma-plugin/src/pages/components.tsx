import { Disclosure, DisclosureItem, Type12PosBold } from "figma-ui-components";
import * as React from "react";
import { render as renderToFigma } from "react-figma";
import { Story } from "../../types/nodes";
import Button from "../components/button";
import HeaderSub from "../components/header-sub";
import MoreOptions from "../components/more-options";
import StoryListItem from "../components/story-list-item";
import { FigmaRenderer } from "../renderer/figma-renderer";
import { useStoreState } from "../state";

export type CategorizedStories = {
  [key: string]: {
    [key: string]: {
      [key: string]: Story;
    };
  };
};

const PageComponents = () => {
  const loggingLevel = useStoreState("loggingLevel");
  const stories = useStoreState("stories");

  const [selectedStories, setSelectedStories] = React.useState<{
    [key: string]: Story;
  }>({});

  const [mainDisclosureState, setMainDisclosureState] = React.useState<
    string[]
  >([]);

  const [subDisclosureState, setSubDisclosureState] = React.useState<string[]>(
    []
  );

  const categorizedStories = React.useMemo(() => {
    return stories.reduce<CategorizedStories>((acc, story) => {
      const sectionParts = story.title.split("/");
      const mainSection = sectionParts[0].trim();
      const subSection = sectionParts[1].trim();

      if (acc.hasOwnProperty(mainSection)) {
        if (!acc[mainSection].hasOwnProperty(subSection)) {
          acc[mainSection][subSection] = {};
        }
      } else {
        acc[mainSection] = {};
        acc[mainSection][subSection] = {};
      }

      acc[mainSection][subSection][story.id] = story;

      return acc;
    }, {});
  }, [stories]);

  const handleMainDisclosureClick = React.useCallback(
    (key: string) => {
      setMainDisclosureState(
        mainDisclosureState.includes(key)
          ? mainDisclosureState.filter((k) => k !== key)
          : [...mainDisclosureState, key]
      );
    },
    [mainDisclosureState]
  );

  const handleSubDisclosureClick = React.useCallback(
    (key: string) => {
      setSubDisclosureState(
        subDisclosureState.includes(key)
          ? subDisclosureState.filter((k) => k !== key)
          : [...subDisclosureState, key]
      );
    },
    [subDisclosureState]
  );

  const handleStoryClick = React.useCallback(
    (id: string, value: boolean) => {
      setSelectedStories({
        ...selectedStories,
        [id]: value ? stories.find((s) => s.id === id) : null,
      });
    },
    [selectedStories, stories]
  );

  const handleApplyClick = React.useCallback(() => {
    if (loggingLevel === "LOGGING_VERBOSE") {
      console.log("selected stories", selectedStories);
    }

    renderToFigma(
      <FigmaRenderer
        stories={Object.values(selectedStories).filter((s) => s !== null)}
        loggingLevel={loggingLevel}
      />
    );
  }, [selectedStories, stories]);

  return (
    <div className="flex flex-col h-full">
      <HeaderSub backLink="/" />
      <div className="flex flex-col flex-grow gap-4 p-4 overflow-y-scroll">
        <Type12PosBold>Components</Type12PosBold>
        <Disclosure>
          {Object.entries(categorizedStories).map(([key, entry]) => (
            <DisclosureItem
              key={key}
              label={key}
              // isSection
              isExpanded={mainDisclosureState.includes(key)}
              onClick={() => {
                handleMainDisclosureClick(key);
              }}
              content={
                <Disclosure>
                  {Object.entries(entry).map(([key2, entry2]) => (
                    <DisclosureItem
                      key={key2}
                      label={key2}
                      // isSection
                      isExpanded={subDisclosureState.includes(key2)}
                      onClick={() => {
                        handleSubDisclosureClick(key2);
                      }}
                      content={
                        <div className="flex flex-col gap-2">
                          {Object.entries(entry2).map(([key3, story]) => (
                            <StoryListItem
                              key={key3}
                              id={story.id}
                              checked={false}
                              onChange={(value) => {
                                handleStoryClick(story.id, value);
                              }}
                            />
                          ))}
                        </div>
                      }
                    />
                  ))}
                </Disclosure>
              }
            />
          ))}
        </Disclosure>
      </div>
      <div className="flex flex-row gap-2 p-2 border-t border-t-slate-200">
        <Button variant="primary" onClick={handleApplyClick}>
          Import Components
        </Button>
        <MoreOptions />
      </div>
    </div>
  );
};

export default PageComponents;
