import { CSSProperties } from "react";

export const isSafariBrowser = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const getScrollableStyle = (isScrollable: boolean): CSSProperties => {
  // Hack for Safari on iOS to prevent content scrolling under Modal window
  return isScrollable
    ? {
        overflowY: "scroll",
        WebkitOverflowScrolling: "touch"
      }
    : {
        overflowY: "hidden"
      };
};
