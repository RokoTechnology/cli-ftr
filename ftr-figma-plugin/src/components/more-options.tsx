import { Popover } from "@headlessui/react";
import { Type11Pos } from "figma-ui-components";
import React from "react";
import { usePopper } from "react-popper";
import { useStoreState } from "../state";
import Button from "./button";
import IconMoreDots from "./icons/more-dots";

const MoreOptions = () => {
  const components = useStoreState("components");
  const stories = useStoreState("stories");

  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>();

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  const handleLogState = React.useCallback(() => {
    console.log("components", JSON.stringify(components, null, 2));
    console.log("stories", JSON.stringify(stories, null, 2));
  }, [stories, components]);

  return (
    <Popover>
      <Popover.Button
        as={Button}
        variant="tertiary"
        className="w-8 px-2"
        ref={setReferenceElement}
      >
        <IconMoreDots className="w-4 h-4" />
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="flex flex-col gap-4 p-2 bg-white border border-gray-200 shadow-sm rounded-3">
          <Type11Pos>Figma Tailwind React v0.0.1</Type11Pos>
          <Type11Pos
            className="cursor-pointer text-accent-blue"
            onClick={handleLogState}
          >
            Log state to console
          </Type11Pos>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default MoreOptions;
