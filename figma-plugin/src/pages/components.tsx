import { PrimaryButton, Type12PosBold } from "figma-ui-components";
import * as React from "react";
import { render as renderToFigma } from "react-figma";
import { Story } from "../../types/nodes";
import HeaderSub from "../components/header-sub";
import StoryListItem from "../components/story-list-item";
import { FigmaRenderer } from "../renderer/FigmaRenderer";
import { useStoreState } from "../state";

const PageComponents = () => {
  const stories = useStoreState("stories");
  const [selectedStories, setSelectedStories] = React.useState<{
    [key: string]: Story;
  }>({});

  const handleStoryClick = React.useCallback(
    (id: string, value: boolean) => {
      setSelectedStories({
        ...selectedStories,
        [id]: value ? stories.find((s) => s.id === id) : null,
      });
    },
    [selectedStories, stories]
  );

  console.log("selectedStories on render", selectedStories);

  const handleApplyClick = React.useCallback(() => {
    console.log("selected stories", selectedStories);

    renderToFigma(
      <FigmaRenderer
        stories={Object.values(selectedStories).filter((s) => s !== null)}
      />
    );
  }, [selectedStories, stories]);

  return (
    <div className="w-full">
      <HeaderSub backLink="/" />
      <div className="flex flex-col gap-4 p-4">
        <Type12PosBold>Components</Type12PosBold>
        <ul className="flex flex-col gap-2">
          {stories.map((story) => (
            <StoryListItem
              key={story.id}
              id={story.id}
              checked={false}
              onChange={(value) => {
                handleStoryClick(story.id, value);
              }}
            />
          ))}
        </ul>
        <PrimaryButton onClick={handleApplyClick}>Render</PrimaryButton>
      </div>
    </div>
  );
};

export default PageComponents;
