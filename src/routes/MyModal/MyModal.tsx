import { Modal } from "antd-mobile";
import * as React from "react";
import { CSSProperties } from "react";

const styles = require("./styles.css");

interface OwnProps {
  animated?: boolean;
  location?: any;
  history?: any;
}

class MyModal extends React.Component<OwnProps, {}> {
  render() {
    const { animated, children } = this.props;
    return (
      <Modal
        className={styles.modal}
        visible={true}
        transparent={false}
        animated={!!animated}
      >
        {children}
      </Modal>
    );
  }
}

export default MyModal;
