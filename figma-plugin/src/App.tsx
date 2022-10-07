import {
  Divider,
  PrimaryButton,
  SecondaryButton,
  Type12Pos,
} from "figma-ui-components";
import React, { ChangeEvent } from "react";
import { render as reactFigmaRender } from "react-figma";
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
    // console.log(event.target.files);
    setSelectedStoriesFiles(event.target.files);
  };

  const handleApplyPress = React.useCallback(async () => {
    const s = await prepareFiles(selectedStoriesFiles);
    // console.log("stories to render", s);
    reactFigmaRender(<FigmaRenderer stories={s} />);
  }, [selectedStoriesFiles]);

  const handleCancelPress = () => {
    // console.log("cancel... post message", parent);
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <div>
      <Type12Pos>
        Open the stories.json exported from storybook-addon-ftr
      </Type12Pos>
      <div style={{ height: "8px" }} />
      <input
        type="file"
        onChange={handleFilesSelected}
        multiple={true}
        accept=".json,application/json"
        // directory=""
        // webkitdirectory=""
      />
      <div style={{ height: "8px" }} />
      <Divider />
      <PrimaryButton
        disabled={!selectedStoriesFiles || selectedStoriesFiles.length === 0}
        onClick={handleApplyPress}
        style={{ marginRight: "8px" }}
      >
        Apply
      </PrimaryButton>
      <SecondaryButton onClick={handleCancelPress}>Cancel</SecondaryButton>
    </div>
  );
};

export { App };
