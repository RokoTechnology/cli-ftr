import { Link } from "@reach/router";
import { Type12Pos, Type12PosBold } from "figma-ui-components";
import React from "react";
import IconArrowLeft from "./icons/arrow-left";

export interface HeaderSubProps {
  title: string;
  backLink: string;
  addon?: string;
}

const HeaderSub: React.FC<HeaderSubProps> = ({ title, backLink, addon }) => {
  return (
    <div className="flex flex-row p-4 border-b border-b-slate-200">
      <Link to={backLink} className="flex flex-row gap-2 grow">
        <IconArrowLeft className="w-4 h-4" />
        <Type12PosBold>{title}</Type12PosBold>
      </Link>
      {addon && <Type12Pos>{addon}</Type12Pos>}
    </div>
  );
};

export default HeaderSub;
