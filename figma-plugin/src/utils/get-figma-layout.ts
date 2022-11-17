import { AutoLayoutProps, LayoutProps } from "react-figma/types";
import { TAILWIND_INCREMENT } from "../constants";

export type LayoutReturn = {
  layoutMode?: AutoLayoutProps["layoutMode"];
  primaryAxisSizingMode?: AutoLayoutProps["primaryAxisSizingMode"];
  counterAxisSizingMode?: AutoLayoutProps["counterAxisSizingMode"];
  primaryAxisAlignItems?: AutoLayoutProps["primaryAxisAlignItems"];
  counterAxisAlignItems?: AutoLayoutProps["counterAxisAlignItems"];
  layoutAlign?: LayoutProps["layoutAlign"];
  layoutGrow?: LayoutProps["layoutGrow"];
  itemSpacing?: number;
  width: number;
};

const getLayoutFromClasses = (
  classes: string,
  wrapper: boolean = false
): LayoutReturn => {
  const classesArray = classes ? classes.split(" ") : [];

  /**
   * layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
   * Determines whether this layer uses auto-layout to position its children. Defaults to "NONE".
   */

  const _isFlex = classesArray.includes("flex");
  const _isFlexCol = classesArray.includes("flex-col");

  const layoutMode: LayoutReturn["layoutMode"] = !_isFlex
    ? "HORIZONTAL"
    : _isFlexCol
    ? "VERTICAL"
    : "HORIZONTAL";

  /**
   * layoutGrow: number
   * This property is applicable only for direct children of auto-layout frames, ignored otherwise. Determines whether a layer should stretch along the parent’s primary axis. 0 corresponds to a fixed size and 1 corresponds to stretch.
   */
  const _isFlexGrow = classesArray.includes("flex-grow");

  const layoutGrow: LayoutReturn["layoutGrow"] = _isFlexGrow ? 1 : 0;

  /**
   * primaryAxisSizingMode: 'FIXED' | 'AUTO'
   * Applicable only on auto-layout frames. Determines whether the primary axis has a fixed length (determined by the user) or an automatic length (determined by the layout engine).
   */
  const primaryAxisSizingMode: LayoutReturn["primaryAxisSizingMode"] = "AUTO";

  /**
   * counterAxisSizingMode: 'FIXED' | 'AUTO'
   * Applicable only on auto-layout frames. Determines whether the counter axis has a fixed length (determined by the user) or an automatic length (determined by the layout engine).
   */
  const counterAxisSizingMode: LayoutReturn["counterAxisSizingMode"] = "AUTO";

  /**
   * primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
   * Applicable only on auto-layout frames, ignored otherwise. Determines how the auto-layout frame’s children should be aligned in the primary axis direction.
   */
  const _justifyStart = classesArray.includes("justify-start");
  const _justifyCenter = classesArray.includes("justify-center");
  const _justifyEnd = classesArray.includes("justify-end");

  const primaryAxisAlignItems: LayoutReturn["primaryAxisAlignItems"] =
    _justifyStart
      ? "MIN"
      : _justifyCenter
      ? "CENTER"
      : _justifyEnd
      ? "MAX"
      : "MIN";

  /**
   * counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
   * Applicable only on auto-layout frames, ignored otherwise. Determines how the auto-layout frame’s children should be aligned in the counter axis direction.
   */
  const _itemsStart = classesArray.includes("items-start");
  const _itemsCenter = classesArray.includes("items-center");
  const _itemsEnd = classesArray.includes("items-end");

  const counterAxisAlignItems: LayoutReturn["counterAxisAlignItems"] =
    _itemsStart ? "MIN" : _itemsCenter ? "CENTER" : _itemsEnd ? "MAX" : "MIN";

  /**
   * itemSpacing: number
   * Applicable only on auto-layout frames. Determines distance between children of the frame.
   */
  const _gapRegExpMatch = classes ? classes.match(/gap-(\d+)/) : undefined;

  const itemSpacing: LayoutReturn["itemSpacing"] = _gapRegExpMatch
    ? parseInt(_gapRegExpMatch[1]) * TAILWIND_INCREMENT
    : undefined;

  /**
   * width: number [readonly]
   * The width of the node. Use a resizing method to change this value.
   */
  const width = wrapper && classesArray.includes("w-full") ? 640 : undefined; // if this is the outer component frame, and it is set to w-full, we need to provide a fixed width (might collapse otherwise)

  return {
    layoutMode,
    layoutGrow,
    primaryAxisSizingMode,
    counterAxisSizingMode,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    itemSpacing,
    width,
  };
};

export { getLayoutFromClasses };
