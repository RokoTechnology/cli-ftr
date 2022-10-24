import { Link } from "@reach/router";
import { Checkbox, PrimaryButton, Type12PosBold } from "figma-ui-components";
import React from "react";
import { render } from "react-figma";
import { FigmaRenderer } from "../renderer/FigmaRenderer";
import { useStoreState } from "../state";

const PageComponents = () => {
  const stories = useStoreState("stories");

  const handleApplyClick = () => {
    render(<FigmaRenderer stories={stories} />);
  };
  return (
    <div className="w-full">
      <div className="p-4 border-b border-b-slate-200">
        <Link to="/">⬅</Link>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Type12PosBold>Components</Type12PosBold>
        <ul className="flex flex-col gap-2">
          {stories.map((story) => (
            <li
              key={`${story.title}-${story.name}`}
              className="h-8 rounded-lg bg-slate-100"
            >
              <Checkbox name={`${story.title}-${story.name}`} />
            </li>
          ))}
        </ul>
        <PrimaryButton>Render</PrimaryButton>
      </div>
    </div>
  );
};

export default PageComponents;
