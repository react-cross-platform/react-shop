import { Icon } from "antd-mobile";
// import { IconPropType } from "antd-mobile/lib/icon";
import * as React from "react";

// interface Props extends IconPropType {
interface Props {
  className?: string;
  type: any;
  size?: any;
  style?: any;
  onClick?: any;
}

const MyIcon = ({
  type,
  size,
  className = "",
  ...restProps
}: Props): any => {
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
