import { Progress } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

interface OwnProps {
  scrolled: number;
  total: number;
}

class ProductsCounter extends React.Component<OwnProps, {}> {
  render() {
    const { scrolled, total } = this.props;
    return (
      <div>
        <div className={styles.productsCounter}>
          {scrolled}/{total}
        </div>
        <Progress
          className={styles.progress}
          percent={Math.round(scrolled / total * 100)}
          position="normal"
          unfilled={false}
        />
      </div>
    );
  }
}

export default ProductsCounter;
