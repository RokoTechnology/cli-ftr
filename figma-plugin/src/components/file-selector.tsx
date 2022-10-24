import { Divider, PrimaryButton, Type12Pos } from "figma-ui-components";
import React, { ChangeEvent } from "react";

export interface FileSelectorProps {
  onPositivePress: (stories: FileList) => void;
}

const FileSelector = ({ onPositivePress }) => {
  const [selectedStoriesFiles, setSelectedStoriesFiles] =
    React.useState<FileList>(null);

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedStoriesFiles(event.target.files);
  };

  const handleNextPressed = () => {
    onPositivePress(selectedStoriesFiles);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <Type12Pos>
        Open the stories.json exported from storybook-addon-ftr
      </Type12Pos>
      <input
        type="file"
        onChange={handleFilesSelected}
        multiple={true}
        accept=".json,application/json"
        // directory=""
        // webkitdirectory=""
      />
      <Divider />
      <div className="flex flex-row gap-4">
        <PrimaryButton
          disabled={!selectedStoriesFiles || selectedStoriesFiles.length === 0}
          onClick={handleNextPressed}
          className="w-full"
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FileSelector;
