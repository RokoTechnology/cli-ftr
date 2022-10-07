import React from "react";

export interface SpacerProps {
  w: number;
  h: number;
  show: boolean;
}

const Spacer: React.FC<SpacerProps> = ({ w = 0, h = 0, show = false }) => {
  return <div className={`w-[${w}px] h-[${h}px]${show && " bg-red-200"}`} />;
};

export { Spacer };
