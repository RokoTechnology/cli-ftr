import classNames from "classnames";
import { Type12Pos } from "figma-ui-components";
import React, { ChangeEvent } from "react";

export interface FileSelectorProps {
  onChange: (stories: FileList) => void;
}

const FileSelector = ({ onChange }: FileSelectorProps) => {
  const [selectedFileName, setSelectedFileName] = React.useState<string>(null);

  const handleFilesSelected = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedFileName(event.target.files[0].name);
      onChange(event.target.files);
    },
    []
  );

  return (
    <div className="flex flex-col w-full gap-6">
      <Type12Pos>
        Open the stories.json exported from ftr-cli to import storybook stories
        as components.
      </Type12Pos>
      <label htmlFor="file-input" className="flex flex-row ">
        <span className="flex items-center flex-shrink h-8 px-4 font-semibold text-white cursor-pointer text-2xs bg-accent-blue rounded-l-3">
          Choose a file
        </span>
        <span
          className={classNames(
            "flex items-center flex-grow h-8 px-4 bg-white border border-l-0 border-slate-200 text-2xs rounded-r-3",
            {
              "text-slate-500": !selectedFileName,
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
    </div>
  );
};

export default FileSelector;
