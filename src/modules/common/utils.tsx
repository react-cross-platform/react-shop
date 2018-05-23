import * as React from "react";
import TouchFeedback from "rmc-feedback/lib/TouchFeedback";

export const formatPrice = (value: number) => {
  const convertToString = value.toString();
  const splitValue = convertToString.split("");
  const valueLength = splitValue.length;

  if (splitValue.length > 3) {
    splitValue.splice(-3, 0, " ");
    return splitValue.join("");
  } else {
    return convertToString;
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
