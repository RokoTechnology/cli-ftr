import { useNavigate } from "@reach/router";
import React from "react";
import CapSwanLogo from "../assets/capswan-logo.svg";
import Button from "../components/button";
import FileSelector from "../components/file-selector";
import MoreOptions from "../components/more-options";
import { dispatch } from "../state";
import { prepareFiles } from "../utils/prepare-files";

const PageHome = () => {
  const navigate = useNavigate();
  const [selectedStoriesFiles, setSelectedStoriesFiles] =
    React.useState<FileList>(null);

  const handleFilesSelected = React.useCallback((stories: FileList) => {
    console.log("handleFilesSelected", stories);
    setSelectedStoriesFiles(stories);
  }, []);

  const handleNextClicked = React.useCallback(async () => {
    const s = await prepareFiles(selectedStoriesFiles);

    console.log("stories", s[0]);

    dispatch({
      type: "setStories",
      payload: s[0],
    });

    navigate("/components");
  }, [selectedStoriesFiles]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center flex-grow gap-6 p-4">
        <CapSwanLogo width={192} height={43} />
        <FileSelector onChange={handleFilesSelected} />
      </div>
      <div className="flex flex-row gap-2 p-2 border-t border-t-slate-200">
        <Button
          variant="primary"
          disabled={!selectedStoriesFiles || selectedStoriesFiles.length === 0}
          onClick={handleNextClicked}
        >
          Import Stories
        </Button>
        <MoreOptions />
      </div>
    </div>
  );
};

export default PageHome;
