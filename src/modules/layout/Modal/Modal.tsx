import { Modal } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

const MyModal = props => {
  return (
    <Modal className={styles.modal} visible={true} transparent={false}>
      {props.children}
    </Modal>
  );
};

export default MyModal;
