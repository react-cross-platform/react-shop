import * as React from "react";

const Icon = ({ type, className = "", size = "", ...restProps }) =>
  <svg
    className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={type} />
  </svg>;

export default Icon;
