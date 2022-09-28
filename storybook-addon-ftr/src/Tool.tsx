import addons, { Channel } from "@storybook/addons";
import { Story, useStorybookApi, useStorybookState } from "@storybook/api";
import {
  IconButton,
  Icons,
  TooltipLinkList,
  WithTooltip,
} from "@storybook/components";
import React from "react";
import { EVENT_CODE_RECEIVED, TOOL_ID } from "./constants";

export const Tool = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [storyHTML, setStoryHTML] = React.useState<string>();

  const storybookState = useStorybookState();
  const storybookApi = useStorybookApi();

  const channel = React.useRef<Channel>();

  React.useEffect(() => {
    channel.current = addons.getChannel();
    channel.current.addListener(EVENT_CODE_RECEIVED, handleHTMLCodeReceived);

    return () => {
      channel.current.removeListener(
        EVENT_CODE_RECEIVED,
        handleHTMLCodeReceived
      );
    };
  }, [channel.current]);

  const handleHTMLCodeReceived = React.useCallback(
    (event: { html: string }) => {
      setStoryHTML(event.html);
    },
    []
  );

  const sendToFigma = ({ mode }: { mode: "single" | "all" }) => {
    // console.log("send to figma", storyHTML);
    // console.log("state", storybookState);
    // console.log("api", storybookApi);

    const { id, title, name } = storybookState.storiesHash[
      storybookState.storyId
    ] as Story & { title: string };

    const stories = [
      {
        id,
        title,
        name,
        html: storyHTML,
      },
    ];

    const content = JSON.stringify(stories, null, 2);
    const blob = new Blob([content], { type: "text/csv" });

    // @ts-ignore
    if (navigator && navigator.msSaveOrOpenBlob) {
      // @ts-ignore
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const dataURI = `data:text/json;charset=utf-8,${content}`;

      const URL = window.URL || window.webkitURL;
      const downloadURI =
        typeof URL.createObjectURL === "undefined"
          ? dataURI
          : URL.createObjectURL(blob);

      let link = document.createElement("a");
      link.setAttribute("href", downloadURI);
      link.setAttribute("download", `stories-${storybookState.storyId}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      tooltipShown={expanded}
      onVisibilityChange={(visibility: boolean) => setExpanded(visibility)}
      tooltip={
        <TooltipLinkList
          links={[
            {
              id: "single",
              title: "Send this component to Figma",
              onClick: () => {
                sendToFigma({ mode: "single" });
              },
            },
            {
              id: "all",
              title: "Send all components to Figma",
              onClick: () => {
                sendToFigma({ mode: "all" });
              },
            },
          ]}
        />
      }
      closeOnClick
    >
      <IconButton key={TOOL_ID} title="Send To Figma">
        <Icons icon="transfer" />
      </IconButton>
    </WithTooltip>
  );
};
