import {
  Divider,
  Label,
  PrimaryButton,
  SecondaryButton,
} from "figma-ui-components";
import React, { ChangeEvent } from "react";
import { render as reactFigmaRender } from "react-figma";
import mockData from "./data/mockStories.json";
import { prepareFiles } from "./helpers/prepare-files";
import { FigmaRenderer } from "./renderer/FigmaRenderer";

export type Story = {
  id: string;
  html: string;
};

// parent.postMessage({ pluginMessage: { type: "render-some" } }, "*");

const App = () => {
  const [selectedStoriesFiles, setSelectedStoriesFiles] =
    React.useState<FileList>(null);

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setSelectedStoriesFiles(event.target.files);
  };

  const handleApplyPress = React.useCallback(async () => {
    const s = await prepareFiles(selectedStoriesFiles);
    console.log("stories to render", s);
    reactFigmaRender(<FigmaRenderer stories={s} />);
  }, [selectedStoriesFiles]);

  const handleMockApplyPress = React.useCallback(() => {
    reactFigmaRender(<FigmaRenderer stories={mockData} />);
  }, []);

  const handleCancelPress = () => {
    console.log("cancel... post message", parent);
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <div>
      <Label>Open the stories.json exported from storybook-addon-ftr</Label>
      <input
        type="file"
        onChange={handleFilesSelected}
        multiple={true}
        accept=".json,application/json"
        // directory=""
        // webkitdirectory=""
      />

      <Divider />
      <PrimaryButton
        disabled={!selectedStoriesFiles || selectedStoriesFiles.length === 0}
        onClick={handleApplyPress}
      >
        Apply
      </PrimaryButton>
      <SecondaryButton onClick={handleCancelPress}>Cancel</SecondaryButton>
    </div>
  );
};

export { App };
