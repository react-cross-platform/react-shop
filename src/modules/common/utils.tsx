import * as React from "react";
import TouchFeedback from "rmc-feedback/lib/TouchFeedback";

export const prettyPrice = (value: number) => {
  if (!value) {
    return;
  }
  const splitValue = Math.round(value).toString().split("");
  const valueLength = splitValue.length;
  switch (splitValue.length) {
    case 4:
      splitValue.splice(-3, 0, " ");
      return splitValue.join("");

    case 5:
      splitValue.splice(-3, 0, " ");
      return splitValue.join("");

    case 6:
      splitValue.splice(3, 0, " ");
      return splitValue.join("");

    default:
      return value;
  }
};

export const Aux = props => {
  return props.children;
};

export const Div = ({ children, ...props }) =>
  <div {...props}>
    {children}
  </div>;

export const MyTouchFeedback = ({
  style = { opacity: 0.5 } as any,
  disabled = false,
  children,
  ...props
}) =>
  <TouchFeedback activeStyle={!disabled && style}>
    {children}
  </TouchFeedback>;
