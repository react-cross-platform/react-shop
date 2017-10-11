import { Icon } from "antd-mobile";
import { IconPropType } from "antd-mobile/lib/icon";
import * as React from "react";

interface Props extends IconPropType {
  type: any;
}

const MyIcon = ({
  type,
  size,
  className = "",
  ...restProps
}: Props): JSX.Element => {
  return type.startsWith("#")
    ? <svg
        className={`${size ? `am-icon-${size}` : ""} ${className}`}
        style={{ backgroundSize: "cover" }}
        {...restProps}
      >
        <use xlinkHref={type} />
      </svg>
    : <Icon type={type} size={size} />;
};

export default MyIcon;
