import { Flex, Icon, Modal } from "antd-mobile";
import * as React from "react";

import { CartTrigger } from "../../cart/index";
import { Navbar } from "../index";

const styles = require("./styles.css");

interface IMyModelProps {
  history: any;
  location: any;
}

class MyModal extends React.Component<IMyModelProps, any> {
  render() {
    const { children, location, history } = this.props;
    return (
      <Modal
        className={styles.modal}
        visible={true}
        transparent={false}
        animated={false}
      >
        <Navbar title={location.state.title} history={history} />
        {children}
      </Modal>
    );
  }
}

export default MyModal;
