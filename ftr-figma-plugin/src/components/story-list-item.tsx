import classNames from "classnames";
import { Type12Pos } from "figma-ui-components";
import React from "react";

export interface StoryListItemProps {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const StoryListItem: React.FC<StoryListItemProps> = ({
  onChange,
  checked = false,
  id,
}) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  const handleClick = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full">
      <button
        className="flex flex-row items-center w-full h-8 gap-2 px-3 py-1 rounded-lg bg-slate-100"
        onClick={handleClick}
      >
        <div
          className={classNames(
            "w-6 h-3  border border-slate-700 rounded-full transition-colors duration-200",
            {
              "bg-white": !isChecked,
              "bg-slate-700": isChecked,
            }
          )}
        >
          <div
            className={classNames(
              "w-3 h-3 -mt-px -ml-px bg-white border border-slate-700 rounded-full transition-transform duration-200",
              {
                "translate-x-0": !isChecked,
                "translate-x-3": isChecked,
              }
            )}
          ></div>
        </div>
        <Type12Pos>{id}</Type12Pos>
      </button>
    </div>
  );
};

export default StoryListItem;
