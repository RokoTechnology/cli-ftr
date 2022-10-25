import classNames from "classnames";
import { Divider, Type12Pos } from "figma-ui-components";
import React, { ChangeEvent } from "react";

export interface FileSelectorProps {
  onPositivePress: (stories: FileList) => void;
}

const FileSelector = ({ onPositivePress }) => {
  const [selectedStoriesFiles, setSelectedStoriesFiles] =
    React.useState<FileList>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string>(null);

  const handleFilesSelected = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedFileName(event.target.files[0].name);
      setSelectedStoriesFiles(event.target.files);
    },
    []
  );

  const handleNextPressed = () => {
    onPositivePress(selectedStoriesFiles);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <Type12Pos>
        Open the stories.json exported from storybook-addon-ftr or the command
        line interface.
      </Type12Pos>
      <label htmlFor="file-input" className="flex flex-row ">
        <span className="flex items-center flex-shrink h-8 px-4 font-semibold text-white cursor-pointer text-2xs bg-figma-blue rounded-l-3">
          Choose a file
        </span>
        <span
          className={classNames(
            "flex items-center flex-grow h-8 px-4 bg-white border border-l-0 border-gray-200 text-2xs rounded-r-3",
            {
              "text-gray-500": !selectedFileName,
              "text-black": selectedFileName,
            }
          )}
        >
          {selectedFileName || `No file chosen`}
        </span>
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFilesSelected}
          multiple={true}
          accept=".json,application/json"
        />
      </label>
      <Divider />
      <div className="flex flex-row gap-4">
        <button
          className="w-full h-8 px-4 font-semibold text-white cursor-pointer bg-figma-blue text-2xs rounded-3 disabled:bg-gray-300"
          disabled={!selectedStoriesFiles || selectedStoriesFiles.length === 0}
          onClick={handleNextPressed}
        >
          Import Stories
        </button>
      </div>
    </div>
  );
};

export default FileSelector;
