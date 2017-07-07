import { Flex, Icon } from "antd-mobile";
import * as React from "react";
import Ripples from "react-ripples";

import { HEIGHT } from "../../layout/Header/Header";
import { Modal } from "../../layout/index";
import { Product } from "../index";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

class ProductModal extends React.Component<any, any> {
  back = e => {
    e.stopPropagation();
    this.props.history.goBack();
    this.setState({
      showModal: false
    });
  };

  render() {
    const { match, history } = this.props;
    return (
      <Modal>
        <Flex className={styles.flex} justify="start" align="center">
          <Ripples during={200}>
            <Icon
              className={styles.icon}
              type={require("!svg-sprite-loader!./back.svg")}
              size="md"
              style={{
                height: HEIGHT
              }}
              onClick={this.back}
            />
          </Ripples>
          <h3 className={styles.productName}>
            Товар #{match.params.id}
          </h3>
        </Flex>

        <div style={{ marginTop: HEIGHT }}>
          <Product id={match.params.id} />
        </div>
      </Modal>
    );
  }
}

export default ProductModal;
