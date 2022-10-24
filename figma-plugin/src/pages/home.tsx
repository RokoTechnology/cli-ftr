import { useNavigate } from "@reach/router";
import React from "react";
import CapSwanLogo from "../assets/capswan-logo.svg";
import FileSelector from "../components/file-selector";
import { prepareFiles } from "../helpers/prepare-files";
import { dispatch } from "../state";

const PageHome = () => {
  const navigate = useNavigate();

  const handleNextClicked = React.useCallback(async (stories: FileList) => {
    const s = await prepareFiles(stories);

    console.log("stories", s[0]);

    dispatch({
      type: "setStories",
      payload: s[0],
    });

    navigate("/components");
  }, []);

  return (
    <div className="flex flex-col items-center p-2">
      <CapSwanLogo width={192} height={43} />
      <FileSelector onPositivePress={handleNextClicked} />
    </div>
  );
};

export default PageHome;
